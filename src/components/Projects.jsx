import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Folder } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = ({ size = 18, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectsData = [
  {
    id: 1,
    title: 'Quiz management App',
    category: 'Development',
    description: 'A smart way to manage , attempt quiz , admins can create subjects chapters , design dpps , launch them for students , watch analysis and improve.',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/Chahak12621',
    demo: '#',
    imageBg: 'linear-gradient(135deg, #1b3a30 0%, #091413 100%)',
  },
  {
    id: 2,
    title: 'Edzee',
    category: 'Development',
    description: 'a smart AI quiz generator , paste your notes and generate quiz , attempt and analyse.',
    tags: ['Next.js', 'Supabase', 'GrokApi'],
    github: 'https://github.com/Chahak12621/Edzee',
    demo: 'https://edzee.vercel.app',
    imageBg: 'linear-gradient(135deg, #285a48 0%, #091413 100%)',
  },
  {
    id: 3,
    title: 'Vehicle parking management',
    category: 'Fullstack',
    description: 'a vehicle parking management system for colleges.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Chahak12621',
    demo: '#',
    imageBg: 'linear-gradient(135deg, #0f2d25 0%, #091413 100%)',
  },
  {
    id: 4,
    title: 'RiskFera AI',
    category: 'Machine learning',
    description: 'An AI-powered platform for shortlisting companies and output the best company to merge with solving mergers and acquisition problem',
    tags: ['Tensorflow', 'Scikit-learn', 'Python'],
    github: 'https://github.com/Chahak12621',
    demo: '#',
    imageBg: 'linear-gradient(135deg, #408a71 0%, #091413 100%)',
  },
  {
    id: 5,
    title: 'Finance AI',
    category: 'Artificial Intelligence',
    description: 'An ai powered paltform for managing personal , household finances',
    tags: ['React', 'Python', 'MongoDB', 'google adk', 'google cloud'],
    github: 'https://github.com/Chahak12621/finance-ai',
    demo: 'https://alpigen-connect.vercel.app',
    imageBg: 'linear-gradient(135deg, #408a71 0%, #091413 100%)',
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title trigger
      gsap.fromTo(
        '.projects-title-wrapper',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.projects-title-wrapper',
            start: 'top 85%',
          },
        }
      );

      // Cards load
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Handle filter changes with animations
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    // GSAP fadeout grid cards
    gsap.to('.project-card', {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.25,
      stagger: 0.05,
      onComplete: () => {
        // Filter the data
        const newFiltered = filter === 'All'
          ? projectsData
          : projectsData.filter(proj => proj.category === filter);

        setFilteredProjects(newFiltered);

        // GSAP animate new cards back in
        gsap.fromTo('.project-card',
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
        );
      }
    });
  };

  const categories = ['All', 'Development', 'Machine learning', 'Fullstack'];

  return (
    <section ref={containerRef} id="projects" className="section projects-section">
      <div className="container">
        <div className="projects-title-wrapper">
          <span className="subtitle-label">RECENT WORK</span>
          <h2 className="section-title">Selected Projects</h2>

          {/* Filters Grid */}
          <div className="filter-buttons-container">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`filter-btn ${activeFilter === cat ? 'filter-btn-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card glass-panel accent-glow">
              {/* Project Visual Area */}
              <div
                className="project-image-wrapper"
                style={{ background: project.imageBg }}
              >
                <div className="project-icon-badge">
                  <Folder size={22} className="project-badge-svg" />
                </div>
                <div className="project-preview-mockup">
                  <span className="project-preview-title">{project.title}</span>
                  <div className="project-preview-bars">
                    <div className="preview-bar" style={{ width: '80%' }}></div>
                    <div className="preview-bar" style={{ width: '60%' }}></div>
                    <div className="preview-bar" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>

              {/* Project Content Area */}
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <Magnetic strength={0.2}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                      aria-label={`GitHub Repository for ${project.title}`}
                    >
                      <GithubIcon size={18} /> Repo
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.2}>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn project-link-btn-accent"
                      aria-label={`Live Demo for ${project.title}`}
                    >
                      Live Demo <ArrowUpRight size={16} />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
