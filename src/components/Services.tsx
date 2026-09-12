import { Globe, Server, Brain, ScanEye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from "framer-motion";
import React, { Suspense } from 'react';
import LazyCanvas from '@/components/LazyCanvas';
import WireframeWave from '@/components/WireframeWave';

function Scene3D() {
  return (
    <>
      <WireframeWave />
    </>
  );
}

const Services = () => {
  const services = [
    {
      icon: ScanEye,
      title: "Computer Vision & AI Research",
      description: "Building and benchmarking computer vision systems — from feature matching and image retrieval to anomaly detection and model evaluation.",
      features: [
        "Visual anomaly detection & quality inspection pipelines",
        "Feature matching / image retrieval benchmarking",
        "Vision-language model evaluation",
        "OCR & document understanding pipelines"
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
    }
  ];

  return (
    <section id="services" className="section-padding bg-black overflow-hidden relative mobile-fallback-bg">
      {/* 3D Galaxy Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <LazyCanvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </LazyCanvas>
      </div>
      
      {/* Hazy overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-5" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 xl:mb-20 animate-fade-in">
          <h2 className="heading-secondary mb-4 drop-shadow-lg">Specialized Services</h2>
          <p className="section-intro drop-shadow-md">
            Expert development services spanning computer vision, full-stack, backend, and AI/ML solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 xl:gap-x-10 gap-y-12 xl:gap-y-16 justify-center items-stretch">
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
                <CardContent className="flex flex-col h-full p-6 xl:p-8 space-y-4 xl:space-y-5">
                  {/* Icon */}
                  <div className="w-14 h-14 xl:w-16 xl:h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-orange-glow animate-icon-bounce mb-2">
                    <service.icon className="text-primary group-hover:scale-110 transition-transform duration-300 w-7 h-7 xl:w-8 xl:h-8" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                    <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm xl:text-base 2xl:text-lg">What's included:</h4>
                    <ul className="space-y-1 ml-0">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-xs xl:text-sm 2xl:text-base text-muted-foreground flex items-center animate-feature-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
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
        <div className="text-center mt-16 xl:mt-20 animate-fade-in delay-300">
          <Card className="card-elegant bg-gradient-subtle max-w-3xl xl:max-w-4xl mx-auto animate-bounce-in">
            <CardContent className="p-8 xl:p-10">
              <h3 className="subheading mb-4">Ready to Start Your Project?</h3>
              <p className="text-body mb-6">
                Let's discuss how I can help bring your ideas to life with modern web technologies and full-stack development solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact"
                  className="btn-primary rounded-lg text-center hover:bg-primary/90 transition-colors animate-bounce-in"
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
