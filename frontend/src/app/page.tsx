'use client';

import { useState } from 'react';
import Link from 'next/link';

const BOOK_CATEGORIES = [
  'Children\'s Stories',
  'Cookbooks',
  'Adventure Books',
  'Science Fiction',
  'Romance',
  'Mystery',
  'Biography',
  'Self-Help',
  'Educational',
  'Fantasy'
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">📚 E-book Generator</h1>
            </div>
            <nav className="flex space-x-4">
              <Link 
                href="/auth/login" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Create Amazing Books
            <span className="block text-blue-600">with AI Power</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transform your ideas into beautiful e-books with our AI-powered platform. 
            Choose from multiple categories and let creativity flow.
          </p>
        </div>

        {/* Category Selection */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Choose Your Book Category
          </h3>
          <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto sm:grid-cols-3 lg:grid-cols-5">
            {BOOK_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {getCategoryIcon(category)}
                  </div>
                  <h4 className="font-medium text-sm">{category}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Get Started Button */}
        {selectedCategory && (
          <div className="mt-12 text-center">
            <Link
              href={`/books/create?category=${encodeURIComponent(selectedCategory)}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 inline-flex items-center"
            >
              Start Creating Your {selectedCategory} Book
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our E-book Generator?
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-gray-600">
                Advanced AI technology generates engaging content based on your prompts and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Multiple Formats</h4>
              <p className="text-gray-600">
                Export your books as PDF or EPUB for easy sharing and publishing across platforms.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h4>
              <p className="text-gray-600">
                Simple interface that makes book creation accessible to everyone, regardless of writing experience.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  const icons: { [key: string]: string } = {
    'Children\'s Stories': '🧸',
    'Cookbooks': '👨‍🍳',
    'Adventure Books': '🗺️',
    'Science Fiction': '🚀',
    'Romance': '💕',
    'Mystery': '🔍',
    'Biography': '👤',
    'Self-Help': '💪',
    'Educational': '🎓',
    'Fantasy': '🐉'
  };
  return icons[category] || '📖';
}
