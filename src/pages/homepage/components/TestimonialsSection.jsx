import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Data Scientist at Google",
      university: "Stanford University",
      course: "MS in Data Science",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `EduConnect made my university search incredibly easy. I was able to compare programs from multiple universities and found the perfect Data Science program at Stanford. The detailed course information and comparison tools saved me months of research time.`,
      rating: 5,
      graduationYear: "2023"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Medical Resident",
      university: "Harvard Medical School",
      course: "Doctor of Medicine",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `The platform's comprehensive university profiles helped me understand not just the academic requirements, but also the campus culture and student life. I'm now pursuing my dream of becoming a doctor at Harvard, and I couldn't be happier with my choice.`,
      rating: 5,
      graduationYear: "2024"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Software Engineer at Microsoft",
      university: "University of Toronto",
      course: "Bachelor of Computer Science",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `As an international student, finding the right program was overwhelming. EduConnect's filters for international students and detailed fee breakdowns made everything clear. The University of Toronto was the perfect fit for my goals and budget.`,
      rating: 5,
      graduationYear: "2022"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Business Analyst",
      university: "Oxford University",
      course: "MBA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The comparison feature was a game-changer. I could easily compare MBA programs across different countries and universities. Oxford's program stood out, and now I'm working in strategy consulting with the skills I gained there.`,
      rating: 5,
      graduationYear: "2023"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials?.[currentTestimonial];

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who found their perfect university match through EduConnect
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border rounded-2xl p-8 lg:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Student Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                    src={current?.image}
                    alt={current?.name}
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2">
                    <Icon name="GraduationCap" size={16} />
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Rating */}
                <div className="flex justify-center lg:justify-start items-center mb-4">
                  {[...Array(current?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-foreground mb-6 leading-relaxed">
                  "{current?.content}"
                </blockquote>

                {/* Student Info */}
                <div className="mb-4">
                  <div className="font-bold text-foreground text-lg">{current?.name}</div>
                  <div className="text-muted-foreground">{current?.role}</div>
                </div>

                {/* Education Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Icon name="GraduationCap" size={16} className="mr-2" />
                    {current?.course}
                  </div>
                  <div className="flex items-center">
                    <Icon name="MapPin" size={16} className="mr-2" />
                    {current?.university}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Class of {current?.graduationYear}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial 
                      ? 'bg-primary' :'bg-muted hover:bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-card border rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Student Satisfaction</div>
          </div>
          <div className="bg-card border rounded-xl p-6">
            <div className="text-3xl font-bold text-secondary mb-2">1M+</div>
            <div className="text-muted-foreground">Successful Matches</div>
          </div>
          <div className="bg-card border rounded-xl p-6">
            <div className="text-3xl font-bold text-accent mb-2">85%</div>
            <div className="text-muted-foreground">Admission Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;