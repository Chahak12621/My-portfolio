import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        '.contact-title-wrapper',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.contact-title-wrapper',
            start: 'top 85%',
          },
        }
      );

      // Form card reveal
      gsap.fromTo(
        '.contact-form-wrapper',
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-wrapper',
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);

    // Mock API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Animate success card
      gsap.fromTo(
        successRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );

      setForm({ name: '', email: '', message: '' });
    }, 1800);
  };

  return (
    <section ref={containerRef} id="contact" className="section contact-section">
      {/* Background ambient light */}
      <div className="contact-bg-glow" />

      <div className="container">
        <div className="contact-title-wrapper">
          <span className="subtitle-label">GET IN TOUCH</span>
          <h2 className="section-title">Let's Create Together</h2>
        </div>

        <div className="contact-form-wrapper glass-panel">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name Field */}
              <div className={`form-group ${form.name ? 'form-group-active' : ''}`}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <label htmlFor="name">Chahak Adwani</label>
                <div className="input-line" />
              </div>

              {/* Email Field */}
              <div className={`form-group ${form.email ? 'form-group-active' : ''}`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <label htmlFor="email">[EMAIL_ADDRESS]</label>
                <div className="input-line" />
              </div>

              {/* Message Field */}
              <div className={`form-group ${form.message ? 'form-group-active' : ''}`}>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
                <label htmlFor="message">Project Description / Message</label>
                <div className="input-line" />
              </div>

              <div className="form-submit-wrapper">
                <Magnetic strength={0.15}>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="spinner-text">Sending...</span>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          ) : (
            <div ref={successRef} className="contact-success">
              <div className="success-icon-wrapper">
                <CheckCircle size={48} className="success-icon" />
              </div>
              <h3 className="success-title">Message Sent Successfully!</h3>
              <p className="success-text">
                Thank you for reaching out. I have received your message and will get back to you within 24 hours.
              </p>
              <Magnetic strength={0.2}>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="success-btn"
                >
                  Send Another Message
                </button>
              </Magnetic>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
