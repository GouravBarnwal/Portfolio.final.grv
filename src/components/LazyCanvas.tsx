import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface LazyCanvasProps extends React.ComponentProps<typeof Canvas> {
  children: React.ReactNode;
}

const LazyCanvas: React.FC<LazyCanvasProps> = ({ children, ...props }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

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

  return (
    <div ref={canvasRef} className="w-full h-full bg-black" style={{ backgroundColor: '#000000' }}>
      {isVisible && !webglFailed && (
        <Canvas
          {...props}
          onError={(error) => {
            console.error('WebGL error:', error);
            setWebglFailed(true);
          }}
          onCreated={(state) => {
            // WebGL context-loss recovery
            if (state.gl && state.gl.domElement) {
              const handleContextLost = (e: Event) => {
                e.preventDefault();
                setWebglFailed(true);
                setTimeout(() => setWebglFailed(false), 1000); // Attempt recovery after 1 second
              };
              
              const handleContextRestored = () => {
                setWebglFailed(false);
              };

              state.gl.domElement.addEventListener('webglcontextlost', handleContextLost);
              state.gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);
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
