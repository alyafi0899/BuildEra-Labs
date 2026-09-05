PROMPT — BuildEra Download Page Redesign (Anduril-Inspired)

Rebuild the BuildEra "Download" landing page as a single-page, cinematic, monochrome-technical experience inspired by Anduril's website — dark, precise, engineered, zero fluff. This is a product-download page, not a marketing brochure. Every section should feel like a spec sheet crossed with a film still.

1. Art Direction & System

Background: near-black 
#0a0a0c throughout. No light sections except the system-requirements strip (keep that one light/white for contrast, like a spec label on hardware).
Palette: grayscale UI (
#0a0a0c, 
#16181c, 
#e7e9ee, 
#8a8f98) + BuildEra orange 
#FF6A00 as the only accent — reserved for CTAs, active nav state, hover underlines, and key stat numbers.
Typography: oversized tight-tracking display headlines, uppercase eyebrow labels with wide letter-spacing (+0.08em), monospace font for all technical data (file sizes, OS versions, keyboard shortcuts, formulas).
Add a subtle film-grain/noise overlay (low opacity, fixed position) across the whole page for the cinematic feel.
Use the existing hazard-stripe motif as section dividers instead of plain lines.
Full-bleed imagery — no boxed illustration cards. The construction-mascot artwork becomes a full-viewport hero background, not a contained panel.

2. Header / Nav

Fixed, transparent-to-solid on scroll (blur backdrop after 40px scroll).
Logo left, nav center: Beranda · Fitur · Screenshots · Download · Kontak · Bantuan.
Right: version badge "v1.2.0 — Available Now" (small dot indicator, green) + "Hubungi Kami" button (orange, links to WhatsApp — see contact block below).

3. Hero Section

Full-viewport height, mascot artwork as cover-fit background image with a bottom-to-transparent dark gradient overlay for text legibility.
Left-aligned text block:
Eyebrow: "Versi Terbaru v1.2.0"
Headline: "Download BuildEra" (BuildEra in orange)
Subhead: "Material & Construction POS"
Body: "Aplikasi kasir dan manajemen toko bahan bangunan yang cepat, mudah, dan lengkap."
Two download buttons, minimal outlined style (icon + label + filesize inline, not card blocks):
Download MSIX — Installer, recommended for most Windows users — ~78 MB
Download ZIP — Portable, no install required, extract & run BuildEra.exe — ~92 MB
Remove the old dark "sign-panel" content block entirely (no logo, no paragraph, no stat row inside it). Replace with a single small floating badge, bottom-left of the hero image: "✓ Aman & Terverifikasi — file dicek sebelum dirilis."
Scroll-cue arrow, bottom-center, subtle bounce-free fade animation.

4. Interactive Feature Explanation Section — "Semua yang Toko Bahan Bangunan Butuhkan"
Build this as a vertical, click-to-expand list (not grid cards) using the real 9 modules already in the product:

Kasir & Transaksi — "Alur transaksi cepat di meja kasir." Expanded view reveals the full keyboard shortcut table (Esc = kembali ke pencarian produk, F1 = quantity, F2 = override harga, F3 = diskon produk, F5 = pelanggan, F6 = diskon transaksi, Right Shift = pembayaran/checkout).
Manajemen Produk — "Kelola katalog, stok, dan harga." Expanded view shows the two profit-calculation modes side by side: Mode Otomatis (input harga total supplier + ongkir + qty → modal & profit dihitung otomatis, formula: Modal/produk = (Total Harga Supplier / QTY) + (Total Ongkir / QTY)) vs Mode Manual (modal & harga jual diinput langsung, profit dihitung otomatis).
Supplier & Ekspedisi — "Data mitra pengadaan & pengiriman." Note: riwayat pembayaran supplier dan ekspedisi dikelola terpisah agar tagihan barang dan pengiriman tidak tercampur.
Pelanggan & Piutang — "Data pelanggan dan pelacakan piutang." Covers saldo piutang, detail piutang, pembayaran cicilan, riwayat pembayaran.
Analitik — "Insight performa toko secara real-time." Laba bersih, total omzet, estimasi laba stok, rekomendasi re-stock, dana cadangan, take-home profit, tren keuntungan, produk terlaris, log transaksi harian. → give this row a small animated/simulated live counter (e.g. omzet ticking up) since it's the most "data" feature.
Label Barcode — "Cetak label barcode sesuai kebutuhan toko." Konfigurasi ukuran label, tinggi barcode, jarak antar label, jumlah kolom, konfigurasi printer, print langsung / export PDF.
Tagihan — "Pantau status pengadaan dan pembayaran." Total pengadaan, total terbayar, sisa tagihan, status (belum lunas/dicicil/lunas).
Pengaturan — "Konfigurasi toko sesuai kebutuhan." Info bisnis, printer & struk, QRIS, PIN keamanan, backup data, dual display, rekening bank.
Akun & Keamanan — "Akses aman untuk pemilik & staf toko." Login, Sign Up, Verifikasi Email, Lupa Password (via email + nomor HP terdaftar), PIN Keamanan (khusus Owner — melindungi data modal & profit), Lupa PIN (reset via Settings setelah autentikasi ulang).

Interaction spec:

Each row = large index number (01–09, monospace) + module name + one-line description, collapsed by default.
Click/tap expands the row using grid-template-rows height animation (smooth, no layout jank) to reveal the feature-item list + any extra detail block (shortcuts table, formula box, notes).
On scroll into view: index number and title fade + slide up, staggered per row (GSAP ScrollTrigger).
Hover: subtle orange-tinted background wash on the row, 0.15s linear — mechanical, not soft/bouncy.
Only one row expanded at a time (accordion behavior).

5. Download Comparison
Replace the two download cards with a real spec-sheet comparison table:

	MSIX Installer	Portable ZIP
Metode	Instalasi standar Windows	Extract & run
Perlu hak admin	Ya	Tidak
Auto-update	Ya	Tidak
Ukuran	~78 MB	~92 MB

6. System Requirements
Keep this as the one light/white section — restyle as a thin horizontal monospace spec strip (dot-separated, like a hardware label), not a rounded card:
OS: Windows 10/11 (64-bit) · Processor: Intel/AMD 64-bit · RAM: Min 4 GB · Storage: Min 1 GB · Internet: Diperlukan untuk aktivasi & sinkronisasi

7. Contact / Footer

"Butuh Bantuan?" block:
Email: SolutivoLabs@gmail.com (mailto: link)
WhatsApp Only: +971 58 251 7092 (wa.me/971582517092 link, opens WhatsApp chat directly)
Footer bar: "© 2024 Solutivo Labs Indonesia. All rights reserved." · Kebijakan Privasi · Syarat & Ketentuan

8. Motion Rules

All sections reveal on scroll: opacity + 12–20px translateY, staggered children, power2.out/expo.out easing — no elastic/bounce.
Hover states instant and mechanical (0.15s).
Respect prefers-reduced-motion (disable all scroll reveals, show content immediately) — already partially handled in the existing splash-screen code, keep that pattern.

9. Technical Constraints

Single self-contained .html file — inline CSS/JS, base64-embedded images (mascot artwork + logos), no external asset hosting.
Load GSAP + ScrollTrigger via CDN only.
Preserve the existing MSIX/ZIP download button click handlers and file-size data attributes — don't break the download logic.
Keep the Fitur/Screenshots sections' existing JS-driven data structures (FEATURES, SHOT_CATEGORIES) — just restyle their rendering to match the new interactive-row design instead of the current grid/sidebar layout.