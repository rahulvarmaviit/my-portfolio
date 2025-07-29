import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickDonationModal = ({ emergency, isOpen, onClose, onDonate }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [500, 1000, 2000, 5000];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const handleDonate = async () => {
    const amount = getFinalAmount();
    if (amount < 100) return;

    setIsProcessing(true);
    
    // Simulate donation processing
    setTimeout(() => {
      onDonate({
        emergencyId: emergency.id,
        amount,
        donorName: isAnonymous ? 'Anonymous' : donorName,
        donorEmail,
        isAnonymous
      });
      setIsProcessing(false);
      onClose();
      
      // Reset form
      setSelectedAmount(null);
      setCustomAmount('');
      setDonorName('');
      setDonorEmail('');
      setIsAnonymous(false);
    }, 2000);
  };

  if (!isOpen || !emergency) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-soft-hover max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-heading-semibold text-xl text-foreground">
            Quick Donation
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-gentle"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Emergency Info */}
        <div className="p-6 border-b border-border">
          <div className="flex space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={emergency.image}
                alt={emergency.patientName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-heading-medium text-lg text-foreground mb-1">
                {emergency.patientName}
              </h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {emergency.condition}
              </p>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="MapPin" size={12} />
                <span>{emergency.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="p-6 space-y-6">
          {/* Quick Amount Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Select Amount
            </label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`p-3 rounded-lg border-2 transition-gentle ${
                    selectedAmount === amount
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  <span className="font-data font-data-medium">
                    {formatAmount(amount)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <Input
              label="Or enter custom amount"
              type="text"
              placeholder="Enter amount in ₹"
              value={customAmount}
              onChange={handleCustomAmountChange}
              description="Minimum donation amount is ₹100"
            />
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="anonymous" className="text-sm text-foreground">
                Donate anonymously
              </label>
            </div>

            {!isAnonymous && (
              <>
                <Input
                  label="Your Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  description="For donation receipt and updates"
                  required
                />
              </>
            )}
          </div>

          {/* Donation Summary */}
          {getFinalAmount() >= 100 && (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Donation Amount:</span>
                <span className="font-data font-data-medium text-lg text-foreground">
                  {formatAmount(getFinalAmount())}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Punyam Points:</span>
                <span className="text-sm font-medium text-accent">
                  +{Math.floor(getFinalAmount() / 100)} points
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            
            <Button
              variant="default"
              fullWidth
              onClick={handleDonate}
              disabled={getFinalAmount() < 100 || isProcessing || (!isAnonymous && (!donorName || !donorEmail))}
              loading={isProcessing}
              iconName="Heart"
              iconPosition="left"
            >
              {isProcessing ? 'Processing...' : `Donate ${formatAmount(getFinalAmount())}`}
            </Button>
          </div>

          {/* Security Note */}
          <div className="flex items-start space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} className="mt-0.5 flex-shrink-0" />
            <p>
              Your donation is secure and will be processed through encrypted payment gateway. 
              You will receive a donation receipt via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickDonationModal;