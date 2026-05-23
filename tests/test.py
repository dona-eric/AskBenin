import requests
import time

API_KEY = "sk-afri-95e3617529aa47bd93cb722f415439e9"
BASE_URL = "https://build.lewisnote.com/v1"
headers = {"Authorization": f"Bearer {API_KEY}"}

def generate_video(prompt, image_url=None, seconds=12, size="1280x720"):
    """Lance une génération vidéo (text-to-video ou image-to-video)."""
    payload = {
        "model": "sora-2",
        "prompt": prompt,
        "seconds": seconds,
        "size": size,
    }
    if image_url:
        payload["image"] = image_url  # image-to-video uniquement si fournie

    response = requests.post(
        f"{BASE_URL}/videos/generations",
        headers=headers,
        json=payload,
    )

    # Vérification immédiate du statut HTTP
    if not response.ok:
        raise Exception(f"Erreur API ({response.status_code}): {response.text}")

    result = response.json()


    # Vérification que l'ID existe bien dans la réponse
    if "id" not in result:
        raise Exception(f"Réponse inattendue : {result}")

    return result["id"]


def wait_for_video(video_id, timeout=300, interval=5):
    """Attend que la vidéo soit prête, avec un timeout en secondes."""
    clean_id = video_id.removeprefix("video-")
    elapsed = 0
    while elapsed < timeout:
        response = requests.get(
            f"{BASE_URL}/videos/{clean_id}",
            headers=headers,
        )
        if not response.ok:
            raise Exception(f"Erreur statut ({response.status_code}): {response.text}")

        status_data = response.json()
        status = status_data.get("status")
        print(f"[{elapsed}s] Statut : {status}")

        if status == "completed":
            return True
        elif status == "failed":
            raise Exception(f"Génération échouée : {status_data}")

        time.sleep(interval)
        elapsed += interval

    raise TimeoutError(f"Timeout après {timeout}s — vidéo toujours non prête.")


def get_video_url(video_id):
    """Récupère l'URL de téléchargement de la vidéo."""
    response = requests.get(
        f"{BASE_URL}/videos/{video_id}/content",
        headers=headers,
    )
    if not response.ok:
        raise Exception(f"Erreur contenu ({response.status_code}): {response.text}")

    content = response.json()
    return content.get("url")


# ─── EXEMPLE D'UTILISATION ────────────────────────────────────────────────────

# TEXT-TO-VIDEO
video_id = generate_video(
    prompt="A young African man in his mid-20s, wearing round metal-frame glasses and a bold navy blue and yellow African print dashiki shirt, sitting at a modern wooden desk in a warm, sunlit room in West Africa. The room is cozy and intellectual: books stacked beside a laptop, handwritten notes, a cup of coffee steaming nearby. He is deeply focused — eyes scanning a research paper on AI, occasionally switching to VS Code on his screen where Python code is visible. The camera slowly orbits around him tech style, showing his face in concentration, then panning to his screen (neural network diagrams, loss curves), then pulling back to reveal the full scene: a large open window behind him with a view of a vibrant African city at golden hour, warm orange light flooding the room. He pauses, leans back, adjusts his glasses and smiles slightly — a moment of insight. The atmosphere is calm, inspiring, and deeply focused. Tech Action 4K, warm golden tones, shallow depth of field, slow smooth camera movements, ambient African city sounds in the background. Duration: 20 seconds.",
)

# IMAGE-TO-VIDEO (décommentez et fournissez une vraie URL d'image)
# video_id = generate_video(
#     prompt="A young African man in his mid-20s, wearing round metal-frame glasses and a bold navy blue and yellow African print dashiki shirt, sitting at a modern wooden desk in a warm, sunlit room in West Africa. The room is cozy and intellectual: books stacked beside a laptop, handwritten notes, a cup of coffee steaming nearby. He is deeply focused — eyes scanning a research paper on AI, occasionally switching to VS Code on his screen where Python code is visible. The camera slowly orbits around him tech style, showing his face in concentration, then panning to his screen (neural network diagrams, loss curves), then pulling back to reveal the full scene: a large open window behind him with a view of a vibrant African city at golden hour, warm orange light flooding the room. He pauses, leans back, adjusts his glasses and smiles slightly — a moment of insight. The atmosphere is calm, inspiring, and deeply focused. Tech Action 4K, warm golden tones, shallow depth of field, slow smooth camera movements, ambient African city sounds in the background. Duration: 20 seconds.",
#     image_url="https://i.imgur.com/UDNrNgc.jpeg"  # ← URL réelle obligatoire
# )

print(f"Vidéo en cours de génération... ID : {video_id}")
wait_for_video(video_id, timeout=300)

url = get_video_url(video_id)
print(f"✅ Vidéo prête : {url}")