import { useRef, useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

import builderaImg from '../assets/buildera.png';
import ludescImg from '../assets/ludesc.png';
import yovaImg from '../assets/yova.png';
import prestigiumImg from '../assets/prestigium.png';

const PX = 'clamp(20px, 5vw, 80px)';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop&auto=format",
    lines: ['BUILDING', 'TECHNOLOGY', 'FOR THE', 'REAL WORLD.'],
    tags: ['AI', 'SOFTWARE', 'AUTOMATION', 'DIGITAL SYSTEMS']
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&auto=format",
    lines: ['ENGINEERING', 'FUTURE', 'SYSTEMS', 'TODAY.'],
    tags: ['CLOUD', 'EDGE', 'INFRASTRUCTURE', 'DATA']
  },
  {
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop&auto=format",
    lines: ['SECURE', 'ROBUST', 'SCALABLE', 'SOLUTIONS.'],
    tags: ['CYBERSECURITY', 'NETWORKING', 'IOT', 'AI']
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&auto=format",
    lines: ['INTELLIGENT', 'PROCESS', 'AUTOMATION', 'POWER.'],
    tags: ['ROBOTICS', 'VISION', 'SIGNAL', 'CONTROL']
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop&auto=format",
    lines: ['CRAFTING', 'DIGITAL', 'CULTURE', 'FOR IMPACT.'],
    tags: ['WEB', 'MOBILE', 'UX', 'ECOMMERCE']
  }
];

const PROJECTS = [
  {
    num: '01',
    name: 'BUILD ERA',
    cat: 'POS / BUSINESS PLATFORM',
    desc: 'Integrated POS and business management platform for retail and F&B operations.',
    year: '2026',
    size: 'full',
    img: builderaImg,
    link: '/buildera/',
  },
  {
    num: '02',
    name: 'LUDESC',
    cat: 'AI HEALTHCARE / TELEMEDICINE',
    desc: 'AI-powered digital auscultation and telemedicine solution for remote diagnostics.',
    year: '2025',
    size: 'large',
    img: ludescImg,
    link: 'https://prototypesforhumanity.com/prototypes/ludesc',
  },
  {
    num: '03',
    name: 'PRESTIGIUM ACADEMIA',
    cat: 'TECHNICAL TRAINING & CERTIFICATION',
    desc: 'Technical training and certification platform for engineering and industrial skills.',
    year: '2025',
    size: 'small',
    img: prestigiumImg,
    link: 'https://prestigeum-academia.solutivolabs.workers.dev/',
  },
  {
    num: '04',
    name: 'YOVA',
    cat: 'DIGITAL FASHION / WEDDING',
    desc: 'Digital fashion platform specializing in wedding attire rentals and e-commerce.',
    year: '2024',
    size: 'full',
    img: yovaImg,
    link: 'https://yova.solutivolabs.workers.dev/',
  },
];

const CAPABILITIES = [
  { num: '01', name: 'Desktop and Mobile Apps Application', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format' },
  { num: '02', name: 'Artificial intelligents & Data/Signal Processing', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=300&fit=crop&auto=format' },
  { num: '03', name: 'Automation', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&auto=format' },
  { num: '04', name: 'Digital Products', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop&auto=format' },
  { num: '05', name: 'IoT', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format' },
  { num: '06', name: '3D Model & Print', img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop&auto=format' },
];

const CLIENTS = [
  { name: 'YOVA', industry: 'RENT DRESS MARRIAGE', cat: 'E-COMMERCE', year: '2024', img: yovaImg, link: 'https://yova.solutivolabs.workers.dev/' },
  { name: 'PRESTIGIUM ACADEMIA', industry: 'EDUCATION', cat: 'TRAINING PLATFORM', year: '2025', img: prestigiumImg, link: 'https://prestigeum-academia.solutivolabs.workers.dev/' },
];

const TECH_WORDS = ['AI', 'COMPUTER VISION', 'MOBILE', 'WEB', 'CLOUD', 'IoT', 'DATA', 'AUTOMATION', 'PYTHON', 'REACT', 'FLUTTER', 'PYTORCH', 'KUBERNETES', 'EDGE'];

const PRODUCTS = [
  {
    name: 'BUILD ERA',
    sub: 'BUSINESS OPERATING SYSTEM',
    desc: 'An integrated POS and business management platform designed for high-volume retail and F&B operations.',
    status: 'LIVE',
    cat: 'ENTERPRISE',
    img: builderaImg,
    link: '/buildera/',
  },
  {
    name: 'LUDESC',
    sub: 'AI HEALTHCARE PLATFORM',
    desc: 'AI-powered digital auscultation and telemedicine solution connecting patients with remote diagnostics.',
    status: 'LIVE',
    cat: 'HEALTHCARE',
    img: ludescImg,
    link: 'https://prototypesforhumanity.com/prototypes/ludesc',
  },
];

// ─────────────────────────────────────────
// SECTION: Hero
// ─────────────────────────────────────────
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '700px', overflow: 'hidden', background: '#080808' }}>
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className="hero-image"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity: 1.5s ease-in-out',
            zIndex: index === currentSlide ? 1 : 0
          }}
        >
          <img
            src={slide.image}
            alt="Technology infrastructure"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, filter: 'grayscale(15%)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.7) 100%)' }} />
        </div>
      ))}

      <div style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `clamp(100px, 14vh, 148px) ${PX} clamp(32px, 7vh, 64px)`,
        color: '#FFFFFF',
        zIndex: 10
      }}>
        {/* Top metadata */}
        <div className="hero-meta" style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
          {[['SOLUTIVO LABS', '#FFFFFF'], ['INDONESIA', 'rgba(255,255,255,0.45)'], ['EST. 2020', 'rgba(255,255,255,0.45)']].map(([t, c]) => (
            <span key={t} style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 500, color: c }}>{t}</span>
          ))}
        </div>

        {/* Headline */}
        <div>
          <h1 key={currentSlide} style={{ margin: 0, fontSize: 'clamp(56px, 9vw, 150px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
            {HERO_SLIDES[currentSlide].lines.map((line, i) => (
              <span key={i} className="hero-line">
                <span className="hero-line-inner" style={{ color: i === 3 ? '#C8421A' : '#FFFFFF' }}>{line}</span>
              </span>
            ))}
          </h1>

          <div className="hero-sub" style={{ display: 'flex', gap: '28px', marginTop: '48px', flexWrap: 'wrap', alignItems: 'center' }}>
            {HERO_SLIDES[currentSlide].tags.map((item, i) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{item}</span>
                {i < HERO_SLIDES[currentSlide].tags.length - 1 && <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'inline-block', flexShrink: 0 }} />}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{ position: 'absolute', left: PX, bottom: '48px', display: 'flex', gap: '12px', zIndex: 20 }}>
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '40px',
              height: '2px',
              background: index === currentSlide ? '#C8421A' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Scroll line */}
      <div className="hero-sub" style={{ position: 'absolute', right: PX, bottom: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', zIndex: 20 }}>
        <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.25)' }} />
        <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', writingMode: 'vertical-rl', textTransform: 'uppercase' }}>SCROLL</span>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: Introduction
// ─────────────────────────────────────────
function IntroSection() {
  const heading = useScrollReveal();
  const body = useScrollReveal();
  return (
    <section id="solutions" style={{ background: '#FFFFFF', padding: `clamp(80px, 12vw, 160px) ${PX}`, borderBottom: '1px solid #D9D9D9' }}>
      <div ref={heading.ref} className={`sr ${heading.visible ? 'visible' : ''}`}>
        <h2 style={{
          fontSize: 'clamp(40px, 6vw, 110px)',
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#111111',
          margin: '0 0 48px',
          maxWidth: '900px',
        }}>
          WE DESIGN,{'\n'}
          ENGINEER,{'\n'}
          AND BUILD{'\n'}
          DIGITAL SYSTEMS{'\n'}
          FOR THE REAL WORLD.
        </h2>
      </div>
      <div ref={body.ref} className={`sr sr-delay-2 ${body.visible ? 'visible' : ''}`} style={{ maxWidth: '480px', marginLeft: 'auto' }}>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#666666', fontWeight: 400, margin: 0 }}>
          Solutivo Labs is a technology company focused on artificial intelligence, software engineering, automation, computer vision, IoT, and digital products. We build systems that perform in the real world.
        </p>
        <div style={{ marginTop: '40px', display: 'flex', gap: '40px' }}>
          {[['4', 'PROJECTS'], ['6', 'CAPABILITIES'], ['3+', 'YEARS']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666', marginTop: '6px', fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: Capabilities
// ─────────────────────────────────────────
function CapabilitiesSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section style={{ background: '#F7F7F5', padding: `clamp(80px, 10vw, 140px) ${PX}`, borderBottom: '1px solid #D9D9D9' }}>
      <div ref={ref} className={`sr ${visible ? 'visible' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 600, color: '#666666' }}>CAPABILITIES</span>
        <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#666666' }}>07 DISCIPLINES</span>
      </div>

      <div style={{ borderTop: '1px solid #D9D9D9' }}>
        {CAPABILITIES.map((cap) => (
          <div
            key={cap.num}
            className="cap-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '28px 0',
              borderBottom: '1px solid #D9D9D9',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background 0.35s ease, padding-left 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#999999', fontWeight: 500, minWidth: '28px' }}>{cap.num}</span>
              <span style={{ fontSize: 'clamp(22px, 3vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#111111', lineHeight: 1 }}>{cap.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }}>
              <div className="cap-img" style={{ width: 'clamp(80px, 12vw, 160px)', height: 'clamp(50px, 8vw, 100px)', overflow: 'hidden', background: '#111111' }}>
                <img src={cap.img} alt={cap.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
              </div>
              <span className="cap-arrow" style={{ fontSize: '20px', color: '#C8421A', fontWeight: 700 }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: Selected Work
// ─────────────────────────────────────────
function ProjectCard({ project, onClick, height = '60vh' }: { project: typeof PROJECTS[0]; onClick?: () => void; height?: string }) {
  const handleClick = () => {
    if ('link' in project && project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <div className="project-card" style={{ position: 'relative', cursor: 'pointer' }} onClick={handleClick}>
      <div className="project-thumb" style={{ height, position: 'relative' }}>
        <img src={project.img} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 80%)', pointerEvents: 'none' }} />

        {/* Overlaid Content */}
        <div style={{ position: 'absolute', inset: 0, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', fontWeight: 500 }}>{project.num}</div>
              <div style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1 }}>{project.name}</div>
              {'desc' in project && <p style={{ margin: '12px 0 0', fontSize: '14px', lineHeight: 1.5, color: 'rgba(255,255,255,0.7)', maxWidth: '400px' }}>{project.desc}</p>}
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{project.cat}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontWeight: 500 }}>{project.year}</div>
            </div>
          </div>
          <div className="project-explore" style={{ marginTop: '24px', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 600 }}>
            EXPLORE →
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectedWorkSection({ onBuildEraClick }: { onBuildEraClick: () => void }) {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="work" style={{ background: '#F7F7F5', padding: `clamp(80px, 10vw, 140px) ${PX}`, borderBottom: '1px solid #D9D9D9' }}>
      <div ref={ref} className={`sr ${visible ? 'visible' : ''}`} style={{ marginBottom: '64px' }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(56px, 8vw, 130px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#111111' }}>
          SELECTED<br />WORK
        </h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-12px' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#999999', fontWeight: 500 }}>04 PROJECTS</span>
        </div>
      </div>

      {/* Full-width: project 01 */}
      <div className={`sr ${visible ? 'visible' : ''}`} style={{ marginBottom: '3px' }}>
        <ProjectCard project={PROJECTS[0]} height="70vh" onClick={onBuildEraClick} />
      </div>

      {/* Split: 02 + 03 */}
      <div style={{ display: 'grid', gridTemplateColumns: '62fr 38fr', gap: '3px', margin: '3px 0' }}>
        <div><ProjectCard project={PROJECTS[1]} height="55vh" /></div>
        <div><ProjectCard project={PROJECTS[2]} height="55vh" /></div>
      </div>

      {/* Full-width: project 04 */}
      <div className={`sr ${visible ? 'visible' : ''}`} style={{ marginTop: '3px' }}>
        <ProjectCard project={PROJECTS[3]} height="60vh" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: Featured Project
// ─────────────────────────────────────────
function FeaturedProjectSection({ onBuildEraClick }: { onBuildEraClick: () => void }) {
  return (
    <section style={{ position: 'relative', height: '90vh', minHeight: '600px', overflow: 'hidden', background: '#080808' }}>
      <img
        src={builderaImg}
        alt="Build Era dashboard"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, padding: `clamp(40px, 7vh, 80px) ${PX}`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#FFFFFF' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <span style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 500, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '16px' }}>FEATURED PROJECT</span>
            <h2 style={{ margin: 0, fontSize: 'clamp(48px, 7vw, 120px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
              BUILD ERA
            </h2>
            <p style={{ margin: '20px 0 0', fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>
              BUSINESS<br />MANAGEMENT<br />PLATFORM
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
            <span style={{ fontSize: '13px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>2026</span>
            <button
              onClick={onBuildEraClick}
              style={{
                fontSize: '12px',
                letterSpacing: '0.14em',
                fontWeight: 700,
                color: '#111111',
                background: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                padding: '16px 32px',
              }}
            >
              VIEW PROJECT →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: Clients
// ─────────────────────────────────────────
function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const { ref, visible } = useScrollReveal();

  return (
    <section id="clients" style={{ background: '#FFFFFF', borderBottom: '1px solid #D9D9D9' }}>
      <div style={{ padding: `clamp(80px, 10vw, 140px) ${PX} 48px` }}>
        <div ref={ref} className={`sr ${visible ? 'visible' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(48px, 6vw, 100px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#111111' }}>
            SELECTED<br />CLIENTS
          </h2>
          <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#999999', fontWeight: 500 }}>DRAG TO EXPLORE →</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="client-scroll"
        style={{ padding: `0 ${PX} clamp(60px, 8vw, 100px)`, display: 'flex', gap: '3px', userSelect: 'none' }}
        onMouseDown={(e) => {
          isDragging.current = true;
          startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
          scrollStart.current = scrollRef.current?.scrollLeft ?? 0;
        }}
        onMouseMove={(e) => {
          if (!isDragging.current || !scrollRef.current) return;
          const x = e.pageX - scrollRef.current.offsetLeft;
          scrollRef.current.scrollLeft = scrollStart.current - (x - startX.current);
        }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
      >
        {CLIENTS.map((client) => (
          <div
            key={client.name}
            style={{ flexShrink: 0, width: 'clamp(280px, 35vw, 420px)', cursor: 'link' in client ? 'pointer' : 'default' }}
            onClick={() => 'link' in client && window.open(client.link as string, '_blank')}
          >
            <div style={{ height: 'clamp(200px, 30vw, 320px)', overflow: 'hidden', background: '#111111', position: 'relative' }}>
              <img src={client.img} alt={client.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, filter: 'grayscale(30%)' }} />
            </div>
            <div style={{ padding: '20px 0 0', borderTop: '1px solid #D9D9D9' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#999999', fontWeight: 500, marginBottom: '8px' }}>{client.industry} · {client.year}</div>
              <div style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#111111', lineHeight: 1.1 }}>{client.name}</div>
              <div style={{ fontSize: '12px', letterSpacing: '0.12em', color: '#666666', fontWeight: 500, marginTop: '6px' }}>{client.cat}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: Products
// ─────────────────────────────────────────
function ProductsSection({ onBuildEraClick }: { onBuildEraClick: () => void }) {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="products" style={{ background: '#F7F7F5', padding: `clamp(80px, 10vw, 140px) ${PX}`, borderBottom: '1px solid #D9D9D9' }}>
      <div ref={ref} className={`sr ${visible ? 'visible' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(48px, 6vw, 100px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#111111' }}>
          PRODUCTS
        </h2>
        <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#999999', fontWeight: 500 }}>03 IN MARKET</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', borderTop: '1px solid #D9D9D9' }}>
        {PRODUCTS.map((product, i) => (
          <div key={product.name} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.4fr' : '1.4fr 1fr', gap: '3px', alignItems: 'stretch' }}>
            {i % 2 !== 0 && (
              <div style={{ background: '#FFFFFF', padding: 'clamp(32px, 4vw, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <ProductText product={product} onBuildEraClick={onBuildEraClick} />
              </div>
            )}
            <div style={{ overflow: 'hidden', background: '#111111', minHeight: 'clamp(240px, 35vw, 420px)' }}>
              <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, display: 'block' }} />
            </div>
            {i % 2 === 0 && (
              <div style={{ background: '#FFFFFF', padding: 'clamp(32px, 4vw, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <ProductText product={product} onBuildEraClick={onBuildEraClick} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductText({ product, onBuildEraClick }: { product: typeof PRODUCTS[0]; onBuildEraClick: () => void }) {
  const handleClick = () => {
    if ('link' in product && product.link) {
      window.open(product.link, '_blank');
    }
  };

  return (
    <>
      <div>
        <span style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#C8421A', fontWeight: 600 }}>{product.cat}</span>
        <h3 style={{ margin: '12px 0 8px', fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#111111', lineHeight: 0.9 }}>{product.name}</h3>
        <div style={{ fontSize: 'clamp(14px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', color: '#666666', lineHeight: 1.3, marginBottom: '24px' }}>{product.sub}</div>
        <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#666666', maxWidth: '360px', margin: 0 }}>{product.desc}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '32px' }}>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.16em',
          fontWeight: 700,
          color: product.status === 'LIVE' ? '#111111' : '#666666',
          border: '1px solid',
          borderColor: product.status === 'LIVE' ? '#111111' : '#D9D9D9',
          padding: '5px 12px',
        }}>
          {product.status}
        </span>
        <button
          onClick={handleClick}
          style={{ fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600, color: '#C8421A', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          EXPLORE →
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────
// SECTION: Technology
// ─────────────────────────────────────────
function TechSection() {
  const { ref, visible } = useScrollReveal();
  const duplicated = [...TECH_WORDS, ...TECH_WORDS];
  return (
    <section style={{ background: '#111111', padding: `clamp(80px, 10vw, 140px) 0`, overflow: 'hidden', borderBottom: '1px solid #222222' }}>
      <div ref={ref} className={`sr ${visible ? 'visible' : ''}`} style={{ padding: `0 ${PX}`, marginBottom: '64px' }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#FFFFFF' }}>
          ENGINEERED<br />
          <span style={{ color: '#333333' }}>WITH TECHNOLOGY.</span>
        </h2>
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid #222222', borderBottom: '1px solid #222222', padding: '24px 0' }}>
        <div className="marquee-track">
          {duplicated.map((word, i) => (
            <span key={i} style={{
              fontSize: 'clamp(14px, 2vw, 22px)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: i % 3 === 0 ? '#FFFFFF' : '#444444',
              textTransform: 'uppercase',
              padding: '0 clamp(24px, 4vw, 60px)',
              flexShrink: 0,
              display: 'inline-block',
            }}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: `64px ${PX} 0` }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
          {TECH_WORDS.map((word) => (
            <span key={word} style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 600, color: '#555555', border: '1px solid #222222', padding: '10px 20px', textTransform: 'uppercase' }}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: About
// ─────────────────────────────────────────
function AboutSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="about" style={{ background: '#F7F7F5', borderBottom: '1px solid #D9D9D9', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'clamp(500px, 70vh, 800px)' }} className="about-grid">
        {/* Left: text */}
        <div style={{ padding: `clamp(64px, 10vw, 140px) clamp(32px, 6vw, 80px)`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div ref={ref} className={`sr ${visible ? 'visible' : ''}`}>
            <span style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 600, color: '#C8421A', display: 'block', marginBottom: '32px' }}>ABOUT SOLUTIVO LABS</span>
            <h2 style={{ margin: '0 0 32px', fontSize: 'clamp(36px, 4.5vw, 80px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#111111' }}>
              WE BUILD<br />WHAT SHOULD<br />EXIST.
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#666666', maxWidth: '400px', margin: '0 0 40px' }}>
              We are a team (Owner are alone and solo obviously hahahaaaa) of engineers, designers, and problem solvers based in Indonesia. We combine artificial intelligence, software craftsmanship, and systems thinking to build technology that creates measurable impact.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid #D9D9D9' }}>
              {[['ENGINEERING-FIRST', 'We build before we theorize.'], ['INDONESIA-ROOTED', 'Built for real-world local contexts.'], ['GLOBAL STANDARD', 'Production-grade, always.']].map(([title, desc]) => (
                <div key={title} style={{ padding: '20px 0', borderBottom: '1px solid #D9D9D9' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: '#111111', marginBottom: '4px' }}>{title}</div>
                  <div style={{ fontSize: '13px', color: '#888888' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: image */}
        <div style={{ overflow: 'hidden', background: '#111111', position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900&h=900&fit=crop&auto=format"
            alt="Solutivo Labs engineering"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, filter: 'grayscale(20%)', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(247,247,245,0.1) 0%, transparent 40%)' }} />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: CTA
// ─────────────────────────────────────────
function CTASection() {
  const { ref, visible } = useScrollReveal();
  const contacts = [
    {
      type: 'EMAIL',
      value: 'solutivolabs@gmail.com',
      href: 'mailto:solutivolabs@gmail.com',
      icon: '/communication.png',
      label: 'GET IN TOUCH'
    },
    {
      type: 'WHATSAPP',
      value: '+971 58 251 7092',
      href: 'https://wa.me/971582517092',
      icon: '/whatsapp.png',
      label: 'CHAT DIRECTLY'
    }
  ];

  return (
    <section id="contact" style={{ background: '#111111', padding: `clamp(100px, 15vw, 200px) ${PX}` }}>
      <div ref={ref} className={`sr ${visible ? 'visible' : ''}`}>
        <h2 style={{ margin: '0 0 64px', fontSize: 'clamp(56px, 9vw, 150px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#FFFFFF' }}>
          LET'S<br />BUILD<br />SOMETHING<br /><span style={{ color: '#C8421A' }}>USEFUL.</span>
        </h2>

        {/* Direct Contact Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '900px',
          marginBottom: '48px'
        }}>
          {contacts.map((contact) => (
            <a
              key={contact.type}
              href={contact.href}
              target={contact.type === 'WHATSAPP' ? '_blank' : '_self'}
              rel={contact.type === 'WHATSAPP' ? 'noopener noreferrer' : ''}
              style={{
                position: 'relative',
                display: 'block',
                textDecoration: 'none',
                borderRadius: '0',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                (el.querySelector('.contact-card-inner') as HTMLElement).style.transform = 'translateY(-8px)';
                (el.querySelector('.contact-card-bg') as HTMLElement).style.opacity = '0.15';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                (el.querySelector('.contact-card-inner') as HTMLElement).style.transform = 'translateY(0)';
                (el.querySelector('.contact-card-bg') as HTMLElement).style.opacity = '0.08';
              }}
            >
              {/* Background accent */}
              <div
                className="contact-card-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: contact.type === 'EMAIL' ? '#C8421A' : '#00AA00',
                  opacity: 0.08,
                  transition: 'opacity 0.35s ease',
                  zIndex: 0
                }}
              />

              {/* Border */}
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '1px solid rgba(255,255,255,0.15)',
                pointerEvents: 'none',
                zIndex: 1
              }} />

              {/* Content */}
              <div
                className="contact-card-inner"
                style={{
                  padding: 'clamp(32px, 5vw, 48px)',
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '200px',
                  justifyContent: 'space-between'
                }}
              >
                {/* Icon and type */}
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={contact.icon} 
                      alt={contact.type}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <div style={{
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    fontWeight: 700,
                    color: contact.type === 'EMAIL' ? '#C8421A' : '#00AA00',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>
                    {contact.type}
                  </div>
                  <div style={{
                    fontSize: 'clamp(16px, 2.5vw, 24px)',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    wordBreak: 'break-word'
                  }}>
                    {contact.value}
                  </div>
                </div>

                {/* CTA Label */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  color: contact.type === 'EMAIL' ? '#C8421A' : '#00AA00',
                  textTransform: 'uppercase'
                }}>
                  <span>{contact.label}</span>
                  <span style={{ fontSize: '14px', marginTop: '2px' }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: Direct Contact
// ─────────────────────────────────────────
function DirectContactSection() {
  const { ref, visible } = useScrollReveal();
  const contacts = [
    {
      type: 'EMAIL',
      value: 'solutivolabs@gmail.com',
      href: 'mailto:solutivolabs@gmail.com',
      icon: '✉',
      label: 'GET IN TOUCH'
    },
    {
      type: 'WHATSAPP',
      value: '+971 58 251 7092',
      href: 'https://wa.me/971582517092',
      icon: '💬',
      label: 'CHAT DIRECTLY'
    }
  ];

  return (
    <section style={{ background: '#F7F7F5', padding: `clamp(80px, 12vw, 160px) ${PX}`, borderBottom: '1px solid #D9D9D9' }}>
      <div ref={ref} className={`sr ${visible ? 'visible' : ''}`} style={{ marginBottom: '64px' }}>
        <h2 style={{
          margin: '0 0 16px',
          fontSize: 'clamp(36px, 5vw, 80px)',
          fontWeight: 900,
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#111111'
        }}>
          DIRECT CONTACT
        </h2>
        <p style={{
          fontSize: '16px',
          lineHeight: 1.6,
          color: '#666666',
          margin: 0,
          maxWidth: '500px'
        }}>
          Reach out directly. We respond quickly and love discussing new ideas.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '900px'
      }}>
        {contacts.map((contact) => (
          <a
            key={contact.type}
            href={contact.href}
            target={contact.type === 'WHATSAPP' ? '_blank' : '_self'}
            rel={contact.type === 'WHATSAPP' ? 'noopener noreferrer' : ''}
            style={{
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
              borderRadius: '0',
              overflow: 'hidden',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              (el.querySelector('.contact-card-inner') as HTMLElement).style.transform = 'translateY(-8px)';
              (el.querySelector('.contact-card-bg') as HTMLElement).style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              (el.querySelector('.contact-card-inner') as HTMLElement).style.transform = 'translateY(0)';
              (el.querySelector('.contact-card-bg') as HTMLElement).style.opacity = '0.05';
            }}
          >
            {/* Background accent */}
            <div
              className="contact-card-bg"
              style={{
                position: 'absolute',
                inset: 0,
                background: contact.type === 'EMAIL' ? '#C8421A' : '#00AA00',
                opacity: 0.05,
                transition: 'opacity 0.35s ease',
                zIndex: 0
              }}
            />

            {/* Border */}
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid #D9D9D9',
              pointerEvents: 'none',
              zIndex: 1
            }} />

            {/* Content */}
            <div
              className="contact-card-inner"
              style={{
                padding: 'clamp(32px, 5vw, 48px)',
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '240px',
                justifyContent: 'space-between'
              }}
            >
              {/* Icon and type */}
              <div>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '16px',
                  lineHeight: 1
                }}>
                  {contact.icon}
                </div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  color: contact.type === 'EMAIL' ? '#C8421A' : '#00AA00',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  {contact.type}
                </div>
                <div style={{
                  fontSize: 'clamp(16px, 2.5vw, 24px)',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#111111',
                  lineHeight: 1.2,
                  wordBreak: 'break-word'
                }}>
                  {contact.value}
                </div>
              </div>

              {/* CTA Label */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: contact.type === 'EMAIL' ? '#C8421A' : '#00AA00',
                textTransform: 'uppercase'
              }}>
                <span>{contact.label}</span>
                <span style={{ fontSize: '14px', marginTop: '2px' }}>→</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div style={{
        marginTop: '64px',
        padding: '24px',
        background: '#FFFFFF',
        border: '1px solid #D9D9D9',
        borderRadius: '0',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#666666'
        }}>
          <div>
            <span style={{ fontWeight: 700, color: '#111111' }}>Response Time:</span> Usually within 24 hours
          </div>
          <div>
            <span style={{ fontWeight: 700, color: '#111111' }}>Available Channels:</span> Email, WhatsApp, or through the form above
          </div>
          <div>
            <span style={{ fontWeight: 700, color: '#111111' }}>Based in:</span> Indonesia · Working with global clients
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SECTION: Footer
// ─────────────────────────────────────────
function Footer({ onCMSClick }: { onCMSClick: () => void }) {
  return (
    <footer id="contact" style={{ background: '#111111', borderTop: '1px solid #1E1E1E', padding: `clamp(48px, 6vw, 80px) ${PX}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '48px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.1em', color: '#FFFFFF', marginBottom: '20px' }}>SOLUTIVO LABS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['AI', 'SOFTWARE', 'AUTOMATION', 'DIGITAL SYSTEMS'].map((t) => (
              <span key={t} style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#444444', fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#444444', fontWeight: 600, marginBottom: '20px' }}>CONTACT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              ['EMAIL', 'solutivolabs@gmail.com', 'mailto:solutivolabs@gmail.com'],
              ['WHATSAPP', '+971 58 251 7092', 'https://wa.me/971582517092'],
              ['INSTAGRAM', '@solutivo.labs', 'https://instagram.com/solutivo.labs'],
              ['LINKEDIN', 'Solutivo Labs', 'https://linkedin.com/company/solutivo-labs'],
              ['GITHUB', 'github.com/solutivo', 'https://github.com/solutivo']
            ].map(([l, v, href]) => (
              <a
                key={l}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#555555', textDecoration: 'none' }}
              >
                <span style={{ color: '#333333', fontWeight: 600 }}>{l}</span>{' '}
                <span>{v}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#444444', fontWeight: 600, marginBottom: '20px' }}>LOCATION</div>
          <span style={{ fontSize: '13px', color: '#555555', lineHeight: 1.6 }}>INDONESIA<br />Gayo Lues · Aceh</span>
        </div>

        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#444444', fontWeight: 600, marginBottom: '20px' }}>STUDIO</div>
          <button
            onClick={onCMSClick}
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#555555', background: 'none', border: '1px solid #222222', cursor: 'pointer', padding: '10px 16px', fontWeight: 500 }}
          >
            CMS DASHBOARD ↗
          </button>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#333333', fontWeight: 500 }}>© 2026 SOLUTIVO LABS INDONESIA</span>
        <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#333333', fontWeight: 500 }}>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────
// EXPORT: Home Page
// ─────────────────────────────────────────
export default function Home({ onCMSClick, onBuildEraClick }: { onCMSClick: () => void; onBuildEraClick: () => void }) {
  return (
    <div style={{ background: '#F7F7F5' }}>
      <HeroSection />
      <IntroSection />
      <CapabilitiesSection />
      <SelectedWorkSection onBuildEraClick={onBuildEraClick} />
      <FeaturedProjectSection onBuildEraClick={onBuildEraClick} />
      <ClientsSection />
      <ProductsSection onBuildEraClick={onBuildEraClick} />
      <TechSection />
      <AboutSection />
      <CTASection />
      <Footer onCMSClick={onCMSClick} />
    </div>
  );
}
