import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserBook } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { BookOpen, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { format } from 'date-fns';

interface UserProfileProps {
  open: boolean;
  onClose: () => void;
  userBooks: UserBook[];
  onReturnBook: (rentalId: string) => void;
  loading?: boolean;
  returningRentalId?: string;
}

export function UserProfile({ open, onClose, userBooks, onReturnBook, loading, returningRentalId }: UserProfileProps) {
  const { user } = useAuth();

  if (!user) return null;

  const overdueBooks = userBooks.filter(book => book.isOverdue);
  const upcomingDue = userBooks.filter(book => !book.isOverdue);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
          <DialogTitle>My Library</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Member since</p>
              <p className="font-medium">{format(new Date(user.createdAt), 'MMMM yyyy')}</p>
            </div>
          </div>

          <Separator />

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div whileHover={{ rotateZ: 2, scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Currently Borrowed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{userBooks.length}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ rotateZ: 2, scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Overdue Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span className="text-2xl font-bold text-destructive">{overdueBooks.length}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ rotateZ: 2, scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Due This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className="text-2xl font-bold text-orange-500">
                      {upcomingDue.filter(book =>
                        new Date(book.dueDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
                      ).length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Borrowed Books */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Borrowed Books</h3>
            
            {userBooks.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">You haven't borrowed any books yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Browse our collection and rent your first book!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {userBooks.map((book) => (
                    <motion.div
                      key={book.rentalId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="relative">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded">
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 space-y-2">
                              <div>
                                <h4 className="font-semibold line-clamp-1">{book.title}</h4>
                                <p className="text-sm text-muted-foreground">by {book.author}</p>
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {book.genre}
                                </Badge>
                              </div>
                              
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>Rented: {format(new Date(book.rentedAt), 'MMM dd, yyyy')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span className={book.isOverdue ? 'text-destructive' : ''}>
                                    Due: {format(new Date(book.dueDate), 'MMM dd, yyyy')}
                                  </span>
                                </div>
                              </div>

                              {book.isOverdue && (
                                <Badge variant="destructive" className="text-xs">
                                  Overdue
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => onReturnBook(book.rentalId)}
                              disabled={loading || returningRentalId === book.rentalId}
                            >
                              {returningRentalId === book.rentalId ? 'Returning...' : 'Return Book'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}