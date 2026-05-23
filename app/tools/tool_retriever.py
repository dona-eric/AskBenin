from langchain_core.tools import tool
from app.config import setup_logger, OPENAI_API_KEY
from app.rag.retriever import qdrant_add, qdrant_search, web_fetch_and_ingest
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.documents import Document
from app.rag.reranker import get_reranking_retriever
from app.rag.retriever import get_vector_store
from app.ingestion.detector import detect_domaine

from functools import lru_cache

logger = setup_logger()


@lru_cache(maxsize=1)
def get_relevance_llm():
    return ChatOpenAI(
        api_key=OPENAI_API_KEY,
        base_url="https://build.lewisnote.com/v1",
        model="gpt-5.4-nano",
        temperature=0
    ).with_structured_output(Relevance)


class Relevance(BaseModel):
    is_relevant: bool
    confidence: float

def _is_context_relevant(query: str, docs_text: str) -> bool:
    """
    Vérifie rapidement si les chunks récupérés répondent à la question.
    Utilise gpt-4o-mini (rapide + pas cher) pour cette décision binaire.
    """
    try:
        llm = get_relevance_llm()

        result = llm.invoke(
            f"Question: {query}\n\n"
            f"Contexte: {docs_text[:1200]}\n\n"
            "Ce contexte permet-il de répondre à la question ? "
            "Réponds avec is_relevant (bool) et confidence (0.0 à 1.0)."
        )
        logger.info(f"[CRAG] relevant={result.is_relevant} | confidence={result.confidence:.2f}")
        return result.is_relevant and result.confidence >= 0.6

    except Exception as e:
        logger.warning(f"[CRAG] Erreur vérification, on continue: {e}")
        return True  # en cas d'erreur, on ne bloque pas


@tool
def retriever_tool(query: str) -> str:
    """
    Recherche dans la base de connaissances locale sur le Bénin.
    Couvre tous les domaines : santé, éducation, agriculture, économie,
    finance, politique, gouvernance, numérique, startups, innovation,
    tourisme, culture, environnement, statistiques, budget, investissement,
    sécurité.
    Utilise cet outil EN PREMIER avant toute recherche web.
    Retourne les passages les plus pertinents avec leur source.
    """
    # 1. Détection du domaine pour filtrage metadata
    domaine = detect_domaine(query)

    # 2. Retrieval large (fetch_k=10) avec filtre domaine + MMR
    docs = qdrant_search(
        query,
        k=3,           # top 3 finaux
        fetch_k=10,    # candidats initiaux pour MMR + reranking
        domaine=domaine,
        search_type="mmr",   # diversité des résultats
        lambda_mult=0.7      # équilibre pertinence/diversité
    )

    if not docs:
        return "AUCUN_RÉSULTAT"

    # 3. Reranking — trie les docs par pertinence réelle
    try:
        vector_store = get_vector_store()
        base_retriever = vector_store.as_retriever(search_kwargs={"k": 10})
        rerank = get_reranking_retriever(base_retriever)
        reranked = rerank.compress_documents(docs, query)
        docs = reranked if reranked else docs
    except Exception as e:
        logger.warning(f"[Reranker] Erreur, on utilise les docs non rerankés: {e}")

    # 4. vérifie si le contexte est vraiment pertinent
    context_text = "\n".join(d.page_content for d in docs)
    if not _is_context_relevant(query, context_text):
        logger.info("[CRAG] Contexte local insuffisant → signal web search")
        return "AUCUN_RÉSULTAT" 

    return "\n\n---\n\n".join(
        f"[Source: {d.metadata.get('source', 'Inconnue')}]\n{d.page_content}"
        for d in docs
    )


@tool
def web_search_tool(query: str) -> str:
    """
    Recherche profonde sur le web pour trouver des informations sur le Bénin
    quand la base locale ne contient pas la réponse.
    Parcourt Tavily (deep search) puis les sites officiels béninois.
    Injecte automatiquement les résultats dans la base locale Qdrant.
    Utilisable pour TOUS les domaines sans exception.
    """
    domaine = detect_domaine(query)
    logger.info(f"[WebSearch] domaine détecté: {domaine}")
 
    # Fetch + ingest
    chunks = web_fetch_and_ingest(query, domaine)
 
    if not chunks:
        return "Impossible de récupérer des informations depuis le web pour cette requête."
 
    # Re-query Qdrant avec les nouvelles données
    docs = qdrant_search(query, k=4)
 
    if not docs:
        # Retourner directement les chunks si la re-query échoue
        return "\n\n---\n\n".join(c.page_content[:800] for c in chunks[:4])
 
    return "\n\n---\n\n".join(
        f"[Source: {d.metadata.get('source', 'Inconnue')}]\n{d.page_content}"
        for d in docs
    )