import { useEffect, useRef, useState } from 'react'

/* ─── Types ─── */
type Page = 'works' | 'ludesc' | 'gcov' | 'hazard' | 'asd' | 'croptic' | 'about' | 'contact'
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
  return (
    <nav className={`nav hnav ${stuck ? 'stuck' : ''}`}>
      <button className="nav-logo" onClick={() => navigate('works')}>YAFI</button>
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
    img: 'https://images.unsplash.com/photo-1677628680791-2fb26447b560?w=1400&h=1000&fit=crop&auto=format&q=85',
    alt: 'Hands holding the LUDESC digital stethoscope device',
    col: 7, h: 600,
  },
  {
    id: 'gcov', num: '02', name: 'G-COV',
    tagline: 'AI-driven COVID-19 severity detection from chest X-ray',
    tags: ['AI', 'DEEP LEARNING', 'IMAGING'],
    filters: ['AI', 'MEDTECH'],
    img: 'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?w=900&h=1000&fit=crop&auto=format&q=85',
    alt: 'Chest X-ray used for COVID-19 classification',
    col: 5, h: 600,
  },
  {
    id: 'hazard', num: '03', name: 'HAZARD TRIANGLE',
    tagline: 'GPS + BLE active roadside safety system',
    tags: ['IoT', 'HARDWARE', 'GPS', 'BLE'],
    filters: ['IoT', 'HARDWARE'],
    img: 'https://images.unsplash.com/photo-1699205269431-1ab18afabac6?w=900&h=900&fit=crop&auto=format&q=85',
    alt: 'Night street scene representing smart roadside safety',
    col: 4, h: 480,
  },
  {
    id: 'asd', num: '04', name: 'ASD DETECTION',
    tagline: 'EEG brainwave AI analysis for autism spectrum screening',
    tags: ['AI', 'EEG', 'SIGNAL', 'NEURO'],
    filters: ['AI', 'RESEARCH'],
    img: 'https://images.unsplash.com/photo-1617994452722-4145e196248b?w=1200&h=900&fit=crop&auto=format&q=85',
    alt: 'Abstract blue wave signal representing EEG brainwave patterns',
    col: 8, h: 480,
  },
  {
    id: 'croptic', num: '05', name: 'CROPTIC',
    tagline: 'Drone-based RSPO compliance verification platform',
    tags: ['AI', 'GEOSPATIAL', 'DRONE', 'ESG'],
    filters: ['AI', 'RESEARCH'],
    img: 'https://images.unsplash.com/photo-1680725238843-5d9808d7f980?w=1800&h=700&fit=crop&auto=format&q=85',
    alt: 'Aerial view of plantation rows for RSPO compliance',
    col: 12, h: 380,
  },
]

/* ─── Works page ─── */
function WorksPage({ navigate }: { navigate: (p: Page) => void }) {
  const [filter, setFilter] = useState<Filter>('ALL')
  const filters: Filter[] = ['ALL', 'AI', 'MEDTECH', 'IoT', 'HARDWARE', 'RESEARCH']

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="works-hero">
        <div>
          <p className="mono-label h1" style={{ marginBottom: 16 }}>Selected Work — 2025</p>
          <h1 className="works-hero-title">
            <span className="h2" style={{ display: 'block' }}>Five Projects.</span>
            <span className="h3" style={{ display: 'block', color: 'var(--accent)' }}>Built End-to-End.</span>
          </h1>
        </div>
        <p className="works-hero-sub hsub">
          From concept and research through hardware, AI development, and real-world deployment.
        </p>
      </div>

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

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="cs-hero">
        <img src="https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?w=1800&h=900&fit=crop&auto=format&q=85" alt="Doctor with patient in clinical setting" />
        <div className="cs-hero-inner">
          <div className="cs-hero-label">FEATURE STORY 01 — LUDESC</div>
          <h1 className="cs-title">Making healthcare safer with intelligent auscultation.</h1>
          <div className="cs-meta">
            <div className="cs-meta-item"><span className="cs-meta-label">Year</span><span className="cs-meta-val">2023 – 2025</span></div>
            <div className="cs-meta-item"><span className="cs-meta-label">Role</span><span className="cs-meta-val">Founder & Lead Engineer</span></div>
            <div className="cs-meta-item"><span className="cs-meta-label">Location</span><span className="cs-meta-val">Banda Aceh, Indonesia</span></div>
            <div className="cs-meta-item"><span className="cs-meta-label">Type</span><span className="cs-meta-val">AI · MedTech · Hardware</span></div>
          </div>
        </div>
      </div>

      <div className="cs-body">
        {/* Project statement */}
        <div className="cs-section" ref={r1}>
          <div className="cs-2col">
            <div>
              <p className={`mono-label rv ${o1 ? 'on' : ''}`} style={{ marginBottom: 20, color: 'var(--accent)' }}>The Problem</p>
              <h2 className={`section-heading rv d1 ${o1 ? 'on' : ''}`}>
                It didn't start with innovation.<br />It started with fear.
              </h2>
            </div>
            <div className={`rv d2 ${o1 ? 'on' : ''}`} style={{ paddingTop: 16 }}>
              <p className="body-text" style={{ marginBottom: 20 }}>
                Fear of getting too close. Fear of getting it wrong. Fear of missing something that mattered. I watched doctors lean in again and again just to hear a breath. No AI. No buffer. No protection.
              </p>
              <p className="body-text" style={{ marginBottom: 20 }}>
                Respiratory diseases remain one of the leading causes of preventable deaths — especially in regions with limited access to specialists. In many hospitals and rural clinics, lung auscultation still depends on manual stethoscopes, subjective interpretation, and direct physical contact.
              </p>
              <p className="body-text">
                <strong>That question stayed. It didn't let me move on.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* HMW */}
        <div style={{ padding: '0 60px 80px', borderBottom: '1px solid var(--border)' }} ref={r2}>
          <div className={`rv ${o2 ? 'on' : ''}`} style={{
            fontSize: 'clamp(22px, 3.5vw, 52px)', fontWeight: 700,
            letterSpacing: '-0.03em', lineHeight: 1.1,
            borderLeft: '3px solid var(--accent)', paddingLeft: 36, color: 'var(--ink)',
          }}>
            "What if lung sounds could be digitized, analyzed, and shared safely anywhere in the world?"
          </div>
        </div>

        {/* Stats */}
        <div className="cs-3col" ref={r3}>
          {[
            { v: '32,000+', l: 'Lung sound samples trained on', d: '' },
            { v: '99%', l: 'Model simulation accuracy', d: 'd1' },
            { v: '100%', l: 'Validation accuracy achieved', d: 'd2' },
          ].map(s => (
            <div key={s.l} className={`cs-stat-cell rv ${s.d} ${o3 ? 'on' : ''}`}>
              <div className="cs-stat-val">{s.v}</div>
              <span className="cs-stat-label">{s.l}</span>
            </div>
          ))}
        </div>

        {/* Full-bleed image */}
        <div className="cs-fullbleed" style={{ height: '55vh' }}>
          <img src="https://images.unsplash.com/photo-1677628680791-2fb26447b560?w=1800&h=900&fit=crop&auto=format&q=85" alt="LUDESC device in hand" style={{ height: '100%', filter: 'brightness(0.88)' }} />
        </div>

        {/* Process */}
        <div className="cs-section" ref={r4}>
          <p className={`mono-label rv ${o4 ? 'on' : ''}`} style={{ marginBottom: 40 }}>The Process</p>
          {[
            { n: '01', t: 'RESEARCH & IDEATION', b: 'First-principle engineering. The human ear captures sound, converts analog signals, sends them to the brain. A microphone does exactly that. I asked: if the ear can do it, can I engineer it? This reframed the entire problem from "how to build a medical device" to "how to convert an analog physiological signal into a clean digital representation."' },
            { n: '02', t: 'PROTOTYPE → MODEL 1.0', b: 'Intentionally minimal. A conventional acoustic stethoscope, acoustic line carefully cut, microphone inserted and acoustically sealed to prevent leakage and noise. Analog lung sounds captured and digitized. Simple, wired, purely engineering-driven. Despite its simplicity — it proved that lung sounds could be reliably captured in digital form without losing clinical meaning.' },
            { n: '03', t: 'HARDWARE → MODEL 2.0', b: 'The system evolved into a wireless digital stethoscope with improved acoustic isolation, cleaner signal capture, and an industrial-grade form factor. Full journey: electronic blueprint → 3D design model → wiring → soldering → 3D-printing the case → final assembly & testing. This was the moment LUDESC stopped being just research.' },
            { n: '04', t: 'AI DEVELOPMENT', b: 'Hybrid deep learning architecture: Vision Transformer (ViT) extracts high-level representations from time-frequency features. Recurrent Attention Network (RAN) captures temporal breathing dynamics. Dataset of 32,000+ samples across diverse patient conditions, signal qualities, and noise profiles — trained to generalize across real-world clinical scenarios, not just clean lab data.' },
            { n: '05', t: 'SYSTEM INTEGRATION', b: 'LUDESC device → Bluetooth transmission → mobile application → AI inference → clinical decision support. The telemedicine platform connects healthcare providers and patients digitally. Doctors access recordings remotely. AI analysis is delivered within seconds. Designed for use in remote areas with limited specialist access.' },
            { n: '06', t: 'VALIDATION & RECOGNITION', b: 'Simulation accuracy: 99%. Validation accuracy: 100%. Performance benchmarked against state-of-the-art: 92.83% Se · 97.28% Sp · 95.05% Sc — outperforming all benchmark architectures including CNN-LSTM, ResNeSt, and DeiT+CBAM. Results published in a scientific journal. Recognized internationally at Dubai Future Solutions and ASEAN Digital Awards.' },
          ].map((s, i) => (
            <div key={s.n} className={`cs-step rv d${Math.min(i, 5)} ${o4 ? 'on' : ''}`}>
              <span className="cs-step-n">{s.n}</span>
              <div>
                <div className="cs-step-title">{s.t}</div>
                <p className="cs-step-body">{s.b}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Side by side images */}
        <div className="cs-sidebyside" ref={r5}>
          <div style={{ height: 460 }}>
            <img src="https://images.unsplash.com/photo-1562408590-e32931084e23?w=900&h=700&fit=crop&auto=format&q=85" alt="Electronic circuit board detail" style={{ height: '100%' }} />
          </div>
          <div style={{ height: 460 }}>
            <img src="https://images.unsplash.com/photo-1772566022500-353de883e9e4?w=900&h=700&fit=crop&auto=format&q=85" alt="3D printing the device enclosure" style={{ height: '100%' }} />
          </div>
        </div>

        {/* AI Architecture */}
        <div className="cs-section" ref={r6}>
          <div className="cs-2col">
            <div>
              <p className={`mono-label rv ${o6 ? 'on' : ''}`} style={{ marginBottom: 20, color: 'var(--accent)' }}>AI Architecture</p>
              <h3 className={`section-heading rv d1 ${o6 ? 'on' : ''}`} style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', marginBottom: 24 }}>
                ViT + RAN<br />Hybrid Model
              </h3>
              <p className={`body-text rv d2 ${o6 ? 'on' : ''}`} style={{ marginBottom: 20 }}>
                Lung sounds are not static signals — they are temporal, contextual, and highly variable. To handle this complexity, I designed a hybrid deep learning architecture that mirrors how clinicians actually listen and reason.
              </p>
              <p className={`body-text rv d3 ${o6 ? 'on' : ''}`}>
                Vision Transformer focuses on global acoustic patterns. RAN captures temporal dependencies across breathing cycles. Together they exceed every benchmark in the comparison table.
              </p>

              {/* Comparison callout */}
              <div className={`rv d4 ${o6 ? 'on' : ''}`} style={{ marginTop: 36, padding: '24px', background: 'rgba(27,111,216,0.06)', borderLeft: '2px solid var(--accent)' }}>
                <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 10 }}>State-of-the-Art</p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink)' }}>
                  Proposed model: <strong>92.83% Se · 97.28% Sp · 95.05% Sc</strong><br />
                  vs. CNN-LSTM (60.29% / 84.26% / 68.52%) · ResNeSt (40.20% / 70.40% / 55.30%)
                </p>
              </div>
            </div>

            {/* Pipeline */}
            <div className={`rv d2 ${o6 ? 'on' : ''}`}>
              <p className="mono-label" style={{ marginBottom: 28 }}>Signal Pipeline</p>
              <div className="pipeline">
                {[
                  { l: 'Audio Input — Lung Sound Recording', a: true },
                  { l: 'MFCC · Chromagram · Multi-scale Spectrogram', a: false },
                  { l: 'Linear Projection + Position Encoding', a: false },
                  { l: 'Visual Transformer (ViT)', a: false },
                  { l: 'Recurrent Attention Network (RAN)', a: false },
                  { l: 'Multi-Layer Perceptron', a: false },
                  { l: 'Classification: Wheeze · Crackle · Normal', a: true },
                ].map((node, i, arr) => (
                  <div key={node.l}>
                    <div className="pipe-node">
                      <div className={`pipe-dot ${node.a ? 'active' : ''}`} />
                      <span className={`pipe-label ${node.a ? 'active' : ''}`}>{node.l}</span>
                    </div>
                    {i < arr.length - 1 && <div className="pipe-line" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recognition */}
        <div style={{ padding: '60px 60px', background: 'var(--ink)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
          {[
            { y: '2025', a: 'Winner', o: 'ASEAN DIGITAL AWARDS' },
            { y: '2024', a: 'Top 100 Innovators', o: 'DUBAI FUTURE SOLUTIONS' },
            { y: '2024', a: 'Special Award', o: 'IYSA' },
          ].map((r, i) => (
            <div key={r.o} style={{ padding: '40px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 16 }}>{r.y}</span>
              <div style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.0, marginBottom: 10 }}>{r.a}</div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>{r.o}</span>
            </div>
          ))}
        </div>

        {/* More works */}
        <div style={{ padding: '60px 60px 48px' }}>
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
              src="https://images.unsplash.com/photo-1681097561932-36d0df02b379?w=700&h=900&fit=crop&auto=format&q=85"
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
            { label: 'EMAIL', val: 'alyafi@engineer.com', href: 'mailto:alyafi@engineer.com' },
            { label: 'LINKEDIN', val: 'linkedin.com/in/alyafi', href: '#' },
            { label: 'GITHUB', val: 'github.com/alyafi', href: '#' },
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
  const [page, setPage] = useState<Page>('works')
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
      <div style={{ paddingTop: 60 }}>
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
