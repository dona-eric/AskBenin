from groq import Groq
from app.config import GROQ_API_KEY



def text_to_audio(text_input):

    client = Groq(api_key = GROQ_API_KEY)
    try:
        temp_path = "audio.mp3"
        reponse_audio = client.audio.speech.create(
            model=,
            voice="troy",
            input = text_input,
            response_format="mp3"
        ) 