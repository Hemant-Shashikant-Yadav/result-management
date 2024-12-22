import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { findStudentResults } from '../db/results';
import ResultForm from './common/ResultForm';
import ResultDisplay from './common/ResultDisplay';

export default function ViewResult() {
  const [universityId, setUniversityId] = useState('');
  const [mothersName, setMothersName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDiv, setSelectedDiv] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const studentResults = await findStudentResults(
        universityId,
        mothersName,
        selectedClass,
        selectedDiv
      );

      if (studentResults.length > 0) {
        setResults(studentResults);
        setError('');
      } else {
        setError('No results found. Please check your details.');
        setResults([]);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <ClipboardList className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">View Result</h2>
          </div>

          <ResultForm
            universityId={universityId}
            setUniversityId={setUniversityId}
            mothersName={mothersName}
            setMothersName={setMothersName}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            selectedDiv={selectedDiv}
            setSelectedDiv={setSelectedDiv}
            onSubmit={handleSubmit}
            error={error}
          />

          <ResultDisplay results={results} />
        </div>
      </div>
    </div>
  );
}