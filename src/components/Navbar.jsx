import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-cinematic-text hover:text-cinematic-accent focus:outline-none"
            aria-label="Open Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay / Side Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[75%] max-w-sm bg-cinematic-bg border-l border-cinematic-gray/50 px-8 py-20 flex flex-col justify-between md:hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-8 text-cinematic-text hover:text-cinematic-accent transition-colors duration-300"
                aria-label="Close Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Menu items */}
              <div className="flex flex-col space-y-8 text-lg uppercase tracking-widest font-medium mt-10">
                <a
                  href="#work"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-cinematic-muted hover:text-cinematic-accent transition-colors duration-300 py-2 border-b border-cinematic-gray/20"
                >
                  Work
                </a>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAboutOpen(true);
                  }}
                  className="text-left text-cinematic-muted hover:text-cinematic-accent transition-colors duration-300 py-2 border-b border-cinematic-gray/20 uppercase tracking-widest font-medium"
                >
                  About
                </button>
                <a
                  href="#skills"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-cinematic-muted hover:text-cinematic-accent transition-colors duration-300 py-2 border-b border-cinematic-gray/20"
                >
                  Skills
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-cinematic-muted hover:text-cinematic-accent transition-colors duration-300 py-2 border-b border-cinematic-gray/20"
                >
                  Contact
                </a>
              </div>

              {/* Drawer Footer info */}
              <div className="flex flex-col space-y-2">
                <div className="text-xs tracking-widest uppercase text-cinematic-muted/50 font-medium">
                  Sooraj KC
                </div>
                <div className="text-[10px] tracking-widest uppercase text-cinematic-accent/60 font-serif italic lowercase">
                  portfolio
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                  I mainly focus on creating realistic and cinematic scenes(loves to try others too).
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl whitespace-pre-wrap">
                  When I work on a project I will be really obsessed with it until i see the end result. I always try to create better projects and I really like to try out new tools and softwares.
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl">
                  .................................
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl">
                  I did my degree in Bsc animation and vfx from vismayasmax college
                </p>
              <p className="text-base md:text-xl font-light leading-relaxed max-w-3xl">
                get in touch with me for any other info
              </p>
              <div className="pt-6 flex flex-wrap gap-4 justify-center">
                <a
                  href="/images/cv/Sooraj kc CV.pdf?v=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/25 hover:border-cinematic-accent text-white font-semibold uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:text-cinematic-accent transition-all duration-400 group rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-y-[-2px] transition-transform duration-300"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                  View CV
                </a>
              </div>
          </motion.div>
            </div>
    </motion.div >
        )}
      </AnimatePresence >
    </>
  );
};

export default Navbar;
