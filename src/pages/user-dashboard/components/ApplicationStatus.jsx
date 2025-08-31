import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationStatus = ({ applications }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'text-success bg-success/10';
      case 'rejected':
        return 'text-destructive bg-destructive/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'interview':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      case 'interview':
        return 'Calendar';
      default:
        return 'FileText';
    }
  };

  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  if (applications?.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Applications Yet</h3>
        <p className="text-muted-foreground mb-4">
          Start your university journey by submitting applications to your favorite courses.
        </p>
        <Link to="/course-search-results">
          <Button>Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-semibold text-foreground">Application Status</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          New Application
        </Button>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {applications?.map((application) => (
            <div key={application?.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {application?.courseTitle}
                    </h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(application?.status)}`}>
                      <Icon name={getStatusIcon(application?.status)} size={12} />
                      <span>{application?.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{application?.university}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Applied: {application?.appliedDate}</span>
                    {application?.deadline && (
                      <span className={isDeadlineNear(application?.deadline) ? 'text-warning font-medium' : ''}>
                        Deadline: {application?.deadline}
                      </span>
                    )}
                  </div>
                  
                  {application?.nextStep && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Info" size={16} className="text-primary" />
                        <span className="text-sm font-medium text-primary">Next Step:</span>
                      </div>
                      <p className="text-sm text-foreground mt-1">{application?.nextStep}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {applications?.length > 3 && (
          <div className="mt-6 text-center">
            <Button variant="outline">View All Applications ({applications?.length})</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;