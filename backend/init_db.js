const { Pool } = require('pg');
require('dotenv').config();

const dbName = process.env.DB_NAME || 'ebooks';

const basePool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to default db first
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function initDB() {
  try {
    // 1. Create database if not exists
    console.log('Checking if database exists...');
    const res = await basePool.query(`SELECT datname FROM pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      console.log(`Creating database ${dbName}...`);
      await basePool.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (err) {
    console.error('Error ensuring database exists:', err.message);
  } finally {
    await basePool.end();
  }

  // 2. Connect to the new database and create tables & insert data
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: dbName,
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
  });

  try {
    console.log('Creating books table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Published',
        file_path TEXT
      );
    `);
    
    console.log('Checking for existing books...');
    const countRes = await pool.query('SELECT COUNT(*) FROM books');
    if (parseInt(countRes.rows[0].count) === 0) {
      console.log('Inserting 5 sample books...');
      const books = [
        { title: 'Data Structures and Algorithms', author: 'Jayanth', category: 'Study', status: 'Published' },
        { title: 'Computer Networks Security', author: 'Admin', category: 'Study', status: 'Draft' },
        { title: 'Deep Learning Basics', author: 'Scholar', category: 'Study', status: 'Published' },
        { title: 'Operating Systems Concepts', author: 'Professor X', category: 'Study', status: 'Published' },
        { title: 'Software Engineering Principles', author: 'Jane Doe', category: 'Study', status: 'Published' }
      ];

      for (let book of books) {
        await pool.query(
          'INSERT INTO books (title, author, category, status) VALUES ($1, $2, $3, $4)',
          [book.title, book.author, book.category, book.status]
        );
      }
      console.log('Successfully inserted 5 books.');
    } else {
      console.log('Books already exist in the database.');
    }
    
  } catch (err) {
    console.error('Error creating tables or inserting data:', err.message);
  } finally {
    await pool.end();
  }
}

initDB();
