import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserAccountMenu = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock auth state
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data
  useEffect(() => {
    // Simulate checking authentication status
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: null,
      initials: 'JD'
    };
    
    // For demo purposes, set as authenticated
    setIsAuthenticated(true);
    setUser(mockUser);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsOpen(false);
    navigate('/homepage');
  };

  const handleSignIn = () => {
    setIsOpen(false);
    // Navigate to sign in page or open modal
    navigate('/signin');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      description: 'View your applications and saved courses'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      description: 'Manage your account settings'
    },
    {
      label: 'Saved Courses',
      path: '/saved-courses',
      icon: 'Bookmark',
      description: 'View your bookmarked courses'
    },
    {
      label: 'Applications',
      path: '/applications',
      icon: 'FileText',
      description: 'Track your application status'
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      description: 'Preferences and notifications'
    }
  ];

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {isAuthenticated ? (
        // Authenticated User Menu
        (<>
          <Button
            variant="ghost"
            onClick={toggleMenu}
            className="flex items-center space-x-2 h-10"
          >
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                {user?.initials || 'U'}
              </div>
            )}
            <span className="hidden sm:block text-sm font-medium truncate max-w-[100px]">
              {user?.name || 'User'}
            </span>
            <Icon 
              name={isOpen ? "ChevronUp" : "ChevronDown"} 
              size={14} 
              className="hidden sm:block" 
            />
          </Button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-popover border rounded-lg shadow-modal z-50 animate-fade-in">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b">
                <div className="flex items-center space-x-3">
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {user?.initials || 'U'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-popover-foreground truncate">
                      {user?.name || 'User'}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className="flex items-start px-4 py-3 text-sm hover:bg-muted transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={16} 
                      className="mr-3 mt-0.5 text-muted-foreground group-hover:text-foreground" 
                    />
                    <div className="flex-1">
                      <div className="font-medium text-popover-foreground group-hover:text-foreground">
                        {item?.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {item?.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Sign Out */}
              <div className="border-t py-2">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                >
                  <Icon name="LogOut" size={16} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </>)
      ) : (
        // Guest User Menu
        (<>
          <Button
            variant="ghost"
            onClick={toggleMenu}
            className="flex items-center space-x-2"
          >
            <Icon name="User" size={20} />
            <span className="hidden sm:block text-sm">Account</span>
            <Icon 
              name={isOpen ? "ChevronUp" : "ChevronDown"} 
              size={14} 
              className="hidden sm:block" 
            />
          </Button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-popover border rounded-lg shadow-modal z-50 animate-fade-in">
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                    <Icon name="User" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-semibold text-popover-foreground">
                    Welcome to EduConnect
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sign in to save courses and track applications
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Button
                    onClick={handleSignIn}
                    className="w-full"
                    size="sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/signup');
                    }}
                    className="w-full"
                    size="sm"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>)
      )}
    </div>
  );
};

export default UserAccountMenu;