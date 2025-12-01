import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 1,
        pin: true,
      }
    });

    tl.to(leftPanelRef.current, { xPercent: -100, ease: "none" }, 0)
      .to(rightPanelRef.current, { xPercent: 100, ease: "none" }, 0)
      .to(textRef.current, { scale: 1.5, opacity: 0, ease: "power2.in" }, 0);

    gsap.fromTo(textRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
    );

  }, []);

  const isDark = theme === 'dark';

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden z-50 bg-black">
      {/* Underlying Content Reveal Hint */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <h2 className={`text-[10vw] font-bold uppercase tracking-widest animate-pulse ${isDark ? 'text-[#CCFF00]/20' : 'text-white/10'}`}>
          Scroll to Enter
        </h2>
      </div>

      {/* Left Panel */}
      <div ref={leftPanelRef} className={`absolute inset-y-0 left-0 w-1/2 flex items-center justify-end pr-4 z-10 border-r-4 transition-colors duration-500 ${isDark ? 'bg-[#0f0f0f] border-[#CCFF00]' : 'bg-white border-black'}`}>
        <div className={`h-full w-full bg-[url('https://picsum.photos/seed/industrial_noise/800/1200?grayscale')] bg-cover absolute top-0 left-0 ${isDark ? 'opacity-20 mix-blend-luminosity' : 'opacity-10 mix-blend-multiply'}`}></div>
      </div>

      {/* Right Panel */}
      <div ref={rightPanelRef} className={`absolute inset-y-0 right-0 w-1/2 bg-black flex items-center justify-start pl-4 z-10 border-l-4 transition-colors duration-500 ${isDark ? 'border-[#CCFF00]' : 'border-white'}`}>
         <div className="h-full w-full bg-[url('https://picsum.photos/seed/brutal_concrete/800/1200?grayscale')] bg-cover opacity-30 mix-blend-overlay absolute top-0 right-0"></div>
      </div>

      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <h1 ref={textRef} className={`text-[15vw] leading-none font-black uppercase text-transparent bg-clip-text bg-gradient-to-b tracking-tighter transition-all duration-500 ${isDark ? 'from-[#CCFF00] to-green-900 mix-blend-normal' : 'from-white to-gray-400 mix-blend-difference'}`} data-hover="true">
          Fabrik
        </h1>
      </div>
      
      <div className={`absolute bottom-10 left-10 z-20 text-xs font-mono uppercase tracking-widest mix-blend-difference ${isDark ? 'text-[#CCFF00]' : 'text-white'}`}>
        [ Est. 2024 ] <br/> Industrial Design Systems
      </div>
      
      <div className={`absolute bottom-10 right-10 z-20 text-xs font-mono uppercase tracking-widest text-right mix-blend-difference ${isDark ? 'text-[#CCFF00]' : 'text-white'}`}>
        Scroll to<br/>Initiate Sequence
      </div>
    </section>
  );
};

export default Hero;
