/**
 * SEBLAK PRASMANAN TEH DEVI - KONFIGURASI BISNIS & KATALOG
 * ========================================================
 * Anda dapat menyesuaikan nomor WhatsApp, alamat, dan data topping di file ini.
 */

const CONFIG = {
  // Nomor WhatsApp Bisnis (Gunakan format kode negara tanpa '+', contoh: '6281234567890')
  // Silakan ganti placeholder ini dengan nomor WhatsApp asli pemilik/admin
  businessWhatsApp: "6281234567890",
  
  businessName: "Seblak Prasmanan Teh Devi",
  tagline: "Bebas Pilih Topping • Bumbu Kencur Medok Juara",
  instagram: "@seblaktehdevi",
  
  operationalHours: "Senin - Minggu: 10:00 - 22:00 WIB",
  outletAddress: "Jl. Raya Utama No. 88 (Dekat Alun-alun Kota), Sebelah Minimarket",
  mapsUrl: "https://maps.google.com/?q=Seblak+Prasmanan+Teh+Devi",
  
  // Promo Spesial Hari Ini
  promo: {
    title: "Promo Hari Ini",
    desc: "Gratis Es Teh Manis Jumbo untuk 50 Pembeli Pertama! (Minimal pesan 4 topping)",
    minToppingForGift: 4,
    freeItemName: "Es Teh Manis Jumbo (Gratis Promo)"
  },

  // Base Kuah & Biaya Masak
  baseBroth: {
    name: "Kuah Rempah Kencur Juara",
    price: 0 // Bebas Biaya Masak Kuah!
  },

  // Level Kepedasan Otentik
  spicyLevels: [
    { level: 0, name: "Lv 0 - Gurih Manis", desc: "Kuah gurih rempah kencur tanpa cabai (Cocok untuk anak/ramah lambung)", emoji: "🥣", badgeColor: "bg-slate-100 text-slate-700" },
    { level: 1, name: "Lv 1 - Pedas Manja", desc: "Sentuhan sedikit cabai rawit segar, hangat di lidah", emoji: "🌶️", badgeColor: "bg-amber-100 text-amber-800" },
    { level: 2, name: "Lv 2 - Pedas Nagih", desc: "Favorit pelanggan! Kombinasi pas pedas nampol & gurih kencur medok", emoji: "🔥", badgeColor: "bg-orange-100 text-orange-800", isPopular: true },
    { level: 3, name: "Lv 3 - Pedas Nendang", desc: "Cabai rawit melimpah, kuah merah kental menggugah selera", emoji: "💥", badgeColor: "bg-red-100 text-red-800" },
    { level: 4, name: "Lv 4 - Pedas Juara", desc: "Keringat bercucuran, sensasi rempah pedas membakar lidah", emoji: "🔥🔥", badgeColor: "bg-rose-200 text-rose-900" },
    { level: 5, name: "Lv 5 - Mercon Ekstrem", desc: "Cabai rawit domba full power! Khusus pecinta pedas level dewa", emoji: "☠️", badgeColor: "bg-rose-600 text-white" }
  ],

  // Katalog Topping Lengkap (Sesuai Wireframe + Variasi Prasmanan Populer)
  toppings: [
    {
      id: "dumpling-keju",
      name: "Dumpling Keju",
      category: "frozen",
      price: 2500,
      description: "Kulit lembut kenyal dengan lelehan keju creamy gurih saat digigit.",
      image: "dumplingkeju.png",
      badge: "Best Seller ⭐",
      isPopular: true
    },
    {
      id: "cuanki-lidah",
      name: "Cuanki Lidah Garut",
      category: "kerupuk",
      price: 1500,
      description: "Gurih renyah menyerap kuah pedas kencur secara maksimal.",
      image: "cuankilidahgarut.png",
      badge: "Wajib Coba",
      isPopular: true
    },
    {
      id: "kerupuk-mawar",
      name: "Kerupuk Mawar Putih",
      category: "kerupuk",
      price: 1000,
      description: "Topping klasik wajib seblak basah kenyal lembut bumbu meresap.",
      image: "kerupukmawarputih.png",
      badge: "Klasik Sunda"
    },
    {
      id: "jamur-enoki",
      name: "Jamur Enoki Segar",
      category: "sayur",
      price: 3000,
      description: "Tekstur crunchy segar saat dimasak dengan kuah seblak panas.",
      image: "jamurenokisegar.png",
      badge: "Segar & Crunchy"
    },
    {
      id: "sosis-sapi",
      name: "Sosis Sapi Premium",
      category: "daging",
      price: 2500,
      description: "Potongan sosis daging sapi asli gurih padat mengenyangkan.",
      image: "sosissapipremium.png",
      badge: "Daging Asli"
    },
    {
      id: "bakso-aci",
      name: "Bakso Aci Isi Tetelan",
      category: "frozen",
      price: 2000,
      description: "Kenyal lembut khas Garut berisi gurih tetelan daging cincang.",
      image: "baksoaciisitetelan.png",
      badge: "Favorit Gurih"
    },
    {
      id: "ceker-ayam",
      name: "Ceker Ayam Presto",
      category: "daging",
      price: 2500,
      description: "Dipresto berjam-jam sampai tulang lunak dan daging lepas lumer.",
      image: "cekerayampresto.png",
      badge: "Super Empuk 🔥",
      isPopular: true
    },
    {
      id: "telur-puyuh",
      name: "Telur Puyuh (Isi 3)",
      category: "daging",
      price: 3000,
      description: "Telur puyuh rebus gurih penyeimbang sensasi pedas kuah seblak.",
      image: "telurpuyuh.png",
      badge: "Isi 3 Butir"
    },
    {
      id: "cuanki-tahu",
      name: "Cuanki Tahu Goreng",
      category: "kerupuk",
      price: 1500,
      description: "Tahu kering renyah khas Bandung yang kenyal gurih saat berpadu kuah.",
      image: "cuankitahugoreng.png",
      badge: "Renyah"
    },
    {
      id: "mie-kuning",
      name: "Mie Kuning / Keriting",
      category: "kerupuk",
      price: 2000,
      description: "Mie kenyal legit yang sangat nikmat menyerap kuah bumbu kencur.",
      image: "miekuning.png",
      badge: "Porsi Kenyang"
    },
    {
      id: "sayur-sawi",
      name: "Sayur Sawi Hijau & Kol",
      category: "sayur",
      price: 1500,
      description: "Sayuran segar pilihan dicuci higienis, penyeimbang serat dan kesegaran.",
      image: "sayursawihijau.png",
      badge: "Segar Higienis"
    },
    {
      id: "telur-ayam",
      name: "Telur Ayam Ceplok / Orak-arik",
      category: "daging",
      price: 3500,
      description: "Telur ayam segar dimasak orak-arik langsung ke dalam kuah kental gurih.",
      image: "telurayam.png",
      badge: "Kuah Makin Kental"
    }
  ]
};
