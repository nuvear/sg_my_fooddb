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

// ── Agent-scraped dishes (auto-updated) ────────────────────────────────────
// Last updated: 2026-03-31T09:21:53.676109+00:00
// Source: agent_data_merger.py
export const SCRAPED_DISHES: Record<string, ScrapedDish[]> = {
  "air-itam-laksa": [
    {
            "name": "Assam Laksa",
            "description": "A tangy and spicy fish-based noodle soup with tamarind, mackerel, pineapple, and fresh herbs, served with thick rice noodles.",
            "category": "Noodles",
            "estimatedKcal": 480,
            "nutrition": {
                    "protein_g": 20.0,
                    "carb_g": 70.0,
                    "fat_g": 12.0,
                    "sodium_mg": 1500,
                    "fibre_g": 3.5,
                    "gi": 52
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1500mg sodium per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Prawn Mee",
            "description": "A fragrant prawn broth noodle soup topped with fresh prawns, pork slices, boiled egg, and crunchy fried shallots.",
            "category": "Noodles",
            "estimatedKcal": 450,
            "nutrition": {
                    "protein_g": 26.0,
                    "carb_g": 55.0,
                    "fat_g": 14.0,
                    "sodium_mg": 1600,
                    "fibre_g": 2.5,
                    "gi": 52
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~26g per serving"
                    }
            ]
    },
    {
            "name": "Char Kway Teow",
            "description": "Wok-fried flat rice noodles with prawns, cockles, Chinese sausage, bean sprouts, and chives in a smoky, savory sauce.",
            "category": "Noodles",
            "estimatedKcal": 744,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 90.0,
                    "fat_g": 32.0,
                    "sodium_mg": 1800,
                    "fibre_g": 2.5,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1800mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~32g fat per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Nyonya Chap Chye",
            "description": "A hearty mixed vegetable stew featuring cabbage, turnip, mushrooms, and glass noodles simmered in a tangy, spiced gravy.",
            "category": "Side",
            "estimatedKcal": 150,
            "nutrition": {
                    "protein_g": 4.5,
                    "carb_g": 20.0,
                    "fat_g": 5.0,
                    "sodium_mg": 450,
                    "fibre_g": 5.0,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Otak Otak",
            "description": "Grilled fish paste wrapped in banana leaves, infused with coconut milk and aromatic spices, served as a flavorful snack.",
            "category": "Snack",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 15.0,
                    "carb_g": 8.0,
                    "fat_g": 9.0,
                    "sodium_mg": 450,
                    "fibre_g": 1.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Cendol",
            "description": "A refreshing dessert of shaved ice with pandan jelly, red beans, coconut milk, and gula melaka syrup.",
            "category": "Dessert",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 68.0,
                    "fat_g": 8.0,
                    "sodium_mg": 80,
                    "fibre_g": 2.0,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Teh Tarik",
            "description": "Classic Malaysian pulled tea with strong black tea and condensed milk, served hot and frothy.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 18.0,
                    "fat_g": 4.0,
                    "sodium_mg": 60,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Popiah",
            "description": "Fresh spring rolls filled with turnip, jicama, egg, and prawns, wrapped in thin crepe and served with sweet sauce.",
            "category": "Snack",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 8.5,
                    "carb_g": 28.0,
                    "fat_g": 3.5,
                    "sodium_mg": 350,
                    "fibre_g": 3.0,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "atlas-coffeehouse": [
    {
            "name": "Eggs Benedict",
            "description": "Poached eggs and smoked salmon atop toasted English muffins, drizzled with rich hollandaise sauce and served with a side of rocket salad.",
            "category": "Breakfast",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 24.0,
                    "carb_g": 32.0,
                    "fat_g": 30.0,
                    "sodium_mg": 1100,
                    "fibre_g": 2.0,
                    "gi": 50
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 22,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-fat",
                            "note": "Contains ~30g fat per serving"
                    }
            ]
    },
    {
            "name": "Smashed Avocado Toast",
            "description": "Creamy smashed avocado on artisanal sourdough, topped with cherry tomatoes, feta cheese, and a sprinkle of chili flakes.",
            "category": "Breakfast",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 10.0,
                    "carb_g": 38.0,
                    "fat_g": 22.0,
                    "sodium_mg": 650,
                    "fibre_g": 6.0,
                    "gi": 45
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 18,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Moderate nutritional profile"
                    }
            ]
    },
    {
            "name": "Flat White",
            "description": "Smooth and velvety espresso-based coffee with perfectly steamed milk, crafted to highlight the rich coffee aroma.",
            "category": "Drink",
            "estimatedKcal": 110,
            "nutrition": {
                    "protein_g": 5.0,
                    "carb_g": 9.0,
                    "fat_g": 5.0,
                    "sodium_mg": 80,
                    "fibre_g": 0.0,
                    "gi": 30
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 6.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Banana Bread",
            "description": "Moist and fragrant banana bread made with ripe bananas, served warm with a side of whipped butter.",
            "category": "Dessert",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 5.0,
                    "carb_g": 52.0,
                    "fat_g": 10.0,
                    "sodium_mg": 280,
                    "fibre_g": 2.5,
                    "gi": 60
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 9,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Truffle Mushroom Risotto",
            "description": "Creamy Arborio rice cooked slowly with wild mushrooms and finished with a drizzle of white truffle oil and parmesan shavings.",
            "category": "Main",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 14.5,
                    "carb_g": 65.0,
                    "fat_g": 18.0,
                    "sodium_mg": 650,
                    "fibre_g": 4.5,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 28,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Grilled Chicken Caesar Salad",
            "description": "Char-grilled chicken breast served on a bed of crisp romaine lettuce, tossed with house-made Caesar dressing, croutons, and parmesan cheese.",
            "category": "Main",
            "estimatedKcal": 550,
            "nutrition": {
                    "protein_g": 45.0,
                    "carb_g": 20.0,
                    "fat_g": 30.0,
                    "sodium_mg": 900,
                    "fibre_g": 4.0,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 24,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-fat",
                            "note": "Contains ~30.0g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~45.0g per serving"
                    }
            ]
    },
    {
            "name": "Sweet Potato Fries",
            "description": "Crispy golden sweet potato fries served with a tangy aioli dip, perfect as a light snack or side.",
            "category": "Side",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 2.5,
                    "carb_g": 45.0,
                    "fat_g": 12.0,
                    "sodium_mg": 350,
                    "fibre_g": 5.0,
                    "gi": 70
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Cold Brew Coffee",
            "description": "Slow-steeped cold brew coffee with a smooth, rich flavor, served over ice for a refreshing caffeine boost.",
            "category": "Drink",
            "estimatedKcal": 5,
            "nutrition": {
                    "protein_g": 0.3,
                    "carb_g": 0.5,
                    "fat_g": 0.0,
                    "sodium_mg": 5,
                    "fibre_g": 0.1,
                    "gi": 0
            },
            "confidence": "high",
            "source": "llm_estimated",
            "price_sgd": 7,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "baba-charlie-nyonya-cake": [
    {
            "name": "Kuih Lapis",
            "description": "A traditional Peranakan layered steamed cake made from rice flour and coconut milk, featuring vibrant pastel colors and a soft, chewy texture.",
            "category": "Dessert",
            "estimatedKcal": 220,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 42.0,
                    "fat_g": 5.0,
                    "sodium_mg": 120,
                    "fibre_g": 0.5,
                    "gi": 60
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Ondeh Ondeh",
            "description": "Glutinous rice balls filled with melted gula Melaka (palm sugar) and coated with freshly grated coconut, offering a burst of sweetness in every bite.",
            "category": "Snack",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 2.0,
                    "carb_g": 36.0,
                    "fat_g": 4.0,
                    "sodium_mg": 80,
                    "fibre_g": 1.5,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Ang Ku Kueh",
            "description": "Soft, sticky rice flour skin shaped like a tortoise shell, filled with sweet mung bean paste, symbolizing longevity and prosperity in Peranakan culture.",
            "category": "Snack",
            "estimatedKcal": 160,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 30.0,
                    "fat_g": 4.0,
                    "sodium_mg": 100,
                    "fibre_g": 1.5,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Pandan Layer Cake",
            "description": "A fragrant and moist layered cake infused with pandan leaf extract, showcasing the delicate balance of sweetness and aromatic flavors unique to Nyonya desserts.",
            "category": "Dessert",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 4.0,
                    "carb_g": 48.0,
                    "fat_g": 8.0,
                    "sodium_mg": 150,
                    "fibre_g": 1.0,
                    "gi": 65
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Kuih Dadar",
            "description": "A rolled crepe made from pandan-flavored batter, filled with grated coconut sweetened with gula Melaka, a beloved Peranakan snack.",
            "category": "Snack",
            "estimatedKcal": 200,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 38.0,
                    "fat_g": 5.0,
                    "sodium_mg": 90,
                    "fibre_g": 2.0,
                    "gi": 58
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Nyonya Kuih Platter",
            "description": "An assortment of classic Peranakan kuih including Kuih Lapis, Ondeh Ondeh, Ang Ku Kueh, and Kuih Dadar, perfect for sharing and tasting a variety of textures and flavors.",
            "category": "Dessert",
            "estimatedKcal": 350,
            "nutrition": {
                    "protein_g": 4.5,
                    "carb_g": 65.0,
                    "fat_g": 8.0,
                    "sodium_mg": 120,
                    "fibre_g": 3.5,
                    "gi": 65
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Teh Tarik",
            "description": "A frothy, pulled tea made with strong black tea and condensed milk, a popular local beverage to complement sweet treats.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 18.0,
                    "fat_g": 4.0,
                    "sodium_mg": 60,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Pulut Inti",
            "description": "Glutinous rice topped with sweet grated coconut cooked in palm sugar, wrapped in banana leaves for a fragrant and satisfying snack.",
            "category": "Snack",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 3.5,
                    "carb_g": 55.0,
                    "fat_g": 5.0,
                    "sodium_mg": 40,
                    "fibre_g": 2.0,
                    "gi": 70
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "char-chan-teng": [
    {
            "name": "Wonton Noodle Soup",
            "description": "Springy egg noodles served in a clear broth with plump shrimp and pork wontons, garnished with leafy greens and spring onions.",
            "category": "Noodles",
            "estimatedKcal": 420,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 55.0,
                    "fat_g": 10.0,
                    "sodium_mg": 1400,
                    "fibre_g": 2.0,
                    "gi": 50
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 6.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1400mg sodium per serving"
                    }
            ]
    },
    {
            "name": "Pineapple Bun (Bo Lo Bao)",
            "description": "Soft, fluffy bun topped with a sweet, crumbly golden crust resembling a pineapple, best enjoyed fresh and warm.",
            "category": "Snack",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 6.0,
                    "carb_g": 52.0,
                    "fat_g": 10.0,
                    "sodium_mg": 280,
                    "fibre_g": 1.0,
                    "gi": 70
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 2.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Hong Kong-style Milk Tea",
            "description": "Rich and smooth black tea brewed strong and blended with evaporated milk for a creamy, velvety finish.",
            "category": "Drink",
            "estimatedKcal": 150,
            "nutrition": {
                    "protein_g": 4.0,
                    "carb_g": 12.0,
                    "fat_g": 8.0,
                    "sodium_mg": 80,
                    "fibre_g": 0.5,
                    "gi": 45
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 2.8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Baked Pork Chop Rice",
            "description": "Tender pork chop baked with tomato sauce and melted cheese over a bed of fragrant fried rice, served piping hot.",
            "category": "Rice",
            "estimatedKcal": 720,
            "nutrition": {
                    "protein_g": 32.0,
                    "carb_g": 78.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1400,
                    "fibre_g": 2.0,
                    "gi": 60
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 7.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1400mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~32g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Hong Kong-style French Toast",
            "description": "Golden fried bread sandwich filled with peanut butter or kaya, drizzled with syrup and served with butter.",
            "category": "Breakfast",
            "estimatedKcal": 550,
            "nutrition": {
                    "protein_g": 10.5,
                    "carb_g": 65.0,
                    "fat_g": 25.0,
                    "sodium_mg": 450,
                    "fibre_g": 3.5,
                    "gi": 65
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 4.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Moderate nutritional profile"
                    }
            ]
    },
    {
            "name": "Egg Tart",
            "description": "Classic flaky pastry tart filled with smooth, lightly sweetened egg custard, baked to a delicate golden brown.",
            "category": "Dim Sum",
            "estimatedKcal": 220,
            "nutrition": {
                    "protein_g": 4.5,
                    "carb_g": 25.0,
                    "fat_g": 11.0,
                    "sodium_mg": 150,
                    "fibre_g": 0.5,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 3.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Macaroni Soup with Ham",
            "description": "Comforting bowl of macaroni in a clear chicken broth with slices of ham and a soft-boiled egg, garnished with spring onions.",
            "category": "Soup",
            "estimatedKcal": 350,
            "nutrition": {
                    "protein_g": 20.5,
                    "carb_g": 40.0,
                    "fat_g": 10.0,
                    "sodium_mg": 900,
                    "fibre_g": 2.0,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 5.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Iced Lemon Tea",
            "description": "Refreshing cold black tea served with a slice of lemon, lightly sweetened to balance the citrus tang.",
            "category": "Drink",
            "estimatedKcal": 90,
            "nutrition": {
                    "protein_g": 0.1,
                    "carb_g": 22.0,
                    "fat_g": 0.0,
                    "sodium_mg": 5,
                    "fibre_g": 0.2,
                    "gi": 50
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 2.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "din-tai-fung": [
    {
            "name": "Xiao Long Bao",
            "description": "Delicate steamed soup dumplings filled with juicy pork and rich broth, served with a side of black vinegar and ginger.",
            "category": "Dim Sum",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 14.0,
                    "carb_g": 28.0,
                    "fat_g": 12.0,
                    "sodium_mg": 700,
                    "fibre_g": 1.0,
                    "gi": 50
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 38,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Truffle Xiao Long Bao",
            "description": "Signature soup dumplings infused with aromatic black truffle oil, offering a luxurious twist on the classic Xiao Long Bao.",
            "category": "Dim Sum",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 14.0,
                    "carb_g": 28.0,
                    "fat_g": 16.0,
                    "sodium_mg": 700,
                    "fibre_g": 1.0,
                    "gi": 50
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 55,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Yangzhou Fried Rice",
            "description": "Fragrant wok-fried rice with shrimp, char siu pork, egg, and vegetables, delivering a perfect balance of flavors and textures.",
            "category": "Rice",
            "estimatedKcal": 480,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 72.0,
                    "fat_g": 16.0,
                    "sodium_mg": 1200,
                    "fibre_g": 2.0,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 32,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Wonton Soup",
            "description": "Clear broth soup featuring plump pork and shrimp wontons, garnished with fresh greens and a touch of sesame oil.",
            "category": "Soup",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 18.0,
                    "fat_g": 6.0,
                    "sodium_mg": 900,
                    "fibre_g": 1.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 28,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Sichuan Spicy Cucumber Salad",
            "description": "Crisp cucumber slices tossed in a spicy, tangy Sichuan chili oil dressing, garnished with toasted sesame seeds.",
            "category": "Side",
            "estimatedKcal": 70,
            "nutrition": {
                    "protein_g": 2.0,
                    "carb_g": 6.0,
                    "fat_g": 5.0,
                    "sodium_mg": 700,
                    "fibre_g": 1.5,
                    "gi": 15
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 18,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Steamed Chicken Soup with Ginseng",
            "description": "A nourishing clear soup slow-cooked with tender chicken, ginseng, and herbs, perfect for revitalizing the body.",
            "category": "Soup",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 22.5,
                    "carb_g": 4.0,
                    "fat_g": 6.0,
                    "sodium_mg": 650,
                    "fibre_g": 0.8,
                    "gi": 10
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 34,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Red Bean Sesame Dumplings",
            "description": "Glutinous rice dumplings filled with sweet red bean paste and coated in toasted sesame seeds, served warm.",
            "category": "Dessert",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 6.0,
                    "carb_g": 78.0,
                    "fat_g": 8.0,
                    "sodium_mg": 90,
                    "fibre_g": 4.0,
                    "gi": 62
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 22,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Jasmine Tea",
            "description": "Fragrant jasmine tea brewed from premium leaves, offering a floral aroma and refreshing finish.",
            "category": "Drink",
            "estimatedKcal": 130,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 20.0,
                    "fat_g": 4.0,
                    "sodium_mg": 55,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 12,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "hill-street-tai-hwa": [
    {
            "name": "Bak Chor Mee (Dry)",
            "description": "Springy egg noodles tossed in a tangy vinegar and chili sauce, topped with minced pork, pork liver, mushrooms, and crispy pork lard.",
            "category": "Noodles",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 60.0,
                    "fat_g": 14.0,
                    "sodium_mg": 1500,
                    "fibre_g": 2.0,
                    "gi": 52
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 5.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1500mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "Bak Chor Mee (Soup)",
            "description": "A comforting bowl of springy noodles served in a clear, flavorful pork broth with minced pork, pork liver, and mushrooms.",
            "category": "Noodles",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 60.0,
                    "fat_g": 14.0,
                    "sodium_mg": 1500,
                    "fibre_g": 2.0,
                    "gi": 52
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 5.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1500mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "Pork Liver Noodles",
            "description": "Tender slices of pork liver served with springy noodles in a light, savory soup, garnished with fresh greens and fried shallots.",
            "category": "Noodles",
            "estimatedKcal": 450,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 50.0,
                    "fat_g": 12.0,
                    "sodium_mg": 1200,
                    "fibre_g": 3.0,
                    "gi": 65
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 6.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30.0g per serving"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Braised Pork Intestines",
            "description": "Soft and flavorful pork intestines braised in a rich soy-based sauce, served as a side to complement the noodles.",
            "category": "Side",
            "estimatedKcal": 420,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 12.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1500,
                    "fibre_g": 0.5,
                    "gi": 20
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 4.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1500mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "Fishball Soup",
            "description": "Light and clear broth served with bouncy handmade fishballs, a refreshing accompaniment to the hearty noodle dishes.",
            "category": "Soup",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 18.0,
                    "fat_g": 6.0,
                    "sodium_mg": 900,
                    "fibre_g": 1.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 3.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Chili Sauce",
            "description": "House-made spicy chili sauce with a perfect balance of heat and tang, ideal for enhancing the flavors of Bak Chor Mee.",
            "category": "Side",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 18.0,
                    "fat_g": 20.0,
                    "sodium_mg": 1600,
                    "fibre_g": 1.5,
                    "gi": 35
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 0.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "Soy Sauce Egg",
            "description": "Egg marinated in a savory soy sauce blend, served as a flavorful side to complement the noodles.",
            "category": "Side",
            "estimatedKcal": 80,
            "nutrition": {
                    "protein_g": 6.5,
                    "carb_g": 1.0,
                    "fat_g": 5.5,
                    "sodium_mg": 700,
                    "fibre_g": 0.0,
                    "gi": 0
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 1.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "hong-kong-soya-sauce-chicken": [
    {
            "name": "Soya Sauce Chicken Rice",
            "description": "Tender chicken braised in a rich soya sauce served atop fragrant steamed white rice, a signature hawker classic.",
            "category": "Rice",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 60.0,
                    "fat_g": 16.0,
                    "sodium_mg": 1600,
                    "fibre_g": 1.5,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 5.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    }
            ]
    },
    {
            "name": "Soya Sauce Chicken Noodles",
            "description": "Succulent soya sauce chicken served with springy egg noodles and a drizzle of savory sauce, a beloved Cantonese hawker staple.",
            "category": "Noodles",
            "estimatedKcal": 480,
            "nutrition": {
                    "protein_g": 32.0,
                    "carb_g": 52.0,
                    "fat_g": 14.0,
                    "sodium_mg": 1600,
                    "fibre_g": 2.0,
                    "gi": 52
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 5.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~32g per serving"
                    }
            ]
    },
    {
            "name": "Roasted Duck Rice",
            "description": "Crispy-skinned roasted duck paired with steamed rice and a side of dark soy sauce, offering a perfect balance of textures and flavors.",
            "category": "Rice",
            "estimatedKcal": 650,
            "nutrition": {
                    "protein_g": 32.0,
                    "carb_g": 68.0,
                    "fat_g": 22.0,
                    "sodium_mg": 1300,
                    "fibre_g": 1.5,
                    "gi": 58
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 7.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1300mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~32g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Braised Egg",
            "description": "Hard-boiled egg slow-cooked in a fragrant soya sauce marinade, absorbing deep umami flavors, perfect as a side dish.",
            "category": "Side",
            "estimatedKcal": 90,
            "nutrition": {
                    "protein_g": 7.5,
                    "carb_g": 2.0,
                    "fat_g": 6.0,
                    "sodium_mg": 700,
                    "fibre_g": 0.0,
                    "gi": 0
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 1.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Vegetable Soup",
            "description": "Light and clear broth simmered with seasonal vegetables, providing a refreshing complement to the rich main dishes.",
            "category": "Soup",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 18.0,
                    "fat_g": 6.0,
                    "sodium_mg": 900,
                    "fibre_g": 1.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 2.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Char Siew Bao",
            "description": "Steamed fluffy buns filled with sweet and savory barbecued pork, a popular Cantonese dim sum treat.",
            "category": "Dim Sum",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 18.0,
                    "fat_g": 16.0,
                    "sodium_mg": 900,
                    "fibre_g": 0.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 3.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Soy Milk Drink",
            "description": "Smooth and lightly sweetened soy milk, served chilled to refresh and balance the savory flavors of the meal.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 6.5,
                    "carb_g": 10.0,
                    "fat_g": 4.0,
                    "sodium_mg": 50,
                    "fibre_g": 1.0,
                    "gi": 35
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 1.8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "imbi-market-hokkien-mee": [
    {
            "name": "KL Hokkien Mee (Dark Soy)",
            "description": "Thick yellow noodles stir-fried in rich dark soy sauce with pork lard, prawns, squid, and cabbage, delivering a smoky and savory flavor unique to Kuala Lumpur.",
            "category": "Noodles",
            "estimatedKcal": 680,
            "nutrition": {
                    "protein_g": 25.0,
                    "carb_g": 80.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1600,
                    "fibre_g": 3.0,
                    "gi": 60
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Char Siew (BBQ Pork)",
            "description": "Succulent slices of barbecued pork marinated in a sweet and savory sauce, charred to perfection with a caramelized exterior.",
            "category": "Side",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 22.5,
                    "carb_g": 12.0,
                    "fat_g": 16.0,
                    "sodium_mg": 700,
                    "fibre_g": 0.5,
                    "gi": 45
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Wonton Soup",
            "description": "Clear broth soup served with delicate pork and prawn wontons, garnished with chopped spring onions and a touch of sesame oil.",
            "category": "Soup",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 18.0,
                    "fat_g": 6.0,
                    "sodium_mg": 900,
                    "fibre_g": 1.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Fried Wanton",
            "description": "Crispy deep-fried wantons filled with minced pork and prawn, served with a tangy chili sauce for dipping.",
            "category": "Snack",
            "estimatedKcal": 480,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 72.0,
                    "fat_g": 16.0,
                    "sodium_mg": 1200,
                    "fibre_g": 2.0,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Braised Pork Belly Rice",
            "description": "Tender pork belly slow-cooked in a fragrant soy-based sauce, served atop steamed white rice with pickled vegetables on the side.",
            "category": "Rice",
            "estimatedKcal": 720,
            "nutrition": {
                    "protein_g": 32.0,
                    "carb_g": 78.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1400,
                    "fibre_g": 2.0,
                    "gi": 60
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1400mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~32g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Egg Fried Rice",
            "description": "Classic wok-fried rice with fluffy eggs, spring onions, and light seasoning, a perfect complement to the rich noodle dishes.",
            "category": "Rice",
            "estimatedKcal": 480,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 72.0,
                    "fat_g": 16.0,
                    "sodium_mg": 1200,
                    "fibre_g": 2.0,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Soya Bean Drink",
            "description": "Chilled freshly made soya bean milk, smooth and naturally sweetened, a refreshing beverage to balance savory flavors.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 7.5,
                    "carb_g": 12.0,
                    "fat_g": 4.0,
                    "sodium_mg": 10,
                    "fibre_g": 1.5,
                    "gi": 35
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "jumbo-seafood": [
    {
            "name": "Chili Crab",
            "description": "Fresh Sri Lankan crabs stir-fried in a tangy, sweet and spicy chili-tomato sauce, served with deep-fried mantou buns to soak up the flavorful gravy.",
            "category": "Main",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 18.0,
                    "fat_g": 20.0,
                    "sodium_mg": 1600,
                    "fibre_g": 1.5,
                    "gi": 35
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 48,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "Black Pepper Crab",
            "description": "Succulent crab cooked in a robust black pepper sauce with a perfect balance of heat and aroma, a savory alternative to the classic chili crab.",
            "category": "Main",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 12.0,
                    "fat_g": 32.0,
                    "sodium_mg": 1700,
                    "fibre_g": 1.5,
                    "gi": 25
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 48,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1700mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~32g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    }
            ]
    },
    {
            "name": "Cereal Prawns",
            "description": "Large prawns wok-fried with a crispy coating of golden cereal crumbs, butter, curry leaves, and a hint of chili for a delightful crunch and flavor.",
            "category": "Main",
            "estimatedKcal": 420,
            "nutrition": {
                    "protein_g": 26.0,
                    "carb_g": 22.0,
                    "fat_g": 24.0,
                    "sodium_mg": 1100,
                    "fibre_g": 1.5,
                    "gi": 30
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 38,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~26g per serving"
                    }
            ]
    },
    {
            "name": "Sambal Kangkong",
            "description": "Fresh water spinach stir-fried with spicy sambal chili paste, dried shrimp, and a touch of belacan, delivering a fiery and aromatic vegetable side.",
            "category": "Side",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 4.0,
                    "carb_g": 8.0,
                    "fat_g": 8.0,
                    "sodium_mg": 600,
                    "fibre_g": 3.0,
                    "gi": 20
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 15,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Salted Egg Crab",
            "description": "Crab cooked in a rich and creamy salted egg yolk sauce, enhanced with curry leaves and chili for a luxurious and indulgent flavor profile.",
            "category": "Main",
            "estimatedKcal": 650,
            "nutrition": {
                    "protein_g": 45.0,
                    "carb_g": 15.0,
                    "fat_g": 45.0,
                    "sodium_mg": 1200,
                    "fibre_g": 3.0,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 50,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-fat",
                            "note": "Contains ~45.0g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~45.0g per serving"
                    }
            ]
    },
    {
            "name": "Steamed Soon Hock Fish",
            "description": "Fresh Soon Hock fish steamed to perfection with ginger, scallions, and soy sauce, highlighting the natural sweetness and delicate texture of the fish.",
            "category": "Main",
            "estimatedKcal": 220,
            "nutrition": {
                    "protein_g": 38.0,
                    "carb_g": 3.0,
                    "fat_g": 6.0,
                    "sodium_mg": 700,
                    "fibre_g": 0.5,
                    "gi": 10
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 42,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~38.0g per serving"
                    },
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Claypot Tofu with Seafood",
            "description": "Silky tofu braised in a savory claypot sauce with an assortment of fresh seafood, mushrooms, and vegetables, served piping hot.",
            "category": "Main",
            "estimatedKcal": 350,
            "nutrition": {
                    "protein_g": 28.5,
                    "carb_g": 18.0,
                    "fat_g": 12.0,
                    "sodium_mg": 900,
                    "fibre_g": 3.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 28,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28.5g per serving"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Chrysanthemum Tea",
            "description": "A refreshing floral tea brewed from dried chrysanthemum flowers, known for its cooling properties and subtle sweetness.",
            "category": "Drink",
            "estimatedKcal": 30,
            "nutrition": {
                    "protein_g": 0.0,
                    "carb_g": 7.0,
                    "fat_g": 0.0,
                    "sodium_mg": 5,
                    "fibre_g": 0.0,
                    "gi": 30
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 6,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "lau-pa-sat": [
    {
            "name": "Satay (Chicken)",
            "description": "Tender, marinated chicken skewers grilled over charcoal, served with a rich, spicy peanut sauce and a side of ketupat.",
            "category": "Main",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 24.0,
                    "carb_g": 15.0,
                    "fat_g": 14.0,
                    "sodium_mg": 800,
                    "fibre_g": 1.0,
                    "gi": 35
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 6.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Satay (Beef)",
            "description": "Juicy beef satay grilled to perfection, accompanied by a thick peanut dipping sauce and traditional ketupat rice cakes.",
            "category": "Main",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 26.0,
                    "carb_g": 15.0,
                    "fat_g": 18.0,
                    "sodium_mg": 850,
                    "fibre_g": 1.0,
                    "gi": 35
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 7.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~26g per serving"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Satay (Mutton)",
            "description": "Flavorful mutton satay with a smoky char, served with spicy peanut sauce and fragrant ketupat cubes.",
            "category": "Main",
            "estimatedKcal": 300,
            "nutrition": {
                    "protein_g": 24.0,
                    "carb_g": 15.0,
                    "fat_g": 16.0,
                    "sodium_mg": 820,
                    "fibre_g": 1.0,
                    "gi": 35
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 7.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Satay (Prawn)",
            "description": "Succulent prawns marinated in a blend of spices, grilled and served with a tangy peanut sauce and ketupat.",
            "category": "Main",
            "estimatedKcal": 260,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 15.0,
                    "fat_g": 12.0,
                    "sodium_mg": 780,
                    "fibre_g": 1.0,
                    "gi": 35
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 7.8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Ketupat",
            "description": "Traditional compressed rice cakes wrapped in woven palm leaves, perfect for dipping in satay peanut sauce.",
            "category": "Side",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 40.0,
                    "fat_g": 1.0,
                    "sodium_mg": 5,
                    "fibre_g": 0.5,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 2.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Hainanese Chicken Rice",
            "description": "Fragrant rice cooked in chicken broth, served with tender poached chicken, chili sauce, and ginger paste.",
            "category": "Main",
            "estimatedKcal": 600,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 70.0,
                    "fat_g": 18.0,
                    "sodium_mg": 1200,
                    "fibre_g": 1.5,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 5.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Char Kway Teow",
            "description": "Stir-fried flat rice noodles with egg, Chinese sausage, cockles, and bean sprouts in a savory soy sauce.",
            "category": "Main",
            "estimatedKcal": 744,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 90.0,
                    "fat_g": 32.0,
                    "sodium_mg": 1800,
                    "fibre_g": 2.5,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 6.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1800mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~32g fat per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Teh Tarik",
            "description": "Pulled tea with condensed milk, served hot and frothy, a perfect complement to the spicy satay flavors.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 18.0,
                    "fat_g": 4.0,
                    "sodium_mg": 60,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 2.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Cendol",
            "description": "Chilled dessert with pandan jelly, coconut milk, shaved ice, and palm sugar syrup, refreshing after a hearty meal.",
            "category": "Dessert",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 68.0,
                    "fat_g": 8.0,
                    "sodium_mg": 80,
                    "fibre_g": 2.0,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 3.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    }
  ],
  "lot-10-hutong": [
    {
            "name": "Hokkien Mee",
            "description": "Stir-fried yellow noodles and rice vermicelli in a rich prawn and pork broth, garnished with crispy pork lard and fresh lime.",
            "category": "Noodles",
            "estimatedKcal": 680,
            "nutrition": {
                    "protein_g": 25.0,
                    "carb_g": 80.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1600,
                    "fibre_g": 3.0,
                    "gi": 60
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Char Kway Teow",
            "description": "Wok-fried flat rice noodles with prawns, Chinese sausage, eggs, bean sprouts, and chives, infused with smoky wok hei flavor.",
            "category": "Noodles",
            "estimatedKcal": 744,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 90.0,
                    "fat_g": 32.0,
                    "sodium_mg": 1800,
                    "fibre_g": 2.5,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1800mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~32g fat per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Wonton Noodles",
            "description": "Springy egg noodles served with plump pork and prawn wontons in a clear, fragrant broth topped with char siu slices.",
            "category": "Noodles",
            "estimatedKcal": 420,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 55.0,
                    "fat_g": 10.0,
                    "sodium_mg": 1400,
                    "fibre_g": 2.0,
                    "gi": 50
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1400mg sodium per serving"
                    }
            ]
    },
    {
            "name": "Curry Laksa",
            "description": "Spicy coconut curry soup with rice vermicelli, tofu puffs, cockles, fish cake, and boiled egg, garnished with fresh laksa leaves.",
            "category": "Soup",
            "estimatedKcal": 620,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 68.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1600,
                    "fibre_g": 3.0,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Bak Kut Teh",
            "description": "Herbal pork rib soup simmered for hours with garlic and pepper, served with fragrant steamed rice and preserved vegetables.",
            "category": "Soup",
            "estimatedKcal": 360,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 5.0,
                    "fat_g": 22.0,
                    "sodium_mg": 1400,
                    "fibre_g": 1.0,
                    "gi": 10
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1400mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    }
            ]
    },
    {
            "name": "Crispy Fried Wantons",
            "description": "Golden deep-fried pork and prawn wantons served with a tangy chili sauce, perfect as a starter or snack.",
            "category": "Snack",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 15.0,
                    "carb_g": 25.0,
                    "fat_g": 18.0,
                    "sodium_mg": 700,
                    "fibre_g": 1.5,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Chendol",
            "description": "Traditional dessert of shaved ice topped with pandan jelly, red beans, coconut milk, and palm sugar syrup.",
            "category": "Dessert",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 4.5,
                    "carb_g": 60.0,
                    "fat_g": 8.0,
                    "sodium_mg": 50,
                    "fibre_g": 5.0,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Teh Tarik",
            "description": "Classic Malaysian pulled tea with strong black tea and condensed milk, served hot and frothy.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 18.0,
                    "fat_g": 4.0,
                    "sodium_mg": 60,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "nasi-kandar-line-clear": [
    {
            "name": "Nasi Kandar",
            "description": "Steamed rice served with a variety of flavorful curries and side dishes, a Penang mamak classic known for its rich and spicy taste.",
            "category": "Rice",
            "estimatedKcal": 720,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 85.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1800,
                    "fibre_g": 4.0,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1800mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Chicken Curry",
            "description": "Tender chicken pieces simmered in a fragrant and spicy curry gravy, perfect to pair with rice or bread.",
            "category": "Main",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 20.0,
                    "carb_g": 40.0,
                    "fat_g": 6.0,
                    "sodium_mg": 700,
                    "fibre_g": 1.0,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Fish Curry",
            "description": "Fresh fish cooked in a tangy and spicy curry sauce, a must-try for seafood lovers at Nasi Kandar Line Clear.",
            "category": "Main",
            "estimatedKcal": 620,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 68.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1600,
                    "fibre_g": 3.0,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Dhal Curry",
            "description": "Creamy and mildly spiced lentil curry, a comforting side that balances the stronger flavors of meat curries.",
            "category": "Side",
            "estimatedKcal": 620,
            "nutrition": {
                    "protein_g": 22.0,
                    "carb_g": 68.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1600,
                    "fibre_g": 3.0,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Papadum",
            "description": "Crispy, thin lentil crackers served as a crunchy accompaniment to the curries and rice.",
            "category": "Snack",
            "estimatedKcal": 80,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 10.0,
                    "fat_g": 3.0,
                    "sodium_mg": 200,
                    "fibre_g": 1.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Mutton Kurma",
            "description": "Slow-cooked mutton in a rich, creamy kurma sauce infused with aromatic spices, a hearty addition to your nasi kandar meal.",
            "category": "Main",
            "estimatedKcal": 450,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 12.0,
                    "fat_g": 32.0,
                    "sodium_mg": 700,
                    "fibre_g": 3.5,
                    "gi": 35
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-fat",
                            "note": "Contains ~32.0g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28.0g per serving"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Roti Canai",
            "description": "Flaky and crispy flatbread served with dhal or curry, a popular breakfast and snack item in Penang mamak stalls.",
            "category": "Breakfast",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 18.0,
                    "carb_g": 32.0,
                    "fat_g": 20.0,
                    "sodium_mg": 800,
                    "fibre_g": 1.5,
                    "gi": 50
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Teh Tarik",
            "description": "Pulled tea with condensed milk, a smooth and frothy drink that complements the spicy dishes perfectly.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 18.0,
                    "fat_g": 4.0,
                    "sodium_mg": 60,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    }
  ],
  "no-signboard-seafood": [
    {
            "name": "White Pepper Crab",
            "description": "Fresh Sri Lankan crab wok-fried with a fragrant white pepper sauce, delivering a spicy and aromatic kick that complements the natural sweetness of the crab.",
            "category": "Main",
            "estimatedKcal": 420,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 8.0,
                    "fat_g": 26.0,
                    "sodium_mg": 1500,
                    "fibre_g": 1.0,
                    "gi": 20
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 48,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1500mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~26g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "Chili Crab",
            "description": "Singapore’s iconic chili crab cooked in a tangy, sweet and spicy tomato-based chili sauce, served with deep-fried mantou buns to soak up the flavorful gravy.",
            "category": "Main",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 18.0,
                    "fat_g": 20.0,
                    "sodium_mg": 1600,
                    "fibre_g": 1.5,
                    "gi": 35
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 45,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1600mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "Black Pepper Crab",
            "description": "Succulent crab stir-fried with a bold black pepper sauce, combining heat and pungency to enhance the crab’s natural flavors.",
            "category": "Main",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 12.0,
                    "fat_g": 32.0,
                    "sodium_mg": 1700,
                    "fibre_g": 1.5,
                    "gi": 25
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 46,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1700mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~32g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    }
            ]
    },
    {
            "name": "Butter Prawns",
            "description": "Large prawns coated in a creamy, buttery sauce with a hint of curry leaves and chili, offering a rich and aromatic seafood delight.",
            "category": "Main",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 24.0,
                    "carb_g": 8.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1200,
                    "fibre_g": 0.5,
                    "gi": 15
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 38,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    }
            ]
    },
    {
            "name": "Salted Egg Yolk Crab",
            "description": "Fresh crab stir-fried with a luscious salted egg yolk sauce, delivering a rich and savory flavor with a slightly grainy texture.",
            "category": "Main",
            "estimatedKcal": 650,
            "nutrition": {
                    "protein_g": 45.0,
                    "carb_g": 15.0,
                    "fat_g": 40.0,
                    "sodium_mg": 1200,
                    "fibre_g": 2.0,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 47,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-fat",
                            "note": "Contains ~40.0g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~45.0g per serving"
                    }
            ]
    },
    {
            "name": "Stir-Fried Sambal Kang Kong",
            "description": "Water spinach wok-tossed with spicy sambal chili paste, garlic, and dried shrimp for a flavorful and slightly spicy vegetable side.",
            "category": "Side",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 5.0,
                    "carb_g": 8.0,
                    "fat_g": 7.0,
                    "sodium_mg": 850,
                    "fibre_g": 3.5,
                    "gi": 30
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 14,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Seafood Fried Rice",
            "description": "Fragrant fried rice stir-fried with fresh prawns, squid, and scallops, seasoned with light soy sauce and garnished with spring onions.",
            "category": "Rice",
            "estimatedKcal": 480,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 72.0,
                    "fat_g": 16.0,
                    "sodium_mg": 1200,
                    "fibre_g": 2.0,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 18,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Double-Boiled Crab Meat Soup",
            "description": "A nourishing clear broth double-boiled with fresh crab meat, Chinese herbs, and goji berries, prized for its delicate taste and health benefits.",
            "category": "Soup",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 15.0,
                    "carb_g": 6.0,
                    "fat_g": 3.5,
                    "sodium_mg": 700,
                    "fibre_g": 1.2,
                    "gi": 30
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 22,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "old-chang-kee": [
    {
            "name": "Curry Puff",
            "description": "Flaky pastry filled with a savory blend of curried potatoes, chicken, and egg, a beloved Singaporean snack.",
            "category": "Snack",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 6.0,
                    "carb_g": 32.0,
                    "fat_g": 14.0,
                    "sodium_mg": 480,
                    "fibre_g": 2.0,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 1.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Spicy Chicken Wings",
            "description": "Crispy fried chicken wings marinated in a special blend of spices, delivering a perfect balance of heat and flavor.",
            "category": "Snack",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 24.0,
                    "carb_g": 8.0,
                    "fat_g": 22.0,
                    "sodium_mg": 700,
                    "fibre_g": 0.5,
                    "gi": 20
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 4.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Moderate nutritional profile"
                    }
            ]
    },
    {
            "name": "Otah",
            "description": "Grilled fish paste mixed with fragrant spices and wrapped in banana leaf, offering a smoky and spicy taste.",
            "category": "Snack",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 14.0,
                    "carb_g": 8.0,
                    "fat_g": 10.0,
                    "sodium_mg": 600,
                    "fibre_g": 1.5,
                    "gi": 30
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 2.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Sotong Ball",
            "description": "Chewy squid balls made from fresh squid meat, lightly seasoned and deep-fried to golden perfection.",
            "category": "Snack",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 10.0,
                    "carb_g": 12.0,
                    "fat_g": 4.0,
                    "sodium_mg": 450,
                    "fibre_g": 0.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 3.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Fish Ball",
            "description": "Springy fish balls crafted from finely minced fish, served hot and perfect as a quick bite or accompaniment.",
            "category": "Snack",
            "estimatedKcal": 80,
            "nutrition": {
                    "protein_g": 8.0,
                    "carb_g": 6.0,
                    "fat_g": 2.0,
                    "sodium_mg": 380,
                    "fibre_g": 0.5,
                    "gi": 35
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 2.8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Vegetarian Curry Puff",
            "description": "A meat-free version of the classic curry puff, filled with curried potatoes and vegetables wrapped in flaky pastry.",
            "category": "Snack",
            "estimatedKcal": 250,
            "nutrition": {
                    "protein_g": 4.5,
                    "carb_g": 30.0,
                    "fat_g": 12.0,
                    "sodium_mg": 400,
                    "fibre_g": 3.5,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 1.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Sambal Sotong",
            "description": "Tender squid cooked in a spicy and tangy sambal sauce, a flavorful local favorite.",
            "category": "Snack",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 10.0,
                    "carb_g": 12.0,
                    "fat_g": 4.0,
                    "sodium_mg": 450,
                    "fibre_g": 0.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 5.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Iced Barley Drink",
            "description": "Refreshing chilled barley drink, lightly sweetened to complement the savory snacks.",
            "category": "Drink",
            "estimatedKcal": 90,
            "nutrition": {
                    "protein_g": 0.5,
                    "carb_g": 22.0,
                    "fat_g": 0.1,
                    "sodium_mg": 10,
                    "fibre_g": 1.5,
                    "gi": 45
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 1.8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "penang-road-famous-teochew-cendol": [
    {
            "name": "Cendol",
            "description": "Traditional Penang-style cendol with shaved ice, pandan jelly, red palm sugar syrup, and creamy coconut milk.",
            "category": "Dessert",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 68.0,
                    "fat_g": 8.0,
                    "sodium_mg": 80,
                    "fibre_g": 2.0,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Cendol with Red Bean",
            "description": "Classic cendol dessert enhanced with sweet red beans for added texture and flavour.",
            "category": "Dessert",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 6.0,
                    "carb_g": 78.0,
                    "fat_g": 8.0,
                    "sodium_mg": 90,
                    "fibre_g": 4.0,
                    "gi": 62
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Ais Kacang",
            "description": "A colourful mix of shaved ice topped with red beans, sweet corn, grass jelly, attap seeds, and drizzled with gula Melaka syrup and evaporated milk.",
            "category": "Dessert",
            "estimatedKcal": 350,
            "nutrition": {
                    "protein_g": 5.0,
                    "carb_g": 72.0,
                    "fat_g": 6.0,
                    "sodium_mg": 100,
                    "fibre_g": 3.5,
                    "gi": 65
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Pulut Hitam",
            "description": "Warm black glutinous rice pudding cooked with coconut milk and palm sugar, a comforting traditional dessert.",
            "category": "Dessert",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 4.5,
                    "carb_g": 50.0,
                    "fat_g": 7.0,
                    "sodium_mg": 30,
                    "fibre_g": 3.5,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Teochew Tau Suan",
            "description": "Sweet mung bean soup served warm with crispy fried dough fritters, a popular Peranakan dessert.",
            "category": "Dessert",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 6.5,
                    "carb_g": 50.0,
                    "fat_g": 5.0,
                    "sodium_mg": 150,
                    "fibre_g": 6.0,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Teh Tarik",
            "description": "Pulled tea with a frothy top, combining strong black tea and condensed milk for a smooth, sweet finish.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 18.0,
                    "fat_g": 4.0,
                    "sodium_mg": 60,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Coconut Shake",
            "description": "Refreshing blend of fresh coconut water and coconut flesh, lightly sweetened and served chilled.",
            "category": "Drink",
            "estimatedKcal": 180,
            "nutrition": {
                    "protein_g": 2.0,
                    "carb_g": 30.0,
                    "fat_g": 6.0,
                    "sodium_mg": 20,
                    "fibre_g": 2.5,
                    "gi": 45
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "restoran-yut-kee": [
    {
            "name": "Roti Babi",
            "description": "Flaky, buttery roti filled with tender minced pork and a hint of curry spices, a beloved Hainanese kopitiam specialty.",
            "category": "Snack",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 18.0,
                    "carb_g": 32.0,
                    "fat_g": 20.0,
                    "sodium_mg": 800,
                    "fibre_g": 1.5,
                    "gi": 50
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Hainanese Chicken Chop",
            "description": "Crispy fried chicken thigh served with a tangy tomato-based sauce, accompanied by fries and coleslaw, a classic Hainanese Western dish.",
            "category": "Main",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 35.0,
                    "fat_g": 26.0,
                    "sodium_mg": 1100,
                    "fibre_g": 2.0,
                    "gi": 45
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-fat",
                            "note": "Contains ~26g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    }
            ]
    },
    {
            "name": "Kaya Toast",
            "description": "Toasted bread slathered with homemade kaya jam and butter, traditionally paired with soft-boiled eggs and a cup of kopi.",
            "category": "Breakfast",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 6.0,
                    "carb_g": 38.0,
                    "fat_g": 12.0,
                    "sodium_mg": 350,
                    "fibre_g": 1.5,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Kopi",
            "description": "Strong, aromatic traditional Malaysian coffee brewed with a sock filter, served hot or iced with condensed milk.",
            "category": "Drink",
            "estimatedKcal": 80,
            "nutrition": {
                    "protein_g": 1.0,
                    "carb_g": 12.0,
                    "fat_g": 3.0,
                    "sodium_mg": 30,
                    "fibre_g": 0.0,
                    "gi": 40
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Pork Chop",
            "description": "Juicy pork chop marinated and pan-fried, served with a savory brown sauce, mashed potatoes, and steamed vegetables.",
            "category": "Main",
            "estimatedKcal": 480,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 30.0,
                    "fat_g": 24.0,
                    "sodium_mg": 900,
                    "fibre_g": 1.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "Hainanese Chicken Rice",
            "description": "Poached chicken served with fragrant rice cooked in chicken broth, accompanied by chili sauce and ginger paste.",
            "category": "Rice",
            "estimatedKcal": 600,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 70.0,
                    "fat_g": 18.0,
                    "sodium_mg": 1200,
                    "fibre_g": 1.5,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Soft-Boiled Eggs",
            "description": "Two soft-boiled eggs served with a dash of soy sauce and white pepper, a traditional breakfast side to kaya toast.",
            "category": "Side",
            "estimatedKcal": 520,
            "nutrition": {
                    "protein_g": 24.0,
                    "carb_g": 32.0,
                    "fat_g": 30.0,
                    "sodium_mg": 1100,
                    "fibre_g": 2.0,
                    "gi": 50
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-fat",
                            "note": "Contains ~30g fat per serving"
                    }
            ]
    },
    {
            "name": "Teh Tarik",
            "description": "Pulled tea with condensed milk, creamy and frothy, a staple Malaysian drink to complement any meal.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 18.0,
                    "fat_g": 4.0,
                    "sodium_mg": 60,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "song-fa-bak-kut-teh": [
    {
            "name": "Signature Bak Kut Teh",
            "description": "A rich and aromatic Teochew-style pork rib soup simmered with a blend of herbs and spices, served piping hot with tender pork ribs.",
            "category": "Soup",
            "estimatedKcal": 360,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 5.0,
                    "fat_g": 22.0,
                    "sodium_mg": 1400,
                    "fibre_g": 1.0,
                    "gi": 10
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 28,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1400mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    }
            ]
    },
    {
            "name": "Braised Pork Trotters",
            "description": "Slow-braised pork trotters cooked in a flavorful soy-based sauce until tender, infused with star anise and cinnamon.",
            "category": "Main",
            "estimatedKcal": 420,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 12.0,
                    "fat_g": 28.0,
                    "sodium_mg": 1500,
                    "fibre_g": 0.5,
                    "gi": 20
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": 22,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1500mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~28g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28g per serving"
                    }
            ]
    },
    {
            "name": "You Char Kway",
            "description": "Golden, crispy fried dough sticks perfect for dipping into the Bak Kut Teh broth or enjoyed on their own.",
            "category": "Side",
            "estimatedKcal": 280,
            "nutrition": {
                    "protein_g": 5.0,
                    "carb_g": 32.0,
                    "fat_g": 14.0,
                    "sodium_mg": 480,
                    "fibre_g": 1.0,
                    "gi": 70
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Steamed White Rice",
            "description": "Fluffy steamed jasmine rice, the perfect accompaniment to soak up the flavorful Bak Kut Teh broth.",
            "category": "Rice",
            "estimatedKcal": 200,
            "nutrition": {
                    "protein_g": 4.0,
                    "carb_g": 44.0,
                    "fat_g": 0.4,
                    "sodium_mg": 0,
                    "fibre_g": 0.6,
                    "gi": 72
            },
            "confidence": "high",
            "source": "llm_estimated",
            "price_sgd": 3,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Braised Preserved Vegetables",
            "description": "Traditional Teochew-style preserved mustard greens braised to complement the rich Bak Kut Teh flavors.",
            "category": "Side",
            "estimatedKcal": 60,
            "nutrition": {
                    "protein_g": 2.5,
                    "carb_g": 8.0,
                    "fat_g": 1.5,
                    "sodium_mg": 900,
                    "fibre_g": 3.0,
                    "gi": 30
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 7,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Century Egg with Tofu",
            "description": "Silky chilled tofu topped with sliced century egg and drizzled with soy sauce and sesame oil for a refreshing starter.",
            "category": "Snack",
            "estimatedKcal": 150,
            "nutrition": {
                    "protein_g": 10.5,
                    "carb_g": 4.0,
                    "fat_g": 9.0,
                    "sodium_mg": 600,
                    "fibre_g": 0.5,
                    "gi": 15
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Herbal Tea",
            "description": "A soothing blend of traditional Chinese herbs served hot to cleanse the palate and aid digestion.",
            "category": "Drink",
            "estimatedKcal": 130,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 20.0,
                    "fat_g": 4.0,
                    "sodium_mg": 55,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 6,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "tian-tian": [
    {
            "name": "Hainanese Chicken Rice",
            "description": "Tender poached chicken served with fragrant oily rice, accompanied by chili sauce, ginger paste, and dark soy sauce.",
            "category": "Main",
            "estimatedKcal": 600,
            "nutrition": {
                    "protein_g": 30.0,
                    "carb_g": 70.0,
                    "fat_g": 18.0,
                    "sodium_mg": 1200,
                    "fibre_g": 1.5,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 5.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~30g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Roasted Chicken Rice",
            "description": "Crispy-skinned roasted chicken paired with aromatic chicken rice and traditional dipping sauces.",
            "category": "Main",
            "estimatedKcal": 650,
            "nutrition": {
                    "protein_g": 32.0,
                    "carb_g": 68.0,
                    "fat_g": 22.0,
                    "sodium_mg": 1300,
                    "fibre_g": 1.5,
                    "gi": 58
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 6.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1300mg sodium per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~32g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    }
            ]
    },
    {
            "name": "Chicken Porridge",
            "description": "Smooth and comforting rice porridge topped with shredded chicken, garnished with spring onions and fried shallots.",
            "category": "Breakfast",
            "estimatedKcal": 320,
            "nutrition": {
                    "protein_g": 20.0,
                    "carb_g": 40.0,
                    "fat_g": 6.0,
                    "sodium_mg": 700,
                    "fibre_g": 1.0,
                    "gi": 55
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 4.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Chicken Liver and Gizzard",
            "description": "Lightly blanched chicken liver and gizzard served with a side of chili sauce for a savory bite.",
            "category": "Side",
            "estimatedKcal": 150,
            "nutrition": {
                    "protein_g": 20.0,
                    "carb_g": 3.0,
                    "fat_g": 7.0,
                    "sodium_mg": 400,
                    "fibre_g": 0.5,
                    "gi": 25
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 3.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Clear Chicken Soup",
            "description": "A simple, flavorful broth made from simmered chicken bones, served as a palate cleanser alongside the rice dishes.",
            "category": "Soup",
            "estimatedKcal": 40,
            "nutrition": {
                    "protein_g": 5.0,
                    "carb_g": 1.0,
                    "fat_g": 1.5,
                    "sodium_mg": 600,
                    "fibre_g": 0.0,
                    "gi": 0
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 2.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Steamed Kai Lan",
            "description": "Fresh Chinese broccoli lightly steamed and drizzled with oyster sauce for a healthy, crunchy side.",
            "category": "Side",
            "estimatedKcal": 45,
            "nutrition": {
                    "protein_g": 3.5,
                    "carb_g": 6.0,
                    "fat_g": 1.5,
                    "sodium_mg": 350,
                    "fibre_g": 3.0,
                    "gi": 15
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 3.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Soy Sauce Egg",
            "description": "Hard-boiled egg marinated in a savory soy sauce blend, perfect as a flavorful accompaniment.",
            "category": "Side",
            "estimatedKcal": 80,
            "nutrition": {
                    "protein_g": 7.0,
                    "carb_g": 1.0,
                    "fat_g": 5.5,
                    "sodium_mg": 600,
                    "fibre_g": 0.0,
                    "gi": 0
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 1.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Barley Drink",
            "description": "Chilled sweet barley water, a traditional refreshing beverage to complement the meal.",
            "category": "Drink",
            "estimatedKcal": 90,
            "nutrition": {
                    "protein_g": 0.5,
                    "carb_g": 22.0,
                    "fat_g": 0.0,
                    "sodium_mg": 10,
                    "fibre_g": 1.0,
                    "gi": 50
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 1.8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    }
  ],
  "village-park-restaurant": [
    {
            "name": "Nasi Lemak with Fried Chicken",
            "description": "Fragrant coconut milk rice served with crispy golden fried chicken, sambal, anchovies, peanuts, cucumber slices, and a boiled egg.",
            "category": "Main",
            "estimatedKcal": 780,
            "nutrition": {
                    "protein_g": 35.0,
                    "carb_g": 75.0,
                    "fat_g": 38.0,
                    "sodium_mg": 1400,
                    "fibre_g": 3.0,
                    "gi": 60
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1400mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~38g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~35g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Nasi Lemak with Beef Rendang",
            "description": "Traditional nasi lemak paired with tender, slow-cooked beef rendang simmered in rich coconut gravy and aromatic spices.",
            "category": "Main",
            "estimatedKcal": 780,
            "nutrition": {
                    "protein_g": 35.0,
                    "carb_g": 75.0,
                    "fat_g": 38.0,
                    "sodium_mg": 1400,
                    "fibre_g": 3.0,
                    "gi": 60
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-sodium",
                            "note": "Contains ~1400mg sodium per serving"
                    },
                    {
                            "flag": "high-fat",
                            "note": "Contains ~38g fat per serving"
                    },
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~35g per serving"
                    },
                    {
                            "flag": "high-sugar",
                            "note": "High in sugars"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Ayam Goreng Berempah",
            "description": "Spiced fried chicken marinated with a blend of Malay herbs and deep-fried to a crispy perfection, served with a side of sambal.",
            "category": "Side",
            "estimatedKcal": 350,
            "nutrition": {
                    "protein_g": 28.0,
                    "carb_g": 8.0,
                    "fat_g": 22.0,
                    "sodium_mg": 700,
                    "fibre_g": 1.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "high-protein",
                            "note": "Good protein source: ~28.0g per serving"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Sambal Sotong",
            "description": "Fresh squid cooked in a spicy and tangy sambal chili paste, a classic Malay seafood delicacy.",
            "category": "Side",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 10.0,
                    "carb_g": 12.0,
                    "fat_g": 4.0,
                    "sodium_mg": 450,
                    "fibre_g": 0.5,
                    "gi": 40
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Sup Tulang",
            "description": "Hearty bone marrow soup simmered with fragrant spices and herbs, served piping hot to complement your meal.",
            "category": "Soup",
            "estimatedKcal": 350,
            "nutrition": {
                    "protein_g": 25.0,
                    "carb_g": 8.0,
                    "fat_g": 25.0,
                    "sodium_mg": 900,
                    "fibre_g": 1.5,
                    "gi": 30
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Teh Tarik",
            "description": "Classic Malaysian pulled tea with a perfect balance of strong black tea and creamy sweetened condensed milk.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 18.0,
                    "fat_g": 4.0,
                    "sodium_mg": 60,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Kuih Lapis",
            "description": "Traditional layered steamed cake made from rice flour and coconut milk, offering a soft and slightly sweet bite.",
            "category": "Dessert",
            "estimatedKcal": 220,
            "nutrition": {
                    "protein_g": 3.0,
                    "carb_g": 42.0,
                    "fat_g": 5.0,
                    "sodium_mg": 120,
                    "fibre_g": 0.5,
                    "gi": 60
            },
            "confidence": "medium",
            "source": "hpb_lookup_table",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    },
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    },
    {
            "name": "Roti Canai with Dhal Curry",
            "description": "Flaky and crispy flatbread served with a side of mildly spiced lentil dhal, perfect for dipping and soaking up flavors.",
            "category": "Snack",
            "estimatedKcal": 550,
            "nutrition": {
                    "protein_g": 15.0,
                    "carb_g": 65.0,
                    "fat_g": 22.0,
                    "sodium_mg": 700,
                    "fibre_g": 8.0,
                    "gi": 55
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": null,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "halal",
                            "note": "Halal-certified venue"
                    }
            ]
    }
  ],
  "ya-kun-kaya-toast": [
    {
            "name": "Kaya Toast Set",
            "description": "Traditional toasted bread spread with fragrant kaya and butter, served with soft boiled eggs and a cup of kopi or teh.",
            "category": "Breakfast",
            "estimatedKcal": 420,
            "nutrition": {
                    "protein_g": 14.0,
                    "carb_g": 50.0,
                    "fat_g": 18.0,
                    "sodium_mg": 600,
                    "fibre_g": 2.0,
                    "gi": 62
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 5.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Soft Boiled Eggs",
            "description": "Freshly boiled eggs with a silky runny yolk, lightly seasoned with soy sauce and white pepper, perfect for dipping kaya toast.",
            "category": "Side",
            "estimatedKcal": 140,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 1.0,
                    "fat_g": 10.0,
                    "sodium_mg": 200,
                    "fibre_g": 0.0,
                    "gi": 5
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 1.8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "French Toast",
            "description": "Thick slices of bread dipped in egg batter, fried golden and served with butter and kaya for a sweet and savory treat.",
            "category": "Breakfast",
            "estimatedKcal": 380,
            "nutrition": {
                    "protein_g": 10.0,
                    "carb_g": 45.0,
                    "fat_g": 18.0,
                    "sodium_mg": 400,
                    "fibre_g": 1.5,
                    "gi": 65
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 4.8,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
    },
    {
            "name": "Kopi",
            "description": "Traditional Singapore-style coffee brewed from robusta beans, served hot with condensed milk for a rich and creamy flavor.",
            "category": "Drink",
            "estimatedKcal": 80,
            "nutrition": {
                    "protein_g": 1.0,
                    "carb_g": 12.0,
                    "fat_g": 3.0,
                    "sodium_mg": 30,
                    "fibre_g": 0.0,
                    "gi": 40
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 2.2,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Teh",
            "description": "Classic pulled tea made with strong black tea and condensed milk, creating a smooth and fragrant cup.",
            "category": "Drink",
            "estimatedKcal": 70,
            "nutrition": {
                    "protein_g": 1.0,
                    "carb_g": 11.0,
                    "fat_g": 2.0,
                    "sodium_mg": 25,
                    "fibre_g": 0.0,
                    "gi": 38
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 2.2,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Soft Boiled Eggs with Toast",
            "description": "Two soft boiled eggs served with a slice of buttered toast, perfect for a light and comforting breakfast.",
            "category": "Breakfast",
            "estimatedKcal": 140,
            "nutrition": {
                    "protein_g": 12.0,
                    "carb_g": 1.0,
                    "fat_g": 10.0,
                    "sodium_mg": 200,
                    "fibre_g": 0.0,
                    "gi": 5
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 3.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Iced Kopi",
            "description": "Chilled traditional kopi served over ice, offering a refreshing twist on the classic kopi experience.",
            "category": "Drink",
            "estimatedKcal": 120,
            "nutrition": {
                    "protein_g": 1.5,
                    "carb_g": 15.0,
                    "fat_g": 5.0,
                    "sodium_mg": 50,
                    "fibre_g": 0.0,
                    "gi": 45
            },
            "confidence": "medium",
            "source": "llm_estimated",
            "price_sgd": 2.5,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "low-calorie",
                            "note": "Under 300 kcal per serving"
                    }
            ]
    },
    {
            "name": "Butter Kaya Toast",
            "description": "Golden toasted bread generously spread with creamy kaya and a slab of cold butter, a beloved Singaporean snack.",
            "category": "Snack",
            "estimatedKcal": 420,
            "nutrition": {
                    "protein_g": 14.0,
                    "carb_g": 50.0,
                    "fat_g": 18.0,
                    "sodium_mg": 600,
                    "fibre_g": 2.0,
                    "gi": 62
            },
            "confidence": "high",
            "source": "hpb_lookup_table",
            "price_sgd": 3.0,
            "image_url": "",
            "healthFlags": [
                    {
                            "flag": "balanced",
                            "note": "Well-balanced macronutrient profile"
                    }
            ]
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
