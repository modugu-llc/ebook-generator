import { NextRequest, NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-db'

export async function POST(request: NextRequest) {
  try {
    const { title, author, category, formData, images, chapters } = await request.json()

    // Create book in database
    const book = await mockDb.book.create({
      data: {
        title,
        author,
        category,
        content: JSON.stringify({}), // Will be populated based on type
        status: 'GENERATING',
        userId: 'mock-user-id', // In a real app, this would come from the session
        metadata: JSON.stringify({ ...formData, hasImages: !!images, hasChapters: !!chapters }),
      },
    })

    // Handle different book types
    if (category === 'PHOTO_BOOK' && images) {
      // Create image records
      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        await mockDb.bookImage.create({
          data: {
            bookId: book.id,
            filename: image.file?.name || `image-${i + 1}`,
            url: image.preview, // In a real app, this would be uploaded to storage
            caption: image.caption || '',
            order: i + 1,
          },
        })
      }
      
      // Generate photo book content
      const photoBookContent = generatePhotoBookContent(title, author, formData, images)
      await mockDb.book.update({
        where: { id: book.id },
        data: { 
          content: JSON.stringify(photoBookContent),
          status: 'COMPLETED'
        },
      })
      
    } else if (category === 'CUSTOM_BOOK' && chapters) {
      // Create chapter records
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i]
        const generatedContent = generateChapterContent(chapter.title, chapter.prompt, formData)
        
        await mockDb.bookChapter.create({
          data: {
            bookId: book.id,
            title: chapter.title,
            content: generatedContent,
            order: i + 1,
          },
        })
      }
      
      // Generate custom book content
      const customBookContent = generateCustomBookContent(title, author, formData, chapters)
      await mockDb.book.update({
        where: { id: book.id },
        data: { 
          content: JSON.stringify(customBookContent),
          status: 'COMPLETED'
        },
      })
      
    } else {
      // Handle existing book types
      const generatedContent = generateBookContent(category, title, author, formData)
      await mockDb.book.update({
        where: { id: book.id },
        data: { 
          content: JSON.stringify(generatedContent),
          status: 'COMPLETED'
        },
      })
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

function generatePhotoBookContent(title: string, author: string, formData: Record<string, string>, images: { file?: File; preview: string; caption: string }[]) {
  return {
    title,
    author,
    type: 'photo_book',
    theme: formData['Photo Book Theme'],
    description: formData['Book Description'] || 'A beautiful collection of memories',
    layoutStyle: formData['Layout Style'],
    totalImages: images.length,
    chapters: [
      {
        title: 'Introduction',
        content: `Welcome to "${title}" - ${formData['Photo Book Theme']}. ${formData['Book Description'] || 'This photo book captures precious moments and memories.'}`
      },
      {
        title: 'Photo Gallery',
        content: `A collection of ${images.length} beautiful photographs with their stories.`
      }
    ]
  }
}

function generateChapterContent(title: string, prompt: string, bookContext: Record<string, string>) {
  // Mock AI chapter generation based on prompt
  return `# ${title}

${prompt}

This chapter explores the themes and ideas you've outlined. The AI would generate detailed content based on your specific prompt, incorporating elements from your book's overall context including the genre (${bookContext['Book Genre']}) and target audience (${bookContext['Target Audience'] || 'general readers'}).

The content would be tailored to match your book's tone and style, ensuring consistency across all chapters while addressing the specific requirements and plot points you've described in your prompt.`
}

function generateCustomBookContent(title: string, author: string, formData: Record<string, string>, chapters: { title: string; prompt: string; content?: string }[]) {
  return {
    title,
    author,
    type: 'custom_book',
    genre: formData['Book Genre'],
    description: formData['Overall Book Description'],
    targetAudience: formData['Target Audience'],
    totalChapters: chapters.length,
    overview: `"${title}" is a ${formData['Book Genre']} book with ${chapters.length} chapters. ${formData['Overall Book Description']}`
  }
}