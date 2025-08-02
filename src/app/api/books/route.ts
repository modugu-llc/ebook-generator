import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-db'

export async function GET() {
  try {
    const books = await mockDb.book.findMany({
      where: {
        userId: 'mock-user-id', // In a real app, this would come from the session
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ books })
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}