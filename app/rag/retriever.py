"""On définit l'outil avec le décorateur @tool (plus moderne et simple)"""

from app.config import logger, QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME
from app.ingestion.embedder import get_embedding_model
from app.ingestion.splitter import splitter_docs
import requests
from app.ingestion.detector import HEADERS, FALLBACK_URLS
from typing import Optional
from bs4 import BeautifulSoup
from tavily import TavilyClient
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from langchain_core.documents import Document
from app.config import (
    logger,
    TAVILY_KEY, OPENAI_API_KEY
) 

def get_vector_store() -> QdrantVectorStore:
    client = QdrantClient(
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY,
        timeout=60,
        check_compatibility=False,
    )
    embeddings = get_embedding_model()
 
    # Crée la collection si elle n'existe pas encore
    existing = [c.name for c in client.get_collections().collections]
    if COLLECTION_NAME not in existing:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE),
        )
        logger.info(f"[Qdrant] Collection '{COLLECTION_NAME}' créée.")
 
    return QdrantVectorStore(
        client=client,
        collection_name=COLLECTION_NAME,
        embedding=embeddings,
    )
 

def fetch_tavily(query: str, domaine: str, max_results: int = 6) -> list[Document]:
    """Deep search Tavily → Documents LangChain."""
    client = TavilyClient(api_key=TAVILY_KEY)
    enriched = f"{query} Bénin {domaine}" if domaine != "general" else f"{query} Bénin"
    docs: list[Document] = []
    try:
        response = client.search(
            query=enriched,
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
                },
            ))
        logger.info(f"[Tavily] {len(docs)} docs pour '{enriched}'")
    except Exception as e:
        logger.error(f"[Tavily] Erreur: {e}")
    return docs
 


def fetch_scraping(url: str, domaine: str) -> Optional[Document]:
    """Scraping BeautifulSoup → Document LangChain (fallback)."""
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "aside"]):
            tag.decompose()
        main = soup.find("main") or soup.find("article") or soup.find("body")
        text = main.get_text(separator="\n", strip=True) if main else ""
        if len(text) < 200:
            return None
        return Document(
            page_content=text,
            metadata={
                "source":   url,
                "title":    soup.title.string if soup.title else "",
                "domaine":  domaine,
                "provider": "scraper",
            },
        )
    except Exception as e:
        logger.warning(f"[Scraper] {url}: {e}")
        return None
 
 
def web_fetch_and_ingest(query: str, domaine: str) -> list[Document]:
    """
    Tavily → fallback scraping → chunk → inject Qdrant → retourne les chunks.
    """
 
    # 1. Tavily deep search
    raw_docs = fetch_tavily(query, domaine)
    spliter = splitter_docs(docs= raw_docs)

    # 2. Fallback scraping si Tavily insuffisant
    if len(raw_docs) < 2:
        logger.warning(f"[WebFetch] Tavily insuffisant ({len(raw_docs)}) → scraping")
        for url in FALLBACK_URLS.get(domaine, []):
            doc = fetch_scraping(url, domaine)
            if doc:
                raw_docs.append(doc)
 
    if not raw_docs:
        logger.error("[WebFetch] Aucune source disponible.")
        return []
 
    # 3. Chunking
    chunks = spliter.split_documents(raw_docs)
    logger.info(f"[WebFetch] {len(chunks)} chunks générés")
 
    # 4. Injection Qdrant (enrichit la base pour les prochaines requêtes)
    qdrant_add(chunks)
 
    return chunks

def qdrant_search(query: str, k: int = 4) -> list[Document]:
    """Recherche dans Qdrant, retourne [] si collection vide ou erreur."""
    try:
        vectore_store = get_vector_store()
        return vectore_store.similarity_search(query, k=k)
    except Exception as e:
        logger.warning(f"[Qdrant] Recherche échouée: {e}")
        return []
 
 
def qdrant_add(chunks: list[Document]) -> None:
    """Injecte des chunks dans Qdrant par batches de 50."""
    try:
        vectore_store = get_vector_store()
        batch_size = 50
        for i in range(0, len(chunks), batch_size):
            vectore_store.add_documents(chunks[i: i + batch_size])
            logger.info(
                f"[Qdrant] Batch {i // batch_size + 1} indexé "
                f"({min(i + batch_size, len(chunks))}/{len(chunks)})"
            )
    except Exception as e:
        logger.error(f"[Qdrant] Injection échouée: {e}")