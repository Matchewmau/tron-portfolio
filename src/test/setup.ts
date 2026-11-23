import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock matchMedia for Framer Motion useReducedMotion & responsive queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver for Framer Motion whileInView & HudNavbar active section spy
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock Canvas 2D Context for TheGridFloor, SynthWaveVisualizer & IdentityDisc radial canvas
const mockCanvas2DContext = {
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  beginPath: vi.fn(),
  closePath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  arc: vi.fn(),
  stroke: vi.fn(),
  fill: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  setLineDash: vi.fn(),
  setTransform: vi.fn(),
  createRadialGradient: vi.fn(() => ({
    addColorStop: vi.fn(),
  })),
  createLinearGradient: vi.fn(() => ({
    addColorStop: vi.fn(),
  })),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: vi.fn(() => mockCanvas2DContext),
});

// Mock Web Audio API AudioContext, AnalyserNode, and BiquadFilterNode
class MockOscillator {
  type: OscillatorType = 'sine';
  frequency = {
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  };
  connect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
}

class MockGain {
  gain = {
    value: 0.001,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    cancelScheduledValues: vi.fn(),
  };
  connect = vi.fn();
}

class MockBiquadFilter {
  type: BiquadFilterType = 'lowpass';
  Q = { setValueAtTime: vi.fn() };
  frequency = {
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  };
  connect = vi.fn();
}

class MockAnalyser {
  fftSize = 512;
  smoothingTimeConstant = 0.8;
  connect = vi.fn();
  getByteFrequencyData = vi.fn((arr: Uint8Array) => arr.fill(64));
  getByteTimeDomainData = vi.fn((arr: Uint8Array) => arr.fill(128));
}

class MockAudioContext {
  state = 'running';
  currentTime = 0;
  destination = {};
  resume = vi.fn().mockResolvedValue(undefined);
  createOscillator = vi.fn(() => new MockOscillator());
  createGain = vi.fn(() => new MockGain());
  createBiquadFilter = vi.fn(() => new MockBiquadFilter());
  createAnalyser = vi.fn(() => new MockAnalyser());
  createMediaElementSource = vi.fn(() => ({
    connect: vi.fn(),
  }));
}

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  configurable: true,
  value: vi.fn(),
});

Object.defineProperty(window, 'AudioContext', {
  writable: true,
  configurable: true,
  value: MockAudioContext,
});
