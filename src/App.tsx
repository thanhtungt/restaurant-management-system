import React from 'react';
import './App.css';
import AppRoutes from './routes';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
