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
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80",
      badge: "Best Seller ⭐",
      isPopular: true
    },
    {
      id: "cuanki-lidah",
      name: "Cuanki Lidah Garut",
      category: "kerupuk",
      price: 1500,
      description: "Gurih renyah menyerap kuah pedas kencur secara maksimal.",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
      badge: "Wajib Coba",
      isPopular: true
    },
    {
      id: "kerupuk-mawar",
      name: "Kerupuk Mawar Putih",
      category: "kerupuk",
      price: 1000,
      description: "Topping klasik wajib seblak basah kenyal lembut bumbu meresap.",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
      badge: "Klasik Sunda"
    },
    {
      id: "jamur-enoki",
      name: "Jamur Enoki Segar",
      category: "sayur",
      price: 3000,
      description: "Tekstur crunchy segar saat dimasak dengan kuah seblak panas.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      badge: "Segar & Crunchy"
    },
    {
      id: "sosis-sapi",
      name: "Sosis Sapi Premium",
      category: "daging",
      price: 2500,
      description: "Potongan sosis daging sapi asli gurih padat mengenyangkan.",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
      badge: "Daging Asli"
    },
    {
      id: "bakso-aci",
      name: "Bakso Aci Isi Tetelan",
      category: "frozen",
      price: 2000,
      description: "Kenyal lembut khas Garut berisi gurih tetelan daging cincang.",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80",
      badge: "Favorit Gurih"
    },
    {
      id: "ceker-ayam",
      name: "Ceker Ayam Presto",
      category: "daging",
      price: 2500,
      description: "Dipresto berjam-jam sampai tulang lunak dan daging lepas lumer.",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
      badge: "Super Empuk 🔥",
      isPopular: true
    },
    {
      id: "telur-puyuh",
      name: "Telur Puyuh (Isi 3)",
      category: "daging",
      price: 3000,
      description: "Telur puyuh rebus gurih penyeimbang sensasi pedas kuah seblak.",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
      badge: "Isi 3 Butir"
    },
    {
      id: "cuanki-tahu",
      name: "Cuanki Tahu Goreng",
      category: "kerupuk",
      price: 1500,
      description: "Tahu kering renyah khas Bandung yang kenyal gurih saat berpadu kuah.",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
      badge: "Renyah"
    },
    {
      id: "mie-kuning",
      name: "Mie Kuning / Keriting",
      category: "kerupuk",
      price: 2000,
      description: "Mie kenyal legit yang sangat nikmat menyerap kuah bumbu kencur.",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
      badge: "Porsi Kenyang"
    },
    {
      id: "sayur-sawi",
      name: "Sayur Sawi Hijau & Kol",
      category: "sayur",
      price: 1500,
      description: "Sayuran segar pilihan dicuci higienis, penyeimbang serat dan kesegaran.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      badge: "Segar Higienis"
    },
    {
      id: "telur-ayam",
      name: "Telur Ayam Ceplok / Orak-arik",
      category: "daging",
      price: 3500,
      description: "Telur ayam segar dimasak orak-arik langsung ke dalam kuah kental gurih.",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
      badge: "Kuah Makin Kental"
    }
  ]
};
