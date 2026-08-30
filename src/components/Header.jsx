import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <a href="#home" className="logo" onClick={(e) => handleLinkClick(e, '#home')}>
          <span className="logo-dot">.</span>portfolio
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Magnetic strength={0.25}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="nav-link"
                  >
                    {link.name}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta-wrapper">
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="cta-button"
            >
              Let's Talk <ArrowUpRight className="cta-icon" size={16} />
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div className={`mobile-nav ${isOpen ? 'mobile-nav-open' : ''}`}>
          <ul>
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                style={{
                  transitionDelay: isOpen ? `${index * 0.1}s` : '0s',
                }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="mobile-nav-link"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li
              style={{
                transitionDelay: isOpen ? `${navLinks.length * 0.1}s` : '0s',
              }}
            >
              <a
                href="mailto:ca1262004@gmail.com?subject=Portfolio%20Inquiry"
                className="mobile-cta"
              >
                Let's Talk <ArrowUpRight size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
