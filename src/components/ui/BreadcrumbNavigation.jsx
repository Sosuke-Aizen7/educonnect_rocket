import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null, className = '' }) => {
  const location = useLocation();
  
  // Default breadcrumb mapping based on routes
  const routeBreadcrumbs = {
    '/homepage': [
      { label: 'Home', path: '/homepage' }
    ],
    '/course-search-results': [
      { label: 'Home', path: '/homepage' },
      { label: 'Search Results', path: '/course-search-results' }
    ],
    '/course-detail': [
      { label: 'Home', path: '/homepage' },
      { label: 'Search Results', path: '/course-search-results' },
      { label: 'Course Details', path: '/course-detail' }
    ],
    '/course-comparison': [
      { label: 'Home', path: '/homepage' },
      { label: 'Course Comparison', path: '/course-comparison' }
    ],
    '/university-profile': [
      { label: 'Home', path: '/homepage' },
      { label: 'Universities', path: '/university-profile' }
    ],
    '/user-dashboard': [
      { label: 'Home', path: '/homepage' },
      { label: 'Dashboard', path: '/user-dashboard' }
    ]
  };

  // Use custom breadcrumbs if provided, otherwise use route-based breadcrumbs
  const breadcrumbs = customBreadcrumbs || routeBreadcrumbs?.[location?.pathname] || [
    { label: 'Home', path: '/homepage' }
  ];

  // Don't show breadcrumbs on homepage or if only one item
  if (location?.pathname === '/homepage' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isFirst = index === 0;
          
          return (
            <li key={crumb?.path || index} className="flex items-center">
              {!isFirst && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="mx-2 text-muted-foreground/60" 
                />
              )}
              {isLast ? (
                <span 
                  className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="hover:text-foreground transition-colors duration-150 truncate max-w-[120px] sm:max-w-none"
                  title={crumb?.label}
                >
                  {crumb?.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;