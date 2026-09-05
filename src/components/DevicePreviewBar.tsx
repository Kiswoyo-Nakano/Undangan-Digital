import React, { useState } from 'react';
import { Smartphone, Monitor, UserCheck, RefreshCw, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface DevicePreviewBarProps {
  viewMode: 'mobile' | 'full';
  setViewMode: (mode: 'mobile' | 'full') => void;
  guestName: string;
  setGuestName: (name: string) => void;
  onReopenCover: () => void;
}

export const DevicePreviewBar: React.FC<DevicePreviewBarProps> = ({
  viewMode,
  setViewMode,
  guestName,
  setGuestName,
  onReopenCover,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [tempName, setTempName] = useState(guestName);
  const [savedNameToast, setSavedNameToast] = useState(false);

  const handleApplyName = (e: React.FormEvent) => {
    e.preventDefault();
    setGuestName(tempName);
    setSavedNameToast(true);
    // Update URL query parameter without full reload
    const url = new URL(window.location.href);
    url.searchParams.set('to', tempName);
    window.history.replaceState({}, '', url.toString());

    setTimeout(() => setSavedNameToast(false), 2000);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none">
      <div className="pointer-events-auto bg-white/95 border-b border-[#e5dfd2] backdrop-blur-md px-4 py-2 w-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs gap-3">
          {/* View Mode Toggle (Smartphone vs Full Desktop) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#6e7478] hidden sm:inline">Tampilan:</span>
            <div className="flex p-0.5 rounded-lg bg-[#f4f0e6] border border-[#ded7c8]">
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'mobile'
                    ? 'bg-[#23272a] text-[#fdfbf7] font-semibold'
                    : 'text-[#6e7478] hover:text-[#23272a]'
                }`}
                title="Tampilan Smartphone (Layar Ponsel)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden xs:inline text-[11px]">Smartphone</span>
              </button>
              <button
                onClick={() => setViewMode('full')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'full'
                    ? 'bg-[#23272a] text-[#fdfbf7] font-semibold'
                    : 'text-[#6e7478] hover:text-[#23272a]'
                }`}
                title="Tampilan Responsif Lebar"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden xs:inline text-[11px]">Layar Penuh</span>
              </button>
            </div>
          </div>

          {/* Quick Guest Name Editor */}
          {!collapsed && (
            <form onSubmit={handleApplyName} className="flex items-center gap-1.5 flex-1 max-w-xs sm:max-w-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ganti Nama Tamu..."
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full pl-7 pr-3 py-1 rounded-lg bg-white border border-[#ded7c8] text-xs text-[#23272a] placeholder:text-[#9ea4a8] focus:outline-none focus:border-[#8c733e]"
                />
                <UserCheck className="w-3.5 h-3.5 text-[#8c733e] absolute left-2 top-2" />
              </div>
              <button
                type="submit"
                className="px-2.5 py-1 rounded-lg bg-[#23272a] hover:bg-[#151718] text-[#fdfbf7] font-medium text-[11px] transition-colors cursor-pointer shrink-0"
              >
                {savedNameToast ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Terapkan'}
              </button>
            </form>
          )}

          {/* Action to Reopen Cover */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onReopenCover}
              className="flex items-center gap-1 text-[11px] text-[#4a4f52] hover:text-[#23272a] px-2 py-1 rounded-lg bg-[#f4f0e6] border border-[#ded7c8] cursor-pointer transition-colors"
              title="Buka Ulang Layar Sampul / Cover"
            >
              <RefreshCw className="w-3 h-3 text-[#8c733e]" />
              <span className="hidden md:inline">Layar Sampul</span>
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 text-[#6e7478] hover:text-[#23272a]"
              title={collapsed ? 'Perluas Bar' : 'Ciutkan Bar'}
            >
              {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
