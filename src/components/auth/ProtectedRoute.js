import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

/**
 * A component that wraps protected routes.
 * Redirects to /login if the employeeId cookie is missing.
 */
export function ProtectedRoute({ children }) {
  const employeeId = Cookies.get('employeeId');

  if (!employeeId) {
    // Redirect context-aware if needed, but for now just to /login
    return <Navigate to="/login" replace />;
  }

  // If children are provided (wrapper style), render them;
  // otherwise render the Outlet (layout style).
  return children ? children : <Outlet />;
}
