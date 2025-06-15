export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  description: string;
  coverImage: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  rating: number;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Rental {
  id: string;
  bookId: string;
  userId: string;
  rentedAt: Date;
  dueDate: Date;
  returnedAt?: Date;
  isReturned: boolean;
  lateFee?: number;
}

export interface UserBook {
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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface BookSearchParams {
  q?: string;
  genre?: string;
  author?: string;
  sortBy?: 'relevance' | 'title' | 'author' | 'year' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}