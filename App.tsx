import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Timeline from './components/Timeline';
import CaseStudies from './components/CaseStudies';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins globally
gsap.registerPlugin(ScrollTrigger);

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-8 right-8 z-[9999] px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
        theme === 'dark' 
          ? 'border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black' 
          : 'border-white text-white hover:bg-white hover:text-black mix-blend-difference'
      }`}
      data-hover="true"
    >
      [{theme === 'default' ? 'Light_Mode' : 'Dark_Mode'}]
    </button>
  );
}

const MainContent: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Re-run scrolltrigger refresh when theme changes to ensure pin spacings are correct
  useEffect(() => {
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [theme]);

  return (
    <main className={`min-h-screen w-full relative selection:bg-white selection:text-black transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-black'}`}>
      <CustomCursor />
      <ThemeToggle />
      
      {/* Grid Background Lines */}
      <div className={`fixed inset-0 pointer-events-none z-0 flex justify-between px-4 md:px-12 opacity-10 transition-colors duration-500`}>
        <div className={`w-px h-full ${theme === 'dark' ? 'bg-[#CCFF00]' : 'bg-white'}`}></div>
        <div className={`w-px h-full ${theme === 'dark' ? 'bg-[#CCFF00]' : 'bg-white'}`}></div>
        <div className={`w-px h-full ${theme === 'dark' ? 'bg-[#CCFF00]' : 'bg-white'} hidden md:block`}></div>
        <div className={`w-px h-full ${theme === 'dark' ? 'bg-[#CCFF00]' : 'bg-white'} hidden md:block`}></div>
        <div className={`w-px h-full ${theme === 'dark' ? 'bg-[#CCFF00]' : 'bg-white'}`}></div>
      </div>

      <div ref={scrollRef}>
        <Hero />
        <Timeline />
        <ProductGrid />
        <CaseStudies />
        <Contact />
      </div>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

export default App;
