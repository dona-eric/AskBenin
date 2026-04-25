from langchain_core.tools import tool
from app.ingestion.detector import detect_domaine
from app.config import setup_logger
from app.rag.retriever import qdrant_add, qdrant_search, web_fetch_and_ingest


logger = setup_logger()


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
    docs = qdrant_search(query, k=4)
 
    if not docs:
        return "AUCUN_RÉSULTAT"   # signal pour l'agent de basculer sur le web
 
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