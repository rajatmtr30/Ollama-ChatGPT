import React from 'react';
const botAvatar = 'https://api.dicebear.com/8.x/bottts/svg?seed=Ollama';

export default function Header() {
  return (
    <header className="gpt-header-enhanced">
      <div className="gpt-header-logo">
        <img src={botAvatar} alt="Ollama" className="gpt-header-avatar" />
        <span className="gpt-header-title">Ollama Chat</span>
      </div>
      <div className="gpt-header-effect" />
    </header>
  );
} 