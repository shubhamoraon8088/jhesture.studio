
import React from 'react';

const MARQUEE_ITEMS = [
  'THE MAN.', 'THE MIND.', 'THE VISION.', 'SHUBHAM TOPPO'
];

const ClientsSection: React.FC = () => {
  return (
    <section className="py-24 bg-brand-black border-y theme-border overflow-hidden select-none">
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span 
              key={idx} 
              className={`text-6xl md:text-[8vw] lg:text-[10vw] font-sans font-black mx-16 tracking-[-0.05em] transition-all duration-700 cursor-default uppercase
                ${item.includes('.') || item === 'SHUBHAM TOPPO' ? 'text-brand-white' : 'text-brand-white/10 hover:text-brand-white/20'}
              `}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
};

export default ClientsSection;
