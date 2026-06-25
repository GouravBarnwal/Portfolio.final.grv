import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Hide navbar when scrolling down past 100px
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsVisible(false);
      }
      // Show navbar when scrolling up
      else if (scrollTop < lastScrollTop) {
        setIsVisible(true);
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between lg:justify-start gap-4 lg:gap-8 h-16 lg:h-20 xl:h-24 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 lg:gap-4 cursor-pointer group flex-shrink-0">
            <img
              src="/imagesmine/43c8db34-22ca-4726-80fb-e95c80b7ed93.webp"
              alt="Logo"
              className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border-2 border-primary shadow-orange-glow group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300"
            />
            <span className="text-xl lg:text-2xl xl:text-3xl font-bold text-primary tracking-tight group-hover:text-accent transition-colors duration-300">
              Gourav's Portfolio
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-2 xl:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link rounded-lg transition-all duration-300 hover:bg-primary/10 active:scale-95 ${
                  activeSection === item.id ? 'active shadow-orange-glow' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Download CV Button */}
          <div className="hidden md:block flex-shrink-0">
            <a
              href="/imagesmine/Gourav-Barnwal-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Gourav-Barnwal-Resume.pdf"
            >
              <Button className="btn-accent shadow-orange-glow hover:scale-105 active:scale-95 transition-transform duration-300 px-8 py-4 text-lg lg:text-xl xl:text-2xl">
                Download CV
              </Button>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full border border-border shadow-orange-glow hover:bg-primary/10 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-medium animate-slide-in-down w-full">
            <div className="container-custom py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-surface hover:scale-105 active:scale-95"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-4 px-4">
                <a
                  href="/imagesmine/Gourav-Barnwal-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Gourav-Barnwal-Resume.pdf"
                  className="block w-full"
                >
                  <Button className="btn-accent w-full shadow-orange-glow hover:scale-105 active:scale-95 transition-transform duration-300 px-6 py-4 text-lg">
                    Download CV
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;