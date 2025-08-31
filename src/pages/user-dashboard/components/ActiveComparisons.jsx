import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ActiveComparisons = ({ comparisons, onDeleteComparison }) => {
  if (comparisons?.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon name="GitCompare" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Active Comparisons</h3>
        <p className="text-muted-foreground mb-4">
          Compare courses side-by-side to make informed decisions about your education.
        </p>
        <Link to="/course-search-results">
          <Button>Find Courses to Compare</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-semibold text-foreground">Active Comparisons</h2>
        <Link to="/course-comparison">
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            New Comparison
          </Button>
        </Link>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {comparisons?.map((comparison) => (
            <div key={comparison?.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{comparison?.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created {comparison?.createdAt} • {comparison?.courses?.length} courses
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to="/course-comparison">
                    <Button variant="outline" size="sm">
                      Continue Editing
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteComparison(comparison?.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                {comparison?.courses?.map((course, index) => (
                  <div key={index} className="flex-shrink-0 w-48 border rounded-lg p-3 bg-background">
                    <div className="w-full h-24 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={course?.image}
                        alt={course?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-foreground truncate">{course?.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{course?.university}</p>
                    <p className="text-xs font-medium text-primary mt-1">{course?.fee}</p>
                  </div>
                ))}
                
                {comparison?.courses?.length < 4 && (
                  <div className="flex-shrink-0 w-48 border-2 border-dashed border-muted rounded-lg p-3 flex items-center justify-center h-32">
                    <div className="text-center">
                      <Icon name="Plus" size={24} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Add Course</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {comparisons?.length > 2 && (
          <div className="mt-6 text-center">
            <Button variant="outline">View All Comparisons</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveComparisons;