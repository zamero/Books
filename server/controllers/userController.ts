import { Request, Response } from 'express';
import { sampleBooks } from '../data/books.js';
import { sampleRentals } from '../data/rentals.js';
import { ApiResponse } from '../types/index.js';

interface AuthRequest extends Request {
  user?: { id: string };
}

interface BookWithRental {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  rentalId: string;
  rentedAt: Date;
  dueDate: Date;
  isOverdue: boolean;
}

export const getUserBooks = (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user?.id;

    // Users can only view their own books (or admin could view any)
    if (userId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own books.'
      });
    }

    const userRentals = sampleRentals.filter(r => 
      r.userId === userId && !r.isReturned
    );

    const booksWithRentals: BookWithRental[] = userRentals.map(rental => {
      const book = sampleBooks.find(b => b.id === rental.bookId);
      if (!book) {
        throw new Error(`Book not found for rental ${rental.id}`);
      }

      const isOverdue = new Date() > rental.dueDate;

      return {
        id: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.coverImage,
        genre: book.genre,
        rentalId: rental.id,
        rentedAt: rental.rentedAt,
        dueDate: rental.dueDate,
        isOverdue
      };
    });

    const response: ApiResponse<BookWithRental[]> = {
      success: true,
      data: booksWithRentals
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user books'
    });
  }
};