'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { bookCategories } from '@/lib/book-categories'
import type { BookCategory, BookCategoryConfig } from '@/types'
import ImageUpload from '@/components/ImageUpload'
import ChapterManager from '@/components/ChapterManager'

export default function GenerateContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | null>(null)
  const [categoryConfig, setCategoryConfig] = useState<BookCategoryConfig | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [images, setImages] = useState<{ file: File; preview: string; caption: string }[]>([])
  const [chapters, setChapters] = useState<{ title: string; prompt: string; content?: string }[]>([])
  const [numberOfChapters, setNumberOfChapters] = useState<number>(0)

  useEffect(() => {
    const category = searchParams.get('category') as BookCategory
    if (category && bookCategories.find(c => c.id === category)) {
      setSelectedCategory(category)
      const config = bookCategories.find(c => c.id === category)
      setCategoryConfig(config || null)
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory || !categoryConfig) return

    setIsGenerating(true)
    
    try {
      // Prepare form data with special handling for new book types
      const bookData = {
        title: formData.title,
        author: formData.author,
        category: selectedCategory,
        formData,
        images: selectedCategory === 'PHOTO_BOOK' ? images : undefined,
        chapters: selectedCategory === 'CUSTOM_BOOK' ? chapters : undefined,
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })

      const result = await response.json()

      if (result.success) {
        router.push('/dashboard?generated=true')
      } else {
        alert('Failed to generate book. Please try again.')
        setIsGenerating(false)
      }
    } catch (error) {
      console.error('Error generating book:', error)
      alert('An error occurred. Please try again.')
      setIsGenerating(false)
    }
  }

  if (!selectedCategory || !categoryConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Select a Book Category</h1>
          <p className="text-gray-600 mb-6">Please choose a category to get started</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back to Categories
          </button>
        </div>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Book...</h1>
          <p className="text-gray-600">This may take a few moments. Please wait while our AI creates your personalized e-book.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Categories
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create Your Book</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Category Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{categoryConfig.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{categoryConfig.name}</h2>
              <p className="text-gray-600">{categoryConfig.description}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your book title"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter author name"
                  value={formData.author || ''}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                />
              </div>
            </div>

            {/* Category-specific prompts */}
            {categoryConfig.prompts.map((prompt, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {prompt.label} {prompt.required && '*'}
                </label>
                {prompt.type === 'textarea' ? (
                  <textarea
                    required={prompt.required}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={prompt.placeholder}
                    value={formData[prompt.label] || ''}
                    onChange={(e) => handleInputChange(prompt.label, e.target.value)}
                  />
                ) : prompt.type === 'select' ? (
                  <select
                    required={prompt.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData[prompt.label] || ''}
                    onChange={(e) => handleInputChange(prompt.label, e.target.value)}
                  >
                    <option value="">{prompt.placeholder}</option>
                    {prompt.options?.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                ) : prompt.type === 'number' ? (
                  <input
                    type="number"
                    required={prompt.required}
                    min="1"
                    max={prompt.max || undefined}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={prompt.placeholder}
                    value={formData[prompt.label] || ''}
                    onChange={(e) => {
                      handleInputChange(prompt.label, e.target.value)
                      if (prompt.label === 'Number of Chapters') {
                        setNumberOfChapters(parseInt(e.target.value) || 0)
                      }
                    }}
                  />
                ) : prompt.type === 'file' ? (
                  <ImageUpload
                    onImagesChange={setImages}
                    maxImages={prompt.max || 30}
                    accept={prompt.accept}
                    required={prompt.required}
                  />
                ) : (
                  <input
                    type="text"
                    required={prompt.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={prompt.placeholder}
                    value={formData[prompt.label] || ''}
                    onChange={(e) => handleInputChange(prompt.label, e.target.value)}
                  />
                )}
              </div>
            ))}

            {/* Chapter Manager for Custom Books */}
            {selectedCategory === 'CUSTOM_BOOK' && numberOfChapters > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Configure Your Chapters</h3>
                <ChapterManager
                  numberOfChapters={numberOfChapters}
                  onChaptersChange={setChapters}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Generate Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}