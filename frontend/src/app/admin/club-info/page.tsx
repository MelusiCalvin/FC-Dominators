'use client';

import { useEffect, useState } from 'react';
import { clubInfoAPI } from '@/lib/api';
import type { ClubInfo } from '@/types';

export default function ClubInfoAdmin() {
  const [clubInfo, setClubInfo] = useState<ClubInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    established_year: 2010,
    description: '',
    mission: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    active_members: 0,
    expert_coaches: 0,
    programs: 0,
    years_of_excellence: 0,
  });

  useEffect(() => {
    fetchClubInfo();
  }, []);

  const fetchClubInfo = async () => {
    try {
      const res = await clubInfoAPI.get();
      const data = res.data.results?.[0] || res.data[0];
      if (data) {
        setClubInfo(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching club info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClubInfo = async () => {
    if (!clubInfo) return;

    try {
      await clubInfoAPI.update(clubInfo.id, formData);
      fetchClubInfo();
      alert('Club information updated successfully!');
    } catch (error) {
      console.error('Error updating club info:', error);
      alert('Error updating club information');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Club Information</h1>

      <div className="bg-fc-dark rounded-lg p-6 border border-fc-orange/20 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Club Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Established Year</label>
            <input
              type="number"
              value={formData.established_year}
              onChange={(e) => setFormData({ ...formData, established_year: parseInt(e.target.value) })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Active Members</label>
            <input
              type="number"
              value={formData.active_members}
              onChange={(e) => setFormData({ ...formData, active_members: parseInt(e.target.value) })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Expert Coaches</label>
            <input
              type="number"
              value={formData.expert_coaches}
              onChange={(e) => setFormData({ ...formData, expert_coaches: parseInt(e.target.value) })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Programs</label>
            <input
              type="number"
              value={formData.programs}
              onChange={(e) => setFormData({ ...formData, programs: parseInt(e.target.value) })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">Years of Excellence</label>
            <input
              type="number"
              value={formData.years_of_excellence}
              onChange={(e) => setFormData({ ...formData, years_of_excellence: parseInt(e.target.value) })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-400 text-sm font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
              rows={4}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-400 text-sm font-semibold mb-2">Mission Statement</label>
            <textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
              rows={4}
            />
          </div>
        </div>

        <button onClick={handleUpdateClubInfo} className="btn-primary mt-6">
          Update Club Information
        </button>
      </div>
    </div>
  );
}
