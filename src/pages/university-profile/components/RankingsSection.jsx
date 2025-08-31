import React from 'react';
import Icon from '../../../components/AppIcon';

const RankingsSection = ({ rankings }) => {
  const getRankingColor = (rank) => {
    if (rank <= 10) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (rank <= 50) return 'text-green-600 bg-green-50 border-green-200';
    if (rank <= 100) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (change < 0) return { icon: 'TrendingDown', color: 'text-destructive' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="space-y-8">
      {/* Overall Rankings */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
          <Icon name="Trophy" size={20} className="mr-2 text-primary" />
          Global Rankings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rankings?.global?.map((ranking, index) => {
            const changeData = getChangeIcon(ranking?.change);
            return (
              <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Award" size={16} className="text-primary" />
                    </div>
                    <div className="text-sm font-medium text-foreground">{ranking?.source}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-sm font-bold ${getRankingColor(ranking?.rank)}`}>
                    #{ranking?.rank}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-2">{ranking?.category}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Year: {ranking?.year}
                  </div>
                  {ranking?.change !== 0 && (
                    <div className={`flex items-center space-x-1 text-xs ${changeData?.color}`}>
                      <Icon name={changeData?.icon} size={12} />
                      <span>{Math.abs(ranking?.change)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Subject Rankings */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BookOpen" size={18} className="mr-2 text-primary" />
          Subject Rankings
        </h3>
        
        <div className="space-y-4">
          {rankings?.subjects?.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-foreground mb-1">{subject?.subject}</div>
                <div className="text-sm text-muted-foreground">{subject?.source} • {subject?.year}</div>
              </div>
              
              <div className="flex items-center space-x-4">
                {subject?.change !== 0 && (
                  <div className={`flex items-center space-x-1 text-sm ${getChangeIcon(subject?.change)?.color}`}>
                    <Icon name={getChangeIcon(subject?.change)?.icon} size={14} />
                    <span>{Math.abs(subject?.change)}</span>
                  </div>
                )}
                <div className={`px-3 py-1 rounded-full border text-sm font-bold ${getRankingColor(subject?.rank)}`}>
                  #{subject?.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements & Awards */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Star" size={18} className="mr-2 text-primary" />
          Achievements & Awards
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rankings?.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Award" size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{achievement?.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{achievement?.description}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Calendar" size={12} />
                  <span>{achievement?.year}</span>
                  <span>•</span>
                  <span>{achievement?.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Research Metrics */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-primary" />
          Research Metrics
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {rankings?.research?.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={metric?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{metric?.value}</div>
              <div className="text-sm text-muted-foreground">{metric?.label}</div>
              {metric?.percentile && (
                <div className="text-xs text-accent mt-1">
                  {metric?.percentile}th percentile
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Ranking Methodology */}
      <div className="bg-muted/30 rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Info" size={18} className="mr-2 text-primary" />
          About Rankings
        </h3>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            University rankings are compiled by various organizations using different methodologies. 
            Rankings should be considered alongside other factors when making educational decisions.
          </p>
          <p>
            <strong>Key factors typically include:</strong> Academic reputation, employer reputation, 
            faculty-to-student ratio, research output, international diversity, and graduate employment rates.
          </p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-card rounded text-xs">QS World University Rankings</span>
          <span className="px-2 py-1 bg-card rounded text-xs">Times Higher Education</span>
          <span className="px-2 py-1 bg-card rounded text-xs">Academic Ranking of World Universities</span>
          <span className="px-2 py-1 bg-card rounded text-xs">US News & World Report</span>
        </div>
      </div>
    </div>
  );
};

export default RankingsSection;