import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../modules/dashboard/pages/DashboardPage';
import TableManagementPage from '../modules/table-management/pages/TableManagementPage';
import OrderHistoryPage from '../modules/order/pages/OrderHistoryPage';
import LoginPage from '../modules/auth/pages/LoginPage';
import MainLayout from '../layouts/MainLayout';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../context/AuthContext';

const AppRoutes: React.FC = () => {
  const { authState } = useAuth();

  // Determine default route based on user role
  const getDefaultRoute = () => {
    if (!authState.isAuthenticated) return '/login';
    return authState.user?.role === 'admin' ? '/dashboard' : '/tables';
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="login" element={<LoginPage />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
        
        {/* Protected routes in MainLayout */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* Admin only routes */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="dashboard" element={<DashboardPage />} />
              {/* Other admin routes can be added here */}
            </Route>
            
            {/* Common routes for both admin and waiter */}
            <Route path="tables" element={<TableManagementPage />} />
            <Route path="orders/history" element={<OrderHistoryPage />} />
          </Route>
        </Route>
        
        {/* 404 - Not found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;