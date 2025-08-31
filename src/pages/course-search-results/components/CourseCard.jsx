import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ 
  course, 
  onBookmark, 
  onCompare, 
  isBookmarked = false, 
  isSelected = false,
  className = '' 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleBookmarkClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onBookmark(course?.id);
  };

  const handleCompareClick = (e) => {
    e?.stopPropagation();
    onCompare(course?.id, e?.target?.checked);
  };

  const formatFee = (fee) => {
    if (typeof fee === 'number') {
      return `$${fee?.toLocaleString()}/year`;
    }
    return fee;
  };

  return (
    <div className={`
      group bg-card border border-border rounded-lg overflow-hidden
      hover:shadow-lg hover:border-primary/20 transition-all duration-200
      ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
      ${className}
    `}>
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={course?.image}
          alt={course?.title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmarkClick}
          className={`
            absolute top-3 right-3 h-8 w-8 rounded-full
            ${isBookmarked 
              ? 'bg-accent text-accent-foreground hover:bg-accent/80' 
              : 'bg-white/90 text-muted-foreground hover:bg-white hover:text-accent'
            }
            shadow-sm backdrop-blur-sm
          `}
        >
          <Icon 
            name={isBookmarked ? "Heart" : "Heart"} 
            size={16}
            className={isBookmarked ? 'fill-current' : ''}
          />
        </Button>

        {/* Course Level Badge */}
        <div className="absolute top-3 left-3">
          <span className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
            ${course?.level === 'Bachelor' ? 'bg-success/90 text-success-foreground' :
              course?.level === 'Master' ? 'bg-primary/90 text-primary-foreground' :
              course?.level === 'PhD' ? 'bg-secondary/90 text-secondary-foreground' :
              'bg-muted/90 text-muted-foreground'
            }
            backdrop-blur-sm
          `}>
            {course?.level}
          </span>
        </div>
      </div>
      {/* Course Content */}
      <div className="p-4">
        {/* University Info */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <Image
              src={course?.university?.logo}
              alt={course?.university?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">
              {course?.university?.name}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="MapPin" size={12} />
            <span>{course?.location}</span>
          </div>
        </div>

        {/* Course Title */}
        <Link to="/course-detail" className="block group/link">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover/link:text-primary transition-colors">
            {course?.title}
          </h3>
        </Link>

        {/* Course Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{course?.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>{course?.startDate}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">
              {formatFee(course?.fee)}
            </div>
            {course?.rating && (
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-accent fill-current" />
                <span className="text-sm font-medium text-foreground">{course?.rating}</span>
                <span className="text-xs text-muted-foreground">({course?.reviews})</span>
              </div>
            )}
          </div>
        </div>

        {/* Course Highlights */}
        {course?.highlights && course?.highlights?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {course?.highlights?.slice(0, 3)?.map((highlight, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
              {course?.highlights?.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs text-muted-foreground">
                  +{course?.highlights?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`compare-${course?.id}`}
              checked={isSelected}
              onChange={handleCompareClick}
              className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
            />
            <label 
              htmlFor={`compare-${course?.id}`}
              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
            >
              Compare
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/course-detail">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Button size="sm">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;