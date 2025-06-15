import { motion } from 'framer-motion';
import { Book } from '../../types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Star, Calendar, Copy, BookOpen, Tag } from 'lucide-react';
import { apiCall } from '../../hooks/useApi';
import { useToast } from '../../hooks/use-toast';

interface BookDetailsProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
  onRent: (bookId: string) => void;
  loading?: boolean;
}

export function BookDetails({ book, open, onClose, onRent, loading }: BookDetailsProps) {
  if (!book) return null;

  const isAvailable = book.availableCopies > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Book Details</DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Book Cover */}
          <motion.div className="space-y-4" variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}>
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover="hover"
                initial="rest"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.1 }
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  variants={{
                    rest: { y: 0, rotate: 0, opacity: 1 },
                    hover: { y: -10, rotate: 20, opacity: [1, 0.5, 1, 0.5, 1] }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
                <span className="font-semibold text-lg">{book.rating}</span>
                <span className="text-muted-foreground">rating</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Badge variant={isAvailable ? "secondary" : "destructive"}>
                  {isAvailable ? `${book.availableCopies} available` : 'Out of stock'}
                </Badge>
              </motion.div>
            </div>
          </motion.div>

          {/* Book Information */}
          <motion.div className="space-y-6" variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}>
            <div>
              <h1 className="text-3xl font-bold leading-tight mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                by {book.author}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Badge variant="outline" className="mb-4">
                  {book.genre}
                </Badge>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Published {book.publishedYear}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>ISBN: {book.isbn}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Copy className="h-4 w-4" />
                <span>{book.totalCopies} total copies</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4" />
                <span>{book.rating}/5 rating</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4" />
                <h3 className="font-semibold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <motion.div key={tag} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Badge variant="secondary">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="flex-1">
                <Button
                  onClick={() => onRent(book.id)}
                  disabled={!isAvailable || loading}
                  size="lg"
                  className="w-full"
                >
                  {loading ? 'Renting...' : isAvailable ? 'Rent This Book' : 'Unavailable'}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Button variant="outline" size="lg">
                  Add to Wishlist
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}