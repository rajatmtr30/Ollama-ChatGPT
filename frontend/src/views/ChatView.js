import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Use DiceBear adventurer style with a boyish seed
const userAvatar = 'https://api.dicebear.com/8.x/adventurer/svg?seed=boy5';
const botAvatar = 'https://api.dicebear.com/8.x/bottts/svg?seed=Ollama';

export default function ChatView({ messages, input, loading, onInputChange, onSend, messagesEndRef }) {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, messagesEndRef]);

  return (
    <div className="gpt-bg">
      <div className="gpt-main">
        <Header />
        <div className="gpt-messages" id="gpt-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`gpt-bubble-row ${msg.sender === 'user' ? 'user' : 'bot'}`}
              style={{ animation: 'fadeIn 0.5s', animationDelay: `${i * 0.05}s` }}>
              {msg.sender === 'bot' && <img src={botAvatar} alt="Bot" className="gpt-avatar" />}
              <div className={`gpt-bubble ${msg.sender}`}
                style={msg.sender === 'bot' ? { padding: 0 } : {}}>
                {msg.sender === 'bot' ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match ? match[1] : 'plaintext'}
                            PreTag="div"
                            customStyle={{ borderRadius: 8, margin: '8px 0', fontSize: 15 }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props} style={{ background: '#e2e8f0', borderRadius: 4, padding: '2px 6px', fontSize: 15 }}>
                            {children}
                          </code>
                        );
                      },
                      p({ children }) {
                        return <p style={{ margin: '10px 0', lineHeight: 1.7 }}>{children}</p>;
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
              {msg.sender === 'user' && <img src={userAvatar} alt="User" className="gpt-avatar" />}
            </div>
          ))}
          {loading && <div className="gpt-bubble-row bot"><img src={botAvatar} alt="Bot" className="gpt-avatar" /><div className="gpt-bubble bot">Bot is typing...</div></div>}
          <div ref={messagesEndRef} />
        </div>
        <form className="gpt-input-row" onSubmit={onSend} autoComplete="off">
          <input
            className="gpt-input"
            value={input}
            onChange={onInputChange}
            placeholder="Type your message..."
            disabled={loading}
            autoFocus
          />
          <button className="gpt-send-btn" type="submit" disabled={loading || !input.trim()}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg>
          </button>
        </form>
        <Footer />
      </div>
      <style>{`
        .gpt-header-enhanced {
          position: sticky;
          top: 0;
          z-index: 20;
          background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
          color: #fff;
          box-shadow: 0 4px 24px 0 rgba(60,60,120,0.10);
          padding: 0;
          min-height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .gpt-header-logo {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 24px 10px 24px;
        }
        .gpt-header-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .gpt-header-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(60,60,120,0.10);
        }
        .gpt-header-effect {
          height: 8px;
          width: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
          filter: blur(8px) brightness(1.2);
          opacity: 0.5;
        }
        .gpt-footer {
          position: sticky;
          bottom: 0;
          width: 100%;
          background: #fff;
          color: #6366f1;
          text-align: center;
          font-size: 1rem;
          padding: 10px 0 8px 0;
          border-top: 1.5px solid #e0e7ff;
          box-shadow: 0 -2px 12px rgba(60,60,120,0.04);
          z-index: 10;
        }
        @media (max-width: 600px) {
          .gpt-header-logo {
            padding: 12px 8px 6px 8px;
          }
          .gpt-header-title {
            font-size: 1.1rem;
          }
          .gpt-header-avatar {
            width: 32px;
            height: 32px;
          }
          .gpt-footer {
            font-size: 0.92rem;
            padding: 7px 0 6px 0;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gpt-bubble.bot {
          padding: 0 !important;
        }
        .gpt-bubble.bot > div {
          padding: 14px 18px;
        }
        .gpt-bubble.bot pre {
          background: #23272e !important;
          color: #fff !important;
          border-radius: 8px;
          padding: 12px 14px !important;
          margin: 10px 0 !important;
          font-size: 15px;
          overflow-x: auto;
        }
        .gpt-bubble.bot code {
          background: #e2e8f0;
          color: #222;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 15px;
        }
      `}</style>
    </div>
  );
} 