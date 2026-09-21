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
  const items = ['LUDESC', '·', 'G-COV', '·', 'HAZARD TRIANGLE', '·', 'ASD DETECTION', '·', 'CROPTIC', '·', 'AI', '·', 'MEDTECH', '·', 'HARDWARE', '·', 'SIGNAL', '·', 'IoT', '·']
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
    alt: 'Hands holding the LUDESC digital stethoscope device',
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
    alt: 'Night street scene representing smart roadside safety',
    col: 4, h: 480,
  },
  {
    id: 'asd', num: '04', name: 'ASD DETECTION',
    tagline: 'EEG brainwave AI analysis for autism spectrum screening',
    tags: ['AI', 'EEG', 'SIGNAL', 'NEURO'],
    filters: ['AI', 'RESEARCH'],
    img: '/yafi-portfolio/assets/ASD detection/cover.png',
    alt: 'Abstract blue wave signal representing EEG brainwave patterns',
    col: 8, h: 480,
  },
  {
    id: 'croptic', num: '05', name: 'CROPTIC',
    tagline: 'Drone-based RSPO compliance verification platform',
    tags: ['AI', 'GEOSPATIAL', 'DRONE', 'ESG'],
    filters: ['AI', 'RESEARCH'],
    img: '/yafi-portfolio/assets/Croptic/cover.png',
    alt: 'Aerial view of plantation rows for RSPO compliance',
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

        {/* Index cards at bottom */}
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
            Hello! I'm Yafi, a designer creating holistic experiences and systems rooted in empathy, care, and a love for detail. 🔍
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
          {PROJECTS.slice(0, 5).map(p => (
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
              onClick={() => !hidden && navigate(p.id)}
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
  const { ref: r13, on: o13 } = useReveal(0.08)
  const { ref: r14, on: o14 } = useReveal(0.08)
  const { ref: r15, on: o15 } = useReveal(0.08)

  return (
    <div className="page-enter">
      {/* SECTION 01 — OPENING / THE PROJECT */}
      <div className="cs-hero">
        <img src="/yafi-portfolio/assets/ludesc/cover.png" alt="LUDESC wireless digital stethoscope" />
        <div className="cs-hero-inner">
          <div className="cs-hero-label">LUDESC / HEALTHCARE AI</div>
          <h1 className="cs-title">Building a Stethoscope for a More Connected Healthcare System</h1>
          <div className="cs-meta">
            <div className="cs-meta-item">
              <span className="cs-meta-label">Introduction</span>
              <span className="cs-meta-val" style={{ maxWidth: 500, lineHeight: 1.6 }}>
                LUDESC began with a simple question: what if lung sounds could be digitized, analyzed, and shared instead of remaining trapped inside a conventional stethoscope?
              </span>
            </div>
            <div className="cs-meta-item"><span className="cs-meta-label">Type</span><span className="cs-meta-val">AI · MedTech · Hardware</span></div>
          </div>
        </div>
      </div>

      <div className="cs-body">
        {/* SECTION 02 — THE PROBLEM */}
        <div className="cs-section" ref={r1}>
          <div className="cs-2col">
            <div>
              <p className={`mono-label rv ${o1 ? 'on' : ''}`} style={{ marginBottom: 20, color: 'var(--accent)' }}>The Problem</p>
              <h2 className={`section-heading rv d1 ${o1 ? 'on' : ''}`}>
                Making Healthcare Safer With LUDESC
              </h2>
            </div>
            <div className={`rv d2 ${o1 ? 'on' : ''}`} style={{ paddingTop: 16 }}>
              <p className="body-text" style={{ marginBottom: 20 }}>
                Traditional auscultation depends heavily on what a healthcare professional can hear and interpret in the moment. This analog interaction creates significant barriers to reliable respiratory care.
              </p>
              <p className="body-text" style={{ marginBottom: 20 }}>
                Subjective interpretation, the difficulty of documenting sounds, and limited access to remote specialists often delay critical diagnostics. The larger goal was to turn this analog clinical interaction into a digital healthcare workflow.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 03 — THE IDEA */}
        <div className="cs-section" ref={r2} style={{ background: 'var(--tile-dark)', color: '#fff', borderTop: 'none' }}>
          <div className="cs-2col" style={{ alignItems: 'center' }}>
            <div className={`rv ${o2 ? 'on' : ''}`}>
              <p className="mono-label" style={{ marginBottom: 20, color: 'rgba(255,255,255,0.4)' }}>THE IDEA / TURNING CURIOSITY INTO DIRECTION</p>
              <h3 className="section-heading" style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 56px)', marginBottom: 32 }}>
                "What if lung sounds could be digitized, analyzed, and shared?"
              </h3>
              <p className="body-text" style={{ color: 'rgba(255,255,255,0.6)' }}>
                This wasn't just about curiosity; it was about defining a concrete engineering problem. The journey from capture to communication required a systematic pipeline: Capture → Digitize → Analyze → Communicate → Assist.
              </p>
            </div>
            <div className={`rv d2 ${o2 ? 'on' : ''}`}>
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=1200&fit=crop&q=85" alt="Abstract diagnostic visualization" style={{ borderRadius: 0, filter: 'brightness(0.8)' }} />
            </div>
          </div>
        </div>

        {/* SECTION 04 — THE METHOD */}
        <div className="cs-section" ref={r3}>
          <div className="cs-2col">
            <div>
              <p className={`mono-label rv ${o3 ? 'on' : ''}`} style={{ marginBottom: 20 }}>The Method / How I Built It</p>
              <p className={`body-text rv d1 ${o3 ? 'on' : ''}`}>
                LUDESC was developed through iterative engineering rather than a single implementation. It required working across physical hardware, electronics, signal processing, machine learning, software, and strict healthcare requirements.
              </p>
            </div>
            <div className={`rv d2 ${o3 ? 'on' : ''}`}>
              <div className="pipeline" style={{ marginTop: 0 }}>
                {['Research', 'Hardware Experimentation', 'Signal Acquisition', 'Prototype', 'Data Collection', 'AI Development', 'Software', 'System Integration', 'Validation', 'Real-world Implementation'].map((step, i) => (
                  <div key={step}>
                    <div className="pipe-node">
                      <div className="pipe-dot active" />
                      <span className="pipe-label active">{step}</span>
                    </div>
                    {i < 9 && <div className="pipe-line" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 05 — DATA ACQUISITION */}
        <div className="cs-section" ref={r4} style={{ paddingBottom: 0 }}>
          <div className="cs-2col" style={{ gap: 40 }}>
            <div className={`rv ${o4 ? 'on' : ''}`}>
              <img src="/yafi-portfolio/assets/work_hero/hard-software.png" alt="Hardware signal capture detail" style={{ height: 500, objectFit: 'cover' }} />
            </div>
            <div className={`rv d1 ${o4 ? 'on' : ''}`} style={{ alignSelf: 'center' }}>
              <p className="mono-label" style={{ marginBottom: 20 }}>Engineering the First Connection</p>
              <h3 className="section-heading" style={{ fontSize: 'clamp(24px, 3vw, 42px)', marginBottom: 24 }}>Capturing Usable Data</h3>
              <p className="body-text">
                The challenge was not simply recording audio. The system had to create a reliable connection between: patient → sensor → hardware → digital signal → AI pipeline. Engineering focus remained on acoustic capture, sensor integration, and signal quality to ensure repeatability for machine learning.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 06 — FIRST PROTOTYPE */}
        <div className="cs-section" ref={r5}>
          <div className="cs-2col">
            <div className={`rv ${o5 ? 'on' : ''}`}>
              <p className="mono-label" style={{ marginBottom: 20 }}>Building the First Prototype</p>
              <p className="body-text" style={{ marginBottom: 32 }}>
                The first prototype was deliberately simple. The goal was not to make it beautiful. The goal was to prove that the idea could work. Imperfect and honest, it moved from breadboard circuits to the first enclosure.
              </p>
              <div className="cs-meta" style={{ marginTop: 0, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                 <div className="cs-meta-item"><span className="cs-meta-label">Evolution</span><span className="cs-meta-val" style={{ color: 'var(--ink)' }}>Concept → Circuit → Prototype</span></div>
              </div>
            </div>
            <div className={`rv d2 ${o5 ? 'on' : ''}`}>
              <img src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1000&h=800&fit=crop&q=80" alt="Early electronics assembly" />
            </div>
          </div>
        </div>

        {/* SECTION 07 — LUDESC 1.0 */}
        <div className="cs-fullbleed" style={{ height: '60vh' }}>
          <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1800&h=900&fit=crop&q=90" alt="Clinical testing of LUDESC 1.0" style={{ height: '100%', filter: 'brightness(0.9)' }} />
          <div style={{ position: 'absolute', bottom: 40, left: 60, color: '#fff' }}>
             <p className="mono-label" style={{ color: '#fff', opacity: 0.8, marginBottom: 8 }}>SECTION 07 — LUDESC 1.0</p>
             <h3 style={{ fontSize: 32, fontWeight: 800 }}>Building the 1.0</h3>
             <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 400 }}>Transforming the concept from an experiment into a usable device with wireless transmission and compact hardware.</p>
          </div>
        </div>

        {/* SECTION 08 — LUDESC 2.0 */}
        <div className="cs-section" ref={r6}>
          <p className={`mono-label rv ${o6 ? 'on' : ''}`} style={{ marginBottom: 40 }}>Building the 2.0</p>
          <div className="cs-sidebyside">
            <div style={{ height: 500 }} className={`rv d1 ${o6 ? 'on' : ''}`}>
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&h=1000&fit=crop&q=85" alt="Refined electronics integration" style={{ height: '100%' }} />
            </div>
            <div style={{ height: 500 }} className={`rv d2 ${o6 ? 'on' : ''}`}>
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&h=1000&fit=crop&q=85" alt="Assembly of 2.0 prototype" style={{ height: '100%' }} />
            </div>
          </div>
          <div className={`rv d3 ${o6 ? 'on' : ''}`} style={{ marginTop: 40, maxWidth: 600 }}>
            <p className="body-text">
              The project matured through iteration. Later hardware versions focused on physical form, electronics integration, and overall reliability, moving LUDESC toward a product-oriented device.
            </p>
          </div>
        </div>

        {/* SECTION 09 — FROM PROTOTYPE TO INDUSTRIAL DESIGN */}
        <div className="cs-section" ref={r7} style={{ background: '#f9f9f7' }}>
          <div className="cs-2col">
            <div className={`rv ${o7 ? 'on' : ''}`}>
              <p className="mono-label" style={{ marginBottom: 20 }}>Industrial Design</p>
              <h2 className="section-heading" style={{ marginBottom: 24 }}>From Prototype to Industrial Design</h2>
              <p className="body-text">
                The hardware had to stop looking like a laboratory experiment and start behaving like something that could exist in the real world. We focused on ergonomics, portability, and manufacturability.
              </p>
            </div>
            <div className={`rv d2 ${o7 ? 'on' : ''}`}>
              <img src="/yafi-portfolio/assets/work_hero/3d.png" alt="3D model of LUDESC enclosure" style={{ width: '100%', borderRadius: 0 }} />
            </div>
          </div>
        </div>

        {/* SECTION 10 — AI */}
        <div className="cs-section" ref={r8}>
          <div className="cs-2col">
            <div className={`rv ${o8 ? 'on' : ''}`}>
              <p className="mono-label" style={{ marginBottom: 20, color: 'var(--accent)' }}>AI Development</p>
              <h3 className="section-heading" style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', marginBottom: 24 }}>Intelligence at the Core</h3>
              <p className="body-text" style={{ marginBottom: 20 }}>
                The foundation of LUDESC is an AI system capable of analyzing complex lung sound patterns. Using a hybrid Vision Transformer (ViT) and RAN architecture, the model classifies respiratory signals with clinical precision.
              </p>
              <div className="cs-3col" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                 <div className="cs-stat-cell" style={{ padding: '24px 0', border: 'none' }}>
                    <div className="cs-stat-val" style={{ fontSize: 44 }}>32k+</div>
                    <span className="cs-stat-label">Samples Trained</span>
                 </div>
                 <div className="cs-stat-cell" style={{ padding: '24px 0', border: 'none' }}>
                    <div className="cs-stat-val" style={{ fontSize: 44 }}>99%</div>
                    <span className="cs-stat-label">Model Accuracy</span>
                 </div>
              </div>
            </div>
            <div className={`rv d2 ${o8 ? 'on' : ''}`}>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=800&fit=crop&q=80" alt="Signal processing visualization" />
            </div>
          </div>
        </div>

        {/* SECTION 11 — TELEMEDICINE */}
        <div className="cs-section" ref={r9}>
          <div className={`rv ${o9 ? 'on' : ''}`} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
            <p className="mono-label" style={{ marginBottom: 20 }}>Telemedicine Application</p>
            <h2 className="section-heading">Designed for Humans, Not Manuals</h2>
            <p className="body-text">
              LUDESC could not stop at hardware and AI. The telemedicine application connects patient data, auscultation data, and AI analysis with healthcare professionals through a workflow-centric interface.
            </p>
          </div>
          <div className="more-works" style={{ gridTemplateColumns: 'repeat(2, 1fr)', background: 'none', padding: 0 }}>
             <img src="/yafi-portfolio/assets/work_hero/app_dev.png" alt="Mobile App UI 1" className={`rv d1 ${o9 ? 'on' : ''}`} />
             <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=700&fit=crop&q=80" alt="Mobile App UI 2" className={`rv d2 ${o9 ? 'on' : ''}`} />
          </div>
        </div>

        {/* SECTION 12 — DESIGNING WITH DATA */}
        <div className="cs-section" ref={r10} style={{ borderBottom: 'none' }}>
           <div className="cs-2col" style={{ alignItems: 'center' }}>
              <div className={`rv ${o10 ? 'on' : ''}`}>
                 <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1000&h=1000&fit=crop&q=80" alt="Data flow visualization" />
              </div>
              <div className={`rv d1 ${o10 ? 'on' : ''}`}>
                 <p className="mono-label" style={{ marginBottom: 20 }}>Designing With Data</p>
                 <h3 className="section-heading" style={{ fontSize: 32 }}>Designing With Data, Not Assumptions</h3>
                 <p className="body-text">
                   The software interface was designed around the information generated by the LUDESC system. Every UI element reflects the real-time flow: Physiological Sound → Digital Data → AI Analysis → Clinical Information.
                 </p>
              </div>
           </div>
        </div>

        {/* SECTION 13 — THE RESULTS */}
        <div className="cs-fullbleed" style={{ height: '70vh', background: 'var(--ink)' }}>
           <div style={{ padding: '80px 60px', color: '#fff' }}>
              <p className="mono-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>The Results / Telemedicine Application</p>
              <h2 className="section-heading" style={{ color: '#fff', marginBottom: 40 }}>A Connected Ecosystem</h2>
              <div className="cs-sidebyside" style={{ background: 'none' }}>
                 <img src="/yafi-portfolio/assets/work_hero/app_dev.png" alt="Result UI 1" style={{ borderRadius: 12, height: 400, objectFit: 'contain' }} />
                 <img src="/yafi-portfolio/assets/work_hero/app_dev.png" alt="Result UI 2" style={{ borderRadius: 12, height: 400, objectFit: 'contain' }} />
              </div>
           </div>
        </div>

        {/* SECTION 14 — FULL SYSTEM INTEGRATION */}
        <div className="cs-section" ref={r11}>
           <div className={`rv ${o11 ? 'on' : ''}`} style={{ marginBottom: 40 }}>
              <p className="mono-label">Full System Integration</p>
              <h2 className="section-heading" style={{ marginTop: 12 }}>One Ecosystem</h2>
           </div>
           <div className={`rv d1 ${o11 ? 'on' : ''}`} style={{ border: '1px solid var(--border)', padding: 60, textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', fontWeight: 700, color: 'var(--accent)' }}>
                 <span>HARDWARE</span> + <span>DATA</span> + <span>WIRELESS</span> + <span>AI</span> + <span>TELEMEDICINE</span>
              </div>
              <p className="body-text" style={{ marginTop: 32, maxWidth: 700, margin: '32px auto 0' }}>
                 Individual components are no longer separate experiments. They now operate as one ecosystem, connecting hardware, software, and healthcare interaction into a single clinical workflow.
              </p>
           </div>
        </div>

        {/* SECTION 15 — ETHICAL CLEARANCE */}
        <div className="cs-section" ref={r12}>
           <div className="cs-2col">
              <div className={`rv ${o12 ? 'on' : ''}`}>
                 <p className="mono-label" style={{ marginBottom: 20 }}>Implementation</p>
                 <h2 className="section-heading">WHO Ethical Clearance & Real-Life Implementation</h2>
                 <p className="body-text">
                   Healthcare technology must be developed with appropriate ethical considerations. LUDESC achieved WHO ethical clearance based on a seven-standard framework, marking the transition from prototype to real-world healthcare research.
                 </p>
              </div>
              <div className={`rv d2 ${o12 ? 'on' : ''}`}>
                 <img src="/yafi-portfolio/assets/work.png" alt="Clinical environment implementation" />
              </div>
           </div>
        </div>

        {/* SECTION 16 — FROM ENGINEERING TO BUSINESS */}
        <div className="cs-section" ref={r13} style={{ background: 'var(--ink)', color: '#fff' }}>
           <div className="cs-2col" style={{ alignItems: 'center' }}>
              <div className={`rv ${o13 ? 'on' : ''}`}>
                 <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?w=1000&h=800&fit=crop&q=80" alt="Product packaging concept" />
              </div>
              <div className={`rv d1 ${o13 ? 'on' : ''}`}>
                 <p className="mono-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Product Thinking</p>
                 <h3 className="section-heading" style={{ color: '#fff', fontSize: 32 }}>Packaging the Technology / From Engineering to Business</h3>
                 <p className="body-text" style={{ color: 'rgba(255,255,255,0.6)' }}>
                   Building the technology was only one part of the journey. The project required thinking about product presentation, communication, and business readiness for deployment.
                 </p>
              </div>
           </div>
        </div>

        {/* SECTION 17 — GOING GLOBAL */}
        <div className="cs-section" ref={r14}>
           <div className={`rv ${o14 ? 'on' : ''}`} style={{ marginBottom: 60 }}>
              <p className="mono-label">Going Global</p>
              <h2 className="section-heading" style={{ marginTop: 12 }}>Competing at the Highest Level</h2>
           </div>
           <div className="more-works" style={{ gridTemplateColumns: 'repeat(3, 1fr)', background: 'none', padding: 0 }}>
              <img src="/yafi-portfolio/assets/ADA/cover.png" alt="International Presentation" className={`rv d1 ${o14 ? 'on' : ''}`} />
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80" alt="Event presentation" className={`rv d2 ${o14 ? 'on' : ''}`} />
              <img src="https://images.unsplash.com/photo-1591115765373-520b7a21769b?w=800&h=600&fit=crop&q=80" alt="Judge evaluation" className={`rv d3 ${o14 ? 'on' : ''}`} />
           </div>
        </div>

        {/* SECTION 18 — ACHIEVEMENTS */}
        <div style={{ padding: '100px 60px', background: 'var(--ink)', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 4 }}>
          {[
            { a: 'Gold Winner', o: 'ASEAN DIGITAL AWARDS 2025', d: 'Selected among top innovations in Southeast Asia.' },
            { a: 'Top 100', o: 'DUBAI FUTURE SOLUTIONS', d: 'Selected among more than 2,800 global submissions.' },
            { a: '2nd Runner-up', o: 'INDONESIA AI INNOVATION CHALLENGE 2023', d: 'Recognized for pioneering AI in healthcare.' },
            { a: 'Certified', o: 'WHO ETHICAL CLEARANCE', d: 'Documented using the seven-standard framework.' },
          ].map((r, i) => (
            <div key={r.o} style={{ padding: '40px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>{r.a}</div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>{r.o}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{r.d}</p>
            </div>
          ))}
        </div>

        {/* SECTION 19 — THE FINAL STATE */}
        <div className="cs-section" ref={r15} style={{ borderBottom: 'none', paddingBottom: 120 }}>
           <div className={`rv ${o15 ? 'on' : ''}`} style={{ maxWidth: 700 }}>
              <p className="mono-label" style={{ marginBottom: 20 }}>LUDESC Today</p>
              <h2 className="section-heading" style={{ marginBottom: 32 }}>Transforming an initial idea into a working ecosystem.</h2>
              <p className="body-text">
                LUDESC evolved from a simple question into a wireless digital stethoscope, an AI system, and a telemedicine application. The most important achievement was not any single component, but the integration of hardware, intelligence, and software into a real-world healthcare workflow.
              </p>
           </div>
           <div className={`rv d2 ${o15 ? 'on' : ''}`} style={{ marginTop: 80 }}>
              <img src="/yafi-portfolio/assets/ludesc/cover.png" alt="Final LUDESC Product" style={{ width: '100%', maxHeight: '80vh', objectFit: 'cover' }} />
           </div>
        </div>

        {/* VISUAL GALLERY */}
        <div style={{ padding: '60px 60px 20px', borderTop: '1px solid var(--border)' }}>
          <p className="mono-label">Project Archive / Visual Timeline</p>
        </div>
        <div className="grid-wrap" style={{ padding: 4 }}>
          {[
            { l: '01 Ideation', i: 'https://images.unsplash.com/photo-1503551723145-6c040742065b?w=800&h=800&fit=crop&q=80', c: 3 },
            { l: '02 Research', i: 'https://images.unsplash.com/photo-1532187875605-2fe359379ee2?w=800&h=800&fit=crop&q=80', c: 3 },
            { l: '03 Electronics', i: '/yafi-portfolio/assets/work_hero/hard-software.png', c: 6 },
            { l: '04 First Prototype', i: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=800&fit=crop&q=80', c: 4 },
            { l: '05 LUDESC 1.0', i: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=800&fit=crop&q=80', c: 8 },
            { l: '06 LUDESC 2.0', i: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop&q=80', c: 6 },
            { l: '07 Design', i: '/yafi-portfolio/assets/work_hero/3d.png', c: 6 },
            { l: '08 Acquisition', i: '/yafi-portfolio/assets/work.png', c: 5 },
            { l: '09 AI', i: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop&q=80', c: 7 },
            { l: '10 Software', i: '/yafi-portfolio/assets/work_hero/app_dev.png', c: 12 },
            { l: '11 Integration', i: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=800&fit=crop&q=80', c: 4 },
            { l: '12 Ethical', i: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=800&fit=crop&q=80', c: 4 },
            { l: '13 Clinical', i: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=800&fit=crop&q=80', c: 4 },
            { l: '14 Global', i: '/yafi-portfolio/assets/ADA/cover.png', c: 7 },
            { l: '15 Awards', i: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop&q=80', c: 5 },
          ].map((item, i) => (
            <div key={i} className="tile" style={{ gridColumn: `span ${item.c}`, height: 320 }}>
               <img className="tile-img" src={item.i} alt={item.l} loading="lazy" />
               <div className="tile-info">
                  <div className="tile-name" style={{ fontSize: 14 }}>{item.l}</div>
               </div>
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
      img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1800&h=900&fit=crop&auto=format&q=85',
      challenge: 'Detecting COVID-19 severity quickly and reliably without overwhelming hospital infrastructure — especially in regions where specialist radiologists are scarce.',
      approach: 'Deep learning system using VGG16 architecture, trained on 800 chest X-rays from RSUDZA Hospital. Integrated with wearable biosensors (temperature, pulse, SpO₂) for continuous monitoring and an asynchronous telemedicine module for direct treatment guidance.',
      outcome: '95% classification accuracy across COVID-19 severity grades. AI-powered chest X-ray analysis combined with wearable monitoring creates a safer, smarter bridge between medical workers and patients — especially in areas with limited access to timely healthcare.',
    },
    hazard: {
      img: 'https://images.unsplash.com/photo-1582472978953-12929ab18f3e?w=1800&h=900&fit=crop&auto=format&q=85',
      challenge: 'When a vehicle stops due to an emergency, nearby drivers should be warned before they can visually see the hazard — especially on curved or high-speed roads at night.',
      approach: 'The hazard triangle continuously broadcasts its presence via Bluetooth Low Energy (BLE) while simultaneously sharing its real-time GPS location. Nearby vehicles automatically receive hazard alerts displaying the precise location on a digital map. Hardware: electronics, power management, enclosure. Embedded: GPS + BLE logic. Mobile: UI/UX for real-time hazard awareness and SOS.',
      outcome: 'A smart hazard triangle that transforms passive roadside safety into active, connected prevention. Demonstrates how IoT, positioning systems, and human-centered design can reduce accidents and save lives.',
    },
    asd: {
      img: 'https://images.unsplash.com/photo-1617994452722-4145e196248b?w=1800&h=900&fit=crop&auto=format&q=85',
      challenge: 'ASD screening in environments with limited access to specialized diagnostic tools. Existing methods rely on subjective behavioral observation — slow, expensive, and inaccessible.',
      approach: 'Multi-channel EEG headset captures brainwave signals. Signal preprocessing, feature extraction, and deep learning models classify ASD-related brainwave characteristics. Results visualized through a mobile application enabling clear interpretation for clinicians and caregivers without requiring lab equipment.',
      outcome: 'A non-invasive, cost-effective support tool for ASD detection. Demonstrates how neuro-signal processing and AI can bridge the gap between clinical neuroscience and accessible digital health solutions.',
    },
    croptic: {
      img: 'https://images.unsplash.com/photo-1545292470-391a7b77b8a2?w=1800&h=900&fit=crop&auto=format&q=85',
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
      {/* Huge Hero for About Page */}
      <div className="about-page-hero">
        <img
          src="/yafi-portfolio/assets/work.png"
          alt="Work Hero"
          className="about-hero-img"
        />
        <div className="about-hero-overlay" />
      </div>

      {/* Greeting hero */}
      <div className="about-hero">
        <p className="mono-label h1" style={{ marginBottom: 20 }}>About</p>
        <h1 className="about-greeting">
          <span className="h2" style={{ display: 'block' }}>Hello! I'm Yafi.</span>
          <span className="h3" style={{ display: 'block', color: 'var(--accent)' }}>I Build Intelligent Systems.</span>
        </h1>
        <div className="about-intro-grid hsub">
          <div>
            <p className="body-text" style={{ marginBottom: 20 }}>
              I'm a computer engineer who thrives at the intersection of AI, healthcare, and creative technology. My background in deep learning for image and signal classification has grown into a passion for building end-to-end solutions — from concept to prototype, from prototype to impact.
            </p>
            <p className="body-text" style={{ marginBottom: 20 }}>
              I've led and contributed to projects ranging from medical device innovation to cross-discipline work across agriculture and daily life. My work has been recognized internationally — one of the 100 World Innovators at Dubai Future Solutions, IYSA Special Award, and ASEAN Digital Awards 2025 winner.
            </p>
            <p className="body-text">
              For me, great work doesn't need to scream. It proves itself in reliability. It earns trust. It shows up when it matters most. That's the kind of engineer I am.
            </p>
          </div>
          <div>
            <img
              src="/yafi-portfolio/assets/potrait.png"
              alt="Al Yafi — portrait"
              className="about-portrait"
            />
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
          <p className="body-text" style={{ maxWidth: 420 }}>I'm open to opportunities in AI engineering, medtech, hardware systems, and research collaborations.</p>
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
