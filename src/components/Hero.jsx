import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Hero() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. GSAP Text Reveal Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo(
        '.hero-title-line span',
        { y: '100%' },
        { y: '0%', stagger: 0.15, delay: 0.3 }
      );
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.8'
      );
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.8'
      );
      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );
    }, containerRef);

    // 2. Interactive Canvas Particles Background
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    const connectionDistance = 120;
    const mouse = { x: null, y: null, radius: 180 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2.5 + 1.5;
        this.baseRadius = this.radius;
      }

      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Push particles away
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
            this.radius = this.baseRadius * (1 + force * 0.8);
          } else {
            if (this.radius > this.baseRadius) {
              this.radius -= 0.1;
            }
          }
        }
      }

      draw() {
        gl.beginPath();
        gl.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        gl.fillStyle = 'rgba(176, 228, 204, 0.45)'; // Mint color with alpha
        gl.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            gl.beginPath();
            gl.moveTo(particles[i].x, particles[i].y);
            gl.lineTo(particles[j].x, particles[j].y);
            gl.strokeStyle = `rgba(176, 228, 204, ${alpha})`;
            gl.lineWidth = 0.8;
            gl.stroke();
          }
        }
      }
    };

    const animate = () => {
      gl.clearRect(0, 0, width, height);

      // Draw background ambient glow
      const gradient = gl.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      gradient.addColorStop(0, 'rgba(40, 90, 72, 0.12)'); // Deep forest glow
      gradient.addColorStop(0.6, 'rgba(9, 20, 19, 0)');
      gl.fillStyle = gradient;
      gl.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleScrollClick = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="home" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <div className="hero-title-line">
              <span>Decision</span>
            </div>
            <br />
            <div className="hero-title-line">
              <span>Scientist</span>
            </div>
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            I build scalable, data-driven AI solutions that transform complex  business problems into intelligent, automated systems—bridging the gap between raw data , raw code numerical insights and actionable business impact.
          </p>

          <div ref={ctaRef} className="hero-actions">
            <Magnetic strength={0.2}>
              <a href="#projects" className="hero-btn-primary">
                View My Work
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#contact" className="hero-btn-secondary">
                Get In Touch
              </a>
            </Magnetic>
          </div>
        </div>

        <button
          className="scroll-indicator"
          onClick={handleScrollClick}
          aria-label="Scroll down"
        >
          <span className="scroll-text">SCROLL TO DISCOVER</span>
          <div className="scroll-icon-wrapper">
            <ArrowDown className="scroll-arrow" size={16} />
          </div>
        </button>
      </div>
    </section>
  );
}
