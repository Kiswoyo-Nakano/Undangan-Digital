import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MailOpen, Heart, Calendar, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingAudio } from '../utils/audioPlayer';

interface CoverScreenProps {
  guestName: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ guestName, onOpen, isOpen }) => {
  const [opening, setOpening] = useState(false);

  const handleOpenInvitation = async () => {
    setOpening(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#c5a059', '#e2e8f0', '#f4e7c7', '#dfb564'],
    });

    // Start background music automatically
    weddingAudio.play().catch(() => {});

    // Notify parent after smooth animation
    setTimeout(() => {
      onOpen();
    }, 450);
  };

  if (isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: opening ? 0 : 1, y: opening ? -60 : 0 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f7f5ef] text-center"
      id="cover-screen"
    >
      {/* Background Image with clean light aesthetic & soft warm overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85"
          alt="Foto Prewedding Mempelai"
          className="h-full w-full object-cover object-[center_25%] brightness-98 opacity-30 filter scale-105 transition-transform duration-10000 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/80 to-[#fdfbf7]/60" />
      </div>

      {/* Decorative Ornaments & Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#d4caa8]/25 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full bg-[#d4caa8]/20 blur-3xl animate-pulse-glow" />
      </div>

      {/* Content Container (Card Smartphone Style) */}
      <div className="relative z-20 w-full max-w-md mx-auto px-6 py-10 flex flex-col items-center justify-between min-h-[92vh]">
        {/* Top Monogram */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-[#ded7c8] bg-white/80 backdrop-blur-md shadow-sm mb-4">
            <span className="font-['Alex_Brush'] text-4xl text-[#8c733e]">R & A</span>
            <div className="absolute -inset-1 rounded-full border border-[#ded7c8]/60 animate-spin-slow" />
          </div>

          <p className="tracking-[0.28em] text-[11px] uppercase text-[#8c733e] font-semibold mb-1">
            THE WEDDING OF
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-semibold tracking-wide text-[#23272a]">
            Rizky <span className="font-['Alex_Brush'] text-[#8c733e] text-3xl font-normal">&</span> Adinda
          </h1>
          <div className="flex items-center gap-2 mt-2 text-xs text-[#6e7478] font-light">
            <Calendar className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Sabtu, 28 November 2026</span>
          </div>
        </motion.div>

        {/* Center Invitation Greeting Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="w-full my-6 p-6 rounded-2xl bg-white/90 border border-[#e8e2d5] backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.04)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Sparkles className="w-12 h-12 text-[#8c733e]" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#787f85] mb-2 font-medium">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          
          <div className="py-2.5 px-3 bg-[#fbf9f4] rounded-xl border border-[#ded7c8] mb-3">
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#23272a] tracking-wide break-words">
              {guestName || 'Tamu Undangan'}
            </h2>
          </div>

          <p className="text-[11px] text-[#6e7478] italic leading-relaxed">
            Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami.
          </p>
        </motion.div>

        {/* Bottom Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="w-full flex flex-col items-center gap-3"
        >
          <button
            id="btn-buka-undangan"
            onClick={handleOpenInvitation}
            className="group relative w-full py-3.5 px-6 rounded-full bg-[#23272a] hover:bg-[#151718] text-[#fdfbf7] font-semibold text-sm tracking-wide shadow-md shadow-black/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MailOpen className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>Buka Undangan</span>
            <Heart className="w-3.5 h-3.5 text-[#dfb564] fill-current" />
          </button>

          <div className="flex items-center gap-1.5 text-[10px] text-[#787f85]">
            <Volume2 className="w-3 h-3 text-[#8c733e]" />
            <span>Musik latar romantis akan diputar otomatis</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
