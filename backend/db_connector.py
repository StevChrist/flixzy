# backend/db_connector.py
from pymongo import MongoClient, errors as pymongo_errors
import config # Mengimpor dari config.py

client = None
db = None
users_collection = None
movies_collection = None
ratings_collection = None
popularity_collection = None

try:
    client = MongoClient(config.MONGO_URI)
    client.admin.command('ping') # Cek koneksi
    db = client[config.DB_NAME]
    users_collection = db[config.USERS_COLLECTION_NAME]
    movies_collection = db[config.MOVIES_COLLECTION_NAME]
    ratings_collection = db[config.RATINGS_COLLECTION_NAME]
    popularity_collection = db[config.POPULARITY_COLLECTION_NAME]
    print("Berhasil terhubung ke MongoDB (db_connector.py).")
except pymongo_errors.ConnectionFailure as e:
    print(f"Gagal terhubung ke MongoDB (db_connector.py): {e}")
except Exception as e:
    print(f"Error lain saat inisialisasi MongoDB (db_connector.py): {e}")

def get_db_collections():
    return {
        "users": users_collection,
        "movies": movies_collection,
        "ratings": ratings_collection,
        "popularity": popularity_collection,
        "db_instance": db # Jika perlu akses langsung ke instance db
    }

def close_db_connection():
    if client:
        client.close()
        print("Koneksi MongoDB ditutup.")