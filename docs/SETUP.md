# Setup Instructions

## Prerequisites

Before setting up the E-book Generator, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

## Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ebook-generator
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit the .env file with your configuration
# PORT=5000
# NODE_ENV=development
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# DATABASE_PATH=../database/ebook_generator.db
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
```

### 4. Database Setup

The SQLite database will be automatically created when you first start the backend server. No additional setup is required.

### 5. Start the Development Servers

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## Production Setup

### 1. Environment Configuration

**Backend (.env):**
```bash
PORT=5000
NODE_ENV=production
JWT_SECRET=your-very-secure-production-jwt-secret
DATABASE_PATH=./database/ebook_generator.db
```

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### 2. Build the Applications

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
```bash
cd backend
npm start
```

### 3. Process Management

For production, consider using PM2 or similar process managers:

```bash
# Install PM2
npm install -g pm2

# Start backend with PM2
cd backend
pm2 start npm --name "ebook-backend" -- start

# Start frontend with PM2
cd frontend
pm2 start npm --name "ebook-frontend" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

## Docker Setup (Optional)

### Backend Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 5000

CMD ["npm", "start"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml` in the project root:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=your-production-secret
    volumes:
      - ./database:/app/database

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000/api
    depends_on:
      - backend
```

Run with:
```bash
docker-compose up -d
```

## Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

**2. Database Connection Error**
- Ensure the `database` directory exists in the project root
- Check file permissions for the database directory
- Verify the `DATABASE_PATH` in your `.env` file

**3. CORS Issues**
- Ensure the frontend is configured with the correct API URL
- Check that CORS is properly configured in the backend

**4. JWT Token Issues**
- Verify the `JWT_SECRET` is set in the backend `.env` file
- Clear browser localStorage and re-login

**5. Module Not Found Errors**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables

**Required Backend Variables:**
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT tokens
- `DATABASE_PATH` - Path to SQLite database file

**Optional Backend Variables:**
- `NODE_ENV` - Environment (development/production)

**Optional Frontend Variables:**
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000/api)

### Database Schema

The database tables are automatically created on first run. If you need to reset the database:

```bash
# Remove the database file
rm database/ebook_generator.db

# Restart the backend server to recreate tables
cd backend
npm run dev
```

## Development Tools

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript and JavaScript Language Features**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

### Useful Scripts

**Backend:**
```bash
npm run dev    # Start with nodemon for development
npm start      # Start in production mode
npm test       # Run tests (to be implemented)
```

**Frontend:**
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## Next Steps

After setup, you can:

1. **Create your first book** by visiting http://localhost:3000
2. **Test the API** using the health endpoint
3. **Explore the codebase** to understand the architecture
4. **Add new features** by following the development guidelines
5. **Deploy to production** using the production setup guide

For additional help, refer to:
- [API Documentation](./API.md)
- [Frontend README](../frontend/README.md)
- [Backend Documentation](../backend/)
- [GitHub Issues](../../issues) for bug reports and feature requests