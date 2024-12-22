import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
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