import React from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'most-funded', label: 'Most Funded' },
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'alphabetical', label: 'A to Z' },
    { value: 'goal-low-high', label: 'Goal: Low to High' },
    { value: 'goal-high-low', label: 'Goal: High to Low' }
  ];

  return (
    <div className="w-full md:w-64">
      <Select
        label="Sort by"
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
        placeholder="Choose sorting option"
      />
    </div>
  );
};

export default SortDropdown;