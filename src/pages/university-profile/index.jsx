import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ComparisonIndicator from '../../components/ui/ComparisonIndicator';
import UniversityHeader from './components/UniversityHeader';
import TabNavigation from './components/TabNavigation';
import AboutSection from './components/AboutSection';
import ProgramsSection from './components/ProgramsSection';
import CampusLifeSection from './components/CampusLifeSection';
import AdmissionsSection from './components/AdmissionsSection';
import RankingsSection from './components/RankingsSection';
import CampusMap from './components/CampusMap';

import Button from '../../components/ui/Button';

const UniversityProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock university data
  const universityData = {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, Massachusetts, USA",
    fullAddress: "Massachusetts Hall, Cambridge, MA 02138, United States",
    coordinates: { lat: 42.3744, lng: -71.1169 },
    established: 1636,
    studentCount: 23000,
    ranking: 3,
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop&crop=center",
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=600&fit=crop&crop=center",
    overview: `Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636 and named for its first benefactor, clergyman John Harvard, Harvard is the oldest institution of higher education in the United States and among the most prestigious in the world.\n\nThe university is organized into eleven separate academic units—ten faculties and the Radcliffe Institute for Advanced Study—with campuses throughout the Boston metropolitan area. Harvard's main campus is centered on Harvard Yard in Cambridge, about 3 miles northwest of downtown Boston.`,
    mission: "To educate the citizens and citizen-leaders for our society through the transformative power of a liberal arts and sciences education.",
    highlights: [
      { icon: "Users", label: "Student-Faculty Ratio", value: "7:1" },
      { icon: "Globe", label: "International Students", value: "25%" },
      { icon: "BookOpen", label: "Academic Programs", value: "50+" },
      { icon: "Award", label: "Nobel Laureates", value: "161" }
    ],
    accreditations: [
      {
        name: "New England Commission of Higher Education",
        description: "Regional accreditation for degree-granting authority"
      },
      {
        name: "Association of American Universities",
        description: "Member of prestigious research university association"
      },
      {
        name: "AACSB International",
        description: "Business school accreditation for Harvard Business School"
      }
    ],
    notableAlumni: [
      {
        name: "Barack Obama",
        achievement: "44th President of the United States",
        field: "Politics & Law",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      {
        name: "Mark Zuckerberg",
        achievement: "Founder & CEO of Meta",
        field: "Technology",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      {
        name: "Natalie Portman",
        achievement: "Academy Award-winning Actress",
        field: "Entertainment",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      }
    ],
    statistics: [
      { label: "Acceptance Rate", value: "3.4%" },
      { label: "Graduation Rate", value: "98%" },
      { label: "Average SAT", value: "1520" },
      { label: "Endowment", value: "$53.2B" }
    ],
    nearbyAmenities: [
      { name: "Harvard Square", icon: "MapPin" },
      { name: "MIT", icon: "GraduationCap" },
      { name: "Boston Common", icon: "Trees" },
      { name: "Logan Airport", icon: "Plane" }
    ]
  };

  const programsData = [
    {
      id: 1,
      name: "Computer Science",
      level: "undergraduate",
      subject: "computer-science",
      department: "School of Engineering and Applied Sciences",
      duration: "4 years",
      tuitionFee: "$54,002/year",
      startDate: "September 2024",
      capacity: 200,
      applicationDeadline: "January 1, 2024",
      description: "A comprehensive program covering algorithms, data structures, software engineering, and computer systems with opportunities for research and internships."
    },
    {
      id: 2,
      name: "Business Administration (MBA)",
      level: "graduate",
      subject: "business",
      department: "Harvard Business School",
      duration: "2 years",
      tuitionFee: "$73,440/year",
      startDate: "September 2024",
      capacity: 935,
      applicationDeadline: "April 2, 2024",
      description: "World-renowned MBA program focusing on general management with case-based learning methodology and global perspective."
    },
    {
      id: 3,
      name: "Medicine (MD)",
      level: "graduate",
      subject: "medicine",
      department: "Harvard Medical School",
      duration: "4 years",
      tuitionFee: "$69,300/year",
      startDate: "August 2024",
      capacity: 165,
      applicationDeadline: "October 15, 2023",
      description: "Rigorous medical education program combining scientific foundation with clinical experience and research opportunities."
    },
    {
      id: 4,
      name: "Economics",
      level: "undergraduate",
      subject: "business",
      department: "Faculty of Arts and Sciences",
      duration: "4 years",
      tuitionFee: "$54,002/year",
      startDate: "September 2024",
      capacity: 150,
      applicationDeadline: "January 1, 2024",
      description: "Comprehensive study of economic theory, policy analysis, and quantitative methods with emphasis on real-world applications."
    }
  ];

  const campusLifeData = {
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop&crop=center",
        caption: "Harvard Yard - Historic heart of campus"
      },
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&crop=center",
        caption: "Widener Library - Main research library"
      },
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&crop=center",
        caption: "Student dormitories in Harvard Yard"
      },
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
        caption: "Science Center - Modern academic facilities"
      }
    ],
    facilities: [
      {
        name: "Widener Library",
        description: "Main research library with over 3.5 million books",
        icon: "BookOpen"
      },
      {
        name: "Harvard Art Museums",
        description: "World-class collection spanning cultures and periods",
        icon: "Palette"
      },
      {
        name: "Malkin Athletic Center",
        description: "State-of-the-art fitness and recreation facilities",
        icon: "Dumbbell"
      },
      {
        name: "Science Center",
        description: "Modern laboratories and lecture halls for STEM programs",
        icon: "Microscope"
      },
      {
        name: "Memorial Hall",
        description: "Historic venue for performances and events",
        icon: "Music"
      },
      {
        name: "Harvard Innovation Labs",
        description: "Entrepreneurship and startup incubation space",
        icon: "Lightbulb"
      }
    ],
    organizations: [
      {
        name: "Harvard Crimson",
        category: "Student Newspaper",
        memberCount: 150
      },
      {
        name: "Harvard Model United Nations",
        category: "Academic Competition",
        memberCount: 200
      },
      {
        name: "Harvard Debate Society",
        category: "Speech & Debate",
        memberCount: 80
      },
      {
        name: "Harvard Undergraduate Research Association",
        category: "Academic Research",
        memberCount: 300
      }
    ],
    accommodation: [
      {
        name: "Freshman Dormitories",
        type: "On-campus housing",
        price: "$11,364",
        capacity: 1600,
        description: "Traditional residence halls in Harvard Yard for first-year students"
      },
      {
        name: "House System",
        type: "Upperclass housing",
        price: "$12,424",
        capacity: 2800,
        description: "12 residential houses providing community and dining for upperclass students"
      },
      {
        name: "Graduate Student Housing",
        type: "Graduate housing",
        price: "$14,200",
        capacity: 1200,
        description: "Apartments and shared housing options for graduate students"
      }
    ],
    dining: [
      {
        name: "Annenberg Hall",
        type: "Freshman dining hall",
        rating: 4,
        hours: "7:00 AM - 10:00 PM",
        description: "Grand dining hall serving all first-year students with diverse menu options"
      },
      {
        name: "House Dining Halls",
        type: "Residential dining",
        rating: 4,
        hours: "7:00 AM - 9:00 PM",
        description: "Individual dining halls in each residential house with unique atmospheres"
      },
      {
        name: "Harvard Square Restaurants",
        type: "Off-campus dining",
        rating: 5,
        hours: "Varies",
        description: "Numerous restaurants, cafes, and food trucks in nearby Harvard Square"
      }
    ]
  };

  const admissionsData = {
    undergraduate: {
      process: [
        {
          title: "Submit Common Application",
          description: "Complete the Common Application with Harvard supplement",
          deadline: "January 1, 2024"
        },
        {
          title: "Standardized Tests",
          description: "Submit SAT or ACT scores (optional for 2024-2025)",
          deadline: "January 1, 2024"
        },
        {
          title: "Letters of Recommendation",
          description: "Two teacher recommendations and one counselor recommendation",
          deadline: "January 1, 2024"
        },
        {
          title: "Interview",
          description: "Optional alumni interview (by invitation only)",
          deadline: "February 15, 2024"
        }
      ],
      requirements: {
        academic: [
          "High school diploma or equivalent",
          "Strong academic record with challenging coursework",
          "4 years of English, 4 years of mathematics",
          "4 years of science, 4 years of social studies",
          "4 years of foreign language recommended"
        ],
        documents: [
          "Official high school transcript",
          "Common Application essay",
          "Harvard supplement essays",
          "Two teacher recommendations",
          "School counselor recommendation",
          "Mid-year school report"
        ],
        language: [
          { test: "TOEFL iBT", score: "100+" },
          { test: "IELTS", score: "7.0+" },
          { test: "Duolingo", score: "125+" }
        ]
      },
      dates: [
        {
          event: "Early Action Deadline",
          description: "Non-binding early application",
          date: "November 1, 2023"
        },
        {
          event: "Regular Decision Deadline",
          description: "Standard application deadline",
          date: "January 1, 2024"
        },
        {
          event: "Decision Release",
          description: "Admission decisions announced",
          date: "Late March 2024"
        },
        {
          event: "Reply Deadline",
          description: "Enrollment deposit due",
          date: "May 1, 2024"
        }
      ],
      fees: {
        domestic: [
          { type: "Tuition", amount: "$54,002" },
          { type: "Room & Board", amount: "$19,502" },
          { type: "Student Services Fee", amount: "$3,193" },
          { type: "Total Cost", amount: "$76,697" }
        ],
        international: [
          { type: "Tuition", amount: "$54,002" },
          { type: "Room & Board", amount: "$19,502" },
          { type: "Student Services Fee", amount: "$3,193" },
          { type: "International Student Fee", amount: "$2,000" },
          { type: "Total Cost", amount: "$78,697" }
        ]
      },
      contact: {
        email: "college@fas.harvard.edu",
        phone: "(617) 495-1551",
        address: "86 Brattle Street, Cambridge, MA 02138",
        hours: "Monday-Friday, 9:00 AM - 5:00 PM"
      }
    },
    graduate: {
      process: [
        {
          title: "Choose Program",
          description: "Select specific graduate program and review requirements",
          deadline: "Varies by program"
        },
        {
          title: "Submit Application",
          description: "Complete online application with program-specific requirements",
          deadline: "December 1 - April 1"
        },
        {
          title: "Graduate Tests",
          description: "Submit GRE, GMAT, LSAT, or MCAT as required",
          deadline: "Varies by program"
        },
        {
          title: "Interview Process",
          description: "Participate in program-specific interview process",
          deadline: "January - March"
        }
      ],
      requirements: {
        academic: [
          "Bachelor\'s degree from accredited institution",
          "Minimum GPA of 3.0 (varies by program)",
          "Relevant undergraduate coursework",
          "Research or professional experience preferred"
        ],
        documents: [
          "Official transcripts from all institutions",
          "Statement of purpose",
          "Three letters of recommendation",
          "Resume or CV",
          "Writing samples (if required)",
          "Portfolio (for applicable programs)"
        ],
        language: [
          { test: "TOEFL iBT", score: "100+" },
          { test: "IELTS", score: "7.0+" }
        ]
      },
      dates: [
        {
          event: "Application Opens",
          description: "Online applications become available",
          date: "September 1, 2023"
        },
        {
          event: "Application Deadlines",
          description: "Varies by program (Dec 1 - Apr 1)",
          date: "December 1, 2023"
        },
        {
          event: "Decision Notifications",
          description: "Admission decisions released",
          date: "March - May 2024"
        },
        {
          event: "Enrollment Deadline",
          description: "Acceptance confirmation due",
          date: "April 30, 2024"
        }
      ],
      fees: {
        domestic: [
          { type: "Tuition (varies by program)", amount: "$51,904 - $73,440" },
          { type: "Health Insurance", amount: "$4,040" },
          { type: "Student Services Fee", amount: "$2,364" },
          { type: "Living Expenses", amount: "$25,000 - $35,000" }
        ],
        international: [
          { type: "Tuition (varies by program)", amount: "$51,904 - $73,440" },
          { type: "Health Insurance", amount: "$4,040" },
          { type: "Student Services Fee", amount: "$2,364" },
          { type: "International Student Fee", amount: "$2,500" },
          { type: "Living Expenses", amount: "$25,000 - $35,000" }
        ]
      },
      contact: {
        email: "admissions@harvard.edu",
        phone: "(617) 495-5315",
        address: "Richard A. and Susan F. Smith Campus Center, Cambridge, MA 02138",
        hours: "Monday-Friday, 9:00 AM - 5:00 PM"
      }
    },
    doctoral: {
      process: [
        {
          title: "Research Programs",
          description: "Identify faculty and research areas of interest",
          deadline: "Before application"
        },
        {
          title: "Submit Application",
          description: "Complete comprehensive doctoral application",
          deadline: "December 1 - 15"
        },
        {
          title: "Research Proposal",
          description: "Submit detailed research proposal and writing samples",
          deadline: "December 1 - 15"
        },
        {
          title: "Faculty Interview",
          description: "Interview with potential faculty advisors",
          deadline: "February - March"
        }
      ],
      requirements: {
        academic: [
          "Master's degree preferred (some programs accept bachelor's)",
          "Minimum GPA of 3.5",
          "Strong research background",
          "Publications or research experience preferred"
        ],
        documents: [
          "Official transcripts from all institutions",
          "Research statement",
          "Three academic letters of recommendation",
          "CV with research experience",
          "Writing samples or publications",
          "Research proposal"
        ],
        language: [
          { test: "TOEFL iBT", score: "100+" },
          { test: "IELTS", score: "7.5+" }
        ]
      },
      dates: [
        {
          event: "Application Deadline",
          description: "All materials due",
          date: "December 1-15, 2023"
        },
        {
          event: "Interview Period",
          description: "Faculty interviews conducted",
          date: "February - March 2024"
        },
        {
          event: "Admission Decisions",
          description: "Acceptance notifications sent",
          date: "April 2024"
        },
        {
          event: "Enrollment Confirmation",
          description: "Final enrollment decision",
          date: "April 30, 2024"
        }
      ],
      fees: {
        domestic: [
          { type: "Tuition", amount: "$51,904" },
          { type: "Health Insurance", amount: "$4,040" },
          { type: "Student Services Fee", amount: "$2,364" },
          { type: "Research Fees", amount: "$1,500" }
        ],
        international: [
          { type: "Tuition", amount: "$51,904" },
          { type: "Health Insurance", amount: "$4,040" },
          { type: "Student Services Fee", amount: "$2,364" },
          { type: "International Student Fee", amount: "$2,500" },
          { type: "Research Fees", amount: "$1,500" }
        ]
      },
      contact: {
        email: "gsas@harvard.edu",
        phone: "(617) 495-5396",
        address: "Graduate School of Arts and Sciences, Cambridge, MA 02138",
        hours: "Monday-Friday, 9:00 AM - 5:00 PM"
      }
    }
  };

  const rankingsData = {
    global: [
      {
        source: "QS World University Rankings",
        rank: 5,
        category: "Overall",
        year: 2024,
        change: 1
      },
      {
        source: "Times Higher Education",
        rank: 2,
        category: "Overall",
        year: 2024,
        change: 0
      },
      {
        source: "Academic Ranking of World Universities",
        rank: 1,
        category: "Overall",
        year: 2023,
        change: 0
      },
      {
        source: "US News & World Report",
        rank: 3,
        category: "National Universities",
        year: 2024,
        change: -1
      }
    ],
    subjects: [
      {
        subject: "Medicine",
        source: "QS World University Rankings",
        rank: 1,
        year: 2024,
        change: 0
      },
      {
        subject: "Law",
        source: "QS World University Rankings",
        rank: 3,
        year: 2024,
        change: 1
      },
      {
        subject: "Business & Management",
        source: "QS World University Rankings",
        rank: 4,
        year: 2024,
        change: -1
      },
      {
        subject: "Computer Science",
        source: "QS World University Rankings",
        rank: 8,
        year: 2024,
        change: 2
      }
    ],
    achievements: [
      {
        title: "Most Nobel Prize Winners",
        description: "161 Nobel laureates affiliated with Harvard University",
        year: 2023,
        source: "Nobel Prize Organization"
      },
      {
        title: "Largest Academic Library System",
        description: "17 million books, manuscripts, and other materials",
        year: 2023,
        source: "Association of Research Libraries"
      },
      {
        title: "Highest University Endowment",
        description: "$53.2 billion endowment fund",
        year: 2023,
        source: "National Association of College and University Business Officers"
      }
    ],
    research: [
      {
        label: "Research Publications",
        value: "15,000+",
        icon: "FileText",
        percentile: 99
      },
      {
        label: "Citations per Faculty",
        value: "45.2",
        icon: "Quote",
        percentile: 98
      },
      {
        label: "Research Funding",
        value: "$1.2B",
        icon: "DollarSign",
        percentile: 99
      },
      {
        label: "Patent Applications",
        value: "250+",
        icon: "Award",
        percentile: 95
      }
    ]
  };

  const tabs = [
    { id: 'about', label: 'About', icon: 'Info' },
    { id: 'programs', label: 'Programs', icon: 'BookOpen', count: programsData?.length },
    { id: 'admissions', label: 'Admissions', icon: 'FileText' },
    { id: 'campus-life', label: 'Campus Life', icon: 'Users' },
    { id: 'rankings', label: 'Rankings', icon: 'Trophy' }
  ];

  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Universities', path: '/university-profile' },
    { label: universityData?.name, path: '/university-profile' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleContactAdmissions = () => {
    // Simulate contact action
    alert('Redirecting to admissions contact form...');
  };

  const handleDownloadProspectus = () => {
    // Simulate download action
    alert('Downloading university prospectus...');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection university={universityData} />;
      case 'programs':
        return <ProgramsSection programs={programsData} />;
      case 'admissions':
        return <AdmissionsSection admissions={admissionsData} />;
      case 'campus-life':
        return <CampusLifeSection campusLife={campusLifeData} />;
      case 'rankings':
        return <RankingsSection rankings={rankingsData} />;
      default:
        return <AboutSection university={universityData} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading university profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Breadcrumb Navigation */}
      <div className="container px-4 py-4">
        <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
      </div>
      {/* University Header */}
      <UniversityHeader
        university={universityData}
        onContactAdmissions={handleContactAdmissions}
        onDownloadProspectus={handleDownloadProspectus}
      />
      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />
      {/* Main Content */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-card rounded-lg p-6 border sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  iconName="BookOpen"
                  iconPosition="left"
                  onClick={() => navigate('/course-search-results')}
                >
                  View All Courses
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  iconName="GitCompare"
                  iconPosition="left"
                  onClick={() => navigate('/course-comparison')}
                >
                  Compare Universities
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  iconName="Bookmark"
                  iconPosition="left"
                >
                  Save University
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Profile
                </Button>
              </div>
            </div>

            {/* Campus Map */}
            <CampusMap university={universityData} />

            {/* Quick Stats */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Founded</span>
                  <span className="font-medium text-foreground">{universityData?.established}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Students</span>
                  <span className="font-medium text-foreground">{universityData?.studentCount?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Global Rank</span>
                  <span className="font-medium text-foreground">#{universityData?.ranking}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Programs</span>
                  <span className="font-medium text-foreground">{programsData?.length}+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Comparison Indicator */}
      <ComparisonIndicator />
    </div>
  );
};

export default UniversityProfile;