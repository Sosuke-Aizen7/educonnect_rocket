import React from 'react';
import CourseComparisonCard from './CourseComparisonCard';

const DesktopComparisonView = ({ courses, activeTab, onRemoveCourse }) => {
  if (courses?.length === 0) return null;

  return (
    <div className="hidden md:block">
      <div className={`grid gap-6 ${
        courses?.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
        courses?.length === 2 ? 'grid-cols-2' :
        courses?.length === 3 ? 'grid-cols-3': 'grid-cols-2 xl:grid-cols-4'
      }`}>
        {courses?.map((course) => (
          <div key={course?.id} className="min-w-0">
            <CourseComparisonCard
              course={course}
              activeTab={activeTab}
              onRemove={onRemoveCourse}
              isDesktop={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopComparisonView;