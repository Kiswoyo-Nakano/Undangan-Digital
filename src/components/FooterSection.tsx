import React, { useState } from 'react';
import { Heart, Share2, Check, Sparkles } from 'lucide-react';
import { WeddingInfo } from '../types';

interface FooterSectionProps {
  weddingInfo: WeddingInfo;
  guestName: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ weddingInfo, guestName }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: `Undangan Pernikahan ${weddingInfo.groom.name} & ${weddingInfo.bride.name}`,
          text: `Undangan Pernikahan ${weddingInfo.groom.name} & ${weddingInfo.bride.name} untuk ${guestName || 'Bapak/Ibu/Saudara/i'}`,
          url: url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <footer className="pt-16 pb-28 px-4 bg-[#f4f0e6] text-center relative border-t border-[#ded7c8]">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full border border-[#ded7c8] bg-white flex items-center justify-center mx-auto mb-6 shadow-xs">
          <span className="font-['Alex_Brush'] text-3xl text-[#8c733e]">R & A</span>
        </div>

        <p className="text-xs text-[#596066] leading-relaxed max-w-sm mx-auto mb-6">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.
        </p>

        <p className="font-['Cormorant_Garamond'] text-xl font-bold text-[#8c733e] mb-2">
          Wassalamu’alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="my-6 space-y-1 text-xs text-[#6e7478]">
          <p className="uppercase tracking-widest text-[10px] text-[#8c733e] font-semibold">Kami yang berbahagia</p>
          <p className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#23272a]">
            {weddingInfo.groom.name} & {weddingInfo.bride.name}
          </p>
          <p className="text-[11px] pt-1 text-[#6e7478]">Beserta segenap keluarga besar kedua mempelai</p>
        </div>

        {/* Share Button */}
        <div className="mt-8 mb-6">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white hover:bg-[#faf8f4] border border-[#ded7c8] text-xs text-[#23272a] transition-all cursor-pointer shadow-xs font-medium"
          >
            <Share2 className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>{copiedLink ? 'Tautan Undangan Tersalin!' : 'Bagikan Undangan Ini'}</span>
            {copiedLink && <Check className="w-3.5 h-3.5 text-emerald-600" />}
          </button>
        </div>

        <div className="pt-6 border-t border-[#ded7c8] flex items-center justify-center gap-1.5 text-[10px] text-[#787f85]">
          <span>Dirancang dengan</span>
          <Heart className="w-3 h-3 text-[#8c733e] fill-current" />
          <span>untuk Momen Pernikahan Abadi</span>
        </div>
      </div>
    </footer>
  );
};
