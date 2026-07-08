# 🧠 Self-Consistency Engine

A web application that compares responses from multiple Large Language Models (LLMs) and uses an AI-powered evaluation step to determine which response is more accurate, relevant, and well-structured.

The application sends a user's prompt to multiple AI models simultaneously, collects their responses along with confidence scores, and then uses another LLM to perform an unbiased comparison and generate a final judgment.

---
Note : While creating this project I encountered some issues, this is how I resolved them :-
1) Fixed issues with OpenAI's JSON response format.
2) Updated the project to work with the latest OpenAI SDK.
3) Replaced outdated Gemini model names with supported ones.
4) Debugged and resolved backend 500 Internal Server Errors.

Suggestion : VERSION COMPATIBILITY SHOULD BE CHECKED BEFOREHAND
---

## 🎥 Demo Video

> **Watch the project in action below:**



https://github.com/user-attachments/assets/22c9f382-9c42-4093-92ed-435618f7c6af







---

## ✨ Features

- Compare responses from multiple AI models
- Parallel API requests for faster response times
- AI-generated comparative judgment
- Confidence scoring for each model
- Clean and responsive user interface
- Fastify-powered REST API
- React + Vite frontend

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Fastify

### AI Models
- OpenAI GPT-4o Mini
- Google Gemini

### Libraries
- OpenAI SDK
- Google Generative AI SDK
- Zod

---

## 📂 Project Structure

```text
Self-Consistency-App/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server.js
├── orchestrator.js
├── openai-sdk.js
├── gemini-sdk.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ How It Works

1. The user enters a prompt.
2. The backend sends the prompt simultaneously to OpenAI GPT-4o Mini and Google Gemini.
3. Both models independently generate responses and confidence scores.
4. A separate AI evaluation step compares both responses.
5. The application displays:
   - GPT Response
   - Gemini Response
   - Final AI Judgment

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/self-consistency-engine.git
cd self-consistency-engine
```

### Install dependencies

Backend

```bash
npm install
```

Frontend

```bash
cd frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root.

```env
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## ▶️ Run the Project

Start the backend

```bash
npm run dev
```

Start the frontend

```bash
cd frontend
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:3002
```

---

## 🔮 Future Improvements

- Support additional LLMs (Claude, DeepSeek, Llama, Mistral)
- Streaming responses
- Response latency comparison
- Token usage analytics
- Conversation history
- Export comparison results
- User-selectable AI models

---

## 👨‍💻 Author

**Nadir Khan**

- GitHub: https://github.com/Nadir727K
- LinkedIn: www.linkedin.com/in/nadir727khan

---

