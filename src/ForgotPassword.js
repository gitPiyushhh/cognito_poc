import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Form, Input, message, Typography } from 'antd';
import { userPool } from './config';

const { Title } = Typography;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    const { email } = values;

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        message.success('Password reset code sent successfully');
        navigate('/reset-password', { state: { email } });
      },
      onFailure: (err) => {
        message.error(err.message);
        setLoading(false);
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title level={2}>Forgot Password</Title>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
