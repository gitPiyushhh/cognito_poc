import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Button, Form, Input, message, Typography } from 'antd';
import { userPool } from './config';

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    const { email, password, name } = values;

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: 'name',
        Value: name,
      }),
    ];

    try {
      await new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, null, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      message.success('Registration successful. Please check your email for verification.');
      localStorage.setItem('email', email);
      navigate('/confirmation');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title level={2}>Register</Title>
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
              min: 6,
              message: 'Password must be at least 6 characters',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter your name',
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
