import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';


const FilterSidebar = ({ 
  isOpen, 
  onToggle, 
  filters, 
  onFiltersChange,
  onClearFilters 
}) => {
  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'ahmedabad', label: 'Ahmedabad' }
  ];

  const goalRangeOptions = [
    { value: 'all', label: 'Any Amount' },
    { value: '0-50000', label: 'Under ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-500000', label: '₹1,00,000 - ₹5,00,000' },
    { value: '500000-1000000', label: '₹5,00,000 - ₹10,00,000' },
    { value: '1000000+', label: 'Above ₹10,00,000' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: '0-7', label: 'Ending in 7 days' },
    { value: '8-30', label: '8-30 days left' },
    { value: '31-90', label: '1-3 months left' },
    { value: '90+', label: 'More than 3 months' }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName={isOpen ? "X" : "Filter"}
          iconPosition="left"
          fullWidth
        >
          {isOpen ? 'Close Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`${
        isOpen ? 'block' : 'hidden'
      } md:block bg-card rounded-card p-6 shadow-soft`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-heading-semibold text-lg text-foreground">
            Filters
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconSize={16}
          >
            Clear All
          </Button>
        </div>

        <div className="space-y-6">
          {/* Location Filter */}
          <div>
            <Select
              label="Location"
              options={locationOptions}
              value={filters.location}
              onChange={(value) => onFiltersChange({ ...filters, location: value })}
              searchable
            />
          </div>

          {/* Goal Range Filter */}
          <div>
            <Select
              label="Funding Goal"
              options={goalRangeOptions}
              value={filters.goalRange}
              onChange={(value) => onFiltersChange({ ...filters, goalRange: value })}
            />
          </div>

          {/* Duration Filter */}
          <div>
            <Select
              label="Time Remaining"
              options={durationOptions}
              value={filters.duration}
              onChange={(value) => onFiltersChange({ ...filters, duration: value })}
            />
          </div>

          {/* Verification Status */}
          <div>
            <h4 className="font-body font-body-medium text-foreground mb-3">
              Verification Status
            </h4>
            <div className="space-y-2">
              <Checkbox
                label="Verified by Sahayam"
                checked={filters.verifiedOnly}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  verifiedOnly: e.target.checked 
                })}
              />
              <Checkbox
                label="Featured Campaigns"
                checked={filters.featuredOnly}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  featuredOnly: e.target.checked 
                })}
              />
            </div>
          </div>

          {/* Progress Status */}
          <div>
            <h4 className="font-body font-body-medium text-foreground mb-3">
              Campaign Progress
            </h4>
            <div className="space-y-2">
              <Checkbox
                label="Recently Started (0-25%)"
                checked={filters.progressRanges.includes('0-25')}
                onChange={(e) => {
                  const ranges = e.target.checked 
                    ? [...filters.progressRanges, '0-25']
                    : filters.progressRanges.filter(r => r !== '0-25');
                  onFiltersChange({ ...filters, progressRanges: ranges });
                }}
              />
              <Checkbox
                label="Making Progress (25-75%)"
                checked={filters.progressRanges.includes('25-75')}
                onChange={(e) => {
                  const ranges = e.target.checked 
                    ? [...filters.progressRanges, '25-75']
                    : filters.progressRanges.filter(r => r !== '25-75');
                  onFiltersChange({ ...filters, progressRanges: ranges });
                }}
              />
              <Checkbox
                label="Almost Complete (75-100%)"
                checked={filters.progressRanges.includes('75-100')}
                onChange={(e) => {
                  const ranges = e.target.checked 
                    ? [...filters.progressRanges, '75-100']
                    : filters.progressRanges.filter(r => r !== '75-100');
                  onFiltersChange({ ...filters, progressRanges: ranges });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;