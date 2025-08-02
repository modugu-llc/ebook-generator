export type BookCategory = 'CHILDRENS_STORY' | 'RECIPE_COOKBOOK' | 'ADVENTURE' | 'FUNNY_QUOTES' | 'GENERAL_PROMPT' | 'CUSTOM_BOOK' | 'PHOTO_BOOK'
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
  createdAt: Date
  updatedAt: Date
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
    type: 'text' | 'textarea' | 'select' | 'number' | 'file'
    options?: string[]
    required?: boolean
    multiple?: boolean
    accept?: string
    min?: number
    max?: number
  }[]
}

export interface Chapter {
  id: string
  title: string
  prompt: string
  content: string
  order: number
  bookId: string
  createdAt: Date
  updatedAt: Date
}

export interface Photo {
  id: string
  filename: string
  caption: string
  order: number
  bookId: string
  createdAt: Date
  updatedAt: Date
}