import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 30000;

export default function ParticleSystem({ mode, density, speed, theme }) {
  const pointsRef = useRef();
  const { mouse, viewport } = useThree();

  // Determine actual particle count based on density
  const particleCount = useMemo(() => {
    return Math.floor(5000 + (density / 100) * 25000);
  }, [density]);

  // Generate buffer arrays only once
  const [positions, targetPositions, colors, phases] = useMemo(() => {
    const pos = new Float32Array(MAX_PARTICLES * 3);
    const target = new Float32Array(MAX_PARTICLES * 3);
    const col = new Float32Array(MAX_PARTICLES * 3);
    const phs = new Float32Array(MAX_PARTICLES);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      // Initial positions scattered around
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      target[i * 3] = pos[i * 3];
      target[i * 3 + 1] = pos[i * 3 + 1];
      target[i * 3 + 2] = pos[i * 3 + 2];

      col[i * 3] = 1; col[i * 3 + 1] = 1; col[i * 3 + 2] = 1;
      phs[i] = Math.random() * Math.PI * 2; // Phase for organic motion
    }
    return [pos, target, col, phs];
  }, []);

  const colorMap = {
    cyan: new THREE.Color('#22d3ee'),
    blue: new THREE.Color('#3b82f6'),
    violet: new THREE.Color('#8b5cf6')
  };

  // Update targets when mode or theme changes
  useEffect(() => {
    const baseColor = colorMap[theme] || colorMap.cyan;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      let tx, ty, tz;

      if (mode === 'grid') {
        const spacing = 0.5;
        const size = Math.ceil(Math.pow(MAX_PARTICLES, 1/3));
        const x = i % size;
        const y = Math.floor(i / size) % size;
        const z = Math.floor(i / (size * size));
        tx = (x - size/2) * spacing;
        ty = (y - size/2) * spacing;
        tz = (z - size/2) * spacing;
      } else if (mode === 'sphere') {
        const phi = Math.acos( -1 + ( 2 * i ) / MAX_PARTICLES );
        const theta = Math.sqrt( MAX_PARTICLES * Math.PI ) * phi;
        const r = 6 + Math.random() * 0.5;
        tx = r * Math.cos(theta) * Math.sin(phi);
        ty = r * Math.sin(theta) * Math.sin(phi);
        tz = r * Math.cos(phi);
      } else {
        // Neural
        const seed = i * 1337.0;
        const r = 4 * Math.sin(seed);
        const theta = seed * 1.5;
        tx = r * Math.cos(theta) * 12;
        ty = r * Math.sin(theta) * 12;
        tz = (Math.sin(seed * 3.1) - 0.5) * 8;
      }

      targetPositions[i * 3] = tx;
      targetPositions[i * 3 + 1] = ty;
      targetPositions[i * 3 + 2] = tz;

      // Color variance
      const colorVariance = Math.random() * 0.2;
      colors[i * 3] = baseColor.r + colorVariance;
      colors[i * 3 + 1] = baseColor.g + colorVariance;
      colors[i * 3 + 2] = baseColor.b + colorVariance;
    }
    
    if (pointsRef.current) {
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [mode, theme]);

  const lastMouse = useRef({ x: 0, y: 0 });
  const dynamicSpeed = useRef(0);
  const rotationRef = useRef(0);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const geom = pointsRef.current.geometry;
    const posAttribute = geom.attributes.position;
    
    // Map mouse position to world coordinates roughly
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    // Calculate mouse velocity
    const dxMouse = mouseX - lastMouse.current.x;
    const dyMouse = mouseY - lastMouse.current.y;
    const velocity = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    
    lastMouse.current.x = mouseX;
    lastMouse.current.y = mouseY;

    // Boost dynamic speed when mouse moves fast
    if (velocity > 0.01) {
      dynamicSpeed.current += velocity * 0.6;
    }
    // Cap the dynamic speed to prevent chaos
    dynamicSpeed.current = Math.min(dynamicSpeed.current, 10.0);
    // Smooth decay back down to 0 when mouse stops
    dynamicSpeed.current += (0 - dynamicSpeed.current) * 0.02;
    
    // Base speed is slightly faster now for calm floating
    const baseSpd = (speed / 100) * 0.8;
    const spd = baseSpd + dynamicSpeed.current;
    
    const time = state.clock.elapsedTime;

    // Use loop to interpolate active particles
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      // Target seeking with organic motion
      let tx = targetPositions[idx] + Math.sin(time * baseSpd + phases[i]) * 0.5;
      let ty = targetPositions[idx + 1] + Math.cos(time * baseSpd + phases[i]) * 0.5;
      let tz = targetPositions[idx + 2];

      // Mouse gravity
      const dx = posAttribute.array[idx] - mouseX;
      const dy = posAttribute.array[idx + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 5) {
        // Pull particles toward the cursor stronger if moving fast
        const force = (5 - dist) / 5;
        const pull = 1.5 + dynamicSpeed.current * 0.5;
        tx -= dx * force * pull;
        ty -= dy * force * pull;
      }

      // Interpolation strength increases when mouse is fast so they keep up
      const lerpFactor = 0.02 + Math.min(dynamicSpeed.current * 0.02, 0.15);

      // Interpolate position
      posAttribute.array[idx] += (tx - posAttribute.array[idx]) * lerpFactor;
      posAttribute.array[idx + 1] += (ty - posAttribute.array[idx + 1]) * lerpFactor;
      posAttribute.array[idx + 2] += (tz - posAttribute.array[idx + 2]) * lerpFactor;
    }

    // Hide unused particles by moving them far away
    for(let i = particleCount; i < MAX_PARTICLES; i++) {
        const idx = i * 3;
        posAttribute.array[idx] = 9999;
    }
    
    posAttribute.needsUpdate = true;
    
    // Rotate entire system slowly, speed up slightly on fast mouse
    rotationRef.current += 0.0003 + (dynamicSpeed.current * 0.0005);
    pointsRef.current.rotation.y = rotationRef.current + mouse.x * 0.1;
    pointsRef.current.rotation.x = mouse.y * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={MAX_PARTICLES}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={MAX_PARTICLES}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
