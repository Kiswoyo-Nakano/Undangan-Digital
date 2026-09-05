import React, { useState, useEffect } from 'react';
import { Home, Heart, Calendar, MessageSquareHeart, Gift } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
  { id: 'pasangan', label: 'Pasangan', icon: <Heart className="w-4 h-4" /> },
  { id: 'acara', label: 'Acara', icon: <Calendar className="w-4 h-4" /> },
  { id: 'buku-tamu', label: 'Ucapan', icon: <MessageSquareHeart className="w-4 h-4" /> },
  { id: 'kado', label: 'Hadiah', icon: <Gift className="w-4 h-4" /> },
];

export const NavbarMobile: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav
        aria-label="Navigasi Menu Undangan"
        className="pointer-events-auto max-w-sm sm:max-w-md w-full bg-white/95 backdrop-blur-xl border border-[#ded7c8] rounded-full py-1.5 px-2 shadow-[0_12px_35px_rgba(0,0,0,0.08)] grid grid-cols-5 items-center"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-full transition-all text-center cursor-pointer min-h-[44px] ${
                isActive
                  ? 'text-[#23272a] bg-[#f4f0e6] font-semibold shadow-xs'
                  : 'text-[#787f85] hover:text-[#23272a]'
              }`}
              title={item.label}
            >
              <span className={`transition-transform duration-200 ${isActive ? 'scale-110 text-[#8c733e]' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5 leading-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
