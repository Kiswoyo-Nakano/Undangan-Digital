import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { StoryMilestone } from '../types';

interface StorySectionProps {
  stories: StoryMilestone[];
}

export const StorySection: React.FC<StorySectionProps> = ({ stories }) => {
  return (
    <section id="kisah" className="py-20 px-4 bg-[#faf8f4] relative">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ded7c8] bg-white/80 text-[11px] uppercase tracking-widest text-[#8c733e] font-semibold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Love Story</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a]">
            Kisah Perjalanan Cinta
          </h2>
          <p className="text-xs text-[#6e7478] mt-2 max-w-sm mx-auto">
            Setiap detik dan langkah membawa kami lebih dekat menuju hari penyatuan dua hati
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-[#ded7c8] ml-4 sm:ml-6 space-y-10">
          {stories.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Pin */}
              <div className="absolute -left-[17px] top-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#f4f0e6] border-2 border-[#8c733e] shadow-xs group-hover:scale-110 transition-transform">
                <Heart className="w-3.5 h-3.5 text-[#8c733e] fill-current" />
              </div>

              {/* Story Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e8e2d5] backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.03)] group-hover:border-[#8c733e]/50 transition-colors">
                <div className="inline-block px-3 py-0.5 rounded-full bg-[#f4f0e6] text-[#8c733e] border border-[#ded7c8] text-[11px] font-semibold tracking-wider uppercase mb-2">
                  {item.year}
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#23272a] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#596066] leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.image && (
                  <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-[#ded7c8]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
