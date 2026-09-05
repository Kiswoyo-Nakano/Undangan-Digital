/**
 * Audio Player for Wedding Background Music
 * Features:
 * - Real audio streaming from reliable royalty-free romantic piano tracks
 * - Web Audio API synthesized romantic melody fallback if external network stream is blocked
 * - Volume control, mute, play/pause
 */

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  source: 'synth' | 'stream';
  url?: string;
}

export const AVAILABLE_TRACKS: TrackInfo[] = [
  {
    id: 'stream-canon',
    title: 'Acoustic Romance & Piano',
    artist: 'Wedding Melodies',
    source: 'stream',
    // Wikimedia Commons public domain / CC romantic piano piece
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Canon_in_D_Major_-_Johann_Pachelbel.ogg',
  },
  {
    id: 'synth-piano',
    title: 'Romantic Ethereal Chords (Procedural)',
    artist: 'Acoustic Piano & Bells',
    source: 'synth',
  },
  {
    id: 'stream-debussy',
    title: 'Clair de Lune (Piano)',
    artist: 'Claude Debussy',
    source: 'stream',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Clair_de_lune_%28Debussy%29.ogg',
  },
];

class WeddingAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private synthInterval: number | null = null;
  private isPlayingState = false;
  private volume = 0.6;
  private currentTrackIndex = 0;
  private listeners: Array<() => void> = [];

  constructor() {
    // Lazy init on first user gesture
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== listener);
    };
  }

  public getIsPlaying(): boolean {
    return this.isPlayingState;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentTrack(): TrackInfo {
    return AVAILABLE_TRACKS[this.currentTrackIndex] || AVAILABLE_TRACKS[0];
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  public async play(): Promise<boolean> {
    try {
      const track = this.getCurrentTrack();
      if (track.source === 'stream' && track.url) {
        if (!this.audioElement) {
          this.audioElement = new Audio();
          this.audioElement.loop = true;
          this.audioElement.preload = 'auto';
          this.audioElement.addEventListener('ended', () => {
            if (this.isPlayingState) {
              this.audioElement?.play();
            }
          });
          this.audioElement.addEventListener('error', () => {
            // Fallback to synth if stream fails
            console.warn('Audio stream error, falling back to gentle synth melody');
            this.stopStream();
            this.startSynth();
          });
        }
        this.audioElement.src = track.url;
        this.audioElement.volume = this.volume;
        await this.audioElement.play();
        this.isPlayingState = true;
      } else {
        this.startSynth();
        this.isPlayingState = true;
      }
      this.notify();
      return true;
    } catch (err) {
      console.warn('Audio play attempt blocked or failed, starting gentle synth fallback', err);
      try {
        this.startSynth();
        this.isPlayingState = true;
        this.notify();
        return true;
      } catch (fallbackErr) {
        console.error('All audio methods failed', fallbackErr);
        this.isPlayingState = false;
        this.notify();
        return false;
      }
    }
  }

  public pause() {
    this.stopStream();
    this.stopSynth();
    this.isPlayingState = false;
    this.notify();
  }

  public toggle(): Promise<boolean> | void {
    if (this.isPlayingState) {
      this.pause();
    } else {
      return this.play();
    }
  }

  public changeTrack(index: number) {
    const wasPlaying = this.isPlayingState;
    this.pause();
    this.currentTrackIndex = (index + AVAILABLE_TRACKS.length) % AVAILABLE_TRACKS.length;
    if (wasPlaying) {
      this.play();
    } else {
      this.notify();
    }
  }

  private stopStream() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  // Romantic arpeggiated piano & bell chords using Web Audio API
  private startSynth() {
    this.stopSynth();
    if (typeof window === 'undefined') return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Progression: F - C - Dm - Bb (Gentle romantic wedding progression)
    // Notes in Hz
    const chordProgressions = [
      [174.61, 220.00, 261.63, 349.23, 440.00], // F major (F3, A3, C4, F4, A4)
      [130.81, 196.00, 261.63, 329.63, 392.00], // C major (C3, G3, C4, E4, G4)
      [146.83, 220.00, 261.63, 349.23, 440.00], // D minor (D3, A3, C4, F4, A4)
      [116.54, 174.61, 233.08, 293.66, 349.23], // Bb major (Bb2, F3, Bb3, D4, F4)
    ];

    let chordIdx = 0;
    let step = 0;

    const playNote = (freq: number, duration: number, isBass = false) => {
      if (!this.audioCtx || this.audioCtx.state !== 'running') return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Soft tone: triangle + sine
      osc.type = isBass ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      const maxGain = (isBass ? 0.08 : 0.05) * this.volume;
      const now = this.audioCtx.currentTime;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(maxGain, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    };

    // Play next step every 550ms
    const tick = () => {
      const chord = chordProgressions[chordIdx];
      // Bass on first beat
      if (step === 0) {
        playNote(chord[0] / 2, 2.5, true);
      }
      // Arpeggio note
      const noteIdx = 1 + (step % (chord.length - 1));
      playNote(chord[noteIdx], 1.2, false);

      step++;
      if (step >= 4) {
        step = 0;
        chordIdx = (chordIdx + 1) % chordProgressions.length;
      }
    };

    tick();
    this.synthInterval = window.setInterval(tick, 550);
  }

  private stopSynth() {
    if (this.synthInterval !== null) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const weddingAudio = new WeddingAudioController();
