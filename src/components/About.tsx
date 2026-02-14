import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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

const About = () => {
  const skills = {
    'Frontend': ['React.js','Next.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'REST APIs'],
    'Database': ['PostgreSQL', 'MongoDB', 'Firebase', 'SQL'],
    'AI/ML': ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'TensorFlow'],
    'Tools': ['Git', 'GitHub', 'VS Code', 'Jupyter','Docker','AWS','Figma']
  };

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Tickerpulse - AI Product Manager Accelerator",
      duration: "10/2025 - Present",
      location: "Boston, Massachusetts, USA",
      description: `• Integrated frontend and backend using React.js and FastAPI enabling smooth API communication.<br/>• Designed and managed PostgreSQL databases, including schema setup and CRUD operations.<br/>• Ensured reliable data flow across the React.js UI, FastAPI backend, and PostgreSQL database.`
    },
    {
      title: "AI/ML Intern - Classification of Fire Types in India",
      company: "AICTE × Edunet Foundation × Shell",
      duration: "07/2025 - 08/2025",
      location: "Remote",
      description: `• Analyzed MODIS fire data (2021–2023) to classify fire types (vegetation, static, etc.).<br/>• Performed EDA on class imbalance and spatial distribution.<br/>• Built & deployed an ML app using Python, Streamlit, Scikit-learn, Folium, Pandas.`
    },
    {
      title: "Software Development Intern",
      company: "National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi",
      duration: "06/2025 - 07/2025",
      location: "Ranchi - Hybrid",
      description: `• Built a full-stack app for attendance automation using React.js, Flask, Firebase.<br/>• Added OTP login, email alerts, SBI Collect integration.<br/>• Implemented role-based access with real-time updates.`
    }
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
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4 drop-shadow-lg">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto drop-shadow-md">
            A passionate developer with a strong foundation in full-stack development and modern web technologies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full min-w-0">
          {/* Personal Bio */}
          <div className="space-y-8 animate-slide-up w-full min-w-0">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
              I am a final-year B.Tech Computer Science student at Government Engineering College, Ramgarh, with a strong foundation in full-stack development. I have built scalable applications using React, FastAPI, and PostgreSQL, including an attendance automation system and a real-time stock sentiment tracker. My internship experience helped me understand production-level development, authentication systems, and real-time data processing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
               Over time, I expanded into AI and Machine Learning, working with Python and Scikit-learn to build data-driven solutions. I developed a MODIS-based fire classification model with 97.8% accuracy and gained hands-on experience handling large datasets. My journey reflects a combination of software engineering and AI/ML, focused on solving practical problems through technology.

              </p>
            </div>

            {/* Education */}
            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">Bachelor of Computer Science & Engineering</h4>
                    <p className="text-primary font-medium">Ramgarh Engineering College</p>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>Dec 2022 - Aug 2026</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1">
                          <GraduationCap size={16} className="text-primary mr-1" />
                          Final Year
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Experience</h3>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15, type: 'spring', bounce: 0.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <Card className="card-elegant">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h4 className="font-semibold text-lg">{exp.title}</h4>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} className="text-primary" />
                              {exp.duration}
                            </span>
                            <span className="hidden sm:inline-block">•</span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} className="text-primary" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: exp.description }} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-8 animate-slide-up w-full min-w-0">
            <h3 className="text-2xl font-semibold">Technical Skills</h3>
            
            <div className="space-y-6">
              {Object.entries(skills).map(([category, skillList], i) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-lg capitalize mb-1">
                    {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <div className="flex flex-wrap gap-2 w-full min-w-0">
                    {skillList.map((skill, j) => {
                      // Random direction for each skill
                      const directions = [
                        { x: -60, y: 0, rotate: -12 }, // left
                        { x: 60, y: 0, rotate: 12 },  // right
                        { x: 0, y: -60, rotate: -8 }, // top
                        { x: 0, y: 60, rotate: 8 },   // bottom
                      ];
                      const dir = directions[(i * 3 + j) % directions.length];
                      return (
                        <span
                          key={skill}
                          className="skill-tag relative overflow-hidden break-words text-xs md:text-sm animate-skill-float-x"
                        >
                          {skill}
                          <span className="absolute left-0 bottom-0 h-1 bg-primary/60 animate-skill-bar" style={{ width: `${80 - i * 10 - j * 5}%`, animationDelay: `${j * 100}ms` }}></span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold mb-6">Specializations</h3>
            <Card className="card-elegant bg-gradient-subtle">
              <CardContent className="p-6">
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-base mb-3 text-primary">Web & Backend Engineering</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Full-stack apps (React, FastAPI, PostgreSQL)</li>
                      <li>• REST API architecture</li>
                      <li>• Authentication & role-based access</li>
                      <li>• Deployment & CI/CD</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-base mb-3 text-primary">AI & Data Engineering</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• ML model training & evaluation</li>
                      <li>• Financial sentiment analysis</li>
                      <li>• Satellite data-based classification</li>
                      <li>• Data visualization & interactive dashboards</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-base mb-3 text-primary">Out of the Box</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Creative problem-solving approaches</li>
                      <li>• Innovative solution design</li>
                      <li>• Cross-disciplinary thinking</li>
                      <li>• Experimental technology exploration</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;