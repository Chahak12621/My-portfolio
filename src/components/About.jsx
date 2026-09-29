import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Zap, Code, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        '.about-title-wrapper',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.about-title-wrapper',
            start: 'top 85%',
          },
        }
      );

      // Bio text reveal
      gsap.fromTo(
        '.about-text-column p',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about-text-column',
            start: 'top 80%',
          },
        }
      );

      // Feature cards stagger reveal
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 75%',
          },
        }
      );

      // Skill categories reveal
      gsap.fromTo(
        '.skill-category',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.skills-wrapper',
            start: 'top 80%',
          },
        }
      );

      // Skill pills stagger
      gsap.fromTo(
        '.skill-pill',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.03,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.skills-wrapper',
            start: 'top 75%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Code size={24} className="feature-icon" />,
      title: 'Clean Engineering',
      desc: 'Writing semantic, maintainable, and high-performance  code structure.',
    },
    {
      icon: <Zap size={24} className="feature-icon" />,
      title: 'AI development',
      desc: 'Developing and deploying AI models,Fine-tuning models ,  enhancing UX without compromising speed.',
    },
    {
      icon: <Award size={24} className="feature-icon" />,
      title: 'Data Science',
      desc: 'Crafting end to end story from the data , insightful decision making based on data',
    },
  ];

  const skillCategories = [
    {
      title: 'Frontend Tech',
      skills: ['React', 'JavaScript (ES6+)', 'HTML5 / CSS', 'Vite', 'Next.js', 'TailwindCSS'],
    },
    {
      title: 'Data Analytics',
      skills: ['Numpy', 'Pandas', 'BeautifulSoup', 'PowerBi', 'Ms Excel'],
    },
    {
      title: 'Machine learning & Deep learning',
      skills: ['Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'Jupyter Notebook'],
    },
    {
      title: 'Tools and Workflows',
      skills: ['Git & GitHub', 'Figma', 'VS Code', 'Chrome DevTools', 'Vercel', 'Postman', 'Oxlint'],
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="section about-section">
      {/* Background radial gradient */}
      <div className="about-bg-glow" />

      <div className="container">
        <div className="about-title-wrapper">
          <span className="subtitle-label">WHO I AM</span>
          <h2 className="section-title">Elevating Code into Digital Art</h2>
        </div>

        <div className="about-grid">
          <div className="about-text-column">
            <p>
              I am a Decision Scientist and Agentic AI enthusiast with a strong foundation in  machine learning and data analytics.
              My journey combines the logical precision of a developer with the analytical curiosity of a data scientist.
              I specialize in building intelligent systems that translate complex data into actionable insights and seamless user experiences.
            </p>
            <p>
              Driven by a passion for innovation, I am constantly exploring the intersection of AI and real-world problem-solving.
              Whether it's predicting trends, automating workflows, or uncovering hidden patterns, I am dedicated to
              pushing the boundaries of what's possible with data.
            </p>

            <div className="features-container">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="feature-card glass-panel accent-glow"
                >
                  <div className="feature-icon-wrapper">{feat.icon}</div>
                  <div>
                    <h3 className="feature-title">{feat.title}</h3>
                    <p className="feature-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-column">
            <div className="skills-wrapper glass-panel">
              <h3 className="skills-column-title">Tech Stack & Mastery</h3>
              <p className="skills-column-subtitle">
                Tools and technologies I use to bring interfaces to life:
              </p>

              <div className="skills-categories-grid">
                {skillCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="skill-category">
                    <h4 className="skill-category-title">{cat.title}</h4>
                    <div className="skill-pills-container">
                      {cat.skills.map((skill) => (
                        <span key={skill} className="skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
