import React, { useState } from 'react';
import { MessageSquareHeart, Heart, Send, Sparkles, Filter, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { GuestbookGreeting } from '../types';

interface GuestBookSectionProps {
  greetings: GuestbookGreeting[];
  onAddGreeting: (greeting: {
    name: string;
    attendance: 'hadir' | 'tidak_hadir' | 'ragu';
    pax: number;
    message: string;
  }) => void;
  onLikeGreeting: (id: string) => void;
}

export const GuestBookSection: React.FC<GuestBookSectionProps> = ({
  greetings,
  onAddGreeting,
  onLikeGreeting,
}) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [pax, setPax] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'hadir' | 'tidak_hadir'>('all');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddGreeting({
      name: name.trim(),
      attendance,
      pax: attendance === 'hadir' ? pax : 0,
      message: message.trim(),
    });

    setName('');
    setMessage('');
  };

  const filteredGreetings = greetings.filter((item) => {
    if (filter === 'all') return true;
    return item.attendance === filter;
  });

  const totalHadir = greetings.filter((g) => g.attendance === 'hadir').length;
  const totalTidakHadir = greetings.filter((g) => g.attendance === 'tidak_hadir').length;

  return (
    <section id="buku-tamu" className="py-20 px-4 bg-[#fdfbf7] relative">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ded7c8] bg-white/80 text-[11px] uppercase tracking-widest text-[#8c733e] font-semibold mb-3 shadow-xs">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Buku Tamu Digital</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a]">
            Untaian Doa & Ucapan
          </h2>
          <p className="text-xs text-[#6e7478] mt-2 max-w-sm mx-auto">
            Terima kasih atas doa tulus dan harapan baik yang Anda curahkan untuk lembaran baru kami
          </p>
        </div>

        {/* Stats summary badges */}
        <div className="grid grid-cols-3 gap-2.5 mb-8">
          <div className="p-3 rounded-2xl bg-white border border-[#e8e2d5] text-center shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] text-[#787f85] uppercase tracking-wider block font-medium">Total Pesan</span>
            <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#23272a]">
              {greetings.length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#e8e2d5] text-center shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] text-emerald-700 uppercase tracking-wider block font-medium">Konfirmasi Hadir</span>
            <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-emerald-700">
              {totalHadir}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#e8e2d5] text-center shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] text-rose-600 uppercase tracking-wider block font-medium">Berhalangan</span>
            <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-rose-600">
              {totalTidakHadir}
            </span>
          </div>
        </div>

        {/* Quick Message Input Box */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e8e2d5] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.03)] mb-8">
          <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#23272a] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8c733e]" />
            Tulis Ucapan & Doa
          </h3>

          <form onSubmit={handleQuickSubmit} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-xs text-[#23272a] placeholder:text-[#9ea4a8] focus:outline-none focus:border-[#8c733e]"
            />

            <div className="flex gap-2 text-xs">
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value as 'hadir' | 'tidak_hadir' | 'ragu')}
                className="flex-1 px-3 py-2 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-xs text-[#23272a] focus:outline-none focus:border-[#8c733e]"
              >
                <option value="hadir">Status: Hadir</option>
                <option value="tidak_hadir">Status: Tidak Hadir</option>
                <option value="ragu">Status: Ragu-ragu</option>
              </select>

              {attendance === 'hadir' && (
                <select
                  value={pax}
                  onChange={(e) => setPax(parseInt(e.target.value))}
                  className="w-24 px-3 py-2 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-xs text-[#23272a] focus:outline-none focus:border-[#8c733e]"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                </select>
              )}
            </div>

            <textarea
              required
              rows={2}
              placeholder="Tuliskan ucapan selamat dan doa..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-xs text-[#23272a] placeholder:text-[#9ea4a8] focus:outline-none focus:border-[#8c733e] resize-none"
            />

            <button
              id="btn-kirim-doa"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#23272a] hover:bg-[#151718] text-[#fdfbf7] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-[#dfb564]" />
              <span>Kirim Ucapan</span>
            </button>
          </form>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-1.5 text-xs text-[#6e7478]">
            <Filter className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Filter:</span>
          </div>
          <div className="flex gap-1.5 text-[11px]">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#23272a] text-[#fdfbf7] border-[#23272a] font-semibold'
                  : 'bg-white text-[#6e7478] border-[#ded7c8] hover:text-[#23272a]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('hadir')}
              className={`px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                filter === 'hadir'
                  ? 'bg-[#23272a] text-[#fdfbf7] border-[#23272a] font-semibold'
                  : 'bg-white text-[#6e7478] border-[#ded7c8] hover:text-[#23272a]'
              }`}
            >
              Hadir ({totalHadir})
            </button>
          </div>
        </div>

        {/* Greetings List */}
        <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredGreetings.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white border border-[#e8e2d5] hover:border-[#8c733e]/40 transition-colors shadow-[0_4px_14px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  {/* Initials Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#f4f0e6] border border-[#ded7c8] text-[#8c733e] font-bold text-xs flex items-center justify-center shrink-0">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#23272a] leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-[#787f85]">{item.createdAt}</span>
                  </div>
                </div>

                {/* Attendance Pill */}
                <div>
                  {item.attendance === 'hadir' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-medium">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Hadir {item.pax > 1 ? `(${item.pax})` : ''}
                    </span>
                  )}
                  {item.attendance === 'tidak_hadir' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[10px] text-rose-600 font-medium">
                      <XCircle className="w-2.5 h-2.5" />
                      Berhalangan
                    </span>
                  )}
                  {item.attendance === 'ragu' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] text-amber-700 font-medium">
                      <HelpCircle className="w-2.5 h-2.5" />
                      Ragu
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#3d3d3d] leading-relaxed my-2">
                "{item.message}"
              </p>

              <div className="flex justify-end pt-1 border-t border-[#f0eae0]">
                <button
                  onClick={() => onLikeGreeting(item.id)}
                  className="flex items-center gap-1 text-[11px] text-[#787f85] hover:text-[#8c733e] transition-colors cursor-pointer group"
                >
                  <Heart className="w-3 h-3 text-[#8c733e] group-hover:scale-125 transition-transform" />
                  <span>{item.likes} Suka</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
