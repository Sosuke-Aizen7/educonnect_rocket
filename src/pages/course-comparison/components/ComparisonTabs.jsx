import React from 'react';
import Icon from '../../../components/AppIcon';

const ComparisonTabs = ({ activeTab, onTabChange, courseCount }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'fees', label: 'Fees & Costs', icon: 'DollarSign' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckCircle' },
    { id: 'curriculum', label: 'Curriculum', icon: 'BookOpen' }
  ];

  if (courseCount === 0) return null;

  return (
    <div className="bg-card border-b sticky top-32 z-20">
      <div className="container px-4 lg:px-6">
        {/* Mobile Tabs - Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => onTabChange(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex space-x-1 py-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTabs;