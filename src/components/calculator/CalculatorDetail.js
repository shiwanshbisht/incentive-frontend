import React, { useState } from 'react';
import { ArrowLeft, Calculator, Target, Trophy, Calendar } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card } from '../ui/Card';
const getSlabSymbol = (slabName) => {
  if (!slabName) return "";
  const lower = slabName.toLowerCase();
  if (lower.includes("silver")) return "🥈";
  if (lower.includes("gold")) return "🥇";
  if (lower.includes("platinum")) return "💠";
  if (lower.includes("diamond")) return "💎";
  if (lower.includes("ruby")) return "♦️";
  return "";
};

const getDaysLeftInMonth = () => {
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return endOfMonth.getDate() - today.getDate();
};

export function CalculatorDetail({ calculator, structureData, onBack }) {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const Icon = calculator.icon;
  const isConsistency = calculator.title.includes("Consistency");
  const isGrowth = calculator.title.includes("Growth");
  const isIncremental = calculator.title.includes("Incremental");
  const isQuarterly = calculator.title.includes("Quarterly");

  const handleCalculate = () => {
    let calculatedValue = 0;

    if (isConsistency) {
      calculatedValue = Object.values(inputs).filter(Boolean).length;
    } else if (isGrowth) {
      const cm = parseFloat(inputs.cm || 0);
      const ly = parseFloat(inputs.ly || 0);
      if (ly > 0) {
        calculatedValue = ((cm - ly) / ly) * 100;
      } else {
        calculatedValue = 0;
      }
    } else if (isIncremental) {
      const cq = parseFloat(inputs.cm || 0);
      const lq = parseFloat(inputs.ly || 0);
      calculatedValue = cq - lq;
    } else {
      const cm = parseFloat(inputs.cm || 0);
      const target = parseFloat(inputs.target || 0);
      if (target > 0) {
        calculatedValue = (cm / target) * 100;
      } else {
        calculatedValue = 0;
      }
    }

    // Fix floating point precision issues (e.g. 1.15 * 100 = 114.99999999999999)
    calculatedValue = Number(calculatedValue.toFixed(4));

    let earnedSlab = null;
    let earning = "₹0";

    const cleanNum = (str) => {
      let clean = str.replace(/[^0-9.]/g, '');
      if (str.includes("L")) return parseFloat(clean) * 100000;
      return parseFloat(clean);
    };

    const getMinVal = (rangeStr) => {
      if (rangeStr.includes("Quarters")) {
        if (rangeStr.includes("All 4")) return 4;
        if (rangeStr.includes("Any 3")) return 3;
        if (rangeStr.includes("Any 2")) return 2;
        return 0;
      }
      if (rangeStr.includes("≤ x <")) return cleanNum(rangeStr.split("≤ x <")[0]);
      if (rangeStr.includes("≥")) return cleanNum(rangeStr.split("≥")[1]);
      return 0;
    };

    const evaluateCondition = (val, rangeStr) => {
      if (rangeStr.includes("Quarters")) {
        if (rangeStr.includes("All 4") && val === 4) return true;
        if (rangeStr.includes("Any 3") && val >= 3) return true;
        if (rangeStr.includes("Any 2") && val >= 2) return true;
        return false;
      }

      if (rangeStr.includes("≤ x <")) {
        const parts = rangeStr.split("≤ x <");
        const minVal = cleanNum(parts[0]);
        const maxVal = cleanNum(parts[1]);
        return val >= minVal && val < maxVal;
      }

      if (rangeStr.includes("≥")) {
        const minStr = rangeStr.split("≥")[1];
        return val >= cleanNum(minStr);
      }

      return false;
    };

    let matchedRow = null;
    let matchedIndex = -1;

    if (structureData && structureData.table) {
      for (let i = structureData.table.length - 1; i >= 0; i--) {
        const row = structureData.table[i];
        if (evaluateCondition(calculatedValue, row.range)) {
          matchedRow = row;
          matchedIndex = i;
          break;
        }
      }

      if (matchedRow) {
        earnedSlab = matchedRow.slab;
        earning = matchedRow.earning;
      }
    }

    let nextRow = null;
    let balanceRequired = 0;
    if (structureData && structureData.table && matchedIndex + 1 < structureData.table.length) {
      nextRow = structureData.table[matchedIndex + 1];
      const targetVal = getMinVal(nextRow.range);

      if (isConsistency) {
        balanceRequired = targetVal - calculatedValue;
      } else if (isGrowth) {
        const ly = parseFloat(inputs.ly || 0);
        const reqCm = ly * (targetVal / 100) + ly;
        const currentCm = parseFloat(inputs.cm || 0);
        balanceRequired = reqCm - currentCm;
      } else if (isIncremental) {
        balanceRequired = targetVal - calculatedValue;
      } else {
        const target = parseFloat(inputs.target || 0);
        const reqCm = target * (targetVal / 100);
        const currentCm = parseFloat(inputs.cm || 0);
        balanceRequired = reqCm - currentCm;
      }
    }

    const finalSlab = earnedSlab || "No Slab Reached";

    setResult({
      value: calculatedValue,
      slab: finalSlab,
      earning: earning,
      nextZone: nextRow ? {
        name: nextRow.slab,
        balance: balanceRequired > 0 ? balanceRequired : 0
      } : null
    });

    // ─── Persist to backend ───────────────────────────────────────────────────
    const employeeId = Cookies.get('employeeId');

    // Derive category from calculator type flags
    const category = isConsistency
      ? 'Consistency'
      : isGrowth
        ? 'Growth'
        : isIncremental
          ? 'Incremental'
          : isQuarterly
            ? 'Quarterly'
            : 'Monthly';

    // Format metricResult as a human-readable string
    const metricResult = isConsistency
      ? String(calculatedValue)
      : isIncremental
        ? `₹${calculatedValue.toLocaleString('en-IN')}`
        : `${calculatedValue.toFixed(2)}%`;

    // Parse earning string (e.g. "₹5,000") to a plain number
    const earningNumeric = parseFloat(
      String(earning).replace(/[^0-9.]/g, '')
    ) || 0;

    if (employeeId) {
      axios
        .post('https://incentive-backend-na5x.onrender.com/calculation', {
          employeeId,
          calculatorType: calculator.title,
          category,
          metricResult,
          slabZone: finalSlab,
          earning: earningNumeric,
        })
        .then(() => {
          console.log('Calculation saved successfully.');
        })
        .catch((err) => {
          console.error('Failed to save calculation:', err?.response?.data || err.message);
        });
    } else {
      console.warn('No employeeId found in cookies — calculation not saved.');
    }
    // ─────────────────────────────────────────────────────────────────────────

  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-semibold"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Calculators
      </button>

      <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
        <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{calculator.title}</h2>
          <div className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <span>Formula: <strong className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded ml-1">{structureData?.formula || 'N/A'}</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-fit">
          <Card className="p-6 shadow-sm border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-500" />
              Enter Details
            </h3>

            <div className="space-y-4">
              {isConsistency ? (
                <div className="space-y-3">
                  {['Q1 (Apr-Jun)', 'Q2 (Jul-Sep)', 'Q3 (Oct-Dec)', 'Q4 (Jan-Mar)'].map((q, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-all">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        checked={inputs[q] || false}
                        onChange={(e) => setInputs({ ...inputs, [q]: e.target.checked })}
                      />
                      <span className="font-medium text-slate-700">{q}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {calculator.params.split(',')[0]?.trim()}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full border border-slate-300 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50/50"
                        placeholder={isGrowth ? "Enter units" : "Enter current value..."}
                        value={inputs.cm || ''}
                        onChange={(e) => setInputs({ ...inputs, cm: e.target.value })}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 font-medium font-sans">
                        {isGrowth ? "Units" : "₹"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {calculator.params.split(',')[1]?.trim() || "Target Value"}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full border border-slate-300 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50/50"
                        placeholder={isGrowth ? "Enter units" : "Enter target"}
                        value={inputs.target || inputs.ly || ''}
                        onChange={(e) => setInputs({ ...inputs, target: e.target.value, ly: e.target.value })}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 font-medium font-sans">
                        {isGrowth ? "Units" : "₹"}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleCalculate}
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                Calculate Incentive
              </button>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-slate-900 border-none relative overflow-hidden text-white shadow-xl h-full flex flex-col">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Trophy className="h-40 w-40" />
          </div>

          <h3 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2 relative z-10">
            <Target className="h-5 w-5 text-emerald-400" />
            Calculation Results
          </h3>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300 relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {isConsistency ? "Qualified Quarters" : isGrowth ? "Growth Achieved" : isIncremental ? "Incremental Value" : "Achievement Amount"}
                </span>
                <span className={`text-5xl font-extrabold tracking-tight ${result.value >= 100 || isConsistency || isIncremental ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {isConsistency ? result.value : isIncremental ? `₹${result.value.toLocaleString('en-IN')}` : `${result.value.toFixed(1)}%`}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-center">
                  <span className="block text-xs font-semibold text-slate-400 uppercase mb-1">Earned Slab</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                      {result.slab}
                    </span>
                    <span className="text-2xl">
                      {getSlabSymbol(result.slab)}
                    </span>
                  </div>

                </div>
                <div className="bg-emerald-900/30 p-4 rounded-xl border border-emerald-800/50 flex flex-col justify-center">
                  <span className="block text-xs font-semibold text-emerald-400/80 uppercase mb-1">Estimated Earning</span>
                  <span className="text-2xl font-bold text-emerald-400">{result.earning}</span>
                </div>
                {result.nextZone && result.nextZone.balance > 0 && (
                  <div className="col-span-2 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 flex flex-col justify-center relative overflow-hidden mt-1">
                    <span className="block text-xs font-semibold text-amber-500/80 uppercase mb-1">
                      Balance to {result.nextZone.name} Zone {getSlabSymbol(result.nextZone.name)}
                    </span>
                    <span className="text-xl font-bold text-amber-500">
                      {isConsistency
                        ? `${result.nextZone.balance} quarter(s)`
                        : isGrowth
                          ? `${result.nextZone.balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })} units`
                          : `₹${result.nextZone.balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
                      }
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-orange-50/10 p-4 rounded-xl border border-orange-400/20 flex items-center gap-4 relative overflow-hidden">
                <Calendar className="h-8 w-8 text-orange-400" />
                <div>
                  <h4 className="text-orange-400 font-bold text-lg">{getDaysLeftInMonth()} days left</h4>
                  <p className="text-xs text-orange-300/80">until end of current month</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[12rem] text-center text-slate-500 relative z-10">
              <Trophy className="h-12 w-12 text-slate-700 mb-3" />
              <p className="text-slate-400">Enter your data and click calculate<br />to see your projected earnings</p>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-6 overflow-hidden">
        <h3 className="text-base font-bold text-slate-800 mb-4">Payout Reference</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Slab</th>
                <th className="px-5 py-3.5 font-semibold">Requirement Range</th>
                <th className="px-5 py-3.5 font-semibold text-right">Earning Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {structureData?.table.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3 font-medium">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
                      {row.slab} {getSlabSymbol(row.slab)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-600 font-medium">{row.range}</td>
                  <td className="px-5 py-3 font-bold text-indigo-600 text-right">{row.earning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
