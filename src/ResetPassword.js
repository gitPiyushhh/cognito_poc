import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Form, Input, message, Typography } from 'antd';
import { userPool } from './config';

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onFinish = async (values) => {
    setLoading(true);

    const { code, newPassword } = values;

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        message.success('Password reset successfully');
        navigate('/login');
      },
      onFailure: (err) => {
        message.error(err.message);
        setLoading(false);
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title level={2}>Reset Password</Title>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: 'Please enter the reset code',
            },
          ]}
        >
          <Input placeholder="Reset Code" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              min: 6,
              message: 'Password must be at least 6 characters',
            },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;