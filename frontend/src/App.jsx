import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThreeDScene from './components/ThreeDScene';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExamPortal from './pages/ExamPortal';
import QuestionPapers from './pages/QuestionPapers';
import AIAssistant from './pages/AIAssistant';
import Chatbot from './components/Chatbot';
import { MousePointer2 } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="app-container">
        <ThreeDScene />
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/exam" element={<ExamPortal />} />
              <Route path="/question-papers" element={<QuestionPapers />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
            </Routes>
          </main>
        </div>

        <div className="interact-hint">
          <MousePointer2 size={16} />
          <span>Drag background to interact with 3D space</span>
        </div>

        {/* Global Chatbot */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
