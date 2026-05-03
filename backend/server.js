const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the BOOK directory
app.use('/files', express.static(path.join(__dirname, '..', 'BOOK')));

// Get all books with proper file path handling
app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY id DESC');
    // Ensure file_path is properly formatted for URLs
    const books = result.rows.map(book => ({
      ...book,
      file_path: book.file_path ? book.file_path.replace(/\\/g, '/') : null
    }));
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get stats
app.get('/api/stats', async (req, res) => {
  try {
    const bookCount = await pool.query('SELECT COUNT(*) FROM books');
    res.json({
      totalBooks: bookCount.rows[0].count,
      activeUsers: 842,
      downloads: '12.4k',
      growth: '+24%'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// AI Assistant API
app.post('/api/ai/chat', async (req, res) => {
  const { message } = req.body;
  const lowerText = message.toLowerCase();
  
  let response = "That's an interesting question! Based on your study library, I recommend checking the 'Study' section for more detailed resources.";

  if (lowerText.includes('rdbms')) {
    response = "The RDBMS book is available in your collection. It covers everything from SQL queries to Database Normalization and Transactions.";
  } else if (lowerText.includes('exam')) {
    response = "You can take your assessment in the Exam Portal. It consists of 30 questions and will give you a grade upon completion.";
  } else if (lowerText.includes('java')) {
    response = "I found several Java resources in your Question Papers and Notes. Would you like me to help you find a specific unit?";
  } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
    response = "Hello! I am your Library AI Assistant. I can help you find books, prepare for exams, or explain complex topics. What are you studying today?";
  } else if (lowerText.includes('who created')) {
    response = "This E-Book Management System was created with excellence by Jayanth!";
  }

  res.json({ response });
});

// Add a book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, category, status } = req.body;
    const result = await pool.query(
      'INSERT INTO books (title, author, category, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, category, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
