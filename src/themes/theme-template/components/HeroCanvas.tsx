import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CanvasErrorBoundary } from '../../../core/error-boundaries/CanvasErrorBoundary';
import { Hero2DFallback } from './Hero2DFallback';

function SpinningCube() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
}

export const HeroCanvas: React.FC = () => {
  return (
    <CanvasErrorBoundary fallback={<Hero2DFallback />}>
      <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-900 border border-blue-500/20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpinningCube />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
};
