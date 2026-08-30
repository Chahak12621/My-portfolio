import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on mobile/touch devices
    const isTouchDevice = !window.matchMedia('(pointer: fine)').matches;
    if (isTouchDevice) return;

    // Enable custom cursor styles on body
    document.body.classList.add('custom-cursor-active');
    setIsVisible(true);

    const dot = dotRef.current;
    const ring = ringRef.current;

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Position the inner dot immediately
      gsap.set(dot, { x: mouse.x, y: mouse.y });
    };

    // Quick lerp function for smooth ring lag
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const tick = () => {
      ringPos.x = lerp(ringPos.x, mouse.x, 0.15);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.15);

      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animId = requestAnimationFrame(tick);

    // Hover effect handlers
    const addHoverState = (e) => {
      const target = e.currentTarget;
      let scale = 3.5;
      
      // Customize cursor scaling or styling if element has attributes
      if (target.getAttribute('data-cursor') === 'large') {
        scale = 5;
      }

      gsap.to(ring, {
        scale: scale,
        backgroundColor: 'rgba(176, 228, 204, 0.15)',
        borderColor: '#b0e4cc',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.2,
      });
    };

    const removeHoverState = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: '#b0e4cc',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
      });
    };

    // Keep track of active listeners to clean up
    let hoverElements = [];

    const setupListeners = () => {
      const clickables = document.querySelectorAll('a, button, [data-cursor], .magnetic, input, textarea, select');
      hoverElements = Array.from(clickables);
      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', addHoverState);
        el.addEventListener('mouseleave', removeHoverState);
      });
    };

    // Initial setup and a MutationObserver to bind to new items dynamically
    setupListeners();

    const observer = new MutationObserver(() => {
      // Clean up previous listeners
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', addHoverState);
        el.removeEventListener('mouseleave', removeHoverState);
      });
      setupListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Handle mouse leaving window
    const handleMouseLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const handleMouseEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      observer.disconnect();
      
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', addHoverState);
        el.removeEventListener('mouseleave', removeHoverState);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#b0e4cc',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1.5px solid #b0e4cc',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
