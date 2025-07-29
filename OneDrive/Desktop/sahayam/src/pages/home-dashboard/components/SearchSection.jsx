import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 1,
      name: "Medical Emergency",
      icon: "Heart",
      count: 45,
      color: "text-error",
      bgColor: "bg-error/10",
      route: "/emergency-cases?category=medical"
    },
    {
      id: 2,
      name: "Education",
      icon: "BookOpen",
      count: 32,
      color: "text-primary",
      bgColor: "bg-primary/10",
      route: "/causes-browse?category=education"
    },
    {
      id: 3,
      name: "Orphanages",
      icon: "Home",
      count: 28,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      route: "/causes-browse?category=orphanages"
    },
    {
      id: 4,
      name: "Disability Support",
      icon: "Users",
      count: 19,
      color: "text-accent",
      bgColor: "bg-accent/10",
      route: "/causes-browse?category=disability"
    },
    {
      id: 5,
      name: "Accident Cases",
      icon: "AlertTriangle",
      count: 23,
      color: "text-warning",
      bgColor: "bg-warning/10",
      route: "/emergency-cases?category=accident"
    },
    {
      id: 6,
      name: "Senior Care",
      icon: "Shield",
      count: 15,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      route: "/causes-browse?category=senior"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to causes page with search query
      window.location.href = `/causes-browse?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-heading-bold text-3xl lg:text-4xl text-foreground mb-4">
            Find Causes That Matter to You
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through verified campaigns or browse by category to discover causes you care about
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search for causes, locations, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12"
                />
              </div>
              <Button 
                type="submit"
                variant="default"
                iconName="Search"
                iconPosition="left"
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.route}
              className="group"
            >
              <div className="bg-card rounded-card shadow-soft hover:shadow-soft-hover transition-gentle p-4 text-center group-hover:scale-105">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 ${category.bgColor} rounded-full mb-3`}>
                  <Icon 
                    name={category.icon} 
                    size={20} 
                    className={category.color}
                  />
                </div>

                {/* Category Name */}
                <h3 className="font-heading font-heading-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-gentle">
                  {category.name}
                </h3>

                {/* Count */}
                <p className="font-caption text-xs text-muted-foreground">
                  {category.count} active
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/causes-browse">
              <Button 
                variant="outline"
                iconName="Grid"
                iconPosition="left"
              >
                Browse All Causes
              </Button>
            </Link>
            <Link to="/emergency-cases">
              <Button 
                variant="default"
                iconName="AlertTriangle"
                iconPosition="left"
              >
                View Emergency Cases
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;