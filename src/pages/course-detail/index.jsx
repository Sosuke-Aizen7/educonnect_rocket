import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ComparisonIndicator from '../../components/ui/ComparisonIndicator';
import CourseHeader from './components/CourseHeader';
import CourseTabNavigation from './components/CourseTabNavigation';
import CourseOverview from './components/CourseOverview';
import CourseCurriculum from './components/CourseCurriculum';
import CourseRequirements from './components/CourseRequirements';
import CourseFeesAndFunding from './components/CourseFeesAndFunding';
import CourseApplication from './components/CourseApplication';
import UniversityProfileSidebar from './components/UniversityProfileSidebar';
import RelatedCoursesCarousel from './components/RelatedCoursesCarousel';
import StickyActionBar from './components/StickyActionBar';

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInComparison, setIsInComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock course data
  const courseData = {
    id: 1,
    title: "Master of Science in Computer Science",
    university: "Stanford University",
    location: "Stanford, CA, USA",
    rating: 4.8,
    reviewCount: 1247,
    duration: "2 years",
    fee: "$58,416",
    startDate: "Sep 2024",
    applicationDeadline: "Dec 15, 2024",
    applicationDeadlineDate: "2024-12-15T23:59:59",
    daysUntilDeadline: 45,
    description: `The Master of Science in Computer Science program at Stanford University provides students with advanced knowledge and skills in computer science theory and practice. This comprehensive program covers cutting-edge topics including artificial intelligence, machine learning, distributed systems, human-computer interaction, and software engineering.\n\nOur curriculum is designed to prepare students for leadership roles in technology companies, research institutions, and entrepreneurial ventures. Students work closely with world-renowned faculty on groundbreaking research projects and have access to state-of-the-art facilities and resources.`,
    learningOutcomes: [
      "Develop expertise in advanced algorithms, data structures, and computational complexity",
      "Master machine learning techniques and artificial intelligence applications",
      "Design and implement large-scale distributed systems and databases",
      "Conduct independent research and contribute to the field of computer science",
      "Apply software engineering principles to build robust, scalable applications",
      "Understand ethical implications of technology and responsible computing practices"
    ],
    careerProspects: [
      {
        title: "Software Engineer",
        description: "Design and develop software applications and systems",
        averageSalary: "$145,000 - $200,000"
      },
      {
        title: "Data Scientist",
        description: "Analyze complex data to drive business decisions",
        averageSalary: "$130,000 - $180,000"
      },
      {
        title: "Research Scientist",
        description: "Conduct cutting-edge research in AI and ML",
        averageSalary: "$160,000 - $220,000"
      },
      {
        title: "Product Manager",
        description: "Lead technical product development and strategy",
        averageSalary: "$140,000 - $190,000"
      },
      {
        title: "Engineering Manager",
        description: "Lead engineering teams and technical initiatives",
        averageSalary: "$170,000 - $250,000"
      },
      {
        title: "Startup Founder",
        description: "Launch and scale technology companies",
        averageSalary: "Variable equity-based"
      }
    ],
    testimonials: [
      {
        name: "Sarah Chen",
        program: "MS Computer Science",
        graduationYear: 2023,
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        review: "The program exceeded my expectations. The faculty are world-class researchers who are genuinely invested in student success. The hands-on projects and research opportunities prepared me perfectly for my role at Google."
      },
      {
        name: "Michael Rodriguez",
        program: "MS Computer Science",
        graduationYear: 2022,
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        review: "Stanford's CS program opened doors I never imagined. The network of alumni and the reputation of the program have been invaluable in my career. The coursework is challenging but incredibly rewarding."
      }
    ],
    keyFeatures: [
      {
        icon: "Users",
        title: "Small Class Sizes",
        description: "Average 15 students per class"
      },
      {
        icon: "Award",
        title: "Top Rankings",
        description: "#1 CS program globally"
      },
      {
        icon: "Building",
        title: "Research Labs",
        description: "Access to 20+ research labs"
      },
      {
        icon: "Briefcase",
        title: "Career Support",
        description: "98% job placement rate"
      }
    ]
  };

  // Mock curriculum data
  const curriculumData = [
    {
      title: "Semester 1 - Fall",
      duration: "15 weeks",
      modules: [
        {
          name: "Advanced Algorithms",
          description: "In-depth study of algorithm design and analysis techniques",
          credits: 3,
          type: "Core",
          topics: ["Dynamic Programming", "Graph Algorithms", "Network Flows", "Approximation Algorithms"],
          assessment: "Assignments (40%), Midterm (25%), Final (35%)"
        },
        {
          name: "Machine Learning",
          description: "Fundamental concepts and techniques in machine learning",
          credits: 3,
          type: "Core",
          topics: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Deep Learning"],
          assessment: "Projects (50%), Exams (50%)"
        },
        {
          name: "Systems Programming",
          description: "Low-level programming and system design principles",
          credits: 3,
          type: "Core",
          topics: ["Memory Management", "Concurrency", "File Systems", "Network Programming"],
          assessment: "Programming Assignments (60%), Final Project (40%)"
        }
      ]
    },
    {
      title: "Semester 2 - Spring",
      duration: "15 weeks",
      modules: [
        {
          name: "Database Systems",
          description: "Design and implementation of database management systems",
          credits: 3,
          type: "Core",
          topics: ["Relational Model", "Query Processing", "Transaction Management", "Distributed Databases"],
          assessment: "Assignments (45%), Project (35%), Final (20%)"
        },
        {
          name: "Computer Networks",
          description: "Principles and protocols of computer networking",
          credits: 3,
          type: "Core",
          topics: ["TCP/IP", "Routing Protocols", "Network Security", "Wireless Networks"],
          assessment: "Labs (40%), Midterm (25%), Final (35%)"
        },
        {
          name: "Elective Course",
          description: "Choose from 20+ specialized electives",
          credits: 3,
          type: "Elective",
          topics: ["AI", "HCI", "Security", "Graphics", "Robotics"],
          assessment: "Varies by course"
        }
      ]
    },
    {
      title: "Semester 3 - Fall",
      duration: "15 weeks",
      modules: [
        {
          name: "Advanced Machine Learning",
          description: "Cutting-edge ML techniques and research topics",
          credits: 3,
          type: "Specialization",
          topics: ["Reinforcement Learning", "Generative Models", "Meta-Learning", "Federated Learning"],
          assessment: "Research Project (60%), Presentations (40%)"
        },
        {
          name: "Distributed Systems",
          description: "Design and implementation of large-scale distributed systems",
          credits: 3,
          type: "Specialization",
          topics: ["Consensus Algorithms", "Fault Tolerance", "Scalability", "Cloud Computing"],
          assessment: "System Implementation (70%), Report (30%)"
        },
        {
          name: "Research Methods",
          description: "Methodology for conducting computer science research",
          credits: 2,
          type: "Core",
          topics: ["Literature Review", "Experimental Design", "Statistical Analysis", "Paper Writing"],
          assessment: "Research Proposal (100%)"
        }
      ]
    },
    {
      title: "Semester 4 - Spring",
      duration: "15 weeks",
      modules: [
        {
          name: "Master\'s Thesis",
          description: "Independent research project under faculty supervision",
          credits: 6,
          type: "Thesis",
          topics: ["Original Research", "Implementation", "Evaluation", "Documentation"],
          assessment: "Thesis Defense (100%)"
        },
        {
          name: "Advanced Elective",
          description: "Specialized course in chosen research area",
          credits: 3,
          type: "Elective",
          topics: ["Varies by specialization"],
          assessment: "Varies by course"
        }
      ]
    }
  ];

  // Mock requirements data
  const requirementsData = {
    academic: {
      minimum: [
        "Bachelor\'s degree in Computer Science or related field with GPA ≥ 3.5",
        "Strong background in mathematics including calculus, linear algebra, and statistics",
        "Programming experience in at least two languages (Python, Java, C++, etc.)",
        "Completed coursework in data structures and algorithms"
      ],
      preferred: [
        "Research experience or publications in computer science",
        "Industry experience in software development or related field",
        "Advanced coursework in machine learning, AI, or systems",
        "Open source contributions or personal projects"
      ]
    },
    language: [
      {
        test: "TOEFL iBT",
        minimumScore: "100",
        breakdown: "Reading: 22, Listening: 22, Speaking: 22, Writing: 22"
      },
      {
        test: "IELTS Academic",
        minimumScore: "7.0",
        breakdown: "All bands minimum 6.5"
      },
      {
        test: "Duolingo",
        minimumScore: "125",
        breakdown: "All subscores minimum 115"
      }
    ],
    documents: [
      {
        name: "Official Transcripts",
        description: "From all universities attended",
        icon: "FileText",
        required: true
      },
      {
        name: "Letters of Recommendation",
        description: "3 letters from academic or professional references",
        icon: "Mail",
        required: true
      },
      {
        name: "Statement of Purpose",
        description: "2-page essay outlining research interests and goals",
        icon: "Edit",
        required: true
      },
      {
        name: "Resume/CV",
        description: "Current academic and professional experience",
        icon: "User",
        required: true
      },
      {
        name: "GRE Scores",
        description: "General GRE test scores (optional but recommended)",
        icon: "Award",
        required: false
      },
      {
        name: "Portfolio",
        description: "Code samples, projects, or research work",
        icon: "Folder",
        required: false
      }
    ],
    additional: [
      {
        title: "Interview Process",
        description: "Selected candidates may be invited for a virtual interview with faculty members",
        deadline: "January 2025"
      },
      {
        title: "Background Check",
        description: "International students must provide police clearance certificates",
        deadline: "Upon admission"
      }
    ],
    timeline: [
      {
        title: "Application Opens",
        description: "Online application portal becomes available",
        date: "September 1, 2024",
        completed: true
      },
      {
        title: "Early Decision Deadline",
        description: "Submit application for early consideration",
        date: "November 15, 2024",
        completed: true
      },
      {
        title: "Regular Decision Deadline",
        description: "Final deadline for application submission",
        date: "December 15, 2024",
        current: true
      },
      {
        title: "Admission Decisions",
        description: "Applicants notified of admission status",
        date: "March 15, 2025"
      },
      {
        title: "Enrollment Deadline",
        description: "Confirm enrollment and pay deposit",
        date: "April 30, 2025"
      }
    ],
    notes: [
      "All documents must be submitted in English or with certified translations",
      "Application fee of $125 is required and non-refundable",
      "Late applications may be considered on a space-available basis",
      "International students should apply for visas immediately upon admission"
    ]
  };

  // Mock fees data
  const feesData = {
    tuition: {
      domestic: 52416,
      international: 58416
    },
    additional: [
      { name: "Student Services Fee", amount: 672 },
      { name: "Health Insurance", amount: 5592 },
      { name: "Recreation Fee", amount: 283 },
      { name: "Technology Fee", amount: 150 }
    ],
    scholarships: [
      {
        name: "Stanford Graduate Fellowship",
        amount: "Full Tuition + $45,000 stipend",
        description: "Merit-based fellowship for exceptional students covering full tuition and living expenses",
        eligibility: [
          "Outstanding academic record (GPA ≥ 3.8)",
          "Demonstrated research potential",
          "Strong letters of recommendation",
          "US citizens and permanent residents only"
        ],
        deadline: "December 1, 2024"
      },
      {
        name: "International Student Scholarship",
        amount: "Up to $25,000",
        description: "Need and merit-based scholarship for international students",
        eligibility: [
          "International student status",
          "Demonstrated financial need",
          "Academic excellence (GPA ≥ 3.6)",
          "Leadership experience"
        ],
        deadline: "January 15, 2025"
      },
      {
        name: "Diversity in Tech Scholarship",
        amount: "$15,000",
        description: "Supporting underrepresented groups in computer science",
        eligibility: [
          "Member of underrepresented group in tech",
          "Commitment to diversity and inclusion",
          "Academic merit (GPA ≥ 3.5)",
          "Community involvement"
        ],
        deadline: "February 1, 2025"
      }
    ],
    paymentOptions: [
      {
        name: "Semester Payment",
        description: "Pay tuition at the beginning of each semester",
        icon: "Calendar",
        benefits: "No additional fees"
      },
      {
        name: "Monthly Payment Plan",
        description: "Spread payments over 10 months",
        icon: "CreditCard",
        benefits: "Small processing fee applies"
      },
      {
        name: "Annual Payment",
        description: "Pay full year tuition upfront",
        icon: "DollarSign",
        benefits: "2% discount on tuition"
      }
    ]
  };

  // Mock application data
  const applicationData = {
    deadline: "December 15, 2024",
    daysLeft: 45,
    processingTime: "8-12 weeks",
    applicationFee: "$125",
    steps: [
      {
        title: "Create Online Account",
        description: "Register on the Stanford Graduate Admissions portal and complete your profile",
        estimatedTime: "10 minutes",
        requirements: [
          "Valid email address",
          "Personal information",
          "Academic history"
        ],
        actionText: "Create Account",
        actionIcon: "UserPlus",
        helpLink: true
      },
      {
        title: "Complete Application Form",
        description: "Fill out the comprehensive application form with academic and personal details",
        estimatedTime: "45 minutes",
        requirements: [
          "Academic transcripts information",
          "Test scores (GRE, TOEFL/IELTS)",
          "Work experience details",
          "Research interests"
        ],
        actionText: "Start Application",
        actionIcon: "Edit",
        helpLink: true
      },
      {
        title: "Upload Documents",
        description: "Submit all required documents including transcripts, recommendations, and essays",
        estimatedTime: "2 hours",
        requirements: [
          "Official transcripts (PDF)",
          "Statement of Purpose (2 pages)",
          "Resume/CV",
          "Letters of recommendation (3)"
        ],
        actionText: "Upload Documents",
        actionIcon: "Upload",
        helpLink: true
      },
      {
        title: "Pay Application Fee",
        description: "Submit the non-refundable application fee to complete your submission",
        estimatedTime: "5 minutes",
        requirements: [
          "Credit/debit card",
          "Application fee: $125",
          "Fee waiver (if applicable)"
        ],
        actionText: "Pay Fee",
        actionIcon: "CreditCard",
        helpLink: false
      },
      {
        title: "Submit Application",
        description: "Review all information and submit your complete application before the deadline",
        estimatedTime: "15 minutes",
        requirements: [
          "All sections completed",
          "Documents uploaded",
          "Fee payment confirmed"
        ],
        actionText: "Submit Application",
        actionIcon: "Send",
        helpLink: false
      }
    ],
    checklist: [
      "Bachelor\'s degree in Computer Science or related field",
      "GPA of 3.5 or higher",
      "GRE General Test scores",
      "TOEFL/IELTS scores (international students)",
      "Three letters of recommendation",
      "Statement of Purpose (2 pages)",
      "Current resume or CV",
      "Official transcripts from all institutions",
      "Application fee payment ($125)",
      "Portfolio of work (optional but recommended)"
    ],
    importantDates: [
      {
        event: "Application Deadline",
        date: "Dec 15, 2024",
        note: "11:59 PM PST"
      },
      {
        event: "Interview Invitations",
        date: "Jan 15, 2025",
        note: "Selected candidates only"
      },
      {
        event: "Admission Decisions",
        date: "Mar 15, 2025",
        note: "Notification via email"
      },
      {
        event: "Enrollment Deadline",
        date: "Apr 30, 2025",
        note: "Confirm with deposit"
      },
      {
        event: "Orientation Begins",
        date: "Aug 25, 2025",
        note: "New student orientation"
      },
      {
        event: "Classes Start",
        date: "Sep 2, 2025",
        note: "Fall semester begins"
      }
    ],
    contact: {
      phone: "+1 (650) 723-4291",
      email: "gradadmissions@cs.stanford.edu",
      hours: "Mon-Fri, 9:00 AM - 5:00 PM PST"
    }
  };

  // Mock university data
  const universityData = {
    name: "Stanford University",
    location: "Stanford, CA, USA",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=80&h=80&fit=crop&crop=center",
    rating: 4.9,
    reviewCount: 3247,
    statistics: [
      { icon: "Users", label: "Total Students", value: "17,249" },
      { icon: "GraduationCap", label: "Faculty", value: "2,240" },
      { icon: "Award", label: "Nobel Laureates", value: "84" },
      { icon: "Globe", label: "Countries", value: "91" },
      { icon: "Building", label: "Founded", value: "1885" },
      { icon: "MapPin", label: "Campus Size", value: "8,180 acres" }
    ],
    rankings: [
      {
        organization: "QS World Rankings",
        category: "Computer Science",
        rank: 1,
        year: "2024"
      },
      {
        organization: "US News",
        category: "Graduate CS",
        rank: 1,
        year: "2024"
      },
      {
        organization: "Times Higher Ed",
        category: "Engineering",
        rank: 2,
        year: "2024"
      }
    ],
    accreditations: [
      "WASC Senior",
      "ABET",
      "AACSB",
      "LCME"
    ],
    campusImages: [
      {
        url: "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=300&fit=crop&crop=center",
        caption: "Main Quad"
      },
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop&crop=center",
        caption: "Library"
      },
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=300&fit=crop&crop=center",
        caption: "Student Center"
      },
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
        caption: "Research Labs"
      }
    ],
    quickFacts: [
      { label: "Student-Faculty Ratio", value: "7:1" },
      { label: "Acceptance Rate", value: "4.3%" },
      { label: "Average Class Size", value: "15 students" },
      { label: "Research Expenditure", value: "$1.6B annually" },
      { label: "Alumni Network", value: "250,000+ worldwide" }
    ],
    contact: {
      phone: "+1 (650) 723-2300",
      email: "admission@stanford.edu",
      address: "450 Serra Mall, Stanford, CA 94305, USA"
    },
    socialMedia: [
      { icon: "Facebook", url: "#" },
      { icon: "Twitter", url: "#" },
      { icon: "Instagram", url: "#" },
      { icon: "Linkedin", url: "#" }
    ]
  };

  // Mock related courses
  const relatedCourses = [
    {
      id: 2,
      title: "Master of Science in Artificial Intelligence",
      university: "MIT",
      universityLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=40&h=40&fit=crop&crop=center",
      location: "Cambridge, MA",
      duration: "2 years",
      fee: "$55,510",
      nextIntake: "Sep 2024",
      rating: 4.7,
      reviewCount: 892,
      level: "Master\'s",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "MS in Data Science",
      university: "UC Berkeley",
      universityLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=40&h=40&fit=crop&crop=center",
      location: "Berkeley, CA",
      duration: "20 months",
      fee: "$62,000",
      nextIntake: "Jan 2025",
      rating: 4.6,
      reviewCount: 654,
      level: "Master\'s",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Master in Machine Learning",
      university: "Carnegie Mellon",
      universityLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=40&h=40&fit=crop&crop=center",
      location: "Pittsburgh, PA",
      duration: "2 years",
      fee: "$59,800",
      nextIntake: "Aug 2024",
      rating: 4.8,
      reviewCount: 743,
      level: "Master\'s",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "MS in Software Engineering",
      university: "University of Washington",
      universityLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=40&h=40&fit=crop&crop=center",
      location: "Seattle, WA",
      duration: "18 months",
      fee: "$45,300",
      nextIntake: "Sep 2024",
      rating: 4.5,
      reviewCount: 521,
      level: "Master\'s",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "MS in Cybersecurity",
      university: "Georgia Tech",
      universityLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=40&h=40&fit=crop&crop=center",
      location: "Atlanta, GA",
      duration: "2 years",
      fee: "$41,200",
      nextIntake: "Jan 2025",
      rating: 4.4,
      reviewCount: 398,
      level: "Master\'s",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop&crop=center"
    }
  ];

  // Custom breadcrumbs
  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Search Results', path: '/course-search-results' },
    { label: courseData?.title, path: '/course-detail' }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle actions
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCompare = () => {
    setIsInComparison(!isInComparison);
  };

  const handleApply = () => {
    // Navigate to application or open external link
    window.open('https://gradadmissions.stanford.edu/apply', '_blank');
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CourseOverview course={courseData} />;
      case 'curriculum':
        return <CourseCurriculum curriculum={curriculumData} />;
      case 'requirements':
        return <CourseRequirements requirements={requirementsData} />;
      case 'fees':
        return <CourseFeesAndFunding feesData={feesData} />;
      case 'application':
        return <CourseApplication applicationData={applicationData} />;
      default:
        return <CourseOverview course={courseData} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{courseData?.title} - {courseData?.university} | EduConnect</title>
        <meta name="description" content={`Explore ${courseData?.title} at ${courseData?.university}. Duration: ${courseData?.duration}, Fee: ${courseData?.fee}. Apply now for ${courseData?.startDate} intake.`} />
        <meta name="keywords" content={`${courseData?.title}, ${courseData?.university}, computer science, master's degree, ${courseData?.location}`} />
      </Helmet>
      <Header />
      {/* Breadcrumb Navigation */}
      <div className="container px-4 lg:px-6 py-4">
        <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
      </div>
      {/* Course Header */}
      <CourseHeader
        course={courseData}
        onBookmark={handleBookmark}
        onCompare={handleCompare}
        onApply={handleApply}
        isBookmarked={isBookmarked}
        isInComparison={isInComparison}
      />
      {/* Tab Navigation */}
      <CourseTabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="sticky top-16 z-30"
      />
      {/* Main Content */}
      <div className="container px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border p-6">
              {renderTabContent()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <UniversityProfileSidebar university={universityData} />
            </div>
          </div>
        </div>
      </div>
      {/* Related Courses */}
      <div className="container px-4 lg:px-6 pb-8">
        <RelatedCoursesCarousel courses={relatedCourses} />
      </div>
      {/* Sticky Action Bar */}
      <StickyActionBar
        course={courseData}
        onBookmark={handleBookmark}
        onCompare={handleCompare}
        onApply={handleApply}
        isBookmarked={isBookmarked}
        isInComparison={isInComparison}
      />
      {/* Comparison Indicator */}
      <ComparisonIndicator />
    </div>
  );
};

export default CourseDetail;