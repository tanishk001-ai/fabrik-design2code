import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from './ThemeContext';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = text.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      gsap.to(text, {
        x: x * 50,
        y: y * 50,
        rotation: x * 10,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer ref={containerRef} className={`min-h-screen flex flex-col justify-between p-8 md:p-12 relative overflow-hidden z-20 transition-colors duration-500 ${isDark ? 'bg-black text-[#f0f0f0]' : 'bg-white text-black'}`}>
      <div className={`w-full border-b-4 pb-4 flex justify-between items-end ${isDark ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-black'}`}>
        <span className="font-mono uppercase text-lg">[ Contact Protocol ]</span>
        <span className="font-mono uppercase text-lg">Status: Online</span>
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        <h1 
          ref={textRef}
          className={`text-[12vw] leading-none font-black uppercase text-center cursor-pointer select-none transition-colors duration-300 hover:text-transparent hover:bg-clip-text hover:bg-black hover:stroke-black`}
          style={{ 
            WebkitTextStroke: isDark ? '2px #CCFF00' : '2px black',
            color: isDark ? '#CCFF00' : 'black'
          }}
          data-hover="true"
        >
          Let's<br/>Build<br/>Future
        </h1>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 border-t-4 pt-8 ${isDark ? 'border-[#CCFF00]' : 'border-black'}`}>
        <div>
          <h3 className={`font-bold uppercase mb-4 ${isDark ? 'text-[#CCFF00]' : ''}`}>Coordinates</h3>
          <p className="font-mono text-sm">
            40.7128° N, 74.0060° W<br/>
            Sector 7G, Industrial District<br/>
            New York, NY 10013
          </p>
        </div>
        <div>
          <h3 className={`font-bold uppercase mb-4 ${isDark ? 'text-[#CCFF00]' : ''}`}>Frequency</h3>
          <p className="font-mono text-sm">
            <a href="mailto:hello@fabrik.studio" className={`px-1 transition-colors ${isDark ? 'hover:bg-[#CCFF00] hover:text-black' : 'hover:bg-black hover:text-white'}`}>hello@fabrik.studio</a><br/>
            +1 (555) 019-2834
          </p>
        </div>
        <div className="flex justify-end items-end">
           <h2 className={`text-4xl font-black uppercase ${isDark ? 'text-[#CCFF00]' : ''}`}>Fabrik &copy; 2024</h2>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
