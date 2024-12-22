import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { findTeacher } from '../db/auth';
import LoginForm from './common/LoginForm';

export default function TeacherLogin() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { employeeId, password });
      const teacher = await findTeacher(employeeId, password);
      console.log('Login result:', teacher);
      
      if (teacher) {
        navigate('/teacher-dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const fields = [
    {
      id: 'employeeId',
      label: 'Employee ID',
      type: 'text',
      value: employeeId,
      onChange: setEmployeeId,
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
      title="Teacher Login"
      Icon={GraduationCap}
      iconColor="text-green-600"
      fields={fields}
      onSubmit={handleLogin}
      error={error}
    />
  );
}