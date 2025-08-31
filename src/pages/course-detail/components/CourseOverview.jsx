import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CourseOverview = ({ course }) => {
  return (
    <div className="space-y-8">
      {/* Program Description */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Program Description</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {course?.description}
          </p>
        </div>
      </section>
      {/* Learning Outcomes */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
        <div className="grid gap-3">
          {course?.learningOutcomes?.map((outcome, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{outcome}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Career Prospects */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Career Prospects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {course?.careerProspects?.map((career, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Briefcase" size={16} className="text-primary" />
                <h3 className="font-medium text-foreground">{career?.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{career?.description}</p>
              <div className="text-sm font-medium text-success">{career?.averageSalary}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Student Testimonials */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Student Testimonials</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {course?.testimonials?.map((testimonial, index) => (
            <div key={index} className="p-6 bg-card border rounded-lg">
              <div className="flex items-start space-x-4">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-foreground">{testimonial?.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < testimonial?.rating ? 'text-accent fill-current' : 'text-muted'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial?.program} • Class of {testimonial?.graduationYear}</p>
                  <blockquote className="text-sm text-foreground italic">
                    "{testimonial?.review}"
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Key Features */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {course?.keyFeatures?.map((feature, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <Icon name={feature?.icon} size={32} className="text-primary mx-auto mb-2" />
              <h3 className="font-medium text-foreground mb-1">{feature?.title}</h3>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseOverview;