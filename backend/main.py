from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
import ast

# Impor modul-modul logika Anda
import config
from db_connector import db, get_db_collections, close_db_connection
from vector_search import search_similar_movies_faiss, faiss_index, faiss_id_to_tmdb_id_map
from data_aggregator import hybrid_search_logic

app = FastAPI(
    title="Flixzy Backend API",
    description="API for Flixzy movie streaming platform with MongoDB, FAISS, and OpenAI.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ganti sesuai domain frontend Anda
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MovieDetail(BaseModel):
    tmdb_id: Any
    title: Optional[str] = None
    overview: Optional[str] = None
    genres: Optional[List[str]] = None
    release_date: Optional[str] = None
    runtime: Optional[float] = None
    vote_average: Optional[float] = None
    vote_count: Optional[float] = None
    poster_path: Optional[str] = None
    director: Optional[str] = None
    cast: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    avg_rating: Optional[float] = None
    popularity: Optional[float] = None
    movie_video: Optional[str] = None  # Menambahkan field movie_video

    class Config:
        from_attributes = True

class HybridSearchResponse(BaseModel):
    query: str
    results: List[MovieDetail]
    message: Optional[str] = None

class HybridSearchRequest(BaseModel):
    query: str
    num_results: int = 10

if db is None:
    print("PERINGATAN: Koneksi ke MongoDB gagal saat startup. API mungkin tidak berfungsi.")
if faiss_index is None:
    print("PERINGATAN: FAISS Index tidak termuat saat startup. Pencarian similaritas mungkin tidak berfungsi.")

@app.on_event("shutdown")
def shutdown_event():
    close_db_connection()

@app.get("/")
async def read_root():
    return {"message": "Welcome to Flixzy Backend API! FAISS and MongoDB connections attempted."}

def ensure_list(val):
    if isinstance(val, list):
        return val
    if isinstance(val, str):
        try:
            parsed = ast.literal_eval(val)
            if isinstance(parsed, list):
                return parsed
        except Exception:
            pass
    return []

@app.post("/search/hybrid", response_model=HybridSearchResponse)
async def hybrid_search_endpoint(
    body: HybridSearchRequest = Body(...)
):
    query = body.query
    num_results = body.num_results

    if db is None or faiss_index is None:
        raise HTTPException(status_code=503, detail="Layanan database atau FAISS index tidak tersedia.")

    try:
        results_list_of_dicts = hybrid_search_logic(query, num_results=num_results)
        pydantic_results = []
        for res_dict in results_list_of_dicts:
            if "_id" in res_dict:
                del res_dict["_id"]
            # Pastikan field list benar-benar list
            for field in ['genres', 'cast', 'keywords']:
                if field in res_dict:
                    res_dict[field] = ensure_list(res_dict[field])
            pydantic_results.append(MovieDetail(**res_dict))
        return HybridSearchResponse(query=query, results=pydantic_results, message="Hybrid search completed.")
    except Exception as e:
        print(f"Error di hybrid_search_endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan internal: {str(e)}")