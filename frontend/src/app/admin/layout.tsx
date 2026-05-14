'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, verify auth token with backend
    const token = localStorage.getItem('authToken');
    setAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-400">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-fc-darker">
        {/* Sidebar */}
        <div className="w-64 bg-fc-dark border-r border-fc-orange/20">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-8">ADMIN PANEL</h2>
            <nav className="space-y-2">
              <Link href="/admin/players" className="block px-4 py-2 text-gray-300 hover:text-fc-orange hover:bg-fc-darker rounded transition">
                Players
              </Link>
              <Link href="/admin/coaches" className="block px-4 py-2 text-gray-300 hover:text-fc-orange hover:bg-fc-darker rounded transition">
                Coaches
              </Link>
              <Link href="/admin/club-info" className="block px-4 py-2 text-gray-300 hover:text-fc-orange hover:bg-fc-darker rounded transition">
                Club Info
              </Link>
              <Link href="/admin/testimonials" className="block px-4 py-2 text-gray-300 hover:text-fc-orange hover:bg-fc-darker rounded transition">
                Testimonials
              </Link>
              <Link href="/" className="block px-4 py-2 text-gray-300 hover:text-fc-orange hover:bg-fc-darker rounded transition">
                ← Back to Site
              </Link>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {authenticated ? children : <NotAuthenticated />}
        </div>
      </div>
      <Footer />
    </>
  );
}

function NotAuthenticated() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Admin Authentication Required</h2>
        <p className="text-gray-400 mb-8">
          Please log in to the Django admin panel first at /admin/
        </p>
        <a href="/admin/" className="btn-primary">
          Go to Django Admin
        </a>
      </div>
    </div>
  );
}
