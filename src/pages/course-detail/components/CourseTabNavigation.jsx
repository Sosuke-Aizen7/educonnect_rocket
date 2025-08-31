import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseTabNavigation = ({ activeTab, onTabChange, className = '' }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'curriculum', label: 'Curriculum', icon: 'BookOpen' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckCircle' },
    { id: 'fees', label: 'Fees & Funding', icon: 'DollarSign' },
    { id: 'application', label: 'Application', icon: 'FileText' }
  ];

  return (
    <div className={`border-b bg-card ${className}`}>
      <div className="container px-4 lg:px-6">
        <nav className="flex overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CourseTabNavigation;