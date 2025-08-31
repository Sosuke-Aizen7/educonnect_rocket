import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="sticky top-16 z-30 bg-card border-b">
      <div className="container px-4">
        {/* Desktop Tab Navigation */}
        <div className="hidden md:flex space-x-1 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-muted rounded-full">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
              <Icon name={tabs?.find(t => t?.id === activeTab)?.icon} size={16} className="text-primary" />
              <span className="font-medium text-foreground">
                {tabs?.find(t => t?.id === activeTab)?.label}
              </span>
            </div>
            
            {/* Mobile Tab Selector */}
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e?.target?.value)}
              className="bg-transparent border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {tabs?.map((tab) => (
                <option key={tab?.id} value={tab?.id}>
                  {tab?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;