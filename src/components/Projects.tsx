import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

const Projects = () => {
  const projects = [
    {
      title: "TickerPulse — AI-Powered Stock Sentiment Analysis & Trend Prediction Platform",
      description: "A comprehensive platform that tracks stock mentions from influencers and financial content to identify trending companies. Features include alerts, market-interest analysis, and a clean UI for investors.",
      technologies: ["React.js", "FastAPI", "PostgreSQL", "WebSocket", "Financial APIs", "Data Visualization"],
      features: [
        "Tracks stock mentions from influencers and financial content",
        "Identifies trending companies in real-time",
        "Custom alerts and market-interest analysis",
        "Clean, user-friendly interface for investors",
        "Real-time data updates and notifications"
      ],
      github: "#",
      demo: "#",
      image: "ticker-pulse"
    },
    {
    title: "Deforestation Fire Classification in India Using MODIS Satellite Data",
      description: "AI/ML project analyzing MODIS fire data (2021-2023) to classify different types of fires (vegetation, static, etc.) with a focus on spatial distribution and class imbalance analysis.",
      technologies: ["Python", "Streamlit", "Scikit-learn", "Folium", "Pandas", "Data Analysis"],
      features: [
        "Analyzed MODIS fire data from 2021-2023",
        "Classified different fire types (vegetation, static, etc.)",
        "Performed EDA on class imbalance and spatial distribution",
        "Built and deployed interactive ML application",
        "Geospatial visualization of fire data"
      ],
      github: "https://github.com/GouravBarnwal/Deforestation_Detection_Fire.git",
      demo: "https://deforestation-fire-detection-grv.streamlit.app/",
      image: "fire-classification"
    },
    {
      title: "Student Attendance Monitoring System",
      description: "Full-stack application built with React.js and Flask for attendance automation, featuring OTP-based authentication, email alerts, and SBI Collect payment integration.",
      technologies: ["React.js", "Flask", "Firebase", "Python", "OTP Auth", "Payment Integration"],
      features: [
        "Real-time attendance tracking",
        "Automated alert system",
        "OTP password reset",
        "SBI payment integration",
        "Admin dashboard"
      ],
      github: "#",
      demo: "#",
      image: "attendance-system"
    },
    {
      title: "GigaNEWS - React News Portal",
      description: "Modern, responsive news application built with React featuring infinite scrolling, category-based filtering, seamless NewsAPI integration, comprehensive error handling, and mobile-optimized navigation.",
      technologies: ["React.js", "NewsAPI", "CSS3", "Responsive Design", "Netlify", "CI/CD"],
      features: [
        "Infinite scrolling",
        "Category filtering",
        "Mobile-responsive design",
        "NewsAPI integration",
        "Error handling",
        "CI/CD deployment"
      ],
      github: "#",
      demo: "#",
      image: "news-app"
    },
    {
      title: "Dr. Maya Reynolds Website Clone",
      description: <>Pixel-perfect recreation of Dr. Maya Reynolds' professional website using Next.js with modern development practices. Original site: <a href="https://lilac-template.squarespace.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://lilac-template.squarespace.com/</a> (password: lilac)</>,
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design", "Performance Optimization"],
      features: [
        "Pixel-perfect frontend replication",
        "Modern Next.js architecture",
        "Responsive design implementation",
        "Component-based structure",
        "Performance optimization",
        "Clean, maintainable code"
      ],
      github: "https://github.com/GouravBarnwal/Dr-Maya-Reynold.git",
      demo: "https://dr-maya-reynolds-beta.vercel.app/",
      image: "maya-reynolds-clone"
    }
  ];

  // Carousel images for Student Attendance Monitoring System
  const samsImages = [
    'imagesmine/Screenshot 2025-07-03 231122.png',
    'imagesmine/Screenshot 2025-07-03 231144.png',
    'imagesmine/Screenshot 2025-07-03 231144.png',
    'imagesmine/Screenshot 2025-07-03 231154.png',
    'imagesmine/Screenshot 2025-07-03 231836.png',
    'imagesmine/Screenshot 2025-07-03 232001.png',
    'imagesmine/Screenshot 2025-07-03 232001.png',
    'imagesmine/Screenshot 2025-07-21 030853.png',
    'imagesmine/Screenshot 2025-07-21 031003.png',
  ];

  // Carousel images for Dr. Maya Reynolds Website Clone
  const mayaReynoldsImages = [
    'imagesmine/Screenshot 2026-02-14 014337.png',
    'imagesmine/Screenshot 2026-02-14 013751.png',
    'imagesmine/Screenshot 2026-02-14 013823.png',
    'imagesmine/Screenshot 2026-02-14 013853.png',
  ];
  const [samsIndex, setSamsIndex] = useState(0);
  const [mayaReynoldsIndex, setMayaReynoldsIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSamsIndex((prev) => (prev + 1) % samsImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [samsImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMayaReynoldsIndex((prev) => (prev + 1) % mayaReynoldsImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [mayaReynoldsImages.length]);
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSamsIndex((prev) => (prev - 1 + samsImages.length) % samsImages.length);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSamsIndex((prev) => (prev + 1) % samsImages.length);
  };

  const handleMayaPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMayaReynoldsIndex((prev) => (prev - 1 + mayaReynoldsImages.length) % mayaReynoldsImages.length);
  };
  const handleMayaNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMayaReynoldsIndex((prev) => (prev + 1) % mayaReynoldsImages.length);
  };

  // Carousel images for Fire Classification Project
  const fireClassificationImages = [
    'imagesmine/Screenshot 2025-11-26 184514.png',
    'imagesmine/Screenshot 2025-11-26 184605.png',
    'imagesmine/Screenshot 2025-11-26 184645.png',
  ];
  const [fireIndex, setFireIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFireIndex((prev) => (prev + 1) % fireClassificationImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [fireClassificationImages.length]);
  const handleFirePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFireIndex((prev) => (prev - 1 + fireClassificationImages.length) % fireClassificationImages.length);
  };
  const handleFireNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFireIndex((prev) => (prev + 1) % fireClassificationImages.length);
  };

  // Carousel images for TickerPulse
  const tickerPulseImages = [
    'imagesmine/image.png',
    'imagesmine/Screenshot_2025-11-04_at_8.38.37_PM.png',
    'imagesmine/tickerpulse-architecture.png',
    'imagesmine/Screenshot 2025-11-26 185300.png',
  ];
  const [tickerIndex, setTickerIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerPulseImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [tickerPulseImages.length]);
  const handleTickerPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTickerIndex((prev) => (prev - 1 + tickerPulseImages.length) % tickerPulseImages.length);
  };
  const handleTickerNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTickerIndex((prev) => (prev + 1) % tickerPulseImages.length);
  };

  // Carousel images for GigaNEWS - React News Portal
  const gigaNewsImages = [
    'imagesmine/Screenshot 2025-07-21 014631.png',
    'imagesmine/Screenshot 2025-07-21 031354.png',
  ];
  const [gigaIndex, setGigaIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGigaIndex((prev) => (prev + 1) % gigaNewsImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [gigaNewsImages.length]);
  const handleGigaPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGigaIndex((prev) => (prev - 1 + gigaNewsImages.length) % gigaNewsImages.length);
  };
  const handleGigaNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGigaIndex((prev) => (prev + 1) % gigaNewsImages.length);
  };

  return (
    <section id="projects" className="section-padding bg-surface/50 relative">
      {/* Animated background shapes for extra flair */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] h-64 z-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob2" style={{ left: '-10%', top: '10%' }} />
        <div className="absolute w-60 h-60 bg-accent/10 rounded-full blur-2xl animate-blob3" style={{ right: '-8%', top: '30%' }} />
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="heading-secondary mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in full-stack development and modern web applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="tilt-card"
              style={{ perspective: '900px' }}
            >
              <div className="tilt-card-inner card-elegant group relative overflow-visible animate-project-fade-in h-full flex flex-col" style={{ animationDelay: `${index * 120}ms` }}>
                <div className="relative overflow-hidden rounded-t-lg">
                  {project.title === "TickerPulse — AI-Powered Stock Sentiment Analysis & Trend Prediction Platform" ? (
                    <div className="relative h-48 w-full group">
                      <img
                        src={tickerPulseImages[tickerIndex]}
                        alt={`TickerPulse Screenshot ${tickerIndex + 1}`}
                        className="h-48 w-full object-cover rounded-t-lg shadow-lg transition-all duration-500"
                      />
                      {/* Carousel controls */}
                      <button onClick={handleTickerPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Previous</span>
                        &#8592;
                      </button>
                      <button onClick={handleTickerNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Next</span>
                        &#8594;
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {tickerPulseImages.map((_, i) => (
                          <span key={i} className={`w-2 h-2 rounded-full ${i === tickerIndex ? 'bg-primary' : 'bg-muted-foreground/40'} transition-colors`}></span>
                        ))}
                      </div>
                    </div>
                  ) : project.title === "Student Attendance Monitoring System" ? (
                    <div className="relative h-48 w-full group">
                      <img
                        src={samsImages[samsIndex]}
                        alt={`Student Attendance Monitoring System Screenshot ${samsIndex + 1}`}
                        className="h-48 w-full object-cover rounded-t-lg shadow-lg transition-all duration-500"
                      />
                      {/* Carousel controls */}
                      <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Previous</span>
                        &#8592;
                      </button>
                      <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Next</span>
                        &#8594;
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {samsImages.map((_, i) => (
                          <span key={i} className={`w-2 h-2 rounded-full ${i === samsIndex ? 'bg-primary' : 'bg-muted-foreground/40'} transition-colors`}></span>
                        ))}
                      </div>
                    </div>
                  ) : project.title === "Dr. Maya Reynolds Website Clone" ? (
                    <div className="relative h-48 w-full group">
                      <img
                        src={mayaReynoldsImages[mayaReynoldsIndex]}
                        alt={`Dr. Maya Reynolds Website Screenshot ${mayaReynoldsIndex + 1}`}
                        className="h-48 w-full object-cover rounded-t-lg shadow-lg transition-all duration-500"
                      />
                      {/* Carousel controls */}
                      <button onClick={handleMayaPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Previous</span>
                        &#8592;
                      </button>
                      <button onClick={handleMayaNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Next</span>
                        &#8594;
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {mayaReynoldsImages.map((_, i) => (
                          <span key={i} className={`w-2 h-2 rounded-full ${i === mayaReynoldsIndex ? 'bg-primary' : 'bg-muted-foreground/40'} transition-colors`}></span>
                        ))}
                      </div>
                    </div>
                  ) : project.title === "GigaNEWS - React News Portal" ? (
                    <div className="relative h-48 w-full group">
                      <img
                        src={gigaNewsImages[gigaIndex]}
                        alt={`GigaNEWS Screenshot ${gigaIndex + 1}`}
                        className="h-48 w-full object-cover rounded-t-lg shadow-lg transition-all duration-500"
                      />
                      {/* Carousel controls */}
                      <button onClick={handleGigaPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Previous</span>
                        &#8592;
                      </button>
                      <button onClick={handleGigaNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Next</span>
                        &#8594;
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {gigaNewsImages.map((_, i) => (
                          <span key={i} className={`w-2 h-2 rounded-full ${i === gigaIndex ? 'bg-primary' : 'bg-muted-foreground/40'} transition-colors`}></span>
                        ))}
                      </div>
                    </div>
                  ) : project.title === "Deforestation Fire Classification in India Using MODIS Satellite Data" ? (
                    <div className="relative h-48 w-full group">
                      <img
                        src={fireClassificationImages[fireIndex]}
                        alt={`Fire Classification Screenshot ${fireIndex + 1}`}
                        className="h-48 w-full object-cover rounded-t-lg shadow-lg transition-all duration-500"
                      />
                      {/* Carousel controls */}
                      <button onClick={handleFirePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Previous</span>
                        &#8592;
                      </button>
                      <button onClick={handleFireNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-primary/80 transition-colors z-10">
                        <span className="sr-only">Next</span>
                        &#8594;
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {fireClassificationImages.map((_, i) => (
                          <span key={i} className={`w-2 h-2 rounded-full ${i === fireIndex ? 'bg-primary' : 'bg-muted-foreground/40'} transition-colors`}></span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-subtle flex items-center justify-center animate-emoji-bounce">
                      <div className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">💻</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 pointer-events-none group-hover:shadow-orange-glow group-hover:scale-105 transition-all duration-300 rounded-t-lg"></div>
                </div>
                
                <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md animate-tech-fade-in">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2 mt-4">
                    <h4 className="font-medium text-sm">Key Features:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="animate-feature-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons - Hidden for TickerPulse project */}
                  {project.title !== "TickerPulse — AI-Powered Stock Sentiment Analysis & Trend Prediction Platform" && (
                    <div className="flex gap-2 pt-4 mt-auto">
                      {project.title === "Student Attendance Monitoring System" ? (
                        <div className="w-full flex justify-center">
                          <a
                            href="https://github.com/GouravBarnwal/Students-Attendance-Monitoring-and-Alert-Generation-System.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-40"
                          >
                            <Button variant="outline" size="sm" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300 animate-bounce-in">
                              <Github size={16} className="mr-2" />
                              Code
                            </Button>
                          </a>
                        </div>
                      ) : project.title === "GigaNEWS - React News Portal" ? (
                        <>
                          <a
                            href="https://github.com/GouravBarnwal/GigaNEWS.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button variant="outline" size="sm" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300 animate-bounce-in">
                              <Github size={16} className="mr-2" />
                              Code
                            </Button>
                          </a>
                          <a
                            href="https://gouravbarnwal-giganews.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button size="sm" className="w-full group-hover:bg-primary/90 group-hover:text-primary-foreground transition-all duration-300 animate-bounce-in delay-100">
                              <ExternalLink size={16} className="mr-2" />
                              Demo
                            </Button>
                          </a>
                        </>
                      ) : project.title === "Deforestation Fire Classification in India Using MODIS Satellite Data" ? (
                        <>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button variant="outline" size="sm" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300 animate-bounce-in">
                              <Github size={16} className="mr-2" />
                              Code
                            </Button>
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button size="sm" className="w-full group-hover:bg-primary/90 group-hover:text-primary-foreground transition-all duration-300 animate-bounce-in delay-100">
                              <ExternalLink size={16} className="mr-2" />
                              Demo
                            </Button>
                          </a>
                        </>
                      ) : project.title === "Dr. Maya Reynolds Website Clone" ? (
                        <>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button variant="outline" size="sm" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300 animate-bounce-in">
                              <Github size={16} className="mr-2" />
                              Code
                            </Button>
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button size="sm" className="w-full group-hover:bg-primary/90 group-hover:text-primary-foreground transition-all duration-300 animate-bounce-in delay-100">
                              <ExternalLink size={16} className="mr-2" />
                              Demo
                            </Button>
                          </a>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 group-hover:border-primary group-hover:text-primary transition-all duration-300 animate-bounce-in">
                            <Github size={16} className="mr-2" />
                            Code
                          </Button>
                          <Button size="sm" className="flex-1 group-hover:bg-primary/90 group-hover:text-primary-foreground transition-all duration-300 animate-bounce-in delay-100">
                            <ExternalLink size={16} className="mr-2" />
                            Demo
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12 animate-fade-in delay-300">
          <a
            href="https://github.com/GouravBarnwal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="px-8 hover:bg-primary/10 hover:text-primary transition-colors duration-300 animate-bounce-in">
              View All Projects on GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;