import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasErrorBoundary } from '@/core/error-boundaries/CanvasErrorBoundary';

interface SceneContentProps {
  scrollProgress: number;
}

const Animated3DScene: React.FC<SceneContentProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4 + scrollProgress * 0.05;
      meshRef.current.rotation.x = scrollProgress * Math.PI * 2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - scrollProgress * 1.5;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
      ringRef.current.rotation.x = scrollProgress * Math.PI;
    }

    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y -= delta * 0.2;
    }

    // Camera Dolly & Panning
    state.camera.position.z = 7.5 - scrollProgress * 3;
    state.camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 1.5;
    state.camera.lookAt(0, 0, 0);
  });

  // Dynamic light color based on scroll progress
  const activeLightColor = scrollProgress > 0.5 ? '#00f0ff' : '#f59e0b';

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color={activeLightColor} />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#3054de" />

      {/* Starfield Particles */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Central 3D Sculptural Core */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        {/* Core Polyhedron */}
        <mesh ref={meshRef} scale={1.6}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#111319"
            emissive={activeLightColor}
            emissiveIntensity={0.4}
            wireframe
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Outer Orbital Ring */}
        <mesh ref={ringRef} scale={2.4}>
          <torusGeometry args={[1, 0.03, 16, 100]} />
          <meshStandardMaterial color={activeLightColor} roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Outer Polyhedron Cage */}
        <mesh ref={outerMeshRef} scale={3.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#3054de"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </Float>
    </>
  );
};

interface Scroll3DCanvasProps {
  scrollProgress: number;
}

export const Scroll3DCanvas: React.FC<Scroll3DCanvasProps> = ({ scrollProgress }) => {
  return (
    <div className="canvas-bg-viewport">
      <CanvasErrorBoundary
        fallback={
          <div className="w-full h-full bg-[#07080b] flex items-center justify-center text-neutral-600 font-mono text-xs">
            [3D Canvas Fallback Mode Active]
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Animated3DScene scrollProgress={scrollProgress} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};
