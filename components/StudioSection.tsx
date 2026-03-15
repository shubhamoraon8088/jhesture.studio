import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StudioSection: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTextVisible, setIsTextVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;

      // Calculate normalized mouse position from center (-1 to 1)
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Apply a subtle 3D tilt to the entire container
      // This satisfies the "Simple 3D Hover Effect" without complex parallax layers
      setTilt({ x: x * 5, y: -y * 5 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center py-20 px-6 select-none"
      style={{ perspective: '1500px' }}
    >
      {/* 3D Scene Wrapper - Single Layer for Simple Hover Effect */}
      <div
        className="relative w-full max-w-7xl aspect-video rounded-xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* The Requested Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[0.2] brightness-90 hover:grayscale-0 transition-all duration-700"
          style={{
            backgroundImage: `url('./studio-setup.jpg')`,
          }}
        />

        {/* Subtle Ambient Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-pink-500/10 pointer-events-none" />

        {/* Bold Text Overlay on Image - Two Lines with Slide-Up Animation */}
        <motion.div
           className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, margin: "-100px" }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-8xl font-sans font-black lowercase text-white text-center leading-tight tracking-tighter">
            kick back
          </h2>
          <h2 className="text-4xl md:text-8xl font-sans font-black lowercase text-white text-center leading-tight tracking-tighter">
            i'll handle the track
          </h2>
        </motion.div>

        {/* Overlay Content (Optional Branding) */}
        <motion.div 
          className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-[10px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.8em] text-white font-black">
            The.Studio.Environment
          </p>
        </motion.div>
      </div>

      {/* Background Glow to enhance the 3D feel */}
      <div
        className="absolute w-[80%] h-[60%] bg-red-600/5 blur-[120px] rounded-full pointer-events-none -z-10 transition-transform duration-1000"
        style={{ transform: `translate(${tilt.x * 10}px, ${tilt.y * 10}px)` }}
      />
    </section>
  );
};

export default StudioSection;
