'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { playersAPI, coachesAPI, clubInfoAPI, testimonialsAPI } from '@/lib/api';
import type { Player, Coach, ClubInfo, Testimonial } from '@/types';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [clubInfo, setClubInfo] = useState<ClubInfo | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, coachesRes, clubRes, testimonialsRes] = await Promise.all([
          playersAPI.getFeatured(),
          coachesAPI.getFeatured(),
          clubInfoAPI.get(),
          testimonialsAPI.getAll(),
        ]);

        setPlayers(playersRes.data.results || playersRes.data);
        setCoaches(coachesRes.data.results || coachesRes.data);
        setClubInfo(clubRes.data.results?.[0] || clubRes.data[0] || null);
        setTestimonials(testimonialsRes.data.results || testimonialsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-fc-dark h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-fc-darker via-fc-darker/80 to-transparent" />

        <div className="relative z-10 container text-center">
          <div className="mb-6 inline-block">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">
              EST. 2010 — SPORTS EXCELLENCE
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-white leading-tight">
            UNLEASH YOUR<br />
            <span className="text-fc-orange">INNER CHAMPION</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join FC Dominators — the premier sports club delivering elite football training, fitness programs, and
            competitive excellence for athletes of all levels.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary">BECOME A MEMBER</button>
            <button className="btn-secondary">OUR PROGRAMS</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <svg className="w-6 h-6 text-fc-orange animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="coaches" className="py-24 bg-fc-darker">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">OUR COACHES</span>
            <h2 className="section-title mt-4">MEET THE TEAM</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading coaches...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coaches.map((coach) => (
                <div key={coach.id} className="group relative overflow-hidden rounded-lg">
                  <div className="relative h-96 overflow-hidden bg-fc-dark">
                    {coach.photo && (
                      <Image
                        src={coach.photo}
                        alt={coach.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-fc-darker via-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{coach.name}</h3>
                    <p className="text-fc-orange text-sm font-semibold mb-3">{coach.role.toUpperCase()}</p>
                    <p className="text-sm text-gray-300">{coach.experience_years}+ years of professional coaching
                      experience</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-fc-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">ABOUT US</span>
              <h2 className="section-title mt-4 mb-6">MORE THAN A CLUB —<br /><span className="text-fc-orange">A LEGACY</span></h2>
              {clubInfo && (
                <>
                  <p className="text-gray-300 mb-6 leading-relaxed">{clubInfo.description}</p>
                  <p className="text-gray-300 mb-8 leading-relaxed">{clubInfo.mission}</p>
                </>
              )}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-4xl font-bold text-fc-orange mb-2">{clubInfo?.years_of_excellence}+</div>
                  <p className="text-gray-400 text-sm">YEARS OF EXCELLENCE</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-fc-orange mb-2">{clubInfo?.active_members}+</div>
                  <p className="text-gray-400 text-sm">ACTIVE MEMBERS</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-fc-orange mb-2">{clubInfo?.expert_coaches}+</div>
                  <p className="text-gray-400 text-sm">EXPERT COACHES</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-fc-orange mb-2">{clubInfo?.programs}+</div>
                  <p className="text-gray-400 text-sm">PROGRAMS</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1529148482759-b7ce63b42575?w=600&h=600&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fc-darker via-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-fc-darker to-transparent">
                  <div className="text-center text-white">
                    <p className="text-5xl font-bold text-fc-orange mb-2">12+</p>
                    <p className="text-lg">YEARS OF EXCELLENCE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Players Grid Section */}
      <section id="players" className="py-24 bg-fc-darker">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">ROSTER</span>
            <h2 className="section-title mt-4">OUR SQUAD</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading players...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {players.map((player) => (
                <div key={player.id} className="group relative overflow-hidden rounded-lg bg-fc-dark hover:shadow-2xl transition-all">
                  <div className="relative h-64 overflow-hidden">
                    {player.photo && (
                      <Image
                        src={player.photo}
                        alt={player.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-fc-darker via-transparent" />
                    <div className="absolute top-4 right-4 bg-fc-orange w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{player.jersey_number}</span>
                    </div>
                  </div>
                  <div className="p-4 relative z-10">
                    <h3 className="text-lg font-bold text-white mb-1">{player.name}</h3>
                    <p className="text-fc-orange text-sm font-semibold uppercase mb-3">{player.position}</p>
                    <p className="text-gray-400 text-sm line-clamp-2">{player.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-fc-dark">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">TESTIMONIALS</span>
            <h2 className="section-title mt-4">WHAT OUR <span className="text-fc-orange">MEMBERS</span> SAY</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-fc-darker rounded-lg p-8 border border-fc-orange/10 hover:border-fc-orange/50 transition">
                  <p className="text-gray-300 italic mb-6 text-lg">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <div className="w-12 h-12 relative rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-fc-orange text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-fc-orange/20 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=400&fit=crop)',
              backgroundSize: 'cover',
            }}
          />
        </div>
        <div className="container relative z-10 text-center">
          <h2 className="text-5xl font-black text-white mb-6 uppercase">READY TO<br /><span className="text-fc-orange">DOMINATE?</span></h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Take the first step toward becoming the athlete you were born to be. Join FC Dominators today and start
            your journey to greatness.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary">START FREE TRIAL</button>
            <button className="btn-secondary">CONTACT US</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
