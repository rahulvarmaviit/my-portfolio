import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CampaignHero = ({ campaign }) => {
  const progressPercentage = Math.min(((campaign?.raised || 0) / (campaign?.goal || 1)) * 100, 100);

  return (
    <div className="bg-background">
      {/* Campaign Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-6">
        <Image
          src={campaign?.image}
          alt={campaign?.title || 'Campaign Image'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Verification Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-2 bg-success text-success-foreground px-3 py-1.5 rounded-full text-sm font-body font-body-medium">
            <Icon name="Shield" size={16} />
            <span>Verified by Sahayam</span>
          </div>
        </div>

        {/* Emergency Badge */}
        {campaign?.isEmergency && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 bg-error text-error-foreground px-3 py-1.5 rounded-full text-sm font-body font-body-medium">
              <Icon name="AlertTriangle" size={16} />
              <span>Emergency</span>
            </div>
          </div>
        )}
      </div>

      {/* Campaign Info */}
      <div className="space-y-4">
        <div>
          <h1 className="font-heading font-heading-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-2">
            {campaign?.title || 'Campaign Title'}
          </h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span className="font-body">{campaign?.location || 'Location'}</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-card rounded-card p-6 shadow-soft">
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body font-body-medium text-foreground">Progress</span>
                <span className="font-data font-data-medium text-primary">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-progress"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Amount Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-data font-data-medium text-2xl text-foreground">
                  ₹{(campaign?.raised || 0).toLocaleString('en-IN')}
                </div>
                <div className="font-caption text-muted-foreground">Raised</div>
              </div>
              <div>
                <div className="font-data font-data-medium text-2xl text-muted-foreground">
                  ₹{(campaign?.goal || 0).toLocaleString('en-IN')}
                </div>
                <div className="font-caption text-muted-foreground">Goal</div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="font-caption text-muted-foreground">{campaign?.donors || 0} donors</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="font-caption text-muted-foreground">{campaign?.daysLeft || 0} days left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHero;