import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchTerm, location, onSearchChange, onLocationChange }) => {
  return (
    <div className="bg-card rounded-card p-6 shadow-soft mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search causes by keyword..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Filter by location..."
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="pl-10"
          />
          <Icon 
            name="MapPin" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;