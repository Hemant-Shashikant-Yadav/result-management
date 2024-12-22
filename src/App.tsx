import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import AdminLogin from './components/AdminLogin';
import TeacherLogin from './components/TeacherLogin';
import ViewResult from './components/ViewResult';
import AdminDashboard from './components/admin/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/view-result" element={<ViewResult />} />
      </Routes>
    </Router>
  );
}

export default App;