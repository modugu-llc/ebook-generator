'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// Mock book data
const mockBooks = [
  {
    id: '1',
    title: 'Luna\'s Magical Adventure',
    author: 'Jane Smith',
    category: 'CHILDRENS_STORY',
    status: 'COMPLETED',
    createdAt: new Date('2024-01-15'),
    coverImage: null,
  },
  {
    id: '2', 
    title: 'Grandma\'s Italian Recipes',
    author: 'John Doe',
    category: 'RECIPE_COOKBOOK',
    status: 'COMPLETED',
    createdAt: new Date('2024-01-10'),
    coverImage: null,
  }
]

export default function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [books, setBooks] = useState(mockBooks)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('generated') === 'true') {
      setShowSuccess(true)
      
      // Try to get the category from the previous page's localStorage or URL
      const category = searchParams.get('category') || localStorage.getItem('lastBookCategory') || 'GENERAL_PROMPT'
      
      // Add a new generated book with the correct category
      const newBook = {
        id: Date.now().toString(),
        title: getDefaultTitle(category),
        author: 'You',
        category: category,
        status: 'COMPLETED' as const,
        createdAt: new Date(),
        coverImage: null,
      }
      setBooks(prev => [newBook, ...prev])
      
      // Clear the localStorage and query parameter
      localStorage.removeItem('lastBookCategory')
      router.replace('/dashboard')
    }
  }, [searchParams, router])

  const getDefaultTitle = (category: string) => {
    switch (category) {
      case 'PHOTO_BOOK': return 'My Photo Book'
      case 'CUSTOM_BOOK': return 'My Custom Book'
      case 'CHILDRENS_STORY': return 'My Children\'s Story'
      case 'RECIPE_COOKBOOK': return 'My Recipe Cookbook'
      case 'ADVENTURE': return 'My Adventure Book'
      case 'FUNNY_QUOTES': return 'My Funny Quotes'
      default: return 'My New Generated Book'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'CHILDRENS_STORY': return '📚'
      case 'RECIPE_COOKBOOK': return '👩‍🍳'
      case 'ADVENTURE': return '🎒'
      case 'FUNNY_QUOTES': return '😂'
      case 'GENERAL_PROMPT': return '✨'
      case 'PHOTO_BOOK': return '📸'
      case 'CUSTOM_BOOK': return '✍️'
      default: return '📖'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'CHILDRENS_STORY': return "Children's Story"
      case 'RECIPE_COOKBOOK': return 'Recipe Cookbook'
      case 'ADVENTURE': return 'Adventure Book'
      case 'FUNNY_QUOTES': return 'Funny Quotes'
      case 'GENERAL_PROMPT': return 'General Book'
      case 'PHOTO_BOOK': return 'Photo Book'
      case 'CUSTOM_BOOK': return 'Custom Book'
      default: return 'Book'
    }
  }

  const handleDownload = (bookId: string, format: 'pdf' | 'epub') => {
    // Simulate download
    alert(`Downloading book ${bookId} as ${format.toUpperCase()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                📖 EBook Generator
              </Link>
            </div>
            <nav className="space-x-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/generate" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create New Book
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-green-400">✅</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Book Generated Successfully!
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Your new e-book has been created and is ready for download.
                </p>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="ml-auto text-green-500 hover:text-green-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
          <p className="text-gray-600 mt-2">Manage and download your generated e-books</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">📚</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-2xl font-bold text-gray-900">{books.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">✅</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {books.filter(b => b.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">📅</div>
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {books.filter(b => {
                    const now = new Date()
                    const bookDate = new Date(b.createdAt)
                    return bookDate.getMonth() === now.getMonth() && bookDate.getFullYear() === now.getFullYear()
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Cover Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">{getCategoryIcon(book.category)}</div>
                  <div className="text-lg font-semibold">{book.title}</div>
                  <div className="text-sm opacity-80">by {book.author}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {getCategoryName(book.category)}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {book.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {book.author}</p>
                
                <div className="text-xs text-gray-500 mb-4">
                  Created: {book.createdAt.toLocaleDateString()}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(book.id, 'pdf')}
                    className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleDownload(book.id, 'epub')}
                    className="flex-1 border border-indigo-600 text-indigo-600 px-3 py-2 rounded text-sm hover:bg-indigo-50 transition-colors"
                  >
                    Download EPUB
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Book Card */}
          <Link 
            href="/generate"
            className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors overflow-hidden group"
          >
            <div className="h-48 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">➕</div>
                <div className="text-lg font-semibold text-gray-600 group-hover:text-indigo-600">
                  Create New Book
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-center">
                Start creating your next e-book with our AI-powered generator
              </p>
            </div>
          </Link>
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books yet</h3>
            <p className="text-gray-600 mb-6">Create your first e-book to get started</p>
            <Link 
              href="/generate"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Your First Book
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}