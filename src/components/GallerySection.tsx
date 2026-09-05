import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GallerySectionProps {
  gallery: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredPhotos =
    activeFilter === 'all'
      ? gallery
      : gallery.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <section id="galeri" className="py-20 px-4 bg-[#fdfbf7] relative">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ded7c8] bg-white/80 text-[11px] uppercase tracking-widest text-[#8c733e] font-semibold mb-3 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Galeri Bahagia</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a]">
            Momen Kebersamaan Kami
          </h2>
          <p className="text-xs text-[#6e7478] mt-2 max-w-sm mx-auto">
            Untaian potret kenangan indah sebelum melangkah bersama dalam mahligai rumah tangga
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-8 flex-wrap">
          {[
            { id: 'all', label: 'Semua Foto' },
            { id: 'prewedding', label: 'Prewedding' },
            { id: 'engagement', label: 'Lamaran' },
            { id: 'candid', label: 'Candid' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#23272a] text-[#fdfbf7] shadow-xs'
                  : 'bg-white text-[#6e7478] hover:text-[#23272a] border border-[#ded7c8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden border border-[#ded7c8] cursor-pointer bg-[#f4f0e6] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23272a]/90 via-[#23272a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-[11px] text-[#fdfbf7] line-clamp-2 leading-snug font-medium">
                  {photo.caption}
                </p>
                <div className="flex items-center gap-1 text-[9px] text-[#dfb564] mt-1">
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>Lihat Penuh</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-['Cormorant_Garamond'] text-sm sm:text-base text-[#6e7478] italic flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8c733e]" />
            "Cinta bukan mencari seseorang yang sempurna, melainkan melihat ketidaksempurnaan dengan cara sempurna."
            <Sparkles className="w-3.5 h-3.5 text-[#8c733e]" />
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Photo viewer */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[80vh] flex flex-col items-center justify-center"
          >
            <img
              src={filteredPhotos[selectedPhotoIndex].url}
              alt={filteredPhotos[selectedPhotoIndex].caption}
              className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/20"
            />
            <p className="text-xs sm:text-sm text-[#cbd5e1] text-center mt-3 max-w-lg px-2">
              {filteredPhotos[selectedPhotoIndex].caption}
            </p>
          </div>

          {/* Navigation Controls */}
          {filteredPhotos.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white cursor-pointer"
                aria-label="Foto Sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white cursor-pointer"
                aria-label="Foto Selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 text-xs text-[#94a3b8]">
            {selectedPhotoIndex + 1} dari {filteredPhotos.length}
          </div>
        </div>
      )}
    </section>
  );
};
