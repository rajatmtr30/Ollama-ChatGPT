import React, { useState, useRef } from 'react';
import ChatView from './views/ChatView';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setInput('');

    // Streaming response using SSE
    let botMsg = { sender: 'bot', text: '' };
    setMessages((msgs) => [...msgs, botMsg]);
    const eventSource = new window.EventSource(`http://localhost:3001/chat/stream?message=${encodeURIComponent(input)}`);
    eventSource.onmessage = (event) => {
      setMessages((msgs) => {
        // Update the last bot message with new chunk
        const updated = [...msgs];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: (updated[updated.length - 1].text || '') + JSON.parse(event.data)
        };
        return updated;
      });
    };
    eventSource.addEventListener('end', () => {
      setLoading(false);
      eventSource.close();
    });
    eventSource.addEventListener('error', (e) => {
      setLoading(false);
      eventSource.close();
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Error: Failed to stream response.' }]);
    });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      <ChatView
        messages={messages}
        input={input}
        loading={loading}
        onInputChange={e => setInput(e.target.value)}
        onSend={sendMessage}
        messagesEndRef={messagesEndRef}
      />
    </>
  );
}

export default App; 