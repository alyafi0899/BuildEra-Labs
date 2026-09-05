import { useState, useEffect, useRef } from 'react'
import logo01 from '@/imports/logo01.png'
import logo02 from '@/imports/logo02.png'
import screenshotProduk from '@/imports/laman-manajemenproduk.png'
import screenshotPiutang from '@/imports/laman-piutang.png'
import screenshotBarcode from '@/imports/laman-printbarcode.png'
import screenshotTransaksi from '@/imports/laman-transaksi.png'

const HERO_BG = 'https://images.unsplash.com/photo-1631856954655-966f97d809de?w=1920&h=1080&fit=crop&auto=format'

const MODULES = [
  {
    id: '01',
    name: 'Kasir & Transaksi',
    desc: 'Alur transaksi cepat di meja kasir.',
    detail: (
      <div>
        <p className="text-sm mb-3" style={{ color: '#8a8f98', fontFamily: 'Inter, sans-serif' }}>Keyboard shortcuts untuk kecepatan maksimal:</p>
        <table className="w-full text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
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
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace' }}>Mode Otomatis</p>
          <p className="text-sm mb-2" style={{ color: '#8a8f98' }}>Input harga total supplier + ongkir + qty → modal & profit dihitung otomatis.</p>
          <div className="text-xs p-3 rounded" style={{ background: '#0a0a0c', fontFamily: 'JetBrains Mono, monospace', color: '#e7e9ee', border: '1px solid #FF6A0030' }}>
            <p style={{ color: '#FF6A00' }}>Formula:</p>
            <p className="mt-1">Modal/produk =</p>
            <p>(Total Harga Supplier / QTY)</p>
            <p>+ (Total Ongkir / QTY)</p>
          </div>
        </div>
        <div className="p-4 rounded" style={{ background: '#16181c', border: '1px solid #2a2d34' }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace' }}>Mode Manual</p>
          <p className="text-sm mb-2" style={{ color: '#8a8f98' }}>Modal & harga jual diinput langsung, profit dihitung otomatis.</p>
          <div className="text-xs p-3 rounded" style={{ background: '#0a0a0c', fontFamily: 'JetBrains Mono, monospace', color: '#e7e9ee', border: '1px solid #FF6A0030' }}>
            <p style={{ color: '#FF6A00' }}>Formula:</p>
            <p className="mt-1">Profit = Harga Jual − Modal</p>
            <p className="mt-1">% Profit = (Profit / Modal) × 100</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '03',
    name: 'Supplier & Ekspedisi',
    desc: 'Data mitra pengadaan & pengiriman.',
    detail: (
      <p className="text-sm" style={{ color: '#8a8f98' }}>
        Riwayat pembayaran supplier dan ekspedisi dikelola terpisah agar tagihan barang dan pengiriman tidak tercampur. Setiap mitra memiliki profil lengkap, riwayat pengadaan, dan status pembayaran independen.
      </p>
    ),
  },
  {
    id: '04',
    name: 'Pelanggan & Piutang',
    desc: 'Data pelanggan dan pelacakan piutang.',
    detail: (
      <div className="flex flex-wrap gap-3">
        {['Saldo Piutang', 'Detail Piutang', 'Pembayaran Cicilan', 'Riwayat Pembayaran'].map((item) => (
          <span key={item} className="px-3 py-1 rounded text-xs" style={{ background: '#16181c', border: '1px solid #2a2d34', color: '#e7e9ee', fontFamily: 'JetBrains Mono, monospace' }}>
            {item}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: '05',
    name: 'Analitik',
    desc: 'Insight performa toko secara real-time.',
    detail: (
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Laba Bersih', 'Total Omzet', 'Estimasi Laba Stok', 'Rekomendasi Re-stock', 'Dana Cadangan', 'Take-home Profit', 'Tren Keuntungan', 'Produk Terlaris', 'Log Transaksi Harian'].map((m) => (
            <span key={m} className="px-2 py-1 rounded text-xs" style={{ background: '#16181c', border: '1px solid #2a2d34', color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace' }}>{m}</span>
          ))}
        </div>
        <LiveOmzetCounter />
      </div>
    ),
  },
  {
    id: '06',
    name: 'Label Barcode',
    desc: 'Cetak label barcode sesuai kebutuhan toko.',
    detail: (
      <div className="flex flex-wrap gap-2">
        {['Ukuran Label', 'Tinggi Barcode', 'Jarak Antar Label', 'Jumlah Kolom', 'Konfigurasi Printer', 'Print Langsung', 'Export PDF'].map((f) => (
          <span key={f} className="px-2 py-1 rounded text-xs" style={{ background: '#16181c', border: '1px solid #2a2d34', color: '#e7e9ee', fontFamily: 'JetBrains Mono, monospace' }}>{f}</span>
        ))}
      </div>
    ),
  },
  {
    id: '07',
    name: 'Tagihan',
    desc: 'Pantau status pengadaan dan pembayaran.',
    detail: (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: 'Total Pengadaan', val: 'Rp 24.500.000' },
          { label: 'Total Terbayar', val: 'Rp 18.200.000' },
          { label: 'Sisa Tagihan', val: 'Rp 6.300.000' },
          { label: 'Status', val: 'Dicicil / Lunas' },
        ].map(({ label, val }) => (
          <div key={label} className="p-3 rounded" style={{ background: '#16181c', border: '1px solid #2a2d34' }}>
            <p className="text-xs mb-1" style={{ color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace' }}>{label}</p>
            <p className="text-sm font-semibold" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace' }}>{val}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: '08',
    name: 'Pengaturan',
    desc: 'Konfigurasi toko sesuai kebutuhan.',
    detail: (
      <div className="flex flex-wrap gap-2">
        {['Info Bisnis', 'Printer & Struk', 'QRIS', 'PIN Keamanan', 'Backup Data', 'Dual Display', 'Rekening Bank'].map((s) => (
          <span key={s} className="px-2 py-1 rounded text-xs" style={{ background: '#16181c', border: '1px solid #2a2d34', color: '#e7e9ee', fontFamily: 'JetBrains Mono, monospace' }}>{s}</span>
        ))}
      </div>
    ),
  },
  {
    id: '09',
    name: 'Akun & Keamanan',
    desc: 'Akses aman untuk pemilik & staf toko.',
    detail: (
      <div className="text-sm space-y-1" style={{ color: '#8a8f98' }}>
        <p>· Login, Sign Up, Verifikasi Email, Lupa Password (via email + nomor HP terdaftar)</p>
        <p>· <span style={{ color: '#e7e9ee' }}>PIN Keamanan</span> — khusus Owner, melindungi data modal & profit</p>
        <p>· Lupa PIN — reset via Settings setelah autentikasi ulang</p>
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
      <span className="text-xs" style={{ color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace' }}>OMZET LIVE</span>
      <span className="text-sm font-semibold" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace' }}>
        Rp {value.toLocaleString('id-ID')}
      </span>
    </div>
  )
}

function HazardDivider() {
  return <div className="hazard-stripe w-full" />
}

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [openModule, setOpenModule] = useState<string | null>(null)
  const [activeShot, setActiveShot] = useState(0)

  useScrollReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const shots = [
    { label: 'Manajemen Produk', img: screenshotProduk, alt: 'Layar manajemen produk BuildEra menampilkan daftar SKU, stok, dan profit' },
    { label: 'Riwayat Transaksi', img: screenshotTransaksi, alt: 'Layar riwayat transaksi BuildEra dengan detail invoice' },
    { label: 'Detail Piutang', img: screenshotPiutang, alt: 'Layar detail piutang pelanggan di BuildEra' },
    { label: 'Label Barcode', img: screenshotBarcode, alt: 'Layar cetak label barcode BuildEra dengan konfigurasi cetak' },
  ]

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh', color: '#e7e9ee' }}>
      {/* Film grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,12,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #1e2128' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img src={logo02} alt="BuildEra" className="h-8 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {['Beranda', 'Fitur', 'Screenshots', 'Download', 'Kontak', 'Bantuan'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-widest transition-colors duration-150"
                style={{ color: '#8a8f98', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.08em' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FF6A00' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8a8f98' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8a8f98' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
              v1.2.0 — Available Now
            </div>
            <a
              href="https://wa.me/971582517092"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-150"
              style={{
                background: '#FF6A00',
                color: '#0a0a0c',
                fontFamily: 'Barlow Condensed, sans-serif',
                letterSpacing: '0.08em',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#ff8533' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FF6A00' }}
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="beranda"
        className="relative flex items-end"
        style={{ minHeight: '100vh', paddingBottom: '5rem' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0a0c 28%, rgba(10,10,12,0.65) 60%, rgba(10,10,12,0.35) 100%)' }} />
        {/* Left-side vertical dark gradient for text legibility */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,12,0.92) 40%, transparent 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <p
              className="text-xs uppercase mb-4"
              style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em' }}
            >
              Versi Terbaru v1.2.0
            </p>

            {/* Headline */}
            <h1
              className="leading-none mb-3"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.01em', color: '#e7e9ee' }}
            >
              Download{' '}
              <span style={{ color: '#FF6A00' }}>BuildEra</span>
            </h1>

            {/* Subhead */}
            <p
              className="text-xl mb-3 uppercase"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 500, letterSpacing: '0.06em', color: '#8a8f98' }}
            >
              Material &amp; Construction POS
            </p>

            <p className="text-sm mb-8 leading-relaxed" style={{ color: '#8a8f98', maxWidth: '38ch' }}>
              Aplikasi kasir dan manajemen toko bahan bangunan yang cepat, mudah, dan lengkap.
            </p>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/buildera.msixx"
                className="group flex items-center gap-3 px-5 py-3 transition-all duration-150"
                style={{ border: '1px solid #FF6A00', color: '#e7e9ee', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,106,0,0.1)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1v10M3 7l5 5 5-5M1 13h14" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <span className="text-base block">Download MSIX</span>
                  <span className="text-xs block" style={{ color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>Installer · ~78 MB · Direkomendasikan</span>
                </span>
              </a>

              <a
                href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/BuildEra.zipp"
                className="group flex items-center gap-3 px-5 py-3 transition-all duration-150"
                style={{ border: '1px solid #2a2d34', color: '#e7e9ee', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#8a8f98' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2d34' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1v10M3 7l5 5 5-5M1 13h14" stroke="#8a8f98" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <span className="text-base block">Download ZIP</span>
                  <span className="text-xs block" style={{ color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>Portable · ~92 MB · Extract &amp; run</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Verified badge */}
        <div
          className="absolute bottom-8 left-6 flex items-center gap-2 px-3 py-2 text-xs"
          style={{ background: 'rgba(10,10,12,0.8)', border: '1px solid #2a2d34', color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace', backdropFilter: 'blur(8px)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Aman &amp; Terverifikasi — file dicek sebelum dirilis
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ opacity: 0.4 }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#e7e9ee" strokeWidth="1.2" />
            <circle cx="8" cy="7" r="2" fill="#e7e9ee">
              <animate attributeName="cy" values="7;14;7" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </section>

      <HazardDivider />

      {/* FEATURES */}
      <section id="fitur" className="max-w-7xl mx-auto px-6 py-24">
        <div className="reveal mb-16">
          <p className="text-xs uppercase mb-3" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em' }}>Modul Lengkap</p>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.01em' }}>
            Semua yang Toko Bahan<br />Bangunan Butuhkan
          </h2>
        </div>

        <div className="border-t" style={{ borderColor: '#1e2128' }}>
          {MODULES.map((mod, i) => {
            const isOpen = openModule === mod.id
            return (
              <div key={mod.id} className="reveal border-b" style={{ borderColor: '#1e2128', transitionDelay: `${i * 40}ms` }}>
                <button
                  className="w-full text-left flex items-start gap-6 py-6 transition-colors duration-150"
                  style={{ background: isOpen ? 'rgba(255,106,0,0.04)' : 'transparent' }}
                  onClick={() => setOpenModule(isOpen ? null : mod.id)}
                  onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'rgba(255,106,0,0.04)' }}
                  onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <span
                    className="flex-shrink-0 text-3xl leading-none pt-0.5"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 400, color: isOpen ? '#FF6A00' : '#2a2d34', minWidth: '3.5rem', transition: 'color 0.15s' }}
                  >
                    {mod.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3
                          className="text-xl md:text-2xl"
                          style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.01em', color: isOpen ? '#FF6A00' : '#e7e9ee', transition: 'color 0.15s' }}
                        >
                          {mod.name}
                        </h3>
                        <p className="text-sm mt-0.5" style={{ color: '#8a8f98' }}>{mod.desc}</p>
                      </div>
                      <svg
                        width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
                        style={{ flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: isOpen ? '#FF6A00' : '#8a8f98' }}
                      >
                        <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </button>

                <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                  <div className="accordion-inner">
                    <div className="pb-6 pl-0 md:pl-[calc(3.5rem+1.5rem)]">
                      {mod.detail}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <HazardDivider />

      {/* SCREENSHOTS */}
      <section id="screenshots" className="max-w-7xl mx-auto px-6 py-24">
        <div className="reveal mb-10">
          <p className="text-xs uppercase mb-3" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em' }}>Interface</p>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.01em' }}>
            Lihat BuildEra<br />dalam Aksi
          </h2>
        </div>

        <div className="reveal">
          {/* Tab strip */}
          <div className="flex gap-0 mb-0 border-b" style={{ borderColor: '#1e2128' }}>
            {shots.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveShot(i)}
                className="px-4 py-3 text-xs uppercase tracking-wider transition-colors duration-150"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: activeShot === i ? '#FF6A00' : '#8a8f98',
                  borderBottom: activeShot === i ? '2px solid #FF6A00' : '2px solid transparent',
                  marginBottom: '-1px',
                  background: 'transparent',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Screenshot display */}
          <div
            className="relative w-full overflow-hidden"
            style={{ background: '#16181c', border: '1px solid #1e2128', borderTop: 'none' }}
          >
            <img
              key={activeShot}
              src={shots[activeShot].img}
              alt={shots[activeShot].alt}
              className="w-full object-cover"
              style={{ maxHeight: '540px', objectPosition: 'top' }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 70%, rgba(10,10,12,0.5) 100%)' }} />
          </div>
        </div>
      </section>

      <HazardDivider />

      {/* DOWNLOAD TABLE */}
      <section id="download" className="max-w-7xl mx-auto px-6 py-24">
        <div className="reveal mb-10">
          <p className="text-xs uppercase mb-3" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em' }}>Pilih Paket</p>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.01em' }}>
            Perbandingan<br />Installer
          </h2>
        </div>

        <div className="reveal overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse', fontFamily: 'JetBrains Mono, monospace' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #FF6A00' }}>
                <th className="py-4 pr-6 text-left text-xs uppercase tracking-widest" style={{ color: '#8a8f98' }}>Spesifikasi</th>
                <th className="py-4 pr-6 text-left text-xs uppercase tracking-widest" style={{ color: '#e7e9ee' }}>MSIX Installer</th>
                <th className="py-4 text-left text-xs uppercase tracking-widest" style={{ color: '#8a8f98' }}>Portable ZIP</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Metode', 'Instalasi standar Windows', 'Extract & run BuildEra.exe'],
                ['Perlu hak admin', 'Ya', 'Tidak'],
                ['Auto-update', 'Ya', 'Tidak'],
                ['Ukuran', '~78 MB', '~92 MB'],
              ].map(([spec, msix, zip]) => (
                <tr key={spec} style={{ borderBottom: '1px solid #1e2128' }}>
                  <td className="py-4 pr-6" style={{ color: '#8a8f98' }}>{spec}</td>
                  <td className="py-4 pr-6" style={{ color: '#e7e9ee' }}>{msix}</td>
                  <td className="py-4" style={{ color: '#8a8f98' }}>{zip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="reveal mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/buildera.msixx"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-150"
            style={{ background: '#FF6A00', color: '#0a0a0c', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.08em' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#ff8533' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FF6A00' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1v10M3 7l5 5 5-5M1 13h14" stroke="#0a0a0c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download MSIX — ~78 MB
          </a>
          <a
            href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/BuildEra.zipp"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-150"
            style={{ border: '1px solid #2a2d34', color: '#e7e9ee', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.08em' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#8a8f98' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2d34' }}
          >
            Download ZIP — ~92 MB
          </a>
          <a
            href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/Manual.Book.BuildEra.V0.1.pdff"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-150"
            style={{ border: '1px solid #2a2d34', color: '#8a8f98', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.08em' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#e7e9ee'; (e.currentTarget as HTMLElement).style.borderColor = '#8a8f98' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8a8f98'; (e.currentTarget as HTMLElement).style.borderColor = '#2a2d34' }}
          >
            Manual Book PDF
          </a>
        </div>
      </section>

      {/* SYSTEM REQUIREMENTS — light strip */}
      <section style={{ background: '#f0f2f5', borderTop: '1px solid #d4d7dc', borderBottom: '1px solid #d4d7dc' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xs uppercase tracking-widest mr-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF6A00', fontWeight: 500 }}>SYS REQ</span>
            {[
              'OS: Windows 10/11 (64-bit)',
              'Processor: Intel/AMD 64-bit',
              'RAM: Min 4 GB',
              'Storage: Min 1 GB',
              'Internet: Diperlukan untuk aktivasi & sinkronisasi',
            ].map((req, i, arr) => (
              <span key={req} className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3a3d44' }}>
                {req}{i < arr.length - 1 && <span style={{ color: '#8a8f98' }}> · </span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HazardDivider />

      {/* CONTACT */}
      <section id="kontak" className="max-w-7xl mx-auto px-6 py-24">
        <div className="reveal max-w-lg">
          <p className="text-xs uppercase mb-3" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em' }}>Bantuan</p>
          <h2 className="mb-8" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.01em' }}>
            Butuh<br />Bantuan?
          </h2>

          <div className="space-y-4">
            <a
              href="mailto:SolutivoLabs@gmail.com"
              className="flex items-center gap-4 p-4 transition-all duration-150 group"
              style={{ border: '1px solid #1e2128', background: 'transparent' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2d34'; (e.currentTarget as HTMLElement).style.background = '#16181c' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#1e2128'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: '#16181c', border: '1px solid #2a2d34' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="3" width="12" height="8" rx="1" stroke="#8a8f98" strokeWidth="1.2" />
                  <path d="M1 4l6 4 6-4" stroke="#8a8f98" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace' }}>Email</p>
                <p className="text-sm" style={{ color: '#e7e9ee' }}>SolutivoLabs@gmail.com</p>
              </div>
            </a>

            <a
              href="https://wa.me/971582517092"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 transition-all duration-150"
              style={{ border: '1px solid #FF6A00', background: 'rgba(255,106,0,0.05)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,106,0,0.1)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,106,0,0.05)' }}
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: '#FF6A00' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0a0a0c" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace' }}>WhatsApp</p>
                <p className="text-sm" style={{ color: '#e7e9ee' }}>+971 58 251 7092</p>
              </div>
            </a>
          </div>

          <div className="mt-8 p-4" style={{ background: '#16181c', border: '1px solid #1e2128' }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace' }}>Import Format Excel</p>
            <a
              href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/Format_import_Product_list_BuildEra.xlsx.xlsx"
              className="text-sm transition-colors duration-150"
              style={{ color: '#FF6A00', fontFamily: 'JetBrains Mono, monospace' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#ff8533' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FF6A00' }}
            >
              Format_import_Product_list_BuildEra.xlsx ↓
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1e2128', background: '#16181c' }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo01} alt="BuildEra logo" className="h-6 object-contain" />
            <p className="text-xs" style={{ color: '#8a8f98', fontFamily: 'JetBrains Mono, monospace' }}>
              © 2024 Solutivo Labs Indonesia. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8a8f98' }}>
            <a href="#" className="transition-colors duration-150" onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#e7e9ee' }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8a8f98' }}>Kebijakan Privasi</a>
            <a href="#" className="transition-colors duration-150" onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#e7e9ee' }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8a8f98' }}>Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
