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

// In-memory storage for development
const users: User[] = []
const books: Book[] = []
const bookChapters: BookChapter[] = []
const bookImages: BookImage[] = []

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
  },
  bookChapter: {
    findMany: async ({ where }: { where?: { bookId?: string } } = {}) => {
      let filteredChapters = bookChapters
      if (where?.bookId) {
        filteredChapters = bookChapters.filter(c => c.bookId === where.bookId)
      }
      return filteredChapters.sort((a, b) => a.order - b.order)
    },
    create: async ({ data }: { data: Omit<BookChapter, 'id' | 'createdAt' | 'updatedAt'> }) => {
      const chapter: BookChapter = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      bookChapters.push(chapter)
      return chapter
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<BookChapter> }) => {
      const index = bookChapters.findIndex(c => c.id === where.id)
      if (index !== -1) {
        bookChapters[index] = { ...bookChapters[index], ...data, updatedAt: new Date() }
        return bookChapters[index]
      }
      throw new Error('Chapter not found')
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const index = bookChapters.findIndex(c => c.id === where.id)
      if (index !== -1) {
        const deleted = bookChapters[index]
        bookChapters.splice(index, 1)
        return deleted
      }
      throw new Error('Chapter not found')
    }
  },
  bookImage: {
    findMany: async ({ where }: { where?: { bookId?: string } } = {}) => {
      let filteredImages = bookImages
      if (where?.bookId) {
        filteredImages = bookImages.filter(i => i.bookId === where.bookId)
      }
      return filteredImages.sort((a, b) => a.order - b.order)
    },
    create: async ({ data }: { data: Omit<BookImage, 'id' | 'createdAt'> }) => {
      const image: BookImage = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date()
      }
      bookImages.push(image)
      return image
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<BookImage> }) => {
      const index = bookImages.findIndex(i => i.id === where.id)
      if (index !== -1) {
        bookImages[index] = { ...bookImages[index], ...data }
        return bookImages[index]
      }
      throw new Error('Image not found')
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const index = bookImages.findIndex(i => i.id === where.id)
      if (index !== -1) {
        const deleted = bookImages[index]
        bookImages.splice(index, 1)
        return deleted
      }
      throw new Error('Image not found')
    }
  }
}