// ============================================================
// FoodDB — Restaurant & Hawker Stall Database
// Design: Tropical Bauhaus — food culture is the hero
//
// Seed data from: Document 2 (pasted_content_4.txt) + research
// Sources: HPB SG FoodID, Michelin Guide, Makansutra, TimeOut SG
//
// Each restaurant has:
//   - Venue metadata (name, type, tier, region, awards)
//   - Signature dishes with nutritional health flags
//   - Cultural tags for search integration
//   - Icon placeholder (to be filled by Agent 5)
// ============================================================

export type RestaurantTier =
  | "hawker-legend"
  | "premium-local"
  | "fine-dining"
  | "chain"
  | "mamak"
  | "kopitiam";

export type AwardBadge =
  | "michelin-1"
  | "michelin-2"
  | "michelin-3"
  | "michelin-bib"
  | "makansutra-legend"
  | "worlds-50-best"
  | "asias-50-best";

export interface DishHealthFlag {
  flag: "high-sodium" | "high-fat" | "high-sugar" | "high-protein" | "low-calorie" | "balanced" | "soft-foods" | "spicy" | "halal" | "vegetarian";
  note?: string; // e.g. "Skip the soy sauce dip"
}

export interface RestaurantDish {
  name: string;
  description?: string;
  healthFlags: DishHealthFlag[];
  estimatedKcal?: number;
  iconUrl?: string;       // Filled by Agent 5 (AI-generated icon)
  foodDbId?: string;      // crId from SG FoodID if matched
}

export interface Restaurant {
  id: string;
  name: string;
  shortName: string;
  description: string;
  culturalNote?: string;
  operatingSince?: string;
  tier: RestaurantTier;
  awards: AwardBadge[];
  region: "singapore" | "penang" | "kl" | "malacca" | "johor" | "malaysia";
  area?: string;          // e.g. "Maxwell Food Centre", "Chinatown"
  ethnic: string[];       // e.g. ["chinese", "hainanese"]
  occasions: string[];    // e.g. ["hawker-lunch", "hawker-dinner"]
  dietary: string[];      // e.g. ["halal", "high-protein"]
  signatureDishes: RestaurantDish[];
  iconUrl?: string;       // Restaurant logo/icon (AI-generated)
  coverImageUrl?: string; // Cover photo (AI-generated or CDN)
  website?: string;
  michelinNote?: string;
}

// ── AI-Generated Dish Icons (CDN) ──────────────────────────────────────────
export const DISH_ICONS = {
  chickenRice: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-chicken-rice-jEx7hpSN4sNyLgknYYjZ5V.webp',
  laksa: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-laksa-ZPqe8d6QE2m2CZHufBGWfD.webp',
  charKwayTeow: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-char-kway-teow-5oTB4N8hDzaCuSPnwLfDWw.webp',
  bakKutTeh: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-bak-kut-teh-h5FoWgTKBNCvuMKiJhBt7u.webp',
  satay: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-satay-iopEU6XEM7q4B7UrLnzwyn.webp',
  hokkienMee: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-hokkien-mee-Rv4meGda3VLiFjSWUrBVoz.webp',
  chilliCrab: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-chilli-crab-emPuNdGYvUkdZ2eoGrzoNb.webp',
  wontonMee: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-wonton-mee-DhHNX4oq2YV9VLVufdarLc.webp',
  rotiCanai: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-roti-canai-BTzPMEPRrJJtmWAc4PtSQ2.webp',
  nasiLemak: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-nasi-lemak-igqE9jrWvzvXm9tmzmFM93.webp',
  nasiPadang: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-nasi-padang-DH3hvhWmsuXAvyNECGxgHw.webp',
  popiah: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-popiah-9KUzTBxwXZWMjixyKFPpBy.webp',
  kayaToast: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-kaya-toast-nMKXQQ6B49NBdfSU9vKUXv.webp',
  prawnMee: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-prawn-mee-7udqhfjhBJW2YGDsdodw7N.webp',
  meeRebus: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-mee-rebus-o43hBQbGFq2AxQRXHR33c7.webp',
};

// ── Seed Data ────────────────────────────────────────────────

export const RESTAURANTS: Restaurant[] = [

  // ── HAWKER LEGENDS ──────────────────────────────────────────

  {
    id: "tian-tian-chicken-rice",
    name: "Tian Tian Hainanese Chicken Rice",
    shortName: "Tian Tian",
    description: "Maxwell Food Centre's most famous stall — Singapore's unofficial national dish, poached or roasted chicken over fragrant rice cooked in chicken stock.",
    tier: "hawker-legend",
    awards: ["makansutra-legend"],
    region: "singapore",
    area: "Maxwell Food Centre, Chinatown",
    ethnic: ["chinese", "hainanese"],
    occasions: ["hawker-lunch", "hawker-dinner"],
    dietary: ["high-protein", "balanced"],
    signatureDishes: [
      {
        name: "Hainanese Chicken Rice (Poached)",
        description: "Silky poached chicken over fragrant rice, with chili sauce and ginger paste",
        healthFlags: [
          { flag: "balanced", note: "Clean, low-oil protein meal" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 600,
      },
      {
        name: "Hainanese Chicken Rice (Roasted)",
        description: "Roasted chicken with crispy skin over the same fragrant rice",
        healthFlags: [
          { flag: "high-protein" },
          { flag: "high-fat", note: "Skin adds saturated fat" },
        ],
        estimatedKcal: 680,
      },
    ],
  },

  {
    id: "hill-street-tai-hwa",
    name: "Hill Street Tai Hwa Pork Noodle",
    shortName: "Tai Hwa",
    description: "Singapore's most famous Bak Chor Mee — a Michelin-starred hawker stall serving minced pork noodles with vinegar and chili.",
    tier: "hawker-legend",
    awards: ["michelin-1"],
    region: "singapore",
    area: "Crawford Lane, Lavender",
    ethnic: ["chinese", "teochew"],
    occasions: ["hawker-breakfast", "hawker-lunch"],
    dietary: ["high-protein", "high-sodium"],
    signatureDishes: [
      {
        name: "Bak Chor Mee (Dry)",
        description: "Minced pork noodles tossed in vinegar and chili with pork liver and meatballs",
        healthFlags: [
          { flag: "high-sodium", note: "High sodium from soy sauce and vinegar" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 520,
      },
    ],
  },

  {
    id: "hong-kong-soya-sauce-chicken",
    name: "Hong Kong Soya Sauce Chicken Rice & Noodle",
    shortName: "Soya Sauce Chicken",
    description: "The world's cheapest Michelin-starred meal — soya sauce chicken over rice or noodles at Chinatown Complex.",
    tier: "hawker-legend",
    awards: ["michelin-1"],
    region: "singapore",
    area: "Chinatown Complex Food Centre",
    ethnic: ["chinese", "cantonese"],
    occasions: ["hawker-lunch", "hawker-dinner"],
    dietary: ["high-protein", "high-sodium"],
    signatureDishes: [
      {
        name: "Soya Sauce Chicken Noodles",
        description: "Tender soya sauce braised chicken over egg noodles",
        healthFlags: [
          { flag: "high-sodium", note: "Soy sauce marinade is high in sodium" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 480,
      },
      {
        name: "Soya Sauce Chicken Rice",
        description: "Soya sauce chicken over steamed white rice",
        healthFlags: [
          { flag: "high-sodium" },
          { flag: "balanced" },
        ],
        estimatedKcal: 520,
      },
    ],
  },

  {
    id: "no-signboard-seafood",
    name: "No Signboard Seafood",
    shortName: "No Signboard",
    description: "Famous for its white pepper crab — a Singapore seafood institution since 1970s.",
    tier: "premium-local",
    awards: [],
    region: "singapore",
    area: "Geylang / Esplanade",
    ethnic: ["chinese"],
    occasions: ["dinner", "festive"],
    dietary: ["high-fat", "high-sodium"],
    signatureDishes: [
      {
        name: "White Pepper Crab",
        description: "Whole Sri Lankan crab wok-fried in white pepper sauce",
        healthFlags: [
          { flag: "high-fat", note: "Flag for health-conscious users" },
          { flag: "high-sodium" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 420,
      },
      {
        name: "Chili Crab",
        description: "Singapore's national dish — crab in sweet, spicy tomato-egg gravy",
        healthFlags: [
          { flag: "high-fat" },
          { flag: "high-sodium" },
          { flag: "spicy" },
        ],
        estimatedKcal: 380,
      },
    ],
  },

  // ── PREMIUM LOCAL INSTITUTIONS ───────────────────────────────

  {
    id: "jumbo-seafood",
    name: "Jumbo Seafood",
    shortName: "Jumbo",
    description: "Singapore's most iconic seafood restaurant chain, famous for chili crab and black pepper crab.",
    tier: "premium-local",
    awards: [],
    region: "singapore",
    area: "Clarke Quay / East Coast Seafood Centre",
    ethnic: ["chinese"],
    occasions: ["dinner", "festive"],
    dietary: ["high-fat", "high-sodium"],
    signatureDishes: [
      {
        name: "Chili Crab + Mantou",
        description: "Sri Lankan crab in signature sweet-spicy chili gravy with deep-fried buns",
        healthFlags: [
          { flag: "high-fat" },
          { flag: "high-sodium" },
          { flag: "spicy" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 650,
      },
      {
        name: "Black Pepper Crab",
        description: "Whole crab wok-fried in aromatic black pepper sauce",
        healthFlags: [
          { flag: "high-fat" },
          { flag: "high-sodium" },
          { flag: "spicy" },
        ],
        estimatedKcal: 580,
      },
    ],
  },

  {
    id: "song-fa-bak-kut-teh",
    name: "Song Fa Bak Kut Teh",
    shortName: "Song Fa",
    description: "Singapore's most famous Teochew-style Bak Kut Teh — peppery pork rib soup, a morning hawker tradition since 1969.",
    tier: "premium-local",
    awards: ["michelin-bib"],
    region: "singapore",
    area: "New Bridge Road / Chinatown",
    ethnic: ["chinese", "teochew"],
    occasions: ["hawker-breakfast", "hawker-lunch"],
    dietary: ["high-sodium", "high-protein"],
    signatureDishes: [
      {
        name: "Pork Rib Soup (Bak Kut Teh)",
        description: "Peppery clear broth with tender pork ribs — a Teochew morning ritual",
        healthFlags: [
          { flag: "high-sodium", note: "Critical for hypertension users — request less salt" },
          { flag: "high-protein" },
          { flag: "soft-foods", note: "Tender ribs suitable for seniors" },
        ],
        estimatedKcal: 350,
      },
    ],
  },

  {
    id: "banana-leaf-apolo",
    name: "The Banana Leaf Apolo",
    shortName: "Banana Leaf Apolo",
    description: "Little India's most iconic South Indian restaurant — fish head curry and banana leaf rice since 1974.",
    tier: "premium-local",
    awards: [],
    region: "singapore",
    area: "Little India, Race Course Road",
    ethnic: ["indian", "tamil"],
    occasions: ["lunch", "dinner"],
    dietary: ["halal", "vegetarian", "spicy"],
    signatureDishes: [
      {
        name: "Fish Head Curry",
        description: "Whole fish head in rich South Indian curry with vegetables",
        healthFlags: [
          { flag: "spicy" },
          { flag: "high-protein" },
          { flag: "high-sodium" },
        ],
        estimatedKcal: 420,
      },
      {
        name: "Banana Leaf Rice",
        description: "Steamed rice with multiple vegetable curries, papadum, and pickles on a banana leaf",
        healthFlags: [
          { flag: "vegetarian" },
          { flag: "balanced" },
          { flag: "spicy" },
        ],
        estimatedKcal: 580,
      },
    ],
  },

  // ── NOODLE & STREET ICONS ────────────────────────────────────

  {
    id: "328-katong-laksa",
    name: "328 Katong Laksa",
    shortName: "Katong Laksa",
    description: "The definitive Katong Laksa — thick coconut milk broth with cut noodles, eaten entirely with a spoon. A Peranakan-Chinese fusion icon.",
    tier: "hawker-legend",
    awards: ["makansutra-legend"],
    region: "singapore",
    area: "East Coast Road, Katong",
    ethnic: ["peranakan", "chinese"],
    occasions: ["hawker-breakfast", "hawker-lunch"],
    dietary: ["high-fat", "spicy"],
    signatureDishes: [
      {
        name: "Katong Laksa",
        description: "Thick coconut milk broth with prawns, cockles, fish cake, and cut bee hoon",
        healthFlags: [
          { flag: "high-fat", note: "Rich coconut milk — high in saturated fat" },
          { flag: "spicy" },
          { flag: "high-sodium" },
        ],
        estimatedKcal: 580,
      },
    ],
  },

  {
    id: "ah-hock-hokkien-mee",
    name: "Ah Hock Fried Hokkien Mee",
    shortName: "Ah Hock Hokkien Mee",
    description: "One of Singapore's most celebrated Hokkien Mee stalls — wet-style prawn noodles with rich prawn stock.",
    tier: "hawker-legend",
    awards: ["makansutra-legend"],
    region: "singapore",
    area: "Whampoa Drive Makan Place",
    ethnic: ["chinese", "hokkien"],
    occasions: ["hawker-dinner", "late-night"],
    dietary: ["high-sodium"],
    signatureDishes: [
      {
        name: "Fried Hokkien Mee",
        description: "Yellow noodles and bee hoon stir-fried with prawns, squid, and pork belly in prawn stock",
        healthFlags: [
          { flag: "high-sodium" },
          { flag: "high-fat" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 620,
      },
    ],
  },

  {
    id: "din-tai-fung-sg",
    name: "Din Tai Fung Singapore",
    shortName: "Din Tai Fung",
    description: "World-famous Taiwanese dim sum chain — precision-crafted Xiao Long Bao with exactly 18 folds, a Singapore institution.",
    tier: "chain",
    awards: ["michelin-1"],
    region: "singapore",
    area: "Multiple outlets (Paragon, ION, etc.)",
    ethnic: ["chinese", "taiwanese"],
    occasions: ["lunch", "dinner"],
    dietary: ["high-sodium"],
    signatureDishes: [
      {
        name: "Xiao Long Bao (Steamed Soup Dumplings)",
        description: "Delicate pork dumplings with hot soup inside — 18 precise folds each",
        healthFlags: [
          { flag: "high-sodium" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 280,
      },
      {
        name: "Shrimp Fried Rice",
        description: "Wok-fried rice with whole prawns and egg",
        healthFlags: [
          { flag: "high-sodium" },
          { flag: "balanced" },
        ],
        estimatedKcal: 480,
      },
    ],
  },

  // ── FINE DINING ──────────────────────────────────────────────

  {
    id: "odette-singapore",
    name: "Odette",
    shortName: "Odette",
    description: "Singapore's only 3-Michelin-star restaurant — modern French cuisine by Chef Julien Royer, ranked in Asia's 50 Best.",
    tier: "fine-dining",
    awards: ["michelin-3", "asias-50-best"],
    region: "singapore",
    area: "National Gallery Singapore, City Hall",
    ethnic: ["french"],
    occasions: ["dinner", "festive"],
    dietary: ["high-protein", "balanced"],
    michelinNote: "3 Michelin Stars — precision nutrition ideal for premium health tracking",
    signatureDishes: [
      {
        name: "Modern French Tasting Menu",
        description: "Seasonal 6-8 course tasting menu with local Singapore ingredients",
        healthFlags: [
          { flag: "balanced", note: "Precision nutrition — ideal for premium health tracking" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 1200,
      },
    ],
  },

  {
    id: "burnt-ends-singapore",
    name: "Burnt Ends",
    shortName: "Burnt Ends",
    description: "Modern Australian BBQ by Chef Dave Pynt — wood-fired meats in a counter-dining format. Michelin-starred and globally ranked.",
    tier: "fine-dining",
    awards: ["michelin-1", "worlds-50-best"],
    region: "singapore",
    area: "Teck Lim Road, Keong Saik",
    ethnic: ["western", "australian"],
    occasions: ["dinner"],
    dietary: ["high-protein", "high-fat"],
    signatureDishes: [
      {
        name: "Smoked Meats",
        description: "Wood-fired smoked beef, pork, and lamb from the custom dual-cavity oven",
        healthFlags: [
          { flag: "high-protein" },
          { flag: "high-fat" },
          { flag: "high-sodium" },
        ],
        estimatedKcal: 550,
      },
      {
        name: "Sanger (Pulled Pork Burger)",
        description: "Signature pulled pork burger with coleslaw and pickles",
        healthFlags: [
          { flag: "high-fat" },
          { flag: "high-sodium" },
          { flag: "high-protein" },
        ],
        estimatedKcal: 680,
      },
    ],
  },

  {
    id: "sushi-saito-singapore",
    name: "Sushi Saito Singapore",
    shortName: "Sushi Saito",
    description: "Singapore outpost of Tokyo's legendary Sushi Saito — omakase sushi with the finest Japanese ingredients.",
    tier: "fine-dining",
    awards: ["michelin-2"],
    region: "singapore",
    area: "Mandarin Oriental, Marina Bay",
    ethnic: ["japanese"],
    occasions: ["dinner", "festive"],
    dietary: ["high-protein", "balanced"],
    signatureDishes: [
      {
        name: "Omakase Sushi",
        description: "Chef's selection of seasonal nigiri sushi with premium fish",
        healthFlags: [
          { flag: "high-protein" },
          { flag: "balanced" },
          { flag: "high-sodium", note: "Soy sauce dipping adds sodium" },
        ],
        estimatedKcal: 800,
      },
    ],
  },

  // ── MALAYSIA ICONS ───────────────────────────────────────────

  {
    id: "penang-road-famous-teochew-cendol",
    name: "Penang Road Famous Teochew Cendol",
    shortName: "Penang Cendol",
    description: "Penang's most iconic cendol stall on Penang Road — the definitive version of this Southeast Asian dessert since 1936.",
    tier: "hawker-legend",
    awards: ["makansutra-legend"],
    region: "penang",
    area: "Penang Road, Georgetown",
    ethnic: ["chinese", "peranakan"],
    occasions: ["snack", "dessert"],
    dietary: ["vegetarian", "high-sugar"],
    signatureDishes: [
      {
        name: "Cendol",
        description: "Shaved ice with pandan jelly noodles, red beans, and gula melaka (palm sugar) syrup",
        healthFlags: [
          { flag: "high-sugar", note: "Gula melaka is high in sugar" },
          { flag: "vegetarian" },
        ],
        estimatedKcal: 320,
      },
    ],
  },

  {
    id: "nasi-kandar-line-clear",
    name: "Nasi Kandar Line Clear",
    shortName: "Line Clear",
    description: "Penang's most legendary Nasi Kandar stall — open 24 hours, a Muslim Indian-Malay rice dish with rich curries.",
    tier: "hawker-legend",
    awards: ["makansutra-legend"],
    region: "penang",
    area: "Penang Road / Jalan Masjid Kapitan Keling",
    ethnic: ["indian", "mamak"],
    occasions: ["hawker-breakfast", "hawker-lunch", "hawker-dinner", "late-night"],
    dietary: ["halal", "high-sodium", "spicy"],
    signatureDishes: [
      {
        name: "Nasi Kandar",
        description: "Steamed rice with a selection of rich curries — chicken, fish, vegetables, and eggs",
        healthFlags: [
          { flag: "halal" },
          { flag: "high-sodium" },
          { flag: "high-fat", note: "Curry gravies are high in fat" },
          { flag: "spicy" },
        ],
        estimatedKcal: 720,
      },
    ],
  },

  {
    id: "village-park-restaurant",
    name: "Village Park Restaurant",
    shortName: "Village Park",
    description: "Damansara Uptown's most famous Nasi Lemak — consistently ranked Malaysia's best, with crispy fried chicken.",
    tier: "premium-local",
    awards: [],
    region: "kl",
    area: "Damansara Uptown, Petaling Jaya",
    ethnic: ["malay"],
    occasions: ["hawker-breakfast", "hawker-lunch"],
    dietary: ["halal", "high-fat", "high-sodium"],
    signatureDishes: [
      {
        name: "Nasi Lemak with Fried Chicken",
        description: "Coconut rice with crispy fried chicken, sambal, anchovies, peanuts, and cucumber",
        healthFlags: [
          { flag: "halal" },
          { flag: "high-fat", note: "Coconut rice + fried chicken — high in saturated fat" },
          { flag: "high-sodium" },
          { flag: "spicy", note: "Sambal can be very spicy" },
        ],
        estimatedKcal: 780,
      },
    ],
  },

  {
    id: "imbi-market-hokkien-mee",
    name: "Imbi Market Hokkien Mee",
    shortName: "Imbi Hokkien Mee",
    description: "KL's most famous Hokkien Mee — dark soy sauce style, very different from Singapore's version. A KL breakfast institution.",
    tier: "hawker-legend",
    awards: [],
    region: "kl",
    area: "Imbi Market, Bukit Bintang",
    ethnic: ["chinese", "hokkien"],
    occasions: ["hawker-breakfast", "hawker-lunch"],
    dietary: ["high-sodium", "high-fat"],
    signatureDishes: [
      {
        name: "KL Hokkien Mee (Dark Soy)",
        description: "Thick yellow noodles braised in dark soy sauce with pork lard, pork slices, and vegetables",
        healthFlags: [
          { flag: "high-sodium" },
          { flag: "high-fat", note: "Pork lard adds significant saturated fat" },
        ],
        estimatedKcal: 680,
      },
    ],
  },

];

// ── Helper Functions ─────────────────────────────────────────

export function getRestaurantById(id: string): Restaurant | undefined {
  return RESTAURANTS.find(r => r.id === id);
}

export function searchRestaurants(query: string): Restaurant[] {
  const q = query.toLowerCase();
  return RESTAURANTS.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.shortName.toLowerCase().includes(q) ||
    r.area?.toLowerCase().includes(q) ||
    r.signatureDishes.some(d => d.name.toLowerCase().includes(q)) ||
    r.ethnic.some(e => q.includes(e)) ||
    r.occasions.some(o => q.includes(o.replace("-", " ")))
  );
}

export function getRestaurantsByRegion(region: string): Restaurant[] {
  return RESTAURANTS.filter(r => r.region === region);
}

export function getRestaurantsByTier(tier: RestaurantTier): Restaurant[] {
  return RESTAURANTS.filter(r => r.tier === tier);
}

export function getRestaurantsByAward(award: AwardBadge): Restaurant[] {
  return RESTAURANTS.filter(r => r.awards.includes(award));
}

export function getMichelinRestaurants(): Restaurant[] {
  return RESTAURANTS.filter(r =>
    r.awards.some(a => a.startsWith("michelin"))
  );
}

export const TIER_LABELS: Record<RestaurantTier, string> = {
  "hawker-legend":  "Hawker Legend",
  "premium-local":  "Premium Local",
  "fine-dining":    "Fine Dining",
  "chain":          "Restaurant Chain",
  "mamak":          "Mamak Stall",
  "kopitiam":       "Kopitiam",
};

export const AWARD_LABELS: Record<AwardBadge, string> = {
  "michelin-1":       "Michelin ⭐",
  "michelin-2":       "Michelin ⭐⭐",
  "michelin-3":       "Michelin ⭐⭐⭐",
  "michelin-bib":     "Michelin Bib Gourmand",
  "makansutra-legend": "Makansutra Legend",
  "worlds-50-best":   "World's 50 Best",
  "asias-50-best":    "Asia's 50 Best",
};

export const HEALTH_FLAG_LABELS: Record<DishHealthFlag["flag"], { label: string; color: string; bg: string }> = {
  "high-sodium":   { label: "High Sodium ⚠",  color: "oklch(0.45 0.18 25)",  bg: "oklch(0.97 0.04 25)" },
  "high-fat":      { label: "High Fat ⚠",     color: "oklch(0.45 0.16 40)",  bg: "oklch(0.97 0.04 40)" },
  "high-sugar":    { label: "High Sugar ⚠",   color: "oklch(0.45 0.16 55)",  bg: "oklch(0.97 0.04 55)" },
  "high-protein":  { label: "High Protein ✓", color: "oklch(0.35 0.14 162)", bg: "oklch(0.95 0.04 162)" },
  "low-calorie":   { label: "Low Calorie ✓",  color: "oklch(0.35 0.14 200)", bg: "oklch(0.95 0.04 200)" },
  "balanced":      { label: "Balanced ✓",     color: "oklch(0.35 0.12 162)", bg: "oklch(0.95 0.04 162)" },
  "soft-foods":    { label: "Soft Foods ✓",   color: "oklch(0.35 0.12 240)", bg: "oklch(0.95 0.04 240)" },
  "spicy":         { label: "Spicy 🌶",        color: "oklch(0.45 0.20 15)",  bg: "oklch(0.97 0.04 15)" },
  "halal":         { label: "Halal ✓",        color: "oklch(0.35 0.14 140)", bg: "oklch(0.95 0.04 140)" },
  "vegetarian":    { label: "Vegetarian ✓",   color: "oklch(0.35 0.14 130)", bg: "oklch(0.95 0.04 130)" },
};

// ── Agent-scraped dishes (auto-updated) ────────────────────
// Last updated: 2026-03-26T09:22:03.025634+00:00
// Source: agent_data_merger.py
export const SCRAPED_DISHES: Record<string, ScrapedDish[]> = {
  "tian-tian": [
    {
        "name": "Steamed Chicken Rice (Small)",
        "description": "Silky poached chicken on fragrant rice, with dark soy and chilli",
        "category": "Chicken Rice",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 62,
            "fat_g": 12,
            "sodium_mg": 780,
            "fibre_g": 1.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Steamed Chicken Rice (Large)",
        "description": "Full portion steamed chicken with ginger-infused rice",
        "category": "Chicken Rice",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 38,
            "carb_g": 82,
            "fat_g": 16,
            "sodium_mg": 1050,
            "fibre_g": 1.4,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1050mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "38g protein"
            }
        ]
    },
    {
        "name": "Roasted Chicken Rice",
        "description": "Crispy-skinned roast chicken on garlic rice",
        "category": "Chicken Rice",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 30,
            "carb_g": 65,
            "fat_g": 18,
            "sodium_mg": 850,
            "fibre_g": 1.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "30g protein"
            }
        ]
    },
    {
        "name": "Chicken Drumstick Rice",
        "description": "Whole drumstick, steamed or roasted",
        "category": "Chicken Rice",
        "estimatedKcal": 680,
        "nutrition": {
            "protein_g": 42,
            "carb_g": 68,
            "fat_g": 20,
            "sodium_mg": 920,
            "fibre_g": 1.2,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "42g protein"
            }
        ]
    },
    {
        "name": "Chicken Soup",
        "description": "Clear chicken broth with ginger and spring onion",
        "category": "Sides",
        "estimatedKcal": 45,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 2,
            "fat_g": 2,
            "sodium_mg": 380,
            "fibre_g": 0.2,
            "gi": 20
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Chilli Sauce",
        "description": "House-made chilli with lime and ginger",
        "category": "Condiment",
        "estimatedKcal": 25,
        "nutrition": {
            "protein_g": 0.5,
            "carb_g": 5,
            "fat_g": 0.5,
            "sodium_mg": 180,
            "fibre_g": 0.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 0.5,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "song-fa": [
    {
        "name": "Pork Rib Soup (Bak Kut Teh)",
        "description": "Peppery herbal pork rib soup, Teochew style",
        "category": "Bak Kut Teh",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 32,
            "carb_g": 5,
            "fat_g": 24,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 10.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1100mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "32g protein"
            }
        ]
    },
    {
        "name": "Pork Belly Soup",
        "description": "Slow-simmered pork belly in herbal broth",
        "category": "Bak Kut Teh",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 4,
            "fat_g": 30,
            "sodium_mg": 1050,
            "fibre_g": 0.4,
            "gi": 28
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 9.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1050mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "30g fat"
            },
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Pig Trotters",
        "description": "Braised trotters in dark soy and spices",
        "category": "Mains",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 8,
            "fat_g": 40,
            "sodium_mg": 980,
            "fibre_g": 0.6,
            "gi": 35
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "40g fat"
            },
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "You Tiao (Dough Fritters)",
        "description": "Crispy fried dough for dipping in soup",
        "category": "Sides",
        "estimatedKcal": 301,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 42,
            "fat_g": 11,
            "sodium_mg": 420,
            "fibre_g": 1.8,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Braised Peanuts",
        "description": "Slow-cooked peanuts in soy sauce",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 12,
            "fat_g": 12,
            "sodium_mg": 320,
            "fibre_g": 2.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Steamed Rice",
        "description": "Fragrant jasmine rice",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 4,
            "carb_g": 40,
            "fat_g": 0.5,
            "sodium_mg": 5,
            "fibre_g": 0.5,
            "gi": 72
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "tai-hwa": [
    {
        "name": "Bak Chor Mee (Dry)",
        "description": "Minced pork noodles with vinegar, chilli, lard, mushrooms",
        "category": "Noodles",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 68,
            "fat_g": 14,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 58
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1200mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Bak Chor Mee (Soup)",
        "description": "Minced pork noodles in clear pork broth",
        "category": "Noodles",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 26,
            "carb_g": 65,
            "fat_g": 12,
            "sodium_mg": 1100,
            "fibre_g": 1.8,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1100mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "26g protein"
            }
        ]
    },
    {
        "name": "Mee Pok (Flat Noodles)",
        "description": "Flat yellow noodles with pork and mushrooms",
        "category": "Noodles",
        "estimatedKcal": 490,
        "nutrition": {
            "protein_g": 24,
            "carb_g": 70,
            "fat_g": 12,
            "sodium_mg": 1150,
            "fibre_g": 1.8,
            "gi": 58
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1150mg sodium"
            }
        ]
    },
    {
        "name": "Kway Teow (Flat Rice Noodles)",
        "description": "Silky flat rice noodles in pork broth",
        "category": "Noodles",
        "estimatedKcal": 460,
        "nutrition": {
            "protein_g": 22,
            "carb_g": 72,
            "fat_g": 10,
            "sodium_mg": 1050,
            "fibre_g": 1.5,
            "gi": 60
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1050mg sodium"
            }
        ]
    },
    {
        "name": "Pork Liver Add-on",
        "description": "Sliced pork liver, blanched",
        "category": "Add-ons",
        "estimatedKcal": 80,
        "nutrition": {
            "protein_g": 12,
            "carb_g": 2,
            "fat_g": 3,
            "sodium_mg": 280,
            "fibre_g": 0.2,
            "gi": 25
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "80 kcal"
            }
        ]
    },
    {
        "name": "Fishball Add-on",
        "description": "Handmade fishballs",
        "category": "Add-ons",
        "estimatedKcal": 80,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 8,
            "fat_g": 2,
            "sodium_mg": 320,
            "fibre_g": 0.5,
            "gi": 48
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "liao-fan": [
    {
        "name": "Soya Sauce Chicken Rice",
        "description": "Braised soy chicken on rice — Michelin-starred hawker",
        "category": "Chicken Rice",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 30,
            "carb_g": 58,
            "fat_g": 14,
            "sodium_mg": 920,
            "fibre_g": 0.8,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "30g protein"
            }
        ]
    },
    {
        "name": "Soya Sauce Chicken Noodles",
        "description": "Braised soy chicken on egg noodles",
        "category": "Noodles",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 55,
            "fat_g": 13,
            "sodium_mg": 900,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Char Siu (BBQ Pork) Rice",
        "description": "Cantonese-style BBQ pork on rice",
        "category": "Mains",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 26,
            "carb_g": 62,
            "fat_g": 18,
            "sodium_mg": 980,
            "fibre_g": 0.8,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "26g protein"
            }
        ]
    },
    {
        "name": "Roasted Pork (Sio Bak) Rice",
        "description": "Crispy roasted pork belly on rice",
        "category": "Mains",
        "estimatedKcal": 560,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 60,
            "fat_g": 22,
            "sodium_mg": 1020,
            "fibre_g": 0.8,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1020mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Mixed Meat Rice",
        "description": "Combination of soy chicken, char siu, and sio bak",
        "category": "Mains",
        "estimatedKcal": 580,
        "nutrition": {
            "protein_g": 32,
            "carb_g": 62,
            "fat_g": 22,
            "sodium_mg": 1050,
            "fibre_g": 0.8,
            "gi": 62
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1050mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "32g protein"
            }
        ]
    },
    {
        "name": "Wonton Soup",
        "description": "Pork and prawn wontons in clear broth",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 10,
            "carb_g": 22,
            "fat_g": 6,
            "sodium_mg": 680,
            "fibre_g": 1.0,
            "gi": 52
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "roland-restaurant": [
    {
        "name": "Chilli Crab",
        "description": "Whole Sri Lankan crab in signature tomato-chilli gravy",
        "category": "Seafood",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 38,
            "carb_g": 22,
            "fat_g": 28,
            "sodium_mg": 1350,
            "fibre_g": 1.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 65.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1350mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "28g fat"
            },
            {
                "flag": "high-protein",
                "note": "38g protein"
            }
        ]
    },
    {
        "name": "Black Pepper Crab",
        "description": "Whole crab wok-fried with black pepper butter sauce",
        "category": "Seafood",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 36,
            "carb_g": 12,
            "fat_g": 28,
            "sodium_mg": 1280,
            "fibre_g": 1.0,
            "gi": 35
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 65.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1280mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "28g fat"
            },
            {
                "flag": "high-protein",
                "note": "36g protein"
            }
        ]
    },
    {
        "name": "Sambal Stingray",
        "description": "Grilled stingray with sambal belacan on banana leaf",
        "category": "Seafood",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 32,
            "carb_g": 12,
            "fat_g": 20,
            "sodium_mg": 1100,
            "fibre_g": 1.5,
            "gi": 38
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 28.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1100mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "32g protein"
            }
        ]
    },
    {
        "name": "Cereal Prawns",
        "description": "Tiger prawns fried with oat cereal and curry leaves",
        "category": "Seafood",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 28,
            "fat_g": 22,
            "sodium_mg": 880,
            "fibre_g": 2.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 32.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Fried Mantou",
        "description": "Deep-fried steamed buns for dipping in crab gravy",
        "category": "Sides",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 32,
            "fat_g": 8,
            "sodium_mg": 280,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Kangkong Belacan",
        "description": "Water spinach stir-fried with shrimp paste",
        "category": "Vegetables",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 8,
            "fat_g": 8,
            "sodium_mg": 680,
            "fibre_g": 2.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "jumbo-seafood": [
    {
        "name": "Chilli Crab + Mantou",
        "description": "Signature Sri Lankan crab in sweet-savoury chilli sauce",
        "category": "Seafood",
        "estimatedKcal": 680,
        "nutrition": {
            "protein_g": 40,
            "carb_g": 45,
            "fat_g": 30,
            "sodium_mg": 1450,
            "fibre_g": 1.5,
            "gi": 48
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 75.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1450mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "30g fat"
            },
            {
                "flag": "high-protein",
                "note": "40g protein"
            }
        ]
    },
    {
        "name": "Black Pepper Crab",
        "description": "Whole crab in aromatic black pepper butter",
        "category": "Seafood",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 36,
            "carb_g": 12,
            "fat_g": 28,
            "sodium_mg": 1280,
            "fibre_g": 1.0,
            "gi": 35
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 75.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1280mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "28g fat"
            },
            {
                "flag": "high-protein",
                "note": "36g protein"
            }
        ]
    },
    {
        "name": "Salted Egg Yolk Prawns",
        "description": "Tiger prawns coated in creamy salted egg yolk sauce",
        "category": "Seafood",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 30,
            "carb_g": 18,
            "fat_g": 32,
            "sodium_mg": 1050,
            "fibre_g": 0.8,
            "gi": 40
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 35.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1050mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "32g fat"
            },
            {
                "flag": "high-protein",
                "note": "30g protein"
            }
        ]
    },
    {
        "name": "Cereal Butter Prawns",
        "description": "Crispy prawns with oat cereal and curry leaves",
        "category": "Seafood",
        "estimatedKcal": 430,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 30,
            "fat_g": 22,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 45
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 32.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Fried Carrot Cake",
        "description": "Pan-fried radish cake with egg and preserved radish",
        "category": "Sides",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 45,
            "fat_g": 12,
            "sodium_mg": 700,
            "fibre_g": 2.0,
            "gi": 70
        },
        "confidence": "low",
        "source": "llm_estimated",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Sambal Kang Kong",
        "description": "Water spinach with sambal and dried shrimp",
        "category": "Vegetables",
        "estimatedKcal": 125,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 9,
            "fat_g": 8,
            "sodium_mg": 700,
            "fibre_g": 2.5,
            "gi": 25
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 14.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "ya-kun": [
    {
        "name": "Kaya Toast Set (2 slices)",
        "description": "Toasted bread with kaya jam and cold butter",
        "category": "Toast",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 6,
            "carb_g": 38,
            "fat_g": 12,
            "sodium_mg": 320,
            "fibre_g": 1.5,
            "gi": 68
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Soft Boiled Eggs (2 pcs)",
        "description": "Half-cooked eggs with dark soy and white pepper",
        "category": "Eggs",
        "estimatedKcal": 140,
        "nutrition": {
            "protein_g": 12,
            "carb_g": 1,
            "fat_g": 10,
            "sodium_mg": 180,
            "fibre_g": 0.0,
            "gi": 0
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "140 kcal"
            }
        ]
    },
    {
        "name": "French Toast",
        "description": "Deep-fried egg-coated bread with kaya and butter",
        "category": "Toast",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 48,
            "fat_g": 18,
            "sodium_mg": 380,
            "fibre_g": 1.5,
            "gi": 72
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Kaya Butter Toast (Thick)",
        "description": "Thick-sliced toasted bread with generous kaya and butter",
        "category": "Toast",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 7,
            "carb_g": 42,
            "fat_g": 14,
            "sodium_mg": 350,
            "fibre_g": 1.5,
            "gi": 70
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Teh (Milk Tea)",
        "description": "Traditional pulled milk tea",
        "category": "Beverages",
        "estimatedKcal": 80,
        "nutrition": {
            "protein_g": 2,
            "carb_g": 12,
            "fat_g": 2,
            "sodium_mg": 30,
            "fibre_g": 0.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Kopi (Coffee)",
        "description": "Traditional Hainanese coffee with condensed milk",
        "category": "Beverages",
        "estimatedKcal": 70,
        "nutrition": {
            "protein_g": 1,
            "carb_g": 10,
            "fat_g": 2,
            "sodium_mg": 20,
            "fibre_g": 0.0,
            "gi": 50
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Milo Dinosaur",
        "description": "Iced Milo topped with undissolved Milo powder",
        "category": "Beverages",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 4,
            "carb_g": 38,
            "fat_g": 5,
            "sodium_mg": 80,
            "fibre_g": 1.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "old-chang-kee": [
    {
        "name": "Curry Puff (Original)",
        "description": "Flaky pastry filled with curried potato and chicken",
        "category": "Snacks",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 6,
            "carb_g": 36,
            "fat_g": 12,
            "sodium_mg": 420,
            "fibre_g": 2.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.6,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Sardine Puff",
        "description": "Flaky pastry with spiced sardine filling",
        "category": "Snacks",
        "estimatedKcal": 260,
        "nutrition": {
            "protein_g": 7,
            "carb_g": 34,
            "fat_g": 11,
            "sodium_mg": 380,
            "fibre_g": 1.8,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.6,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Otah Puff",
        "description": "Pastry filled with spiced fish otah",
        "category": "Snacks",
        "estimatedKcal": 270,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 34,
            "fat_g": 12,
            "sodium_mg": 400,
            "fibre_g": 1.8,
            "gi": 62
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Chicken Wing",
        "description": "Marinated fried chicken wing",
        "category": "Snacks",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 18,
            "carb_g": 8,
            "fat_g": 14,
            "sodium_mg": 480,
            "fibre_g": 0.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.2,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "220 kcal"
            }
        ]
    },
    {
        "name": "Sotong Head (Squid)",
        "description": "Battered and fried squid head on a stick",
        "category": "Snacks",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 14,
            "carb_g": 16,
            "fat_g": 6,
            "sodium_mg": 380,
            "fibre_g": 0.8,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "180 kcal"
            }
        ]
    },
    {
        "name": "Prawn Roll",
        "description": "Crispy prawn roll in tofu skin",
        "category": "Snacks",
        "estimatedKcal": 200,
        "nutrition": {
            "protein_g": 10,
            "carb_g": 22,
            "fat_g": 8,
            "sodium_mg": 420,
            "fibre_g": 1.0,
            "gi": 58
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "bengawan-solo": [
    {
        "name": "Pandan Chiffon Cake",
        "description": "Light and fluffy pandan-flavoured chiffon cake",
        "category": "Cakes",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 6,
            "carb_g": 52,
            "fat_g": 10,
            "sodium_mg": 180,
            "fibre_g": 0.8,
            "gi": 68
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 18.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Kueh Lapis (Layer Cake)",
        "description": "Steamed layered Peranakan cake with spices",
        "category": "Kueh",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 58,
            "fat_g": 14,
            "sodium_mg": 220,
            "fibre_g": 0.5,
            "gi": 72
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 28.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Ondeh Ondeh",
        "description": "Glutinous rice balls with palm sugar and coconut",
        "category": "Kueh",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 2,
            "carb_g": 35,
            "fat_g": 4,
            "sodium_mg": 80,
            "fibre_g": 1.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Kueh Dadar (Pandan Crepe)",
        "description": "Pandan crepe filled with sweet coconut",
        "category": "Kueh",
        "estimatedKcal": 160,
        "nutrition": {
            "protein_g": 3,
            "carb_g": 28,
            "fat_g": 5,
            "sodium_mg": 95,
            "fibre_g": 1.8,
            "gi": 60
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Ang Ku Kueh (Red Tortoise Cake)",
        "description": "Glutinous rice skin with sweet bean filling",
        "category": "Kueh",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 4,
            "carb_g": 36,
            "fat_g": 3,
            "sodium_mg": 120,
            "fibre_g": 2.0,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Pineapple Tart",
        "description": "Buttery pastry with tangy pineapple jam",
        "category": "Pastries",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 3,
            "carb_g": 38,
            "fat_g": 13,
            "sodium_mg": 150,
            "fibre_g": 0.8,
            "gi": 68
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 22.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "lorong-selamat": [
    {
        "name": "Char Koay Teow (Regular)",
        "description": "Wok-fried flat rice noodles with cockles, egg, and bean sprouts",
        "category": "Noodles",
        "estimatedKcal": 560,
        "nutrition": {
            "protein_g": 18,
            "carb_g": 72,
            "fat_g": 22,
            "sodium_mg": 1200,
            "fibre_g": 2.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1200mg sodium"
            }
        ]
    },
    {
        "name": "Char Koay Teow (Special)",
        "description": "With extra prawns and cockles",
        "category": "Noodles",
        "estimatedKcal": 620,
        "nutrition": {
            "protein_g": 22,
            "carb_g": 74,
            "fat_g": 24,
            "sodium_mg": 1280,
            "fibre_g": 2.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1280mg sodium"
            }
        ]
    },
    {
        "name": "Char Koay Teow (No Cockles)",
        "description": "Without cockles for those who prefer",
        "category": "Noodles",
        "estimatedKcal": 540,
        "nutrition": {
            "protein_g": 16,
            "carb_g": 72,
            "fat_g": 20,
            "sodium_mg": 1150,
            "fibre_g": 2.5,
            "gi": 65
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1150mg sodium"
            }
        ]
    },
    {
        "name": "Iced Cendol",
        "description": "Shaved ice with pandan jelly, red beans, and coconut milk",
        "category": "Desserts",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 3,
            "carb_g": 55,
            "fat_g": 8,
            "sodium_mg": 80,
            "fibre_g": 2.0,
            "gi": 72
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "air-itam-laksa": [
    {
        "name": "Assam Laksa (Regular)",
        "description": "Sour fish broth with rice noodles, cucumber, and mint",
        "category": "Noodles",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 18,
            "carb_g": 58,
            "fat_g": 8,
            "sodium_mg": 980,
            "fibre_g": 3.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Assam Laksa (Large)",
        "description": "Large portion with extra fish flakes",
        "category": "Noodles",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 24,
            "carb_g": 72,
            "fat_g": 10,
            "sodium_mg": 1200,
            "fibre_g": 4.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1200mg sodium"
            }
        ]
    },
    {
        "name": "Prawn Mee",
        "description": "Spicy prawn broth with noodles and prawns",
        "category": "Noodles",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 22,
            "carb_g": 55,
            "fat_g": 12,
            "sodium_mg": 1100,
            "fibre_g": 2.0,
            "gi": 58
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1100mg sodium"
            }
        ]
    }
  ],
  "penang-road-teochew": [
    {
        "name": "Cendol",
        "description": "Shaved ice with pandan jelly, red beans, gula melaka, and coconut milk",
        "category": "Desserts",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 3,
            "carb_g": 55,
            "fat_g": 8,
            "sodium_mg": 80,
            "fibre_g": 2.0,
            "gi": 72
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Cendol with Red Bean",
        "description": "Extra red beans added",
        "category": "Desserts",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 62,
            "fat_g": 8,
            "sodium_mg": 90,
            "fibre_g": 3.5,
            "gi": 70
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Durian Cendol",
        "description": "Cendol topped with fresh durian flesh",
        "category": "Desserts",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 68,
            "fat_g": 16,
            "sodium_mg": 85,
            "fibre_g": 3.0,
            "gi": 68
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Ais Kacang",
        "description": "Shaved ice with mixed beans, jelly, and rose syrup",
        "category": "Desserts",
        "estimatedKcal": 260,
        "nutrition": {
            "protein_g": 4,
            "carb_g": 52,
            "fat_g": 6,
            "sodium_mg": 75,
            "fibre_g": 3.0,
            "gi": 68
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "nasi-kandar-pelita": [
    {
        "name": "Nasi Kandar (Mixed Rice)",
        "description": "Steamed rice with choice of curries and sides",
        "category": "Rice",
        "estimatedKcal": 680,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 82,
            "fat_g": 22,
            "sodium_mg": 1350,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1350mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Roti Canai",
        "description": "Flaky flatbread served with dhal and curry",
        "category": "Bread",
        "estimatedKcal": 300,
        "nutrition": {
            "protein_g": 7,
            "carb_g": 48,
            "fat_g": 10,
            "sodium_mg": 380,
            "fibre_g": 2.0,
            "gi": 68
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Teh Tarik",
        "description": "Pulled milk tea with frothy top",
        "category": "Beverages",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 2,
            "carb_g": 14,
            "fat_g": 2,
            "sodium_mg": 35,
            "fibre_g": 0.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Murtabak (Chicken)",
        "description": "Stuffed flatbread with spiced chicken and egg",
        "category": "Bread",
        "estimatedKcal": 580,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 62,
            "fat_g": 22,
            "sodium_mg": 980,
            "fibre_g": 2.5,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Murtabak (Mutton)",
        "description": "Stuffed flatbread with spiced mutton and egg",
        "category": "Bread",
        "estimatedKcal": 620,
        "nutrition": {
            "protein_g": 30,
            "carb_g": 62,
            "fat_g": 26,
            "sodium_mg": 1050,
            "fibre_g": 2.5,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 9.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1050mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "26g fat"
            },
            {
                "flag": "high-protein",
                "note": "30g protein"
            }
        ]
    },
    {
        "name": "Ayam Masak Merah",
        "description": "Chicken in spicy tomato-based sauce",
        "category": "Mains",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 28,
            "carb_g": 18,
            "fat_g": 22,
            "sodium_mg": 880,
            "fibre_g": 2.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "28g protein"
            }
        ]
    },
    {
        "name": "Dhal Curry",
        "description": "Lentil curry with spices",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 9,
            "carb_g": 28,
            "fat_g": 4,
            "sodium_mg": 480,
            "fibre_g": 6.0,
            "gi": 35
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "balanced",
                "note": "6.0g fibre"
            }
        ]
    }
  ],
  "village-park": [
    {
        "name": "Nasi Lemak with Fried Chicken",
        "description": "Coconut rice with crispy fried chicken, sambal, egg, and anchovies",
        "category": "Rice",
        "estimatedKcal": 780,
        "nutrition": {
            "protein_g": 35,
            "carb_g": 85,
            "fat_g": 32,
            "sodium_mg": 1250,
            "fibre_g": 3.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 9.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1250mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "32g fat"
            },
            {
                "flag": "high-protein",
                "note": "35g protein"
            }
        ]
    },
    {
        "name": "Nasi Lemak with Rendang",
        "description": "Coconut rice with beef rendang",
        "category": "Rice",
        "estimatedKcal": 820,
        "nutrition": {
            "protein_g": 38,
            "carb_g": 82,
            "fat_g": 36,
            "sodium_mg": 1300,
            "fibre_g": 3.5,
            "gi": 60
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 10.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1300mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "36g fat"
            },
            {
                "flag": "high-protein",
                "note": "38g protein"
            }
        ]
    },
    {
        "name": "Nasi Lemak (Plain)",
        "description": "Coconut rice with sambal, egg, and anchovies",
        "category": "Rice",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 12,
            "carb_g": 68,
            "fat_g": 18,
            "sodium_mg": 680,
            "fibre_g": 2.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Iced Teh Tarik",
        "description": "Iced pulled milk tea",
        "category": "Beverages",
        "estimatedKcal": 95,
        "nutrition": {
            "protein_g": 2,
            "carb_g": 15,
            "fat_g": 2,
            "sodium_mg": 35,
            "fibre_g": 0.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Iced Milo",
        "description": "Iced Milo drink",
        "category": "Beverages",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 3,
            "carb_g": 32,
            "fat_g": 4,
            "sodium_mg": 60,
            "fibre_g": 1.2,
            "gi": 60
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "capitol-satay": [
    {
        "name": "Satay Celup (per stick)",
        "description": "Skewered meats and vegetables dipped in peanut satay broth",
        "category": "Satay",
        "estimatedKcal": 80,
        "nutrition": {
            "protein_g": 6,
            "carb_g": 5,
            "fat_g": 4,
            "sodium_mg": 180,
            "fibre_g": 0.5,
            "gi": 45
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Satay Celup Set (20 sticks)",
        "description": "Mixed selection of 20 satay sticks",
        "category": "Satay",
        "estimatedKcal": 1600,
        "nutrition": {
            "protein_g": 120,
            "carb_g": 100,
            "fat_g": 80,
            "sodium_mg": 3600,
            "fibre_g": 10.0,
            "gi": 45
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 20.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "3600mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "80g fat"
            },
            {
                "flag": "high-protein",
                "note": "120g protein"
            },
            {
                "flag": "balanced",
                "note": "10.0g fibre"
            }
        ]
    },
    {
        "name": "Prawn Satay",
        "description": "Whole prawn on skewer",
        "category": "Satay",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 3,
            "fat_g": 5,
            "sodium_mg": 200,
            "fibre_g": 0.3,
            "gi": 40
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Fishball Satay",
        "description": "Handmade fishballs on skewer",
        "category": "Satay",
        "estimatedKcal": 70,
        "nutrition": {
            "protein_g": 6,
            "carb_g": 6,
            "fat_g": 2,
            "sodium_mg": 250,
            "fibre_g": 0.5,
            "gi": 50
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Pork Belly Satay",
        "description": "Marinated pork belly on skewer",
        "category": "Satay",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 4,
            "fat_g": 8,
            "sodium_mg": 220,
            "fibre_g": 0.3,
            "gi": 42
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.2,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Quail Egg Satay",
        "description": "Boiled quail eggs on skewer",
        "category": "Satay",
        "estimatedKcal": 60,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 1,
            "fat_g": 4,
            "sodium_mg": 120,
            "fibre_g": 0.0,
            "gi": 20
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "no-signboard": [
    {
        "name": "White Pepper Crab",
        "description": "Signature white pepper crab — the dish that made them famous",
        "category": "Seafood",
        "estimatedKcal": 460,
        "nutrition": {
            "protein_g": 36,
            "carb_g": 10,
            "fat_g": 26,
            "sodium_mg": 1200,
            "fibre_g": 1.0,
            "gi": 32
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 68.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1200mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "26g fat"
            },
            {
                "flag": "high-protein",
                "note": "36g protein"
            }
        ]
    },
    {
        "name": "Chilli Crab",
        "description": "Sri Lankan crab in sweet-spicy tomato gravy",
        "category": "Seafood",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 38,
            "carb_g": 22,
            "fat_g": 28,
            "sodium_mg": 1350,
            "fibre_g": 1.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 68.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1350mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "28g fat"
            },
            {
                "flag": "high-protein",
                "note": "38g protein"
            }
        ]
    },
    {
        "name": "Salted Egg Crab",
        "description": "Whole crab in creamy salted egg yolk sauce",
        "category": "Seafood",
        "estimatedKcal": 540,
        "nutrition": {
            "protein_g": 36,
            "carb_g": 14,
            "fat_g": 36,
            "sodium_mg": 1380,
            "fibre_g": 0.8,
            "gi": 38
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 70.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1380mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "36g fat"
            },
            {
                "flag": "high-protein",
                "note": "36g protein"
            }
        ]
    },
    {
        "name": "Fried Mantou",
        "description": "Deep-fried steamed buns",
        "category": "Sides",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 32,
            "fat_g": 8,
            "sodium_mg": 280,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Butter Prawns",
        "description": "Crispy prawns with butter and curry leaves",
        "category": "Seafood",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 26,
            "carb_g": 18,
            "fat_g": 24,
            "sodium_mg": 820,
            "fibre_g": 1.0,
            "gi": 42
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 30.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "26g protein"
            }
        ]
    },
    {
        "name": "Steamed Fish (Teochew Style)",
        "description": "Whole steamed fish with soy, ginger, and spring onion",
        "category": "Seafood",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 32,
            "carb_g": 6,
            "fat_g": 12,
            "sodium_mg": 980,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 35.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "280 kcal"
            },
            {
                "flag": "high-protein",
                "note": "32g protein"
            }
        ]
    }
  ],
  "toastbox": [
    {
        "name": "Kaya Butter Toast",
        "description": "Toasted bread with kaya and butter",
        "category": "Toast",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 6,
            "carb_g": 38,
            "fat_g": 12,
            "sodium_mg": 320,
            "fibre_g": 1.5,
            "gi": 68
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Soft Boiled Eggs",
        "description": "Two half-cooked eggs with soy sauce",
        "category": "Eggs",
        "estimatedKcal": 140,
        "nutrition": {
            "protein_g": 12,
            "carb_g": 1,
            "fat_g": 10,
            "sodium_mg": 180,
            "fibre_g": 0.0,
            "gi": 0
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "140 kcal"
            }
        ]
    },
    {
        "name": "Mee Siam",
        "description": "Spicy rice vermicelli in tangy gravy",
        "category": "Noodles",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 14,
            "carb_g": 68,
            "fat_g": 10,
            "sodium_mg": 980,
            "fibre_g": 3.0,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Laksa",
        "description": "Spicy coconut milk noodle soup",
        "category": "Noodles",
        "estimatedKcal": 580,
        "nutrition": {
            "protein_g": 22,
            "carb_g": 65,
            "fat_g": 26,
            "sodium_mg": 1280,
            "fibre_g": 3.0,
            "gi": 58
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 6.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1280mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "26g fat"
            }
        ]
    },
    {
        "name": "Nasi Lemak",
        "description": "Coconut rice with sambal, egg, and anchovies",
        "category": "Rice",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 12,
            "carb_g": 68,
            "fat_g": 18,
            "sodium_mg": 680,
            "fibre_g": 2.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Teh Tarik",
        "description": "Pulled milk tea",
        "category": "Beverages",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 2,
            "carb_g": 14,
            "fat_g": 2,
            "sodium_mg": 35,
            "fibre_g": 0.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.2,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Kopi C (Coffee with Evaporated Milk)",
        "description": "Traditional coffee with evaporated milk",
        "category": "Beverages",
        "estimatedKcal": 65,
        "nutrition": {
            "protein_g": 2,
            "carb_g": 9,
            "fat_g": 2,
            "sodium_mg": 25,
            "fibre_g": 0.0,
            "gi": 48
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "baba-charlie": [
    {
        "name": "Kueh Lapis (Layer Cake)",
        "description": "Traditional Nyonya layered steamed cake",
        "category": "Kueh",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 5,
            "carb_g": 58,
            "fat_g": 14,
            "sodium_mg": 220,
            "fibre_g": 0.5,
            "gi": 72
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 25.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Pulut Tai Tai (Blue Glutinous Rice)",
        "description": "Blue butterfly pea rice cake with kaya",
        "category": "Kueh",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 4,
            "carb_g": 52,
            "fat_g": 8,
            "sodium_mg": 120,
            "fibre_g": 1.5,
            "gi": 68
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Kueh Seri Muka",
        "description": "Glutinous rice with pandan custard top layer",
        "category": "Kueh",
        "estimatedKcal": 260,
        "nutrition": {
            "protein_g": 4,
            "carb_g": 48,
            "fat_g": 7,
            "sodium_mg": 110,
            "fibre_g": 1.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Ang Ku Kueh",
        "description": "Red tortoise cake with sweet filling",
        "category": "Kueh",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 4,
            "carb_g": 36,
            "fat_g": 3,
            "sodium_mg": 120,
            "fibre_g": 2.0,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Kueh Talam",
        "description": "Two-layered coconut and pandan kueh",
        "category": "Kueh",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 3,
            "carb_g": 42,
            "fat_g": 6,
            "sodium_mg": 95,
            "fibre_g": 1.5,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "peter-pork-ribs": [
    {
        "name": "Bak Kut Teh (Pork Ribs)",
        "description": "Peppery herbal pork rib soup",
        "category": "Bak Kut Teh",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 32,
            "carb_g": 5,
            "fat_g": 24,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 10.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1100mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "32g protein"
            }
        ]
    },
    {
        "name": "Spare Ribs Soup",
        "description": "Slow-simmered spare ribs in herbal broth",
        "category": "Bak Kut Teh",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 34,
            "carb_g": 6,
            "fat_g": 26,
            "sodium_mg": 1150,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1150mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "26g fat"
            },
            {
                "flag": "high-protein",
                "note": "34g protein"
            }
        ]
    },
    {
        "name": "Dry Bak Kut Teh",
        "description": "Dry-style with soy sauce and dried chillies",
        "category": "Bak Kut Teh",
        "estimatedKcal": 448,
        "nutrition": {
            "protein_g": 38,
            "carb_g": 8,
            "fat_g": 28,
            "sodium_mg": 1120,
            "fibre_g": 0.8,
            "gi": 35
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 14.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1120mg sodium"
            },
            {
                "flag": "high-fat",
                "note": "28g fat"
            },
            {
                "flag": "high-protein",
                "note": "38g protein"
            }
        ]
    },
    {
        "name": "Braised Pork Trotters",
        "description": "Slow-braised trotters in soy and spices",
        "category": "Mains",
        "estimatedKcal": 548,
        "nutrition": {
            "protein_g": 18,
            "carb_g": 78,
            "fat_g": 16,
            "sodium_mg": 1120,
            "fibre_g": 2.4,
            "gi": 70
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1120mg sodium"
            }
        ]
    },
    {
        "name": "You Tiao",
        "description": "Fried dough fritters",
        "category": "Sides",
        "estimatedKcal": 301,
        "nutrition": {
            "protein_g": 8,
            "carb_g": 42,
            "fat_g": 11,
            "sodium_mg": 420,
            "fibre_g": 1.8,
            "gi": 62
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "din-tai-fung": [
    {
        "name": "Xiao Long Bao (Steamed Soup Dumplings)",
        "description": "Signature pork soup dumplings, 10 pcs",
        "category": "Dumplings",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 18,
            "carb_g": 42,
            "fat_g": 14,
            "sodium_mg": 680,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 12.8,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Truffle Xiao Long Bao",
        "description": "Truffle-infused soup dumplings, 5 pcs",
        "category": "Dumplings",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 18,
            "carb_g": 44,
            "fat_g": 18,
            "sodium_mg": 720,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "curated_seed",
        "price_sgd": 18.8,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Shrimp & Pork Shao Mai",
        "description": "Open-top dumplings with shrimp and pork",
        "category": "Dumplings",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 16,
            "carb_g": 36,
            "fat_g": 12,
            "sodium_mg": 620,
            "fibre_g": 1.2,
            "gi": 52
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 12.8,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Shrimp Fried Rice",
        "description": "Wok-fried rice with whole prawns and egg",
        "category": "Rice",
        "estimatedKcal": 580,
        "nutrition": {
            "protein_g": 22,
            "carb_g": 72,
            "fat_g": 20,
            "sodium_mg": 980,
            "fibre_g": 2.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 14.8,
        "image_url": "",
        "healthFlags": []
    },
    {
        "name": "Braised Beef Noodles",
        "description": "Slow-braised beef shank in rich broth",
        "category": "Noodles",
        "estimatedKcal": 620,
        "nutrition": {
            "protein_g": 32,
            "carb_g": 68,
            "fat_g": 22,
            "sodium_mg": 1280,
            "fibre_g": 2.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 16.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "1280mg sodium"
            },
            {
                "flag": "high-protein",
                "note": "32g protein"
            }
        ]
    },
    {
        "name": "Steamed Chicken Soup",
        "description": "Double-boiled chicken soup with goji berries",
        "category": "Soups",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 18,
            "carb_g": 8,
            "fat_g": 8,
            "sodium_mg": 580,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 10.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "180 kcal"
            }
        ]
    },
    {
        "name": "Red Bean Xiao Long Bao",
        "description": "Sweet red bean soup dumplings, 5 pcs",
        "category": "Desserts",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 6,
            "carb_g": 48,
            "fat_g": 8,
            "sodium_mg": 180,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "curated_seed",
        "price_sgd": 8.8,
        "image_url": "",
        "healthFlags": []
    }
  ]
};

export interface ScrapedDish {
  name: string;
  description: string;
  category: string;
  estimatedKcal: number;
  nutrition: {
    protein_g: number;
    carb_g: number;
    fat_g: number;
    sodium_mg: number;
    fibre_g: number;
    gi: number;
  };
  confidence: string;
  source: string;
  price_sgd: number | null;
  image_url: string;
  healthFlags: Array<{ flag: string; note?: string }>;
}
