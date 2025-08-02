'use client'

import { useState, useEffect } from 'react'

interface Chapter {
  id: string
  title: string
  prompt: string
  specificInclusions: string
}

interface CustomBookFormProps {
  numChapters: number
  onChaptersChange: (chapters: Chapter[]) => void
  initialChapters?: Chapter[]
}

export default function CustomBookForm({ numChapters, onChaptersChange, initialChapters = [] }: CustomBookFormProps) {
  const [chapters, setChapters] = useState<Chapter[]>([])

  // Update chapters when numChapters changes
  useEffect(() => {
    if (initialChapters.length > 0) {
      setChapters(initialChapters)
    } else {
      const newChapters = Array.from({ length: numChapters }, (_, index) => ({
        id: `chapter-${index + 1}`,
        title: '',
        prompt: '',
        specificInclusions: ''
      }))
      setChapters(newChapters)
      onChaptersChange(newChapters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numChapters, initialChapters.length]) // Remove onChaptersChange from dependencies

  const handleChapterChange = (index: number, field: keyof Chapter, value: string) => {
    const updatedChapters = chapters.map((chapter, i) => {
      if (i === index) {
        return { ...chapter, [field]: value }
      }
      return chapter
    })
    setChapters(updatedChapters)
    onChaptersChange(updatedChapters)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Chapter Planning</h3>
        <p className="text-blue-700 text-sm">
          Define each chapter with a clear title, detailed prompt for AI generation, and any specific elements you want included.
        </p>
      </div>

      {chapters.map((chapter, index) => (
        <div key={chapter.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Chapter {index + 1}
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Title *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`e.g., Chapter ${index + 1}: The Beginning`}
                value={chapter.title}
                onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Prompt/Instructions *
              </label>
              <textarea
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe what should happen in this chapter. Be specific about the plot, characters, setting, or content you want the AI to include."
                value={chapter.prompt}
                onChange={(e) => handleChapterChange(index, 'prompt', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Things to Include (Optional)
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any specific details, dialogue, facts, or elements you want included in this chapter."
                value={chapter.specificInclusions}
                onChange={(e) => handleChapterChange(index, 'specificInclusions', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}