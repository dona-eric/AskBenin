from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from app.config import logger
import pathlib

logger.info("================= chargeur de documents pdfs =============")

def loader_pdfs(path_dir: pathlib.Path):

    try:
        loader = DirectoryLoader(
            str(path_dir),
            glob="*.pdf",
            loader_cls=PyPDFLoader
        )

        docs = loader.load()

        logger.info(f"{len(docs)} pages chargées depuis les PDFs")

        return docs

    except Exception as e:
        logger.error(f"Erreur de chargement : {str(e)}")
        return []
    

loader_pdfs(pathlib.Path("data/pdfs/"))