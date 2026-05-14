'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminHome() {
  const [stats, setStats] = useState({
    players: 0,
    coaches: 0,
    testimonials: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [playersRes, coachesRes, testimonialsRes] = await Promise.all([
          fetch('http://localhost:8000/api/players/'),
          fetch('http://localhost:8000/api/coaches/'),
          fetch('http://localhost:8000/api/testimonials/'),
        ]);

        const playersData = await playersRes.json();
        const coachesData = await coachesRes.json();
        const testimonialsData = await testimonialsRes.json();

        setStats({
          players: playersData.results?.length || playersData.length || 0,
          coaches: coachesData.results?.length || coachesData.length || 0,
          testimonials: testimonialsData.results?.length || testimonialsData.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-fc-dark rounded-lg p-6 border border-fc-orange/20">
          <p className="text-gray-400 text-sm mb-2">Total Players</p>
          <p className="text-4xl font-bold text-fc-orange">{stats.players}</p>
        </div>
        <div className="bg-fc-dark rounded-lg p-6 border border-fc-orange/20">
          <p className="text-gray-400 text-sm mb-2">Total Coaches</p>
          <p className="text-4xl font-bold text-fc-orange">{stats.coaches}</p>
        </div>
        <div className="bg-fc-dark rounded-lg p-6 border border-fc-orange/20">
          <p className="text-gray-400 text-sm mb-2">Testimonials</p>
          <p className="text-4xl font-bold text-fc-orange">{stats.testimonials}</p>
        </div>
        <div className="bg-fc-dark rounded-lg p-6 border border-fc-orange/20">
          <p className="text-gray-400 text-sm mb-2">Quick Links</p>
          <Link href="/" className="text-fc-orange hover:text-orange-400">
            View Site →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/players" className="bg-fc-dark rounded-lg p-8 border border-fc-orange/20 hover:border-fc-orange transition cursor-pointer">
          <h3 className="text-xl font-bold text-white mb-2">Manage Players</h3>
          <p className="text-gray-400 mb-4">Add, edit, or remove players from the roster</p>
          <span className="text-fc-orange">Manage →</span>
        </Link>

        <Link href="/admin/coaches" className="bg-fc-dark rounded-lg p-8 border border-fc-orange/20 hover:border-fc-orange transition cursor-pointer">
          <h3 className="text-xl font-bold text-white mb-2">Manage Coaches</h3>
          <p className="text-gray-400 mb-4">Add, edit, or remove coaches from the team</p>
          <span className="text-fc-orange">Manage →</span>
        </Link>

        <Link href="/admin/club-info" className="bg-fc-dark rounded-lg p-8 border border-fc-orange/20 hover:border-fc-orange transition cursor-pointer">
          <h3 className="text-xl font-bold text-white mb-2">Club Information</h3>
          <p className="text-gray-400 mb-4">Update club details, mission, and statistics</p>
          <span className="text-fc-orange">Manage →</span>
        </Link>

        <Link href="/admin/testimonials" className="bg-fc-dark rounded-lg p-8 border border-fc-orange/20 hover:border-fc-orange transition cursor-pointer">
          <h3 className="text-xl font-bold text-white mb-2">Testimonials</h3>
          <p className="text-gray-400 mb-4">Add, edit, or remove member testimonials</p>
          <span className="text-fc-orange">Manage →</span>
        </Link>
      </div>
    </div>
  );
}
