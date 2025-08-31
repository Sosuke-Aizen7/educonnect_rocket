import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookmarkedCourses = ({ courses, onRemoveBookmark }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleSelection = (courseId) => {
    setSelectedCourses(prev => 
      prev?.includes(courseId) 
        ? prev?.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleBulkRemove = () => {
    selectedCourses?.forEach(courseId => onRemoveBookmark(courseId));
    setSelectedCourses([]);
    setIsSelectionMode(false);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedCourses([]);
  };

  if (courses?.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon name="Bookmark" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Bookmarked Courses</h3>
        <p className="text-muted-foreground mb-4">
          Start exploring courses and bookmark your favorites to see them here.
        </p>
        <Link to="/course-search-results">
          <Button>Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-semibold text-foreground">Bookmarked Courses</h2>
        <div className="flex items-center space-x-2">
          {isSelectionMode && selectedCourses?.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkRemove}
              iconName="Trash2"
              iconPosition="left"
            >
              Remove ({selectedCourses?.length})
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSelectionMode}
            iconName={isSelectionMode ? "X" : "CheckSquare"}
            iconPosition="left"
          >
            {isSelectionMode ? 'Cancel' : 'Select'}
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {courses?.map((course) => (
            <div key={course?.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              {isSelectionMode && (
                <input
                  type="checkbox"
                  checked={selectedCourses?.includes(course?.id)}
                  onChange={() => toggleSelection(course?.id)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              )}
              
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={course?.image}
                  alt={course?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">{course?.title}</h3>
                <p className="text-sm text-muted-foreground">{course?.university}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm font-medium text-primary">{course?.fee}</span>
                  <span className="text-sm text-muted-foreground">{course?.duration}</span>
                  <span className="text-sm text-muted-foreground">{course?.level}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Link to="/course-detail">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveBookmark(course?.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Icon name="Bookmark" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {courses?.length > 3 && (
          <div className="mt-6 text-center">
            <Button variant="outline">View All Bookmarks ({courses?.length})</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedCourses;