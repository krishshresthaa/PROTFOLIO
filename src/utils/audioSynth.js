// Web Audio API Synth for zero-asset, high-performance tactile sound effects & soft background melody

let audioCtx = null;
let masterGain = null;
let musicGain = null;
let soundEnabled = true;
let cachedNoiseBuffer = null;
let lastRustleTime = 0;
let unlocked = false;
let melodyInterval = null;
let melodyStep = 0;

// Soft Pentatonic Ambient Melody Notes (Frequencies in Hz)
const AMBIENT_NOTES = [130.81, 164.81, 196.00, 246.94, 293.66, 329.63, 246.94, 196.00];

// Global User Gesture Unlocker for Browser Autoplay Policy
const unlockAudio = () => {
  if (unlocked) return;
  try {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();

        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(1.0, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);

        // Music Gain Node for Soft Ambient Background Melody
        musicGain = audioCtx.createGain();
        musicGain.gain.setValueAtTime(soundEnabled ? 0.04 : 0.0, audioCtx.currentTime);
        musicGain.connect(masterGain);
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (audioCtx && audioCtx.state === 'running') {
      unlocked = true;
      startAmbientMelody();
    }
  } catch (e) {
    // Ignore
  }
};

// Add global listeners to unlock audio on first user interaction anywhere
if (typeof window !== 'undefined') {
  const unlockEvents = ['click', 'pointerdown', 'touchstart', 'keydown'];
  unlockEvents.forEach(evt => {
    window.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });
}

// Continuous Soft Ambient Background Melody Loop
const startAmbientMelody = () => {
  if (melodyInterval || !audioCtx) return;

  const playNextMelodyNote = () => {
    if (!soundEnabled || !audioCtx || audioCtx.state !== 'running') return;

    try {
      const noteFreq = AMBIENT_NOTES[melodyStep % AMBIENT_NOTES.length];
      melodyStep++;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, audioCtx.currentTime);

      // Lowpass Filter for Warm Lo-Fi Studio Sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550, audioCtx.currentTime);

      // Soft Envelope (Slow Attack & Gentle Decay)
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.4); // Very soft low volume
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(musicGain || masterGain);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.2);
    } catch (e) {
      // Ignore
    }
  };

  playNextMelodyNote();
  melodyInterval = setInterval(playNextMelodyNote, 1400); // Gentle 1.4s arpeggio tempo
};

const getAudioContext = () => {
  unlockAudio();
  return audioCtx;
};

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
  if (musicGain && audioCtx) {
    musicGain.gain.setValueAtTime(enabled ? 0.04 : 0.0, audioCtx.currentTime);
  }
  if (enabled) {
    unlockAudio();
    playPop();
  }
};

export const isSoundEnabled = () => soundEnabled;

// Loud, Tactile Paper Rustle Sound (Card / Letter Hover)
export const playPaperRustle = () => {
  if (!soundEnabled) return;
  const now = Date.now();
  if (now - lastRustleTime < 60) return;
  lastRustleTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    if (!cachedNoiseBuffer) {
      const bufferSize = Math.floor(ctx.sampleRate * 0.12);
      cachedNoiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = cachedNoiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = cachedNoiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain || ctx.destination);

    noise.start();
  } catch (e) {
    // Ignore
  }
};

// Rich Heavy Rubber Stamp Thump Sound (Button & Stamp Clicks)
export const playStampClick = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    // Sub Bass Punch
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(280, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);

    gain1.gain.setValueAtTime(0.9, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc1.connect(gain1);
    gain1.connect(masterGain || ctx.destination);

    osc1.start();
    osc1.stop(ctx.currentTime + 0.15);

    // High Click Snap
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(800, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);

    gain2.gain.setValueAtTime(0.35, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc2.connect(gain2);
    gain2.connect(masterGain || ctx.destination);

    osc2.start();
    osc2.stop(ctx.currentTime + 0.04);

  } catch (e) {
    // Ignore
  }
};

// Bright Push Pin Pop Sound (Step Selection & Drag Reset)
export const playPop = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(550, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.75, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Ignore
  }
};
