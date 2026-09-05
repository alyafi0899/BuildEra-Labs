import { useEffect, useState } from 'react';
import logoWhite from '../assets/logo_white.png';
import logoColored from '../assets/logo_colored.png';

interface NavProps {
  onCMSClick: () => void;
}

const NAV_LINKS = [
  { label: 'WORK', id: 'work' },
  { label: 'PRODUCTS', id: 'products' },
  { label: 'SOLUTIONS', id: 'solutions' },
  { label: 'CLIENTS', id: 'clients' },
  { label: 'ABOUT', id: 'about' },
  { label: 'CONTACT', id: 'contact' },
];

export default function Nav({ onCMSClick }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 60px)',
          transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
          background: scrolled ? 'rgba(247,247,245,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: `1px solid ${scrolled ? '#D9D9D9' : 'transparent'}`,
        }}
      >
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={scrolled ? logoColored : logoWhite}
            alt="SOLUTIVO LABS"
            style={{ height: '32px', width: 'auto', transition: 'opacity 0.3s ease' }}
          />
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="hidden-mobile">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                fontWeight: 500,
                color: scrolled || mobileOpen ? '#111111' : '#FFFFFF',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              className="link-underline"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side - Studio button removed for now but function kept in props */}
        <div style={{ width: '72px' }} className="hidden-mobile" />

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            fontWeight: 600,
            color: scrolled || mobileOpen ? '#111111' : '#FFFFFF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
          }}
          className="show-mobile"
        >
          {mobileOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#F7F7F5',
            zIndex: 199,
            display: 'flex',
            flexDirection: 'column',
            padding: '48px clamp(20px, 4vw, 40px)',
            gap: '0',
          }}
        >
          {NAV_LINKS.map(({ label, id }, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontSize: 'clamp(40px, 10vw, 60px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#111111',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #D9D9D9',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '20px 0',
                lineHeight: 1,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {label}
            </button>
          ))}
          {/* Studio link removed for now */}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
