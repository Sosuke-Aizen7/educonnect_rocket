import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ComparisonIndicator from '../../components/ui/ComparisonIndicator';
import FilterPanel from './components/FilterPanel';
import FilterChips from './components/FilterChips';
import SearchResultsHeader from './components/SearchResultsHeader';
import CourseCard from './components/CourseCard';
import LoadingSkeletons from './components/LoadingSkeletons';
import EmptyState from './components/EmptyState';

const CourseSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams?.get('q') || '';

  // State management
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState(new Set());
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [currentSort, setCurrentSort] = useState('relevance');
  const [filters, setFilters] = useState({
    countries: [],
    subjects: [],
    studyLevels: [],
    durations: [],
    feeRange: { min: 0, max: 100000 }
  });

  // Mock courses data
  const mockCourses = [
    {
      id: 1,
      title: "Master of Science in Computer Science",
      university: {
        name: "Harvard University",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center"
      },
      location: "Cambridge, MA",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      level: "Master",
      duration: "2 years",
      startDate: "Sep 2024",
      fee: 52000,
      rating: 4.8,
      reviews: 245,
      highlights: ["AI/ML Focus", "Research Opportunities", "Industry Partnerships", "Flexible Schedule"]
    },
    {
      id: 2,
      title: "Bachelor of Business Administration",
      university: {
        name: "Stanford University",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center"
      },
      location: "Stanford, CA",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      level: "Bachelor",
      duration: "4 years",
      startDate: "Aug 2024",
      fee: 58000,
      rating: 4.9,
      reviews: 189,
      highlights: ["Entrepreneurship Track", "Silicon Valley Network", "Case Studies"]
    },
    {
      id: 3,
      title: "PhD in Biomedical Engineering",
      university: {
        name: "MIT",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center"
      },
      location: "Cambridge, MA",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      level: "PhD",
      duration: "5 years",
      startDate: "Sep 2024",
      fee: 0,
      rating: 4.7,
      reviews: 156,
      highlights: ["Fully Funded", "Research Assistantship", "Lab Access", "Publication Support"]
    },
    {
      id: 4,
      title: "Master of Data Science",
      university: {
        name: "University of California, Berkeley",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center"
      },
      location: "Berkeley, CA",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      level: "Master",
      duration: "1.5 years",
      startDate: "Jan 2025",
      fee: 45000,
      rating: 4.6,
      reviews: 203,
      highlights: ["Industry Projects", "Python/R Focus", "Big Data Tools", "Career Services"]
    },
    {
      id: 5,
      title: "Bachelor of Psychology",
      university: {
        name: "University of Toronto",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center"
      },
      location: "Toronto, ON",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      level: "Bachelor",
      duration: "4 years",
      startDate: "Sep 2024",
      fee: 35000,
      rating: 4.5,
      reviews: 178,
      highlights: ["Clinical Training", "Research Methods", "Internship Program"]
    },
    {
      id: 6,
      title: "Master of Engineering Management",
      university: {
        name: "University of Melbourne",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center"
      },
      location: "Melbourne, AU",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      level: "Master",
      duration: "2 years",
      startDate: "Feb 2025",
      fee: 42000,
      rating: 4.4,
      reviews: 134,
      highlights: ["Leadership Focus", "Project Management", "Industry Connections"]
    }
  ];

  // Load courses with simulated API call
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter and sort courses based on current filters and sort
      let filteredCourses = [...mockCourses];
      
      // Apply search query filter
      if (searchQuery) {
        filteredCourses = filteredCourses?.filter(course =>
          course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          course?.university?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          course?.highlights?.some(highlight => 
            highlight?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          )
        );
      }
      
      // Apply other filters
      if (filters?.countries?.length > 0) {
        // Mock country filtering logic
        filteredCourses = filteredCourses?.filter(course => {
          const countryMap = {
            'us': ['Cambridge, MA', 'Stanford, CA', 'Berkeley, CA'],
            'ca': ['Toronto, ON'],
            'au': ['Melbourne, AU']
          };
          return filters?.countries?.some(country => 
            countryMap?.[country]?.some(location => 
              course?.location?.includes(location?.split(',')?.[1]?.trim())
            )
          );
        });
      }
      
      if (filters?.studyLevels?.length > 0) {
        filteredCourses = filteredCourses?.filter(course =>
          filters?.studyLevels?.some(level => {
            const levelMap = {
              'bachelor': 'Bachelor',
              'master': 'Master',
              'phd': 'PhD'
            };
            return course?.level === levelMap?.[level];
          })
        );
      }
      
      // Apply fee range filter
      if (filters?.feeRange?.min > 0 || filters?.feeRange?.max < 100000) {
        filteredCourses = filteredCourses?.filter(course =>
          course?.fee >= filters?.feeRange?.min && course?.fee <= filters?.feeRange?.max
        );
      }
      
      // Apply sorting
      switch (currentSort) {
        case 'fee-low':
          filteredCourses?.sort((a, b) => a?.fee - b?.fee);
          break;
        case 'fee-high':
          filteredCourses?.sort((a, b) => b?.fee - a?.fee);
          break;
        case 'rating':
          filteredCourses?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'alphabetical':
          filteredCourses?.sort((a, b) => a?.title?.localeCompare(b?.title));
          break;
        case 'duration-short':
          filteredCourses?.sort((a, b) => {
            const getDurationYears = (duration) => parseFloat(duration?.match(/[\d.]+/)?.[0]);
            return getDurationYears(a?.duration) - getDurationYears(b?.duration);
          });
          break;
        default:
          // Keep original order for relevance
          break;
      }
      
      setCourses(filteredCourses);
      setLoading(false);
    };

    loadCourses();
  }, [searchQuery, filters, currentSort]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Handle filter removal
  const handleRemoveFilter = useCallback((category, value) => {
    if (category === 'feeRange') {
      setFilters(prev => ({
        ...prev,
        feeRange: { min: 0, max: 100000 }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: prev?.[category]?.filter(item => item !== value)
      }));
    }
  }, []);

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    setFilters({
      countries: [],
      subjects: [],
      studyLevels: [],
      durations: [],
      feeRange: { min: 0, max: 100000 }
    });
  }, []);

  // Handle course bookmarking
  const handleBookmark = useCallback((courseId) => {
    setBookmarkedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(courseId)) {
        newSet?.delete(courseId);
      } else {
        newSet?.add(courseId);
      }
      return newSet;
    });
  }, []);

  // Handle course comparison selection
  const handleCompare = useCallback((courseId, isSelected) => {
    setSelectedCourses(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet?.add(courseId);
      } else {
        newSet?.delete(courseId);
      }
      return newSet;
    });
  }, []);

  // Check if filters are active
  const hasActiveFilters = 
    filters?.countries?.length > 0 ||
    filters?.subjects?.length > 0 ||
    filters?.studyLevels?.length > 0 ||
    filters?.durations?.length > 0 ||
    filters?.feeRange?.min > 0 ||
    filters?.feeRange?.max < 100000;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 lg:px-6 py-6">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation className="mb-6" />
        
        {/* Search Results Header */}
        <SearchResultsHeader
          totalResults={courses?.length}
          currentSort={currentSort}
          onSortChange={setCurrentSort}
          onToggleFilters={() => setIsFilterPanelOpen(true)}
          searchQuery={searchQuery}
          className="mb-6"
        />

        {/* Active Filters */}
        {hasActiveFilters && (
          <FilterChips
            activeFilters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
            className="mb-6"
          />
        )}

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <FilterPanel
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>

          {/* Mobile Filter Panel */}
          <FilterPanel
            isOpen={isFilterPanelOpen}
            onClose={() => setIsFilterPanelOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            className="lg:hidden"
          />

          {/* Results Content */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <LoadingSkeletons count={6} />
            ) : courses?.length === 0 ? (
              <EmptyState
                searchQuery={searchQuery}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={handleClearAllFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses?.map((course) => (
                  <CourseCard
                    key={course?.id}
                    course={course}
                    onBookmark={handleBookmark}
                    onCompare={handleCompare}
                    isBookmarked={bookmarkedCourses?.has(course?.id)}
                    isSelected={selectedCourses?.has(course?.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Comparison Indicator */}
      <ComparisonIndicator />
    </div>
  );
};

export default CourseSearchResults;