"""
askbeinn_agent.py
─────────────────────────────────────────────────────────────
Agent principal Askbeinn.
 
Flux :
  1. Détection automatique du domaine + langue
  2. retriever_tool  →  cherche dans Qdrant (base locale)
  3. Si vide → web_search_tool → Tavily deep search
                              → scraping direct (fallback)
                              → inject dans Qdrant
                              → re-query Qdrant
  4. LLM synthétise la réponse finale
 
Stack : LangChain · Qdrant · HuggingFace · OpenAI Afri · Tavily
"""
 
import re
import os
from typing import Optional
from app.config import (
    logger,
    OPENAI_API_KEY
) 
from app.ingestion.detector import detect_domaine, detect_langue
from app.tools.tool_retriever import retriever_tool, web_search_tool
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain_classic.agents import AgentExecutor
from langchain_classic.agents import create_tool_calling_agent
from langchain_openai import ChatOpenAI
 


# ══════════════════════════════════════════════════════════════
# 5.  PROMPT SYSTÈME
# ══════════════════════════════════════════════════════════════
 
SYSTEM_PROMPT = """Tu es Askbeinn, l'assistant expert sur le Bénin.
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
# 6.  CONSTRUCTION DE L'AGENT
# ══════════════════════════════════════════════════════════════
 
def build_agent() -> AgentExecutor:
    """
    Construit et retourne l'AgentExecutor Askbeinn.
    À appeler une seule fois au démarrage (ex: dans main.py ou lifespan FastAPI).
    """
    # LLM principal — OpenAI Afri (compatible OpenAI SDK)
    llm = ChatOpenAI(
        model="gpt-5.4",
        base_url="https://build.lewisnote.com/v1",               # remplacer par le modèle Afri exact
        api_key=OPENAI_API_KEY,
        temperature=0.2,  
        streaming=True,
    )
 
    tools = [retriever_tool, web_search_tool]
 
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        MessagesPlaceholder("chat_history", optional=True),
        ("human", "{input}"),
        MessagesPlaceholder("agent_scratchpad"),
    ])
 
    agent = create_tool_calling_agent(llm=llm, tools=tools, prompt=prompt)
 
    executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,                     # logs des étapes (désactiver en prod)
        max_iterations=5,                 # évite les boucles infinies
        handle_parsing_errors=True,
        return_intermediate_steps=False,
    )
 
    logger.info("[Askbeinn] Agent initialisé")
    return executor
 
 
# ══════════════════════════════════════════════════════════════
# 7.  CLASSE PRINCIPALE  (interface propre pour FastAPI / CLI)
# ══════════════════════════════════════════════════════════════
 
class AskbeninAgent:
    """
    Interface de haut niveau autour de l'AgentExecutor.
 
    Usage :
        agent = AskbeninAgent()
        response = agent.ask("Combien d'écoles primaires au Bénin en 2023 ?")
        print(response["answer"])
    """
 
    def __init__(self):
        self._executor = build_agent()
        self._history: list[dict] = []          # historique de session
 
    def ask(
        self,
        question: str,
        session_id: Optional[str] = None,
    ) -> dict:
        """
        Pose une question à l'agent et retourne la réponse structurée.
 
        Returns:
            {
                "answer": str,
                "domaine": str,
                "langue": str,
                "sources": list[str],
            }
        """
        domaine = detect_domaine(question)
        langue = detect_langue(question)
 
        logger.info(f"[Ask] '{question}' | domaine={domaine} | langue={langue}")
 
        try:
            result = self._executor.invoke({
                "input": question,
                "chat_history": self._history,
            })
            answer = result.get("output", "")
 
            # Mise à jour de l'historique de conversation
            self._history.append(HumanMessage(content=question))
            self._history.append(AIMessage(content=answer))
 
            # Garde les 10 derniers échanges en mémoire
            if len(self._history) > 20:
                self._history = self._history[-20:]
 
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
 
    def reset_history(self) -> None:
        """Réinitialise l'historique de conversation."""
        self._history = []
        logger.info("[Ask] Historique réinitialisé.")
 
 