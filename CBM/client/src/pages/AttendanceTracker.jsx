import React, { useState, useEffect } from 'react';
import { studentApi } from '../services/api';

export default function AttendanceTracker() {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await studentApi.searchByClass(selectedClass, selectedSection);
        setStudents(res.data.data);
        const att = {};
        res.data.data.forEach(s => att[s._id] = 'Present');
        setAttendance(att);
      } catch (err) {
        console.error('Failed to load students:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [selectedClass, selectedSection]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const [studentId, status] of Object.entries(attendance)) {
        await studentApi.addAttendance(studentId, { date, status, remarksBy: 'Manual' });
      }
      alert('Attendance marked successfully!');
    } catch (err) {
      alert('Failed to mark attendance: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Attendance Tracker</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full border p-2 rounded">
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Section</label>
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="w-full border p-2 rounded">
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div className="flex items-end">
            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Attendance
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading students...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <table className="w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Roll No.</th>
                  <th className="p-3 border">Student Name</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="p-3 border">{student.rollNumber}</td>
                    <td className="p-3 border">{student.fullName}</td>
                    <td className="p-3 border">
                      <select
                        value={attendance[student._id] || 'Present'}
                        onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                        className="border p-1 rounded"
                      >
                        <option value="Present">✓ Present</option>
                        <option value="Absent">✗ Absent</option>
                        <option value="Leave">🏥 Leave</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        )}
      </div>
    </div>
  );
}
