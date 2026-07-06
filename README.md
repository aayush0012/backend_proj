# 🚗 Go Route

Go Route is a full-stack route optimization platform that enables users to manage city networks, define road connections, and compute the shortest path between two locations using **Dijkstra's Algorithm**. The application features secure JWT-based authentication and provides an intuitive interface for managing transportation networks.

## 🌐 Live Demo

**Live:** https://backend-proj-blue.vercel.app/

## 📂 GitHub Repository

https://github.com/aayush0012/backend_proj

---

# Features

- User Registration & Login
- JWT-based Authentication
- Protected API Routes
- Manage Cities (CRUD)
- Manage Roads (CRUD)
- Compute Shortest Path using Dijkstra's Algorithm
- Responsive React Frontend
- RESTful FastAPI Backend
- PostgreSQL Database Integration
- Cloud Deployment using Render, Neon PostgreSQL, and Vercel

---

# Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Pydantic

## Database

- PostgreSQL
- Neon PostgreSQL

## Deployment

- Render
- Vercel

---

# Project Architecture

```
React Frontend
        │
        ▼
     Axios API
        │
        ▼
 FastAPI Backend
        │
        ▼
 SQLAlchemy ORM
        │
        ▼
 PostgreSQL Database
        │
        ▼
 Graph Construction
        │
        ▼
 Dijkstra's Algorithm
```

---

# Folder Structure

```
backend/
│
├── app/
│   ├── api/
│   ├── database/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── main.py
│
├── requirements.txt
└── Dockerfile

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
├── package.json
└── vite.config.js
```

---

# Authentication

The application uses **JWT (JSON Web Tokens)** for secure authentication.

- User Registration
- Password Hashing
- Login Authentication
- Token Generation
- Protected Endpoints

---

# Route Optimization

Go Route models the transportation network as a **weighted graph**.

Each:

- City → Vertex
- Road → Weighted Edge

The shortest route is computed using **Dijkstra's Algorithm**, which guarantees the minimum distance between two connected cities.

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/register` |
| POST | `/login` |

## Cities

| Method | Endpoint |
|---------|----------|
| GET | `/cities/` |
| POST | `/cities/` |
| DELETE | `/cities/{id}` |

## Roads

| Method | Endpoint |
|---------|----------|
| GET | `/roads/` |
| POST | `/roads/` |
| DELETE | `/roads/{id}` |

## Route

| Method | Endpoint |
|---------|----------|
| POST | `/route/` |

---

# Running Locally

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Deployment

Frontend

- Vercel

Backend

- Render

Database

- Neon PostgreSQL

---

# Future Enhancements

- Minimum Stops Routing (BFS)
- Road Closure Support
- Traffic-Based Edge Weights
- Route History
- Interactive Map Integration
- Multiple Route Suggestions

---

# Author

**Aayush Bhatt**

GitHub:
https://github.com/aayush0012

LinkedIn:
https://www.linkedin.com/in/aayush-bhatt-3657b1314/

---

If you found this project interesting, feel free to ⭐ the repository.
