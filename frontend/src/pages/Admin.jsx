import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react';

export default function Admin() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch from backend
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch from backend, using fallback data:', err);
        // Fallback data if backend is not running
        setBooks([
          { id: 1, title: 'Data Structures and Algorithms', author: 'Jayanth', category: 'Study', status: 'Published' },
          { id: 2, title: 'Computer Networks Security', author: 'Admin', category: 'Study', status: 'Draft' },
          { id: 3, title: 'Deep Learning Basics', author: 'Scholar', category: 'Study', status: 'Published' },
          { id: 4, title: 'Operating Systems Concepts', author: 'Professor X', category: 'Study', status: 'Published' },
          { id: 5, title: 'Software Engineering Principles', author: 'Jane Doe', category: 'Study', status: 'Published' },
        ]);
        setLoading(false);
      });
  }, []);

  const openBook = (book) => {
    if (book.file_path) {
      window.open(`http://localhost:5000/files/${book.file_path}`, '_blank');
    } else {
      alert(`Opening ${book.title}... (No file path found)`);
    }
  };

  return (
    <div className="page-overlay">
      <div className="header-actions slide-up" style={{ animationDelay: '0.2s' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>Book Management</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Administer your library inventory</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Add New Book
        </button>
      </div>

      <div className="glass-panel slide-up" style={{ padding: '1.5rem', animationDelay: '0.3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>All Books</h2>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search books..." 
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--glass-border)',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading books...</td></tr>
              ) : books.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No books found in the database.</td></tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id}>
                    <td style={{ color: 'var(--text-secondary)' }}>#{book.id}</td>
                    <td style={{ fontWeight: 500 }}>{book.title}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{book.author}</td>
                    <td>
                      <span style={{ 
                        background: 'rgba(99, 102, 241, 0.1)', 
                        color: 'var(--primary)', 
                        padding: '4px 10px', 
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                      }}>
                        {book.category}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        background: book.status === 'Published' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                        color: book.status === 'Published' ? '#10b981' : '#f59e0b', 
                        padding: '4px 10px', 
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                      }}>
                        {book.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn" title="Open Book" onClick={() => openBook(book)}><ExternalLink size={18} /></button>
                        <button className="icon-btn" title="Edit"><Edit2 size={18} /></button>
                        <button className="icon-btn" style={{ color: '#ef4444' }} title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
