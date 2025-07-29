import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyCard = ({ campaign }) => {
  const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const timeLeft = () => {
    const now = new Date();
    const deadline = new Date(campaign.deadline);
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Expired';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <div className="bg-card rounded-card shadow-soft hover:shadow-soft-hover transition-gentle overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-gentle"
        />
        
        {/* Urgency Badge */}
        {campaign.isUrgent && (
          <div className="absolute top-3 left-3 bg-error text-error-foreground px-2 py-1 rounded-button text-xs font-caption font-caption-normal flex items-center space-x-1">
            <Icon name="AlertTriangle" size={12} />
            <span>Urgent</span>
          </div>
        )}

        {/* Verification Badge */}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-button text-xs font-caption font-caption-normal flex items-center space-x-1">
          <Icon name="CheckCircle" size={12} />
          <span>Verified</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-gentle">
          {campaign.title}
        </h3>

        {/* Location */}
        <div className="flex items-center space-x-2 text-muted-foreground mb-3">
          <Icon name="MapPin" size={14} />
          <span className="font-caption text-sm">{campaign.location}</span>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-progress"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Amount Info */}
          <div className="flex justify-between items-center text-sm">
            <span className="font-data font-data-medium text-foreground">
              {formatCurrency(campaign.raised)}
            </span>
            <span className="font-caption text-muted-foreground">
              of {formatCurrency(campaign.goal)}
            </span>
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center mt-1">
            <span className="font-caption text-xs text-accent">
              {progressPercentage.toFixed(0)}% funded
            </span>
            <span className="font-caption text-xs text-muted-foreground">
              {timeLeft()}
            </span>
          </div>
        </div>

        {/* Donors Count */}
        <div className="flex items-center space-x-2 text-muted-foreground mb-4">
          <Icon name="Users" size={14} />
          <span className="font-caption text-sm">
            {campaign.donorsCount} donors supported
          </span>
        </div>

        {/* Action Button */}
        <Link to={`/campaign-details?id=${campaign.id}`}>
          <Button 
            variant="default" 
            fullWidth
            iconName="Heart"
            iconPosition="left"
            className="group-hover:bg-primary/90"
          >
            Donate Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmergencyCard;