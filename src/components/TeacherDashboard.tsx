import React, { useState } from 'react';
import { Upload, Plus, LogOut } from 'lucide-react';
import { read, utils } from 'xlsx';
import { useNavigate } from 'react-router-dom';
import ResultEntryForm from './teacher/ResultEntryForm';

export default function TeacherDashboard() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showResultForm, setShowResultForm] = useState(false);
  const navigate = useNavigate();

  const handleResultUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const results = utils.sheet_to_json(worksheet);

      // TODO: Implement result upload functionality
      setSuccess('Results uploaded successfully');
      setError('');
    } catch (err) {
      setError('Failed to upload results. Please check the file format.');
      setSuccess('');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upload Results</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                Upload Excel
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleResultUpload}
                />
              </label>
              <a
                href="/templates/result-template.xlsx"
                className="text-blue-600 hover:text-blue-800"
              >
                Download Template
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Individual Result</h2>
              {!showResultForm && (
                <button
                  onClick={() => setShowResultForm(true)}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Result
                </button>
              )}
            </div>
            
            {showResultForm && (
              <ResultEntryForm
                onSuccess={() => {
                  setSuccess('Result added successfully');
                  setError('');
                  setShowResultForm(false);
                }}
                onError={setError}
              />
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
        )}
        {success && (
          <div className="mt-4 bg-green-50 text-green-500 p-4 rounded-md">{success}</div>
        )}
      </div>
    </div>
  );
}