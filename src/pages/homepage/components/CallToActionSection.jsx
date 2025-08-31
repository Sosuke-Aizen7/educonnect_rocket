import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CallToActionSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "Search",
      title: "Smart Search",
      description: "Find courses with advanced filters and AI-powered recommendations"
    },
    {
      icon: "GitCompare",
      title: "Easy Comparison",
      description: "Compare programs side-by-side to make informed decisions"
    },
    {
      icon: "BookOpen",
      title: "Detailed Insights",
      description: "Get comprehensive information about courses and universities"
    },
    {
      icon: "Users",
      title: "Expert Guidance",
      description: "Access counselor support and student community"
    }
  ];

  const handleGetStarted = () => {
    navigate('/course-search-results');
  };

  const handleCreateAccount = () => {
    navigate('/user-dashboard');
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="container px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA Content */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ready to Find Your
              <span className="text-primary block lg:inline lg:ml-3">
                Perfect University?
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join over 1 million students who have successfully found their ideal educational path through EduConnect. Start your journey today with our comprehensive platform.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                onClick={handleGetStarted}
                iconName="Search"
                iconPosition="left"
                className="w-full sm:w-auto text-lg px-8 py-4"
              >
                Start Exploring Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleCreateAccount}
                iconName="UserPlus"
                iconPosition="left"
                className="w-full sm:w-auto text-lg px-8 py-4"
              >
                Create Free Account
              </Button>
            </div>

            {/* Trust Indicator */}
            <p className="text-sm text-muted-foreground">
              ✓ Free to use • ✓ No hidden fees • ✓ Trusted by 1M+ students
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {features?.map((feature, index) => (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm border rounded-xl p-6 text-center hover:shadow-floating transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="bg-card border rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Still have questions?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our education counselors are here to help you navigate your university selection process. Get personalized guidance and expert advice.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Chat with Counselor
                  </Button>
                  <Button
                    variant="ghost"
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Schedule Call
                  </Button>
                </div>
              </div>

              {/* Right Content - Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Available 24/7</div>
                    <div className="text-sm text-muted-foreground">Get support anytime</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Icon name="Globe" size={20} className="text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Global Coverage</div>
                    <div className="text-sm text-muted-foreground">Universities worldwide</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Trusted Platform</div>
                    <div className="text-sm text-muted-foreground">Verified information</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;