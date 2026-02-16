# LearnHub (MERN Stack)

A comprehensive Online Learning Platform connecting Teachers and Students.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or using Atlas)

## Project Structure

- **backend/**: Express.js server and API
- **frontend/**: React.js (Vite) application

## Getting Started (Windows)

You will need to run the **Backend** and **Frontend** in two separate terminals.

### 1. Setup Backend

Open a new Command Prompt or PowerShell terminal:

```powershell
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server (Runs on Port 8000)
npm start
```

_Note: Create a `.env` file in the `backend` folder if you have custom specific MongoDB credentials. Default URI is configured in `config/db.js`._

### 2. Setup Frontend

Open a **second** Command Prompt or PowerShell terminal:

```powershell
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app (Runs on Port 5173)
npm run dev
```

### 3. Usage

- Open your browser and go to `http://localhost:5173`
- Register a new account (Select 'Student' or 'Teacher')
- **Teacher**: Create courses and add video sections.
- **Student**: Browse courses and enroll.
