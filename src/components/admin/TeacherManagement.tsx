import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { read, utils } from 'xlsx';
import { addTeacher, addTeacherBulk } from '../../db/teachers';
import TeacherForm from './TeacherForm';
import { Teacher } from '../../types';

export default function TeacherManagement() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const teachers: Teacher[] = utils.sheet_to_json(worksheet);

      await addTeacherBulk(teachers);
      setSuccess('Teachers imported successfully');
      setError('');
    } catch (err) {
      setError('Failed to import teachers. Please check the file format.');
      setSuccess('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
        <TeacherForm
          onSuccess={() => setSuccess('Teacher added successfully')}
          onError={(msg) => setError(msg)}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Import Teachers</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
            <Upload className="w-5 h-5 mr-2" />
            Upload Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <a
            href="/templates/teacher-template.xlsx"
            className="text-blue-600 hover:text-blue-800"
          >
            Download Template
          </a>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 text-green-500 p-4 rounded-md">{success}</div>
      )}
    </div>
  );
}