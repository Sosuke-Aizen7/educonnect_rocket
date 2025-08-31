import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CourseComparisonCard from './CourseComparisonCard';

const MobileComparisonView = ({ courses, activeTab, onRemoveCourse }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCourse = () => {
    setCurrentIndex((prev) => (prev + 1) % courses?.length);
  };

  const prevCourse = () => {
    setCurrentIndex((prev) => (prev - 1 + courses?.length) % courses?.length);
  };

  if (courses?.length === 0) return null;

  return (
    <div className="md:hidden">
      {/* Course Navigation */}
      <div className="flex items-center justify-between mb-4 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevCourse}
          disabled={courses?.length <= 1}
          className="h-10 w-10"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">
            {currentIndex + 1} of {courses?.length}
          </span>
          
          {/* Dots indicator */}
          <div className="flex space-x-1">
            {courses?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={nextCourse}
          disabled={courses?.length <= 1}
          className="h-10 w-10"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
      {/* Current Course Card */}
      <div className="px-4">
        <CourseComparisonCard
          course={courses?.[currentIndex]}
          activeTab={activeTab}
          onRemove={onRemoveCourse}
          isDesktop={false}
        />
      </div>
      {/* Swipe hint */}
      {courses?.length > 1 && (
        <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
          <Icon name="ArrowLeft" size={12} className="mr-1" />
          <span>Swipe or use arrows to navigate</span>
          <Icon name="ArrowRight" size={12} className="ml-1" />
        </div>
      )}
    </div>
  );
};

export default MobileComparisonView;