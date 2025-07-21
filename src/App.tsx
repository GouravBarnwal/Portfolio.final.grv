import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React, { useCallback, lazy, Suspense, useState, useEffect } from "react";
import { loadFull } from "tsparticles";

const queryClient = new QueryClient();

const Particles = lazy(() => import("react-tsparticles"));

const App = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth > 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  return (
    <>
      <div className="particle-bg">
        {isDesktop && (
          <Suspense fallback={null}>
            <Particles
              id="tsparticles"
              init={particlesInit}
              options={{
                fullScreen: false,
                background: { color: "transparent" },
                particles: {
                  number: { value: 30, density: { enable: true, value_area: 800 } },
                  color: { value: ["#a259ff", "#5f5fff", "#00e0ff"] },
                  shape: { type: "circle" },
                  opacity: { value: 0.12, random: true },
                  size: { value: 1.5, random: { enable: true, minimumValue: 1 } },
                  move: { enable: true, speed: 0.5, direction: "none", random: false, straight: false, outModes: { default: "out" } },
                  links: { enable: false },
                },
                interactivity: {
                  events: { onHover: { enable: false }, onClick: { enable: false } },
                },
                detectRetina: true,
              }}
            />
          </Suspense>
        )}
      </div>
      <div className="tech-bg">
        <svg className="blob1" viewBox="0 0 400 400"><ellipse cx="200" cy="200" rx="200" ry="200" /></svg>
        <svg className="blob2" viewBox="0 0 320 320"><ellipse cx="160" cy="160" rx="160" ry="160" /></svg>
        <svg className="blob3" viewBox="0 0 300 300"><ellipse cx="150" cy="150" rx="150" ry="150" /></svg>
        <svg className="line1" viewBox="0 0 600 20"><line x1="0" y1="10" x2="600" y2="10" /></svg>
        <svg className="line2" viewBox="0 0 500 20"><line x1="0" y1="10" x2="500" y2="10" /></svg>
      </div>
      {/* Main App Content */}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
