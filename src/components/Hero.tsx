import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

// Typewriter hook
function useTypewriter(words: string[], speed = 120, eraseSpeed = 60, delay = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (forward && subIndex < words[index].length) {
      const timeout = setTimeout(() => {
        setDisplay(words[index].slice(0, subIndex + 1));
        setSubIndex(subIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (forward && subIndex === words[index].length) {
      const timeout = setTimeout(() => setForward(false), delay);
      return () => clearTimeout(timeout);
    } else if (!forward && subIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplay(words[index].slice(0, subIndex - 1));
        setSubIndex(subIndex - 1);
      }, eraseSpeed);
      return () => clearTimeout(timeout);
    } else if (!forward && subIndex === 0) {
      setForward(true);
      setIndex((index + 1) % words.length);
    }
  }, [words, index, subIndex, forward, speed, eraseSpeed, delay]);

  return display;
}

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const subtitle = useTypewriter([
    'Full Stack Developer',
    'AIML Learner',
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

            <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto md:mx-0">
              Passionate developer specializing in full-stack web development, crafting seamless solutions with modern technologies. 
              Currently pursuing Computer Science Engineering while building tomorrow's web applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                className="btn-primary px-8 py-3 shadow-orange-glow hover:scale-105 active:scale-95 transition-transform duration-300"
                onClick={() => scrollToSection('projects')}
              >
                View Portfolio
              </Button>
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
                href="mailto:barnwalgourav547@gmail.com"
                className="p-3 bg-surface hover:bg-primary/10 rounded-lg transition-colors hover-float animate-social-fade delay-200"
              >
                <Mail size={20} />
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground justify-center md:justify-start">
              <MapPin size={16} />
              <span>Dhanbad, Jharkhand, India</span>
            </div>
          </div>
        </div>
        {/* Animated image on the right */}
        <div className="flex-shrink-0 relative mx-auto mt-8">
          <img
            src="/imagesmine/WhatsApp_Image_2025-07-21_at_14.15.15_a43d61ad-removebg-preview.png"
            alt="Hero Visual"
            className="w-72 h-auto object-contain animate-hero-float"
            style={{ maxHeight: 350 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;