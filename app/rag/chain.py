from app.config import logger
from app.rag.generator import get_llm
from app.tools.tool_retriever import retriever_tool, web_search_tool
from app.rag.prompt_builder import PromptBuilder
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from app.ingestion.detector import detect_domaine, detect_langue

logger.info('==================== RAG CHAIN ====================')

def chain_rag(provider, query, llm_id):
    """
    Chaine RAG améliorée utilisant LangGraph.
    Intègre la détection automatique de domaine et l'utilisation intelligente des outils.
    """
    llm = get_llm(
        llm_provider=provider,
        model=llm_id)

    if llm is None:
        return "Désolé, le modèle demandé n'est pas disponible actuellement."

    tools = [retriever_tool, web_search_tool]

    # On utilise create_react_agent qui est la base de LangGraph pour les agents outils
    agent = create_react_agent(
        model=llm,
        tools=tools
    )
    
    # Préparation de l'entrée
    human_query = query[-1] if isinstance(query, list) else query
    domaine = detect_domaine(human_query)
    langue = detect_langue(human_query)

    logger.info(f"Requête RAG: domaine={domaine}, langue={langue}")

    # Prompt système enrichi
    system_message = f"""Tu es AskBenin, l'assistant expert sur le Bénin.
Tu fournis des informations précises sur tous les domaines : santé, éducation, culture, politique, etc.

RÈGLES :
1. Utilise 'retriever_tool' en PREMIER pour chercher dans la base locale.
2. Si la réponse est absente ou insuffisante, utilise 'web_search_tool'.
3. Cite TOUJOURS tes sources (URLs ou noms de documents).
4. Réponds en {langue} car l'utilisateur a posé sa question dans cette langue.
5. Domaine détecté pour cette requête : {domaine}.
"""

    state = {
        "messages": [
            SystemMessage(content=system_message),
            HumanMessage(content=human_query)
        ]
    }

    try:
        response = agent.invoke(state)
        messages = response.get("messages", [])

        # Le dernier message de l'agent est la réponse finale
        ai_messages = [msg.content for msg in messages if isinstance(msg, AIMessage) and not msg.tool_calls]
        return ai_messages[-1] if ai_messages else "Je n'ai pas pu générer de réponse."
    except Exception as e:
        logger.error(f"Erreur lors de l'exécution de l'agent: {e}")
        return "Une erreur technique est survenue lors du traitement de votre demande."
