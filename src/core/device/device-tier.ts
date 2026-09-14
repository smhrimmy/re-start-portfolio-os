export type DeviceTier = 'HIGH' | 'MEDIUM' | 'LOW';

export interface DeviceCapability {
  tier: DeviceTier;
  hasWebGL2: boolean;
  logicalCores: number;
  deviceMemoryGB: number;
  isReducedMotion: boolean;
  isSaveData: boolean;
  reason: string;
}

export function detectDeviceCapability(): DeviceCapability {
  if (typeof window === 'undefined') {
    return {
      tier: 'MEDIUM',
      hasWebGL2: false,
      logicalCores: 4,
      deviceMemoryGB: 4,
      isReducedMotion: false,
      isSaveData: false,
      reason: 'Server-side evaluation fallback',
    };
  }

  // 1. WebGL2 Check
  let hasWebGL2 = false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    hasWebGL2 = !!gl;
  } catch {
    hasWebGL2 = false;
  }

  // If no WebGL2, force LOW tier immediately
  if (!hasWebGL2) {
    return {
      tier: 'LOW',
      hasWebGL2: false,
      logicalCores: navigator.hardwareConcurrency || 2,
      deviceMemoryGB: (navigator as unknown as { deviceMemory?: number }).deviceMemory || 2,
      isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      isSaveData: false,
      reason: 'WebGL2 unsupported by device/browser context',
    };
  }

  // 2. Reduced Motion Preference & Data Saver Check
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const isSaveData = connection?.saveData || connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';

  if (isReducedMotion || isSaveData) {
    return {
      tier: 'LOW',
      hasWebGL2,
      logicalCores: navigator.hardwareConcurrency || 2,
      deviceMemoryGB: (navigator as unknown as { deviceMemory?: number }).deviceMemory || 2,
      isReducedMotion,
      isSaveData: !!isSaveData,
      reason: isReducedMotion ? 'Prefers reduced motion enabled' : 'Data-saver / slow network detected',
    };
  }

  // 3. Hardware Signals
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;

  if (cores >= 8 && memory >= 8) {
    return {
      tier: 'HIGH',
      hasWebGL2,
      logicalCores: cores,
      deviceMemoryGB: memory,
      isReducedMotion: false,
      isSaveData: false,
      reason: 'High hardware specs (>=8 cores, >=8GB memory)',
    };
  }

  if (cores >= 4 && memory >= 4) {
    return {
      tier: 'MEDIUM',
      hasWebGL2,
      logicalCores: cores,
      deviceMemoryGB: memory,
      isReducedMotion: false,
      isSaveData: false,
      reason: 'Medium hardware specs (4 cores, 4GB memory)',
    };
  }

  return {
    tier: 'LOW',
    hasWebGL2,
    logicalCores: cores,
    deviceMemoryGB: memory,
    isReducedMotion: false,
    isSaveData: false,
    reason: 'Low hardware specs detected',
  };
}

/**
 * Dev-mode FPS monitor warning helper.
 * Tracks FPS and logs a warning if sustained frame rate drops below tier target.
 */
export function startFpsMonitor(tier: DeviceTier): () => void {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') {
    return () => {};
  }

  const targetFloor = tier === 'HIGH' ? 55 : tier === 'MEDIUM' ? 28 : 0;
  if (targetFloor === 0) return () => {};

  let frameCount = 0;
  let lastTime = performance.now();
  let lowFpsDurationMs = 0;
  let animId: number;

  const checkFps = (now: number) => {
    frameCount++;
    const delta = now - lastTime;

    if (delta >= 1000) {
      const currentFps = Math.round((frameCount * 1000) / delta);
      if (currentFps < targetFloor) {
        lowFpsDurationMs += delta;
        if (lowFpsDurationMs >= 2000) {
          console.warn(
            `[DeviceTier Monitor] Sustained low FPS detected: ${currentFps} FPS (Tier: ${tier}, Floor: ${targetFloor} FPS)`
          );
          lowFpsDurationMs = 0;
        }
      } else {
        lowFpsDurationMs = 0;
      }

      frameCount = 0;
      lastTime = now;
    }

    animId = requestAnimationFrame(checkFps);
  };

  animId = requestAnimationFrame(checkFps);

  return () => {
    cancelAnimationFrame(animId);
  };
}
