from pydantic import BaseModel
from typing import List



class RequestState(BaseModel):
    model_name: str
    messages: List
    provider: str


class AudioRequestState(BaseModel):
    question_text: str
    response_text: str
    audio_url: str