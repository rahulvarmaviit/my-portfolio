import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Donations",
      value: "₹2,50,00,000+",
      icon: "Heart",
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Raised through verified campaigns"
    },
    {
      id: 2,
      title: "Active Campaigns",
      value: "156",
      icon: "Target",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Currently seeking support"
    },
    {
      id: 3,
      title: "Lives Impacted",
      value: "25,000+",
      icon: "Users",
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Beneficiaries helped so far"
    },
    {
      id: 4,
      title: "Punyam Points",
      value: "5,67,890",
      icon: "Star",
      color: "text-warning",
      bgColor: "bg-warning/10",
      description: "Distributed to generous donors"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-heading-bold text-3xl lg:text-4xl text-foreground mb-4">
            Our Impact Together
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            See how the Sahayam community is creating positive change across India
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-card rounded-card shadow-soft hover:shadow-soft-hover transition-gentle p-6 text-center group"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-full mb-4 group-hover:scale-110 transition-gentle`}>
                <Icon 
                  name={stat.icon} 
                  size={24} 
                  className={stat.color}
                />
              </div>

              {/* Value */}
              <div className="font-data font-data-medium text-2xl lg:text-3xl text-foreground mb-2">
                {stat.value}
              </div>

              {/* Title */}
              <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
                {stat.title}
              </h3>

              {/* Description */}
              <p className="font-caption text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-button">
            <Icon name="TrendingUp" size={16} />
            <span className="font-caption font-caption-normal text-sm">
              Growing by 15% every month with your support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStats;