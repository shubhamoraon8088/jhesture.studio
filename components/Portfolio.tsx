import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../constants';
import { isYouTube, getYouTubeId, getYouTubeEmbedUrl, getYouTubeIframeStyle } from '../utils';

const Portfolio: React.FC = () => {
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({});
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({});
  const [activeVideoStates, setActiveVideoStates] = useState<{ [key: string]: number }>({});
  const videoRefs = useRef<{ [key: string]: any }>({});

  // Generic toggle for any video by key
  const togglePlayPause = (videoKey: string) => {
    const isPlaying = playingStates[videoKey] ?? false; // Default to false (not playing) due to removed autoplay
    const element = videoRefs.current[videoKey];

    // Control for HTML5 video
    if (element instanceof HTMLVideoElement) {
      if (isPlaying) {
        element.pause();
      } else {
        element.play();
      }
    }
    // Control for YouTube iframe
    else if (element instanceof HTMLIFrameElement && element.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      element.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: '' }), '*');
    }

    setPlayingStates((prev) => ({
      ...prev,
      [videoKey]: !isPlaying,
    }));
  };

  const toggleMute = (videoKey: string) => {
    const element = videoRefs.current[videoKey];
    if (!element) return;

    const isCurrentlyUnmuted = mutedStates[videoKey] === true;

    if (element instanceof HTMLVideoElement) {
      element.muted = isCurrentlyUnmuted;
    } else if (element instanceof HTMLIFrameElement && element.contentWindow) {
      const command = isCurrentlyUnmuted ? 'mute' : 'unMute';
      element.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: '' }), '*');
    }

    setMutedStates((prev) => ({
      ...prev,
      [videoKey]: !isCurrentlyUnmuted,
    }));
  };

  // Reusable control buttons component
  const VideoControls = ({
    videoKey,
    isPlaying,
    isMuted,
    variant = 'internal'
  }: {
    videoKey: string;
    isPlaying: boolean;
    isMuted: boolean;
    variant?: 'internal' | 'external';
  }) => {
    const isExternal = variant === 'external';

    return (
      <div className={`flex ${isExternal ? 'flex-col' : 'flex-row'} items-center gap-2`}>
        {/* Play/Pause Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause(videoKey);
          }}
          className={`${isExternal
            ? 'p-3 bg-brand-white/5 backdrop-blur-md text-brand-white border border-brand-white/10 hover:bg-brand-white/10'
            : 'px-6 py-2.5 bg-brand-white text-brand-black text-[9px] uppercase tracking-[0.2em] font-sans font-bold'
            } rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2`}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          <svg className={isExternal ? 'w-4 h-4' : 'w-3 h-3'} viewBox="0 0 24 24" fill="currentColor">
            {isPlaying ? (
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
          {!isExternal && (isPlaying ? 'Pause' : 'Play')}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute(videoKey);
          }}
          className={`${isExternal
            ? 'p-3 bg-brand-white/5 backdrop-blur-md border border-brand-white/10 hover:bg-brand-white/10'
            : 'p-2.5 bg-brand-white/10 backdrop-blur-md border border-brand-white/20 hover:bg-brand-white/20'
            } text-brand-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all`}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            {!isMuted ? (
              <>
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </>
            ) : (
              <>
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63z" />
                <path d="M19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z" />
                <path d="M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3z" />
                <path d="M12 4L9.91 6.09 12 8.18V4z" />
              </>
            )}
          </svg>
        </button>
      </div>
    );
  };



  return (
    <section id="works" className="py-20 md:py-32 px-6 md:px-12 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 border-b theme-border pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-xl md:text-6xl uppercase tracking-[0.4em] text-brand-muted mb-4 font-sans font-bold">Showcase</h2>
            <h3 className="text-3xl md:text-7xl font-serif leading-none">The <span className="italic">Portfolio.</span></h3>
          </motion.div>
          <motion.p 
            className="max-w-xs text-[10px] md:text-xs uppercase tracking-widest leading-relaxed text-brand-muted md:text-right font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Crafting immersive visual experiences for global brands through motion and sound.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-32">
          {PORTFOLIO_ITEMS.map((item, index) => {
            const isLandscape = index >= 4;
            const aspectClass = isLandscape ? 'aspect-video' : 'aspect-[4/5]';
            const hasVideo = !!item.video;
            const hasDualVideos = hasVideo && !!item.hoverVideo;
            const isLeftColumn = index % 2 === 0;

            // Keys for primary and secondary videos
            const primaryVideoKey = item.id;
            const secondaryVideoKey = `${item.id}-hover`;

            // States for each video
            // Default to false (not playing) because autoPlay is removed
            const isPrimaryPlaying = playingStates[primaryVideoKey] ?? false;
            const isSecondaryPlaying = playingStates[secondaryVideoKey] ?? false;
            const isPrimaryMuted = mutedStates[primaryVideoKey] === true;
            const isSecondaryMuted = mutedStates[secondaryVideoKey] === true;
            const activeVideoIndex = activeVideoStates[item.id] ?? 0; // 0 for primary, 1 for secondary

            return (
              <motion.div
                key={item.id}
                className={`cursor-pointer relative ${!isLandscape && index % 2 !== 0 ? 'md:mt-32' : ''}`}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.7, delay: (index % 2) * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* External Controls for Primary Video (Dual Video Frames Only) */}
                {hasDualVideos && (
                  <div
                    className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 ${isLeftColumn ? '-left-16' : '-right-16'
                      }`}
                  >
                    <VideoControls
                      videoKey={primaryVideoKey}
                      isPlaying={isPrimaryPlaying}
                      isMuted={isPrimaryMuted}
                      variant="external"
                    />
                  </div>
                )}

                {/* Vertical Sliding Image/Video Window */}
                <div className={`group relative ${aspectClass} overflow-hidden bg-brand-gray mb-6 md:mb-8 rounded-sm shadow-sm transition-colors duration-500`}>

                  {item.video ? (
                    item.hoverVideo ? (
                      /* Dual Video Slider - slides up on hover or via state */
                      <div 
                        className={`absolute inset-0 w-full h-[200%] transition-transform duration-[800ms] ease-[cubic-bezier(0.6,0.01,-0.05,0.9)] will-change-transform ${
                          activeVideoIndex === 1 ? '-translate-y-1/2' : 'translate-y-0'
                        } group-hover:-translate-y-1/2`}
                      >
                        {/* Primary Video (Top) */}
                        <div className="h-1/2 w-full overflow-hidden">
                          {isYouTube(item.video) ? (
                            <div className="w-full h-full relative z-0 bg-brand-gray flex items-center justify-center overflow-hidden">
                              <iframe
                                ref={(el) => { videoRefs.current[primaryVideoKey] = el as any }}
                                className="w-full h-full relative z-10"
                                src={getYouTubeEmbedUrl(item.video)}
                                allow="encrypted-media"
                                allowFullScreen
                                frameBorder="0"
                                style={getYouTubeIframeStyle(item.video, !isLandscape, item.id === '1' ? '5%' : '0%')}
                              ></iframe>
                            </div>
                          ) : (
                            <video
                              ref={(el) => { videoRefs.current[primaryVideoKey] = el }}
                              src={item.video}
                              className="w-full h-full object-cover transition-all duration-[800ms] group-hover:scale-110"
                              loop
                              muted
                              playsInline
                              controls
                              preload="none"
                              poster={item.image}
                            />
                          )}
                        </div>

                        {/* Secondary Video (Bottom) */}
                        <div className="h-1/2 w-full overflow-hidden">
                          {isYouTube(item.hoverVideo!) ? (
                            <div className="w-full h-full relative z-0 bg-brand-gray flex items-center justify-center overflow-hidden">
                              <iframe
                                ref={(el) => { videoRefs.current[secondaryVideoKey] = el as any }}
                                className="w-full h-full relative z-10"
                                src={getYouTubeEmbedUrl(item.hoverVideo!)}
                                allow="encrypted-media"
                                allowFullScreen
                                frameBorder="0"
                                style={getYouTubeIframeStyle(item.hoverVideo!, !isLandscape)}
                              ></iframe>
                            </div>
                          ) : (
                            <video
                              ref={(el) => { videoRefs.current[secondaryVideoKey] = el }}
                              src={item.hoverVideo}
                              className="w-full h-full object-cover transition-all duration-[800ms] group-hover:scale-110"
                              loop
                              muted
                              playsInline
                              controls
                              preload="none"
                              poster={item.hoverImage}
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Single Video Display */
                      <div className="absolute inset-0 w-full h-full">
                        {isYouTube(item.video!) ? (
                          <div className="w-full h-full relative z-0 bg-brand-gray flex items-center justify-center overflow-hidden">
                            {/* The YouTube Iframe - Always visible to show the exact paused frame */}
                            <iframe
                              ref={(el) => { videoRefs.current[primaryVideoKey] = el as any }}
                              className="w-full h-full relative z-10"
                              src={getYouTubeEmbedUrl(item.video!)}
                              allow="encrypted-media"
                              allowFullScreen
                              frameBorder="0"
                              style={getYouTubeIframeStyle(item.video!, !isLandscape, item.id === '1' ? '5%' : '0%')}
                            ></iframe>
                          </div>
                        ) : (
                          <video
                            ref={(el) => { videoRefs.current[primaryVideoKey] = el }}
                            src={item.video}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            controls
                            preload="none"
                            poster={item.image}
                          />
                        )}
                      </div>
                    )
                  ) : (
                    /* Image Slider */
                    <div 
                      className={`absolute inset-0 w-full h-[200%] transition-transform duration-[800ms] ease-[cubic-bezier(0.6,0.01,-0.05,0.9)] will-change-transform ${
                        activeVideoIndex === 1 ? '-translate-y-1/2' : 'translate-y-0'
                      } group-hover:-translate-y-1/2`}
                    >

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
                  <div className="absolute inset-0 bg-brand-black/5 group-hover:bg-brand-black/0 transition-colors duration-700 pointer-events-none z-30"></div>

                  {/* Action UI - Controls for Secondary Video (or Primary if single video) */}
                  <div className="absolute bottom-6 left-6 right-6 z-40 flex justify-between items-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="flex items-center gap-3">
                      {hasVideo && (
                        <VideoControls
                          videoKey={hasDualVideos ? secondaryVideoKey : primaryVideoKey}
                          isPlaying={hasDualVideos ? isSecondaryPlaying : isPrimaryPlaying}
                          isMuted={hasDualVideos ? isSecondaryMuted : isPrimaryMuted}
                          variant="internal"
                        />
                      )}
                    </div>
                    <span className="text-[10px] text-brand-muted font-mono tracking-tighter">
                      [{index + 1}/08]
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-6 left-6 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="px-3 py-1 border border-brand-white/20 backdrop-blur-md rounded-full text-[8px] uppercase tracking-widest text-brand-white">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Mobile Toggles and External Controls - Repositioned to avoid overlap */}
                {hasDualVideos && (
                  <div className="md:hidden flex flex-col gap-4 mb-6 -mt-2">
                    {/* Primary/Secondary Toggle */}
                    <div className="flex bg-brand-white/5 rounded-full p-1 border theme-border w-fit">
                      <button
                        onClick={() => setActiveVideoStates(prev => ({ ...prev, [item.id]: 0 }))}
                        className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${
                          activeVideoIndex === 0 ? 'bg-brand-white text-brand-black' : 'text-brand-muted hover:text-brand-white'
                        }`}
                      >
                        Primary
                      </button>
                      <button
                        onClick={() => setActiveVideoStates(prev => ({ ...prev, [item.id]: 1 }))}
                        className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${
                          activeVideoIndex === 1 ? 'bg-brand-white text-brand-black' : 'text-brand-muted hover:text-brand-white'
                        }`}
                      >
                        Secondary
                      </button>
                    </div>

                    {/* Controls for the currently active video */}
                    <div className="flex items-center gap-1.5 p-1.5 bg-brand-white/5 rounded-full border border-brand-white/10 scale-90 origin-left">
                      <span className="text-[7px] uppercase tracking-wider text-brand-muted px-2">
                        {activeVideoIndex === 0 ? 'Primary' : 'Secondary'} Video Controls
                      </span>
                      <VideoControls
                        videoKey={activeVideoIndex === 0 ? primaryVideoKey : secondaryVideoKey}
                        isPlaying={activeVideoIndex === 0 ? isPrimaryPlaying : isSecondaryPlaying}
                        isMuted={activeVideoIndex === 0 ? isPrimaryMuted : isSecondaryMuted}
                        variant="external"
                      />
                    </div>
                  </div>
                )}

                {/* Static Text Info */}
                <div className="flex justify-between items-start z-20 relative pointer-events-none">
                  <motion.div
                     initial={{ opacity: 0, x: -10 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-xl md:text-2xl font-serif mb-2 transition-colors group-hover:italic">{item.title}</h3>
                    <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-brand-muted font-sans font-bold">Role: Lead Editor</p>
                  </motion.div>
                  <motion.p 
                    className="font-serif italic text-brand-muted transition-colors text-sm md:text-base"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {item.year}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
