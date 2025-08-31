import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdmissionsSection = ({ admissions }) => {
  const [selectedProgram, setSelectedProgram] = useState('undergraduate');

  const programTypes = [
    { id: 'undergraduate', label: 'Undergraduate' },
    { id: 'graduate', label: 'Graduate' },
    { id: 'doctoral', label: 'Doctoral' }
  ];

  const currentAdmissions = admissions?.[selectedProgram];

  return (
    <div className="space-y-8">
      {/* Program Type Selector */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="GraduationCap" size={20} className="mr-2 text-primary" />
          Admissions Information
        </h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {programTypes?.map((program) => (
            <button
              key={program?.id}
              onClick={() => setSelectedProgram(program?.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedProgram === program?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {program?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Application Process */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="FileText" size={18} className="mr-2 text-primary" />
          Application Process
        </h3>
        
        <div className="space-y-4">
          {currentAdmissions?.process?.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{step?.title}</h4>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
                {step?.deadline && (
                  <div className="mt-2 flex items-center space-x-1 text-xs text-warning">
                    <Icon name="Clock" size={12} />
                    <span>Deadline: {step?.deadline}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Requirements */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="CheckSquare" size={18} className="mr-2 text-primary" />
          Admission Requirements
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Academic Requirements */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Academic Requirements</h4>
            <div className="space-y-2">
              {currentAdmissions?.requirements?.academic?.map((req, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Document Requirements */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Required Documents</h4>
            <div className="space-y-2">
              {currentAdmissions?.requirements?.documents?.map((doc, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="FileText" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Language Requirements */}
        {currentAdmissions?.requirements?.language && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Icon name="Globe" size={16} className="mr-2 text-primary" />
              Language Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {currentAdmissions?.requirements?.language?.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{lang?.test}</span>
                  <span className="font-medium text-foreground">{lang?.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Important Dates */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Calendar" size={18} className="mr-2 text-primary" />
          Important Dates
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentAdmissions?.dates?.map((date, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium text-foreground">{date?.event}</div>
                <div className="text-sm text-muted-foreground">{date?.description}</div>
              </div>
              <div className="text-sm font-medium text-primary">
                {date?.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Tuition & Fees */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="DollarSign" size={18} className="mr-2 text-primary" />
          Tuition & Fees
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Domestic Students */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Domestic Students</h4>
            <div className="space-y-2">
              {currentAdmissions?.fees?.domestic?.map((fee, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{fee?.type}</span>
                  <span className="font-medium text-foreground">{fee?.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* International Students */}
          <div>
            <h4 className="font-medium text-foreground mb-3">International Students</h4>
            <div className="space-y-2">
              {currentAdmissions?.fees?.international?.map((fee, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{fee?.type}</span>
                  <span className="font-medium text-foreground">{fee?.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Phone" size={18} className="mr-2 text-primary" />
          Contact Admissions Office
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium text-foreground">{currentAdmissions?.contact?.email}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium text-foreground">{currentAdmissions?.contact?.phone}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={16} className="text-primary mt-1" />
              <div>
                <div className="text-sm text-muted-foreground">Office Address</div>
                <div className="font-medium text-foreground">{currentAdmissions?.contact?.address}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Office Hours</div>
                <div className="font-medium text-foreground">{currentAdmissions?.contact?.hours}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button iconName="Mail" iconPosition="left">
            Contact Admissions
          </Button>
          <Button variant="outline" iconName="Calendar" iconPosition="left">
            Schedule Visit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsSection;