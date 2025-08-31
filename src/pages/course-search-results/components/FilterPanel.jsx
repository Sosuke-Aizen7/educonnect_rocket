import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const countries = [
    { id: 'us', name: 'United States', count: 245 },
    { id: 'uk', name: 'United Kingdom', count: 189 },
    { id: 'ca', name: 'Canada', count: 156 },
    { id: 'au', name: 'Australia', count: 134 },
    { id: 'de', name: 'Germany', count: 98 },
    { id: 'fr', name: 'France', count: 87 },
    { id: 'nl', name: 'Netherlands', count: 76 },
    { id: 'se', name: 'Sweden', count: 65 }
  ];

  const subjects = [
    { id: 'computer-science', name: 'Computer Science', count: 312 },
    { id: 'business', name: 'Business Administration', count: 287 },
    { id: 'engineering', name: 'Engineering', count: 234 },
    { id: 'medicine', name: 'Medicine', count: 198 },
    { id: 'psychology', name: 'Psychology', count: 176 },
    { id: 'economics', name: 'Economics', count: 145 },
    { id: 'law', name: 'Law', count: 132 },
    { id: 'arts', name: 'Arts & Humanities', count: 124 }
  ];

  const studyLevels = [
    { id: 'bachelor', name: 'Bachelor\'s Degree', count: 456 },
    { id: 'master', name: 'Master\'s Degree', count: 389 },
    { id: 'phd', name: 'PhD/Doctorate', count: 234 },
    { id: 'diploma', name: 'Diploma/Certificate', count: 167 }
  ];

  const durations = [
    { id: '1-year', name: '1 Year', count: 123 },
    { id: '2-year', name: '2 Years', count: 234 },
    { id: '3-year', name: '3 Years', count: 345 },
    { id: '4-year', name: '4+ Years', count: 456 }
  ];

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...localFilters };
    
    if (checked) {
      newFilters[category] = [...(newFilters?.[category] || []), value];
    } else {
      newFilters[category] = (newFilters?.[category] || [])?.filter(item => item !== value);
    }
    
    setLocalFilters(newFilters);
  };

  const handleFeeRangeChange = (type, value) => {
    setLocalFilters(prev => ({
      ...prev,
      feeRange: {
        ...prev?.feeRange,
        [type]: parseInt(value) || 0
      }
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      countries: [],
      subjects: [],
      studyLevels: [],
      durations: [],
      feeRange: { min: 0, max: 100000 }
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterSection = ({ title, items, category, isCollapsible = true }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    
    return (
      <div className="border-b border-border pb-6 mb-6 last:border-b-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {isCollapsible && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={14} 
              />
            </Button>
          )}
        </div>
        {isExpanded && (
          <div className="space-y-3">
            {items?.map((item) => (
              <Checkbox
                key={item?.id}
                label={
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-foreground">{item?.name}</span>
                    <span className="text-xs text-muted-foreground">({item?.count})</span>
                  </div>
                }
                checked={(localFilters?.[category] || [])?.includes(item?.id)}
                onChange={(e) => handleFilterChange(category, item?.id, e?.target?.checked)}
                className="w-full"
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto
        w-80 lg:w-full max-w-sm lg:max-w-none
        bg-card border-r lg:border-r-0 lg:border border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        z-50 lg:z-auto overflow-y-auto
        ${className}
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Fee Range */}
          <div className="border-b border-border pb-6 mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Annual Tuition Fee (USD)</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  label="Min"
                  placeholder="0"
                  value={localFilters?.feeRange?.min || ''}
                  onChange={(e) => handleFeeRangeChange('min', e?.target?.value)}
                  className="text-sm"
                />
                <Input
                  type="number"
                  label="Max"
                  placeholder="100,000"
                  value={localFilters?.feeRange?.max || ''}
                  onChange={(e) => handleFeeRangeChange('max', e?.target?.value)}
                  className="text-sm"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Range: ${(localFilters?.feeRange?.min || 0)?.toLocaleString()} - ${(localFilters?.feeRange?.max || 100000)?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Country */}
          <FilterSection
            title="Country"
            items={countries}
            category="countries"
          />

          {/* Subject */}
          <FilterSection
            title="Subject Area"
            items={subjects}
            category="subjects"
          />

          {/* Study Level */}
          <FilterSection
            title="Study Level"
            items={studyLevels}
            category="studyLevels"
          />

          {/* Duration */}
          <FilterSection
            title="Duration"
            items={durations}
            category="durations"
          />
        </div>

        {/* Mobile Apply Button */}
        <div className="lg:hidden sticky bottom-0 p-4 bg-card border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={applyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;