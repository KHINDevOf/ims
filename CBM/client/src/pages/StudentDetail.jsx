import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { studentApi } from '../services/api';

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await studentApi.getById(id);
        setStudent(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load student');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="text-red-600 p-6">{error}</div>;
  if (!student) return <div className="p-6">Student not found</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{student.fullName}</h1>
        <div className="space-x-2">
          <Link to={`/students/${id}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit
          </Link>
          <button onClick={() => navigate('/students')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Back
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          {['info', 'attendance', 'grades', 'report'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="font-semibold">Roll Number:</span> {student.rollNumber}</div>
                  <div><span className="font-semibold">Email:</span> {student.email}</div>
                  <div><span className="font-semibold">Phone:</span> {student.phoneNumber}</div>
                  <div><span className="font-semibold">DOB:</span> {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'N/A'}</div>
                  <div><span className="font-semibold">Class:</span> {student.class}</div>
                  <div><span className="font-semibold">Section:</span> {student.section}</div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Parent Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="font-semibold">Father:</span> {student.parentInfo?.fatherName || 'N/A'}</div>
                  <div><span className="font-semibold">Mother:</span> {student.parentInfo?.motherName || 'N/A'}</div>
                  <div><span className="font-semibold">Parent Phone:</span> {student.parentInfo?.parentPhone || 'N/A'}</div>
                  <div><span className="font-semibold">Parent Email:</span> {student.parentInfo?.parentEmail || 'N/A'}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
              <table className="w-full text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {student.attendance?.length > 0 ? (
                    student.attendance.map((att, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-2 border">{new Date(att.date).toLocaleDateString()}</td>
                        <td className="p-2 border"><span className={`px-2 py-1 rounded text-white ${att.status === 'Present' ? 'bg-green-600' : att.status === 'Absent' ? 'bg-red-600' : 'bg-yellow-600'}`}>{att.status}</span></td>
                        <td className="p-2 border">{att.remarksBy || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="p-4 text-center text-gray-600">No attendance records</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'grades' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Grade Records</h2>
              <table className="w-full text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Subject</th>
                    <th className="p-2 border">Exam</th>
                    <th className="p-2 border">Marks</th>
                    <th className="p-2 border">Percentage</th>
                    <th className="p-2 border">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.grades?.length > 0 ? (
                    student.grades.map((grade, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-2 border">{grade.subject}</td>
                        <td className="p-2 border">{grade.exam}</td>
                        <td className="p-2 border">{grade.marks}/{grade.outOf}</td>
                        <td className="p-2 border">{grade.percentage.toFixed(2)}%</td>
                        <td className="p-2 border font-semibold">{grade.grade || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="p-4 text-center text-gray-600">No grade records</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'report' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Report Card</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded p-4">
                  <h3 className="font-semibold mb-2">Academic Performance</h3>
                  <p className="text-2xl font-bold text-blue-600">{student.grades?.length > 0 ? (student.grades.reduce((s, g) => s + g.percentage, 0) / student.grades.length).toFixed(1) : 0}%</p>
                </div>
                <div className="border rounded p-4">
                  <h3 className="font-semibold mb-2">Attendance</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {student.attendance?.length > 0 ? ((student.attendance.filter(a => a.status === 'Present').length / student.attendance.length) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
