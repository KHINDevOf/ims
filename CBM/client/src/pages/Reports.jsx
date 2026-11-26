import React, { useState, useEffect } from 'react';
import { reportsApi } from '../services/api';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(null);
  const [selectedClass, setSelectedClass] = useState('10');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'dashboard') {
          const res = await reportsApi.dashboard();
          setData(res.data.dashboard);
        } else if (activeTab === 'attendance') {
          const res = await reportsApi.attendanceReport(selectedClass, filters.startDate, filters.endDate);
          setData(res.data);
        } else if (activeTab === 'academic') {
          const res = await reportsApi.academicReport(selectedClass);
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load report:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, selectedClass, filters]);

  const exportToCSV = () => {
    if (!data) return;
    const csv = JSON.stringify(data, null, 2);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${activeTab}-${new Date().getTime()}.csv`;
    a.click();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          📥 Export CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          {['dashboard', 'attendance', 'academic'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              {tab === 'dashboard' ? '📊 Dashboard' : tab === 'attendance' ? '📋 Attendance' : '📚 Academic'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Filters */}
          {activeTab !== 'dashboard' && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-2">Class</label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full border p-2 rounded">
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
              {activeTab === 'attendance' && (
                <>
                  <div>
                    <label className="block font-semibold mb-2">Start Date</label>
                    <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} className="w-full border p-2 rounded" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">End Date</label>
                    <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} className="w-full border p-2 rounded" />
                  </div>
                </>
              )}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : activeTab === 'dashboard' ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded">
                <div className="text-sm opacity-90">Total Students</div>
                <div className="text-3xl font-bold">{data?.totalStudents || 0}</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded">
                <div className="text-sm opacity-90">Total Exams</div>
                <div className="text-3xl font-bold">{data?.totalExams || 0}</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded">
                <div className="text-sm opacity-90">Avg Attendance</div>
                <div className="text-3xl font-bold">{data?.avgAttendance || 0}%</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded">
                <div className="text-sm opacity-90">Classes</div>
                <div className="text-3xl font-bold">{data?.classBreakdown?.length || 0}</div>
              </div>
            </div>
          ) : (
            <table className="w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  {activeTab === 'attendance' ? (
                    <>
                      <th className="p-3 border">Student Name</th>
                      <th className="p-3 border">Roll Number</th>
                      <th className="p-3 border">Total Days</th>
                      <th className="p-3 border">Present Days</th>
                      <th className="p-3 border">Percentage</th>
                    </>
                  ) : (
                    <>
                      <th className="p-3 border">Student Name</th>
                      <th className="p-3 border">Roll Number</th>
                      <th className="p-3 border">Avg Percentage</th>
                      <th className="p-3 border">Exams Taken</th>
                      <th className="p-3 border">Top Subject</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.report?.length > 0 ? (
                  data.report.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3 border">{row.name}</td>
                      <td className="p-3 border">{row.rollNumber}</td>
                      {activeTab === 'attendance' ? (
                        <>
                          <td className="p-3 border">{row.totalDays}</td>
                          <td className="p-3 border font-semibold">{row.presentDays}</td>
                          <td className="p-3 border"><span className="bg-green-100 text-green-800 px-3 py-1 rounded">{row.percentage}%</span></td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 border font-semibold">{row.averagePercentage}%</td>
                          <td className="p-3 border">{row.examsTaken}</td>
                          <td className="p-3 border">{row.topSubject}</td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="p-4 text-center text-gray-600">No data available</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
