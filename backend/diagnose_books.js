const fs = require('fs');
const path = require('path');
const pool = require('./db');

const BOOK_DIR = path.join(__dirname, '..', 'BOOK');

async function diagnoseBooks() {
  console.log('📊 Book System Diagnostics\n');
  console.log('='.repeat(70));
  
  // Check BOOK directory
  console.log('\n1. Checking BOOK directory...');
  if (!fs.existsSync(BOOK_DIR)) {
    console.log('   ❌ BOOK directory not found!');
    return;
  }
  console.log('   ✅ BOOK directory exists');

  // Count files by type
  function countFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    let counts = { pdf: 0, docx: 0, pptx: 0, other: 0, folders: 0 };

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        counts.folders++;
        const subCounts = countFiles(fullPath);
        counts.pdf += subCounts.pdf;
        counts.docx += subCounts.docx;
        counts.pptx += subCounts.pptx;
        counts.other += subCounts.other;
        counts.folders += subCounts.folders;
      } else {
        if (file.endsWith('.pdf')) counts.pdf++;
        else if (file.endsWith('.docx') || file.endsWith('.doc')) counts.docx++;
        else if (file.endsWith('.pptx') || file.endsWith('.ppt')) counts.pptx++;
        else counts.other++;
      }
    });

    return counts;
  }

  const fileCounts = countFiles(BOOK_DIR);
  console.log('\n2. File Statistics:');
  console.log(`   📄 PDF files: ${fileCounts.pdf} (✅ Browser-compatible)`);
  console.log(`   📝 Word files: ${fileCounts.docx} (⚠️  Need conversion)`);
  console.log(`   📊 PowerPoint files: ${fileCounts.pptx} (⚠️  Need conversion)`);
  console.log(`   📁 Folders: ${fileCounts.folders}`);
  console.log(`   📎 Other files: ${fileCounts.other}`);

  // Check database
  console.log('\n3. Checking database...');
  try {
    const totalBooks = await pool.query('SELECT COUNT(*) FROM books');
    console.log(`   ✅ Database connected`);
    console.log(`   📚 Total books in database: ${totalBooks.rows[0].count}`);

    const withPath = await pool.query('SELECT COUNT(*) FROM books WHERE file_path IS NOT NULL');
    const withoutPath = await pool.query('SELECT COUNT(*) FROM books WHERE file_path IS NULL');
    
    console.log(`   ✅ Books with file_path: ${withPath.rows[0].count}`);
    if (parseInt(withoutPath.rows[0].count) > 0) {
      console.log(`   ❌ Books without file_path: ${withoutPath.rows[0].count}`);
      console.log('      → Run "node reimport_books.js" to fix');
    }

    // Check for broken paths
    const allBooks = await pool.query('SELECT id, title, file_path FROM books WHERE file_path IS NOT NULL');
    let brokenPaths = 0;
    
    for (const book of allBooks.rows) {
      const fullPath = path.join(BOOK_DIR, book.file_path.replace(/\//g, path.sep));
      if (!fs.existsSync(fullPath)) {
        brokenPaths++;
        console.log(`   ❌ Broken path: ${book.title} → ${book.file_path}`);
      }
    }

    if (brokenPaths === 0) {
      console.log(`   ✅ All file paths are valid`);
    } else {
      console.log(`   ❌ Found ${brokenPaths} broken file paths`);
      console.log('      → Run "node reimport_books.js" to fix');
    }

    // Category breakdown
    console.log('\n4. Books by Category:');
    const categories = await pool.query(
      'SELECT category, COUNT(*) as count FROM books GROUP BY category ORDER BY count DESC'
    );
    categories.rows.forEach(cat => {
      console.log(`   📂 ${cat.category}: ${cat.count} books`);
    });

  } catch (err) {
    console.log(`   ❌ Database error: ${err.message}`);
    console.log('      → Check your .env file and PostgreSQL connection');
  }

  // Check for problematic filenames
  console.log('\n5. Checking for problematic files...');
  function findProblematicFiles(dirPath, issues = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        findProblematicFiles(fullPath, issues);
      } else {
        // Check for temp files
        if (file.startsWith('~$')) {
          issues.push({ type: 'temp', file: path.relative(BOOK_DIR, fullPath) });
        }
        // Check for very long names
        if (file.length > 100) {
          issues.push({ type: 'long', file: path.relative(BOOK_DIR, fullPath) });
        }
        // Check for special characters
        if (/[<>:"|?*]/.test(file)) {
          issues.push({ type: 'special', file: path.relative(BOOK_DIR, fullPath) });
        }
      }
    });

    return issues;
  }

  const issues = findProblematicFiles(BOOK_DIR);
  if (issues.length === 0) {
    console.log('   ✅ No problematic files found');
  } else {
    issues.forEach(issue => {
      if (issue.type === 'temp') {
        console.log(`   ⚠️  Temporary file (will be skipped): ${issue.file}`);
      } else if (issue.type === 'long') {
        console.log(`   ⚠️  Very long filename: ${issue.file}`);
      } else if (issue.type === 'special') {
        console.log(`   ⚠️  Special characters in name: ${issue.file}`);
      }
    });
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n📋 Recommendations:');
  
  if (fileCounts.docx > 0 || fileCounts.pptx > 0) {
    console.log(`   • Convert ${fileCounts.docx + fileCounts.pptx} non-PDF files to PDF format`);
  }
  
  if (parseInt((await pool.query('SELECT COUNT(*) FROM books WHERE file_path IS NULL')).rows[0].count) > 0) {
    console.log('   • Run: node reimport_books.js');
  }
  
  if (fileCounts.pdf > parseInt((await pool.query('SELECT COUNT(*) FROM books')).rows[0].count)) {
    console.log('   • Run: node reimport_books.js (to import new PDFs)');
  }

  console.log('\n✨ Diagnosis complete!\n');
  
  await pool.end();
}

diagnoseBooks().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
