/**
 * SEBLAK PRASMANAN TEH MIKI - MAIN APPLICATION LOGIC
 * ===================================================
 * Interaktivitas Topping, Level Pedas, Kalkulator Otomatis, dan WhatsApp Checkout
 */

// Application State
const state = {
  cart: {}, // { toppingId: quantity }
  selectedSpicyLevel: 2, // Default: Lv 2 (Nagih)
  orderType: "dine-in",
  activeCategory: "all",
  isDrawerOpen: false
};

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  applyConfigDetails();
  renderSpicyMeter();
  renderToppings();
  setupEventListeners();
  updateOrderCalculations();
}

// 1. Terapkan informasi konfigurasi ke elemen UI
function applyConfigDetails() {
  // Update link WhatsApp langsung jika ada
  const waLinks = document.querySelectorAll(".wa-direct-link");
  waLinks.forEach(link => {
    link.href = `https://wa.me/${CONFIG.businessWhatsApp}?text=${encodeURIComponent('Halo Admin Seblak Teh Miki, saya mau tanya-tanya menu seblak prasmanan.')}`;
  });

  // Tampilkan info alamat & jam buka
  const addressEls = document.querySelectorAll(".outlet-address-text");
  addressEls.forEach(el => el.textContent = CONFIG.outletAddress);

  const hoursEls = document.querySelectorAll(".operational-hours-text");
  hoursEls.forEach(el => el.textContent = CONFIG.operationalHours);
}

// 2. Format Mata Uang Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}

// 3. Render Katalog Topping
function renderToppings() {
  const container = document.getElementById("topping-grid-container");
  if (!container) return;

  const filtered = state.activeCategory === "all"
    ? CONFIG.toppings
    : CONFIG.toppings.filter(item => item.category === state.activeCategory);

  container.innerHTML = filtered.map(item => {
    const qty = state.cart[item.id] || 0;
    const isAdded = qty > 0;

    return `
      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-red-300">
        <!-- Image & Badges -->
        <div class="relative h-44 overflow-hidden bg-slate-100">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onerror="if (!this.dataset.retry) { this.dataset.retry='1'; this.src=this.src.replace('assets/img/', 'img/'); } else if (this.dataset.retry==='1') { this.dataset.retry='2'; this.src=this.src.split('/').pop(); } else { this.onerror=null; this.style.backgroundColor='#fee2e2'; }"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <!-- Category & Badge -->
          <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            ${item.badge ? `
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.isPopular ? 'bg-red-600 text-white shadow-sm' : 'bg-white/90 text-slate-800 backdrop-blur-sm'}">
                ${item.badge}
              </span>
            ` : ''}
          </div>

          <!-- Price Tag overlay -->
          <div class="absolute bottom-2.5 left-3 text-white">
            <span class="text-xs text-white/80 font-medium">Harga</span>
            <div class="text-base font-extrabold text-amber-300">${formatRupiah(item.price)}</div>
          </div>
        </div>

        <!-- Info & Action -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-slate-900 text-sm md:text-base group-hover:text-red-600 transition-colors">
              ${item.name}
            </h4>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              ${item.description}
            </p>
          </div>

          <!-- Action Controls -->
          <div class="mt-4 pt-3 border-t border-slate-100">
            ${!isAdded ? `
              <button 
                onclick="addToCart('${item.id}')"
                class="w-full py-2 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-800 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 active:scale-95 shadow-sm"
              >
                <span>+ Ambil Topping</span>
              </button>
            ` : `
              <div class="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl p-1">
                <button 
                  onclick="decrementCart('${item.id}')"
                  class="w-8 h-8 rounded-lg bg-white text-red-600 hover:bg-red-600 hover:text-white font-extrabold flex items-center justify-center shadow-xs transition-colors active:scale-90"
                  aria-label="Kurangi ${item.name}"
                >
                  −
                </button>
                <div class="text-center px-2">
                  <span class="font-extrabold text-red-700 text-sm">${qty}</span>
                  <span class="text-[10px] text-red-500 block">porsi</span>
                </div>
                <button 
                  onclick="addToCart('${item.id}')"
                  class="w-8 h-8 rounded-lg bg-red-600 text-white hover:bg-red-700 font-extrabold flex items-center justify-center shadow-xs transition-colors active:scale-90"
                  aria-label="Tambah ${item.name}"
                >
                  +
                </button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// 4. Render Spicy Meter Selector
function renderSpicyMeter() {
  const container = document.getElementById("spicy-level-selector");
  if (!container) return;

  container.innerHTML = CONFIG.spicyLevels.map(lvl => {
    const isSelected = state.selectedSpicyLevel === lvl.level;

    return `
      <button 
        type="button"
        onclick="setSpicyLevel(${lvl.level})"
        class="flex-1 min-w-[120px] p-3 rounded-xl border-2 transition-all duration-200 text-left relative ${
          isSelected 
            ? 'border-red-600 bg-red-50/70 shadow-md ring-2 ring-red-500/20' 
            : 'border-slate-200 bg-white hover:border-slate-300'
        }"
      >
        ${lvl.isPopular ? `
          <span class="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-red-600 text-white uppercase tracking-wider shadow-xs">
            Favorit
          </span>
        ` : ''}
        <div class="flex items-center space-x-1.5 mb-1">
          <span class="text-lg">${lvl.emoji}</span>
          <span class="font-extrabold text-xs md:text-sm text-slate-900">${lvl.name.split(' - ')[0]}</span>
        </div>
        <div class="text-[11px] font-bold text-red-600 truncate">${lvl.name.split(' - ')[1]}</div>
        <p class="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">${lvl.desc}</p>
      </button>
    `;
  }).join("");

  // Sync dengan level pedas di formulir
  const formSpicySelect = document.getElementById("order-spicy-level");
  if (formSpicySelect) {
    formSpicySelect.value = state.selectedSpicyLevel;
  }
}

// 5. Ubah Level Pedas
function setSpicyLevel(level) {
  state.selectedSpicyLevel = parseInt(level, 10);
  renderSpicyMeter();
  updateOrderCalculations();
  const currentLevelObj = CONFIG.spicyLevels.find(l => l.level === state.selectedSpicyLevel);
  showToast(`Level Pedas diubah ke: ${currentLevelObj ? currentLevelObj.name : 'Level ' + level}`);
}

// 6. Kelola Keranjang Topping (Cart)
function addToCart(toppingId) {
  state.cart[toppingId] = (state.cart[toppingId] || 0) + 1;
  const item = CONFIG.toppings.find(t => t.id === toppingId);
  renderToppings();
  updateOrderCalculations();
  if (item) {
    showToast(`✓ Ditambahkan: ${item.name} (${state.cart[toppingId]}x)`);
  }
}

function decrementCart(toppingId) {
  if (state.cart[toppingId]) {
    state.cart[toppingId] -= 1;
    if (state.cart[toppingId] <= 0) {
      delete state.cart[toppingId];
    }
  }
  renderToppings();
  updateOrderCalculations();
}

function clearCart() {
  if (confirm("Kosongkan semua pilihan topping?")) {
    state.cart = {};
    renderToppings();
    updateOrderCalculations();
    showToast("Pilihan topping telah dikosongkan.");
  }
}

// 7. Preset Racikan Juara (1-Click Kombinasi Rekomendasi)
function applyJuaraPreset() {
  state.cart = {
    "dumpling-keju": 1,
    "cuanki-lidah": 1,
    "jamur-enoki": 1,
    "ceker-ayam": 1,
    "kerupuk-mawar": 1
  };
  state.selectedSpicyLevel = 2; // Level 2 Nagih
  renderToppings();
  renderSpicyMeter();
  updateOrderCalculations();
  showToast("🔥 Paket Racik Seblak Juara berhasil dimasukkan ke piring!");
  
  // Scroll mulus ke ringkasan atau katalog
  const orderSection = document.getElementById("order-section");
  if (orderSection) {
    orderSection.scrollIntoView({ behavior: "smooth" });
  }
}

// 8. Kalkulasi Total Harga & Promo Otomatis
function updateOrderCalculations() {
  let totalItems = 0;
  let subtotalPrice = 0;
  const selectedItemsDetails = [];

  for (const [id, qty] of Object.entries(state.cart)) {
    const topping = CONFIG.toppings.find(t => t.id === id);
    if (topping && qty > 0) {
      totalItems += qty;
      const itemSubtotal = topping.price * qty;
      subtotalPrice += itemSubtotal;
      selectedItemsDetails.push({
        ...topping,
        qty,
        itemSubtotal
      });
    }
  }

  const hasGift = totalItems >= CONFIG.promo.minToppingForGift;
  const itemsNeededForGift = Math.max(0, CONFIG.promo.minToppingForGift - totalItems);
  const totalPrice = subtotalPrice + CONFIG.baseBroth.price;

  // Update floating bar and badge elements
  const floatingCountEls = document.querySelectorAll(".cart-total-count");
  floatingCountEls.forEach(el => el.textContent = totalItems);

  const floatingPriceEls = document.querySelectorAll(".cart-total-price");
  floatingPriceEls.forEach(el => el.textContent = formatRupiah(totalPrice));

  // Tampilkan/sembunyikan floating summary bar jika ada item
  const floatingBar = document.getElementById("floating-cart-bar");
  if (floatingBar) {
    if (totalItems > 0) {
      floatingBar.classList.remove("translate-y-full", "opacity-0", "pointer-events-none");
      floatingBar.classList.add("translate-y-0", "opacity-100");
    } else {
      floatingBar.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
      floatingBar.classList.remove("translate-y-0", "opacity-100");
    }
  }

  // Render Ringkasan di formulir pemesanan
  renderOrderSummaryInForm(selectedItemsDetails, totalItems, totalPrice, hasGift, itemsNeededForGift);
}

// 9. Render Ringkasan Detail di Form
function renderOrderSummaryInForm(items, totalItems, totalPrice, hasGift, itemsNeeded) {
  const container = document.getElementById("order-topping-summary-list");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-xs">
        <span class="text-2xl block mb-2">🥣</span>
        <p class="font-bold text-slate-700">Piring Seblak Masih Kosong</p>
        <p class="mt-1">Pilih minimal 1 topping favoritmu di katalog di atas untuk mulai meracik!</p>
        <a href="#katalog-section" class="inline-block mt-3 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition">
          Pilih Topping Sekarang
        </a>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="space-y-2.5 max-h-60 overflow-y-auto pr-1">
        ${items.map(item => `
          <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div class="flex items-center space-x-2.5">
              <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded-lg object-cover border border-slate-200" onerror="if (!this.dataset.retry) { this.dataset.retry='1'; this.src=this.src.replace('assets/img/', 'img/'); } else if (this.dataset.retry==='1') { this.dataset.retry='2'; this.src=this.src.split('/').pop(); } else { this.onerror=null; this.style.backgroundColor='#fee2e2'; }" />
              <div>
                <h5 class="font-bold text-slate-900">${item.name}</h5>
                <span class="text-[11px] text-slate-500">${formatRupiah(item.price)} × ${item.qty} porsi</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="font-extrabold text-red-600">${formatRupiah(item.itemSubtotal)}</span>
              <button 
                type="button"
                onclick="decrementCart('${item.id}')" 
                class="w-6 h-6 rounded bg-slate-200 hover:bg-red-600 hover:text-white flex items-center justify-center font-bold text-slate-700 transition"
                title="Kurangi"
              >
                −
              </button>
              <button 
                type="button"
                onclick="addToCart('${item.id}')" 
                class="w-6 h-6 rounded bg-red-100 hover:bg-red-600 hover:text-white flex items-center justify-center font-bold text-red-700 transition"
                title="Tambah"
              >
                +
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Broth and Promo Status -->
      <div class="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs">
        <div class="flex justify-between items-center text-slate-600">
          <span class="flex items-center gap-1.5">
            <span>🍲</span>
            <span>${CONFIG.baseBroth.name}</span>
          </span>
          <span class="font-bold text-emerald-600">GRATIS</span>
        </div>

        <!-- Promo Gift Progress -->
        <div class="p-3 rounded-xl border ${hasGift ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}">
          <div class="flex items-center justify-between font-bold text-[11px]">
            <span class="flex items-center gap-1.5">
              <span>🎁</span>
              <span>${CONFIG.promo.desc}</span>
            </span>
            ${hasGift ? '<span class="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px]">Terklaim!</span>' : ''}
          </div>
          ${!hasGift ? `
            <div class="mt-2">
              <div class="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden">
                <div class="bg-amber-600 h-full rounded-full transition-all duration-300" style="width: ${(totalItems / CONFIG.promo.minToppingForGift) * 100}%"></div>
              </div>
              <p class="text-[10px] mt-1 text-amber-700 font-medium">Tambah <strong>${itemsNeeded} topping lagi</strong> untuk dapatkan bonus Es Teh Jumbo!</p>
            </div>
          ` : `
            <p class="text-[10px] mt-1 text-emerald-700 font-medium">✓ Selamat! Es Teh Manis Jumbo otomatis ditambahkan ke pesanan Anda tanpa biaya.</p>
          `}
        </div>

        <!-- Total Calculation Row -->
        <div class="pt-2 flex justify-between items-center text-slate-900 border-t border-slate-200">
          <span class="font-extrabold text-sm">Total Pembayaran:</span>
          <span class="font-black text-xl text-red-600" id="form-total-price">${formatRupiah(totalPrice)}</span>
        </div>
      </div>
    `;
  }
}

// 10. Filter Kategori Topping
function filterCategory(category) {
  state.activeCategory = category;
  
  // Update button active state
  const filterBtns = document.querySelectorAll(".category-filter-btn");
  filterBtns.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add("bg-red-600", "text-white", "border-red-600");
      btn.classList.remove("bg-white", "text-slate-700", "border-slate-200");
    } else {
      btn.classList.remove("bg-red-600", "text-white", "border-red-600");
      btn.classList.add("bg-white", "text-slate-700", "border-slate-200");
    }
  });

  renderToppings();
}

// 11. Validasi & Kirim Pesanan via WhatsApp
function handleWhatsAppOrder(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById("customer-name");
  const phoneInput = document.getElementById("customer-phone");
  const notesInput = document.getElementById("customer-notes");
  const orderTypeSelect = document.getElementById("order-type");
  const spicySelect = document.getElementById("order-spicy-level");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const notes = notesInput ? notesInput.value.trim() : "";
  const orderType = orderTypeSelect ? orderTypeSelect.value : "Dine-in";
  const spicyLevelVal = spicySelect ? parseInt(spicySelect.value, 10) : state.selectedSpicyLevel;

  // Validasi Nama
  if (!name) {
    alert("Silakan masukkan Nama Pemesan terlebih dahulu.");
    nameInput.focus();
    return;
  }

  // Validasi Nomor WhatsApp
  if (!phone || phone.length < 8) {
    alert("Silakan masukkan Nomor WhatsApp yang aktif agar pesanan dapat dikonfirmasi.");
    phoneInput.focus();
    return;
  }

  // Validasi Minimal 1 Topping
  const totalSelectedToppings = Object.values(state.cart).reduce((a, b) => a + b, 0);
  if (totalSelectedToppings === 0) {
    alert("Piring seblakmu masih kosong! Silakan pilih minimal 1 topping dari katalog.");
    const katalogEl = document.getElementById("katalog-section");
    if (katalogEl) katalogEl.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // Siapkan data pesanan
  const spicyObj = CONFIG.spicyLevels.find(l => l.level === spicyLevelVal) || CONFIG.spicyLevels[2];
  let subtotal = 0;
  const itemsTextList = [];

  for (const [id, qty] of Object.entries(state.cart)) {
    const topping = CONFIG.toppings.find(t => t.id === id);
    if (topping && qty > 0) {
      const itemSub = topping.price * qty;
      subtotal += itemSub;
      itemsTextList.push(`• ${topping.name} (${qty}x) = ${formatRupiah(itemSub)}`);
    }
  }

  const hasGift = totalSelectedToppings >= CONFIG.promo.minToppingForGift;
  const grandTotal = subtotal + CONFIG.baseBroth.price;

  // Format Pesanan WhatsApp dengan format yang rapi dan profesional
  let message = `*FORM PESANAN SEBLAK PRASMANAN TEH MIKI*\n`;
  message += `===================================\n\n`;
  message += `👤 *Nama Pemesan:* ${name}\n`;
  message += `📱 *No. WhatsApp:* ${phone}\n`;
  message += `📍 *Tipe Pesanan:* ${orderType}\n\n`;
  message += `🥣 *DETAIL TOPPING PRASMANAN:*\n`;
  message += itemsTextList.join("\n") + "\n\n";
  message += `🌶️ *Level Pedas:* ${spicyObj.name} ${spicyObj.emoji}\n`;
  message += `🍲 *Kuah:* ${CONFIG.baseBroth.name} (GRATIS)\n`;
  
  if (hasGift) {
    message += `🎁 *Bonus Promo:* ${CONFIG.promo.freeItemName} (Klaim min. 4 topping)\n`;
  }

  if (notes) {
    message += `📝 *Catatan Khusus:* ${notes}\n`;
  }

  message += `\n-----------------------------------\n`;
  message += `💰 *TOTAL PEMBAYARAN: ${formatRupiah(grandTotal)}*\n`;
  message += `-----------------------------------\n\n`;
  message += `Halo Teh Miki / Admin, saya ingin memesan racikan seblak di atas. Mohon info estimasi pembuatan & nomor rekening / QRIS pembayarannya ya. Terima kasih! 🙏`;

  const encodedUrl = `https://wa.me/${CONFIG.businessWhatsApp}?text=${encodeURIComponent(message)}`;

  // Tampilkan notifikasi konfirmasi & buka WhatsApp
  showToast("Membuka WhatsApp untuk mengirim pesanan...");
  setTimeout(() => {
    window.open(encodedUrl, "_blank");
  }, 350);
}

// 12. Setup Event Listeners (FAQ Accordion, Mobile Menu, Filter, etc.)
function setupEventListeners() {
  // Mobile Hamburger Toggle
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu-drawer");
  const closeMenuBtn = document.getElementById("close-mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  // Tutup mobile menu saat link diklik
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenu) mobileMenu.classList.add("hidden");
    });
  });

  // FAQ Accordion
  const faqButtons = document.querySelectorAll(".faq-toggle-btn");
  faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isOpen = content.classList.contains("open");

      // Tutup semua faq lainnya
      document.querySelectorAll(".faq-content").forEach(c => c.classList.remove("open"));
      document.querySelectorAll(".faq-icon").forEach(i => i.textContent = "+");

      if (!isOpen) {
        content.classList.add("open");
        if (icon) icon.textContent = "−";
      }
    });
  });

  // Sinkronisasi form input level pedas
  const formSpicySelect = document.getElementById("order-spicy-level");
  if (formSpicySelect) {
    formSpicySelect.addEventListener("change", (e) => {
      state.selectedSpicyLevel = parseInt(e.target.value, 10);
      renderSpicyMeter();
      updateOrderCalculations();
    });
  }

  // Form Submission
  const orderForm = document.getElementById("seblak-order-form");
  if (orderForm) {
    orderForm.addEventListener("submit", handleWhatsAppOrder);
  }
}

// 13. Toast Notification Helper
function showToast(message) {
  let toast = document.getElementById("custom-toast-container");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "custom-toast-container";
    toast.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 max-w-sm w-full px-4";
    document.body.appendChild(toast);
  }

  const toastEl = document.createElement("div");
  toastEl.className = "bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-2xl border border-slate-700/80 flex items-center justify-between space-x-2 animate-bounce";
  toastEl.innerHTML = `
    <span>${message}</span>
    <span class="text-amber-400">✨</span>
  `;

  toast.innerHTML = "";
  toast.appendChild(toastEl);

  setTimeout(() => {
    if (toastEl.parentNode) {
      toastEl.classList.add("opacity-0");
      setTimeout(() => toastEl.remove(), 300);
    }
  }, 2500);
}

// 14. Ubah Konfigurasi WhatsApp Dinamis (Modal Setting untuk Owner/Penguji)
function promptChangeWhatsApp() {
  const current = CONFIG.businessWhatsApp;
  const newNumber = prompt("Masukkan nomor WhatsApp admin Seblak Teh Miki (Gunakan awalan 62 tanpa spasi/tanda hubung, contoh: 628123456789):", current);
  if (newNumber && newNumber.trim().length >= 8) {
    CONFIG.businessWhatsApp = newNumber.trim().replace(/[^0-9]/g, "");
    applyConfigDetails();
    showToast(`✓ Nomor WhatsApp diperbarui menjadi: ${CONFIG.businessWhatsApp}`);
  }
}
