import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AuthenticatedPage = () => {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <Title>Welcome!</Title>
      <Paragraph>You are logged in.</Paragraph>
      <Button type="primary" icon={<LogoutOutlined />}>
        <Link to="/logout" style={{ color: 'white' }}>
          Logout
        </Link>
      </Button>
    </div>
  );
};

export default AuthenticatedPage;
