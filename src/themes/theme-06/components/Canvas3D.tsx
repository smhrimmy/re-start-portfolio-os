import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DeviceTier } from '../../../core/device/device-tier';
import { Scene3D } from './Scene3D';

interface Canvas3DProps {
  tier: DeviceTier;
}

export const Canvas3D: React.FC<Canvas3DProps> = ({ tier }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          position: [0, 0, 12],
          fov: 75,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Suspense fallback={null}>
          <Scene3D tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
};
