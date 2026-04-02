import React, { useState, useEffect } from 'react';
import { History, Filter, Clock } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function HistoryPage() {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All Categories');

  useEffect(() => {
    const fetchHistory = async () => {
      const employeeId = Cookies.get('employeeId');
      if (!employeeId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`https://incentive-backend-na5x.onrender.com/calculation?employeeId=${employeeId}`);
        if (response.data.success) {
          setCalculations(response.data.calculations);
        }
      } catch (error) {
        console.error("Error fetching calculation history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatTimestamp = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

    return `${day} ${month} ${year}, ${time}`;
  };

  const getSlabVariant = (slab) => {
    if (!slab || slab === 'Not Eligible' || slab === 'No Slab Reached') return 'light';
    const lowerSlab = slab.toLowerCase();
    if (lowerSlab.includes('ruby')) return 'ruby';
    if (lowerSlab.includes('diamond')) return 'diamond';
    if (lowerSlab.includes('platinum')) return 'platinum';
    if (lowerSlab.includes('gold')) return 'gold';
    if (lowerSlab.includes('silver')) return 'silver';
    return 'light';
  };

  const filteredCalculations = filterCategory === 'All Categories'
    ? calculations
    : calculations.filter(c => c.category === filterCategory);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="h-7 w-7 text-indigo-500" />
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Calculation History</h1>
          </div>
          <p className="text-slate-500 text-sm md:text-base">Review your past incentive calculations</p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white p-3 px-4 rounded-xl border border-slate-200 shadow-sm max-w-sm">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-transparent border-none text-sm font-medium text-slate-700 outline-none cursor-pointer w-full focus:ring-0"
        >
          <option>All Categories</option>
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Consistency</option>
          <option>Growth</option>
          <option>Incremental</option>
        </select>
        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 flex-shrink-0">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-100 border-t-indigo-600 mb-4"></div>
            <p className="text-slate-500 font-medium">Loading history...</p>
          </div>
        ) : filteredCalculations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200 uppercase">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Calculator Type</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Metric Result</th>
                  <th className="px-6 py-4 text-center">Slab Zone</th>
                  <th className="px-6 py-4 text-right">Earning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCalculations.map((calc, idx) => (
                  <tr key={calc._id || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">
                      {formatTimestamp(calc.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {calc.calculatorType}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="font-medium text-slate-700 border-slate-200">
                        {calc.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-semibold text-center">
                      {calc.metricResult}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={getSlabVariant(calc.slabZone)} className={calc.slabZone === 'Not Eligible' ? 'text-slate-500 border-slate-200 bg-slate-100' : ''}>
                        {calc.slabZone}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600 text-right">
                      {calc.earning > 0 ? `₹${calc.earning.toLocaleString('en-IN')}` : '₹0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-slate-50/50">
            <div className="h-20 w-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-5 text-slate-400">
              <Clock className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No calculations yet</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-sm">
              Your saved calculations will appear here for easy reference and tracking.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
