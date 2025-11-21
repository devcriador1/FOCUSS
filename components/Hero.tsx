import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const yButton = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden w-full">
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto"
        style={{ y: yText, opacity: opacityText }}
      >
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-cyber font-bold tracking-tighter mb-4 relative inline-block">
            <span className="relative z-10 text-white mix-blend-difference">FOCUSSDEV</span>
            <span className="absolute top-0 left-1 text-[#00ff41] -z-10 opacity-70 animate-pulse">FOCUSSDEV</span>
            <span className="absolute top-0 -left-1 text-[#ff00c1] -z-10 opacity-70 animate-pulse delay-75">FOCUSSDEV</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-[#00ff41] font-mono max-w-3xl mx-auto tracking-wide border-r-4 border-[#00ff41] pr-4">
            SOLUÇÕES DIGITAIS & INVESTIGAÇÃO
          </p>
        </div>
        
        <motion.div 
          className="flex justify-center gap-6 mt-12"
          style={{ y: yButton }}
        >
          <a 
            href="#services" 
            className="group relative px-8 py-4 bg-transparent border border-[#00ff41] text-[#00ff41] font-bold font-cyber tracking-widest hover:bg-[#00ff41] hover:text-black transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">EXPLORAR SERVIÇOS</span>
            <div className="absolute top-0 -left-full w-full h-full bg-[#00ff41] transform skew-x-12 group-hover:translate-x-full transition-transform duration-500 opacity-20"></div>
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-[#00ff41]"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={32} />
      </motion.div>
      
      {/* Vignette and Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20"></div>
    </section>
  );
};

export default Hero;