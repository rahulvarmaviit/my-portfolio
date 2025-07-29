import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import HeroSection from './components/HeroSection';
import FeaturedCampaigns from './components/FeaturedCampaigns';
import SuccessStories from './components/SuccessStories';
import QuickStats from './components/QuickStats';
import SearchSection from './components/SearchSection';
import { useAuth } from '../../contexts/AuthContext';

const HomeDashboard = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sahayam - Crowdfunding Platform for Indian Charitable Causes</title>
        <meta 
          name="description" 
          content="Connect with verified orphanages, charities, and emergency medical cases across India. Donate transparently and earn Punyam points for your noble contributions." 
        />
        <meta name="keywords" content="crowdfunding, charity, donation, India, medical emergency, orphanage, Punyam points" />
        <meta property="og:title" content="Sahayam - Crowdfunding Platform for Indian Charitable Causes" />
        <meta property="og:description" content="Make a difference in India through verified charitable causes and emergency medical cases." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header user={user} onLogout={handleLogout} />

        {/* Main Content */}
        <main className="pt-nav-height">
          {/* Breadcrumb */}
          <div className="bg-background border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Breadcrumb />
            </div>
          </div>

          {/* Hero Section */}
          <HeroSection />

          {/* Featured Emergency Campaigns */}
          <FeaturedCampaigns />

          {/* Success Stories */}
          <SuccessStories />

          {/* Quick Stats */}
          <QuickStats />

          {/* Search & Categories */}
          <SearchSection />

          {/* Call to Action Footer */}
          <section className="py-12 lg:py-16 bg-gradient-to-r from-primary to-secondary">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="font-heading font-heading-bold text-3xl lg:text-4xl text-white mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of donors who are creating positive change across India. 
                Every contribution matters and earns you Punyam points.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/causes-browse">
                  <button className="bg-white text-primary hover:bg-white/90 font-heading font-heading-semibold px-8 py-3 rounded-button shadow-soft-hover transition-gentle flex items-center space-x-2 min-w-[180px] justify-center">
                    <span>Start Donating</span>
                  </button>
                </a>
                <a href="/login-registration">
                  <button className="border-2 border-white/30 text-white hover:bg-white/10 font-heading font-heading-semibold px-8 py-3 rounded-button transition-gentle flex items-center space-x-2 min-w-[180px] justify-center">
                    <span>Create Account</span>
                  </button>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo & Description */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="font-heading font-heading-bold text-xl">Sahayam</span>
                </div>
                <p className="font-body text-white/80 mb-4 max-w-md">
                  Connecting verified charitable causes with generous donors across India. 
                  Together, we create positive change and earn Punyam for our noble actions.
                </p>
                <div className="flex items-center space-x-2 text-white/60">
                  <span className="font-caption text-sm">
                    © {new Date().getFullYear()} Sahayam Platform. All rights reserved.
                  </span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-heading font-heading-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/causes-browse" className="font-body text-white/80 hover:text-white transition-gentle">Browse Causes</a></li>
                  <li><a href="/emergency-cases" className="font-body text-white/80 hover:text-white transition-gentle">Emergency Cases</a></li>
                  <li><a href="/about" className="font-body text-white/80 hover:text-white transition-gentle">About Us</a></li>
                  <li><a href="/donor-dashboard" className="font-body text-white/80 hover:text-white transition-gentle">Donor Dashboard</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-heading font-heading-semibold text-lg mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><span className="font-body text-white/80">Help Center</span></li>
                  <li><span className="font-body text-white/80">Contact Us</span></li>
                  <li><span className="font-body text-white/80">Privacy Policy</span></li>
                  <li><span className="font-body text-white/80">Terms of Service</span></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeDashboard;