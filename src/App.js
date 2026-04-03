import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { DashboardLayout } from './layouts/DashboardLayout';
import { StructurePage } from './pages/StructurePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Cookies from 'js-cookie';

function App() {
  const isAuth = !!Cookies.get('employeeId');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to={isAuth ? "/dashboard/structure" : "/login"} replace />} 
        />
        
        <Route 
          path="/login" 
          element={isAuth ? <Navigate to="/dashboard/structure" replace /> : <Login />} 
        />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/structure" replace />} />
          <Route path="structure" element={<StructurePage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
