import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your library assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputText, isBot: false }]);
    const userText = inputText;
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm sorry, I couldn't understand that. Could you rephrase?";
      
      if (userText.toLowerCase().includes('book') || userText.toLowerCase().includes('library')) {
        botResponse = "We have over 1,200 books in our collection! You can use the search feature on the dashboard to find something specific.";
      } else if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
        botResponse = "Hi there! How can I assist you with your reading today?";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className="chatbot-toggle slide-up"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5)',
          cursor: 'pointer',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          animationDelay: '1s'
        }}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window glass-panel" style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '350px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease forwards'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            background: 'rgba(99, 102, 241, 0.2)',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={24} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Library Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '0.5rem',
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                maxWidth: '80%'
              }}>
                {msg.isBot && <div style={{ minWidth: '24px' }}><Bot size={20} color="var(--primary)" /></div>}
                
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: msg.isBot ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                  color: 'white',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  borderTopLeftRadius: msg.isBot ? 0 : '12px',
                  borderTopRightRadius: msg.isBot ? '12px' : 0,
                }}>
                  {msg.text}
                </div>
                
                {!msg.isBot && <div style={{ minWidth: '24px' }}><User size={20} color="var(--text-secondary)" /></div>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid var(--glass-border)',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <button 
                type="submit"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Send size={18} style={{ marginLeft: '-2px' }} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
