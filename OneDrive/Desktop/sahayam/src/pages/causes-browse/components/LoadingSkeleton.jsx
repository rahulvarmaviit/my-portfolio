import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-card rounded-card shadow-soft overflow-hidden animate-pulse">
          <div className="h-48 bg-muted" />
          <div className="p-6">
            <div className="h-4 bg-muted rounded mb-2" />
            <div className="h-4 bg-muted rounded w-3/4 mb-3" />
            <div className="h-3 bg-muted rounded w-1/2 mb-4" />
            <div className="h-2 bg-muted rounded mb-2" />
            <div className="flex justify-between mb-4">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/4" />
            </div>
            <div className="flex space-x-3">
              <div className="h-8 bg-muted rounded flex-1" />
              <div className="h-8 bg-muted rounded flex-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;