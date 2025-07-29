import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import { useAuth } from '../../contexts/AuthContext';

const About = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('mission');

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'About Us', path: '/about', icon: 'Info', isActive: true }
  ];

  const stats = [
    { label: 'Lives Impacted', value: '50,000+', icon: 'Users' },
    { label: 'Campaigns Funded', value: '2,500+', icon: 'Target' },
    { label: 'Funds Raised', value: '₹45 Crores+', icon: 'IndianRupee' },
    { label: 'Success Rate', value: '94%', icon: 'TrendingUp' }
  ];

  const teamMembers = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      description: 'Former healthcare executive with 15 years of experience in social impact.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      description: 'Technology leader passionate about using tech for social good.'
    },
    {
      name: 'Dr. Meera Patel',
      role: 'Medical Advisory Head',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      description: 'Senior physician ensuring medical campaign authenticity and ethics.'
    },
    {
      name: 'Amit Singh',
      role: 'Operations Director',
      image: 'https://randomuser.me/api/portraits/men/38.jpg',
      description: 'Operations expert focused on transparent fund distribution and impact tracking.'
    }
  ];

  const values = [
    {
      icon: 'Shield',
      title: 'Transparency',
      description: 'Every rupee donated is tracked and verified. We provide complete transparency in fund utilization with regular updates and receipts.'
    },
    {
      icon: 'Heart',
      title: 'Compassion',
      description: 'We believe in the power of human kindness. Every campaign represents a real person with genuine needs and hopes.'
    },
    {
      icon: 'CheckCircle',
      title: 'Trust',
      description: 'All campaigns undergo rigorous verification. We work directly with hospitals and beneficiaries to ensure authenticity.'
    },
    {
      icon: 'Users',
      title: 'Community',
      description: 'Building a community of givers where everyone can make a difference, regardless of the amount they contribute.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Sahayam was founded with the vision to democratize healthcare funding and make medical treatment accessible to all.'
    },
    {
      year: '2021',
      title: 'First 1000 Campaigns',
      description: 'Successfully funded our first 1000 medical campaigns, helping families across India access critical healthcare.'
    },
    {
      year: '2022',
      title: 'Technology Innovation',
      description: 'Launched our AI-powered verification system and mobile app to streamline donations and campaign management.'
    },
    {
      year: '2023',
      title: 'Partnership Growth',
      description: 'Partnered with 200+ hospitals and medical institutions to ensure direct fund transfer and treatment tracking.'
    },
    {
      year: '2024',
      title: 'Community Expansion',
      description: 'Expanded to serve 500+ cities across India with localized support and vernacular language options.'
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

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6">
              <Icon name="Heart" size={40} className="text-primary" />
            </div>
            <h1 className="font-heading font-heading-bold text-4xl md:text-5xl text-foreground mb-4">
              About Sahayam
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Empowering communities to support those in medical need through transparent, 
              technology-driven crowdfunding that saves lives and builds hope.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border border-border p-6 text-center shadow-soft">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                  <Icon name={stat.icon} size={24} className="text-primary" />
                </div>
                <div className="font-heading font-heading-bold text-2xl text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 bg-muted rounded-button p-1 max-w-2xl mx-auto">
              {[
                { id: 'mission', label: 'Our Mission' },
                { id: 'story', label: 'Our Story' },
                { id: 'values', label: 'Our Values' },
                { id: 'team', label: 'Our Team' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-button text-sm font-body-medium transition-gentle ${
                    activeTab === tab.id 
                      ? 'bg-background text-foreground shadow-soft' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="bg-white rounded-lg border border-border shadow-soft p-8 mb-12">
            {activeTab === 'mission' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="font-heading font-heading-bold text-3xl text-foreground mb-4">
                    Our Mission
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                    To bridge the gap between those who need medical help and those who can provide it, 
                    creating a transparent, trustworthy platform that saves lives and strengthens communities.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-heading font-heading-semibold text-xl text-foreground mb-4">
                      What We Do
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-3">
                        <Icon name="Check" size={20} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Verify and list urgent medical campaigns from verified hospitals and families</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Icon name="Check" size={20} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Provide a secure, user-friendly platform for donors to contribute</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Icon name="Check" size={20} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Ensure 100% of donations reach the intended beneficiaries</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Icon name="Check" size={20} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Track and share real-time updates on treatment progress</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Icon name="Check" size={20} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Build a community of compassionate donors and supporters</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Image
                      src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Healthcare support"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="font-heading font-heading-bold text-3xl text-foreground mb-4">
                    Our Story
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                    Sahayam was born from a simple belief: no one should suffer or lose their life 
                    due to lack of funds for medical treatment.
                  </p>
                </div>

                <div className="prose prose-lg max-w-4xl mx-auto text-muted-foreground">
                  <p>
                    In 2019, our founder Priya Sharma witnessed a heartbreaking incident at a government hospital. 
                    A young father was desperately seeking funds for his daughter's cancer treatment, approaching 
                    strangers in the hospital corridor. Despite the family's genuine need and the child's critical 
                    condition, they struggled to raise the required funds.
                  </p>
                  <p>
                    This experience sparked the idea for Sahayam. Priya realized that while there are millions 
                    of compassionate people willing to help, there was no reliable platform connecting those 
                    in medical crisis with potential donors.
                  </p>
                  <p>
                    After months of research and collaboration with healthcare professionals, technology experts, 
                    and social workers, Sahayam was launched in 2020. Our platform was designed with one core 
                    principle: absolute transparency and direct impact.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading font-heading-semibold text-xl text-foreground text-center mb-6">
                    Our Journey
                  </h3>
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full flex-shrink-0 font-heading font-heading-semibold text-sm">
                          {milestone.year}
                        </div>
                        <div>
                          <h4 className="font-heading font-heading-semibold text-foreground mb-1">
                            {milestone.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="font-heading font-heading-bold text-3xl text-foreground mb-4">
                    Our Values
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                    These core values guide every decision we make and every feature we build.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="p-6 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                          <Icon name={value.icon} size={20} className="text-primary" />
                        </div>
                        <h3 className="font-heading font-heading-semibold text-lg text-foreground">
                          {value.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                  <Icon name="Quote" size={32} className="text-primary mx-auto mb-4" />
                  <blockquote className="text-lg text-foreground font-medium mb-4">
                    "Every life saved through our platform reinforces our commitment to transparency, 
                    compassion, and the power of community support."
                  </blockquote>
                  <cite className="text-muted-foreground">- Sahayam Team</cite>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="font-heading font-heading-bold text-3xl text-foreground mb-4">
                    Meet Our Team
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                    Our diverse team combines healthcare expertise, technology innovation, 
                    and deep commitment to social impact.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-6 text-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-heading font-heading-semibold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {member.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <h3 className="font-heading font-heading-semibold text-xl text-foreground mb-4">
                    Join Our Mission
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We are always looking for passionate individuals to join our team and help us save more lives.
                  </p>
                  <Button variant="outline" iconName="Mail" iconPosition="left">
                    careers@sahayam.org
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-center text-white">
            <h2 className="font-heading font-heading-bold text-2xl mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of donors who are changing lives every day. Your contribution, 
              no matter the size, can be the difference between life and death for someone in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/emergency-cases">
                <Button variant="secondary" size="lg">
                  View Emergency Cases
                </Button>
              </Link>
              <Link to="/causes-browse">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                  Browse All Campaigns
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-white rounded-lg border border-border shadow-soft p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Icon name="Mail" size={24} className="text-primary mx-auto mb-2" />
                <h4 className="font-heading font-heading-semibold text-foreground mb-1">Email Us</h4>
                <p className="text-muted-foreground">support@sahayam.org</p>
              </div>
              <div>
                <Icon name="Phone" size={24} className="text-primary mx-auto mb-2" />
                <h4 className="font-heading font-heading-semibold text-foreground mb-1">Call Us</h4>
                <p className="text-muted-foreground">1800-123-7242 (Toll Free)</p>
              </div>
              <div>
                <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
                <h4 className="font-heading font-heading-semibold text-foreground mb-1">Visit Us</h4>
                <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;