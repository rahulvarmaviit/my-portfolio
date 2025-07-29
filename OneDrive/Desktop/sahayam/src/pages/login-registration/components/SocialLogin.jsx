import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    }
  ];

  const handleSocialLogin = (provider) => {
    onSocialLogin(provider);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-caption">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            size="lg"
            onClick={() => handleSocialLogin(provider.id)}
            disabled={isLoading}
            className={`${provider.bgColor} transition-gentle`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon 
                name={provider.icon} 
                size={18} 
                className={provider.color}
              />
              <span className="font-body-medium">{provider.name}</span>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;