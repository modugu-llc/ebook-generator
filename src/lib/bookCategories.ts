import { BookCategory } from '@/types';

export const bookCategories: BookCategory[] = [
  {
    id: 'childrens-stories',
    title: "Children's Stories",
    description: "Create magical tales with custom characters and themes",
    icon: "🧚‍♀️",
    color: "bg-pink-100 border-pink-200",
    fields: [
      {
        id: 'title',
        label: 'Book Title',
        type: 'text',
        placeholder: 'The Adventures of...',
        required: true
      },
      {
        id: 'mainCharacter',
        label: 'Main Character Name',
        type: 'text',
        placeholder: 'Emma, Jack, Luna...',
        required: true
      },
      {
        id: 'characterAge',
        label: 'Character Age',
        type: 'number',
        placeholder: '5-12 years old',
        required: true
      },
      {
        id: 'setting',
        label: 'Story Setting',
        type: 'select',
        required: true,
        options: ['Magical Forest', 'Space Adventure', 'Underwater World', 'Fairy Kingdom', 'Modern City', 'Farm', 'Custom Setting']
      },
      {
        id: 'customSetting',
        label: 'Custom Setting (if selected above)',
        type: 'text',
        placeholder: 'Describe your custom setting...'
      },
      {
        id: 'lesson',
        label: 'Life Lesson/Theme',
        type: 'select',
        required: true,
        options: ['Friendship', 'Courage', 'Kindness', 'Honesty', 'Perseverance', 'Sharing', 'Environmental Care', 'Self-Confidence']
      },
      {
        id: 'length',
        label: 'Story Length',
        type: 'select',
        required: true,
        options: ['Short (5-10 pages)', 'Medium (10-20 pages)', 'Long (20-30 pages)']
      },
      {
        id: 'additionalDetails',
        label: 'Additional Story Details',
        type: 'textarea',
        placeholder: 'Any specific plot points, additional characters, or special elements you want included...'
      }
    ]
  },
  {
    id: 'family-cookbooks',
    title: 'Family Cookbooks',
    description: 'Preserve family recipes with stories and photos',
    icon: '👨‍🍳',
    color: 'bg-orange-100 border-orange-200',
    fields: [
      {
        id: 'title',
        label: 'Cookbook Title',
        type: 'text',
        placeholder: "Grandma's Secret Recipes, Family Favorites...",
        required: true
      },
      {
        id: 'familyName',
        label: 'Family Name',
        type: 'text',
        placeholder: 'The Smith Family Cookbook',
        required: true
      },
      {
        id: 'cuisineType',
        label: 'Cuisine Type',
        type: 'select',
        required: true,
        options: ['Traditional American', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'Southern', 'International Mix', 'Other']
      },
      {
        id: 'recipeCount',
        label: 'Number of Recipes',
        type: 'select',
        required: true,
        options: ['10-15 recipes', '15-25 recipes', '25-40 recipes', '40+ recipes']
      },
      {
        id: 'specialOccasions',
        label: 'Special Occasions/Categories',
        type: 'textarea',
        placeholder: 'Holiday dishes, Sunday dinners, birthday cakes, comfort foods...',
        description: 'What types of meals or occasions should be featured?'
      },
      {
        id: 'familyStories',
        label: 'Include Family Stories?',
        type: 'select',
        required: true,
        options: ['Yes - stories with each recipe', 'Yes - family history introduction only', 'No - recipes only']
      },
      {
        id: 'specialIngredients',
        label: 'Special Ingredients or Techniques',
        type: 'textarea',
        placeholder: 'Secret spices, family techniques, regional ingredients...'
      }
    ]
  },
  {
    id: 'adventure-books',
    title: 'Adventure Books',
    description: 'Document your travels and exciting experiences',
    icon: '🗺️',
    color: 'bg-green-100 border-green-200',
    fields: [
      {
        id: 'title',
        label: 'Adventure Title',
        type: 'text',
        placeholder: 'My Journey Through..., Adventures in...',
        required: true
      },
      {
        id: 'destination',
        label: 'Main Destination(s)',
        type: 'text',
        placeholder: 'Thailand, Grand Canyon, Europe...',
        required: true
      },
      {
        id: 'duration',
        label: 'Trip Duration',
        type: 'select',
        required: true,
        options: ['Weekend getaway', '1 week', '2-3 weeks', '1 month', '2-6 months', 'Longer than 6 months']
      },
      {
        id: 'adventureType',
        label: 'Type of Adventure',
        type: 'select',
        required: true,
        options: ['Backpacking', 'Road Trip', 'Cultural Exploration', 'Outdoor Adventure', 'Food Journey', 'Solo Travel', 'Family Vacation', 'Spiritual Journey']
      },
      {
        id: 'highlights',
        label: 'Key Experiences/Highlights',
        type: 'textarea',
        placeholder: 'Mountain climbing, local festivals, unexpected discoveries, funny mishaps...',
        required: true,
        description: 'What were the most memorable moments?'
      },
      {
        id: 'challenges',
        label: 'Challenges Overcome',
        type: 'textarea',
        placeholder: 'Language barriers, getting lost, weather issues, cultural differences...'
      },
      {
        id: 'peopleMetShe',
        label: 'People You Met',
        type: 'textarea',
        placeholder: 'Locals who helped, fellow travelers, guides, new friends...'
      },
      {
        id: 'lessonsLearned',
        label: 'Life Lessons Learned',
        type: 'textarea',
        placeholder: 'Personal growth, cultural insights, travel wisdom...'
      }
    ]
  },
  {
    id: 'funny-quotes',
    title: 'Funny Quote Books',
    description: 'Capture hilarious moments and memorable sayings',
    icon: '😂',
    color: 'bg-yellow-100 border-yellow-200',
    fields: [
      {
        id: 'title',
        label: 'Book Title',
        type: 'text',
        placeholder: 'Things My Mom Says, Dad Jokes Collection...',
        required: true
      },
      {
        id: 'subjectPerson',
        label: 'Who is the subject?',
        type: 'text',
        placeholder: 'My Mom, Dad, Grandpa, Best Friend...',
        required: true
      },
      {
        id: 'relationshipToSubject',
        label: 'Your relationship to them',
        type: 'text',
        placeholder: 'daughter, son, grandchild, friend...',
        required: true
      },
      {
        id: 'quoteCategories',
        label: 'Types of Quotes/Sayings',
        type: 'textarea',
        placeholder: 'Daily wisdom, funny mishaps, parenting advice, cooking disasters...',
        required: true,
        description: 'What kinds of things do they say that are funny or memorable?'
      },
      {
        id: 'timeframe',
        label: 'Time Period',
        type: 'select',
        required: true,
        options: ['Recent quotes (last year)', 'Childhood memories', 'Throughout my life', 'Specific period (holidays, vacations, etc.)']
      },
      {
        id: 'tone',
        label: 'Overall Tone',
        type: 'select',
        required: true,
        options: ['Heartwarming and funny', 'Silly and ridiculous', 'Wise with humor', 'Sarcastic and witty', 'Sweet and endearing']
      },
      {
        id: 'sampleQuotes',
        label: 'Sample Quotes (optional)',
        type: 'textarea',
        placeholder: 'Share a few example quotes to help set the tone...'
      },
      {
        id: 'context',
        label: 'Background Context',
        type: 'textarea',
        placeholder: 'Family dynamics, personality traits, recurring situations...',
        description: 'What makes these quotes funny or special?'
      }
    ]
  },
  {
    id: 'custom-prompts',
    title: 'Custom Prompts',
    description: 'Create any book from your unique ideas',
    icon: '✨',
    color: 'bg-purple-100 border-purple-200',
    fields: [
      {
        id: 'title',
        label: 'Book Title',
        type: 'text',
        placeholder: 'Enter your book title...',
        required: true
      },
      {
        id: 'genre',
        label: 'Genre',
        type: 'select',
        required: true,
        options: ['Fiction', 'Non-Fiction', 'Biography/Memoir', 'Self-Help', 'Poetry', 'Historical', 'Science Fiction', 'Fantasy', 'Romance', 'Mystery', 'Other']
      },
      {
        id: 'targetAudience',
        label: 'Target Audience',
        type: 'select',
        required: true,
        options: ['Children (5-8)', 'Kids (9-12)', 'Teens (13-17)', 'Young Adults', 'Adults', 'All Ages']
      },
      {
        id: 'length',
        label: 'Desired Length',
        type: 'select',
        required: true,
        options: ['Short (10-20 pages)', 'Medium (20-50 pages)', 'Long (50-100 pages)', 'Very Long (100+ pages)']
      },
      {
        id: 'mainPrompt',
        label: 'Main Concept/Prompt',
        type: 'textarea',
        placeholder: 'Describe your book concept, main story, or topic in detail...',
        required: true,
        description: 'This is the core idea for your book. Be as specific as possible.'
      },
      {
        id: 'style',
        label: 'Writing Style',
        type: 'select',
        required: true,
        options: ['Conversational', 'Formal', 'Humorous', 'Dramatic', 'Educational', 'Inspirational', 'Narrative Storytelling']
      },
      {
        id: 'additionalElements',
        label: 'Additional Elements',
        type: 'textarea',
        placeholder: 'Characters, plot points, themes, specific requirements...',
        description: 'Any specific elements you want included in your book'
      }
    ]
  }
];