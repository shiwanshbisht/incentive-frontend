import React from 'react';
import { FileText, Calculator, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "../../lib/utils";

export function SubNavbar() {
  const location = useLocation();

  const navItems = [
    { name: 'Structure', path: '/dashboard/structure', icon: FileText },
    { name: 'Calculator', path: '/dashboard/calculator', icon: Calculator },
    { name: 'My Calculations', path: '/dashboard/history', icon: History },
  ];

  return (
    <div className="w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-14 items-center px-6 gap-6 max-w-[1400px] mx-auto overflow-x-auto nice-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "relative flex h-full items-center gap-2 px-1 text-sm font-medium transition-colors hover:text-slate-900 whitespace-nowrap",
                isActive ? "text-blue-600" : "text-slate-500"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
              
              {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
