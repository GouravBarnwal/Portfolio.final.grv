import { Github, Linkedin, Mail, MapPin, Check, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState, useRef, Suspense, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Typewriter hook
function useTypewriter(lines: string[][], speed = 40, lineDelay = 2000) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLineComplete, setIsLineComplete] = useState(false);

  useEffect(() => {
    const currentLineText = lines[currentLine];
    const currentWordText = currentLineText[currentWord];
    
    if (!isDeleting && display.length < currentWordText.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplay(currentWordText.substring(0, display.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && display.length === currentWordText.length) {
      // Word complete, wait then start deleting
      if (currentWord < currentLineText.length - 1) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, lineDelay);
        return () => clearTimeout(timeout);
      } else {
        // Last word in line, wait longer before going to next line
        if (!isLineComplete) {
          const timeout = setTimeout(() => {
            setIsLineComplete(true);
            setIsDeleting(true);
          }, lineDelay * 2);
          return () => clearTimeout(timeout);
        }
      }
    } else if (isDeleting && display.length > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplay(display.substring(0, display.length - 1));
      }, speed / 2);
      return () => clearTimeout(timeout);
    } else if (isDeleting && display.length === 0) {
      // Finished deleting, move to next word or line
      setIsDeleting(false);
      if (isLineComplete) {
        // Move to next line
        setCurrentLine((currentLine + 1) % lines.length);
        setCurrentWord(0);
        setIsLineComplete(false);
      } else {
        // Move to next word in line
        setCurrentWord((currentWord + 1) % currentLineText.length);
      }
    }
  }, [display, currentLine, currentWord, isDeleting, isLineComplete, lines, speed, lineDelay]);

  return display;
}

// 3D Scene Components
function ApproachingDot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState(() => ({
    x: (Math.random() - 0.5) * 80,
    y: (Math.random() - 0.5) * 60,
    z: -50
  }));
  
  useFrame(() => {
    if (meshRef.current) {
      // Move dot towards viewer (approaching effect)
      setPosition(prev => ({
        ...prev,
        z: prev.z + 0.8
      }));
      
      // Reset when too close
      if (position.z > 10) {
        setPosition({
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 60,
          z: -50
        });
      }
    }
  });
  
  return (
    <mesh ref={meshRef} position={[position.x, position.y, position.z]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  );
}

function ApproachingDots() {
  const dots = useMemo(() => Array.from({ length: 30 }, (_, i) => (
    <ApproachingDot key={i} />
  )), []);
  
  return <>{dots}</>;
}

function GalaxyStars() {
  const starsData = useMemo(() => {
    const starsCount = 5000; // Reduced for mobile performance
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);
    const sizes = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 150;
      positions[i3 + 1] = (Math.random() - 0.5) * 150;
      positions[i3 + 2] = (Math.random() - 0.5) * 150;
      
      const starType = Math.random();
      const brightness = 0.6 + Math.random() * 0.4; // Much higher base brightness
      
      if (starType < 0.7) {
        colors[i3] = brightness;
        colors[i3 + 1] = brightness;
        colors[i3 + 2] = brightness;
      } else if (starType < 0.85) {
        colors[i3] = brightness;
        colors[i3 + 1] = brightness * 0.95;
        colors[i3 + 2] = brightness * 0.85;
      } else {
        colors[i3] = brightness * 0.85;
        colors[i3 + 1] = brightness * 0.95;
        colors[i3 + 2] = brightness;
      }
      
      sizes[i] = Math.random() * 0.1 + 0.05; // Smaller star sizes for mobile
    }
    
    return { positions, colors, sizes };
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const starsCount = 5000; // Reduced for mobile performance
  
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the entire star field
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starsCount}
          array={starsData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starsCount}
          array={starsData.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={starsCount}
          array={starsData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        sizeAttenuation 
        transparent 
        vertexColors
      />
    </points>
  );
}

function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Dark background matching page theme */}
      <color attach="background" args={['#0f1014']} />
      
      {/* Minimal ambient lighting */}
      <ambientLight intensity={0.02} />
      
      {/* Dense galaxy stars background */}
      <GalaxyStars />
      
      {/* Approaching dots */}
      <ApproachingDots />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={isMobile}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
    </>
  );
}

const Hero = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const subtitle = useTypewriter([
    ['Full Stack Developer'],
    ['AI/ML Engineer']
  ]);

  return (
    <section id="home" className="section-padding pt-24 lg:pt-28 xl:pt-32 relative overflow-hidden bg-gradient-to-br from-[hsl(235_16%_10%)] to-[hsl(235_20%_6%)]">
      {/* 3D Scene Background */}
      <div className="hero-canvas-bg absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Removed gradient overlay for pure black background */}
      <div className="container-custom relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 xl:gap-16 2xl:gap-24 items-center min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] animate-fade-in">
          {/* Content */}
          <div className="space-y-8 xl:space-y-10 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4 xl:space-y-6">
              <p className="text-lg md:text-xl xl:text-2xl text-muted-foreground">Hi, I am</p>
              <h1 className="heading-primary animated-gradient-text drop-shadow-lg">
                Gourav Barnwal
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium animated-gradient-text min-h-[2.5rem] lg:min-h-[3rem] xl:min-h-[4rem] drop-shadow-lg">
                {subtitle}
              </h2>
            </div>

            {/* Hero Image — mobile only (shown between title and bio) */}
            <div className="flex-shrink-0 relative mx-auto lg:hidden">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border-4 border-white/20 backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center bg-black/20">
                <img
                  src="/imagesmine/Grv-prof-img.png"
                  alt="Gourav Barnwal"
                  className="w-full h-full object-contain scale-110 hover:scale-125 transition-transform duration-500 ease-out"
                />
              </div>
            </div>

            <p className="text-body max-w-none mx-auto lg:mx-0">
Final-year B.Tech Computer Science student at Government Engineering College, Ramgarh, passionate about building practical, real-world software solutions. Experienced in full-stack development and machine learning, with hands-on project and internship exposure in developing scalable applications and data-driven systems.            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 xl:gap-6 justify-center lg:justify-start">
              <div className="relative">
                <Button 
                  className="btn-primary shadow-orange-glow hover:shadow-[0_0_32px_hsl(265_90%_60%/0.7)] 
                    transition-all duration-300 relative overflow-hidden 
                    hover:scale-105 active:scale-95
                    hover:animate-[seesaw_1s_ease-in-out_infinite]"
                  onClick={() => scrollToSection('projects')}
                >
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
              <Button 
                variant="outline"
                className="px-6 py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 text-base lg:text-lg xl:text-xl border-2 border-primary text-primary hover:bg-primary/10 hover:scale-105 active:scale-95 transition-transform duration-300"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 xl:gap-5 pt-4 justify-center lg:justify-start animate-hero-float">
              <a 
                href="https://github.com/GouravBarnwal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 lg:p-4 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade"
              >
                <Github className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
              </a>
              <a 
                href="https://linkedin.com/in/grv1404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 lg:p-4 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-100"
              >
                <Linkedin className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
              </a>
              <a 
                href="https://www.instagram.com/grv.b_1419"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 lg:p-4 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-150"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-foreground" />
              </a>
              <div className="relative group">
                <button 
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await navigator.clipboard.writeText('barnwalgourav547@gmail.com');
                      setShowTooltip(true);
                      setTimeout(() => setShowTooltip(false), 2000);
                    } catch (err) {
                      // Fallback for browsers that don't support clipboard API
                      const textArea = document.createElement('textarea');
                      textArea.value = 'barnwalgourav547@gmail.com';
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textArea);
                      setShowTooltip(true);
                      setTimeout(() => setShowTooltip(false), 2000);
                    }
                  }}
                  className="p-3 lg:p-4 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-200 relative"
                  aria-label={showTooltip ? 'Email copied!' : 'Copy email to clipboard'}
                >
                  {showTooltip ? (
                    <Check className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-green-500" />
                  ) : (
                    <Mail className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-foreground" />
                  )}
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs lg:text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {showTooltip ? 'Copied!' : 'Click to copy email'}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground text-base lg:text-lg xl:text-xl justify-center lg:justify-start">
              <MapPin className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
              <span>Dhanbad, Jharkhand, India- 828111</span>
            </div>
          </div>

          {/* Hero Image — desktop */}
          <div className="hidden lg:flex justify-center xl:justify-end items-center order-1 lg:order-2">
            <div className="relative w-[26rem] h-[26rem] xl:w-[34rem] xl:h-[34rem] 2xl:w-[42rem] 2xl:h-[42rem] rounded-full border-4 xl:border-[6px] border-white/20 backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center bg-black/20">
              <img
                src="/imagesmine/Grv-prof-img.png"
                alt="Gourav Barnwal"
                className="w-full h-full object-contain scale-110 hover:scale-125 transition-transform duration-500 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
