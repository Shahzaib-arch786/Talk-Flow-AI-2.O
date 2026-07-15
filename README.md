# 🚀 TalkFlow AI 2.0

> An AI-powered multilingual conversational platform that enables businesses to automate customer interactions through voice and text using modern AI technologies.

![Status](https://img.shields.io/badge/Status-Completed-success)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791)
![OpenAI](https://img.shields.io/badge/AI-OpenAI_API-412991)
![License](https://img.shields.io/badge/License-MIT-blue)

---

# 📖 Overview

**TalkFlow AI** is a full-stack AI-powered conversational platform designed for local businesses to automate customer support, bookings, and information retrieval using natural voice and text interactions.

The system combines **Speech-to-Text (STT)**, **Large Language Models (LLMs)**, **Retrieval-Augmented Generation (RAG)**, **Text-to-Speech (TTS)**, and business-specific knowledge to deliver accurate, context-aware responses in multiple languages, with a primary focus on **Urdu** and **English**.

Unlike traditional chatbots, TalkFlow AI allows each business to create its own AI assistant by uploading FAQs, business documents, and configurable actions, making the platform scalable across multiple industries.

---

# ✨ Key Features

## 🤖 AI Assistant

- AI-powered multilingual conversations
- Voice and text interaction
- Natural language understanding
- Context-aware responses
- Conversation memory
- Real-time response generation

---

## 🗣️ Voice AI

- Speech-to-Text (OpenAI Whisper)
- Text-to-Speech
- Urdu & English support
- Real-time voice conversations
- Continuous conversation flow

---

## 📚 Knowledge Base (RAG)

Businesses can train their AI without coding.

Supports:

- FAQ Management
- PDF Uploads
- DOCX Uploads
- TXT Documents
- Intelligent document retrieval
- Semantic search using embeddings

---

## ⚡ Business Action Automation

Administrators can define custom business actions such as:

- Hotel Booking
- Restaurant Reservation
- Appointment Scheduling
- Airport Pickup
- Customer Requests

The AI automatically detects customer intent and creates structured requests for the business team.

---

## 📊 Admin Dashboard

- Business Management
- Knowledge Base Management
- AI Playground
- Analytics Dashboard
- Conversation Logs
- Action Management
- User Authentication
- Role-based Administration

---

## 🌍 Multi-Domain SaaS Architecture

The platform is designed to support multiple business domains including:

- Hotels
- Restaurants
- Clinics
- Salons
- Educational Institutes
- E-Commerce
- Customer Support Centers

without changing the core AI engine.

---

# 🏗️ System Architecture

```
                User
                  │
        Voice / Text Input
                  │
         Speech-to-Text (STT)
                  │
          Business Context
                  │
         Action Detection
                  │
          FAQ Retrieval
                  │
        RAG Document Search
                  │
       OpenAI Response Engine
                  │
        Text-to-Speech (TTS)
                  │
             AI Response
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- REST APIs

## AI Technologies

- OpenAI GPT
- OpenAI Whisper
- Retrieval-Augmented Generation (RAG)
- Embedding Models
- Text-to-Speech

---

# 📂 Project Structure

```
TalkFlow-AI/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── services/
│
├── backend/
│   ├── app/
│   │
│   ├── ai_core/
│   ├── business_ai/
│   ├── rag/
│   ├── actions/
│   ├── auth/
│   ├── admin/
│   ├── models/
│   ├── routes/
│   └── utils/
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/TalkFlow-AI.git
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
OPENAI_API_KEY=

DATABASE_URL=

JWT_SECRET_KEY=

ELEVENLABS_API_KEY=

WHISPER_API_KEY=
```

---

# 📸 Screenshots

> Add screenshots here.

- Login
- Dashboard
- AI Playground
- Knowledge Base
- RAG Upload
- Voice Assistant
- Analytics

---

# 🎯 Core Modules

- Authentication
- Business Management
- Knowledge Base
- AI Playground
- Voice Processing
- RAG Engine
- Action Automation
- Analytics
- Conversation Logs

---

# 📈 Future Improvements

- Fine-tuned domain-specific AI models
- Function Calling
- Live CRM integration
- WhatsApp Integration
- Call Analytics Dashboard
- Multi-tenant SaaS deployment
- Docker & Kubernetes support
- Mobile Application
- Live Agent Handoff
- Real-time Scheduling APIs

---

# 👨‍💻 Authors

**Muhammad Ali Shahzaib**

BS Information Technology

Full Stack Developer

---

**Eram Waheed**

BS Information Technology

Software Quality Assurance & Testing

---

**Alisha Butt**

BS Information Technology

Project Contributor

---

# 📜 License

This project is developed for educational and research purposes as a Final Year Project.

---

# ⭐ Acknowledgements

Special thanks to our supervisor, faculty members, and everyone who supported the development of **TalkFlow AI**.

---

> **TalkFlow AI** demonstrates how modern AI technologies can transform traditional customer support into an intelligent, multilingual, and scalable conversational platform for businesses.
