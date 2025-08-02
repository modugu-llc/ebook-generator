export type BookCategory = 'CHILDRENS_STORY' | 'RECIPE_COOKBOOK' | 'ADVENTURE' | 'FUNNY_QUOTES' | 'GENERAL_PROMPT'
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
    type: 'text' | 'textarea' | 'select'
    options?: string[]
    required?: boolean
  }[]
}