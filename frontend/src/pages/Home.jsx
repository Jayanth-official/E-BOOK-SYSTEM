import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Shield, Zap, Globe, Star } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: <Shield size={24} />, title: 'Secure Library', desc: 'Encrypted access to all your digital notes and books.' },
    { icon: <Zap size={24} />, title: 'Fast Access', desc: 'Blazing fast load times for your study materials.' },
    { icon: <Globe size={24} />, title: 'Cloud Sync', desc: 'Access your ebooks from anywhere in the world.' },
  ];

  return (
    <div className="page-overlay" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', padding: '4rem 0' }}>
        <div className="slide-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(99, 102, 241, 0.1)', padding: '8px 20px', borderRadius: '30px', marginBottom: '2rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <Star size={16} color="var(--primary)" fill="var(--primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Created by Jayanth</span>
        </div>
        
        <h1 className="text-gradient slide-up" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: '1.1', marginBottom: '1.5rem', animationDelay: '0.1s' }}>
          Your Ultimate Digital <br /> E-Book Universe
        </h1>
        
        <p className="slide-up" style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem', animationDelay: '0.2s', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 3rem' }}>
          Master your studies with our premium management system. Organize notes, 
          track your progress, and take assessments in a stunning 3D environment.
        </p>
        
        <div className="slide-up" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', animationDelay: '0.3s' }}>
          <Link to="/signup">
            <button className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
              Get Started Free <ArrowRight size={20} />
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
              Sign In to Library
            </button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem', animationDelay: '0.4s' }}>
        {features.map((f, i) => (
          <div key={i} className="glass-panel" style={{ padding: '2.5rem', transition: 'transform 0.3s ease' }}>
            <div style={{ width: '55px', height: '55px', borderRadius: '15px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{f.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="slide-up" style={{ textAlign: 'center', marginTop: '6rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', animationDelay: '0.5s' }}>
        © 2024 E-Book Universe. Created with excellence by Jayanth.
      </div>
    </div>
  );
}
