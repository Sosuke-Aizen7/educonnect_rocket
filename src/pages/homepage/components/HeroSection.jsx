import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalSearchBar from '../../../components/ui/GlobalSearchBar';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    if (query?.trim()) {
      navigate(`/course-search-results?q=${encodeURIComponent(query)}`);
    }
  };

  const popularSearches = [
    "Computer Science",
    "Business Administration", 
    "Data Science",
    "Medicine",
    "Engineering"
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 lg:py-24">
      <div className="container px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect
              <span className="text-primary block lg:inline lg:ml-3">
                University Match
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover and compare courses from top universities worldwide. Make informed decisions about your educational future with comprehensive insights and expert guidance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 lg:mb-12">
            <div className="max-w-2xl mx-auto">
              <GlobalSearchBar
                placeholder="Search courses, universities, or subjects..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            
            {/* Popular Searches */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches?.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors duration-200"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/course-search-results')}
              iconName="Search"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Explore Courses
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/university-profile')}
              iconName="GraduationCap"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Browse Universities
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Icon name="GraduationCap" size={24} className="text-primary" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground">2,500+</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                <Icon name="BookOpen" size={24} className="text-secondary" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground">50,000+</div>
              <div className="text-sm text-muted-foreground">Courses Available</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                <Icon name="Users" size={24} className="text-accent" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground">1M+</div>
              <div className="text-sm text-muted-foreground">Students Helped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;