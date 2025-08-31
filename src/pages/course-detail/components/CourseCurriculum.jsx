import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CourseCurriculum = ({ curriculum }) => {
  const [expandedSemesters, setExpandedSemesters] = useState(new Set([0])); // First semester expanded by default

  const toggleSemester = (semesterIndex) => {
    const newExpanded = new Set(expandedSemesters);
    if (newExpanded?.has(semesterIndex)) {
      newExpanded?.delete(semesterIndex);
    } else {
      newExpanded?.add(semesterIndex);
    }
    setExpandedSemesters(newExpanded);
  };

  const expandAll = () => {
    setExpandedSemesters(new Set(curriculum.map((_, index) => index)));
  };

  const collapseAll = () => {
    setExpandedSemesters(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Curriculum Structure</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={expandAll}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Expand All
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={collapseAll}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>
      {/* Curriculum Timeline */}
      <div className="space-y-4">
        {curriculum?.map((semester, semesterIndex) => {
          const isExpanded = expandedSemesters?.has(semesterIndex);
          const totalCredits = semester?.modules?.reduce((sum, module) => sum + module.credits, 0);

          return (
            <div key={semesterIndex} className="border rounded-lg overflow-hidden">
              {/* Semester Header */}
              <button
                onClick={() => toggleSemester(semesterIndex)}
                className="w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={isExpanded ? "ChevronDown" : "ChevronRight"}
                        size={20}
                        className="text-muted-foreground"
                      />
                      <h3 className="text-lg font-semibold text-foreground">
                        {semester?.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{semester?.modules?.length} modules</span>
                      <span>{totalCredits} credits</span>
                      <span>{semester?.duration}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isExpanded ? 'Click to collapse' : 'Click to expand'}
                  </div>
                </div>
              </button>
              {/* Semester Content */}
              {isExpanded && (
                <div className="p-4 bg-card border-t">
                  <div className="grid gap-4">
                    {semester?.modules?.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground mb-1">
                              {module.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {module.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground ml-4">
                            <div className="flex items-center space-x-1">
                              <Icon name="Clock" size={14} />
                              <span>{module.credits} credits</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="BookOpen" size={14} />
                              <span>{module.type}</span>
                            </div>
                          </div>
                        </div>

                        {/* Module Topics */}
                        {module.topics && module.topics?.length > 0 && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-foreground mb-2">Key Topics:</h5>
                            <div className="flex flex-wrap gap-2">
                              {module.topics?.map((topic, topicIndex) => (
                                <span
                                  key={topicIndex}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Assessment Methods */}
                        {module.assessment && (
                          <div className="mt-3 pt-3 border-t border-muted">
                            <div className="flex items-center space-x-2 text-sm">
                              <Icon name="FileCheck" size={14} className="text-muted-foreground" />
                              <span className="text-muted-foreground">Assessment:</span>
                              <span className="text-foreground">{module.assessment}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Semester Summary */}
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium">Semester Total:</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">{semester?.modules?.length} modules</span>
                        <span className="text-primary font-medium">{totalCredits} credits</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Program Summary */}
      <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Program Summary</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {curriculum?.length}
            </div>
            <div className="text-sm text-muted-foreground">Semesters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {curriculum?.reduce((sum, sem) => sum + sem?.modules?.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {curriculum?.reduce((sum, sem) => 
                sum + sem?.modules?.reduce((modSum, mod) => modSum + mod?.credits, 0), 0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Total Credits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;