import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DonationPanel = ({ campaign, onDonate }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000];

  const calculatePunyamPoints = (amount) => {
    return Math.floor(amount / 100);
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

  const getCurrentAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const handleDonate = async () => {
    const amount = getCurrentAmount();
    if (amount < 100) return;

    setIsProcessing(true);
    try {
      await onDonate(amount);
    } finally {
      setIsProcessing(false);
    }
  };

  const currentAmount = getCurrentAmount();
  const punyamPoints = calculatePunyamPoints(currentAmount);

  return (
    <div className="bg-card rounded-card p-6 shadow-soft sticky top-24">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="font-heading font-heading-semibold text-xl text-foreground mb-2">
            Make a Donation
          </h3>
          <p className="font-body text-muted-foreground">
            Help {campaign.beneficiary} reach their goal
          </p>
        </div>

        {/* Preset Amounts */}
        <div>
          <label className="font-body font-body-medium text-foreground mb-3 block">
            Choose Amount
          </label>
          <div className="grid grid-cols-2 gap-3">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`p-3 rounded-button border-2 transition-gentle font-body font-body-medium ${
                  selectedAmount === amount
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                ₹{amount.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <Input
            label="Custom Amount"
            type="text"
            placeholder="Enter amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            description="Minimum donation: ₹100"
          />
        </div>

        {/* Punyam Points Preview */}
        {currentAmount >= 100 && (
          <div className="bg-accent/10 rounded-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} color="var(--color-accent)" />
                <span className="font-body font-body-medium text-accent">You'll earn</span>
              </div>
              <span className="font-data font-data-medium text-accent">
                {punyamPoints} Punyam Points
              </span>
            </div>
          </div>
        )}

        {/* Donation Button */}
        <Button
          variant="default"
          size="lg"
          fullWidth
          disabled={currentAmount < 100}
          loading={isProcessing}
          onClick={handleDonate}
          iconName="Heart"
          iconPosition="left"
        >
          {isProcessing ? 'Processing...' : `Donate ₹${currentAmount.toLocaleString('en-IN')}`}
        </Button>

        {/* Payment Methods */}
        <div className="pt-4 border-t border-border">
          <p className="font-caption text-muted-foreground text-center mb-3">
            Secure payment powered by
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="font-caption text-success">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CreditCard" size={16} className="text-muted-foreground" />
              <span className="font-caption text-muted-foreground">All Cards</span>
            </div>
          </div>
        </div>

        {/* Share Campaign */}
        <div className="pt-4 border-t border-border">
          <p className="font-body font-body-medium text-foreground mb-3 text-center">
            Share this campaign
          </p>
          <div className="flex items-center justify-center space-x-3">
            <button className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-gentle">
              <Icon name="Facebook" size={18} />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-gentle">
              <Icon name="Twitter" size={18} />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-gentle">
              <Icon name="MessageCircle" size={18} />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-muted text-muted-foreground rounded-full hover:bg-muted-foreground hover:text-background transition-gentle">
              <Icon name="Share2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPanel;