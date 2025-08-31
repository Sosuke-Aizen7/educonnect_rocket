import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProgramsSection = ({ programs }) => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const studyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'doctoral', label: 'Doctoral' }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'business', label: 'Business' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'arts', label: 'Arts & Humanities' }
  ];

  const filteredPrograms = programs?.filter(program => {
    const levelMatch = selectedLevel === 'all' || program?.level === selectedLevel;
    const subjectMatch = selectedSubject === 'all' || program?.subject === selectedSubject;
    return levelMatch && subjectMatch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'undergraduate': return 'bg-blue-100 text-blue-800';
      case 'graduate': return 'bg-green-100 text-green-800';
      case 'doctoral': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-primary" />
          Available Programs ({filteredPrograms?.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Select
            label="Study Level"
            options={studyLevels}
            value={selectedLevel}
            onChange={setSelectedLevel}
          />
          <Select
            label="Subject Area"
            options={subjects}
            value={selectedSubject}
            onChange={setSelectedSubject}
          />
        </div>
      </div>
      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms?.map((program) => (
          <div key={program?.id} className="bg-card rounded-lg p-6 border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                  {program?.name}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program?.level)}`}>
                    {program?.level?.charAt(0)?.toUpperCase() + program?.level?.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">{program?.department}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
              >
                <Icon name="Bookmark" size={16} />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {program?.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span>{program?.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={14} className="text-muted-foreground" />
                <span>{program?.tuitionFee}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span>{program?.startDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span>{program?.capacity} seats</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {program?.applicationDeadline && (
                  <span className="text-xs text-warning font-medium">
                    Deadline: {program?.applicationDeadline}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="GitCompare"
                  iconPosition="left"
                >
                  Compare
                </Button>
                <Link to="/course-detail">
                  <Button size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredPrograms?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No programs found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        </div>
      )}
      {/* View All Programs Button */}
      {filteredPrograms?.length > 0 && (
        <div className="text-center">
          <Link to="/course-search-results">
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All Programs
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProgramsSection;