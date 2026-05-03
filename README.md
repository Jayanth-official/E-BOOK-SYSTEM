# 📚 E-Book Management System

A modern, full-stack web application for managing and accessing digital books with an AI-powered assistant, built with React, Node.js, Express, and PostgreSQL.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

## ✨ Features

- 📖 **Digital Library Management** - Organize and access your book collection
- 🤖 **AI Assistant** - Get help finding books and preparing for exams
- 📝 **Question Papers Portal** - Access previous year papers and practice materials
- 🎨 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 🔍 **Smart Search** - Find books by title, author, or category
- 📊 **Dashboard** - Track your library statistics and recent additions
- 🎯 **Exam Portal** - Take assessments and track your progress
- 👤 **User Management** - Secure login and signup system

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Three.js** - 3D graphics and animations
- **Lucide React** - Beautiful icon library
- **CSS3** - Glassmorphism and modern styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **PostgreSQL** - Relational database
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Package manager

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Jayanth-official/E-BOOK-SYSTEM.git
cd E-BOOK-SYSTEM
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the `backend` directory:
```env
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ebooks
PORT=5000
```

### 5. Setup Database and Import Books
```bash
cd backend
node setup_books.js
```

This will:
- ✅ Initialize the PostgreSQL database
- ✅ Create necessary tables
- ✅ Import all PDF books from the BOOK folder
- ✅ Run diagnostics

## 🎯 Running the Application

### Start Backend Server
```bash
cd backend
node server.js
```
Backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173` (or next available port)

### Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
E-BOOK-SYSTEM/
├── backend/
│   ├── db.js                 # Database configuration
│   ├── server.js             # Express server
│   ├── init_db.js            # Database initialization
│   ├── import_books.js       # Book import script
│   ├── reimport_books.js     # Reimport with fixes
│   ├── diagnose_books.js     # Diagnostic tool
│   ├── setup_books.js        # Complete setup script
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables (not in git)
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── ThreeDScene.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── QuestionPapers.jsx
│   │   │   ├── ExamPortal.jsx
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
│
├── BOOK/                     # Book storage directory
│   ├── BIG DATA/
│   ├── CNS/
│   ├── Deep learing/
│   ├── DM/
│   └── ... (organized by subject)
│
├── QUICK_START.md            # Quick start guide
├── BOOK_MANAGEMENT_GUIDE.md  # Detailed book management guide
├── FIXES_APPLIED.md          # Technical documentation
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 📚 Book Management

### Adding New Books
1. Place PDF files in the `BOOK` folder (organized by subject)
2. Run the import script:
```bash
cd backend
node reimport_books.js
```

### Supported Formats
- ✅ **PDF** - Fully supported (opens in browser)
- ⚠️ **DOCX/PPTX** - Need conversion to PDF first

### Diagnostics
Check for issues with your book collection:
```bash
cd backend
node diagnose_books.js
```

## 🔧 Available Scripts

### Backend
```bash
node init_db.js          # Initialize database
node import_books.js     # Import books
node reimport_books.js   # Reimport with updates
node diagnose_books.js   # Run diagnostics
node setup_books.js      # Complete setup
node server.js           # Start server
```

### Frontend
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## 🎨 Features in Detail

### Dashboard
- View library statistics
- See recently added books
- Quick access to popular categories
- Track downloads and user activity

### AI Assistant
- Natural language book search
- Exam preparation help
- Topic explanations
- Personalized recommendations

### Question Papers Portal
- Browse previous year papers
- Filter by subject and year
- Download or view online
- Organized by category

### Exam Portal
- Take practice assessments
- 30-question format
- Instant grading
- Track your progress

## 🔒 Security Notes

- Never commit `.env` files to git
- Keep database credentials secure
- Use environment variables for sensitive data
- The `.gitignore` file excludes sensitive files

## 🐛 Troubleshooting

### Books Not Opening?
```bash
cd backend
node diagnose_books.js
node reimport_books.js
```

### Database Connection Error?
1. Verify PostgreSQL is running
2. Check credentials in `backend/.env`
3. Ensure database `ebooks` exists

### Port Already in Use?
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically use next available port

## 📖 Documentation

- [Quick Start Guide](QUICK_START.md) - Get started in 3 steps
- [Book Management Guide](BOOK_MANAGEMENT_GUIDE.md) - Detailed book management
- [Fixes Applied](FIXES_APPLIED.md) - Technical documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Jayanth**
- GitHub: [@Jayanth-official](https://github.com/Jayanth-official)

## 🙏 Acknowledgments

- React team for the amazing framework
- PostgreSQL community
- All contributors and users

## 📞 Support

If you have any questions or need help, please:
1. Check the documentation files
2. Run `node diagnose_books.js` for book issues
3. Open an issue on GitHub

---

**Made with ❤️ by Jayanth**

⭐ Star this repository if you find it helpful!
