import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Bookmarked Courses',
      value: stats?.bookmarkedCourses,
      icon: 'Bookmark',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Applications Submitted',
      value: stats?.applicationsSubmitted,
      icon: 'FileText',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Active Comparisons',
      value: stats?.activeComparisons,
      icon: 'GitCompare',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Universities Explored',
      value: stats?.universitiesExplored,
      icon: 'GraduationCap',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <span className="text-2xl font-bold text-foreground">{item?.value}</span>
          </div>
          <p className="text-sm text-muted-foreground">{item?.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;