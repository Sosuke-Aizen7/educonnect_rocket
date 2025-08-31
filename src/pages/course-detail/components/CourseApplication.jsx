import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseApplication = ({ applicationData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const markStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted?.add(stepIndex);
    setCompletedSteps(newCompleted);
  };

  return (
    <div className="space-y-8">
      {/* Application Overview */}
      <section className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Application Process</h2>
            <p className="text-muted-foreground">
              Follow these steps to complete your application for this program.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{applicationData?.daysLeft}</div>
            <div className="text-sm text-muted-foreground">days left to apply</div>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{applicationData?.deadline}</div>
            <div className="text-sm text-muted-foreground">Application Deadline</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{applicationData?.processingTime}</div>
            <div className="text-sm text-muted-foreground">Processing Time</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{applicationData?.applicationFee}</div>
            <div className="text-sm text-muted-foreground">Application Fee</div>
          </div>
        </div>
      </section>
      {/* Application Steps */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-6">Step-by-Step Guide</h3>
        <div className="space-y-6">
          {applicationData?.steps?.map((step, index) => {
            const isCompleted = completedSteps?.has(index);
            const isCurrent = currentStep === index;
            
            return (
              <div key={index} className="relative">
                <div className={`p-6 rounded-lg border transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-success/5 border-success/20' 
                    : isCurrent 
                    ? 'bg-primary/5 border-primary/20' :'bg-card border-border'
                }`}>
                  <div className="flex items-start space-x-4">
                    {/* Step Number/Status */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted 
                        ? 'bg-success text-success-foreground' 
                        : isCurrent 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-medium text-foreground">{step?.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Clock" size={14} />
                          <span>{step?.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{step?.description}</p>

                      {/* Requirements */}
                      {step?.requirements && step?.requirements?.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-foreground mb-2">Requirements:</h5>
                          <ul className="space-y-1">
                            {step?.requirements?.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start space-x-2">
                                <Icon name="Dot" size={16} className="text-primary mt-1 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        {!isCompleted && (
                          <>
                            <Button
                              variant={isCurrent ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                setCurrentStep(index);
                                // Simulate step completion after action
                                setTimeout(() => markStepComplete(index), 1000);
                              }}
                              iconName={step?.actionIcon}
                              iconPosition="left"
                            >
                              {step?.actionText}
                            </Button>
                            {step?.helpLink && (
                              <button className="text-sm text-primary hover:text-primary/80">
                                Need help? →
                              </button>
                            )}
                          </>
                        )}
                        {isCompleted && (
                          <div className="flex items-center space-x-2 text-success">
                            <Icon name="CheckCircle" size={16} />
                            <span className="text-sm font-medium">Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {index < applicationData?.steps?.length - 1 && (
                  <div className="absolute left-9 top-20 w-0.5 h-6 bg-muted"></div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      {/* Application Checklist */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">Application Checklist</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {applicationData?.checklist?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-card border rounded-lg">
              <input
                type="checkbox"
                id={`checklist-${index}`}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
              />
              <label htmlFor={`checklist-${index}`} className="flex-1 text-sm text-foreground">
                {item}
              </label>
            </div>
          ))}
        </div>
      </section>
      {/* Important Dates */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">Important Dates</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applicationData?.importantDates?.map((date, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <h4 className="font-medium text-foreground">{date?.event}</h4>
              </div>
              <div className="text-lg font-bold text-primary">{date?.date}</div>
              {date?.note && (
                <div className="text-xs text-muted-foreground mt-1">{date?.note}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Contact Information */}
      <section className="p-6 bg-secondary/5 border border-secondary/20 rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
          <Icon name="MessageCircle" size={20} className="mr-2 text-secondary" />
          Need Application Support?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our admissions team is here to help you through every step of the application process.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={16} className="text-secondary" />
            <div>
              <div className="text-sm font-medium text-foreground">Phone</div>
              <div className="text-sm text-muted-foreground">{applicationData?.contact?.phone}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} className="text-secondary" />
            <div>
              <div className="text-sm font-medium text-foreground">Email</div>
              <div className="text-sm text-muted-foreground">{applicationData?.contact?.email}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={16} className="text-secondary" />
            <div>
              <div className="text-sm font-medium text-foreground">Office Hours</div>
              <div className="text-sm text-muted-foreground">{applicationData?.contact?.hours}</div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Apply Button */}
      <section className="text-center p-6 bg-gradient-to-r from-primary to-secondary rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Apply?</h3>
        <p className="text-white/90 mb-4">
          Start your application now and take the first step towards your future.
        </p>
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-white/90"
          iconName="ExternalLink"
          iconPosition="right"
        >
          Start Application
        </Button>
      </section>
    </div>
  );
};

export default CourseApplication;