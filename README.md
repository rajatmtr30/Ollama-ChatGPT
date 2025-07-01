# Ollama Chat App

A full-stack, real-time AI chat application built by **Rajat Sharma**. This project features a modern React frontend and a Node.js backend that streams responses from a locally running Ollama LLM (e.g., Mistral). The UI is inspired by ChatGPT and is fully responsive, modular, and easy to extend.

---

## ✨ Features
- Real-time streaming chat with Ollama LLM (Mistral or any supported model)
- Modern, responsive UI with avatars, effects, and markdown/code rendering
- Modular React codebase (Header, Footer, ChatView, etc.)
- Easy to customize and extend
- Built with ❤️ by Rajat Sharma

## 📁 Project Structure
- `frontend/` — React app (modern chat UI, streaming, avatars, responsive)
- `backend/` — Node.js Express server (proxies and streams to Ollama API)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+ recommended)
- npm
- Ollama installed and running locally ([https://ollama.com/](https://ollama.com/))
- A model pulled in Ollama (e.g., `ollama pull mistral`)

### 1. Start Ollama
```sh
ollama run mistral
# or
ollama serve
```

### 2. Start the backend
```sh
cd backend
npm install
npm start
# Runs on http://localhost:3001
```

### 3. Start the frontend
```sh
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

### 4. Open your browser
- Go to [http://localhost:3000](http://localhost:3000)
- Start chatting!
![image](https://github.com/user-attachments/assets/c4968547-ed37-4591-b7cb-b8c6b5a2ea73)

![image](https://github.com/user-attachments/assets/6643f94f-d2b7-4187-bf42-89bf937a60c1)


## 🛠️ Customization
- Change avatars in `src/views/ChatView.js`
- Update styles in `src/App.css`
- Add more components or views as needed

---

## 📜 Credits
- **Author:** Rajat Sharma
- **AI Model:** [Ollama](https://ollama.com/)
- **Avatars:** [DiceBear](https://www.dicebear.com/)
- **UI Inspiration:** ChatGPT

---

See `frontend/README.md` and `backend/README.md` for more details on each part. 
