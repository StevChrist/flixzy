# backend/embedding_utils.py
import openai
from typing import List, Optional
import config # Mengimpor dari config.py

if config.OPENAI_API_KEY == "YOUR_OPENAI_API_KEY_HERE_CONFIG" or not config.OPENAI_API_KEY:
    print("PERINGATAN: OpenAI API Key belum diatur di config.py. Fungsi embedding tidak akan bekerja.")
else:
    openai.api_key = config.OPENAI_API_KEY

def get_embedding(text: str) -> Optional[List[float]]: #
    if not openai.api_key or openai.api_key == "YOUR_OPENAI_API_KEY_HERE_CONFIG":
        print("OpenAI API Key tidak dikonfigurasi.")
        return None
    try:
        text = text.replace("\n", " ")
        response = openai.embeddings.create(
            input=[text],
            model=config.EMBEDDING_MODEL
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"Error generating embedding: {e}")
        return None