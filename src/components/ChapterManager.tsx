'use client'

import { useState, useEffect } from 'react'

interface Chapter {
  title: string
  prompt: string
  content?: string
}

interface ChapterManagerProps {
  numberOfChapters: number
  onChaptersChange: (chapters: Chapter[]) => void
}

export default function ChapterManager({ numberOfChapters, onChaptersChange }: ChapterManagerProps) {
  const [chapters, setChapters] = useState<Chapter[]>([])

  useEffect(() => {
    // Initialize chapters when number changes
    const newChapters = Array.from({ length: numberOfChapters }, (_, index) => ({
      title: `Chapter ${index + 1}`,
      prompt: '',
      content: ''
    }))
    setChapters(newChapters)
    onChaptersChange(newChapters)
  }, [numberOfChapters, onChaptersChange])

  const handleChapterChange = (index: number, field: 'title' | 'prompt', value: string) => {
    const updatedChapters = chapters.map((chapter, i) => 
      i === index ? { ...chapter, [field]: value } : chapter
    )
    setChapters(updatedChapters)
    onChaptersChange(updatedChapters)
  }

  if (numberOfChapters === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Please specify the number of chapters first</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">Chapter Configuration</h3>
        <p className="text-blue-700 text-sm">
          Configure each chapter below. Provide a title and detailed prompt for what you want AI to generate for that chapter.
        </p>
      </div>

      {chapters.map((chapter, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-900 mb-2">Chapter {index + 1}</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Title *
              </label>
              <input
                type="text"
                required
                value={chapter.title}
                onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`e.g., The Beginning, The Discovery, The Resolution`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Prompt/Instructions *
              </label>
              <textarea
                required
                rows={4}
                value={chapter.prompt}
                onChange={(e) => handleChapterChange(index, 'prompt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`Describe what should happen in this chapter. Be specific about characters, plot points, tone, or any special requirements...`}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Each chapter will be generated based on your prompts</p>
        <p>• You can edit the generated content before publishing</p>
        <p>• Be as specific as possible in your chapter prompts for better results</p>
      </div>
    </div>
  )
}