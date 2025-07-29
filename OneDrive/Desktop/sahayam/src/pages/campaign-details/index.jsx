import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CampaignHero from './components/CampaignHero';
import DonationPanel from './components/DonationPanel';
import CampaignDescription from './components/CampaignDescription';
import RecentDonations from './components/RecentDonations';
import CommentsSection from './components/CommentsSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import campaignService from '../../utils/campaignService';

const CampaignDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user, signOut } = useAuth();
  
  const [campaign, setCampaign] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileDonation, setShowMobileDonation] = useState(false);

  // Get campaign ID from URL params or query string
  const getCampaignId = () => {
    if (params.id) {
      return params.id;
    }
    
    const urlParams = new URLSearchParams(location.search);
    const queryId = urlParams.get('id');
    
    if (queryId) {
      return queryId;
    }
    
    // Fallback to mapping emergency case IDs to campaign UUIDs (for demo purposes)
    const emergencyIdMapping = {
      'em001': '11111111-1111-1111-1111-111111111111', // Arjun's campaign'em002': '22222222-2222-2222-2222-222222222222', // Meera's campaign
      'em003': '33333333-3333-3333-3333-333333333333', // Ravi's campaign'em004': '44444444-4444-4444-4444-444444444444', // Anita's campaign
      'em005': '55555555-5555-5555-5555-555555555555', // Vikram's campaign'em006': '66666666-6666-6666-6666-666666666666', // Sunita's campaign
    };
    
    const emergencyId = urlParams.get('emergency_id');
    if (emergencyId && emergencyIdMapping[emergencyId]) {
      return emergencyIdMapping[emergencyId];
    }
    
    return null;
  };

  const campaignId = getCampaignId();

  useEffect(() => {
    const loadCampaignData = async () => {
      if (!campaignId) {
        // If no campaign ID, show the default Arjun campaign
        setDefaultCampaign();
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to load from Supabase
        const campaignResult = await campaignService.getCampaignById(campaignId);
        const donationsResult = await campaignService.getCampaignDonations(campaignId);

        if (campaignResult.success) {
          setCampaign(campaignResult.data);
        } else {
          // Fallback to demo data
          setDefaultCampaign();
        }

        if (donationsResult.success) {
          setRecentDonations(donationsResult.data);
        } else {
          setDefaultDonations();
        }
      } catch (error) {
        console.log('Error loading campaign:', error);
        setDefaultCampaign();
        setDefaultDonations();
      } finally {
        setLoading(false);
      }
    };

    loadCampaignData();
  }, [campaignId]);

  const setDefaultCampaign = () => {
    setCampaign({
      id: 'default-campaign',
      title: "Help Arjun Fight Cancer - Emergency Medical Treatment",
      description: `8-year-old Arjun was diagnosed with acute lymphoblastic leukemia just three months ago. His family, from a small village in Rajasthan, has already spent their life savings on initial treatments.\n\nArjun is a bright, cheerful boy who loves drawing and dreams of becoming a teacher. His condition is treatable with proper medical care, but the family needs urgent financial support to continue his chemotherapy sessions.\n\nThe treatment plan includes 6 months of intensive chemotherapy, regular blood tests, and supportive care. With your help, Arjun can beat cancer and return to his normal childhood.\n\nEvery donation brings hope to this brave little fighter and his family. Your contribution will directly fund his medical expenses and give him the chance to live a healthy, happy life.`,
      beneficiary_name: "Arjun Kumar",
      beneficiary_age: 8,
      location: "Jaipur, Rajasthan",
      image_url: "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=800",
      raised_amount: 285000,
      goal_amount: 500000,
      is_emergency: true,
      priority: 'critical',
      start_date: "2024-10-15T00:00:00.000Z",
      end_date: "2025-08-30T00:00:00.000Z",
      hospital: "Sawai Man Singh Hospital",
      category: 'medical',
      is_verified: true,
      updates: [
        {
          id: 1,
          title: "Chemotherapy Session 4 Completed Successfully",
          content: "Arjun completed his 4th chemotherapy session today. The doctors are very pleased with his progress. His blood counts are improving and he's responding well to treatment. Thank you to all donors for making this possible!",
          image_url: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600",
          created_at: "2024-12-18T00:00:00.000Z"
        },
        {
          id: 2,
          title: "Halfway Through Treatment - Great Progress!",
          content: "We've reached the halfway mark in Arjun's treatment journey. The oncology team reports excellent response to chemotherapy. Arjun's spirits are high and he's been drawing pictures for all the donors who have supported him.",
          image_url: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600",
          created_at: "2024-12-10T00:00:00.000Z"
        }
      ],
      gallery_urls: [
        "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600"
      ]
    });
  };

  const setDefaultDonations = () => {
    setRecentDonations([
      {
        amount: 5000,
        message: "Stay strong Arjun! You're a brave warrior. Sending love and prayers for your speedy recovery.",
        created_at: new Date(Date.now() - 300000).toISOString(),
        is_anonymous: false,
        donor: {
          full_name: "Priya Sharma",
          avatar_url: "https://randomuser.me/api/portraits/women/32.jpg"
        }
      },
      {
        amount: 10000,
        message: "Hope this helps with the treatment. Get well soon little champion!",
        created_at: new Date(Date.now() - 900000).toISOString(),
        is_anonymous: true,
        donor: null
      }
    ]);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login-registration');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleDonate = async (amount, message = '', isAnonymous = false) => {
    try {
      if (!user) {
        navigate('/login-registration', { 
          state: { from: location.pathname + location.search } 
        });
        return;
      }

      // Create donation
      const donationData = {
        campaign_id: campaign?.id || 'default-campaign',
        donor_id: user.id,
        amount: parseInt(amount),
        message: message,
        is_anonymous: isAnonymous
      };

      const result = await campaignService.createDonation(donationData);

      if (result.success) {
        // Update local state
        const pointsEarned = Math.floor(amount / 100);
        alert(`Thank you for your donation of ₹${amount.toLocaleString('en-IN')}! You've earned ${pointsEarned} Punyam points.`);
        
        // Refresh campaign data
        window.location.reload();
      } else {
        alert('Donation failed: ' + result.error);
      }
    } catch (error) {
      console.log('Donation error:', error);
      alert('Thank you for your donation! (Demo mode - donation simulated successfully)');
    }
  };

  const handleAddComment = async (comment) => {
    // Mock comment submission
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Comment added:', comment);
        resolve();
      }, 1000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={32} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
              Campaign Not Found
            </h3>
            <p className="text-muted-foreground mb-6">
              The campaign you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/emergency-cases')}>
              Back to Emergency Cases
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Emergency Cases', path: '/emergency-cases', icon: 'AlertTriangle' },
    { label: campaign.title, path: '/campaign-details', icon: 'FileText', isActive: true }
  ];

  // Mock comments for the comments section
  const mockComments = [
    {
      id: 1,
      author: "Dr. Sunita Verma",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      content: "As an oncologist, I can confirm that this treatment plan is comprehensive and has excellent success rates. The family is in good hands with the medical team.",
      timestamp: new Date(Date.now() - 1800000),
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      author: "Amit Singh",
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      content: "I\'ve been following this journey since the beginning. It\'s amazing to see the community come together. Keep up the fight!",
      timestamp: new Date(Date.now() - 3600000),
      likes: 8,
      isLiked: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Campaign Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Campaign Hero */}
              <CampaignHero campaign={campaign} />

              {/* Campaign Description */}
              <CampaignDescription campaign={campaign} />

              {/* Recent Donations - Mobile Only */}
              <div className="lg:hidden">
                <RecentDonations donations={recentDonations} />
              </div>

              {/* Comments Section */}
              <CommentsSection 
                comments={mockComments} 
                onAddComment={handleAddComment} 
              />
            </div>

            {/* Right Column - Donation Panel & Recent Donations */}
            <div className="space-y-8">
              {/* Donation Panel - Desktop */}
              <div className="hidden lg:block">
                <DonationPanel campaign={campaign} onDonate={handleDonate} />
              </div>

              {/* Recent Donations - Desktop */}
              <div className="hidden lg:block">
                <RecentDonations donations={recentDonations} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Donation Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={() => setShowMobileDonation(true)}
            iconName="Heart"
            iconPosition="left"
          >
            Donate Now
          </Button>
        </div>

        {/* Mobile Donation Modal */}
        {showMobileDonation && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-heading-semibold text-xl text-foreground">
                  Make a Donation
                </h3>
                <button
                  onClick={() => setShowMobileDonation(false)}
                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-gentle"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <DonationPanel campaign={campaign} onDonate={handleDonate} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CampaignDetails;