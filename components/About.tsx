import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and animate each time the section comes into view
            hasAnimated.current = false;
            animateCount(setProjectsCount, 100, 1500);
            animateCount(setViewsCount, 12, 1500);
          } else {
            // Reset to 0 when out of view
            setProjectsCount(0);
            setViewsCount(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const animateCount = (setter: React.Dispatch<React.SetStateAction<number>>, target: number, duration: number) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(Math.floor(current));
      }
    }, 16);
  };

  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 bg-brand-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div 
          className="relative aspect-[3/4] overflow-hidden rounded-sm order-2 lg:order-1 bg-brand-gray shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <img
            src="./about-portrait.png"
            alt="Portrait"
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.h2 
            className="text-lg md:text-xl uppercase tracking-[0.4em] mb-8 md:mb-12 font-sans text-brand-muted font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            The Creative Pulse
          </motion.h2>
          <motion.h3 
            className="text-3xl md:text-6xl font-serif leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Visual Storyteller <br />
            <span className="italic">Based in India.</span>
          </motion.h3>
          <div className="space-y-6 text-brand-muted leading-relaxed font-sans text-base md:text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Lead Editor and Motion Designer specializing in narrative-driven commercial content. My work bridges the gap between raw cinematography and precision motion graphics.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I believe in "Invisible Editing"—the art of guiding the viewer's emotion through pacing, sound, and seamless visual transitions that feel organic to the story.
            </motion.p>
          </div>

          <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-6 md:gap-8 border-t theme-border pt-12">
            <div>
              <p className="text-3xl md:text-4xl font-serif mb-1">{projectsCount}+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-brand-muted font-bold">PROJECTS COMPLETED</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif mb-1">{viewsCount}M+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-brand-muted font-bold">Total Views</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
