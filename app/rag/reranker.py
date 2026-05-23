# app/rag/reranker.py

from langchain_classic.retrievers import ContextualCompressionRetriever
from langchain_classic.retrievers.document_compressors import CrossEncoderReranker
from langchain_community.cross_encoders import HuggingFaceCrossEncoder
from functools import lru_cache

@lru_cache(maxsize=1)
def get_cross_encoder_model():
    return HuggingFaceCrossEncoder(
        model_name="cross-encoder/mmarco-mMiniLMv2-L12-H384-v1"
    )

def get_reranking_retriever(base_retriever):
    """
    Pipeline : retrieval k=6 → rerank → top 3 pertinents
    Modèle léger multilingue (supporte le français)
    """
    model = get_cross_encoder_model()

    compressor = CrossEncoderReranker(model=model, top_n=3)

    return ContextualCompressionRetriever(
        base_compressor=compressor,
        base_retriever=base_retriever,
    )