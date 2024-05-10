import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Button, Form, Input, message, Typography, Space } from 'antd';
import { userPool } from './config';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    const { email, password } = values;

    const authenticationData = {
      Username: email,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        localStorage.setItem('accessToken', accessToken);
        message.success('Login successful');
        navigate('/authenticated');
      },
      onFailure: (err) => {
        message.error(err.message);
        setLoading(false);
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title level={2}>Login</Title>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <Space>
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Sign Up</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
