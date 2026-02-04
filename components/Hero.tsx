
import React, { useState, useEffect, useRef } from 'react';
import { isYouTube, getYouTubeEmbedUrl, getYouTubeIframeStyle } from '../utils';

interface GalleryImage {
  id: number;
  url: string;
  top: string;
  left: string;
  width: string;
  rotation: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, url: 'https://youtube.com/shorts/qfoajV0oOpY', top: '15%', left: '10%', width: '280px', rotation: '-5deg' },
  { id: 2, url: 'https://youtube.com/shorts/WhoLL4CBJyE', top: '20%', left: '65%', width: '320px', rotation: '8deg' },
  { id: 3, url: 'https://youtube.com/shorts/Cyclnd_9UdQ', top: '55%', left: '5%', width: '250px', rotation: '-12deg' },
  { id: 4, url: 'https://www.youtube.com/watch?v=hLtaSVUdQ9o', top: '65%', left: '75%', width: '300px', rotation: '15deg' },
  { id: 5, url: 'https://youtu.be/Zorl0Af5R3Y', top: '10%', left: '40%', width: '220px', rotation: '3deg' },
  { id: 6, url: 'https://youtu.be/qw3GEP51vqY', top: '75%', left: '35%', width: '350px', rotation: '-4deg' },
  { id: 7, url: 'https://youtu.be/lFIlCzw1hlc', top: '40%', left: '80%', width: '260px', rotation: '10deg' },
  { id: 8, url: 'https://youtu.be/1ohAKsiLLl8', top: '5%', left: '85%', width: '240px', rotation: '-8deg' },
  { id: 9, url: 'https://youtu.be/_VzLfXaH9b4', top: '45%', left: '25%', width: '290px', rotation: '5deg' },
  { id: 10, url: 'https://youtube.com/shorts/qfoajV0oOpY', top: '30%', left: '55%', width: '270px', rotation: '-6deg' },
];

const GREETINGS = [
  "HELLO",        // English
  "नमस्ते",         // Hindi
  "JOHAR",        // Johar
  "HOLA",         // Spanish
  "BONJOUR",      // French
  "こんにちは",     // Japanese
  "你好",          // Mandarin
  "مرحباً",       // Arabic
  "HALLO",        // German
  "ПРИВЕТ"        // Russian
];

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fillLevel, setFillLevel] = useState(200); // Start at bottom of viewBox
  const [scrollOffset, setScrollOffset] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
      setTheme(currentTheme || 'dark');
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Timer for the multilingual greeting
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 1000);

    // Fill animation on page load
    const fillTimer = setTimeout(() => {
      const duration = 2500; // 2.5 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic for smooth fill
        const eased = 1 - Math.pow(1 - progress, 3);
        setFillLevel(200 - (eased * 200));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, 300); // Small delay before starting

    // Scroll handler for liquid settling effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 500; // Max scroll distance to affect the liquid
      const offset = Math.min(scrollY / maxScroll, 1) * 30; // Max 30% downward movement
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
      clearTimeout(fillTimer);
    };
  }, []);

  // Theme-based colors
  const fillColor = theme === 'light' ? '#0a0a0a' : '#ffffff';
  const strokeColor = theme === 'light' ? '#0a0a0a' : '#ffffff';

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-brand-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* Interactive Gallery Background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {GALLERY_IMAGES.map((img) => (
          <ImageCard key={img.id} data={img} mouseX={mousePos.x} mouseY={mousePos.y} />
        ))}
      </div>

      {/* Scrolling Marquee */}
      <div className="absolute top-[25%] left-0 w-full z-20 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="marquee-item">VIDEO EDITING</span>
            <span className="marquee-item">MOTION GRAPHICS</span>
            <span className="marquee-item">UI ANIMATION</span>
            <span className="marquee-item">AVAILABLE FOR NEW PROJECTS</span>
            {/* Duplicates for seamless loop */}
            <span className="marquee-item">VIDEO EDITING</span>
            <span className="marquee-item">MOTION GRAPHICS</span>
            <span className="marquee-item">UI ANIMATION</span>
            <span className="marquee-item">AVAILABLE FOR NEW PROJECTS</span>
            <span className="marquee-item">VIDEO EDITING</span>
            <span className="marquee-item">MOTION GRAPHICS</span>
            <span className="marquee-item">UI ANIMATION</span>
            <span className="marquee-item">AVAILABLE FOR NEW PROJECTS</span>
            <span className="marquee-item">VIDEO EDITING</span>
            <span className="marquee-item">MOTION GRAPHICS</span>
            <span className="marquee-item">UI ANIMATION</span>
            <span className="marquee-item">AVAILABLE FOR NEW PROJECTS</span>
          </div>
        </div>
      </div>

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Liquid Fill Text */}
        <div className="relative">
          <svg
            viewBox="0 0 1000 200"
            className="w-[90vw] md:w-[70vw] h-auto max-w-[1200px]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Wavy liquid pattern with animation */}
              <clipPath id="liquidClip">
                <path d={`M 0,${fillLevel + scrollOffset} Q 50,${fillLevel + scrollOffset - 10} 100,${fillLevel + scrollOffset} T 200,${fillLevel + scrollOffset} T 300,${fillLevel + scrollOffset} T 400,${fillLevel + scrollOffset} T 500,${fillLevel + scrollOffset} T 600,${fillLevel + scrollOffset} T 700,${fillLevel + scrollOffset} T 800,${fillLevel + scrollOffset} T 900,${fillLevel + scrollOffset} T 1000,${fillLevel + scrollOffset} L 1000,200 L 0,200 Z`}>
                  <animate
                    attributeName="d"
                    dur="3s"
                    repeatCount="indefinite"
                    values={`
                      M 0,${fillLevel + scrollOffset} Q 50,${fillLevel + scrollOffset - 10} 100,${fillLevel + scrollOffset} T 200,${fillLevel + scrollOffset} T 300,${fillLevel + scrollOffset} T 400,${fillLevel + scrollOffset} T 500,${fillLevel + scrollOffset} T 600,${fillLevel + scrollOffset} T 700,${fillLevel + scrollOffset} T 800,${fillLevel + scrollOffset} T 900,${fillLevel + scrollOffset} T 1000,${fillLevel + scrollOffset} L 1000,200 L 0,200 Z;
                      M 0,${fillLevel + scrollOffset} Q 50,${fillLevel + scrollOffset + 10} 100,${fillLevel + scrollOffset} T 200,${fillLevel + scrollOffset} T 300,${fillLevel + scrollOffset} T 400,${fillLevel + scrollOffset} T 500,${fillLevel + scrollOffset} T 600,${fillLevel + scrollOffset} T 700,${fillLevel + scrollOffset} T 800,${fillLevel + scrollOffset} T 900,${fillLevel + scrollOffset} T 1000,${fillLevel + scrollOffset} L 1000,200 L 0,200 Z;
                      M 0,${fillLevel + scrollOffset} Q 50,${fillLevel + scrollOffset - 10} 100,${fillLevel + scrollOffset} T 200,${fillLevel + scrollOffset} T 300,${fillLevel + scrollOffset} T 400,${fillLevel + scrollOffset} T 500,${fillLevel + scrollOffset} T 600,${fillLevel + scrollOffset} T 700,${fillLevel + scrollOffset} T 800,${fillLevel + scrollOffset} T 900,${fillLevel + scrollOffset} T 1000,${fillLevel + scrollOffset} L 1000,200 L 0,200 Z
                    `}
                  />
                </path>
              </clipPath>
            </defs>

            {/* Stroke outline text (visible when not filled) */}
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-sans font-black lowercase tracking-[-0.07em]"
              style={{
                fontSize: '140px',
                fill: 'none',
                stroke: strokeColor,
                strokeWidth: fillLevel > 5 ? '2px' : '0px',
                transition: 'stroke-width 0.3s ease-out',
              }}
            >
              jhesture<tspan className="opacity-40 font-light">.</tspan>studio
            </text>

            {/* Filled text with wave clip (reveals as animation progresses) */}
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-sans font-black lowercase tracking-[-0.07em]"
              style={{
                fontSize: '140px',
                fill: fillColor,
              }}
              clipPath="url(#liquidClip)"
            >
              jhesture<tspan className="opacity-40 font-light">.</tspan>studio
            </text>
          </svg>
        </div>

        <div className="mt-12">
          <p className="text-xl uppercase tracking-[0.6em] text-brand-muted font-sans font-medium transition-colors">
            EXPLORE THE ART OF CREATIVITY
          </p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-16 w-full px-12 z-30 flex justify-between items-end border-t theme-border pt-12">
        <div className="space-y-1">
          <p className="text-4xl uppercase tracking-widest text-brand-muted font-sans font-bold transition-colors">the man. the mind. the vision</p>
          <p className="text-6xl md:text-7xl font-serif italic text-brand-white/90 transition-colors lowercase">shubham toppo</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-5xl uppercase tracking-[0.4em] text-brand-muted font-sans font-medium transition-all duration-500 ease-in-out min-w-[120px] text-right">
            {GREETINGS[greetingIndex]}
          </p>
          <div className="w-12 h-px bg-brand-white/20 animate-pulse transition-colors"></div>
        </div>
      </div>
    </section>
  );
};

const ImageCard: React.FC<{ data: GalleryImage; mouseX: number; mouseY: number }> = ({ data, mouseX, mouseY }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
    setIsVisible(distance < 300);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      style={{
        top: data.top,
        left: data.left,
        width: data.width,
        transform: `rotate(${data.rotation}) scale(${isVisible ? 1 : 0.6}) translateZ(0)`,
        opacity: isVisible ? 0.9 : 0,
        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="absolute aspect-[4/5] overflow-hidden rounded-sm bg-brand-gray shadow-2xl pointer-events-none will-change-transform border theme-border"
    >
      <div className="w-full h-full relative z-10 pointer-events-none grayscale brightness-50">
        <iframe
          src={getYouTubeEmbedUrl(data.url)}
          className="w-full h-full overflow-hidden"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={getYouTubeIframeStyle(data.url, true)}
        />
      </div>
    </div>
  );
};

export default Hero;
