import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { Readable } from 'stream';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// POST /chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Forward to Ollama API (adjust endpoint if needed)
    const ollamaRes = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message, model: 'mistral' }) // Changed model to mistral
    });

    // Handle streaming JSON lines using Node.js streams
    const stream = ollamaRes.body;
    let result = '';
    for await (const chunk of stream) {
      result += chunk.toString();
    }

    // Ollama streams JSON objects per line, concatenate all 'response' fields
    const lines = result.trim().split('\n');
    let fullResponse = '';
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        if (typeof data.response === 'string') {
          fullResponse += data.response;
        }
      } catch (e) {
        // skip malformed lines
      }
    }
    res.json({ response: fullResponse });
  } catch (err) {
    res.status(500).json({ error: 'Failed to connect to Ollama API', details: err.message });
  }
});

// SSE streaming endpoint
app.get('/chat/stream', async (req, res) => {
  const message = req.query.message;
  if (!message) {
    res.status(400).end('Message is required');
    return;
  }
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const ollamaRes = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message, model: 'mistral' })
    });
    const stream = ollamaRes.body;
    let buffer = '';
    for await (const chunk of stream) {
      buffer += chunk.toString();
      let lines = buffer.split('\n');
      buffer = lines.pop(); // last line may be incomplete, keep in buffer
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (typeof data.response === 'string') {
            res.write(`data: ${JSON.stringify(data.response)}\n\n`);
          }
        } catch (e) {}
      }
    }
    res.write('event: end\ndata: end\n\n');
    res.end();
  } catch (err) {
    res.write(`event: error\ndata: ${JSON.stringify(err.message)}\n\n`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
}); 