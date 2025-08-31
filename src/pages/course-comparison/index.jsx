import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ComparisonIndicator from '../../components/ui/ComparisonIndicator';
import ComparisonHeader from './components/ComparisonHeader';
import ComparisonTabs from './components/ComparisonTabs';
import ComparisonSummary from './components/ComparisonSummary';
import MobileComparisonView from './components/MobileComparisonView';
import DesktopComparisonView from './components/DesktopComparisonView';
import EmptyComparisonState from './components/EmptyComparisonState';

const CourseComparison = () => {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mock courses data
  const mockCourses = [
    {
      id: 1,
      title: "Computer Science",
      degree: "Bachelor\'s",
      university: "Harvard University",
      location: "Cambridge, MA, USA",
      universityLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
      duration: "4 years",
      studyMode: "Full-time",
      startDate: "September 2024",
      language: "English",
      accreditation: "ABET Accredited",
      ranking: "#1 in USA",
      isPopular: true,
      fees: {
        tuition: "$52,000/year",
        application: "$75",
        living: "$18,000/year",
        total: "$280,000",
        paymentOptions: ["Semester payments", "Annual payments", "Scholarship available"]
      },
      requirements: {
        academic: ["High school diploma with 3.8+ GPA", "SAT score 1450+", "Strong math background"],
        english: ["TOEFL 100+", "IELTS 7.0+", "Native English speaker"],
        additional: ["Personal statement", "2 recommendation letters", "Portfolio (optional)"]
      },
      curriculum: {
        core: ["Data Structures", "Algorithms", "Computer Systems", "Software Engineering", "Database Systems"],
        electives: ["Machine Learning", "Web Development", "Mobile Development", "Cybersecurity"],
        specializations: ["AI/ML", "Software Engineering", "Data Science", "Cybersecurity"]
      }
    },
    {
      id: 2,
      title: "Data Science",
      degree: "Master\'s",
      university: "Stanford University",
      location: "Stanford, CA, USA",
      universityLogo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop&crop=center",
      duration: "2 years",
      studyMode: "Full-time",
      startDate: "September 2024",
      language: "English",
      accreditation: "WASC Accredited",
      ranking: "#2 in USA",
      isPopular: true,
      fees: {
        tuition: "$58,000/year",
        application: "$125",
        living: "$22,000/year",
        total: "$160,000",
        paymentOptions: ["Semester payments", "Annual payments", "Graduate assistantship available"]
      },
      requirements: {
        academic: ["Bachelor\'s degree in related field", "GPA 3.5+", "GRE score 320+"],
        english: ["TOEFL 105+", "IELTS 7.5+", "Native English speaker"],
        additional: ["Statement of purpose", "3 recommendation letters", "Research experience preferred"]
      },
      curriculum: {
        core: ["Statistical Methods", "Machine Learning", "Data Mining", "Big Data Analytics", "Research Methods"],
        electives: ["Deep Learning", "Natural Language Processing", "Computer Vision", "Business Analytics"],
        specializations: ["Machine Learning", "Business Analytics", "Computational Biology", "Social Data Science"]
      }
    },
    {
      id: 3,
      title: "Business Administration",
      degree: "MBA",
      university: "MIT Sloan",
      location: "Cambridge, MA, USA",
      universityLogo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=100&fit=crop&crop=center",
      duration: "2 years",
      studyMode: "Full-time",
      startDate: "August 2024",
      language: "English",
      accreditation: "AACSB Accredited",
      ranking: "#4 MBA Program",
      isPopular: false,
      fees: {
        tuition: "$84,000/year",
        application: "$250",
        living: "$25,000/year",
        total: "$218,000",
        paymentOptions: ["Semester payments", "Deferred payment plans", "Scholarship opportunities"]
      },
      requirements: {
        academic: ["Bachelor\'s degree", "GMAT 720+ or GRE equivalent", "3+ years work experience"],
        english: ["TOEFL 109+", "IELTS 7.5+", "Native English speaker"],
        additional: ["Essays", "Interview", "3 recommendation letters", "Resume"]
      },
      curriculum: {
        core: ["Financial Management", "Marketing", "Operations", "Strategy", "Leadership", "Analytics"],
        electives: ["Entrepreneurship", "Consulting", "Investment Banking", "Technology Management"],
        specializations: ["Finance", "Marketing", "Operations", "Entrepreneurship", "Technology"]
      }
    }
  ];

  useEffect(() => {
    // Simulate loading courses from URL params or localStorage
    const loadCourses = async () => {
      setIsLoading(true);
      
      // Get course IDs from URL params
      const courseIds = searchParams?.get('courses')?.split(',')?.map(id => parseInt(id)) || [];
      
      // Filter mock courses based on IDs, or show first 2 for demo
      const selectedCourses = courseIds?.length > 0 
        ? mockCourses?.filter(course => courseIds?.includes(course?.id))
        : mockCourses?.slice(0, 2); // Show first 2 courses for demo
      
      setCourses(selectedCourses);
      setIsLoading(false);
    };

    loadCourses();
  }, [searchParams]);

  const handleRemoveCourse = (courseId) => {
    const updatedCourses = courses?.filter(course => course?.id !== courseId);
    setCourses(updatedCourses);
    
    // Update URL params
    if (updatedCourses?.length > 0) {
      const courseIds = updatedCourses?.map(course => course?.id)?.join(',');
      navigate(`/course-comparison?courses=${courseIds}`, { replace: true });
    } else {
      navigate('/course-comparison', { replace: true });
    }
  };

  const handleClearAll = () => {
    setCourses([]);
    navigate('/course-comparison', { replace: true });
  };

  const handleAddMore = () => {
    navigate('/course-search-results');
  };

  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Course Comparison', path: '/course-comparison' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading comparison...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ComparisonHeader
        courseCount={courses?.length}
        onClearAll={handleClearAll}
        onAddMore={handleAddMore}
        maxCourses={4}
      />
      <ComparisonTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        courseCount={courses?.length}
      />
      <main className="container px-4 lg:px-6 py-6">
        <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} className="mb-6" />

        {courses?.length === 0 ? (
          <EmptyComparisonState />
        ) : (
          <>
            <ComparisonSummary courses={courses} />
            
            <MobileComparisonView
              courses={courses}
              activeTab={activeTab}
              onRemoveCourse={handleRemoveCourse}
            />
            
            <DesktopComparisonView
              courses={courses}
              activeTab={activeTab}
              onRemoveCourse={handleRemoveCourse}
            />
          </>
        )}
      </main>
      <ComparisonIndicator />
    </div>
  );
};

export default CourseComparison;