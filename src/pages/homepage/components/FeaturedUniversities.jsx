import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedUniversities = () => {
  const navigate = useNavigate();

  const featuredUniversities = [
    {
      id: 1,
      name: "Harvard University",
      location: "Cambridge, MA, USA",
      ranking: "#1 in USA",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      programs: 180,
      acceptanceRate: "3.4%",
      tuitionRange: "$54,000 - $58,000",
      highlights: ["Ivy League", "Research Excellence", "Global Network"],
      description: "World-renowned institution with exceptional academic programs and research opportunities."
    },
    {
      id: 2,
      name: "Stanford University",
      location: "Stanford, CA, USA",
      ranking: "#2 in USA",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
      programs: 150,
      acceptanceRate: "4.3%",
      tuitionRange: "$56,000 - $60,000",
      highlights: ["Silicon Valley", "Innovation Hub", "Tech Leadership"],
      description: "Leading university in technology and innovation with strong industry connections."
    },
    {
      id: 3,
      name: "University of Oxford",
      location: "Oxford, England, UK",
      ranking: "#1 in UK",
      image: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?w=400&h=300&fit=crop",
      programs: 200,
      acceptanceRate: "17.5%",
      tuitionRange: "£28,000 - £45,000",
      highlights: ["Historic Excellence", "Tutorial System", "Global Alumni"],
      description: "One of the world\'s oldest and most prestigious universities with rich academic tradition."
    },
    {
      id: 4,
      name: "MIT",
      location: "Cambridge, MA, USA",
      ranking: "#3 in USA",
      image: "https://images.pixabay.com/photo/2017/05/09/03/46/university-2297312_1280.jpg?w=400&h=300&fit=crop",
      programs: 120,
      acceptanceRate: "6.7%",
      tuitionRange: "$53,000 - $57,000",
      highlights: ["STEM Excellence", "Research Pioneer", "Innovation Culture"],
      description: "Premier institution for science, technology, engineering, and mathematics education."
    },
    {
      id: 5,
      name: "University of Toronto",
      location: "Toronto, ON, Canada",
      ranking: "#1 in Canada",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      programs: 300,
      acceptanceRate: "43%",
      tuitionRange: "CAD $35,000 - $45,000",
      highlights: ["Research Intensive", "Diverse Programs", "International Hub"],
      description: "Canada\'s leading research university with comprehensive academic offerings."
    },
    {
      id: 6,
      name: "University of Melbourne",
      location: "Melbourne, VIC, Australia",
      ranking: "#1 in Australia",
      image: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?w=400&h=300&fit=crop",
      programs: 250,
      acceptanceRate: "70%",
      tuitionRange: "AUD $32,000 - $48,000",
      highlights: ["Group of Eight", "Research Excellence", "Cultural Diversity"],
      description: "Australia\'s premier university known for academic excellence and research innovation."
    }
  ];

  const handleUniversityClick = (university) => {
    navigate('/university-profile', { state: { university } });
  };

  const handleViewAll = () => {
    navigate('/course-search-results?type=universities');
  };

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container px-4 lg:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 lg:mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Featured Universities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore top-ranked institutions from around the world, each offering unique opportunities for academic and personal growth.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleViewAll}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full lg:w-auto"
          >
            View All Universities
          </Button>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredUniversities?.map((university) => (
            <div
              key={university?.id}
              className="bg-card border rounded-xl overflow-hidden hover:shadow-floating transition-all duration-300 cursor-pointer group"
              onClick={() => handleUniversityClick(university)}
            >
              {/* University Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={university?.image}
                  alt={university?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {university?.ranking}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors">
                    <Icon name="Bookmark" size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* University Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {university?.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {university?.location}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {university?.description}
                  </p>
                </div>

                {/* University Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Programs</div>
                    <div className="font-semibold text-foreground">{university?.programs}+</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Acceptance</div>
                    <div className="font-semibold text-foreground">{university?.acceptanceRate}</div>
                  </div>
                </div>

                {/* Tuition Range */}
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">Annual Tuition</div>
                  <div className="font-semibold text-primary">{university?.tuitionRange}</div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {university?.highlights?.slice(0, 2)?.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                  {university?.highlights?.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{university?.highlights?.length - 2} more
                    </span>
                  )}
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
            Can't find what you're looking for?
          </p>
          <Button
            onClick={() => navigate('/course-search-results')}
            iconName="Search"
            iconPosition="left"
          >
            Search All Universities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;