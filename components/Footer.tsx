
import React from 'react';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onTermsClick }) => {
  return (
    <footer id="contact" className="bg-brand-black pt-32 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-serif tracking-tighter mb-12">
            Let's <span className="italic">Connect.</span>
          </h2>

          {/* Email and WhatsApp Contact Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            {/* Gmail */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=shubhamoraon8088@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg md:text-2xl font-sans hover:scale-105 transition-all duration-300 group"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              <span className="border-b border-white pb-1 group-hover:border-red-500">shubhamoraon8088@gmail.com</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919835813059"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg md:text-2xl font-sans hover:scale-105 transition-all duration-300 group"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="border-b border-white pb-1 group-hover:border-green-500">+91 9835813059</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-xs uppercase tracking-widest text-brand-muted font-sans">
          <div className="flex space-x-8">
            <a href="https://www.instagram.com/jhesture.studio/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/shubham-toppo-0b18a8383/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://discord.com/users/1379657742729351280" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          </div>

          <p>© 2025 jhesture.studio. All Rights Reserved.</p>

          <div className="flex space-x-8">
            <button onClick={onPrivacyClick} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={onTermsClick} className="hover:text-white transition-colors">Terms of Use</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

