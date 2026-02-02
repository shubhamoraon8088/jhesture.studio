
import React, { useState } from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl uppercase tracking-[0.4em] mb-16 text-center text-brand-muted font-bold">Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className={`p-8 border transition-all duration-500 group cursor-pointer ${expandedId === service.id
                ? 'border-white/30 bg-white/5'
                : 'border-white/10 hover:border-white/30'
                }`}
              onClick={() => service.offerings && toggleExpand(service.id)}
            >
              <p className="text-2xl font-serif italic text-brand-muted mb-8">0{idx + 1}</p>
              <h3 className="text-2xl font-serif font-bold mb-4 group-hover:translate-x-2 transition-transform duration-500">
                {service.name}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed font-sans">
                {service.description}
              </p>

              {/* Expandable offerings section */}
              {service.offerings && (
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedId === service.id
                    ? 'max-h-[500px] opacity-100 mt-6'
                    : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs uppercase tracking-wider text-brand-muted mb-3">Includes:</p>
                    <ul className="space-y-2">
                      {service.offerings.map((offering, index) => (
                        <li
                          key={index}
                          className="text-xs text-brand-muted/80 flex items-start"
                        >
                          <span className="text-red-600 mr-2">•</span>
                          <span>{offering}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Click indicator */}
              {service.offerings && (
                <div className="mt-4 text-xs text-brand-muted/50 flex items-center gap-2">
                  <span>{expandedId === service.id ? '−' : '+'}</span>
                  <span>{expandedId === service.id ? 'Show less' : 'View details'}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
