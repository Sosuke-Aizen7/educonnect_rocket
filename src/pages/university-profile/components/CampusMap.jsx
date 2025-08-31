import React from 'react';
import Icon from '../../../components/AppIcon';

const CampusMap = ({ university }) => {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Map" size={18} className="mr-2 text-primary" />
        Campus Location
      </h3>
      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={16} className="text-primary mt-1" />
          <div>
            <div className="font-medium text-foreground">{university?.name}</div>
            <div className="text-sm text-muted-foreground">{university?.fullAddress}</div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="aspect-video rounded-lg overflow-hidden border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={`${university?.name} Campus Location`}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${university?.coordinates?.lat},${university?.coordinates?.lng}&z=15&output=embed`}
            className="w-full h-full"
          />
        </div>

        {/* Nearby Amenities */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {university?.nearbyAmenities?.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Icon name={amenity?.icon} size={14} className="text-primary" />
              <span className="text-muted-foreground">{amenity?.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusMap;