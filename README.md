# 🚀 Automated Project Management Tool

A modern and scalable **monorepo** project built with **Next.js (TypeScript)** for the frontend and **FastAPI (Python)** for the backend.  
This tool aims to streamline project management tasks — planning, tracking, collaboration, and reporting — all in one place.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js (TypeScript) |
| Backend | FastAPI (Python 3.10+) |
| Database | PostgreSQL |
| Package Manager | npm / pip |
| API Communication | REST |
| Deployment | Docker & Docker Compose |

---

## 🗂️ Monorepo Structure

```
automated-project-management-tool/
│
├── frontend/                  # Next.js app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── styles/
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── backend/                   # FastAPI app
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml         # Combined services (frontend, backend, db)
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Guide

### 🪟 For Windows

#### 1️⃣ Install Required Tools
- [Node.js (LTS)](https://nodejs.org)
- [Python 3.10+](https://www.python.org/downloads/)
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [VS Code](https://code.visualstudio.com/)

#### 2️⃣ Clone the Repository
```bash
git clone https://github.com/Izone-hub/Izone-Automated-Project-Management-Tool-FE.git
cd Izone-Automated-Project-Management-Tool-FE
```

#### 3️⃣ Setup Frontend
```bash
cd frontend
yarn install
yarn dev
```
The app will run at: **http://localhost:3000**

#### 4️⃣ Setup Backend
```bash
cd ../backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The API will run at: **http://localhost:8000**

---

### 🐧 For Linux

#### 1️⃣ Install Required Tools
```bash
sudo apt update
sudo apt install nodejs npm python3 python3-venv python3-pip git docker.io docker-compose -y
```

#### 2️⃣ Clone the Repository
```bash
git clone https://github.com/Izone-hub/Izone-Automated-Project-Management-Tool-FE.git
cd Izone-Automated-Project-Management-Tool-FE
```

#### 3️⃣ Setup Frontend
```bash
cd frontend
yarn install
yarn dev
```

#### 4️⃣ Setup Backend
```bash
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🐳 Optional: Run with Docker

You can spin up the full stack (frontend + backend + PostgreSQL) using Docker Compose.

```bash
docker-compose up --build
```

Then visit:
- Frontend → [http://localhost:3000](http://localhost:3000)
- Backend → [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧩 Environment Variables

Create a `.env` file in both `frontend/` and `backend/`:

**frontend/.env**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**backend/.env**
```
DATABASE_URL=postgresql://user:password@db:5432/projectdb
SECRET_KEY=your_secret_key
```

---

## 🧠 Future Enhancements
- 🔐 Authentication (JWT)
- 🗓️ Task scheduling & reminders
- 📊 Dashboard analytics
- 👥 Team collaboration module
- ☁️ Cloud deployment with CI/CD

---

## 🪪 License
This project is licensed under the **MIT License**.