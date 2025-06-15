import { Rental } from '../types/index.js';

export const sampleRentals: Rental[] = [
  {
    id: '1',
    bookId: '1',
    userId: '1',
    rentedAt: new Date('2024-01-10'),
    dueDate: new Date('2024-01-24'),
    isReturned: false
  },
  {
    id: '2',
    bookId: '3',
    userId: '2',
    rentedAt: new Date('2024-01-05'),
    dueDate: new Date('2024-01-19'),
    returnedAt: new Date('2024-01-18'),
    isReturned: true
  },
  {
    id: '3',
    bookId: '7',
    userId: '1',
    rentedAt: new Date('2024-01-12'),
    dueDate: new Date('2024-01-26'),
    isReturned: false
  }
];