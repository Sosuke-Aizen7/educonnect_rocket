import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      title: 'Search Courses',
      description: 'Find new courses and programs',
      icon: 'Search',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      path: '/course-search-results'
    },
    {
      title: 'Compare Courses',
      description: 'Side-by-side course comparison',
      icon: 'GitCompare',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      path: '/course-comparison'
    },
    {
      title: 'Explore Universities',
      description: 'Browse university profiles',
      icon: 'GraduationCap',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      path: '/university-profile'
    },
    {
      title: 'Application Help',
      description: 'Get guidance on applications',
      icon: 'HelpCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      path: '/help'
    }
  ];

  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <Link
            key={index}
            to={action?.path}
            className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className={`w-12 h-12 rounded-lg ${action?.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
              <Icon name={action?.icon} size={24} className={action?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {action?.title}
              </h3>
              <p className="text-xs text-muted-foreground">{action?.description}</p>
            </div>
            <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;