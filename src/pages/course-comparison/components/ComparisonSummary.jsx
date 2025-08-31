import React from 'react';
import Icon from '../../../components/AppIcon';

const ComparisonSummary = ({ courses }) => {
  if (courses?.length === 0) return null;

  // Calculate summary statistics
  const fees = courses?.map(course => {
    const feeString = course?.fees?.tuition?.replace(/[^0-9]/g, '');
    return parseInt(feeString) || 0;
  });

  const durations = courses?.map(course => {
    const durationMatch = course?.duration?.match(/(\d+)/);
    return durationMatch ? parseInt(durationMatch?.[1]) : 0;
  });

  const minFee = Math.min(...fees);
  const maxFee = Math.max(...fees);
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);

  const formatFee = (fee) => `$${fee?.toLocaleString()}`;

  const getDifferentiators = () => {
    const differentiators = [];
    
    // Fee range
    if (minFee !== maxFee) {
      differentiators?.push({
        type: 'fee',
        label: 'Fee Range',
        value: `${formatFee(minFee)} - ${formatFee(maxFee)}`,
        icon: 'DollarSign',
        color: 'text-primary'
      });
    }
    
    // Duration range
    if (minDuration !== maxDuration) {
      differentiators?.push({
        type: 'duration',
        label: 'Duration Range',
        value: `${minDuration} - ${maxDuration} years`,
        icon: 'Clock',
        color: 'text-secondary'
      });
    }
    
    // Study modes
    const studyModes = [...new Set(courses.map(course => course.studyMode))];
    if (studyModes?.length > 1) {
      differentiators?.push({
        type: 'studyMode',
        label: 'Study Modes',
        value: studyModes?.join(', '),
        icon: 'BookOpen',
        color: 'text-accent'
      });
    }
    
    // Locations
    const locations = [...new Set(courses.map(course => course.location))];
    if (locations?.length > 1) {
      differentiators?.push({
        type: 'location',
        label: 'Locations',
        value: locations?.join(', '),
        icon: 'MapPin',
        color: 'text-success'
      });
    }

    return differentiators;
  };

  const differentiators = getDifferentiators();

  return (
    <div className="bg-muted/30 border rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">Comparison Summary</h3>
      </div>
      {differentiators?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {differentiators?.map((diff, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name={diff?.icon} size={16} className={`mt-0.5 ${diff?.color}`} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-foreground">
                  {diff?.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {diff?.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            All courses have similar characteristics - perfect for detailed comparison!
          </p>
        </div>
      )}
      {/* Quick insights */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex flex-wrap gap-2">
          {courses?.some(course => course?.isPopular) && (
            <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
              Popular choices included
            </span>
          )}
          
          {courses?.every(course => course?.accreditation?.includes('Accredited')) && (
            <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
              All accredited programs
            </span>
          )}
          
          {courses?.some(course => course?.fees?.paymentOptions?.some(option => option?.includes('Scholarship'))) && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              Scholarships available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonSummary;