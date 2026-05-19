import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';

const FRAME_COUNT = 124;
const IMAGES_DIR = '/images/ygrlow';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);

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
              Hi! I am <br /> <span className="text-[#a256ff]">Sooraj</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 max-w-2xl font-sans mx-auto md:mx-0">
              3D Artist.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-cinematic-text/80 mb-12 max-w-2xl font-serif italic mx-auto md:mx-0">
              focused on cinematography.
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
              Every pixel meticulously crafted for perfection.
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="px-10 py-4 mt-8 bg-transparent border border-cinematic-text/30 text-white font-medium uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:border-cinematic-accent transition-all duration-400 group relative overflow-hidden">
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
            <ul className="text-xl md:text-2xl lg:text-3xl font-light text-cinematic-text/80 mb-12 max-w-2xl font-serif italic mx-auto md:mx-0 list-none space-y-3">
              <li><span className="text-[#a256ff] mr-3">✦</span>Just completed digree (you could be the first)</li>
              <li><span className="text-[#a256ff] mr-3">✦</span></li>
              <li><span className="text-[#a256ff] mr-3">✦</span></li>
              <li><span className="text-[#a256ff] mr-3">✦</span></li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
