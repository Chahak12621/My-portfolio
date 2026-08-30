import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, strength = 0.35 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.querySelector('*') || container;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const bounding = child.getBoundingClientRect();
      const x = clientX - (bounding.left + bounding.width / 2);
      const y = clientY - (bounding.top + bounding.height / 2);

      gsap.to(child, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(child);
    };
  }, [strength]);

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
