import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedCoursesCarousel = ({ courses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const coursesPerView = 3;
  const maxIndex = Math.max(0, courses?.length - coursesPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Related Courses</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="h-8 w-8"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / coursesPerView)}%)` }}
        >
          {courses?.map((course, index) => (
            <div key={course?.id} className="w-1/3 flex-shrink-0 px-2">
              <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course?.image}
                    alt={course?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-md font-medium">
                      {course?.level}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                      <Icon name="Bookmark" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Image
                      src={course?.universityLogo}
                      alt={course?.university}
                      className="w-6 h-6 rounded object-cover"
                    />
                    <span className="text-sm text-muted-foreground">{course?.university}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {course?.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{course?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{course?.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < course?.rating ? 'text-accent fill-current' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {course?.rating} ({course?.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-primary">{course?.fee}</div>
                      <div className="text-xs text-muted-foreground">per year</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">Next Intake</div>
                      <div className="text-sm text-muted-foreground">{course?.nextIntake}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link to="/course-detail" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                    >
                      <Icon name="GitCompare" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      {/* View All Link */}
      <div className="text-center mt-6">
        <Link to="/course-search-results">
          <Button variant="outline" iconName="ArrowRight" iconPosition="right">
            View All Similar Courses
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default RelatedCoursesCarousel;