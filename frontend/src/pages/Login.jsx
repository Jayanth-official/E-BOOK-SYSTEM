import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, BookOpen, Library, Smartphone, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect
    console.log('Login attempt:', { email, password });
    navigate('/dashboard');
  };

  return (
    <div className="page-overlay" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', paddingBottom: '3rem' }}>
      <div className="glass-panel slide-up" style={{ 
        display: 'flex', 
        width: '100%', 
        maxWidth: '900px', 
        overflow: 'hidden',
        minHeight: '500px',
        flexWrap: 'wrap'
      }}>
        
        {/* Left Side: Branding and Info */}
        <div style={{
          flex: '1 1 400px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid var(--glass-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ 
              width: '48px', height: '48px', 
              borderRadius: '12px', 
              background: 'var(--primary)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
            }}>
              <BookOpen size={28} color="white" />
            </div>
            <h1 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>E-Book System</h1>
          </div>
          
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Your Ultimate Digital Library
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
            Access thousands of educational resources, premium books, and interactive 3D models right from your browser. A fully dynamic reading experience awaits.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
              <Library size={20} color="var(--primary)" />
              <span>Massive Book Collection</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
              <Smartphone size={20} color="var(--secondary)" />
              <span>Cross-platform Access</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={20} color="#10b981" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div style={{
          flex: '1 1 400px',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Sign in to continue to your library</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
              <LogIn size={18} /> Sign In
            </button>
          </form>

          <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
          </p>
        </div>
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '1.5rem', 
        left: '50%', 
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.9rem',
        letterSpacing: '1px'
      }}>
        Created by Jayanth
      </div>
    </div>
  );
}
