import { Request, Response } from 'express';
import { sampleBooks } from '../data/books.js';
import { sampleRentals } from '../data/rentals.js';
import { ApiResponse, Rental } from '../types/index.js';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const returnBook = (req: AuthRequest, res: Response) => {
  try {
    const { rentalId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const rental = sampleRentals.find(r => r.id === rentalId);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }

    // Verify user owns this rental
    if (rental.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only return your own books.'
      });
    }

    if (rental.isReturned) {
      return res.status(400).json({
        success: false,
        message: 'Book has already been returned'
      });
    }

    // Update rental
    rental.isReturned = true;
    rental.returnedAt = new Date();

    // Calculate late fee if overdue
    if (new Date() > rental.dueDate) {
      const daysLate = Math.ceil((new Date().getTime() - rental.dueDate.getTime()) / (1000 * 60 * 60 * 24));
      rental.lateFee = daysLate * 0.50; // $0.50 per day late fee
    }

    // Update book availability
    const book = sampleBooks.find(b => b.id === rental.bookId);
    if (book) {
      book.availableCopies++;
    }

    const response: ApiResponse<Rental> = {
      success: true,
      data: rental,
      message: rental.lateFee 
        ? `Book returned successfully. Late fee: $${rental.lateFee.toFixed(2)}`
        : 'Book returned successfully'
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to return book'
    });
  }
};

export const rentBook = (req: AuthRequest, res: Response) => {
  try {
    const { bookId, userId: reqUserId } = req.body;
    const authenticatedUserId = req.user?.id;

    const userId = reqUserId || authenticatedUserId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated or userId not provided'
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
        message: 'Book is currently out of stock'
      });
    }

    const existingRental = sampleRentals.find(
      r => r.bookId === bookId && r.userId === userId && !r.isReturned
    );

    if (existingRental) {
      return res.status(409).json({
        success: false,
        message: 'You have already rented this book'
      });
    }

    // Create new rental
    const newRental: Rental = {
      id: `rental-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      bookId,
      userId,
      rentedAt: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      isReturned: false,
      lateFee: 0,
    };

    sampleRentals.push(newRental);
    book.availableCopies--;

    const response: ApiResponse<Rental> = {
      success: true,
      data: newRental,
      message: 'Book rented successfully!'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error renting book:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to rent book'
    });
  }
};