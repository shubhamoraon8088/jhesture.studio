
import React, { useEffect, useState, useRef } from 'react';

const MotionPointer: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
      setTheme(currentTheme || 'dark');
    };

    updateTheme();

    // Watch for theme attribute changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseOut = () => {
      setTimeout(() => setIsHovering(false), 10);
    };

    const animate = () => {
      const easing = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * easing;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * easing;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Instant follow for center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Dynamic cursor colors based on theme - using fixed colors
  const cursorBorder = theme === 'light' ? 'rgba(10, 10, 10, 0.4)' : 'rgba(255, 255, 255, 0.4)';
  const cursorBorderHover = theme === 'light' ? 'rgba(10, 10, 10, 0.6)' : 'rgba(255, 255, 255, 0.6)';
  const cursorBg = theme === 'light' ? 'rgba(10, 10, 10, 0.1)' : 'rgba(255, 255, 255, 0.1)';

  return (
    <>
      {/* Delayed Ring */}
      <div
        ref={ringRef}
        style={{
          borderColor: isHovering ? cursorBorderHover : cursorBorder,
          backgroundColor: isHovering ? cursorBg : 'transparent'
        }}
        className={`fixed top-0 left-0 w-12 h-12 -ml-6 -mt-6 rounded-full border-2 pointer-events-none z-[9999] transition-all duration-300 ease-out will-change-transform flex items-center justify-center ${isHovering ? 'scale-[2.5]' : 'scale-100'
          }`}
      >
        {isHovering && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
      </div>

      {/* Instant Follow Point */}
      <div
        ref={dotRef}
        style={{
          backgroundColor: theme === 'light' ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        }}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none z-[10000] will-change-transform"
      />
    </>
  );
};

export default MotionPointer;
