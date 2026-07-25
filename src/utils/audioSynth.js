// Web Audio API Synth for zero-asset, high-performance tactile sound effects

let audioCtx = null;
let soundEnabled = true;
let cachedNoiseBuffer = null;
let lastRustleTime = 0;

const getAudioContext = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
};

export const isSoundEnabled = () => soundEnabled;

// Loud, Crisp Paper Rustle Sound (Card / Letter Hover)
export const playPaperRustle = () => {
  if (!soundEnabled) return;
  const now = Date.now();
  if (now - lastRustleTime < 80) return; // Responsive throttle
  lastRustleTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!cachedNoiseBuffer) {
      const bufferSize = Math.floor(ctx.sampleRate * 0.08);
      cachedNoiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = cachedNoiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = cachedNoiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, ctx.currentTime);
    filter.Q.setValueAtTime(2.2, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime); // Boosted from 0.025 to 0.25
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {
    // Ignore audio context errors if blocked by browser policy
  }
};

// Rich Rubber Stamp Thump Sound (Button & Stamp Clicks)
export const playStampClick = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.75, ctx.currentTime); // Boosted from 0.2 to 0.75
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    // Ignore
  }
};

// Bright Push Pin Pop Sound (Step Selection & Drag Reset)
export const playPop = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.6, ctx.currentTime); // Boosted from 0.1 to 0.6
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    // Ignore
  }
};
