from app.config import logger
from app.rag.generator import get_llm
from app.rag.retriever import retriever_tool
from app.rag.prompt_builder import PromptBuilder
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

logger.info('==================== RAG CHAIN ====================')

def chain_rag(provider, query, llm_id):

    """
    RAG CHAINE
    """
    llm = get_llm(
        llm_provider=provider,
        model=llm_id)
    agent = create_react_agent(
        model=llm,
        tools = [retriever_tool]
    )
    
    state = {
        "messages":[
            SystemMessage(content=PromptBuilder.SYSTEM_PROMPT),
            HumanMessage(content=query[-1])
        ]
    }

    response = agent.invoke(state)
    messages = response.get("messages", [])

    ai_messages = [msg.content for msg in messages if isinstance(msg, AIMessage)]
    return ai_messages[-1] if ai_messages else None
