import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    id: 1,
    type: 'Internship',
    date: 'July 2026 - Aug 2026',
    role: 'Machine Learning Engineer',
    company: 'Auracle Labs',
    description: 'Responsible for training and fine-tuning, researching and deploying ML models , frontend development of ML applications.',
    icon: <Briefcase size={18} />,
  },
  {
    id: 2,
    type: 'Internship',
    date: '2026 - present',
    role: 'AI Engineer',
    company: 'Alpgen AI',
    description: 'Worked on multiple AI projects , deploying , fine-tuning and developing AI models.',
    icon: <Briefcase size={18} />,
  },
  {
    id: 3,
    type: 'education',
    date: '2024 - present',
    role: 'BS in data science',
    company: 'Indian Institute of Technology , Madras',
    description: 'Specializing in statistical analysis , machine learning , and AI model development.',
    icon: <GraduationCap size={18} />,
  },
  {
    id: 4,
    type: 'education',
    date: '2023 - 2026',
    role: 'B.Sc. in Computer Science',
    company: 'Barkatullah University',
    description: 'Specialized in Software Engineering and Human-Computer Interaction. Developed a passion for computer graphics and procedural canvas animations.',
    icon: <GraduationCap size={18} />,
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title trigger
      gsap.fromTo(
        '.exp-title-wrapper',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.exp-title-wrapper',
            start: 'top 85%',
          },
        }
      );

      // Timeline entries stagger fade-in
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 75%',
          },
        }
      );

      // SVG Timeline Line drawing animation
      const line = lineRef.current;
      if (line) {
        const pathLength = line.getTotalLength();

        // Prepare line path for drawing
        gsap.set(line, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="section experience-section">
      <div className="container">
        <div className="exp-title-wrapper">
          <span className="subtitle-label">JOURNEY</span>
          <h2 className="section-title">Experience & Education</h2>
        </div>

        <div className="timeline-container">
          {/* Animated SVG Path for the center vertical line */}
          <div className="timeline-svg-wrapper">
            <svg
              width="4"
              height="100%"
              viewBox="0 0 4 100"
              preserveAspectRatio="none"
              className="timeline-svg"
            >
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100"
                stroke="rgba(40, 90, 72, 0.3)"
                strokeWidth="2"
              />
              <path
                ref={lineRef}
                d="M 2 0 L 2 100"
                stroke="#b0e4cc"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Timeline Nodes */}
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'}`}
            >
              {/* Point Node Circle */}
              <div className="timeline-node glass-panel">
                {item.icon}
              </div>

              {/* Card Container */}
              <div className="timeline-content glass-panel accent-glow">
                <span className="timeline-date">{item.date}</span>
                <h3 className="timeline-role">{item.role}</h3>
                <span className="timeline-company">{item.company}</span>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
