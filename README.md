# FullStack-Ai-agent-App
# 🤖 AI Task Assignment System

An AI-powered task management platform that automates task allocation by analyzing required skills and intelligently matching tasks with the most suitable employees.

---

## 📌 Overview

The **AI Task Assignment System** is a full-stack web application designed to streamline organizational task management. It provides an admin dashboard to create, manage, and track tasks while leveraging an AI agent to analyze task descriptions, extract required skills, and assign tasks to the best-matched employees from the database.

The system supports **real-time updates**, ensuring that task assignments and status changes are instantly reflected on the dashboard.

---

## 🚀 Features

- Admin dashboard for task creation, monitoring, and management  
- AI agent for skill extraction and task analysis  
- Automated task-to-employee matching based on skill relevance  
- Real-time updates for task assignments and status changes  
- Scalable and modular backend architecture  
- Clean and responsive UI  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  

### AI Integration
- AI-based text analysis for skill extraction and matching  

---

## ⚙️ System Architecture

Frontend (React + Tailwind)
|
| REST APIs + WebSockets
|
Backend (Node.js + Express)
|
| Skill Matching Logic + AI Agent
|
Database (MongoDB)

---

## 📂 Project Structure

ai-task-assignment-system/
│
├── frontend/ # React frontend
│ ├── src/
│ └── public/
│
├── backend/ # Node.js backend
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── models/
│ └── utils/
│
├── README.md
└── package.json

---

## 🧠 AI Task Matching Logic

1. Task description is analyzed using AI text processing.
2. Required skills are extracted from the task.
3. Employee skill sets are fetched from the database.
4. A matching algorithm calculates relevance scores.
5. The task is automatically assigned to the best-matched employee.

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- Git

---

### Clone the Repository
```bash
git clone https://github.com/your-username/ai-task-assignment-system.git
cd ai-task-assignment-system
Backend Setup
cd backend
npm install
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the backend server:
npm run dev
Frontend Setup
cd frontend
npm install
npm start
📡 Real-Time Updates
The system uses real-time communication to ensure:
Instant task assignment updates
Live task status changes on the admin dashboard
📈 Future Enhancements
Role-based access control (Admin / Employee)
Task priority and deadline optimization
Performance analytics and reports
Integration with external HR systems
Advanced AI models for improved skill matching
