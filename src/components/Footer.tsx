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
      <div className="container-custom py-8 xl:py-12">
        <div className="grid md:grid-cols-3 gap-8 xl:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-primary">Gourav Barnwal</h3>
            <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">
              Full Stack Developer passionate about creating innovative web solutions and modern applications with clean, scalable code.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base xl:text-lg 2xl:text-xl">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm xl:text-base 2xl:text-lg">
              <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base xl:text-lg 2xl:text-xl">Let's Connect</h4>
            <div className="flex gap-3 xl:gap-4">
              <a 
                href="https://github.com/GouravBarnwal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 xl:p-3 bg-background rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Github className="w-5 h-5 xl:w-6 xl:h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/grv1404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 xl:p-3 bg-background rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="w-5 h-5 xl:w-6 xl:h-6" />
              </a>
              <a 
                href="https://www.instagram.com/grv.b_1419"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 xl:p-3 bg-background rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 xl:w-6 xl:h-6" />
              </a>
              <div className="relative group">
                <button 
                  onClick={handleEmailClick}
                  className="p-2 xl:p-3 bg-background rounded-lg hover:bg-primary/10 transition-colors"
                  aria-label={copied ? 'Email copied!' : 'Copy email to clipboard'}
                >
                  {copied ? <Check className="w-5 h-5 xl:w-6 xl:h-6 text-green-500" /> : <Mail className="w-5 h-5 xl:w-6 xl:h-6" />}
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {copied ? 'Copied!' : 'Click to copy email'}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">
              Feel free to reach out for collaborations or just a friendly chat about technology!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 xl:mt-10 pt-6 xl:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg flex items-center gap-1">
            © {currentYear} Gourav Barnwal
          </p>
          <div className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">
            <div className="flex items-center gap-3 animate-fade-in delay-300">
              <MapPin className="w-5 h-5 xl:w-6 xl:h-6 text-primary animate-icon-bounce" />
              <span className="font-medium text-primary">Dhanbad, Jharkhand, India - 828111</span> 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;