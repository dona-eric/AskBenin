"""
askbeinn_agent.py
─────────────────────────────────────────────────────────────
Agent principal Askbeinn (Refondu avec LangGraph).
 
Flux :
  1. Détection automatique du domaine + langue
  2. retriever_tool  →  cherche dans Qdrant (base locale)
  3. Si vide → web_search_tool → Tavily deep search
                              → scraping direct (fallback)
                              → inject dans Qdrant
                              → re-query Qdrant
  4. LLM synthétise la réponse finale
 
Stack : LangGraph · LangChain · Qdrant · HuggingFace · OpenAI Afri · Tavily
"""
 
import re
from typing import Optional
from app.config import (
    logger,
    OPENAI_API_KEY
) 
from app.ingestion.detector import detect_domaine, detect_langue
from app.tools.tool_retriever import retriever_tool, web_search_tool
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver

# ══════════════════════════════════════════════════════════════
# PROMPT SYSTÈME
# ══════════════════════════════════════════════════════════════
 
SYSTEM_PROMPT = """Tu es AskBenin, l'assistant expert sur le Bénin.
Tu fournis des informations précises, fiables et actualisées sur tous les domaines :
santé, éducation, agriculture, économie, finance, politique, gouvernance,
numérique, startups, innovation, tourisme, culture, environnement,
statistiques, budget, investissement et sécurité.
 
Tes utilisateurs sont : citoyens béninois, diaspora, investisseurs, chercheurs, touristes.
 
RÈGLES STRICTES :
1. Utilise TOUJOURS `retriever_tool` EN PREMIER pour chercher dans la base locale.
2. Si `retriever_tool` retourne "AUCUN_RÉSULTAT" ou une réponse insuffisante,
   utilise IMMÉDIATEMENT `web_search_tool` pour chercher sur le web.
3. Ne réponds JAMAIS de mémoire sans avoir utilisé au moins un outil.
4. Cite toujours tes sources (URL) à la fin de ta réponse.
5. Si la question est en français → réponds en français.
   Si la question est en anglais → réponds en anglais.
6. Sois précis, structuré et adapte ton niveau de langage à l'utilisateur.
7. Pour les données chiffrées, mentionne toujours l'année de référence.
 
Format de réponse :
- Réponse claire et structurée
- Données clés mises en avant
- Sources citées en fin de réponse
"""
 
# ══════════════════════════════════════════════════════════════
# CONSTRUCTION DU GRAPHE LANGGRAPH
# ══════════════════════════════════════════════════════════════

# Mémoire globale en mémoire vive pour sauvegarder l'état des threads (sessions)
memory = MemorySaver()

def build_agent():
    """
    Construit et retourne le graphe compilé Askbeinn.
    """
    llm = ChatOpenAI(
        model="gpt-5.4",
        base_url="https://build.lewisnote.com/v1",
        api_key=OPENAI_API_KEY,
        temperature=0.2,  
        streaming=True,
    )
 
    tools = [retriever_tool, web_search_tool]
    llm_with_tools = llm.bind_tools(tools)
 
    def call_model(state: MessagesState):
        messages = state["messages"]
        sys_msg = SystemMessage(content=SYSTEM_PROMPT)
        
        # S'assurer que le prompt système est au début
        if messages and isinstance(messages[0], SystemMessage):
            msgs = messages
        else:
            msgs = [sys_msg] + messages
            
        response = llm_with_tools.invoke(msgs)
        return {"messages": [response]}
        
    # Création du graphe d'états
    graph_builder = StateGraph(MessagesState)
    
    # Nœud LLM
    graph_builder.add_node("agent", call_model)
    
    # Nœud Outils
    tool_node = ToolNode(tools)
    graph_builder.add_node("tools", tool_node)
    
    # Arêtes
    graph_builder.add_edge(START, "agent")
    
    # Arête conditionnelle : si l'agent appelle un outil, aller à 'tools', sinon s'arrêter
    graph_builder.add_conditional_edges(
        "agent", 
        tools_condition, 
        {"tools": "tools", END: END}
    )
    
    # Après les outils, retourner à l'agent
    graph_builder.add_edge("tools", "agent")
    
    # Compilation avec le gestionnaire de mémoire
    compiled_graph = graph_builder.compile(checkpointer=memory)
    
    logger.info("[Askbeinn] Agent LangGraph initialisé")
    return compiled_graph
 
 
# ══════════════════════════════════════════════════════════════
# CLASSE PRINCIPALE (interface propre pour FastAPI / CLI)
# ══════════════════════════════════════════════════════════════
 
class AskbeninAgent:
    """
    Interface de haut niveau autour du StateGraph LangGraph.
 
    Usage :
        agent = AskbeninAgent()
        response = agent.ask("Combien d'écoles primaires au Bénin en 2023 ?", session_id="user_123")
        print(response["answer"])
    """
 
    def __init__(self):
        self._graph = build_agent()
 
    def ask(
        self,
        question: str,
        session_id: Optional[str] = None,
    ) -> dict:
        """
        Pose une question à l'agent et retourne la réponse structurée.
        """
        domaine = detect_domaine(question)
        langue = detect_langue(question)
 
        logger.info(f"[Ask] '{question}' | domaine={domaine} | langue={langue} | session={session_id}")
        
        thread_id = session_id or "default_session"
        config = {"configurable": {"thread_id": thread_id}}
 
        try:
            # Invocation du graphe d'états
            result = self._graph.invoke(
                {"messages": [HumanMessage(content=question)]},
                config=config
            )
            
            # Le dernier message est la réponse finale du modèle
            messages = result.get("messages", [])
            answer = messages[-1].content if messages else ""
 
            # Extraction basique des sources mentionnées dans la réponse
            sources = re.findall(r"https?://[^\s\]]+", answer)
 
            return {
                "answer":  answer,
                "domaine": domaine,
                "langue":  langue,
                "sources": list(dict.fromkeys(sources)),  # dédupliqué
            }
 
        except Exception as e:
            logger.error(f"[Ask] Erreur agent: {e}")
            return {
                "answer":  "Une erreur est survenue. Veuillez reformuler votre question.",
                "domaine": domaine,
                "langue":  langue,
                "sources": [],
            }
 
    def reset_history(self, session_id: str) -> None:
        """
        Réinitialise l'historique d'une conversation.
        Dans LangGraph, avec MemorySaver, on ne peut pas supprimer un thread facilement,
        mais on peut le réinitialiser en envoyant un état vide si nécessaire, 
        ou simplement l'ignorer. Ici, la méthode est gardée pour compatibilité.
        """
        logger.info(f"[Ask] Reset history ignoré pour LangGraph (thread_id: {session_id}). Un nouveau thread_id crée une nouvelle session.")