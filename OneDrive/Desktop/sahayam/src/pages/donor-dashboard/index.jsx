import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardStats from './components/DashboardStats';
import DonationHistory from './components/DonationHistory';
import PunyamPoints from './components/PunyamPoints';
import FollowedCampaigns from './components/FollowedCampaigns';
import DonationCertificates from './components/DonationCertificates';
import DonationAnalytics from './components/DonationAnalytics';

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('donations');
  const [user, setUser] = useState(null);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      joinDate: "15/03/2023",
      punyamPoints: 2850,
      totalDonations: 45000,
      donationCount: 12,
      activeCampaigns: 8,
      location: "Mumbai, Maharashtra"
    };
    setUser(mockUser);
  }, []);

  // Mock dashboard stats
  const dashboardStats = {
    totalDonations: 45000,
    donationCount: 12,
    punyamPoints: 2850,
    activeCampaigns: 8
  };

  // Mock donation history
  const donationHistory = [
    {
      id: 1,
      campaignName: "Help Orphanage Children Education",
      campaignImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
      amount: 5000,
      date: "18/07/2025",
      status: "successful",
      category: "Education",
      punyamEarned: 250
    },
    {
      id: 2,
      campaignName: "Emergency Medical Treatment for Accident Victim",
      campaignImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      amount: 10000,
      date: "12/07/2025",
      status: "successful",
      category: "Medical Emergency",
      punyamEarned: 500
    },
    {
      id: 3,
      campaignName: "Support for Blind Children Charity",
      campaignImage: "https://images.unsplash.com/photo-1594213962808-8e4e2e4e5e5e?w=400&h=300&fit=crop",
      amount: 3000,
      date: "08/07/2025",
      status: "pending",
      category: "Disability Support",
      punyamEarned: 150
    },
    {
      id: 4,
      campaignName: "Rural School Infrastructure Development",
      campaignImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop",
      amount: 7500,
      date: "02/07/2025",
      status: "successful",
      category: "Education",
      punyamEarned: 375
    },
    {
      id: 5,
      campaignName: "Cancer Treatment Fund",
      campaignImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      amount: 15000,
      date: "25/06/2025",
      status: "successful",
      category: "Medical Treatment",
      punyamEarned: 750
    }
  ];

  // Mock Punyam Points data
  const punyamPointsData = {
    currentBalance: 2850,
    totalEarned: 3200,
    totalRedeemed: 350,
    history: [
      {
        id: 1,
        type: "earned",
        points: 250,
        description: "Donation to Help Orphanage Children Education",
        date: "18/07/2025"
      },
      {
        id: 2,
        type: "earned",
        points: 500,
        description: "Emergency Medical Treatment donation",
        date: "12/07/2025"
      },
      {
        id: 3,
        type: "redeemed",
        points: 100,
        description: "Downloaded donation certificate",
        date: "10/07/2025"
      },
      {
        id: 4,
        type: "earned",
        points: 375,
        description: "Rural School Infrastructure donation",
        date: "02/07/2025"
      },
      {
        id: 5,
        type: "earned",
        points: 750,
        description: "Cancer Treatment Fund donation",
        date: "25/06/2025"
      }
    ]
  };

  // Mock followed campaigns
  const followedCampaigns = [
    {
      id: 1,
      title: "Help Orphanage Children Get Quality Education",
      description: "Supporting 50 orphaned children with books, uniforms, and educational materials for better future opportunities.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
      raised: 85000,
      goal: 120000,
      progressPercentage: 71,
      location: "Delhi, India",
      urgency: "moderate",
      isVerified: true,
      lastUpdate: "2 days ago",
      recentUpdate: "Received new books and stationery for 25 children. The children are very excited to start their new academic session."
    },
    {
      id: 2,
      title: "Emergency Surgery for 8-Year-Old Heart Patient",
      description: "Urgent heart surgery required for young Priya who cannot afford the expensive medical treatment.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      raised: 180000,
      goal: 250000,
      progressPercentage: 72,
      location: "Chennai, Tamil Nadu",
      urgency: "critical",
      isVerified: true,
      lastUpdate: "1 day ago",
      recentUpdate: "Surgery scheduled for next week. Family is grateful for all the support received so far."
    },
    {
      id: 3,
      title: "Support Blind Children\'s Mobility Training",
      description: "Providing mobility training and assistive devices for visually impaired children to help them navigate independently.",
      image: "https://images.unsplash.com/photo-1594213962808-8e4e2e4e5e5e?w=400&h=300&fit=crop",
      raised: 45000,
      goal: 80000,
      progressPercentage: 56,
      location: "Bangalore, Karnataka",
      urgency: "moderate",
      isVerified: true,
      lastUpdate: "5 days ago",
      recentUpdate: "10 children have successfully completed their basic mobility training program."
    }
  ];

  // Mock certificates
  const certificates = [
    {
      id: 1,
      certificateId: "SAH-2025-001",
      campaignName: "Help Orphanage Children Education",
      type: "donation",
      donationAmount: 5000,
      issueDate: "18/07/2025",
      description: "Certificate of appreciation for your generous donation towards children's education."
    },
    {
      id: 2,
      certificateId: "SAH-2025-002",
      campaignName: "Emergency Medical Treatment",
      type: "donation",
      donationAmount: 10000,
      issueDate: "12/07/2025",
      description: "Certificate recognizing your contribution to emergency medical assistance."
    },
    {
      id: 3,
      certificateId: "SAH-2025-003",
      campaignName: "Achievement Milestone",
      type: "achievement",
      donationAmount: 25000,
      issueDate: "01/07/2025",
      description: "Certificate for reaching the milestone of ₹25,000 in total donations."
    }
  ];

  // Mock analytics data
  const analyticsData = {
    monthlyData: [
      { month: 'Jan', amount: 3000 },
      { month: 'Feb', amount: 4500 },
      { month: 'Mar', amount: 2000 },
      { month: 'Apr', amount: 6000 },
      { month: 'May', amount: 8000 },
      { month: 'Jun', amount: 5500 },
      { month: 'Jul', amount: 16000 }
    ],
    categoryData: [
      { name: 'Education', amount: 15500, percentage: 34 },
      { name: 'Medical Emergency', amount: 25000, percentage: 56 },
      { name: 'Disability Support', amount: 3000, percentage: 7 },
      { name: 'Infrastructure', amount: 1500, percentage: 3 }
    ],
    trendData: [
      { period: 'Q1 2025', amount: 9500 },
      { period: 'Q2 2025', amount: 19500 },
      { period: 'Q3 2025', amount: 16000 }
    ],
    insights: {
      averageMonthly: 6428,
      topCategory: 'Medical Emergency',
      bestMonth: 'July',
      impactScore: 85
    },
    goals: {
      annual: 60000,
      current: 45000
    }
  };

  const tabs = [
    { id: 'donations', label: 'My Donations', icon: 'Heart', count: donationHistory.length },
    { id: 'punyam', label: 'Punyam Points', icon: 'Star', count: punyamPointsData.currentBalance },
    { id: 'campaigns', label: 'Followed Campaigns', icon: 'Users', count: followedCampaigns.length },
    { id: 'certificates', label: 'Certificates', icon: 'Award', count: certificates.length },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3', count: null }
  ];

  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'My Dashboard', path: '/donor-dashboard', icon: 'User', isActive: true }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={null} onLogout={handleLogout} />
        <div className="pt-nav-height">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <Icon name="User" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h2 className="font-heading font-heading-semibold text-xl text-foreground mb-2">
                Please Login
              </h2>
              <p className="text-muted-foreground mb-6">
                You need to login to access your donor dashboard
              </p>
              <Link to="/login-registration">
                <Button variant="default" iconName="LogIn" iconPosition="left">
                  Login Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="pt-nav-height">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>

          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-card p-6 mb-8 border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div>
                  <h1 className="font-heading font-heading-bold text-2xl text-foreground">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-muted-foreground">
                    Member since {user.joinDate} • {user.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/causes-browse">
                  <Button variant="default" iconName="Search" iconPosition="left">
                    Browse Causes
                  </Button>
                </Link>
                <Link to="/emergency-cases">
                  <Button variant="outline" iconName="AlertTriangle" iconPosition="left">
                    Emergency Cases
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats stats={dashboardStats} />

          {/* Tabs Navigation */}
          <div className="bg-card rounded-card border border-border mb-8">
            <div className="border-b border-border">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-body font-body-medium whitespace-nowrap transition-gentle ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                        activeTab === tab.id
                          ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
                      }`}>
                        {typeof tab.count === 'number' && tab.count > 999 
                          ? `${Math.floor(tab.count / 1000)}k+` 
                          : tab.count
                        }
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'donations' && (
                <DonationHistory donations={donationHistory} />
              )}
              
              {activeTab === 'punyam' && (
                <PunyamPoints pointsData={punyamPointsData} />
              )}
              
              {activeTab === 'campaigns' && (
                <FollowedCampaigns campaigns={followedCampaigns} />
              )}
              
              {activeTab === 'certificates' && (
                <DonationCertificates certificates={certificates} />
              )}
              
              {activeTab === 'analytics' && (
                <DonationAnalytics analyticsData={analyticsData} />
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-card p-6 border border-border">
            <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/causes-browse">
                <Button variant="outline" fullWidth iconName="Search" iconPosition="left">
                  Find New Causes
                </Button>
              </Link>
              <Link to="/emergency-cases">
                <Button variant="outline" fullWidth iconName="AlertTriangle" iconPosition="left">
                  Emergency Help
                </Button>
              </Link>
              <Button 
                variant="outline" 
                fullWidth 
                iconName="Share2" 
                iconPosition="left"
                onClick={() => console.log('Share dashboard')}
              >
                Share Impact
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                iconName="Settings" 
                iconPosition="left"
                onClick={() => console.log('Open settings')}
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;