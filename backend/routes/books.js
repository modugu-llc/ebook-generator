const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Book categories
const BOOK_CATEGORIES = [
  'Children\'s Stories',
  'Cookbooks',
  'Adventure Books',
  'Science Fiction',
  'Romance',
  'Mystery',
  'Biography',
  'Self-Help',
  'Educational',
  'Fantasy'
];

// Get book categories
router.get('/categories', (req, res) => {
  res.json({ categories: BOOK_CATEGORIES });
});

// Create a new book
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, category, prompt } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!title || !category || !prompt) {
      return res.status(400).json({ error: 'Title, category, and prompt are required' });
    }

    if (!BOOK_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // AI Content Generation Stub
    const generatedContent = generateBookContent(prompt, category);

    const bookData = {
      user_id: userId,
      title,
      category,
      prompt,
      content: generatedContent,
      status: 'generated'
    };

    const book = await Book.create(bookData);
    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    console.error('Book creation error:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// Get user's books
router.get('/my-books', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const books = await Book.findByUserId(userId);
    res.json({ books });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get a specific book
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if user owns the book
    if (book.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ book });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Update a book
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, content, status } = req.body;

    // Check if book exists and user owns it
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (existingBook.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = {
      title: title || existingBook.title,
      content: content || existingBook.content,
      status: status || existingBook.status,
      file_path: existingBook.file_path,
      file_type: existingBook.file_type
    };

    await Book.update(bookId, updateData);
    const updatedBook = await Book.findById(bookId);

    res.json({
      message: 'Book updated successfully',
      book: updatedBook
    });
  } catch (error) {
    console.error('Book update error:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Delete a book
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const bookId = req.params.id;

    // Check if book exists and user owns it
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (existingBook.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Book.delete(bookId);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Book deletion error:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Export book as PDF (stub)
router.post('/:id/export/pdf', authMiddleware, async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // PDF export stub - in real implementation, this would generate a PDF
    const pdfPath = `/exports/${bookId}.pdf`;
    
    res.json({
      message: 'PDF export initiated',
      downloadUrl: pdfPath,
      note: 'This is a stub implementation. PDF generation would be implemented here.'
    });
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ error: 'Failed to export PDF' });
  }
});

// Export book as EPUB (stub)
router.post('/:id/export/epub', authMiddleware, async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // EPUB export stub - in real implementation, this would generate an EPUB
    const epubPath = `/exports/${bookId}.epub`;
    
    res.json({
      message: 'EPUB export initiated',
      downloadUrl: epubPath,
      note: 'This is a stub implementation. EPUB generation would be implemented here.'
    });
  } catch (error) {
    console.error('EPUB export error:', error);
    res.status(500).json({ error: 'Failed to export EPUB' });
  }
});

// AI Content Generation Stub
function generateBookContent(prompt, category) {
  const templates = {
    'Children\'s Stories': `Once upon a time, ${prompt}. This magical story teaches us about friendship and adventure. The characters learn valuable lessons along the way, and everyone lives happily ever after.`,
    'Cookbooks': `Welcome to this delicious cookbook about ${prompt}. Here you'll find amazing recipes and cooking tips. Each recipe is carefully crafted to bring joy to your kitchen and table.`,
    'Adventure Books': `The adventure begins when ${prompt}. Our brave heroes face challenges and discover hidden treasures. Through courage and determination, they overcome every obstacle.`,
    'Science Fiction': `In the year 2150, ${prompt}. Technology has advanced beyond our wildest dreams, but humanity faces new challenges. Our protagonists must navigate this brave new world.`,
    'Romance': `Love blooms when ${prompt}. Two hearts find each other against all odds. Their journey teaches us about the power of true love and dedication.`,
    'Mystery': `The mystery unfolds when ${prompt}. Detective work reveals hidden clues and surprising twists. Nothing is quite what it seems in this thrilling tale.`,
    'Biography': `The inspiring life story of ${prompt}. From humble beginnings to great achievements, this biography showcases the power of perseverance and determination.`,
    'Self-Help': `Transform your life with insights about ${prompt}. This guide provides practical steps and wisdom to help you achieve your goals and find fulfillment.`,
    'Educational': `Learn all about ${prompt} in this comprehensive educational guide. Clear explanations and examples make complex topics easy to understand.`,
    'Fantasy': `In a realm of magic and wonder, ${prompt}. Mythical creatures and ancient powers shape this extraordinary tale of good versus evil.`
  };

  return templates[category] || `This is a story about ${prompt}. The content would be generated by AI based on the selected category and prompt. This is a placeholder for the actual AI-generated content.`;
}

module.exports = router;