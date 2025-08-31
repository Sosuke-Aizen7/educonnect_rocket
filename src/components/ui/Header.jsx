import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';

import { useAuth } from '../../contexts/AuthContext';

const Header = ({ className = "", ...props }) => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className={`bg-white shadow-sm border-b ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              EduConnect
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/course-search-results" className="text-gray-600 hover:text-gray-900">
              Courses
            </Link>
            <Link to="/university-profile" className="text-gray-600 hover:text-gray-900">
              Universities
            </Link>
            {user && (
              <>
                <Link to="/course-comparison" className="text-gray-600 hover:text-gray-900">
                  Compare
                </Link>
                <Link to="/user-dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.user_metadata?.full_name || user?.email?.split('@')?.[0]}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;