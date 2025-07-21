import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImg from '/lovable-uploads/43c8db34-22ca-4726-80fb-e95c80b7ed93.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-lg animate-nav-fade-in">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src={profileImg}
              alt="Logo"
              className="w-10 h-10 rounded-full border-2 border-primary shadow-orange-glow group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300"
            />
            <span className="text-xl font-bold text-primary tracking-tight group-hover:text-accent transition-colors duration-300">
              Gourav Barnwal
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10 active:scale-95 ${activeSection === item.id ? 'active shadow-orange-glow' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Download CV Button */}
          <div className="hidden md:block">
            <a
              href="/lovable-uploads/Gourav_Barnwal_Developer.%20pdf.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="btn-accent shadow-orange-glow hover:scale-105 active:scale-95 transition-transform duration-300">
                Download CV
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full border border-border shadow-orange-glow hover:bg-primary/10 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-medium animate-slide-in-down">
            <div className="container-custom py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-surface hover:scale-105 active:scale-95 ${
                    activeSection === item.id ? 'text-primary font-medium shadow-orange-glow' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-4 px-4">
                <Button className="btn-accent w-full shadow-orange-glow hover:scale-105 active:scale-95 transition-transform duration-300">
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;