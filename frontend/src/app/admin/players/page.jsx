'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { playersAPI } from '@/lib/api';

export default function PlayersAdmin() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: 'forward',
    jersey_number: 0,
    bio: '',
    nationality: '',
    height: '',
    weight: '',
    achievements: '',
  });
  const [photo, setPhoto] = useState(null);

  const positions = ['goalkeeper', 'defender', 'midfielder', 'forward'];

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await playersAPI.getAll();
      setPlayers(res.data.results || res.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async () => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    if (photo) {
      form.append('photo', photo);
    }

    try {
      if (editingId) {
        await playersAPI.update(editingId, form);
      } else {
        await playersAPI.create(form);
      }
      fetchPlayers();
      resetForm();
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  const handleDeletePlayer = async (id) => {
    if (confirm('Are you sure you want to delete this player?')) {
      try {
        await playersAPI.delete(id);
        fetchPlayers();
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }
  };

  const handleEdit = (player) => {
    setEditingId(player.id);
    setFormData({
      name: player.name,
      position: player.position,
      jersey_number: player.jersey_number,
      bio: player.bio,
      nationality: player.nationality || '',
      height: player.height || '',
      weight: player.weight || '',
      achievements: player.achievements || '',
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      position: 'forward',
      jersey_number: 0,
      bio: '',
      nationality: '',
      height: '',
      weight: '',
      achievements: '',
    });
    setPhoto(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Player Management</h1>

      {/* Add/Edit Form */}
      <div className="bg-fc-dark rounded-lg p-6 mb-8 border border-fc-orange/20">
        <h2 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Player' : 'Add New Player'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Player Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          >
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Jersey Number"
            value={formData.jersey_number}
            onChange={(e) => setFormData({ ...formData, jersey_number: parseInt(e.target.value) })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <input
            type="text"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <input
            type="text"
            placeholder="Height"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <input
            type="text"
            placeholder="Weight"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <textarea
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none col-span-2"
            rows={3}
          />
          <textarea
            placeholder="Achievements"
            value={formData.achievements}
            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none col-span-2"
            rows={2}
          />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none col-span-2"
            accept="image/*"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button onClick={handleAddPlayer} className="btn-primary">
            {editingId ? 'Update Player' : 'Add Player'}
          </button>
          {editingId && (
            <button onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Players List */}
      <div className="bg-fc-dark rounded-lg overflow-hidden border border-fc-orange/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-fc-darker border-b border-fc-orange/20">
              <tr>
                <th className="px-6 py-3 text-left text-white font-semibold">#</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Photo</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Position</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Jersey</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : players.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No players yet
                  </td>
                </tr>
              ) : (
                players.map((player) => (
                  <tr key={player.id} className="border-b border-fc-orange/10 hover:bg-fc-darker transition">
                    <td className="px-6 py-4 text-white font-semibold">{player.jersey_number}</td>
                    <td className="px-6 py-4">
                      {player.photo && (
                        <div className="w-10 h-10 relative rounded overflow-hidden">
                          <Image
                            src={player.photo}
                            alt={player.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">{player.name}</td>
                    <td className="px-6 py-4 text-gray-400">
                      <span className="bg-fc-orange/20 text-fc-orange px-2 py-1 rounded text-sm">
                        {player.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{player.jersey_number}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(player)}
                        className="text-fc-orange hover:text-orange-400 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlayer(player.id)}
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
