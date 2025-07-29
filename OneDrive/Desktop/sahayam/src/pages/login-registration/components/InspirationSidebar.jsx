import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const InspirationSidebar = () => {
  const successStories = [
    {
      id: 1,
      title: "Saved Little Arjun's Life",
      description: "₹2,50,000 raised for heart surgery",
      image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400",
      donorCount: 1250,
      completedAt: "2 days ago"
    },
    {
      id: 2,
      title: "New School for 200 Children",
      description: "₹15,00,000 raised for education",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80",
      donorCount: 3200,
      completedAt: "1 week ago"
    },
    {
      id: 3,
      title: "Clean Water for Village",
      description: "₹8,75,000 raised for water project",
      image: "https://images.pixabay.com/photos/2016/10/11/21/43/water-1732462_960_720.jpg",
      donorCount: 890,
      completedAt: "3 weeks ago"
    }
  ];

  const impactStats = [
    {
      icon: 'Heart',
      value: '50,000+',
      label: 'Lives Touched',
      color: 'text-error'
    },
    {
      icon: 'Users',
      value: '25,000+',
      label: 'Active Donors',
      color: 'text-primary'
    },
    {
      icon: 'IndianRupee',
      value: '₹5 Cr+',
      label: 'Funds Raised',
      color: 'text-success'
    },
    {
      icon: 'Award',
      value: '1,200+',
      label: 'Success Stories',
      color: 'text-accent'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Heart" size={32} className="text-primary" />
        </div>
        <div>
          <h2 className="font-heading font-heading-bold text-2xl text-foreground mb-2">
            Join the Sahayam Family
          </h2>
          <p className="text-muted-foreground font-body">
            Be part of India's most trusted crowdfunding platform for charitable causes
          </p>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="grid grid-cols-2 gap-4">
        {impactStats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-card rounded-card border border-border">
            <div className="flex items-center justify-center mb-2">
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
            <div className="font-data font-data-bold text-lg text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="space-y-4">
        <h3 className="font-heading font-heading-semibold text-lg text-foreground">
          Recent Success Stories
        </h3>
        
        <div className="space-y-4">
          {successStories.map((story) => (
            <div key={story.id} className="bg-card rounded-card border border-border overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-body font-body-semibold text-sm text-foreground mb-1">
                  {story.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  {story.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-primary">
                    <Icon name="Users" size={12} />
                    <span>{story.donorCount.toLocaleString('en-IN')} donors</span>
                  </div>
                  <span className="text-muted-foreground">{story.completedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-card p-6 text-center">
        <Icon name="Star" size={24} className="text-primary mx-auto mb-3" />
        <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
          Start Making a Difference
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Every donation counts. Join thousands of donors who are changing lives across India.
        </p>
        <div className="flex items-center justify-center space-x-2 text-xs text-primary">
          <Icon name="Shield" size={14} />
          <span>100% Secure & Transparent</span>
        </div>
      </div>
    </div>
  );
};

export default InspirationSidebar;