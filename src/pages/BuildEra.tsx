import { useEffect, useState, useRef } from 'react';

// Assets
import logo01 from '../assets/buildera/logo01.png';
import logo02 from '../assets/buildera/logo02.png';
import background from '../assets/buildera/backround.png';
import shotKasir from '../assets/buildera/laman-kasir.png';
import shotTransaksi from '../assets/buildera/laman-transaksi.png';
import shotPiutang from '../assets/buildera/laman-piutang.png';
import shotPelanggan from '../assets/buildera/laman-datapelanggan.png';
import shotProduk from '../assets/buildera/laman-manajemenproduk.png';
import shotAnalitik from '../assets/buildera/laman-analitik.png';
import shotBarcode from '../assets/buildera/laman-printbarcode.png';
import shotTagihan from '../assets/buildera/laman-tagihan.png';
import shotSetting from '../assets/buildera/laman-setting.png';

interface BuildEraProps {
  onBack: () => void;
}

const COLORS = {
  orange: '#FF6A00',
  orange2: '#ff8c3f',
  orangeDark: '#dd5800',
  bgDark: '#0a0c11',
  cardDark: '#161a22',
  mutedDark: '#a6adbb',
  ink: '#0f1115',
};

const ICONS = {
  cart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 2.5h3l2.6 13.2a2 2 0 002 1.6h8.4a2 2 0 002-1.6L21 7H6"/></svg>,
  box: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></svg>,
  truck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="14" height="11"/><path d="M15 10h4l4 4v3h-8z"/><circle cx="6" cy="19" r="2"/><circle cx="17.5" cy="19" r="2"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  barcode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 5v14"/><path d="M7 5v14"/><path d="M11 5v14"/><path d="M14 5v14"/><path d="M18 5v14"/><path d="M21 5v14"/></svg>,
  invoice: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.14.4.43.72.8.94.37.22.72.4 1.06.56H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="M9 12l2 2 4-4"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  dl: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13"/><path d="M6 11l6 6 6-6"/><path d="M4 21h16"/></svg>,
  monitor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h6"/><path d="M9 11h1"/></svg>,
  excel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
};

const FEATURES = {
  kasir: {
    label: "Kasir & Transaksi", icon: ICONS.cart,
    desc: "Alur transaksi cepat di meja kasir.",
    items: ["Laman Kasir", "Pencarian produk", "Barcode scanning", "Keranjang transaksi", "Pengaturan quantity", "Override harga", "Diskon produk", "Diskon transaksi", "Pemilihan pelanggan", "Pembayaran", "Checkout", "Dukungan shortcut keyboard"]
  },
  produk: {
    label: "Manajemen Produk", icon: ICONS.box,
    desc: "Kelola katalog, stok, dan harga.",
    items: ["Tambah produk", "Edit produk", "Restock produk", "Barcode", "Kategori produk", "Satuan produk", "Stok", "Harga jual", "Harga modal"]
  },
  supplier: {
    label: "Supplier & Ekspedisi", icon: ICONS.truck,
    desc: "Data mitra pengadaan & pengiriman.",
    items: ["Data supplier", "Data ekspedisi", "Status pembayaran", "Belum lunas", "Dicicil", "Lunas", "Riwayat pembayaran", "Pengelolaan tagihan supplier", "Pengelolaan tagihan ekspedisi"]
  },
  pelanggan: {
    label: "Pelanggan & Piutang", icon: ICONS.users,
    desc: "Data pelanggan dan pelacakan piutang.",
    items: ["Daftar pelanggan", "Tambah pelanggan", "Informasi pelanggan", "Saldo piutang", "Detail piutang", "Pembayaran cicilan", "Riwayat pembayaran"]
  },
  analitik: {
    label: "Analitik", icon: ICONS.chart,
    desc: "Insight performa toko secara real-time.",
    items: ["Laba bersih", "Total transaksi", "Estimasi laba stok", "Total omzet", "Rekomendasi re-stock", "Dana cadangan", "Take-home profit", "Tren keuntungan", "Metode pembayaran", "Produk terlaris", "Log transaksi harian"]
  },
  barcode: {
    label: "Label Barcode", icon: ICONS.barcode,
    desc: "Cetak label barcode sesuai kebutuhan toko.",
    items: ["Pemilihan produk", "Konfigurasi ukuran label", "Ukuran barcode", "Tinggi barcode", "Jarak antar label", "Padding", "Jumlah kolom", "Konfigurasi printer", "Print langsung", "Export / buka PDF"]
  },
  tagihan: {
    label: "Tagihan", icon: ICONS.invoice,
    desc: "Pantau status pengadaan dan pembayaran.",
    items: ["Tagihan supplier", "Tagihan ekspedisi", "Total pengadaan", "Total terbayar", "Sisa tagihan", "Status pembayaran", "Pembayaran penuh", "Pembayaran cicilan", "Riwayat pembayaran"]
  },
  pengaturan: {
    label: "Pengaturan", icon: ICONS.settings,
    desc: "Konfigurasi toko sesuai kebutuhan.",
    items: ["Informasi bisnis", "Pengaturan printer & struk", "QRIS", "PIN keamanan", "Backup data", "Pengaturan tampilan", "Full screen", "Dual display", "Rekening bank"]
  },
  akun: {
    label: "Akun & Keamanan", icon: ICONS.shield,
    desc: "Akses aman untuk pemilik & staf toko.",
    items: ["Login", "Sign Up", "Verifikasi Email", "Lupa Password", "PIN Keamanan", "Lupa PIN"]
  }
};

const SHOTS = [
  { title: "Laman Kasir", category: "Kasir", src: shotKasir },
  { title: "Laman Transaksi", category: "Transaksi", src: shotTransaksi },
  { title: "Laman Piutang", category: "Piutang", src: shotPiutang },
  { title: "Data Pelanggan", category: "Pelanggan", src: shotPelanggan },
  { title: "Manajemen Produk", category: "Manajemen Produk", src: shotProduk },
  { title: "Dashboard Analitik", category: "Analitik", src: shotAnalitik },
  { title: "Print Barcode", category: "Label Barcode", src: shotBarcode },
  { title: "Laman Tagihan", category: "Tagihan", src: shotTagihan },
  { title: "Laman Pengaturan", category: "Pengaturan", src: shotSetting }
];

export default function BuildEra({ onBack }: BuildEraProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [activeFeat, setActiveFeat] = useState<keyof typeof FEATURES>("kasir");
  const [activeShotFilter, setActiveShotFilter] = useState("Semua");

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const shotCategories = ["Semua", ...new Set(SHOTS.map(s => s.category))];
  const filteredShots = activeShotFilter === "Semua" ? SHOTS : SHOTS.filter(s => s.category === activeShotFilter);

  if (showSplash) {
    return (
      <div className="be-splash" style={{
        position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between', background: `url(${background}) center/cover no-repeat #000`,
        color: '#fff', animation: 'beSplashExit .8s ease 2.5s forwards'
      }}>
        <div style={{ marginTop: '14vh', textAlign: 'center' }}>
          <img src={logo01} alt="BuildEra Logo" style={{ width: '200px', marginBottom: '24px' }} />
          <h1 style={{ fontSize: '64px', fontWeight: 850, color: COLORS.orange, margin: 0 }}>BuildEra</h1>
          <p style={{ fontSize: '16px', fontWeight: 650, color: '#d7dae2', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Material & Construction POS</p>
        </div>
        <div style={{ marginBottom: '7vh', width: '300px' }}>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ height: '100%', background: COLORS.orange, width: '100%', animation: 'beSplashLoad 2s ease forwards' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 650, color: 'rgba(215,218,226,0.7)' }}>Powered by Solutivo Labs</span>
            <img src={logo02} alt="" style={{ height: '30px', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FFFFFF', color: COLORS.ink, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '76px',
        background: 'rgba(10,12,17,0.82)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px, 4vw, 60px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={onBack} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF',
            fontSize: '11px', fontWeight: 600, padding: '8px 16px', borderRadius: '8px', cursor: 'pointer'
          }}>← KEMBALI</button>
          <img src={logo02} alt="BuildEra" style={{ height: '34px' }} />
        </div>
        <nav style={{ display: 'flex', gap: '20px' }} className="hidden-mobile">
          {['Fitur', 'Screenshot', 'Download', 'Kontak'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#c7cbd6', fontSize: '14.5px', fontWeight: 600, textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ color: COLORS.mutedDark, fontSize: '12.5px', fontWeight: 600 }}>v1.2.1</span>
          <a href="#download" style={{
            background: COLORS.orange, color: '#fff', fontSize: '14px', fontWeight: 700, padding: '10px 18px',
            borderRadius: '10px', textDecoration: 'none', boxShadow: '0 8px 20px rgba(255,106,0,0.3)'
          }}>Download</a>
        </div>
      </header>

      {/* Hero */}
      <section id="beranda" style={{
        padding: '160px 0 100px', textAlign: 'left', background: `linear-gradient(180deg, rgba(6,7,10,0.1) 0%, rgba(6,7,10,0.8) 100%), url(${background}) center/cover no-repeat`,
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', color: COLORS.orange2, fontWeight: 700, fontSize: '13px',
            textTransform: 'uppercase', background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.25)',
            padding: '7px 14px', borderRadius: '99px', marginBottom: '22px'
          }}>
            <div style={{ width: '14px' }}>{ICONS.dl}</div> Versi Terbaru v1.2.1
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 5.4vw, 64px)', fontWeight: 800, margin: '0 0 6px' }}>Download <span style={{ color: COLORS.orange }}>BuildEra</span></h1>
          <p style={{ fontSize: '24px', color: '#d7dae2', fontWeight: 600, margin: '6px 0 18px' }}>Material & Construction POS</p>
          <p style={{ fontSize: '16.5px', color: COLORS.mutedDark, lineHeight: 1.65, maxWidth: '520px', margin: '0 0 30px' }}>
            Aplikasi kasir dan manajemen toko bahan bangunan yang cepat, mudah, dan lengkap.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ background: COLORS.cardDark, padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', width: '270px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,106,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.orange, marginBottom: '12px' }}>{ICONS.box}</div>
              <h3 style={{ fontSize: '15.5px', fontWeight: 700, margin: '0 0 6px' }}>Installer (MSIX)</h3>
              <p style={{ fontSize: '13px', color: COLORS.mutedDark, margin: '0 0 16px', height: '40px' }}>Direkomendasikan untuk Windows 10/11.</p>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/buildera.msix" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: COLORS.orange,
                color: '#fff', fontWeight: 700, padding: '12px', borderRadius: '10px', textDecoration: 'none'
              }}>{ICONS.dl} Download MSIX</a>
            </div>
            <div style={{ background: COLORS.cardDark, padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', width: '270px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,106,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.orange, marginBottom: '12px' }}>{ICONS.box}</div>
              <h3 style={{ fontSize: '15.5px', fontWeight: 700, margin: '0 0 6px' }}>Portable ZIP</h3>
              <p style={{ fontSize: '13px', color: COLORS.mutedDark, margin: '0 0 16px', height: '40px' }}>Extract lalu jalankan BuildEra.exe.</p>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/BuildEra.zip" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: COLORS.orange,
                color: '#fff', fontWeight: 700, padding: '12px', borderRadius: '10px', textDecoration: 'none'
              }}>{ICONS.dl} Download ZIP</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8a91a3', fontSize: '13px', marginTop: '30px' }}>
            <div style={{ width: '16px', color: '#3ddc84' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="M9 12l2 2 4-4"/></svg></div>
            Aman & terverifikasi — file dicek sebelum dirilis.
          </div>
        </div>
      </section>

      {/* Sys Req */}
      <section style={{ padding: '40px 0', background: 'rgba(20,20,20,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            background: 'rgba(20,20,20,0.5)', backdropFilter: 'blur(18px)', border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '18px', padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '175px', fontWeight: 800, fontSize: '14px' }}>
              <div style={{ width: '36px', height: '36px', background: 'rgba(0,0,0,0.1)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.orange }}>{ICONS.monitor}</div>
              Persyaratan Sistem
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
              {[
                { l: 'OS', v: 'Windows 10 / 11' },
                { l: 'RAM', v: 'Minimal 4 GB' },
                { l: 'Storage', v: 'Minimal 1 GB' },
                { l: 'Internet', v: 'Aktivasi & Sinkron' }
              ].map(i => (
                <div key={i.l} style={{ flex: 1, minWidth: '130px', padding: '0 22px', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                  <b style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>{i.l}</b>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{i.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" style={{ padding: '96px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }}>
            <span style={{ color: COLORS.orangeDark, fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(255,106,0,0.08)', padding: '7px 14px', borderRadius: '99px' }}>Fitur Lengkap</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '14px' }}>Semua yang toko bangunan <span style={{ color: COLORS.orange }}>butuhkan</span></h2>
            <p style={{ color: '#5b6272', marginTop: '14px' }}>Dari kasir harian hingga analitik profit — dikelompokkan berdasarkan alur kerja nyata.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '36px' }} className="buildera-feat-layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.keys(FEATURES).map(k => (
                <button key={k} onClick={() => setActiveFeat(k as keyof typeof FEATURES)} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 15px', borderRadius: '12px',
                  border: '1.5px solid', borderColor: activeFeat === k ? COLORS.ink : '#eef0f3',
                  background: activeFeat === k ? COLORS.ink : '#fff',
                  color: activeFeat === k ? '#fff' : '#333844', cursor: 'pointer', textAlign: 'left', fontWeight: 700
                }}>
                  <div style={{ width: '34px', height: '34px', background: activeFeat === k ? COLORS.orange : '#eef0f3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeFeat === k ? '#fff' : '#5b6272' }}>
                    <div style={{ width: '17px' }}>{FEATURES[k as keyof typeof FEATURES].icon}</div>
                  </div>
                  {FEATURES[k as keyof typeof FEATURES].label}
                </button>
              ))}
            </div>
            <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: '20px', padding: '34px' }}>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '22px' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(255,106,0,0.1)', color: COLORS.orange, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '24px' }}>{FEATURES[activeFeat].icon}</div>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '21px', fontWeight: 800 }}>{FEATURES[activeFeat].label}</h3>
                  <p style={{ margin: '2px 0 0', fontSize: '13.5px', color: '#5b6272' }}>{FEATURES[activeFeat].desc}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' }}>
                {FEATURES[activeFeat].items.map(it => (
                  <div key={it} style={{ display: 'flex', gap: '10px', background: '#f7f8fa', padding: '13px 14px', borderRadius: '11px', border: '1px solid #eef0f3' }}>
                    <div style={{ width: '22px', height: '22px', background: 'rgba(255,106,0,0.14)', color: COLORS.orangeDark, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ICONS.check}</div>
                    <b style={{ fontSize: '13.8px' }}>{it}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot */}
      <section id="screenshot" style={{ padding: '96px 0', background: '#f7f8fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }}>
            <span style={{ color: COLORS.orangeDark, fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(255,106,0,0.08)', padding: '7px 14px', borderRadius: '99px' }}>Tampilan Aplikasi</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '14px' }}>Lihat <span style={{ color: COLORS.orange }}>BuildEra</span> beraksi</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '9px', marginBottom: '36px', flexWrap: 'wrap' }}>
            {shotCategories.map(c => (
              <button key={c} onClick={() => setActiveShotFilter(c)} style={{
                background: activeShotFilter === c ? COLORS.orange : '#fff', color: activeShotFilter === c ? '#fff' : '#333844',
                border: '1.5px solid #eef0f3', padding: '9px 16px', borderRadius: '99px', fontWeight: 700, fontSize: '13px', cursor: 'pointer'
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '18px' }}>
            {filteredShots.map(s => (
              <div key={s.title} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eef0f3' }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}><img src={s.src} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div style={{ padding: '14px 16px' }}><b style={{ fontSize: '14px' }}>{s.title}</b><span style={{ fontSize: '12px', color: '#8a91a3' }}>{s.category}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" style={{ padding: '96px 0', background: COLORS.bgDark }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }}>
            <span style={{ color: COLORS.orange2, fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', background: 'rgba(255,106,0,0.12)', padding: '7px 14px', borderRadius: '99px' }}>Download</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#fff', marginTop: '14px' }}>Dapatkan <span style={{ color: COLORS.orange }}>BuildEra</span> sekarang</h2>
          </div>

          <div style={{ background: 'linear-gradient(155deg,#161a22,#0a0c11)', borderRadius: '22px', padding: '44px', border: '1px solid rgba(255,255,255,0.09)', marginBottom: '56px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: COLORS.orange, color: '#fff', fontSize: '11.5px', fontWeight: 800, padding: '5px 12px', borderRadius: '99px', textTransform: 'uppercase' }}>Latest Release</span>
                <h3 style={{ color: '#fff', fontSize: '26px', margin: 0 }}>BuildEra v1.2.1</h3>
              </div>
              <span style={{ color: '#8a91a3', fontWeight: 600 }}>Dirilis 2026</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '22px' }} className="buildera-feat-layout">
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '24px', borderRadius: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '11px', background: 'rgba(255,106,0,0.14)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>{ICONS.box}</div>
                <h4 style={{ color: '#fff', fontSize: '16.5px', fontWeight: 800, margin: '0 0 8px' }}>Installer (MSIX)</h4>
                <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/buildera.msix" style={{ background: COLORS.orange, color: '#fff', padding: '12px', borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{ICONS.dl} Download MSIX</a>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '24px', borderRadius: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '11px', background: 'rgba(255,106,0,0.14)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>{ICONS.truck}</div>
                <h4 style={{ color: '#fff', fontSize: '16.5px', fontWeight: 800, margin: '0 0 8px' }}>Portable ZIP</h4>
                <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/BuildEra.zip" style={{ background: COLORS.orange, color: '#fff', padding: '12px', borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{ICONS.dl} Download ZIP</a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/Manual.Book.BuildEra.V0.1.pdf" target="_blank" rel="noreferrer" style={{ flex: 1, minWidth: '230px', background: 'rgba(255,255,255,0.04)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.09)', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.08)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.orange2 }}>{ICONS.file}</div>
                <div><b>Manual Book</b><span style={{ fontSize: '11.5px', color: '#8a91a3', display: 'block' }}>Panduan Lengkap (PDF)</span></div>
              </a>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/Format_import_Product_list_BuildEra.xlsx" target="_blank" rel="noreferrer" style={{ flex: 1, minWidth: '230px', background: 'rgba(255,255,255,0.04)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.09)', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.08)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.orange2 }}>{ICONS.excel}</div>
                <div><b>Excel Template</b><span style={{ fontSize: '11.5px', color: '#8a91a3', display: 'block' }}>Format Import Data</span></div>
              </a>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(155deg,#1c212b,#11141b)', borderRadius: '22px', padding: '44px', border: '1px solid rgba(255,106,0,0.15)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#5b6272', color: '#fff', fontSize: '11.5px', fontWeight: 800, padding: '5px 12px', borderRadius: '99px', textTransform: 'uppercase' }}>Custom Release</span>
                <h3 style={{ color: '#fff', fontSize: '26px', margin: 0 }}>Neelam-BuildEra v1.2.1</h3>
              </div>
              <span style={{ color: '#8a91a3', fontWeight: 600 }}>Dirilis 2026</span>
            </div>
            <p style={{ color: COLORS.mutedDark, fontSize: '14px', marginTop: '-16px', marginBottom: '24px' }}>Versi khusus untuk kebutuhan kustomisasi perusahaan Neelam.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="buildera-feat-layout">
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/builderaNeelam.msix" style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '10px', textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, gap: '8px' }}>{ICONS.dl} Neelam MSIX</a>
              <a href="https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/BuildEraNeelam.zip" style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '10px', textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, gap: '8px' }}>{ICONS.dl} Neelam ZIP</a>
            </div>
          </div>
        </div>
      </section>

      {/* Help */}
      <section id="kontak" style={{ padding: '96px 0', background: COLORS.bgDark }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }}>
            <span style={{ color: COLORS.orange2, fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', background: 'rgba(255,106,0,0.12)', padding: '7px 14px', borderRadius: '99px' }}>Kami Siap Membantu</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#fff', marginTop: '14px' }}>Kontak & <span style={{ color: COLORS.orange }}>Bantuan</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="buildera-feat-layout">
            <div style={{ background: COLORS.cardDark, padding: '28px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: 'rgba(255,106,0,0.13)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg></div>
              <h4 style={{ color: '#fff', margin: 0, fontSize: '17px' }}>Email</h4>
              <p style={{ color: '#fff', fontWeight: 700, margin: '8px 0' }}>solutivolabs@gmail.com</p>
              <a href="mailto:solutivolabs@gmail.com" style={{ background: COLORS.orange, color: '#fff', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginTop: '6px' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px' }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg> Email Us</a>
            </div>
            <div style={{ background: COLORS.cardDark, padding: '28px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: 'rgba(255,106,0,0.13)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
              <h4 style={{ color: '#fff', margin: 0, fontSize: '17px' }}>WhatsApp (Chat Only)</h4>
              <p style={{ color: '#fff', fontWeight: 700, margin: '8px 0' }}>+971 58 251 7092</p>
              <a href="https://wa.me/971582517092" target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginTop: '6px' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px' }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> Chat via WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: COLORS.bgDark, borderTop: '1px solid rgba(255,255,255,0.09)', padding: '34px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logo02} alt="BuildEra logo" style={{ height: '30px' }} />
          <span style={{ fontSize: '13px', color: '#8a91a3' }}>© 2026 Solutivo Labs Indonesia. All rights reserved.</span>
        </div>
      </footer>

      <style>{`
        @keyframes beSplashLoad { from { width: 0; } to { width: 100%; } }
        @keyframes beSplashExit { to { opacity: 0; visibility: hidden; } }
        @media (max-width: 900px) { .buildera-feat-layout { grid-template-columns: 1fr !important; } .hidden-mobile { display: none !important; } }
      `}</style>
    </div>
  );
}
