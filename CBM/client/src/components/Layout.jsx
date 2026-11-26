import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Layout() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white shadow-lg">
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold">CBM</h1>
          <p className="text-sm text-blue-300">Student Records</p>
        </div>

        <nav className="p-4 space-y-2">
          <Link to="/" className="block px-4 py-3 rounded hover:bg-blue-800 transition">📊 Dashboard</Link>
          <Link to="/students" className="block px-4 py-3 rounded hover:bg-blue-800 transition">👥 Students</Link>
          <Link to="/attendance" className="block px-4 py-3 rounded hover:bg-blue-800 transition">📋 Attendance</Link>
          <Link to="/grades" className="block px-4 py-3 rounded hover:bg-blue-800 transition">📚 Grades</Link>
          <Link to="/reports" className="block px-4 py-3 rounded hover:bg-blue-800 transition">📈 Reports</Link>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-blue-800">
          <div className="text-sm mb-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-blue-300 text-xs capitalize">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
