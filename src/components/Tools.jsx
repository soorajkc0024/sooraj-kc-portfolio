import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, MonitorPlay, Scissors, Video, Wand2, Paintbrush } from 'lucide-react';

const Tools = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const tools = [
    { name: 'Blender', image: '/images/softwarelogo/blenderlogo.png' },
    { name: 'Unreal Engine', image: '/images/softwarelogo/uelogo.png' },
    { name: 'Marvelous Designer', image: '/images/softwarelogo/marvelousdlogo.png' },
    { name: 'Premiere Pro', image: '/images/softwarelogo/prlogo.png' },
    { name: 'DaVinci Resolve', image: '/images/softwarelogo/davicilogo.png' },
    { name: 'Substance Painter', image: '/images/softwarelogo/substanceplogo.png' },
    { name: 'Photoshop', image: '/images/softwarelogo/pslogo.png' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="skills" ref={containerRef} className="w-full py-32 px-8 md:px-24 bg-cinematic-bg border-t border-cinematic-gray/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-xs uppercase tracking-[0.3em] text-cinematic-accent mb-4 font-bold">Pipeline</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Mainly used tools</h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12 items-center"
        >
          {tools.map((tool, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col items-center justify-center space-y-5 cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-500 ease-out transform group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0">
                  <img src={tool.image} alt={tool.name} className="w-full h-full object-contain mix-blend-screen" />
                </div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-cinematic-muted/40 group-hover:text-white transition-colors duration-500 text-center">
                  {tool.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
