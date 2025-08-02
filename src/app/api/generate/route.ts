import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { title, author, category, formData } = await request.json()

    // Simulate AI content generation
    const generatedContent = generateBookContent(category, title, author, formData)

    // Create book in database
    const book = await prisma.book.create({
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

function generateBookContent(category: string, title: string, author: string, formData: Record<string, string>) {
  // Mock AI content generation based on category
  const content = {
    title,
    author,
    chapters: [] as { title: string; content: string }[],
  }

  switch (category) {
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