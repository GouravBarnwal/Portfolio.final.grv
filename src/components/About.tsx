import { GraduationCap, MapPin, Calendar, Award, Sparkles, Users, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from "framer-motion";
import React, { useRef, Suspense, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

type SkillShapeType = 'octahedron' | 'box' | 'cylinder' | 'icosahedron' | 'torus' | 'sphere';

function SkillMeshGeometry({ shape }: { shape: SkillShapeType }) {
  switch (shape) {
    case 'octahedron':
      return <octahedronGeometry args={[0.55, 0]} />;
    case 'box':
      return <boxGeometry args={[0.7, 0.7, 0.7]} />;
    case 'cylinder':
      return <cylinderGeometry args={[0.45, 0.45, 0.9, 16]} />;
    case 'icosahedron':
      return <icosahedronGeometry args={[0.5, 0]} />;
    case 'torus':
      return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
    case 'sphere':
      return <sphereGeometry args={[0.5, 24, 24]} />;
  }
}

function MiniSkillMesh({ shape, color }: { shape: SkillShapeType; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 1.2;
      ref.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={ref}>
        <SkillMeshGeometry shape={shape} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.65}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

function SkillIcon3D({ shape, color }: { shape: SkillShapeType; color: string }) {
  return (
    <div className="skill-icon-3d w-11 h-11 xl:w-12 xl:h-12 rounded-xl overflow-hidden shrink-0">
      <Canvas
        camera={{ position: [0, 0, 2.4], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[2, 2, 3]} intensity={1.1} color={color} />
        <pointLight position={[-2, -1, 2]} intensity={0.4} color="#ffffff" />
        <MiniSkillMesh shape={shape} color={color} />
      </Canvas>
    </div>
  );
}

function FloatingSkillShape({
  position,
  shape,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  shape: SkillShapeType;
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.25 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.35 * speed;
    }
  });

  return (
    <Float speed={speed * 1.4} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh ref={ref} position={position} scale={scale}>
        <SkillMeshGeometry shape={shape} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          metalness={0.5}
          roughness={0.35}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

function SkillsBackdropScene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 6]} intensity={0.9} color="#a259ff" />
      <pointLight position={[-5, -2, 4]} intensity={0.6} color="#00e0ff" />
      <FloatingSkillShape position={[-4.5, 1.2, -2]} shape="icosahedron" color="#a259ff" scale={1.1} />
      <FloatingSkillShape position={[4.8, -0.8, -3]} shape="torus" color="#00e0ff" scale={1.3} speed={1.2} />
      <FloatingSkillShape position={[-2.5, -1.5, -1.5]} shape="box" color="#5f5fff" scale={0.9} />
      <FloatingSkillShape position={[2.8, 1.8, -2.5]} shape="octahedron" color="#c084fc" scale={1} speed={0.9} />
      <FloatingSkillShape position={[0, -2, -3.5]} shape="cylinder" color="#818cf8" scale={0.85} speed={1.1} />
      <FloatingSkillShape position={[-5.5, -0.5, -4]} shape="sphere" color="#22d3ee" scale={1.15} speed={0.8} />
    </>
  );
}

function SkillTiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [enableTilt, setEnableTilt] = useState(true);

  useEffect(() => {
    const check = () => setEnableTilt(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableTilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cardRef.current.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
    },
    [enableTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`skill-tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

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
  const dots = useMemo(() => Array.from({ length: 15 }, (_, i) => (
    <ApproachingDot key={i} />
  )), []);
  
  return <>{dots}</>;
}

function GalaxyStars() {
  const starsData = useMemo(() => {
    const starsCount = 1500; // Reduced for mobile performance
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
  const starsCount = 1500; // Reduced for mobile performance
  
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

const About = () => {
  const skillCategories = [
    { name: 'Languages', shape: 'octahedron' as SkillShapeType, color: '#a259ff', skills: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
    { name: 'Backend', shape: 'box' as SkillShapeType, color: '#5f5fff', skills: ['FastAPI', 'Node.js', 'REST APIs', 'JWT Authentication', 'System Design', 'Scalable API Architecture', 'CI/CD Pipelines'] },
    { name: 'Database', shape: 'cylinder' as SkillShapeType, color: '#00e0ff', skills: ['PostgreSQL', 'MongoDB', 'SQLAlchemy', 'Database Migrations'] },
    { name: 'ML / AI', shape: 'icosahedron' as SkillShapeType, color: '#c084fc', skills: ['Scikit-learn', 'Pandas', 'NumPy', 'LLM APIs', 'Model Deployment', 'MLOps', 'Inference Optimization', 'LLM Evaluation', 'Data Pipelines'] },
    { name: 'Front-end', shape: 'torus' as SkillShapeType, color: '#818cf8', skills: ['React', 'Tailwind CSS'] },
    { name: 'Tools & Cloud', shape: 'sphere' as SkillShapeType, color: '#22d3ee', skills: ['Git', 'Docker', 'AWS', 'GitHub Actions', 'Postman', 'Streamlit', 'Linux'] },
  ];

  const highlights = [
    { icon: Award, label: 'ISRO-IIRS Certified', detail: 'Geodata Processing using Python & ML' },
    { icon: Users, label: 'Google Student Ambassador', detail: 'Led 4 LLM events with 138+ attendees' },
    { icon: Sparkles, label: 'LLM Research', detail: 'Multimodal benchmarking paper under peer review' },
    { icon: Briefcase, label: 'Production Systems', detail: 'Backend systems serving 150+ active users' },
  ];

  const experiences = [
    {
      title: "AI Research Intern",
      company: "DRDO Young Scientist Laboratory (DYSL-AI)",
      duration: "03/2026 - Present",
      location: "Bengaluru, India",
      current: true,
      bullets: [
        "Architected a multimodal video understanding pipeline for event recognition and counting — contributing to an LLM benchmarking paper currently under peer review.",
        "Built a QA benchmark dataset with ground truth annotations to quantitatively measure LLM performance on video comprehension tasks.",
        "Conducted LLM evaluation and model benchmarking across Gemini and GPT-4 on video QA tasks — compared accuracy, reasoning quality, and failure modes.",
      ],
    },
    {
      title: "AI Engineer Intern",
      company: "PM Accelerator — TickerPulse",
      duration: "09/2025 - 12/2025",
      location: "Boston, Massachusetts, USA",
      current: false,
      bullets: [
        "Built TickerPulse, an AI-powered stock sentiment analysis and trend prediction platform using React, FastAPI, and PostgreSQL.",
        "Integrated frontend and backend for smooth API communication and real-time data flow.",
        "Designed and managed PostgreSQL databases, including schema setup and CRUD operations.",
      ],
    },
    {
      title: "Software Development Intern",
      company: "National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi",
      duration: "06/2025 - 07/2025",
      location: "Ranchi, India",
      current: false,
      bullets: [
        "Built a full-stack attendance automation system using React, Flask, and Firebase.",
        "Added OTP-based login, email alerts, and SBI Collect payment integration.",
        "Implemented role-based access with real-time updates.",
      ],
    },
  ];

  return (
    <section id="about" className="section-padding bg-black overflow-hidden relative">
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
        {/* Section header */}
        <div className="text-center mb-12 xl:mb-16">
          <h2 className="heading-secondary mb-4 drop-shadow-lg">About Me</h2>
          <div className="section-title-accent" />
          <p className="section-intro drop-shadow-md mt-6">
            Backend &amp; AI/ML Engineer building production systems, conducting LLM research, and shipping full-stack products
          </p>
        </div>

        {/* Highlight stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 mb-14 xl:mb-20">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="about-stat-card h-full">
                <div className="w-11 h-11 xl:w-12 xl:h-12 mx-auto mb-3 rounded-xl bg-primary/15 flex items-center justify-center shadow-orange-glow">
                  <item.icon className="w-5 h-5 xl:w-6 xl:h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm xl:text-base text-foreground">{item.label}</p>
                <p className="text-xs xl:text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 xl:mb-20"
        >
          <Card className="card-neon border-primary/30">
            <CardContent className="p-6 xl:p-10">
              <h3 className="subheading mb-5 text-accent-gradient">My Journey</h3>
              <div className="grid lg:grid-cols-2 gap-6 xl:gap-10">
                <p className="text-body">
                  Final-year CSE student at Government Engineering College, Ramgarh, with hands-on experience building production backend systems, conducting AI research at a DRDO government lab, and developing an AI-powered stock platform as part of a US-based product team.
                </p>
                <p className="text-body">
                  I contribute to a multimodal LLM benchmarking paper under peer review, with strong expertise in backend engineering, REST API design, and applied ML — from FastAPI microservices and PostgreSQL to LLM evaluation pipelines and model deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills grid with 3D backdrop */}
        <div className="mb-14 xl:mb-20 relative">
          <div className="skills-3d-panel relative rounded-3xl overflow-hidden border border-primary/15">
            {/* Floating 3D shapes behind skills */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 55 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 1.5]}
              >
                <Suspense fallback={null}>
                  <SkillsBackdropScene />
                </Suspense>
              </Canvas>
            </div>
            <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/75 via-black/55 to-primary/10 pointer-events-none" />

            <div className="relative z-10 p-6 md:p-8 xl:p-12">
              <div className="flex items-center gap-4 mb-8 xl:mb-10">
                <h3 className="subheading">Technical Skills</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ perspective: '900px' }}
                  >
                    <SkillTiltCard className="h-full">
                      <div className="skill-category-card skill-category-card-3d h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <SkillIcon3D shape={category.shape} color={category.color} />
                          <h4 className="font-semibold text-base xl:text-xl text-foreground">{category.name}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2 xl:gap-2.5" style={{ perspective: '600px' }}>
                          {category.skills.map((skill, skillIndex) => (
                            <span
                              key={skill}
                              className="skill-pill skill-pill-3d"
                              style={{
                                '--pill-color': category.color,
                                '--pill-delay': `${skillIndex * 50}ms`,
                              } as React.CSSProperties}
                            >
                              <span className="skill-pill-face">{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </SkillTiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience timeline */}
        <div className="mb-14 xl:mb-20">
          <div className="flex items-center gap-4 mb-8 xl:mb-10">
            <h3 className="subheading">Experience</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          <div className="relative space-y-6 xl:space-y-8">
            <div className="absolute left-[11px] xl:left-[15px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden sm:block" />
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative sm:pl-10 xl:pl-12"
              >
                <div className="absolute left-0 top-7 w-6 h-6 xl:w-7 xl:h-7 rounded-full border-2 border-primary bg-background hidden sm:flex items-center justify-center shadow-orange-glow">
                  <div className="w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full bg-primary" />
                </div>
                <Card className="card-elegant overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary/40" />
                  <CardContent className="p-6 xl:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-lg xl:text-2xl">{exp.title}</h4>
                          {exp.current && (
                            <span className="text-xs xl:text-sm font-medium px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-primary font-medium text-base xl:text-xl">{exp.company}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm xl:text-base text-muted-foreground lg:text-right">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary shrink-0" />
                          {exp.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 xl:space-y-3">
                      {exp.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-body text-sm xl:text-base 2xl:text-lg">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-8 xl:mb-10">
            <h3 className="subheading">Education</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          <Card className="card-elegant">
            <CardContent className="p-6 xl:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-5 xl:gap-8">
                <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0 shadow-orange-glow">
                  <GraduationCap className="text-primary w-7 h-7 xl:w-8 xl:h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-lg xl:text-2xl">Bachelor of Technology — Computer Science &amp; Engineering</h4>
                  <p className="text-primary font-medium text-base xl:text-xl mt-1">Government Engineering College, Ramgarh</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm xl:text-lg text-muted-foreground md:text-right">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    Dec 2022 – Aug 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border">
                    CGPA: <span className="text-primary font-semibold">7.5</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
