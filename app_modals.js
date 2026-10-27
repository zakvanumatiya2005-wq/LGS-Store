/**
 * DukaanOS - Modals, Event Listeners & Interactive Handlers
 */

// Modal Container Helpers
DukaanOS.prototype.showModal = function(htmlContent) {
  let modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modalContainer';
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden modal-enter">
        ${htmlContent}
      </div>
    </div>
  `;
};

DukaanOS.prototype.closeModal = function() {
  const modalContainer = document.getElementById('modalContainer');
  if (modalContainer) {
    modalContainer.innerHTML = '';
  }
};

// ==========================================
// INVENTORY MODALS
// ==========================================
DukaanOS.prototype.openAddItemModal = function() {
  const categoryOptions = CATEGORIES.filter(c => c.id !== 'all').map(c => `
    <option value="${c.id}">${c.name}</option>
  `).join('');

  this.showModal(`
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <span>📦 + Naya Samaan Jodein</span>
        </h3>
        <button onclick="window.app.closeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form onsubmit="window.app.handleSaveNewItem(event)" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Samaan ka Naam (Item Name) *</label>
          <input type="text" id="mItemName" required placeholder="e.g. Fancy Gota Patti Border Lace" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Category *</label>
            <select id="mItemCategory" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
              ${categoryOptions}
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Unit (Ikaai) *</label>
            <select id="mItemUnit" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
              <option value="Piece">Piece (Tukda / Nag)</option>
              <option value="Roll">Roll (Gatta)</option>
              <option value="Metre">Metre</option>
              <option value="Packet">Packet</option>
              <option value="Box">Box (Dabba)</option>
              <option value="Set">Set</option>
              <option value="Pair">Pair (Jodi)</option>
              <option value="Dozen">Dozen (Darjan)</option>
              <option value="Lachhi">Lachhi (Skein)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Wholesale Khareed (Cost ₹)</label>
            <input type="number" id="mItemCost" min="0" step="any" placeholder="0" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Grahak Bikri (MRP ₹) *</label>
            <input type="number" id="mItemSell" required min="1" step="any" placeholder="0" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Shuruati Stock (Qty) *</label>
            <input type="number" id="mItemStock" required min="0" value="10" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Low Stock Alert Limit</label>
            <input type="number" id="mItemLowLimit" min="1" value="${this.settings.defaultLowStockThreshold}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Description / Vivran</label>
          <textarea id="mItemDesc" rows="2" placeholder="Quality details, color, material..." class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"></textarea>
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" onclick="window.app.closeModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold">
            Radd Karein
          </button>
          <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md">
            Samaan Save Karein
          </button>
        </div>
      </form>
    </div>
  `);
};

DukaanOS.prototype.openEditItemModal = function(itemId) {
  const item = this.inventory.find(i => i.id === itemId);
  if (!item) return;

  const categoryOptions = CATEGORIES.filter(c => c.id !== 'all').map(c => `
    <option value="${c.id}" ${c.id === item.category ? 'selected' : ''}>${c.name}</option>
  `).join('');

  this.showModal(`
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <span>✏️ Edit Item: ${item.name}</span>
        </h3>
        <button onclick="window.app.closeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form onsubmit="window.app.handleSaveEditItem(event, '${item.id}')" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Samaan ka Naam *</label>
          <input type="text" id="mEditName" required value="${item.name}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Category *</label>
            <select id="mEditCategory" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
              ${categoryOptions}
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Unit *</label>
            <input type="text" id="mEditUnit" value="${item.unit}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Wholesale Cost (₹)</label>
            <input type="number" id="mEditCost" value="${item.costPrice}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Grahak Rate (MRP ₹) *</label>
            <input type="number" id="mEditSell" required value="${item.sellPrice}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Current Stock (Qty) *</label>
            <input type="number" id="mEditStock" required value="${item.stock}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Low Stock Alert Limit</label>
            <input type="number" id="mEditLowLimit" value="${item.lowStockLimit}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Special Badge</label>
          <input type="text" id="mEditBadge" value="${item.badge || ''}" placeholder="e.g. Bestseller, Festive Special" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>

        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Description</label>
          <textarea id="mEditDesc" rows="2" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600">${item.description || ''}</textarea>
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" onclick="window.app.closeModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold">
            Radd Karein
          </button>
          <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md">
            Update Karein
          </button>
        </div>
      </form>
    </div>
  `);
};

// ==========================================
// CUSTOMER & UDHAAR MODALS
// ==========================================
DukaanOS.prototype.openAddCustomerModal = function() {
  this.showModal(`
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <span>👤 + Naya Grahak Jodein</span>
        </h3>
        <button onclick="window.app.closeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form onsubmit="window.app.handleSaveNewCustomer(event)" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Grahak ka Naam (Customer Name) *</label>
          <input type="text" id="mCustName" required placeholder="e.g. Fatima Begum / Rizwan Master" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Mobile / WhatsApp Number *</label>
            <input type="tel" id="mCustPhone" required placeholder="9876543210" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Pichla Baqi Udhaar (Opening ₹)</label>
            <input type="number" id="mCustOpening" min="0" value="0" placeholder="0" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Pata / Mohalla (Address)</label>
          <input type="text" id="mCustAddress" placeholder="e.g. Moti Nagar, Clock Tower" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>

        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Notes / Khas Baatein</label>
          <textarea id="mCustNotes" rows="2" placeholder="e.g. Regular buyer, tailor discount applicable" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"></textarea>
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" onclick="window.app.closeModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold">
            Radd Karein
          </button>
          <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md">
            Grahak Jodein
          </button>
        </div>
      </form>
    </div>
  `);
};

// Quick Transaction Modal (Udhaar Diya ya Jama Mila)
DukaanOS.prototype.openRecordTxModal = function(selectedCustId = null, defaultType = 'udhaar') {
  const customerOptions = this.customers.map(c => `
    <option value="${c.id}" ${c.id === selectedCustId ? 'selected' : ''}>
      ${c.name} (${c.phone}) - Baqi: ₹${this.getCustomerBalance(c)}
    </option>
  `).join('');

  this.showModal(`
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <span>💰 Khata Entry: Udhaar ya Jama</span>
        </h3>
        <button onclick="window.app.closeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form onsubmit="window.app.handleSaveTransaction(event)" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Grahak Chunein (Select Customer) *</label>
          <select id="mTxCustomerId" required class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
            ${customerOptions}
          </select>
        </div>

        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Entry Type *</label>
          <div class="grid grid-cols-2 gap-3">
            <label class="flex items-center gap-2 p-3 rounded-xl border border-rose-200 bg-rose-50/50 cursor-pointer font-bold text-rose-800">
              <input type="radio" name="mTxType" value="udhaar" ${defaultType === 'udhaar' ? 'checked' : ''} />
              <span>+ Udhaar Diya (Credit)</span>
            </label>

            <label class="flex items-center gap-2 p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 cursor-pointer font-bold text-emerald-800">
              <input type="radio" name="mTxType" value="jama" ${defaultType === 'jama' ? 'checked' : ''} />
              <span>- Jama Mila (Payment Received)</span>
            </label>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Raqam (Amount ₹) *</label>
            <input type="number" id="mTxAmount" required min="1" step="any" placeholder="e.g. 500" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Payment Mode</label>
            <select id="mTxMode" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
              <option value="Cash">Cash (Rokad)</option>
              <option value="UPI / PhonePe">UPI / PhonePe / GPay</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit / Udhaar">Udhaar (No Payment)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Vivran / Samaan ke Naam (Details)</label>
          <input type="text" id="mTxDesc" placeholder="e.g. 2 Frocks + 3 Moti packet" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" onclick="window.app.closeModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold">
            Radd Karein
          </button>
          <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md">
            Entry Darj Karein
          </button>
        </div>
      </form>
    </div>
  `);
};

// Passbook Modal (Full customer ledger history)
DukaanOS.prototype.openPassbookModal = function(customerId) {
  const cust = this.customers.find(c => c.id === customerId);
  if (!cust) return;

  const balance = this.getCustomerBalance(cust);
  const totalCredit = this.getCustomerTotalCredit(cust);
  const totalPaid = this.getCustomerTotalPaid(cust);
  const transactions = cust.transactions || [];

  this.showModal(`
    <div class="p-6 space-y-4 max-w-2xl">
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="font-black text-slate-900 text-lg sm:text-xl">${cust.name}</h3>
            ${balance > 0 ? `
              <span class="px-2 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-700">
                ₹${balance.toLocaleString('en-IN')} Baqi
              </span>
            ` : `
              <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Sab Chukta (₹0)
              </span>
            `}
          </div>
          <p class="text-xs text-slate-500 mt-0.5">📞 ${cust.phone} • 📍 ${cust.address || 'Address not listed'}</p>
        </div>

        <div class="flex items-center gap-2">
          <button 
            onclick="window.app.printCustomerSlip('${cust.id}')"
            class="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Print Receipt Slip"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          </button>

          <button onclick="window.app.closeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      <!-- Balance Summary Header Cards -->
      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div class="text-[10px] uppercase font-bold text-slate-400">Kul Udhaar Diya</div>
          <div class="text-sm sm:text-base font-extrabold text-slate-800 mt-0.5">₹${totalCredit.toLocaleString('en-IN')}</div>
        </div>

        <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <div class="text-[10px] uppercase font-bold text-emerald-700">Kul Jama Aaya</div>
          <div class="text-sm sm:text-base font-extrabold text-emerald-800 mt-0.5">₹${totalPaid.toLocaleString('en-IN')}</div>
        </div>

        <div class="p-3 rounded-xl ${balance > 0 ? 'bg-rose-50 border border-rose-200' : 'bg-slate-50 border border-slate-200'}">
          <div class="text-[10px] uppercase font-bold ${balance > 0 ? 'text-rose-700' : 'text-slate-500'}">Net Baqi (Dues)</div>
          <div class="text-sm sm:text-base font-black ${balance > 0 ? 'text-rose-600' : 'text-emerald-700'} mt-0.5">
            ₹${balance.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <!-- Inline Quick Transaction Entry Box -->
      <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <span class="text-xs font-bold text-slate-700">+ Is Grahak ke Khate me Entry Karein</span>
        <form onsubmit="window.app.handleInlinePassbookTx(event, '${cust.id}')" class="flex flex-wrap gap-2 text-xs">
          <select id="mInType" class="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700">
            <option value="udhaar">Udhaar Diya (+)</option>
            <option value="jama">Jama Aaya (-)</option>
          </select>
          <input type="number" id="mInAmount" required min="1" placeholder="Raqam ₹" class="w-24 px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-900" />
          <input type="text" id="mInDesc" placeholder="Samaan / Vivran" class="flex-1 min-w-[130px] px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700" />
          <button type="submit" class="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition">
            Save
          </button>
        </form>
      </div>

      <!-- Transactions Timeline Table -->
      <div class="max-h-60 overflow-y-auto border border-slate-200 rounded-2xl">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-100 text-slate-500 uppercase tracking-wider text-[10px] sticky top-0">
            <tr>
              <th class="py-2.5 px-3">Tarikh</th>
              <th class="py-2.5 px-3">Vivran (Details)</th>
              <th class="py-2.5 px-3 text-right">Udhaar (+)</th>
              <th class="py-2.5 px-3 text-right">Jama (-)</th>
              <th class="py-2.5 px-3 text-right">Baqi (Bal)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-medium">
            ${transactions.length === 0 ? `
              <tr>
                <td colspan="5" class="py-6 text-center text-slate-400">Abhi tak koi transaction nahi hua hai.</td>
              </tr>
            ` : transactions.map(tx => `
              <tr class="hover:bg-slate-50">
                <td class="py-2.5 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                  ${new Date(tx.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td class="py-2.5 px-3">
                  <div class="font-bold text-slate-900">${tx.description}</div>
                  <div class="text-[10px] text-slate-400">${tx.mode || 'Cash'}</div>
                </td>
                <td class="py-2.5 px-3 text-right font-bold text-rose-600">
                  ${tx.type === 'udhaar' ? '₹' + tx.amount : '-'}
                </td>
                <td class="py-2.5 px-3 text-right font-bold text-emerald-700">
                  ${tx.type === 'jama' ? '₹' + tx.amount : '-'}
                </td>
                <td class="py-2.5 px-3 text-right font-bold text-slate-800">
                  ₹${tx.balanceAfter}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Action Footer -->
      <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        ${balance > 0 ? `
          <button 
            onclick="window.app.sendCustomerWhatsAppReminder('${cust.id}')"
            class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 2.01.815 3.09.816 3.183 0 5.769-2.587 5.769-5.768.001-3.181-2.584-5.768-5.764-5.768zm3.385 8.169c-.141.396-.713.727-1.026.772-.313.045-.694.077-2.18-.544-1.898-.79-3.123-2.736-3.218-2.862-.095-.126-.77-1.024-.77-1.954s.487-1.385.66-1.574c.173-.189.378-.236.504-.236.126 0 .252.002.363.007.117.006.273-.044.426.326.157.379.536 1.309.584 1.404.048.095.079.205.016.331-.063.126-.095.205-.189.315-.095.11-.199.245-.284.331-.095.095-.194.198-.083.388.11.189.49 0.808 1.05 1.307.72.641 1.327.84 1.516.935.189.095.3.079.41-.047.11-.126.473-.552.599-.741.126-.189.252-.158.426-.095.173.063 1.104.52 1.293.615.189.095.315.142.362.221.047.079.047.458-.094.854z"/></svg>
            <span>WhatsApp Reminder Bhejein</span>
          </button>
        ` : '<div></div>'}

        <div class="flex gap-2">
          <button 
            type="button" 
            onclick="window.app.printCustomerSlip('${cust.id}')"
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
          >
            Print Parchi
          </button>
          <button 
            type="button" 
            onclick="window.app.closeModal()" 
            class="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Band Karein
          </button>
        </div>
      </div>
    </div>
  `);
};

// Roznamcha Modal
DukaanOS.prototype.openAddRoznamchaModal = function() {
  this.showModal(`
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <span>💵 + Roznamcha / Galla Entry</span>
        </h3>
        <button onclick="window.app.closeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form onsubmit="window.app.handleSaveRoznamcha(event)" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Entry Type *</label>
          <select id="mRzType" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600">
            <option value="cash_sale">Walk-in Cash Bikri (Aamadni +)</option>
            <option value="udhaar_jama">Grahak Udhaar Jama (Payment +)</option>
            <option value="expense">Dukaan Kharch (Chai, Bill, Transport -)</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Raqam (Amount ₹) *</label>
            <input type="number" id="mRzAmount" required min="1" step="any" placeholder="e.g. 250" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Payment Mode</label>
            <select id="mRzMode" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
              <option value="Cash">Cash (Rokad)</option>
              <option value="UPI / PhonePe">UPI / Online</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Vivran (Description) *</label>
          <input type="text" id="mRzDesc" required placeholder="e.g. Customer cash sale / Chai nasta bill" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" onclick="window.app.closeModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold">
            Radd Karein
          </button>
          <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md">
            Galla Me Entry Karein
          </button>
        </div>
      </form>
    </div>
  `);
};

// Showcase Link & WhatsApp Share Modal
DukaanOS.prototype.shareShowcaseLink = function() {
  const currentUrl = window.location.href.split('?')[0] + '?mode=showcase';
  const shareText = `Assalamu Alaikum / Namaste! 🙏\n\nHumari dukaan *${this.settings.shopName}* ka Online Customer Showcase dekhein:\n${currentUrl}\n\nAap hamare sabhi laces, embroidery threads, frocks, bangles aur jewelry dekh sakte hain aur WhatsApp par inquire kar sakte hain!\n\n📍 ${this.settings.address}\n📞 Phone: ${this.settings.phone}`;

  this.showModal(`
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <span>📲 Share Online Showcase</span>
        </h3>
        <button onclick="window.app.closeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="space-y-3 text-xs">
        <p class="text-slate-600">
          Grahakon ko apni dukaan ka catalog WhatsApp par share karein ya link copy karke send karein:
        </p>

        <div class="p-3 bg-slate-100 rounded-xl font-mono text-xs break-all border border-slate-200">
          ${currentUrl}
        </div>

        <div class="flex flex-col gap-2 pt-2">
          <a 
            href="https://wa.me/?text=${encodeURIComponent(shareText)}" 
            target="_blank"
            class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.53 2.01.815 3.09.816 3.183 0 5.769-2.587 5.769-5.768.001-3.181-2.584-5.768-5.764-5.768zm3.385 8.169c-.141.396-.713.727-1.026.772-.313.045-.694.077-2.18-.544-1.898-.79-3.123-2.736-3.218-2.862-.095-.126-.77-1.024-.77-1.954s.487-1.385.66-1.574c.173-.189.378-.236.504-.236.126 0 .252.002.363.007.117.006.273-.044.426.326.157.379.536 1.309.584 1.404.048.095.079.205.016.331-.063.126-.095.205-.189.315-.095.11-.199.245-.284.331-.095.095-.194.198-.083.388.11.189.49 0.808 1.05 1.307.72.641 1.327.84 1.516.935.189.095.3.079.41-.047.11-.126.473-.552.599-.741.126-.189.252-.158.426-.095.173.063 1.104.52 1.293.615.189.095.315.142.362.221.047.079.047.458-.094.854z"/></svg>
            <span>WhatsApp Par Share Karein</span>
          </a>

          <button 
            type="button"
            onclick="navigator.clipboard.writeText('${currentUrl}'); window.app.showToast('Showcase Link copied to clipboard!', 'success');"
            class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
          >
            📋 Copy Catalog Link
          </button>
        </div>
      </div>
    </div>
  `);
};

// ==========================================
// FORM SUBMIT HANDLERS
// ==========================================
DukaanOS.prototype.handleSaveNewItem = function(event) {
  event.preventDefault();
  const name = document.getElementById('mItemName').value;
  const category = document.getElementById('mItemCategory').value;
  const unit = document.getElementById('mItemUnit').value;
  const costPrice = document.getElementById('mItemCost').value;
  const sellPrice = document.getElementById('mItemSell').value;
  const stock = document.getElementById('mItemStock').value;
  const lowStockLimit = document.getElementById('mItemLowLimit').value;
  const description = document.getElementById('mItemDesc').value;

  this.addItem({
    name, category, unit, costPrice, sellPrice, stock, lowStockLimit, description
  });
  this.closeModal();
};

DukaanOS.prototype.handleSaveEditItem = function(event, itemId) {
  event.preventDefault();
  const name = document.getElementById('mEditName').value;
  const category = document.getElementById('mEditCategory').value;
  const unit = document.getElementById('mEditUnit').value;
  const costPrice = document.getElementById('mEditCost').value;
  const sellPrice = document.getElementById('mEditSell').value;
  const stock = document.getElementById('mEditStock').value;
  const lowStockLimit = document.getElementById('mEditLowLimit').value;
  const badge = document.getElementById('mEditBadge').value;
  const description = document.getElementById('mEditDesc').value;

  this.updateItem(itemId, {
    name, category, unit, costPrice, sellPrice, stock, lowStockLimit, badge, description
  });
  this.closeModal();
};

DukaanOS.prototype.handleSaveNewCustomer = function(event) {
  event.preventDefault();
  const name = document.getElementById('mCustName').value;
  const phone = document.getElementById('mCustPhone').value;
  const address = document.getElementById('mCustAddress').value;
  const opening = document.getElementById('mCustOpening').value;
  const notes = document.getElementById('mCustNotes').value;

  this.addCustomer(name, phone, address, 5000, opening, notes);
  this.closeModal();
};

DukaanOS.prototype.handleSaveTransaction = function(event) {
  event.preventDefault();
  const customerId = document.getElementById('mTxCustomerId').value;
  const type = document.querySelector('input[name="mTxType"]:checked').value;
  const amount = document.getElementById('mTxAmount').value;
  const mode = document.getElementById('mTxMode').value;
  const desc = document.getElementById('mTxDesc').value;

  this.recordTransaction(customerId, type, amount, desc, mode);
  this.closeModal();
};

DukaanOS.prototype.handleInlinePassbookTx = function(event, customerId) {
  event.preventDefault();
  const type = document.getElementById('mInType').value;
  const amount = document.getElementById('mInAmount').value;
  const desc = document.getElementById('mInDesc').value;

  this.recordTransaction(customerId, type, amount, desc, 'Counter');
  this.openPassbookModal(customerId); // refresh modal
};

DukaanOS.prototype.quickAddTransaction = function(customerId, type) {
  this.openRecordTxModal(customerId, type);
};

DukaanOS.prototype.handleSaveRoznamcha = function(event) {
  event.preventDefault();
  const type = document.getElementById('mRzType').value;
  const amount = document.getElementById('mRzAmount').value;
  const mode = document.getElementById('mRzMode').value;
  const desc = document.getElementById('mRzDesc').value;

  this.roznamcha.unshift({
    id: 'rz-' + Date.now(),
    date: new Date().toISOString(),
    type: type,
    amount: Number(amount),
    description: desc,
    paymentMode: mode
  });

  this.saveAll();
  this.showToast('Roznamcha me entry save ho gayi!', 'success');
  this.closeModal();
  this.render();
};

DukaanOS.prototype.saveSettingsForm = function(event) {
  event.preventDefault();
  this.settings.shopName = document.getElementById('settingShopName').value.trim();
  this.settings.ownerName = document.getElementById('settingOwnerName').value.trim();
  this.settings.tagline = document.getElementById('settingTagline').value.trim();
  this.settings.phone = document.getElementById('settingPhone').value.trim();
  this.settings.whatsapp = document.getElementById('settingWhatsApp').value.trim();
  this.settings.upiId = document.getElementById('settingUpiId').value.trim();
  this.settings.address = document.getElementById('settingAddress').value.trim();
  this.settings.defaultLowStockThreshold = Number(document.getElementById('settingLowStock').value) || 5;

  this.saveAll();
  this.showToast('Dukaan Settings safalta-purvak save ho gayi!', 'success');
  this.render();
};

// Filter event dispatchers
DukaanOS.prototype.filterByCategory = function(catId) {
  this.inventoryFilter.category = catId;
  this.activeTab = 'inventory';
  this.render();
};

DukaanOS.prototype.filterLowStock = function() {
  this.inventoryFilter.stockStatus = 'low';
  this.inventoryFilter.category = 'all';
  this.activeTab = 'inventory';
  this.render();
};

DukaanOS.prototype.onInventorySearch = function(val) {
  this.inventoryFilter.search = val;
  this.render();
  const input = document.getElementById('inventorySearchInput');
  if (input) {
    input.focus();
    input.setSelectionRange(val.length, val.length);
  }
};

DukaanOS.prototype.setStockFilter = function(status) {
  this.inventoryFilter.stockStatus = status;
  this.render();
};

DukaanOS.prototype.setInventorySort = function(sortBy) {
  this.inventoryFilter.sortBy = sortBy;
  this.render();
};

DukaanOS.prototype.setShowcaseCategory = function(catId) {
  this.showcaseFilter.category = catId;
  this.render();
};

DukaanOS.prototype.onShowcaseSearch = function(val) {
  this.showcaseFilter.search = val;
  this.render();
};

DukaanOS.prototype.setShowcaseSort = function(sort) {
  this.showcaseFilter.sortBy = sort;
  this.render();
};

DukaanOS.prototype.onUdhaarSearch = function(val) {
  this.udhaarFilter.search = val;
  this.render();
};

DukaanOS.prototype.setUdhaarStatusFilter = function(status) {
  this.udhaarFilter.status = status;
  this.render();
};

DukaanOS.prototype.attachEventListeners = function() {
  // Empty stub for extensible native event handlers
};

DukaanOS.prototype.attachCustomerShowcaseListeners = function() {
  // Empty stub for customer showcase specific interactions
};
