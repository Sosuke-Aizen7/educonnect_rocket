import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ComparisonIndicator from '../../components/ui/ComparisonIndicator';
import HeroSection from './components/HeroSection';
import QuickFilters from './components/QuickFilters';
import FeaturedUniversities from './components/FeaturedUniversities';
import TrendingCourses from './components/TrendingCourses';
import TestimonialsSection from './components/TestimonialsSection';
import CallToActionSection from './components/CallToActionSection';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>EduConnect - Find Your Perfect University Match</title>
        <meta name="description" content="Discover and compare courses from top universities worldwide. Make informed decisions about your educational future with comprehensive insights and expert guidance." />
        <meta name="keywords" content="university search, course comparison, higher education, study abroad, college finder" />
        <meta property="og:title" content="EduConnect - Find Your Perfect University Match" />
        <meta property="og:description" content="Discover and compare courses from top universities worldwide. Make informed decisions about your educational future." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Quick Filters */}
          <QuickFilters />

          {/* Featured Universities */}
          <FeaturedUniversities />

          {/* Trending Courses */}
          <TrendingCourses />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Call to Action */}
          <CallToActionSection />
        </main>

        {/* Comparison Indicator */}
        <ComparisonIndicator />

        {/* Footer */}
        <footer className="bg-card border-t py-12">
          <div className="container px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="text-sm font-bold">E</span>
                  </div>
                  <span className="text-xl font-semibold text-foreground">EduConnect</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Connecting students with their perfect university match through comprehensive search and comparison tools.
                </p>
                <div className="text-xs text-muted-foreground">
                  © {new Date()?.getFullYear()} EduConnect. All rights reserved.
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Explore</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/course-search-results" className="hover:text-foreground transition-colors">Search Courses</a></li>
                  <li><a href="/university-profile" className="hover:text-foreground transition-colors">Universities</a></li>
                  <li><a href="/course-comparison" className="hover:text-foreground transition-colors">Compare Programs</a></li>
                  <li><a href="/user-dashboard" className="hover:text-foreground transition-colors">Dashboard</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Study Guides</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Application Tips</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Scholarship Info</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Career Guidance</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;