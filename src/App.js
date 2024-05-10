import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logout from './Logout';
import Login from './Login'
import AuthenticatedPage from './AuthenticatedPage';
import ConfirmationPage from './ConfirmationPage';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuthentication = () => {
      const accessToken = localStorage.getItem('accessToken');
      setIsAuthenticated(accessToken !== null);
    };

    checkAuthentication();
    window.addEventListener('storage', checkAuthentication);

    return () => {
      window.removeEventListener('storage', checkAuthentication);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/authenticated" element={<AuthenticatedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
