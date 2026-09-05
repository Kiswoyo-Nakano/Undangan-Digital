import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Navigation, Sparkles } from 'lucide-react';
import { WeddingInfo } from '../types';

interface EventSectionProps {
  weddingInfo: WeddingInfo;
}

export const EventSection: React.FC<EventSectionProps> = ({ weddingInfo }) => {
  const { akad, resepsi } = weddingInfo;
  const [activeMapTab, setActiveMapTab] = useState<'resepsi' | 'akad'>('resepsi');

  const currentEvent = activeMapTab === 'resepsi' ? resepsi : akad;

  return (
    <section id="acara" className="py-20 px-4 bg-[#fdfbf7] relative">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ded7c8] bg-white/80 text-[11px] uppercase tracking-widest text-[#8c733e] font-semibold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Agenda & Waktu Acara</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a]">
            Rangkaian Acara Bahagia
          </h2>
          <p className="text-xs text-[#6e7478] mt-2 max-w-sm mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="space-y-6 mb-12">
          {/* Akad Nikah Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e8e2d5] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-[#8c733e]/50 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-[#ded7c8] mb-4">
              <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#23272a]">
                {akad.title}
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#f4f0e6] text-[#8c733e] border border-[#ded7c8] font-semibold">
                Sakral
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#4a4f52] mb-5">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#8c733e] shrink-0" />
                <span className="font-medium text-[#23272a]">{akad.dayName}, {akad.dateStr}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#8c733e] shrink-0" />
                <span>Pukul {akad.timeStr}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8c733e] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#23272a]">{akad.venueName}</p>
                  {akad.roomName && <p className="text-[#6e7478] text-xs">{akad.roomName}</p>}
                  <p className="text-[#787f85] text-xs mt-0.5">{akad.address}</p>
                </div>
              </div>
            </div>

            {akad.notes && (
              <div className="py-2 px-3 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-[11px] text-[#787f85] italic">
                * {akad.notes}
              </div>
            )}
          </div>

          {/* Resepsi Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#8c733e]/40 backdrop-blur-md shadow-[0_12px_35px_rgba(140,115,62,0.08)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8c733e]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-[#ded7c8] mb-4">
              <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#23272a]">
                {resepsi.title}
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#23272a] text-[#fdfbf7] font-semibold">
                Utama
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#4a4f52] mb-5">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#8c733e] shrink-0" />
                <span className="font-medium text-[#23272a]">{resepsi.dayName}, {resepsi.dateStr}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#8c733e] shrink-0" />
                <span>Pukul {resepsi.timeStr}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8c733e] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#23272a]">{resepsi.venueName}</p>
                  {resepsi.roomName && <p className="text-[#6e7478] text-xs">{resepsi.roomName}</p>}
                  <p className="text-[#787f85] text-xs mt-0.5">{resepsi.address}</p>
                </div>
              </div>
            </div>

            {resepsi.notes && (
              <div className="py-2 px-3 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-[11px] text-[#787f85] italic">
                * {resepsi.notes}
              </div>
            )}
          </div>
        </div>

        {/* Peta Lokasi / Map Container */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e8e2d5] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8c733e]" />
              <span className="font-['Cormorant_Garamond'] text-xl font-bold text-[#23272a]">
                Peta Petunjuk Lokasi
              </span>
            </div>

            {/* Map Switcher Tabs */}
            <div className="flex rounded-full bg-[#f4f0e6] p-1 border border-[#ded7c8] text-xs">
              <button
                onClick={() => setActiveMapTab('resepsi')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeMapTab === 'resepsi'
                    ? 'bg-[#23272a] text-[#fdfbf7] font-semibold'
                    : 'text-[#6e7478] hover:text-[#23272a]'
                }`}
              >
                Resepsi
              </button>
              <button
                onClick={() => setActiveMapTab('akad')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeMapTab === 'akad'
                    ? 'bg-[#23272a] text-[#fdfbf7] font-semibold'
                    : 'text-[#6e7478] hover:text-[#23272a]'
                }`}
              >
                Akad
              </button>
            </div>
          </div>

          <p className="text-xs text-[#6e7478] mb-4">
            <strong className="text-[#23272a]">{currentEvent.venueName}</strong> — {currentEvent.address}
          </p>

          {/* Google Maps Embed iframe */}
          <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#ded7c8] shadow-inner mb-4 relative bg-[#f4f0e6]">
            <iframe
              src={currentEvent.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Peta Lokasi ${currentEvent.venueName}`}
              className="w-full h-full filter saturate-105 contrast-105"
            />
          </div>

          {/* Action Buttons for Navigation */}
          <div className="grid grid-cols-2 gap-3">
            <a
              id="btn-buka-maps"
              href={currentEvent.mapsDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#23272a] hover:bg-[#151718] text-[#fdfbf7] text-xs font-semibold shadow-xs active:scale-95 transition-all text-center"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#dfb564]" />
              <span>Buka Google Maps</span>
            </a>

            <a
              id="btn-petunjuk-arah"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                currentEvent.venueName + ', ' + currentEvent.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#f4f0e6] hover:bg-[#eae4d5] border border-[#ded7c8] text-[#23272a] text-xs font-semibold active:scale-95 transition-all text-center"
            >
              <Navigation className="w-3.5 h-3.5 text-[#8c733e]" />
              <span>Petunjuk Arah</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
