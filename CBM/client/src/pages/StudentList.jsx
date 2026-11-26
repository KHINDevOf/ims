import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await studentApi.getAll(page, 10);
        setStudents(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [page]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <Link to="/students/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Student
        </Link>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Roll No.</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Class</th>
              <th className="p-4">Section</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">{student.rollNumber}</td>
                <td className="p-4">{student.fullName}</td>
                <td className="p-4 text-sm text-gray-600">{student.email}</td>
                <td className="p-4">{student.class}</td>
                <td className="p-4">{student.section}</td>
                <td className="p-4">
                  <Link to={`/students/${student._id}`} className="text-blue-600 hover:underline mr-3">
                    View
                  </Link>
                  <Link to={`/students/${student._id}/edit`} className="text-green-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-gray-600">Page {pagination.page} of {pagination.pages} (Total: {pagination.total})</span>
        <div className="space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pagination.pages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
