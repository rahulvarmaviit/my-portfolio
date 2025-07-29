import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/home-dashboard': { label: 'Home', icon: 'Home' },
    '/causes-browse': { label: 'Causes', icon: 'Heart' },
    '/emergency-cases': { label: 'Emergency Cases', icon: 'AlertTriangle' },
    '/campaign-details': { label: 'Campaign Details', icon: 'FileText' },
    '/donor-dashboard': { label: 'Dashboard', icon: 'User' },
    '/login-registration': { label: 'Login', icon: 'LogIn' },
    '/about': { label: 'About', icon: 'Info' },
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/home-dashboard', icon: 'Home' }];

    if (location.pathname !== '/home-dashboard') {
      const currentRoute = routeMap[location.pathname];
      if (currentRoute) {
        breadcrumbs.push({
          label: currentRoute.label,
          path: location.pathname,
          icon: currentRoute.icon,
          isActive: true
        });
      }
    } else {
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1 && location.pathname === '/home-dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path || index}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-muted-foreground" 
            />
          )}
          
          {item.isActive ? (
            <span className="flex items-center space-x-1 text-foreground font-caption-normal">
              <Icon name={item.icon} size={14} />
              <span>{item.label}</span>
            </span>
          ) : (
            <Link
              to={item.path}
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-gentle"
            >
              <Icon name={item.icon} size={14} />
              <span>{item.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;