import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generatePDF, generateEPUB } from '@/lib/book-generators'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'pdf'
    
    const book = await prisma.book.findUnique({
      where: { id: params.id },
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    let fileContent: Record<string, unknown>
    let filename: string

    if (format === 'epub') {
      fileContent = generateEPUB(book)
      filename = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}.epub`
    } else {
      fileContent = generatePDF(book)
      filename = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    }

    // In a real implementation, you would generate actual file bytes
    // For now, we'll return the structured content
    return NextResponse.json({
      success: true,
      format,
      filename,
      content: fileContent,
      downloadUrl: `/api/books/${params.id}/download?format=${format}`,
    })

  } catch (error) {
    console.error('Error downloading book:', error)
    return NextResponse.json(
      { error: 'Failed to download book' },
      { status: 500 }
    )
  }
}