'use client';

import { useEffect, useState } from 'react';
import { scheduleAPI } from '@/lib/api';

function getInitialFormData() {
  return {
    item_type: 'fixture',
    opponent: '',
    competition: '',
    venue: '',
    match_date: '',
    match_time: '',
    is_home: true,
    goals_for: '',
    goals_against: '',
    notes: '',
  };
}

export default function ScheduleAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await scheduleAPI.getAll();
      setItems(res.data.results || res.data);
    } catch (error) {
      console.error('Error fetching schedule items:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(getInitialFormData());
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      item_type: item.item_type || 'fixture',
      opponent: item.opponent || '',
      competition: item.competition || '',
      venue: item.venue || '',
      match_date: item.match_date || '',
      match_time: item.match_time ? item.match_time.slice(0, 5) : '',
      is_home: item.is_home ?? true,
      goals_for: item.goals_for ?? '',
      goals_against: item.goals_against ?? '',
      notes: item.notes || '',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this schedule item?')) {
      return;
    }
    try {
      await scheduleAPI.delete(id);
      await fetchItems();
    } catch (error) {
      console.error('Error deleting schedule item:', error);
    }
  };

  const handleSave = async () => {
    if (!formData.opponent || !formData.match_date) {
      alert('Opponent and match date are required.');
      return;
    }

    const payload = {
      ...formData,
      goals_for: formData.item_type === 'result' && formData.goals_for !== '' ? parseInt(formData.goals_for, 10) : null,
      goals_against: formData.item_type === 'result' && formData.goals_against !== '' ? parseInt(formData.goals_against, 10) : null,
    };

    try {
      if (editingId) {
        await scheduleAPI.update(editingId, payload);
      } else {
        await scheduleAPI.create(payload);
      }
      await fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error saving schedule item:', error);
      alert('Failed to save schedule item.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Schedule Management</h1>

      <div className="bg-fc-dark rounded-lg p-6 mb-8 border border-fc-orange/20">
        <h2 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Item' : 'Add Item'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={formData.item_type}
            onChange={(e) => setFormData({ ...formData, item_type: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          >
            <option value="fixture">Fixture</option>
            <option value="result">Result</option>
          </select>

          <input
            type="text"
            placeholder="Opponent"
            value={formData.opponent}
            onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />

          <input
            type="text"
            placeholder="Competition"
            value={formData.competition}
            onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />

          <input
            type="text"
            placeholder="Venue"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />

          <input
            type="date"
            value={formData.match_date}
            onChange={(e) => setFormData({ ...formData, match_date: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />

          <input
            type="time"
            value={formData.match_time}
            onChange={(e) => setFormData({ ...formData, match_time: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />

          <select
            value={formData.is_home ? 'home' : 'away'}
            onChange={(e) => setFormData({ ...formData, is_home: e.target.value === 'home' })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          >
            <option value="home">Home</option>
            <option value="away">Away</option>
          </select>

          {formData.item_type === 'result' && (
            <>
              <input
                type="number"
                placeholder="Goals For"
                value={formData.goals_for}
                onChange={(e) => setFormData({ ...formData, goals_for: e.target.value })}
                className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
              />
              <input
                type="number"
                placeholder="Goals Against"
                value={formData.goals_against}
                onChange={(e) => setFormData({ ...formData, goals_against: e.target.value })}
                className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
              />
            </>
          )}

          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none md:col-span-2"
            rows={3}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={handleSave} className="btn-primary">
            {editingId ? 'Update Item' : 'Add Item'}
          </button>
          {editingId && (
            <button onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="bg-fc-dark rounded-lg overflow-hidden border border-fc-orange/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-fc-darker border-b border-fc-orange/20">
              <tr>
                <th className="px-6 py-3 text-left text-white font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Opponent</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Venue</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Score</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">Loading...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">No schedule items yet</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b border-fc-orange/10 hover:bg-fc-darker transition">
                    <td className="px-6 py-4 text-white uppercase">{item.item_type}</td>
                    <td className="px-6 py-4 text-white">{item.opponent}</td>
                    <td className="px-6 py-4 text-gray-300">{item.match_date}{item.match_time ? ` ${item.match_time.slice(0, 5)}` : ''}</td>
                    <td className="px-6 py-4 text-gray-300">{item.venue || '-'}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {item.item_type === 'result' && item.goals_for !== null && item.goals_against !== null
                        ? `${item.goals_for} - ${item.goals_against}`
                        : '-'}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEdit(item)} className="text-fc-orange hover:text-orange-400 transition">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 transition">Delete</button>
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
