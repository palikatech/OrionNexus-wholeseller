import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './components/auth/Login';
import DistributorDashboard from './components/distributor/DistributorDashboard';
import WholesalerDashboard from './components/wholesaler/WholesalerDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route
                path="/distributor/*"
                element={
                  <ProtectedRoute requiredRole="distributor">
                    <DistributorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wholesaler/*"
                element={
                  <ProtectedRoute requiredRole="wholesaler">
                    <WholesalerDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;