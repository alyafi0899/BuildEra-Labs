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

export default function BuildEra({ onBack }: BuildEraProps) {
  const [splashActive, setSplashActive] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('beranda');
  const [activeFeat, setActiveFeat] = useState('kasir');
  const [activeShotFilter, setActiveShotFilter] = useState('Semua');
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [toast, setToast] = useState<{ msg: string; isWarning: boolean } | null>(null);

  const SHOTS = [
    { id: "shot-kasir", category: "Kasir", title: "Laman Kasir", src: shotKasir },
    { id: "shot-transaksi", category: "Transaksi", title: "Laman Transaksi", src: shotTransaksi },
    { id: "shot-piutang", category: "Piutang", title: "Laman Piutang", src: shotPiutang },
    { id: "shot-pelanggan", category: "Pelanggan", title: "Data Pelanggan", src: shotPelanggan },
    { id: "shot-produk", category: "Manajemen Produk", title: "Manajemen Produk", src: shotProduk },
    { id: "shot-analitik", category: "Analitik", title: "Dashboard Analitik", src: shotAnalitik },
    { id: "shot-barcode", category: "Label Barcode", title: "Print Barcode", src: shotBarcode },
    { id: "shot-tagihan", category: "Tagihan", title: "Laman Tagihan", src: shotTagihan },
    { id: "shot-pengaturan", category: "Pengaturan", title: "Laman Pengaturan", src: shotSetting }
  ];

  const filteredShots = activeShotFilter === "Semua" ? SHOTS : SHOTS.filter(s => s.category === activeShotFilter);

  const DOWNLOADS: Record<string, { url: string; label: string; size?: string }> = {
    msix: { url: "https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/buildera.msix", label: "buildera.msix", size: "55.65 MB" },
    zip: { url: "https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/BuildEra.zip", label: "BuildEra.zip", size: "26.66 MB" },
    neelamMsix: { url: "https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/builderaNeelam.msix", label: "builderaNeelam.msix", size: "55.65 MB" },
    neelamZip: { url: "https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.1/BuildEraNeelam.zip", label: "BuildEraNeelam.zip", size: "26.66 MB" },
    manualBook: { url: "https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/Manual.Book.BuildEra.V0.1.pdf", label: "Manual.Book.BuildEra.V0.1.pdf" },
    excelTemplate: { url: "https://github.com/alyafi0899/BuildEra-Release/releases/download/v1.2.0/Format_import_Product_list_BuildEra.xlsx", label: "Format_import_Product_list_BuildEra.xlsx" }
  };

  const RELEASES = [
    {
      version: "Neelam-BuildEra v1.2.1",
      status: "custom",
      date: "2026",
      downloads: [
        { key: "neelamMsix", label: "Neelam MSIX Installer" },
        { key: "neelamZip", label: "Neelam Portable ZIP" }
      ]
    },
    {
      version: "v1.2.1",
      status: "latest",
      date: "2026",
      downloads: [
        { key: "msix", label: "Windows MSIX Installer" },
        { key: "zip", label: "Portable ZIP" },
        { key: "manualBook", label: "Manual Book" },
        { key: "excelTemplate", label: "Excel Import Template" }
      ]
    },
    {
      version: "v1.2.0",
      status: "old",
      date: "2026",
      downloads: [
        { key: "msix", label: "Windows MSIX Installer" },
        { key: "zip", label: "Portable ZIP" }
      ]
    }
  ];

  const triggerDownload = (key: string) => {
    const item = DOWNLOADS[key];
    if (!item) return;
    const a = document.createElement("a");
    a.href = item.url;
    a.download = item.label || "";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast(`Mengunduh ${item.label || key} …`, false);
  };

  const showToast = (msg: string, isWarning: boolean) => {
    setToast({ msg, isWarning });
    setTimeout(() => setToast(null), 3600);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const splashTimer = setTimeout(() => setSplashActive(false), 4600);

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.12 });

    const spyObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    const targets = document.querySelectorAll('.reveal');
    targets.forEach(t => revealObs.observe(t));

    const sections = ['beranda', 'fitur', 'screenshot', 'download', 'kontak'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) spyObs.observe(el);
    });

    return () => {
      clearTimeout(splashTimer);
      revealObs.disconnect();
      spyObs.disconnect();
    };
  }, []);

  const openLightbox = (index: number) => {
    setLbIndex(index);
    setLbOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLbOpen(false);
    document.body.style.overflow = "";
  };

  const lbStep = (dir: number) => {
    setLbIndex((prev) => (prev + dir + filteredShots.length) % filteredShots.length);
  };

  return (
    <>
      <style>{`
        :root{
          --bg-dark:#0a0c11;
          --bg-dark-soft:#11141b;
          --card-dark:#161a22;
          --card-dark-2:#1c212b;
          --border-dark:rgba(255,255,255,.09);
          --orange:#FF6A00;
          --orange-2:#ff8c3f;
          --orange-dark:#dd5800;
          --white:#ffffff;
          --ink:#0f1115;
          --gray-50:#f7f8fa;
          --gray-100:#eef0f3;
          --gray-200:#e3e6ec;
          --gray-500:#8a91a3;
          --gray-600:#5b6272;
          --gray-700:#333844;
          --muted-dark:#a6adbb;
          --radius:16px;
          --radius-sm:10px;
          --shadow:0 20px 45px -20px rgba(0,0,0,.5);
          --maxw:1200px;
          --ease:cubic-bezier(.22,.8,.28,1);
          --nav-h:76px;
        }

        .buildera-page {
          margin:0;
          font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
          background:var(--white);
          color:var(--ink);
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }

        .buildera-page img{max-width:100%;display:block;}
        .buildera-page a{color:inherit;text-decoration:none;}
        .buildera-page button{font:inherit;cursor:pointer;}
        .buildera-page .wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px;}

        /* ---------- SPLASH SCREEN ---------- */
        .be-splash{
          position:fixed; inset:0; z-index:9999; min-height:100vh;
          display:flex; flex-direction:column; align-items:center; justify-content:space-between;
          isolation:isolate; overflow:hidden; background:url("${background}") center/cover no-repeat #000; color:#fff;
        }
        .be-splash::before{
          content:""; position:absolute; inset:0; z-index:-2; background:url("${background}") center/cover no-repeat; transform:scale(1.02);
        }
        .be-splash::after{
          content:""; position:absolute; inset:0; z-index:-1;
          background:
            radial-gradient(circle at 50% 34%, rgba(255,106,0,.12) 0%, rgba(10,12,17,.5) 36%, rgba(0,0,0,.94) 82%),
            linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.72) 76%, #000 100%);
        }
        .be-splash-logo{
          width:clamp(150px,20vw,224px); height:auto; margin-bottom:24px;
          filter:drop-shadow(0 16px 32px rgba(0,0,0,.58)) drop-shadow(0 0 24px rgba(255,106,0,.52));
          opacity:0; transform:translateY(-18px) scale(.96);
          animation:beLogoRise .72s var(--ease) .16s forwards;
        }
        @keyframes beLogoRise{ to{opacity:1;transform:translateY(0) scale(1);} }
        .be-splash-title{
          margin:0 0 8px; font-size:clamp(40px,6vw,64px); line-height:1; font-weight:850; color:var(--orange);
          letter-spacing:0; text-shadow:0 10px 30px rgba(0,0,0,.55),0 0 28px rgba(255,106,0,.18);
          opacity:0; transform:translateY(16px); animation:beSplashTextIn .72s var(--ease) .32s forwards;
        }
        .be-splash-subtitle{
          margin:0; font-size:clamp(13px,1.8vw,16px); line-height:1.4; font-weight:650; color:#d7dae2;
          letter-spacing:.08em; text-transform:uppercase; opacity:0; transform:translateY(14px);
          animation:beSplashTextIn .72s var(--ease) .44s forwards;
        }
        @keyframes beSplashTextIn{ to{opacity:1;transform:translateY(0);} }
        .be-splash-progress{
          width:100%; height:4px; margin-bottom:34px; border-radius:999px; overflow:hidden;
          background:rgba(255,255,255,.14); box-shadow:inset 0 0 0 1px rgba(255,255,255,.08); opacity:0;
          animation:beSplashFadeIn .45s var(--ease) .64s forwards;
        }
        .be-splash-progress-fill{
          width:0; height:100%; border-radius:inherit;
          background:linear-gradient(90deg, var(--orange) 0%, var(--orange-2) 48%, #fff 100%);
          box-shadow:0 0 18px rgba(255,106,0,.42); animation:beSplashLoad 2.35s var(--ease) .86s forwards;
        }
        @keyframes beSplashLoad{ 0%{width:0;} 42%{width:58%;} 76%{width:86%;} 100%{width:100%;} }
        @keyframes beSplashFadeIn{ to{opacity:1;} }
        .be-splash-powered{
          display:flex; flex-direction:column; align-items:center; gap:10px; opacity:0;
          animation:beSplashFadeIn .72s var(--ease) .72s forwards;
        }
        .be-splash.exit{ animation:beSplashExit .82s var(--ease) 0s forwards; }
        @keyframes beSplashExit{
          0%{opacity:1;transform:scale(1);filter:brightness(1);}
          100%{opacity:0;transform:scale(1.08);filter:brightness(.18);visibility:hidden;}
        }

        /* ---------- REVEAL ---------- */
        .reveal{opacity:0;transform:translateY(22px);transition:opacity .7s var(--ease),transform .7s var(--ease);}
        .reveal.in-view{opacity:1;transform:translateY(0);}

        /* ---------- NAVBAR ---------- */
        header.nav{
          position:fixed;top:0;left:0;right:0;z-index:1000; height:var(--nav-h);
          background:rgba(10,12,17,.82); backdrop-filter:blur(14px) saturate(140%);
          border-bottom:1px solid rgba(255,255,255,.07); transition:background .3s var(--ease);
        }
        .nav-inner{ display:flex;align-items:center;justify-content:space-between;height:100%; }
        .brand{display:flex;align-items:center;gap:11px;color:var(--white);}
        .brand-logo{width:min(230px,42vw);max-height:58px;object-fit:contain;}
        nav.primary{display:flex;align-items:center;gap:6px;}
        nav.primary a{
          color:#c7cbd6;font-size:14.5px;font-weight:600;padding:10px 14px;border-radius:8px;
          position:relative;transition:color .2s var(--ease),background .2s var(--ease);
        }
        nav.primary a:hover{color:var(--white);background:rgba(255,255,255,.06);}
        nav.primary a.active{color:var(--white);}
        nav.primary a.active::after{
          content:"";position:absolute;left:14px;right:14px;bottom:4px;height:2px; background:var(--orange);border-radius:2px;
        }
        .ver-badge{
          display:flex;align-items:center;gap:6px;color:var(--muted-dark);font-size:12.5px;font-weight:600;
          background:rgba(255,255,255,.05);border:1px solid var(--border-dark);padding:6px 12px;border-radius:99px;
        }
        .ver-badge .dot{width:6px;height:6px;border-radius:50%;background:#3ddc84;box-shadow:0 0 0 3px rgba(61,220,132,.18);}
        .btn{
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          font-weight:700;font-size:14.5px;padding:12px 20px;border-radius:10px;border:none;
          transition:transform .18s var(--ease),box-shadow .18s var(--ease),background .18s var(--ease);
          white-space:nowrap;
        }
        .btn-primary{background:var(--orange);color:#fff;box-shadow:0 10px 24px -10px rgba(255,106,0,.65);}
        .btn-primary:hover{background:var(--orange-dark);transform:translateY(-2px);box-shadow:0 14px 28px -10px rgba(255,106,0,.75);}
        .btn-ghost-dark{background:rgba(255,255,255,.06);color:#fff;border:1px solid rgba(255,255,255,.14);}
        .btn-outline{background:transparent;color:var(--ink);border:1.5px solid var(--gray-200);}
        .btn-outline:hover{border-color:var(--orange);color:var(--orange);}

        .hamburger{
          display:none;width:42px;height:42px;border-radius:9px;border:1px solid var(--border-dark);
          background:rgba(255,255,255,.05);align-items:center;justify-content:center;color:#fff;
        }
        .mobile-nav{
          position:fixed;inset:var(--nav-h) 0 0 0;background:rgba(9,11,15,.98);backdrop-filter:blur(10px);
          z-index:999;display:flex;flex-direction:column;padding:26px 28px;gap:6px;
          transform:translateY(-8px);opacity:0;pointer-events:none;transition:opacity .22s var(--ease),transform .22s var(--ease);
        }
        .mobile-nav.open{opacity:1;transform:translateY(0);pointer-events:auto;}

        /* ---------- HERO ---------- */
        .hero{
          position:relative;
          background:
            linear-gradient(180deg, rgba(6,7,10,.12) 0%, rgba(6,7,10,.32) 55%, rgba(6,7,10,.78) 100%),
            url("${background}") center 38% / cover no-repeat,
            var(--bg-dark);
          padding:calc(var(--nav-h) + 64px) 0 72px;overflow:hidden;
        }
        .hero::before{
          content:"";position:absolute;inset:0;pointer-events:none;opacity:.35;
          background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
          background-size:46px 46px;mask-image:radial-gradient(700px 420px at 20% 20%,#000 0%,transparent 70%);
        }
        .hero-grid{ position:relative;z-index:1;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center; }
        .eyebrow{
          display:inline-flex;align-items:center;gap:8px;color:var(--orange-2);font-weight:700;font-size:13px;
          letter-spacing:.06em;text-transform:uppercase;background:rgba(255,106,0,.1);border:1px solid rgba(255,106,0,.25);
          padding:7px 14px;border-radius:99px;margin-bottom:22px;
        }
        .hero h1{ font-size:clamp(40px,5.4vw,64px);line-height:1.02;letter-spacing:-.03em;margin:0 0 6px;color:#fff;font-weight:800; }
        .hero .subtitle{font-size:clamp(19px,2.1vw,24px);color:#d7dae2;font-weight:600;margin:6px 0 18px;}
        .hero p.desc{font-size:16.5px;color:var(--muted-dark);line-height:1.65;max-width:520px;margin:0 0 30px;}
        .dl-cards{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:560px;margin-bottom:16px;}
        .dl-card{
          background:var(--card-dark);border:1px solid var(--border-dark);border-radius:var(--radius);padding:20px;
          transition:transform .2s var(--ease),border-color .2s var(--ease);
        }
        .dl-card:hover{transform:translateY(-3px);border-color:rgba(255,106,0,.35);}
        .dl-card .icon{
          width:44px;height:44px;border-radius:10px;background:rgba(255,106,0,.12);display:flex;align-items:center;
          justify-content:center;margin-bottom:12px;color:var(--orange);
        }
        .link-arrow{display:inline-flex;align-items:center;gap:7px;color:#e7e9ee;font-weight:700;font-size:14.5px;padding:6px 2px;border-bottom:1.5px solid rgba(255,255,255,.25);}
        .trust-line{display:flex;align-items:center;gap:10px;color:var(--gray-500);font-size:13px;margin-top:22px;}

        /* SYSREQ */
        .sysreq {
          position: relative; z-index: 1; background: rgba(20, 20, 20, 0.58); backdrop-filter: blur(18px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.28); border-radius: 18px; box-shadow: 0 25px 55px -25px rgba(0, 0, 0, 0.65);
          margin-top: 56px; padding: 20px 24px; display: flex; flex-wrap: wrap; gap: 24px; align-items: center;
        }
        .sysreq-item { flex: 1; min-width: 130px; padding: 0 22px; border-left: 1px solid rgba(255, 255, 255, 0.12); }
        .sysreq-item:first-child { border-left: none; }
        .sysreq-item b { display: block; margin-bottom: 5px; font-size: 10px; font-weight: 700; text-transform: uppercase; color: rgba(255, 255, 255, 0.55); }
        .sysreq-item span { display: block; font-size: 12px; font-weight: 600; color: rgba(255, 255, 255, 0.92); }

        /* ---------- FITUR ---------- */
        .fitur-layout{display:grid;grid-template-columns:280px 1fr;gap:36px;align-items:start;}
        .cat-nav{display:flex;flex-direction:column;gap:6px;position:sticky;top:calc(var(--nav-h) + 24px);}
        .cat-btn{
          display:flex;align-items:center;gap:12px;text-align:left;background:#fff;border:1.5px solid var(--gray-100);
          border-radius:12px;padding:13px 15px;color:var(--gray-700);font-weight:700;font-size:14px; transition:all .18s var(--ease);
        }
        .cat-btn .ic{width:34px;height:34px;border-radius:8px;background:var(--gray-100);display:flex;align-items:center;justify-content:center;color:var(--gray-600);flex-shrink:0;}
        .cat-btn.active{background:var(--ink);border-color:var(--ink);color:#fff;}
        .cat-btn.active .ic{background:var(--orange);color:#fff;}
        .feat-panel{background:#fff;border:1px solid var(--gray-100);border-radius:20px;padding:34px;min-height:420px;}
        .item-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;}
        .item-chip{
          display:flex;align-items:flex-start;gap:10px;background:var(--gray-50);border:1px solid var(--gray-100);
          border-radius:11px;padding:13px 14px; transition:transform .15s var(--ease);
        }
        .item-chip:hover{transform:translateY(-2px);border-color:rgba(255,106,0,.3);}

        /* ---------- SCREENSHOT ---------- */
        .filter-chip{
          background:#fff;border:1.5px solid var(--gray-100);color:var(--gray-700);font-weight:700;font-size:13px;
          padding:9px 16px;border-radius:99px;transition:all .18s var(--ease);
        }
        .filter-chip.active{background:var(--orange);border-color:var(--orange);color:#fff;}
        .shot-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:18px;}
        .shot-card{ border-radius:16px;overflow:hidden;border:1px solid var(--gray-100);background:#fff;cursor:pointer; transition:transform .2s var(--ease); }
        .shot-card:hover{transform:translateY(-4px);box-shadow:0 18px 34px -18px rgba(0,0,0,.28);}
        .shot-thumb{ aspect-ratio:16/10;position:relative; background:linear-gradient(155deg,#161a22,#0a0c11); }

        /* ---------- LIGHTBOX ---------- */
        .lightbox{
          position:fixed;inset:0;z-index:2000;background:rgba(6,7,10,.94);display:flex;align-items:center;justify-content:center;
          padding:36px; transition:opacity .25s var(--ease);
        }
        .lb-stage{position:relative;max-width:920px;width:100%;}
        .lb-frame{
          aspect-ratio:16/10;border-radius:16px;overflow:hidden;position:relative;
          background:linear-gradient(155deg,#161a22,#0a0c11); border:1px solid rgba(255,255,255,.12);
        }
        .lb-nav{
          position:absolute;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;
          background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;
          display:flex;align-items:center;justify-content:center; transition:background .18s var(--ease);
        }
        .lb-nav:hover{background:rgba(255,106,0,.5);}

        /* ---------- DOWNLOAD ---------- */
        .release-hero{
          background:linear-gradient(155deg,#161a22,#0a0c11);border-radius:22px;padding:44px;position:relative;overflow:hidden;
          border:1px solid var(--border-dark);margin-bottom:56px;
        }
        .release-hero.custom-rel{ background:linear-gradient(155deg,#1c212b,#11141b); border-color:rgba(255,106,0,.15); }
        .method-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;position:relative;z-index:1;margin-bottom:22px;}
        .method-card{background:rgba(255,255,255,.04);border:1px solid var(--border-dark);border-radius:16px;padding:24px;}
        .timeline{position:relative;max-width:760px;margin:0 auto;}
        .timeline::before{content:"";position:absolute;left:19px;top:8px;bottom:8px;width:2px;background:var(--gray-100);}
        .tl-item{position:relative;padding-left:56px;margin-bottom:26px;}
        .tl-dot{position:absolute;left:0;top:2px;width:40px;height:40px;border-radius:50%;background:#fff;border:2px solid var(--gray-100);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;color:var(--gray-600);}
        .tl-item.latest .tl-dot{background:var(--orange);border-color:var(--orange);color:#fff;}
        .tl-card{background:#fff;border:1px solid var(--gray-100);border-radius:14px;padding:18px 20px;}

        /* ---------- KONTAK ---------- */
        .kontak-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:20px;}
        .kontak-card{ background:#fff;border:1px solid var(--border-dark);border-radius:18px;padding:28px;display:flex;flex-direction:column;gap:14px; }
        .darksec{background:var(--bg-dark);}
        .darksec .kontak-card{background:var(--card-dark);border-color:var(--border-dark);}
        .manual-strip{
          grid-column:1/-1;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;
          background:linear-gradient(120deg,rgba(255,106,0,.14),rgba(255,106,0,.03));border:1px solid rgba(255,106,0,.25);
          border-radius:18px;padding:22px 26px;
        }

        /* toast */
        .toast{
          position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(20px);z-index:3000;
          background:var(--ink);color:#fff;padding:14px 20px;border-radius:11px;font-size:13.5px;font-weight:600;
          display:flex;align-items:center;gap:10px;box-shadow:0 18px 40px -14px rgba(0,0,0,.5);opacity:0;pointer-events:none;
          transition:all .25s var(--ease);
        }
        .toast.show{opacity:1;transform:translateX(-50%) translateY(0);}

        @media (max-width:1000px){ .hero-grid{grid-template-columns:1fr;} .fitur-layout{grid-template-columns:1fr;} }
        @media (max-width:820px){ nav.primary{display:none;} .hamburger{display:flex;} }
        @media (max-width:640px){ .method-grid{grid-template-columns:1fr;} }
      `}</style>

      <div className="buildera-page">
        {/* Splash */}
        {splashActive && (
          <div className={`be-splash ${!splashActive ? 'exit' : ''}`}>
            <div style={{ marginTop: '14vh', textAlign: 'center' }}>
              <img src={logo01} alt="BuildEra Logo" className="be-splash-logo" />
              <h1 className="be-splash-title">BuildEra</h1>
              <p className="be-splash-subtitle">Material & Construction POS</p>
            </div>
            <div style={{ width: 'min(76vw,340px)', marginBottom: '7vh' }}>
              <div className="be-splash-progress">
                <div className="be-splash-progress-fill"></div>
              </div>
              <div className="be-splash-powered">
                <span>Powered by Solutivo Labs</span>
                <img src={logo02} alt="" style={{ height: '34px' }} />
              </div>
            </div>
          </div>
        )}

        {/* Navbar */}
        <header className="nav">
          <div className="wrap nav-inner">
            <div className="brand">
              <button onClick={onBack} className="btn btn-ghost-dark btn-sm" style={{ marginRight: '20px' }}>← KEMBALI</button>
              <img src={logo02} alt="BuildEra logo" className="brand-logo" />
            </div>
            <nav className="primary">
              {['beranda', 'fitur', 'screenshot', 'download', 'kontak'].map(id => (
                <a key={id} href={`#${id}`} className={activeNav === id ? 'active' : ''} style={{ textTransform: 'capitalize' }}>
                  {id === 'beranda' ? 'Beranda' : id}
                </a>
              ))}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span className="ver-badge"><span className="dot"></span> v1.2.1</span>
              <a href="#download" className="btn btn-primary btn-sm">{ICONS.dl} Download</a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="hero" id="beranda">
          <div className="wrap">
            <div className="hero-grid">
              <div className="reveal in-view">
                <span className="eyebrow">{ICONS.dl} Versi Terbaru v1.2.1</span>
                <h1>Download <span style={{ color: COLORS.orange }}>BuildEra</span></h1>
                <p className="subtitle">Material & Construction POS</p>
                <p className="desc">Aplikasi kasir dan manajemen toko bahan bangunan yang cepat, mudah, dan lengkap.</p>
                <div className="dl-cards">
                  <div className="dl-card">
                    <div className="icon">{ICONS.box}</div>
                    <h3>Installer (MSIX)</h3>
                    <p>Direkomendasikan untuk sebagian besar pengguna Windows.</p>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => triggerDownload('msix')}>{ICONS.dl} Download MSIX</button>
                    <span style={{ display: 'block', textAlign: 'center', color: '#8a91a3', fontSize: '12px', marginTop: '10px' }}>55.65 MB</span>
                  </div>
                  <div className="dl-card">
                    <div className="icon">{ICONS.box}</div>
                    <h3>Portable ZIP</h3>
                    <p>Tidak memerlukan instalasi. Extract lalu jalankan BuildEra.exe.</p>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => triggerDownload('zip')}>{ICONS.dl} Download ZIP</button>
                    <span style={{ display: 'block', textAlign: 'center', color: '#8a91a3', fontSize: '12px', marginTop: '10px' }}>26.66 MB</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '6px' }}>
                  <a href="#fitur" className="link-arrow">Lihat Fitur <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px' }}><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg></a>
                </div>
                <div className="trust-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', color: '#3ddc84' }}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="M9 12l2 2 4-4"/></svg>
                  Aman & terverifikasi — file dicek sebelum dirilis.
                </div>
              </div>
            </div>
            <div className="sysreq reveal in-view">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '175px', fontWeight: 800, fontSize: '14px', color: '#fff' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.12)', color: COLORS.orange }}>{ICONS.monitor}</span>
                Persyaratan Sistem
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
                <div className="sysreq-item"><b>OS</b><span>Windows 10 / 11 (64-bit)</span></div>
                <div className="sysreq-item"><b>RAM</b><span>Minimal 4 GB</span></div>
                <div className="sysreq-item"><b>Storage</b><span>Minimal 1 GB</span></div>
                <div className="sysreq-item"><b>Internet</b><span>Aktivasi & Sinkronisasi</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Fitur */}
        <section style={{ padding: '96px 0', background: '#fff' }} id="fitur">
          <div className="wrap">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }} className="reveal">
              <span className="eyebrow" style={{ background: 'rgba(255,106,0,.08)', color: COLORS.orangeDark }}>Fitur Lengkap</span>
              <h2 style={{ fontSize: '36px', fontWeight: 800, margin: '14px 0' }}>Semua yang toko bangunan <span style={{ color: COLORS.orange }}>butuhkan</span></h2>
              <p style={{ color: '#5b6272' }}>Dari kasir harian hingga analitik profit — dikelompokkan berdasarkan alur kerja nyata.</p>
            </div>
            <div className="fitur-layout reveal">
              <div className="cat-nav">
                {Object.entries(FEATURES).map(([key, cat]) => (
                  <button key={key} className={`cat-btn ${activeFeat === key ? 'active' : ''}`} onClick={() => setActiveFeat(key)}>
                    <span className="ic">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
              <div className="feat-panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,106,0,.1)', color: COLORS.orange, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '24px' }}>{FEATURES[activeFeat as keyof typeof FEATURES].icon}</div>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '21px', fontWeight: 800 }}>{FEATURES[activeFeat as keyof typeof FEATURES].label}</h3>
                    <p style={{ margin: '2px 0 0', color: '#5b6272', fontSize: '13.5px' }}>{FEATURES[activeFeat as keyof typeof FEATURES].desc}</p>
                  </div>
                </div>
                <div className="item-grid">
                  {FEATURES[activeFeat as keyof typeof FEATURES].items.map(it => (
                    <div key={typeof it === 'string' ? it : it.t} className="item-chip">
                      <div className="dot">{ICONS.check}</div>
                      <div style={{ fontSize: '13.8px' }}>
                        <b>{typeof it === 'string' ? it : it.t}</b>
                        {typeof it !== 'string' && it.d && <span style={{ display: 'block', fontSize: '12.3px', color: '#5b6272', marginTop: '3px' }}>{it.d}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshot */}
        <section style={{ padding: '96px 0', background: '#f7f8fa' }} id="screenshot">
          <div className="wrap">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }} className="reveal">
              <span className="eyebrow">Tampilan Aplikasi</span>
              <h2 style={{ fontSize: '36px', fontWeight: 800 }}>Lihat <span style={{ color: COLORS.orange }}>BuildEra</span> beraksi</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '9px', marginBottom: '36px', flexWrap: 'wrap' }} className="reveal">
              {shotCategories.map(c => (
                <button key={c} className={`filter-chip ${activeShotFilter === c ? 'active' : ''}`} onClick={() => setActiveShotFilter(c)}>{c}</button>
              ))}
            </div>
            <div className="shot-grid reveal">
              {filteredShots.map((s, i) => (
                <div key={s.title} className="shot-card" onClick={() => openLightbox(i)}>
                  <div className="shot-thumb"><img src={s.src} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <div style={{ padding: '14px 16px' }}><b style={{ fontSize: '14px' }}>{s.title}</b><span style={{ fontSize: '12px', color: '#8a91a3', display: 'block' }}>{s.category}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section style={{ padding: '96px 0', background: COLORS.bgDark }} id="download">
          <div className="wrap">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }} className="reveal">
              <span className="eyebrow" style={{ background: 'rgba(255,106,0,.12)', color: COLORS.orange2 }}>Download</span>
              <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: 800 }}>Dapatkan <span style={{ color: COLORS.orange }}>BuildEra</span> sekarang</h2>
            </div>
            <div className="release-hero reveal">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: COLORS.orange, color: '#fff', fontSize: '11.5px', fontWeight: 800, padding: '5px 12px', borderRadius: '99px', textTransform: 'uppercase' }}>Latest Release</span>
                  <h3 style={{ color: '#fff', fontSize: '26px', margin: 0 }}>BuildEra v1.2.1</h3>
                </div>
                <span style={{ color: '#8a91a3', fontWeight: 600 }}>Dirilis 2026</span>
              </div>
              <div className="method-grid">
                <div className="method-card">
                  <div style={{ width: '48px', height: '48px', borderRadius: '11px', background: 'rgba(255,106,0,.14)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>{ICONS.box}</div>
                  <h4 style={{ color: '#fff', fontSize: '16.5px', fontWeight: 800 }}>Windows Installer (MSIX)</h4>
                  <p style={{ color: '#a6adbb', fontSize: '13.5px', marginBottom: '18px' }}>Installer Windows untuk pemasangan BuildEra secara langsung.</p>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => triggerDownload('msix')}>{ICONS.dl} Download MSIX</button>
                </div>
                <div className="method-card">
                  <div style={{ width: '48px', height: '48px', borderRadius: '11px', background: 'rgba(255,106,0,.14)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>{ICONS.truck}</div>
                  <h4 style={{ color: '#fff', fontSize: '16.5px', fontWeight: 800 }}>Portable ZIP</h4>
                  <p style={{ color: '#a6adbb', fontSize: '13.5px', marginBottom: '18px' }}>Tidak memerlukan proses instalasi. Extract file ZIP lalu jalankan BuildEra.exe.</p>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => triggerDownload('zip')}>{ICONS.dl} Download ZIP</button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button className="btn" style={{ flex: 1, minWidth: '230px', background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.09)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }} onClick={() => triggerDownload('manualBook')}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.orange2 }}>{ICONS.file}</div>
                  <div><b style={{ display: 'block', fontSize: '14px' }}>Manual Book</b><span style={{ fontSize: '11.5px', color: '#8a91a3' }}>Panduan lengkap penggunaan (PDF)</span></div>
                </button>
                <button className="btn" style={{ flex: 1, minWidth: '230px', background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.09)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }} onClick={() => triggerDownload('excelTemplate')}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.orange2 }}>{ICONS.excel}</div>
                  <div><b style={{ display: 'block', fontSize: '14px' }}>Template Import Excel</b><span style={{ fontSize: '11.5px', color: '#8a91a3' }}>Format import data produk</span></div>
                </button>
              </div>
            </div>

            <div className="release-hero custom-rel reveal">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: '#5b6272', color: '#fff', fontSize: '11.5px', fontWeight: 800, padding: '5px 12px', borderRadius: '99px', textTransform: 'uppercase' }}>Custom Release</span>
                  <h3 style={{ color: '#fff', fontSize: '26px', margin: 0 }}>Neelam-BuildEra v1.2.1</h3>
                </div>
                <span style={{ color: '#8a91a3', fontWeight: 600 }}>Dirilis 2026</span>
              </div>
              <p style={{ color: '#a6adbb', fontSize: '14px', marginTop: '-16px', marginBottom: '24px' }}>Versi khusus untuk kebutuhan kustomisasi perusahaan Neelam.</p>
              <div className="method-grid">
                <button className="btn btn-primary" onClick={() => triggerDownload('neelamMsix')}>{ICONS.dl} Download Neelam MSIX</button>
                <button className="btn btn-primary" onClick={() => triggerDownload('neelamZip')}>{ICONS.dl} Download Neelam ZIP</button>
              </div>
            </div>

            <h3 style={{ color: '#fff', textAlign: 'center', margin: '56px 0 32px' }}>Riwayat Rilis</h3>
            <div className="timeline reveal">
              {RELEASES.map(rel => (
                <div key={rel.version} className={`tl-item ${rel.status === 'latest' ? 'latest' : ''}`}>
                  <div className="tl-dot">{rel.status === 'latest' ? '✓' : '•'}</div>
                  <div className="tl-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <b>{rel.version}</b>
                      {rel.status === 'latest' && <span style={{ background: COLORS.ink, color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '99px' }}>Latest</span>}
                      <span style={{ color: '#8a91a3', fontSize: '12.5px' }}>Rilis {rel.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {rel.downloads.map(d => (
                        <button key={d.key} className="btn btn-outline btn-sm" onClick={() => triggerDownload(d.key)}>{ICONS.dl} {d.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help */}
        <section style={{ padding: '96px 0' }} className="darksec" id="kontak">
          <div className="wrap">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }} className="reveal">
              <span className="eyebrow" style={{ background: 'rgba(255,106,0,.12)', color: COLORS.orange2 }}>Kami Siap Membantu</span>
              <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: 800 }}>Kontak & <span style={{ color: COLORS.orange }}>Bantuan</span></h2>
            </div>
            <div className="kontak-grid reveal">
              <div className="kontak-card">
                <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: 'rgba(255,106,0,.13)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px' }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
                </div>
                <h4 style={{ color: '#fff', fontSize: '17px', margin: 0 }}>Email</h4>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', margin: 0 }}>solutivolabs@gmail.com</p>
                <a href="mailto:solutivolabs@gmail.com" className="btn btn-primary" style={{ width: 'fit-content' }}>Email Us</a>
              </div>
              <div className="kontak-card">
                <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: 'rgba(255,106,0,.13)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px' }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                </div>
                <h4 style={{ color: '#fff', fontSize: '17px', margin: 0 }}>WhatsApp (Chat Only)</h4>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', margin: 0 }}>+971 58 251 7092</p>
                <a href="https://wa.me/971582517092" className="btn btn-primary" style={{ width: 'fit-content', background: '#25D366' }}>Chat WhatsApp</a>
              </div>
              <div className="manual-strip">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: 'rgba(255,106,0,.2)', color: COLORS.orange2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ICONS.file}</div>
                  <div><h4 style={{ color: '#fff', margin: '0 0 3px' }}>Manual Book BuildEra</h4><p style={{ color: '#a6adbb', fontSize: '13px', margin: 0 }}>Panduan lengkap seluruh fitur.</p></div>
                </div>
                <button className="btn btn-outline" style={{ color: '#fff' }} onClick={() => triggerDownload('manualBook')}>{ICONS.dl} Download Manual</button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="darksec" style={{ padding: '34px 0', borderTop: '1px solid rgba(255,255,255,0.09)' }}>
          <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <img src={logo02} alt="logo" style={{ height: '34px' }} />
            <span style={{ color: '#8a91a3', fontSize: '13px' }}>© 2026 Solutivo Labs Indonesia. All rights reserved.</span>
          </div>
        </footer>

        {/* Lightbox */}
        {lbOpen && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lb-stage" onClick={e => e.stopPropagation()}>
              <div className="lb-frame">
                <img src={filteredShots[lbIndex].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <button className="lb-nav" style={{ left: '-64px' }} onClick={() => lbStep(-1)}>←</button>
              <button className="lb-nav" style={{ right: '-64px' }} onClick={() => lbStep(1)}>→</button>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginTop: '16px' }}>
                <b>{filteredShots[lbIndex].title}</b>
                <span>{lbIndex + 1} / {filteredShots.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        <div className={`toast ${toast ? 'show' : ''}`}>
          <span>{toast?.msg}</span>
        </div>
      </div>
    </>
  );
}
