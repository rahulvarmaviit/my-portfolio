import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const SuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const successStories = [
    {
      id: 1,
      title: "Ravi\'s Heart Surgery - Successful Recovery",
      image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
      raised: 850000,
      goal: 800000,
      donorsCount: 456,
      location: "Mumbai, Maharashtra",
      testimonial: "Thanks to Sahayam donors, my son Ravi successfully underwent heart surgery. Today he's healthy and playing with his friends. We are forever grateful to all the kind hearts who supported us.",
      donorName: "Sunita Sharma",
      completedDate: "March 2025",
      punyamEarned: 2340
    },
    {
      id: 2,
      title: "Blind School Infrastructure - Completed",
      image: "https://images.pixabay.com/photos/2016/03/26/22/13/books-1281581_1280.jpg",
      raised: 1200000,
      goal: 1000000,
      donorsCount: 678,
      location: "Delhi, NCR",
      testimonial: "The new building for our blind students is now ready! 150 children now have a safe and modern learning environment. This wouldn\'t have been possible without Sahayam\'s amazing community.",
      donorName: "Principal Rajesh Kumar",
      completedDate: "February 2025",
      punyamEarned: 3890
    },
    {
      id: 3,
      title: "Orphanage Food Program - Annual Goal Achieved",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800",
      raised: 650000,
      goal: 600000,
      donorsCount: 234,
      location: "Chennai, Tamil Nadu",
      testimonial: "Our 80 children now have nutritious meals throughout the year. The smiles on their faces are priceless. Thank you to every donor who made this possible through Sahayam platform.",
      donorName: "Sister Mary Joseph",
      completedDate: "January 2025",
      punyamEarned: 1890
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [successStories.length]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const currentStoryData = successStories[currentStory];

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-heading-bold text-3xl lg:text-4xl text-foreground mb-4">
            Success Stories
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Real lives transformed through the generosity of our Sahayam community
          </p>
        </div>

        {/* Story Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-card shadow-soft overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 md:h-auto">
                <Image
                  src={currentStoryData.image}
                  alt={currentStoryData.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Success Badge */}
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-button flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} />
                  <span className="font-caption font-caption-normal text-sm">Completed</span>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-button p-3">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="font-data font-data-medium text-foreground">
                        {formatCurrency(currentStoryData.raised)}
                      </span>
                      <span className="font-caption text-accent">
                        {Math.round((currentStoryData.raised / currentStoryData.goal) * 100)}% funded
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 lg:p-8">
                {/* Title */}
                <h3 className="font-heading font-heading-semibold text-xl lg:text-2xl text-foreground mb-3">
                  {currentStoryData.title}
                </h3>

                {/* Location & Date */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span className="font-caption text-sm">{currentStoryData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span className="font-caption text-sm">{currentStoryData.completedDate}</span>
                  </div>
                </div>

                {/* Testimonial */}
                <blockquote className="font-body text-muted-foreground mb-4 italic">
                  "{currentStoryData.testimonial}"
                </blockquote>

                {/* Testimonial Author */}
                <p className="font-caption font-caption-normal text-sm text-foreground mb-6">
                  — {currentStoryData.donorName}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/50 rounded-button">
                    <div className="font-data font-data-medium text-lg text-foreground">
                      {currentStoryData.donorsCount}
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">Donors</div>
                  </div>
                  <div className="text-center p-3 bg-accent/10 rounded-button">
                    <div className="font-data font-data-medium text-lg text-accent">
                      {currentStoryData.punyamEarned}
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">Punyam Earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-3 h-3 rounded-full transition-gentle ${
                  index === currentStory ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`View story ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;