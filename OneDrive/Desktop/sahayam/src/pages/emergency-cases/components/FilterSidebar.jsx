import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isOpen, onClose }) => {
  const medicalCategories = [
    { value: 'accident', label: 'Accidents' },
    { value: 'operation', label: 'Operations' },
    { value: 'treatment', label: 'Medical Treatments' },
    { value: 'cancer', label: 'Cancer Treatment' },
    { value: 'heart', label: 'Heart Surgery' },
    { value: 'kidney', label: 'Kidney Treatment' },
    { value: 'brain', label: 'Brain Surgery' },
    { value: 'other', label: 'Other Medical' }
  ];

  const urgencyLevels = [
    { value: 'critical', label: 'Critical' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'moderate', label: 'Moderate' }
  ];

  const locationOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'other', label: 'Other Cities' }
  ];

  const amountRanges = [
    { value: '0-50000', label: 'Under ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-500000', label: '₹1,00,000 - ₹5,00,000' },
    { value: '500000-1000000', label: '₹5,00,000 - ₹10,00,000' },
    { value: '1000000+', label: 'Above ₹10,00,000' }
  ];

  const handleCategoryChange = (category, checked) => {
    const updatedCategories = checked
      ? [...(filters.categories || []), category]
      : (filters.categories || []).filter(c => c !== category);
    
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-heading-semibold text-lg text-foreground">
          Filter Emergency Cases
        </h3>
        <button
          onClick={onClose}
          className="lg:hidden flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-gentle"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      {/* Medical Category */}
      <div>
        <h4 className="font-body font-body-medium text-sm text-foreground mb-3">
          Medical Category
        </h4>
        <div className="space-y-2">
          {medicalCategories.map((category) => (
            <Checkbox
              key={category.value}
              label={category.label}
              checked={(filters.categories || []).includes(category.value)}
              onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Urgency Level */}
      <div>
        <Select
          label="Urgency Level"
          options={urgencyLevels}
          value={filters.urgency || ''}
          onChange={(value) => onFilterChange({ ...filters, urgency: value })}
          placeholder="All urgency levels"
          clearable
        />
      </div>

      {/* Location */}
      <div>
        <Select
          label="Location"
          options={locationOptions}
          value={filters.location || ''}
          onChange={(value) => onFilterChange({ ...filters, location: value })}
          placeholder="All locations"
          searchable
          clearable
        />
      </div>

      {/* Amount Range */}
      <div>
        <Select
          label="Required Amount"
          options={amountRanges}
          value={filters.amountRange || ''}
          onChange={(value) => onFilterChange({ ...filters, amountRange: value })}
          placeholder="All amounts"
          clearable
        />
      </div>

      {/* Verification Status */}
      <div>
        <h4 className="font-body font-body-medium text-sm text-foreground mb-3">
          Verification Status
        </h4>
        <Checkbox
          label="Show only verified cases"
          checked={filters.verifiedOnly || false}
          onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
        />
      </div>

      {/* Days Left */}
      <div>
        <h4 className="font-body font-body-medium text-sm text-foreground mb-3">
          Time Remaining
        </h4>
        <div className="space-y-2">
          <Checkbox
            label="Less than 7 days"
            checked={filters.daysLeft === '7'}
            onChange={(e) => onFilterChange({ ...filters, daysLeft: e.target.checked ? '7' : null })}
          />
          <Checkbox
            label="Less than 30 days"
            checked={filters.daysLeft === '30'}
            onChange={(e) => onFilterChange({ ...filters, daysLeft: e.target.checked ? '30' : null })}
          />
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          onClick={onClearFilters}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white rounded-lg shadow-soft border border-border p-6 h-fit sticky top-24">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute top-0 right-0 w-80 max-w-full h-full bg-white shadow-soft-hover overflow-y-auto">
            <div className="p-6">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;