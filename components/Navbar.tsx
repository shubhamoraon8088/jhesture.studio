
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onThemeChange: (theme: 'dark' | 'light') => void;
  currentTheme: 'dark' | 'light';
  onBookingClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeChange, currentTheme, onBookingClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${scrolled ? 'bg-brand-black/90 backdrop-blur-xl py-4' : 'bg-transparent py-8 md:py-10'}`}>
        <div className="w-full px-6 md:px-12 flex justify-between items-center text-brand-white">
          {/* Toggle Logo Group */}
          <div className="flex items-center text-2xl md:text-3xl font-sans font-black tracking-tighter uppercase select-none group/logo">
            <button
              onClick={() => { onThemeChange('dark'); closeMenu(); }}
              className={`transition-all duration-500 hover:text-red-600 ${currentTheme === 'dark' ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
            >
              jhesture
            </button>
            <button
              onClick={() => { onThemeChange('light'); closeMenu(); }}
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

          <button
            className="md:hidden flex flex-col space-y-2 z-[70] p-2"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className={`w-8 h-0.5 bg-brand-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-brand-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-brand-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] bg-brand-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col justify-center items-center p-12 space-y-8">
          {['Works', 'About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu}
              className="text-5xl font-serif italic text-brand-white hover:text-brand-muted transition-colors tracking-tight"
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => { onBookingClick(); closeMenu(); }}
            className="mt-8 px-12 py-4 bg-brand-white text-brand-black rounded-full font-sans font-bold uppercase tracking-widest text-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
