import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      id: 'donations',
      title: 'Total Donations',
      value: `₹${stats.totalDonations.toLocaleString('en-IN')}`,
      icon: 'Heart',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: `${stats.donationCount} donations made`
    },
    {
      id: 'punyam',
      title: 'Punyam Points',
      value: stats.punyamPoints.toLocaleString('en-IN'),
      icon: 'Star',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Points earned'
    },
    {
      id: 'campaigns',
      title: 'Active Campaigns',
      value: stats.activeCampaigns,
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Currently supporting'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statCards.map((card) => (
        <div
          key={card.id}
          className="bg-card rounded-card p-6 border border-border shadow-soft hover:shadow-soft-hover transition-gentle"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${card.bgColor}`}>
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
            <div className="text-right">
              <div className={`text-2xl font-heading font-heading-bold ${card.color}`}>
                {card.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {card.description}
              </div>
            </div>
          </div>
          <h3 className="font-body font-body-medium text-foreground">
            {card.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;