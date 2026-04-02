import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TabsList, TabsTrigger } from '../components/ui/Tabs';
import { structureTabData as tabData } from '../constants/incentiveData';

function IncentiveCard({ data }) {
  const Icon = data.icon;

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-2">
          <CardTitle className="text-base font-bold text-slate-800">{data.title}</CardTitle>
          <div className="flex gap-2">
            {data.badges.map((b, i) => (
              <Badge key={i} variant="light" className="font-medium px-2 rounded-md py-1">{b.label}</Badge>
            ))}
          </div>
        </div>
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="bg-slate-100/70 text-slate-800 text-xs font-mono p-3 rounded-lg border border-slate-200/60 flex items-center">
          {data.formula}
        </div>

        <div className="w-full text-sm mt-2">
          <div className="grid grid-cols-3 text-slate-500 font-medium pb-2 border-b border-slate-100 mb-3">
            <div>Slab</div>
            <div className="text-center md:pl-8">Range</div>
            <div className="text-right">Earning</div>
          </div>

          <div className="space-y-3">
            {data.table.map((row, i) => (
              <div key={i} className="grid grid-cols-3 items-center">
                <div>
                  <Badge variant={row.slab}>{row.slab}</Badge>
                </div>
                <div className="text-center text-slate-700 font-medium md:pl-8">{row.range}</div>
                <div className="text-right text-blue-600 font-bold">{row.earning}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StructurePage() {
  const [activeTab, setActiveTab] = useState('Monthly');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-7 w-7 text-indigo-500" />
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Incentive Structure</h1>
          </div>
          <p className="text-slate-500 text-sm md:text-base">View all incentive slabs and earning criteria</p>
        </div>

        <Badge variant="platinum" className="px-4 py-1.5 shadow-sm text-sm">
          <SparklesIcon /> Q4 (Jan-Mar)
        </Badge>
      </div>

      <div className="py-2">
        <TabsList>
          <TabsTrigger active={activeTab === 'Monthly'} onClick={() => setActiveTab('Monthly')}>Monthly</TabsTrigger>
          <TabsTrigger active={activeTab === 'Quarterly'} onClick={() => setActiveTab('Quarterly')}>Quarterly</TabsTrigger>
          <TabsTrigger active={activeTab === 'Consistency'} onClick={() => setActiveTab('Consistency')}>Consistency</TabsTrigger>
        </TabsList>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
        {tabData[activeTab]?.map((item, idx) => (
          <IncentiveCard key={idx} data={item} />
        ))}

        {/* <div className="col-span-1 md:col-span-2 mt-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-5 w-full">
            <div className="flex gap-3 text-amber-600">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-2">For information only (not used in calculator):</p>
                <ul className="list-disc pl-5 space-y-1 text-amber-800">
                  <li>IBL winner criteria applies (for information only)</li>
                  <li>Doctor call load requirements apply (for information only)</li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function SparklesIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
}
