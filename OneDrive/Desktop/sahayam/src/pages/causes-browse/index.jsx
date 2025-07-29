import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterChips from './components/FilterChips';
import SearchBar from './components/SearchBar';
import CauseCard from './components/CauseCard';
import SortDropdown from './components/SortDropdown';
import FilterSidebar from './components/FilterSidebar';
import QuickStats from './components/QuickStats';
import LoadingSkeleton from './components/LoadingSkeleton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CausesBrowse = () => {
  const [user] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    punyamPoints: 2450
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCauses, setDisplayedCauses] = useState(12);

  const [filters, setFilters] = useState({
    location: 'all',
    goalRange: 'all',
    duration: 'all',
    verifiedOnly: false,
    featuredOnly: false,
    progressRanges: []
  });

  const categories = [
    { id: 'all', label: 'All Causes' },
    { id: 'orphanages', label: 'Orphanages' },
    { id: 'education', label: 'Education' },
    { id: 'blind-support', label: 'Blind Support' },
    { id: 'medical', label: 'Medical Aid' },
    { id: 'elderly', label: 'Elderly Care' }
  ];

  const mockCauses = [
    {
      id: 1,
      title: "Help Build New Classrooms for Rural Children",
      description: "Support the construction of modern classrooms for underprivileged children in rural Maharashtra. Your donation will provide better learning environment for 200+ students.",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg",
      category: "Education",
      location: "Pune, Maharashtra",
      raised: 285000,
      goal: 500000,
      daysLeft: 45,
      isVerified: true,
      isFeatured: true,
      createdAt: new Date('2024-06-15')
    },
    {
      id: 2,
      title: "Provide Meals for Orphaned Children",
      description: "Help us provide nutritious meals for 50 orphaned children at Bal Ashram. Every donation ensures these children get proper nutrition for healthy growth.",
      image: "https://images.pixabay.com/photo/2016/11/14/04/36/boy-1822565_1280.jpg",
      category: "Orphanages",
      location: "Delhi",
      raised: 125000,
      goal: 200000,
      daysLeft: 23,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-06-20')
    },
    {
      id: 3,
      title: "Braille Books for Visually Impaired Students",
      description: "Support our mission to provide Braille textbooks and learning materials for visually impaired students across India. Education should be accessible to all.",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a",
      category: "Blind Support",
      location: "Bangalore, Karnataka",
      raised: 95000,
      goal: 150000,
      daysLeft: 67,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-05-30')
    },
    {
      id: 4,
      title: "Emergency Medical Fund for Heart Surgery",
      description: "8-year-old Priya needs urgent heart surgery. Her family cannot afford the ₹3,50,000 required for the operation. Your support can save her life.",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg",
      category: "Medical Aid",
      location: "Chennai, Tamil Nadu",
      raised: 180000,
      goal: 350000,
      daysLeft: 12,
      isVerified: true,
      isFeatured: true,
      createdAt: new Date('2024-07-01')
    },
    {
      id: 5,
      title: "Computer Lab for Underprivileged School",
      description: "Help establish a computer lab with 20 computers for students from low-income families. Digital literacy is essential for their future success.",
      image: "https://images.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg",
      category: "Education",
      location: "Mumbai, Maharashtra",
      raised: 320000,
      goal: 400000,
      daysLeft: 38,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-06-10')
    },
    {
      id: 6,
      title: "Shelter Home for Abandoned Elderly",
      description: "Support our shelter home that provides care, medical attention, and dignity to abandoned elderly citizens. Currently housing 30 senior citizens.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
      category: "Elderly Care",
      location: "Kolkata, West Bengal",
      raised: 75000,
      goal: 250000,
      daysLeft: 89,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-05-15')
    },
    {
      id: 7,
      title: "Vocational Training for Orphan Youth",
      description: "Provide skill development and vocational training for orphan youth aged 16-21. Help them become self-reliant and build successful careers.",
      image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg",
      category: "Orphanages",
      location: "Hyderabad, Telangana",
      raised: 145000,
      goal: 300000,
      daysLeft: 56,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-06-05')
    },
    {
      id: 8,
      title: "Guide Dogs Training Program",
      description: "Support our guide dog training program that helps visually impaired individuals gain independence and mobility through specially trained companion dogs.",
      image: "https://images.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
      category: "Blind Support",
      location: "Ahmedabad, Gujarat",
      raised: 85000,
      goal: 180000,
      daysLeft: 72,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-05-20')
    },
    {
      id: 9,
      title: "Cancer Treatment for Young Mother",
      description: "Help Sunita, a 32-year-old mother of two, fight breast cancer. She needs immediate chemotherapy treatment but cannot afford the medical expenses.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063",
      category: "Medical Aid",
      location: "Jaipur, Rajasthan",
      raised: 220000,
      goal: 450000,
      daysLeft: 18,
      isVerified: true,
      isFeatured: true,
      createdAt: new Date('2024-07-05')
    },
    {
      id: 10,
      title: "School Uniforms and Books for Tribal Children",
      description: "Provide school uniforms, books, and stationery for 100 tribal children in remote areas of Odisha. Education is their pathway to a better future.",
      image: "https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg",
      category: "Education",
      location: "Bhubaneswar, Odisha",
      raised: 65000,
      goal: 120000,
      daysLeft: 41,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-06-25')
    },
    {
      id: 11,
      title: "Physiotherapy Equipment for Disabled Children",
      description: "Help us purchase modern physiotherapy equipment for children with disabilities. This equipment will help improve their mobility and quality of life.",
      image: "https://images.pixabay.com/photo/2017/05/26/22/39/child-2346486_1280.jpg",
      category: "Medical Aid",
      location: "Lucknow, Uttar Pradesh",
      raised: 110000,
      goal: 200000,
      daysLeft: 63,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-05-28')
    },
    {
      id: 12,
      title: "Winter Clothing for Homeless Elderly",
      description: "Provide warm winter clothing, blankets, and shelter for homeless elderly people during the harsh winter months in North India.",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a",
      category: "Elderly Care",
      location: "New Delhi",
      raised: 45000,
      goal: 100000,
      daysLeft: 95,
      isVerified: true,
      isFeatured: false,
      createdAt: new Date('2024-05-10')
    }
  ];

  const filteredAndSortedCauses = useMemo(() => {
    let filtered = mockCauses.filter(cause => {
      // Category filter
      if (activeCategory !== 'all') {
        const categoryMap = {
          'orphanages': 'Orphanages',
          'education': 'Education',
          'blind-support': 'Blind Support',
          'medical': 'Medical Aid',
          'elderly': 'Elderly Care'
        };
        if (cause.category !== categoryMap[activeCategory]) return false;
      }

      // Search term filter
      if (searchTerm && !cause.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !cause.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Location filter
      if (locationFilter && !cause.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }

      // Advanced filters
      if (filters.location !== 'all' && !cause.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      if (filters.verifiedOnly && !cause.isVerified) return false;
      if (filters.featuredOnly && !cause.isFeatured) return false;

      // Goal range filter
      if (filters.goalRange !== 'all') {
        const [min, max] = filters.goalRange.split('-').map(v => v === '+' ? Infinity : parseInt(v));
        if (max && (cause.goal < min || cause.goal > max)) return false;
        if (!max && cause.goal < min) return false;
      }

      // Duration filter
      if (filters.duration !== 'all') {
        const [min, max] = filters.duration.split('-').map(v => v === '+' ? Infinity : parseInt(v));
        if (max && (cause.daysLeft < min || cause.daysLeft > max)) return false;
        if (!max && cause.daysLeft < min) return false;
      }

      // Progress range filter
      if (filters.progressRanges.length > 0) {
        const progress = (cause.raised / cause.goal) * 100;
        const matchesRange = filters.progressRanges.some(range => {
          const [min, max] = range.split('-').map(Number);
          return progress >= min && progress <= max;
        });
        if (!matchesRange) return false;
      }

      return true;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'most-funded':
          return b.raised - a.raised;
        case 'ending-soon':
          return a.daysLeft - b.daysLeft;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'goal-low-high':
          return a.goal - b.goal;
        case 'goal-high-low':
          return b.goal - a.goal;
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockCauses, activeCategory, searchTerm, locationFilter, filters, sortBy]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCauses(prev => prev + 6);
      setIsLoading(false);
    }, 1000);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setActiveCategory('all');
    setSortBy('newest');
    setFilters({
      location: 'all',
      goalRange: 'all',
      duration: 'all',
      verifiedOnly: false,
      featuredOnly: false,
      progressRanges: []
    });
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const totalStats = {
    totalCauses: mockCauses.length,
    totalFundsRaised: mockCauses.reduce((sum, cause) => sum + cause.raised, 0),
    activeDonors: 15420
  };

  const causesToShow = filteredAndSortedCauses.slice(0, displayedCauses);
  const hasMoreCauses = displayedCauses < filteredAndSortedCauses.length;

  return (
    <>
      <Helmet>
        <title>Browse Causes - Sahayam Crowdfunding Platform</title>
        <meta name="description" content="Discover and support verified charitable causes across India. Help orphanages, education, medical emergencies, and more through transparent donations." />
        <meta name="keywords" content="charity, donation, crowdfunding, causes, orphanages, education, medical aid, India" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="pt-nav-height">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb />
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="font-heading font-heading-bold text-3xl md:text-4xl text-foreground mb-4">
                Browse Causes
              </h1>
              <p className="text-muted-foreground font-body text-lg max-w-2xl">
                Discover verified charitable campaigns and make a difference in someone's life. 
                Every donation counts and earns you Punyam points.
              </p>
            </div>

            {/* Quick Stats */}
            <QuickStats 
              totalCauses={totalStats.totalCauses}
              totalFundsRaised={totalStats.totalFundsRaised}
              activeDonors={totalStats.activeDonors}
            />

            {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              location={locationFilter}
              onSearchChange={setSearchTerm}
              onLocationChange={setLocationFilter}
            />

            {/* Filter Chips */}
            <FilterChips
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Sidebar */}
              <div className="lg:col-span-1">
                <FilterSidebar
                  isOpen={isFilterSidebarOpen}
                  onToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Sort and Results Count */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="text-muted-foreground font-body">
                    Showing {causesToShow.length} of {filteredAndSortedCauses.length} causes
                  </div>
                  <SortDropdown
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />
                </div>

                {/* Causes Grid */}
                {filteredAndSortedCauses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                      <Icon name="Search" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-heading-semibold text-xl text-foreground mb-2">
                      No causes found
                    </h3>
                    <p className="text-muted-foreground font-body mb-4">
                      Try adjusting your search criteria or filters to find more causes.
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                      {causesToShow.map((cause) => (
                        <CauseCard key={cause.id} cause={cause} />
                      ))}
                    </div>

                    {/* Load More */}
                    {hasMoreCauses && (
                      <div className="text-center">
                        {isLoading ? (
                          <LoadingSkeleton />
                        ) : (
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={handleLoadMore}
                            iconName="ChevronDown"
                            iconPosition="right"
                          >
                            Load More Causes
                          </Button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CausesBrowse;