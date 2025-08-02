'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';
import { apiClient, Book } from '../../../lib/api';

export default function PreviewBookPage() {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exportLoading, setExportLoading] = useState<'pdf' | 'epub' | null>(null);
  const [exportMessage, setExportMessage] = useState('');
  
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const bookId = searchParams.get('id');
    if (!bookId) {
      router.push('/books/create');
      return;
    }

    fetchBook(parseInt(bookId));
  }, [user, router, searchParams]);

  const fetchBook = async (bookId: number) => {
    const response = await apiClient.getBook(bookId);
    
    if (response.success && response.data) {
      setBook(response.data.book);
    } else {
      setError(response.error || 'Failed to fetch book');
    }
    
    setLoading(false);
  };

  const handleExport = async (format: 'pdf' | 'epub') => {
    if (!book) return;
    
    setExportLoading(format);
    setExportMessage('');

    const response = format === 'pdf' 
      ? await apiClient.exportToPDF(book.id)
      : await apiClient.exportToEPUB(book.id);
    
    if (response.success && response.data) {
      setExportMessage(response.data.note);
    } else {
      setExportMessage(response.error || 'Export failed');
    }
    
    setExportLoading(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view books</h2>
          <Link 
            href="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your book...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Book not found'}</p>
          <Link 
            href="/books/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Create New Book
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">📚 E-book Generator</Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Book Preview</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/books/create" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create Another Book
              </Link>
              <span className="text-gray-600">Welcome, {user.first_name}!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {book.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    Created {new Date(book.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-gray-600 mb-4">
                  <strong>Original Prompt:</strong> {book.prompt}
                </p>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Content</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {book.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Actions</h3>
              
              <div className="space-y-4">
                {/* Export Options */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Export Your Book</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleExport('pdf')}
                      disabled={exportLoading === 'pdf'}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {exportLoading === 'pdf' ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Exporting...
                        </span>
                      ) : (
                        '📄 Export as PDF'
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleExport('epub')}
                      disabled={exportLoading === 'epub'}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {exportLoading === 'epub' ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Exporting...
                        </span>
                      ) : (
                        '📚 Export as EPUB'
                      )}
                    </button>
                  </div>
                </div>

                {exportMessage && (
                  <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm">
                    {exportMessage}
                  </div>
                )}

                {/* Book Info */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Book Details</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Status:</strong> {book.status}</p>
                    <p><strong>Word Count:</strong> ~{book.content.split(' ').length} words</p>
                    <p><strong>Category:</strong> {book.category}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="border-t pt-4 space-y-2">
                  <Link
                    href="/books/create"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center block"
                  >
                    Create New Book
                  </Link>
                  
                  <Link
                    href="/"
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center block"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}