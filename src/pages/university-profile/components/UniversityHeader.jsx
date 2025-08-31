import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UniversityHeader = ({ university, onContactAdmissions, onDownloadProspectus }) => {
  return (
    <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 border-b">
      {/* Hero Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={university?.heroImage}
          alt={`${university?.name} campus`}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>
      <div className="relative container px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* University Logo and Basic Info */}
          <div className="flex items-start space-x-4 mb-6 lg:mb-0">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-card border-2 border-white shadow-lg overflow-hidden">
                <Image
                  src={university?.logo}
                  alt={`${university?.name} logo`}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">
                {university?.name}
              </h1>
              <div className="flex items-center space-x-2 text-muted-foreground mb-3">
                <Icon name="MapPin" size={16} />
                <span className="text-sm lg:text-base">{university?.location}</span>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} className="text-primary" />
                  <span>Est. {university?.established}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-primary" />
                  <span>{university?.studentCount?.toLocaleString()} students</span>
                </div>
                {university?.ranking && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Trophy" size={14} className="text-accent" />
                    <span>#{university?.ranking} globally</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-0 lg:space-y-2 lg:min-w-[200px]">
            <Button
              onClick={onContactAdmissions}
              className="w-full sm:flex-1 lg:w-full"
              iconName="Mail"
              iconPosition="left"
            >
              Contact Admissions
            </Button>
            <Button
              variant="outline"
              onClick={onDownloadProspectus}
              className="w-full sm:flex-1 lg:w-full"
              iconName="Download"
              iconPosition="left"
            >
              Download Prospectus
            </Button>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {university?.highlights?.map((highlight, index) => (
            <div key={index} className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={highlight?.icon} size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{highlight?.label}</span>
              </div>
              <div className="text-lg font-bold text-primary">{highlight?.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityHeader;