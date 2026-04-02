import React, { useState } from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Card } from '../components/ui/Card';
import { calculatorData, structureTabData } from '../constants/incentiveData';
import { CalculatorDetail } from '../components/calculator/CalculatorDetail';


export function CalculatorPage() {
  const [activeTab, setActiveTab] = useState('Monthly');
  const [selectedCalculator, setSelectedCalculator] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCalculator(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-7 w-7 text-indigo-500" />
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Incentive Calculators</h1>
          </div>
          <p className="text-slate-500 text-sm md:text-base">Select a calculator to compute your incentive earning</p>
        </div>

        <Badge variant="platinum" className="px-4 py-1.5 shadow-sm text-sm">
          <SparklesIcon /> Q4 (Jan-Mar)
        </Badge>
      </div>

      <div className="py-2">
        <TabsList>
          <TabsTrigger active={activeTab === 'Monthly'} onClick={() => handleTabChange('Monthly')}>Monthly</TabsTrigger>
          <TabsTrigger active={activeTab === 'Quarterly'} onClick={() => handleTabChange('Quarterly')}>Quarterly</TabsTrigger>
          <TabsTrigger active={activeTab === 'Consistency'} onClick={() => handleTabChange('Consistency')}>Consistency</TabsTrigger>
        </TabsList>
      </div>

      <div className="flex flex-col gap-4">
        {selectedCalculator ? (
          <CalculatorDetail 
            calculator={selectedCalculator.calc} 
            structureData={selectedCalculator.structure}
            onBack={() => setSelectedCalculator(null)}
          />
        ) : (
          calculatorData[activeTab]?.map((calc, idx) => {
            const Icon = calc.icon;
            const handleSelect = () => {
              const structure = structureTabData[activeTab]?.find(item => item.title === calc.title);
              setSelectedCalculator({ calc, structure });
            };
            
            return (
              <Card 
                key={idx} 
                onClick={handleSelect}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group gap-4"
              >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{calc.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="light" className="px-2 py-0.5 rounded-md text-xs font-semibold">{calc.tags[0]}</Badge>
                    </div>
                    <span className="text-slate-400 font-medium">{calc.params}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium text-slate-700 group-hover:text-blue-600 md:pr-4">
                Open <ArrowRight className="h-4 w-4" />
              </div>
            </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

function SparklesIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
}
