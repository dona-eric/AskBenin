from app.config import QDRANT_URL, COLLECTION_NAME, logger, QDRANT_API_KEY
from app.ingestion.chuncker import splitter_docs
from app.ingestion.loader import loader_pdfs
from app.ingestion.embedder import get_embedding_model
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
import pathlib
from app.config import EMBEDDING_MODEL


def retrievers(docs_chunks):

    client= QdrantClient(
        url = QDRANT_URL, 
        api_key =QDRANT_API_KEY,
        timeout=60,
        check_compatibility=False,
          )
    embeddings=get_embedding_model()

    try:
        existing = [c.name for c in client.get_collections().collections]

        if COLLECTION_NAME not in existing:

            client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=384,  # Dimension des vecteurs d'embedding
                    distance=Distance.COSINE
                )
            )
            logger.info(f"Collection {COLLECTION_NAME} créée avec succès.")
        vector_store = QdrantVectorStore(
            client=client,
            collection_name=COLLECTION_NAME,
            embedding=embeddings
        )
        batch_size = 50
        for i in range(0, len(docs_chunks), batch_size):
            batch = docs_chunks[i:i + batch_size]


            vector_store.add_documents(batch)
            logger.info(f"Batch {i//batch_size + 1} indexé ({min(i + batch_size, len(docs_chunks))}/{len(docs_chunks)})")
        retriever = vector_store.as_retriever(search_kwargs={"k": 3})

        logger.info(f"Le retriever a été créé avec succès")
        return retriever
        
    except Exception as e:
        logger.error(f"Erreur lors de la création du retriever : {str(e)}")


def ingest():

    path_dir = pathlib.Path("data/pdfs")

    docs = loader_pdfs(path_dir)
    chunks = splitter_docs(docs)

    retrievers(chunks)

    logger.info(f"Ingestion terminée")


if __name__ == "__main__":
    ingest()