 'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, TorusKnot, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function PointerLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const x = (state.pointer.x * state.viewport.width) / 2;
      const y = (state.pointer.y * state.viewport.height) / 2;
      lightRef.current.position.x += (x - lightRef.current.position.x) * 0.1;
      lightRef.current.position.y += (y - lightRef.current.position.y) * 0.1;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      distance={8}
      intensity={3}
      color="#39ff14"
      position={[0, 0, 1]}
    />
  );
}

function InteractiveParticles() {
  const ref = useRef<THREE.Points>(null);
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  const particleCount = 200;
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [particleCount]);

  const originalPositions = useMemo(() => {
    const pos = geometry.attributes.position.array as Float32Array;
    return new Float32Array(pos);
  }, [geometry]);

  useFrame((state) => {
    if (!ref.current) return;

    mousePos.current.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
      0
    );

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3;
      const dx = mousePos.current.x - pos[ix];
      const dy = mousePos.current.y - pos[ix + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, (8 - dist) / 8);

      pos[ix] += (originalPositions[ix] - pos[ix]) * 0.02 + dx * force * 0.01;
      pos[ix + 1] += (originalPositions[ix + 1] - pos[ix + 1]) * 0.02 + dy * force * 0.01;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color="#00c9a7"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function ParticleConnections() {
  const ref = useRef<THREE.LineSegments>(null);
  const particleCount = 80;
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [particleCount]);

  useFrame((state) => {
    if (!ref.current) return;
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const connections: number[] = [];
    const maxDist = 4;

    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3;
      const dx = mouseX - pos[ix];
      const dy = mouseY - pos[ix + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const push = Math.max(0, (6 - dist) / 6);

      pos[ix] += dx * push * 0.02;
      pos[ix + 1] += dy * push * 0.02;

      for (let j = i + 1; j < particleCount; j++) {
        const jx = j * 3;
        const ddx = pos[ix] - pos[jx];
        const ddy = pos[ix + 1] - pos[jx + 1];
        if (Math.sqrt(ddx * ddx + ddy * ddy) < maxDist) {
          connections.push(pos[ix], pos[ix + 1], pos[ix + 2]);
          connections.push(pos[jx], pos[jx + 1], pos[jx + 2]);
        }
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    const newGeo = new THREE.BufferGeometry();
    newGeo.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3));
    ref.current.geometry.dispose();
    ref.current.geometry = newGeo;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#00c9a7" transparent opacity={0.15} />
    </lineSegments>
  );
}

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <TorusKnot ref={meshRef} args={[9, 1.5, 300, 20]}>
        <meshStandardMaterial
          color="#00c9a7"
          wireframe
          transparent
          opacity={0.25}
        />
      </TorusKnot>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="fixed inset-0 z-[-2] bg-[var(--color-bg)] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <fog attach="fog" args={['#0e0c0a', 15, 30]} />
        <ambientLight intensity={0.2} />

        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00c9a7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0e0c0a" />

        <PointerLight />

        <InteractiveParticles />
        <ParticleConnections />

        <AnimatedMesh />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-[#0e0c0a]/5" />
    </div>
  );
}
