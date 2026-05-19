'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => !path.includes('#') && pathname === path;

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT TEAM', href: '/#about-team' },
    { name: 'ACHIEVEMENTS', href: '/#achievements' },
    { name: 'GOALS', href: '/#goals' },
    { name: 'SPONSORSHIP', href: '/#sponsorship' },
    { name: 'JOINING COST', href: '/#joining-cost' },
    { name: 'SCHEDULE', href: '/#schedule' },
    { name: 'COACH', href: '/#coach-contact' },
    { name: 'SQUAD', href: '/#players' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'CONTACT', href: '/#contact' },
    { name: 'ADMIN', href: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-fc-darker border-b border-fc-orange/20">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-fc-orange rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">FC</span>
          </div>
          <span className="text-xl font-bold text-white hidden sm:inline">FC DOMINATORS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors duration-300 ${
                isActive(item.href)
                  ? 'text-fc-orange'
                  : 'text-gray-300 hover:text-fc-orange'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <a href="/#joining-cost" className="hidden md:block btn-primary text-sm">
          JOIN NOW
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-fc-orange"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-fc-dark border-t border-fc-orange/20 px-4 py-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-fc-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
