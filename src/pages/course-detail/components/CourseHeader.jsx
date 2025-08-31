import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseHeader = ({ course, onBookmark, onCompare, onApply, isBookmarked, isInComparison }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container px-4 lg:px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* University Logo and Basic Info */}
          <div className="flex items-start space-x-4 mb-6 lg:mb-0">
            <div className="flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=80&h=80&fit=crop&crop=center"
                alt={course?.university}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg object-cover border-2 border-white/20"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                {course?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <Icon name="GraduationCap" size={16} />
                  <span className="font-medium">{course?.university}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>{course?.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} />
                  <span>{course?.rating} ({course?.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 lg:flex-shrink-0">
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold">{course?.duration}</div>
              <div className="text-white/80 text-sm">Duration</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold">{course?.fee}</div>
              <div className="text-white/80 text-sm">Annual Fee</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold">{course?.startDate}</div>
              <div className="text-white/80 text-sm">Next Intake</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold">{course?.applicationDeadline}</div>
              <div className="text-white/80 text-sm">Deadline</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button
            variant="outline"
            onClick={onBookmark}
            iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
            iconPosition="left"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 flex-1 sm:flex-none"
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark Course'}
          </Button>
          <Button
            variant="outline"
            onClick={onCompare}
            iconName={isInComparison ? "GitCompareArrows" : "GitCompare"}
            iconPosition="left"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 flex-1 sm:flex-none"
          >
            {isInComparison ? 'In Comparison' : 'Add to Compare'}
          </Button>
          <Button
            onClick={onApply}
            iconName="ExternalLink"
            iconPosition="right"
            className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1 sm:flex-none"
          >
            Apply Now
          </Button>
        </div>

        {/* Application Deadline Countdown */}
        {course?.daysUntilDeadline && (
          <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <span className="font-medium">Application Deadline</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">{course?.daysUntilDeadline} days left</div>
                <div className="text-white/80 text-sm">to apply</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseHeader;