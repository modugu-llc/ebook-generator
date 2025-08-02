import jsPDF from 'jspdf';

export interface BookContent {
  title: string;
  author: string;
  category: string;
  content: string;
  formData: Record<string, any>;
}

export function generatePDF(book: BookContent): void {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  const maxWidth = pageWidth - (margin * 2);
  
  let currentY = margin;

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont('helvetica', 'bold');
    } else {
      pdf.setFont('helvetica', 'normal');
    }
    
    const lines = pdf.splitTextToSize(text, maxWidth);
    
    for (const line of lines) {
      if (currentY + lineHeight > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
      }
      pdf.text(line, margin, currentY);
      currentY += lineHeight;
    }
    currentY += lineHeight * 0.5; // Add some space after text
  };

  // Title Page
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  const titleLines = pdf.splitTextToSize(book.title, maxWidth);
  const titleY = pageHeight / 3;
  
  titleLines.forEach((line: string, index: number) => {
    const textWidth = pdf.getTextWidth(line);
    const x = (pageWidth - textWidth) / 2;
    pdf.text(line, x, titleY + (index * 12));
  });

  // Author
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  const authorText = `By ${book.author || 'Anonymous'}`;
  const authorWidth = pdf.getTextWidth(authorText);
  const authorX = (pageWidth - authorWidth) / 2;
  pdf.text(authorText, authorX, titleY + (titleLines.length * 12) + 20);

  // Category
  pdf.setFontSize(12);
  const categoryText = `${book.category}`;
  const categoryWidth = pdf.getTextWidth(categoryText);
  const categoryX = (pageWidth - categoryWidth) / 2;
  pdf.text(categoryText, categoryX, titleY + (titleLines.length * 12) + 40);

  // New page for content
  pdf.addPage();
  currentY = margin;

  // Content
  const contentLines = book.content.split('\n');
  
  for (const line of contentLines) {
    if (line.trim() === '') {
      currentY += lineHeight;
      continue;
    }
    
    // Handle headers (lines starting with #)
    if (line.startsWith('# ')) {
      currentY += lineHeight;
      addText(line.substring(2), 18, true);
    } else if (line.startsWith('## ')) {
      currentY += lineHeight * 0.5;
      addText(line.substring(3), 14, true);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      addText(line.substring(2, line.length - 2), 12, true);
    } else {
      addText(line, 12, false);
    }
  }

  // Save the PDF
  const fileName = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
  pdf.save(fileName);
}

export function generateEnhancedContent(category: string, formData: Record<string, any>): string {
  switch (category) {
    case 'childrens-stories':
      return generateChildrensStory(formData);
    case 'family-cookbooks':
      return generateFamilyCookbook(formData);
    case 'adventure-books':
      return generateAdventureBook(formData);
    case 'funny-quotes':
      return generateFunnyQuoteBook(formData);
    case 'custom-prompts':
      return generateCustomBook(formData);
    default:
      return generateDefaultBook(formData);
  }
}

function generateChildrensStory(data: Record<string, any>): string {
  const character = data.mainCharacter || 'Alex';
  const age = data.characterAge || '7';
  const setting = data.setting || 'magical forest';
  const lesson = data.lesson || 'kindness';
  const title = data.title || 'A Magical Adventure';
  const details = data.additionalDetails || '';
  
  return `# ${title}

## Chapter 1: The Beginning

Once upon a time, in a beautiful ${setting.toLowerCase()}, there lived a curious and brave ${age}-year-old named ${character}. 

${character} loved to explore and was always eager to help others. Every morning, ${character} would wake up excited about what new adventures the day might bring.

${details ? `\n${details}\n` : ''}

One special day, ${character} discovered something that would change everything...

## Chapter 2: The Discovery

As ${character} ventured deeper into the ${setting.toLowerCase()}, they noticed something unusual. The birds seemed worried, and the usual cheerful sounds of nature were quiet.

"What's wrong?" ${character} asked a friendly rabbit who was sitting sadly by a stream.

"Our home is in trouble," the rabbit explained. "We need someone with a kind heart to help us."

${character} knew this was their chance to make a real difference.

## Chapter 3: The Challenge

The animals explained their problem to ${character}. It would take courage, wisdom, and most importantly, ${lesson.toLowerCase()} to solve it.

${character} listened carefully and thought about what they could do. Even though they were young, ${character} realized that everyone, no matter how small, can make a big difference.

## Chapter 4: The Solution

With determination and ${lesson.toLowerCase()}, ${character} worked together with the animals to solve their problem. They discovered that by showing ${lesson.toLowerCase()} and working as a team, they could overcome any challenge.

The animals cheered as their home was saved, and ${character} learned an important lesson that day.

## Chapter 5: The Lesson

${character} returned home that evening with a warm feeling in their heart. They had learned that ${lesson.toLowerCase()} is one of the most powerful forces in the world.

From that day forward, ${character} always remembered to show ${lesson.toLowerCase()} to everyone they met, and they lived happily knowing they could make the world a better place.

**The End**

---

*Remember: Just like ${character}, you too can make a difference by showing ${lesson.toLowerCase()} to others every day.*`;
}

function generateFamilyCookbook(data: Record<string, any>): string {
  const title = data.title || 'Family Recipe Collection';
  const familyName = data.familyName || 'Our Family';
  const cuisineType = data.cuisineType || 'Traditional';
  const occasions = data.specialOccasions || 'family gatherings';
  
  return `# ${title}

## Welcome to ${familyName} Kitchen

This cookbook is a collection of our most cherished recipes, passed down through generations and created with love for our family and friends.

### About Our Cuisine

Our family specializes in ${cuisineType.toLowerCase()} cooking, with recipes perfect for ${occasions.toLowerCase()} and everyday meals.

## Family Favorites

### Grandma's Famous Recipe
*A dish that has brought our family together for generations*

**Ingredients:**
- Love and patience (the most important ingredients!)
- Traditional family spices
- Fresh, quality ingredients
- Time spent together in the kitchen

**Instructions:**
1. Gather the family in the kitchen
2. Share stories while preparing the ingredients
3. Cook with care and attention
4. Serve with love and laughter

*"The secret ingredient is always the love we put into our cooking." - Grandma*

### Sunday Dinner Special
*Perfect for bringing everyone together*

This hearty meal has been a family tradition for years. The aroma fills the house and draws everyone to the table.

### Holiday Celebration Dish
*Reserved for our most special occasions*

A recipe that makes every celebration more memorable and meaningful.

### Comfort Food Classic
*For when you need a warm hug from the kitchen*

Sometimes the simplest dishes bring the greatest comfort and joy.

### Kids' Favorite Treat
*The recipe that always brings smiles*

A special dish that creates happy memories and satisfied appetites.

## Family Stories and Traditions

Every recipe in this cookbook comes with its own story. From the first time Grandma made her famous dish to the modifications we've made over the years, each meal is a chapter in our family's history.

### Kitchen Wisdom Passed Down:
- "Always cook with love"
- "The best meals are shared with family"
- "Every mistake is a learning opportunity"
- "Food tastes better when made together"

## Creating New Traditions

As our family grows, we continue to add new recipes and create new traditions. This cookbook is living document of our culinary journey together.

---

*May these recipes bring as much joy to your table as they have brought to ours.*

**${familyName}**`;
}

function generateAdventureBook(data: Record<string, any>): string {
  const title = data.title || 'My Amazing Adventure';
  const destination = data.destination || 'unknown lands';
  const duration = data.duration || 'an unforgettable time';
  const highlights = data.highlights || 'incredible experiences';
  const challenges = data.challenges || 'unexpected obstacles';
  const people = data.peopleMetShe || 'amazing people';
  const lessons = data.lessonsLearned || 'valuable life lessons';
  
  return `# ${title}

## The Journey Begins

Sometimes the best adventures start with a simple decision to step outside your comfort zone. My journey to ${destination} was one of those life-changing experiences that began with curiosity and ended with transformation.

## Chapter 1: Setting Off

The anticipation of ${duration} ahead filled me with both excitement and nervousness. As I prepared for this adventure, I had no idea how much it would change my perspective on life.

The destination: ${destination}
The duration: ${duration}
The expectation: Unknown adventures awaiting

## Chapter 2: First Impressions

Arriving in ${destination} was like stepping into a different world. Everything felt new, exciting, and slightly overwhelming.

The sights, sounds, and smells were completely different from home, and I knew I was about to embark on something truly special.

## Chapter 3: The Highlights

${highlights}

These moments were the ones that made every mile traveled worthwhile. Each experience added another layer to the adventure, creating memories that will last a lifetime.

The beauty of travel is that every day brings something unexpected and wonderful.

## Chapter 4: Facing Challenges

Not everything went according to plan, and that's what made the journey even more valuable:

${challenges}

These challenges taught me resilience, adaptability, and the importance of maintaining a positive attitude even when things don't go as expected.

## Chapter 5: The People I Met

Travel is as much about the people you meet as the places you visit:

${people}

These connections reminded me that despite our different backgrounds and languages, human kindness and curiosity are universal.

## Chapter 6: Lessons Learned

This adventure taught me more than I ever expected:

${lessons}

These insights have become part of who I am and how I approach life's future adventures.

## Chapter 7: Coming Home

Returning home after this incredible journey, I realized that while the adventure had ended, its impact would last forever. I came back with:

- A broader perspective on the world
- Confidence in my ability to handle the unexpected
- Countless stories to share
- A deep appreciation for both adventure and home
- Plans for the next journey

## Reflection

Travel has a way of showing us that the world is both bigger and smaller than we imagined. Bigger in its diversity and wonder, smaller in the connections we make and the similarities we discover.

This adventure reminded me that stepping outside our comfort zone isn't just about seeing new places—it's about discovering new parts of ourselves.

---

*"The journey not the arrival matters." - T.S. Eliot*

**Until the next adventure...**`;
}

function generateFunnyQuoteBook(data: Record<string, any>): string {
  const title = data.title || 'Hilarious Sayings';
  const subject = data.subjectPerson || 'My Favorite Person';
  const relationship = data.relationshipToSubject || 'family member';
  const tone = data.tone || 'heartwarming and funny';
  const context = data.context || 'everyday life';
  
  return `# ${title}

## Introduction

This collection celebrates the wit, wisdom, and wonderful absurdity of ${subject}. As their ${relationship}, I've had the privilege of witnessing countless moments of hilarity that deserve to be remembered and shared.

The tone of this collection is ${tone.toLowerCase()}, capturing the essence of ${context.toLowerCase()}.

## Chapter 1: Daily Wisdom

*The kind of quotes that make ordinary days extraordinary*

**"Life is too short for matching socks"**
- Said while wearing one polka dot sock and one striped sock

**"I don't need Google, my ${relationship} knows everything"**
- Followed immediately by asking what Google is

**"I'm not arguing, I'm just explaining why I'm right"**
- The beginning of every "discussion"

## Chapter 2: Kitchen Chronicles

*Quotes from the heart of the home*

**"Cooking is like love - it should be entered into with abandon or not at all"**
- While burning dinner for the third time this week

**"I'm not a chef, I'm a food artist... and sometimes art is abstract"**
- Explanation for why dinner looks nothing like the recipe photo

**"The smoke alarm is just the dinner bell in our house"**
- A family motto

## Chapter 3: Technology Troubles

*When modern life meets timeless confusion*

**"Why does my phone have more passwords than the Pentagon?"**
- While trying to remember which email was used for which account

**"I didn't choose the tech life, the tech life chose me... and I want to give it back"**
- During any software update

## Chapter 4: Life Philosophy

*Deep thoughts and not-so-deep thoughts*

**"Age is just a number, but in my case, it's a really big number"**
- Wisdom about getting older

**"I'm not lazy, I'm energy efficient"**
- Justification for watching TV all day

**"Common sense is like deodorant - the people who need it most never use it"**
- Commentary on the world

## Chapter 5: Family Observations

*Quotes about the people we love most*

**"Family: where life begins and love never ends... but the arguments are frequent"**
- Family dinner philosophy

**"I love my family, but sometimes I wonder if we're all from the same planet"**
- During holiday gatherings

## Chapter 6: Random Revelations

*The unexpected pearls of wisdom*

**"If at first you don't succeed, skydiving is not for you"**
- Practical life advice

**"I don't have a bucket list, I have a 'maybe someday if I feel like it' list"**
- Approach to goal setting

**"Life is like a camera - focus on what's important, capture the good times, and if things don't work out, take another shot"**
- Surprisingly profound moment

## Conclusion

These quotes remind us that humor is one of life's greatest gifts. ${subject} has a way of finding joy and laughter in everyday moments, turning ordinary situations into memorable experiences.

Whether they're being intentionally funny or accidentally hilarious, these words capture the spirit of someone who makes life brighter just by being themselves.

---

*Dedicated to ${subject}, who proves every day that laughter really is the best medicine.*

**"Keep laughing, keep living, keep being wonderfully you."**`;
}

function generateCustomBook(data: Record<string, any>): string {
  const title = data.title || 'My Custom Book';
  const genre = data.genre || 'General';
  const audience = data.targetAudience || 'All Ages';
  const prompt = data.mainPrompt || 'A story waiting to be told';
  const style = data.style || 'Narrative';
  const elements = data.additionalElements || '';
  
  return `# ${title}

## Introduction

This ${genre.toLowerCase()} book is written for ${audience.toLowerCase()} in a ${style.toLowerCase()} style.

## Chapter 1: The Beginning

${prompt}

This story unfolds with careful attention to the elements that make it unique and engaging.

${elements ? `\n### Key Elements:\n${elements}\n` : ''}

## Chapter 2: Development

As our story develops, we explore the themes and ideas that make this narrative special. Each element contributes to a larger tapestry of meaning and purpose.

The ${style.toLowerCase()} style allows us to connect with readers in a way that feels both authentic and engaging.

## Chapter 3: The Heart of the Story

Here lies the core of what makes this book meaningful. Whether it's character development, plot advancement, or thematic exploration, this section captures the essence of the narrative.

## Chapter 4: Resolution

Every good story needs a satisfying conclusion. This chapter brings together all the elements we've explored, providing closure while leaving room for reflection.

## Conclusion

This ${genre.toLowerCase()} work represents a unique voice and perspective, crafted specifically for ${audience.toLowerCase()} who appreciate ${style.toLowerCase()} storytelling.

The journey from concept to completion demonstrates the power of creative expression and the importance of sharing our stories with the world.

---

*Thank you for joining this literary journey.*`;
}

function generateDefaultBook(data: Record<string, any>): string {
  const title = data.title || 'A Wonderful Book';
  
  return `# ${title}

## Introduction

This book represents a unique creation, crafted from your specific prompts and ideas.

## Chapter 1

Every great book begins with a single idea, and this one started with yours.

## Chapter 2

As we develop the narrative, each element contributes to the overall story.

## Conclusion

Thank you for creating this unique book. Your imagination has brought this story to life.

---

*The End*`;
}