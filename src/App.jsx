import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  // 1. Lenis Smooth Scroll Setup
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const animId = requestAnimationFrame(raf);

    // Tell GSAP to use Lenis scroll values
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, [loading]);

  // 2. Preloader Animation Sequence
  useEffect(() => {
    const loadingWords = ['DESIGN', 'DEVELOPMENT', 'MOTION', 'CREATION'];
    let wordIdx = 0;
    const wordEl = document.querySelector('.loader-word');

    const interval = setInterval(() => {
      if (wordIdx < loadingWords.length - 1) {
        wordIdx++;
        if (wordEl) {
          gsap.fromTo(wordEl, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, text: loadingWords[wordIdx] }
          );
        }
      } else {
        clearInterval(interval);
        
        // Final fadeout timeline
        const tl = gsap.timeline({
          onComplete: () => {
            setLoading(false);
          }
        });
        
        tl.to('.loader-word', { opacity: 0, scale: 0.9, duration: 0.4 })
          .to('.preloader-screen', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // slide up clip-path
            duration: 0.8,
            ease: 'power4.inOut'
          });
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 3. Preloader Overlay */}
      {loading && (
        <div className="preloader-screen">
          <div className="loader-content">
            <span className="loader-dot-pulse"></span>
            <div className="loader-text-wrapper">
              <span className="loader-word">DESIGN</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Portfolio Main Page */}
      <div className={`app-wrapper ${loading ? 'app-locked' : ''}`}>
        <CustomCursor />
        <Header />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
