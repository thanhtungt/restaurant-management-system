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
  background-color: #f0f2f5;
`;

const LoginCard = styled(Card)`
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: bold;
  color: #1890ff;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 24px;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 40px;
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
        <Logo>ShineWay</Logo>
        <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>
          Đăng nhập
        </Title>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon 
            style={{ marginBottom: 24 }} 
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
              prefix={<UserOutlined />} 
              placeholder="Tên đăng nhập" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <LoginButton type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </LoginButton>
          </Form.Item>
          
          <div style={{ textAlign: 'center', opacity: 0.7 }}>
            <p>Tài khoản: admin / 123456</p>
            <p>Tài khoản: waiter / 123456</p>
          </div>
        </StyledForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;