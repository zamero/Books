import { Book } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, Calendar, Copy, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BookCardProps {
  book: Book;
  onRent: (bookId: string) => void;
  onViewDetails: (book: Book) => void;
  loading?: boolean;
  variant?: 'default' | 'compact';
}

export function BookCard({ book, onRent, onViewDetails, loading, variant = 'default' }: BookCardProps) {
  const isAvailable = book.availableCopies > 0;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col",
        variant === 'compact' && "max-w-sm"
      )}
      onClick={() => onViewDetails(book)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-0 flex-grow">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Floating elements */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant={isAvailable ? "secondary" : "destructive"} className="text-xs">
              {isAvailable ? `${book.availableCopies} available` : 'Out of stock'}
            </Badge>
            <Badge variant="outline" className="text-xs bg-white/90 text-black">
              {book.genre}
            </Badge>
          </div>

          {/* Book info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-white text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{book.rating}</span>
              <span className="text-white/70">•</span>
              <Calendar className="h-4 w-4" />
              <span>{book.publishedYear}</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              by {book.author}
            </p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {book.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Copy className="h-4 w-4" />
            <span>{book.totalCopies} total copies</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {book.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {/* {book.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{book.tags.length - 3}
              </Badge>
            )} */}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onRent(book.id);
          }}
          disabled={!isAvailable || loading}
          className="w-full"
          size="sm"
        >
          {loading ? 'Renting...' : isAvailable ? 'Rent Book' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
}