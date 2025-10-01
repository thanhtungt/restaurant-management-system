import React from 'react';
import './App.css';
import AppRoutes from './routes';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
