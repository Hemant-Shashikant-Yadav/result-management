import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, GraduationCap, ClipboardList } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Result Management System</h1>
          <p className="text-gray-600">Welcome to the student result portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin-login')}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <UserCircle2 className="w-16 h-16 text-blue-600 mb-4" />
            <span className="text-xl font-semibold text-gray-800">Admin Login</span>
          </button>

          <button
            onClick={() => navigate('/teacher-login')}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <GraduationCap className="w-16 h-16 text-green-600 mb-4" />
            <span className="text-xl font-semibold text-gray-800">Teacher Login</span>
          </button>

          <button
            onClick={() => navigate('/view-result')}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <ClipboardList className="w-16 h-16 text-purple-600 mb-4" />
            <span className="text-xl font-semibold text-gray-800">View Result</span>
          </button>
        </div>
      </div>
    </div>
  );
}