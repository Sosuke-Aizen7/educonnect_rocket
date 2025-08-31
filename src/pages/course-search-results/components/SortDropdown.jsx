import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'fee-low', label: 'Lowest Fee', icon: 'TrendingDown' },
    { value: 'fee-high', label: 'Highest Fee', icon: 'TrendingUp' },
    { value: 'duration-short', label: 'Shortest Duration', icon: 'Clock' },
    { value: 'duration-long', label: 'Longest Duration', icon: 'Clock' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'alphabetical', label: 'A to Z', icon: 'ArrowUpDown' },
    { value: 'newest', label: 'Newest First', icon: 'Calendar' }
  ];

  const currentSortOption = sortOptions?.find(option => option?.value === currentSort) || sortOptions?.[0];

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[160px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <Icon name={currentSortOption?.icon} size={16} />
          <span className="text-sm font-medium">{currentSortOption?.label}</span>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="text-muted-foreground" 
        />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-popover border border-border rounded-md shadow-modal z-50 animate-fade-in">
          <div className="py-1">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleSortSelect(option?.value)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 text-sm text-left
                  hover:bg-muted transition-colors duration-150
                  ${currentSort === option?.value 
                    ? 'bg-primary/10 text-primary font-medium' :'text-popover-foreground'
                  }
                `}
              >
                <Icon 
                  name={option?.icon} 
                  size={16} 
                  className={currentSort === option?.value ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className="flex-1">{option?.label}</span>
                {currentSort === option?.value && (
                  <Icon name="Check" size={14} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;