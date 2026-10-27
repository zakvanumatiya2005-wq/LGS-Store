/**
 * DukaanOS - Initial Preloaded Data & Categories
 * Tailored specifically for Indian/South Asian Local Retail Dukaan
 */

const INITIAL_DUKAAN_SETTINGS = {
  shopName: "A-One Matching Center & General Store",
  tagline: "Laces, Threads, Bangles, Kids Wear & Fashion Accessories",
  ownerName: "Haji Mohammad Irfan",
  phone: "9876543210",
  whatsapp: "919876543210",
  address: "Shop No. 14, Main Bada Bazaar, Near Jama Masjid Gate, Market Road",
  upiId: "irfan.dukaan@oksbi",
  defaultLowStockThreshold: 5,
  currency: "₹"
};

const CATEGORIES = [
  { id: "all", name: "Sabhi Samaan (All)", icon: "grid", color: "indigo" },
  { id: "bharat_dora", name: "Bharat Dora (Embroidery Threads)", icon: "spool", color: "amber" },
  { id: "piping_laces", name: "Piping Laces & Other Laces", icon: "ribbon", color: "rose" },
  { id: "tikdi", name: "Tikdi (Sequins / Spangles)", icon: "sparkles", color: "yellow" },
  { id: "moti", name: "Moti (Beads & Pearls)", icon: "circle-dot", color: "emerald" },
  { id: "frocks", name: "Bachcho ke Frocks", icon: "shirt", color: "pink" },
  { id: "jubbo_buttons", name: "Jubbo ke Buttons", icon: "disc", color: "blue" },
  { id: "chappal", name: "Bachcho ke Chappal", icon: "footprints", color: "orange" },
  { id: "chudiya", name: "Chudiya (Bangles)", icon: "circle", color: "red" },
  { id: "earrings", name: "Earrings & Jhumkas", icon: "gem", color: "purple" },
  { id: "kanti", name: "Kanti (Chokers / Necklaces)", icon: "crown", color: "teal" },
  { id: "haar", name: "Haar (Royal Necklaces)", icon: "award", color: "violet" },
  { id: "general", name: "Other General Items", icon: "box", color: "slate" }
];

const INITIAL_INVENTORY = [
  // 1. Bharat dora
  {
    id: "item-bd-01",
    name: "Anchor Resham Bharat Dora (Assorted Colors)",
    category: "bharat_dora",
    categoryName: "Bharat Dora",
    unit: "Lachhi (Skein)",
    costPrice: 16,
    sellPrice: 25,
    stock: 120,
    lowStockLimit: 25,
    description: "Premium fast-color silk embroidery thread lachhi, non-fading shiny finish for suits and burqas.",
    sku: "BD-ANC-01",
    badge: "Fast Selling",
    imageUrl: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-bd-02",
    name: "Gold & Silver Metallic Zari Dora Spool",
    category: "bharat_dora",
    categoryName: "Bharat Dora",
    unit: "Spool",
    costPrice: 28,
    sellPrice: 45,
    stock: 45,
    lowStockLimit: 12,
    description: "2-ply durable metallic golden & silver zari thread for heavy bridal aari and zardozi work.",
    sku: "BD-ZAR-02",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-bd-03",
    name: "Resham Cording Thread Roll (Double Shade)",
    category: "bharat_dora",
    categoryName: "Bharat Dora",
    unit: "Roll",
    costPrice: 22,
    sellPrice: 35,
    stock: 15,
    lowStockLimit: 10,
    description: "Multi-color shaded resham thread for border embroidery and neck piping work.",
    sku: "BD-RSH-03",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-bd-04",
    name: "White Cotton Bharat Dhaga (Set of 12 Skeins)",
    category: "bharat_dora",
    categoryName: "Bharat Dora",
    unit: "Dozen Pack",
    costPrice: 120,
    sellPrice: 180,
    stock: 4,
    lowStockLimit: 6,
    description: "Pure cotton strong white embroidery thread for hand-stitching and chicken-kari embroidery.",
    sku: "BD-COT-04",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80"
  },

  // 2. Piping laces & other laces
  {
    id: "item-pl-01",
    name: "Golden Satin Ready-Made Piping Dori (25m)",
    category: "piping_laces",
    categoryName: "Piping laces & other laces",
    unit: "Roll",
    costPrice: 75,
    sellPrice: 120,
    stock: 22,
    lowStockLimit: 8,
    description: "High quality smooth satin ready-to-stitch piping dori for necklines, sleeves & kurti borders.",
    sku: "PL-SAT-01",
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-pl-02",
    name: "Fancy Gota Patti Broad Border Lace (9m)",
    category: "piping_laces",
    categoryName: "Piping laces & other laces",
    unit: "Roll",
    costPrice: 140,
    sellPrice: 220,
    stock: 14,
    lowStockLimit: 5,
    description: "Shining copper-gold Rajasthani Gota Patti lace for lehenga, dupatta and festival suits.",
    sku: "PL-GOT-02",
    badge: "Festive Special",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-pl-03",
    name: "White Cotton Crochet Hakoba Lace (9m)",
    category: "piping_laces",
    categoryName: "Piping laces & other laces",
    unit: "Roll",
    costPrice: 110,
    sellPrice: 165,
    stock: 18,
    lowStockLimit: 5,
    description: "Elegant floral cutwork cotton crochet lace for Pakistani suits, kurtas and dupattas.",
    sku: "PL-CRC-03",
    badge: "Trending",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-pl-04",
    name: "Velvet Cording Piping Lace (Red & Maroon)",
    category: "piping_laces",
    categoryName: "Piping laces & other laces",
    unit: "Roll",
    costPrice: 90,
    sellPrice: 145,
    stock: 3,
    lowStockLimit: 5,
    description: "Rich velvet covered piping with inner strong dori for heavy bridal velvet blousing.",
    sku: "PL-VEL-04",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-pl-05",
    name: "Real Mirror Work Embroidered Lace (9m)",
    category: "piping_laces",
    categoryName: "Piping laces & other laces",
    unit: "Roll",
    costPrice: 280,
    sellPrice: 420,
    stock: 2,
    lowStockLimit: 4,
    description: "Hand-finished glass mirror work colorful thread lace for wedding attire & chaniya choli.",
    sku: "PL-MIR-05",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
  },

  // 3. Tikdi
  {
    id: "item-tk-01",
    name: "Golden Round Flat Tikdi (4mm, 250g Packet)",
    category: "tikdi",
    categoryName: "Tikdi (Sequins / Spangles)",
    unit: "Packet",
    costPrice: 60,
    sellPrice: 95,
    stock: 35,
    lowStockLimit: 10,
    description: "250 grams pack of shiny golden flat sequins with center hole for machine & hand aari work.",
    sku: "TK-GLD-01",
    badge: "Bulk Stock",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-tk-02",
    name: "Silver Holographic Rainbow Tikdi (5mm, 200g)",
    category: "tikdi",
    categoryName: "Tikdi (Sequins / Spangles)",
    unit: "Packet",
    costPrice: 70,
    sellPrice: 110,
    stock: 22,
    lowStockLimit: 6,
    description: "Cup-shaped reflective holographic spangles for burqa sleeves, dupattas & party dresses.",
    sku: "TK-SLV-02",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-tk-03",
    name: "Antique Matte Bronze Tikdi (Bridal Quality)",
    category: "tikdi",
    categoryName: "Tikdi (Sequins / Spangles)",
    unit: "Packet",
    costPrice: 85,
    sellPrice: 135,
    stock: 3,
    lowStockLimit: 5,
    description: "Subtle royal antique bronze finish sequins preferred by top boutiques for sherwani work.",
    sku: "TK-ANT-03",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=600&q=80"
  },

  // 4. Moti
  {
    id: "item-mt-01",
    name: "Pure White Glass Pearls Moti (4mm - 500 Pcs)",
    category: "moti",
    categoryName: "Moti (Beads & Pearls)",
    unit: "Packet",
    costPrice: 50,
    sellPrice: 80,
    stock: 40,
    lowStockLimit: 10,
    description: "Smooth lustrous glass imitation pearls, color guaranteed not to peel or fade.",
    sku: "MT-WHT-01",
    badge: "Fast Selling",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-mt-02",
    name: "Cream Off-White Mala Moti (6mm - 300 Pcs)",
    category: "moti",
    categoryName: "Moti (Beads & Pearls)",
    unit: "Packet",
    costPrice: 58,
    sellPrice: 95,
    stock: 28,
    lowStockLimit: 8,
    description: "Classic bridal off-white beads for neck embroidery, latkans, and mala stringing.",
    sku: "MT-CRM-02",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-mt-03",
    name: "Golden Metal Fluted Spacers & Beads (150 Pcs)",
    category: "moti",
    categoryName: "Moti (Beads & Pearls)",
    unit: "Packet",
    costPrice: 80,
    sellPrice: 125,
    stock: 14,
    lowStockLimit: 5,
    description: "Non-tarnish brass metallic beads for fancy tassel latkans and heavy neckline borders.",
    sku: "MT-GLD-03",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-mt-04",
    name: "Micro Seed Moti / Pota Beads (100g Multi-pack)",
    category: "moti",
    categoryName: "Moti (Beads & Pearls)",
    unit: "Pack",
    costPrice: 42,
    sellPrice: 65,
    stock: 2,
    lowStockLimit: 8,
    description: "Ultra-fine seed beads for intricate zari-zardozi hand embroidery and jewelry detailing.",
    sku: "MT-SED-04",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1611591475879-c564344f6c43?auto=format&fit=crop&w=600&q=80"
  },

  // 5. Bachcho ke frocks
  {
    id: "item-fk-01",
    name: "Princess Multi-Layer Net Party Frock (2-4 Yrs)",
    category: "frocks",
    categoryName: "Bachcho ke frocks",
    unit: "Piece",
    costPrice: 280,
    sellPrice: 450,
    stock: 16,
    lowStockLimit: 5,
    description: "Stunning fluffy net frock with soft inner cotton lining, ribbon waist sash and pearl brooch.",
    sku: "FK-PRN-01",
    badge: "Top Choice",
    imageUrl: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-fk-02",
    name: "Cotton Floral Summer Casual Frock (1-3 Yrs)",
    category: "frocks",
    categoryName: "Bachcho ke frocks",
    unit: "Piece",
    costPrice: 170,
    sellPrice: 280,
    stock: 24,
    lowStockLimit: 6,
    description: "100% breathable pure cotton printed frock with cute frill sleeves for daily comfort wear.",
    sku: "FK-COT-02",
    badge: "Comfort Fit",
    imageUrl: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-fk-03",
    name: "Royal Velvet Festive Frock with Golden Border (3-6 Yrs)",
    category: "frocks",
    categoryName: "Bachcho ke frocks",
    unit: "Piece",
    costPrice: 420,
    sellPrice: 650,
    stock: 8,
    lowStockLimit: 3,
    description: "Heavy micro velvet festive frock in Maroon & Navy with rich zari hem for Eid and weddings.",
    sku: "FK-VLV-03",
    badge: "Festive Pick",
    imageUrl: "https://images.unsplash.com/photo-1543854538-e6b7226f987d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-fk-04",
    name: "Embroidered Silk Flare Birthday Frock (4-7 Yrs)",
    category: "frocks",
    categoryName: "Bachcho ke frocks",
    unit: "Piece",
    costPrice: 490,
    sellPrice: 750,
    stock: 3,
    lowStockLimit: 4,
    description: "Art silk designer frock with floral sequin yoke, flare gathers and matching back tie-belt.",
    sku: "FK-SLK-04",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
  },

  // 6. Jubbo ke buttons
  {
    id: "item-jb-01",
    name: "Golden Metallic Jubba Stud Buttons (Set of 6)",
    category: "jubbo_buttons",
    categoryName: "Jubbo ke buttons",
    unit: "Set (6 Pcs)",
    costPrice: 70,
    sellPrice: 120,
    stock: 32,
    lowStockLimit: 8,
    description: "Solid brass gold-electroplated link buttons designed for Arabic Thobes, Jubbas & Sherwanis.",
    sku: "JB-GLD-01",
    badge: "Hot Seller",
    imageUrl: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-jb-02",
    name: "Natural Mother-of-Pearl Shell Jubba Buttons (Set of 8)",
    category: "jubbo_buttons",
    categoryName: "Jubbo ke buttons",
    unit: "Set (8 Pcs)",
    costPrice: 60,
    sellPrice: 95,
    stock: 25,
    lowStockLimit: 6,
    description: "Genuine mother of pearl natural white iridescent buttons for premium kurta & thobe tailoring.",
    sku: "JB-SHL-02",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-jb-03",
    name: "Antique Stone-Studded Hanging Jubba Brooch Buttons",
    category: "jubbo_buttons",
    categoryName: "Jubbo ke buttons",
    unit: "Set (5 Pcs)",
    costPrice: 130,
    sellPrice: 220,
    stock: 12,
    lowStockLimit: 4,
    description: "Traditional chain-linked hanging buttons with emerald & ruby style stones for groom wear.",
    sku: "JB-STN-03",
    badge: "Royal Collection",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-jb-04",
    name: "Black Enamel Gold Rimmed Jubba Buttons (Set of 6)",
    category: "jubbo_buttons",
    categoryName: "Jubbo ke buttons",
    unit: "Set (6 Pcs)",
    costPrice: 85,
    sellPrice: 140,
    stock: 3,
    lowStockLimit: 5,
    description: "Sleek jet black enamel with 18k golden rim finish, clip-on design for easy washing.",
    sku: "JB-BLK-04",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1589134703703-52479e19d08e?auto=format&fit=crop&w=600&q=80"
  },

  // 7. Bachcho ke chappal
  {
    id: "item-cp-01",
    name: "Kids Light-Up LED Sole Sandals (Sizes 5 to 9)",
    category: "chappal",
    categoryName: "Bachcho ke chappal",
    unit: "Pair",
    costPrice: 195,
    sellPrice: 320,
    stock: 18,
    lowStockLimit: 5,
    description: "Flexible, soft sole walking sandals with cheerful LED lights in heel, velcro grip straps.",
    sku: "CP-LED-01",
    badge: "Kids Favorite",
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-cp-02",
    name: "Daily Soft EVA Anti-Slip Slippers (Cartoon Print)",
    category: "chappal",
    categoryName: "Bachcho ke chappal",
    unit: "Pair",
    costPrice: 80,
    sellPrice: 140,
    stock: 30,
    lowStockLimit: 8,
    description: "Featherlight waterproof EVA slippers for home and bathroom safety, durable soft foam.",
    sku: "CP-EVA-02",
    badge: "Daily Wear",
    imageUrl: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-cp-03",
    name: "Traditional Golden Embroidered Kids Mojari / Jutti",
    category: "chappal",
    categoryName: "Bachcho ke chappal",
    unit: "Pair",
    costPrice: 220,
    sellPrice: 380,
    stock: 5,
    lowStockLimit: 4,
    description: "Soft padded cushion ethnic footwear for boys & girls, pairs beautifully with kurta & frocks.",
    sku: "CP-JUT-03",
    badge: "Wedding Special",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
  },

  // 8. Chudiya
  {
    id: "item-ch-01",
    name: "Velvet Matte Glass Bangles Box (Set of 24, Maroon & Red)",
    category: "chudiya",
    categoryName: "Chudiya (Bangles)",
    unit: "Box (24 Pcs)",
    costPrice: 110,
    sellPrice: 180,
    stock: 25,
    lowStockLimit: 6,
    description: "Velvety smooth finish glass bangles with fine glitter edges in classic bridal dark shades.",
    sku: "CH-VLV-01",
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1611591475879-c564344f6c43?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-ch-02",
    name: "Lightweight Metal Glitter Bangles Pack (4 Dozen Set)",
    category: "chudiya",
    categoryName: "Chudiya (Bangles)",
    unit: "Pack (4 Dozen)",
    costPrice: 150,
    sellPrice: 240,
    stock: 19,
    lowStockLimit: 5,
    description: "Unbreakable daily-wear metal bangles with sparkling micro-powder finish, gold & green.",
    sku: "CH-MTL-02",
    badge: "Durable",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-ch-03",
    name: "Traditional Acrylic Bridal Chuda Set (Full Hand)",
    category: "chudiya",
    categoryName: "Chudiya (Bangles)",
    unit: "Complete Set",
    costPrice: 420,
    sellPrice: 650,
    stock: 6,
    lowStockLimit: 3,
    description: "Full bridal chuda with kundan kada, seep dot bangles and auspicious latkan rings.",
    sku: "CH-CHU-03",
    badge: "Bridal Pride",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-ch-04",
    name: "Gold-Plated Daily Wear Brass Kangan (Set of 4)",
    category: "chudiya",
    categoryName: "Chudiya (Bangles)",
    unit: "Set of 4",
    costPrice: 180,
    sellPrice: 290,
    stock: 2,
    lowStockLimit: 4,
    description: "Micro gold plated carved brass kada with lifetime finish for everyday elegant elegance.",
    sku: "CH-KNG-04",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"
  },

  // 9. Earrings
  {
    id: "item-er-01",
    name: "Royal Meenakari & Pearl Jhumkas (Gold-tone)",
    category: "earrings",
    categoryName: "Earrings",
    unit: "Pair",
    costPrice: 130,
    sellPrice: 220,
    stock: 22,
    lowStockLimit: 5,
    description: "Traditional bell-shaped jhumkas with colorful hand meenakari and dangling pearl clusters.",
    sku: "ER-JHM-01",
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-er-02",
    name: "Oxidized Silver Vintage Chandbali Earrings",
    category: "earrings",
    categoryName: "Earrings",
    unit: "Pair",
    costPrice: 90,
    sellPrice: 150,
    stock: 27,
    lowStockLimit: 6,
    description: "Antique silver crescent moon chandbali earrings with delicate ghungroo accents.",
    sku: "ER-CHN-02",
    badge: "Youth Trend",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-er-03",
    name: "Sparkling American Diamond Minimalist Studs (Card)",
    category: "earrings",
    categoryName: "Earrings",
    unit: "Card (6 Pairs)",
    costPrice: 55,
    sellPrice: 90,
    stock: 45,
    lowStockLimit: 12,
    description: "Card of 6 pairs of sparkling crystal everyday studs with secure hypoallergenic rubber backs.",
    sku: "ER-STD-03",
    badge: "Value Card",
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80"
  },

  // 10. Kanti
  {
    id: "item-kt-01",
    name: "Classic Pearl & Stone Choker Kanti with Matching Tops",
    category: "kanti",
    categoryName: "Kanti",
    unit: "Set",
    costPrice: 230,
    sellPrice: 380,
    stock: 11,
    lowStockLimit: 4,
    description: "Multi-row white pearl string necklace with center kundan floral pendant and adjustable dori.",
    sku: "KT-PRL-01",
    badge: "Bridal Favorite",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-kt-02",
    name: "Emerald Green & Polki Bridal Kanti Necklace",
    category: "kanti",
    categoryName: "Kanti",
    unit: "Set",
    costPrice: 340,
    sellPrice: 550,
    stock: 5,
    lowStockLimit: 3,
    description: "Royal green hanging drop beads with uncut polki finish collar necklace for formal receptions.",
    sku: "KT-EMR-02",
    badge: "Designer",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-kt-03",
    name: "Velvet Thread Handcrafted Floral Kanti",
    category: "kanti",
    categoryName: "Kanti",
    unit: "Piece",
    costPrice: 190,
    sellPrice: 320,
    stock: 2,
    lowStockLimit: 3,
    description: "Soft velvet back collar piece with mirror accents, safe and comfortable on sensitive skin.",
    sku: "KT-VLV-03",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1611591475879-c564344f6c43?auto=format&fit=crop&w=600&q=80"
  },

  // 11. Haar
  {
    id: "item-hr-01",
    name: "Grand Royal Rani Haar (5-Layer Pearls & Green Beads)",
    category: "haar",
    categoryName: "Haar",
    unit: "Full Set",
    costPrice: 520,
    sellPrice: 850,
    stock: 7,
    lowStockLimit: 3,
    description: "Magnificent long layered rani haar with matching earrings and maang tikka for brides.",
    sku: "HR-RNI-01",
    badge: "Royal Special",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-hr-02",
    name: "Festive Golden Temple Finish Long Haar",
    category: "haar",
    categoryName: "Haar",
    unit: "Set",
    costPrice: 390,
    sellPrice: 620,
    stock: 9,
    lowStockLimit: 3,
    description: "Antique matte gold-finished necklace with embossed peacock motifs and adjustable chain.",
    sku: "HR-TMP-02",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  },

  // 12. Other General Items
  {
    id: "item-gn-01",
    name: "Steel Rust-Proof Safety Pins Box (Pack of 100)",
    category: "general",
    categoryName: "Other General Items",
    unit: "Box",
    costPrice: 25,
    sellPrice: 45,
    stock: 50,
    lowStockLimit: 15,
    description: "High quality nickel-plated stainless steel sharp safety pins for hijabs, sarees & tailoring.",
    sku: "GN-PIN-01",
    badge: "Essential",
    imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-gn-02",
    name: "Tailoring Triangle Chalk (Box of 10 Assorted)",
    category: "general",
    categoryName: "Other General Items",
    unit: "Box",
    costPrice: 35,
    sellPrice: 60,
    stock: 30,
    lowStockLimit: 8,
    description: "Non-smudge fabric marking triangular chalks, easily brushes off without staining cloth.",
    sku: "GN-CHK-02",
    badge: "Tailor Choice",
    imageUrl: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-gn-03",
    name: "Premium Elastic Roll 1-Inch Width (25 Metres)",
    category: "general",
    categoryName: "Other General Items",
    unit: "Roll",
    costPrice: 100,
    sellPrice: 160,
    stock: 14,
    lowStockLimit: 5,
    description: "Strong high-stretch ribbed white elastic for pyjamas, skirts, salwars and baby dresses.",
    sku: "GN-ELS-03",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-gn-04",
    name: "Collar Fusing Canvas Roll (Heavy Quality, 20m)",
    category: "general",
    categoryName: "Other General Items",
    unit: "Roll",
    costPrice: 120,
    sellPrice: 190,
    stock: 3,
    lowStockLimit: 5,
    description: "Iron-on hot melt fusible interlining fabric for kurta collars, cuffs and thobe plackets.",
    sku: "GN-FUS-04",
    badge: "Low Stock Alert",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-gn-05",
    name: "Fancy Designer Heavy Blouse Latkans (Pair)",
    category: "general",
    categoryName: "Other General Items",
    unit: "Pair",
    costPrice: 50,
    sellPrice: 85,
    stock: 32,
    lowStockLimit: 10,
    description: "Ready-to-tie golden pearl tassels with hanging bells for bridal dori and lehenga ties.",
    sku: "GN-LTK-05",
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  }
];

const INITIAL_CUSTOMERS = [
  {
    id: "cust-01",
    name: "Fatima Begum",
    phone: "9876543210",
    address: "H.No. 42, Moti Nagar, Near Eidgah Ground",
    notes: "Regular customer for party frocks & bangles",
    creditLimit: 5000,
    createdAt: "2026-09-15T11:00:00Z",
    transactions: [
      {
        id: "tx-fb-01",
        date: "2026-10-15T14:30:00Z",
        type: "udhaar", // udhaar = credit given to customer (increases baqi)
        amount: 1710,
        description: "2 Kids Net Frocks + 2 Velvet Bangles Box",
        mode: "Credit / Udhaar",
        balanceAfter: 1710
      },
      {
        id: "tx-fb-02",
        date: "2026-10-20T17:15:00Z",
        type: "jama", // jama = payment received from customer (decreases baqi)
        amount: 700,
        description: "Cash paid at shop counter",
        mode: "Cash",
        balanceAfter: 1010
      },
      {
        id: "tx-fb-03",
        date: "2026-10-25T12:45:00Z",
        type: "udhaar",
        amount: 300,
        description: "Gota lace (1 roll) + 1 Moti packet",
        mode: "Credit / Udhaar",
        balanceAfter: 1310
      }
    ]
  },
  {
    id: "cust-02",
    name: "Mohd. Rizwan Master (Tailor)",
    phone: "9812345678",
    address: "Shop #5, Clock Tower Market, Opposite City Post Office",
    notes: "Professional ladies & gents master tailor, weekly bulk buying",
    creditLimit: 10000,
    createdAt: "2026-08-10T10:00:00Z",
    transactions: [
      {
        id: "tx-mr-01",
        date: "2026-10-02T16:00:00Z",
        type: "udhaar",
        amount: 1530,
        description: "10 Zari Spools + 5 Piping Dori + 4 Jubbo Buttons Sets",
        mode: "Credit / Udhaar",
        balanceAfter: 1530
      },
      {
        id: "tx-mr-02",
        date: "2026-10-10T18:30:00Z",
        type: "jama",
        amount: 1000,
        description: "PhonePe online transfer",
        mode: "UPI / PhonePe",
        balanceAfter: 530
      },
      {
        id: "tx-mr-03",
        date: "2026-10-18T11:20:00Z",
        type: "udhaar",
        amount: 350,
        description: "1 Canvas Fusing roll + 1 Elastic roll",
        mode: "Credit / Udhaar",
        balanceAfter: 880
      },
      {
        id: "tx-mr-04",
        date: "2026-10-24T19:00:00Z",
        type: "jama",
        amount: 500,
        description: "Cash payment",
        mode: "Cash",
        balanceAfter: 380
      }
    ]
  },
  {
    id: "cust-03",
    name: "Zubeda Bano",
    phone: "9823456789",
    address: "Bunglow 7, Civil Lines, Near Railway Station",
    notes: "Buys bridal jewelry and festive necklaces",
    creditLimit: 6000,
    createdAt: "2026-09-01T15:00:00Z",
    transactions: [
      {
        id: "tx-zb-01",
        date: "2026-10-12T16:45:00Z",
        type: "udhaar",
        amount: 1620,
        description: "1 Royal Rani Haar + 1 Pearl Choker Kanti + 1 Jhumka",
        mode: "Credit / Udhaar",
        balanceAfter: 1620
      },
      {
        id: "tx-zb-02",
        date: "2026-10-22T13:10:00Z",
        type: "jama",
        amount: 1000,
        description: "Google Pay payment",
        mode: "UPI / GPay",
        balanceAfter: 620
      }
    ]
  },
  {
    id: "cust-04",
    name: "Shabana Khatun",
    phone: "9898711223",
    address: "Gali No. 3, Purani Basti, Old City",
    notes: "Very punctual in payments, clears dues within 10 days",
    creditLimit: 4000,
    createdAt: "2026-08-20T09:30:00Z",
    transactions: [
      {
        id: "tx-sk-01",
        date: "2026-10-05T15:20:00Z",
        type: "udhaar",
        amount: 1950,
        description: "1 Bridal Chuda Set + 2 Velvet Frocks",
        mode: "Credit / Udhaar",
        balanceAfter: 1950
      },
      {
        id: "tx-sk-02",
        date: "2026-10-15T16:00:00Z",
        type: "jama",
        amount: 1950,
        description: "Full Udhaar paid in Cash (Hisab Chukta)",
        mode: "Cash",
        balanceAfter: 0
      }
    ]
  },
  {
    id: "cust-05",
    name: "Master Abdul Hameed (Boutique)",
    phone: "9765432109",
    address: "Hameed Fashion Studio, Main Bazar Complex, Shop #11",
    notes: "Orders Jubbo buttons and laces for designer kurtas",
    creditLimit: 8000,
    createdAt: "2026-10-01T12:00:00Z",
    transactions: [
      {
        id: "tx-ah-01",
        date: "2026-10-20T17:40:00Z",
        type: "udhaar",
        amount: 1340,
        description: "6 Sets Jubba Buttons + 4 Resham Dori + 2 Piping Laces",
        mode: "Credit / Udhaar",
        balanceAfter: 1340
      }
    ]
  }
];

const INITIAL_ROZNAMCHA = [
  {
    id: "rz-01",
    date: "2026-10-27T08:00:00Z",
    type: "cash_sale",
    amount: 1850,
    description: "Morning walk-in retail sales (Laces & Threads)",
    paymentMode: "Cash"
  },
  {
    id: "rz-02",
    date: "2026-10-27T09:30:00Z",
    type: "udhaar_jama",
    amount: 500,
    description: "Udhaar payment received from Rizwan Master",
    paymentMode: "Cash"
  },
  {
    id: "rz-03",
    date: "2026-10-27T10:15:00Z",
    type: "expense",
    amount: 60,
    description: "Chai & Biscuits for shop staff & customers",
    paymentMode: "Cash"
  }
];
