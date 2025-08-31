import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonHeader = ({ 
  courseCount = 0, 
  onClearAll, 
  onAddMore, 
  maxCourses = 4 
}) => {
  const canAddMore = courseCount < maxCourses;

  return (
    <div className="bg-card border-b sticky top-16 z-30">
      <div className="container px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Title and Count */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon name="GitCompare" size={24} className="text-primary" />
              <h1 className="text-xl font-semibold text-foreground">
                Course Comparison
              </h1>
            </div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
              {courseCount} of {maxCourses}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {canAddMore && (
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={onAddMore}
              >
                Add Course
              </Button>
            )}
            
            {courseCount > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => {
                    // Export functionality would be implemented here
                    console.log('Export comparison');
                  }}
                >
                  Export PDF
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={onClearAll}
                  className="text-destructive hover:text-destructive"
                >
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Course Counter */}
        <div className="sm:hidden mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>Comparing {courseCount} course{courseCount !== 1 ? 's' : ''}</span>
          {courseCount > 0 && (
            <Link 
              to="/course-search-results" 
              className="text-primary hover:underline"
            >
              Add more courses
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonHeader;