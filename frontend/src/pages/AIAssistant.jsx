import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, History, Trash2 } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your AI Library Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
    } catch (err) {
      console.error('AI API Error:', err);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting to my brain right now. Please check if the backend server is running!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = [
    "What's in the RDBMS book?",
    "How do I take an exam?",
    "Where are the Java notes?",
    "Who created this system?"
  ];

  return (
    <div className="page-overlay" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      <div className="header-actions slide-up" style={{ animationDelay: '0.2s', marginBottom: '1.5rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>AI Study Assistant</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Ask questions and get instant help with your studies</p>
        </div>
        <button className="btn btn-secondary" onClick={() => setMessages([{ role: 'bot', text: 'Chat cleared. How can I help you now?' }])}>
          <Trash2 size={18} /> Clear Chat
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', flex: 1, minHeight: 0 }}>
        
        {/* Main Chat Area */}
        <div className="glass-panel slide-up" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', animationDelay: '0.3s' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
            <span style={{ fontWeight: 600 }}>AI Assistant Online</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} color="var(--primary)" />}
                </div>
                <div style={{ 
                  maxWidth: '70%', 
                  padding: '1rem', 
                  borderRadius: '16px',
                  background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${msg.role === 'user' ? 'transparent' : 'var(--glass-border)'}`,
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={20} color="var(--primary)" />
                </div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Ask me anything about your books..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--glass-border)',
                padding: '12px 20px',
                borderRadius: '12px',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>
              <Send size={20} />
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel slide-up" style={{ padding: '1.5rem', animationDelay: '0.4s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Sparkles size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.1rem' }}>Suggested Questions</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {suggestedQuestions.map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => setInput(q)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel slide-up" style={{ padding: '1.5rem', animationDelay: '0.5s', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <History size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.1rem' }}>API Connected</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Your AI Assistant is now connected to a dedicated backend API. This allows for faster processing and more complex intelligence in the future.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
