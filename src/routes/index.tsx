import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../modules/dashboard/pages/DashboardPage';
import TableManagementPage from '../modules/table-management/pages/TableManagementPage';
import OrderHistoryPage from '../modules/order/pages/OrderHistoryPage';
import MainLayout from '../layouts/MainLayout';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tables" element={<TableManagementPage />} />
          <Route path="orders/history" element={<OrderHistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;