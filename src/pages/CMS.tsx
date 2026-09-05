import { useState } from 'react';

const PX = '32px';

const STAT_ITEMS = [
  { label: 'PROJECTS', value: '4' },
  { label: 'CLIENTS', value: '2' },
  { label: 'PRODUCTS', value: '2' },
  { label: 'MEDIA', value: '1' },
];

interface Project {
  id: number;
  num: string;
  name: string;
  client: string;
  category: string;
  year: string;
  description: string;
  status: 'Published' | 'Draft';
  featured: boolean;
  img: string;
  tech: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 1, num: '01', name: 'BUILD ERA', client: 'Anantacipta Group', category: 'POS / BUSINESS PLATFORM', year: '2026',
    description: 'An integrated POS and business management platform designed for high-volume retail and F&B operations.',
    status: 'Published', featured: true,
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format',
    tech: 'React, Node.js, PostgreSQL, Redis',
  },
  {
    id: 2, num: '02', name: 'LUDESC', client: 'MediLink Indonesia', category: 'AI HEALTHCARE', year: '2025',
    description: 'AI-powered digital auscultation and telemedicine solution connecting patients with remote diagnostics.',
    status: 'Published', featured: false,
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&auto=format',
    tech: 'Python, PyTorch, Flutter, FastAPI',
  },
  {
    id: 3, num: '03', name: 'CROPTIC', client: 'Agrimas Nusantara', category: 'AGRICULTURAL INTELLIGENCE', year: '2025',
    description: 'Drone-based computer vision platform providing plantation health monitoring and yield prediction.',
    status: 'Draft', featured: false,
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop&auto=format',
    tech: 'Python, OpenCV, TensorFlow, ROS',
  },
  {
    id: 4, num: '04', name: 'YOVA', client: 'Nuansa Moda', category: 'DIGITAL FASHION / WEDDING', year: '2024',
    description: 'Digital fashion and wedding marketplace with AI-driven styling recommendations.',
    status: 'Published', featured: false,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
    tech: 'Next.js, Supabase, Stripe',
  },
];

type Section = 'overview' | 'projects' | 'clients' | 'products' | 'media';

const SIDEBAR_ITEMS: { label: string; id: Section }[] = [
  { label: 'OVERVIEW', id: 'overview' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'CLIENTS', id: 'clients' },
  { label: 'PRODUCTS', id: 'products' },
  { label: 'MEDIA', id: 'media' },
];

// ─────────────────────────────────────────
// Project Editor Modal
// ─────────────────────────────────────────
function ProjectEditor({ project, onSave, onClose }: { project: Project | null; onSave: (p: Project) => void; onClose: () => void }) {
  const empty: Project = { id: Date.now(), num: '00', name: '', client: '', category: '', year: '2026', description: '', status: 'Draft', featured: false, img: '', tech: '' };
  const [form, setForm] = useState<Project>(project ?? empty);

  const set = (key: keyof Project, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{
        position: 'relative',
        background: '#FFFFFF',
        width: 'min(600px, 100vw)',
        height: '100vh',
        overflow: 'auto',
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#C8421A', fontWeight: 600, marginBottom: '8px' }}>
              {project ? 'EDIT PROJECT' : 'NEW PROJECT'}
            </div>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', color: '#111111' }}>
              {project ? project.name : 'UNTITLED'}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid #D9D9D9', cursor: 'pointer', padding: '8px 16px', fontSize: '11px', letterSpacing: '0.12em', color: '#666666' }}>
            CLOSE ✕
          </button>
        </div>

        {/* Preview thumbnail */}
        {form.img && (
          <div style={{ height: '200px', overflow: 'hidden', background: '#111111', marginBottom: '32px' }}>
            <img src={form.img} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {([
            ['PROJECT NAME', 'name', 'text'],
            ['CLIENT', 'client', 'text'],
            ['CATEGORY', 'category', 'text'],
            ['YEAR', 'year', 'text'],
            ['HERO IMAGE URL', 'img', 'text'],
            ['TECHNOLOGIES', 'tech', 'text'],
          ] as [string, keyof Project, string][]).map(([label, key, type]) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.16em', fontWeight: 700, color: '#888888', marginBottom: '8px' }}>{label}</label>
              <input
                type={type}
                value={String(form[key])}
                onChange={(e) => set(key, e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  borderBottom: '1px solid #D9D9D9',
                  padding: '10px 0',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#111111',
                  background: 'transparent',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.16em', fontWeight: 700, color: '#888888', marginBottom: '8px' }}>DESCRIPTION</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              style={{
                width: '100%',
                border: '1px solid #D9D9D9',
                padding: '12px',
                fontSize: '14px',
                color: '#111111',
                background: 'transparent',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: 1.6,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontSize: '10px', letterSpacing: '0.16em', fontWeight: 700, color: '#888888', display: 'block', marginBottom: '8px' }}>STATUS</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                style={{ border: '1px solid #D9D9D9', padding: '8px 12px', fontSize: '12px', letterSpacing: '0.1em', fontFamily: 'inherit', background: '#FFFFFF', cursor: 'pointer', outline: 'none' }}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#C8421A' }}
              />
              <label htmlFor="featured" style={{ fontSize: '11px', letterSpacing: '0.14em', fontWeight: 600, color: '#111111', cursor: 'pointer' }}>FEATURED</label>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '40px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { onSave(form); onClose(); }}
            style={{
              flex: 1,
              background: '#111111',
              color: '#FFFFFF',
              border: 'none',
              padding: '16px',
              fontSize: '12px',
              letterSpacing: '0.14em',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            SAVE PROJECT
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '16px 24px',
              background: 'none',
              border: '1px solid #D9D9D9',
              fontSize: '12px',
              letterSpacing: '0.14em',
              fontWeight: 600,
              color: '#666666',
              cursor: 'pointer',
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// OVERVIEW PAGE
// ─────────────────────────────────────────
function OverviewPage({ projects, onEditProject }: { projects: Project[]; onEditProject: (p: Project) => void }) {
  return (
    <div>
      <div style={{ marginBottom: '48px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#999999', fontWeight: 600 }}>DASHBOARD</span>
        <h1 style={{ margin: '8px 0 0', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#111111' }}>OVERVIEW</h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#D9D9D9', marginBottom: '64px', border: '1px solid #D9D9D9' }}>
        {STAT_ITEMS.map((stat) => (
          <div key={stat.label} style={{ background: '#FFFFFF', padding: '32px 24px' }}>
            <div style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111', lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#888888', fontWeight: 700, marginTop: '8px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent projects */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#666666', fontWeight: 700 }}>RECENT PROJECTS</span>
        <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#C8421A', fontWeight: 600 }}>{projects.length} TOTAL</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3px' }}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            onClick={() => onEditProject(project)}
            style={{ cursor: 'pointer', position: 'relative', gridColumn: i === 0 ? 'span 2' : 'span 1' }}
          >
            <div style={{ height: i === 0 ? '360px' : '240px', overflow: 'hidden', background: '#111111', position: 'relative' }}>
              <img
                src={project.img}
                alt={project.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transition: 'opacity 0.4s ease, transform 0.6s ease' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                <span style={{
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  color: project.status === 'Published' ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  background: project.status === 'Published' ? 'rgba(200, 66, 26, 0.9)' : 'rgba(255,255,255,0.15)',
                  padding: '4px 10px',
                }}>
                  {project.status.toUpperCase()}
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#FFFFFF' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>{project.num} · {project.year}</div>
                <div style={{ fontSize: i === 0 ? 'clamp(24px, 3vw, 40px)' : '20px', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{project.name}</div>
                <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{project.category}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PROJECTS PAGE
// ─────────────────────────────────────────
function ProjectsPage({ projects, onNewProject, onEditProject, onDeleteProject }: {
  projects: Project[];
  onNewProject: () => void;
  onEditProject: (p: Project) => void;
  onDeleteProject: (id: number) => void;
}) {
  return (
    <div>
      <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#999999', fontWeight: 600 }}>CONTENT</span>
          <h1 style={{ margin: '8px 0 0', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#111111' }}>PROJECTS</h1>
        </div>
        <button
          onClick={onNewProject}
          style={{ background: '#111111', color: '#FFFFFF', border: 'none', padding: '14px 28px', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 700, cursor: 'pointer' }}
        >
          + NEW PROJECT
        </button>
      </div>

      <div style={{ borderTop: '1px solid #D9D9D9' }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '24px', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #D9D9D9', transition: 'background 0.2s ease' }}
          >
            <div style={{ width: '100px', height: '70px', overflow: 'hidden', background: '#111111', flexShrink: 0 }}>
              <img src={project.img} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#999999', fontWeight: 500 }}>{project.num}</span>
                <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#111111' }}>{project.name}</span>
                {project.featured && <span style={{ fontSize: '9px', letterSpacing: '0.14em', fontWeight: 700, color: '#C8421A', border: '1px solid #C8421A', padding: '2px 8px' }}>FEATURED</span>}
              </div>
              <div style={{ fontSize: '12px', color: '#888888', letterSpacing: '0.08em' }}>{project.category} · {project.client} · {project.year}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{
                fontSize: '10px',
                letterSpacing: '0.14em',
                fontWeight: 700,
                color: project.status === 'Published' ? '#111111' : '#888888',
                border: `1px solid ${project.status === 'Published' ? '#111111' : '#D9D9D9'}`,
                padding: '4px 12px',
              }}>
                {project.status.toUpperCase()}
              </span>
              <button
                onClick={() => onEditProject(project)}
                style={{ background: 'none', border: '1px solid #D9D9D9', padding: '6px 16px', fontSize: '11px', letterSpacing: '0.12em', color: '#666666', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                EDIT
              </button>
              <button
                onClick={() => onDeleteProject(project.id)}
                style={{ background: 'none', border: '1px solid #D9D9D9', padding: '6px 12px', fontSize: '11px', color: '#CC4444', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PLACEHOLDER PAGE
// ─────────────────────────────────────────
function PlaceholderPage({ title, count }: { title: string; count: number }) {
  return (
    <div>
      <span style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#999999', fontWeight: 600 }}>CONTENT</span>
      <h1 style={{ margin: '8px 0 48px', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#111111' }}>{title}</h1>
      <div style={{ border: '1px solid #D9D9D9', padding: '80px 40px', textAlign: 'center', color: '#CCCCCC' }}>
        <div style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-0.04em', color: '#EEEEEE', marginBottom: '16px' }}>{count}</div>
        <div style={{ fontSize: '11px', letterSpacing: '0.16em', fontWeight: 600 }}>ITEMS IN {title}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// CMS MAIN
// ─────────────────────────────────────────
export default function CMS({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState<Section>('overview');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [editingProject, setEditingProject] = useState<Project | null | 'new'>(null);

  const handleSave = (p: Project) => {
    setProjects((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      if (exists) return prev.map((x) => (x.id === p.id ? p : x));
      return [...prev, { ...p, num: String(prev.length + 1).padStart(2, '0') }];
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Remove this project?')) setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F7F5', fontFamily: 'inherit' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        flexShrink: 0,
        background: '#111111',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 0',
        borderRight: '1px solid #1E1E1E',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
      }}>
        <div style={{ padding: '0 28px 32px', borderBottom: '1px solid #1E1E1E' }}>
          <button
            onClick={onBack}
            style={{ fontSize: '10px', letterSpacing: '0.16em', color: '#555555', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '20px', fontFamily: 'inherit' }}
          >
            ← BACK TO SITE
          </button>
          <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.08em', color: '#FFFFFF' }}>SOLUTIVO</div>
          <div style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#555555', fontWeight: 600, marginTop: '2px' }}>CMS</div>
        </div>

        <nav style={{ padding: '24px 0', flex: 1 }}>
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '14px 28px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                fontWeight: 700,
                color: section === item.id ? '#FFFFFF' : '#555555',
                background: section === item.id ? 'rgba(255,255,255,0.07)' : 'none',
                border: 'none',
                borderLeft: `2px solid ${section === item.id ? '#C8421A' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px 28px', borderTop: '1px solid #1E1E1E' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#333333' }}>SOLUTIVO LABS</div>
          <div style={{ fontSize: '10px', color: '#333333', marginTop: '4px' }}>admin@solutivo.id</div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: `clamp(40px, 6vw, 72px) ${PX}`, overflow: 'auto' }}>
        {section === 'overview' && (
          <OverviewPage projects={projects} onEditProject={(p) => setEditingProject(p)} />
        )}
        {section === 'projects' && (
          <ProjectsPage
            projects={projects}
            onNewProject={() => setEditingProject('new')}
            onEditProject={(p) => setEditingProject(p)}
            onDeleteProject={handleDelete}
          />
        )}
        {section === 'clients' && <PlaceholderPage title="CLIENTS" count={24} />}
        {section === 'products' && <PlaceholderPage title="PRODUCTS" count={8} />}
        {section === 'media' && <PlaceholderPage title="MEDIA" count={126} />}
      </main>

      {/* Project editor panel */}
      {editingProject !== null && (
        <ProjectEditor
          project={editingProject === 'new' ? null : editingProject}
          onSave={handleSave}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  );
}
