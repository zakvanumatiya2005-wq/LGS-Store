# 🏪 DukaanOS (स्मार्ट दुकान रिकॉर्ड, स्टॉक व ऑनलाइन शोकेस)

> **Complete Digital Shop Management & View-Only Customer Showcase Web Application**
> Specially designed for Indian & South Asian local retail merchants, matching centers, general stores, lace & thread shops, and garment retailers.

---

## 🌟 Key Modules & Features Overview

### 1. 📊 Dukaan ka Record & Dashboard
* **KPI Metrics**: Real-time counters for Total Samaan (Items), Total Quantity in Stock, Wholesale Stock Valuation (₹), Active Debtor Customers, and Total Udhaar Pending across the market.
* **Rozana Summary Overview**: Instant calculation of Today's Cash Collected (Bikri + Udhaar recovery), Today's Udhaar Given, and Net In-Hand Cash.
* **Low-Stock Alert Banners**: Prominent real-time alert highlighting items that drop below threshold limits.
* **Mandi / Wholesale Reorder Parchi**: 1-click printable purchasing list to take to the wholesale market with item name, current stock, and required reorder quantities.

---

### 2. 📦 Inventory & Stock Management
* **Full CRUD Operations**: Add new items, edit pricing/stock, update categories, and remove obsolete items.
* **Pre-loaded with Shop's Actual Stock (All 12 Requested Categories)**:
  1. **Bharat dora** (Anchor Resham skeins, Golden/Silver metallic zari spools, double-shade resham cording, white cotton chicken-kari dhaga).
  2. **Piping laces & other laces** (Golden satin piping dori, Rajasthani gota patti broad border, Hakoba cotton crochet lace, velvet cording piping, real mirror-work embroidered laces).
  3. **Tikdi** (Golden round flat 4mm sequins, Silver holographic bowl spangles, bridal antique bronze matte tikdi).
  4. **Moti** (Pure white glass pearls 4mm, cream off-white mala moti 6mm, golden metal fluted beads, micro seed pota beads).
  5. **Bachcho ke frocks** (Princess multi-layer net party frocks, breathable floral cotton casual frocks, royal velvet festive frocks, birthday silk flare frocks).
  6. **Jubbo ke buttons** (Golden metallic stud buttons for Jubbas/Kurtas, natural mother-of-pearl shell buttons, hanging brooch buttons, black enamel gold-rimmed buttons).
  7. **Bachcho ke chappal** (Kids light-up LED heel sandals, daily soft anti-slip EVA slippers, festive golden embroidered mojari/jutti).
  8. **Chudiya** (Velvet matte glass bangles box, unbreakable metal glitter bangles set, full bridal seep/acrylic chuda, gold-plated daily brass kangans).
  9. **Earrings** (Traditional Kundan meenakari jhumkas, oxidized vintage silver chandbali earrings, American Diamond stud cards).
  10. **Kanti** (Pearl & stone choker kanti sets, emerald green polki bridal kanti, velvet handcrafted thread kanti).
  11. **Haar** (Grand royal 5-layer Rani haar with pearls & green drops, festive temple-finish long necklaces).
  12. **Other General Items** (Rust-proof stainless steel safety pins boxes, tailoring triangle chalks, 1-inch elastic rolls, collar fusing canvas rolls, fancy bridal blouse latkans).
* **Inline Quick-Adjust Stock Buttons**: Instant `+1`, `-1`, and `+5` (Wholesale restock) buttons directly in the inventory table without opening full edit forms.
* **Low Stock Indicator**: Visual badges, pulses, and filter toggles whenever any item drops $\le$ the alert limit.

---

### 3. ✨ Online Customer Showcase (View-Only Digital Catalog)
* **Dedicated View-Only Customer Mode**: Clean, distraction-free online catalog mode that can be displayed on a counter tablet or shared with customers via WhatsApp link/QR.
* **Strictly View-Only (No Cart / No Online Payment)**: Customers can browse pictures, names, prices per unit, and descriptions, with explicit guidance to visit the physical store or order via WhatsApp.
* **"Inquire on WhatsApp" on Every Item**: 1-click button that opens WhatsApp prefilled with the exact item name, price, and inquiry text directed to the shopkeeper.
* **Store Calling & Direction Header**: Prominent shop address, opening timings (10:00 AM - 9:30 PM), phone call button, and WhatsApp chat button.

---

### 4. 📒 Udhaar Khata (Customer Credit Ledger)
* **Digital Khata Bahi**: Tracks every customer's name, mobile number, address/mohalla, total credit given, payments received, and net pending balance ($\text{Baqi } ₹$).
* **Passbook Timeline**: Full date-wise transaction history showing whether it was *Udhaar Diya (+)* or *Jama Mila (-)*, with payment mode (Cash, UPI/GPay, PhonePe).
* **WhatsApp Payment Reminders**: 1-click personalized payment reminder sent straight to the customer's WhatsApp with exact pending amount and shop UPI ID.
* **Thermal Receipt & Bill Printing**: Print instant customer receipts formatted for thermal receipt printers (2-inch/3-inch) or A4 paper with shop details, itemized ledger, and signature lines.

---

### 5. 💵 Daily Roznamcha (Cash Counter & Expense Register)
* **Galla (Cash Drawer) Tracker**: Tracks daily walk-in cash sales, customer udhaar collections, and shop expenses (tea/refreshments, electricity bill, staff helper wages, transport).
* **Net Cash In Hand**: Automatically calculates physical cash that should be in the dukaan's drawer at the end of the day.

---

### 6. ⚙️ Settings, Offline Storage & Backup
* **Zero Dependency / Offline-First**: Works 100% locally in any browser with `localStorage` persistence.
* **Data Backup & Restore**: Download complete Dukaan database as a JSON backup file anytime, or restore from a previously saved backup file.
* **Reset Demo Data**: Easily reload default authentic shop data whenever needed.

---

## 🚀 How to Run the Web App

### Option 1: Direct Browser Launch (Simplest)
Double-click `launch.bat` or open `index.html` directly in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox).

### Option 2: Local Web Server (For Network & Mobile Access)
If you want to view the app from other phones/tablets connected to the same Wi-Fi:
1. Open PowerShell in the `dukaan-os` directory.
2. Run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\serve.ps1
   ```
3. The server starts at `http://localhost:8080/` and automatically opens your default browser!

---

## 📁 File Structure

```
dukaan-os/
│
├── index.html       # Main responsive Single Page Application shell
├── data.js          # Pre-loaded shop inventory, customer accounts & categories
├── app.js           # Core state management, math engine & audio synthesizer
├── app_views.js     # Responsive view renderers (Dashboard, Inventory, Showcase, Udhaar, Roznamcha)
├── app_modals.js    # Interactive modals, forms, and WhatsApp action linkers
├── styles.css       # Tailwind enhancements, low-stock animations & print stylesheets
├── serve.ps1        # Pure PowerShell HttpListener web server
├── launch.bat       # Windows batch double-click launcher
└── README.md        # Complete operational documentation
```

---

*Powered by DukaanOS • Designed for South Asian Retail Merchants*
