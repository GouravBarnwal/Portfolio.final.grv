import { Heart, Github, Linkedin, Mail, Check, MapPin } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('barnwalgourav547@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-custom py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Gourav Barnwal</h3>
            <p className="text-muted-foreground text-sm">
              Full Stack Developer passionate about creating innovative web solutions and modern applications with clean, scalable code.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold">Let's Connect</h4>
            <div className="flex gap-3">
              <a 
                href="https://github.com/GouravBarnwal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/grv1404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/grv.b_1419"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <div className="relative group">
                <button 
                  onClick={handleEmailClick}
                  className="p-2 bg-background rounded-lg hover:bg-primary/10 transition-colors"
                  aria-label={copied ? 'Email copied!' : 'Copy email to clipboard'}
                >
                  {copied ? <Check size={20} className="text-green-500" /> : <Mail size={20} />}
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {copied ? 'Copied!' : 'Click to copy email'}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Feel free to reach out for collaborations or just a friendly chat about technology!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            © {currentYear} Gourav Barnwal
          </p>
          <div className="text-muted-foreground text-sm">
            <div className="flex items-center gap-3 animate-fade-in delay-300">
              <MapPin size={20} className="text-primary animate-icon-bounce" />
              <span className="text-sm font-medium text-primary">Dhanbad, Jharkhand, India - 828111</span> 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;