import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GradientBlinds from './components/GradientBlinds';
import SplitText from './components/SplitText';
import BorderGlow from './components/BorderGlow';
import Dock from './components/Dock';
import { VscHome, VscTools, VscMortarBoard, VscRocket, VscMail, VscVerified, VscOrganization } from 'react-icons/vsc';
import './index.css';

const copyEmail = () => {
  navigator.clipboard.writeText('chirrayusharma@gmail.com').then(() => {
    alert('Email copied to clipboard!');
  });
};

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
      <p className="hero-subtitle">CS Engineering @ UPES | AI, Automation & FinTech</p>
      <div className="quote-box">
        I am a dedicated Computer Science Engineering student at UPES, India, with a deep interest in software development, 
        artificial intelligence, and automation systems. From building secure vehicle rental platforms to simulating complex banking systems, 
        I thrive on solving real-world challenges through clean, efficient code.
        <br /><br />
        Currently focused on: <strong>AI/ML Applications, Fintech, and Cyber Security.</strong>
        <div className="quote-signature">— Driven by curiosity, powered by code.</div>
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

function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'var(--cream)', fontSize: '2.5rem', marginBottom: '3rem' }}>Major Projects</h2>
        <div className="projects-grid">

          <BorderGlow
            className="project-card"
            edgeSensitivity={30}
            glowColor="0 242 255"
            backgroundColor="transparent"
            borderRadius={16}
            glowRadius={50}
            glowIntensity={1.2}
          >
            <div style={{ padding: '1.5rem' }}>
              <div className="project-title">WheelsOnRent</div>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Developed secure vehicle rental platform with OTP verification, vendor dash, and RESTful APIs.</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(0, 242, 255, 0.15)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 242, 255, 0.2)' }}>Flask</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(0, 242, 255, 0.15)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 242, 255, 0.2)' }}>REST API</span>
              </div>
            </div>
          </BorderGlow>

          <BorderGlow
            className="project-card"
            edgeSensitivity={30}
            glowColor="188 19 254"
            backgroundColor="transparent"
            borderRadius={16}
            glowRadius={50}
            glowIntensity={1.2}
          >
            <div style={{ padding: '1.5rem' }}>
              <div className="project-title">Banking System</div>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Terminal-based simulator in C featuring account creation, persistent file handling, and transactions.</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(188, 19, 254, 0.15)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(188, 19, 254, 0.2)' }}>C</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(188, 19, 254, 0.15)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(188, 19, 254, 0.2)' }}>File Systems</span>
              </div>
            </div>
          </BorderGlow>

          <BorderGlow
            className="project-card"
            edgeSensitivity={30}
            glowColor="0 242 255"
            backgroundColor="transparent"
            borderRadius={16}
            glowRadius={50}
            glowIntensity={1.2}
          >
            <div style={{ padding: '1.5rem' }}>
              <div className="project-title">CodeHustle</div>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Hypervision Hackathon portal contributor. Optimized UI responsiveness and onboarding flows.</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(0, 242, 255, 0.15)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 242, 255, 0.2)' }}>UI/UX</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(0, 242, 255, 0.15)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 242, 255, 0.2)' }}>Integration</span>
              </div>
            </div>
          </BorderGlow>

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
              <i className="fas fa-phone contact-icon"></i>
              <span>+91-7627090578</span>
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

      <footer>
        &copy; {currentYear} Chirrayu Sharma. All rights reserved.
      </footer>
    </>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('hero');
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
      case 'projects': return <Projects key="projects" />;
      case 'certifications': return <Certifications key="certifications" />;
      case 'leadership': return <Leadership key="leadership" />;
      case 'contact': return <Contact key="contact" />;
      default: return <Hero key="hero" />;
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={-75}
          noise={0.1}
          blindCount={12}
          blindMinWidth={110}
          spotlightRadius={0.5}
          spotlightSoftness={1.3}
          spotlightOpacity={1}
          mouseDampening={0.3}
          mirrorGradient={false}
          distortAmount={1}
          shineDirection="right"
          mixBlendMode="lighten"
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
