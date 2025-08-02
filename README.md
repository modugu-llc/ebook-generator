# E-book Generator Website

A comprehensive AI-powered e-book generation platform that allows users to create customized books from simple prompts. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Multiple Book Categories
- **Children's Story Books**: Generate age-appropriate stories with customizable characters, settings, and themes
- **Family Recipe Cookbooks**: Create personalized cookbooks with family recipes, photos, and stories  
- **Adventure Books**: Generate books based on user's personal adventures and experiences
- **Funny Quote Books**: Create humorous books like "Things My Mom Says" with user-submitted content
- **General Prompt-based Books**: Allow users to enter any prompt and generate a complete book
- **Photo Books**: Create beautiful photo books with up to 30 images, captions, and professional layouts
- **Custom Book Creation**: Create books with user-defined chapters (up to 20), AI-generated content, and editing capabilities

### Core Functionality
- ✨ **AI-Powered Content Generation**: Smart AI creates engaging content based on user prompts
- 📱 **Multiple Export Formats**: Download books in PDF and EPUB formats
- 🎨 **Professional Design**: Beautiful layouts and cover designs
- 📊 **User Dashboard**: Manage and track all generated books
- 🔄 **Real-time Generation**: Watch your book being created with loading indicators
- 📋 **Category-specific Forms**: Tailored input forms for each book type
- 📸 **Photo Book Support**: Upload up to 30 images with captions and layout options
- ✍️ **Custom Chapter Management**: Create books with user-defined chapters and editing capabilities
- 🔧 **Chapter Editing**: Edit generated content before publishing

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Database**: SQLite with Prisma ORM (easily upgradeable to PostgreSQL)
- **Authentication**: NextAuth.js (configured but simplified for demo)
- **Book Generation**: Custom AI content generation with PDF/EPUB export
- **Development**: ESLint, TypeScript strict mode

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   OPENAI_API_KEY="your-openai-api-key-here"  # Optional for AI integration
   ```

3. **Set up the database** (when Prisma is fully configured)
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## 📖 Usage Guide

### Creating Your First Book

1. **Choose a Category**: Select from Children's Stories, Recipe Cookbooks, Adventure Books, Funny Quotes, or General Prompts
2. **Fill the Form**: Complete the category-specific form with your book details
3. **Generate**: Click "Generate Book" and wait for AI to create your content
4. **Download**: Access your completed book from the dashboard in PDF or EPUB format

### Book Categories

#### Children's Story Books
Perfect for creating magical tales for kids. Input character names, settings, adventures, and moral lessons. Suitable for ages 3-12.

#### Family Recipe Cookbooks  
Compile cherished family recipes with stories and memories. Great for preserving culinary traditions.

#### Adventure Books
Transform your real-life adventures into exciting narratives. Perfect for travel journals and experience sharing.

#### Funny Quote Books
Create hilarious collections of memorable sayings from family, friends, or colleagues.

#### Photo Books
Create visually stunning photo books perfect for travel memories, family albums, or special occasions. Upload up to 30 images with individual captions and choose from professional layout styles.

#### Custom Book Creation
Define your own book structure with custom chapters (up to 20). Provide detailed prompts for each chapter and let AI generate content. Edit and refine chapters before publishing.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── books/         # Book management endpoints
│   │   └── generate/      # Book generation endpoint
│   ├── dashboard/         # User dashboard
│   ├── generate/          # Book creation flow
│   └── page.tsx          # Homepage
├── components/            # Reusable UI components (future)
├── lib/                   # Utilities and configurations
│   ├── book-categories.ts # Book category definitions
│   ├── book-generators.ts # PDF/EPUB generation
│   ├── mock-db.ts        # Development database
│   └── prisma.ts         # Database client
└── types/                # TypeScript type definitions
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Features Implemented

✅ **Core User Interface**
- Modern, responsive homepage with category selection
- Category-specific book generation forms
- User dashboard with book management
- Professional design with Tailwind CSS

✅ **Book Generation Flow**
- 5 different book categories with custom prompts
- Form validation and user input handling
- Loading states and progress indicators
- Success notifications and redirects

✅ **API Infrastructure**
- Book generation endpoint (`/api/generate`)
- Book management endpoint (`/api/books`)
- Download functionality (`/api/books/[id]/download`)
- Mock database with SQLite/Prisma schema

✅ **Book Categories**
- Children's Story Books with character, setting, adventure prompts
- Family Recipe Cookbooks with family stories and recipe types
- Adventure Books with location and experience details
- Funny Quote Books with theme and context
- General Prompt Books with flexible content creation

## 🌟 Demo Screenshots

The application includes:
- Beautiful homepage with category cards
- Detailed book generation forms
- User dashboard with book grid
- Success notifications and download options

## 🔮 Future Enhancements

- Real AI integration with OpenAI/Claude APIs
- User authentication and multi-user support
- Actual PDF/EPUB file generation
- Image generation for book covers
- Advanced book customization options
- File storage integration for generated books

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Created with ❤️ using Next.js and modern web technologies**
