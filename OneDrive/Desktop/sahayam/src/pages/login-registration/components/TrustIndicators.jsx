import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'Award',
      title: 'Verified Platform',
      description: 'Trusted by 50,000+ donors across India'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  const securityBadges = [
    {
      name: 'SSL Secured',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      name: 'Data Protected',
      icon: 'Lock',
      color: 'text-primary'
    },
    {
      name: 'Verified Safe',
      icon: 'CheckCircle',
      color: 'text-accent'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Features */}
      <div className="grid grid-cols-1 gap-4">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-muted/50 rounded-card">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={feature.icon} size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-body-semibold text-sm text-foreground">
                {feature.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Security Badges */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-center space-x-6">
          {securityBadges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={badge.icon} size={16} className={badge.color} />
              <span className="text-xs font-caption text-muted-foreground">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Support Contact */}
      <div className="text-center p-4 bg-accent/5 rounded-card border border-accent/20">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Headphones" size={16} className="text-accent" />
          <span className="text-sm font-body-semibold text-accent">24/7 Support</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Need help? Contact us at{' '}
          <a href="mailto:support@sahayam.org" className="text-primary hover:text-primary/80">
            support@sahayam.org
          </a>
        </p>
      </div>
    </div>
  );
};

export default TrustIndicators;