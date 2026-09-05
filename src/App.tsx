import React, { useState, useEffect } from 'react';
import { weddingData, initialGuestbookGreetings } from './data/weddingData';
import { GuestbookGreeting } from './types';
import { CoverScreen } from './components/CoverScreen';
import { DevicePreviewBar } from './components/DevicePreviewBar';
import { MusicPlayer } from './components/MusicPlayer';
import { NavbarMobile } from './components/NavbarMobile';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { EventSection } from './components/EventSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { GuestBookSection } from './components/GuestBookSection';
import { GiftSection } from './components/GiftSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'full'>('mobile');
  const [guestName, setGuestName] = useState<string>('Bpk. Budi Pratama & Keluarga');

  // Load greetings from localStorage or use initial presets
  const [greetings, setGreetings] = useState<GuestbookGreeting[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_digital_guestbook_greetings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return initialGuestbookGreetings;
  });

  // Extract guest name from URL query parameter ?to=...
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to') || params.get('u') || params.get('nama');
      if (toParam) {
        setGuestName(decodeURIComponent(toParam));
      }
    } catch (e) {
      console.warn('Failed to parse URL query params', e);
    }
  }, []);

  // Save greetings whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('wedding_digital_guestbook_greetings', JSON.stringify(greetings));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [greetings]);

  // Handler to add new greeting
  const handleAddGreeting = (newGreetingData: {
    name: string;
    attendance: 'hadir' | 'tidak_hadir' | 'ragu';
    pax: number;
    message: string;
  }) => {
    const newEntry: GuestbookGreeting = {
      id: `msg-${Date.now()}`,
      name: newGreetingData.name,
      attendance: newGreetingData.attendance,
      pax: newGreetingData.pax,
      message: newGreetingData.message,
      createdAt: 'Baru saja',
      likes: 1,
    };
    setGreetings((prev) => [newEntry, ...prev]);
  };

  // Handler to like a greeting
  const handleLikeGreeting = (id: string) => {
    setGreetings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#3d3d3d] relative font-sans selection:bg-[#9a8c73]/20 selection:text-[#1f2022]">
      {/* Cover / Opening Screen */}
      <CoverScreen
        guestName={guestName}
        isOpen={isInvitationOpen}
        onOpen={() => setIsInvitationOpen(true)}
      />

      {/* Top Preview Controls Bar (Smartphone / Full View + Guest Name personalizer) */}
      <DevicePreviewBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        guestName={guestName}
        setGuestName={setGuestName}
        onReopenCover={() => setIsInvitationOpen(false)}
      />

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Floating Bottom Mobile Navigation (Dock) */}
      {isInvitationOpen && <NavbarMobile />}

      {/* Main Content Layout Container */}
      <main className="w-full flex justify-center pt-10 pb-16">
        {viewMode === 'mobile' ? (
          /* Smartphone Frame Simulation (Clean Minimalist aesthetic) */
          <div className="w-full max-w-[430px] min-h-screen my-2 sm:my-6 rounded-none sm:rounded-[44px] sm:border-[8px] sm:border-[#e2dcce] sm:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden bg-[#fdfbf7] relative">
            {/* Simulated Phone Speaker / Camera Notch on Desktop */}
            <div className="hidden sm:flex justify-center pt-2.5 pb-1 bg-[#fdfbf7] relative z-30">
              <div className="w-24 h-4 bg-[#e2dcce] rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#fdfbf7] mr-2" />
                <div className="w-8 h-1 rounded-full bg-[#fdfbf7]" />
              </div>
            </div>

            <HeroSection weddingInfo={weddingData} guestName={guestName} />
            <CoupleSection weddingInfo={weddingData} />
            <EventSection weddingInfo={weddingData} />
            <StorySection stories={weddingData.stories} />
            <GallerySection gallery={weddingData.gallery} />
            <RsvpSection
              weddingInfo={weddingData}
              defaultGuestName={guestName}
              onAddGreeting={handleAddGreeting}
            />
            <GuestBookSection
              greetings={greetings}
              onAddGreeting={handleAddGreeting}
              onLikeGreeting={handleLikeGreeting}
            />
            <GiftSection weddingInfo={weddingData} />
            <FooterSection weddingInfo={weddingData} guestName={guestName} />
          </div>
        ) : (
          /* Full Responsive View */
          <div className="w-full max-w-3xl min-h-screen bg-[#fdfbf7] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border-x border-[#e6e0d2] relative overflow-hidden">
            <HeroSection weddingInfo={weddingData} guestName={guestName} />
            <CoupleSection weddingInfo={weddingData} />
            <EventSection weddingInfo={weddingData} />
            <StorySection stories={weddingData.stories} />
            <GallerySection gallery={weddingData.gallery} />
            <RsvpSection
              weddingInfo={weddingData}
              defaultGuestName={guestName}
              onAddGreeting={handleAddGreeting}
            />
            <GuestBookSection
              greetings={greetings}
              onAddGreeting={handleAddGreeting}
              onLikeGreeting={handleLikeGreeting}
            />
            <GiftSection weddingInfo={weddingData} />
            <FooterSection weddingInfo={weddingData} guestName={guestName} />
          </div>
        )}
      </main>
    </div>
  );
}
