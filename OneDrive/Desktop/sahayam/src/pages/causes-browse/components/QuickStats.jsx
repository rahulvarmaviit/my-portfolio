import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ totalCauses, totalFundsRaised, activeDonors }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-card p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mx-auto mb-3">
            <Icon name="Heart" size={24} color="var(--color-primary)" />
          </div>
          <div className="font-data font-data-medium text-2xl text-foreground mb-1">
            {formatNumber(totalCauses)}
          </div>
          <div className="text-muted-foreground font-caption text-sm">
            Active Causes
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-success/20 rounded-full mx-auto mb-3">
            <Icon name="TrendingUp" size={24} color="var(--color-success)" />
          </div>
          <div className="font-data font-data-medium text-2xl text-foreground mb-1">
            {formatCurrency(totalFundsRaised)}
          </div>
          <div className="text-muted-foreground font-caption text-sm">
            Total Funds Raised
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mx-auto mb-3">
            <Icon name="Users" size={24} color="var(--color-accent)" />
          </div>
          <div className="font-data font-data-medium text-2xl text-foreground mb-1">
            {formatNumber(activeDonors)}
          </div>
          <div className="text-muted-foreground font-caption text-sm">
            Active Donors
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;