import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PunyamPoints = ({ pointsData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const achievementLevels = [
    { level: 'Bronze Donor', minPoints: 0, maxPoints: 999, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { level: 'Silver Donor', minPoints: 1000, maxPoints: 4999, color: 'text-gray-600', bgColor: 'bg-gray-50' },
    { level: 'Gold Donor', minPoints: 5000, maxPoints: 9999, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { level: 'Platinum Donor', minPoints: 10000, maxPoints: 24999, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { level: 'Diamond Donor', minPoints: 25000, maxPoints: Infinity, color: 'text-blue-600', bgColor: 'bg-blue-50' }
  ];

  const getCurrentLevel = () => {
    return achievementLevels.find(level => 
      pointsData.currentBalance >= level.minPoints && pointsData.currentBalance <= level.maxPoints
    ) || achievementLevels[0];
  };

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const currentIndex = achievementLevels.indexOf(currentLevel);
    return currentIndex < achievementLevels.length - 1 ? achievementLevels[currentIndex + 1] : null;
  };

  const getProgressPercentage = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    
    if (!nextLevel) return 100;
    
    const progress = ((pointsData.currentBalance - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100;
    return Math.min(progress, 100);
  };

  const filteredHistory = pointsData.history.filter(entry => {
    if (selectedPeriod === 'all') return true;
    const entryDate = new Date(entry.date);
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'week':
        return entryDate >= new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return entryDate >= new Date(now.setMonth(now.getMonth() - 1));
      case 'year':
        return entryDate >= new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return true;
    }
  });

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progressPercentage = getProgressPercentage();

  return (
    <div className="space-y-6">
      {/* Current Points & Level */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-card p-6 border border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="text-center lg:text-left">
            <div className="text-4xl font-heading font-heading-bold text-accent mb-2">
              {pointsData.currentBalance.toLocaleString('en-IN')}
            </div>
            <div className="text-lg font-body font-body-medium text-foreground mb-1">
              Punyam Points
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-caption ${currentLevel.bgColor} ${currentLevel.color}`}>
              <Icon name="Award" size={16} />
              {currentLevel.level}
            </div>
          </div>

          {nextLevel && (
            <div className="flex-1 max-w-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress to {nextLevel.level}</span>
                <span className="text-sm font-data text-foreground">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-accent to-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {(nextLevel.minPoints - pointsData.currentBalance).toLocaleString('en-IN')} points to next level
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Achievement Levels */}
      <div className="bg-card rounded-card p-6 border border-border">
        <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-4">
          Achievement Levels
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {achievementLevels.map((level, index) => {
            const isUnlocked = pointsData.currentBalance >= level.minPoints;
            const isCurrent = level === currentLevel;
            
            return (
              <div
                key={level.level}
                className={`p-4 rounded-lg border-2 transition-gentle ${
                  isCurrent 
                    ? 'border-accent bg-accent/5' 
                    : isUnlocked 
                      ? 'border-success bg-success/5' :'border-border bg-muted/30'
                }`}
              >
                <div className="text-center">
                  <Icon 
                    name={isUnlocked ? "Award" : "Lock"} 
                    size={24} 
                    className={`mx-auto mb-2 ${
                      isCurrent ? 'text-accent' : isUnlocked ? 'text-success' : 'text-muted-foreground'
                    }`} 
                  />
                  <div className={`text-sm font-body font-body-medium mb-1 ${
                    isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {level.level}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {level.minPoints.toLocaleString('en-IN')}+ points
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Points History */}
      <div className="bg-card rounded-card p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="font-heading font-heading-semibold text-lg text-foreground">
            Points History
          </h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-border rounded-button bg-input focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Star" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No points history found for selected period</p>
            </div>
          ) : (
            filteredHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    entry.type === 'earned' ? 'bg-success/10' : 'bg-error/10'
                  }`}>
                    <Icon 
                      name={entry.type === 'earned' ? 'Plus' : 'Minus'} 
                      size={16} 
                      className={entry.type === 'earned' ? 'text-success' : 'text-error'} 
                    />
                  </div>
                  <div>
                    <div className="font-body font-body-medium text-foreground">
                      {entry.description}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {entry.date}
                    </div>
                  </div>
                </div>
                <div className={`font-data font-data-medium text-lg ${
                  entry.type === 'earned' ? 'text-success' : 'text-error'
                }`}>
                  {entry.type === 'earned' ? '+' : '-'}{entry.points}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Redemption Options */}
      <div className="bg-card rounded-card p-6 border border-border">
        <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-4">
          Redeem Points
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Gift" size={24} className="text-primary" />
              <div>
                <div className="font-body font-body-medium text-foreground">Certificate</div>
                <div className="text-sm text-muted-foreground">1,000 points</div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={pointsData.currentBalance < 1000}
              fullWidth
            >
              Redeem
            </Button>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Trophy" size={24} className="text-primary" />
              <div>
                <div className="font-body font-body-medium text-foreground">Badge</div>
                <div className="text-sm text-muted-foreground">2,500 points</div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={pointsData.currentBalance < 2500}
              fullWidth
            >
              Redeem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunyamPoints;