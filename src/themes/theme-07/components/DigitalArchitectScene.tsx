import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DeviceTier } from '../../../core/device/device-tier';
import { theme07Tokens } from '../theme07Tokens';

interface SceneContentProps {
  tier: DeviceTier;
  scrollProgress: number;
}

const SceneContent: React.FC<SceneContentProps> = ({ tier, scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const wireframeRingRef = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null);

  const config = theme07Tokens.tiers[tier] || theme07Tokens.tiers.MEDIUM;
  const count = config.particleCount;

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorBlue = new THREE.Color(theme07Tokens.colors.electricBlue);
    const colorAmber = new THREE.Color(theme07Tokens.colors.warmAmber);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const mixedColor = Math.random() > 0.4 ? colorBlue : colorAmber;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    if (particlesRef.current) {
      particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05 + scrollProgress * Math.PI * 0.5;
      groupRef.current.position.y = -scrollProgress * 2;
    }

    if (wireframeRingRef.current) {
      wireframeRingRef.current.rotation.x = time * 0.2;
      wireframeRingRef.current.rotation.z = time * 0.15;
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.3;
      cubeRef.current.rotation.y = time * 0.4;
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.003;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting Setup: Electric Blue Rim Light + Warm Amber Key Light */}
      <ambientLight intensity={0.4} color="#0D1724" />
      <pointLight position={[-15, 12, 10]} intensity={1.8} color={theme07Tokens.colors.electricBlue} />
      <pointLight position={[15, -10, -8]} intensity={1.5} color={theme07Tokens.colors.warmAmber} />
      <spotLight position={[0, 20, 10]} intensity={1.2} color={theme07Tokens.colors.softCyan} angle={0.6} />

      {/* Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={new Float32Array(count * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Orbiting Wireframe Rings */}
      <mesh ref={wireframeRingRef} position={[6, 2, -5]}>
        <torusGeometry args={[3, 0.04, 16, 64]} />
        <meshBasicMaterial color={theme07Tokens.colors.electricBlue} wireframe transparent opacity={0.3} />
      </mesh>

      <mesh ref={cubeRef} position={[-8, -4, -6]}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshBasicMaterial color={theme07Tokens.colors.warmAmber} wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

interface DigitalArchitectSceneProps {
  tier: DeviceTier;
  scrollProgress: number;
}

export const DigitalArchitectScene: React.FC<DigitalArchitectSceneProps> = ({ tier, scrollProgress }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: tier !== 'LOW', powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[theme07Tokens.colors.bg]} />
        <fog attach="fog" args={[theme07Tokens.colors.bg, 10, 35]} />
        <SceneContent tier={tier} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
