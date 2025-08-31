import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SortDropdown from './SortDropdown';

const SearchResultsHeader = ({ 
  totalResults, 
  currentSort, 
  onSortChange, 
  onToggleFilters,
  searchQuery,
  className = '' 
}) => {
  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="p-4 lg:p-6">
        {/* Search Query Display */}
        {searchQuery && (
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Search Results
            </h1>
            <p className="text-muted-foreground">
              Showing results for <span className="font-medium text-foreground">"{searchQuery}"</span>
            </p>
          </div>
        )}

        {/* Results Count and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Results Count */}
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{totalResults?.toLocaleString()}</span> courses found
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={onToggleFilters}
              className="lg:hidden flex items-center space-x-2"
            >
              <Icon name="Filter" size={16} />
              <span>Filters</span>
            </Button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
              <SortDropdown
                currentSort={currentSort}
                onSortChange={onSortChange}
              />
            </div>

            {/* View Toggle (List/Grid) */}
            <div className="hidden md:flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-r-none border-r border-border bg-primary text-primary-foreground"
              >
                <Icon name="Grid3X3" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-l-none"
              >
                <Icon name="List" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsHeader;