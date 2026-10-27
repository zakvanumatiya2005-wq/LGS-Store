/**
 * DukaanOS - Core Application Logic
 * State Management, Ledger Accounting, Stock Automation, WhatsApp Linkers
 */

// Sound Synthesizer using Web Audio API (Offline, Zero-Asset)
const SoundFX = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playTone(freq, type, duration, gainVal = 0.08) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio might be blocked until user interaction
    }
  },
  click() {
    this.playTone(800, 'sine', 0.05, 0.04);
  },
  success() {
    this.playTone(523.25, 'triangle', 0.08, 0.06); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.12, 0.06), 70); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.18, 0.06), 140); // G5
  },
  alert() {
    this.playTone(400, 'sawtooth', 0.12, 0.08);
    setTimeout(() => this.playTone(300, 'sawtooth', 0.16, 0.08), 120);
  }
};

// Main DukaanOS Application State
class DukaanOS {
  constructor() {
    this.activeTab = 'dashboard'; // 'dashboard' | 'inventory' | 'showcase' | 'udhaar' | 'roznamcha' | 'settings'
    this.customerMode = false; // When true, locked into View-Only Customer Showcase
    this.settings = this.loadStorage('dukaan_settings', INITIAL_DUKAAN_SETTINGS);
    this.inventory = this.loadStorage('dukaan_inventory', INITIAL_INVENTORY);
    this.customers = this.loadStorage('dukaan_customers', INITIAL_CUSTOMERS);
    this.roznamcha = this.loadStorage('dukaan_roznamcha', INITIAL_ROZNAMCHA);

    // Active filters
    this.inventoryFilter = {
      category: 'all',
      search: '',
      stockStatus: 'all', // 'all' | 'low' | 'out' | 'in'
      sortBy: 'name'
    };

    this.showcaseFilter = {
      category: 'all',
      search: '',
      sortBy: 'featured'
    };

    this.udhaarFilter = {
      search: '',
      status: 'all' // 'all' | 'pending' | 'clear'
    };

    // Selected objects for modals
    this.currentCustomer = null;
    this.currentItem = null;
    this.toastTimer = null;
    this.receiptData = null;

    // Check URL parameters (e.g. ?mode=showcase for direct customer catalog links)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'showcase' || urlParams.get('catalog') === 'true') {
      this.customerMode = true;
      this.activeTab = 'showcase';
    }
  }

  // Storage Helpers
  loadStorage(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Storage read error for key", key, e);
    }
    return JSON.parse(JSON.stringify(fallback));
  }

  saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage write error for key", key, e);
    }
  }

  saveAll() {
    this.saveStorage('dukaan_settings', this.settings);
    this.saveStorage('dukaan_inventory', this.inventory);
    this.saveStorage('dukaan_customers', this.customers);
    this.saveStorage('dukaan_roznamcha', this.roznamcha);
  }

  // Toast Notification
  showToast(message, type = 'success') {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    
    // Icon & color styling
    toast.className = "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 font-medium text-sm toast-slide-up text-white ";
    if (type === 'success') {
      toast.classList.add('bg-emerald-700', 'border', 'border-emerald-500');
      toastIcon.innerHTML = `<svg class="w-5 h-5 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
      SoundFX.success();
    } else if (type === 'error') {
      toast.classList.add('bg-rose-700', 'border', 'border-rose-500');
      toastIcon.innerHTML = `<svg class="w-5 h-5 text-rose-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
      SoundFX.alert();
    } else {
      toast.classList.add('bg-slate-800', 'border', 'border-slate-700');
      toastIcon.innerHTML = `<svg class="w-5 h-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
      SoundFX.click();
    }

    toast.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }

  // Navigation
  switchTab(tabId) {
    if (this.customerMode && tabId !== 'showcase') {
      this.customerMode = false;
    }
    this.activeTab = tabId;
    SoundFX.click();
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  enableCustomerMode() {
    this.customerMode = true;
    this.activeTab = 'showcase';
    SoundFX.click();
    this.render();
    this.showToast("Catalog View Active: Clean showcase view for customers (No buy button/cart)", "info");
  }

  exitCustomerMode() {
    this.customerMode = false;
    this.activeTab = 'dashboard';
    SoundFX.click();
    this.render();
    this.showToast("Returned to Shopkeeper Admin mode", "info");
  }

  // Calculations & Analytics
  getAnalytics() {
    const totalItems = this.inventory.length;
    const totalStockQty = this.inventory.reduce((sum, it) => sum + Number(it.stock || 0), 0);
    const stockValuation = this.inventory.reduce((sum, it) => sum + (Number(it.stock || 0) * Number(it.costPrice || 0)), 0);
    const retailStockValue = this.inventory.reduce((sum, it) => sum + (Number(it.stock || 0) * Number(it.sellPrice || 0)), 0);

    const lowStockItems = this.inventory.filter(it => Number(it.stock) <= Number(it.lowStockLimit || this.settings.defaultLowStockThreshold));
    const outOfStockItems = this.inventory.filter(it => Number(it.stock) === 0);

    // Customer balances
    let totalUdhaarPending = 0;
    let pendingCustomersCount = 0;
    
    this.customers.forEach(c => {
      const bal = this.getCustomerBalance(c);
      if (bal > 0) {
        totalUdhaarPending += bal;
        pendingCustomersCount++;
      }
    });

    // Today's summary from roznamcha & transactions
    const todayStr = new Date().toISOString().slice(0, 10);
    let todayCashSales = 0;
    let todayUdhaarGiven = 0;
    let todayUdhaarRecovered = 0;

    // From roznamcha
    this.roznamcha.forEach(r => {
      if (r.date && r.date.startsWith(todayStr)) {
        if (r.type === 'cash_sale') todayCashSales += Number(r.amount);
        if (r.type === 'udhaar_jama') todayUdhaarRecovered += Number(r.amount);
      }
    });

    // From customer transactions
    this.customers.forEach(c => {
      (c.transactions || []).forEach(tx => {
        if (tx.date && tx.date.startsWith(todayStr)) {
          if (tx.type === 'udhaar') todayUdhaarGiven += Number(tx.amount);
          if (tx.type === 'jama') todayUdhaarRecovered += Number(tx.amount);
        }
      });
    });

    return {
      totalItems,
      totalStockQty,
      stockValuation,
      retailStockValue,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      outOfStockCount: outOfStockItems.length,
      totalCustomers: this.customers.length,
      pendingCustomersCount,
      totalUdhaarPending,
      todayCashSales,
      todayUdhaarGiven,
      todayUdhaarRecovered
    };
  }

  // Customer Ledger Helpers
  getCustomerBalance(customer) {
    if (!customer || !customer.transactions) return 0;
    return customer.transactions.reduce((bal, tx) => {
      if (tx.type === 'udhaar') return bal + Number(tx.amount || 0);
      if (tx.type === 'jama') return bal - Number(tx.amount || 0);
      return bal;
    }, 0);
  }

  getCustomerTotalCredit(customer) {
    if (!customer || !customer.transactions) return 0;
    return customer.transactions
      .filter(tx => tx.type === 'udhaar')
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }

  getCustomerTotalPaid(customer) {
    if (!customer || !customer.transactions) return 0;
    return customer.transactions
      .filter(tx => tx.type === 'jama')
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }

  // Quick Stock Adjustment (+/- directly from table)
  adjustStock(itemId, delta, reason = 'Quick Adjust') {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    const newStock = Math.max(0, Number(item.stock) + delta);
    item.stock = newStock;
    this.saveAll();
    
    // Visual feedback
    if (delta > 0) {
      this.showToast(`Stock updated: ${item.name} (+${delta}) -> Now: ${newStock}`, 'success');
    } else {
      this.showToast(`Stock deducted: ${item.name} (${delta}) -> Now: ${newStock}`, 'info');
    }
    this.render();
  }

  // Customer Management
  addCustomer(name, phone, address, creditLimit = 5000, initialUdhaar = 0, notes = '') {
    const newCust = {
      id: 'cust-' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      creditLimit: Number(creditLimit) || 5000,
      createdAt: new Date().toISOString(),
      transactions: []
    };

    if (Number(initialUdhaar) > 0) {
      newCust.transactions.push({
        id: 'tx-' + Date.now(),
        date: new Date().toISOString(),
        type: 'udhaar',
        amount: Number(initialUdhaar),
        description: 'Opening Udhaar Balance',
        mode: 'Initial Balance',
        balanceAfter: Number(initialUdhaar)
      });
    }

    this.customers.unshift(newCust);
    this.saveAll();
    this.showToast(`Grahak Joda Gaya: ${newCust.name}`, 'success');
    this.render();
    return newCust;
  }

  // Record Transaction (Udhaar Diya or Jama Kiya)
  recordTransaction(customerId, type, amount, description, mode = 'Cash') {
    const cust = this.customers.find(c => c.id === customerId);
    if (!cust) return;

    const currentBal = this.getCustomerBalance(cust);
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      this.showToast('Kripya sahi raqam (valid amount) bharein', 'error');
      return;
    }

    const newBal = (type === 'udhaar') ? (currentBal + amt) : (currentBal - amt);

    const tx = {
      id: 'tx-' + Date.now(),
      date: new Date().toISOString(),
      type: type, // 'udhaar' or 'jama'
      amount: amt,
      description: description.trim() || (type === 'udhaar' ? 'Samaan Udhaar Diya' : 'Payment Jama Received'),
      mode: mode,
      balanceAfter: newBal
    };

    if (!cust.transactions) cust.transactions = [];
    cust.transactions.push(tx);

    // If it's a jama (payment received), also add an entry to Roznamcha
    if (type === 'jama') {
      this.roznamcha.unshift({
        id: 'rz-' + Date.now(),
        date: new Date().toISOString(),
        type: 'udhaar_jama',
        amount: amt,
        description: `Udhaar Jama received from ${cust.name} (${mode})`,
        paymentMode: mode
      });
    }

    this.saveAll();
    
    if (type === 'udhaar') {
      this.showToast(`Udhaar darj hua: ₹${amt} (${cust.name})`, 'info');
    } else {
      this.showToast(`Jama darj hua: ₹${amt} (${cust.name}) - Balance: ₹${newBal}`, 'success');
    }

    this.render();
  }

  // Inventory CRUD
  addItem(itemData) {
    const newItem = {
      id: 'item-' + Date.now(),
      name: itemData.name.trim(),
      category: itemData.category,
      categoryName: this.getCategoryName(itemData.category),
      unit: itemData.unit || 'Piece',
      costPrice: Number(itemData.costPrice) || 0,
      sellPrice: Number(itemData.sellPrice) || 0,
      stock: Number(itemData.stock) || 0,
      lowStockLimit: Number(itemData.lowStockLimit) || 5,
      description: itemData.description.trim() || '',
      sku: itemData.sku.trim() || ('SKU-' + Math.floor(1000 + Math.random() * 9000)),
      badge: itemData.badge || '',
      imageUrl: itemData.imageUrl || this.getDefaultImageForCategory(itemData.category)
    };

    this.inventory.unshift(newItem);
    this.saveAll();
    this.showToast(`Naya Samaan Joda Gaya: ${newItem.name}`, 'success');
    this.render();
  }

  updateItem(itemId, updatedData) {
    const idx = this.inventory.findIndex(i => i.id === itemId);
    if (idx === -1) return;

    this.inventory[idx] = {
      ...this.inventory[idx],
      ...updatedData,
      categoryName: this.getCategoryName(updatedData.category || this.inventory[idx].category)
    };

    this.saveAll();
    this.showToast(`Samaan update hua: ${this.inventory[idx].name}`, 'success');
    this.render();
  }

  deleteItem(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    if (confirm(`Kya aap sach me '${item.name}' ko delete karna chahte hain?`)) {
      this.inventory = this.inventory.filter(i => i.id !== itemId);
      this.saveAll();
      this.showToast(`Samaan hata diya gaya: ${item.name}`, 'info');
      this.render();
    }
  }

  getCategoryName(categoryId) {
    const found = CATEGORIES.find(c => c.id === categoryId);
    return found ? found.name : categoryId;
  }

  getDefaultImageForCategory(categoryId) {
    const map = {
      bharat_dora: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=600&q=80",
      piping_laces: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=600&q=80",
      tikdi: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
      moti: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
      frocks: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80",
      jubbo_buttons: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=600&q=80",
      chappal: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
      chudiya: "https://images.unsplash.com/photo-1611591475879-c564344f6c43?auto=format&fit=crop&w=600&q=80",
      earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
      kanti: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
      haar: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
      general: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80"
    };
    return map[categoryId] || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80";
  }

  // WhatsApp Link Generators
  sendCustomerWhatsAppReminder(customerId) {
    const cust = this.customers.find(c => c.id === customerId);
    if (!cust) return;

    const balance = this.getCustomerBalance(cust);
    if (balance <= 0) {
      this.showToast(`${cust.name} ka koi udhaar baqi nahi hai!`, 'info');
      return;
    }

    const cleanPhone = cust.phone.replace(/[^0-9]/g, '');
    const phoneWithCode = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;

    const msg = `Namaste ${cust.name} ji 🙏\n\nYeh *${this.settings.shopName}* ki taraf se yaad-dihani (reminder) hai.\nAapka pichla baqi hisab *₹${balance.toLocaleString('en-IN')}* hai.\n\nKripya samay milte hi dukan par aakar ya online UPI (${this.settings.upiId}) se jama karwayein.\n\nKisi bhi sawal ke liye hume isi number par WhatsApp ya Call karein (${this.settings.phone}).\nShukriya! ✨`;

    const waUrl = `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  }

  sendItemShowcaseInquiry(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    const shopPhone = this.settings.whatsapp || this.settings.phone || '919876543210';
    const cleanPhone = shopPhone.replace(/[^0-9]/g, '');
    const phoneWithCode = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;

    const msg = `Assalamu Alaikum / Namaste *${this.settings.shopName}*! 👋\n\nMaine aapke Online Showcase me yeh item dekha hai:\n🛍️ *${item.name}*\n💰 Keemat: *₹${item.sellPrice.toLocaleString('en-IN')} / ${item.unit}*\n📂 Category: ${item.categoryName}\n\nKya yeh item dukan par abhi uplabdh (available) hai? Main shop visit karna chahta/chahti hoon. Kripya tasdeeq karein. Shukriya!`;

    const waUrl = `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  }

  // Print Passbook / Thermal Slip
  printCustomerSlip(customerId) {
    const cust = this.customers.find(c => c.id === customerId);
    if (!cust) return;

    const balance = this.getCustomerBalance(cust);
    const totalCredit = this.getCustomerTotalCredit(cust);
    const totalPaid = this.getCustomerTotalPaid(cust);

    const printableArea = document.getElementById('printableArea');
    if (!printableArea) return;

    printableArea.innerHTML = `
      <div style="max-width: 380px; margin: 0 auto; font-family: monospace, sans-serif; border: 1px dashed #666; padding: 18px; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 2px dashed #333; padding-bottom: 12px; margin-bottom: 12px;">
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; text-transform: uppercase;">${this.settings.shopName}</h2>
          <p style="margin: 4px 0; font-size: 11px;">${this.settings.tagline}</p>
          <p style="margin: 2px 0; font-size: 11px;">${this.settings.address}</p>
          <p style="margin: 2px 0; font-size: 11px; font-weight: bold;">Mob / WhatsApp: ${this.settings.phone}</p>
          <p style="margin: 2px 0; font-size: 11px;">UPI ID: ${this.settings.upiId}</p>
        </div>

        <div style="font-size: 12px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
          <div style="display: flex; justify-content: space-between;">
            <span><strong>Grahak:</strong> ${cust.name}</span>
            <span><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</span>
          </div>
          <div><strong>Phone:</strong> ${cust.phone}</div>
          <div><strong>Pata:</strong> ${cust.address || 'Local'}</div>
        </div>

        <h4 style="margin: 6px 0; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #333;">Transaction Passbook</h4>
        <table style="width: 100%; font-size: 11px; border-collapse: collapse; margin-bottom: 10px;">
          <thead>
            <tr style="border-bottom: 1px dashed #333; text-align: left;">
              <th style="padding: 4px 2px;">Tarikh</th>
              <th style="padding: 4px 2px;">Vivran (Details)</th>
              <th style="padding: 4px 2px; text-align: right;">Udhaar (+)</th>
              <th style="padding: 4px 2px; text-align: right;">Jama (-)</th>
            </tr>
          </thead>
          <tbody>
            ${(cust.transactions || []).map(tx => `
              <tr style="border-bottom: 1px dotted #ccc;">
                <td style="padding: 4px 2px; vertical-align: top;">${new Date(tx.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</td>
                <td style="padding: 4px 2px;">
                  <div>${tx.description}</div>
                  <div style="font-size: 9px; color: #666;">${tx.mode}</div>
                </td>
                <td style="padding: 4px 2px; text-align: right; color: ${tx.type === 'udhaar' ? '#b91c1c' : '#888'};">
                  ${tx.type === 'udhaar' ? '₹' + tx.amount : '-'}
                </td>
                <td style="padding: 4px 2px; text-align: right; color: ${tx.type === 'jama' ? '#047857' : '#888'}; font-weight: bold;">
                  ${tx.type === 'jama' ? '₹' + tx.amount : '-'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="border-top: 2px dashed #333; padding-top: 8px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Kul Udhaar (Total Given):</span>
            <strong>₹${totalCredit.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Kul Jama (Total Received):</span>
            <strong style="color: #047857;">₹${totalPaid.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: bold; border-top: 1px solid #333; padding-top: 6px; margin-top: 4px; color: ${balance > 0 ? '#b91c1c' : '#047857'};">
            <span>NET BAQI (Balance):</span>
            <span>₹${balance.toLocaleString('en-IN')} ${balance > 0 ? '(Pending)' : '(Clear)'}</span>
          </div>
        </div>

        <div style="margin-top: 24px; text-align: center; font-size: 10px; border-top: 1px dashed #888; padding-top: 12px;">
          <p style="margin: 0;">*** Dhanyawaad / Shukriya! Fir Tashreef Layein ***</p>
          <div style="margin-top: 20px; display: flex; justify-content: space-between;">
            <span>Customer Sign</span>
            <span>Dukandar Signature</span>
          </div>
        </div>
      </div>
    `;

    window.print();
  }

  // Print Wholesale Reorder List
  printReorderSheet() {
    const analytics = this.getAnalytics();
    const lowStockItems = analytics.lowStockItems;
    if (lowStockItems.length === 0) {
      this.showToast('Koi bhi low-stock item nahi hai! Sabhi samaan poora hai.', 'info');
      return;
    }

    const printableArea = document.getElementById('printableArea');
    if (!printableArea) return;

    printableArea.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto; font-family: sans-serif; padding: 20px;">
        <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 16px;">
          <h2 style="margin: 0; font-size: 22px;">${this.settings.shopName}</h2>
          <h3 style="margin: 4px 0; font-size: 16px; color: #b91c1c;">📋 Mandi / Wholesale Reorder Parchi (Khareedari List)</h3>
          <p style="margin: 0; font-size: 12px; color: #555;">Tarikh: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid #94a3b8; text-align: left;">
              <th style="padding: 8px; border: 1px solid #cbd5e1;">#</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1;">Samaan ka Naam (Item Name)</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1;">Category</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Baqi Stock</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Alert Limit</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">Wholesale Cost (Approx)</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Lana Hai (Qty)</th>
            </tr>
          </thead>
          <tbody>
            ${lowStockItems.map((it, idx) => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 8px; border: 1px solid #cbd5e1;">${idx + 1}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: 600;">${it.name}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">${it.categoryName}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; color: red; font-weight: bold;">${it.stock} ${it.unit}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">${it.lowStockLimit}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">₹${it.costPrice}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; background: #fffbeb;">[ &nbsp; &nbsp; &nbsp; &nbsp; ]</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="font-size: 12px; color: #666; margin-top: 20px; border-top: 1px dashed #999; padding-top: 10px;">
          <p>Total Low-Stock Items to Reorder: <strong>${lowStockItems.length}</strong></p>
          <p>Dukaan Contact: ${this.settings.phone} | Address: ${this.settings.address}</p>
        </div>
      </div>
    `;

    window.print();
  }

  // Backup & Restore
  exportBackup() {
    const data = {
      app: "DukaanOS",
      version: "2.0",
      exportDate: new Date().toISOString(),
      settings: this.settings,
      inventory: this.inventory,
      customers: this.customers,
      roznamcha: this.roznamcha
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DukaanOS_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast("Dukaan ka pura data download ho gaya (Backup Saved)!", "success");
  }

  importBackup(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.inventory && data.customers) {
          this.settings = data.settings || this.settings;
          this.inventory = data.inventory;
          this.customers = data.customers;
          this.roznamcha = data.roznamcha || [];
          this.saveAll();
          this.showToast("Backup safalta-purvak restore kar liya gaya!", "success");
          this.render();
        } else {
          this.showToast("Amaniy (Invalid) backup file format!", "error");
        }
      } catch (err) {
        this.showToast("File read karne me khata hui: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  }

  resetDemoData() {
    if (confirm("Kya aap sach me sabhi badlav hata kar default shuruati data wapas lana chahte hain?")) {
      this.settings = JSON.parse(JSON.stringify(INITIAL_DUKAAN_SETTINGS));
      this.inventory = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
      this.customers = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS));
      this.roznamcha = JSON.parse(JSON.stringify(INITIAL_ROZNAMCHA));
      this.saveAll();
      this.showToast("Default dukan data wapas load ho gaya!", "success");
      this.render();
    }
  }

  // Render Dispatcher
  render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    if (this.customerMode) {
      appEl.innerHTML = this.renderCustomerShowcaseView();
      this.attachCustomerShowcaseListeners();
      return;
    }

    let contentHtml = '';
    switch (this.activeTab) {
      case 'dashboard':
        contentHtml = this.renderDashboard();
        break;
      case 'inventory':
        contentHtml = this.renderInventory();
        break;
      case 'showcase':
        contentHtml = this.renderShowcaseAdminTab();
        break;
      case 'udhaar':
        contentHtml = this.renderUdhaarKhata();
        break;
      case 'roznamcha':
        contentHtml = this.renderRoznamcha();
        break;
      case 'settings':
        contentHtml = this.renderSettings();
        break;
      default:
        contentHtml = this.renderDashboard();
    }

    appEl.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <!-- 1. DESKTOP SIDEBAR (Visible on md: and up, hidden on mobile) -->
        ${this.renderSidebar()}

        <!-- 2. MAIN CONTENT WRAPPER (Offset by sidebar width on desktop) -->
        <div class="flex-1 flex flex-col min-w-0 md:pl-64 lg:pl-72 pb-24 md:pb-8">
          <!-- Top Bar (Search, Greetings & Customer Mode toggle) -->
          ${this.renderTopBar()}

          <!-- Page Content -->
          <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            ${contentHtml}
          </main>

          <!-- Desktop Footer -->
          ${this.renderFooter()}
        </div>

        <!-- 3. MOBILE BOTTOM NAVIGATION (Fixed at bottom on mobile, hidden on desktop) -->
        ${this.renderMobileBottomNav()}
      </div>
    `;

    this.attachEventListeners();
  }

  // Desktop Sidebar Navigation
  renderSidebar() {
    const analytics = this.getAnalytics();
    return `
      <aside class="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 lg:w-72 bg-white border-r border-slate-200 z-30 shadow-xs">
        <!-- Shop Brand Header -->
        <div class="p-5 border-b border-slate-100 flex items-center gap-3">
          <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center shadow-md font-bold text-lg lg:text-xl flex-shrink-0">
            🏪
          </div>
          <div class="min-w-0 flex-1">
            <h1 class="font-extrabold text-slate-900 text-sm lg:text-base tracking-tight leading-tight truncate" title="${this.settings.shopName}">
              ${this.settings.shopName}
            </h1>
            <p class="text-[11px] text-slate-500 truncate mt-0.5">
              Prop: <strong>${this.settings.ownerName}</strong>
            </p>
          </div>
        </div>

        <!-- Quick Action Sidebar Buttons -->
        <div class="p-4 space-y-2 border-b border-slate-100 bg-slate-50/50">
          <button 
            onclick="window.app.openAddItemModal()"
            class="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 active:scale-95"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            <span>+ Naya Samaan</span>
          </button>

          <button 
            onclick="window.app.openRecordTxModal()"
            class="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 active:scale-95"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>+ Udhaar / Jama</span>
          </button>
        </div>

        <!-- Navigation Menu List -->
        <nav class="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs font-semibold">
          <div class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Modules</div>

          <!-- 1. Dashboard -->
          <button 
            onclick="window.app.switchTab('dashboard')"
            class="w-full px-3.5 py-2.5 rounded-xl transition flex items-center justify-between ${this.activeTab === 'dashboard' ? 'bg-emerald-700 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
          >
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 ${this.activeTab === 'dashboard' ? 'text-white' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              <span>Dashboard (रिकॉर्ड)</span>
            </div>
          </button>

          <!-- 2. Inventory & Stock -->
          <button 
            onclick="window.app.switchTab('inventory')"
            class="w-full px-3.5 py-2.5 rounded-xl transition flex items-center justify-between ${this.activeTab === 'inventory' ? 'bg-emerald-700 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
          >
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 ${this.activeTab === 'inventory' ? 'text-white' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              <span>Inventory & Stock</span>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] ${this.activeTab === 'inventory' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700'}">
              ${this.inventory.length}
            </span>
          </button>

          <!-- 3. Udhaar Khata -->
          <button 
            onclick="window.app.switchTab('udhaar')"
            class="w-full px-3.5 py-2.5 rounded-xl transition flex items-center justify-between ${this.activeTab === 'udhaar' ? 'bg-emerald-700 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
          >
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 ${this.activeTab === 'udhaar' ? 'text-white' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              <span>Udhaar Khata (खाता)</span>
            </div>
            ${analytics.totalUdhaarPending > 0 ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${this.activeTab === 'udhaar' ? 'bg-rose-900 text-rose-100' : 'bg-rose-100 text-rose-700'}">
                ₹${analytics.totalUdhaarPending.toLocaleString('en-IN')}
              </span>
            ` : ''}
          </button>

          <!-- 4. Customer Showcase -->
          <button 
            onclick="window.app.switchTab('showcase')"
            class="w-full px-3.5 py-2.5 rounded-xl transition flex items-center justify-between ${this.activeTab === 'showcase' ? 'bg-emerald-700 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
          >
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 ${this.activeTab === 'showcase' ? 'text-white' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              <span>Online Showcase</span>
            </div>
            <span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-800">
              View-Only
            </span>
          </button>

          <!-- 5. Daily Roznamcha -->
          <button 
            onclick="window.app.switchTab('roznamcha')"
            class="w-full px-3.5 py-2.5 rounded-xl transition flex items-center justify-between ${this.activeTab === 'roznamcha' ? 'bg-emerald-700 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
          >
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 ${this.activeTab === 'roznamcha' ? 'text-white' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              <span>Daily Roznamcha</span>
            </div>
          </button>

          <div class="pt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Settings & Tools</div>

          <!-- 6. Settings -->
          <button 
            onclick="window.app.switchTab('settings')"
            class="w-full px-3.5 py-2.5 rounded-xl transition flex items-center gap-2.5 ${this.activeTab === 'settings' ? 'bg-emerald-700 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
          >
            <svg class="w-4 h-4 ${this.activeTab === 'settings' ? 'text-white' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Dukaan Settings</span>
          </button>
        </nav>

        <!-- Sidebar Bottom Alert & Backup Card -->
        <div class="p-4 border-t border-slate-100 space-y-2 bg-slate-50/70">
          ${analytics.lowStockCount > 0 ? `
            <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-bold flex items-center justify-between">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                <span>${analytics.lowStockCount} Low Stock</span>
              </span>
              <button onclick="window.app.printReorderSheet()" class="underline text-rose-900 text-[10px]">Print</button>
            </div>
          ` : ''}

          <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <button onclick="window.app.exportBackup()" class="hover:text-slate-900 font-bold flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              <span>Backup</span>
            </button>
            <button onclick="window.app.resetDemoData()" class="text-rose-600 hover:underline">
              Reset
            </button>
          </div>
        </div>
      </aside>
    `;
  }

  // Top Bar for Mobile & Desktop
  renderTopBar() {
    const analytics = this.getAnalytics();
    const pageTitleMap = {
      dashboard: "Dukaan Record & Dashboard",
      inventory: "Inventory & Stock Management",
      udhaar: "Udhaar Khata (Customer Ledger)",
      showcase: "Online Customer Showcase",
      roznamcha: "Daily Roznamcha (Cash Register)",
      settings: "Dukaan Settings & Backup"
    };

    return `
      <header class="glass-nav sticky top-0 z-20 border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between">
        <!-- Left: Mobile Brand & Desktop Breadcrumb -->
        <div class="flex items-center gap-3">
          <!-- Mobile Brand Logo -->
          <div class="md:hidden flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              🏪
            </div>
            <div class="truncate max-w-[170px] sm:max-w-xs">
              <h2 class="font-extrabold text-slate-900 text-xs sm:text-sm truncate leading-tight">${this.settings.shopName}</h2>
              <p class="text-[10px] text-slate-500 truncate">${pageTitleMap[this.activeTab] || 'Dukaan'}</p>
            </div>
          </div>

          <!-- Desktop Page Title & Live Date -->
          <div class="hidden md:block">
            <h2 class="font-extrabold text-slate-900 text-lg tracking-tight leading-tight">
              ${pageTitleMap[this.activeTab] || 'DukaanOS'}
            </h2>
            <p class="text-xs text-slate-400">
              ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <!-- Right: Customer Showcase Mode Pill & Quick Trigger -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Customer Showcase Mode Switcher (View-Only) -->
          <button 
            onclick="window.app.enableCustomerMode()"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            title="Open View-Only Catalog for Walk-in or Online Customers"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            <span>Customer View</span>
            <span class="hidden sm:inline text-amber-100 text-[10px] font-normal">(Catalog)</span>
          </button>

          <!-- Reorder Slip Quick Print (Desktop only) -->
          ${analytics.lowStockCount > 0 ? `
            <button 
              onclick="window.app.printReorderSheet()"
              class="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition"
              title="Print Wholesale Mandi Reorder List"
            >
              <span class="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              <span>${analytics.lowStockCount} Low Stock</span>
            </button>
          ` : ''}

          <!-- Quick Cash Entry Trigger (Mobile) -->
          <button 
            onclick="window.app.openRecordTxModal()" 
            class="md:hidden p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
            title="Quick Entry"
          >
            + Entry
          </button>
        </div>
      </header>
    `;
  }

  // Mobile Bottom Tab Navigation Bar (Visible only on mobile screen < md)
  renderMobileBottomNav() {
    const analytics = this.getAnalytics();
    return `
      <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1 py-1.5 flex items-center justify-around shadow-2xl safe-area-inset-bottom">
        <!-- Tab 1: Dashboard -->
        <button 
          onclick="window.app.switchTab('dashboard')"
          class="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition ${this.activeTab === 'dashboard' ? 'text-emerald-700 font-bold bg-emerald-50/70' : 'text-slate-500 hover:text-slate-900'}"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span class="text-[10px] leading-none">रिकॉर्ड</span>
        </button>

        <!-- Tab 2: Inventory -->
        <button 
          onclick="window.app.switchTab('inventory')"
          class="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition relative ${this.activeTab === 'inventory' ? 'text-emerald-700 font-bold bg-emerald-50/70' : 'text-slate-500 hover:text-slate-900'}"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          <span class="text-[10px] leading-none">स्टॉक</span>
          ${analytics.lowStockCount > 0 ? `
            <span class="w-2 h-2 rounded-full bg-rose-600 absolute top-1 right-3"></span>
          ` : ''}
        </button>

        <!-- Tab 3: Udhaar Khata -->
        <button 
          onclick="window.app.switchTab('udhaar')"
          class="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition relative ${this.activeTab === 'udhaar' ? 'text-emerald-700 font-bold bg-emerald-50/70' : 'text-slate-500 hover:text-slate-900'}"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          <span class="text-[10px] leading-none">उधार</span>
          ${analytics.totalUdhaarPending > 0 ? `
            <span class="w-2 h-2 rounded-full bg-rose-600 absolute top-1 right-3"></span>
          ` : ''}
        </button>

        <!-- Tab 4: Showcase -->
        <button 
          onclick="window.app.switchTab('showcase')"
          class="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition ${this.activeTab === 'showcase' ? 'text-emerald-700 font-bold bg-emerald-50/70' : 'text-slate-500 hover:text-slate-900'}"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          <span class="text-[10px] leading-none">शोकेस</span>
        </button>

        <!-- Tab 5: Roznamcha -->
        <button 
          onclick="window.app.switchTab('roznamcha')"
          class="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition ${this.activeTab === 'roznamcha' ? 'text-emerald-700 font-bold bg-emerald-50/70' : 'text-slate-500 hover:text-slate-900'}"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          <span class="text-[10px] leading-none">गल्ला</span>
        </button>

        <!-- Tab 6: Settings -->
        <button 
          onclick="window.app.switchTab('settings')"
          class="flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition ${this.activeTab === 'settings' ? 'text-emerald-700 font-bold bg-emerald-50/70' : 'text-slate-500 hover:text-slate-900'}"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="text-[10px] leading-none">सेटिंग्स</span>
        </button>
      </nav>
    `;
  }

  // Footer Component
  renderFooter() {
    return `
      <footer class="bg-white border-t border-slate-200 mt-auto py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            <strong>${this.settings.shopName}</strong> • Digital Shop Ledger & Customer Showcase
          </div>
          <div class="flex items-center gap-4">
            <span>Offline-Ready • Auto-Saved locally</span>
            <span class="text-slate-300">|</span>
            <button onclick="window.app.resetDemoData()" class="text-rose-600 hover:underline">Reset Demo Data</button>
          </div>
        </div>
      </footer>
    `;
  }
}
