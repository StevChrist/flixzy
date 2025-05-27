# backend/config.py
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

DB_NAME = "streaming_platform_db"
USERS_COLLECTION_NAME = "users"
MOVIES_COLLECTION_NAME = "movies"
RATINGS_COLLECTION_NAME = "movie_ratings"
POPULARITY_COLLECTION_NAME = "movie_popularity"

FAISS_INDEX_PATH = r"D:\.Portofolio\Coding\Flixzy\flixzy_website\backend\faiss_index.faiss"
FAISS_ID_MAP_PATH = r"D:\.Portofolio\Coding\Flixzy\flixzy_website\backend\faiss_id_map.json"

# OpenAI Model
EMBEDDING_MODEL = "text-embedding-3-small"

# Tambahkan pengecekan apakah API Key sudah ada setelah load_dotenv
if not OPENAI_API_KEY:
    print("PERINGATAN PENTING: OpenAI API Key tidak ditemukan di environment variables atau file .env.")
    print("Fungsi yang menggunakan OpenAI mungkin tidak akan bekerja.")