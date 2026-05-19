'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { playersAPI, clubInfoAPI, scheduleAPI, testimonialsAPI } from '@/lib/api';

const MAP_COORDINATES = {
  lat: -26.193360,
  lng: 27.802110,
};

const MAP_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${MAP_COORDINATES.lng - 0.01}%2C${MAP_COORDINATES.lat - 0.01}%2C${MAP_COORDINATES.lng + 0.01}%2C${MAP_COORDINATES.lat + 0.01}&layer=mapnik&marker=${MAP_COORDINATES.lat}%2C${MAP_COORDINATES.lng}`;

const DEFAULT_ADDRESS = '3086 Ruth First street Tshepisong Phase 3, Roodepoort, 1724';

const POSITION_META = [
  { key: 'goalkeeper', label: 'Goalkeepers' },
  { key: 'defender', label: 'Defenders' },
  { key: 'midfielder', label: 'Midfielders' },
  { key: 'forward', label: 'Forwards' },
];

function toLines(value) {
  if (!value) {
    return [];
  }
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function formatWhatsAppLink(number) {
  const digits = (number || '').replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}` : '#';
}

function formatMatchDate(dateString, timeString) {
  if (!dateString) {
    return 'Date TBC';
  }

  const date = new Date(`${dateString}${timeString ? `T${timeString}` : ''}`);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: timeString ? '2-digit' : undefined,
    minute: timeString ? '2-digit' : undefined,
  });
}

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [clubInfo, setClubInfo] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState('all');
  const carouselRefs = useRef({});

  const achievements = useMemo(() => toLines(clubInfo?.team_achievements), [clubInfo]);
  const goals = useMemo(() => toLines(clubInfo?.goals_objectives), [clubInfo]);
  const sponsorshipNeeds = useMemo(() => toLines(clubInfo?.sponsorship_needs), [clubInfo]);
  const fixtures = useMemo(() => scheduleItems.filter((item) => item.item_type === 'fixture').slice(0, 5), [scheduleItems]);
  const results = useMemo(() => scheduleItems.filter((item) => item.item_type === 'result').slice(0, 5), [scheduleItems]);

  const playersByPosition = useMemo(() => {
    return POSITION_META.reduce((accumulator, position) => {
      accumulator[position.key] = players.filter((player) => player.position === position.key);
      return accumulator;
    }, {});
  }, [players]);

  const availablePositions = useMemo(() => {
    return POSITION_META.filter((position) => (playersByPosition[position.key] || []).length > 0);
  }, [playersByPosition]);

  const visiblePositions = useMemo(() => {
    if (selectedPosition === 'all') {
      return availablePositions;
    }
    return availablePositions.filter((position) => position.key === selectedPosition);
  }, [availablePositions, selectedPosition]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, clubRes, scheduleRes, testimonialsRes] = await Promise.all([
          playersAPI.getAll(),
          clubInfoAPI.get(),
          scheduleAPI.getAll(),
          testimonialsAPI.getAll(),
        ]);

        setPlayers(playersRes.data.results || playersRes.data);
        setClubInfo(clubRes.data.results?.[0] || clubRes.data[0] || null);
        setScheduleItems(scheduleRes.data.results || scheduleRes.data);
        setTestimonials(testimonialsRes.data.results || testimonialsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollCarousel = (positionKey, direction) => {
    const element = carouselRefs.current[positionKey];
    if (!element) {
      return;
    }

    const scrollAmount = Math.max(element.clientWidth * 0.8, 260);
    element.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header />

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
              EST. {clubInfo?.established_year || 2010} - FC DOMINATORS
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight uppercase">
            Play With Purpose,
            <br />
            <span className="text-fc-orange">Compete With Pride</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            {clubInfo?.description || 'FC Dominators is building disciplined, confident, and high-performing football players.'}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#joining-cost" className="btn-primary">BECOME A PLAYER</a>
            <a href="#sponsorship" className="btn-secondary">SPONSOR THE TEAM</a>
          </div>
        </div>
      </section>

      <section id="about-team" className="py-24 bg-fc-darker">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">ABOUT THE TEAM</span>
            <h2 className="section-title mt-4">WHO WE ARE</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-gray-300 leading-relaxed mb-6">
                {clubInfo?.description || 'FC Dominators is a football team focused on growth, discipline, and impact in every competition.'}
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                {clubInfo?.mission || 'Our mission is to develop talent and build a strong football culture for long-term success.'}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-fc-orange mb-2">{clubInfo?.years_of_excellence || 0}+</div>
                  <p className="text-gray-400 text-sm">YEARS ACTIVE</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-fc-orange mb-2">{clubInfo?.active_members || 0}+</div>
                  <p className="text-gray-400 text-sm">TEAM MEMBERS</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-fc-orange mb-2">{clubInfo?.expert_coaches || 0}+</div>
                  <p className="text-gray-400 text-sm">COACHES</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-fc-orange mb-2">{clubInfo?.programs || 0}+</div>
                  <p className="text-gray-400 text-sm">PROGRAMS</p>
                </div>
              </div>
            </div>

            <div id="goals" className="bg-fc-dark rounded-lg border border-fc-orange/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4 uppercase">Goals and Objectives</h3>
              {goals.length > 0 ? (
                <ul className="space-y-3 text-gray-300">
                  {goals.map((goal, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-fc-orange font-bold">-</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">Goals and objectives will appear here after they are added in admin.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-24 bg-fc-dark">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">ACHIEVEMENTS</span>
            <h2 className="section-title mt-4">TEAM MILESTONES</h2>
          </div>

          <div className="bg-fc-darker rounded-lg border border-fc-orange/20 p-8 max-w-4xl mx-auto">
            {achievements.length > 0 ? (
              <ul className="space-y-3 text-gray-300">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-fc-orange font-bold">-</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">Team achievements will appear here after they are added in admin.</p>
            )}
          </div>
        </div>
      </section>

      <section id="sponsorship" className="py-24 bg-fc-darker">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">SPONSORSHIP</span>
            <h2 className="section-title mt-4">WHAT THE TEAM NEEDS</h2>
          </div>

          <div className="bg-fc-dark rounded-lg border border-fc-orange/20 p-8 max-w-4xl mx-auto">
            {sponsorshipNeeds.length > 0 ? (
              <ul className="space-y-3 text-gray-300">
                {sponsorshipNeeds.map((need, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-fc-orange font-bold">-</span>
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">Sponsorship needs will appear here after they are added in admin.</p>
            )}
          </div>
        </div>
      </section>

      <section id="joining-cost" className="py-24 bg-fc-dark">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">COST OF JOINING</span>
            <h2 className="section-title mt-4">JOIN THE TEAM</h2>
          </div>

          <div className="bg-fc-darker rounded-lg border border-fc-orange/20 p-8 max-w-3xl mx-auto text-center">
            <p className="text-xl text-gray-200 leading-relaxed">
              {clubInfo?.joining_cost || 'Joining cost details will appear here once set in admin.'}
            </p>
          </div>
        </div>
      </section>

      <section id="coach-contact" className="py-24 bg-fc-darker">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">TEAM LEADERSHIP</span>
            <h2 className="section-title mt-4">HEAD COACH AND EXECUTIVE DIRECTOR</h2>
          </div>

          <div className="bg-fc-dark rounded-lg border border-fc-orange/20 p-8 max-w-3xl mx-auto text-center">
            <p className="text-3xl font-bold text-white mb-2">
              {clubInfo?.executive_director_name || 'Yongama Ngondo'}
            </p>
            <p className="text-fc-orange font-semibold mb-6">
              {clubInfo?.executive_director_title || 'Head Coach & Team Executive Director'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={formatWhatsAppLink(clubInfo?.whatsapp_number)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                WhatsApp: {clubInfo?.whatsapp_number || '+27694703626'}
              </a>
              <a href={`tel:${clubInfo?.calls_number || '+27694703626'}`} className="btn-secondary">
                Calls: {clubInfo?.calls_number || '+27694703626'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="schedule" className="py-24 bg-fc-darker">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">Schedule</span>
            <h2 className="section-title mt-4">Fixtures and Results</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading schedule...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-fc-dark rounded-lg border border-fc-orange/20 p-6">
                <h3 className="text-2xl font-bold text-white mb-5 uppercase">Upcoming Fixtures</h3>
                {fixtures.length === 0 ? (
                  <p className="text-gray-400">No fixtures posted yet.</p>
                ) : (
                  <div className="space-y-4">
                    {fixtures.map((item) => (
                      <div key={item.id} className="rounded-lg border border-fc-orange/15 bg-fc-darker p-4">
                        <p className="text-white font-bold">{item.is_home ? 'FC Dominators vs' : 'Away vs'} {item.opponent}</p>
                        <p className="text-fc-orange text-sm mt-1">{formatMatchDate(item.match_date, item.match_time)}</p>
                        <p className="text-gray-300 text-sm mt-1">{item.competition || 'Friendly'} | {item.venue || 'Venue TBC'}</p>
                        {item.notes && <p className="text-gray-400 text-sm mt-2">{item.notes}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-fc-dark rounded-lg border border-fc-orange/20 p-6">
                <h3 className="text-2xl font-bold text-white mb-5 uppercase">Latest Results</h3>
                {results.length === 0 ? (
                  <p className="text-gray-400">No results posted yet.</p>
                ) : (
                  <div className="space-y-4">
                    {results.map((item) => (
                      <div key={item.id} className="rounded-lg border border-fc-orange/15 bg-fc-darker p-4">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-white font-bold">{item.is_home ? 'FC Dominators vs' : 'Away vs'} {item.opponent}</p>
                          <p className="text-fc-orange font-black">
                            {item.goals_for !== null && item.goals_against !== null ? `${item.goals_for} - ${item.goals_against}` : 'N/A'}
                          </p>
                        </div>
                        <p className="text-fc-orange text-sm mt-1">{formatMatchDate(item.match_date, item.match_time)}</p>
                        <p className="text-gray-300 text-sm mt-1">{item.competition || 'Friendly'} | {item.venue || 'Venue TBC'}</p>
                        {item.notes && <p className="text-gray-400 text-sm mt-2">{item.notes}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="players" className="py-24 bg-fc-dark">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">ROSTER</span>
            <h2 className="section-title mt-4">OUR SQUAD</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading players...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <button
                  onClick={() => setSelectedPosition('all')}
                  className={selectedPosition === 'all' ? 'btn-primary' : 'btn-secondary'}
                >
                  ALL POSITIONS
                </button>
                {availablePositions.map((position) => (
                  <button
                    key={position.key}
                    onClick={() => setSelectedPosition(position.key)}
                    className={selectedPosition === position.key ? 'btn-primary' : 'btn-secondary'}
                  >
                    {position.label.toUpperCase()}
                  </button>
                ))}
              </div>

              {visiblePositions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No players available for this position yet.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {visiblePositions.map((position) => {
                    const positionPlayers = playersByPosition[position.key] || [];

                    if (positionPlayers.length === 0) {
                      return null;
                    }

                    return (
                      <div key={position.key} className="rounded-lg border border-fc-orange/20 bg-fc-darker p-6">
                        <div className="mb-6 flex items-center justify-between gap-4">
                          <h3 className="text-2xl font-bold text-white uppercase">{position.label}</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => scrollCarousel(position.key, 'left')}
                              className="h-10 w-10 rounded-full border border-fc-orange/60 text-fc-orange hover:bg-fc-orange hover:text-white transition"
                              aria-label={`Scroll ${position.label} left`}
                            >
                              {'<'}
                            </button>
                            <button
                              onClick={() => scrollCarousel(position.key, 'right')}
                              className="h-10 w-10 rounded-full border border-fc-orange/60 text-fc-orange hover:bg-fc-orange hover:text-white transition"
                              aria-label={`Scroll ${position.label} right`}
                            >
                              {'>'}
                            </button>
                          </div>
                        </div>

                        <div
                          ref={(element) => {
                            carouselRefs.current[position.key] = element;
                          }}
                          className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory"
                          style={{ scrollbarWidth: 'thin' }}
                        >
                          {positionPlayers.map((player) => (
                            <div
                              key={player.id}
                              className="group relative min-w-[260px] max-w-[260px] overflow-hidden rounded-lg bg-fc-dark hover:shadow-2xl transition-all snap-start"
                            >
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
                                <h4 className="text-lg font-bold text-white mb-1">{player.name}</h4>
                                <p className="text-fc-orange text-sm font-semibold uppercase mb-3">{player.position}</p>
                                <p className="text-gray-400 text-sm line-clamp-2">{player.bio}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section id="testimonials" className="py-24 bg-fc-darker">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">TESTIMONIALS</span>
            <h2 className="section-title mt-4">WHAT MEMBERS SAY</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-fc-dark rounded-lg p-8 border border-fc-orange/10 hover:border-fc-orange/50 transition">
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

      <section id="contact" className="py-24 bg-gradient-to-r from-fc-orange/20 to-transparent">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-white mb-4 uppercase">CONTACT FC DOMINATORS</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Reach out for trials, sponsorship discussions, or partnership opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-fc-dark rounded-lg border border-fc-orange/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4 uppercase">Location and Contact</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-fc-orange font-semibold">Address:</span> {clubInfo?.address || DEFAULT_ADDRESS}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="text-fc-orange font-semibold">WhatsApp:</span> {clubInfo?.whatsapp_number || '+27694703626'}
              </p>
              <p className="text-gray-300 mb-6">
                <span className="text-fc-orange font-semibold">Calls:</span> {clubInfo?.calls_number || '+27694703626'}
              </p>

              <div className="flex gap-4 flex-wrap">
                <a
                  href={formatWhatsAppLink(clubInfo?.whatsapp_number)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  OPEN WHATSAPP
                </a>
                <a href={`tel:${clubInfo?.calls_number || '+27694703626'}`} className="btn-secondary">
                  CALL NOW
                </a>
              </div>
            </div>

            <div className="bg-fc-dark rounded-lg border border-fc-orange/20 p-3">
              <iframe
                title="FC Dominators Map"
                src={MAP_EMBED_URL}
                className="w-full h-[360px] rounded"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer clubInfo={clubInfo} />
    </>
  );
}
