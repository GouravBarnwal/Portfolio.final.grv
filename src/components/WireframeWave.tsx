import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WireframeWaveProps {
  color?: string;
  wireframeColor?: string;
  mobileSegments?: number;
  desktopSegments?: number;
}

const WireframeWave: React.FC<WireframeWaveProps> = ({
  color = '#000000',
  wireframeColor = '#3B82F6',
  mobileSegments = 34,
  desktopSegments = 60,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const segments = isMobile ? mobileSegments : desktopSegments;

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, segments, segments);
    
    // Add per-vertex colors for gradient effect
    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = geo.attributes.position.getX(i);
      const y = geo.attributes.position.getY(i);
      
      // Create purple-to-cyan gradient based on position
      const t = (x + 10) / 20; // Normalize from 0 to 1
      const purple = new THREE.Color('#8B5CF6');
      const cyan = new THREE.Color('#06B6D4');
      const color = purple.clone().lerp(cyan, t);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [segments]);

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Increased wave amplitude for more visible motion
      const wave1 = Math.sin(x * 0.5 + time * 0.5) * 0.4;
      const wave2 = Math.cos(y * 0.3 + time * 0.3) * 0.3;
      const wave3 = Math.sin((x + y) * 0.2 + time * 0.4) * 0.2;
      
      positions.setZ(i, wave1 + wave2 + wave3);
    }
    
    positions.needsUpdate = true;
    
    // Slow rotation
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
    }
    if (glowMeshRef.current) {
      glowMeshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={[color]} />
      {/* Glow halo mesh - slightly scaled down */}
      <mesh 
        ref={glowMeshRef} 
        geometry={geometry} 
        material={glowMaterial} 
        rotation={[-Math.PI / 2.5, 0, 0]}
        scale={[0.98, 0.98, 0.98]}
      />
      {/* Main mesh */}
      <mesh 
        ref={meshRef} 
        geometry={geometry} 
        material={material} 
        rotation={[-Math.PI / 2.5, 0, 0]} 
      />
    </>
  );
};

export default WireframeWave;
