import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-6 px-8 md:px-16 flex justify-between items-center bg-cinematic-bg/80 backdrop-blur-md border-b border-cinematic-gray/50"
      >
        <div className="flex items-baseline gap-3">
          <div className="text-xl md:text-2xl font-bold tracking-tight text-white">
            SOORAJ KC
          </div>
          <div className="text-sm md:text-base font-serif italic text-cinematic-accent tracking-widest lowercase">
            portfolio
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-medium text-cinematic-muted">
          <a href="#work" className="hover:text-cinematic-accent transition-colors duration-300">Work</a>
          <button onClick={() => setIsAboutOpen(true)} className="hover:text-cinematic-accent transition-colors duration-300 uppercase tracking-widest">About</button>
          <a href="#skills" className="hover:text-cinematic-accent transition-colors duration-300">Skills</a>
          <a href="#contact" className="hover:text-cinematic-accent transition-colors duration-300">Contact</a>
        </div>

        <div className="md:hidden flex items-center">
          <button className="text-cinematic-text hover:text-cinematic-accent focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* About Overlay */}
      <AnimatePresence>
        {isAboutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md px-6 py-12"
            onClick={() => setIsAboutOpen(false)}
          >
            <div
              className="max-w-4xl text-center flex flex-col items-center space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsAboutOpen(false)}
                className="absolute top-8 right-8 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 font-sans text-white/80"
              >
                <p className="text-xl md:text-3xl font-medium text-white mb-8">
                  Hi iam Sooraj KC, a 3d artist from kerala, india.
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl">
                  I mainly focus on creating realistic and cinimatic scenes(loves to try others too).
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl whitespace-pre-wrap">
                  When I work on a project I will be really obsessed with it until isee the end. I always try to create better projects and I really like to try out new tools and softwares.
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl">
                  I always try to create better projects.
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl">
                  I am good at problem solving and always keep the deadline
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl">
                  I did my digree in Bsc animation and vfx
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
