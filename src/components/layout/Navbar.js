import React from 'react';
import { Wind, LogOut, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="flex h-16 items-center px-6 justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
            <Wind className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Respiratory Incentive
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 border border-indigo-100">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-bold text-indigo-700">48948</span>
            </div>
            <span className="text-sm font-medium text-slate-500 hidden md:block">
              Mumbai Central • West • West Zone
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors bg-transparent hover:bg-rose-50 px-3 py-2 rounded-lg"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
