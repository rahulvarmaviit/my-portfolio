import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const DonationCertificates = ({ certificates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  const years = [...new Set(certificates.map(cert => new Date(cert.issueDate).getFullYear()))].sort((a, b) => b - a);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'all' || new Date(cert.issueDate).getFullYear().toString() === selectedYear;
    return matchesSearch && matchesYear;
  });

  const handleDownload = (certificateId) => {
    console.log('Downloading certificate:', certificateId);
  };

  const handleShare = (certificate) => {
    console.log('Sharing certificate:', certificate);
  };

  const getCertificateTypeIcon = (type) => {
    switch (type) {
      case 'donation':
        return 'Heart';
      case 'achievement':
        return 'Award';
      case 'milestone':
        return 'Trophy';
      default:
        return 'FileText';
    }
  };

  const getCertificateTypeColor = (type) => {
    switch (type) {
      case 'donation':
        return 'text-primary bg-primary/10';
      case 'achievement':
        return 'text-accent bg-accent/10';
      case 'milestone':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
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
            placeholder="Search certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-button bg-input focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border border-border rounded-button bg-input focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year.toString()}>{year}</option>
          ))}
        </select>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertificates.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Icon name="Award" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
              No certificates found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedYear !== 'all' ?'Try adjusting your search or filter criteria' :'Make donations to earn certificates'
              }
            </p>
          </div>
        ) : (
          filteredCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-card rounded-card border border-border shadow-soft hover:shadow-soft-hover transition-gentle overflow-hidden"
            >
              {/* Certificate Preview */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getCertificateTypeColor(certificate.type)}`}>
                      <Icon name={getCertificateTypeIcon(certificate.type)} size={32} />
                    </div>
                    <h3 className="font-heading font-heading-bold text-xl text-foreground mb-2">
                      Certificate of {certificate.type.charAt(0).toUpperCase() + certificate.type.slice(1)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sahayam Crowdfunding Platform
                    </p>
                  </div>
                </div>
                
                {/* Verification Badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-full">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs font-caption text-success">Verified</span>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-body font-body-semibold text-lg text-foreground mb-2">
                    {certificate.campaignName}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="Hash" size={14} />
                      <span>Certificate ID: {certificate.certificateId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={14} />
                      <span>Issued: {certificate.issueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="IndianRupee" size={14} />
                      <span>Amount: ₹{certificate.donationAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Description */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    {certificate.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleDownload(certificate.id)}
                    iconName="Download"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                  >
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(certificate)}
                    iconName="Share2"
                    iconSize={16}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {certificates.length > 0 && (
        <div className="bg-card rounded-card p-6 border border-border">
          <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-4">
            Certificate Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-heading font-heading-bold text-primary mb-1">
                {certificates.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Certificates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-heading-bold text-accent mb-1">
                {certificates.reduce((sum, cert) => sum + cert.donationAmount, 0).toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-muted-foreground">Total Certified Amount</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-heading-bold text-success mb-1">
                {new Date().getFullYear()}
              </div>
              <div className="text-sm text-muted-foreground">Current Year</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationCertificates;