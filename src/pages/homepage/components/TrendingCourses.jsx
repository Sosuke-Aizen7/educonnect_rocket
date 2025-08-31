import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TrendingCourses = () => {
  const navigate = useNavigate();

  const trendingCourses = [
    {
      id: 1,
      title: "Master of Science in Data Science",
      university: "Stanford University",
      location: "Stanford, CA, USA",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      duration: "2 years",
      format: "Full-time",
      tuition: "$58,000/year",
      rating: 4.9,
      reviews: 245,
      level: "Graduate",
      category: "Technology",
      highlights: ["Machine Learning", "Big Data Analytics", "AI Research"],
      nextIntake: "Fall 2024",
      trending: true,
      description: "Comprehensive program combining statistical analysis, machine learning, and practical applications in data science."
    },
    {
      id: 2,
      title: "Bachelor of Business Administration",
      university: "Harvard Business School",
      location: "Boston, MA, USA",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=300&fit=crop",
      duration: "4 years",
      format: "Full-time",
      tuition: "$54,000/year",
      rating: 4.8,
      reviews: 892,
      level: "Undergraduate",
      category: "Business",
      highlights: ["Leadership", "Strategy", "Global Business"],
      nextIntake: "Fall 2024",
      trending: true,
      description: "World-class business education focusing on leadership, innovation, and strategic thinking."
    },
    {
      id: 3,
      title: "Master of Engineering in AI",
      university: "MIT",
      location: "Cambridge, MA, USA",
      image: "https://images.pixabay.com/photo/2518/robot-3010309_1280.jpg?w=400&h=300&fit=crop",
      duration: "1.5 years",
      format: "Full-time",
      tuition: "$55,000/year",
      rating: 4.9,
      reviews: 156,
      level: "Graduate",
      category: "Engineering",
      highlights: ["Neural Networks", "Robotics", "Computer Vision"],
      nextIntake: "Spring 2025",
      trending: true,
      description: "Cutting-edge program in artificial intelligence and machine learning applications."
    },
    {
      id: 4,
      title: "Bachelor of Computer Science",
      university: "University of Toronto",
      location: "Toronto, ON, Canada",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      duration: "4 years",
      format: "Full-time",
      tuition: "CAD $38,000/year",
      rating: 4.7,
      reviews: 634,
      level: "Undergraduate",
      category: "Technology",
      highlights: ["Software Development", "Algorithms", "System Design"],
      nextIntake: "Fall 2024",
      trending: false,
      description: "Comprehensive computer science program with strong focus on practical skills and theoretical foundations."
    },
    {
      id: 5,
      title: "Master of Public Health",
      university: "University of Oxford",
      location: "Oxford, England, UK",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?w=400&h=300&fit=crop",
      duration: "1 year",
      format: "Full-time",
      tuition: "£32,000/year",
      rating: 4.6,
      reviews: 298,
      level: "Graduate",
      category: "Health Sciences",
      highlights: ["Epidemiology", "Global Health", "Policy Analysis"],
      nextIntake: "Fall 2024",
      trending: false,
      description: "Intensive program preparing leaders in public health policy and global health initiatives."
    },
    {
      id: 6,
      title: "Bachelor of Medicine",
      university: "University of Melbourne",
      location: "Melbourne, VIC, Australia",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      duration: "6 years",
      format: "Full-time",
      tuition: "AUD $45,000/year",
      rating: 4.8,
      reviews: 421,
      level: "Undergraduate",
      category: "Medicine",
      highlights: ["Clinical Practice", "Research", "Patient Care"],
      nextIntake: "Fall 2024",
      trending: false,
      description: "Comprehensive medical program with extensive clinical training and research opportunities."
    }
  ];

  const handleCourseClick = (course) => {
    navigate('/course-detail', { state: { course } });
  };

  const handleViewAll = () => {
    navigate('/course-search-results?trending=true');
  };

  const handleCompare = (course, event) => {
    event?.stopPropagation();
    // Add to comparison logic would go here
    console.log('Added to comparison:', course?.title);
  };

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container px-4 lg:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 lg:mb-12">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center mb-3">
              <Icon name="TrendingUp" size={28} className="text-accent mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Trending Courses
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover the most popular and in-demand courses that are shaping the future of education and careers.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleViewAll}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full lg:w-auto"
          >
            View All Courses
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trendingCourses?.map((course) => (
            <div
              key={course?.id}
              className="bg-card border rounded-xl overflow-hidden hover:shadow-floating transition-all duration-300 cursor-pointer group"
              onClick={() => handleCourseClick(course)}
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course?.image}
                  alt={course?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {course?.trending && (
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Icon name="TrendingUp" size={12} className="mr-1" />
                      Trending
                    </span>
                  )}
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {course?.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => handleCompare(course, e)}
                    className="bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
                  >
                    <Icon name="GitCompare" size={16} className="text-muted-foreground" />
                  </button>
                  <button className="bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors">
                    <Icon name="Bookmark" size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {course?.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Icon name="GraduationCap" size={14} className="mr-1" />
                    {course?.university}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {course?.location}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course?.description}
                  </p>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Duration</div>
                    <div className="font-semibold text-foreground">{course?.duration}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Format</div>
                    <div className="font-semibold text-foreground">{course?.format}</div>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Icon name="Star" size={16} className="text-accent fill-current mr-1" />
                    <span className="text-sm font-semibold text-foreground">{course?.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({course?.reviews} reviews)
                  </span>
                </div>

                {/* Tuition */}
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">Annual Tuition</div>
                  <div className="font-bold text-primary text-lg">{course?.tuition}</div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course?.highlights?.slice(0, 2)?.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                  {course?.highlights?.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{course?.highlights?.length - 2} more
                    </span>
                  )}
                </div>

                {/* Next Intake */}
                <div className="mb-4">
                  <div className="flex items-center text-sm">
                    <Icon name="Calendar" size={14} className="mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">Next intake: </span>
                    <span className="font-medium text-foreground ml-1">{course?.nextIntake}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Explore thousands more courses across all disciplines
          </p>
          <Button
            onClick={() => navigate('/course-search-results')}
            iconName="Search"
            iconPosition="left"
          >
            Browse All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;