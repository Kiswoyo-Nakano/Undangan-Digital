import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard, Package, Sparkles } from 'lucide-react';
import { WeddingInfo } from '../types';

interface GiftSectionProps {
  weddingInfo: WeddingInfo;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ weddingInfo }) => {
  const { bankAccounts, physicalGift } = weddingInfo;
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<'transfer' | 'physical'>('transfer');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => {
      setCopiedAccount(null);
    }, 2000);
  };

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => {
      setCopiedAddress(false);
    }, 2000);
  };

  return (
    <section id="kado" className="py-20 px-4 bg-[#faf8f4] relative">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ded7c8] bg-white/80 text-[11px] uppercase tracking-widest text-[#8c733e] font-semibold mb-3 shadow-xs">
            <Gift className="w-3.5 h-3.5 text-[#8c733e]" />
            <span>Tanda Kasih</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#23272a]">
            Amplop Digital & Kado
          </h2>
          <p className="text-xs text-[#6e7478] mt-2 max-w-sm mx-auto">
            Doa restu Anda adalah karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih, Anda dapat menyalurkannya melalui:
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-[#f4f0e6] rounded-2xl border border-[#ded7c8]">
            <button
              onClick={() => setActiveTab('transfer')}
              className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'transfer'
                  ? 'bg-[#23272a] text-[#fdfbf7] shadow-xs'
                  : 'text-[#6e7478] hover:text-[#23272a]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Transfer Bank</span>
            </button>
            <button
              onClick={() => setActiveTab('physical')}
              className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'physical'
                  ? 'bg-[#23272a] text-[#fdfbf7] shadow-xs'
                  : 'text-[#6e7478] hover:text-[#23272a]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Kirim Kado Fisik</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Bank Accounts */}
        {activeTab === 'transfer' && (
          <div className="space-y-4">
            {bankAccounts.map((account) => {
              const isCopied = copiedAccount === account.accountNumber;
              return (
                <div
                  key={account.accountNumber}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e8e2d5] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-xs text-[#8c733e] uppercase tracking-wider">
                      {account.bankName}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#8c733e]" />
                  </div>

                  <div className="mb-4">
                    <p className="text-[10px] text-[#787f85] uppercase tracking-widest">Nomor Rekening</p>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-[#23272a] tracking-wider my-0.5">
                      {account.accountNumber}
                    </p>
                    <p className="text-xs text-[#596066]">
                      a/n <span className="font-semibold text-[#23272a]">{account.accountHolder}</span>
                    </p>
                  </div>

                  <button
                    id={`btn-copy-${account.accountNumber}`}
                    onClick={() => handleCopy(account.accountNumber, account.accountNumber)}
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-[#f4f0e6] hover:bg-[#eae4d5] border-[#ded7c8] text-[#23272a]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Nomor Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8c733e]" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Physical Gift Delivery */}
        {activeTab === 'physical' && (
          <div className="p-6 rounded-3xl bg-white border border-[#e8e2d5] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-[#8c733e]" />
              <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#23272a]">
                Alamat Kirim Kado
              </h3>
            </div>

            <div className="space-y-2 text-xs text-[#596066] mb-6">
              <p>
                <strong className="text-[#23272a] font-semibold">Penerima:</strong> {physicalGift.recipientName}
              </p>
              <p>
                <strong className="text-[#23272a] font-semibold">No. Telepon:</strong> {physicalGift.phoneNumber}
              </p>
              <p className="leading-relaxed">
                <strong className="text-[#23272a] font-semibold">Alamat:</strong> {physicalGift.fullAddress}
              </p>
              {physicalGift.notes && (
                <p className="text-[#787f85] italic text-[11px]">
                  Catatan: {physicalGift.notes}
                </p>
              )}
            </div>

            <button
              onClick={() => handleCopyAddress(`${physicalGift.recipientName} (${physicalGift.phoneNumber})\n${physicalGift.fullAddress}`)}
              className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                copiedAddress
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-[#f4f0e6] hover:bg-[#eae4d5] border-[#ded7c8] text-[#23272a]'
              }`}
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Alamat Lengkap Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#8c733e]" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
