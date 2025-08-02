import { NextRequest, NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chapters = await mockDb.bookChapter.findMany({
      where: { bookId: params.id }
    })

    return NextResponse.json({ success: true, chapters })
  } catch (error) {
    console.error('Error fetching chapters:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chapters' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, order } = await request.json()

    const chapter = await mockDb.bookChapter.create({
      data: {
        bookId: params.id,
        title,
        content,
        order,
      },
    })

    return NextResponse.json({ success: true, chapter })
  } catch (error) {
    console.error('Error creating chapter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create chapter' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
) {
  try {
    const { chapterId, title, content } = await request.json()

    const chapter = await mockDb.bookChapter.update({
      where: { id: chapterId },
      data: { title, content },
    })

    return NextResponse.json({ success: true, chapter })
  } catch (error) {
    console.error('Error updating chapter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update chapter' },
      { status: 500 }
    )
  }
}