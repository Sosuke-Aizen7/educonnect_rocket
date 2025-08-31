import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AboutSection = ({ university }) => {
  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Info" size={20} className="mr-2 text-primary" />
          University Overview
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {university?.overview}
        </p>
        
        {/* Mission Statement */}
        <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
          <h3 className="font-semibold text-foreground mb-2">Mission Statement</h3>
          <p className="text-sm text-muted-foreground italic">
            "{university?.mission}"
          </p>
        </div>
      </div>
      {/* Accreditation */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Award" size={20} className="mr-2 text-primary" />
          Accreditation & Recognition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {university?.accreditations?.map((accreditation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={16} className="text-success" />
              </div>
              <div>
                <div className="font-medium text-foreground">{accreditation?.name}</div>
                <div className="text-sm text-muted-foreground">{accreditation?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Notable Alumni */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Star" size={20} className="mr-2 text-primary" />
          Notable Alumni
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {university?.notableAlumni?.map((alumni, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10">
                <Image
                  src={alumni?.image}
                  alt={alumni?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground truncate">{alumni?.name}</div>
                <div className="text-sm text-muted-foreground truncate">{alumni?.achievement}</div>
                <div className="text-xs text-primary">{alumni?.field}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Key Statistics */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
          Key Statistics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {university?.statistics?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;