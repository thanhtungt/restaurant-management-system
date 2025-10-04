import React from 'react';
import './App.css';
import AppRoutes from './routes';
import { ConfigProvider, App as AntApp } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <AntApp>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
