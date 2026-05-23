from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from app.config import logger, GROQ_API_KEY
from api.schemas import QuestionRequest
from contextlib import asynccontextmanager
from app.rag.agent_chat import AskbeninAgent
from groq import Groq
import os
import shutil
import uuid

logger.info(msg="================ API ROUTER STATE =============")

agent: AskbeninAgent | None = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global agent
    agent = AskbeninAgent()
    # Create temp dir for audio files if it doesn't exist
    os.makedirs("temp_audio", exist_ok=True)
    yield
    agent = None

app = FastAPI(
    title="AskBenin API",
    description="API backend pour AskBenin (Agentic RAG)",
    lifespan=lifespan
)

# ============ CORS Configuration ============
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info(msg="================ ROUTERS READY =============")

@app.get("/")
async def health_check():
    return {"status": "ok", "agent_ready": agent is not None}

@app.post("/chat")
async def ask_question(body: QuestionRequest):
    if not agent:
        raise HTTPException(status_code=500, detail="Agent non initialisé")
    
    response = agent.ask(body.question, session_id=body.session_id)
    return response

@app.delete("/session/{session_id}")
async def reset_session(session_id: str):
    if agent:
        agent.reset_history(session_id)
    return {"status": "reset", "session_id": session_id}

@app.post("/chat/audio")
async def chat_audio(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """
    1. Reçoit l'audio du frontend
    2. Utilise Groq Whisper pour le Speech-to-Text
    3. Passe la question à l'agent RAG
    4. Convertit la réponse texte en audio avec gTTS
    5. Retourne le texte et l'URL de l'audio
    """
    if not agent:
        raise HTTPException(status_code=500, detail="Agent non initialisé")
        
    try:
        # Save uploaded file
        file_ext = file.filename.split('.')[-1] if '.' in file.filename else 'webm'
        input_audio_path = f"temp_audio/{uuid.uuid4()}.{file_ext}"
        
        with open(input_audio_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # 1. Speech to Text via Groq Whisper
        client = Groq(api_key=GROQ_API_KEY)
        with open(input_audio_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                file=(input_audio_path, audio_file.read()),
                model="whisper-large-v3",
                prompt="Le contexte est sur le Bénin, en français.",
                response_format="json",
                language="fr",
            )
            
        question_text = transcription.text
        logger.info(f"[Audio] Transcrit: {question_text}")
        
        if not question_text.strip():
            raise HTTPException(status_code=400, detail="Audio inaudible ou vide")
            
        # 2. Agentic RAG Processing
        rag_response = agent.ask(question_text, session_id="audio_session")
        answer_text = rag_response.get("answer", "")
        
        # 3. Text to Speech via OpenAI TTS (Premium Quality)
        output_audio_name = f"{uuid.uuid4()}.mp3"
        output_audio_path = f"temp_audio/{output_audio_name}"
        
        from openai import OpenAI
        import os
        
        # We need the real OpenAI API key, not the custom lewisnote URL used for Langchain
        openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
        
        response = openai_client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=answer_text[:4096] # Limit characters just in case
        )
        response.stream_to_file(output_audio_path)
        
        # Cleanup input file
        if os.path.exists(input_audio_path):
            os.remove(input_audio_path)
            
        # Schedule output file cleanup after 5 minutes
        background_tasks.add_task(cleanup_file, output_audio_path)
        
        return {
            "question_text": question_text,
            "response_text": answer_text,
            "audio_url": f"/audio/download/{output_audio_name}"
        }
        
    except Exception as e:
        logger.error(f"[Audio Endpoint] Erreur: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/audio/download/{filename}")
async def download_audio(filename: str):
    file_path = f"temp_audio/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Audio file not found or expired")
    return FileResponse(file_path, media_type="audio/mpeg")

def cleanup_file(filepath: str):
    import asyncio
    async def delayed_remove():
        await asyncio.sleep(300) # Keep for 5 mins
        if os.path.exists(filepath):
            os.remove(filepath)
    
    asyncio.run(delayed_remove())