"""On définit l'outil avec le décorateur @tool (plus moderne et simple)"""

from app.config import logger, QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME
from app.ingestion.embedder import get_embedding_model
from langchain_core.tools import tool
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient

def client_retrievers():

    try:
        client= QdrantClient(
                url = QDRANT_URL, 
                api_key =QDRANT_API_KEY
                )
        embeddings=get_embedding_model()

        vector_store = QdrantVectorStore(
                    client=client,
                    collection_name=COLLECTION_NAME,
                    embedding=embeddings
                    )
        logger.info(f"Retrievers crées avec succès")
        retriever = vector_store.as_retriever(search_kwargs={"k": 3})
        return retriever
    except Exception as e:
        logger.error(f"Error de récupération {str(e)}")

@tool
def retriever_tool(query: str) -> str:
    """
    Recherche des informations précises dans les documents sur le système éducatif au Bénin.
    Utile pour les statistiques de réussite (CEP, BEPC, BAC), les réformes (AME, ADET) 
    et les projets (Sèmè City, cantines scolaires).
    """

    retriever = client_retrievers()
    docs = retriever.invoke(query)
    return "\n\n".join([
        f"Contenu: {doc.page_content}\nSource: {doc.metadata.get('source', 'Inconnue')}" 
        for doc in docs
    ])