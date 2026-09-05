import { useState, useEffect } from 'react'

// Assets
import logo01 from '../assets/buildera/logo01.png'
import logo02 from '../assets/buildera/logo02.png'
import background from '../assets/buildera/backround.png'
import screenshotProduk from '../assets/buildera/laman-manajemenproduk.png'
import screenshotPiutang from '../assets/buildera/laman-piutang.png'
import screenshotBarcode from '../assets/buildera/laman-printbarcode.png'
import screenshotTransaksi from '../assets/buildera/laman-transaksi.png'

interface BuildEraProps {
  onBack: () => void;
}

const MODULES = [
  {
    id: '01',
    name: 'Kasir & Transaksi',
    desc: 'Alur transaksi cepat di meja kasir.',
    detail: (
      <div>
        <p className="text-sm mb-3" style={{ color: '#8a8f98' }}>Keyboard shortcuts untuk kecepatan maksimal:</p>
        <table className="w-full text-sm" style={{ fontFamily: 'monospace' }}>
          <tbody>
            {[
              ['Esc', 'Kembali ke pencarian produk'],
              ['F1', 'Quantity'],
              ['F2', 'Override harga'],
              ['F3', 'Diskon produk'],
              ['F5', 'Pelanggan'],
              ['F6', 'Diskon transaksi'],
              ['Right Shift', 'Pembayaran / Checkout'],
            ].map(([key, action]) => (
              <tr key={key} className="border-b" style={{ borderColor: '#1e2128' }}>
                <td className="py-2 pr-6 whitespace-nowrap" style={{ color: '#FF6A00' }}>{key}</td>
                <td className="py-2" style={{ color: '#e7e9ee' }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: '02',
    name: 'Manajemen Produk',
    desc: 'Kelola katalog, stok, dan harga.',
    detail: (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded" style={{ background: '#16181c', border: '1px solid #2a2d34' }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#FF6A00' }}>Mode Otomatis</p>
          <p className="text-sm mb-2" style={{ color: '#8a8f98' }}>Input harga total supplier + qty → modal dihitung otomatis.</p>
        </div>
        <div className="p-4 rounded" style={{ background: '#16181c', border: '1px solid #2a2d34' }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#FF6A00' }}>Mode Manual</p>
          <p className="text-sm mb-2" style={{ color: '#8a8f98' }}>Modal & harga jual diinput langsung.</p>
        </div>
      </div>
    ),
  },
]

function LiveOmzetCounter() {
  const [value, setValue] = useState(142_350_000)
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * 85_000 + 15_000))
    }, 1400)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded" style={{ background: '#0a0a0c', border: '1px solid #FF6A0040' }}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#FF6A00' }} />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#FF6A00' }} />
      </span>
      <span className="text-xs" style={{ color: '#8a8f98' }}>OMZET LIVE</span>
      <span className="text-sm font-semibold" style={{ color: '#FF6A00' }}>
        Rp {value.toLocaleString('id-ID')}
      </span>
    </div>
  )
}

function HazardDivider() {
  return <div className="hazard-stripe" style={{ width: '100%' }} />
}

export default function BuildEra({ onBack }: BuildEraProps) {
  const [scrolled, setScrolled] = useState(false)
  const [openModule, setOpenModule] = useState<string | null>(null)
  const [activeShot, setActiveShot] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const shots = [
    { label: 'Manajemen Produk', img: screenshotProduk },
    { label: 'Riwayat Transaksi', img: screenshotTransaksi },
    { label: 'Detail Piutang', img: screenshotPiutang },
    { label: 'Label Barcode', img: screenshotBarcode },
  ]

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh', color: '#e7e9ee', position: 'relative' }}>
      <style>{`
        .grain-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.035; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); }
        .hazard-stripe { height: 6px; background: repeating-linear-gradient(-45deg, #FF6A00 0px, #FF6A00 4px, transparent 4px, transparent 14px); opacity: 0.7; }
        .accordion-content { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s ease; }
        .accordion-content.open { grid-template-rows: 1fr; }
        .accordion-inner { overflow: hidden; }
      `}</style>

      <div className="grain-overlay" aria-hidden="true" />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s',
        background: scrolled ? 'rgba(10,10,12,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1e2128' : 'none',
        height: '64px', display: 'flex', alignItems: 'center', padding: '0 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={onBack} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '10px', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>← KEMBALI</button>
            <img src={logo02} alt="BuildEra" style={{ height: '32px', filter: 'brightness(0) invert(1)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '12px', color: '#8a8f98' }} className="hidden-mobile">v1.2.1 Available</span>
            <a href="https://wa.me/971582517092" target="_blank" rel="noreferrer" style={{ background: '#FF6A00', color: '#0a0a0c', padding: '8px 16px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>HUBUNGI KAMI</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '0 24px' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url(${background}) center/cover no-repeat` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,12,0.85) 0%, transparent 70%), linear-gradient(to top, #0a0a0c 0%, transparent 30%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ color: '#FF6A00', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '16px' }}>VERSI TERBARU V1.2.1</p>
            <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 800, lineHeight: 1, marginBottom: '24px' }}>Download <span style={{ color: '#FF6A00' }}>BuildEra</span></h1>
            <p style={{ color: '#8a8f98', fontSize: '20px', marginBottom: '40px' }}>Material & Construction POS</p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/builderaNeelam.msix" target="_blank" rel="noreferrer" style={{ border: '1px solid #FF6A00', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px', textDecoration: 'none', color: '#fff' }}>
                <b style={{ fontSize: '16px' }}>Download MSIX</b>
                <span style={{ fontSize: '11px', color: '#8a8f98' }}>Installer · Neelam v1.2.1</span>
              </a>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/BuildEraNeelam.zip" target="_blank" rel="noreferrer" style={{ border: '1px solid #2a2d34', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px', textDecoration: 'none', color: '#fff' }}>
                <b style={{ fontSize: '16px' }}>Download ZIP</b>
                <span style={{ fontSize: '11px', color: '#8a8f98' }}>Portable · Neelam v1.2.1</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <HazardDivider />

      {/* Modules */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, marginBottom: '60px' }}>Modul Lengkap</h2>
        <div style={{ borderTop: '1px solid #1e2128' }}>
          {MODULES.map(mod => (
            <div key={mod.id} style={{ borderBottom: '1px solid #1e2128' }}>
              <button onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '32px 0', display: 'flex', gap: '32px', cursor: 'pointer' }}>
                <span style={{ fontSize: '32px', color: '#2a2d34', fontWeight: 300 }}>{mod.id}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: openModule === mod.id ? '#FF6A00' : '#fff' }}>{mod.name}</h3>
                  <p style={{ color: '#8a8f98', fontSize: '14px' }}>{mod.desc}</p>
                </div>
              </button>
              <div className={`accordion-content ${openModule === mod.id ? 'open' : ''}`}>
                <div className="accordion-inner" style={{ paddingBottom: '32px', paddingLeft: '64px' }}>{mod.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <HazardDivider />

      {/* Interface */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '40px' }}>Interface BuildEra</h2>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', borderBottom: '1px solid #1e2128', overflowX: 'auto' }}>
          {shots.map((s, i) => (
            <button key={i} onClick={() => setActiveShot(i)} style={{ background: 'none', border: 'none', color: activeShot === i ? '#FF6A00' : '#8a8f98', padding: '12px 0', borderBottom: activeShot === i ? '2px solid #FF6A00' : '2px solid transparent', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>{s.label}</button>
          ))}
        </div>
        <div style={{ background: '#16181c', border: '1px solid #1e2128', padding: '20px', borderRadius: '12px' }}>
          <img src={shots[activeShot].img} alt="" style={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }} />
        </div>
      </section>

      <HazardDivider />

      {/* History */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '60px' }}>Riwayat Download</h2>
        <div style={{ display: 'grid', gap: '32px' }}>
          <div style={{ padding: '40px', border: '1px solid rgba(255,106,0,0.3)', background: 'rgba(255,106,0,0.05)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px' }}>BuildEra v1.2.1 (Neelam Version)</h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/builderaNeelam.msix" target="_blank" rel="noreferrer" style={{ background: '#FF6A00', color: '#000', border: 'none', padding: '12px 24px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}>DOWNLOAD MSIX</a>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/BuildEraNeelam.zip" target="_blank" rel="noreferrer" style={{ background: 'none', border: '1px solid #FF6A00', color: '#FF6A00', padding: '12px 24px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}>DOWNLOAD ZIP</a>
            </div>
          </div>
          <div style={{ padding: '40px', border: '1px solid #1e2128', background: '#16181c' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#8a8f98' }}>BuildEra v1.2.0 (Standard)</h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/buildera.msix" target="_blank" rel="noreferrer" style={{ background: '#333', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}>DOWNLOAD MSIX</a>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/BuildEra.zip" target="_blank" rel="noreferrer" style={{ background: 'none', border: '1px solid #333', color: '#8a8f98', padding: '12px 24px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}>DOWNLOAD ZIP</a>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/Manual.Book.BuildEra.V0.1.pdf" style={{ padding: '24px', border: '1px solid #1e2128', textDecoration: 'none', color: '#fff' }}>
              <b>Manual Book PDF</b>
              <p style={{ fontSize: '12px', color: '#8a8f98', marginTop: '4px' }}>Panduan lengkap v0.1</p>
            </a>
            <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/Format_import_Product_list_BuildEra.xlsx" style={{ padding: '24px', border: '1px solid #1e2128', textDecoration: 'none', color: '#fff' }}>
              <b>Excel Import Template</b>
              <p style={{ fontSize: '12px', color: '#8a8f98', marginTop: '4px' }}>Format produk massal</p>
            </a>
          </div>
        </div>
      </section>

      <footer style={{ padding: '60px 24px', borderTop: '1px solid #1e2128', textAlign: 'center' }}>
        <img src={logo01} alt="BuildEra" style={{ height: '24px', margin: '0 auto 16px' }} />
        <p style={{ fontSize: '12px', color: '#8a8f98' }}>© 2026 Solutivo Labs Indonesia. All rights reserved.</p>
      </footer>
    </div>
  )
}
