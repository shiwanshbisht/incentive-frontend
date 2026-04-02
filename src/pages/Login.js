import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wind, User, Phone } from 'lucide-react';
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Cookies from "js-cookie";

export function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSuccessSpinner, setShowSuccessSpinner] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);
    try {
      const response = await axios.post(
        `https://incentive-backend-na5x.onrender.com/login`,
        {
          employeeId: employeeId.trim(),
          mobileNumber: mobileNumber.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        Cookies.set("employeeId", result.user.employeeId);
        setShowSuccessSpinner(true);
        setTimeout(() => {
          navigate('/dashboard/structure');
        }, 800);
      } else {
        setIsLoggingIn(false);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      if (err.response && err.response.data) {
        if (err.response.data.error) {
          setError(err.response.data.error); // "Incorrect password", "Email is not valid"
        } else if (err.response.data.errors) {
          setError(err.response.data.errors[0].msg); // Validation array errors
        } else {
          setError("Failed to login. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      {/* Success Overlay Spinner */}
      {showSuccessSpinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm transition-all duration-300">
          <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-100 border-t-indigo-600"></div>
            <p className="text-slate-700 font-medium animate-pulse">Login successful! Redirecting...</p>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 max-w-[800px] rounded-full opacity-60 blur-[120px] bg-blue-100 mix-blend-multiply"></div>
      </div>

      <Card className="w-full max-w-md z-10 shadow-xl border-slate-100 p-2 mx-4">
        <CardHeader className="text-center space-y-4 pb-8 pt-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
            <Wind className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-slate-500">
            Sign in to access the Respiratory Incentive Dashboard.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
                {error}
              </div>
            )}
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-700 ml-1">Employee ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:bg-slate-100/50"
                  placeholder="e.g. 48948"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-700 ml-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:bg-slate-100/50"
                  placeholder="e.g. 8879714579"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
