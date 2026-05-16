from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.rag.chain import chain_rag
from app.config import logger, GROQ_MODEL_NAME, MODEL_AUDIO_TO_TEXT, GROQ_API_KEY,OPEN_ROUTER_MODEL
from app.schemas import AudioRequestState, RequestState
from groq import Groq
import os

logger.info(msg="================ API ROUTER STATE =============")

app = FastAPI(
    title="API AskBenin pour l'Agentic RAG conceptualisé dans la culture, la tradition," \
    "l'éducation et plus ou moins dans la politique avec les lois judiciaires",
    description="""API backend pour AskBenin,
                fournissant des endpoints pour la gestion des states,
                des audios, et conversation. 
                Intègre un agent de conversation intelligent pour des interactions personnalisées.
            """
        )

# ============ CORS Configuration ============
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.32.90:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info(msg="================ CREATE ROUTER =============")

try:
    client = Groq(api_key=GROQ_API_KEY)
except Exception as e:
    logger.warning(f"Groq client could not be initialized: {e}")
    client = None

@app.post("/chat")
def chat_endpoint(request: RequestState):
    
    if request.model_name not in GROQ_MODEL_NAME and request.model_name not in OPEN_ROUTER_MODEL:
        raise HTTPException(
            status_code=400, 
            detail=f"Model {request.model_name} not supported"
            )
    
    try:
        response = chain_rag(
            provider=request.provider,
            query=request.messages,
            llm_id=request.model_name 
        )
        return {"response": response}
    except Exception as e:
        logger.error(f"Erreur RAG: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    


@app.post("/chat/audio", response_model=AudioRequestState)
async def post_audio_to_text(file: UploadFile = File(...)):
    
    """
    une fonction qui permet de recevoir la question de l'utilisateur en audio
    - Transforme en Texte et le transmettre la question parser texte au chaine rag
    - Creer un fichier temporaire temp_path pour stocker le fichier audio reçu
    """
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        buffer.write(
            await file.read()
        )

    """"transcrire l'audio au modèle whisper de groq"""
    with open(temp_path, "rb") as audio_file:
        transcription = client.audio.transcription.create(
            file = audio_file,
            model=MODEL_AUDIO_TO_TEXT,
            prompt="Ecoute bien le contexte la question et répond de manière concise et précise",
            language="fr"
        )

    os.remove(temp_path)

    """
    Envoyer l'audio transcrit au modèle de rag pour obtenir la réponse
    
    """

    text_query = transcription.text
    response_user = chain_rag(
        provider="GROQ",
        query=text_query,
        llm_id=GROQ_MODEL_NAME[2]
    )

    return {
        "question_text": text_query,
        "response_text": response_user,
        "audio_url": ""
        }
    
@app.get("/")
def health():
    return {"health API":"100% OK"}