'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { coachesAPI } from '@/lib/api';
import type { Coach } from '@/types';

export default function CoachesAdmin() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'head_coach',
    bio: '',
    experience_years: 0,
    certifications: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);

  const roles = ['head_coach', 'assistant_coach', 'fitness_coach', 'youth_coach'];

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const res = await coachesAPI.getAll();
      setCoaches(res.data.results || res.data);
    } catch (error) {
      console.error('Error fetching coaches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoach = async () => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    if (photo) {
      form.append('photo', photo);
    }

    try {
      if (editingId) {
        await coachesAPI.update(editingId, form);
      } else {
        await coachesAPI.create(form);
      }
      fetchCoaches();
      resetForm();
    } catch (error) {
      console.error('Error saving coach:', error);
    }
  };

  const handleDeleteCoach = async (id: number) => {
    if (confirm('Are you sure you want to delete this coach?')) {
      try {
        await coachesAPI.delete(id);
        fetchCoaches();
      } catch (error) {
        console.error('Error deleting coach:', error);
      }
    }
  };

  const handleEdit = (coach: Coach) => {
    setEditingId(coach.id);
    setFormData({
      name: coach.name,
      role: coach.role,
      bio: coach.bio,
      experience_years: coach.experience_years,
      certifications: coach.certifications || '',
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: 'head_coach',
      bio: '',
      experience_years: 0,
      certifications: '',
    });
    setPhoto(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Coach Management</h1>

      {/* Add/Edit Form */}
      <div className="bg-fc-dark rounded-lg p-6 mb-8 border border-fc-orange/20">
        <h2 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Coach' : 'Add New Coach'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Coach Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.split('_').join(' ').toUpperCase()}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Years of Experience"
            value={formData.experience_years}
            onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            accept="image/*"
          />
          <textarea
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none col-span-2"
            rows={3}
          />
          <textarea
            placeholder="Certifications"
            value={formData.certifications}
            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none col-span-2"
            rows={2}
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button onClick={handleAddCoach} className="btn-primary">
            {editingId ? 'Update Coach' : 'Add Coach'}
          </button>
          {editingId && (
            <button onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Coaches List */}
      <div className="bg-fc-dark rounded-lg overflow-hidden border border-fc-orange/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-fc-darker border-b border-fc-orange/20">
              <tr>
                <th className="px-6 py-3 text-left text-white font-semibold">Photo</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Experience</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : coaches.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No coaches yet
                  </td>
                </tr>
              ) : (
                coaches.map((coach) => (
                  <tr key={coach.id} className="border-b border-fc-orange/10 hover:bg-fc-darker transition">
                    <td className="px-6 py-4">
                      {coach.photo && (
                        <div className="w-10 h-10 relative rounded-full overflow-hidden">
                          <Image
                            src={coach.photo}
                            alt={coach.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">{coach.name}</td>
                    <td className="px-6 py-4 text-gray-400">
                      <span className="bg-fc-orange/20 text-fc-orange px-2 py-1 rounded text-sm">
                        {coach.role.split('_').join(' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{coach.experience_years}+ years</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(coach)}
                        className="text-fc-orange hover:text-orange-400 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCoach(coach.id)}
                        className="text-red-500 hover:text-red-400 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
