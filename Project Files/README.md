# 🎓 LearnHub Source Code

This directory contains the core source code for the **LearnHub** MERN stack application. It is divided into two main components: a Node.js/Express backend and a React/Vite frontend.

---

## Getting Started

To run the application locally, you need to start **both** the backend and the frontend servers.

### Method 1: Running from the Repository Root

If your terminal is at the root directory (`LearnHub/`), use these commands:

#### Terminal 1: Backend

```powershell
cd "Project Files/backend"
npm install
npm start
```

#### Terminal 2: Frontend

```powershell
cd "Project Files/frontend"
npm install
npm run dev
```

### Method 2: Running from this Directory

If your terminal is already inside `Project Files/`:

#### Terminal 1: Backend

```powershell
cd backend
npm start
```

#### Terminal 2: Frontend

```powershell
cd frontend
npm run dev
```

---

## 🛠 Configuration

### Backend (`/backend/.env`)

The backend is configured to use port **8000**.

- Default DB: MongoDB (Atlas)
- Uploads: Stored in `/uploads` and served via `/uploads` prefix.

### Frontend (`/frontend/.env`)

The frontend is configured to use port **5173**.

- API URL: `http://localhost:8000/api`

---

## 🖥 Application Usage

1.  **Access**: Navigate to **[http://localhost:5173](http://localhost:5173)**.
2.  **Roles**:
    - **Teacher**: Click "Register" -> Choose "Teacher". Create courses and add video sessions.
    - **Student**: Click "Register" -> Choose "Student". Browse and enroll in courses.
3.  **Video Playback**: In the Student Home or Teacher Dashboard, click **WATCH NOW** to view session videos in the glassy popup player.
