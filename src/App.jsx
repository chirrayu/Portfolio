import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GradientBlinds from './components/GradientBlinds';
import SplitText from './components/SplitText';
import BorderGlow from './components/BorderGlow';
import Dock from './components/Dock';
import { VscHome, VscTools, VscMortarBoard, VscRocket, VscMail, VscVerified, VscOrganization } from 'react-icons/vsc';
import LightPillar from './components/LightPillar';
import './index.css';

const copyEmail = () => {
  navigator.clipboard.writeText('chirrayusharma@gmail.com').then(() => {
    alert('Email copied to clipboard!');
  });
};

const projectsData = [
  {
    title: "WheelsOnRent",
    description: "Developed secure vehicle rental platform with OTP verification, vendor dash, and RESTful APIs.",
    tags: ["Flask", "REST API"],
    github: "https://github.com/chirrayu",
    website: "https://github.com/chirrayu",
    glowColor: "180 100 50",
    colors: ['#00f2ff', '#0077ff', '#bc13fe']
  },
  {
    title: "UPES Complaint Portal",
    description: "Created an advanced complaint management system for UPES students with Flask, MongoDB, and JWT-based authentication, streamlining issue tracking and resolution.",
    tags: ["Flask", "REST API", "JWT", "MongoDB", "GitHub"],
    github: "https://github.com/chirrayu",
    website: "https://github.com/chirrayu",
    glowColor: "180 100 50",
    colors: ['#00f2ff', '#38bdf8', '#c084fc']
  },
  {
    title: "Banking System",
    description: "Terminal-based simulator in C featuring account creation, persistent file handling, and transactions.",
    tags: ["C", "File Systems"],
    github: "https://github.com/chirrayu",
    website: "https://github.com/chirrayu",
    glowColor: "280 100 50",
    colors: ['#bc13fe', '#8b5cf6', '#3b82f6']
  },
  {
    title: "CodeHustle",
    description: "Hypervision Hackathon portal contributor. Optimized UI responsiveness and onboarding flows.",
    tags: ["UI/UX", "Integration"],
    github: "https://github.com/chirrayu",
    website: "https://github.com/chirrayu",
    glowColor: "180 100 50",
    colors: ['#00f2ff', '#0ea5e9', '#2dd4bf']
  }
];

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">{project.title}</h2>
        <p className="modal-description">{project.description}</p>
        <div className="modal-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="modal-actions">
          <a href={project.github} target="_blank" rel="noreferrer" className="modal-btn github">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href={project.website} target="_blank" rel="noreferrer" className="modal-btn website">
            <i className="fas fa-external-link-alt"></i> Website
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="hero">
      <div className="hero-photo">
        <img src="/static/img/profile.jpg" alt="Chirrayu Sharma" />
      </div>
      <SplitText
        text="CHIRRAYU SHARMA"
        className="hero-title"
        delay={8}
        animationDuration={0.8}
        duration={0.2}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        tag="h1"
      />
      <p className="hero-subtitle">CS Engineering @ UPES | AI/ML & Cyber Security</p>
      <div className="quote-box">
        I am a dedicated Computer Science Engineering student at UPES, India, with a deep interest in software development,
        artificial intelligence, and cyber security. From building secure vehicle rental platforms to simulating complex banking systems,
        I thrive on solving real-world challenges through clean, efficient code.
        <p style={{ marginTop: '1.5rem', fontWeight: '500' }}>Currently focused on: <span style={{ color: 'var(--primary)' }}>Cyber Security</span></p>
        <div className="quote-signature">— Driven by curiosity, powered by goals.</div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'var(--cream)', fontSize: '2.5rem', marginBottom: '3rem' }}>Technical Stack</h2>
        <div className="skills-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <div className="skill-category">
            <h3>Languages</h3>
            <div style={{ marginBottom: '1.2rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}><span>Python / C</span></div><div className="skill-bar"><div className="skill-progress" style={{ '--percent': '90%' }}></div></div></div>
            <div style={{ marginBottom: '1.2rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}><span>JavaScript (Learning) / SQL</span></div><div className="skill-bar"><div className="skill-progress" style={{ '--percent': '65%' }}></div></div></div>
            <div style={{ marginBottom: '1.2rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}><span>MongoDB</span></div><div className="skill-bar"><div className="skill-progress" style={{ '--percent': '60%' }}></div></div></div>
          </div>
          <div className="skill-category">
            <h3>Tools & Frameworks</h3>
            <div style={{ marginBottom: '1.2rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}><span>Flask / Selenium</span></div><div className="skill-bar"><div className="skill-progress" style={{ '--percent': '80%' }}></div></div></div>
            <div style={{ marginBottom: '1.2rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}><span>Git / Linux</span></div><div className="skill-bar"><div className="skill-progress" style={{ '--percent': '85%' }}></div></div></div>
          </div>
          <div className="skill-category">
            <h3>Cloud & Concepts</h3>
            <div style={{ marginBottom: '1.2rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}><span>AWS / Azure</span></div><div className="skill-bar"><div className="skill-progress" style={{ '--percent': '75%' }}></div></div></div>
            <div style={{ marginBottom: '1.2rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}><span>DSA / REST APIs</span></div><div className="skill-bar"><div className="skill-progress" style={{ '--percent': '80%' }}></div></div></div>
            <div style={{ marginBottom: '1.2rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}><span>AI/ML Fundamentals</span></div><div className="skill-bar"><div className="skill-progress" style={{ '--percent': '70%' }}></div></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline">
      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'var(--cream)', fontSize: '2.5rem', marginBottom: '3rem' }}>Education</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-year">2025–Present</div>
            <h4 style={{ color: 'var(--turquoise)', marginBottom: '0.5rem' }}>B.Tech in Computer Science Engineering</h4>
            <p>University of Petroleum and Energy Studies (UPES)</p>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-year">Completed</div>
            <h4 style={{ color: 'var(--turquoise)', marginBottom: '0.5rem' }}>Secondary & Higher Secondary</h4>
            <p>Maheshwari Public School</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ onProjectClick }) {
  return (
    <section id="projects">
      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'var(--cream)', fontSize: '2.5rem', marginBottom: '3rem' }}>Major Projects</h2>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} onClick={() => onProjectClick(project)} style={{ cursor: 'pointer' }}>
              <BorderGlow
                className="project-card"
                edgeSensitivity={30}
                glowColor={project.glowColor}
                backgroundColor="rgba(6, 0, 16, 0.5)"
                borderRadius={16}
                glowRadius={50}
                glowIntensity={1.2}
                animated={true}
                colors={project.colors}
              >
                <div style={{ padding: '1.5rem' }}>
                  <div className="project-title">{project.title}</div>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{project.description}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', background: 'rgba(0, 242, 255, 0.15)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 242, 255, 0.2)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'var(--cream)', fontSize: '2.5rem', marginBottom: '3rem' }}>Certifications</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ padding: '1.5rem', border: '1px solid var(--turquoise)', borderRadius: '10px', background: 'rgba(6, 0, 16, 0.5)' }}>
            <h4 style={{ color: 'var(--turquoise)', marginBottom: '0.5rem' }}>AWS Cloud Practitioner</h4>
            <p>Amazon Web Services (AWS)</p>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid var(--turquoise)', borderRadius: '10px', background: 'rgba(6, 0, 16, 0.5)' }}>
            <h4 style={{ color: 'var(--turquoise)', marginBottom: '0.5rem' }}>Oracle AI/ML Foundations</h4>
            <p>Oracle University</p>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid var(--turquoise)', borderRadius: '10px', background: 'rgba(6, 0, 16, 0.5)' }}>
            <h4 style={{ color: 'var(--turquoise)', marginBottom: '0.5rem' }}>Cyber Security Essentials</h4>
            <p>IIT Jodhpur</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership">
      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'var(--cream)', fontSize: '2.5rem', marginBottom: '3rem' }}>Leadership & Roles</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h4 style={{ color: 'var(--turquoise)', marginBottom: '1rem' }}>Lead Changemaker</h4>
            <p style={{ fontSize: '0.95rem' }}>Student-led initiatives focused on tech-for-good projects.</p>
          </div>
          <div className="skill-category">
            <h4 style={{ color: 'var(--turquoise)', marginBottom: '1rem' }}>ACM-UPES Core PR</h4>
            <p style={{ fontSize: '0.95rem' }}>Managed outreach, communications, and event promotion for the student chapter.</p>
          </div>
          <div className="skill-category">
            <h4 style={{ color: 'var(--turquoise)', marginBottom: '1rem' }}>UPES Hypervision Tech</h4>
            <p style={{ fontSize: '0.95rem' }}>Supported hackathon infrastructure and participant technical coordination.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <section id="contact">
        <div className="container">
          <h2 style={{ textAlign: 'center', color: 'var(--cream)', fontSize: '2.5rem', marginBottom: '3rem' }}>Contact</h2>
          <div className="contact-info">
            <h3 style={{ color: 'var(--turquoise)', marginBottom: '1.5rem', textAlign: 'center' }}>Connect With Me</h3>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              <span>India</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              <span>chirrayusharma@gmail.com</span>
              <button className="copy-btn" onClick={copyEmail}>Copy</button>
            </div>
            <div className="contact-item">
              <i className="fab fa-github contact-icon"></i>
              <a href="https://github.com/chirrayu" target="_blank" rel="noreferrer">github.com/chirrayu</a>
            </div>
            <div className="contact-item">
              <i className="fab fa-linkedin contact-icon"></i>
              <a href="https://www.linkedin.com/in/chirrayu-sharma-37138b375/" target="_blank" rel="noreferrer">linkedin.com/in/chirrayu-sharma-37138b375/</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dockItems = [
    { icon: <VscHome size={22} />, label: 'Home', onClick: () => setActiveSection('hero') },
    { icon: <VscTools size={22} />, label: 'Skills', onClick: () => setActiveSection('skills') },
    { icon: <VscMortarBoard size={22} />, label: 'Education', onClick: () => setActiveSection('timeline') },
    { icon: <VscRocket size={22} />, label: 'Projects', onClick: () => setActiveSection('projects') },
    { icon: <VscVerified size={22} />, label: 'Certifications', onClick: () => setActiveSection('certifications') },
    { icon: <VscOrganization size={22} />, label: 'Leadership', onClick: () => setActiveSection('leadership') },
    { icon: <VscMail size={22} />, label: 'Contact', onClick: () => setActiveSection('contact') },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'hero': return <Hero key="hero" />;
      case 'skills': return <Skills key="skills" />;
      case 'timeline': return <Timeline key="timeline" />;
      case 'projects': return <Projects key="projects" onProjectClick={setSelectedProject} />;
      case 'certifications': return <Certifications key="certifications" />;
      case 'leadership': return <Leadership key="leadership" />;
      case 'contact': return <Contact key="contact" />;
      default: return <Hero key="hero" />;
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>

      <main style={{ minHeight: '100vh', paddingBottom: '100px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <Dock
        items={dockItems}
        panelHeight={isMobile ? 55 : 68}
        baseItemSize={isMobile ? 40 : 50}
        magnification={isMobile ? 60 : 70}
      />
    </>
  );
}

export default App;
