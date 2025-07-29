import React from 'react';
import { Link } from 'react-router-dom';
import EmergencyCard from './EmergencyCard';
import Button from '../../../components/ui/Button';


const FeaturedCampaigns = () => {
  const featuredCampaigns = [
    {
      id: 1,
      title: "Emergency Heart Surgery for 8-Year-Old Arjun",
      location: "Mumbai, Maharashtra",
      image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
      raised: 450000,
      goal: 800000,
      donorsCount: 234,
      isUrgent: true,
      deadline: "2025-08-15"
    },
    {
      id: 2,
      title: "Support Blind Children\'s Education at Lighthouse School",
      location: "Delhi, NCR",
      image: "https://images.pixabay.com/photos/2016/03/26/22/13/books-1281581_1280.jpg",
      raised: 320000,
      goal: 500000,
      donorsCount: 156,
      isUrgent: false,
      deadline: "2025-09-30"
    },
    {
      id: 3,
      title: "Accident Victim Needs Immediate Medical Care",
      location: "Bangalore, Karnataka",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
      raised: 180000,
      goal: 350000,
      donorsCount: 89,
      isUrgent: true,
      deadline: "2025-07-30"
    },
    {
      id: 4,
      title: "Orphanage Needs Support for 50 Children",
      location: "Chennai, Tamil Nadu",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800",
      raised: 275000,
      goal: 600000,
      donorsCount: 198,
      isUrgent: false,
      deadline: "2025-10-15"
    },
    {
      id: 5,
      title: "Cancer Treatment for Young Mother Priya",
      location: "Pune, Maharashtra",
      image: "https://images.pixabay.com/photos/2021/10/11/17/54/doctor-6701410_1280.jpg",
      raised: 520000,
      goal: 750000,
      donorsCount: 312,
      isUrgent: true,
      deadline: "2025-08-20"
    },
    {
      id: 6,
      title: "Education Fund for Underprivileged Children",
      location: "Kolkata, West Bengal",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=800&q=80",
      raised: 145000,
      goal: 400000,
      donorsCount: 76,
      isUrgent: false,
      deadline: "2025-11-30"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-heading-bold text-3xl lg:text-4xl text-foreground mb-4">
            Featured Emergency Cases
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            These urgent cases need immediate support. Your contribution can make a life-changing difference.
          </p>
        </div>

        {/* Emergency Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button variant="default" size="sm" className="rounded-full">
            All Cases
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Medical Emergency
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Education
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Orphanages
          </Button>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredCampaigns.map((campaign) => (
            <EmergencyCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/emergency-cases">
            <Button 
              variant="outline" 
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All Emergency Cases
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;