import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { SubNavbar } from '../components/layout/SubNavbar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-[#F8FAFC]">
      {/* Background radial gradient shown in lovable app */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-40 blur-[120px] bg-indigo-100 mix-blend-multiply"></div>
      </div>
      
      <div className="relative z-10 flex flex-col flex-1 h-full w-full">
        <Navbar />
        <SubNavbar />
        
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
