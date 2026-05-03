import React, { useState, useEffect } from 'react';
import { Book, Users, TrendingUp, Download } from 'lucide-react';

export default function Dashboard() {
  const [recentBooks, setRecentBooks] = useState([]);
  const [statsData, setStatsData] = useState({
    totalBooks: '1,248',
    activeUsers: '842',
    downloads: '12.4k',
    growth: '+24%'
  });
  const [loading, setLoading] = useState(true);

  const stats = [
    { title: 'Total Books', value: statsData.totalBooks, icon: <Book size={28} /> },
    { title: 'Active Users', value: statsData.activeUsers, icon: <Users size={28} /> },
    { title: 'Downloads', value: statsData.downloads, icon: <Download size={28} /> },
    { title: 'Growth', value: statsData.growth, icon: <TrendingUp size={28} /> },
  ];

  const colors = [
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #8b5cf6, #d946ef)',
    'linear-gradient(135deg, #0ea5e9, #3b82f6)',
    'linear-gradient(135deg, #10b981, #3b82f6)'
  ];

  useEffect(() => {
    // Fetch books
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => {
        setRecentBooks(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch books, using fallback data:', err);
        setRecentBooks([
          { id: 1, title: 'Data Structures and Algorithms', author: 'Jayanth', category: 'Study', status: 'Published' },
          { id: 2, title: 'Computer Networks Security', author: 'Admin', category: 'Study', status: 'Draft' },
          { id: 3, title: 'Deep Learning Basics', author: 'Scholar', category: 'Study', status: 'Published' },
          { id: 4, title: 'Operating Systems Concepts', author: 'Professor X', category: 'Study', status: 'Published' },
          { id: 5, title: 'Software Engineering Principles', author: 'Jane Doe', category: 'Study', status: 'Published' },
        ]);
        setLoading(false);
      });

    // Fetch stats
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => {
        setStatsData(data);
      })
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  const openBook = (book) => {
    if (book.file_path) {
      // Encode the file path to handle spaces and special characters
      const encodedPath = book.file_path.split('/').map(encodeURIComponent).join('/');
      window.open(`http://localhost:5000/files/${encodedPath}`, '_blank');
    } else {
      alert(`Opening ${book.title}... (No file path found in database)`);
    }
  };

  return (
    <div className="page-overlay">
      <h1 className="text-gradient slide-up" style={{ fontSize: '2.5rem', animationDelay: '0.2s' }}>
        Welcome back, Scholar!
      </h1>
      <p className="slide-up" style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', animationDelay: '0.3s' }}>
        Here's what is happening with your library today.
      </p>

      <div className="dashboard-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="glass-panel stat-card slide-up" 
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-books slide-up" style={{ animationDelay: '0.8s' }}>
        <h2 style={{ marginBottom: '1rem', fontWeight: 600 }}>Recently Added Books</h2>
        <div className="books-grid">
          {loading ? (
            <p>Loading books...</p>
          ) : (
            recentBooks.map((book, index) => (
              <div key={index} className="glass-panel book-card">
                <div className="book-cover" style={{ background: colors[index % colors.length] }}>
                  {book.title}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{book.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{book.author}</p>
                </div>
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: 'auto', justifyContent: 'center' }}
                  onClick={() => openBook(book)}
                >
                  Read Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
