from app.config import logger
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
import pathlib

logger.info("============== SEGMENTATION SEMANTIQUE===========")

def splitter_docs(docs):

    all_chunks = []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150
    )

    for i, page in enumerate(docs):

        text = page.page_content
        metadata = page.metadata

        if text.strip():

            temp_doc = Document(
                page_content=text,
                metadata=metadata
            )

            doc_chunks = splitter.split_documents([temp_doc])
            all_chunks.extend(doc_chunks)

    return all_chunks