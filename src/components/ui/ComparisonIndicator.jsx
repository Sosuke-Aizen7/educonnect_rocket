import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ComparisonIndicator = ({ className = '' }) => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock comparison data - in real app, this would come from context/state management
  useEffect(() => {
    // Simulate loading comparison items from localStorage or context
    const mockItems = [
      {
        id: 1,
        title: 'Computer Science - Harvard',
        type: 'course',
        university: 'Harvard University',
        duration: '4 years',
        fee: '$52,000/year'
      },
      {
        id: 2,
        title: 'Data Science - Stanford',
        type: 'course',
        university: 'Stanford University',
        duration: '2 years',
        fee: '$58,000/year'
      }
    ];
    
    setComparisonItems(mockItems);
    setIsVisible(mockItems?.length > 0);
  }, []);

  const removeItem = (itemId) => {
    const updatedItems = comparisonItems?.filter(item => item?.id !== itemId);
    setComparisonItems(updatedItems);
    setIsVisible(updatedItems?.length > 0);
    
    if (updatedItems?.length === 0) {
      setIsExpanded(false);
    }
  };

  const clearAll = () => {
    setComparisonItems([]);
    setIsVisible(false);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Floating Indicator */}
      <div className={`hidden md:block fixed bottom-6 right-6 z-40 ${className}`}>
        <div className="bg-card border rounded-lg shadow-floating animate-fade-in">
          {!isExpanded ? (
            // Collapsed State
            (<div className="flex items-center space-x-3 p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="flex items-center space-x-2"
              >
                <div className="relative">
                  <Icon name="GitCompare" size={20} className="text-primary" />
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {comparisonItems?.length}
                  </span>
                </div>
                <span className="text-sm font-medium">Compare ({comparisonItems?.length})</span>
              </Button>
              <Link to="/course-comparison">
                <Button size="sm" className="text-sm">
                  View Comparison
                </Button>
              </Link>
            </div>)
          ) : (
            // Expanded State
            (<div className="w-80 max-h-96 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-sm font-semibold text-foreground">Comparison List</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearAll}
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleExpanded}
                    className="h-6 w-6"
                  >
                    <Icon name="ChevronDown" size={14} />
                  </Button>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {comparisonItems?.map((item) => (
                  <div key={item?.id} className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {item?.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {item?.university} • {item?.duration}
                      </div>
                      <div className="text-xs font-mono text-primary">
                        {item?.fee}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item?.id)}
                      className="h-6 w-6 text-muted-foreground hover:text-destructive flex-shrink-0 ml-2"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t bg-muted/30">
                <Link to="/course-comparison" className="w-full">
                  <Button size="sm" className="w-full text-sm">
                    Compare All ({comparisonItems?.length})
                  </Button>
                </Link>
              </div>
            </div>)
          )}
        </div>
      </div>
      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t shadow-floating">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Icon name="GitCompare" size={20} className="text-primary" />
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {comparisonItems?.length}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {comparisonItems?.length} item{comparisonItems?.length !== 1 ? 's' : ''} to compare
                </div>
                <div className="text-xs text-muted-foreground">
                  Tap to view comparison
                </div>
              </div>
            </div>
            
            <Link to="/course-comparison">
              <Button size="sm">
                Compare
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonIndicator;