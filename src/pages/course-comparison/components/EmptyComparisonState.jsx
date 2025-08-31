import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyComparisonState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="GitCompare" size={48} className="text-muted-foreground" />
      </div>
      
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        No Courses to Compare
      </h2>
      
      <p className="text-muted-foreground mb-8 max-w-md">
        Start comparing courses by adding them from search results or your saved courses. 
        You can compare up to 4 courses side by side.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/course-search-results">
          <Button iconName="Search" iconPosition="left">
            Browse Courses
          </Button>
        </Link>
        
        <Link to="/user-dashboard">
          <Button variant="outline" iconName="Bookmark" iconPosition="left">
            View Saved Courses
          </Button>
        </Link>
      </div>
      
      {/* How it works */}
      <div className="mt-12 max-w-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          How Course Comparison Works
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
              <Icon name="Plus" size={24} />
            </div>
            <h4 className="font-medium text-foreground mb-2">Add Courses</h4>
            <p className="text-sm text-muted-foreground">
              Select courses from search results or your bookmarks to add to comparison
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-3">
              <Icon name="Eye" size={24} />
            </div>
            <h4 className="font-medium text-foreground mb-2">Compare Details</h4>
            <p className="text-sm text-muted-foreground">
              View side-by-side comparison of fees, requirements, and curriculum
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-3">
              <Icon name="CheckCircle" size={24} />
            </div>
            <h4 className="font-medium text-foreground mb-2">Make Decision</h4>
            <p className="text-sm text-muted-foreground">
              Use insights to choose the best course for your goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyComparisonState;