import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';
import { LogOut } from 'lucide-react';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
        
        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="teachers">Teacher Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>
          
          <TabsContent value="teachers">
            <TeacherManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}