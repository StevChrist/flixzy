# backend/main_local_runner.py
from data_aggregator import hybrid_search_logic, hybrid_search_local_test
from db_connector import close_db_connection # Penting untuk menutup koneksi
import pandas as pd

if __name__ == "__main__":
    print("Menjalankan tes pencarian hybrid lokal...")
    
    # Contoh penggunaan hybrid_search_logic (mengembalikan list of dicts)
    query = "iron man"
    results_list = hybrid_search_logic(query, num_results=5)
    if results_list:
        print(f"\n--- Hasil Pencarian (List of Dicts) untuk '{query}' ---")
        for idx, movie in enumerate(results_list):
            print(f"Hasil {idx + 1}: Judul: {movie.get('title')}, Rating: {movie.get('avg_rating')}, Popularitas: {movie.get('popularity')}")
    else:
        print(f"Tidak ada hasil ditemukan untuk '{query}'.")

    print("\n" + "="*50 + "\n")

    # Contoh penggunaan hybrid_search_local_test (mengembalikan DataFrame)
    query_df = "action packed movie"
    results_df = hybrid_search_local_test(query_df, num_results=3)
    if not results_df.empty:
        print(f"--- Hasil Pencarian (DataFrame) untuk '{query_df}' ---")
        pd.set_option('display.max_columns', None) # Tampilkan semua kolom
        pd.set_option('display.width', 1000) # Lebar tampilan
        print(results_df[['title', 'genres', 'overview', 'avg_rating', 'popularity']])
    else:
        print(f"Tidak ada hasil ditemukan untuk '{query_df}'.")
    
    # Penting untuk menutup koneksi MongoDB setelah selesai
    close_db_connection()