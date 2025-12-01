import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CaseStudy } from '../types';
import { X, ArrowUpRight } from 'lucide-react';
import { useTheme } from './ThemeContext';

const cases: CaseStudy[] = [
  { id: 1, client: 'Apex Heavy Industries', title: 'Automated Rig', year: '2023', image: 'https://picsum.photos/seed/rig/1200/800?grayscale', description: 'Complete overhaul of automated drilling interfaces for deep-sea extraction units. Focused on high-contrast visibility and tactile feedback loops.' },
  { id: 2, client: 'Orbital Defense', title: 'Hud System 4.0', year: '2024', image: 'https://picsum.photos/seed/hud/1200/800?grayscale', description: 'Next-generation heads-up display for low-orbit defense pilots. Reducing cognitive load through adaptive data filtering and minimalist brutalist UI.' },
  { id: 3, client: 'NeuraNet', title: 'Server Farm Arch', year: '2025', image: 'https://picsum.photos/seed/serverfarm/1200/800?grayscale', description: 'Physical architectural design for cooling-efficient server farms. Leveraging raw concrete thermal mass and directed airflow tunnels.' },
];

const CaseStudies: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleOpen = (id: number) => {
    setActiveId(id);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    gsap.to(contentRef.current, { y: 100, opacity: 0, duration: 0.3 });
    gsap.to(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      onComplete: () => {
        setActiveId(null);
        document.body.style.overflow = '';
      } 
    });
  };

  useEffect(() => {
    if (activeId !== null && overlayRef.current && contentRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(contentRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power3.out" }
      );
    }
  }, [activeId]);

  const activeCase = cases.find(c => c.id === activeId);

  return (
    <section className={`py-32 px-4 md:px-12 relative z-30 transition-colors duration-500 ${isDark ? 'bg-[#0f0f0f] text-[#f0f0f0]' : 'bg-black text-white'}`}>
      <div className={`flex flex-col md:flex-row justify-between items-end mb-24 border-b-4 pb-8 transition-colors duration-500 ${isDark ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-white text-white'}`}>
        <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">
          Case<br />Studies
        </h2>
        <div className="text-right font-mono text-sm uppercase mt-8 md:mt-0">
          [ Archive Access ] <br /> Level 5 Clearance
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {cases.map((c) => (
          <div 
            key={c.id} 
            className={`group relative border-t-2 transition-colors duration-300 py-12 cursor-pointer ${isDark ? 'border-zinc-800 hover:border-[#CCFF00] hover:text-[#CCFF00]' : 'border-gray-800 hover:border-white'}`}
            onClick={() => handleOpen(c.id)}
            data-hover="true"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 pointer-events-none">
              <span className="font-mono text-gray-500 mb-2 md:mb-0">0{c.id} // {c.year}</span>
              <h3 className="text-4xl md:text-6xl font-bold uppercase group-hover:translate-x-4 transition-transform duration-300">
                {c.client}
              </h3>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
            </div>
            {/* Hover Reveal Image Background */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
               <img src={c.image} className="w-full h-full object-cover grayscale" alt="" />
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Overlay */}
      {activeId !== null && activeCase && (
        <div ref={overlayRef} className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12">
          <button 
            onClick={handleClose} 
            className={`absolute top-8 right-8 transition-transform duration-300 z-50 p-4 border bg-black hover:rotate-90 ${isDark ? 'text-[#CCFF00] border-[#CCFF00]' : 'text-white border-white'}`}
            data-hover="true"
          >
            <X size={32} />
          </button>
          
          <div ref={contentRef} className={`bg-black border-4 w-full max-w-6xl h-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row ${isDark ? 'border-[#CCFF00] text-[#f0f0f0]' : 'border-white text-white'}`}>
            <div className={`w-full md:w-1/2 h-[50vh] md:h-full relative border-b-4 md:border-b-0 md:border-r-4 ${isDark ? 'border-[#CCFF00]' : 'border-white'}`}>
              <img src={activeCase.image} alt={activeCase.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
              <div className="absolute bottom-8 left-8">
                 <h2 className={`text-6xl font-black uppercase leading-none ${isDark ? 'text-[#CCFF00]' : 'text-white'}`}>{activeCase.title}</h2>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
               <div className="mb-12">
                 <span className={`font-mono text-sm border px-2 py-1 uppercase ${isDark ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-white text-white'}`}>Client: {activeCase.client}</span>
                 <span className={`font-mono text-sm border px-2 py-1 uppercase ml-4 ${isDark ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-white text-white'}`}>Year: {activeCase.year}</span>
               </div>
               <p className="text-2xl md:text-3xl leading-snug font-bold uppercase mb-8">
                 {activeCase.description}
               </p>
               <div className="mt-auto pt-12 border-t border-gray-800">
                 <div className="grid grid-cols-2 gap-4 font-mono text-sm text-gray-400">
                   <div>[ Role ] <br/> <span className={isDark ? 'text-[#CCFF00]' : 'text-white'}>Lead Design</span></div>
                   <div>[ Duration ] <br/> <span className={isDark ? 'text-[#CCFF00]' : 'text-white'}>6 Months</span></div>
                   <div>[ Deliverables ] <br/> <span className={isDark ? 'text-[#CCFF00]' : 'text-white'}>UI, UX, Hardware</span></div>
                   <div>[ Status ] <br/> <span className={isDark ? 'text-[#CCFF00]' : 'text-white'}>Deployed</span></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudies;
