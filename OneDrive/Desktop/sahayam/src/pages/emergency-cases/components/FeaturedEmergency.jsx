import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedEmergency = ({ emergency, onDonate }) => {
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
    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-red-200 overflow-hidden mb-8">
      <div className="p-6">
        {/* Featured Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              <Icon name="Zap" size={14} />
              <span>Featured Emergency</span>
            </div>
            <div className="flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              <Icon name="Clock" size={12} />
              <span>CRITICAL</span>
            </div>
          </div>
          
          {emergency.verified && (
            <div className="flex items-center space-x-1 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
              <Icon name="Shield" size={12} />
              <span>Verified</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Content */}
          <div>
            <h2 className="font-heading font-heading-bold text-2xl text-foreground mb-3">
              {emergency.patientName}
            </h2>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {emergency.description}
            </p>

            {/* Emergency Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{emergency.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Building2" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{emergency.hospital}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Stethoscope" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{emergency.condition}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{emergency.donorCount} donors</span>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-data font-data-medium text-lg text-foreground">
                  {formatAmount(emergency.raised)}
                </span>
                <span className="text-sm text-muted-foreground">
                  of {formatAmount(emergency.goal)} goal
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">
                  {Math.round(progress)}% funded
                </span>
                <span className="flex items-center space-x-1 text-red-600 font-medium">
                  <Icon name="Clock" size={14} />
                  <span>{daysLeft} days left</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={() => onDonate(emergency)}
                iconName="Heart"
                iconPosition="left"
                className="flex-1"
              >
                Donate Now
              </Button>
              
              <Link to={`/campaign-details?id=${emergency.id}&type=emergency`}>
                <Button variant="outline" size="lg" fullWidth>
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={emergency.image}
                alt={emergency.patientName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Urgency Indicator */}
            <div className="absolute top-4 left-4">
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                URGENT - {daysLeft} days left
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEmergency;