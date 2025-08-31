import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalSearchBar = ({ className = '', placeholder = "Search courses, universities...", onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'course', title: 'Computer Science', subtitle: 'Bachelor\'s Degree' },
    { type: 'course', title: 'Business Administration', subtitle: 'Master\'s Degree' },
    { type: 'university', title: 'Harvard University', subtitle: 'Cambridge, MA' },
    { type: 'university', title: 'Stanford University', subtitle: 'Stanford, CA' },
    { type: 'course', title: 'Data Science', subtitle: 'Master\'s Degree' },
    { type: 'university', title: 'MIT', subtitle: 'Cambridge, MA' },
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      setShowSuggestions(false);
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/course-search-results?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    
    if (value?.trim()) {
      // Filter suggestions based on input
      const filtered = mockSuggestions?.filter(item =>
        item?.title?.toLowerCase()?.includes(value?.toLowerCase()) ||
        item?.subtitle?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.title);
    setShowSuggestions(false);
    
    if (suggestion?.type === 'university') {
      navigate('/university-profile');
    } else {
      navigate(`/course-search-results?q=${encodeURIComponent(suggestion?.title)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions?.length === 0) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions?.[selectedIndex]);
        } else {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        searchRef?.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (searchQuery?.trim() && suggestions?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef?.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
        if (!searchQuery?.trim()) {
          setIsExpanded(false);
        }
      }
    }, 150);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef?.current && 
        !searchRef?.current?.contains(event?.target) &&
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'w-full' : 'w-full'
        }`}>
          <div className="relative w-full">
            <Input
              ref={searchRef}
              type="search"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="pr-10"
              autoComplete="off"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Icon name="Search" size={16} />
            </Button>
          </div>
        </div>
      </form>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions?.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-modal z-50 max-h-80 overflow-y-auto animate-fade-in"
        >
          {suggestions?.map((suggestion, index) => (
            <button
              key={`${suggestion?.type}-${suggestion?.title}-${index}`}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-muted transition-colors duration-150 ${
                index === selectedIndex ? 'bg-muted' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  suggestion?.type === 'university' ?'bg-secondary/10 text-secondary' :'bg-primary/10 text-primary'
                }`}>
                  <Icon 
                    name={suggestion?.type === 'university' ? 'GraduationCap' : 'BookOpen'} 
                    size={16} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-popover-foreground truncate">
                    {suggestion?.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {suggestion?.subtitle}
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;