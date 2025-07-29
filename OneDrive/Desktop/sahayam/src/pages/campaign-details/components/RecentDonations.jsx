import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentDonations = ({ donations }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const donationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - donationTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="bg-card rounded-card p-6 shadow-soft">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-heading-semibold text-xl text-foreground">
            Recent Donations
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Heart" size={16} />
            <span className="font-caption">{donations.length} supporters</span>
          </div>
        </div>

        {/* Donations List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {donations.map((donation, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-card">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {donation.avatar ? (
                  <Image
                    src={donation.avatar}
                    alt={donation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                )}
              </div>

              {/* Donation Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-body font-body-medium text-foreground truncate">
                    {donation.isAnonymous ? 'Anonymous Donor' : donation.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} className="text-primary" />
                    <span className="font-data font-data-medium text-primary">
                      ₹{donation.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Message */}
                {donation.message && (
                  <p className="font-body text-muted-foreground text-sm mb-2 line-clamp-2">
                    "{donation.message}"
                  </p>
                )}

                {/* Time and Punyam Points */}
                <div className="flex items-center justify-between">
                  <span className="font-caption text-muted-foreground">
                    {formatTimeAgo(donation.timestamp)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-accent" />
                    <span className="font-caption text-accent">
                      +{Math.floor(donation.amount / 100)} Punyam
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="pt-4 border-t border-border">
          <button className="w-full flex items-center justify-center space-x-2 py-3 text-primary hover:bg-primary/10 rounded-button transition-gentle">
            <Icon name="Users" size={18} />
            <span className="font-body font-body-medium">View All Supporters</span>
          </button>
        </div>

        {/* Encouragement Message */}
        <div className="bg-primary/10 rounded-card p-4">
          <div className="flex items-start space-x-3">
            <Icon name="MessageCircle" size={20} className="text-primary mt-1" />
            <div>
              <h4 className="font-body font-body-medium text-primary mb-1">
                Join the Movement
              </h4>
              <p className="font-caption text-primary/80">
                Every donation, no matter the size, makes a difference. Be part of this amazing cause!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDonations;