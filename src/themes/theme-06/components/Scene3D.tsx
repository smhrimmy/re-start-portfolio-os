import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DeviceTier } from '../../../core/device/device-tier';
import { theme06Tokens } from '../theme06Tokens';

interface Scene3DProps {
  tier: DeviceTier;
}

export const Scene3D: React.FC<Scene3DProps> = ({ tier }) => {
  const sceneRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = theme06Tokens.threeJs.particleCount[tier] || 250;
  const shapeCount = theme06Tokens.threeJs.shapeCount[tier] || 5;

  useEffect(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    if (particlesRef.current) {
      particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [particleCount]);

  useFrame(() => {
    if (sceneRef.current) {
      sceneRef.current.rotation.x += 0.0001;
      sceneRef.current.rotation.y += 0.00015;
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.0015;
        if (positions[i * 3 + 1] > 15) {
          positions[i * 3 + 1] = -15;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.6} color="#FFFFFF" />
      <directionalLight position={[10, 20, 10]} intensity={0.8} color="#FFFFFF" />
      <pointLight position={[-15, 10, 5]} intensity={0.3} color="#0066FF" />
      <pointLight position={[5, -10, -15]} intensity={0.2} color="#00D4FF" />

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={new Float32Array(particleCount * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#0066FF" sizeAttenuation transparent opacity={0.4} />
      </points>

      {Array.from({ length: shapeCount }).map((_, i) => (
        <FloatingShape key={i} index={i} />
      ))}

      <fog attach="fog" args={['#FAFAF8', 5, 50]} />
    </group>
  );
};

const FloatingShape: React.FC<{ index: number }> = ({ index }) => {
  const shapeRef = useRef<THREE.Mesh>(null);
  const colors = ['#0066FF', '#00D4FF', '#D4AF37', '#FF6B35'];
  const color = colors[index % colors.length];

  useFrame(() => {
    if (shapeRef.current) {
      shapeRef.current.rotation.x += 0.0005 * (index % 2 ? 1 : -1);
      shapeRef.current.rotation.y += 0.0008 * (index % 3 ? 1 : -1);
      shapeRef.current.rotation.z += 0.0003;
    }
  });

  const geometry = index % 2 === 0 ? 'box' : 'sphere';

  return (
    <mesh
      ref={shapeRef}
      position={[
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ]}
      scale={0.5 + Math.random() * 0.5}
    >
      {geometry === 'box' ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <sphereGeometry args={[1, 32, 32]} />
      )}
      <meshPhysicalMaterial
        color={color}
        wireframe={false}
        transparent
        opacity={0.3}
        metalness={0.5}
        roughness={0.7}
      />
    </mesh>
  );
};
