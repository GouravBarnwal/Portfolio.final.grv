import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface LazyCanvasProps extends React.ComponentProps<typeof Canvas> {
  children: React.ReactNode;
}

const LazyCanvas: React.FC<LazyCanvasProps> = ({ children, ...props }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasMounted) {
            setIsVisible(true);
            setHasMounted(true);
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, [hasMounted]);

  // Don't load WebGL on mobile to prevent context loss
  if (isMobile) {
    return <div ref={canvasRef} className="w-full h-full bg-black"></div>;
  }

  return (
    <div ref={canvasRef} className="w-full h-full bg-black">
      {isVisible && (
        <Canvas
          {...props}
          onCreated={(state) => {
            // WebGL context-loss recovery
            if (state.gl && state.gl.domElement) {
              state.gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
              });
            }
            // Call any existing onCreated prop if provided
            if (props.onCreated) {
              props.onCreated(state);
            }
          }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
};

export default LazyCanvas;
