import { Request, Response } from 'express';
import { sampleBooks } from '../data/books.js';
import { sampleRentals } from '../data/rentals.js';
import { BookSearchQuery, ApiResponse, Book, Rental } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const getAllBooks = (req: Request, res: Response) => {
  try {
    const query = req.query as BookSearchQuery;
    let filteredBooks = [...sampleBooks];

    // Search filter
    if (query.q) {
      const searchTerm = query.q.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Genre filter
    if (query.genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre.toLowerCase() === query.genre!.toLowerCase()
      );
    }

    // Author filter
    if (query.author) {
      filteredBooks = filteredBooks.filter(book => 
        book.author.toLowerCase().includes(query.author!.toLowerCase())
      );
    }

    // Sorting
    const sortBy = query.sortBy || 'relevance';
    const sortOrder = query.sortOrder || 'desc';

    filteredBooks.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'author':
          comparison = a.author.localeCompare(b.author);
          break;
        case 'year':
          comparison = a.publishedYear - b.publishedYear;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        default: // relevance
          comparison = b.rating - a.rating; // Default to rating for relevance
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Pagination
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    const response: ApiResponse<Book[]> = {
      success: true,
      data: paginatedBooks,
      pagination: {
        page,
        limit,
        total: filteredBooks.length,
        totalPages: Math.ceil(filteredBooks.length / limit)
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books'
    });
  }
};

export const getBookById = (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = sampleBooks.find(b => b.id === bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    const response: ApiResponse<Book> = {
      success: true,
      data: book
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book details'
    });
  }
};

export const rentBook = (req: AuthRequest, res: Response) => {
  try {
    const { bookId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const book = sampleBooks.find(b => b.id === bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No copies available for rent'
      });
    }

    // Check if user already has this book rented
    const existingRental = sampleRentals.find(r => 
      r.bookId === bookId && r.userId === userId && !r.isReturned
    );

    if (existingRental) {
      return res.status(400).json({
        success: false,
        message: 'You have already rented this book'
      });
    }

    // Create new rental
    const rental: Rental = {
      id: uuidv4(),
      bookId,
      userId,
      rentedAt: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      isReturned: false
    };

    sampleRentals.push(rental);
    book.availableCopies--;

    const response: ApiResponse<Rental> = {
      success: true,
      data: rental,
      message: 'Book rented successfully'
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to rent book'
    });
  }
};