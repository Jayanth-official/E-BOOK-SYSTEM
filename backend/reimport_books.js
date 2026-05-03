const fs = require('fs');
const path = require('path');
const pool = require('./db');

const BOOK_DIR = path.join(__dirname, '..', 'BOOK');

async function reimportBooks() {
  console.log('Starting book reimport...');
  console.log('This will update existing books and add new ones.\n');
  
  // Recursively get all PDF files
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
          console.log(`Skipping temporary file: ${file}`);
          return;
        }
        // Only get PDFs (browser-compatible format)
        if (file.endsWith('.pdf')) {
          arrayOfFiles.push(fullPath);
        } else {
          console.log(`Skipping non-PDF file: ${file}`);
        }
      }
    });

    return arrayOfFiles;
  }

  try {
    const allFiles = getAllFiles(BOOK_DIR);
    console.log(`\nFound ${allFiles.length} PDF files in the directory.\n`);

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

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

      // Use forward slashes for URLs
      const relativePath = path.relative(BOOK_DIR, filePath).replace(/\\/g, '/');

      // Check if book already exists
      const existRes = await pool.query('SELECT id, file_path FROM books WHERE title = $1', [title]);
      
      if (existRes.rowCount === 0) {
        // Insert new book
        await pool.query(
          'INSERT INTO books (title, author, category, status, file_path) VALUES ($1, $2, $3, $4, $5)',
          [title, 'Unknown Author', category, 'Published', relativePath]
        );
        inserted++;
        console.log(`✓ Inserted: ${title} (${category})`);
      } else {
        // Update existing book if file_path is missing or different
        const existingBook = existRes.rows[0];
        if (!existingBook.file_path || existingBook.file_path !== relativePath) {
          await pool.query(
            'UPDATE books SET file_path = $1, category = $2 WHERE id = $3',
            [relativePath, category, existingBook.id]
          );
          updated++;
          console.log(`↻ Updated: ${title} (${category})`);
        } else {
          skipped++;
        }
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('Import Summary:');
    console.log(`${'='.repeat(60)}`);
    console.log(`✓ New books added: ${inserted}`);
    console.log(`↻ Books updated: ${updated}`);
    console.log(`- Books skipped (already up-to-date): ${skipped}`);
    console.log(`Total PDF files processed: ${allFiles.length}`);
    console.log(`${'='.repeat(60)}\n`);
  } catch (err) {
    console.error('Error importing books:', err);
  } finally {
    await pool.end();
  }
}

reimportBooks();
