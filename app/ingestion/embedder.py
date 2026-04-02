from app.config import logger, EMBEDDING_MODEL
from langchain_huggingface import HuggingFaceEmbeddings
import os
from dotenv import load_dotenv

load_dotenv()

logger.info("================= EMBEDDING =============")

token = os.getenv("HF_TOKEN")

def get_embedding_model():
    """
    Initialise le modèle d'embedding HuggingFace.

    MODEL_NAME: The list of models d'embeddings, create an list of huggingface
    Embedding model encodes sentences, paragraphs, and long
    and extract the text on images in documents.
    """

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": False}
    )
    return embeddings
