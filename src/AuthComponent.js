import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Button, Form, Input, message } from 'antd';

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const { email, password, name } = values;

    const poolData = {
      UserPoolId: 'ap-south-1_R7qEwjagO',
      ClientId: '2a3498ir6ad8acsc7rono1uepa',
    };

    const userPool = new CognitoUserPool(poolData);

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
      const result = await new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, null, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      message.success('Registration successful. Please check your email for verification.');
      form.resetFields();
    } catch (error) {
      message.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Register</h2>
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
