import React, { useState, useEffect } from 'react';
import { reportsApi } from '../services/api';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await reportsApi.dashboard();
        setData(res.data.dashboard);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Students" value={data?.totalStudents || 0} icon="👥" />
        <StatCard label="Total Exams" value={data?.totalExams || 0} icon="📝" />
        <StatCard label="Avg Attendance" value={`${data?.avgAttendance || 0}%`} icon="📊" />
        <StatCard label="Classes" value={data?.classBreakdown?.length || 0} icon="🏫" />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Class Breakdown</h2>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Class</th>
              <th className="border p-2">Student Count</th>
            </tr>
          </thead>
          <tbody>
            {data?.classBreakdown?.map((item) => (
              <tr key={item.class} className="hover:bg-gray-50">
                <td className="border p-2 font-semibold">Class {item.class}</td>
                <td className="border p-2">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
