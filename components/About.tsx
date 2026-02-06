
import React, { useState, useEffect, useRef } from 'react';

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
    <section id="about" className="py-32 px-6 md:px-12 bg-brand-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm order-2 lg:order-1 bg-brand-gray shadow-xl">
          <img
            src="./about-portrait.png"
            alt="Portrait"
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-xl uppercase tracking-[0.4em] mb-12 font-sans text-brand-muted font-bold">The Creative Pulse</h2>
          <h3 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
            Visual Storyteller <br />
            <span className="italic">Based in India.</span>
          </h3>
          <div className="space-y-6 text-brand-muted leading-relaxed font-sans text-lg">
            <p>
              Lead Editor and Motion Designer specializing in narrative-driven commercial content. My work bridges the gap between raw cinematography and precision motion graphics.
            </p>
            <p>
              I believe in "Invisible Editing"—the art of guiding the viewer's emotion through pacing, sound, and seamless visual transitions that feel organic to the story.
            </p>
          </div>

          <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-8 border-t theme-border pt-12">
            <div>
              <p className="text-4xl font-serif mb-1">{projectsCount}+</p>
              <p className="text-xs uppercase tracking-widest text-brand-muted font-bold">PROJECTS COMPLETED</p>
            </div>
            <div>
              <p className="text-4xl font-serif mb-1">{viewsCount}M+</p>
              <p className="text-xs uppercase tracking-widest text-brand-muted font-bold">Total Views</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
