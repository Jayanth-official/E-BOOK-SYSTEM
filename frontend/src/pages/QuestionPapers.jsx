import React, { useState, useEffect } from 'react';
import { FileText, Download, Search, FileType, Filter } from 'lucide-react';

export default function QuestionPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => {
        // Filter specifically for items in the QUETION PAPPER category
        const filtered = data.filter(item => 
          item.category && item.category.toUpperCase().includes('QUETION PAPPER')
        );
        setPapers(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch papers:', err);
        // Fallback sample data if backend/DB is down
        setPapers([
          { id: 101, title: 'RDBMS Semester Final 2024', category: 'QUETION PAPPER', file_path: 'QUETION PAPPER/RDBMS_2024.pdf' },
          { id: 102, title: 'Java Programming Internal 1', category: 'QUETION PAPPER', file_path: 'QUETION PAPPER/Java_Internal_1.pdf' },
          { id: 103, title: 'Data Structures Mid-term', category: 'QUETION PAPPER', file_path: 'QUETION PAPPER/DS_Mid.pdf' },
          { id: 104, title: 'Operating Systems Previous Year', category: 'QUETION PAPPER', file_path: 'QUETION PAPPER/OS_Prev.pdf' },
        ]);
        setLoading(false);
      });
  }, []);

  const openPaper = (paper) => {
    if (paper.file_path) {
      // Encode the file path to handle spaces and special characters
      const encodedPath = paper.file_path.split('/').map(encodeURIComponent).join('/');
      window.open(`http://localhost:5000/files/${encodedPath}`, '_blank');
    } else {
      alert(`Opening ${paper.title}...`);
    }
  };

  const filteredPapers = papers.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-overlay">
      <div className="header-actions slide-up" style={{ animationDelay: '0.2s' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>Question Paper Portal</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Access all previous years and practice papers</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel slide-up" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', animationDelay: '0.3s' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search by subject or year..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--glass-border)',
              padding: '12px 12px 12px 40px',
              borderRadius: '12px',
              color: 'white',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Papers Grid */}
      <div className="dashboard-grid">
        {loading ? (
          <p>Loading papers...</p>
        ) : filteredPapers.length === 0 ? (
          <div className="glass-panel" style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center' }}>
            <FileType size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-secondary)' }}>No question papers found matching your search.</p>
          </div>
        ) : (
          filteredPapers.map((paper, idx) => (
            <div 
              key={paper.id || idx} 
              className="glass-panel slide-up" 
              style={{ 
                padding: '1.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                animationDelay: `${0.4 + idx * 0.1}s`
              }}
            >
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '10px', 
                background: 'rgba(236, 72, 153, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--secondary)' 
              }}>
                <FileText size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{paper.title}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                  {paper.category}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'auto' }}>
                <button className="btn btn-primary" style={{ flex: 1, padding: '8px' }} onClick={() => openPaper(paper)}>
                  View
                </button>
                <button className="btn btn-secondary" style={{ padding: '8px' }} onClick={() => openPaper(paper)}>
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="slide-up" style={{ textAlign: 'center', marginTop: '4rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
        Found {filteredPapers.length} Question Papers
      </div>
    </div>
  );
}
