# Ollama Chat Backend

This is the Node.js Express backend for the Ollama Chat App. It proxies and streams chat requests to a locally running Ollama LLM (e.g., Mistral).

## Setup

```sh
cd backend
npm install
npm start
```
- The server will run on [http://localhost:3001](http://localhost:3001)
- Make sure Ollama is running on [http://localhost:11434](http://localhost:11434)

## API Endpoints

- `POST /chat` — (Legacy) Accepts `{ message }` in JSON, returns full response after completion.
- `GET /chat/stream?message=...` — Streams the response from Ollama as Server-Sent Events (SSE) for real-time UI updates.

## Notes
- Requires Ollama to be installed and running locally with a model pulled (e.g., `ollama pull mistral`).
- CORS is enabled for local development.
- Designed for use with the React frontend in this repo.

---
See the top-level `README.md` for full-stack setup and usage. 