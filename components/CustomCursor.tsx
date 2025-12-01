import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-hover="true"]')) {
        gsap.to(cursor, { scale: 0, duration: 0.2 });
        gsap.to(follower, { scale: 3, backgroundColor: 'white', mixBlendMode: 'difference', duration: 0.3 });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, { scale: 1, backgroundColor: 'transparent', mixBlendMode: 'normal', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-colors"
      />
    </>
  );
};

export default CustomCursor;