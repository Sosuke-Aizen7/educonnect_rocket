import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyActionBar = ({ 
  course, 
  onBookmark, 
  onCompare, 
  onApply, 
  isBookmarked, 
  isInComparison 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Show/hide sticky bar based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = 400; // Approximate height of course header
      setIsVisible(scrollPosition > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer for application deadline
  useEffect(() => {
    if (!course?.applicationDeadlineDate) return;

    const updateCountdown = () => {
      const now = new Date()?.getTime();
      const deadline = new Date(course.applicationDeadlineDate)?.getTime();
      const difference = deadline - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [course?.applicationDeadlineDate]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-floating animate-slide-up">
      <div className="container px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Course Info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} className="text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{course?.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{course?.university}</span>
                <span className="font-semibold text-primary">{course?.fee}</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          {timeLeft?.days > 0 && (
            <div className="hidden lg:flex items-center space-x-4 px-4 py-2 bg-warning/10 border border-warning/20 rounded-lg">
              <Icon name="Clock" size={16} className="text-warning" />
              <div className="text-sm">
                <div className="font-semibold text-foreground">Application Deadline</div>
                <div className="text-warning">
                  {timeLeft?.days}d {timeLeft?.hours}h {timeLeft?.minutes}m {timeLeft?.seconds}s
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Mobile Compact Actions */}
            <div className="flex lg:hidden space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBookmark}
                className={isBookmarked ? 'text-accent' : ''}
              >
                <Icon name={isBookmarked ? "BookmarkCheck" : "Bookmark"} size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCompare}
                className={isInComparison ? 'text-primary' : ''}
              >
                <Icon name={isInComparison ? "GitCompareArrows" : "GitCompare"} size={18} />
              </Button>
              <Button
                onClick={onApply}
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
              >
                Apply
              </Button>
            </div>

            {/* Desktop Full Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onBookmark}
                iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                iconPosition="left"
              >
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onCompare}
                iconName={isInComparison ? "GitCompareArrows" : "GitCompare"}
                iconPosition="left"
              >
                {isInComparison ? 'In Comparison' : 'Compare'}
              </Button>
              <Button
                onClick={onApply}
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Countdown */}
        {timeLeft?.days > 0 && (
          <div className="lg:hidden mt-3 p-2 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Icon name="Clock" size={14} className="text-warning" />
              <span className="text-foreground">Deadline in:</span>
              <span className="font-semibold text-warning">
                {timeLeft?.days}d {timeLeft?.hours}h {timeLeft?.minutes}m
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyActionBar;