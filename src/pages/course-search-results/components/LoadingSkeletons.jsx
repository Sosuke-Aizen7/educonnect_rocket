import React from 'react';

const LoadingSkeletons = ({ count = 6, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="h-48 bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* University Info */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-muted"></div>
              <div className="h-3 bg-muted rounded w-24"></div>
              <div className="ml-auto h-3 bg-muted rounded w-16"></div>
            </div>
            
            {/* Title */}
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-full"></div>
              <div className="h-5 bg-muted rounded w-3/4"></div>
            </div>
            
            {/* Details */}
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
            
            {/* Price and Rating */}
            <div className="flex justify-between items-center">
              <div className="h-6 bg-muted rounded w-24"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
            
            {/* Highlights */}
            <div className="flex space-x-2">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-12"></div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeletons;