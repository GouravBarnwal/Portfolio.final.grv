import { Code, Smartphone, Database, Brain, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Full-Stack Web Development",
      description: "End-to-end web application development using React.js, Node.js, and Express.js for scalable, modern solutions.",
      features: [
        "React.js frontend development",
        "Node.js & Express backend",
        "RESTful API design",
        "Responsive web design"
      ]
    },
    {
      icon: Smartphone,
      title: "Frontend Development",
      description: "Creating intuitive, responsive user interfaces with modern frameworks and best practices for optimal user experience.",
      features: [
        "React.js applications",
        "Responsive UI design",
        "CSS3 & Tailwind styling",
        "Mobile-first approach"
      ]
    },
    {
      icon: Database,
      title: "Backend & Database Integration",
      description: "Robust backend development with secure API endpoints and efficient database management using MongoDB and Firebase.",
      features: [
        "API development",
        "MongoDB integration",
        "Firebase real-time database",
        "Data modeling & optimization"
      ]
    },
    {
      icon: Shield,
      title: "Authentication & Security",
      description: "Implementing secure authentication systems with OTP verification, email automation, and user management.",
      features: [
        "OTP authentication",
        "Email automation",
        "Secure user management",
        "Password reset systems"
      ]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, scalability, and performance with modern deployment practices.",
      features: [
        "Code optimization",
        "CI/CD deployment",
        "Performance monitoring",
        "Scalable architecture"
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
          <h2 className="heading-secondary mb-4">Services I Offer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive development services from concept to deployment, specializing in modern web technologies and full-stack solutions
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
                    <ul className="space-y-1">
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
                  href="mailto:barnwalgourav547@gmail.com"
                  className="btn-primary px-8 py-3 rounded-lg text-center inline-block animate-bounce-in"
                >
                  Start a Project
                </a>
                <a 
                  href="#contact"
                  className="border border-border px-8 py-3 rounded-lg text-center hover:bg-surface transition-colors animate-bounce-in delay-100"
                >
                  Get in Touch
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