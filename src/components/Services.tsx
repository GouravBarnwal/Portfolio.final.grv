import { Code, Globe, Server, Database, Brain, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from "framer-motion";
import React, { useRef, Suspense, useMemo } from 'react';
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

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Creating modern, responsive user interfaces with cutting-edge frontend technologies and design best practices.",
      features: [
        "Responsive website development (React, Tailwind, JavaScript)",
        "Landing page & portfolio website creation",
        "UI cloning and redesign",
        "Dashboard development (admin panels, analytics UI)"
      ]
    },
    {
      icon: Globe,
      title: "Full-Stack Web Development",
      description: "End-to-end web application development from frontend to backend, delivering complete scalable solutions.",
      features: [
        "End-to-end web application development",
        "REST API development (FastAPI / Node.js)",
        "Authentication systems (JWT, OTP login)",
        "Role-based access systems",
        "Real-time database integration (Firebase, PostgreSQL)",
        "Deployment (Render, Netlify)"
      ]
    },
    {
      icon: Server,
      title: "Backend & API Services",
      description: "Robust backend architecture design with secure APIs and optimized database management solutions.",
      features: [
        "Backend architecture design",
        "Database schema design & optimization",
        "API integration (third-party APIs)",
        "Payment gateway / email automation integration"
      ]
    },
    {
      icon: Brain,
      title: "AI / Machine Learning Solutions",
      description: "Developing intelligent ML models and data-driven solutions for real-world business challenges.",
      features: [
        "ML model development (classification, prediction)",
        "Data preprocessing & analysis (Pandas, NumPy)",
        "Model training & evaluation (Scikit-learn)",
        "Streamlit-based ML web apps",
        "Sentiment analysis systems",
        "Dataset cleaning & feature engineering"
      ]
    },
    {
      icon: GraduationCap,
      title: "Student / College Projects",
      description: "Comprehensive project guidance and development support for academic and final-year projects.",
      features: [
        "Final year project guidance",
        "ML-based academic projects",
        "Full-stack project development support"
      ]
    }
  ];

  return (
    <section id="services" className="section-padding bg-black overflow-hidden relative">
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
          <h2 className="heading-secondary mb-4 drop-shadow-lg">Specialized Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto drop-shadow-md">
            Expert development services spanning frontend, full-stack, backend, AI/ML solutions, and academic project support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-center items-stretch">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, type: 'spring', bounce: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className="h-full"
            >
              <Card className="card-elegant group relative overflow-visible animate-service-fade-in h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-orange-glow">
                <CardContent className="flex flex-col h-full p-6 space-y-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-orange-glow animate-icon-bounce mb-2">
                    <service.icon className="text-primary group-hover:scale-110 transition-transform duration-300" size={28} />
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">What's included:</h4>
                    <ul className="space-y-1 ml-0">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center animate-feature-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in delay-300">
          <Card className="card-elegant bg-gradient-subtle max-w-2xl mx-auto animate-bounce-in">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how I can help bring your ideas to life with modern web technologies and full-stack development solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact"
                  className="btn-primary px-8 py-3 rounded-lg text-center hover:bg-primary/90 transition-colors animate-bounce-in"
                >
                  Contact Me
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;