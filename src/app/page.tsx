'use client'

import Link from 'next/link'
import { bookCategories } from '@/lib/book-categories'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">📖 EBook Generator</h1>
            </div>
            <nav className="space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                My Books
              </Link>
              <Link 
                href="/auth/signin" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Create Amazing E-books with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your ideas into professional e-books with our AI-powered generator. 
            Choose from multiple categories and let our smart system create beautiful books for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#categories" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Creating
            </Link>
            <Link 
              href="/gallery" 
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              View Samples
            </Link>
          </div>
        </div>
      </section>

      {/* Book Categories */}
      <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Book Category
            </h3>
            <p className="text-lg text-gray-600">
              Select the type of book you want to create and get started with our guided prompts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookCategories.map((category) => (
              <div 
                key={category.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {category.name}
                </h4>
                <p className="text-gray-600 mb-6">
                  {category.description}
                </p>
                <Link 
                  href={`/generate?category=${category.id}`}
                  className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Create Book
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Generation</h4>
              <p className="text-gray-600">
                Advanced AI creates engaging content based on your prompts and preferences
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Multiple Formats</h4>
              <p className="text-gray-600">
                Download your books in PDF and EPUB formats for any device
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Professional Design</h4>
              <p className="text-gray-600">
                Beautiful layouts and cover designs make your books look professional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">📖 EBook Generator</h3>
          <p className="text-gray-400 mb-6">
            Creating amazing e-books with the power of AI
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
