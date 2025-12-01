import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../types';
import { useTheme } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const products: Product[] = [
  { id: 1, title: 'KINETIC ARM', category: 'Robotics', image: 'https://picsum.photos/seed/robot/600/600?grayscale' },
  { id: 2, title: 'VOID SHELL', category: 'Wearable', image: 'https://picsum.photos/seed/shell/600/600?grayscale' },
  { id: 3, title: 'NEURAL LINK', category: 'Interface', image: 'https://picsum.photos/seed/tech/600/600?grayscale' },
  { id: 4, title: 'AERO DUCT', category: 'Automotive', image: 'https://picsum.photos/seed/car/600/600?grayscale' },
  { id: 5, title: 'CORE REACTOR', category: 'Energy', image: 'https://picsum.photos/seed/energy/600/600?grayscale' },
  { id: 6, title: 'SYNTH SKIN', category: 'Material', image: 'https://picsum.photos/seed/material/600/600?grayscale' },
  { id: 7, title: 'OPTIC LENS', category: 'Vision', image: 'https://picsum.photos/seed/lens/600/600?grayscale' },
  { id: 8, title: 'DATA HIVE', category: 'Infrastructure', image: 'https://picsum.photos/seed/server/600/600?grayscale' },
  { id: 9, title: 'ZERO GRAV', category: 'Aerospace', image: 'https://picsum.photos/seed/space/600/600?grayscale' },
];

const ProductGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".product-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
          });
        },
        once: true
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const img = target.querySelector('.product-img');
    const overlay = target.querySelector('.product-overlay');
    const text = target.querySelector('.product-text');

    gsap.to(target, { zIndex: 10, scale: 1.05, duration: 0.4, ease: "elastic.out(1, 0.75)" });
    gsap.to(img, { scale: 1.1, duration: 0.4 });
    gsap.to(overlay, { opacity: 0.8, duration: 0.3 });
    gsap.fromTo(text, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, delay: 0.1 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const img = target.querySelector('.product-img');
    const overlay = target.querySelector('.product-overlay');
    
    gsap.to(target, { zIndex: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(img, { scale: 1, duration: 0.4 });
    gsap.to(overlay, { opacity: 0, duration: 0.3 });
  };

  return (
    <section ref={gridRef} className={`py-32 px-4 md:px-12 border-t-4 relative z-10 transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a] border-[#CCFF00]' : 'bg-black border-white'}`}>
      <div className="mb-24">
        <h2 className={`text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4 ${isDark ? 'text-[#CCFF00]' : 'text-white'}`}>
          Output
        </h2>
        <div className={`w-full h-1 ${isDark ? 'bg-[#CCFF00]' : 'bg-white'}`}></div>
        <p className={`font-mono text-right mt-2 uppercase text-sm ${isDark ? 'text-[#CCFF00]/60' : 'text-white/60'}`}>[ Selected Works 2023-2025 ]</p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-1 border-2 transition-colors duration-500 ${isDark ? 'bg-[#CCFF00] border-[#CCFF00]' : 'bg-white border-white'}`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card group relative aspect-square bg-black overflow-hidden border border-white/10 cursor-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-hover="true"
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className={`product-img w-full h-full object-cover transition-all duration-500 ${isDark ? 'opacity-80 mix-blend-luminosity' : 'opacity-60'}`}
            />
            {/* Overlay */}
            <div className={`product-overlay absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none ${isDark ? 'bg-[#CCFF00]/20' : 'bg-black'}`}></div>
            
            {/* Diagonal Lines Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0wIDNMMyAwSDEgNEwwIDRaIiBmaWxsPSIjMDAwIi8+Cjwvc3ZnPg==')] pointer-events-none"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center pointer-events-none">
              <div className="product-text opacity-0 transform translate-y-4">
                 <h3 className={`text-4xl font-black uppercase tracking-wider mb-2 ${isDark ? 'text-[#CCFF00]' : 'text-white mix-blend-difference'}`}>{product.title}</h3>
                 <p className={`font-mono text-xs px-2 py-1 inline-block border ${isDark ? 'bg-black text-[#CCFF00] border-[#CCFF00]' : 'text-white bg-black border-white'}`}>{product.category}</p>
              </div>
            </div>
            
            {/* Corner Markers */}
            <div className={`absolute top-2 left-2 w-2 h-2 border-t border-l opacity-50 ${isDark ? 'border-[#CCFF00]' : 'border-white'}`}></div>
            <div className={`absolute bottom-2 right-2 w-2 h-2 border-b border-r opacity-50 ${isDark ? 'border-[#CCFF00]' : 'border-white'}`}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
