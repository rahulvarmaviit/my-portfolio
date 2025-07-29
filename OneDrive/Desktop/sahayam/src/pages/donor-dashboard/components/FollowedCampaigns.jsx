import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FollowedCampaigns = ({ campaigns }) => {
  const [sortBy, setSortBy] = useState('recent');

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastUpdate) - new Date(a.lastUpdate);
      case 'progress':
        return b.progressPercentage - a.progressPercentage;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleUnfollow = (campaignId) => {
    console.log('Unfollowing campaign:', campaignId);
  };

  const handleDonateToCampaign = (campaignId) => {
    console.log('Donating to campaign:', campaignId);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 50) return 'bg-primary';
    if (percentage >= 25) return 'bg-warning';
    return 'bg-error';
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'critical':
        return { color: 'text-error bg-error/10', icon: 'AlertTriangle', text: 'Critical' };
      case 'urgent':
        return { color: 'text-warning bg-warning/10', icon: 'Clock', text: 'Urgent' };
      case 'moderate':
        return { color: 'text-primary bg-primary/10', icon: 'Info', text: 'Moderate' };
      default:
        return { color: 'text-muted-foreground bg-muted', icon: 'Circle', text: 'Normal' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-heading font-heading-semibold text-lg text-foreground">
            Followed Campaigns
          </h3>
          <p className="text-sm text-muted-foreground">
            {campaigns.length} campaigns you're supporting
          </p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-border rounded-button bg-input focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="recent">Recent Updates</option>
          <option value="progress">Progress</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>

      {/* Campaigns Grid */}
      <div className="space-y-6">
        {sortedCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Heart" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
              No followed campaigns
            </h3>
            <p className="text-muted-foreground mb-6">
              Start following campaigns to track their progress here
            </p>
            <Link to="/causes-browse">
              <Button variant="default" iconName="Search" iconPosition="left">
                Browse Campaigns
              </Button>
            </Link>
          </div>
        ) : (
          sortedCampaigns.map((campaign) => {
            const urgencyBadge = getUrgencyBadge(campaign.urgency);
            
            return (
              <div
                key={campaign.id}
                className="bg-card rounded-card p-6 border border-border shadow-soft hover:shadow-soft-hover transition-gentle"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Campaign Image */}
                  <div className="flex-shrink-0">
                    <div className="w-full lg:w-48 h-48 lg:h-32 rounded-lg overflow-hidden">
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-body font-body-semibold text-lg text-foreground line-clamp-2">
                            {campaign.title}
                          </h3>
                          {campaign.isVerified && (
                            <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {campaign.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="MapPin" size={14} />
                            {campaign.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            Updated {campaign.lastUpdate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-caption ${urgencyBadge.color}`}>
                          <Icon name={urgencyBadge.icon} size={12} />
                          {urgencyBadge.text}
                        </span>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-data text-foreground">
                          {campaign.progressPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(campaign.progressPercentage)}`}
                          style={{ width: `${campaign.progressPercentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-data text-primary">
                          ₹{campaign.raised.toLocaleString('en-IN')} raised
                        </span>
                        <span className="text-muted-foreground">
                          of ₹{campaign.goal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Recent Updates */}
                    {campaign.recentUpdate && (
                      <div className="bg-muted/30 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <Icon name="Bell" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm font-body font-body-medium text-foreground mb-1">
                              Latest Update
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {campaign.recentUpdate}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/campaign-details" className="flex-1">
                        <Button variant="default" fullWidth iconName="Eye" iconPosition="left">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => handleDonateToCampaign(campaign.id)}
                        iconName="Heart"
                        iconPosition="left"
                      >
                        Donate Again
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnfollow(campaign.id)}
                        iconName="UserMinus"
                        iconSize={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FollowedCampaigns;