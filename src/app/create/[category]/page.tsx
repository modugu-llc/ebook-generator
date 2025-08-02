'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { bookCategories } from '@/lib/bookCategories';
import { BookCategory, FormField } from '@/types';

export default function CategoryForm() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.category as string;
  
  const [category, setCategory] = useState<BookCategory | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const foundCategory = bookCategories.find(cat => cat.id === categoryId);
    if (foundCategory) {
      setCategory(foundCategory);
      // Initialize form data with empty values
      const initialData: Record<string, string> = {};
      foundCategory.fields.forEach(field => {
        initialData[field.id] = '';
      });
      setFormData(initialData);
    } else {
      router.push('/create');
    }
  }, [categoryId, router]);

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!category) return false;

    category.fields.forEach(field => {
      if (field.required && !formData[field.id]?.trim()) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    
    try {
      // For now, simulate book generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to a preview/generation page
      router.push(`/generate?category=${categoryId}&data=${encodeURIComponent(JSON.stringify(formData))}`);
    } catch (error) {
      console.error('Error generating book:', error);
      alert('Error generating book. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderField = (field: FormField) => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const errorClasses = errors[field.id] ? "border-red-500" : "";

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <input
            type={field.type}
            id={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`${baseClasses} ${errorClasses}`}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`${baseClasses} ${errorClasses} resize-vertical`}
          />
        );
      
      case 'select':
        return (
          <select
            id={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
          >
            <option value="">Select an option...</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
              <button 
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <button className="text-gray-600 hover:text-gray-900">Login</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {category.title}
          </h1>
          <p className="text-lg text-gray-600">
            {category.description}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {category.fields.map((field, index) => (
              <div key={field.id}>
                <label 
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {renderField(field)}
                
                {field.description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {field.description}
                  </p>
                )}
                
                {errors[field.id] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Your Book...
                  </div>
                ) : (
                  'Generate My Book'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 Tips for Better Results
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Be specific in your descriptions for more personalized content</li>
            <li>• Include details that make your book unique to you</li>
            <li>• The more context you provide, the better the AI can tailor the content</li>
            <li>• You can always edit the generated content before finalizing</li>
          </ul>
        </div>
      </main>
    </div>
  );
}