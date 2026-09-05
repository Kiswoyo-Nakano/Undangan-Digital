import React, { useState, useEffect } from 'react';
import { Disc3, Volume2, VolumeX, Music, SkipForward, Sliders } from 'lucide-react';
import { weddingAudio, AVAILABLE_TRACKS } from '../utils/audioPlayer';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showControls, setShowControls] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(weddingAudio.getCurrentTrack());

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe(() => {
      setIsPlaying(weddingAudio.getIsPlaying());
      setVolume(weddingAudio.getVolume());
      setCurrentTrack(weddingAudio.getCurrentTrack());
    });
    return unsubscribe;
  }, []);

  const togglePlay = () => {
    weddingAudio.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    weddingAudio.setVolume(val);
  };

  const handleNextTrack = () => {
    const currIdx = AVAILABLE_TRACKS.findIndex((t) => t.id === currentTrack.id);
    weddingAudio.changeTrack(currIdx + 1);
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      {/* Floating Rotating Disc Button */}
      <div className="relative">
        <button
          id="btn-toggle-music"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
          className={`relative flex items-center justify-center w-11 h-11 rounded-full border border-[#ded7c8] shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all cursor-pointer ${
            isPlaying
              ? 'bg-white text-[#8c733e] shadow-[0_4px_16px_rgba(140,115,62,0.15)]'
              : 'bg-white/90 text-[#787f85]'
          }`}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        >
          <Disc3
            className={`w-6 h-6 transition-all ${
              isPlaying ? 'animate-spin-slow text-[#8c733e]' : 'opacity-70'
            }`}
          />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c733e] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8c733e]" />
            </span>
          )}
        </button>

        {/* Small settings toggle pill */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-white border border-[#ded7c8] flex items-center justify-center text-[#8c733e] text-[10px] hover:scale-110 transition-transform shadow-xs"
          title="Pengaturan Musik"
        >
          <Sliders className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Expanded Audio Settings Popover */}
      {showControls && (
        <div className="absolute top-14 right-0 w-64 bg-white/95 border border-[#e5dfd2] rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl z-50 text-left animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 border-b border-[#ded7c8] mb-3">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-[#8c733e]" />
              <span className="text-xs font-semibold text-[#23272a]">Musik Latar</span>
            </div>
            <button
              onClick={() => setShowControls(false)}
              className="text-xs text-[#787f85] hover:text-[#23272a]"
            >
              ✕
            </button>
          </div>

          <div className="mb-3">
            <p className="text-[10px] uppercase text-[#787f85] tracking-wider mb-0.5 font-medium">Sedang Diputar</p>
            <p className="text-xs font-semibold text-[#23272a] truncate">{currentTrack.title}</p>
            <p className="text-[11px] text-[#787f85] truncate">{currentTrack.artist}</p>
          </div>

          {/* Volume Slider */}
          <div className="space-y-1 mb-3">
            <div className="flex items-center justify-between text-[11px] text-[#6e7478]">
              <span className="flex items-center gap-1">
                {volume === 0 ? <VolumeX className="w-3 h-3 text-rose-500" /> : <Volume2 className="w-3 h-3 text-[#8c733e]" />}
                Volume
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-[#ede8dc] rounded-lg appearance-none cursor-pointer accent-[#8c733e]"
            />
          </div>

          {/* Track Switcher */}
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className="flex-1 py-1.5 px-3 rounded-lg bg-[#23272a] hover:bg-[#151718] text-xs font-medium text-[#fdfbf7] text-center transition-colors cursor-pointer"
            >
              {isPlaying ? 'Jeda' : 'Putar'}
            </button>
            <button
              onClick={handleNextTrack}
              className="py-1.5 px-3 rounded-lg bg-[#f4f0e6] hover:bg-[#eae4d5] border border-[#ded7c8] text-xs text-[#23272a] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Ganti Lagu"
            >
              <SkipForward className="w-3.5 h-3.5 text-[#8c733e]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
