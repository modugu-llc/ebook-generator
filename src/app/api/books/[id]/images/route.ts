import { NextRequest, NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const images = await mockDb.bookImage.findMany({
      where: { bookId: params.id }
    })

    return NextResponse.json({ success: true, images })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { filename, url, caption, order } = await request.json()

    const image = await mockDb.bookImage.create({
      data: {
        bookId: params.id,
        filename,
        url,
        caption,
        order,
      },
    })

    return NextResponse.json({ success: true, image })
  } catch (error) {
    console.error('Error creating image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create image' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
) {
  try {
    const { imageId, caption } = await request.json()

    const image = await mockDb.bookImage.update({
      where: { id: imageId },
      data: { caption },
    })

    return NextResponse.json({ success: true, image })
  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update image' },
      { status: 500 }
    )
  }
}