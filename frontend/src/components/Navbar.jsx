import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Settings, LogIn, UserPlus, ClipboardCheck, Moon, Sun, FileText, Bot } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="navbar slide-up" style={{ animationDelay: '0.1s' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="nav-brand text-gradient">
          <BookOpen size={28} color="#818cf8" />
          <span>E-Book System</span>
        </div>
      </Link>
      <div className="nav-links" style={{ alignItems: 'center' }}>
        <Link 
          to="/dashboard" 
          className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LayoutDashboard size={18} /> Dashboard
          </span>
        </Link>
        <Link 
          to="/admin" 
          className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Settings size={18} /> Admin
          </span>
        </Link>
        <Link 
          to="/question-papers" 
          className={`nav-link ${location.pathname === '/question-papers' ? 'active' : ''}`}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={18} /> Papers
          </span>
        </Link>
        <Link 
          to="/exam" 
          className={`nav-link ${location.pathname === '/exam' ? 'active' : ''}`}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ClipboardCheck size={18} /> Exam
          </span>
        </Link>
        <Link 
          to="/ai-assistant" 
          className={`nav-link ${location.pathname === '/ai-assistant' ? 'active' : ''}`}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bot size={18} /> AI Assistant
          </span>
        </Link>
        
        <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 0.5rem' }}></div>
        
        <button 
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.3s'
          }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 0.5rem' }}></div>

        <Link 
          to="/login" 
          className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogIn size={18} /> Login
          </span>
        </Link>
        <Link 
          to="/signup" 
        >
          <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>
            <UserPlus size={16} /> Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}
