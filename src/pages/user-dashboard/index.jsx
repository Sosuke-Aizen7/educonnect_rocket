import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ComparisonIndicator from '../../components/ui/ComparisonIndicator';
import DashboardStats from './components/DashboardStats';
import BookmarkedCourses from './components/BookmarkedCourses';
import RecentSearches from './components/RecentSearches';
import ActiveComparisons from './components/ActiveComparisons';
import ApplicationStatus from './components/ApplicationStatus';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    bookmarkedCourses: [],
    recentSearches: [],
    activeComparisons: [],
    applications: [],
    notifications: []
  });
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data initialization
  useEffect(() => {
    const mockData = {
      stats: {
        bookmarkedCourses: 12,
        applicationsSubmitted: 5,
        activeComparisons: 3,
        universitiesExplored: 28
      },
      bookmarkedCourses: [
        {
          id: 1,
          title: 'Master of Computer Science',
          university: 'Stanford University',
          image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400',
          fee: '$58,000/year',
          duration: '2 years',
          level: 'Master\'s'
        },
        {
          id: 2,
          title: 'Bachelor of Business Administration',
          university: 'Harvard Business School',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          fee: '$52,000/year',
          duration: '4 years',
          level: 'Bachelor\'s'
        },
        {
          id: 3,
          title: 'PhD in Data Science',
          university: 'MIT',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
          fee: '$55,000/year',
          duration: '5 years',
          level: 'Doctoral'
        }
      ],
      recentSearches: [
        {
          query: 'Computer Science Masters',
          timestamp: '2 hours ago',
          resultCount: 156
        },
        {
          query: 'Business Administration Harvard',
          timestamp: '1 day ago',
          resultCount: 23
        },
        {
          query: 'Data Science PhD programs',
          timestamp: '3 days ago',
          resultCount: 89
        },
        {
          query: 'Engineering courses UK',
          timestamp: '1 week ago',
          resultCount: 234
        }
      ],
      activeComparisons: [
        {
          id: 1,
          title: 'Computer Science Programs',
          createdAt: '2 days ago',
          courses: [
            {
              title: 'MS Computer Science',
              university: 'Stanford',
              image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=200',
              fee: '$58,000/year'
            },
            {
              title: 'MS Computer Science',
              university: 'MIT',
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
              fee: '$55,000/year'
            },
            {
              title: 'MS Computer Science',
              university: 'UC Berkeley',
              image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200',
              fee: '$45,000/year'
            }
          ]
        },
        {
          id: 2,
          title: 'MBA Programs Comparison',
          createdAt: '5 days ago',
          courses: [
            {
              title: 'MBA',
              university: 'Harvard',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
              fee: '$73,000/year'
            },
            {
              title: 'MBA',
              university: 'Wharton',
              image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200',
              fee: '$70,000/year'
            }
          ]
        }
      ],
      applications: [
        {
          id: 1,
          courseTitle: 'Master of Computer Science',
          university: 'Stanford University',
          status: 'Pending',
          appliedDate: 'Dec 15, 2024',
          deadline: 'Jan 15, 2025',
          nextStep: 'Submit transcripts and recommendation letters by January 5th'
        },
        {
          id: 2,
          courseTitle: 'MBA Program',
          university: 'Harvard Business School',
          status: 'Interview',
          appliedDate: 'Nov 20, 2024',
          deadline: 'Jan 30, 2025',
          nextStep: 'Prepare for virtual interview scheduled on January 8th'
        },
        {
          id: 3,
          courseTitle: 'PhD in Data Science',
          university: 'MIT',
          status: 'Accepted',
          appliedDate: 'Oct 10, 2024',
          deadline: null,
          nextStep: 'Complete enrollment process and submit financial documents'
        },
        {
          id: 4,
          courseTitle: 'MS in Engineering',
          university: 'UC Berkeley',
          status: 'Rejected',
          appliedDate: 'Sep 25, 2024',
          deadline: null,
          nextStep: null
        }
      ],
      notifications: [
        {
          id: 1,
          type: 'acceptance',
          title: 'Application Accepted!',
          message: 'Congratulations! Your application to MIT PhD in Data Science has been accepted.',
          timestamp: '2 hours ago',
          read: false,
          important: true
        },
        {
          id: 2,
          type: 'deadline',
          title: 'Application Deadline Reminder',
          message: 'Stanford MS Computer Science application deadline is in 7 days.',
          timestamp: '1 day ago',
          read: false,
          important: true
        },
        {
          id: 3,
          type: 'interview',
          title: 'Interview Scheduled',
          message: 'Your Harvard MBA interview has been scheduled for January 8th at 2:00 PM EST.',
          timestamp: '3 days ago',
          read: true,
          important: false
        },
        {
          id: 4,
          type: 'update',
          title: 'Application Status Update',
          message: 'Your UC Berkeley application status has been updated to "Under Review".',
          timestamp: '5 days ago',
          read: true,
          important: false
        }
      ]
    };

    setDashboardData(mockData);
  }, []);

  const handleRemoveBookmark = (courseId) => {
    setDashboardData(prev => ({
      ...prev,
      bookmarkedCourses: prev?.bookmarkedCourses?.filter(course => course?.id !== courseId),
      stats: {
        ...prev?.stats,
        bookmarkedCourses: prev?.stats?.bookmarkedCourses - 1
      }
    }));
  };

  const handleClearSearchHistory = () => {
    setDashboardData(prev => ({
      ...prev,
      recentSearches: []
    }));
  };

  const handleDeleteComparison = (comparisonId) => {
    setDashboardData(prev => ({
      ...prev,
      activeComparisons: prev?.activeComparisons?.filter(comp => comp?.id !== comparisonId),
      stats: {
        ...prev?.stats,
        activeComparisons: prev?.stats?.activeComparisons - 1
      }
    }));
  };

  const handleMarkAsRead = (notificationId) => {
    setDashboardData(prev => ({
      ...prev,
      notifications: prev?.notifications?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    }));
  };

  const handleMarkAllAsRead = () => {
    setDashboardData(prev => ({
      ...prev,
      notifications: prev?.notifications?.map(notification => ({
        ...notification,
        read: true
      }))
    }));
  };

  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Dashboard', path: '/user-dashboard' }
  ];

  const tabItems = [
    { key: 'overview', label: 'Overview', count: null },
    { key: 'bookmarks', label: 'Bookmarks', count: dashboardData?.bookmarkedCourses?.length },
    { key: 'applications', label: 'Applications', count: dashboardData?.applications?.length },
    { key: 'notifications', label: 'Notifications', count: dashboardData?.notifications?.filter(n => !n?.read)?.length }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - EduConnect</title>
        <meta name="description" content="Manage your saved courses, applications, and university search progress on EduConnect." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-6">
        <div className="mb-6">
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Track your university applications, saved courses, and search progress
            </p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats stats={dashboardData?.stats} />

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabItems?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.key
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  {tab?.label}
                  {tab?.count !== null && tab?.count > 0 && (
                    <span className="ml-2 bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                      {tab?.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <BookmarkedCourses
                    courses={dashboardData?.bookmarkedCourses?.slice(0, 3)}
                    onRemoveBookmark={handleRemoveBookmark}
                  />
                  <ActiveComparisons
                    comparisons={dashboardData?.activeComparisons}
                    onDeleteComparison={handleDeleteComparison}
                  />
                </div>
                <div className="space-y-8">
                  <QuickActions />
                  <RecentSearches
                    searches={dashboardData?.recentSearches?.slice(0, 4)}
                    onClearHistory={handleClearSearchHistory}
                  />
                </div>
              </div>
              <ApplicationStatus applications={dashboardData?.applications?.slice(0, 3)} />
            </>
          )}

          {activeTab === 'bookmarks' && (
            <BookmarkedCourses
              courses={dashboardData?.bookmarkedCourses}
              onRemoveBookmark={handleRemoveBookmark}
            />
          )}

          {activeTab === 'applications' && (
            <ApplicationStatus applications={dashboardData?.applications} />
          )}

          {activeTab === 'notifications' && (
            <NotificationCenter
              notifications={dashboardData?.notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          )}
        </div>
      </main>
      <ComparisonIndicator />
    </div>
  );
};

export default UserDashboard;