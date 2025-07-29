import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import SocialLogin from './components/SocialLogin';
import TrustIndicators from './components/TrustIndicators';
import InspirationSidebar from './components/InspirationSidebar';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const LoginRegistration = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, loading, authError, clearError } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user && !loading) {
      navigate('/donor-dashboard');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Clear auth error when switching tabs
    if (authError) {
      clearError();
    }
  }, [activeTab, clearError]);

  const handleLogin = async (formData) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      clearError();
      
      const result = await signIn(formData.email, formData.password);
      
      if (result?.success) {
        // Redirect to intended page or dashboard
        const redirectTo = location.state?.from || '/donor-dashboard';
        navigate(redirectTo);
      }
      // Error handling is done in AuthContext
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (formData) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      clearError();
      
      const result = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phoneNumber,
        role: 'donor'
      });
      
      if (result?.success) {
        // Show success message and switch to login tab
        alert('Registration successful! Please check your email for verification.');
        setActiveTab('login');
      }
      // Error handling is done in AuthContext
    } catch (error) {
      console.log('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    // Placeholder for social login
    alert(`Social login with ${provider} is not implemented yet. Please use email registration.`);
  };

  const handleContinueAsGuest = () => {
    navigate('/home-dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={32} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header user={user} onLogout={() => {}} />
      
      {/* Main Content */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-card rounded-card border border-border shadow-soft p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <Icon name="Heart" size={32} className="text-primary" />
                  </div>
                  <h1 className="font-heading font-heading-bold text-2xl text-foreground mb-2">
                    Welcome to Sahayam
                  </h1>
                  <p className="text-muted-foreground font-body">
                    {activeTab === 'login' ? 'Sign in to continue your giving journey' : 'Create an account to start making a difference'}
                  </p>
                </div>

                {/* Show authentication error */}
                {authError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertCircle" size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-red-700">{authError}</p>
                        <button 
                          onClick={clearError}
                          className="text-xs text-red-600 hover:text-red-800 mt-1 underline"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Navigation */}
                <div className="flex bg-muted rounded-button p-1 mb-8">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-2 px-4 rounded-button text-sm font-body-medium transition-gentle ${
                      activeTab === 'login' ? 'bg-background text-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-2 px-4 rounded-button text-sm font-body-medium transition-gentle ${
                      activeTab === 'register' ? 'bg-background text-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Demo Credentials Note */}
                {activeTab === 'login' && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Demo Credentials:</p>
                        <p>Email: donor@sahayam.org</p>
                        <p>Password: donor123</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Content */}
                <div className="space-y-6">
                  {activeTab === 'login' ? (
                    <LoginForm onLogin={handleLogin} isLoading={isSubmitting} />
                  ) : (
                    <RegistrationForm onRegister={handleRegister} isLoading={isSubmitting} />
                  )}
                  
                  <SocialLogin onSocialLogin={handleSocialLogin} isLoading={isSubmitting} />
                </div>

                {/* Guest Option */}
                <div className="mt-8 pt-6 border-t border-border">
                  <button
                    onClick={handleContinueAsGuest}
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-gentle font-body-medium"
                  >
                    Continue as Guest
                    <span className="block text-xs mt-1">
                      (Limited features available)
                    </span>
                  </button>
                </div>
              </div>

              {/* Trust Indicators - Mobile */}
              <div className="mt-8 lg:hidden">
                <TrustIndicators />
              </div>
            </div>

            {/* Right Side - Inspiration & Trust */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <InspirationSidebar />
                <TrustIndicators />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-muted/50 border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-primary" />
              <span>Trusted Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-accent" />
              <span>50,000+ Users</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            By using Sahayam, you agree to our{' '}
            <a href="#" className="text-primary hover:text-primary/80">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:text-primary/80">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;