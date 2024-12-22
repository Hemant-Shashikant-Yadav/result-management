import React from 'react';

interface Result {
  name: string;
  university_id: string;
  class: string;
  division: string;
  subject: string;
  marks: number;
}

interface ResultDisplayProps {
  results: Result[];
}

export default function ResultDisplay({ results }: ResultDisplayProps) {
  if (results.length === 0) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Result Details</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-medium">Name:</span> {results[0].name}</p>
          <p><span className="font-medium">University ID:</span> {results[0].university_id}</p>
          <p><span className="font-medium">Class:</span> {results[0].class}</p>
          <p><span className="font-medium">Division:</span> {results[0].division}</p>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{result.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}