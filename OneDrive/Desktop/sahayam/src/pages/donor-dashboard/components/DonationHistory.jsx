import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DonationHistory = ({ donations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.campaignName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'successful':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'refunded':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'successful':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'refunded':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const handleViewReceipt = (donationId) => {
    console.log('Viewing receipt for donation:', donationId);
  };

  const handleShareDonation = (donation) => {
    console.log('Sharing donation:', donation);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-button bg-input focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-button bg-input focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="successful">Successful</option>
          <option value="pending">Pending</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        {filteredDonations.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Heart" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
              No donations found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' ?'Try adjusting your search or filter criteria' :'Start making donations to see your history here'
              }
            </p>
          </div>
        ) : (
          filteredDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-card rounded-card p-6 border border-border shadow-soft hover:shadow-soft-hover transition-gentle"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Campaign Image */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={donation.campaignImage}
                      alt={donation.campaignName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Donation Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-body font-body-semibold text-foreground truncate">
                        {donation.campaignName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {donation.category} • {donation.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(donation.status)}`}>
                        <Icon name={getStatusIcon(donation.status)} size={12} />
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <div className="font-data font-data-medium text-lg text-primary">
                          ₹{donation.amount.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Punyam Earned</span>
                        <div className="font-data font-data-medium text-lg text-accent">
                          +{donation.punyamEarned}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReceipt(donation.id)}
                        iconName="FileText"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Receipt
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShareDonation(donation)}
                        iconName="Share2"
                        iconSize={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonationHistory;