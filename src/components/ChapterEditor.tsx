'use client'

import { useState, useEffect, useCallback } from 'react'
import { BookChapter } from '@/types'

interface ChapterEditorProps {
  bookId: string
  onClose: () => void
}

export default function ChapterEditor({ bookId, onClose }: ChapterEditorProps) {
  const [chapters, setChapters] = useState<BookChapter[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingChapter, setEditingChapter] = useState<BookChapter | null>(null)

  const fetchChapters = useCallback(async () => {
    try {
      const response = await fetch(`/api/books/${bookId}/chapters`)
      const data = await response.json()
      if (data.success) {
        setChapters(data.chapters)
      }
    } catch (error) {
      console.error('Error fetching chapters:', error)
    } finally {
      setLoading(false)
    }
  }, [bookId])

  useEffect(() => {
    fetchChapters()
  }, [fetchChapters])

  const handleSaveChapter = async (chapter: BookChapter) => {
    setSaving(true)
    try {
      const response = await fetch(`/api/books/${bookId}/chapters`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: chapter.id,
          title: chapter.title,
          content: chapter.content,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setChapters(prev => 
          prev.map(c => c.id === chapter.id ? data.chapter : c)
        )
        setEditingChapter(null)
      }
    } catch (error) {
      console.error('Error saving chapter:', error)
      alert('Failed to save chapter')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-center">Loading chapters...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Chapters</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium">Chapter {chapter.order}: {chapter.title}</h3>
                <button
                  onClick={() => setEditingChapter(chapter)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm"
                >
                  Edit
                </button>
              </div>
              
              {editingChapter?.id === chapter.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chapter Title
                    </label>
                    <input
                      type="text"
                      value={editingChapter.title}
                      onChange={(e) => setEditingChapter({ ...editingChapter, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chapter Content
                    </label>
                    <textarea
                      rows={8}
                      value={editingChapter.content}
                      onChange={(e) => setEditingChapter({ ...editingChapter, content: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveChapter(editingChapter)}
                      disabled={saving}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingChapter(null)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-700 whitespace-pre-wrap">
                  {chapter.content.length > 200 
                    ? `${chapter.content.substring(0, 200)}...` 
                    : chapter.content
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}