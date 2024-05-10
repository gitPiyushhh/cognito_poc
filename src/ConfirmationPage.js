import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from './config';
import { Button, Form, Input, message, Typography } from 'antd';

const { Title } = Typography;

const ConfirmationPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    const { confirmationCode } = values;

    const cognitoUser = new CognitoUser({
      Username: localStorage.getItem('email'),
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        message.error(err.message);
      } else {
        message.success('Registration confirmed successfully.');
        navigate('/login');
      }
      setLoading(false);
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title level={2}>Confirm Registration</Title>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="confirmationCode"
          rules={[
            {
              required: true,
              message: 'Please enter the confirmation code',
            },
          ]}
        >
          <Input placeholder="Confirmation Code" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConfirmationPage;
