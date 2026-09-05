import React from 'react';
import { Instagram, Heart, Sparkles } from 'lucide-react';
import { WeddingInfo } from '../types';

interface CoupleSectionProps {
  weddingInfo: WeddingInfo;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ weddingInfo }) => {
  const { groom, bride, quotes } = weddingInfo;

  return (
    <section id="pasangan" className="py-20 px-4 bg-[#faf8f4] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ded7c8]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto text-center relative z-10">
        {/* Section Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#ded7c8] bg-white/80 text-[11px] uppercase tracking-widest text-[#8c733e] font-semibold mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#8c733e]" />
          <span>Pasangan Mempelai</span>
        </div>

        {/* Holy Verse / Quote Card: QS. Ar-Rum : 21 - Di Atas Foto Couple */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white border border-[#e8e2d5] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#ded7c8]" />
            <span className="text-xs uppercase tracking-widest text-[#8c733e] font-semibold">
              QS. Ar-Rum : 21
            </span>
            <span className="h-px w-8 bg-[#ded7c8]" />
          </div>

          <p className="font-['Cormorant_Garamond'] text-lg sm:text-xl text-[#23272a] italic leading-relaxed mb-3">
            "{quotes.text}"
          </p>

          <span className="text-xs text-[#787f85] font-medium">— {quotes.source}</span>
        </div>

        {/* Salam & Pengantar */}
        <div className="mb-8">
          <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#23272a] mb-2">
            Assalamu’alaikum Warahmatullahi Wabarakatuh
          </h2>
          <p className="text-xs sm:text-sm text-[#6e7478] leading-relaxed max-w-md mx-auto">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:
          </p>
        </div>

        {/* Foto Couple Bersebelahan (Side-by-side Groom & Bride) */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 items-start">
            {/* Groom Profile (Left) */}
            <div className="flex flex-col items-center group p-3 sm:p-5 rounded-3xl bg-white/70 border border-[#e8e2d5] backdrop-blur-xs shadow-[0_6px_24px_rgba(0,0,0,0.02)] hover:border-[#8c733e]/40 transition-all">
              <div className="relative mb-3 sm:mb-4">
                <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden p-1 border-2 border-[#8c733e] shadow-md bg-[#f4f0e6]">
                  <img
                    src={groom.avatar}
                    alt={groom.fullName}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-1.5 right-1 sm:right-2 bg-[#23272a] text-[#dfb564] p-1.5 sm:p-2 rounded-full shadow-md">
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                </div>
              </div>

              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8c733e] font-bold mb-0.5">
                Mempelai Pria
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-base sm:text-xl md:text-2xl font-bold text-[#23272a] leading-tight mb-1">
                {groom.fullName}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#8c733e] font-medium mb-1">
                {groom.sonOrDaughterOf}
              </p>
              <p className="text-[10px] sm:text-xs text-[#596066] font-light leading-relaxed mb-3">
                {groom.fatherName} & {groom.motherName}
              </p>

              {groom.instagram && (
                <a
                  href={`https://instagram.com/${groom.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4f0e6] hover:bg-[#eae4d5] border border-[#ded7c8] text-[10px] sm:text-xs text-[#23272a] transition-all font-medium"
                >
                  <Instagram className="w-3 h-3 text-[#8c733e]" />
                  <span>@{groom.instagram}</span>
                </a>
              )}
            </div>

            {/* Bride Profile (Right) */}
            <div className="flex flex-col items-center group p-3 sm:p-5 rounded-3xl bg-white/70 border border-[#e8e2d5] backdrop-blur-xs shadow-[0_6px_24px_rgba(0,0,0,0.02)] hover:border-[#8c733e]/40 transition-all">
              <div className="relative mb-3 sm:mb-4">
                <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden p-1 border-2 border-[#8c733e] shadow-md bg-[#f4f0e6]">
                  <img
                    src={bride.avatar}
                    alt={bride.fullName}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-1.5 right-1 sm:right-2 bg-[#23272a] text-[#dfb564] p-1.5 sm:p-2 rounded-full shadow-md">
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                </div>
              </div>

              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8c733e] font-bold mb-0.5">
                Mempelai Wanita
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-base sm:text-xl md:text-2xl font-bold text-[#23272a] leading-tight mb-1">
                {bride.fullName}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#8c733e] font-medium mb-1">
                {bride.sonOrDaughterOf}
              </p>
              <p className="text-[10px] sm:text-xs text-[#596066] font-light leading-relaxed mb-3">
                {bride.fatherName} & {bride.motherName}
              </p>

              {bride.instagram && (
                <a
                  href={`https://instagram.com/${bride.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4f0e6] hover:bg-[#eae4d5] border border-[#ded7c8] text-[10px] sm:text-xs text-[#23272a] transition-all font-medium"
                >
                  <Instagram className="w-3 h-3 text-[#8c733e]" />
                  <span>@{bride.instagram}</span>
                </a>
              )}
            </div>
          </div>

          {/* Romantic Ampersand Floating in Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#ded7c8] shadow-md flex items-center justify-center">
              <span className="font-['Alex_Brush'] text-xl sm:text-2xl text-[#8c733e]">&</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
