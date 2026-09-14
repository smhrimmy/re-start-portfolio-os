import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DeviceCapability, DeviceTier, detectDeviceCapability, startFpsMonitor } from '../device/device-tier';

interface MotionContextType {
  capability: DeviceCapability;
  tier: DeviceTier;
  is3DAllowed: boolean;
}

const MotionContext = createContext<MotionContextType>({
  capability: {
    tier: 'MEDIUM',
    hasWebGL2: true,
    logicalCores: 4,
    deviceMemoryGB: 4,
    isReducedMotion: false,
    isSaveData: false,
    reason: 'Default state',
  },
  tier: 'MEDIUM',
  is3DAllowed: true,
});

export const MotionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [capability, setCapability] = useState<DeviceCapability>(() => detectDeviceCapability());

  useEffect(() => {
    const cap = detectDeviceCapability();
    setCapability(cap);
    const stopMonitor = startFpsMonitor(cap.tier);

    return () => {
      stopMonitor();
    };
  }, []);

  const is3DAllowed = capability.tier !== 'LOW' && capability.hasWebGL2 && !capability.isReducedMotion;

  return (
    <MotionContext.Provider value={{ capability, tier: capability.tier, is3DAllowed }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => useContext(MotionContext);
