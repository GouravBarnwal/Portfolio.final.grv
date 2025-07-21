import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from "framer-motion";

const About = () => {
  const skills = {
    frontend: ['React.js', 'JavaScript', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'REST APIs'],
    database: ['MongoDB', 'Firebase'],
    tools: ['Git', 'GitHub', 'Netlify', 'Jupyter'],
    languages: ['Python', 'Java']
  };

  const experiences = [
    {
      title: "Software Development Intern",
      company: "NIAMT Ranchi",
      duration: "06/2025 - 07/2025",
      description: "Gained hands-on experience in full-stack web development, working on collaborative software projects and modern web technologies."
    },
    {
      title: "AI/ML Intern",
      company: "AICTE x Edunet Foundation x Shell",
      duration: "07/25 - ongoing",
      description: `• Analyzed MODIS fire anomaly data (2021–2023) from NASA’s Terra/Aqua satellites to classify fire types in India (vegetation fires, volcanic, static land, offshore), Dataset Area ranges till Jammu-Kashmir.<br/>• Performing exploratory data analysis to understand class imbalance and parameter distributions (e.g., count plots).<br/>• Tools/Tech: Python, Pandas, Seaborn, Scikit-learn, Jupyter, Satellite Data (MODIS).`
    }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate developer with a strong foundation in full-stack development and modern web technologies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full min-w-0">
          {/* Personal Bio */}
          <div className="space-y-8 animate-slide-up w-full min-w-0">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a dedicated Computer Science Engineering student with hands-on experience in React.js, Node.js, 
                Express, MongoDB, Firebase, and Python. My passion lies in creating clean, scalable solutions that 
                bridge the gap between powerful backend systems and intuitive user interfaces.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently in my 3rd year at Ramgarh Engineering College, I've been actively building projects that 
                solve real-world problems, from student attendance systems to modern news applications with 
                comprehensive features and responsive design.
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
                          3rd Year
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
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-lg">{exp.title}</h4>
                          <span className="text-sm text-muted-foreground">{exp.duration}</span>
                        </div>
                        <p className="text-primary font-medium">{exp.company}</p>
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
                          className="skill-tag relative overflow-hidden break-words text-xs md:text-sm"
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

            {/* Specializations */}
            <Card className="card-elegant bg-gradient-subtle">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-4">Specializations</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full-stack web development with React & Node.js</li>
                  <li>• Real-time database integration with Firebase</li>
                  <li>• RESTful API design and implementation</li>
                  <li>• Email automation and OTP authentication</li>
                  <li>• Responsive UI/UX development</li>
                  <li>• Modern deployment and CI/CD practices</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;