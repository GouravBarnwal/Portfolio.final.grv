import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from "framer-motion";
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Scene Components (same as Hero)
function ApproachingDot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = React.useState(() => ({
    x: (Math.random() - 0.5) * 80,
    y: (Math.random() - 0.5) * 60,
    z: -50
  }));
  
  useFrame(() => {
    if (meshRef.current) {
      setPosition(prev => ({
        ...prev,
        z: prev.z + 0.8
      }));
      
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
  const dots = Array.from({ length: 50 }, (_, i) => (
    <ApproachingDot key={i} />
  ));
  
  return <>{dots}</>;
}

function GalaxyStars() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const starsCount = 5000;
  const positions = new Float32Array(starsCount * 3);
  const colors = new Float32Array(starsCount * 3);
  const sizes = new Float32Array(starsCount);
  
  for (let i = 0; i < starsCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 150;
    positions[i3 + 1] = (Math.random() - 0.5) * 150;
    positions[i3 + 2] = (Math.random() - 0.5) * 150;
    
    const starType = Math.random();
    const brightness = 0.2 + Math.random() * 0.8;
    
    if (starType < 0.7) {
      colors[i3] = brightness;
      colors[i3 + 1] = brightness;
      colors[i3 + 2] = brightness;
    } else if (starType < 0.85) {
      colors[i3] = brightness;
      colors[i3 + 1] = brightness * 0.9;
      colors[i3 + 2] = brightness * 0.7;
    } else {
      colors[i3] = brightness * 0.7;
      colors[i3 + 1] = brightness * 0.8;
      colors[i3 + 2] = brightness;
    }
    
    sizes[i] = Math.random() * 0.1 + 0.05;
  }
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starsCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starsCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={starsCount}
          array={sizes}
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
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.02} />
      <GalaxyStars />
      <ApproachingDots />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.05}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "barnwalgourav547@gmail.com",
      link: "mailto:barnwalgourav547@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8809210035",
      link: "tel:+918809210035"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhanbad, Jharkhand - 828111",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      username: "GouravBarnwal",
      link: "https://github.com/GouravBarnwal"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      username: "grv1404",
      link: "https://linkedin.com/in/grv1404"
    },
    {
      icon: Instagram,
      label: "Instagram",
      username: "grv.b_1419",
      link: "https://www.instagram.com/grv.b_1419"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-padding bg-black overflow-hidden relative">
      {/* 3D Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Hazy overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-5" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="heading-secondary mb-4 drop-shadow-lg">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto drop-shadow-md">
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's build something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up delay-100">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Let's Connect</h3>
              <p className="text-muted-foreground">
                I'm always excited to discuss new opportunities, innovative projects, or just have a chat about technology and development.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${index * 120}ms` }}>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shadow-orange-glow animate-icon-bounce">
                    <info.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{info.label}</p>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group animate-social-fade" style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="card-elegant w-16 h-16 group-hover:shadow-orange-glow group-hover:scale-110 transition-all duration-300">
                      <CardContent className="p-0 flex items-center justify-center h-full">
                        <social.icon 
                          className="text-muted-foreground group-hover:text-primary transition-colors" 
                          size={20} 
                        />
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                {socialLinks.map((social, index) => (
                  <p key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100 + 300}ms` }}>
                    <span className="font-medium">{social.label}:</span> {social.username}
                  </p>
                ))}
              </div>
            </div>
            {/* Location Illustration */}
            <div className="mt-8 flex items-center gap-3 animate-fade-in delay-300">
              {/* <MapPin size={24} className="text-primary animate-icon-bounce" /> */}
              {/* <span className="text-lg font-medium text-primary">Dhanbad, Jharkhand, India - 828111</span> */}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Card className="card-elegant animate-slide-up delay-200">
              <CardContent className="p-6">
                <form action="https://formspree.io/f/mblkdwoj" method="POST" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Send me a message</h3>
                    <p className="text-muted-foreground text-sm">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="animate-fade-in">
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full animate-input-focus"
                      />
                    </div>

                    <div className="animate-fade-in delay-100">
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full animate-input-focus"
                      />
                    </div>

                    <div className="animate-fade-in delay-200">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or just say hello..."
                        rows={5}
                        className="w-full resize-none animate-input-focus"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="btn-primary w-full animate-bounce-in"
                  >
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;