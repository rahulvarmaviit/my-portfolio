import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Causes', path: '/causes-browse', icon: 'Heart' },
    { label: 'Emergency', path: '/emergency-cases', icon: 'AlertTriangle' },
    { label: 'About', path: '/about', icon: 'Info' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-nav bg-background border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-nav-height px-nav-padding-x">
          {/* Logo */}
          <Link 
            to="/home-dashboard" 
            className="flex items-center space-x-2 transition-gentle hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <div className="flex items-center justify-center w-logo-height h-logo-height bg-primary rounded-lg">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <span className="font-heading font-heading-bold text-xl text-foreground">
              Sahayam
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-button transition-gentle ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-body font-body-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Punyam Points */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-accent/10 rounded-button">
                  <Icon name="Star" size={16} color="var(--color-accent)" />
                  <span className="font-data font-data-medium text-sm text-accent">
                    {user.punyamPoints || 0} Punyam
                  </span>
                </div>
                
                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <Link
                    to="/donor-dashboard"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-button transition-gentle ${
                      isActivePath('/donor-dashboard')
                        ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name="User" size={18} />
                    <span className="font-body font-body-medium">Dashboard</span>
                  </Link>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    iconName="LogOut"
                    iconSize={16}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login-registration">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/login-registration">
                  <Button variant="default" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-touch-target h-touch-target -mr-3 text-muted-foreground hover:text-foreground transition-gentle"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-nav-mobile md:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={closeMobileMenu} />
          <div className="absolute top-0 right-0 w-80 max-w-full h-full bg-background shadow-soft-hover">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-nav-padding-x border-b border-border">
                <span className="font-heading font-heading-semibold text-lg">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-gentle"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 py-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-nav-padding-x py-4 transition-gentle ${
                      isActivePath(item.path)
                        ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-body font-body-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Section */}
              <div className="border-t border-border p-nav-padding-x pb-8">
                {user ? (
                  <div className="space-y-4">
                    {/* Punyam Points */}
                    <div className="flex items-center justify-between p-4 bg-accent/10 rounded-card">
                      <div className="flex items-center space-x-2">
                        <Icon name="Star" size={18} color="var(--color-accent)" />
                        <span className="font-body font-body-medium text-accent">Punyam Points</span>
                      </div>
                      <span className="font-data font-data-medium text-accent">
                        {user.punyamPoints || 0}
                      </span>
                    </div>
                    
                    {/* Dashboard Link */}
                    <Link
                      to="/donor-dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 p-4 rounded-card bg-muted hover:bg-muted/80 transition-gentle"
                    >
                      <Icon name="User" size={20} />
                      <span className="font-body font-body-medium">Dashboard</span>
                    </Link>
                    
                    {/* Logout Button */}
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        onLogout();
                        closeMobileMenu();
                      }}
                      iconName="LogOut"
                      iconPosition="left"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login-registration" onClick={closeMobileMenu}>
                      <Button variant="outline" fullWidth>
                        Login
                      </Button>
                    </Link>
                    <Link to="/login-registration" onClick={closeMobileMenu}>
                      <Button variant="default" fullWidth>
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;