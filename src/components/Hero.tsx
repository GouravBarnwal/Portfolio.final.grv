import { Github, Linkedin, Mail, MapPin, Check, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import LazyCanvas from '@/components/LazyCanvas';
import WireframeWave from '@/components/WireframeWave';

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

function Scene3D() {
  return (
    <>
      <WireframeWave />
    </>
  );
}

const HERO_BIO =
  'Final-year B.Tech Computer Science student at Government Engineering College, Ramgarh, with hands-on experience conducting computer vision and AI research at a DRDO government lab, building production backend systems, and developing full-stack applications with product teams. Skilled across computer vision pipelines, model benchmarking, and deployment — as well as backend engineering, REST API design, and full-stack development with FastAPI, PostgreSQL, and React.';

const Hero = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const subtitle = useTypewriter([
    ['Computer Vision Engineer'],
    ['Machine Learning Engineer'],
    ['Backend Developer']
  ]);

  return (
    <section id="home" className="py-8 lg:py-24 xl:py-28 pt-28 lg:pt-28 xl:pt-32 relative bg-black overflow-hidden mobile-fallback-bg">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <LazyCanvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </LazyCanvas>
      </div>
      
      {/* Removed gradient overlay for pure black background */}
      <div className="container-custom relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-3 xl:gap-16 2xl:gap-24 items-start lg:items-center min-h-0 lg:min-h-[calc(100vh-6rem)] animate-fade-in">
          {/* Content */}
          <div className="space-y-3 xl:space-y-10 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-2 xl:space-y-4 flex flex-col items-center lg:items-start">
              <p className="text-base md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground tracking-wide">
                Hi, my name is
              </p>
              <p className="hero-name-text whitespace-nowrap">Gourav Barnwal</p>
              <p className="text-base md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground tracking-wide">
                and I am a
              </p>
              <div className="hero-role-shell pt-1">
                <h1 className="hero-role-heading">
                  <span className="hero-role-text">{subtitle}</span>
                  <span className="hero-role-cursor" aria-hidden="true">|</span>
                </h1>
                <div className="hero-role-accent" aria-hidden="true" />
              </div>
            </div>

            {/* Hero Image and Bio — mobile */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 lg:hidden">
              <div className="flex-shrink-0 relative self-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white/20 backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center bg-black/20">
                  <img
                    src="/imagesmine/Grv-prof-img.png"
                    alt="Gourav Barnwal"
                    className="w-full h-full object-contain scale-110 hover:scale-125 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
              <Card className="card-neon border-primary/30 flex-1 relative z-10 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-5">
                  <p className="text-body text-xs sm:text-sm md:text-base text-center sm:text-left">
                    {HERO_BIO}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Bio — desktop */}
            <Card className="hidden lg:block card-neon border-primary/30 relative z-10 backdrop-blur-sm">
              <CardContent className="p-6 xl:p-8">
                <p className="text-body lg:text-lg xl:text-xl 2xl:text-2xl text-left">
                  {HERO_BIO}
                </p>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 xl:gap-6 justify-center lg:justify-start">
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
                className="px-4 py-2 lg:px-8 lg:py-4 xl:px-10 xl:py-5 text-sm lg:text-lg xl:text-xl border-2 border-primary text-primary hover:bg-primary/10 hover:scale-105 active:scale-95 transition-transform duration-300"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 xl:gap-5 pt-2 justify-center lg:justify-start animate-hero-float">
              <a 
                href="https://github.com/GouravBarnwal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 lg:p-4 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade"
              >
                <Github className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
              </a>
              <a 
                href="https://linkedin.com/in/grv1404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 lg:p-4 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-100"
              >
                <Linkedin className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
              </a>
              <a 
                href="https://www.instagram.com/grv_143_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 lg:p-4 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-150"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-foreground" />
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
              <span>Bengaluru, Karnataka, India - 560076</span>
            </div>
          </div>

          {/* Hero Image — desktop */}
          <div className="hidden lg:flex justify-center xl:justify-end items-center order-1 lg:order-2">
            <div className="relative w-[22rem] h-[22rem] xl:w-[28rem] xl:h-[28rem] 2xl:w-[34rem] 2xl:h-[34rem] rounded-full border-4 xl:border-[6px] border-white/20 backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center bg-black/20">
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
