#!/usr/bin/env node

/**
 * Complete Book Setup Script
 * This script will:
 * 1. Check database connection
 * 2. Initialize database if needed
 * 3. Run diagnostics
 * 4. Import/update all books
 */

const { Pool } = require('pg');
const { execSync } = require('child_process');
require('dotenv').config();

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function header(message) {
  console.log('\n' + '='.repeat(70));
  log(message, colors.bright + colors.cyan);
  console.log('='.repeat(70) + '\n');
}

async function checkDatabase() {
  header('📊 Step 1: Checking Database Connection');
  
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'ebooks',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
  });

  try {
    await pool.query('SELECT NOW()');
    log('✅ Database connection successful!', colors.green);
    await pool.end();
    return true;
  } catch (err) {
    log('❌ Database connection failed!', colors.red);
    log(`Error: ${err.message}`, colors.red);
    log('\n💡 Tips:', colors.yellow);
    log('   1. Make sure PostgreSQL is running');
    log('   2. Check your .env file for correct credentials');
    log('   3. Ensure the database "ebooks" exists');
    await pool.end();
    return false;
  }
}

async function initializeDatabase() {
  header('🔧 Step 2: Initializing Database');
  
  try {
    log('Running init_db.js...', colors.cyan);
    execSync('node init_db.js', { stdio: 'inherit' });
    log('✅ Database initialized successfully!', colors.green);
    return true;
  } catch (err) {
    log('❌ Database initialization failed!', colors.red);
    return false;
  }
}

async function runDiagnostics() {
  header('🔍 Step 3: Running Diagnostics');
  
  try {
    execSync('node diagnose_books.js', { stdio: 'inherit' });
    return true;
  } catch (err) {
    log('⚠️  Diagnostics encountered issues', colors.yellow);
    return false;
  }
}

async function importBooks() {
  header('📚 Step 4: Importing Books');
  
  try {
    log('Running reimport_books.js...', colors.cyan);
    execSync('node reimport_books.js', { stdio: 'inherit' });
    log('\n✅ Books imported successfully!', colors.green);
    return true;
  } catch (err) {
    log('❌ Book import failed!', colors.red);
    return false;
  }
}

async function main() {
  console.clear();
  log('╔════════════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║          📚 E-Book Management System - Setup Script 📚            ║', colors.bright + colors.cyan);
  log('╚════════════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  
  // Step 1: Check database
  const dbConnected = await checkDatabase();
  if (!dbConnected) {
    log('\n❌ Setup cannot continue without database connection.', colors.red);
    log('Please fix the database connection and try again.', colors.yellow);
    process.exit(1);
  }

  // Step 2: Initialize database
  await initializeDatabase();

  // Step 3: Run diagnostics
  await runDiagnostics();

  // Step 4: Import books
  const imported = await importBooks();

  // Final summary
  header('✨ Setup Complete!');
  
  if (imported) {
    log('Your book management system is ready to use!', colors.green);
    log('\n📋 Next Steps:', colors.bright);
    log('   1. Start the backend server:', colors.cyan);
    log('      → node server.js', colors.yellow);
    log('\n   2. Start the frontend (in a new terminal):', colors.cyan);
    log('      → cd ../frontend && npm run dev', colors.yellow);
    log('\n   3. Open your browser and test the application', colors.cyan);
  } else {
    log('⚠️  Setup completed with some issues.', colors.yellow);
    log('Please review the errors above and try again.', colors.yellow);
  }

  console.log('\n' + '='.repeat(70) + '\n');
}

main().catch(err => {
  log('\n❌ Fatal error during setup:', colors.red);
  console.error(err);
  process.exit(1);
});
