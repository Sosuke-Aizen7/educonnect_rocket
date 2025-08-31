import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CampusLifeSection = ({ campusLife }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('facilities');

  const categories = [
    { id: 'facilities', label: 'Facilities', icon: 'Building' },
    { id: 'organizations', label: 'Student Organizations', icon: 'Users' },
    { id: 'accommodation', label: 'Accommodation', icon: 'Home' },
    { id: 'dining', label: 'Dining', icon: 'Coffee' }
  ];

  return (
    <div className="space-y-8">
      {/* Campus Gallery */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Camera" size={20} className="mr-2 text-primary" />
          Campus Gallery
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={campusLife?.gallery?.[selectedImageIndex]?.url}
                alt={campusLife?.gallery?.[selectedImageIndex]?.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">
                  {campusLife?.gallery?.[selectedImageIndex]?.caption}
                </p>
              </div>
            </div>
          </div>
          
          {/* Thumbnail Grid */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">More Views</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 max-h-80 overflow-y-auto">
              {campusLife?.gallery?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-primary shadow-md' 
                      : 'border-transparent hover:border-muted'
                  }`}
                >
                  <Image
                    src={image?.url}
                    alt={image?.caption}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Campus Life Categories */}
      <div className="bg-card rounded-lg border">
        {/* Category Navigation */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setActiveCategory(category?.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeCategory === category?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={category?.icon} size={16} />
                <span>{category?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Content */}
        <div className="p-6">
          {activeCategory === 'facilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campusLife?.facilities?.map((facility, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={facility?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{facility?.name}</h4>
                    <p className="text-sm text-muted-foreground">{facility?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'organizations' && (
            <div className="space-y-4">
              {campusLife?.organizations?.map((org, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{org?.name}</h4>
                      <p className="text-sm text-muted-foreground">{org?.category}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {org?.memberCount} members
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'accommodation' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {campusLife?.accommodation?.map((housing, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{housing?.name}</h4>
                      <p className="text-sm text-muted-foreground">{housing?.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{housing?.price}</div>
                      <div className="text-xs text-muted-foreground">per semester</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={14} className="text-muted-foreground" />
                      <span>{housing?.capacity} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Wifi" size={14} className="text-muted-foreground" />
                      <span>WiFi included</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{housing?.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'dining' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campusLife?.dining?.map((venue, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{venue?.name}</h4>
                      <p className="text-sm text-muted-foreground">{venue?.type}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < venue?.rating ? 'text-accent fill-current' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Hours: {venue?.hours}
                  </div>
                  <p className="text-sm text-muted-foreground">{venue?.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Virtual Tour */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Play" size={20} className="mr-2 text-primary" />
          Virtual Campus Tour
        </h2>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <Button
            size="lg"
            iconName="Play"
            iconPosition="left"
            className="shadow-lg"
          >
            Start Virtual Tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampusLifeSection;