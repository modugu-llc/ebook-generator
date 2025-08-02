'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { bookCategories } from '@/lib/bookCategories';

export default function CreateBook() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    router.push(`/create/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="text-2xl font-bold text-gray-900 hover:text-blue-600"
              >
                📚 E-book Generator
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Login</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Book Category
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the type of book you&apos;d like to create. Each category has customized prompts 
            to help you generate the perfect content.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`${category.color} border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105`}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">📝</span>
                <span>{category.fields.length} prompts</span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">1️⃣</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Choose Category</h4>
                <p className="text-sm text-gray-600">Select the type of book that matches your vision</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">2️⃣</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Fill Prompts</h4>
                <p className="text-sm text-gray-600">Answer category-specific questions to guide the AI</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">3️⃣</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Generate & Download</h4>
                <p className="text-sm text-gray-600">AI creates your book and you download as PDF/EPUB</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}