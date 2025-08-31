import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseRequirements = ({ requirements }) => {
  return (
    <div className="space-y-8">
      {/* Academic Requirements */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Academic Requirements</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Minimum Qualifications */}
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
              <Icon name="GraduationCap" size={20} className="mr-2 text-primary" />
              Minimum Qualifications
            </h3>
            <div className="space-y-3">
              {requirements?.academic?.minimum?.map((req, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Qualifications */}
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
              <Icon name="Star" size={20} className="mr-2 text-accent" />
              Preferred Qualifications
            </h3>
            <div className="space-y-3">
              {requirements?.academic?.preferred?.map((req, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon name="Plus" size={16} className="text-accent mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Language Requirements */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Language Requirements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requirements?.language?.map((lang, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Languages" size={16} className="text-primary" />
                <h3 className="font-medium text-foreground">{lang?.test}</h3>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Minimum Score: <span className="font-medium text-foreground">{lang?.minimumScore}</span>
                </div>
                {lang?.breakdown && (
                  <div className="text-xs text-muted-foreground">
                    {lang?.breakdown}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Application Documents */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Required Documents</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {requirements?.documents?.map((doc, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-card border rounded-lg">
              <Icon name={doc?.icon} size={20} className="text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{doc?.name}</h3>
                <p className="text-sm text-muted-foreground">{doc?.description}</p>
                {doc?.required && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-error/10 text-error mt-1">
                    Required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Additional Requirements */}
      {requirements?.additional && requirements?.additional?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Additional Requirements</h2>
          <div className="space-y-4">
            {requirements?.additional?.map((req, index) => (
              <div key={index} className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertCircle" size={20} className="text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{req?.title}</h3>
                    <p className="text-sm text-muted-foreground">{req?.description}</p>
                    {req?.deadline && (
                      <div className="mt-2 text-sm text-warning font-medium">
                        Deadline: {req?.deadline}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Application Timeline */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Application Timeline</h2>
        <div className="relative">
          {requirements?.timeline?.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step?.completed 
                    ? 'bg-success text-success-foreground' 
                    : step?.current 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step?.completed ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < requirements?.timeline?.length - 1 && (
                  <div className="w-0.5 h-16 bg-muted mt-2"></div>
                )}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-medium text-foreground">{step?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step?.description}</p>
                <div className="text-sm text-primary font-medium mt-2">{step?.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Important Notes */}
      <section className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Info" size={20} className="mr-2 text-primary" />
          Important Notes
        </h3>
        <ul className="space-y-2">
          {requirements?.notes?.map((note, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Dot" size={16} className="text-primary mt-1 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CourseRequirements;