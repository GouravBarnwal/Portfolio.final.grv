import { Code, Globe, Server, Database, Brain, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from "framer-motion";

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
    <section id="services" className="section-padding bg-gradient-to-b from-surface/60 to-background/80 relative">
      {/* Animated background shapes for extra flair */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] h-64 z-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob1" style={{ left: '-10%', top: '10%' }} />
        <div className="absolute w-60 h-60 bg-accent/10 rounded-full blur-2xl animate-blob2" style={{ right: '-8%', top: '30%' }} />
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="heading-secondary mb-4">Specialized Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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