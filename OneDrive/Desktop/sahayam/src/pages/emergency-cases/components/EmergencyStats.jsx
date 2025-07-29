import React from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyStats = ({ stats }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const statItems = [
    {
      icon: 'AlertTriangle',
      label: 'Active Cases',
      value: formatNumber(stats.activeCases),
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: 'Heart',
      label: 'Total Raised',
      value: formatAmount(stats.totalRaised),
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'Users',
      label: 'Total Donors',
      value: formatNumber(stats.totalDonors),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'CheckCircle',
      label: 'Cases Completed',
      value: formatNumber(stats.completedCases),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-soft border border-border p-6">
      <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-6">
        Emergency Statistics
      </h3>
      
      <div className="space-y-4">
        {statItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.bgColor}`}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="font-data font-data-medium text-lg text-foreground">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-body font-body-medium text-sm text-foreground mb-3">
          Recent Activity
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">Rajesh Kumar</span> donated ₹5,000
            </span>
            <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-muted-foreground">
              New emergency case added for <span className="font-medium text-foreground">Heart Surgery</span>
            </span>
            <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">Priya Sharma</span> donated ₹2,000
            </span>
            <span className="text-xs text-muted-foreground ml-auto">8m ago</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">
              Emergency case <span className="font-medium text-foreground">completed</span> - Goal reached!
            </span>
            <span className="text-xs text-muted-foreground ml-auto">12m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyStats;