from app.config import logger
from app.rag.generator import get_llm
from app.tools.tool_retriever import retriever_tool
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
    
    # query peut être une liste de messages ou une chaîne brute
    human_query = query[-1] if isinstance(query, list) else query

    # On récupère quelques documents pour le contexte
    from app.rag.retriever import qdrant_search
    docs = qdrant_search(human_query)

    prompt = PromptBuilder.build_prompt(human_query, docs)

    state = {
        "messages":[
            SystemMessage(content=prompt),
            HumanMessage(content=human_query)
        ]
    }

    response = agent.invoke(state)
    messages = response.get("messages", [])

    ai_messages = [msg.content for msg in messages if isinstance(msg, AIMessage)]
    return ai_messages[-1] if ai_messages else None
