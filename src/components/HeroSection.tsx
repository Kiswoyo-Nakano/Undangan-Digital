import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, ChevronDown } from 'lucide-react';
import { WeddingInfo } from '../types';

interface HeroSectionProps {
  weddingInfo: WeddingInfo;
  guestName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ weddingInfo, guestName }) => {
  // Countdown calculation
  const targetDate = new Date(weddingInfo.weddingDateISO).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Google Calendar URL generator
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Pernikahan ${weddingInfo.groom.name} & ${weddingInfo.bride.name}`);
    const details = encodeURIComponent(
      `Undangan Pernikahan ${weddingInfo.groom.fullName} & ${weddingInfo.bride.fullName}.\nAkad: ${weddingInfo.akad.timeStr}\nResepsi: ${weddingInfo.resepsi.timeStr}\nLokasi: ${weddingInfo.resepsi.venueName}`
    );
    const location = encodeURIComponent(`${weddingInfo.resepsi.venueName}, ${weddingInfo.resepsi.address}`);
    // Start: 20261128T010000Z (08:00 WIB is 01:00 UTC)
    const dates = '20261128T010000Z/20261128T070000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const couplePhoto = weddingInfo.heroCouplePhoto || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85';

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-between text-center px-4 pt-16 pb-24 overflow-hidden bg-[#fdfbf7]">
      {/* Background with Couple Photo & Text Legibility Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Prewedding Couple Photo */}
        <img
          src={couplePhoto}
          alt={`Foto Pasangan Mempelai ${weddingInfo.groom.name} & ${weddingInfo.bride.name}`}
          className="w-full h-full object-cover object-[center_22%] sm:object-[center_18%] filter brightness-[1.01] contrast-[0.98] opacity-35 sm:opacity-40 scale-[1.01] transition-opacity duration-700"
          loading="eager"
        />

        {/* Atmospheric Gradient Scrim - Keeps couple visible while ensuring text is 100% sharp and readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7]/90 via-[#fdfbf7]/65 to-[#fdfbf7]/95" />

        {/* Radial Light Halo centered behind titles for WCAG-compliant text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(253,251,247,0.72)_0%,_rgba(253,251,247,0.35)_45%,_rgba(253,251,247,0.92)_100%)]" />

        {/* Soft bottom blend to transition smoothly into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#fdfbf7] to-transparent" />
      </div>

      {/* Top Header & Monogram */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#ded7c8] bg-white/90 backdrop-blur-md mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8c733e] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8c733e] font-semibold">
            Walimatul 'Ursy
          </span>
        </div>

        <p className="font-['Alex_Brush'] text-2xl sm:text-3xl text-[#8c733e] mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
          The Wedding Celebration of
        </p>

        <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl font-bold tracking-tight text-[#23272a] leading-none mb-3 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
          {weddingInfo.groom.name} <span className="font-['Alex_Brush'] text-4xl sm:text-5xl text-[#8c733e] font-normal">&</span> {weddingInfo.bride.name}
        </h1>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#ded7c8] backdrop-blur-md text-xs sm:text-sm text-[#596066] font-medium tracking-wide mb-6 shadow-xs">
          <Calendar className="w-4 h-4 text-[#8c733e]" />
          <span>Sabtu, 28 November 2026</span>
          <span className="text-[#8c733e]">•</span>
          <span>Jakarta Selatan</span>
        </div>

        {/* Personalized Guest Badge */}
        {guestName && (
          <div className="w-full max-w-xs mb-8 py-2.5 px-4 rounded-xl bg-white/95 border border-[#ded7c8] backdrop-blur-md shadow-xs">
            <span className="text-[10px] uppercase text-[#787f85] tracking-wider block font-medium">Yth. Tamu Kehormatan:</span>
            <span className="text-sm font-semibold text-[#23272a]">{guestName}</span>
          </div>
        )}
      </div>

      {/* Centerpiece: Countdown Timer */}
      <div className="relative z-10 w-full max-w-md mx-auto my-4">
        <div className="p-6 rounded-3xl bg-white/95 border border-[#e8e2d5] backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#8c733e] font-semibold tracking-wider uppercase mb-4">
            <Clock className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Hitung Mundur Menuju Hari Bahagia</span>
          </div>

          {/* Countdown Boxes Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#fbf9f4] border border-[#ded7c8]">
              <span className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a] leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#787f85] mt-1 font-medium">Hari</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#fbf9f4] border border-[#ded7c8]">
              <span className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a] leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#787f85] mt-1 font-medium">Jam</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#fbf9f4] border border-[#ded7c8]">
              <span className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a] leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#787f85] mt-1 font-medium">Menit</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#fbf9f4] border border-[#ded7c8]">
              <span className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#8c733e] leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#787f85] mt-1 font-medium">Detik</span>
            </div>
          </div>

          {/* Add to Calendar Button */}
          <a
            id="btn-add-to-calendar"
            href={createGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#23272a] hover:bg-[#151718] text-xs font-semibold text-[#fdfbf7] shadow-xs transition-all hover:scale-[1.01] active:scale-95"
          >
            <Bell className="w-3.5 h-3.5 text-[#dfb564]" />
            <span>Ingatkan Saya (Google Calendar)</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-[11px] text-[#787f85]">
        <span className="tracking-widest uppercase text-[10px] font-medium">Gulir ke bawah</span>
        <ChevronDown className="w-4 h-4 text-[#8c733e] animate-bounce" />
      </div>
    </section>
  );
};
