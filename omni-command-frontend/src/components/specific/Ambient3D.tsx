import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial 
          color="#4D8EFF"
          emissive="#4D8EFF"
          emissiveIntensity={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

export const Ambient3D: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-30 pointer-events-none z-0" style={{ mixBlendMode: 'screen' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#4D8EFF" />
        <AnimatedShape />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
