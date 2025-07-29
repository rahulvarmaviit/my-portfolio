import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/20"></div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-white/15"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-white/25"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 rounded-full bg-white/10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="font-heading font-heading-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Sahayam se
            <br />
            {/*<span className="text-white/90">Badlav Laayein</span>*/}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Connect with verified orphanages, charities, and emergency medical cases across India. 
            Your donations create real impact and earn you Punyam points for your noble contributions.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-10 text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={20} color="white" />
              <span className="font-data text-sm">₹2,50,00,000+ Donated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} color="white" />
              <span className="font-data text-sm">15,000+ Donors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} color="white" />
              <span className="font-data text-sm">500+ Verified Causes</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/causes-browse">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-soft-hover min-w-[160px]"
                iconName="Heart"
                iconPosition="left"
              >
                Donate Now
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 min-w-[160px]"
                iconName="Info"
                iconPosition="left"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;