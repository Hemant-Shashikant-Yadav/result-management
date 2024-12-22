import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import LoginForm from './common/LoginForm';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check against hardcoded admin credentials
      if (username === 'admin' && password === 'admin123') {
        navigate('/admin-dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const fields = [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      value: username,
      onChange: setUsername,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      value: password,
      onChange: setPassword,
    },
  ];

  return (
    <LoginForm
      title="Admin Login"
      Icon={Lock}
      iconColor="text-blue-600"
      fields={fields}
      onSubmit={handleLogin}
      error={error}
    />
  );
}