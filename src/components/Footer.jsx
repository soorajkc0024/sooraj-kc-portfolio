import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const WhatsappIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const Footer = () => {
  const containerRef = useRef(null);

  const handleMobileOnlyClick = (e) => {
    if (typeof window !== 'undefined') {
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
      if (!isMobile) {
        e.preventDefault();
      }
    }
  };
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0.5, 1]);

  return (
    <footer id="contact" ref={containerRef} className="w-full bg-[#030303] pt-32 pb-12 px-8 md:px-24 border-t border-cinematic-gray/20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        <motion.h2
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter mb-12 text-center"
        >
          Get in Touch
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          href="https://mail.google.com/mail/?view=cm&fs=1&to=soorajkc0024@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-xl text-cinematic-muted hover:text-white transition-colors duration-300 mb-20 pb-2 border-b border-cinematic-gray hover:border-cinematic-accent inline-flex items-center gap-3"
        >
          <Mail size={20} />
          soorajkc0024@gmail.com
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cinematic-gray/30 space-y-6 md:space-y-0"
        >
          <div className="text-cinematic-muted text-xs tracking-widest uppercase">
            © 2026 Sooraj. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
            <a href="tel:9400440024" onClick={handleMobileOnlyClick} className="text-cinematic-muted hover:text-white transition-colors duration-300 flex items-center gap-2 group md:cursor-default">
              <span className="w-8 h-8 rounded-full border border-cinematic-gray flex items-center justify-center group-hover:border-cinematic-accent transition-colors duration-300">
                <Phone size={14} />
              </span>
              <span className="text-xs uppercase tracking-widest sr-only md:not-sr-only md:inline-block">9400440024</span>
            </a>
            <a href="https://wa.me/919400440024" target="_blank" rel="noopener noreferrer" onClick={handleMobileOnlyClick} className="text-cinematic-muted hover:text-white transition-colors duration-300 flex items-center gap-2 group md:cursor-default">
              <span className="w-8 h-8 rounded-full border border-cinematic-gray flex items-center justify-center group-hover:border-cinematic-accent transition-colors duration-300">
                <WhatsappIcon size={14} />
              </span>
              <span className="text-xs uppercase tracking-widest sr-only md:not-sr-only md:inline-block">9400440024</span>
            </a>
            <a href="https://www.instagram.com/s.oor.a_j/?hl=en" target="_blank" rel="noopener noreferrer" className="text-cinematic-muted hover:text-white transition-colors duration-300 flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-full border border-cinematic-gray flex items-center justify-center group-hover:border-cinematic-accent transition-colors duration-300">
                <Instagram size={14} />
              </span>
              <span className="text-xs uppercase tracking-widest sr-only md:not-sr-only md:inline-block">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/in/sooraj-kc-06461240b" target="_blank" rel="noopener noreferrer" className="text-cinematic-muted hover:text-white transition-colors duration-300 flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-full border border-cinematic-gray flex items-center justify-center group-hover:border-cinematic-accent transition-colors duration-300">
                <Linkedin size={14} />
              </span>
              <span className="text-xs uppercase tracking-widest sr-only md:not-sr-only md:inline-block">LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
