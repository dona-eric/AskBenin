HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/119.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "fr-FR,fr;q=0.9",
}
 
# Mots-clés → domaine  (ordre : du plus spécifique au plus général)
DOMAINE_KEYWORDS: dict[str, list[str]] = {
    "sante":         ["santé", "hôpital", "médecin", "maladie", "vaccin", "soins",
                      "paludisme", "maternité", "pharmacie", "épidémie"],
    "education":     ["école", "université", "bac", "bepc", "cep", "élève", "étudiant",
                      "enseignement", "formation", "alphabétisation", "scolarisation"],
    "agriculture":   ["agriculture", "agriculteur", "récolte", "coton", "anacarde",
                      "élevage", "pêche", "semence", "fertilisant", "rural"],
    "economie":      ["économie", "pib", "croissance", "inflation", "chômage",
                      "commerce", "exportation", "importation", "bceao", "fmi"],
    "finance":       ["finance", "budget", "impôt", "taxe", "banque", "crédit",
                      "microfinance", "dette", "fiscalité", "recette"],
    "politique":     ["politique", "gouvernement", "président", "ministre", "parlement",
                      "assemblée", "loi", "décret", "élection", "démocratie"],
    "numerique":     ["numérique", "digital", "internet", "technologie", "télécoms",
                      "mtn", "moov", "fibre", "4g", "réseau"],
    "startup":       ["startup", "entrepreneuriat", "incubateur", "innovation",
                      "fintech", "agritech", "sème city", "hubic", "investisseur"],
    "tourisme":      ["tourisme", "voyager", "patrimoine", "ouidah", "abomey",
                      "pendjari", "beach", "hôtel", "visa", "attraction"],
    "culture":       ["culture", "art", "musique", "danse", "tradition", "vaudou",
                      "fête", "festival", "artisan", "langue", "fon", "yoruba"],
    "statistiques":  ["statistique", "données", "chiffre", "insae", "recensement",
                      "population", "taux", "indicateur", "rapport", "enquête"],
    "investissement":["investissement", "apiex", "zone franche", "projet", "capital",
                      "ppp", "concession", "infrastructure", "fonds"],
    "environnement": ["environnement", "climat", "déforestation", "pollution",
                      "énergie", "solaire", "eau", "assainissement", "déchets"],
    "sécurité":      ["sécurité", "police", "armée", "terrorisme", "nord bénin",
                      "frontière", "criminalité", "gendarmerie"],
}
 
# Sources de fallback par domaine
FALLBACK_URLS: dict[str, list[str]] = {
    "sante":         ["https://sante.gouv.bj/", "https://www.afro.who.int/fr/countries/benin"],
    "education":     ["https://mestfp.gouv.bj/", "https://enseignementsecondaire.gouv.bj/"],
    "agriculture":   ["https://maep.gouv.bj/", "https://www.fao.org/benin/fr/"],
    "economie":      ["https://finances.gouv.bj/", "https://www.bceao.int/"],
    "finance":       ["https://finances.gouv.bj/", "https://opendata.budgetbenin.bj/"],
    "politique":     ["https://gouv.bj/", "https://www.presidence.bj/"],
    "numerique":     ["https://www.anpt.bj/", "https://semecity.bj/"],
    "startup":       ["https://semecity.bj/", "https://www.cipme.bj/"],
    "tourisme":      ["https://tourisme.gouv.bj/", "https://www.benintourisme.com/"],
    "culture":       ["https://culture.gouv.bj/"],
    "statistiques":  ["https://insae-bj.org/", "https://www.data.gouv.bj/"],
    "investissement":["https://apiex.bj/", "https://invest.gouv.bj/"],
    "environnement": ["https://environnement.gouv.bj/"],
    "sécurité":      ["https://interieur.gouv.bj/"],
}
 
 
# ══════════════════════════════════════════════════════════════
# 1.  DÉTECTEUR DE DOMAINE
# ══════════════════════════════════════════════════════════════
 
def detect_domaine(query: str) -> str:
    """
    Détecte le domaine de la query par correspondance de mots-clés.
    Retourne 'general' si aucun domaine précis n'est identifié.
    """
    q = query.lower()
    scores: dict[str, int] = {}
    for domaine, keywords in DOMAINE_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in q)
        if score:
            scores[domaine] = score
    if not scores:
        return "general"
    return max(scores, key=scores.get)
 
 
def detect_langue(query: str) -> str:
    """Détection basique de la langue de la query."""
    french_markers = ["le", "la", "les", "un", "une", "des", "est", "sont",
                      "comment", "qu'est", "quels", "quelle", "combien"]
    q_words = query.lower().split()
    if any(w in french_markers for w in q_words):
        return "fr"
    return "en"