from tavily import TavilyClient
from langchain_core.documents import Document
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from bs4 import BeautifulSoup
import requests

from app.config import (
    logger, QDRANT_URL, QDRANT_API_KEY,
    COLLECTION_NAME, TAVILY_KEY
)
from app.ingestion.splitter import splitter_docs
from app.ingestion.embedder import get_embedding_model

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/119.0.0.0 Safari/537.36",
    "Accept-Language": "fr-FR,fr;q=0.9",
}

FALLBACK_URLS = {
    "statistiques": ["https://insae-bj.org/"],
    "budget":       ["https://opendata.budgetbenin.bj/"],
    "sante":        ["https://sante.gouv.bj/"],
    "education":    ["https://mestfp.gouv.bj/"],
    "tourisme":     ["https://tourisme.gouv.bj/"],
    "politique":    ["https://gouv.bj/"],
    "investissement": ["https://apiex.bj/"],
    "startups":     ["https://semecity.bj/"],
    "culture":      ["https://culture.gouv.bj/"],
}


# ════════════════════════════════════════════════════════════════
# 1. FETCHERS
# ════════════════════════════════════════════════════════════════

def fetch_via_tavily(query: str, domaine: str, max_results: int = 5) -> list[Document]:
    """Recherche Tavily → liste de Documents LangChain."""
    client = TavilyClient(api_key=TAVILY_KEY)
    enriched_query = f"{query} Bénin {domaine}"
    docs = []

    try:
        response = client.search(
            query=enriched_query,
            search_depth="advanced",
            max_results=max_results,
            include_raw_content=True,
            include_answer=False,
        )
        for r in response.get("results", []):
            content = r.get("raw_content") or r.get("content", "")
            if not content or len(content) < 150:
                continue
            docs.append(Document(
                page_content=content,
                metadata={
                    "source":   r.get("url", ""),
                    "title":    r.get("title", ""),
                    "domaine":  domaine,
                    "provider": "tavily",
                }
            ))
        logger.info(f"[Tavily] {len(docs)} docs récupérés pour '{enriched_query}'")

    except Exception as e:
        logger.error(f"[Tavily] Erreur: {e}")

    return docs


def fetch_via_scraping(url: str, domaine: str) -> Document | None:
    """Scraping direct BeautifulSoup → Document LangChain."""
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()

        soup = BeautifulSoup(r.text, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "aside"]):
            tag.decompose()

        main = soup.find("main") or soup.find("article") or soup.find("body")
        text = main.get_text(separator="\n", strip=True) if main else ""

        if len(text) < 200:
            logger.warning(f"[Scraper] Contenu trop court pour {url}")
            return None

        return Document(
            page_content=text,
            metadata={
                "source":   url,
                "title":    soup.title.string if soup.title else "",
                "domaine":  domaine,
                "provider": "scraper",
            }
        )
    except Exception as e:
        logger.error(f"[Scraper] Erreur sur {url}: {e}")
        return None


# ════════════════════════════════════════════════════════════════
# 2. INGESTEUR WEB  (miroir de ton ingest() pour les PDFs)
# ════════════════════════════════════════════════════════════════

def ingest_web(query: str, domaine: str) -> bool:
    """
    Pipeline complet :
      Tavily search → fallback scraping → chunk → Qdrant

    Réutilise exactement ton splitter et ton embedder existants.
    """
    logger.info(f"[WebIngest] query='{query}' | domaine={domaine}")

    # ── 1. Récupération ─────────────────────────────────────────
    docs = fetch_via_tavily(query, domaine)

    if len(docs) < 2:
        logger.warning("[WebIngest] Tavily insuffisant → fallback scraping")
        for url in FALLBACK_URLS.get(domaine, []):
            doc = fetch_via_scraping(url, domaine)
            if doc:
                docs.append(doc)

    if not docs:
        logger.error("[WebIngest] Aucun document récupéré.")
        return False

    # ── 2. Chunking  (ton splitter existant) ────────────────────
    chunks = splitter_docs(docs)
    logger.info(f"[WebIngest] {len(chunks)} chunks générés")

    # ── 3. Indexation Qdrant  (même logique que ton retrievers()) ─
    try:
        client = QdrantClient(
            url=QDRANT_URL,
            api_key=QDRANT_API_KEY,
            timeout=60,
            check_compatibility=False,
        )
        embeddings = get_embedding_model()

        existing = [c.name for c in client.get_collections().collections]
        if COLLECTION_NAME not in existing:
            client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(size=384, distance=Distance.COSINE),
            )
            logger.info(f"[WebIngest] Collection '{COLLECTION_NAME}' créée.")

        vector_store = QdrantVectorStore(
            client=client,
            collection_name=COLLECTION_NAME,
            embedding=embeddings,
        )

        batch_size = 50
        for i in range(0, len(chunks), batch_size):
            batch = chunks[i: i + batch_size]
            vector_store.add_documents(batch)
            logger.info(
                f"[WebIngest] Batch {i // batch_size + 1} indexé "
                f"({min(i + batch_size, len(chunks))}/{len(chunks)})"
            )

        logger.info("[WebIngest] Ingestion web terminée avec succès ✅")
        return True

    except Exception as e:
        logger.error(f"[WebIngest] Erreur Qdrant: {e}")
        return False