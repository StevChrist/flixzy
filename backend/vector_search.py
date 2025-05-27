# backend/vector_search.py
import faiss
import json
import numpy as np
from typing import List, Any, Optional
import os
import config # Mengimpor dari config.py
from embedding_utils import get_embedding # Mengimpor dari embedding_utils.py

faiss_index = None
faiss_id_to_tmdb_id_map = []

try:
    if os.path.exists(config.FAISS_INDEX_PATH) and os.path.exists(config.FAISS_ID_MAP_PATH):
        faiss_index = faiss.read_index(config.FAISS_INDEX_PATH) #
        with open(config.FAISS_ID_MAP_PATH) as f:
            faiss_id_to_tmdb_id_map = json.load(f) #
        print(f"Berhasil memuat FAISS index ({faiss_index.ntotal if faiss_index else '0'} vektor) dan ID map (vector_search.py).")
    else:
        print("PERINGATAN: File FAISS index atau ID map tidak ditemukan (vector_search.py).")
except Exception as e:
    print(f"Error saat memuat FAISS index atau ID map (vector_search.py): {e}")
    faiss_index = None

def search_similar_movies_faiss(query_text: str, k: int = 10) -> List[Any]: #
    if faiss_index is None or not faiss_id_to_tmdb_id_map:
        print("FAISS index atau map tidak dimuat. Tidak bisa melakukan pencarian similaritas.")
        return []

    query_embedding_list = get_embedding(query_text)
    if query_embedding_list is None:
        return []

    query_embedding_np = np.array([query_embedding_list]).astype('float32') #

    try:
        distances, indices = faiss_index.search(query_embedding_np, k) #
        tmdb_ids = []
        for i in range(len(indices[0])):
            faiss_id = indices[0][i]
            if faiss_id != -1 and faiss_id < len(faiss_id_to_tmdb_id_map):
                tmdb_ids.append(faiss_id_to_tmdb_id_map[int(faiss_id)])
        return tmdb_ids
    except Exception as e:
        print(f"Error saat melakukan search di FAISS (vector_search.py): {e}")
        return []