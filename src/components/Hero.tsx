import { Github, Linkedin, Mail, MapPin, Check, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    ['AIML Learner']
  ]);

  return (
    <section id="home" className="section-padding pt-24 relative bg-gradient-hero">
      {/* Animated background shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] z-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob1" style={{ left: '-10%', top: '10%' }} />
        <div className="absolute w-72 h-72 bg-accent/20 rounded-full blur-2xl animate-blob2" style={{ right: '-8%', top: '30%' }} />
        <div className="absolute w-60 h-60 bg-primary/20 rounded-full blur-2xl animate-blob3" style={{ left: '30%', bottom: '-10%' }} />
      </div>
      <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
          {/* Content */}
          <div className="space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">Hi, I am</p>
              <h1 className="heading-primary animated-gradient-text">
                Gourav Barnwal
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium animated-gradient-text min-h-[2.5rem]">
                {subtitle}
              </h2>
            </div>

            {/* Hero Image below subtitle */}
            <div className="flex-shrink-0 relative mx-auto mt-8">
              <img
                src="/imagesmine/WhatsApp_Image_2025-07-21_at_14.15.15_a43d61ad-removebg-preview.png"
                alt="Hero Visual"
                className="w-72 h-auto object-contain animate-hero-float"
                style={{ maxHeight: 350 }}
              />
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto md:mx-0">
              Full-stack developer skilled in React.js, FastAPI, Flask, Firebase, and PostgreSQL, with experience building scalable web applications and deploying ML models using Python, Streamlit, and Scikit-learn. Strong focus on clean architecture, UI/UX, data-driven development, and end-to-end product delivery. Passionate about AI, automation, and building high-impact applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <div className="relative">
                <Button 
                  className="btn-primary px-8 py-3 shadow-orange-glow hover:shadow-[0_0_32px_hsl(265_90%_60%/0.7)] 
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
                className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary/10 hover:scale-105 active:scale-95 transition-transform duration-300"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 justify-center md:justify-start animate-hero-float">
              <a 
                href="https://github.com/GouravBarnwal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/grv1404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-100"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/grv.b_1419"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-150"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-foreground" />
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
                  className="p-3 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-200 relative"
                  aria-label={showTooltip ? 'Email copied!' : 'Copy email to clipboard'}
                >
                  {showTooltip ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <Mail size={20} className="text-foreground" />
                  )}
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {showTooltip ? 'Copied!' : 'Click to copy email'}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground justify-center md:justify-start">
              <MapPin size={16} />
              <span>Dhanbad, Jharkhand, India- 828111</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;