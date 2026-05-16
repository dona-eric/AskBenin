from app.config import logger, GROQ_API_KEY, OPEN_ROUTER_KEY
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

logger.info ("================== MODÈLES GENERATEUR===============")


def get_llm(llm_provider, model):

    try:
        if llm_provider == "GROQ":
            if not GROQ_API_KEY:
                raise ValueError("GROQ API KEY not exists")
            return ChatGroq(
                model=model, 
                api_key=GROQ_API_KEY,
                temperature=0.2
                )
        
        elif llm_provider == "OPEN_ROUTER":
            if not OPEN_ROUTER_KEY:
                raise ValueError("open router api key not eexist")

            return ChatOpenAI(
                model=model,
                api_key=OPEN_ROUTER_KEY,
                base_url="https://openrouter.ai/api/v1",
                default_headers={
                    "HTTP-Referer": "http://localhost:8000",
                    "X-Title": "Benin-GPT-Assistant"
                },
                temperature=0.2)
        else:
            raise ValueError(f"Les LLMs Models {llm_provider} doesn't exists")
            
    except Exception as e:
        logger.error(f"{llm_provider} unknown {str(e)}")
        return None
