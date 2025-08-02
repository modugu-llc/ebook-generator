import { NextRequest, NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-db'

export async function POST(request: NextRequest) {
  try {
    const { title, author, category, formData, chapters, photos } = await request.json()

    // Generate content based on category
    const generatedContent = generateBookContent(category, title, author, formData, chapters, photos)

    // Create book in database
    const book = await mockDb.book.create({
      data: {
        title,
        author,
        category,
        content: JSON.stringify(generatedContent),
        status: 'COMPLETED',
        userId: 'mock-user-id', // In a real app, this would come from the session
        metadata: JSON.stringify(formData),
      },
    })

    // For custom books, create chapters
    if (category === 'CUSTOM_BOOK' && chapters) {
      for (const [index, chapter] of chapters.entries()) {
        await mockDb.chapter.create({
          data: {
            title: chapter.title,
            prompt: chapter.prompt,
            content: generateChapterContent(chapter),
            order: index,
            bookId: book.id,
          },
        })
      }
    }

    // For photo books, create photo records
    if (category === 'PHOTO_BOOK' && photos) {
      for (const photo of photos) {
        await mockDb.photo.create({
          data: {
            filename: photo.filename,
            caption: photo.caption,
            order: photo.order,
            bookId: book.id,
          },
        })
      }
    }

    return NextResponse.json({ 
      success: true, 
      bookId: book.id,
      book 
    })
  } catch (error) {
    console.error('Error generating book:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate book' },
      { status: 500 }
    )
  }
}

function generateChapterContent(chapter: { title: string; prompt: string; specificInclusions: string }) {
  // Mock AI content generation for individual chapters
  const baseContent = `${chapter.prompt}\n\n`
  const specificContent = chapter.specificInclusions ? `\nSpecific elements to include: ${chapter.specificInclusions}` : ''
  
  // In a real implementation, this would call an AI API
  return `${baseContent}This chapter explores the themes and ideas outlined in the prompt. ${specificContent}\n\nGenerated content based on your specifications would appear here, incorporating the specific elements you requested.`
}

function generateBookContent(category: string, title: string, author: string, formData: Record<string, string>, chapters?: Array<{ title: string; prompt: string; specificInclusions: string }>, photos?: Array<{ id: string; caption: string; order: number; filename: string }>) {
  // Mock AI content generation based on category
  const content = {
    title,
    author,
    chapters: [] as { title: string; content: string }[],
    photos: photos || [],
  }

  switch (category) {
    case 'CUSTOM_BOOK':
      if (chapters) {
        content.chapters = chapters.map(chapter => ({
          title: chapter.title,
          content: generateChapterContent(chapter)
        }))
      }
      break

    case 'PHOTO_BOOK':
      content.chapters = [
        {
          title: 'Introduction',
          content: `Welcome to ${title}! ${formData['Book Description'] || 'This photo book captures beautiful memories and moments.'}`
        }
      ]
      // Photos are handled separately in the photos array
      break
    
    case 'CHILDRENS_STORY':
      content.chapters = [
        {
          title: 'Chapter 1: The Beginning',
          content: `Once upon a time, there was a brave little character named ${formData['Main Character Name']} who lived in ${formData['Setting/Place']}. ${formData['Adventure/Challenge']}`
        },
        {
          title: 'Chapter 2: The Journey',
          content: `${formData['Main Character Name']} embarked on an incredible journey, learning about ${formData['Lesson or Moral']} along the way.`
        },
        {
          title: 'Chapter 3: The End',
          content: 'And they all lived happily ever after, having learned valuable lessons about friendship and courage.'
        }
      ]
      break
    
    case 'RECIPE_COOKBOOK':
      content.chapters = [
        {
          title: 'Introduction',
          content: `Welcome to ${title}! ${formData['Family Stories'] || 'This cookbook contains cherished family recipes passed down through generations.'}`
        },
        {
          title: `${formData['Recipe Types']} Recipes`,
          content: 'Here are some wonderful recipes that have been family favorites for years.'
        }
      ]
      break
    
    case 'ADVENTURE':
      content.chapters = [
        {
          title: 'The Adventure Begins',
          content: `My incredible adventure to ${formData['Adventure Location']} was unforgettable. ${formData['Adventure Details']}`
        },
        {
          title: 'Memorable Moments',
          content: `${formData['Best Memories'] || 'The journey was filled with amazing experiences and unexpected discoveries.'}`
        }
      ]
      break
    
    case 'FUNNY_QUOTES':
      content.chapters = [
        {
          title: 'Introduction',
          content: `${formData['Quote Source']} - a collection of hilarious moments and sayings about ${formData['Theme/Topic']}.`
        },
        {
          title: 'The Funny Moments',
          content: `${formData['Sample Quotes'] || 'Here are some of the funniest things that have been said...'}`
        }
      ]
      break
    
    default:
      content.chapters = [
        {
          title: 'Chapter 1',
          content: `${formData['Detailed Prompt'] || 'This is a book about ' + formData['Main Theme/Topic']}`
        }
      ]
  }

  return content
}