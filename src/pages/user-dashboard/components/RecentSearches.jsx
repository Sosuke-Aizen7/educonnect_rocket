import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSearches = ({ searches, onClearHistory }) => {
  const executeSearch = (searchQuery) => {
    window.location.href = `/course-search-results?q=${encodeURIComponent(searchQuery)}`;
  };

  if (searches?.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Recent Searches</h3>
        <p className="text-muted-foreground mb-4">
          Your search history will appear here to help you quickly find courses again.
        </p>
        <Link to="/course-search-results">
          <Button>Start Searching</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-semibold text-foreground">Recent Searches</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          iconName="Trash2"
          iconPosition="left"
          className="text-muted-foreground hover:text-destructive"
        >
          Clear History
        </Button>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {searches?.map((search, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Search" size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{search?.query}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{search?.timestamp}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-primary">{search?.resultCount} results</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => executeSearch(search?.query)}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Search Again
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {searches?.length > 5 && (
          <div className="mt-6 text-center">
            <Button variant="outline">View All History</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentSearches;