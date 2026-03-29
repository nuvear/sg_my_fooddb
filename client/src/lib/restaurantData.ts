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
// Last updated: 2026-03-29T09:21:39.823453+00:00
// Source: agent_data_merger.py
export const SCRAPED_DISHES: Record<string, ScrapedDish[]> = {
  "tian-tian": [
    {
        "name": "Hainanese Chicken Rice",
        "description": "Poached tender chicken served with fragrant oily rice, accompanied by chili sauce, ginger paste, and dark soy sauce.",
        "category": "Main",
        "estimatedKcal": 600,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 70.0,
            "fat_g": 20.0,
            "sodium_mg": 1200,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and chili sauce which contribute to sodium content"},
            {"flag": "high-fat", "note": "Oily rice preparation increases fat content"}
        ]
    },
    {
        "name": "Roasted Chicken Rice",
        "description": "Succulent roasted chicken served with aromatic chicken rice, complemented by chili sauce, ginger paste, and dark soy sauce.",
        "category": "Main",
        "estimatedKcal": 600,
        "nutrition": {
            "protein_g": 35.0,
            "carb_g": 65.0,
            "fat_g": 20.0,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 70
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and chili sauce"},
            {"flag": "moderate-fat", "note": "Roasted chicken skin contributes to fat content"}
        ]
    },
    {
        "name": "Chicken Porridge",
        "description": "Smooth and comforting rice porridge cooked with tender chicken slices, garnished with spring onions and fried shallots.",
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
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "moderate-sodium", "note": "Contains chicken broth and soy sauce"}
        ]
    },
    {
        "name": "Chicken Liver and Gizzard",
        "description": "Tender chicken liver and gizzard blanched and served with a light soy-based sauce, perfect as a side dish.",
        "category": "Side",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 3.0,
            "fat_g": 8.0,
            "sodium_mg": 600,
            "fibre_g": 0.5,
            "gi": 15
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy-based sauce"}
        ]
    },
    {
        "name": "Soup of the Day",
        "description": "Clear broth soup made from chicken bones and herbs, served as a light accompaniment to the meal.",
        "category": "Soup",
        "estimatedKcal": 40,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 2.0,
            "fat_g": 1.5,
            "sodium_mg": 600,
            "fibre_g": 0.5,
            "gi": 10
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "moderate-sodium", "note": "Contains broth with added salt and herbs"}
        ]
    },
    {
        "name": "Steamed Vegetables",
        "description": "Fresh seasonal greens lightly steamed and served with a drizzle of oyster sauce.",
        "category": "Side",
        "estimatedKcal": 70,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 8.0,
            "fat_g": 2.0,
            "sodium_mg": 400,
            "fibre_g": 3.5,
            "gi": 30
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "moderate-sodium", "note": "Contains oyster sauce which adds sodium"}
        ]
    }
  ],
  "song-fa": [
    {
        "name": "Bak Kut Teh (Pork Rib Soup)",
        "description": "Traditional Teochew-style pork rib soup simmered with a blend of herbs and spices, served piping hot with tender pork ribs.",
        "category": "Main Course",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 6.0,
            "fat_g": 18.0,
            "sodium_mg": 1200,
            "fibre_g": 1.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 8.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains high sodium from soy sauce and preserved ingredients in broth"},
            {"flag": "high-fat", "note": "Pork ribs contribute to fat content exceeding 20g"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g due to pork ribs"},
            {"flag": "spicy", "note": "Typically served with chilli padi or spicy condiments"},
            {"flag": "halal", "note": "Dish is not halal due to pork content"}
        ]
    },
    {
        "name": "You Char Kway (Fried Dough Fritters)",
        "description": "Crispy and golden fried dough sticks, perfect for dipping into the rich Bak Kut Teh broth.",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 22.0,
            "fat_g": 9.0,
            "sodium_mg": 300,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Deep-fried dough results in fat content above 8g"}
        ]
    },
    {
        "name": "Braised Pork Trotters",
        "description": "Succulent pork trotters slow-cooked in a fragrant herbal soy sauce, tender and flavorful.",
        "category": "Sides",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 6.0,
            "fat_g": 28.0,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 35
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and herbal broth with added salt"},
            {"flag": "high-fat", "note": "Pork trotters are rich in fat, especially skin and connective tissue"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g per serving"},
            {"flag": "halal", "note": "Dish is commonly halal when prepared in halal-certified restaurants"},
            {"flag": "soft-foods", "note": "Tender, slow-cooked meat suitable for soft diet"}
        ]
    },
    {
        "name": "Braised Peanuts",
        "description": "Soft and aromatic peanuts braised in a rich herbal broth, a classic accompaniment to Bak Kut Teh.",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 8.0,
            "carb_g": 12.0,
            "fat_g": 14.0,
            "sodium_mg": 700,
            "fibre_g": 4.0,
            "gi": 15
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Peanuts are naturally high in fat"},
            {"flag": "soft-foods", "note": "Braised peanuts are soft and suitable for elderly/soft diet"},
            {"flag": "halal", "note": "Typically halal as no pork or alcohol used in braising"}
        ]
    },
    {
        "name": "Salted Vegetable Soup",
        "description": "Light and tangy soup made with preserved vegetables, often served alongside Bak Kut Teh to balance flavors.",
        "category": "Soup",
        "estimatedKcal": 60,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 6.0,
            "fat_g": 1.0,
            "sodium_mg": 900,
            "fibre_g": 1.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains preserved salted vegetables contributing to high sodium content"},
            {"flag": "low-calorie", "note": "Low calorie due to mostly broth and vegetables"},
            {"flag": "halal", "note": "Commonly served in halal-certified establishments"},
            {"flag": "vegetarian", "note": "Typically vegetarian if no meat broth used; however, often served with meat dishes"},
            {"flag": "soft-foods", "note": "Soup with soft vegetables suitable for soft diets"}
        ]
    },
    {
        "name": "Steamed White Rice",
        "description": "Fluffy steamed jasmine rice, the perfect base to enjoy with Bak Kut Teh and its flavorful sides.",
        "category": "Sides",
        "estimatedKcal": 200,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 45.0,
            "fat_g": 0.4,
            "sodium_mg": 0,
            "fibre_g": 0.6,
            "gi": 73
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories below 300 kcal per serving"},
            {"flag": "vegetarian", "note": "Contains no meat or seafood"}
        ]
    },
    {
        "name": "Chinese Tea (Pu-erh or Oolong)",
        "description": "Traditional Chinese tea served hot to complement the rich and herbal Bak Kut Teh meal.",
        "category": "Drinks",
        "estimatedKcal": 0,
        "nutrition": {
            "protein_g": 0,
            "carb_g": 0,
            "fat_g": 0,
            "sodium_mg": 0,
            "fibre_g": 0,
            "gi": 0
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "No calories or macronutrients as it is plain brewed tea"},
            {"flag": "balanced", "note": "No added sugar, fat or sodium"},
            {"flag": "halal", "note": "Commonly halal as it is a plain tea beverage"}
        ]
    },
    {
        "name": "Braised Egg",
        "description": "Eggs slow-cooked in a soy-based herbal broth, absorbing deep flavors and served as a savory side.",
        "category": "Sides",
        "estimatedKcal": 80,
        "nutrition": {
            "protein_g": 6.5,
            "carb_g": 2.0,
            "fat_g": 5.5,
            "sodium_mg": 700,
            "fibre_g": 0.0,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and herbal broth with moderate sodium"}
        ]
    }
  ],
  "tai-hwa": [
    {
        "name": "Dry Bak Chor Mee",
        "description": "Springy egg noodles tossed in a tangy vinegar and chili sauce, topped with minced pork, pork slices, pork liver, mushrooms, and crispy pork lard.",
        "category": "Noodles",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 60.0,
            "fat_g": 22.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, fish sauce, and preserved ingredients contributing to sodium >800mg"},
            {"flag": "high-fat", "note": "Includes pork lard and fatty pork cuts, fat content >20g"},
            {"flag": "high-protein", "note": "Rich in pork protein, protein content >25g"},
            {"flag": "spicy", "note": "Contains chili sauce"},
            {"flag": "halal", "note": "Typically not halal due to pork content"}
        ]
    },
    {
        "name": "Soup Bak Chor Mee",
        "description": "Classic Teochew-style egg noodles served in a clear, flavorful pork broth with minced pork, pork slices, pork liver, mushrooms, and greens.",
        "category": "Noodles",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 55.0,
            "fat_g": 15.0,
            "sodium_mg": 1200,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains pork broth and soy sauce, contributing to sodium >800mg"},
            {"flag": "high-protein", "note": "Contains minced pork, pork slices, and liver, protein >25g"},
            {"flag": "balanced", "note": "Moderate fat and carbohydrate content with good protein"},
            {"flag": "halal", "note": "Typically non-halal due to pork content"},
            {"flag": "spicy", "note": "Optional chilli added by diner, not inherent"}
        ]
    },
    {
        "name": "Bak Chor Mee with Extra Pork Liver",
        "description": "Dry Bak Chor Mee enhanced with an additional serving of tender pork liver for a richer taste experience.",
        "category": "Noodles",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 35.0,
            "carb_g": 60.0,
            "fat_g": 18.0,
            "sodium_mg": 1200,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, pork liver, and preserved ingredients contributing to high sodium"},
            {"flag": "high-protein", "note": "Extra pork liver increases protein content above 25g"},
            {"flag": "balanced", "note": "Moderate fat and carbohydrate levels with good protein"},
            {"flag": "spicy", "note": "Typically served with chilli"},
            {"flag": "halal", "note": "Not halal due to pork content"}
        ]
    },
    {
        "name": "Braised Pork Intestines",
        "description": "Tender and flavorful braised pork intestines cooked in a savory soy-based sauce, served as a side dish.",
        "category": "Sides",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 8.0,
            "fat_g": 15.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and braising liquids high in sodium"},
            {"flag": "high-fat", "note": "Pork intestines are high in fat content"},
            {"flag": "high-protein", "note": "Protein content exceeds 15g per serving"},
            {"flag": "halal", "note": "Commonly halal when prepared in halal-certified stalls"}
        ]
    },
    {
        "name": "Braised Egg",
        "description": "Soy-braised egg with a rich, savory flavor, commonly paired with noodle dishes.",
        "category": "Sides",
        "estimatedKcal": 80,
        "nutrition": {
            "protein_g": 6.5,
            "carb_g": 2.0,
            "fat_g": 5.5,
            "sodium_mg": 650,
            "fibre_g": 0.0,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, contributing to sodium content close to threshold"}
        ]
    },
    {
        "name": "Barley Drink",
        "description": "Refreshing chilled barley water, a traditional Singaporean beverage to complement the meal.",
        "category": "Drinks",
        "estimatedKcal": 60,
        "nutrition": {
            "protein_g": 0.5,
            "carb_g": 15,
            "fat_g": 0,
            "sodium_mg": 10,
            "fibre_g": 1.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Low calorie beverage"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal as a plant-based drink"}
        ]
    },
    {
        "name": "Soy Sauce Chicken",
        "description": "Tender chicken braised in a fragrant soy sauce blend, served as a side or topping option.",
        "category": "Sides",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 3.0,
            "fat_g": 15.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 15
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, which is high in sodium"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g per serving"},
            {"flag": "halal", "note": "Commonly halal when prepared with halal chicken"}
        ]
    }
  ],
  "liao-fan": [
    {
        "name": "Soya Sauce Chicken Rice",
        "description": "Tender chicken braised in a rich soya sauce, served with fragrant steamed white rice and a side of lightly blanched greens.",
        "category": "Main Course",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 65.0,
            "fat_g": 15.0,
            "sodium_mg": 1200,
            "fibre_g": 3.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Braised chicken and soy sauce contribute to high sodium content"},
            {"flag": "high-protein", "note": "Chicken provides over 25g protein per serving"},
            {"flag": "balanced", "note": "Reasonable macronutrient distribution for a main meal"},
            {"flag": "halal", "note": "Commonly halal-certified in Singapore hawker context"}
        ]
    },
    {
        "name": "Soya Sauce Chicken Noodle",
        "description": "Succulent soya sauce chicken served over springy egg noodles with a drizzle of savory sauce and fresh greens.",
        "category": "Noodles",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 60.0,
            "fat_g": 15.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soya sauce and savory sauce, contributing to sodium >800mg"},
            {"flag": "high-protein", "note": "Chicken portion provides protein >25g"},
            {"flag": "spicy", "note": "Typically mild, but may contain slight pepper; flag included if chili present"},
            {"flag": "halal", "note": "Commonly halal-certified in Singapore hawker context"}
        ]
    },
    {
        "name": "Char Siu Rice",
        "description": "Slices of sweet and smoky Cantonese barbecued pork served atop steamed rice with a side of greens and dipping sauce.",
        "category": "Main Course",
        "estimatedKcal": 600,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 75.0,
            "fat_g": 18.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and preserved ingredients contributing to sodium >800mg"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g due to pork slices"}
        ]
    },
    {
        "name": "Roast Pork Rice",
        "description": "Crispy-skinned roast pork belly served with steamed rice and a side of blanched vegetables, accompanied by a tangy dipping sauce.",
        "category": "Main Course",
        "estimatedKcal": 700,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 65.0,
            "fat_g": 35.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and dipping sauce contributing to sodium content"},
            {"flag": "high-fat", "note": "Roast pork belly is high in fat, especially with crispy skin"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g per serving"}
        ]
    },
    {
        "name": "Braised Egg",
        "description": "Soy-braised egg with a rich, savory flavor, perfect as a side to complement the main dishes.",
        "category": "Sides",
        "estimatedKcal": 70,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 2.0,
            "fat_g": 5.0,
            "sodium_mg": 650,
            "fibre_g": 0.0,
            "gi": 0
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, contributing to sodium content close to 650mg per egg"}
        ]
    },
    {
        "name": "Vegetables with Oyster Sauce",
        "description": "Fresh seasonal greens blanched and drizzled with a savory oyster sauce, a classic Cantonese side dish.",
        "category": "Sides",
        "estimatedKcal": 70,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 8.0,
            "fat_g": 3.5,
            "sodium_mg": 700,
            "fibre_g": 3.0,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains oyster sauce which is high in sodium, close to 700mg per serving"},
            {"flag": "vegetarian", "note": "Contains oyster sauce, so not strictly vegetarian but no meat or seafood pieces"},
            {"flag": "low-calorie", "note": "Low calorie side dish with mostly vegetables"},
            {"flag": "halal", "note": "Commonly halal in Singapore hawker context"}
        ]
    },
    {
        "name": "Barley Drink",
        "description": "Chilled sweet barley water, a refreshing traditional beverage to complement the meal.",
        "category": "Drinks",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 0.5,
            "carb_g": 22,
            "fat_g": 0,
            "sodium_mg": 10,
            "fibre_g": 1.5,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains added sugar typical of sweetened barley drinks"},
            {"flag": "low-calorie", "note": "Below 300 kcal per serving"},
            {"flag": "vegetarian", "note": "No animal products"},
            {"flag": "halal", "note": "Commonly halal as a non-alcoholic beverage"}
        ]
    }
  ],
  "roland-restaurant": [
    {
        "name": "White Pepper Crab",
        "description": "Fresh Sri Lankan crab stir-fried with aromatic white pepper, delivering a spicy and peppery flavor that is a hallmark of No Signboard Seafood.",
        "category": "Main Course",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 45.0,
            "carb_g": 15.0,
            "fat_g": 30.0,
            "sodium_mg": 1200,
            "fibre_g": 1.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, seasoning, and seafood naturally high in sodium"},
            {"flag": "high-fat", "note": "Stir-fried in oil and butter, contributing to fat content"},
            {"flag": "high-protein", "note": "Crab meat is rich in protein, exceeding 25g per serving"},
            {"flag": "spicy", "note": "Contains white pepper, contributing to spiciness"},
            {"flag": "halal", "note": "Seafood dish commonly halal"}
        ]
    },
    {
        "name": "Chilli Crab",
        "description": "Classic Singaporean chilli crab cooked in a tangy, sweet and spicy tomato-based sauce, served with deep-fried mantou buns for dipping.",
        "category": "Main Course",
        "estimatedKcal": 850,
        "nutrition": {
            "protein_g": 45.0,
            "carb_g": 70.0,
            "fat_g": 35.0,
            "sodium_mg": 1500,
            "fibre_g": 3.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, fish sauce, and salted crab paste contributing to high sodium"},
            {"flag": "high-fat", "note": "Deep-fried mantou buns and cooking oil increase fat content"},
            {"flag": "high-protein", "note": "Crab meat provides high protein content"},
            {"flag": "spicy", "note": "Contains chilli peppers in the sauce"},
            {"flag": "halal", "note": "Seafood and typical ingredients are halal-friendly"}
        ]
    },
    {
        "name": "Black Pepper Crab",
        "description": "Succulent crab wok-fried with a robust black pepper sauce, offering a bold and peppery taste with a hint of sweetness.",
        "category": "Main Course",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 45.0,
            "carb_g": 25.0,
            "fat_g": 30.0,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, black pepper sauce, and seasoning contributing to high sodium"},
            {"flag": "high-fat", "note": "Wok-fried with oil and sauce, fat content exceeds 20g"},
            {"flag": "high-protein", "note": "Crab meat provides high protein content"},
            {"flag": "spicy", "note": "Black pepper provides spiciness"},
            {"flag": "halal", "note": "Seafood dish commonly halal"}
        ]
    },
    {
        "name": "Salted Egg Prawns",
        "description": "Fresh prawns coated in a rich and creamy salted egg yolk sauce, garnished with curry leaves and chili for an irresistible umami flavor.",
        "category": "Main Course",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 20.0,
            "fat_g": 45.0,
            "sodium_mg": 1200,
            "fibre_g": 1.5,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 38.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Salted egg yolk and seasoning contribute to high sodium content"},
            {"flag": "high-fat", "note": "Rich salted egg yolk sauce results in high fat content"},
            {"flag": "high-protein", "note": "Prawns provide a high protein amount"},
            {"flag": "spicy", "note": "Contains chili"},
            {"flag": "halal", "note": "Commonly halal in Singapore seafood restaurants"}
        ]
    },
    {
        "name": "Sambal Lala",
        "description": "Clams cooked in a spicy and fragrant sambal chili sauce, a fiery and flavorful seafood classic.",
        "category": "Sides",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 18.0,
            "fat_g": 12.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 28.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains sambal chili sauce and added salt, typical for this dish."},
            {"flag": "high-fat", "note": "Sambal sauce contains oil used in cooking."},
            {"flag": "spicy", "note": "Contains chili peppers in sambal."},
            {"flag": "halal", "note": "Seafood dish commonly prepared halal in Singapore."}
        ]
    },
    {
        "name": "Fried Mantou Buns",
        "description": "Golden deep-fried fluffy buns, perfect for dipping into crab sauces or enjoyed as a side.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 40.0,
            "fat_g": 14.0,
            "sodium_mg": 350,
            "fibre_g": 1.5,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Deep-fried mantou buns contain significant fat from frying oil"}
        ]
    },
    {
        "name": "Seafood Fried Rice",
        "description": "Fragrant fried rice wok-tossed with fresh seafood, eggs, and vegetables, a hearty accompaniment to seafood dishes.",
        "category": "Noodles & Rice",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 65.0,
            "fat_g": 18.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 18.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and seafood contributing to sodium content"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g due to seafood and eggs"}
        ]
    },
    {
        "name": "Barley Lime Drink",
        "description": "Refreshing barley drink infused with lime juice, a cooling beverage to balance the spicy seafood flavors.",
        "category": "Drinks",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 1.0,
            "carb_g": 22.0,
            "fat_g": 0.1,
            "sodium_mg": 10,
            "fibre_g": 1.5,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories under 300 kcal per serving"},
            {"flag": "vegetarian", "note": "Contains no meat or seafood"},
            {"flag": "halal", "note": "Commonly halal as a non-alcoholic beverage"}
        ]
    }
  ],
  "jumbo-seafood": [
    {
        "name": "Chilli Crab",
        "description": "Fresh Sri Lankan crabs stir-fried in a tangy, sweet and spicy tomato-based chilli sauce, served with deep-fried mantou buns for dipping.",
        "category": "Main Course",
        "estimatedKcal": 850,
        "nutrition": {
            "protein_g": 45.0,
            "carb_g": 70.0,
            "fat_g": 35.0,
            "sodium_mg": 1500,
            "fibre_g": 4.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, fish sauce, and salted preserved ingredients in sauce"},
            {"flag": "high-fat", "note": "Deep-fried mantou buns and cooking oil contribute to fat content"},
            {"flag": "high-protein", "note": "Large crab serving provides high protein"},
            {"flag": "spicy", "note": "Chilli sauce contains chilli peppers"},
            {"flag": "halal", "note": "Jumbo Seafood is halal-certified"}
        ]
    },
    {
        "name": "Black Pepper Crab",
        "description": "Whole Sri Lankan crab wok-fried in a robust black pepper sauce with a hint of garlic and butter, delivering a spicy and aromatic flavor.",
        "category": "Main Course",
        "estimatedKcal": 700,
        "nutrition": {
            "protein_g": 50.0,
            "carb_g": 15.0,
            "fat_g": 40.0,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and seasoning sauces contributing to sodium >800mg"},
            {"flag": "high-fat", "note": "Butter and oil used in wok-frying increase fat content >20g"},
            {"flag": "high-protein", "note": "Whole crab provides protein >25g"},
            {"flag": "spicy", "note": "Black pepper and chili used in sauce"},
            {"flag": "halal", "note": "Seafood dish commonly halal"}
        ]
    },
    {
        "name": "Cereal Prawns",
        "description": "Large prawns deep-fried and tossed in a crispy, buttery cereal coating with curry leaves and dried chili for a fragrant crunch.",
        "category": "Main Course",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 35.0,
            "fat_g": 40.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 38.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains seasoning sauces and salted butter contributing to sodium content"},
            {"flag": "high-fat", "note": "Deep-fried prawns with buttery cereal coating increases fat content"},
            {"flag": "high-protein", "note": "Prawns provide high protein content exceeding 25g"},
            {"flag": "spicy", "note": "Contains dried chili"},
            {"flag": "halal", "note": "Seafood dish commonly halal"}
        ]
    },
    {
        "name": "Steamed Soon Hock Fish",
        "description": "Fresh soon hock fish steamed to perfection with ginger, scallions, and light soy sauce, highlighting the natural sweetness of the fish.",
        "category": "Main Course",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 35.0,
            "carb_g": 3.0,
            "fat_g": 7.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 10
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 48.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains light soy sauce contributing to sodium content"},
            {"flag": "high-protein", "note": "Fish provides high protein content (>25g)"},
            {"flag": "low-calorie", "note": "Relatively low calorie for a main course"},
            {"flag": "halal", "note": "Seafood dish commonly halal"},
            {"flag": "soft-foods", "note": "Steamed fish is tender and suitable for soft diets"}
        ]
    },
    {
        "name": "Sambal Kangkong",
        "description": "Stir-fried water spinach in a spicy and tangy sambal chili paste, a classic Singaporean vegetable side dish.",
        "category": "Sides",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 10.0,
            "fat_g": 8.0,
            "sodium_mg": 900,
            "fibre_g": 3.5,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains sambal chili paste and soy sauce contributing to sodium content"},
            {"flag": "spicy", "note": "Contains chili in sambal paste"},
            {"flag": "halal", "note": "Commonly halal as no pork or non-halal ingredients are used"},
            {"flag": "vegetarian", "note": "No meat or seafood included"}
        ]
    },
    {
        "name": "Salted Egg Yolk Crab",
        "description": "Sri Lankan crab wok-fried in a rich and creamy salted egg yolk sauce with curry leaves and chili padi.",
        "category": "Main Course",
        "estimatedKcal": 850,
        "nutrition": {
            "protein_g": 45.0,
            "carb_g": 25.0,
            "fat_g": 55.0,
            "sodium_mg": 1600,
            "fibre_g": 3.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 90.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Salted egg yolk and seasoning contribute to high sodium content"},
            {"flag": "high-fat", "note": "Rich salted egg yolk sauce is high in fat"},
            {"flag": "high-protein", "note": "Crab meat provides high protein content"},
            {"flag": "spicy", "note": "Contains chili padi"},
            {"flag": "halal", "note": "Commonly halal-certified at Jumbo Seafood"}
        ]
    },
    {
        "name": "Fried Mantou Buns",
        "description": "Golden deep-fried fluffy buns, perfect for dipping into sauces like chilli crab or black pepper crab.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 40.0,
            "fat_g": 14.0,
            "sodium_mg": 350,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Deep-fried mantou buns contain significant oil absorption"}
        ]
    },
    {
        "name": "Barley Lime Drink",
        "description": "Refreshing barley drink infused with lime juice, a popular local thirst quencher to balance the spicy seafood flavors.",
        "category": "Drinks",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 1.0,
            "carb_g": 22.0,
            "fat_g": 0.2,
            "sodium_mg": 10,
            "fibre_g": 1.5,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Drink contains less than 300 kcal per serving"},
            {"flag": "vegetarian", "note": "No animal products used"}
        ]
    }
  ],
  "ya-kun": [
    {
        "name": "Kaya Toast Set",
        "description": "Traditional toasted bread spread generously with fragrant kaya and butter, served with soft-boiled eggs and a cup of kopi or tea.",
        "category": "Main Course",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 14.0,
            "carb_g": 50.0,
            "fat_g": 18.0,
            "sodium_mg": 650,
            "fibre_g": 2.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains butter and kaya which are high in fat"},
            {"flag": "balanced", "note": "Moderate protein and carbohydrate content with no extreme flags"},
            {"flag": "soft-foods", "note": "Soft-boiled eggs suitable for soft diet"},
            {"flag": "halal", "note": "Commonly halal-certified in Singapore kopitiams"}
        ]
    },
    {
        "name": "Soft Boiled Eggs",
        "description": "Fresh eggs boiled to a perfect soft consistency, served with a dash of soy sauce and white pepper for dipping.",
        "category": "Sides",
        "estimatedKcal": 140,
        "nutrition": {
            "protein_g": 12.0,
            "carb_g": 1.0,
            "fat_g": 10.0,
            "sodium_mg": 450,
            "fibre_g": 0,
            "gi": 0
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories less than 300 kcal per serving"},
            {"flag": "halal", "note": "Eggs are halal and commonly consumed in halal diets"},
            {"flag": "soft-foods", "note": "Soft boiled eggs are suitable for elderly or soft diet"}
        ]
    },
    {
        "name": "French Toast",
        "description": "Thick slices of bread dipped in egg batter, fried golden and served with butter and kaya or condensed milk.",
        "category": "Main Course",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 12.0,
            "carb_g": 50.0,
            "fat_g": 18.0,
            "sodium_mg": 600,
            "fibre_g": 2.0,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains butter and fried in oil"},
            {"flag": "high-sugar", "note": "Kaya or condensed milk adds significant sugar"}
        ]
    },
    {
        "name": "Kopi",
        "description": "Traditional Singaporean coffee brewed from Robusta beans, served hot or iced, with condensed milk for a rich and smooth taste.",
        "category": "Drinks",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 18.0,
            "fat_g": 3.5,
            "sodium_mg": 40,
            "fibre_g": 0,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains condensed milk with added sugar, approx 10-12g sugar per serving"},
            {"flag": "low-calorie", "note": "Below 300 kcal per serving"},
            {"flag": "halal", "note": "Commonly halal as no alcohol or non-halal ingredients"}
        ]
    },
    {
        "name": "Milo",
        "description": "Classic chocolate malt drink served hot or iced, a favorite local beverage enjoyed by all ages.",
        "category": "Drinks",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 30.0,
            "fat_g": 4.5,
            "sodium_mg": 150,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains added sugar from Milo powder and condensed milk"},
            {"flag": "balanced", "note": "Moderate calories and macros typical of malted chocolate drinks"},
            {"flag": "halal", "note": "Commonly halal-certified in Singapore"}
        ]
    },
    {
        "name": "Teh Tarik",
        "description": "Pulled tea with condensed milk, served hot or iced, known for its frothy texture and sweet, creamy flavor.",
        "category": "Drinks",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 25.0,
            "fat_g": 4.0,
            "sodium_mg": 50,
            "fibre_g": 0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains condensed milk with added sugar, approx 20g sugar per serving"}
        ]
    },
    {
        "name": "Butter Sugar Toast",
        "description": "Simple yet delicious toasted bread slathered with butter and sprinkled with sugar for a sweet crunch.",
        "category": "Sides",
        "estimatedKcal": 250,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 30.0,
            "fat_g": 12.0,
            "sodium_mg": 200,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains butter, contributing to fat content over 10g"}
        ]
    },
    {
        "name": "Soft Boiled Eggs with Toast",
        "description": "Two soft boiled eggs served with a side of kaya toast, perfect for a light and traditional breakfast.",
        "category": "Main Course",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 35.0,
            "fat_g": 15.0,
            "sodium_mg": 700,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "balanced", "note": "Moderate calories, protein, fat, and sodium; typical for breakfast."},
            {"flag": "soft-foods", "note": "Soft boiled eggs and toast suitable for elderly or soft diet."},
            {"flag": "halal", "note": "Commonly halal-certified in Singapore kopitiams."}
        ]
    }
  ],
  "old-chang-kee": [
    {
        "name": "Curry Puff",
        "description": "Flaky pastry filled with a spicy curried potato and chicken filling, a beloved Singaporean snack.",
        "category": "Snacks",
        "estimatedKcal": 250,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 30.0,
            "fat_g": 12.0,
            "sodium_mg": 600,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "spicy", "note": "Contains curry spices and chilli"},
            {"flag": "halal", "note": "Commonly halal-certified in Singaporean snack stalls"}
        ]
    },
    {
        "name": "Chicken Wing",
        "description": "Deep-fried marinated chicken wings with a crispy skin and juicy interior, perfect as a snack or side.",
        "category": "Snacks",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 3.0,
            "fat_g": 15.0,
            "sodium_mg": 700,
            "fibre_g": 0.0,
            "gi": 0
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Deep-fried chicken wing with skin contributes to high fat content"},
            {"flag": "halal", "note": "Commonly halal-certified in Singaporean hawker stalls"},
            {"flag": "spicy", "note": "May contain chilli in marinade depending on recipe"}
        ]
    },
    {
        "name": "Otah",
        "description": "Spicy fish paste mixed with herbs and coconut milk, wrapped in banana leaf and grilled to perfection.",
        "category": "Snacks",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 12.0,
            "carb_g": 8.0,
            "fat_g": 10.0,
            "sodium_mg": 900,
            "fibre_g": 1.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains fish paste and seasoning with soy sauce/fish sauce"},
            {"flag": "spicy", "note": "Contains chilli and pepper"},
            {"flag": "halal", "note": "Commonly halal-certified in Singapore"}
        ]
    },
    {
        "name": "Fish Ball Noodle",
        "description": "Springy fish balls served with yellow noodles in a light, flavorful broth, garnished with greens and fried shallots.",
        "category": "Noodles",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 50.0,
            "fat_g": 8.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Broth and fish balls contain added salt and seasoning"},
            {"flag": "balanced", "note": "Moderate protein, carbs and fat with reasonable fibre"},
            {"flag": "halal", "note": "Fish balls and noodles commonly halal-certified"}
        ]
    },
    {
        "name": "Sausage Roll",
        "description": "Buttery puff pastry wrapped around a savory sausage filling, a popular snack for all ages.",
        "category": "Snacks",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 8.0,
            "carb_g": 28.0,
            "fat_g": 20.0,
            "sodium_mg": 700,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains buttery puff pastry with high fat content"}
        ]
    },
    {
        "name": "Vegetarian Curry Puff",
        "description": "A meat-free version of the classic curry puff filled with curried potatoes and vegetables.",
        "category": "Snacks",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 28.0,
            "fat_g": 10.0,
            "sodium_mg": 550,
            "fibre_g": 3.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "balanced", "note": "Moderate calories and fat, no extreme flags"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal-certified at chain outlets like Old Chang Kee"},
            {"flag": "spicy", "note": "Contains curry spices with mild chili"}
        ]
    },
    {
        "name": "Beancurd Skin Roll",
        "description": "Deep-fried beancurd skin rolls stuffed with a savory meat and vegetable filling, crispy and flavorful.",
        "category": "Snacks",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 10.0,
            "carb_g": 15.0,
            "fat_g": 14.0,
            "sodium_mg": 700,
            "fibre_g": 1.5,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Deep-fried preparation results in fat content above 12g"},
            {"flag": "balanced", "note": "Moderate protein and carbohydrate content with no extreme flags"},
            {"flag": "halal", "note": "Commonly prepared with halal meat in Singapore"},
            {"flag": "spicy", "note": "May contain mild chili in filling depending on recipe"}
        ]
    },
    {
        "name": "Iced Milo",
        "description": "Classic Malaysian-style chocolate malt drink served chilled, a refreshing complement to snacks.",
        "category": "Drinks",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 5.0,
            "carb_g": 30.0,
            "fat_g": 3.5,
            "sodium_mg": 80,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains added sugar from Milo powder and sweetened condensed milk"}
        ]
    }
  ],
  "bengawan-solo": [
    {
        "name": "Pandan Layer Cake",
        "description": "Soft and fragrant pandan-flavored layer cake with a delicate buttery texture, a classic Peranakan kueh.",
        "category": "Dessert",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 40.0,
            "fat_g": 15.0,
            "sodium_mg": 180,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 6.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains butter and coconut milk contributing to fat content"},
            {"flag": "low-calorie", "note": "Calories under 300-350 kcal typical for dessert portion"},
            {"flag": "soft-foods", "note": "Soft texture suitable for elderly or soft diet"}
        ]
    },
    {
        "name": "Kueh Lapis",
        "description": "Traditional multi-layered steamed cake made with rich butter and spices, featuring vibrant alternating layers.",
        "category": "Dessert",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 40.0,
            "fat_g": 15.0,
            "sodium_mg": 150,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains rich butter contributing to fat content"},
            {"flag": "low-calorie", "note": "Calories under 300-350 kcal typical for dessert portion"}
        ]
    },
    {
        "name": "Ondeh Ondeh",
        "description": "Glutinous rice balls filled with molten gula melaka (palm sugar) and coated with freshly grated coconut.",
        "category": "Dessert",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 38.0,
            "fat_g": 4.0,
            "sodium_mg": 15,
            "fibre_g": 1.5,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains gula melaka palm sugar filling"},
            {"flag": "low-calorie", "note": "Dessert portion is moderate in calories"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal as ingredients are plant-based"}
        ]
    },
    {
        "name": "Kueh Dadar",
        "description": "Rolled crepe filled with sweet grated coconut cooked in palm sugar, a beloved traditional snack.",
        "category": "Dessert",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 2.5,
            "carb_g": 35.0,
            "fat_g": 8.0,
            "sodium_mg": 50,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar in filling"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"}
        ]
    },
    {
        "name": "Pineapple Tart",
        "description": "Buttery, crumbly tart filled with tangy pineapple jam, a festive favorite especially during holidays.",
        "category": "Dessert",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 2.5,
            "carb_g": 28.0,
            "fat_g": 11.0,
            "sodium_mg": 90,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains butter and pastry dough contributing to fat content"}
        ]
    },
    {
        "name": "Kueh Salat",
        "description": "Two-layered kueh with glutinous rice base topped with smooth pandan custard, steamed to perfection.",
        "category": "Dessert",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 50.0,
            "fat_g": 6.0,
            "sodium_mg": 150,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories under 300 kcal per serving"}
        ]
    },
    {
        "name": "Pulut Hitam",
        "description": "Sweet black glutinous rice porridge served warm with coconut milk, a comforting traditional dessert.",
        "category": "Dessert",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 55.0,
            "fat_g": 7.0,
            "sodium_mg": 50,
            "fibre_g": 3.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories below 300 kcal per serving"},
            {"flag": "vegetarian", "note": "Contains no meat or seafood"}
        ]
    },
    {
        "name": "Bandung Drink",
        "description": "Refreshing rose syrup mixed with evaporated milk, a popular sweet and fragrant local beverage.",
        "category": "Drinks",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 3.5,
            "carb_g": 30.0,
            "fat_g": 5.0,
            "sodium_mg": 80,
            "fibre_g": 0.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains rose syrup with added sugars"}
        ]
    }
  ],
  "lorong-selamat": [
    {
        "name": "Katong Laksa",
        "description": "A rich and spicy coconut milk-based laksa broth served with thick rice vermicelli cut into bite-sized pieces, topped with prawns, cockles, fish cake, and a dollop of sambal chili.",
        "category": "Main Course",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 50.0,
            "fat_g": 25.0,
            "sodium_mg": 1200,
            "fibre_g": 3.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains fish cake, prawns, and sambal chili contributing to sodium content"},
            {"flag": "high-fat", "note": "Rich coconut milk broth increases fat content"},
            {"flag": "high-protein", "note": "Prawns, cockles, and fish cake provide high protein"},
            {"flag": "spicy", "note": "Contains sambal chili"},
            {"flag": "halal", "note": "Commonly halal-certified or prepared with halal ingredients"}
        ]
    },
    {
        "name": "Curry Chicken Noodle",
        "description": "Tender chicken pieces cooked in a fragrant curry gravy, served with yellow noodles and a side of tau pok (fried tofu puffs).",
        "category": "Main Course",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 50.0,
            "fat_g": 22.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains curry gravy and soy-based sauces contributing to sodium >800mg"},
            {"flag": "high-fat", "note": "Curry gravy and fried tau pok increase fat content >20g"},
            {"flag": "high-protein", "note": "Chicken provides protein >25g"},
            {"flag": "spicy", "note": "Contains chilli and spices typical of curry"},
            {"flag": "halal", "note": "Commonly halal in Singapore Peranakan cuisine"}
        ]
    },
    {
        "name": "Mee Siam",
        "description": "Tangy and spicy rice vermicelli served with a sweet and sour tamarind-based gravy, garnished with boiled egg, tau pok, and fresh lime.",
        "category": "Main Course",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 15.0,
            "carb_g": 55.0,
            "fat_g": 10.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains tamarind gravy and soy-based sauces contributing to sodium content"},
            {"flag": "spicy", "note": "Contains chilli in the tamarind gravy"},
            {"flag": "balanced", "note": "Moderate calories and macros with no extreme flags except sodium"},
            {"flag": "halal", "note": "Commonly halal in Singapore hawker context"}
        ]
    },
    {
        "name": "Popiah",
        "description": "Fresh spring rolls filled with a mix of cooked turnip, egg, prawns, and crispy fried shallots, wrapped in a thin wheat flour skin.",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 8.0,
            "carb_g": 25.0,
            "fat_g": 5.0,
            "sodium_mg": 600,
            "fibre_g": 3.0,
            "gi": 50
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "balanced", "note": "Moderate macros with no extreme values"},
            {"flag": "halal", "note": "Commonly halal when prawns and eggs are used, no pork"}
        ]
    },
    {
        "name": "Otah Otah",
        "description": "Spicy fish paste mixed with coconut and herbs, wrapped in banana leaf and grilled to perfection.",
        "category": "Sides",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 12.0,
            "carb_g": 8.0,
            "fat_g": 8.0,
            "sodium_mg": 700,
            "fibre_g": 1.0,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains fish paste and seasoning contributing to sodium content close to threshold"},
            {"flag": "spicy", "note": "Contains chilli and pepper"},
            {"flag": "halal", "note": "Typically made with fish and halal ingredients"}
        ]
    },
    {
        "name": "Teh Tarik",
        "description": "Traditional pulled tea with a strong blend of black tea and condensed milk, served hot or iced.",
        "category": "Drinks",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 25.0,
            "fat_g": 4.5,
            "sodium_mg": 50,
            "fibre_g": 0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains condensed milk with added sugar, approx 20-25g sugar per serving"}
        ]
    },
    {
        "name": "Bandung",
        "description": "Sweet rose syrup drink mixed with evaporated milk, served chilled.",
        "category": "Drinks",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 35.0,
            "fat_g": 5.0,
            "sodium_mg": 50,
            "fibre_g": 0.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains significant added sugar from rose syrup"},
            {"flag": "low-calorie", "note": "Calories under 300 kcal per serving"}
        ]
    }
  ],
  "air-itam-laksa": [
    {
        "name": "Penang Assam Laksa",
        "description": "A tangy and spicy fish-based noodle soup with thick rice noodles, shredded mackerel, mint, pineapple, and a dollop of prawn paste.",
        "category": "Main Course",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 55.0,
            "fat_g": 10.0,
            "sodium_mg": 1200,
            "fibre_g": 4.0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.1,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains prawn paste and fish sauce contributing to high sodium"},
            {"flag": "high-protein", "note": "Shredded mackerel provides protein exceeding 25g"},
            {"flag": "spicy", "note": "Contains chilli and spicy tamarind broth"},
            {"flag": "balanced", "note": "Good balance of macronutrients with moderate fat and carbs"},
            {"flag": "halal", "note": "Commonly halal when prepared without pork products"}
        ]
    },
    {
        "name": "Penang Laksa",
        "description": "Traditional Penang-style laksa featuring a rich and sour fish broth with tamarind, served with thick rice noodles and fresh herbs.",
        "category": "Main Course",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 55.0,
            "fat_g": 10.0,
            "sodium_mg": 1200,
            "fibre_g": 4.0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.1,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Fish broth and shrimp paste contribute to high sodium content"},
            {"flag": "high-protein", "note": "Fish and other seafood provide protein exceeding 25g"},
            {"flag": "spicy", "note": "Contains chilli in the broth"},
            {"flag": "balanced", "note": "Reasonable macronutrient distribution"},
            {"flag": "halal", "note": "Commonly halal when prepared without pork or non-halal ingredients"}
        ]
    },
    {
        "name": "Prawn Mee",
        "description": "A flavorful prawn broth noodle soup with yellow noodles and rice vermicelli, topped with prawns, pork slices, and fried shallots.",
        "category": "Main Course",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 50.0,
            "fat_g": 15.0,
            "sodium_mg": 1200,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.95,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Broth and condiments contribute to sodium >800mg"},
            {"flag": "high-protein", "note": "Contains prawns and pork slices, protein >25g"},
            {"flag": "spicy", "note": "Typically served with chilli paste"},
            {"flag": "halal", "note": "Commonly non-halal due to pork, but can be halal if pork omitted"}
        ]
    },
    {
        "name": "Char Koay Teow",
        "description": "Stir-fried flat rice noodles with prawns, cockles, Chinese sausage, eggs, and bean sprouts in a smoky wok hei flavor.",
        "category": "Main Course",
        "estimatedKcal": 700,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 85.0,
            "fat_g": 25.0,
            "sodium_mg": 1200,
            "fibre_g": 3.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.4,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, fish sauce, and salted seafood contributing to high sodium"},
            {"flag": "high-fat", "note": "Stir-fried with oil and Chinese sausage, resulting in high fat content"},
            {"flag": "high-protein", "note": "Contains prawns, cockles, eggs, and sausage providing over 25g protein"},
            {"flag": "spicy", "note": "Often served with chilli paste or sambal"},
            {"flag": "halal", "note": "Typically non-halal due to Chinese sausage and pork products"}
        ]
    },
    {
        "name": "Cendol",
        "description": "A refreshing dessert of shaved ice with green rice flour jelly, coconut milk, palm sugar syrup, and red beans.",
        "category": "Dessert",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 55.0,
            "fat_g": 10.0,
            "sodium_mg": 50,
            "fibre_g": 3.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.05,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar syrup contributing to added sugars"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal-certified or halal-friendly dessert"}
        ]
    },
    {
        "name": "Teh Tarik",
        "description": "Traditional Malaysian pulled tea with strong black tea and condensed milk, served hot and frothy.",
        "category": "Drinks",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 25.0,
            "fat_g": 4.0,
            "sodium_mg": 50,
            "fibre_g": 0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 0.75,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains condensed milk with added sugar"}
        ]
    },
    {
        "name": "Rojak",
        "description": "A local fruit and vegetable salad tossed in a thick, spicy prawn paste sauce, garnished with crushed peanuts.",
        "category": "Sides",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 7.0,
            "carb_g": 35.0,
            "fat_g": 12.0,
            "sodium_mg": 900,
            "fibre_g": 5.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains prawn paste sauce which is high in sodium"},
            {"flag": "high-fat", "note": "Contains crushed peanuts contributing to fat content"},
            {"flag": "spicy", "note": "Contains chilli in the prawn paste sauce"},
            {"flag": "vegetarian", "note": "Contains prawn paste, so not vegetarian"}
        ]
    }
  ],
  "penang-road-teochew": [
    {
        "name": "Penang Road Famous Teochew Cendol",
        "description": "Traditional Teochew-style cendol with green rice flour jelly, shaved ice, coconut milk, and palm sugar syrup.",
        "category": "Dessert",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 60.0,
            "fat_g": 10.0,
            "sodium_mg": 50,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.05,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar syrup contributing to >10g added sugar"},
            {"flag": "low-calorie", "note": "Total calories under 300-350 kcal typical for dessert portion"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"}
        ]
    },
    {
        "name": "Durian Cendol",
        "description": "Creamy cendol topped with fresh durian pulp, coconut milk, and gula Melaka syrup, a rich and fragrant dessert.",
        "category": "Dessert",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 55.0,
            "fat_g": 15.0,
            "sodium_mg": 150,
            "fibre_g": 3.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains coconut milk and durian pulp contributing to fat content"},
            {"flag": "high-sugar", "note": "Gula Melaka syrup adds significant added sugar"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Typically halal as no pork or alcohol used"}
        ]
    },
    {
        "name": "Red Bean Cendol",
        "description": "Classic cendol served with sweet red beans, shaved ice, coconut milk, and palm sugar syrup.",
        "category": "Dessert",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 60.0,
            "fat_g": 8.0,
            "sodium_mg": 50,
            "fibre_g": 4.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar syrup and sweetened red beans"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal as no pork or alcohol used"}
        ]
    },
    {
        "name": "Ice Kacang",
        "description": "Shaved ice dessert layered with red beans, sweet corn, grass jelly, attap seeds, and drizzled with colorful syrups and evaporated milk.",
        "category": "Dessert",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 5.0,
            "carb_g": 70.0,
            "fat_g": 4.0,
            "sodium_mg": 150,
            "fibre_g": 3.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.35,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains syrups and evaporated milk contributing to added sugars"},
            {"flag": "low-calorie", "note": "Calories below 300 kcal threshold, close to limit"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal in Penang dessert stalls"}
        ]
    },
    {
        "name": "Soy Bean Drink",
        "description": "Chilled smooth soy milk, lightly sweetened, served fresh and refreshing.",
        "category": "Drinks",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 7.0,
            "carb_g": 15.0,
            "fat_g": 4.0,
            "sodium_mg": 50,
            "fibre_g": 1.0,
            "gi": 35
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 0.75,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories less than 300 kcal per serving"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal as soy milk is plant-based"}
        ]
    },
    {
        "name": "Grass Jelly Drink",
        "description": "Refreshing chilled grass jelly cubes served in sweet syrup with ice, a cooling traditional drink.",
        "category": "Drinks",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 0.5,
            "carb_g": 30.0,
            "fat_g": 0.1,
            "sodium_mg": 15,
            "fibre_g": 1.5,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 0.9,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains sweet syrup with added sugar"},
            {"flag": "low-calorie", "note": "Relatively low calorie for a dessert drink"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal as no non-halal ingredients used"}
        ]
    },
    {
        "name": "Pulut Hitam",
        "description": "Warm black glutinous rice porridge cooked with coconut milk and palm sugar, a comforting dessert option.",
        "category": "Dessert",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 55.0,
            "fat_g": 8.0,
            "sodium_mg": 50,
            "fibre_g": 3.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories under 300 kcal threshold, but close"},
            {"flag": "balanced", "note": "Moderate fat and sugar from coconut milk and palm sugar"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal dessert"}
        ]
    }
  ],
  "nasi-kandar-pelita": [
    {
        "name": "Nasi Kandar",
        "description": "Steamed white rice served with a variety of flavorful curries and side dishes, a Penang Mamak classic.",
        "category": "Main Course",
        "estimatedKcal": 750,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 90.0,
            "fat_g": 25.0,
            "sodium_mg": 1500,
            "fibre_g": 5.0,
            "gi": 70
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.4,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains multiple curries and sauces with high salt content"},
            {"flag": "high-fat", "note": "Curries and side dishes typically cooked with coconut milk and oil"},
            {"flag": "high-protein", "note": "Includes meat and/or seafood side dishes contributing to protein content"},
            {"flag": "spicy", "note": "Contains chilli and spices typical of Mamak curries"},
            {"flag": "halal", "note": "Mamak cuisine is traditionally halal"}
        ]
    },
    {
        "name": "Curry Chicken",
        "description": "Tender chicken pieces cooked in a rich, spicy curry gravy infused with traditional Indian spices.",
        "category": "Main Course",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 10.0,
            "fat_g": 25.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains salted spices and curry paste with added salt"},
            {"flag": "high-fat", "note": "Use of coconut milk and oil in curry increases fat content"},
            {"flag": "high-protein", "note": "Chicken protein content exceeds 25g per serving"},
            {"flag": "spicy", "note": "Contains chilli and pepper in curry spices"},
            {"flag": "halal", "note": "Commonly halal in Mamak cuisine"}
        ]
    },
    {
        "name": "Dhal Curry",
        "description": "Creamy and mildly spiced lentil curry, a staple accompaniment to nasi kandar dishes.",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 9.0,
            "carb_g": 25.0,
            "fat_g": 6.0,
            "sodium_mg": 700,
            "fibre_g": 7.0,
            "gi": 35
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.05,
        "image_url": "",
        "healthFlags": [
            {"flag": "balanced", "note": "Moderate calories, good protein and fibre, moderate fat and sodium"},
            {"flag": "vegetarian", "note": "Contains no meat or seafood"},
            {"flag": "halal", "note": "Commonly halal in Mamak cuisine"}
        ]
    },
    {
        "name": "Fried Chicken",
        "description": "Crispy deep-fried chicken marinated with local spices, perfect as a side or main.",
        "category": "Sides",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 8.0,
            "fat_g": 22.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.65,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains marinade and seasoning with salt and spices"},
            {"flag": "high-fat", "note": "Deep-fried chicken with skin contributes to fat content"},
            {"flag": "high-protein", "note": "Chicken provides over 25g protein per serving"},
            {"flag": "halal", "note": "Commonly halal in Mamak cuisine"},
            {"flag": "spicy", "note": "Marinated with local spices including chilli"}
        ]
    },
    {
        "name": "Sotong Masak Hitam",
        "description": "Squid cooked in a dark, spicy black gravy made from roasted spices and soy sauce.",
        "category": "Main Course",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 15.0,
            "fat_g": 10.0,
            "sodium_mg": 950,
            "fibre_g": 3.0,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.1,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and seasoning contributing to sodium >800mg"},
            {"flag": "spicy", "note": "Contains roasted spices and chili"},
            {"flag": "high-protein", "note": "Squid is a good protein source, protein >20g"},
            {"flag": "balanced", "note": "Moderate calories and balanced macros"},
            {"flag": "halal", "note": "Commonly halal in Mamak cuisine"}
        ]
    },
    {
        "name": "Fish Head Curry",
        "description": "A hearty curry featuring a fresh fish head simmered with vegetables in a tangy and spicy gravy.",
        "category": "Main Course",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 25.0,
            "fat_g": 22.0,
            "sodium_mg": 1100,
            "fibre_g": 4.0,
            "gi": 50
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.6,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains salted fish sauce, curry paste, and seasoning"},
            {"flag": "high-fat", "note": "Coconut milk and oil used in curry base"},
            {"flag": "high-protein", "note": "Fish head provides substantial protein"},
            {"flag": "spicy", "note": "Contains chilli and spices typical of Penang Mamak curry"},
            {"flag": "halal", "note": "Commonly halal in Mamak cuisine"}
        ]
    },
    {
        "name": "Roti Canai",
        "description": "Flaky and crispy flatbread served with dhal or curry for dipping, a classic Mamak breakfast item.",
        "category": "Sides",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 7.0,
            "carb_g": 45.0,
            "fat_g": 15.0,
            "sodium_mg": 400,
            "fibre_g": 2.0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 0.75,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains significant fat from ghee or oil used in preparation"}
        ]
    },
    {
        "name": "Teh Tarik",
        "description": "Pulled tea with condensed milk, frothy and sweet, a beloved Mamak drink.",
        "category": "Drinks",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 25.0,
            "fat_g": 4.0,
            "sodium_mg": 50,
            "fibre_g": 0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 0.6,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains condensed milk with added sugar"}
        ]
    }
  ],
  "village-park": [
    {
        "name": "Nasi Lemak Ayam Goreng",
        "description": "Fragrant coconut milk rice served with crispy deep-fried chicken, accompanied by sambal, anchovies, peanuts, cucumber slices, and a boiled egg.",
        "category": "Main Course",
        "estimatedKcal": 850,
        "nutrition": {
            "protein_g": 35.0,
            "carb_g": 75.0,
            "fat_g": 40.0,
            "sodium_mg": 1200,
            "fibre_g": 5.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.4,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains sambal, anchovies, and salted peanuts contributing to high sodium"},
            {"flag": "high-fat", "note": "Deep-fried chicken and coconut milk rice increase fat content"},
            {"flag": "high-protein", "note": "Chicken, egg, and anchovies provide high protein"},
            {"flag": "spicy", "note": "Sambal contains chilli"},
            {"flag": "halal", "note": "Commonly halal-certified dish in Malaysia"}
        ]
    },
    {
        "name": "Nasi Lemak Special",
        "description": "A hearty plate of coconut rice served with fried chicken, fried egg, fried squid, sambal, anchovies, peanuts, and cucumber slices.",
        "category": "Main Course",
        "estimatedKcal": 900,
        "nutrition": {
            "protein_g": 40.0,
            "carb_g": 80.0,
            "fat_g": 45.0,
            "sodium_mg": 1300,
            "fibre_g": 5.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.6,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains anchovies, sambal, and fried items contributing to sodium content"},
            {"flag": "high-fat", "note": "Fried chicken, fried egg, fried squid, and coconut milk rice increase fat content"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g due to multiple protein sources"},
            {"flag": "spicy", "note": "Sambal contains chilli"},
            {"flag": "halal", "note": "Commonly halal in Malaysian Chinese eateries like Village Park"}
        ]
    },
    {
        "name": "Curry Chicken",
        "description": "Tender chicken simmered in a rich and aromatic Malaysian-style curry with potatoes and spices.",
        "category": "Main Course",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 35.0,
            "fat_g": 25.0,
            "sodium_mg": 900,
            "fibre_g": 4.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains curry paste and seasoning with salt and soy sauce"},
            {"flag": "high-fat", "note": "Use of coconut milk and oil in curry base"},
            {"flag": "high-protein", "note": "Chicken protein content exceeds 25g"},
            {"flag": "spicy", "note": "Contains chilli and spices"},
            {"flag": "halal", "note": "Commonly halal in Malaysian Chinese cuisine"}
        ]
    },
    {
        "name": "Sambal Sotong",
        "description": "Fresh squid stir-fried in a spicy and tangy sambal chili paste, served hot and flavorful.",
        "category": "Sides",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 15.0,
            "fat_g": 12.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains sambal chili paste and soy sauce contributing to sodium content"},
            {"flag": "spicy", "note": "Contains chili peppers in sambal paste"},
            {"flag": "high-protein", "note": "Squid is a rich protein source with over 20g per serving"},
            {"flag": "balanced", "note": "Moderate calories with balanced macros"},
            {"flag": "halal", "note": "Commonly prepared halal in Malaysian Chinese cuisine"}
        ]
    },
    {
        "name": "Ikan Bakar",
        "description": "Grilled marinated fish served with a side of spicy sambal and fresh vegetables.",
        "category": "Sides",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 10.0,
            "fat_g": 15.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 7.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains spicy sambal and marinade with soy sauce/fish sauce"},
            {"flag": "high-protein", "note": "Fish portion provides over 25g protein"},
            {"flag": "spicy", "note": "Sambal contains chilli"},
            {"flag": "halal", "note": "Commonly halal in Malaysian Chinese cuisine"}
        ]
    },
    {
        "name": "Teh Tarik",
        "description": "Traditional Malaysian pulled tea with a creamy, frothy top and a perfect balance of sweetness.",
        "category": "Drinks",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 25.0,
            "fat_g": 4.0,
            "sodium_mg": 50,
            "fibre_g": 0.0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.35,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains added sugar from condensed milk and sugar"},
            {"flag": "balanced", "note": "Moderate calories and macros typical for sweetened milk tea"}
        ]
    },
    {
        "name": "Cendol",
        "description": "A refreshing dessert of shaved ice topped with green rice flour jelly, coconut milk, palm sugar syrup, and red beans.",
        "category": "Dessert",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 60.0,
            "fat_g": 8.0,
            "sodium_mg": 50,
            "fibre_g": 3.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar syrup with added sugars"},
            {"flag": "balanced", "note": "Moderate fat and protein, typical dessert macros"}
        ]
    }
  ],
  "capitol-satay": [
    {
        "name": "Satay Celup",
        "description": "Fresh skewers of assorted meats, seafood, and vegetables cooked in a rich, spicy peanut satay broth, a Malaccan specialty.",
        "category": "Main Course",
        "estimatedKcal": 700,
        "nutrition": {
            "protein_g": 40.0,
            "carb_g": 45.0,
            "fat_g": 35.0,
            "sodium_mg": 1200,
            "fibre_g": 6.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 7.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Rich broth and dipping sauces contain soy sauce, fish sauce, and salted peanuts."},
            {"flag": "high-fat", "note": "Peanut satay broth contributes significant fat content."},
            {"flag": "high-protein", "note": "Multiple skewers of meats and seafood provide high protein."},
            {"flag": "spicy", "note": "Contains chilli in satay broth."},
            {"flag": "halal", "note": "Typically halal-certified or uses halal ingredients in Malacca."}
        ]
    },
    {
        "name": "Prawn Satay",
        "description": "Succulent prawns skewered and dipped in the signature satay peanut sauce, offering a perfect blend of sweetness and spice.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 15.0,
            "fat_g": 18.0,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 3.6,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Satay peanut sauce contains soy sauce and added salt"},
            {"flag": "high-fat", "note": "Peanut sauce contributes significant fat content"},
            {"flag": "spicy", "note": "Contains chilli in satay sauce"},
            {"flag": "halal", "note": "Commonly halal in Malaccan cuisine"}
        ]
    },
    {
        "name": "Fish Ball Satay",
        "description": "Bouncy fish balls skewered and cooked in the flavorful satay peanut broth, a popular choice for satay celup.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 20.0,
            "carb_g": 18.0,
            "fat_g": 18.0,
            "sodium_mg": 950,
            "fibre_g": 2.0,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.4,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Satay broth and fish balls contain significant sodium"},
            {"flag": "high-fat", "note": "Peanut satay broth contributes to fat content"},
            {"flag": "high-protein", "note": "Fish balls provide substantial protein"},
            {"flag": "spicy", "note": "Satay broth typically contains chilli"},
            {"flag": "halal", "note": "Commonly halal-certified dish"}
        ]
    },
    {
        "name": "Tofu Satay",
        "description": "Soft tofu cubes skewered and simmered in rich satay sauce, absorbing nutty and spicy flavors.",
        "category": "Sides",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 15.0,
            "carb_g": 18.0,
            "fat_g": 16.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Satay sauce contains soy sauce and salted peanuts contributing to sodium content"},
            {"flag": "high-fat", "note": "Satay sauce is peanut-based, increasing fat content"},
            {"flag": "vegetarian", "note": "Contains no meat or seafood"},
            {"flag": "spicy", "note": "Satay sauce contains chili"}
        ]
    },
    {
        "name": "Pork Satay",
        "description": "Tender pork skewers marinated and cooked in the signature peanut satay sauce, a must-try for meat lovers.",
        "category": "Sides",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 12.0,
            "fat_g": 22.0,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 45
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and salted peanut sauce contributing to sodium content"},
            {"flag": "high-fat", "note": "Peanut sauce and pork fat contribute to fat content exceeding 20g"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g per serving"},
            {"flag": "spicy", "note": "Typically contains chili in satay sauce"},
            {"flag": "halal", "note": "Not halal due to pork"}
        ]
    },
    {
        "name": "Assorted Vegetables Skewers",
        "description": "A selection of fresh vegetables such as cabbage, long beans, and mushrooms skewered and cooked in the satay broth.",
        "category": "Sides",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 18.0,
            "fat_g": 3.0,
            "sodium_mg": 700,
            "fibre_g": 5.0,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.1,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Satay broth contains soy sauce and spices contributing to sodium content"},
            {"flag": "vegetarian", "note": "Contains no meat or seafood"},
            {"flag": "halal", "note": "Commonly halal in Malaccan cuisine"},
            {"flag": "spicy", "note": "Satay broth typically contains chilli"}
        ]
    },
    {
        "name": "Iced Barley Drink",
        "description": "Refreshing chilled barley drink to complement the spicy satay celup experience.",
        "category": "Drinks",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 1.5,
            "carb_g": 22.0,
            "fat_g": 0.2,
            "sodium_mg": 10,
            "fibre_g": 1.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 0.9,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Drink contains less than 300 kcal"},
            {"flag": "vegetarian", "note": "No animal products used"},
            {"flag": "halal", "note": "Commonly halal as a barley-based drink"}
        ]
    },
    {
        "name": "Cendol",
        "description": "Traditional Malaccan dessert with shaved ice, coconut milk, green rice flour jelly, and palm sugar syrup.",
        "category": "Dessert",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 2.5,
            "carb_g": 45.0,
            "fat_g": 10.0,
            "sodium_mg": 50,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar syrup with added sugars exceeding 10g"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal as no pork or alcohol ingredients"}
        ]
    }
  ],
  "no-signboard": [
    {
        "name": "Fried Hokkien Mee",
        "description": "Stir-fried yellow noodles and rice vermicelli with prawns, squid, pork belly, and egg, cooked in a rich seafood stock and served with sambal chili and lime.",
        "category": "Main Course",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 70.0,
            "fat_g": 25.0,
            "sodium_mg": 1200,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, seafood stock, and sambal chili contributing to sodium content"},
            {"flag": "high-fat", "note": "Contains pork belly and cooking oil increasing fat content"},
            {"flag": "high-protein", "note": "Prawns, squid, pork belly, and egg provide high protein content"},
            {"flag": "spicy", "note": "Served with sambal chili"},
            {"flag": "halal", "note": "Commonly prepared halal in Singapore hawker stalls, but depends on vendor"}
        ]
    },
    {
        "name": "Dry Hokkien Mee",
        "description": "A drier version of the classic Hokkien Mee, featuring stir-fried noodles tossed with prawns, squid, and pork belly, served with sambal and lime on the side.",
        "category": "Main Course",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 60.0,
            "fat_g": 22.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce, seafood, and sambal contributing to sodium content"},
            {"flag": "high-fat", "note": "Pork belly and cooking oil increase fat content"},
            {"flag": "high-protein", "note": "Seafood and pork provide protein >25g"},
            {"flag": "spicy", "note": "Sambal chili served on the side"},
            {"flag": "halal", "note": "Typically halal-certified or can be prepared halal"}
        ]
    },
    {
        "name": "Prawn Noodle Soup",
        "description": "Fragrant prawn broth served with yellow noodles and rice vermicelli, topped with fresh prawns, pork slices, and garnished with fried shallots and spring onions.",
        "category": "Main Course",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 60.0,
            "fat_g": 15.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Broth and soy sauce contribute to sodium >800mg"},
            {"flag": "high-protein", "note": "Contains prawns and pork slices, protein >25g"},
            {"flag": "spicy", "note": "Typically served with chilli or contains pepper"},
            {"flag": "halal", "note": "Commonly halal-certified or uses halal ingredients"}
        ]
    },
    {
        "name": "Fried Carrot Cake (White)",
        "description": "Stir-fried radish cake cubes with eggs, preserved radish, and spring onions, lightly seasoned for a savory and slightly sweet flavor.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 8.0,
            "carb_g": 45.0,
            "fat_g": 10.0,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains preserved radish and soy sauce contributing to sodium content"}
        ]
    },
    {
        "name": "Fried Carrot Cake (Black)",
        "description": "Radish cake cubes stir-fried with sweet dark soy sauce, eggs, and preserved radish, offering a sweet and savory taste with a caramelized finish.",
        "category": "Sides",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 8.0,
            "carb_g": 45.0,
            "fat_g": 12.0,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and preserved radish contributing to sodium content"}
        ]
    },
    {
        "name": "Sambal Chili",
        "description": "Spicy and tangy chili paste made from fresh red chilies, served as a condiment to complement the noodles.",
        "category": "Sides",
        "estimatedKcal": 30,
        "nutrition": {
            "protein_g": 0.5,
            "carb_g": 5.0,
            "fat_g": 1.5,
            "sodium_mg": 400,
            "fibre_g": 1.0,
            "gi": 25
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 0.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "spicy", "note": "Contains fresh red chilies"}
        ]
    },
    {
        "name": "Barley Drink",
        "description": "Refreshing chilled barley beverage, perfect for balancing the spiciness of the meal.",
        "category": "Drinks",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 1.0,
            "carb_g": 22.0,
            "fat_g": 0.1,
            "sodium_mg": 10,
            "fibre_g": 1.0,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Contains less than 300 kcal per serving"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal-certified beverage"}
        ]
    }
  ],
  "toastbox": [
    {
        "name": "Kaya Butter Toast",
        "description": "Thick slices of toasted bread slathered with fragrant kaya jam and a generous slab of butter, served warm and crispy.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 40.0,
            "fat_g": 15.0,
            "sodium_mg": 250,
            "fibre_g": 2.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains butter and kaya jam with coconut milk"},
            {"flag": "low-calorie", "note": "Calories under 300-350 kcal typical for a snack portion"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"}
        ]
    },
    {
        "name": "Soft Boiled Eggs",
        "description": "Fresh eggs boiled to a soft, runny consistency, served with a dash of soy sauce and white pepper for dipping.",
        "category": "Sides",
        "estimatedKcal": 140,
        "nutrition": {
            "protein_g": 12.0,
            "carb_g": 1.0,
            "fat_g": 10.0,
            "sodium_mg": 400,
            "fibre_g": 0.0,
            "gi": 0
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories under 300 kcal per serving"},
            {"flag": "halal", "note": "Eggs are halal and commonly consumed in halal diets"},
            {"flag": "soft-foods", "note": "Soft, runny texture suitable for elderly or soft diet"}
        ]
    },
    {
        "name": "Nasi Lemak",
        "description": "Fragrant coconut rice served with spicy sambal, crispy ikan bilis, peanuts, boiled egg, and cucumber slices.",
        "category": "Main Course",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 65.0,
            "fat_g": 22.0,
            "sodium_mg": 950,
            "fibre_g": 4.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains sambal and ikan bilis which are high in sodium"},
            {"flag": "high-fat", "note": "Coconut milk in rice and peanuts contribute to fat content"},
            {"flag": "spicy", "note": "Contains spicy sambal"},
            {"flag": "halal", "note": "Commonly halal-certified in Singapore kopitiams"}
        ]
    },
    {
        "name": "Mee Siam",
        "description": "Spicy and tangy rice vermicelli stir-fried with tau pok, egg, and garnished with lime and fresh herbs.",
        "category": "Noodles",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 55.0,
            "fat_g": 10.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and sambal chili contributing to sodium content"},
            {"flag": "spicy", "note": "Contains chili in sambal and spices"},
            {"flag": "balanced", "note": "Moderate calories and macros with no extreme flags except sodium"},
            {"flag": "halal", "note": "Commonly halal in Singaporean kopitiam settings"}
        ]
    },
    {
        "name": "Laksa",
        "description": "A rich and spicy coconut curry noodle soup with thick rice vermicelli, prawns, fish cake, and tau pok.",
        "category": "Noodles",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 60.0,
            "fat_g": 22.0,
            "sodium_mg": 1200,
            "fibre_g": 4.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains salted fish cake, shrimp paste, and seasoning sauces"},
            {"flag": "high-fat", "note": "Coconut milk base contributes to fat content"},
            {"flag": "high-protein", "note": "Prawns and fish cake provide substantial protein"},
            {"flag": "spicy", "note": "Contains chilli in the laksa paste"},
            {"flag": "halal", "note": "Commonly halal-certified in Singapore kopitiams"}
        ]
    },
    {
        "name": "Traditional Coffee (Kopi)",
        "description": "Strong, aromatic local coffee brewed using the traditional sock method, served hot or iced with condensed milk.",
        "category": "Drinks",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 18.0,
            "fat_g": 3.5,
            "sodium_mg": 40,
            "fibre_g": 0,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains condensed milk with added sugar, approx 10-12g sugar per serving"}
        ]
    },
    {
        "name": "Teh Tarik",
        "description": "Pulled tea with condensed milk, creamy and frothy, served hot or iced.",
        "category": "Drinks",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 25.0,
            "fat_g": 4.0,
            "sodium_mg": 50,
            "fibre_g": 0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains condensed milk with added sugar"},
            {"flag": "low-calorie", "note": "Below 300 kcal per serving"},
            {"flag": "halal", "note": "Commonly halal as tea and dairy ingredients"}
        ]
    },
    {
        "name": "Egg Mayo Sandwich",
        "description": "Soft white bread sandwich filled with creamy egg mayonnaise, a popular light snack.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 12.0,
            "carb_g": 35.0,
            "fat_g": 15.0,
            "sodium_mg": 700,
            "fibre_g": 1.5,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Contains mayonnaise contributing to fat content"},
            {"flag": "balanced", "note": "Moderate calories and protein, no extreme flags"},
            {"flag": "soft-foods", "note": "Soft bread and creamy filling suitable for soft diet"},
            {"flag": "halal", "note": "Commonly halal in Singapore kopitiams"}
        ]
    }
  ],
  "baba-charlie": [
    {
        "name": "Kueh Lapis",
        "description": "Traditional Peranakan layered cake made from rice flour, coconut milk, and palm sugar, steamed layer by layer to create a rich, fragrant, and colorful dessert.",
        "category": "Kueh",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 50.0,
            "fat_g": 10.0,
            "sodium_mg": 20,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.2,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar and coconut milk"}
        ]
    },
    {
        "name": "Ondeh Ondeh",
        "description": "Glutinous rice balls filled with melted palm sugar and coated with freshly grated coconut, offering a burst of sweetness and a chewy texture.",
        "category": "Kueh",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 40.0,
            "fat_g": 4.0,
            "sodium_mg": 10,
            "fibre_g": 1.5,
            "gi": 70
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.05,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar filling"}
        ]
    },
    {
        "name": "Kueh Dadar",
        "description": "Green pandan-flavored crepe rolled and filled with sweet grated coconut cooked in palm sugar, a classic Peranakan snack.",
        "category": "Kueh",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 30.0,
            "fat_g": 6.0,
            "sodium_mg": 50,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 0.9,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar in the filling"}
        ]
    },
    {
        "name": "Ang Ku Kueh",
        "description": "Soft, sticky rice flour skin shaped like a tortoise shell, filled with sweet mung bean paste, symbolizing longevity and prosperity.",
        "category": "Kueh",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 38.0,
            "fat_g": 1.5,
            "sodium_mg": 30,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.05,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-carb", "note": "Contains sticky rice flour and sweet mung bean paste"}
        ]
    },
    {
        "name": "Pineapple Tart",
        "description": "Buttery, crumbly pastry filled with tangy and sweet pineapple jam, a festive favorite in Peranakan households.",
        "category": "Pastry",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 22.0,
            "fat_g": 9.0,
            "sodium_mg": 80,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.35,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains sweet pineapple jam"},
            {"flag": "high-fat", "note": "Buttery pastry base"}
        ]
    },
    {
        "name": "Pulut Inti",
        "description": "Glutinous rice topped with sweet grated coconut cooked in palm sugar, wrapped in banana leaf for a fragrant and traditional treat.",
        "category": "Kueh",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 3.5,
            "carb_g": 55.0,
            "fat_g": 7.0,
            "sodium_mg": 15,
            "fibre_g": 2.0,
            "gi": 70
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.05,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sugar", "note": "Contains palm sugar in the grated coconut topping"}
        ]
    },
    {
        "name": "Kuih Seri Muka",
        "description": "Two-layered dessert with glutinous rice base and a smooth, fragrant pandan custard topping, steamed to perfection.",
        "category": "Kueh",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 45.0,
            "fat_g": 5.0,
            "sodium_mg": 50,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.05,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-carb", "note": "Contains glutinous rice and sugar"}
        ]
    }
  ],
  "peter-pork-ribs": [
    {
        "name": "Bak Kut Teh (Pork Ribs Soup)",
        "description": "Traditional Hokkien-style pork ribs simmered in a fragrant herbal broth, served piping hot with tender meat and aromatic spices.",
        "category": "Main Course",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 10.0,
            "fat_g": 25.0,
            "sodium_mg": 1200,
            "fibre_g": 1.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 7.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains salted soy sauce and broth with added salt"},
            {"flag": "high-fat", "note": "Pork ribs contain significant fat content"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g per serving"},
            {"flag": "spicy", "note": "May contain white pepper and mild spices"},
            {"flag": "halal", "note": "Not halal due to pork content"}
        ]
    },
    {
        "name": "Braised Pork Belly",
        "description": "Succulent pork belly slow-cooked in a rich soy-based sauce, infused with star anise and cinnamon for a deep, savory flavor.",
        "category": "Sides",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 20.0,
            "carb_g": 8.0,
            "fat_g": 38.0,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 40
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and braising liquids high in sodium"},
            {"flag": "high-fat", "note": "Pork belly is a fatty cut with high fat content"}
        ]
    },
    {
        "name": "You Char Kway (Fried Dough Fritters)",
        "description": "Crispy and golden fried dough sticks, perfect for dipping into the herbal Bak Kut Teh broth.",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 20.0,
            "fat_g": 10.0,
            "sodium_mg": 250,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-fat", "note": "Deep-fried dough results in fat content over 10g per serving"},
            {"flag": "spicy", "note": "Typically served with spicy chili sauce for dipping"}
        ]
    },
    {
        "name": "Spare Ribs Soup",
        "description": "Hearty pork spare ribs cooked in a clear, peppery broth with garlic and herbs, delivering a comforting and robust taste.",
        "category": "Main Course",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 5.0,
            "fat_g": 18.0,
            "sodium_mg": 1200,
            "fibre_g": 0.5,
            "gi": 10
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains broth with soy sauce and preserved herbs contributing to sodium content"},
            {"flag": "high-fat", "note": "Pork spare ribs are relatively high in fat"},
            {"flag": "high-protein", "note": "Protein content exceeds 25g per serving"},
            {"flag": "spicy", "note": "Contains white pepper and black pepper"},
            {"flag": "halal", "note": "Not halal due to pork content"}
        ]
    },
    {
        "name": "Braised Tau Pok (Fried Beancurd Puffs)",
        "description": "Golden fried beancurd puffs braised in a savory soy sauce, absorbing the rich flavors of the Bak Kut Teh broth.",
        "category": "Sides",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 8.0,
            "carb_g": 10.0,
            "fat_g": 12.0,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Braised in soy sauce and Bak Kut Teh broth, contributing to high sodium content"},
            {"flag": "high-fat", "note": "Fried beancurd puffs contain significant oil/fat"},
            {"flag": "vegetarian", "note": "Contains no meat or seafood, suitable for vegetarians"},
            {"flag": "halal", "note": "Typically halal if prepared without pork broth; however, traditional Bak Kut Teh broth is pork-based, so confirm with vendor"}
        ]
    },
    {
        "name": "Steamed White Rice",
        "description": "Fluffy steamed white rice, the perfect accompaniment to soak up the flavorful Bak Kut Teh soup.",
        "category": "Sides",
        "estimatedKcal": 200,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 45.0,
            "fat_g": 0.4,
            "sodium_mg": 0,
            "fibre_g": 0.6,
            "gi": 73
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Calories below 300 kcal per serving"},
            {"flag": "vegetarian", "note": "Contains no meat or seafood"},
            {"flag": "halal", "note": "Commonly halal when prepared without non-halal additives"}
        ]
    },
    {
        "name": "Chinese Tea",
        "description": "Refreshing hot Chinese tea, traditionally served to complement the rich and hearty Bak Kut Teh meal.",
        "category": "Drinks",
        "estimatedKcal": 2,
        "nutrition": {
            "protein_g": 0,
            "carb_g": 0.5,
            "fat_g": 0,
            "sodium_mg": 5,
            "fibre_g": 0,
            "gi": 0
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Virtually no calories in plain Chinese tea"},
            {"flag": "balanced", "note": "No extreme macronutrient values"}
        ]
    },
    {
        "name": "Salted Vegetable",
        "description": "Pickled salted mustard greens, offering a tangy and slightly salty contrast to the rich pork dishes.",
        "category": "Sides",
        "estimatedKcal": 25,
        "nutrition": {
            "protein_g": 1.0,
            "carb_g": 3.0,
            "fat_g": 0.2,
            "sodium_mg": 700,
            "fibre_g": 1.5,
            "gi": 15
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Pickled salted mustard greens are high in sodium due to preservation method"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "low-calorie", "note": "Low calorie side dish"}
        ]
    }
  ],
  "din-tai-fung": [
    {
        "name": "Xiao Long Bao (Steamed Pork Soup Dumplings)",
        "description": "Delicate steamed dumplings filled with juicy pork and rich savory broth, served with a side of ginger and vinegar.",
        "category": "Dim Sum",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 40.0,
            "fat_g": 14.0,
            "sodium_mg": 900,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 9.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and broth contributing to sodium content"}
        ]
    },
    {
        "name": "Truffle Xiao Long Bao",
        "description": "Signature steamed pork soup dumplings infused with aromatic black truffle oil for an elevated flavor experience.",
        "category": "Dim Sum",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 40.0,
            "fat_g": 14.0,
            "sodium_mg": 900,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 14.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and broth contributing to sodium >800mg"},
            {"flag": "high-fat", "note": "Contains pork and truffle oil contributing to fat >20g"},
            {"flag": "balanced", "note": "Moderate protein and carbohydrate content with reasonable calories"},
            {"flag": "halal", "note": "Typically non-halal due to pork content"},
            {"flag": "spicy", "note": "No significant chilli or pepper content"}
        ]
    },
    {
        "name": "Steamed Pork Chop Fried Rice",
        "description": "Fragrant fried rice topped with tender steamed pork chop, served with a savory soy-based sauce.",
        "category": "Main Course",
        "estimatedKcal": 700,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 85.0,
            "fat_g": 22.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 14.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy-based sauce and salted pork chop"},
            {"flag": "high-fat", "note": "Fried rice and pork chop contribute to fat content"},
            {"flag": "high-protein", "note": "Pork chop provides significant protein"},
            {"flag": "spicy", "note": "Typically not spicy"},
            {"flag": "halal", "note": "Not halal due to pork"}
        ]
    },
    {
        "name": "Braised Pork Chop Noodle Soup",
        "description": "Springy noodles served in a rich broth with tender braised pork chop and vegetables.",
        "category": "Noodles",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 60.0,
            "fat_g": 18.0,
            "sodium_mg": 1200,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 13.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Broth and braised pork chop contain soy sauce and seasoning contributing to high sodium"},
            {"flag": "high-protein", "note": "Braised pork chop provides over 25g protein"}
        ]
    },
    {
        "name": "Wontons in Chilli Sauce",
        "description": "Handmade wontons tossed in a spicy and tangy chilli sauce, garnished with sesame seeds and spring onions.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 15.0,
            "carb_g": 35.0,
            "fat_g": 10.0,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 8.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce and chilli sauce contributing to sodium content"},
            {"flag": "spicy", "note": "Contains chilli in the sauce"},
            {"flag": "halal", "note": "Din Tai Fung Singapore is halal-certified"}
        ]
    },
    {
        "name": "Cucumber with Garlic",
        "description": "Refreshing chilled cucumber salad dressed with minced garlic, soy sauce, and a hint of sesame oil.",
        "category": "Sides",
        "estimatedKcal": 70,
        "nutrition": {
            "protein_g": 1.5,
            "carb_g": 6.0,
            "fat_g": 4.5,
            "sodium_mg": 700,
            "fibre_g": 1.5,
            "gi": 15
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 6.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "high-sodium", "note": "Contains soy sauce contributing to sodium content close to 700mg"},
            {"flag": "low-calorie", "note": "Low calorie side dish under 300 kcal"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"},
            {"flag": "halal", "note": "Commonly halal ingredients used"}
        ]
    },
    {
        "name": "Shrimp and Pork Shao Mai",
        "description": "Steamed open-faced dumplings filled with a flavorful mixture of minced pork and fresh shrimp.",
        "category": "Dim Sum",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 20.0,
            "fat_g": 12.0,
            "sodium_mg": 750,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 8.8,
        "image_url": "",
        "healthFlags": [
            {"flag": "balanced", "note": "Moderate protein, fat, and sodium levels typical of steamed dim sum."},
            {"flag": "halal", "note": "Commonly available in halal-certified outlets, but verify specific restaurant certification."},
            {"flag": "soft-foods", "note": "Steamed dumplings suitable for soft diet."}
        ]
    },
    {
        "name": "Chrysanthemum Tea",
        "description": "Lightly sweetened floral tea made from dried chrysanthemum flowers, perfect for cleansing the palate.",
        "category": "Drinks",
        "estimatedKcal": 30,
        "nutrition": {
            "protein_g": 0.1,
            "carb_g": 7.0,
            "fat_g": 0.0,
            "sodium_mg": 5,
            "fibre_g": 0.0,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {"flag": "low-calorie", "note": "Contains less than 300 kcal per serving"},
            {"flag": "high-sugar", "note": "Contains approximately 7g of natural/added sugar from light sweetening"},
            {"flag": "halal", "note": "Commonly halal as it contains no animal products"},
            {"flag": "vegetarian", "note": "No meat or seafood ingredients"}
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
