'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  const orbs = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        -8 - Math.random() * 15,
      ] as [number, number, number],
      scale: 3 + Math.random() * 6,
      speed: 0.05 + Math.random() * 0.15,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    mousePos.current.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
      0
    );

    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      const baseX = orb.position[0] + Math.sin(state.clock.elapsedTime * orb.speed + orb.offset) * 4;
      const baseY = orb.position[1] + Math.cos(state.clock.elapsedTime * orb.speed * 0.7 + orb.offset) * 3;

      const dx = mousePos.current.x - child.position.x;
      const dy = mousePos.current.y - child.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const push = Math.max(0, (8 - dist) / 8);

      child.position.x = baseX + dx * push * 0.05;
      child.position.y = baseY + dy * push * 0.05;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.scale, 32, 32]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00c9a7' : '#39ff14'}
            transparent
            opacity={0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

function InteractiveParticles() {
  const ref = useRef<THREE.Points>(null);
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 250;
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = -5 - Math.random() * 15;
      speeds[i] = 0.01 + Math.random() * 0.03;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    (geo as any).userData = { speeds };
    return geo;
  }, []);

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
    const speeds = (ref.current.geometry as any).userData.speeds;

    for (let i = 0; i < 250; i++) {
      const ix = i * 3;
      const dx = mousePos.current.x - pos[ix];
      const dy = mousePos.current.y - pos[ix + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, (10 - dist) / 10);

      pos[ix] += (originalPositions[ix] - pos[ix]) * 0.015 + dx * force * 0.01;
      pos[ix + 1] += speeds[i] + (originalPositions[ix + 1] - pos[ix + 1]) * 0.015 + dy * force * 0.01;

      if (pos[ix + 1] > 25) pos[ix + 1] = -25;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color="#00c9a7"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function GridLines() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points: number[] = [];
    const divisions = 20;
    const size = 30;

    for (let i = 0; i <= divisions; i++) {
      const x = (i - divisions / 2) * (size / divisions) * 2;
      points.push(x, -size, -10, x, size, -10);
      points.push(-size, x, -10, size, x, -10);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#00c9a7" transparent opacity={0.03} />
    </lineSegments>
  );
}

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-[-3] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]}>
        <fog attach="fog" args={['#0e0c0a', 20, 45]} />
        <GridLines />
        <FloatingOrbs />
        <InteractiveParticles />
        <Stars radius={120} depth={60} count={2000} factor={3} saturation={0} fade speed={0.3} />
      </Canvas>
    </div>
  );
}
