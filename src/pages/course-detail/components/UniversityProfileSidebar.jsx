import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UniversityProfileSidebar = ({ university }) => {
  return (
    <div className="space-y-6">
      {/* University Header */}
      <div className="p-6 bg-card border rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={university?.logo}
            alt={university?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-foreground">{university?.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{university?.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < university?.rating ? 'text-accent fill-current' : 'text-muted'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {university?.rating} ({university?.reviewCount} reviews)
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="ExternalLink"
          iconPosition="right"
        >
          View Full Profile
        </Button>
      </div>
      {/* Key Statistics */}
      <div className="p-6 bg-card border rounded-lg">
        <h4 className="text-lg font-semibold text-foreground mb-4">Key Statistics</h4>
        <div className="space-y-4">
          {university?.statistics?.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={stat?.icon} size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">{stat?.label}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{stat?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Rankings & Accreditation */}
      <div className="p-6 bg-card border rounded-lg">
        <h4 className="text-lg font-semibold text-foreground mb-4">Rankings & Accreditation</h4>
        <div className="space-y-4">
          {university?.rankings?.map((ranking, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="text-sm font-medium text-foreground">{ranking?.organization}</div>
                <div className="text-xs text-muted-foreground">{ranking?.category}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">#{ranking?.rank}</div>
                <div className="text-xs text-muted-foreground">{ranking?.year}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h5 className="text-sm font-medium text-foreground mb-2">Accreditations</h5>
          <div className="flex flex-wrap gap-2">
            {university?.accreditations?.map((accreditation, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-success/10 text-success text-xs rounded-md font-medium"
              >
                {accreditation}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Campus Images */}
      <div className="p-6 bg-card border rounded-lg">
        <h4 className="text-lg font-semibold text-foreground mb-4">Campus Life</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {university?.campusImages?.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={image?.url}
                alt={image?.caption}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="Play"
          iconPosition="left"
        >
          Virtual Campus Tour
        </Button>
      </div>
      {/* Quick Facts */}
      <div className="p-6 bg-card border rounded-lg">
        <h4 className="text-lg font-semibold text-foreground mb-4">Quick Facts</h4>
        <div className="space-y-3">
          {university?.quickFacts?.map((fact, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">{fact?.label}</div>
                <div className="text-sm text-muted-foreground">{fact?.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div className="p-6 bg-card border rounded-lg">
        <h4 className="text-lg font-semibold text-foreground mb-4">Contact Information</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={16} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Phone</div>
              <div className="text-sm text-muted-foreground">{university?.contact?.phone}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Email</div>
              <div className="text-sm text-muted-foreground">{university?.contact?.email}</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground">Address</div>
              <div className="text-sm text-muted-foreground">{university?.contact?.address}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex space-x-2">
            {university?.socialMedia?.map((social, index) => (
              <button
                key={index}
                className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <Icon name={social?.icon} size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Download Brochure */}
      <div className="p-6 bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/20 rounded-lg">
        <h4 className="text-lg font-semibold text-foreground mb-2">Get More Information</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Download our comprehensive brochure with detailed program information.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="Download"
          iconPosition="left"
        >
          Download Brochure
        </Button>
      </div>
    </div>
  );
};

export default UniversityProfileSidebar;