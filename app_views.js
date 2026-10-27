/**
 * DukaanOS - Views & Interactive UI Components
 * Module 1: Dukaan ka Record & Dashboard
 * Module 2: Inventory & Stock Management (Pre-loaded with shop's stock)
 * Module 3: Online Customer Showcase (View-Only Catalog)
 * Module 4: Udhaar Khata (Customer Ledger)
 * Module 5: Daily Roznamcha (Cash Counter)
 * Settings & Modals
 */

// ==========================================
// 1. DUKAAN KA RECORD & DASHBOARD
// ==========================================
DukaanOS.prototype.renderDashboard = function() {
  const analytics = this.getAnalytics();
  const lowStock = analytics.lowStockItems;
  const recentCustomers = [...this.customers].sort((a, b) => {
    const aLatest = (a.transactions && a.transactions.length) ? new Date(a.transactions[a.transactions.length - 1].date) : new Date(a.createdAt || 0);
    const bLatest = (b.transactions && b.transactions.length) ? new Date(b.transactions[b.transactions.length - 1].date) : new Date(b.createdAt || 0);
    return bLatest - aLatest;
  }).slice(0, 5);

  return `
    <div class="space-y-6">
      <!-- Welcome & Shop Quick Status Banner -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 shadow-lg">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/60 backdrop-blur-sm text-emerald-100 text-xs font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              दुकान का खाता व इन्वेंट्री रिकॉर्ड
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Khush-Amdeed, ${this.settings.ownerName}!
            </h2>
            <p class="text-emerald-100 text-sm max-w-xl">
              Aaj ki dukaan ki kul bikri, udhaar ki recovery aur samaan ka hisab yahan dekhein.
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap gap-2.5 sm:gap-3">
            <button 
              onclick="window.app.openAddItemModal()"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition active:scale-95"
            >
              <svg class="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              <span>+ Naya Samaan</span>
            </button>

            <button 
              onclick="window.app.openAddCustomerModal()"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm border border-emerald-400/30 transition active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
              <span>+ Naya Grahak</span>
            </button>

            <button 
              onclick="window.app.openRecordTxModal()"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>+ Udhaar / Jama</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4 Core KPI Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Metric 1: Total Items & Stock Value -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Kul Samaan (Items)</span>
            <span class="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-slate-900">${analytics.totalItems}</span>
            <span class="text-xs font-semibold text-slate-500">Items (${analytics.totalStockQty} Pcs in Stock)</span>
          </div>
          <div class="mt-2 text-xs text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Wholesale Maal Value:</span>
            <span class="font-bold text-slate-800">₹${analytics.stockValuation.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Metric 2: Low-Stock Alerts -->
        <div class="bg-white rounded-2xl p-5 border ${analytics.lowStockCount > 0 ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200/80'} shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Low-Stock Chetwani</span>
            <span class="p-2.5 rounded-xl ${analytics.lowStockCount > 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold ${analytics.lowStockCount > 0 ? 'text-rose-600' : 'text-slate-900'}">
              ${analytics.lowStockCount}
            </span>
            <span class="text-xs font-semibold text-slate-500">Items Khatam hone par hain</span>
          </div>
          <div class="mt-2 text-xs flex justify-between border-t border-slate-100 pt-2">
            <span class="text-slate-500">Out of Stock: <strong class="text-rose-600">${analytics.outOfStockCount}</strong></span>
            <button onclick="window.app.filterLowStock()" class="text-rose-600 font-bold hover:underline">Samaan Dekhein &rarr;</button>
          </div>
        </div>

        <!-- Metric 3: Total Market Udhaar (Credit) -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Market me Baqi Udhaar</span>
            <span class="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-amber-600">₹${analytics.totalUdhaarPending.toLocaleString('en-IN')}</span>
          </div>
          <div class="mt-2 text-xs text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Baqidar Grahak: <strong class="text-slate-800">${analytics.pendingCustomersCount}</strong></span>
            <button onclick="window.app.switchTab('udhaar')" class="text-amber-700 font-bold hover:underline">Khata Kholein &rarr;</button>
          </div>
        </div>

        <!-- Metric 4: Today's Summary Overview -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Aaj ka Rozana Overview</span>
            <span class="p-2.5 rounded-xl bg-sky-50 text-sky-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            </span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-extrabold text-slate-900">₹${(analytics.todayCashSales + analytics.todayUdhaarRecovered).toLocaleString('en-IN')}</span>
            <span class="text-xs font-semibold text-emerald-600">Jama Aaya</span>
          </div>
          <div class="mt-2 text-xs text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Udhaar Diya: <strong class="text-rose-600">₹${analytics.todayUdhaarGiven}</strong></span>
            <span>Recovery: <strong class="text-emerald-700">₹${analytics.todayUdhaarRecovered}</strong></span>
          </div>
        </div>
      </div>

      <!-- Low Stock Warning Box (if any item low) -->
      ${lowStock.length > 0 ? `
        <div class="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-5 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-start gap-3">
              <div class="p-2 bg-rose-600 text-white rounded-xl">
                <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <div>
                <h3 class="font-bold text-rose-900 text-base">
                  ⚠️ Low Stock Alert: ${lowStock.length} Samaan Khatam hone wala hai!
                </h3>
                <p class="text-xs text-rose-700 mt-0.5">
                  Ye items dukaan par bikne wale hain aur stock kam bacha hai. Niche di gayi list se stock badhayein ya wholesale mandi list print karein.
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button 
                onclick="window.app.printReorderSheet()"
                class="px-3.5 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 font-bold text-xs hover:bg-rose-50 shadow-sm transition flex items-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                <span>Mandi Parchi Print</span>
              </button>
            </div>
          </div>

          <!-- Horizontal scrolling low stock badges -->
          <div class="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            ${lowStock.map(it => `
              <div class="flex-shrink-0 bg-white border border-rose-200 rounded-xl p-3 shadow-xs flex items-center gap-3 w-72">
                <img src="${it.imageUrl}" alt="${it.name}" class="w-12 h-12 rounded-lg object-cover border border-slate-100 flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100'"/>
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-slate-900 text-xs truncate">${it.name}</h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700">
                      Baqi: ${it.stock} ${it.unit}
                    </span>
                    <span class="text-[10px] text-slate-400">Limit: ${it.lowStockLimit}</span>
                  </div>
                </div>
                <button 
                  onclick="window.app.adjustStock('${it.id}', 5, 'Quick Restock')"
                  class="px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200"
                  title="Add 5 items to stock instantly"
                >
                  +5
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Split Layout: Recent Udhaar Khata Activity & Categories Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Col 1 & 2: Recent Customer Ledgers -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-bold text-slate-900 text-base">Grahak Udhaar Khata (Recent Activity)</h3>
              <p class="text-xs text-slate-500">Aapke grahakon ka baqi hisab aur haal hi me hui jama-nikasi</p>
            </div>
            <button 
              onclick="window.app.switchTab('udhaar')" 
              class="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Sabhi Grahak Dekhein</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-3 px-3 rounded-l-lg">Grahak (Customer)</th>
                  <th class="py-3 px-3">Mohalla / Pata</th>
                  <th class="py-3 px-3">Baqi Udhaar</th>
                  <th class="py-3 px-3 text-right rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                ${recentCustomers.map(cust => {
                  const balance = this.getCustomerBalance(cust);
                  return `
                    <tr class="hover:bg-slate-50/80 transition">
                      <td class="py-3 px-3">
                        <div class="font-bold text-slate-900 text-sm">${cust.name}</div>
                        <div class="text-[11px] text-slate-400">${cust.phone}</div>
                      </td>
                      <td class="py-3 px-3 text-slate-500 truncate max-w-xs">
                        ${cust.address || '-'}
                      </td>
                      <td class="py-3 px-3">
                        ${balance > 0 ? `
                          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                            ₹${balance.toLocaleString('en-IN')} Baqi
                          </span>
                        ` : `
                          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Sab Chukta (₹0)
                          </span>
                        `}
                      </td>
                      <td class="py-3 px-3 text-right space-x-1">
                        <button 
                          onclick="window.app.openPassbookModal('${cust.id}')"
                          class="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
                          title="View Ledger Passbook"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </button>

                        ${balance > 0 ? `
                          <button 
                            onclick="window.app.sendCustomerWhatsAppReminder('${cust.id}')"
                            class="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition"
                            title="WhatsApp Payment Reminder"
                          >
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 2.01.815 3.09.816 3.183 0 5.769-2.587 5.769-5.768.001-3.181-2.584-5.768-5.764-5.768zm3.385 8.169c-.141.396-.713.727-1.026.772-.313.045-.694.077-2.18-.544-1.898-.79-3.123-2.736-3.218-2.862-.095-.126-.77-1.024-.77-1.954s.487-1.385.66-1.574c.173-.189.378-.236.504-.236.126 0 .252.002.363.007.117.006.273-.044.426.326.157.379.536 1.309.584 1.404.048.095.079.205.016.331-.063.126-.095.205-.189.315-.095.11-.199.245-.284.331-.095.095-.194.198-.083.388.11.189.49 0.808 1.05 1.307.72.641 1.327.84 1.516.935.189.095.3.079.41-.047.11-.126.473-.552.599-.741.126-.189.252-.158.426-.095.173.063 1.104.52 1.293.615.189.095.315.142.362.221.047.079.047.458-.094.854z"/></svg>
                          </button>
                        ` : ''}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Col 3: Shop Categories Quick Inventory Breakdown -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-slate-900 text-base">Categories Overview</h3>
            <span class="text-xs text-slate-500">${CATEGORIES.length - 1} Categories</span>
          </div>

          <div class="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            ${CATEGORIES.filter(c => c.id !== 'all').map(cat => {
              const itemsInCat = this.inventory.filter(i => i.category === cat.id);
              const catStock = itemsInCat.reduce((sum, i) => sum + Number(i.stock || 0), 0);
              return `
                <div 
                  onclick="window.app.filterByCategory('${cat.id}')"
                  class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-100 cursor-pointer transition text-xs font-semibold"
                >
                  <div class="flex items-center gap-2.5 truncate">
                    <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span class="truncate">${cat.name}</span>
                  </div>
                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <span class="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-bold">
                      ${itemsInCat.length} items
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Customer Showcase Callout -->
          <div class="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <div class="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
              <span>🌟 Customer Digital Showcase</span>
            </div>
            <p class="text-xs text-amber-800">
              Grahak ko apna samaan mobile par dikhane ke liye View-Only Catalog kholein.
            </p>
            <button 
              onclick="window.app.enableCustomerMode()"
              class="mt-3 w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition"
            >
              Open Customer Showcase (View-Only) &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
};

// ==========================================
// 2. INVENTORY & STOCK MANAGEMENT
// ==========================================
DukaanOS.prototype.renderInventory = function() {
  const categories = CATEGORIES;
  
  // Apply filtering
  let filtered = [...this.inventory];

  // Category filter
  if (this.inventoryFilter.category && this.inventoryFilter.category !== 'all') {
    filtered = filtered.filter(it => it.category === this.inventoryFilter.category);
  }

  // Stock status filter
  if (this.inventoryFilter.stockStatus === 'low') {
    filtered = filtered.filter(it => Number(it.stock) <= Number(it.lowStockLimit || this.settings.defaultLowStockThreshold));
  } else if (this.inventoryFilter.stockStatus === 'out') {
    filtered = filtered.filter(it => Number(it.stock) === 0);
  } else if (this.inventoryFilter.stockStatus === 'in') {
    filtered = filtered.filter(it => Number(it.stock) > Number(it.lowStockLimit || this.settings.defaultLowStockThreshold));
  }

  // Search filter
  if (this.inventoryFilter.search.trim()) {
    const q = this.inventoryFilter.search.toLowerCase();
    filtered = filtered.filter(it => 
      it.name.toLowerCase().includes(q) || 
      (it.categoryName && it.categoryName.toLowerCase().includes(q)) || 
      (it.sku && it.sku.toLowerCase().includes(q)) ||
      (it.description && it.description.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (this.inventoryFilter.sortBy === 'stock_asc') {
    filtered.sort((a, b) => Number(a.stock) - Number(b.stock));
  } else if (this.inventoryFilter.sortBy === 'stock_desc') {
    filtered.sort((a, b) => Number(b.stock) - Number(a.stock));
  } else if (this.inventoryFilter.sortBy === 'price_asc') {
    filtered.sort((a, b) => Number(a.sellPrice) - Number(b.sellPrice));
  } else if (this.inventoryFilter.sortBy === 'price_desc') {
    filtered.sort((a, b) => Number(b.sellPrice) - Number(a.sellPrice));
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return `
    <div class="space-y-6">
      <!-- Title & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Inventory & Stock Management (इन्वेंट्री)
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dukaan ke sabhi samaan ka hisab, stock badhana, ghatana aur naye items jodhna
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button 
            onclick="window.app.printReorderSheet()"
            class="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
            title="Wholesale Market Purchase List"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            <span class="hidden sm:inline">Mandi Parchi Print</span>
          </button>

          <button 
            onclick="window.app.openAddItemModal()"
            class="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            <span>+ Naya Samaan Jodein</span>
          </button>
        </div>
      </div>

      <!-- Category Filter Pills (Horizontal Scrollable) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        ${categories.map(cat => {
          const isSelected = (this.inventoryFilter.category === cat.id) || (!this.inventoryFilter.category && cat.id === 'all');
          const count = (cat.id === 'all') 
            ? this.inventory.length 
            : this.inventory.filter(i => i.category === cat.id).length;

          return `
            <button 
              onclick="window.app.filterByCategory('${cat.id}')"
              class="px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${isSelected ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}"
            >
              <span>${cat.name}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}">
                ${count}
              </span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Search, Stock Status Filter & Sorter Toolbar -->
      <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <svg class="w-4 h-4 absolute left-3.5 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            type="text" 
            id="inventorySearchInput"
            value="${this.inventoryFilter.search}"
            placeholder="Samaan ka naam, category ya SKU khojein..."
            oninput="window.app.onInventorySearch(this.value)"
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
          />
        </div>

        <!-- Filter and Sort Controls -->
        <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <!-- Stock Status Segment -->
          <div class="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            <button 
              onclick="window.app.setStockFilter('all')"
              class="px-2.5 py-1 rounded-lg transition ${this.inventoryFilter.stockStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}"
            >
              Sabhi
            </button>
            <button 
              onclick="window.app.setStockFilter('low')"
              class="px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${this.inventoryFilter.stockStatus === 'low' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:text-rose-900'}"
            >
              <span>⚠️ Low Stock</span>
            </button>
            <button 
              onclick="window.app.setStockFilter('out')"
              class="px-2.5 py-1 rounded-lg transition ${this.inventoryFilter.stockStatus === 'out' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'}"
            >
              Khatam (0)
            </button>
          </div>

          <!-- Sort Dropdown -->
          <select 
            id="inventorySortSelect"
            onchange="window.app.setInventorySort(this.value)"
            class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="name" ${this.inventoryFilter.sortBy === 'name' ? 'selected' : ''}>Naam (A to Z)</option>
            <option value="stock_asc" ${this.inventoryFilter.sortBy === 'stock_asc' ? 'selected' : ''}>Stock: Kam se Jyada</option>
            <option value="stock_desc" ${this.inventoryFilter.sortBy === 'stock_desc' ? 'selected' : ''}>Stock: Jyada se Kam</option>
            <option value="price_asc" ${this.inventoryFilter.sortBy === 'price_asc' ? 'selected' : ''}>Keemat: Kam se Jyada</option>
            <option value="price_desc" ${this.inventoryFilter.sortBy === 'price_desc' ? 'selected' : ''}>Keemat: Jyada se Kam</option>
          </select>
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th class="py-3.5 px-4">Samaan (Item Info)</th>
                <th class="py-3.5 px-3">Category</th>
                <th class="py-3.5 px-3">Khareed Rate</th>
                <th class="py-3.5 px-3">Bikri Rate (MRP)</th>
                <th class="py-3.5 px-4 text-center">Baqi Stock (Qty)</th>
                <th class="py-3.5 px-4 text-right">Quick Stock Action</th>
                <th class="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" class="py-12 text-center text-slate-400">
                    <svg class="w-12 h-12 mx-auto text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    <p class="font-bold text-sm text-slate-600">Koi samaan nahi mila!</p>
                    <p class="text-xs text-slate-400 mt-1">Search badalkar dekhein ya naya samaan jodein.</p>
                  </td>
                </tr>
              ` : filtered.map(it => {
                const isLow = Number(it.stock) <= Number(it.lowStockLimit || 5);
                const isOut = Number(it.stock) === 0;
                const margin = it.sellPrice > 0 ? Math.round(((it.sellPrice - it.costPrice) / it.sellPrice) * 100) : 0;

                return `
                  <tr class="hover:bg-slate-50/80 transition ${isLow ? 'bg-rose-50/30' : ''}">
                    <!-- Samaan Info -->
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-3">
                        <img 
                          src="${it.imageUrl}" 
                          alt="${it.name}" 
                          class="w-11 h-11 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                          onerror="this.src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100'"
                        />
                        <div class="min-w-0">
                          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span>${it.name}</span>
                            ${it.badge ? `<span class="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold">${it.badge}</span>` : ''}
                          </div>
                          <div class="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>SKU: <strong>${it.sku}</strong></span>
                            <span>•</span>
                            <span>Unit: ${it.unit}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Category -->
                    <td class="py-3.5 px-3">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        ${it.categoryName}
                      </span>
                    </td>

                    <!-- Cost Price -->
                    <td class="py-3.5 px-3 text-slate-500 font-mono">
                      ₹${it.costPrice}
                    </td>

                    <!-- Selling Price -->
                    <td class="py-3.5 px-3">
                      <div class="font-bold text-slate-900 font-mono text-sm">₹${it.sellPrice}</div>
                      <div class="text-[10px] text-emerald-600 font-semibold">${margin}% munafa (profit)</div>
                    </td>

                    <!-- Stock Status & Quantity -->
                    <td class="py-3.5 px-4 text-center">
                      <div class="inline-flex flex-col items-center">
                        <span class="px-2.5 py-1 rounded-full font-extrabold text-xs ${
                          isOut ? 'bg-slate-900 text-white' : 
                          isLow ? 'bg-rose-100 text-rose-700 border border-rose-200 low-stock-pulse' : 
                          'bg-emerald-100 text-emerald-800'
                        }">
                          ${it.stock} ${it.unit}
                        </span>
                        ${isLow ? `
                          <span class="text-[10px] font-bold text-rose-600 mt-1">
                            ⚠️ Low Stock (Limit: ${it.lowStockLimit})
                          </span>
                        ` : ''}
                      </div>
                    </td>

                    <!-- Quick Stock Increment/Decrement -->
                    <td class="py-3.5 px-4 text-right">
                      <div class="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        <button 
                          onclick="window.app.adjustStock('${it.id}', -1)"
                          class="w-7 h-7 rounded-lg bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-extrabold text-xs shadow-xs border border-slate-200 transition active:scale-95 flex items-center justify-center"
                          title="Reduce 1 piece"
                        >
                          -1
                        </button>
                        <button 
                          onclick="window.app.adjustStock('${it.id}', 1)"
                          class="w-7 h-7 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-extrabold text-xs shadow-xs border border-slate-200 transition active:scale-95 flex items-center justify-center"
                          title="Add 1 piece"
                        >
                          +1
                        </button>
                        <button 
                          onclick="window.app.adjustStock('${it.id}', 5)"
                          class="px-2 h-7 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition active:scale-95 flex items-center justify-center"
                          title="Add 5 pieces (Wholesale Restock)"
                        >
                          +5
                        </button>
                      </div>
                    </td>

                    <!-- Actions -->
                    <td class="py-3.5 px-4 text-right space-x-1">
                      <button 
                        onclick="window.app.openEditItemModal('${it.id}')"
                        class="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
                        title="Edit Item Details"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>

                      <button 
                        onclick="window.app.deleteItem('${it.id}')"
                        class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete Item"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Table Footer Info -->
        <div class="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Kul <strong>${filtered.length}</strong> samaan dikhaye ja rahe hain (Dukaan Total: <strong>${this.inventory.length}</strong> items)</span>
          <span class="text-slate-400 font-medium">Tips: Quick stock badhane ke liye '+1' ya '+5' dabayein.</span>
        </div>
      </div>
    </div>
  `;
};

// ==========================================
// 3. ONLINE CUSTOMER SHOWCASE (VIEW-ONLY CATALOG)
// Dedicated Customer Presentation Mode
// No cart, no online payment, pure browse & store inquiry
// ==========================================
DukaanOS.prototype.renderCustomerShowcaseView = function() {
  const categories = CATEGORIES;
  
  // Filter products for showcase
  let items = [...this.inventory];
  if (this.showcaseFilter.category && this.showcaseFilter.category !== 'all') {
    items = items.filter(it => it.category === this.showcaseFilter.category);
  }
  if (this.showcaseFilter.search.trim()) {
    const q = this.showcaseFilter.search.toLowerCase();
    items = items.filter(it => 
      it.name.toLowerCase().includes(q) || 
      (it.categoryName && it.categoryName.toLowerCase().includes(q)) ||
      (it.description && it.description.toLowerCase().includes(q))
    );
  }

  // Sort showcase items
  if (this.showcaseFilter.sortBy === 'price_asc') {
    items.sort((a, b) => Number(a.sellPrice) - Number(b.sellPrice));
  } else if (this.showcaseFilter.sortBy === 'price_desc') {
    items.sort((a, b) => Number(b.sellPrice) - Number(a.sellPrice));
  } else {
    // Featured / default order
    items.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
  }

  return `
    <div class="min-h-screen bg-slate-50">
      <!-- Admin Return Floating Bar -->
      <div class="bg-slate-900 text-slate-300 px-4 py-2 text-xs flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-bold text-white">👀 Customer Catalog (View-Only Mode)</span>
          <span class="hidden sm:inline text-slate-400">— Grahak is mode me sirf samaan dekh sakte hain (No online cart/checkout)</span>
        </div>
        <button 
          onclick="window.app.exitCustomerMode()"
          class="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition"
        >
          &larr; Admin Dashboard Par Jayein
        </button>
      </div>

      <!-- Customer Hero Header -->
      <header class="bg-gradient-to-b from-emerald-800 to-teal-900 text-white py-10 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div class="max-w-4xl mx-auto relative z-10 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
            ✨ Physical Store Showcase & Rate List
          </div>
          <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white">
            ${this.settings.shopName}
          </h1>
          <p class="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            ${this.settings.tagline}
          </p>
          
          <!-- Physical Store Location & Timing Pill -->
          <div class="pt-2 flex flex-wrap justify-center items-center gap-4 text-xs text-emerald-200">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>${this.settings.address}</span>
            </span>
            <span class="hidden sm:inline">•</span>
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Open: 10:00 AM - 9:30 PM (Daily)</span>
            </span>
          </div>

          <!-- Direct Call & Direct WhatsApp Buttons -->
          <div class="pt-4 flex flex-wrap justify-center gap-3">
            <a 
              href="tel:${this.settings.phone}" 
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs sm:text-sm shadow-lg hover:bg-emerald-50 transition active:scale-95"
            >
              <svg class="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>Call Shop: ${this.settings.phone}</span>
            </a>

            <a 
              href="https://wa.me/${(this.settings.whatsapp || '919876543210').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello ' + this.settings.shopName + '! I am browsing your online catalog. I have a question regarding an item.')}"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg transition active:scale-95"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 2.01.815 3.09.816 3.183 0 5.769-2.587 5.769-5.768.001-3.181-2.584-5.768-5.764-5.768zm3.385 8.169c-.141.396-.713.727-1.026.772-.313.045-.694.077-2.18-.544-1.898-.79-3.123-2.736-3.218-2.862-.095-.126-.77-1.024-.77-1.954s.487-1.385.66-1.574c.173-.189.378-.236.504-.236.126 0 .252.002.363.007.117.006.273-.044.426.326.157.379.536 1.309.584 1.404.048.095.079.205.016.331-.063.126-.095.205-.189.315-.095.11-.199.245-.284.331-.095.095-.194.198-.083.388.11.189.49 0.808 1.05 1.307.72.641 1.327.84 1.516.935.189.095.3.079.41-.047.11-.126.473-.552.599-.741.126-.189.252-.158.426-.095.173.063 1.104.52 1.293.615.189.095.315.142.362.221.047.079.047.458-.094.854z"/></svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <!-- Customer View Notice Bar -->
      <div class="bg-amber-50 border-b border-amber-200 py-3 px-4 text-center text-xs text-amber-900 font-medium">
        <span>📢 <strong>Dukaan Notice:</strong> Yeh hamari dukaan ka digital showcase hai. Yahan koi cart ya online payment nahi hai. Kisi bhi item ke liye <strong>'Inquire on WhatsApp'</strong> dabayein ya dukan visit karein!</span>
      </div>

      <!-- Main Showcase Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <!-- Category Filter Chips -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${categories.map(cat => {
            const isSelected = (this.showcaseFilter.category === cat.id) || (!this.showcaseFilter.category && cat.id === 'all');
            const count = (cat.id === 'all') 
              ? this.inventory.length 
              : this.inventory.filter(i => i.category === cat.id).length;

            return `
              <button 
                onclick="window.app.setShowcaseCategory('${cat.id}')"
                class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${isSelected ? 'bg-emerald-800 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}"
              >
                <span>${cat.name}</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}">
                  ${count}
                </span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Search & Sorter -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div class="relative w-full sm:w-96">
            <svg class="w-4 h-4 absolute left-3.5 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Samaan khojein (laces, frocks, bangles, moti...)"
              value="${this.showcaseFilter.search}"
              oninput="window.app.onShowcaseSearch(this.value)"
              class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span class="text-xs text-slate-500 font-medium">Kul <strong>${items.length}</strong> Samaan</span>
            <select 
              onchange="window.app.setShowcaseSort(this.value)"
              class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="featured" ${this.showcaseFilter.sortBy === 'featured' ? 'selected' : ''}>Khaas Pasand (Featured)</option>
              <option value="price_asc" ${this.showcaseFilter.sortBy === 'price_asc' ? 'selected' : ''}>Keemat: Kam se Jyada</option>
              <option value="price_desc" ${this.showcaseFilter.sortBy === 'price_desc' ? 'selected' : ''}>Keemat: Jyada se Kam</option>
            </select>
          </div>
        </div>

        <!-- Product Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${items.length === 0 ? `
            <div class="col-span-full py-16 text-center text-slate-400">
              <p class="text-base font-bold text-slate-700">Koi item nahi mila!</p>
              <p class="text-xs text-slate-400 mt-1">Kripya doosri category chunein ya search clear karein.</p>
            </div>
          ` : items.map(it => {
            const isOutOfStock = Number(it.stock) === 0;
            return `
              <div class="catalog-card bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col group">
                <!-- Image Container with Badges -->
                <div class="relative h-52 sm:h-56 bg-slate-100 overflow-hidden">
                  <img 
                    src="${it.imageUrl}" 
                    alt="${it.name}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onerror="this.src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600'"
                  />
                  
                  <!-- Top Badges -->
                  <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    ${it.badge ? `
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white shadow-sm">
                        ${it.badge}
                      </span>
                    ` : ''}
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
                      ${it.categoryName}
                    </span>
                  </div>

                  <!-- In-Store Stock Availability Badge -->
                  <div class="absolute bottom-3 right-3">
                    ${isOutOfStock ? `
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-900/90 text-white backdrop-blur-xs shadow-xs">
                        Currently Unavailable
                      </span>
                    ` : `
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                        Available at Shop
                      </span>
                    `}
                  </div>
                </div>

                <!-- Product Content -->
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div class="space-y-1.5">
                    <h3 class="font-extrabold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition">
                      ${it.name}
                    </h3>
                    <p class="text-xs text-slate-500 line-clamp-2">
                      ${it.description || 'Shandar quality ka samaan, dukaan par uplabdh.'}
                    </p>
                  </div>

                  <!-- Price & Unit -->
                  <div class="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span class="text-xs text-slate-400">Keemat:</span>
                      <div class="flex items-baseline gap-1">
                        <span class="text-xl font-extrabold text-slate-900">₹${it.sellPrice.toLocaleString('en-IN')}</span>
                        <span class="text-xs text-slate-500">/ ${it.unit}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Customer Action: Inquire on WhatsApp -->
                  <button 
                    onclick="window.app.sendItemShowcaseInquiry('${it.id}')"
                    class="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                  >
                    <svg class="w-4 h-4 text-emerald-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 2.01.815 3.09.816 3.183 0 5.769-2.587 5.769-5.768.001-3.181-2.584-5.768-5.764-5.768zm3.385 8.169c-.141.396-.713.727-1.026.772-.313.045-.694.077-2.18-.544-1.898-.79-3.123-2.736-3.218-2.862-.095-.126-.77-1.024-.77-1.954s.487-1.385.66-1.574c.173-.189.378-.236.504-.236.126 0 .252.002.363.007.117.006.273-.044.426.326.157.379.536 1.309.584 1.404.048.095.079.205.016.331-.063.126-.095.205-.189.315-.095.11-.199.245-.284.331-.095.095-.194.198-.083.388.11.189.49 0.808 1.05 1.307.72.641 1.327.84 1.516.935.189.095.3.079.41-.047.11-.126.473-.552.599-.741.126-.189.252-.158.426-.095.173.063 1.104.52 1.293.615.189.095.315.142.362.221.047.079.047.458-.094.854z"/></svg>
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Customer Footer -->
      <footer class="bg-white border-t border-slate-200 mt-16 py-8 text-center text-xs text-slate-500">
        <div class="max-w-4xl mx-auto px-4 space-y-2">
          <p class="font-bold text-slate-800 text-sm">${this.settings.shopName}</p>
          <p>${this.settings.address} • Phone: ${this.settings.phone}</p>
          <p class="text-[11px] text-slate-400">View-Only Catalog Powered by DukaanOS • Visit shop for purchases</p>
        </div>
      </footer>
    </div>
  `;
};

// Admin tab view of showcase (with share options & catalog link)
DukaanOS.prototype.renderShowcaseAdminTab = function() {
  return `
    <div class="space-y-6">
      <div class="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl text-white p-6 sm:p-8 shadow-md">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-amber-400/40 text-amber-100 text-xs font-semibold">
              ✨ Customer Facing Digital Catalog
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Online Customer Showcase
            </h2>
            <p class="text-amber-100 text-xs sm:text-sm max-w-xl">
              Yeh aapki dukaan ka view-only catalog hai. Grahak isme bina kisi online cart ke aapka saara samaan (laces, frocks, bangles, jewellery) dekh sakte hain aur WhatsApp par inquire kar sakte hain.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <button 
              onclick="window.app.enableCustomerMode()"
              class="px-5 py-3 rounded-xl bg-white text-amber-900 font-extrabold text-xs sm:text-sm shadow-md hover:bg-amber-50 transition active:scale-95 flex items-center gap-2"
            >
              <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              <span>Customer View Kholein (Full Screen)</span>
            </button>

            <button 
              onclick="window.app.shareShowcaseLink()"
              class="px-4 py-3 rounded-xl bg-amber-700/80 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm border border-amber-400/40 transition active:scale-95 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              <span>Share Link / WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Preview of Customer Showcase right here in admin -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-slate-900 text-base">Showcase Features Overview</h3>
          <span class="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
            ${this.inventory.length} Items Live in Showcase
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2">1</div>
            <h4 class="font-bold text-slate-900 text-sm">View-Only Protection</h4>
            <p class="text-xs text-slate-500 mt-1">Koi cart ya online payment gateway nahi chahiye. Grahak dukan ke rates dekhkar directly visit karte hain.</p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2">2</div>
            <h4 class="font-bold text-slate-900 text-sm">1-Click WhatsApp Inquiries</h4>
            <p class="text-xs text-slate-500 mt-1">Har item card par pre-formatted WhatsApp button hai jo item ka naam aur price dukandar ko bhej deta hai.</p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2">3</div>
            <h4 class="font-bold text-slate-900 text-sm">Real-time Stock Status</h4>
            <p class="text-xs text-slate-500 mt-1">Agar aap dukan par stock badhate hain, toh showcase par turant 'Available at Shop' update ho jata hai.</p>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 text-center">
          <button 
            onclick="window.app.enableCustomerMode()"
            class="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm transition"
          >
            Open Live Customer Showcase &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
};

// ==========================================
// 4. UDHAAR KHATA (CUSTOMER LEDGER)
// Digital Ledger for Credit, Jama & Baqi
// ==========================================
DukaanOS.prototype.renderUdhaarKhata = function() {
  const analytics = this.getAnalytics();

  // Apply filters
  let filtered = [...this.customers];
  if (this.udhaarFilter.search.trim()) {
    const q = this.udhaarFilter.search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.phone.toLowerCase().includes(q) ||
      (c.address && c.address.toLowerCase().includes(q))
    );
  }

  if (this.udhaarFilter.status === 'pending') {
    filtered = filtered.filter(c => this.getCustomerBalance(c) > 0);
  } else if (this.udhaarFilter.status === 'clear') {
    filtered = filtered.filter(c => this.getCustomerBalance(c) <= 0);
  }

  return `
    <div class="space-y-6">
      <!-- Title & Metrics Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Udhaar Khata (उधार खाता & ग्राहक बहीखाता)
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
            Grahakon ka udhaar, jama raqam, pichla baqi hisab aur WhatsApp payment reminder
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button 
            onclick="window.app.openRecordTxModal()"
            class="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-1.5"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>+ Udhaar / Jama Darj Karein</span>
          </button>

          <button 
            onclick="window.app.openAddCustomerModal()"
            class="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            <span>+ Naya Grahak</span>
          </button>
        </div>
      </div>

      <!-- Quick Summary Cards for Ledger -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-500 font-semibold uppercase">Kul Grahak (Customers)</span>
            <div class="text-2xl font-extrabold text-slate-900 mt-1">${this.customers.length}</div>
          </div>
          <span class="p-3 bg-slate-100 text-slate-700 rounded-xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </span>
        </div>

        <div class="bg-white rounded-2xl p-4 border border-rose-200 bg-rose-50/20 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-rose-700 font-semibold uppercase">Baqi Udhaar (Market Due)</span>
            <div class="text-2xl font-extrabold text-rose-600 mt-1">₹${analytics.totalUdhaarPending.toLocaleString('en-IN')}</div>
          </div>
          <span class="p-3 bg-rose-100 text-rose-700 rounded-xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </span>
        </div>

        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-500 font-semibold uppercase">Pending Khata Accounts</span>
            <div class="text-2xl font-extrabold text-slate-900 mt-1">${analytics.pendingCustomersCount} <span class="text-xs font-normal text-slate-500">Grahak</span></div>
          </div>
          <span class="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          </span>
        </div>
      </div>

      <!-- Search & Status Filter -->
      <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="relative w-full sm:w-80">
          <svg class="w-4 h-4 absolute left-3.5 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            type="text" 
            placeholder="Grahak ka naam ya mobile number khojein..."
            value="${this.udhaarFilter.search}"
            oninput="window.app.onUdhaarSearch(this.value)"
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>

        <div class="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button 
            onclick="window.app.setUdhaarStatusFilter('all')"
            class="px-3 py-1.5 rounded-lg transition ${this.udhaarFilter.status === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}"
          >
            Sabhi Grahak (${this.customers.length})
          </button>
          <button 
            onclick="window.app.setUdhaarStatusFilter('pending')"
            class="px-3 py-1.5 rounded-lg transition ${this.udhaarFilter.status === 'pending' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:text-rose-900'}"
          >
            Baqi Udhaar (${analytics.pendingCustomersCount})
          </button>
          <button 
            onclick="window.app.setUdhaarStatusFilter('clear')"
            class="px-3 py-1.5 rounded-lg transition ${this.udhaarFilter.status === 'clear' ? 'bg-emerald-700 text-white shadow-xs' : 'hover:text-slate-900'}"
          >
            Sab Chukta (${this.customers.length - analytics.pendingCustomersCount})
          </button>
        </div>
      </div>

      <!-- Customer Cards List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${filtered.length === 0 ? `
          <div class="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            <p class="font-bold text-sm text-slate-600">Koi grahak nahi mila</p>
            <p class="text-xs text-slate-400 mt-1">Naya grahak jodhne ke liye '+ Naya Grahak' dabayein.</p>
          </div>
        ` : filtered.map(cust => {
          const balance = this.getCustomerBalance(cust);
          const totalCredit = this.getCustomerTotalCredit(cust);
          const totalPaid = this.getCustomerTotalPaid(cust);
          const txCount = (cust.transactions || []).length;
          const lastTx = txCount > 0 ? cust.transactions[txCount - 1] : null;

          return `
            <div class="bg-white rounded-2xl border ${balance > 0 ? 'border-rose-200/90 shadow-xs' : 'border-slate-200'} p-5 flex flex-col justify-between hover:shadow-md transition">
              <div class="space-y-3">
                <!-- Customer Header -->
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-extrabold text-slate-900 text-base leading-tight">${cust.name}</h3>
                    <p class="text-xs text-slate-500 font-mono mt-0.5">📞 ${cust.phone}</p>
                    ${cust.address ? `<p class="text-xs text-slate-400 mt-0.5 truncate max-w-xs">📍 ${cust.address}</p>` : ''}
                  </div>

                  <!-- Baqi Badge -->
                  <div class="text-right">
                    ${balance > 0 ? `
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200">
                        ₹${balance.toLocaleString('en-IN')} Baqi
                      </span>
                    ` : `
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Sab Chukta (₹0)
                      </span>
                    `}
                  </div>
                </div>

                <!-- Last Activity Note -->
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div class="flex justify-between text-slate-500 text-[11px]">
                    <span>Kul Udhaar: <strong>₹${totalCredit.toLocaleString('en-IN')}</strong></span>
                    <span>Kul Jama: <strong class="text-emerald-700">₹${totalPaid.toLocaleString('en-IN')}</strong></span>
                  </div>
                  ${lastTx ? `
                    <div class="text-[11px] text-slate-400 truncate pt-1 border-t border-slate-100">
                      Aakhri Entry: <strong>${lastTx.type === 'udhaar' ? 'Udhaar ₹' + lastTx.amount : 'Jama ₹' + lastTx.amount}</strong> (${new Date(lastTx.date).toLocaleDateString('en-IN')})
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Quick Action Buttons -->
              <div class="pt-4 border-t border-slate-100 space-y-2 mt-4">
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    onclick="window.app.quickAddTransaction('${cust.id}', 'udhaar')"
                    class="py-2 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition active:scale-95 flex items-center justify-center gap-1"
                  >
                    <span>+ Udhaar Diya</span>
                  </button>

                  <button 
                    onclick="window.app.quickAddTransaction('${cust.id}', 'jama')"
                    class="py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition active:scale-95 flex items-center justify-center gap-1"
                  >
                    <span>+ Jama Mila</span>
                  </button>
                </div>

                <div class="flex items-center gap-2">
                  <button 
                    onclick="window.app.openPassbookModal('${cust.id}')"
                    class="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span>Passbook</span>
                  </button>

                  ${balance > 0 ? `
                    <button 
                      onclick="window.app.sendCustomerWhatsAppReminder('${cust.id}')"
                      class="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1"
                      title="WhatsApp Payment Reminder Bhejein"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 2.01.815 3.09.816 3.183 0 5.769-2.587 5.769-5.768.001-3.181-2.584-5.768-5.764-5.768zm3.385 8.169c-.141.396-.713.727-1.026.772-.313.045-.694.077-2.18-.544-1.898-.79-3.123-2.736-3.218-2.862-.095-.126-.77-1.024-.77-1.954s.487-1.385.66-1.574c.173-.189.378-.236.504-.236.126 0 .252.002.363.007.117.006.273-.044.426.326.157.379.536 1.309.584 1.404.048.095.079.205.016.331-.063.126-.095.205-.189.315-.095.11-.199.245-.284.331-.095.095-.194.198-.083.388.11.189.49 0.808 1.05 1.307.72.641 1.327.84 1.516.935.189.095.3.079.41-.047.11-.126.473-.552.599-.741.126-.189.252-.158.426-.095.173.063 1.104.52 1.293.615.189.095.315.142.362.221.047.079.047.458-.094.854z"/></svg>
                      <span>Remind</span>
                    </button>
                  ` : ''}

                  <button 
                    onclick="window.app.printCustomerSlip('${cust.id}')"
                    class="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                    title="Print Bill Slip"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
};

// ==========================================
// 5. DAILY ROZNAMCHA (DAILY SALES & CASH REGISTER)
// ==========================================
DukaanOS.prototype.renderRoznamcha = function() {
  const todayStr = new Date().toISOString().slice(0, 10);
  let todayCashIn = 0;
  let todayExpense = 0;

  this.roznamcha.forEach(r => {
    if (r.date && r.date.startsWith(todayStr)) {
      if (r.type === 'cash_sale' || r.type === 'udhaar_jama') todayCashIn += Number(r.amount);
      if (r.type === 'expense') todayExpense += Number(r.amount);
    }
  });

  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Daily Roznamcha (रोज़नामचा - दैनिक गल्ला व रोकड़ बही)
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dukaan ke dalle (cash drawer) ki aamadni, kharcha aur din bhar ka cash hisab
          </p>
        </div>

        <button 
          onclick="window.app.openAddRoznamchaModal()"
          class="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-95"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          <span>+ Nayi Entry Jodein (Bikri / Kharch)</span>
        </button>
      </div>

      <!-- Cash in Drawer Summary -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span class="text-xs font-bold text-slate-500 uppercase">Aaj Cash Aaya (Cash In)</span>
          <div class="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">₹${todayCashIn.toLocaleString('en-IN')}</div>
          <p class="text-xs text-slate-400 mt-1">Walk-in Bikri + Udhaar Recovery</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span class="text-xs font-bold text-slate-500 uppercase">Aaj ka Kharch (Expenses)</span>
          <div class="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-2">₹${todayExpense.toLocaleString('en-IN')}</div>
          <p class="text-xs text-slate-400 mt-1">Chai, Bijli, Helper salary aadi</p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-emerald-300 bg-emerald-50/30 shadow-sm">
          <span class="text-xs font-bold text-emerald-800 uppercase">Net Galla Balance (Cash In Hand)</span>
          <div class="text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-2">₹${(todayCashIn - todayExpense).toLocaleString('en-IN')}</div>
          <p class="text-xs text-emerald-700 mt-1">Aaj dukaan ki tijori me rokada</p>
        </div>
      </div>

      <!-- Roznamcha Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-200 font-bold text-slate-900 text-sm flex justify-between items-center">
          <span>Haal hi ki Roznamcha Entries</span>
          <span class="text-xs text-slate-500">${this.roznamcha.length} Entries recorded</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Tarikh & Samay</th>
                <th class="py-3 px-4">Vivran (Description)</th>
                <th class="py-3 px-3">Type</th>
                <th class="py-3 px-3">Payment Mode</th>
                <th class="py-3 px-4 text-right">Raqam (Amount)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${this.roznamcha.length === 0 ? `
                <tr>
                  <td colspan="5" class="py-8 text-center text-slate-400">Roznamcha me koi entry nahi hai.</td>
                </tr>
              ` : this.roznamcha.map(rz => {
                const isExpense = rz.type === 'expense';
                return `
                  <tr class="hover:bg-slate-50 transition">
                    <td class="py-3 px-4 text-slate-500 font-mono">
                      ${new Date(rz.date).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td class="py-3 px-4 text-slate-900 font-bold">
                      ${rz.description}
                    </td>
                    <td class="py-3 px-3">
                      <span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        rz.type === 'cash_sale' ? 'bg-emerald-100 text-emerald-800' :
                        rz.type === 'udhaar_jama' ? 'bg-sky-100 text-sky-800' :
                        'bg-rose-100 text-rose-800'
                      }">
                        ${rz.type === 'cash_sale' ? 'Cash Bikri' : rz.type === 'udhaar_jama' ? 'Udhaar Jama' : 'Dukaan Kharch'}
                      </span>
                    </td>
                    <td class="py-3 px-3 text-slate-500">
                      ${rz.paymentMode || 'Cash'}
                    </td>
                    <td class="py-3 px-4 text-right font-extrabold text-sm ${isExpense ? 'text-rose-600' : 'text-emerald-700'}">
                      ${isExpense ? '-' : '+'}₹${Number(rz.amount).toLocaleString('en-IN')}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};

// ==========================================
// 6. DUKAAN SETTINGS
// ==========================================
DukaanOS.prototype.renderSettings = function() {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Dukaan Settings & Backup (दुकान सेटिंग्स)
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
          Apni dukaan ka naam, pata, phone number, low stock limit aur pura hisab save karein
        </p>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <form onsubmit="window.app.saveSettingsForm(event)" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Dukaan ka Naam (Shop Name)</label>
              <input 
                type="text" 
                id="settingShopName"
                value="${this.settings.shopName}"
                required
                class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Dukandar ka Naam (Owner)</label>
              <input 
                type="text" 
                id="settingOwnerName"
                value="${this.settings.ownerName}"
                required
                class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline / Subtitle</label>
            <input 
              type="text" 
              id="settingTagline"
              value="${this.settings.tagline}"
              class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Calling Phone Number</label>
              <input 
                type="text" 
                id="settingPhone"
                value="${this.settings.phone}"
                required
                class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp Number (with country code)</label>
              <input 
                type="text" 
                id="settingWhatsApp"
                value="${this.settings.whatsapp}"
                placeholder="e.g. 919876543210"
                required
                class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">UPI ID (GooglePay/PhonePe QR)</label>
              <input 
                type="text" 
                id="settingUpiId"
                value="${this.settings.upiId}"
                placeholder="e.g. shop@okaxis"
                class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Dukaan ka Pura Pata (Full Address)</label>
            <input 
              type="text" 
              id="settingAddress"
              value="${this.settings.address}"
              required
              class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Default Low Stock Alert Limit</label>
            <input 
              type="number" 
              id="settingLowStock"
              value="${this.settings.defaultLowStockThreshold}"
              min="1"
              max="50"
              class="w-48 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
            <p class="text-[11px] text-slate-400 mt-1">Jab kisi samaan ki quantity isse kam hogi toh dashboard par red alert aayega.</p>
          </div>

          <div class="pt-3">
            <button 
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition"
            >
              Settings Save Karein
            </button>
          </div>
        </form>
      </div>

      <!-- Backup, Restore & Reset -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 class="font-bold text-slate-900 text-base">Data Backup & Restore</h3>
        <p class="text-xs text-slate-500">
          Aapke dukaan ka pura data (customers, inventory, khata ledger) aapke computer/browser me secure save hai. Kabhi bhi file download karke backup le sakte hain.
        </p>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button 
            onclick="window.app.exportBackup()"
            class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            <span>Download Full Backup (JSON)</span>
          </button>

          <label class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            <span>Restore From File</span>
            <input type="file" accept=".json" onchange="window.app.importBackup(this)" class="hidden" />
          </label>

          <button 
            onclick="window.app.resetDemoData()"
            class="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 font-bold text-xs sm:text-sm transition"
          >
            Reset to Default Demo Data
          </button>
        </div>
      </div>
    </div>
  `;
};
