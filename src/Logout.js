import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { userPool } from './config';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await userPool.getCurrentUser().signOut();
        localStorage.removeItem('accessToken');
        message.success('Logged out successfully');
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error);
        message.error('Error logging out');
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default Logout;
