import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthCredentials } from '../../../types/user';

const { Title } = Typography;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -250px;
    right: -250px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    bottom: -200px;
    left: -200px;
  }
`;

const LoginCard = styled(Card)`
  width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  border: none;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: 1;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 16px;
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #0088FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.div`
  text-align: center;
  margin-bottom: 32px;
  font-size: 14px;
  color: #8c8c8c;
  font-weight: 500;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 20px;
  }
  
  .ant-input-affix-wrapper {
    border-radius: 12px;
    padding: 12px 16px;
    border: 2px solid #f0f0f0;
    transition: all 0.3s;
    
    &:hover {
      border-color: #667eea;
    }
    
    &:focus, &.ant-input-affix-wrapper-focused {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  .ant-input {
    font-size: 15px;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const DemoAccounts = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 12px;
  text-align: center;
  
  p {
    margin: 8px 0;
    font-size: 13px;
    color: #595959;
    font-weight: 500;
    
    &:first-child {
      font-weight: 700;
      color: #262626;
      margin-bottom: 12px;
    }
  }
`;

const LoginPage: React.FC = () => {
  const { authState, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // If user is already authenticated, redirect based on role
  if (authState.isAuthenticated) {
    const redirectPath = authState.user?.role === 'admin' ? '/dashboard' : '/tables';
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (values: any) => {
    const credentials: AuthCredentials = {
      username: values.username,
      password: values.password
    };
    setLoading(true);
    setError(null);
    
    try {
      const success = await login(credentials);
      if (success) {
        // Redirect will happen automatically due to the conditional redirect above
      }
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>🍽️ ShineWay</Logo>
        <Subtitle>Hệ thống quản lý nhà hàng</Subtitle>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon 
            style={{ marginBottom: 24, borderRadius: '12px' }} 
          />
        )}
        
        <StyledForm
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#667eea', fontSize: '18px' }} />} 
              placeholder="Tên đăng nhập" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#667eea', fontSize: '18px' }} />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: '32px', marginBottom: 0 }}>
            <LoginButton type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </LoginButton>
          </Form.Item>
        </StyledForm>
        
        <DemoAccounts>
          <p>Tài khoản demo</p>
          <p>👤 Admin: admin / 123456</p>
          <p>👤 Nhân viên: waiter / 123456</p>
        </DemoAccounts>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;