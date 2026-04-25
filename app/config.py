import os
import logging
from logging.handlers import RotatingFileHandler
from dotenv import load_dotenv

load_dotenv()

# =========================
    #ENV VARIABLES
# =========================
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")
QDRANT_URL=os.getenv('QDRANT_URL')
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
OPEN_ROUTER_KEY=os.getenv('OPEN_ROUTER_KEY')
TAVILY_KEY=os.getenv('TAVILY_KEY')


COLLECTION_NAME ="wadagni"
EMBEDDING_MODEL ="sentence-transformers/all-MiniLM-L6-v2"
GROQ_MODEL_NAME=["gpt-oss-120b", "gpt-oss-20b", "qwen/qwen3-32b"]
OPENAI_MODEL_NAME=['gpt-5.4', "gpt-5.4-mini", "gpt-5.4-nanoo"]
MODEL_AUDIO_TO_TEXT = "whisper-large-v3-turbo"

# =========================
#  LOGGING CONFIG
# ========================
LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "app.log")

os.makedirs(LOG_DIR, exist_ok=True)

def setup_logger(name: str = "logs_dev") -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # éviter duplication des logs
    if logger.hasHandlers():
        return logger

    # Format des logs
    formatter = logging.Formatter(
        "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
    )

    #  Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)

    # File handler avec rotation
    file_handler = RotatingFileHandler(
        LOG_FILE,
        maxBytes=5 * 1024 * 1024,
        backupCount=3
    )
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)

    # ajouter handlers
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger

# Logger global
logger = setup_logger()
