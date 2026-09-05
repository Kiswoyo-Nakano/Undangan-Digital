import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Users, AlertCircle, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingInfo } from '../types';

interface RsvpSectionProps {
  weddingInfo: WeddingInfo;
  defaultGuestName: string;
  onAddGreeting: (greeting: {
    name: string;
    attendance: 'hadir' | 'tidak_hadir' | 'ragu';
    pax: number;
    message: string;
  }) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  weddingInfo,
  defaultGuestName,
  onAddGreeting,
}) => {
  const [name, setName] = useState(defaultGuestName || '');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [pax, setPax] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Trigger celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#c5a059', '#dfb564', '#22c55e'],
    });

    // Add to local guestbook list
    onAddGreeting({
      name: name.trim(),
      attendance,
      pax: attendance === 'hadir' ? pax : 0,
      message: message.trim() || 'Selamat menempuh hidup baru untuk kedua mempelai!',
    });

    setSubmitted(true);

    // Format WhatsApp message
    const statusText =
      attendance === 'hadir'
        ? `Hadir (${pax} Orang)`
        : attendance === 'tidak_hadir'
        ? 'Maaf, Tidak Dapat Hadir'
        : 'Masih Ragu / Belum Pasti';

    const waText = encodeURIComponent(
      `*KONFIRMASI KEHADIRAN PERNIKAHAN*\n` +
      `Kepada: ${weddingInfo.groom.name} & ${weddingInfo.bride.name}\n\n` +
      `*Nama:* ${name.trim()}\n` +
      `${phone ? `*No. HP:* ${phone.trim()}\n` : ''}` +
      `*Konfirmasi:* ${statusText}\n` +
      `*Ucapan & Doa:* ${message.trim() || 'Selamat menempuh hidup baru, semoga sakinah mawaddah warahmah.'}\n\n` +
      `_Terkirim otomatis dari Website Undangan Digital_`
    );

    const waUrl = `https://wa.me/${weddingInfo.whatsappRsvpNumber}?text=${waText}`;

    // Open WhatsApp in new tab / app
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-[#faf8f4] relative">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ded7c8] bg-white/80 text-[11px] uppercase tracking-widest text-[#8c733e] font-semibold mb-3 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Konfirmasi Kehadiran</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a]">
            RSVP via WhatsApp
          </h2>
          <p className="text-xs text-[#6e7478] mt-2 max-w-sm mx-auto">
            Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran demi kenyamanan reservasi tempat
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e8e2d5] backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.03)]">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#23272a]">
                Terima Kasih atas Konfirmasinya!
              </h3>
              <p className="text-xs text-[#6e7478] max-w-sm mx-auto">
                Konfirmasi dan ucapan Anda telah tersimpan di Buku Tamu dan dialihkan ke WhatsApp mempelai.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-xl bg-[#f4f0e6] hover:bg-[#eae4d5] text-xs font-semibold text-[#23272a] border border-[#ded7c8] transition-colors"
              >
                Ubah atau Kirim Ulang
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-medium text-[#3d3d3d] mb-1.5">
                  Nama Lengkap <span className="text-[#8c733e]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Prasetyo, S.E."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-sm text-[#23272a] placeholder:text-[#9ea4a8] focus:outline-none focus:border-[#8c733e] transition-colors"
                />
              </div>

              {/* No WhatsApp */}
              <div>
                <label className="block text-xs font-medium text-[#3d3d3d] mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#8c733e]" />
                  <span>No. WhatsApp (Opsional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-sm text-[#23272a] placeholder:text-[#9ea4a8] focus:outline-none focus:border-[#8c733e] transition-colors"
                />
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-xs font-medium text-[#3d3d3d] mb-1.5">
                  Konfirmasi Kehadiran <span className="text-[#8c733e]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hadir', label: 'Hadir' },
                    { id: 'tidak_hadir', label: 'Tidak Hadir' },
                    { id: 'ragu', label: 'Masih Ragu' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAttendance(opt.id as 'hadir' | 'tidak_hadir' | 'ragu')}
                      className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer text-center ${
                        attendance === opt.id
                          ? 'bg-[#23272a] text-[#fdfbf7] border-[#23272a] font-semibold shadow-xs'
                          : 'bg-[#fbf9f4] text-[#6e7478] border-[#ded7c8] hover:border-[#8c733e]/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Pax (if hadir) */}
              {attendance === 'hadir' && (
                <div>
                  <label className="block text-xs font-medium text-[#3d3d3d] mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#8c733e]" />
                    <span>Jumlah Orang yang Hadir</span>
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-sm text-[#23272a] focus:outline-none focus:border-[#8c733e]"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                    <option value={5}>5 Orang (Keluarga)</option>
                  </select>
                </div>
              )}

              {/* Message / Wishes */}
              <div>
                <label className="block text-xs font-medium text-[#3d3d3d] mb-1.5 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8c733e]" />
                  <span>Ucapan & Doa Restu</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan doa dan harapan terbaik untuk kedua mempelai..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f4] border border-[#ded7c8] text-sm text-[#23272a] placeholder:text-[#9ea4a8] focus:outline-none focus:border-[#8c733e] transition-colors resize-none"
                />
              </div>

              {/* WhatsApp notice */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-[#f4f0e6] border border-[#ded7c8] text-[11px] text-[#6e7478]">
                <AlertCircle className="w-4 h-4 text-[#8c733e] shrink-0 mt-0.5" />
                <span>
                  Menekan tombol di bawah akan menyimpan ucapan Anda ke Buku Tamu dan secara otomatis membuka WhatsApp untuk konfirmasi langsung ke mempelai.
                </span>
              </div>

              {/* Submit Button */}
              <button
                id="btn-kirim-rsvp"
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7a6e] text-white font-semibold text-sm tracking-wide shadow-[0_4px_16px_rgba(37,211,102,0.25)] flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Konfirmasi via WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
