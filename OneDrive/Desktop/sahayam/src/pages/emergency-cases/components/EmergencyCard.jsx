import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmergencyCard = ({ emergency, onDonate }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'Urgent': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = () => {
    return Math.min((emergency.raised / emergency.goal) * 100, 100);
  };

  const getDaysLeft = () => {
    const today = new Date();
    const deadline = new Date(emergency.deadline);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const progress = calculateProgress();
  const daysLeft = getDaysLeft();

  return (
    <div className="bg-white rounded-lg shadow-soft hover:shadow-soft-hover transition-gentle border border-border overflow-hidden">
      {/* Priority Badge */}
      <div className="relative">
        <div className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(emergency.priority)}`}>
          {emergency.priority}
        </div>
        
        {/* Verification Badge */}
        {emergency.verified && (
          <div className="absolute top-3 right-3 z-10 flex items-center space-x-1 bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
            <Icon name="Shield" size={12} />
            <span>Verified</span>
          </div>
        )}

        {/* Patient Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={emergency.image}
            alt={emergency.patientName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Patient Info */}
        <div className="mb-3">
          <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-1 line-clamp-2">
            {emergency.patientName}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {emergency.condition}
          </p>
          
          {/* Hospital & Location */}
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{emergency.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Building2" size={12} />
              <span>{emergency.hospital}</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {formatAmount(emergency.raised)} raised
            </span>
            <span className="text-sm text-muted-foreground">
              of {formatAmount(emergency.goal)}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}% funded</span>
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{daysLeft} days left</span>
            </span>
          </div>
        </div>

        {/* Donor Count */}
        <div className="flex items-center space-x-1 mb-4 text-sm text-muted-foreground">
          <Icon name="Users" size={14} />
          <span>{emergency.donorCount} donors</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => onDonate(emergency)}
            iconName="Heart"
            iconPosition="left"
            iconSize={14}
          >
            Donate Now
          </Button>
          
          <Link to={`/campaign-details/${emergency.id}?emergency_id=${emergency.id}&type=emergency`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              View Details
            </Button>
          </Link>
        </div>

        {/* Share Button */}
        <div className="mt-3 pt-3 border-t border-border">
          <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-gentle">
            <Icon name="Share2" size={14} />
            <span>Share this emergency</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCard;