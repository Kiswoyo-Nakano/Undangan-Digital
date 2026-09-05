export interface CouplePerson {
  name: string;
  fullName: string;
  nickname: string;
  role: 'groom' | 'bride';
  sonOrDaughterOf: string;
  fatherName: string;
  motherName: string;
  orderInFamily: string; // e.g. "Putra Pertama dari"
  avatar: string;
  instagram?: string;
  description: string;
}

export interface EventDetail {
  title: string;
  dayName: string;
  dateStr: string;
  timeStr: string;
  timezone: string;
  venueName: string;
  roomName?: string;
  address: string;
  mapsEmbedUrl: string;
  mapsDirectUrl: string;
  notes?: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'prewedding' | 'engagement' | 'candid';
}

export interface GuestbookGreeting {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  pax: number;
  message: string;
  createdAt: string;
  likes: number;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoType: 'bca' | 'mandiri' | 'bri' | 'qris';
  qrImageUrl?: string;
}

export interface PhysicalGiftAddress {
  recipientName: string;
  phoneNumber: string;
  fullAddress: string;
  notes?: string;
}

export interface WeddingInfo {
  groom: CouplePerson;
  bride: CouplePerson;
  weddingDateISO: string; // "2026-11-28T09:00:00+07:00"
  akad: EventDetail;
  resepsi: EventDetail;
  whatsappRsvpNumber: string; // e.g. "6281234567890"
  quotes: {
    verse: string;
    text: string;
    source: string;
  };
  stories: StoryMilestone[];
  gallery: GalleryPhoto[];
  heroCouplePhoto?: string;
  bankAccounts: BankAccount[];
  physicalGift: PhysicalGiftAddress;
}
