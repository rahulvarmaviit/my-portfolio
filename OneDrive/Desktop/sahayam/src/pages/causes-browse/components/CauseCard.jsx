import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CauseCard = ({ cause }) => {
  const progressPercentage = (cause.raised / cause.goal) * 100;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-card shadow-soft hover:shadow-soft-hover transition-gentle overflow-hidden">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            src={cause.image}
            alt={cause.title}
            className="w-full h-full object-cover"
          />
        </div>
        {cause.isFeatured && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-body font-body-medium">
            Featured
          </div>
        )}
        {cause.isVerified && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-full flex items-center space-x-1 text-xs">
            <Icon name="CheckCircle" size={12} />
            <span className="font-body font-body-medium">Verified</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2 line-clamp-2">
            {cause.title}
          </h3>
          <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-3">
            {cause.description}
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-4">
            <Icon name="MapPin" size={14} />
            <span className="font-caption">{cause.location}</span>
            <span>•</span>
            <span className="font-caption">{cause.category}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-body font-body-medium text-foreground">
              {formatCurrency(cause.raised)} raised
            </span>
            <span className="text-sm font-body text-muted-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-progress"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground font-caption">
              Goal: {formatCurrency(cause.goal)}
            </span>
            <span className="text-xs text-muted-foreground font-caption">
              {cause.daysLeft} days left
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link to={`/campaign-details?id=${cause.id}`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              View Details
            </Button>
          </Link>
          <Link to={`/campaign-details?id=${cause.id}&donate=true`} className="flex-1">
            <Button variant="default" size="sm" fullWidth>
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CauseCard;