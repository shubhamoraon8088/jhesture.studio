
import React, { useState, useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';

const Portfolio: React.FC = () => {
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const togglePlayPause = (itemId: string, hasVideo: boolean) => {
    if (!hasVideo) return;

    const video = videoRefs.current[itemId];
    if (!video) return;

    if (playingStates[itemId]) {
      video.pause();
    } else {
      video.play();
    }

    setPlayingStates((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <section id="works" className="py-32 px-6 md:px-12 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b theme-border pb-12">
          <div>
            <h2 className="text-6xl uppercase tracking-[0.4em] text-brand-muted mb-4 font-sans font-bold">Showcase</h2>
            <h3 className="text-4xl md:text-7xl font-serif leading-none">The <span className="italic">Portfolio.</span></h3>
          </div>
          <p className="max-w-xs text-xs uppercase tracking-widest leading-relaxed text-brand-muted md:text-right font-sans">
            Crafting immersive visual experiences for global brands through motion and sound.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-32">
          {PORTFOLIO_ITEMS.map((item, index) => {
            const isLandscape = index >= 4;
            const aspectClass = isLandscape ? 'aspect-video' : 'aspect-[4/5]';
            const hasVideo = !!item.video;
            const isPlaying = playingStates[item.id] || false;

            return (
              <div
                key={item.id}
                className={`group cursor-pointer relative ${!isLandscape && index % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                {/* Vertical Sliding Image/Video Window */}
                <div className={`relative ${aspectClass} overflow-hidden bg-brand-gray mb-8 rounded-sm shadow-sm transition-colors duration-500`}>

                  {item.video ? (
                    item.hoverVideo ? (
                      /* Dual Video Slider - slides up on hover */
                      <div className="absolute inset-0 w-full h-[200%] transition-transform duration-[800ms] ease-[cubic-bezier(0.6,0.01,-0.05,0.9)] group-hover:-translate-y-1/2 will-change-transform">
                        {/* Primary Video (Top) */}
                        <div className="h-1/2 w-full overflow-hidden">
                          <video
                            ref={(el) => (videoRefs.current[item.id] = el)}
                            src={item.video}
                            className="w-full h-full object-cover transition-all duration-[800ms] group-hover:scale-110"
                            loop
                            muted
                            playsInline
                            autoPlay
                          />
                        </div>

                        {/* Secondary Video (Bottom) */}
                        <div className="h-1/2 w-full overflow-hidden">
                          <video
                            src={item.hoverVideo}
                            className="w-full h-full object-cover transition-all duration-[800ms] group-hover:scale-110"
                            loop
                            muted
                            playsInline
                            autoPlay
                          />
                        </div>
                      </div>
                    ) : (
                      /* Single Video Display */
                      <div className="absolute inset-0 w-full h-full">
                        <video
                          ref={(el) => (videoRefs.current[item.id] = el)}
                          src={item.video}
                          className="w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                        />
                      </div>
                    )
                  ) : (
                    /* Image Slider */
                    <div className="absolute inset-0 w-full h-[200%] transition-transform duration-[800ms] ease-[cubic-bezier(0.6,0.01,-0.05,0.9)] group-hover:-translate-y-1/2 will-change-transform">

                      {/* Primary Image (Top) */}
                      <div className="h-1/2 w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={`${item.title} primary`}
                          className="w-full h-full object-cover transition-all duration-[800ms] group-hover:scale-110"
                        />
                      </div>

                      {/* Secondary Image (Bottom) */}
                      <div className="h-1/2 w-full overflow-hidden">
                        <img
                          src={item.hoverImage}
                          alt={`${item.title} secondary`}
                          className="w-full h-full object-cover transition-all duration-[800ms] group-hover:scale-110"
                        />
                      </div>
                    </div>
                  )}

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-brand-black/5 group-hover:bg-brand-black/0 transition-colors duration-700 pointer-events-none"></div>

                  {/* Action UI - Play/Pause Button */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause(item.id, hasVideo);
                      }}
                      className={`px-6 py-2.5 bg-brand-white text-brand-black text-[9px] uppercase tracking-[0.2em] font-sans font-bold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${!hasVideo ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!hasVideo}
                    >
                      {hasVideo && (
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          {isPlaying ? (
                            /* Pause Icon */
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          ) : (
                            /* Play Icon */
                            <path d="M8 5v14l11-7z" />
                          )}
                        </svg>
                      )}
                      {isPlaying ? 'Pause' : hasVideo ? 'Play' : 'No Video'}
                    </button>
                    <span className="text-[10px] text-brand-muted font-mono tracking-tighter">
                      [{index + 1}/08]
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="px-3 py-1 border border-brand-white/20 backdrop-blur-md rounded-full text-[8px] uppercase tracking-widest text-brand-white">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Static Text Info */}
                <div className="flex justify-between items-start z-20 relative pointer-events-none">
                  <div>
                    <h3 className="text-2xl font-serif mb-2 transition-colors group-hover:italic">{item.title}</h3>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-brand-muted font-sans font-bold">Role: Lead Editor</p>
                  </div>
                  <p className="font-serif italic text-brand-muted transition-colors">{item.year}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
