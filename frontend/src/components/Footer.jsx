'use client';

import Link from 'next/link';

export default function Footer({ clubInfo }) {
  const whatsappNumber = clubInfo?.whatsapp_number || '+27694703626';
  const callsNumber = clubInfo?.calls_number || '+27694703626';
  const email = clubInfo?.email || 'info@fcdominators.co.za';
  const address = clubInfo?.address || '3086 Ruth First street Tshepisong Phase 3, Roodepoort, 1724';

  return (
    <footer className="bg-fc-darker border-t border-fc-orange/20 py-12 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-fc-orange rounded flex items-center justify-center">
                <span className="text-white font-bold">FC</span>
              </div>
              <span className="text-lg font-bold text-white">FC DOMINATORS</span>
            </div>
            <p className="text-gray-400 text-sm">
              Building disciplined athletes and a winning football culture.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/#about-team" className="hover:text-fc-orange transition">About Team</Link></li>
              <li><Link href="/#achievements" className="hover:text-fc-orange transition">Achievements</Link></li>
              <li><Link href="/#goals" className="hover:text-fc-orange transition">Goals</Link></li>
              <li><Link href="/#schedule" className="hover:text-fc-orange transition">Schedule</Link></li>
              <li><Link href="/#sponsorship" className="hover:text-fc-orange transition">Sponsorship</Link></li>
              <li><Link href="/#joining-cost" className="hover:text-fc-orange transition">Cost of Joining</Link></li>
              <li><Link href="/gallery" className="hover:text-fc-orange transition">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">TEAM CONTACT</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="break-all">WhatsApp: {whatsappNumber}</li>
              <li className="break-all">Calls: {callsNumber}</li>
              <li className="break-all">Email: {email}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">ADDRESS</h3>
            <p className="text-gray-400 text-sm">{address}</p>
          </div>
        </div>

        <div className="border-t border-fc-orange/20 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; 2026 FC Dominators. All rights reserved.
            <Link href="/admin" className="text-fc-orange hover:text-orange-400 ml-2">Admin Panel</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

