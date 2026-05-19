import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const containerRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedBtsProject, setSelectedBtsProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedVideo || selectedBtsProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedVideo, selectedBtsProject]);

  const projects = [
    {
      id: 1,
      title: 'Samurai jaeger',
      category: 'inspired from pasafic rim, Learned render leyers,passes,compositing',
      description: 'This project was made ispired from the movie pasafic rim (2013).My goal was to make a realistic movie like shot. This project tought me a lot of things by over coming many issues mainly like render passes and leyers and compositing , mechanichal parts modeling, advanced rigging, lighting etc',
      image: '/images/thumbnail/jeager.png',
      video: '/videos/mainworks/pasaficrim.mp4',
      logos: ['blenderlogo.png', 'davicilogo.png', 'substanceplogo.png'],
      btsMedia: [
        { type: 'image', url: '/bts/pasafic/fusion.png' },
        { type: 'video', url: '/bts/pasafic/handrig.mp4' },
        { type: 'image', url: '/bts/pasafic/jgrmdl.png' },
        { type: 'image', url: '/bts/pasafic/kaijumdl.png' },
        { type: 'image', url: '/bts/pasafic/psftxtr.png' },
        { type: 'image', url: '/bts/pasafic/unlit.png' },
        { type: 'image', url: '/bts/pasafic/wiper.png' }
      ]
    },
    {
      id: 2,
      title: 'Knight VS lightning',
      category: 'mystical theme, Learned simulations and lighting',
      description: 'This project was made with the intention of creating a mystical story and environment.\nIt helped me learn fire simulations and advanced blender geometry node uses.',
      image: '/images/thumbnail/knight.png',
      video: '/videos/mainworks/knight.mp4',
      logos: ['blenderlogo.png', 'uelogo.png', 'marvelousdlogo.png', 'substanceplogo.png', 'davicilogo.png', 'prlogo.png'],
      btsMedia: [
        { type: 'image', url: '/bts/knight/kfusion.png' },
        { type: 'image', url: '/bts/knight/kvp1.png' },
        { type: 'image', url: '/bts/knight/kvp2.png' },
        { type: 'image', url: '/bts/knight/kvp3.png' },
        { type: 'image', url: '/bts/knight/kvp4.png' },
        { type: 'image', url: '/bts/knight/kvp5.png' },
        { type: 'image', url: '/bts/knight/kvp6.png' },
        { type: 'image', url: '/bts/knight/kvp7.png' },
        { type: 'image', url: '/bts/knight/kvp8.png' }
      ]
    },
    {
      id: 3,
      title: 'Origami',
      category: 'typography exersise done for college',
      description: 'This was a project I done for my college for an assingnment called typography exercise in which you are given a word and you make an short animated scene for it. i got the word ORIGAMI so i did it bases on Sadako sasaki a girl who became a victim of the atomic bombing of Hiroshima ',
      image: '/images/thumbnail/origami.png',
      video: '/videos/wrkvd/origami.mp4',
      logos: ['blenderlogo.png', 'marvelousdlogo.png', 'prlogo.png'],
      btsMedia: [
        { type: 'image', url: '/bts/orugami/editing.png' },
        { type: 'image', url: '/bts/orugami/ovp1.png' },
        { type: 'image', url: '/bts/orugami/ovp2.png' },
        { type: 'image', url: '/bts/orugami/ovp3.png' }
      ]
    },
    {
      id: 4,
      title: 'Web slinger',
      category: 'spiderman comic inspired, Learned advaced animation',
      description: 'This project was done over my love for spiderman series , and wanted to make somthing different so i picked th cowboy spider man in comics which is not very famous to make a realastic shot.\nThis project helped me to learn about advanced animation , metahumans , sound design',
      image: '/images/thumbnail/patric.png',
      video: '/videos/mainworks/webslinger.mp4',
      logos: ['blenderlogo.png', 'uelogo.png', 'substanceplogo.png', 'davicilogo.png'],
      btsMedia: [
        { type: 'image', url: '/bts/webslinger/aniseqence.png' },
        { type: 'image', url: '/bts/webslinger/editing.png' },
        { type: 'image', url: '/bts/webslinger/metahuman.png' },
        { type: 'image', url: '/bts/webslinger/refference.png' },
        { type: 'image', url: '/bts/webslinger/vp1.png' },
        { type: 'image', url: '/bts/webslinger/vp2.png' },
        { type: 'image', url: '/bts/webslinger/vp3.png' },
        { type: 'image', url: '/bts/webslinger/vp4.png' }
      ]
    },
    {
      id: 5,
      title: 'Clothing Ad',
      category: 'commercial work done for a clothing company',
      image: '/images/thumbnail/outfitthumbnaail.png',
      video: '/videos/otherwrk/clothingad.mp4',
      logos: ['blenderlogo.png'],
    },
  ];

  return (
    <section id="work" ref={containerRef} className="w-full py-32 px-4 md:px-12 lg:px-24 bg-[#050505] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-cinematic-gray/50 pb-10"
        >
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-cinematic-accent mb-4 font-bold">Selected Works</h2>
          </div>
          <div className="mt-8 md:mt-0 text-cinematic-muted text-sm tracking-widest uppercase">
            [ 2024 - 2026 ]
          </div>
        </motion.div>

        {/* Headphone Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-16 text-cinematic-text/70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-cinematic-accent/80">
            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
          </svg>
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-light">use headphones for better experience</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {(showAllProjects ? projects : projects.slice(0, 4)).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedVideo(project.video)}
              className="group cursor-pointer relative overflow-hidden aspect-video bg-cinematic-gray cinematic-shadow"
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col justify-end p-8">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <h4 className="text-3xl font-bold text-white tracking-tight mb-2">
                    {project.title}
                  </h4>
                  <p className="text-sm font-light text-cinematic-accent tracking-wide font-serif italic mb-4">
                    {project.category}
                  </p>
                  {project.logos && (
                    <div className="flex flex-wrap gap-4 mb-6">
                      {project.logos.map((logo, idx) => (
                        <img
                          key={idx}
                          src={`/images/softwarelogo/${logo}`}
                          alt="software logo"
                          className="h-6 w-auto object-contain opacity-90 drop-shadow-md"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedVideo(project.video); }}
                      className="px-4 py-2 border border-white/30 text-white text-xs uppercase tracking-widest hover:border-cinematic-accent transition-colors duration-300"
                    >
                      Play Video
                    </button>
                  </div>
                </div>
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              {project.btsMedia && project.btsMedia.length > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedBtsProject(project); }}
                  className="absolute bottom-4 right-4 z-20 px-4 py-2 border border-white/30 bg-black/50 backdrop-blur-sm text-white text-xs uppercase tracking-widest hover:border-cinematic-accent hover:bg-black/80 transition-all duration-300"
                >
                  See More
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="px-12 py-5 border border-cinematic-gray text-cinematic-text uppercase tracking-[0.2em] text-xs hover:border-cinematic-accent hover:text-white transition-all duration-300"
          >
            {showAllProjects ? 'View Less' : 'View All Projects'}
          </button>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-8 right-8 text-white z-50 text-xl font-sans uppercase tracking-widest hover:text-cinematic-accent transition-colors"
            >
              Close
            </button>
            
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
                key={selectedVideo}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src={selectedVideo}
                autoPlay
                controls
                className="w-full h-auto max-h-[72vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white/5 rounded"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BTS Media Modal */}
      <AnimatePresence>
        {selectedBtsProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
          >
            <div 
              className="absolute inset-0 overflow-y-auto py-12 flex items-center justify-center"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedBtsProject(null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-6xl px-4 flex flex-col gap-8 my-auto"
              >
                <h3 className="text-3xl font-bold text-white mb-4 text-center tracking-tight">{selectedBtsProject.title} - Behind the Scenes</h3>
                {selectedBtsProject.description && (
                  <p className="text-base md:text-lg text-cinematic-muted text-center max-w-4xl mx-auto mb-8 whitespace-pre-wrap">
                    {selectedBtsProject.description}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedBtsProject.btsMedia.map((media, index) => (
                    <div key={index} className="w-full bg-cinematic-gray/20 rounded overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      {media.type === 'video' ? (
                        <video
                          src={media.url}
                          autoPlay
                          muted
                          loop
                          controls
                          className="w-full h-auto object-cover"
                        />
                      ) : (
                        <img
                          src={media.url}
                          alt="Behind the scenes"
                          className="w-full h-auto object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <button
              onClick={() => setSelectedBtsProject(null)}
              className="absolute top-8 right-8 text-white z-50 text-xl font-sans uppercase tracking-widest hover:text-cinematic-accent transition-colors bg-black/50 px-4 py-2"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
