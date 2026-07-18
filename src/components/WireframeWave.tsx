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
  mobileSegments = 30,
  desktopSegments = 50,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
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
    return geo;
  }, [segments]);

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: wireframeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
  }, [wireframeColor]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Gentle wave animation
        const wave1 = Math.sin(x * 0.5 + time * 0.5) * 0.3;
        const wave2 = Math.cos(y * 0.3 + time * 0.3) * 0.2;
        const wave3 = Math.sin((x + y) * 0.2 + time * 0.4) * 0.15;
        
        positions.setZ(i, wave1 + wave2 + wave3);
      }
      
      positions.needsUpdate = true;
      
      // Slow rotation
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={[color]} />
      <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 2.5, 0, 0]} />
    </>
  );
};

export default WireframeWave;
