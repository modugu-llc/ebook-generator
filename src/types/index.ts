export type BookCategory = 'CHILDRENS_STORY' | 'RECIPE_COOKBOOK' | 'ADVENTURE' | 'FUNNY_QUOTES' | 'GENERAL_PROMPT' | 'PHOTO_BOOK' | 'CUSTOM_BOOK'
export type BookStatus = 'DRAFT' | 'GENERATING' | 'COMPLETED' | 'ERROR'

export interface BookPrompt {
  category: BookCategory
  title: string
  author: string
  prompt: string
  additionalDetails?: Record<string, string | number | boolean>
}

export interface GeneratedBook {
  id: string
  title: string
  author: string
  category: BookCategory
  content: string
  coverImage?: string
  status: BookStatus
  metadata?: Record<string, string | number | boolean>
  chapters?: BookChapter[]
  images?: BookImage[]
  createdAt: Date
  updatedAt: Date
}

export interface BookChapter {
  id: string
  bookId: string
  title: string
  content: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface BookImage {
  id: string
  bookId: string
  filename: string
  url: string
  caption?: string
  order: number
  createdAt: Date
}

export interface User {
  id: string
  name?: string
  email: string
  image?: string
}

export interface BookCategoryConfig {
  id: BookCategory
  name: string
  description: string
  icon: string
  prompts: {
    label: string
    placeholder: string
    type: 'text' | 'textarea' | 'select' | 'file' | 'number'
    options?: string[]
    required?: boolean
    accept?: string // for file inputs
    multiple?: boolean // for file inputs
    max?: number // for numbers or file counts
  }[]
}