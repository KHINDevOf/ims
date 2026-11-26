import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentApi } from '../services/api';

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    rollNumber: '', firstName: '', lastName: '', email: '', phoneNumber: '',
    dateOfBirth: '', class: '', section: 'A', gender: '',
    address: { street: '', city: '', state: '', postalCode: '' },
    parentInfo: { fatherName: '', motherName: '', parentPhone: '', parentEmail: '' }
  });

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const res = await studentApi.getById(id);
          setForm(res.data.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load student');
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setForm(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await studentApi.update(id, form);
      } else {
        await studentApi.create(form);
      }
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save student');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Student' : 'Add New Student'}</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-2 rounded" required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" required />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} className="border p-2 rounded" />
            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="border p-2 rounded" />
            <select name="class" value={form.class} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Class</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
            <select name="section" value={form.section} onChange={handleChange} className="border p-2 rounded">
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Street" value={form.address.street} onChange={(e) => handleNestedChange('address', 'street', e.target.value)} className="border p-2 rounded" />
            <input placeholder="City" value={form.address.city} onChange={(e) => handleNestedChange('address', 'city', e.target.value)} className="border p-2 rounded" />
            <input placeholder="State" value={form.address.state} onChange={(e) => handleNestedChange('address', 'state', e.target.value)} className="border p-2 rounded" />
            <input placeholder="Postal Code" value={form.address.postalCode} onChange={(e) => handleNestedChange('address', 'postalCode', e.target.value)} className="border p-2 rounded" />
          </div>
        </div>

        {/* Parent Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Parent Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Father's Name" value={form.parentInfo.fatherName} onChange={(e) => handleNestedChange('parentInfo', 'fatherName', e.target.value)} className="border p-2 rounded" />
            <input placeholder="Mother's Name" value={form.parentInfo.motherName} onChange={(e) => handleNestedChange('parentInfo', 'motherName', e.target.value)} className="border p-2 rounded" />
            <input placeholder="Parent Phone" value={form.parentInfo.parentPhone} onChange={(e) => handleNestedChange('parentInfo', 'parentPhone', e.target.value)} className="border p-2 rounded" />
            <input placeholder="Parent Email" value={form.parentInfo.parentEmail} onChange={(e) => handleNestedChange('parentInfo', 'parentEmail', e.target.value)} className="border p-2 rounded" />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            {id ? 'Update' : 'Create'} Student
          </button>
          <button type="button" onClick={() => navigate('/students')} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
