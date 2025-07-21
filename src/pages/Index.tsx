import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Hero />
      </motion.div>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q 360 80 720 40 T 1440 40 V80 H0V40Z" fill="url(#divider-gradient1)"/>
          <defs>
            <linearGradient id="divider-gradient1" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a259ff"/>
              <stop offset="0.5" stopColor="#5f5fff"/>
              <stop offset="1" stopColor="#00e0ff"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <About />
      </motion.div>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q 360 0 720 40 T 1440 40 V80 H0V40Z" fill="url(#divider-gradient2)"/>
          <defs>
            <linearGradient id="divider-gradient2" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00e0ff"/>
              <stop offset="0.5" stopColor="#5f5fff"/>
              <stop offset="1" stopColor="#a259ff"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Projects />
      </motion.div>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q 360 80 720 40 T 1440 40 V80 H0V40Z" fill="url(#divider-gradient3)"/>
          <defs>
            <linearGradient id="divider-gradient3" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a259ff"/>
              <stop offset="0.5" stopColor="#00e0ff"/>
              <stop offset="1" stopColor="#5f5fff"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Services />
      </motion.div>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q 360 0 720 40 T 1440 40 V80 H0V40Z" fill="url(#divider-gradient4)"/>
          <defs>
            <linearGradient id="divider-gradient4" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5f5fff"/>
              <stop offset="0.5" stopColor="#a259ff"/>
              <stop offset="1" stopColor="#00e0ff"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Contact />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Index;
