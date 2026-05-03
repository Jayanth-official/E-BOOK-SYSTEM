const fs = require('fs');
const path = require('path');
const pool = require('./db');

const BOOK_DIR = path.join(__dirname, '..', 'BOOK');

async function importBooks() {
  console.log('Starting book import...');
  
  // Recursively get all files
  function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      } else {
        // Skip temporary files
        if (file.startsWith('~$')) {
          return;
        }
        // Only get PDFs (browser-compatible format)
        if (file.endsWith('.pdf')) {
          arrayOfFiles.push(fullPath);
        }
      }
    });

    return arrayOfFiles;
  }

  try {
    const allFiles = getAllFiles(BOOK_DIR);
    console.log(`Found ${allFiles.length} books in the directory.`);

    let inserted = 0;

    for (const filePath of allFiles) {
      const fileName = path.basename(filePath);
      const ext = path.extname(fileName);
      const title = fileName.replace(ext, '').replace(/[-_]/g, ' ').trim();
      
      // Determine category from parent folder name
      const parentDir = path.dirname(filePath);
      let category = path.basename(parentDir);
      
      // If the file is directly in BOOK, category is 'General'
      if (category === 'BOOK') {
        category = 'General';
      }

      // Check if book already exists
      const existRes = await pool.query('SELECT id FROM books WHERE title = $1', [title]);
      
      if (existRes.rowCount === 0) {
        // Use forward slashes for URLs and encode spaces
        const relativePath = path.relative(BOOK_DIR, filePath).replace(/\\/g, '/');
        await pool.query(
          'INSERT INTO books (title, author, category, status, file_path) VALUES ($1, $2, $3, $4, $5)',
          [title, 'Unknown Author', category, 'Published', relativePath]
        );
        inserted++;
        console.log(`Inserted: ${title} (${category})`);
      } else {
        // Update existing book with file_path if missing
        const existingBook = existRes.rows[0];
        const checkPath = await pool.query('SELECT file_path FROM books WHERE id = $1', [existingBook.id]);
        if (!checkPath.rows[0].file_path) {
          const relativePath = path.relative(BOOK_DIR, filePath).replace(/\\/g, '/');
          await pool.query('UPDATE books SET file_path = $1 WHERE id = $2', [relativePath, existingBook.id]);
          console.log(`Updated file_path for: ${title}`);
        }
      }
    }

    console.log(`\nImport complete! Added ${inserted} new books to the database.`);
  } catch (err) {
    console.error('Error importing books:', err);
  } finally {
    await pool.end();
  }
}

importBooks();
