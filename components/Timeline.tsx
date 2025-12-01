import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, PenTool, Box, Truck } from 'lucide-react';
import { ProcessStep } from '../types';
import { useTheme } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const steps: ProcessStep[] = [
  { id: 1, title: 'Analysis', description: 'Deconstructing the problem space through rigorous material auditing.', icon: 'Settings' },
  { id: 2, title: 'Prototyping', description: 'Rapid iteration using industrial-grade additive manufacturing.', icon: 'PenTool' },
  { id: 3, title: 'Fabrication', description: 'Precision machining and automated assembly lines.', icon: 'Box' },
  { id: 4, title: 'Deployment', description: 'Global logistics and on-site integration protocols.', icon: 'Truck' },
];

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const scrollWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: () => -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${container.scrollWidth}`,
        invalidateOnRefresh: true,
      }
    });

  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Settings': return <Settings size={64} />;
      case 'PenTool': return <PenTool size={64} />;
      case 'Box': return <Box size={64} />;
      case 'Truck': return <Truck size={64} />;
      default: return <Settings size={64} />;
    }
  };

  return (
    <section ref={sectionRef} className={`relative h-screen overflow-hidden flex items-center z-20 transition-colors duration-500 ${isDark ? 'bg-[#0f0f0f] text-[#f0f0f0]' : 'bg-white text-black'}`}>
      <div className="absolute top-8 left-8 z-10">
        <h2 className={`text-6xl font-black uppercase tracking-tighter border-b-4 pb-2 ${isDark ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-black'}`}>Process_Log</h2>
      </div>

      <div ref={containerRef} className="flex flex-nowrap h-full items-center px-24">
        {/* Intro Slide */}
        <div className="min-w-[50vw] px-12">
            <p className="text-4xl font-bold max-w-xl leading-tight">
              WE OPERATE AT THE INTERSECTION OF <span className={`px-2 ${isDark ? 'bg-[#CCFF00] text-black' : 'bg-black text-white'}`}>BRUTE FORCE</span> AND SURGICAL PRECISION.
            </p>
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`min-w-[40vw] md:min-w-[30vw] h-[60vh] border-l-4 flex flex-col justify-between p-8 mx-4 transition-all duration-500 group
              ${isDark 
                ? 'border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black' 
                : 'border-black hover:bg-black hover:text-white'
              }`} 
            data-hover="true"
          >
            <div className="flex justify-between items-start">
              <span className="text-8xl font-black opacity-20 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
              <div className="group-hover:rotate-90 transition-transform duration-500">
                {getIcon(step.icon)}
              </div>
            </div>
            
            <div>
              <h3 className="text-5xl font-black uppercase mb-6 tracking-tighter">{step.title}</h3>
              <p className="font-mono text-sm leading-relaxed border-t-2 border-current pt-4">
                {step.description}
              </p>
            </div>
          </div>
        ))}
        
        {/* Outro Slide */}
        <div className="min-w-[50vw] px-12 flex items-center justify-center">
             <div className={`text-9xl font-black uppercase tracking-tighter ${isDark ? 'text-[#CCFF00]' : ''}`}>
                END OF LINE
             </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className={`absolute bottom-0 left-0 h-4 w-full origin-left transform scale-x-0 ${isDark ? 'bg-[#CCFF00]' : 'bg-black'}`} id="progress"></div>
    </section>
  );
};

export default Timeline;
