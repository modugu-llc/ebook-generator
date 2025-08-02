// Mock database service for development
export interface User {
  id: string
  name?: string
  email: string
  password?: string
  createdAt: Date
}

export interface Book {
  id: string
  title: string
  author: string
  category: string
  content: string
  status: string
  userId: string
  metadata?: string
  createdAt: Date
  updatedAt: Date
}

// In-memory storage for development
const users: User[] = []
const books: Book[] = []

export const mockDb = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      return users.find(u => u.email === where.email || u.id === where.id) || null
    },
    create: async ({ data }: { data: Omit<User, 'id' | 'createdAt'> }) => {
      const user: User = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date()
      }
      users.push(user)
      return user
    }
  },
  book: {
    findMany: async ({ where, orderBy }: { 
      where?: { userId?: string }
      orderBy?: { createdAt?: 'asc' | 'desc' }
    } = {}) => {
      let filteredBooks = books
      
      if (where?.userId) {
        filteredBooks = books.filter(b => b.userId === where.userId)
      }
      
      if (orderBy?.createdAt) {
        filteredBooks = [...filteredBooks].sort((a, b) => {
          if (orderBy.createdAt === 'desc') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          }
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        })
      }
      
      return filteredBooks
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      return books.find(b => b.id === where.id) || null
    },
    create: async ({ data }: { data: Omit<Book, 'id' | 'createdAt' | 'updatedAt'> }) => {
      const book: Book = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      books.push(book)
      return book
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<Book> }) => {
      const index = books.findIndex(b => b.id === where.id)
      if (index !== -1) {
        books[index] = { ...books[index], ...data, updatedAt: new Date() }
        return books[index]
      }
      throw new Error('Book not found')
    }
  }
}