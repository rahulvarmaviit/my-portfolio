import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

import EmergencyCard from './components/EmergencyCard';
import FilterSidebar from './components/FilterSidebar';
import QuickDonationModal from './components/QuickDonationModal';
import EmergencyStats from './components/EmergencyStats';
import FeaturedEmergency from './components/FeaturedEmergency';

const EmergencyCases = () => {
  const { user, signOut } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('urgency');

  // Mock emergency cases data
  const emergencyCases = [
    {
      id: 'em001',
      patientName: 'Arjun Patel',
      condition: 'Urgent Heart Surgery Required',
      description: `8-year-old Arjun needs immediate heart surgery to repair a congenital defect. His family cannot afford the ₹8,00,000 required for the operation. Without this surgery, Arjun's condition will deteriorate rapidly.\n\nThe surgery has been scheduled at Fortis Hospital, Mumbai, and the medical team is ready to proceed once funding is secured.`,image: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400',location: 'Mumbai, Maharashtra',hospital: 'Fortis Hospital',
      goal: 800000,
      raised: 450000,
      donorCount: 89,
      priority: 'Critical',deadline: '2025-08-05',
      verified: true,
      category: 'heart'
    },
    {
      id: 'em002',patientName: 'Meera Sharma',condition: 'Cancer Treatment Support',
      description: `45-year-old Meera is battling breast cancer and needs immediate chemotherapy treatment. The family has exhausted their savings and urgently needs financial support for continued treatment.`,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',location: 'Delhi, NCR',hospital: 'AIIMS Delhi',
      goal: 500000,
      raised: 180000,
      donorCount: 45,
      priority: 'Urgent',deadline: '2025-08-15',
      verified: true,
      category: 'cancer'
    },
    {
      id: 'em003',patientName: 'Ravi Kumar',condition: 'Accident Recovery Surgery',
      description: `25-year-old Ravi met with a severe road accident and needs multiple surgeries for complete recovery. His family is struggling to arrange funds for the medical expenses.`,
      image: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400',location: 'Bangalore, Karnataka',hospital: 'Manipal Hospital',
      goal: 600000,
      raised: 320000,
      donorCount: 67,
      priority: 'Urgent',deadline: '2025-08-20',
      verified: true,
      category: 'accident'
    },
    {
      id: 'em004',patientName: 'Anita Devi',condition: 'Kidney Transplant Required',
      description: `52-year-old Anita needs an urgent kidney transplant. A matching donor has been found, but the family cannot afford the transplant costs.`,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',location: 'Chennai, Tamil Nadu',hospital: 'Apollo Hospital',
      goal: 1200000,
      raised: 280000,
      donorCount: 34,
      priority: 'Critical',deadline: '2025-08-10',
      verified: true,
      category: 'kidney'
    },
    {
      id: 'em005',patientName: 'Vikram Singh',condition: 'Brain Tumor Surgery',description: `35-year-old Vikram has been diagnosed with a brain tumor that requires immediate surgical intervention. The surgery is complex and expensive.`,image: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400',location: 'Hyderabad, Telangana',hospital: 'Yashoda Hospital',
      goal: 900000,
      raised: 150000,
      donorCount: 28,
      priority: 'Critical',deadline: '2025-08-08',
      verified: true,
      category: 'brain'
    },
    {
      id: 'em006',patientName: 'Sunita Yadav',condition: 'Emergency Dialysis Treatment',
      description: `38-year-old Sunita needs regular dialysis treatment but cannot afford the ongoing costs. Her condition is deteriorating without proper treatment.`,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',location: 'Pune, Maharashtra',hospital: 'Ruby Hall Clinic',
      goal: 300000,
      raised: 95000,
      donorCount: 22,
      priority: 'Moderate',deadline: '2025-09-01',
      verified: true,
      category: 'kidney'
    }
  ];

  // Mock statistics
  const stats = {
    activeCases: 156,
    totalRaised: 45600000,
    totalDonors: 8934,
    completedCases: 89
  };

  // Featured emergency (most critical)
  const featuredEmergency = emergencyCases.find(e => e.priority === 'Critical') || emergencyCases[0];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleDonate = (emergency) => {
    setSelectedEmergency(emergency);
    setIsDonationModalOpen(true);
  };

  const handleDonationComplete = (donationData) => {
    console.log('Donation completed:', donationData);
    // Here you would typically update the emergency case data
    // and show a success message
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const filteredCases = emergencyCases.filter(emergency => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!emergency.patientName.toLowerCase().includes(query) &&
          !emergency.condition.toLowerCase().includes(query) &&
          !emergency.location.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(emergency.category)) {
        return false;
      }
    }

    // Urgency filter
    if (filters.urgency) {
      if (emergency.priority.toLowerCase() !== filters.urgency) {
        return false;
      }
    }

    // Location filter
    if (filters.location) {
      if (!emergency.location.toLowerCase().includes(filters.location)) {
        return false;
      }
    }

    // Verification filter
    if (filters.verifiedOnly && !emergency.verified) {
      return false;
    }

    // Days left filter
    if (filters.daysLeft) {
      const today = new Date();
      const deadline = new Date(emergency.deadline);
      const diffTime = deadline - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (filters.daysLeft === '7' && diffDays > 7) {
        return false;
      }
      if (filters.daysLeft === '30' && diffDays > 30) {
        return false;
      }
    }

    return true;
  });

  // Sort cases
  const sortedCases = [...filteredCases].sort((a, b) => {
    switch (sortBy) {
      case 'urgency':
        const priorityOrder = { 'Critical': 3, 'Urgent': 2, 'Moderate': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      case 'amount':
        return b.goal - a.goal;
      case 'progress':
        return (b.raised / b.goal) - (a.raised / a.goal);
      default:
        return 0;
    }
  });

  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Emergency Cases', path: '/emergency-cases', icon: 'AlertTriangle', isActive: true }
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

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
                <Icon name="AlertTriangle" size={24} className="text-red-600" />
              </div>
              <div>
                <h1 className="font-heading font-heading-bold text-3xl text-foreground">
                  Emergency Medical Cases
                </h1>
                <p className="text-muted-foreground mt-1">
                  Urgent medical cases requiring immediate financial support
                </p>
              </div>
            </div>

            {/* Alert Banner */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-800 mb-1">
                    Critical Cases Need Immediate Attention
                  </h3>
                  <p className="text-sm text-red-700">
                    {emergencyCases.filter(e => e.priority === 'Critical').length} critical cases are running out of time. 
                    Your donation can save lives today.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Emergency */}
          <FeaturedEmergency 
            emergency={featuredEmergency}
            onDonate={handleDonate}
          />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
              
              {/* Stats - Desktop Only */}
              <div className="hidden lg:block mt-6">
                <EmergencyStats stats={stats} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Controls */}
              <div className="bg-white rounded-lg shadow-soft border border-border p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Icon 
                        name="Search" 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                      />
                      <input
                        type="text"
                        placeholder="Search by patient name, condition, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="flex items-center space-x-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="urgency">Sort by Urgency</option>
                      <option value="deadline">Sort by Deadline</option>
                      <option value="amount">Sort by Amount</option>
                      <option value="progress">Sort by Progress</option>
                    </select>

                    {/* Mobile Filter Button */}
                    <Button
                      variant="outline"
                      onClick={() => setIsFilterOpen(true)}
                      iconName="Filter"
                      className="lg:hidden"
                    >
                      Filters
                    </Button>
                  </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {sortedCases.length} of {emergencyCases.length} emergency cases
                  </p>
                  
                  {Object.keys(filters).length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      iconName="X"
                      iconPosition="left"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Emergency Cases Grid */}
              {sortedCases.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedCases.map((emergency) => (
                    <EmergencyCard
                      key={emergency.id}
                      emergency={emergency}
                      onDonate={handleDonate}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-soft border border-border p-12 text-center">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
                    No Emergency Cases Found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search criteria or filters to find more cases.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Load More - Pagination could be added here */}
              {sortedCases.length > 0 && (
                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg">
                    Load More Cases
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="lg:hidden mt-8">
            <EmergencyStats stats={stats} />
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-center text-white">
            <h2 className="font-heading font-heading-bold text-2xl mb-4">
              Every Second Counts in Emergency Cases
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Your donation can be the difference between life and death. Join thousands of donors 
              who are making a real impact in emergency medical situations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/causes-browse">
                <Button variant="secondary" size="lg">
                  Browse All Causes
                </Button>
              </Link>
              <Link to="/donor-dashboard">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                  View My Donations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Donation Modal */}
      <QuickDonationModal
        emergency={selectedEmergency}
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onDonate={handleDonationComplete}
      />
    </div>
  );
};

export default EmergencyCases;