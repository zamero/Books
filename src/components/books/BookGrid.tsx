import React from 'react';
import { Book } from '../../types';
import { BookCard } from './BookCard';
import { Skeleton } from '../ui/skeleton';

interface BookGridProps {
  books: Book[];
  onRent: (bookId: string) => void;
  onViewDetails: (book: Book) => void;
  loading?: boolean;
  rentingBookId?: any;
  showUnavailable?: boolean;
}

export function BookGrid({ 
  books, 
  onRent, 
  onViewDetails, 
  loading, 
  rentingBookId, 
  showUnavailable = false 
}: BookGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Filter books based on availability unless showUnavailable is true
  const filteredBooks = showUnavailable 
    ? books 
    : books.filter(book => book.availableCopies > 0);

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">No books found</h3>
        <p className="text-muted-foreground">
          {books.length > 0 && !showUnavailable 
            ? "All matching books are currently unavailable. Try adjusting your search criteria."
            : "Try adjusting your search criteria or browse our collection."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onRent={onRent}
          onViewDetails={onViewDetails}
          loading={rentingBookId === book.id}
        />
      ))}
    </div>
  );
}