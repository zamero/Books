import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Filter, X } from 'lucide-react';
import { BookSearchParams } from '../../types';

interface SearchFiltersProps {
  filters: BookSearchParams;
  onFiltersChange: (filters: BookSearchParams) => void;
  availableGenres: string[];
  availableAuthors: string[];
}

export function SearchFilters({ filters, onFiltersChange, availableGenres, availableAuthors }: SearchFiltersProps) {
  const hasActiveFilters = filters.genre || filters.author || (filters.sortBy && filters.sortBy !== 'relevance');

  const clearFilters = () => {
    onFiltersChange({
      ...filters,
      genre: undefined,
      author: undefined,
      sortBy: 'relevance',
      sortOrder: 'desc',
    });
  };

  const removeFilter = (key: keyof BookSearchParams) => {
    onFiltersChange({
      ...filters,
      [key]: undefined,
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="filters">
        <AccordionTrigger className="flex items-center gap-2 py-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-lg font-bold">Filters</h1>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-4 py-4 px-1">
            <Select
              value={filters.genre || 'all'}
              onValueChange={(value) => onFiltersChange({ ...filters, genre: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {availableGenres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.author || 'all'}
              onValueChange={(value) => onFiltersChange({ ...filters, author: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {availableAuthors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy || 'relevance'}
              onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as any })}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sortOrder || 'desc'}
              onValueChange={(value) => onFiltersChange({ ...filters, sortOrder: value as any })}
            >
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.genre && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Genre: {filters.genre}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 bg-secondary"
                    onClick={() => removeFilter('genre')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.author && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Author: {filters.author}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 bg-secondary"
                    onClick={() => removeFilter('author')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.sortBy && filters.sortBy !== 'relevance' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Sort: {filters.sortBy} ({filters.sortOrder})
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 bg-secondary"
                    onClick={() => removeFilter('sortBy')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}