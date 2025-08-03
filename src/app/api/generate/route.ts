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
            caption: image.description || image.caption || '', // Use description as primary, fallback to caption
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

function generatePhotoBookContent(title: string, author: string, formData: Record<string, string>, images: { file?: File; preview: string; caption: string; description: string }[]) {
  // Extract meaningful content from detailed descriptions for narrative generation
  const describedImages = images.filter(img => img.description && img.description.trim())
  const allDescriptions = describedImages.map(img => img.description.trim())
  const allCaptions = images.filter(img => img.caption && img.caption.trim()).map(img => img.caption.trim())
  
  // Generate detailed prompts for the LLM based on photo descriptions
  const llmPrompts = {
    mainNarrative: '',
    characterAnalysis: '',
    themeExtraction: '',
    emotionalTone: '',
    chronologicalFlow: ''
  }
  
  // Main narrative prompt incorporating detailed descriptions
  if (allDescriptions.length > 0) {
    llmPrompts.mainNarrative = `Create a compelling photo book narrative for "${title}" based on these ${allDescriptions.length} detailed photo descriptions:\n\n${allDescriptions.map((desc, i) => `Photo ${i + 1}: ${desc}`).join('\n\n')}\n\nWeave these moments into a cohesive story that captures the essence of ${formData['Photo Book Theme']}. Focus on the emotions, relationships, and experiences described.`
    
    // Extract characters and relationships
    const peopleKeywords = ['family', 'friend', 'child', 'baby', 'mom', 'dad', 'grandmother', 'grandfather', 'sibling', 'cousin', 'husband', 'wife', 'daughter', 'son']
    const peopleDescriptions = allDescriptions.filter(desc => 
      peopleKeywords.some(keyword => desc.toLowerCase().includes(keyword))
    )
    
    if (peopleDescriptions.length > 0) {
      llmPrompts.characterAnalysis = `Based on these people-focused descriptions, identify the key characters and relationships:\n${peopleDescriptions.join('\n\n')}`
    }
    
    // Extract themes and emotions
    const emotionKeywords = ['happy', 'joy', 'love', 'excited', 'peaceful', 'proud', 'celebration', 'milestone', 'achievement', 'memory', 'special', 'beautiful', 'fun', 'adventure']
    const hasEmotionalContent = allDescriptions.some(desc => 
      emotionKeywords.some(keyword => desc.toLowerCase().includes(keyword))
    )
    
    if (hasEmotionalContent) {
      llmPrompts.emotionalTone = `Analyze the emotional journey and themes present in these photo descriptions to create a book that resonates emotionally.`
    }
    
    // Generate chronological understanding
    const timeKeywords = ['first', 'last', 'before', 'after', 'during', 'when', 'then', 'next', 'finally', 'beginning', 'end']
    const hasTimelineElements = allDescriptions.some(desc => 
      timeKeywords.some(keyword => desc.toLowerCase().includes(keyword))
    )
    
    if (hasTimelineElements) {
      llmPrompts.chronologicalFlow = `Identify the chronological flow and sequence of events from the photo descriptions to structure the book narrative.`
    }
  }
  
  // Create enhanced content for LLM processing
  let enhancedNarrative = `${formData['Book Description'] || `A beautiful photo book capturing the essence of ${formData['Photo Book Theme']}.`}`
  
  if (allDescriptions.length > 0) {
    enhancedNarrative += `\n\nThis collection tells the story through ${images.length} carefully curated photographs, with ${allDescriptions.length} featuring detailed personal stories and context. `
    
    // Create a flowing narrative that incorporates the detailed descriptions
    const storyElements: string[] = []
    
    allDescriptions.forEach((desc) => {
      // Extract key narrative elements from each description
      const sentences = desc.split(/[.!?]+/).filter(s => s.trim().length > 0)
      if (sentences.length > 0) {
        // Use the most descriptive sentence or the first substantial one
        const mainSentence = sentences.find(s => s.length > 30) || sentences[0]
        if (mainSentence) {
          storyElements.push(mainSentence.trim())
        }
      }
    })
    
    if (storyElements.length > 0) {
      enhancedNarrative += `The journey unfolds through moments like: ${storyElements.slice(0, 3).join('; ')}${storyElements.length > 3 ? ', and many more precious memories' : ''}.`
    }
    
    enhancedNarrative += ` Each photograph is accompanied by personal stories, contextual details, and emotional connections that transform this from a simple collection into a rich narrative of experiences and memories.`
  }
  
  // Create detailed metadata for LLM processing
  const detailedMetadata = {
    totalImages: images.length,
    describedImages: describedImages.length,
    captionedImages: allCaptions.length,
    averageDescriptionLength: allDescriptions.length > 0 ? Math.round(allDescriptions.reduce((sum, desc) => sum + desc.length, 0) / allDescriptions.length) : 0,
    hasDetailedStories: describedImages.length > 0,
    narrativeComplexity: allDescriptions.length >= 5 ? 'high' : allDescriptions.length >= 2 ? 'medium' : 'low',
    suggestedChapters: Math.ceil(images.length / 5), // Suggest chapters based on photo count
    llmPrompts: llmPrompts
  }

  return {
    title,
    author,
    type: 'photo_book',
    theme: formData['Photo Book Theme'],
    description: formData['Book Description'] || 'A beautiful collection of memories',
    layoutStyle: formData['Layout Style'],
    enhancedNarrative,
    detailedMetadata,
    imageDetails: images.map((img, index) => ({
      order: index + 1,
      caption: img.caption || '',
      description: img.description || '',
      hasCaption: !!(img.caption && img.caption.trim()),
      hasDescription: !!(img.description && img.description.trim()),
      wordCount: img.description ? img.description.split(' ').length : 0
    })),
    chapters: [
      {
        title: 'Introduction',
        content: `Welcome to "${title}" - ${formData['Photo Book Theme']}. ${formData['Book Description'] || 'This photo book captures precious moments and memories.'}\n\n${describedImages.length > 0 ? `Through these carefully curated images and their personal stories, we invite you to experience our journey and the special moments that made it unforgettable. Each photograph tells a story, and together they create a beautiful tapestry of memories that will be treasured for years to come.` : 'Each image in this collection has been chosen to represent special moments and memories.'}`
      },
      {
        title: 'Photo Gallery',
        content: enhancedNarrative
      },
      ...(describedImages.length >= 10 ? [
        {
          title: 'Stories Behind the Moments',
          content: `Each photograph in this collection comes with its own story. Here are some of the most meaningful moments captured:\n\n${allDescriptions.slice(0, 5).map((desc) => `**Photo ${describedImages.findIndex(img => img.description === desc) + 1}**: ${desc.substring(0, 200)}${desc.length > 200 ? '...' : ''}`).join('\n\n')}`
        }
      ] : [])
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