# E-book Generator

AI-powered e-book generation platform for creating custom books from simple prompts.

## 🌟 Features

- **Multiple Book Categories** - Children's Stories, Cookbooks, Adventure Books, Science Fiction, Romance, Mystery, Biography, Self-Help, Educational, Fantasy
- **AI-Powered Content Generation** - Transform your ideas into engaging book content
- **User Authentication** - Secure user registration and login system
- **Book Management** - Create, preview, and manage your books
- **Export Options** - Download books as PDF or EPUB formats
- **Modern UI** - Clean, responsive design built with Next.js and Tailwind CSS
- **RESTful API** - Comprehensive backend API for book and user management

## 🏗️ Project Structure

```
ebook-generator/
├── frontend/           # Next.js React application
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/ # Reusable components
│   │   ├── contexts/  # React contexts (Auth)
│   │   ├── lib/       # API client and utilities
│   │   └── hooks/     # Custom React hooks
│   └── ...
├── backend/           # Express.js API server
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Authentication middleware
│   └── server.js      # Main server file
├── database/          # SQLite database
│   └── ebook_generator.db
└── docs/             # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ebook-generator
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   DATABASE_PATH=../database/ebook_generator.db
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📖 Usage

### Creating Your First Book

1. **Visit the homepage** at http://localhost:3000
2. **Choose a category** from the available options
3. **Sign up or log in** to your account
4. **Fill out the book creation form**:
   - Enter a compelling title
   - Select your book category
   - Write a detailed prompt describing your book
5. **Generate your book** and preview the AI-generated content
6. **Export your book** as PDF or EPUB

### Sample Workflow

```bash
# 1. Start both servers
cd backend && npm run dev &
cd frontend && npm run dev

# 2. Open browser to http://localhost:3000
# 3. Select "Children's Stories"
# 4. Register a new account
# 5. Create a book with:
#    Title: "The Magic Forest Adventure"
#    Category: "Children's Stories"  
#    Prompt: "A story about a young girl who discovers a magical forest where animals can talk and she must help them save their home from an evil wizard."
# 6. Preview and export your generated book
```

## 🔧 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - State management for authentication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite** - Lightweight database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Database Schema

**Users Table**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Books Table**
```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT,
  status TEXT DEFAULT 'draft',
  file_path TEXT,
  file_type TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 🔌 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/validate` - Validate JWT token

### Book Endpoints

- `GET /api/books/categories` - Get available book categories
- `POST /api/books` - Create a new book
- `GET /api/books/my-books` - Get user's books
- `GET /api/books/:id` - Get a specific book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `POST /api/books/:id/export/pdf` - Export book as PDF
- `POST /api/books/:id/export/epub` - Export book as EPUB

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🚀 Future Expansion

This is a base implementation designed for future expansion. Planned enhancements include:

### AI Integration
- **OpenAI GPT Integration** - Replace stub with real AI content generation
- **Custom Model Training** - Train models for specific book genres
- **Content Enhancement** - Advanced editing and refinement tools

### Authentication & Security
- **OAuth/SSO Integration** - Google, Facebook, GitHub authentication
- **Advanced User Roles** - Admin, premium users, collaborators
- **API Rate Limiting** - Prevent abuse and ensure fair usage

### Content Features
- **Chapter Management** - Multi-chapter books with navigation
- **Collaborative Editing** - Share and edit books with others
- **Templates** - Pre-built book templates and structures
- **Rich Text Editor** - Advanced content editing capabilities

### Export & Publishing
- **Advanced PDF Generation** - Custom layouts, fonts, images
- **EPUB Enhancement** - Rich formatting, interactive elements
- **Publishing Integration** - Direct publishing to platforms
- **Print-Ready Formats** - High-quality print layouts

### Analytics & Insights
- **Usage Analytics** - Track book creation and user engagement
- **Content Analysis** - Sentiment, readability, and quality metrics
- **Performance Monitoring** - API performance and error tracking

## 🛠️ Development

### Running Tests
```bash
# Backend tests (to be implemented)
cd backend && npm test

# Frontend tests (to be implemented)  
cd frontend && npm test
```

### Building for Production
```bash
# Build frontend
cd frontend && npm run build

# Production backend
cd backend && npm start
```

### Environment Variables

**Backend (.env)**
```
PORT=5000
NODE_ENV=production
JWT_SECRET=your-production-jwt-secret
DATABASE_PATH=../database/ebook_generator.db
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` directory
- Review the API documentation above

---

**Happy book creating! 📚✨**