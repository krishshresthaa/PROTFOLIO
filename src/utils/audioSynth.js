// Web Audio API Synth for zero-asset, high-performance tactile sound effects

let audioCtx = null;
let masterGain = null;
let soundEnabled = true;
let cachedNoiseBuffer = null;
let lastRustleTime = 0;
let unlocked = false;

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
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (audioCtx && audioCtx.state === 'running') {
      unlocked = true;
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

const getAudioContext = () => {
  unlockAudio();
  return audioCtx;
};

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
  if (enabled) {
    playPop();
  }
};

export const isSoundEnabled = () => soundEnabled;

// Loud, Tactile Paper Rustle Sound (Card / Letter Hover)
export const playPaperRustle = () => {
  if (!soundEnabled) return;
  const now = Date.now();
  if (now - lastRustleTime < 60) return; // Fast responsive throttle
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
    gain.gain.setValueAtTime(0.5, ctx.currentTime); // High volume gain
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

    gain1.gain.setValueAtTime(0.9, ctx.currentTime); // High punch volume
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

    gain.gain.setValueAtTime(0.75, ctx.currentTime); // Loud pop
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Ignore
  }
};
