## Flixzy

Flixzy is a project aimed at building a modern movie streaming platform prototype with advanced search and recommendation capabilities. It leverages a multimodal database system, combining document and vector databases, to provide a rich user experience.

## 🌟 Core Objectives

The primary goal of this project is to develop a robust system that utilizes two distinct NoSQL databases to handle different types of movie-related data. These databases' strengths are then combined through an intelligent query aggregator system to offer nuanced search and recommendation features.

## 🛠️ System Components & Architecture

The platform is designed with a decoupled frontend and backend:

### 1. Frontend
* **Technology:** Next.js (React framework)
* **Responsibilities:**
    * User Interface (UI) and User Experience (UX).
    * Client-side interactions and state management.
    * Making API calls to the Python backend for data and search functionalities.
    * Page transitions and element animations for a modern feel.

### 2. Backend
* **Technology:** Python with FastAPI framework.
* **Responsibilities:**
    * Providing API endpoints for the frontend.
    * Interacting with the databases (MongoDB for document data, FAISS for local vector search).
    * Handling core business logic, including a **Query Aggregator**.
    * User authentication and profile management (future scope).
    * Generating embeddings for movie data using OpenAI.

### 3. Databases (Local Setup)
* **DB1 (Vector Database - Local FAISS):**
    * **Purpose:** Stores vector embeddings of movies derived from textual content like plots (overview), titles, genres, and key cast/crew information.
    * **Benefit:** Enables semantic search and content-based recommendations, allowing users to find movies that are "similar" in meaning or style.
    * **Local Implementation:** Uses a FAISS index (`faiss_index.faiss`) and an ID map (`faiss_id_map.json`) loaded locally.
* **DB2 (Document Database - Local MongoDB):**
    * **Purpose:** Stores user-centric data (future scope) and structured movie metadata (title, release year, duration, genres, cast, director, ratings, popularity) for quick lookups and filtering.
    * **Benefit:** Facilitates personalized recommendations (future scope) and efficient retrieval of specific movie details.
    * **Local Implementation:** MongoDB Community Server running on `localhost:27017`, with a database named `streaming_platform_db` and collections like `movies`, `users`, `movie_ratings`, and `movie_popularity`.

### 4. Query Aggregator (Backend Logic)
* **Purpose:** An intelligent layer in the backend that receives complex queries.
* **Process:** Intelligently distributes parts of a query to the appropriate database (MongoDB for metadata, FAISS for similarity), combines the results, and presents a comprehensive, unified answer.
* **Benefit:** Enables rich, nuanced search capabilities that can combine content similarity with structured metadata.

## 📊 Datasets Used
* **MovieLens 20M Dataset:** Provides user ratings and MovieLens movie IDs. The `links.csv` file is crucial for bridging MovieLens IDs to TMDB IDs.
* **"The Movies Dataset" (from Kaggle):** Provides rich movie content like plot summaries (overview), genres, cast, and crew, linked by TMDB IDs.
* **Identifier Unification:** MovieLens movieIds are converted to TMDB IDs using `links.csv` for data consistency.

## 🚀 Running the Project Locally

## 🌟 This Project made by Steven Immanuel C Girsang , Muhammad Aqil Ghazali Anhein , Bima Harish Mazaya 🌟
---