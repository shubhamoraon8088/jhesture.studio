
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientsSection from './components/ClientsSection';
import StudioSection from './components/StudioSection';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import MotionPointer from './components/MotionPointer';
import BookingForm from './components/BookingForm';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-white selection:text-brand-black">
      <MotionPointer />
      <Navbar
        onThemeChange={setTheme}
        currentTheme={theme}
        onBookingClick={() => setIsBookingOpen(true)}
      />
      <main>
        <Hero />
        <ClientsSection />
        <StudioSection />
        <Portfolio />
        <About />
        <Services />
      </main>
      <Footer />

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

export default App;
