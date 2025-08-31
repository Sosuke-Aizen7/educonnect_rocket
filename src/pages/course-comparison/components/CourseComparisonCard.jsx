import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseComparisonCard = ({ course, onRemove, activeTab, isDesktop = false }) => {
  const renderOverview = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Duration</div>
        <div className="font-medium">{course?.duration}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Study Mode</div>
        <div className="font-medium">{course?.studyMode}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Start Date</div>
        <div className="font-medium">{course?.startDate}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Language</div>
        <div className="font-medium">{course?.language}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Accreditation</div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-success" />
          <span className="font-medium">{course?.accreditation}</span>
        </div>
      </div>
    </div>
  );

  const renderFees = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Tuition Fee</div>
        <div className="text-lg font-semibold text-primary">{course?.fees?.tuition}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Application Fee</div>
        <div className="font-medium">{course?.fees?.application}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Living Costs (Est.)</div>
        <div className="font-medium">{course?.fees?.living}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Total Cost</div>
        <div className="text-lg font-semibold">{course?.fees?.total}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Payment Options</div>
        <div className="space-y-1">
          {course?.fees?.paymentOptions?.map((option, index) => (
            <div key={index} className="text-sm">{option}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Academic Requirements</div>
        <div className="space-y-1">
          {course?.requirements?.academic?.map((req, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm">{req}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">English Requirements</div>
        <div className="space-y-1">
          {course?.requirements?.english?.map((req, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm">{req}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Additional Requirements</div>
        <div className="space-y-1">
          {course?.requirements?.additional?.map((req, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm">{req}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurriculum = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Core Subjects</div>
        <div className="space-y-1">
          {course?.curriculum?.core?.map((subject, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="BookOpen" size={16} className="text-primary flex-shrink-0" />
              <span className="text-sm">{subject}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Electives</div>
        <div className="space-y-1">
          {course?.curriculum?.electives?.map((subject, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="BookOpen" size={16} className="text-secondary flex-shrink-0" />
              <span className="text-sm">{subject}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Specializations</div>
        <div className="flex flex-wrap gap-2">
          {course?.curriculum?.specializations?.map((spec, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'fees':
        return renderFees();
      case 'requirements':
        return renderRequirements();
      case 'curriculum':
        return renderCurriculum();
      default:
        return renderOverview();
    }
  };

  return (
    <div className={`bg-card border rounded-lg ${isDesktop ? 'h-fit' : ''}`}>
      {/* Course Header */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Image
              src={course?.universityLogo}
              alt={course?.university}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">
                {course?.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {course?.university}
              </p>
              <p className="text-xs text-muted-foreground">
                {course?.location}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(course?.id)}
            className="text-muted-foreground hover:text-destructive flex-shrink-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Key Highlights */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {course?.degree}
          </span>
          <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
            {course?.ranking}
          </span>
          {course?.isPopular && (
            <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
              Popular Choice
            </span>
          )}
        </div>
      </div>
      {/* Course Content */}
      <div className="p-4">
        {renderContent()}
      </div>
      {/* Actions */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex space-x-2">
          <Link to="/course-detail" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Button size="sm" className="flex-1">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseComparisonCard;