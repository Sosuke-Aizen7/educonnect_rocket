import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll, className = '' }) => {
  const getFilterChips = () => {
    const chips = [];
    
    // Country chips
    if (activeFilters?.countries?.length > 0) {
      activeFilters?.countries?.forEach(country => {
        const countryNames = {
          'us': 'United States',
          'uk': 'United Kingdom',
          'ca': 'Canada',
          'au': 'Australia',
          'de': 'Germany',
          'fr': 'France',
          'nl': 'Netherlands',
          'se': 'Sweden'
        };
        
        chips?.push({
          id: `country-${country}`,
          label: countryNames?.[country] || country,
          category: 'countries',
          value: country,
          type: 'Country'
        });
      });
    }

    // Subject chips
    if (activeFilters?.subjects?.length > 0) {
      activeFilters?.subjects?.forEach(subject => {
        const subjectNames = {
          'computer-science': 'Computer Science',
          'business': 'Business Administration',
          'engineering': 'Engineering',
          'medicine': 'Medicine',
          'psychology': 'Psychology',
          'economics': 'Economics',
          'law': 'Law',
          'arts': 'Arts & Humanities'
        };
        
        chips?.push({
          id: `subject-${subject}`,
          label: subjectNames?.[subject] || subject,
          category: 'subjects',
          value: subject,
          type: 'Subject'
        });
      });
    }

    // Study Level chips
    if (activeFilters?.studyLevels?.length > 0) {
      activeFilters?.studyLevels?.forEach(level => {
        const levelNames = {
          'bachelor': 'Bachelor\'s',
          'master': 'Master\'s',
          'phd': 'PhD/Doctorate',
          'diploma': 'Diploma/Certificate'
        };
        
        chips?.push({
          id: `level-${level}`,
          label: levelNames?.[level] || level,
          category: 'studyLevels',
          value: level,
          type: 'Study Level'
        });
      });
    }

    // Duration chips
    if (activeFilters?.durations?.length > 0) {
      activeFilters?.durations?.forEach(duration => {
        const durationNames = {
          '1-year': '1 Year',
          '2-year': '2 Years',
          '3-year': '3 Years',
          '4-year': '4+ Years'
        };
        
        chips?.push({
          id: `duration-${duration}`,
          label: durationNames?.[duration] || duration,
          category: 'durations',
          value: duration,
          type: 'Duration'
        });
      });
    }

    // Fee Range chip
    if (activeFilters?.feeRange && (activeFilters?.feeRange?.min > 0 || activeFilters?.feeRange?.max < 100000)) {
      chips?.push({
        id: 'fee-range',
        label: `$${activeFilters?.feeRange?.min?.toLocaleString() || 0} - $${activeFilters?.feeRange?.max?.toLocaleString() || 100000}`,
        category: 'feeRange',
        value: 'feeRange',
        type: 'Fee Range'
      });
    }

    return chips;
  };

  const chips = getFilterChips();

  if (chips?.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Filter" size={16} />
        <span className="hidden sm:inline">Active filters:</span>
      </div>
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {chips?.map((chip) => (
          <div
            key={chip?.id}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm border border-primary/20 hover:bg-primary/20 transition-colors"
          >
            <span className="font-medium">{chip?.label}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveFilter(chip?.category, chip?.value)}
              className="h-4 w-4 hover:bg-primary/30 rounded-full"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        ))}
      </div>
      {/* Clear All Button */}
      {chips?.length > 1 && (
        <Button
          variant="ghost"
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground px-2 py-1"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChips;