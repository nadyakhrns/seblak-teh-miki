# 🌶️ Seblak Prasmanan Teh Devi - Official Landing Page

Landing page modern, responsif, dan siap dipublikasikan (Live) untuk **Seblak Prasmanan Teh Devi** dengan bumbu kencur medok otentik dan konsep prasmanan 50+ varian topping.

---

## ✨ Fitur Utama yang Telah Diimplementasikan

1. **Desain Modern & Bebas Elemen Figma:**
   - Dibuat menggunakan HTML5 semantik, Tailwind CSS, dan JavaScript murni.
   - Mengusung palet warna selera kuliner: Merah Cabai (`#dc2626`), Putih Bersih, dan Oranye Hangat (`#ea580c`).
   - Seluruh toolbar, grid canvas, dan mock artboard Figma telah dihilangkan dan diubah menjadi tampilan website responsif sesungguhnya.

2. **Katalog Topping Prasmanan Interaktif:**
   - Filter kategori topping (Semua, Aneka Kerupuk & Cuanki, Dumpling & Bakso, Ceker & Daging, Sayuran).
   - Tombol penambahan topping `+ Ambil Topping` dengan kontrol kuantitas `[-] [jumlah] [+]` porsi.
   - Pilihan Level Pedas interaktif (Level 0 Gurih s/d Level 5 Mercon Ekstrem).
   - Tombol rekomendasi **🔥 Racikan Juara (1-Klik)** yang otomatis memilihkan kombinasi topping terfavorit.

3. **Kalkulator Harga Otomatis & Promo Real-time:**
   - Perhitungan total biaya otomatis secara real-time.
   - Tracker Promo: **Gratis Es Teh Manis Jumbo** otomatis terbuka ketika pelanggan memilih minimal 4 topping dengan progress bar dinamis.
   - Floating Cart Bar yang muncul otomatis di bagian bawah layar saat ada topping terpilih.

4. **Formulir Pemesanan & Integrasi WhatsApp:**
   - Formulir pesanan lengkap: Nama Pemesan, Nomor WhatsApp, Tipe Pesanan (Dine-in / Takeaway / Delivery), Level Pedas, dan Catatan Khusus.
   - Validasi formulir (wajib mengisi nama, nomor telepon yang valid, dan minimal 1 topping).
   - Tombol **Kirim Pesanan via WhatsApp** yang otomatis memformat rincian pesanan dengan rapi dan mengarahkan ke link `wa.me`.

5. **Komponen Lengkap Sesuai Wireframe:**
   - **Hero Section:** Headline kuat, subjudul, checklist keunggulan, CTA ganda, rating 4.9/5 (1.400+ ulasan), dan 10.000+ porsi terjual.
   - **Keunggulan Utama:** 3 pilar keunggulan (Prasmanan 50+ topping, Bumbu Kencur Asli & Cabai Segar, Higienis & Ber-AC).
   - **Social Proof / Ulasan:** 3 testimoni pelanggan asli dari wireframe (Rina Novianti, Dwiki Fauzi, Sarah Anggraini).
   - **FAQ Akordeon Interaktif:** Jawaban lengkap mengenai pesan antar online, minimal pembelian, dan kuah anak-anak.
   - **Footer Komprehensif:** Jam operasional (10:00 - 22:00 WIB), alamat outlet Jl. Raya Utama No. 88, metode pembayaran (QRIS, GoPay, OVO, ShopeePay, Tunai), dan tautan Google Maps.

---

## 🛠️ Konfigurasi Bisnis (WhatsApp & Alamat)

Anda dapat mengubah nomor WhatsApp dan data bisnis pada file [`js/config.js`](file:///c:/Users/nadia/OneDrive/Dokumen/Semester%207/Digital%20Marketing/seblak-teh-devi/js/config.js):

```javascript
const CONFIG = {
  // Ganti dengan nomor WhatsApp aktif admin (gunakan awalan 62 tanpa tanda +)
  businessWhatsApp: "6281234567890",
  
  businessName: "Seblak Prasmanan Teh Devi",
  tagline: "Bebas Pilih Topping • Bumbu Kencur Medok Juara",
  
  operationalHours: "Senin - Minggu: 10:00 - 22:00 WIB",
  outletAddress: "Jl. Raya Utama No. 88 (Dekat Alun-alun Kota), Sebelah Minimarket",
  // ...
};
```

> **Tips:** Anda juga dapat mengklik tombol **⚙️ Ganti No. Admin WA (Uji Coba)** di bagian bawah formulir pemesanan langsung dari browser untuk mencoba mengirim pesanan ke nomor Anda sendiri saat pengujian.

---

## 🚀 Cara Menjalankan Website Secara Lokal

### Opsi 1: Menggunakan Node.js / npx `serve`
Jalankan perintah berikut di terminal:
```bash
npx -y serve .
```
Lalu buka browser di `http://localhost:3000`.

### Opsi 2: Menggunakan Python
```bash
python -m http.server 8080
```
Lalu buka browser di `http://localhost:8080`.

### Opsi 3: Buka Langsung File HTML
Cukup klik dua kali (double-click) file [`index.html`](file:///c:/Users/nadia/OneDrive/Dokumen/Semester%207/Digital%20Marketing/seblak-teh-devi/index.html) untuk langsung membukanya di browser favorit Anda.

---

## 🌐 Cara Publikasi Online (Live Deployment)

Website ini adalah website statis (HTML/CSS/JS) murni sehingga sangat cepat, aman, dan dapat dihosting secara gratis di berbagai platform:

### 1. Netlify (Sangat Mudah & Rekomendasi)
1. Buka [Netlify Drop](https://app.netlify.com/drop).
2. Tarik (*drag and drop*) seluruh folder `seblak-teh-devi` ke halaman tersebut.
3. Website Anda langsung **Live** dalam hitungan detik dengan domain `https://[nama-anda].netlify.app`.

### 2. Vercel
1. Install Vercel CLI jika belum ada: `npm i -g vercel`.
2. Di dalam folder `seblak-teh-devi`, jalankan perintah:
   ```bash
   vercel
   ```
3. Ikuti petunjuk di terminal untuk langsung mempublikasikannya.

### 3. GitHub Pages
1. Inisialisasi repository git:
   ```bash
   git init
   git add .
   git commit -m "Initial release Seblak Prasmanan Teh Devi"
   ```
2. Hubungkan ke repository GitHub Anda dan aktifkan GitHub Pages pada tab **Settings > Pages** (pilih branch `main` root `/`).
