import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CourseFeesAndFunding = ({ feesData }) => {
  const [selectedStudentType, setSelectedStudentType] = useState('domestic');
  const [calculatorValues, setCalculatorValues] = useState({
    duration: 4,
    livingExpenses: 15000,
    personalExpenses: 5000
  });

  const calculateTotal = () => {
    const tuitionFee = feesData?.tuition?.[selectedStudentType];
    const totalTuition = tuitionFee * calculatorValues?.duration;
    const totalLiving = calculatorValues?.livingExpenses * calculatorValues?.duration;
    const totalPersonal = calculatorValues?.personalExpenses * calculatorValues?.duration;
    
    return {
      tuition: totalTuition,
      living: totalLiving,
      personal: totalPersonal,
      total: totalTuition + totalLiving + totalPersonal
    };
  };

  const totals = calculateTotal();

  return (
    <div className="space-y-8">
      {/* Fee Structure */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Fee Structure</h2>
        
        {/* Student Type Selector */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setSelectedStudentType('domestic')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedStudentType === 'domestic'
                ? 'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Domestic Students
          </button>
          <button
            onClick={() => setSelectedStudentType('international')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedStudentType === 'international' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            International Students
          </button>
        </div>

        {/* Fee Breakdown */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-lg font-medium text-foreground mb-4">Annual Fees</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Tuition Fee</span>
                <span className="font-semibold text-foreground">
                  ${feesData?.tuition?.[selectedStudentType]?.toLocaleString()}
                </span>
              </div>
              {feesData?.additional?.map((fee, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{fee?.name}</span>
                  <span className="font-medium text-foreground">
                    ${fee?.amount?.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center py-3 bg-primary/5 px-4 rounded-lg border border-primary/20">
                <span className="font-semibold text-foreground">Total Annual Fee</span>
                <span className="text-xl font-bold text-primary">
                  ${(feesData?.tuition?.[selectedStudentType] + feesData?.additional?.reduce((sum, fee) => sum + fee?.amount, 0))?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Cost Calculator */}
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-lg font-medium text-foreground mb-4">Cost Calculator</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Program Duration (years)
                </label>
                <select
                  value={calculatorValues?.duration}
                  onChange={(e) => setCalculatorValues(prev => ({
                    ...prev,
                    duration: parseInt(e?.target?.value)
                  }))}
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                >
                  <option value={3}>3 years</option>
                  <option value={4}>4 years</option>
                  <option value={5}>5 years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Annual Living Expenses
                </label>
                <input
                  type="number"
                  value={calculatorValues?.livingExpenses}
                  onChange={(e) => setCalculatorValues(prev => ({
                    ...prev,
                    livingExpenses: parseInt(e?.target?.value) || 0
                  }))}
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Annual Personal Expenses
                </label>
                <input
                  type="number"
                  value={calculatorValues?.personalExpenses}
                  onChange={(e) => setCalculatorValues(prev => ({
                    ...prev,
                    personalExpenses: parseInt(e?.target?.value) || 0
                  }))}
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                />
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Tuition</span>
                  <span className="font-medium">${totals?.tuition?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Living</span>
                  <span className="font-medium">${totals?.living?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Personal</span>
                  <span className="font-medium">${totals?.personal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span className="text-foreground">Total Cost</span>
                  <span className="text-primary">${totals?.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Scholarships and Financial Aid */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Scholarships & Financial Aid</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {feesData?.scholarships?.map((scholarship, index) => (
            <div key={index} className="p-6 bg-card border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={20} className="text-accent" />
                  <h3 className="text-lg font-medium text-foreground">{scholarship?.name}</h3>
                </div>
                <span className="text-lg font-bold text-success">{scholarship?.amount}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{scholarship?.description}</p>
              
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-foreground">Eligibility:</h4>
                <ul className="space-y-1">
                  {scholarship?.eligibility?.map((criteria, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-sm text-muted-foreground">
                  Deadline: {scholarship?.deadline}
                </div>
                <button className="text-sm text-primary hover:text-primary/80 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Payment Options */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Payment Options</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {feesData?.paymentOptions?.map((option, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={option?.icon} size={16} className="text-primary" />
                <h3 className="font-medium text-foreground">{option?.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{option?.description}</p>
              {option?.benefits && (
                <div className="text-xs text-success font-medium">{option?.benefits}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Financial Aid Resources */}
      <section className="p-6 bg-secondary/5 border border-secondary/20 rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
          <Icon name="HelpCircle" size={20} className="mr-2 text-secondary" />
          Need Financial Assistance?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our financial aid office is here to help you explore all available funding options.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
            <Icon name="Phone" size={16} />
            <span>Contact Financial Aid</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition-colors">
            <Icon name="Download" size={16} />
            <span>Download Aid Guide</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default CourseFeesAndFunding;