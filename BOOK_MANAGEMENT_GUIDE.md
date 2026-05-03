# 📚 Book Management Guide

## Issues Found & Fixed

### Problems Identified:
1. ❌ **Missing file paths** - Books in database without `file_path` couldn't be opened
2. ❌ **Space encoding issues** - Folders with spaces (e.g., "BIG DATA", "Deep learing") caused URL errors
3. ❌ **Non-PDF files** - `.pptx`, `.docx`, `.jpg` files can't open directly in browser
4. ❌ **Temporary files** - Word temp files (`~$*.docx`) were being imported
5. ❌ **Inconsistent path separators** - Windows backslashes vs URL forward slashes

### Solutions Applied:
1. ✅ **Updated import script** - Now only imports PDF files (browser-compatible)
2. ✅ **Fixed path encoding** - Properly encodes spaces and special characters in URLs
3. ✅ **Skip temp files** - Ignores files starting with `~$`
4. ✅ **Update existing books** - Adds missing file paths to existing database entries
5. ✅ **Cross-platform paths** - Converts Windows paths to URL-friendly format

---

## 🚀 How to Fix Your Books

### Step 1: Update Database Password
Edit `backend/.env` and set your PostgreSQL password:
```env
DB_PASSWORD=your_actual_password_here
```

### Step 2: Initialize Database (if not done)
```bash
cd backend
node init_db.js
```

### Step 3: Reimport All Books
```bash
cd backend
node reimport_books.js
```

This will:
- Scan all PDF files in the `BOOK` folder
- Add new books to the database
- Update existing books with correct file paths
- Skip non-PDF files and temporary files

### Step 4: Start the Backend Server
```bash
cd backend
node server.js
```

### Step 5: Start the Frontend
```bash
cd frontend
npm run dev
```

---

## 📁 Folder Structure

Your books are organized by subject:
```
BOOK/
├── BIG DATA/          (7 files - 6 PDFs, 1 PPTX)
├── CNS/               (1 PDF)
├── Deep learing/      (6 files - 5 PDFs, 1 non-PDF)
├── DM/                (12 PDFs)
├── DS/                (2 PDFs)
├── JAVA/              (5 PDFs)
├── MA/                (12 files - 11 PDFs, 1 JPG)
├── OR/                (2 PDFs)
├── QUETION PAPPER/    (1 PDF)
├── R PROGRAM/         (4 PDFs)
├── RDBMS/             (2 PDFs)
├── SE/                (4 PDFs)
├── SQL/               (3 PDFs)
├── ST/                (6 PDFs)
├── WD/                (3 PDFs)
└── Other files        (4 PDFs at root level)
```

**Note:** Only PDF files will be imported. PowerPoint (`.pptx`), Word (`.docx`), and image files need to be converted to PDF first.

---

## 🔧 Converting Non-PDF Files

To make PowerPoint and Word files accessible:

### Option 1: Manual Conversion
1. Open the file in Microsoft Office or LibreOffice
2. Click **File → Save As → PDF**
3. Save in the same folder

### Option 2: Batch Conversion (Windows)
Use PowerShell script (create `convert_to_pdf.ps1`):
```powershell
# Requires Microsoft Office installed
$word = New-Object -ComObject Word.Application
$word.Visible = $false

Get-ChildItem -Path "BOOK" -Recurse -Include *.docx,*.doc | ForEach-Object {
    $doc = $word.Documents.Open($_.FullName)
    $pdfPath = $_.FullName -replace '\.(docx|doc)$', '.pdf'
    $doc.SaveAs($pdfPath, 17)  # 17 = PDF format
    $doc.Close()
}

$word.Quit()
```

---

## 🐛 Troubleshooting

### Books Not Opening?
1. Check if `file_path` exists in database:
   ```sql
   SELECT title, file_path FROM books WHERE file_path IS NULL;
   ```
2. Run `node reimport_books.js` to fix missing paths

### "404 Not Found" Error?
- Verify the file exists in the `BOOK` folder
- Check file path in database matches actual location
- Ensure backend server is running on port 5000

### Spaces in Filenames?
- The fix automatically encodes spaces in URLs
- If still having issues, rename folders to use underscores instead

### Database Connection Error?
- Verify PostgreSQL is running
- Check credentials in `backend/.env`
- Ensure database `ebooks` exists

---

## 📊 Database Schema

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Published',
  file_path TEXT
);
```

---

## 🎯 Best Practices

1. **Use PDF format** - Most compatible with browsers
2. **Avoid spaces** - Use underscores in folder/file names
3. **Organize by subject** - Keep related books in same folder
4. **Run reimport** - After adding new books, run `node reimport_books.js`
5. **Backup database** - Regularly backup your PostgreSQL database

---

## 📝 Quick Commands

```bash
# Initialize database
cd backend && node init_db.js

# Import/update books
cd backend && node reimport_books.js

# Start backend
cd backend && node server.js

# Start frontend (new terminal)
cd frontend && npm run dev

# Check database
psql -U postgres -d ebooks -c "SELECT COUNT(*) FROM books;"
```

---

## ✨ What's Working Now

- ✅ All PDF files are properly imported
- ✅ File paths with spaces work correctly
- ✅ Books open in new browser tab
- ✅ Categories are auto-detected from folder names
- ✅ Existing books are updated, not duplicated
- ✅ Temporary files are ignored

---

## 📞 Need Help?

If books still won't open:
1. Check browser console (F12) for errors
2. Verify backend logs for file path issues
3. Ensure file permissions allow reading
4. Try accessing file directly: `http://localhost:5000/files/FOLDER/FILE.pdf`
