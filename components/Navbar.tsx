
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onThemeChange: (theme: 'dark' | 'light') => void;
  currentTheme: 'dark' | 'light';
  onBookingClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeChange, currentTheme, onBookingClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brand-black/90 backdrop-blur-xl py-5' : 'bg-transparent py-10'}`}>
      <div className="w-full px-6 md:px-12 flex justify-between items-center">
        {/* Toggle Logo Group */}
        <div className="flex items-center text-xl md:text-3xl font-sans font-black tracking-tighter uppercase select-none group/logo">
          <button
            onClick={() => onThemeChange('dark')}
            className={`transition-all duration-500 hover:text-red-600 ${currentTheme === 'dark' ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
          >
            jhesture
          </button>
          <button
            onClick={() => onThemeChange('light')}
            className={`transition-all duration-500 hover:text-red-600 ${currentTheme === 'light' ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
          >
            .studio
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {['Works', 'About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-6 py-2 border theme-border rounded-full text-lg uppercase tracking-normal font-sans font-light hover:bg-brand-white hover:text-brand-black transition-all duration-500"
            >
              {item}
            </a>
          ))}
        </div>

        <button className="md:hidden flex flex-col space-y-1.5" onClick={onBookingClick}>
          <span className="w-8 h-px bg-brand-white"></span>
          <span className="w-8 h-px bg-brand-white"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
