import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  searchQuery, 
  hasActiveFilters, 
  onClearFilters, 
  className = '' 
}) => {
  const suggestions = [
    'Try different keywords or subject areas',
    'Check your spelling and try again',
    'Remove some filters to see more results',
    'Browse popular courses and universities',
    'Use broader search terms'
  ];

  const popularSearches = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Medicine',
    'Psychology',
    'Data Science'
  ];

  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-3">
          {searchQuery ? 'No courses found' : 'Start your search'}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          {searchQuery 
            ? `We couldn't find any courses matching "${searchQuery}"${hasActiveFilters ? ' with your current filters' : ''}.`
            : 'Enter keywords to find courses and universities that match your interests.'
          }
        </p>

        {/* Suggestions */}
        {searchQuery && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-4">Try these suggestions:</h3>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              {suggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full sm:w-auto"
            >
              <Icon name="X" size={16} className="mr-2" />
              Clear All Filters
            </Button>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/homepage">
              <Button variant="outline" className="w-full sm:w-auto">
                <Icon name="Home" size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/university-profile">
              <Button className="w-full sm:w-auto">
                <Icon name="GraduationCap" size={16} className="mr-2" />
                Browse Universities
              </Button>
            </Link>
          </div>
        </div>

        {/* Popular Searches */}
        {!searchQuery && (
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Popular searches:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches?.map((search, index) => (
                <button
                  key={index}
                  className="px-3 py-1.5 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    // In a real app, this would trigger a search
                    window.location.href = `/course-search-results?q=${encodeURIComponent(search)}`;
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;