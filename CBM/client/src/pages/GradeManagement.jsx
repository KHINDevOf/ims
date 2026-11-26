import React, { useState } from 'react';
import { studentApi } from '../services/api';

export default function GradeManagement() {
  const [studentId, setStudentId] = useState('');
  const [grades, setGrades] = useState(null);
  const [form, setForm] = useState({
    subject: '',
    exam: '',
    marks: '',
    outOf: 100,
    grade: ''
  });
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setSearchError(null);
      const res = await studentApi.getGrades(studentId);
      setGrades(res.data.data);
    } catch (err) {
      setSearchError(err.response?.data?.message || 'Failed to load grades');
      setGrades(null);
    }
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    try {
      await studentApi.addGrade(studentId, form);
      alert('Grade added successfully!');
      setForm({ subject: '', exam: '', marks: '', outOf: 100, grade: '' });
      const res = await studentApi.getGrades(studentId);
      setGrades(res.data.data);
    } catch (err) {
      alert('Failed to add grade: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Grade Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search & Add Grade Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search Student */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Search Student</h2>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Search
              </button>
            </form>
            {searchError && <div className="text-red-600 mt-2 text-sm">{searchError}</div>}
          </div>

          {/* Add Grade Form */}
          {grades && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Add Grade</h2>
              <form onSubmit={handleAddGrade} className="space-y-3">
                <input
                  type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Exam Name"
                  value={form.exam}
                  onChange={(e) => setForm({ ...form, exam: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Marks"
                  value={form.marks}
                  onChange={(e) => setForm({ ...form, marks: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Out Of"
                  value={form.outOf}
                  onChange={(e) => setForm({ ...form, outOf: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Grade (A/B/C/D)"
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Add Grade
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Grades Display */}
        <div className="lg:col-span-2">
          {grades ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">{grades.student.name}</h2>
              <p className="text-gray-600 mb-4">Roll: {grades.student.rollNumber}</p>

              <div className="mb-6 p-4 bg-blue-100 rounded">
                <p className="text-lg"><span className="font-semibold">Average Percentage:</span> <span className="text-2xl text-blue-600">{grades.average}%</span></p>
              </div>

              <table className="w-full text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border">Subject</th>
                    <th className="p-3 border">Exam</th>
                    <th className="p-3 border">Marks</th>
                    <th className="p-3 border">Percentage</th>
                    <th className="p-3 border">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.grades?.length > 0 ? (
                    grades.grades.map((grade, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-3 border">{grade.subject}</td>
                        <td className="p-3 border">{grade.exam}</td>
                        <td className="p-3 border">{grade.marks}/{grade.outOf}</td>
                        <td className="p-3 border font-semibold">{grade.percentage.toFixed(1)}%</td>
                        <td className="p-3 border">{grade.grade || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="p-4 text-center text-gray-600">No grades recorded</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-600">
              Search a student to view and manage their grades
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
