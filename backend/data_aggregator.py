# backend/data_aggregator.py
from typing import List, Dict, Any
import pandas as pd # Jika Anda masih ingin output sebagai DataFrame untuk pengujian lokal
from db_connector import get_db_collections # Mengimpor dari db_connector.py
from vector_search import search_similar_movies_faiss # Mengimpor dari vector_search.py

collections = get_db_collections()
movies_collection = collections["movies"]
ratings_collection = collections["ratings"]
popularity_collection = collections["popularity"]
db_instance = collections["db_instance"]

def get_movie_details_by_tmdb_ids(tmdb_ids: List[Any]) -> List[Dict[str, Any]]: #
    if movies_collection is None:
        print("Koneksi ke movies_collection MongoDB tidak tersedia.")
        return []
    if not tmdb_ids:
        return []
    try:
        processed_tmdb_ids = [int(tid) for tid in tmdb_ids]
    except ValueError:
        print(f"Error: TMDB ID dalam list tmdb_ids tidak semuanya bisa diubah ke integer: {tmdb_ids}")
        return []
    
    found_movies = list(movies_collection.find({"tmdb_id": {"$in": processed_tmdb_ids}}))
    # Hapus field _id dari MongoDB
    for doc in found_movies:
        if "_id" in doc:
            del doc["_id"]
    return found_movies


def hybrid_search_logic(query_input: str, num_results: int = 10) -> List[Dict[str, Any]]:
    if not query_input:
        print("Query input diperlukan untuk hybrid_search.")
        return []
    if db_instance is None:
        print("Koneksi database tidak tersedia untuk hybrid_search.")
        return []

    similar_tmdb_ids = search_similar_movies_faiss(query_input, k=num_results)
    if not similar_tmdb_ids:
        print(f"Tidak ada film serupa yang ditemukan untuk query: {query_input}")
        return []

    movie_docs_list = get_movie_details_by_tmdb_ids(similar_tmdb_ids)
    queryable_tmdb_ids = [m.get("tmdb_id") for m in movie_docs_list if m.get("tmdb_id") is not None]

    ratings_map = {}
    if ratings_collection is not None and queryable_tmdb_ids:
        ratings_cursor = ratings_collection.find({"tmdb_id": {"$in": queryable_tmdb_ids}}, {"_id": 0})
        ratings_map = {doc["tmdb_id"]: doc.get("avg_rating") for doc in ratings_cursor}

    popularity_map = {}
    if popularity_collection is not None and queryable_tmdb_ids:
        popularity_cursor = popularity_collection.find({"tmdb_id": {"$in": queryable_tmdb_ids}}, {"_id": 0})
        popularity_map = {doc["tmdb_id"]: doc.get("popularity") for doc in popularity_cursor}

    # enriched_movie_docs = []
    # for movie_doc in movie_docs_list:
    #     tmdb_id = movie_doc.get("tmdb_id")
    #     if tmdb_id is not None:
    #         movie_doc["avg_rating"] = ratings_map.get(tmdb_id)
    #         movie_doc["popularity"] = popularity_map.get(tmdb_id)
    #     # Tambahkan kolom movie_videos berdasarkan judul
    #     title = movie_doc.get("title")
    #     movie_doc["movie_videos"] = video_links.get(title, "")
    #     enriched_movie_docs.append(movie_doc)

    #-----------------------------------------------------
    enriched_movie_docs = []
    for movie_doc in movie_docs_list:
        tmdb_id = movie_doc.get("tmdb_id")
        if tmdb_id is not None:
            movie_doc["avg_rating"] = ratings_map.get(tmdb_id)
            movie_doc["popularity"] = popularity_map.get(tmdb_id)

        # Tambahkan kolom movie_videos jika judul cocok
        title = movie_doc.get("title", "")
        if title == "Iron Man":
            movie_doc["movie_video"] = "https://youtu.be/8ugaeA-nMTc?si=w9v-bpZMsZcMuW7D"
        elif title == "Iron Man 2":
            movie_doc["movie_video"] = "https://youtu.be/BoohRoVA9WQ?si=AqiRRYo5oGy4vkX_"
        elif title == "The Invincible Iron Man":
            movie_doc["movie_video"] = "https://youtu.be/n1JX0iPJze0?si=7BSKADc2NHL6Ddj0"
        elif title == "The Avengers":
            movie_doc["movie_video"] = "https://youtu.be/eOrNdBpGMv8?si=iSg6yRnB7j6dB7Kc"
        elif title == "Iron Man 3":
            movie_doc["movie_video"] = "https://youtu.be/Ke1Y3P9D0Bc?si=3YV9de5cNrkrcanO"
        elif title == "Avengers: Age of Ultron":
            movie_doc["movie_video"] = "https://youtu.be/JAUoeqvedMo?si=f5ZWIHTIcrpF3qU7"
        elif title == "Iron Man: Rise of Technovore":
            movie_doc["movie_video"] = "https://youtu.be/toqQI3_eX8o?si=XjgJtKrTk1F9eTqY"
        elif title == "Iron Man & Hulk: Heroes United":
            movie_doc["movie_video"] = "https://youtu.be/OOB8iSP6gJM?si=7_NklXHgbV0J2G_X"
        elif title == "Iron Man & Captain America: Heroes United":
            movie_doc["movie_video"] = "https://youtu.be/ROZD5uEmhpc?si=cfKVo_isSfrqdI9M"
        else:
            movie_doc["movie_video"] = ""  # default kosong jika tidak cocok

        enriched_movie_docs.append(movie_doc)

    #-----------------------------------------------------

    return enriched_movie_docs

# Jika Anda ingin mengembalikan DataFrame untuk pengujian lokal seperti di notebook:
def hybrid_search_local_test(query_input: str, num_results: int = 10) -> pd.DataFrame:
    results_list = hybrid_search_logic(query_input, num_results)
    return pd.DataFrame(results_list)