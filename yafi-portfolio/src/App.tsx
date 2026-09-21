import { useEffect, useRef, useState } from 'react'

/* ─── Types ─── */
type Page = 'home' | 'works' | 'ludesc' | 'gcov' | 'hazard' | 'asd' | 'croptic' | 'about' | 'contact'
type Filter = 'ALL' | 'AI' | 'MEDTECH' | 'IoT' | 'HARDWARE' | 'RESEARCH'

/* ─── Scroll reveal hook ─── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, on }
}

/* ─── Custom cursor ─── */
function Cursor() {
  const elRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = elRef.current; if (!el) return
    const move = (e: MouseEvent) => { el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px' }
    const over = (e: MouseEvent) => { el.classList.toggle('show', !!(e.target as HTMLElement).closest('[data-cur]')) }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])
  return <div id="cursor" ref={elRef}><span>VIEW</span><span>↗</span></div>
}

/* ─── Nav ─── */
function Nav({ page, navigate }: { page: Page; navigate: (p: Page) => void }) {
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const h = () => setStuck(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links: { label: string; page: Page }[] = [
    { label: 'Work', page: 'works' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ]

  const isWhiteNav = page === 'contact';

  return (
    <nav className={`nav hnav ${stuck ? 'stuck' : ''} ${isWhiteNav ? 'nav-white' : 'nav-dark'}`}>
      <button className="nav-logo" onClick={() => navigate('home')}>AL YAFI</button>
      <div className="nav-links">
        {links.map(l => (
          <button key={l.page} className={`nav-btn ${page === l.page ? 'active' : ''}`} onClick={() => navigate(l.page)}>{l.label}</button>
        ))}
      </div>
    </nav>
  )
}

/* ─── Footer ─── */
function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="footer">
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--muted)' }}>© 2026 Al Yafi — Computer Engineer</span>
      <div className="footer-links">
        {(['Work', 'About', 'Contact'] as const).map((l, i) => (
          <button key={l} className="footer-btn" onClick={() => navigate(['works', 'about', 'contact'][i] as Page)}>{l}</button>
        ))}
      </div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--muted)' }}>AI / MEDTECH / HARDWARE / SYSTEMS</span>
    </footer>
  )
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ['LUDESC', '·', 'G-COV', '·', 'SMART HAZARD TRIANGLE', '·', 'ASD DETECTION', '·', 'CROPTIC', '·', 'AI', '·', 'MEDTECH', '·', 'HARDWARE', '·', 'SIGNAL', '·', 'IoT', '·']
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', padding: '14px 0' }}>
      <div className="marquee-track">{[...items, ...items].map((it, i) => <span key={i} className="marquee-item">{it}</span>)}</div>
    </div>
  )
}

/* ─── Project data ─── */
interface Project {
  id: Page; num: string; name: string; tagline: string
  tags: string[]; filters: Filter[]
  img: string; alt: string
  col: number; h: number
}
const PROJECTS: Project[] = [
  {
    id: 'ludesc', num: '01', name: 'LUDESC',
    tagline: 'AI-powered wireless digital stethoscope for remote healthcare',
    tags: ['AI', 'MEDTECH', 'SIGNAL PROCESSING', 'HARDWARE'],
    filters: ['AI', 'MEDTECH', 'HARDWARE'],
    img: '/yafi-portfolio/assets/ludesc/cover.png',
    alt: 'LUDESC digital stethoscope device',
    col: 7, h: 600,
  },
  {
    id: 'gcov', num: '02', name: 'G-COV',
    tagline: 'AI-driven COVID-19 severity detection from chest X-ray',
    tags: ['AI', 'DEEP LEARNING', 'IMAGING'],
    filters: ['AI', 'MEDTECH'],
    img: '/yafi-portfolio/assets/G-cov/cover.png',
    alt: 'Chest X-ray used for COVID-19 classification',
    col: 5, h: 600,
  },
  {
    id: 'hazard', num: '03', name: 'SMART HAZARD TRIANGLE',
    tagline: 'GPS + BLE active roadside safety system',
    tags: ['IoT', 'HARDWARE', 'GPS', 'BLE'],
    filters: ['IoT', 'HARDWARE'],
    img: '/yafi-portfolio/assets/Smart Hazard Triangle/cover.png',
    alt: 'Smart roadside safety system',
    col: 4, h: 480,
  },
  {
    id: 'asd', num: '04', name: 'ASD DETECTION',
    tagline: 'EEG brainwave AI analysis for autism spectrum screening',
    tags: ['AI', 'EEG', 'SIGNAL', 'NEURO'],
    filters: ['AI', 'RESEARCH'],
    img: '/yafi-portfolio/assets/ASD detection/cover.png',
    alt: 'EEG brainwave patterns analysis',
    col: 8, h: 480,
  },
  {
    id: 'croptic', num: '05', name: 'CROPTIC',
    tagline: 'Drone-based RSPO compliance verification platform',
    tags: ['AI', 'GEOSPATIAL', 'DRONE', 'ESG'],
    filters: ['AI', 'RESEARCH'],
    img: '/yafi-portfolio/assets/Croptic/cover.png',
    alt: 'Aerial view of plantation rows',
    col: 12, h: 380,
  },
]

/* ─── Home Page ─── */
function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = [
    {
      img: '/yafi-portfolio/assets/home/hero1.png',
      headline: 'Ideas, crafted across product, service, and intelligence.'
    },
    {
      img: '/yafi-portfolio/assets/home/hero2.png',
      headline: 'Building systems that integrate hardware and AI.'
    },
    {
      img: '/yafi-portfolio/assets/home/hero3.png',
      headline: 'Designing for impact and real-world complexity.'
    }
  ]

  useEffect(() => {
    const itv = setInterval(() => {
      setActiveSlide(s => (s + 1) % slides.length)
    }, 6000)
    return () => clearInterval(itv)
  }, [slides.length])

  return (
    <div className="page-enter">
      {/* 1. Hero Section */}
      <section className="home-hero">
        {slides.map((s, i) => (
          <div key={i} className={`home-slide ${activeSlide === i ? 'active' : ''}`}>
            <img src={s.img} alt="" className="home-slide-img" />
            <div className="home-hero-content">
              <h1 className="home-hero-text">{s.headline}</h1>
            </div>
          </div>
        ))}

        <div className="home-hero-index">
          {slides.map((s, i) => (
            <button
              key={i}
              className={`home-index-card ${activeSlide === i ? 'active' : ''}`}
              onClick={() => setActiveSlide(i)}
            >
              <img src={s.img} alt="" />
            </button>
          ))}
          <div className="home-hero-counter">
            0{activeSlide + 1} / 0{slides.length}
          </div>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="home-intro">
        <div className="home-intro-inner">
          <h2 className="home-intro-text">
            Hello! I'm Al Yafi, a designer creating holistic experiences and systems rooted in empathy, care, and a love for detail. 🔍
          </h2>
          <h2 className="home-intro-text">
            I connect hardware, software, services, and intelligence into cohesive ecosystems, designing experiences that make life easier and leave a lasting impact. 🚀
          </h2>
          <h2 className="home-intro-text">
            I'm always open to connecting with people and teams who are shaping thoughtful, future-facing products and experiences. Feel free to reach out if you'd like to explore ideas or potential collaboration.
          </h2>
          <button className="home-intro-link" onClick={() => navigate('about')}>About my design approach</button>
        </div>
      </section>

      {/* 3. Project Gallery */}
      <section className="home-gallery">
        <div className="home-gallery-head">
          <h2 className="home-gallery-title">Project Gallery</h2>
          <button className="home-gallery-all" onClick={() => navigate('works')}>View All</button>
        </div>
        <div className="home-gallery-grid">
          {PROJECTS.map(p => (
            <div key={p.id} className="home-gallery-card" onClick={() => {
              if (p.id === 'croptic') {
                window.open('https://croptic.co/', '_blank');
              } else {
                navigate(p.id);
              }
            }}>
              <div className="home-gallery-img-wrap">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="home-gallery-card-info">
                {p.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ASEAN DIGITAL Award Section */}
      <section className="home-gallery" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="home-gallery-head">
          <h2 className="home-gallery-title">ASEAN DIGITAL Award</h2>
        </div>
        <div className="home-gallery-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="home-gallery-card">
            <div className="home-gallery-img-wrap" style={{ aspectRatio: '21/9' }}>
              <img src="/yafi-portfolio/assets/ADA/cover.png" alt="ASEAN Digital Award" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final Footer */}
      <section className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-name">Al Yafi</div>
          <div className="home-footer-links">
            <a href="mailto:wenyafi@gmail.com">Email</a>
            <a href="#">LinkedIn</a>
            <a href="#">Github</a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Works page ─── */
function WorksPage({ navigate }: { navigate: (p: Page) => void }) {
  const [filter, setFilter] = useState<Filter>('ALL')
  const filters: Filter[] = ['ALL', 'AI', 'MEDTECH', 'IoT', 'HARDWARE', 'RESEARCH']
  const [hoveredSkill, setHoveredSkill] = useState(0)

  const SKILLS = [
    { label: 'Desktop and Mobile Apps Aplication', img: '/yafi-portfolio/assets/work_hero/app_dev.png' },
    { label: 'UI/UX system', img: '/yafi-portfolio/assets/work_hero/uix.png' },
    { label: 'Hardware & Software Automation', img: '/yafi-portfolio/assets/work_hero/hard-software.png' },
    { label: '3D Model and Print', img: '/yafi-portfolio/assets/work_hero/3d.png' }
  ]

  return (
    <div className="page-enter">
      {/* Interactive Hero */}
      <section className="works-hero-interactive">
        {SKILLS.map((s, i) => (
          <div key={i} className={`hero-bg-layer ${hoveredSkill === i ? 'active' : ''}`}>
            <img src={s.img} alt="" />
          </div>
        ))}
        <div className="hero-overlay-dark" />

        <div className="hero-content-wrap">
          <div className="hero-side-label">Skills</div>
          <div className="hero-skills-list">
            {SKILLS.map((s, i) => (
              <button
                key={i}
                className={`skill-item ${hoveredSkill === i ? 'active' : ''}`}
                onMouseEnter={() => setHoveredSkill(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="filter-bar">
        {filters.map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid-wrap">
        {PROJECTS.map(p => {
          const hidden = filter !== 'ALL' && !p.filters.includes(filter)
          return (
            <div
              key={p.id}
              data-cur
              className={`tile ${hidden ? 'filtered-out' : ''}`}
              style={{ gridColumn: `span ${p.col}`, height: p.h }}
              onClick={() => {
                if (!hidden) {
                  if (p.id === 'croptic') window.open('https://croptic.co/', '_blank');
                  else navigate(p.id);
                }
              }}
            >
              <img className="tile-img" src={p.img} alt={p.alt} loading="lazy" />
              <div className="tile-overlay" />
              <span className="tile-num">{p.num}</span>
              <div className="tile-info">
                <div className="tile-name">{p.name}</div>
                <div className="tile-tags">{p.tags.map(t => <span key={t} className="tile-tag">{t}</span>)}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Marquee */}
      <Marquee />
      <Footer navigate={navigate} />
    </div>
  )
}

/* ─── LUDESC case study ─── */
function LudescPage({ navigate }: { navigate: (p: Page) => void }) {
  const { ref: r1, on: o1 } = useReveal(0.08)
  const { ref: r2, on: o2 } = useReveal(0.08)
  const { ref: r3, on: o3 } = useReveal(0.08)
  const { ref: r4, on: o4 } = useReveal(0.08)
  const { ref: r5, on: o5 } = useReveal(0.08)
  const { ref: r6, on: o6 } = useReveal(0.08)
  const { ref: r7, on: o7 } = useReveal(0.08)
  const { ref: r8, on: o8 } = useReveal(0.08)
  const { ref: r9, on: o9 } = useReveal(0.08)
  const { ref: r10, on: o10 } = useReveal(0.08)
  const { ref: r11, on: o11 } = useReveal(0.08)
  const { ref: r12, on: o12 } = useReveal(0.08)

  return (
    <div className="page-enter">
      {/* 1. LUDESC SUMMARY */}
      <div className="cs-hero">
        <img src="/yafi-portfolio/assets/ludesc/cover.png" alt="LUDESC Project Cover" />
        <div className="cs-hero-inner">
          <div className="cs-hero-label">PROJECT 01 — LUDESC</div>
          <h1 className="cs-title">Wireless Digital Stethoscope + AI + Telemedicine Ecosystem</h1>
          <div className="cs-meta">
            <div className="cs-meta-item"><span className="cs-meta-label">Role</span><span className="cs-meta-val">Solo Developer / Engineer</span></div>
            <div className="cs-meta-item"><span className="cs-meta-label">Type</span><span className="cs-meta-val">AI · MedTech · Systems</span></div>
          </div>
        </div>
      </div>

      <div className="cs-body">
        {/* 2. THE STORY BEGINS / REASON */}
        <div className="cs-section" ref={r1}>
          <div className="cs-2col">
            <div>
              <p className={`mono-label rv ${o1 ? 'on' : ''}`} style={{ marginBottom: 20, color: 'var(--accent)' }}>The Reason</p>
              <h2 className={`section-heading rv d1 ${o1 ? 'on' : ''}`}>
                Beyond the Sound.
              </h2>
            </div>
            <div className={`rv d2 ${o1 ? 'on' : ''}`} style={{ paddingTop: 16 }}>
              <p className="body-text" style={{ marginBottom: 20 }}>
                Traditional auscultation is limited by what a healthcare professional can interpret in the moment. The project was born from a need to bridge the gap in remote healthcare, where access to specialists is scarce and subjective interpretation can lead to delayed care.
              </p>
            </div>
          </div>
        </div>

        {/* 3. THE QUESTION / IDEA */}
        <div style={{ padding: '0 60px 80px', borderBottom: '1px solid var(--border)' }} ref={r2}>
          <div className={`rv ${o2 ? 'on' : ''}`} style={{
            fontSize: 'clamp(22px, 3.5vw, 52px)', fontWeight: 700,
            letterSpacing: '-0.03em', lineHeight: 1.1,
            borderLeft: '3px solid var(--accent)', paddingLeft: 36, color: 'var(--ink)',
          }}>
            "What if lung sounds could be digitized, analyzed, and shared safely anywhere in the world?"
          </div>
        </div>

        {/* 4. THE METHOD */}
        <div className="cs-section" ref={r3}>
          <p className={`mono-label rv ${o3 ? 'on' : ''}`} style={{ marginBottom: 40 }}>The Method / Layered Engineering</p>
          <p className={`body-text rv d1 ${o3 ? 'on' : ''}`} style={{ marginBottom: 40, maxWidth: 800 }}>
             I broke the complex challenge of digital healthcare into clear engineering layers: from capturing physiological signals to ensuring clinical usability and business readiness.
          </p>
          <div className="cs-3col">
            {[
              { l: 'SOUND ACQUISITION', d: 'Hardware & Sensor Engineering' },
              { l: 'AI DEVELOPMENT', d: 'Deep Learning (ViT + RAN)' },
              { l: 'TELEMEDICINE', d: 'Human-Centric Application' },
              { l: 'INTEGRATION', d: 'Full Ecosystem Synergy' },
              { l: 'BUSINESS', d: 'Productization & Packaging' },
            ].map((m, i) => (
              <div key={m.l} className={`cs-stat-cell rv d${i} ${o3 ? 'on' : ''}`} style={{ padding: '32px 0', borderRight: 'none', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>{m.l}</div>
                <span className="cs-stat-label" style={{ fontSize: 10 }}>{m.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. START TO BUILD EACH LAYER */}
        <div className="cs-section" ref={r4}>
          <div className="cs-sidebyside">
            <div style={{ height: 460 }} className={`rv d1 ${o4 ? 'on' : ''}`}>
              <img src="/yafi-portfolio/assets/ludesc/prcs_1.png" alt="Engineering Layer 1" style={{ height: '100%' }} />
            </div>
            <div style={{ height: 460 }} className={`rv d2 ${o4 ? 'on' : ''}`}>
              <img src="/yafi-portfolio/assets/ludesc/prcs_2.png" alt="Engineering Layer 2" style={{ height: '100%' }} />
            </div>
          </div>
          <div className={`rv d3 ${o4 ? 'on' : ''}`} style={{ marginTop: 40 }}>
            <p className="body-text">
               Every layer required rigorous experimentation—from electronic blueprints and component selection to signal filtering and transmission protocols.
            </p>
          </div>
        </div>

        {/* 6. FIRST PROTOTYPE 1.0 */}
        <div className="cs-section" ref={r5}>
          <div className="cs-2col">
            <div className={`rv ${o5 ? 'on' : ''}`}>
              <p className="mono-label" style={{ marginBottom: 20 }}>Prototype 1.0</p>
              <h2 className="section-heading" style={{ marginBottom: 24 }}>The First Functional Build.</h2>
              <p className="body-text">
                The 1.0 version was about proof of concept. It moved from breadboard circuits to a first functional enclosure, proving that wireless digital auscultation was not just possible, but viable.
              </p>
            </div>
            <div className={`rv d2 ${o5 ? 'on' : ''}`}>
              <img src="/yafi-portfolio/assets/ludesc/eng_1.png" alt="First Prototype" />
            </div>
          </div>
        </div>

        {/* 7. PROTOTYPE TO INDUSTRIAL DESIGN (2.0) */}
        <div className="cs-section" ref={r6} style={{ background: '#f9f9f7' }}>
          <p className="mono-label" style={{ marginBottom: 40 }}>Building the 2.0</p>
          <div className="more-works" style={{ gridTemplateColumns: 'repeat(4, 1fr)', background: 'none', padding: 0 }}>
             <img src="/yafi-portfolio/assets/ludesc/dsn_1.png" alt="Design 1" className={`rv d1 ${o6 ? 'on' : ''}`} />
             <img src="/yafi-portfolio/assets/ludesc/dsn_2.png" alt="Design 2" className={`rv d2 ${o6 ? 'on' : ''}`} />
             <img src="/yafi-portfolio/assets/ludesc/dsn_3.png" alt="Design 3" className={`rv d3 ${o6 ? 'on' : ''}`} />
             <img src="/yafi-portfolio/assets/ludesc/dsn_4.png" alt="Design 4" className={`rv d4 ${o6 ? 'on' : ''}`} />
          </div>
          <div className={`rv d5 ${o6 ? 'on' : ''}`} style={{ marginTop: 40, maxWidth: 800 }}>
             <h3 className="section-heading" style={{ fontSize: 32, marginBottom: 20 }}>From Lab to Life.</h3>
             <p className="body-text">
                The transition toward industrial design focused on ergonomics, portability, and interaction. The hardware had to stop behaving like an experiment and start feeling like a clinical tool.
             </p>
          </div>
        </div>

        {/* 8. AI DEVELOPMENT CORE */}
        <div className="cs-section" ref={r7}>
          <div className="cs-2col">
             <div className={`rv ${o7 ? 'on' : ''}`}>
                <p className="mono-label" style={{ marginBottom: 20, color: 'var(--accent)' }}>AI Core</p>
                <h2 className="section-heading">Vision Transformer + RAN.</h2>
                <p className="body-text" style={{ marginTop: 24 }}>
                   Intelligence is the heart of LUDESC. The system utilizes a hybrid ViT and Recurrent Attention Network architecture to analyze temporal breathing cycles and global acoustic patterns.
                </p>
                <div className="cs-stat-cell" style={{ padding: '32px 0', border: 'none' }}>
                   <div className="cs-stat-val" style={{ fontSize: 64 }}>99%</div>
                   <span className="cs-stat-label">Model reported accuracy</span>
                </div>
             </div>
             <div className={`rv d2 ${o7 ? 'on' : ''}`}>
                <img src="/yafi-portfolio/assets/ludesc/eng_3.png" alt="AI Model Development" />
             </div>
          </div>
        </div>

        {/* 9. TELEMEDICINE APP / 10. RESULTS */}
        <div className="cs-section" ref={r8}>
          <div className={`rv ${o8 ? 'on' : ''}`} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
            <p className="mono-label" style={{ marginBottom: 20 }}>Designed for Humans, Not Manuals</p>
            <h2 className="section-heading">Telemedicine Interface.</h2>
            <p className="body-text">
              The application connects patient data with AI-driven clinical insights. It was designed to prioritize the healthcare professional's workflow, ensuring that technology assists rather than complicates.
            </p>
          </div>
          <div className={`rv d2 ${o8 ? 'on' : ''}`} style={{ background: '#FFFFFF', padding: '60px', textAlign: 'center' }}>
             <img src="/yafi-portfolio/assets/ludesc/UI_1.png" alt="Telemedicine Results" style={{ maxHeight: 600, margin: '0 auto' }} />
          </div>
        </div>

        {/* 11. FULL SYSTEM INTEGRATION */}
        <div className="cs-section" ref={r9}>
          <div className="cs-2col" style={{ alignItems: 'center' }}>
            <div className={`rv ${o9 ? 'on' : ''}`}>
               <p className="mono-label">One Ecosystem</p>
               <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>Hardware and Application Synergy.</h2>
            </div>
            <div className={`rv d1 ${o9 ? 'on' : ''}`}>
               <p className="body-text">
                  Individual components—the stethoscope, the wireless bridge, the AI models, and the UI—now operate as a single unified system. This integration allows for seamless clinical decision support from the first breath to the final diagnosis.
               </p>
            </div>
          </div>
        </div>

        {/* 12. ETHICAL CLEARANCE & REAL LIFE IMPLEMENTATION */}
        <div className="cs-fullbleed" style={{ height: '70vh' }}>
          <img src="/yafi-portfolio/assets/ludesc/prcs_5.png" alt="Clinical Implementation" style={{ height: '100%', filter: 'brightness(0.9)' }} />
          <div style={{ position: 'absolute', bottom: 40, left: 60, color: '#fff' }}>
             <p className="mono-label" style={{ color: '#fff', opacity: 0.8, marginBottom: 8 }}>Validation</p>
             <h3 style={{ fontSize: 32, fontWeight: 800 }}>WHO Ethical Clearance.</h3>
             <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 450 }}>Marking the transition to real-world healthcare research, documented using the seven-standard ethical framework.</p>
          </div>
        </div>

        {/* 13. PACKAGING THE TECHNOLOGY */}
        <div className="cs-section" ref={r10}>
           <div className="cs-2col">
              <div className={`rv ${o10 ? 'on' : ''}`}>
                 <img src="/yafi-portfolio/assets/ludesc/prcs_4.png" alt="Technology Packaging" />
              </div>
              <div className={`rv d1 ${o10 ? 'on' : ''}`} style={{ alignSelf: 'center' }}>
                 <p className="mono-label" style={{ marginBottom: 20 }}>From Engineering to Business</p>
                 <h2 className="section-heading">Packaging the Technology.</h2>
                 <p className="body-text">
                   The journey required moving beyond engineering toward product readiness. This included branding, presentation, and system visuals that communicate the maturity of the LUDESC platform.
                 </p>
              </div>
           </div>
        </div>

        {/* 14. GOING GLOBAL */}
        <div className="cs-section" ref={r11}>
           <div className={`rv ${o11 ? 'on' : ''}`} style={{ marginBottom: 60 }}>
              <p className="mono-label">Going Global</p>
              <h2 className="section-heading" style={{ marginTop: 12 }}>Competing at the Highest Level.</h2>
           </div>
           <div className="grid-wrap" style={{ background: 'none' }}>
              {[
                { s: 4, i: '/yafi-portfolio/assets/ludesc/1.png' },
                { s: 8, i: '/yafi-portfolio/assets/ludesc/2.png' },
                { s: 5, i: '/yafi-portfolio/assets/ludesc/3.png' },
                { s: 7, i: '/yafi-portfolio/assets/ludesc/5.png' },
                { s: 6, i: '/yafi-portfolio/assets/ludesc/6.png' },
                { s: 6, i: '/yafi-portfolio/assets/ludesc/7.png' },
                { s: 4, i: '/yafi-portfolio/assets/ludesc/8.png' },
                { s: 8, i: '/yafi-portfolio/assets/ludesc/9.png' },
              ].map((img, i) => (
                <div key={i} className={`tile rv d${i%5} ${o11 ? 'on' : ''}`} style={{ gridColumn: `span ${img.s}`, height: 360 }}>
                   <img className="tile-img" src={img.i} alt="" loading="lazy" />
                </div>
              ))}
           </div>
        </div>

        {/* 15. SUMMARY */}
        <div className="cs-section" ref={r12} style={{ borderBottom: 'none', paddingBottom: 120 }}>
           <div className={`rv ${o12 ? 'on' : ''}`} style={{ maxWidth: 800 }}>
              <p className="mono-label" style={{ marginBottom: 20, color: 'var(--accent)' }}>Summary</p>
              <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginBottom: 32 }}>Built Solo. From Idea to Global Stage.</h2>
              <p className="body-text">
                LUDESC is the result of transforming a single curiosity into a validated healthcare ecosystem. From the first breadboard circuit to being recognized as a Gold Winner at the ASEAN Digital Awards 2025, the project proves that engineering focused on real-world impact can compete on the world's highest stages.
              </p>
           </div>
           <div className={`rv d2 ${o12 ? 'on' : ''}`} style={{ marginTop: 80 }}>
              <img src="/yafi-portfolio/assets/ludesc/10.png" alt="Global Recognition" style={{ width: '100%', maxHeight: '80vh', objectFit: 'cover' }} />
           </div>
        </div>

        {/* VISUAL ARCHIVE GALLERY */}
        <div style={{ padding: '60px 60px 20px', borderTop: '1px solid var(--border)' }}>
          <p className="mono-label">Project Archive / Visual History</p>
        </div>
        <div className="grid-wrap" style={{ padding: 4 }}>
          {[
            { i: '/yafi-portfolio/assets/ludesc/cover.png', c: 6 },
            { i: '/yafi-portfolio/assets/ludesc/eng_1.png', c: 3 },
            { i: '/yafi-portfolio/assets/ludesc/eng_02.png', c: 3 },
            { i: '/yafi-portfolio/assets/ludesc/prcs_1.png', c: 4 },
            { i: '/yafi-portfolio/assets/ludesc/prcs_2.png', c: 4 },
            { i: '/yafi-portfolio/assets/ludesc/prcs_3.png', c: 4 },
            { i: '/yafi-portfolio/assets/ludesc/dsn_1.png', c: 3 },
            { i: '/yafi-portfolio/assets/ludesc/dsn_2.png', c: 3 },
            { i: '/yafi-portfolio/assets/ludesc/dsn_3.png', c: 3 },
            { i: '/yafi-portfolio/assets/ludesc/dsn_4.png', c: 3 },
            { i: '/yafi-portfolio/assets/ludesc/eng_3.png', c: 7 },
            { i: '/yafi-portfolio/assets/ludesc/UI_1.png', c: 5 },
            { i: '/yafi-portfolio/assets/ludesc/prcs_4.png', c: 6 },
            { i: '/yafi-portfolio/assets/ludesc/prcs_5.png', c: 6 },
            { i: '/yafi-portfolio/assets/ludesc/9.png', c: 12 },
          ].map((item, i) => (
            <div key={i} className="tile" style={{ gridColumn: `span ${item.c}`, height: 320 }}>
               <img className="tile-img" src={item.i} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        <div style={{ padding: '120px 60px 48px' }}>
          <p className="mono-label" style={{ marginBottom: 28 }}>More Work</p>
        </div>
        <div className="more-works">
          {PROJECTS.filter(p => p.id !== 'ludesc').slice(0, 3).map(p => (
            <div key={p.id} className="more-tile" onClick={() => navigate(p.id)}>
              <img src={p.img} alt={p.alt} />
              <div className="more-tile-info">
                <div className="more-tile-name">{p.name}</div>
                <div className="more-tile-cat">{p.tags.slice(0, 2).join(' · ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  )
}

/* ─── Generic case study (for other projects) ─── */
function GenericStudy({ id, navigate }: { id: Page; navigate: (p: Page) => void }) {
  const p = PROJECTS.find(x => x.id === id)!
  const { ref, on } = useReveal(0.08)
  const details: Record<string, { img: string; challenge: string; approach: string; outcome: string }> = {
    gcov: {
      img: '/yafi-portfolio/assets/G-cov/cover.png',
      challenge: 'Detecting COVID-19 severity quickly and reliably without overwhelming hospital infrastructure — especially in regions where specialist radiologists are scarce.',
      approach: 'Deep learning system using VGG16 architecture, trained on 800 chest X-rays from RSUDZA Hospital. Integrated with wearable biosensors (temperature, pulse, SpO₂) for continuous monitoring and an asynchronous telemedicine module for direct treatment guidance.',
      outcome: '95% classification accuracy across COVID-19 severity grades. AI-powered chest X-ray analysis combined with wearable monitoring creates a safer, smarter bridge between medical workers and patients — especially in areas with limited access to timely healthcare.',
    },
    hazard: {
      img: '/yafi-portfolio/assets/Smart Hazard Triangle/cover.png',
      challenge: 'When a vehicle stops due to an emergency, nearby drivers should be warned before they can visually see the hazard — especially on curved or high-speed roads at night.',
      approach: 'The hazard triangle continuously broadcasts its presence via Bluetooth Low Energy (BLE) while simultaneously sharing its real-time GPS location. Nearby vehicles automatically receive hazard alerts displaying the precise location on a digital map. Hardware: electronics, power management, enclosure. Embedded: GPS + BLE logic. Mobile: UI/UX for real-time hazard awareness and SOS.',
      outcome: 'A smart hazard triangle that transforms passive roadside safety into active, connected prevention. Demonstrates how IoT, positioning systems, and human-centered design can reduce accidents and save lives.',
    },
    asd: {
      img: '/yafi-portfolio/assets/ASD detection/cover.png',
      challenge: 'ASD screening in environments with limited access to specialized diagnostic tools. Existing methods rely on subjective behavioral observation — slow, expensive, and inaccessible.',
      approach: 'Multi-channel EEG headset captures brainwave signals. Signal preprocessing, feature extraction, and deep learning models classify ASD-related brainwave characteristics. Results visualized through a mobile application enabling clear interpretation for clinicians and caregivers without requiring lab equipment.',
      outcome: 'A non-invasive, cost-effective support tool for ASD detection. Demonstrates how neuro-signal processing and AI can bridge the gap between clinical neuroscience and accessible digital health solutions.',
    },
    croptic: {
      img: '/yafi-portfolio/assets/Croptic/cover.png',
      challenge: 'RSPO compliance in palm oil is declared, not verified. Manual audits are slow, fragmented, and easily gamed. Stakeholders need measurable, transparent, verifiable sustainability data.',
      approach: 'Aerial drone mapping creates complete up-to-date spatial representation of plantation areas. Drone-captured data processed into geospatial layers for precise boundary mapping. AI pipeline: Geo-referencing & orthomosaics → NDVI / spectral index → Tree & infrastructure detection → Age & health classification → Yield & risk prediction.',
      outcome: 'A digital verification platform enabling the palm oil industry to move from manual audits to technology-driven sustainability verification. By combining drone intelligence and digital governance, Croptic supports ecosystem protection while maintaining industrial efficiency.',
    },
  }
  const d = details[id as string] || details.gcov

  return (
    <div className="page-enter">
      <div className="cs-hero">
        <img src={d.img} alt={p.name} />
        <div className="cs-hero-inner">
          <div className="cs-hero-label">FEATURE STORY {p.num} — {p.name}</div>
          <h1 className="cs-title">{p.tagline}</h1>
          <div className="cs-meta">
            <div className="cs-meta-item"><span className="cs-meta-label">Year</span><span className="cs-meta-val">2021 – 2022</span></div>
            <div className="cs-meta-item"><span className="cs-meta-label">Role</span><span className="cs-meta-val">Co-Founder & Lead Engineer</span></div>
            <div className="cs-meta-item"><span className="cs-meta-label">Location</span><span className="cs-meta-val">Banda Aceh, Indonesia</span></div>
            <div className="cs-meta-item"><span className="cs-meta-label">Tags</span><span className="cs-meta-val">{p.tags.join(' · ')}</span></div>
          </div>
        </div>
      </div>

      <div className="cs-body">
        <div className="cs-section" ref={ref}>
          <div className="cs-2col">
            <div>
              <p className={`mono-label rv ${on ? 'on' : ''}`} style={{ marginBottom: 20, color: 'var(--accent)' }}>The Challenge</p>
              <p className={`body-text rv d1 ${on ? 'on' : ''}`}>{d.challenge}</p>
            </div>
            <div>
              <p className={`mono-label rv d2 ${on ? 'on' : ''}`} style={{ marginBottom: 20, color: 'var(--accent)' }}>Approach & Outcome</p>
              <p className={`body-text rv d3 ${on ? 'on' : ''}`} style={{ marginBottom: 20 }}>{d.approach}</p>
              <p className={`body-text rv d4 ${on ? 'on' : ''}`}>{d.outcome}</p>
            </div>
          </div>
        </div>

        <div className="cs-fullbleed" style={{ height: '50vh' }}>
          <img src={p.img} alt={p.name} style={{ height: '100%', filter: 'brightness(0.85)' }} />
        </div>

        <div style={{ padding: '48px 60px 60px' }}>
          <p className="mono-label" style={{ marginBottom: 28 }}>More Work</p>
        </div>
        <div className="more-works">
          {PROJECTS.filter(x => x.id !== id).slice(0, 3).map(pr => (
            <div key={pr.id} className="more-tile" onClick={() => navigate(pr.id)}>
              <img src={pr.img} alt={pr.alt} />
              <div className="more-tile-info">
                <div className="more-tile-name">{pr.name}</div>
                <div className="more-tile-cat">{pr.tags.slice(0, 2).join(' · ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  )
}

/* ─── About page ─── */
function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  const { ref: r1, on: o1 } = useReveal(0.08)
  const { ref: r2, on: o2 } = useReveal(0.08)
  const { ref: r3, on: o3 } = useReveal(0.08)
  const { ref: r4, on: o4 } = useReveal(0.08)

  return (
    <div className="page-enter">
      {/* 1. Full Screen Hero */}
      <section className="about-hero-full">
        <img
          src="/yafi-portfolio/assets/work.png"
          alt="Work Hero"
          className="about-hero-full-img"
        />
        <div className="about-hero-full-content">
          <h1 className="about-hero-full-title">Hello!\nI'm  Al Yafi</h1>
        </div>
      </section>

      {/* 2. Biography Content */}
      <div className="cs-body" style={{ background: 'var(--bg)' }}>
        <div className="about-content-section" ref={r1}>
          <div className="about-intro-grid">
            {/* Left: Bio Text */}
            <div className={`rv d1 ${o1 ? 'on' : ''}`}>
              <h2 className="about-subtitle-main" style={{ color: 'var(--accent)' }}>
                I Build Intelligent Systems.
              </h2>
              <div className="about-bio-rich-text">
                <p>
                  My journey is built on <strong>curiosity, creativity, and the desire to turn ideas into impactful solutions</strong>. This portfolio is not just a showcase, it's a story. <strong>Welcome to my world!</strong>
                </p>
                <p>
                  I'm a computer engineer who thrives at the intersection of <strong>AI, healthcare, and creative technology</strong>. My background in deep learning for image & signal classification has grown into a <strong>passion for building end-to-end solutions</strong>: from concept to prototype, and from prototype to impact.
                </p>
                <p>
                  I've led and contributed to projects ranging from medical device innovation to cross discipline project like agriculture and daily life solutions. My work has been recognized internationally, including <strong>one of the 100 World Innovators at Dubai Future Solutions - Prototype for Humanity, IYSA Special Award, and ASEAN Digital Award 2025 winner</strong>.
                </p>

                <div className="about-manifesto" style={{ marginTop: 64 }}>
                  <h3 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 800, lineHeight: 1.2 }}>
                    I love to approach technology as <span style={{ color: 'var(--accent)' }}>a bold, relentless journey</span>. One that <span style={{ color: 'var(--accent)' }}>starts with curiosity</span>, thrives on experimentation, and <span style={{ color: 'var(--accent)' }}>pushes limits to discover new possibilities</span>. I believe in creating solutions that don't just work but inspire, empower, and <span style={{ color: 'var(--accent)' }}>make a difference</span>.
                  </h3>
                </div>
              </div>
            </div>

            {/* Right: Portrait Pict */}
            <div className={`rv d2 ${o1 ? 'on' : ''}`}>
              <img
                src="/yafi-portfolio/assets/potrait.png"
                alt="Al Yafi — portrait"
                className="about-portrait-fixed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Three traits */}
      <div style={{ padding: '80px 60px' }} ref={r1}>
        <p className={`mono-label rv ${o1 ? 'on' : ''}`} style={{ marginBottom: 36 }}>Core Traits</p>
        {[
          { n: '01', w: 'ENGINEER', d: 'Full-stack technical execution — from analog circuit design and 3D-printed enclosures to deep learning models and mobile applications. No layer is left to others.' },
          { n: '02', w: 'BUILDER', d: 'Ideas only matter when they work in the real world. Every project is designed to be deployed, tested in clinical environments, used by actual people.' },
          { n: '03', w: 'EXPLORER', d: 'Curiosity is the engine. Whether it\'s brain signals, lung sounds, drone imagery or road safety — every problem is an invitation to understand something entirely new.' },
        ].map((t, i) => (
          <div key={t.w} className={`trait-row rv d${i} ${o1 ? 'on' : ''}`}>
            <span className="trait-n">{t.n}</span>
            <div className="trait-word">{t.w}</div>
            <p className="trait-desc">{t.d}</p>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>

      {/* Experience timeline */}
      <div style={{ padding: '0 60px 80px' }} ref={r2}>
        <p className={`mono-label rv ${o2 ? 'on' : ''}`} style={{ marginBottom: 36 }}>Experience & Projects</p>
        {[
          { p: '2023 – 2025', r: 'Founder & Lead Engineer', o: 'LUDESC', d: 'Co-founded, designed, and built an AI-driven wireless digital stethoscope from concept to clinical validation. Led hardware design, AI development, telemedicine integration, and international recognition.' },
          { p: '2021 – 2022', r: 'Co-Founder & Lead Engineer', o: 'G-COV', d: 'Developed AI-powered chest X-ray analysis for COVID-19 severity classification using VGG16. Integrated wearable biosensors and asynchronous telemedicine for remote patient monitoring.' },
          { p: '2021 – 2022', r: 'Lead Engineer', o: 'Hazard Triangle', d: 'Designed and built a GPS + BLE smart hazard triangle transforming passive roadside safety into an active connected system with full hardware design and mobile app integration.' },
          { p: '2021 – 2022', r: 'Researcher & Engineer', o: 'ASD Detection', d: 'Designed an EEG-based ASD detection system integrating multi-channel brain signal processing, deep learning classification, and a mobile diagnostic application.' },
          { p: '2021 – 2022', r: 'Co-Founder & Lead Engineer', o: 'Croptic', d: 'Built a drone-based digital verification platform for palm oil RSPO sustainability compliance, combining aerial mapping, AI geospatial analysis, and centralized reporting.' },
        ].map((item, i) => (
          <div key={item.o} className={`vita-row rv d${Math.min(i, 5)} ${o2 ? 'on' : ''}`}>
            <div className="vita-period">{item.p}</div>
            <div>
              <div className="vita-role">{item.r}</div>
              <div className="vita-org">{item.o}</div>
              <p className="vita-desc">{item.d}</p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>

      {/* Skills */}
      <div style={{ padding: '0 60px 80px' }} ref={r3}>
        <p className={`mono-label rv ${o3 ? 'on' : ''}`} style={{ marginBottom: 12 }}>Technical Skills</p>
        {[
          { d: 'Artificial Intelligence', chips: ['Vision Transformer (ViT)', 'RAN', 'CNN · LSTM', 'VGG16', 'Transfer Learning', 'Deep Learning'] },
          { d: 'Signal Processing', chips: ['EEG Analysis', 'Respiratory Sound', 'MFCC', 'Chromagram', 'Biomedical Filtering', 'Spectrogram'] },
          { d: 'Software', chips: ['Python', 'Flutter', 'Firebase', 'TensorFlow', 'Keras', 'REST API'] },
          { d: 'Hardware & Electronics', chips: ['ESP32', 'PCB Design', 'Op-Amp Filters', 'Soldering', '3D Printing', 'Acoustic Engineering'] },
          { d: 'IoT & Connectivity', chips: ['Bluetooth Low Energy', 'GPS Integration', 'Wireless Protocols', 'Embedded Systems'] },
          { d: 'Geospatial & Systems', chips: ['Drone Mapping', 'NDVI Analysis', 'GeoReferencing', 'System Integration'] },
        ].map((s, i) => (
          <div key={s.d} className={`skill-row rv d${Math.min(i % 4, 5)} ${o3 ? 'on' : ''}`}>
            <span className="skill-domain">{s.d}</span>
            <div className="skill-chips">{s.chips.map(c => <span key={c} className="skill-chip">{c}</span>)}</div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>

      {/* CTA */}
      <div style={{ padding: '40px 60px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }} ref={r4}>
        <div className={`rv ${o4 ? 'on' : ''}`}>
          <p className="mono-label" style={{ marginBottom: 12 }}>Interested in working together?</p>
          <p className="body-text" style={{ maxWidth: 420 }}>I'm open to opportunities in AI engineering, medtech hardware, research collaborations, and intelligent systems — anywhere at the intersection of deep technology and real-world impact.
          </p>
        </div>
        <button className={`rv d2 ${o4 ? 'on' : ''}`} onClick={() => navigate('contact')} style={{
          padding: '14px 32px', background: 'var(--ink)', color: 'var(--bg)',
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
          cursor: 'pointer', transition: 'background 0.2s', border: 'none',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
        >GET IN TOUCH →</button>
      </div>

      <Footer navigate={navigate} />
    </div>
  )
}

/* ─── Contact page ─── */
function ContactPage({ navigate }: { navigate: (p: Page) => void }) {
  const { ref, on } = useReveal(0.05)
  return (
    <div className="page-enter">
      <div className="contact-wrap" ref={ref}>
        <p className={`mono-label rv ${on ? 'on' : ''}`} style={{ marginBottom: 36 }}>Get in Touch</p>
        <div className="contact-headline">
          <div className={`rv d1 ${on ? 'on' : ''}`}>LET'S BUILD</div>
          <div className={`rv d2 ${on ? 'on' : ''}`}>SOMETHING</div>
          <div className={`rv d3 ${on ? 'on' : ''} accent-text`}>USEFUL.</div>
        </div>

        <p className={`body-text rv d4 ${on ? 'on' : ''}`} style={{ maxWidth: 460, marginTop: 48, lineHeight: 1.8 }}>
          I'm open to opportunities in AI engineering, medtech hardware, research collaborations, and intelligent systems — anywhere at the intersection of deep technology and real-world impact.
        </p>

        <div className={`contact-grid rv d5 ${on ? 'on' : ''}`} style={{ marginTop: 80 }}>
          {[
            { label: 'EMAIL', val: 'wenyafi@gmail.com', href: 'mailto:wenyafi@gmail.com' },
            { label: 'LINKEDIN', val: 'linkedin.com/in/al-yafi/', href: '#' },
            { label: 'GITHUB', val: 'github.com/alyafi0899', href: '#' },
          ].map(c => (
            <a key={c.label} href={c.href} className="contact-cell">
              <div className="contact-cell-label">{c.label}</div>
              <div className="contact-cell-val">{c.val}</div>
              <span className="contact-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  )
}

/* ─── App / Router ─── */
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [transitioning, setTransitioning] = useState(false)

  function navigate(to: Page) {
    if (to === page) return
    setTransitioning(true)
    setTimeout(() => { setPage(to); window.scrollTo({ top: 0, behavior: 'instant' }); setTransitioning(false) }, 320)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', opacity: transitioning ? 0 : 1, transition: 'opacity 0.32s ease' }}>
      <Cursor />
      <Nav page={page} navigate={navigate} />
      <div style={{ paddingTop: page === 'contact' ? 60 : 0 }}>
        {page === 'home'    && <HomePage    navigate={navigate} />}
        {page === 'works'   && <WorksPage   navigate={navigate} />}
        {page === 'ludesc'  && <LudescPage  navigate={navigate} />}
        {page === 'gcov'    && <GenericStudy id="gcov"    navigate={navigate} />}
        {page === 'hazard'  && <GenericStudy id="hazard"  navigate={navigate} />}
        {page === 'asd'     && <GenericStudy id="asd"     navigate={navigate} />}
        {page === 'croptic' && <GenericStudy id="croptic" navigate={navigate} />}
        {page === 'about'   && <AboutPage   navigate={navigate} />}
        {page === 'contact' && <ContactPage navigate={navigate} />}
      </div>
    </div>
  )
}
