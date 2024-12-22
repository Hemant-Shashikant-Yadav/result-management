import React, { useState } from 'react';
import { addResults } from '../../db/results';

interface ResultEntryFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

interface SubjectMarks {
  subject: string;
  marks: number;
}

export default function ResultEntryForm({ onSuccess, onError }: ResultEntryFormProps) {
  const [formData, setFormData] = useState({
    university_id: '',
    class: '',
    division: '',
    subjects: [
      { subject: 'Mathematics', marks: 0 },
      { subject: 'Science', marks: 0 },
      { subject: 'English', marks: 0 },
      { subject: 'History', marks: 0 }
    ]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate marks
      const invalidMarks = formData.subjects.some(
        subject => subject.marks < 0 || subject.marks > 100
      );
      
      if (invalidMarks) {
        onError('Marks must be between 0 and 100');
        return;
      }

      await addResults(
        formData.university_id,
        formData.class,
        formData.division,
        formData.subjects
      );
      
      setFormData({
        university_id: '',
        class: '',
        division: '',
        subjects: formData.subjects.map(s => ({ ...s, marks: 0 }))
      });
      
      onSuccess();
    } catch (err) {
      onError('Failed to add results. Please try again.');
    }
  };

  const handleMarksChange = (index: number, marks: number) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = { ...newSubjects[index], marks };
    setFormData({ ...formData, subjects: newSubjects });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            University ID
          </label>
          <input
            type="text"
            value={formData.university_id}
            onChange={(e) => setFormData({ ...formData, university_id: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <select
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select Class</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Division
          </label>
          <select
            value={formData.division}
            onChange={(e) => setFormData({ ...formData, division: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Marks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.subjects.map((subject, index) => (
            <div key={subject.subject}>
              <label className="block text-sm font-medium text-gray-700">
                {subject.subject}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={subject.marks}
                onChange={(e) => handleMarksChange(index, Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Results
      </button>
    </form>
  );
}