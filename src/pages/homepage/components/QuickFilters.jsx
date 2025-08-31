import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickFilters = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);

  const filterCategories = [
    {
      id: 'level',
      label: 'Study Level',
      icon: 'GraduationCap',
      options: [
        { value: 'undergraduate', label: 'Undergraduate', count: '25,000+' },
        { value: 'graduate', label: 'Graduate', count: '18,000+' },
        { value: 'doctorate', label: 'Doctorate', count: '7,000+' },
        { value: 'certificate', label: 'Certificate', count: '12,000+' }
      ]
    },
    {
      id: 'country',
      label: 'Country',
      icon: 'Globe',
      options: [
        { value: 'us', label: 'United States', count: '15,000+' },
        { value: 'uk', label: 'United Kingdom', count: '8,500+' },
        { value: 'canada', label: 'Canada', count: '6,200+' },
        { value: 'australia', label: 'Australia', count: '4,800+' },
        { value: 'germany', label: 'Germany', count: '5,500+' }
      ]
    },
    {
      id: 'subject',
      label: 'Subject',
      icon: 'BookOpen',
      options: [
        { value: 'computer-science', label: 'Computer Science', count: '8,500+' },
        { value: 'business', label: 'Business', count: '12,000+' },
        { value: 'engineering', label: 'Engineering', count: '9,200+' },
        { value: 'medicine', label: 'Medicine', count: '3,800+' },
        { value: 'arts', label: 'Arts & Humanities', count: '6,700+' }
      ]
    }
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(activeFilter === filterId ? null : filterId);
  };

  const handleOptionSelect = (filterType, option) => {
    const searchParams = new URLSearchParams();
    searchParams?.set(filterType, option?.value);
    navigate(`/course-search-results?${searchParams?.toString()}`);
    setActiveFilter(null);
  };

  return (
    <section className="py-8 lg:py-12 bg-muted/30">
      <div className="container px-4 lg:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Quick Search Filters
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for with our smart filtering system
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {filterCategories?.map((category) => (
              <div key={category?.id} className="relative">
                <Button
                  variant={activeFilter === category?.id ? "default" : "outline"}
                  onClick={() => handleFilterClick(category?.id)}
                  iconName={category?.icon}
                  iconPosition="left"
                  className="w-full justify-between h-14"
                >
                  <span className="flex items-center">
                    {category?.label}
                  </span>
                  <Icon 
                    name={activeFilter === category?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </Button>

                {/* Dropdown Options */}
                {activeFilter === category?.id && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-modal z-50 animate-fade-in">
                    <div className="py-2">
                      {category?.options?.map((option) => (
                        <button
                          key={option?.value}
                          onClick={() => handleOptionSelect(category?.id, option)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-colors duration-150"
                        >
                          <span className="text-sm font-medium text-popover-foreground">
                            {option?.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {option?.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Over <span className="font-semibold text-foreground">50,000 courses</span> from{' '}
              <span className="font-semibold text-foreground">2,500+ universities</span> in{' '}
              <span className="font-semibold text-foreground">80+ countries</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickFilters;