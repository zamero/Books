import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { BookGrid } from './components/books/BookGrid';
import { BookDetails } from './components/books/BookDetails';
import { SearchFilters } from './components/books/SearchFilters';
import { UserProfile } from './components/profile/UserProfile';
import { AuthDialog } from './components/auth/AuthDialog';
import { useAuth, AuthProvider } from './hooks/useAuth';
import { useApi, apiCall } from './hooks/useApi';
import { Book, BookSearchParams, UserBook } from './types';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';
import { AnimatedDiv } from './components/ui/AnimatedDiv';
import './App.css';

function LibraryApp() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BookSearchParams>({
    sortBy: 'relevance',
    sortOrder: 'desc',
    page: 1,
    limit: 12,
  });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [rentingBookId, setRentingBookId] = useState<string | null>(null);
  const [returningRentalId, setReturningRentalId] = useState<string | undefined>(undefined);

  // Build search params
  const searchParams = new URLSearchParams();
  if (searchQuery) searchParams.set('q', searchQuery);
  if (filters.genre) searchParams.set('genre', filters.genre);
  if (filters.author) searchParams.set('author', filters.author);
  if (filters.sortBy) searchParams.set('sortBy', filters.sortBy);
  if (filters.sortOrder) searchParams.set('sortOrder', filters.sortOrder);
  if (filters.page) searchParams.set('page', filters.page.toString());
  if (filters.limit) searchParams.set('limit', filters.limit.toString());

  // API calls
  const { data: booksData, loading: booksLoading, refetch: refetchBooks } = useApi<Book[]>(
    `/books?${searchParams.toString()}`,
    { dependencies: [searchQuery, filters] }
  );

  const { data: userBooks, loading: userBooksLoading, refetch: refetchUserBooks } = useApi<UserBook[]>(
    user ? `/users/${user.id}/books` : '',
    { immediate: user ? true : false, dependencies: [user?.id] }
  );

  // Derived data
  const books = booksData || [];
  const availableGenres = [...new Set(books.map(book => book.genre))];
  const availableAuthors = [...new Set(books.map(book => book.author))];

  // Update filters when search query changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, page: 1 }));
  }, [searchQuery]);

  // Handlers
  const handleRentBook = async (bookId: string) => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }

    setRentingBookId(bookId);
    try {
      const response = await apiCall(`/rentals`, {
        method: 'POST',
        body: JSON.stringify({ bookId }),
      });

      if (response.success) {
        toast({
          title: 'Book rented successfully!',
          description: response.message,
        });
        // Refetch both books and user books to update availability and library
        await Promise.all([refetchBooks(), refetchUserBooks()]);
        if (selectedBook?.id === bookId) {
          setSelectedBook(null);
        }
      }
    } catch (error) {
      toast({
        title: 'Failed to rent book',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setRentingBookId(null);
    }
  };

  const handleReturnBook = async (rentalId: string) => {
    setReturningRentalId(rentalId);
    try {
      const response = await apiCall(`/rentals/${rentalId}/return`, {
        method: 'POST',
      });

      if (response.success) {
        toast({
          title: 'Book returned successfully!',
          description: response.message,
        });
        // Refetch both books and user books to update availability and library
        await Promise.all([refetchBooks(), refetchUserBooks()]);
      }
    } catch (error) {
      toast({
        title: 'Failed to return book',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setReturningRentalId(undefined);
    }
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setShowProfile(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onProfileClick={handleProfileClick}
        onAuthClick={() => setShowAuth(true)}
      />

      <main className="container px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-primary/80 bg-clip-text text-transparent">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our vast collection of books, from timeless classics to modern bestsellers.
            Rent, read, and return with ease.
          </p>
        </section>

        {/* Search and Filters */}
        <section className="space-y-4">
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableGenres={availableGenres}
            availableAuthors={availableAuthors}
          />
        </section>

        {/* Books Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Books'}
            </h2>
            {/* {booksData && (
              <p className="text-muted-foreground">
                {books.filter(book => book.availableCopies > 0).length} available book{books.filter(book => book.availableCopies > 0).length !== 1 ? 's' : ''} found
              </p>
            )} */}
          </div>

          <BookGrid
            books={books}
            onRent={handleRentBook}
            onViewDetails={handleViewDetails}
            loading={booksLoading}
            rentingBookId={rentingBookId}
          />
        </section>

        {/* Show auth prompt for non-authenticated users */}
        {!isAuthenticated && (
          <section className="text-center py-12 border-t">
            <h3 className="text-2xl font-semibold mb-4">Ready to start reading?</h3>
            <p className="text-muted-foreground mb-6">
              Sign up today to rent books and manage your library.
            </p>
            <Button size="lg" onClick={() => setShowAuth(true)}>
              Get Started
            </Button>
          </section>
        )}
      </main>

      {/* Modals */}
      <BookDetails
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onRent={handleRentBook}
        loading={rentingBookId === selectedBook?.id}
      />

      <UserProfile
        open={showProfile}
        onClose={() => setShowProfile(false)}
        userBooks={userBooks || []}
        onReturnBook={handleReturnBook}
        loading={userBooksLoading}
        returningRentalId={returningRentalId}
      />

      <AuthDialog
        open={showAuth}
        onClose={() => setShowAuth(false)}
      />

      <Toaster />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AnimatedDiv>
        <LibraryApp />
      </AnimatedDiv>
    </AuthProvider>
  );
}

export default App;