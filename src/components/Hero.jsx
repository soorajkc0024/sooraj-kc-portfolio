import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 124;
const IMAGES_DIR = '/images/ygrlow';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [showreelOpen, setShowreelOpen] = useState(false);

  // Disable body scroll when showreel is open
  useEffect(() => {
    if (showreelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [showreelOpen]);

  // Track scroll progress within the Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to be 3 digits e.g., 000, 001, ... 123
      const num = i.toString().padStart(3, '0');
      img.src = `${IMAGES_DIR}/grlow seq${num}.png`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          // Trigger initial draw
          if (canvasRef.current) {
            drawFrame(0, loadedImages);
          }
        }
      };

      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawFrame = (index, imageArray = images) => {
    if (!canvasRef.current || !imageArray[index] || !imageArray[index].complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw image to fill canvas (cover)
    const img = imageArray[index];
    if (img.width === 0 || img.height === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Map scroll progress (0 to 1) to frame index (0 to 123)
  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Apply a spring to smooth out the frame transition even after scroll stops
  const frameIndex = useSpring(rawFrameIndex, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(Math.floor(latest));
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.floor(frameIndex.get()));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  // Initial draw
  useEffect(() => {
    if (images.length > 0 && images[0].complete) {
      drawFrame(0);
    }
  }, [images]);

  // Text Animations
  // Scene 1: Introduction (0 to 0.3)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [1, 1, 0, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const text1PointerEvents = useTransform(scrollYProgress, (v) => v < 0.2 ? 'auto' : 'none');

  // Scene 2: Feature 1 (0.3 to 0.6)
  const text2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [50, 0, 0, -50]);
  const text2PointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.2 && v < 0.6) ? 'auto' : 'none');

  // Scene 3: Feature 2 (0.6 to 0.9)
  const text3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [50, 0, 0, -50]);
  const text3PointerEvents = useTransform(scrollYProgress, (v) => v >= 0.5 ? 'auto' : 'none');

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-cinematic-bg">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center md:justify-start px-8 md:px-24">
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80 brightness-[1.2] contrast-110"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-cinematic-bg/30 to-cinematic-bg/90 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-bg/90 via-transparent to-transparent pointer-events-none"></div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-4xl text-center md:text-left pt-20 h-full flex flex-col justify-center">

          {/* Scene 1 Text */}
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y, pointerEvents: text1PointerEvents }}
            className="absolute inset-x-0 md:inset-auto md:w-full px-8 md:px-0"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-none mb-6 font-sans">
              Hi! I am <br /> <span className="bg-gradient-to-r from-[#6d1bff] via-[#a256ff] to-[#d5b3ff] bg-clip-text text-transparent inline-block">Sooraj</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 max-w-2xl font-sans mx-auto md:mx-0">
              3D Genetalist
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-cinematic-text/80 mb-12 max-w-2xl font-serif italic mx-auto md:mx-0">
              focused on cinematography
            </p>
            <div className="flex justify-center md:justify-start gap-6 items-center">
              <a href="#work" className="px-8 py-4 bg-white text-black font-semibold uppercase tracking-[0.15em] text-sm hover:bg-cinematic-accent hover:text-white transition-all duration-300">
                View My Work
              </a>
              <span className="animate-bounce text-cinematic-text/50 uppercase tracking-widest text-xs ml-4">
                Scroll to explore ↓
              </span>
            </div>
          </motion.div>

          {/* Scene 2 Text */}
          <motion.div
            style={{ opacity: text2Opacity, y: text2Y, pointerEvents: text2PointerEvents }}
            className="absolute inset-x-0 md:inset-auto md:w-full px-8 md:px-0"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none mb-6 font-sans">
              Intricate Details
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-cinematic-text/80 mb-12 max-w-2xl font-serif italic mx-auto md:mx-0">
              Every pixel crafted for perfection.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => setShowreelOpen(true)}
                className="px-10 py-4 mt-8 bg-transparent border border-cinematic-text/30 text-white font-medium uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:border-cinematic-accent transition-all duration-400 group relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-cinematic-accent transition-colors duration-400">View Showreel</span>
              </button>
            </div>
          </motion.div>

          {/* Scene 3 Text */}
          <motion.div
            style={{ opacity: text3Opacity, y: text3Y, pointerEvents: text3PointerEvents }}
            className="absolute inset-x-0 md:inset-auto md:w-full px-8 md:px-0"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-none mb-6 font-sans">
              Ex jobs
            </h2>
            <ul className="text-xl md:text-2xl lg:text-3xl font-light text-cinematic-text/80 mb-12 max-w-2xl font-serif italic mx-auto md:mx-0 list-none space-y-3 text-left w-fit md:w-auto">
              <li><span className="text-[#a256ff] mr-3">✦</span>Just completed degree (you could be the first)</li>
              <li><span className="text-[#a256ff] mr-3">✦</span></li>
              <li><span className="text-[#a256ff] mr-3">✦</span></li>
              <li><span className="text-[#a256ff] mr-3">✦</span></li>
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Showreel Video Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          >
            <button
              onClick={() => setShowreelOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white z-50 text-sm md:text-xl font-sans uppercase tracking-widest hover:text-cinematic-accent transition-colors"
            >
              Close
            </button>

            <a
              href="https://youtu.be/1GzH9CYjPV4"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 md:top-8 md:left-8 text-white z-50 text-xs md:text-sm font-sans uppercase tracking-widest hover:text-cinematic-accent transition-all duration-300 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-white/10 hover:border-cinematic-accent bg-black/40 backdrop-blur-sm rounded"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555a3.002 3.002 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>

            <div className="w-full max-w-6xl flex flex-col items-center">
              {/* Quality Compression Warning Banner */}
              <div className="flex items-center gap-3 bg-cinematic-gray/80 border border-cinematic-accent/35 rounded px-4 py-3 text-cinematic-text/90 text-xs md:text-sm tracking-wide shadow-2xl mb-6 max-w-fit animate-fade-in backdrop-blur-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cinematic-accent">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>The quality of the video is not at best due to compression for the website.</span>
              </div>

              <motion.video
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src="/videos/otherwrk/Soorajshowreel.mp4"
                autoPlay
                controls
                className="w-full h-auto max-h-[72vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white/5 rounded"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
