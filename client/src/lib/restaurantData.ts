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
// Last updated: 2026-03-27T09:18:34.232481+00:00
// Source: agent_data_merger.py
export const SCRAPED_DISHES: Record<string, ScrapedDish[]> = {
  "tian-tian": [
    {
        "name": "Steamed Chicken Rice (Small)",
        "description": "Steamed chicken served with fragrant oily rice and accompanied by chili and ginger sauces.",
        "category": "Chicken Rice",
        "estimatedKcal": 400,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 50.0,
            "fat_g": 10.0,
            "sodium_mg": 700,
            "fibre_g": 0.8,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "halal",
                "note": "Commonly prepared with halal chicken in Singapore"
            }
        ]
    },
    {
        "name": "Steamed Chicken Rice (Large)",
        "description": "A large serving of Hainanese steamed chicken rice consisting of poached chicken and fragrant oily rice.",
        "category": "Chicken Rice",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 35.0,
            "carb_g": 80.0,
            "fat_g": 15.0,
            "sodium_mg": 900,
            "fibre_g": 1.0,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            }
        ]
    },
    {
        "name": "Roasted Chicken Rice",
        "description": "A popular Singaporean dish featuring poached or roasted chicken served with fragrant oily rice and accompanied by chili sauce and ginger paste.",
        "category": "Chicken Rice",
        "estimatedKcal": 500,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 65.0,
            "fat_g": 14.0,
            "sodium_mg": 800,
            "fibre_g": 1.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "Contains over 25g protein per serving"
            }
        ]
    },
    {
        "name": "Chicken Drumstick Rice",
        "description": "Steamed chicken drumstick served with fragrant oily rice, accompanied by chili sauce and ginger paste, typical of Hainanese Chicken Rice in Singapore.",
        "category": "Chicken Rice",
        "estimatedKcal": 500,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 60.0,
            "fat_g": 14.0,
            "sodium_mg": 780,
            "fibre_g": 1.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "balanced",
                "note": "Moderate protein, carbs, and fat content"
            }
        ]
    },
    {
        "name": "Chicken Soup",
        "description": "Clear chicken broth served as a light side soup accompanying Hainanese Chicken Rice.",
        "category": "Sides",
        "estimatedKcal": 70,
        "nutrition": {
            "protein_g": 6.5,
            "carb_g": 2.0,
            "fat_g": 3.0,
            "sodium_mg": 700,
            "fibre_g": 0.2,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "halal",
                "note": "Chicken-based dish suitable for halal diets"
            }
        ]
    },
    {
        "name": "Chilli Sauce",
        "description": "A spicy and tangy chilli sauce commonly served as a condiment with Hainanese Chicken Rice in Singapore.",
        "category": "Condiment",
        "estimatedKcal": 40,
        "nutrition": {
            "protein_g": 0.5,
            "carb_g": 9.0,
            "fat_g": 0.5,
            "sodium_mg": 300,
            "fibre_g": 0.5,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 0.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "spicy",
                "note": "Contains chilli peppers which add spiciness"
            }
        ]
    }
  ],
  "song-fa": [
    {
        "name": "Pork Rib Soup (Bak Kut Teh)",
        "description": "A savory pork rib soup simmered with herbs and spices, commonly enjoyed in Singapore and Malaysia.",
        "category": "Bak Kut Teh",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 32.0,
            "carb_g": 5.0,
            "fat_g": 24.0,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 10.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains more than 800mg sodium per serving"
            },
            {
                "flag": "high-fat",
                "note": "Contains more than 20g fat per serving"
            },
            {
                "flag": "high-protein",
                "note": "Contains more than 25g protein per serving"
            }
        ]
    },
    {
        "name": "You Char Kway (Dough Fritters)",
        "description": "Deep-fried dough fritters commonly served as a side dish with Bak Kut Teh in Singapore.",
        "category": "Sides",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 32.0,
            "carb_g": 5.0,
            "fat_g": 24.0,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains more than 800mg sodium per serving"
            },
            {
                "flag": "high-fat",
                "note": "Contains more than 20g fat per serving"
            },
            {
                "flag": "high-protein",
                "note": "Contains more than 25g protein per serving"
            }
        ]
    },
    {
        "name": "Braised Pork Trotters",
        "description": "Braised pork trotters slow-cooked in a flavorful herbal broth, typical of Singaporean Bak Kut Teh.",
        "category": "Mains",
        "estimatedKcal": 400,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 6.0,
            "fat_g": 26.0,
            "sodium_mg": 1200,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with pork, not halal"
            }
        ]
    },
    {
        "name": "Braised Tofu",
        "description": "Braised tofu simmered in a savory herbal broth, commonly served as a side dish in Bak Kut Teh meals.",
        "category": "Sides",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 6.0,
            "fat_g": 22.0,
            "sodium_mg": 1050,
            "fibre_g": 0.6,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains over 800mg sodium per serving"
            },
            {
                "flag": "high-fat",
                "note": "Contains over 20g fat per serving"
            },
            {
                "flag": "high-protein",
                "note": "Contains over 25g protein per serving"
            },
            {
                "flag": "halal",
                "note": "Typically prepared without non-halal ingredients"
            }
        ]
    },
    {
        "name": "Braised Peanuts",
        "description": "Braised peanuts cooked in a savory herbal broth, commonly served as a side dish in Bak Kut Teh meals.",
        "category": "Sides",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 32.0,
            "carb_g": 5.0,
            "fat_g": 24.0,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains more than 800mg sodium per serving"
            },
            {
                "flag": "high-fat",
                "note": "Contains more than 20g fat per serving"
            },
            {
                "flag": "high-protein",
                "note": "Contains more than 25g protein per serving"
            },
            {
                "flag": "halal",
                "note": "Typically prepared without non-halal ingredients"
            }
        ]
    },
    {
        "name": "Rice",
        "description": "Steamed white rice served as a staple accompaniment to Bak Kut Teh.",
        "category": "Staple",
        "estimatedKcal": 200,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 45.0,
            "fat_g": 0.4,
            "sodium_mg": 5,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "tai-hwa": [
    {
        "name": "Bak Chor Mee (Small)",
        "description": "A small serving of Singapore-style minced meat noodles with vinegar and chili.",
        "category": "Noodles",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 68.0,
            "fat_g": 16.0,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            }
        ]
    },
    {
        "name": "Bak Chor Mee (Medium)",
        "description": "A medium serving of Bak Chor Mee, a Singaporean noodle dish with minced pork, mushrooms, and vinegar-based sauce.",
        "category": "Noodles",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 68.0,
            "fat_g": 16.0,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            }
        ]
    },
    {
        "name": "Bak Chor Mee (Large)",
        "description": "A large serving of Singapore-style minced pork noodles with vinegar and chili sauce.",
        "category": "Noodles",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 68.0,
            "fat_g": 16.0,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 10.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            }
        ]
    },
    {
        "name": "Dry Bak Chor Mee",
        "description": "A Singaporean dry noodle dish featuring minced pork, mushrooms, and vinegar-based sauce.",
        "category": "Noodles",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 68.0,
            "fat_g": 16.0,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains more than 800mg sodium per serving"
            }
        ]
    },
    {
        "name": "Pork Liver Noodles",
        "description": "A Singaporean noodle dish featuring pork liver, minced pork, and noodles in a savory sauce.",
        "category": "Noodles",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 68.0,
            "fat_g": 16.0,
            "sodium_mg": 1200,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains 1200mg sodium, exceeding recommended limits"
            }
        ]
    }
  ],
  "liao-fan": [
    {
        "name": "Soya Sauce Chicken Rice",
        "description": "Steamed chicken braised in soy sauce served with fragrant rice, a popular Singaporean dish.",
        "category": "Chicken Rice",
        "estimatedKcal": 480,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 62.0,
            "fat_g": 12.0,
            "sodium_mg": 780,
            "fibre_g": 1.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "halal",
                "note": "Commonly prepared with halal chicken"
            }
        ]
    },
    {
        "name": "Soya Sauce Chicken Noodle",
        "description": "A classic Singaporean dish featuring tender soya sauce braised chicken served with egg noodles in a savory soy-based sauce.",
        "category": "Noodles",
        "estimatedKcal": 430,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 53.0,
            "fat_g": 11.0,
            "sodium_mg": 950,
            "fibre_g": 0.8,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg due to soy sauce and seasoning"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g from chicken"
            }
        ]
    },
    {
        "name": "Char Siew Rice",
        "description": "Char Siew Rice is a popular Singaporean dish featuring barbecued pork served with steamed white rice and a savory soy-based sauce.",
        "category": "Mains",
        "estimatedKcal": 430,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 55.0,
            "fat_g": 12.0,
            "sodium_mg": 900,
            "fibre_g": 0.8,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            }
        ]
    },
    {
        "name": "Roasted Pork Rice",
        "description": "A popular Singaporean dish featuring roasted pork served with steamed white rice and soy sauce.",
        "category": "Mains",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 55.0,
            "fat_g": 15.0,
            "sodium_mg": 900,
            "fibre_g": 0.8,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            }
        ]
    },
    {
        "name": "Mixed Meat Rice",
        "description": "A typical Singaporean mixed meat rice dish featuring soya sauce chicken served with steamed rice and accompanying meats.",
        "category": "Mains",
        "estimatedKcal": 430,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 55.0,
            "fat_g": 12.0,
            "sodium_mg": 950,
            "fibre_g": 0.8,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            }
        ]
    }
  ],
  "roland-restaurant": [
    {
        "name": "Chilli Crab (Sri Lanka)",
        "description": "Chilli Crab is a popular Singaporean seafood dish featuring crab cooked in a tangy, spicy tomato and chili-based sauce.",
        "category": "Seafood",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 15.0,
            "fat_g": 20.0,
            "sodium_mg": 1100,
            "fibre_g": 1.0,
            "gi": 30
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            },
            {
                "flag": "spicy",
                "note": "Contains chili and spices"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal seafood"
            }
        ]
    },
    {
        "name": "Black Pepper Crab",
        "description": "A Singaporean seafood dish featuring crab cooked in a rich black pepper sauce.",
        "category": "Seafood",
        "estimatedKcal": 330,
        "nutrition": {
            "protein_g": 29.0,
            "carb_g": 13.0,
            "fat_g": 19.0,
            "sodium_mg": 1000,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            }
        ]
    },
    {
        "name": "Mantou (Fried Buns)",
        "description": "Deep-fried Chinese steamed buns commonly served as a side with chilli crab in Singapore.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 5.0,
            "carb_g": 28.0,
            "fat_g": 18.0,
            "sodium_mg": 980,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains 980mg sodium per serving"
            },
            {
                "flag": "high-fat",
                "note": "Contains 18g fat, close to high-fat threshold"
            }
        ]
    },
    {
        "name": "Cereal Prawns",
        "description": "Deep-fried prawns coated in a sweet and savory cereal batter, served with a crispy cereal topping.",
        "category": "Seafood",
        "estimatedKcal": 340,
        "nutrition": {
            "protein_g": 27.0,
            "carb_g": 14.0,
            "fat_g": 20.0,
            "sodium_mg": 980,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 28.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            }
        ]
    },
    {
        "name": "Sambal Kangkong",
        "description": "Stir-fried water spinach in a spicy sambal chili sauce, a popular vegetable dish in Singaporean cuisine.",
        "category": "Vegetables",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 10.0,
            "carb_g": 15.0,
            "fat_g": 20.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 35
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sambal sauce contains significant salt content"
            },
            {
                "flag": "high-fat",
                "note": "Use of oil in stir-frying increases fat content"
            },
            {
                "flag": "spicy",
                "note": "Contains chili-based sambal sauce"
            }
        ]
    },
    {
        "name": "Steamed Fish",
        "description": "Steamed fish served with a spicy chilli crab sauce, typical of Singaporean cuisine.",
        "category": "Seafood",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 12.0,
            "fat_g": 18.0,
            "sodium_mg": 980,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 30.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "spicy",
                "note": "Contains chilli-based sauce"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            }
        ]
    }
  ],
  "jumbo-seafood": [
    {
        "name": "Chilli Crab",
        "description": "Chilli Crab is a popular Singaporean seafood dish featuring stir-fried crab in a tangy, spicy tomato-based chili sauce.",
        "category": "Seafood",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 15.0,
            "fat_g": 20.0,
            "sodium_mg": 1000,
            "fibre_g": 0.6,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 98.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content is 20g or more"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            },
            {
                "flag": "spicy",
                "note": "Contains chili and spices"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal ingredients"
            }
        ]
    },
    {
        "name": "Black Pepper Crab",
        "description": "A Singaporean seafood dish featuring crab cooked in a rich black pepper sauce.",
        "category": "Seafood",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 12.0,
            "fat_g": 22.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 98.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal ingredients"
            }
        ]
    },
    {
        "name": "Salted Egg Yolk Prawns",
        "description": "Deep-fried prawns coated in a rich, creamy salted egg yolk sauce, a popular seafood dish in Singapore.",
        "category": "Seafood",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 28.5,
            "carb_g": 18.0,
            "fat_g": 35.0,
            "sodium_mg": 950,
            "fibre_g": 1.5,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 32.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains salted egg yolk and seasoning, leading to high sodium content"
            },
            {
                "flag": "high-fat",
                "note": "Deep-fried prawns with creamy salted egg yolk sauce contribute to high fat"
            },
            {
                "flag": "high-protein",
                "note": "Prawns provide a significant amount of protein"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal ingredients in Singapore"
            }
        ]
    },
    {
        "name": "Cereal Butter Prawns",
        "description": "Deep-fried prawns coated in a sweet, buttery, and crunchy cereal batter, commonly served as a seafood appetizer in Singapore.",
        "category": "Seafood",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 25.0,
            "carb_g": 30.0,
            "fat_g": 22.0,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 32.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal prawns and ingredients"
            }
        ]
    },
    {
        "name": "Mantou",
        "description": "Steamed Chinese mantou buns, soft and fluffy, commonly served as a side in Singaporean seafood meals.",
        "category": "Sides",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 4.5,
            "carb_g": 30.0,
            "fat_g": 1.0,
            "sodium_mg": 200,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "Relatively low in calories for a side dish"
            },
            {
                "flag": "soft-foods",
                "note": "Soft and easy to chew"
            },
            {
                "flag": "vegetarian",
                "note": "Contains no animal products"
            }
        ]
    },
    {
        "name": "Sambal Kangkong",
        "description": "Stir-fried water spinach in a spicy, savory sambal chili paste typical of Singaporean cuisine.",
        "category": "Vegetables",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 3.5,
            "carb_g": 12.0,
            "fat_g": 10.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 14.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains sambal and soy sauce contributing to sodium content"
            },
            {
                "flag": "high-fat",
                "note": "Cooked with oil and sambal paste"
            },
            {
                "flag": "spicy",
                "note": "Contains chili-based sambal"
            },
            {
                "flag": "halal",
                "note": "Typically prepared without non-halal ingredients"
            },
            {
                "flag": "vegetarian",
                "note": "Contains no meat or seafood"
            }
        ]
    },
    {
        "name": "Fried Carrot Cake",
        "description": "A savory Singaporean stir-fried radish cake with eggs, preserved radish, and seasonings.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 10.5,
            "carb_g": 40.0,
            "fat_g": 12.0,
            "sodium_mg": 900,
            "fibre_g": 2.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains over 800mg sodium per serving"
            },
            {
                "flag": "high-fat",
                "note": "Contains over 20% calories from fat"
            }
        ]
    }
  ],
  "ya-kun": [
    {
        "name": "Kaya Toast Set (with Eggs & Coffee)",
        "description": "Traditional Singaporean breakfast set featuring toasted bread with kaya and butter, soft-boiled eggs, and a cup of kopi.",
        "category": "Breakfast Set",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 12.0,
            "carb_g": 40.0,
            "fat_g": 15.0,
            "sodium_mg": 600,
            "fibre_g": 1.5,
            "gi": 70
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "halal",
                "note": "Commonly prepared with halal ingredients in Singapore"
            }
        ]
    },
    {
        "name": "Thick Toast with Kaya & Butter",
        "description": "Thick toasted bread spread with kaya (coconut egg jam) and butter, a popular Singaporean breakfast item.",
        "category": "Toast",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 6.5,
            "carb_g": 38.0,
            "fat_g": 15.0,
            "sodium_mg": 350,
            "fibre_g": 1.5,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "Contains butter and kaya, contributing to high fat content"
            }
        ]
    },
    {
        "name": "Soft-Boiled Eggs (2 pcs)",
        "description": "Two soft-boiled chicken eggs commonly served as a breakfast item in Singapore kopitiams.",
        "category": "Eggs",
        "estimatedKcal": 140,
        "nutrition": {
            "protein_g": 12.6,
            "carb_g": 1.1,
            "fat_g": 9.5,
            "sodium_mg": 140,
            "fibre_g": 0,
            "gi": 0
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "Contains over 25g protein per serving"
            },
            {
                "flag": "halal",
                "note": "Eggs are halal by default"
            },
            {
                "flag": "soft-foods",
                "note": "Soft-boiled texture suitable for soft food diets"
            }
        ]
    },
    {
        "name": "Kaya Toast (Thin)",
        "description": "Thin kaya toast is a traditional Singaporean breakfast snack consisting of thinly sliced toasted bread spread with kaya and butter.",
        "category": "Toast",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 28.0,
            "fat_g": 7.0,
            "sodium_mg": 220,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "balanced",
                "note": "Moderate levels of protein, carbs, and fat"
            }
        ]
    },
    {
        "name": "Teh (Hot Milk Tea)",
        "description": "A hot, sweetened milk tea commonly served in Singaporean kopitiams.",
        "category": "Drinks",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 20.0,
            "fat_g": 5.0,
            "sodium_mg": 80,
            "fibre_g": 0,
            "gi": 60
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains added sugar typical of teh preparation"
            }
        ]
    },
    {
        "name": "Kopi (Black Coffee)",
        "description": "A traditional strong black coffee served in Singaporean kopitiams, typically brewed from Robusta beans.",
        "category": "Drinks",
        "estimatedKcal": 5,
        "nutrition": {
            "protein_g": 0.3,
            "carb_g": 0,
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
            {
                "flag": "low-calorie",
                "note": "Very low in calories"
            },
            {
                "flag": "halal",
                "note": "Suitable for halal diets"
            },
            {
                "flag": "balanced",
                "note": "Contains negligible macronutrients, no sugar or fat"
            }
        ]
    },
    {
        "name": "French Toast",
        "description": "A sweet and crispy fried bread soaked in egg and milk, commonly served with sugar or condensed milk.",
        "category": "Toast",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 9.5,
            "carb_g": 38.0,
            "fat_g": 14.0,
            "sodium_mg": 450,
            "fibre_g": 1.5,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "Contains significant fat from frying and egg"
            },
            {
                "flag": "high-sugar",
                "note": "Often served with sugar or condensed milk"
            },
            {
                "flag": "vegetarian",
                "note": "Contains no meat or fish"
            }
        ]
    }
  ],
  "old-chang-kee": [
    {
        "name": "Curry Puff (Original)",
        "description": "A flaky pastry filled with curried potatoes and sometimes meat, commonly enjoyed as a snack in Singapore.",
        "category": "Snacks",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 5.0,
            "carb_g": 28.0,
            "fat_g": 10.0,
            "sodium_mg": 380,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "balanced",
                "note": "Moderate levels of protein, carbs, and fat"
            }
        ]
    },
    {
        "name": "Curry Puff (Sardine)",
        "description": "A deep-fried pastry filled with spiced sardine and potato, commonly enjoyed as a snack in Singapore.",
        "category": "Snacks",
        "estimatedKcal": 240,
        "nutrition": {
            "protein_g": 7.0,
            "carb_g": 30.0,
            "fat_g": 12.0,
            "sodium_mg": 450,
            "fibre_g": 2.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "Contains 12g fat from deep-fried pastry"
            }
        ]
    },
    {
        "name": "Chicken Wing",
        "description": "Deep-fried chicken wing commonly served as a snack in Singapore hawker stalls.",
        "category": "Snacks",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 15.0,
            "carb_g": 5.0,
            "fat_g": 12.0,
            "sodium_mg": 700,
            "fibre_g": 0,
            "gi": 50
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "Contains over 15g protein per serving"
            }
        ]
    },
    {
        "name": "Otah-Otah",
        "description": "Grilled spicy fish paste wrapped in banana leaf, a popular Southeast Asian snack.",
        "category": "Snacks",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 12.5,
            "carb_g": 10.0,
            "fat_g": 8.0,
            "sodium_mg": 850,
            "fibre_g": 1.5,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "spicy",
                "note": "Contains chili and spices"
            },
            {
                "flag": "halal",
                "note": "Typically made with fish and halal ingredients"
            }
        ]
    },
    {
        "name": "Fishball on Stick",
        "description": "A popular Singaporean snack consisting of skewered fishballs, typically boiled or steamed and served with a light sauce.",
        "category": "Snacks",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 12.0,
            "carb_g": 10.0,
            "fat_g": 5.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 50
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.2,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains over 800mg sodium due to fishball processing and sauce"
            }
        ]
    },
    {
        "name": "Sotong Head",
        "description": "Deep-fried squid head snack commonly served in Singaporean hawker stalls.",
        "category": "Snacks",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 18.5,
            "carb_g": 10.0,
            "fat_g": 12.0,
            "sodium_mg": 750,
            "fibre_g": 1.2,
            "gi": 50
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "Contains significant protein from squid"
            },
            {
                "flag": "high-fat",
                "note": "Deep-fried preparation increases fat content"
            }
        ]
    }
  ],
  "bengawan-solo": [
    {
        "name": "Pandan Layer Cake",
        "description": "A traditional Peranakan pandan-flavored layered cake with a soft, sweet, and fragrant texture.",
        "category": "Cakes",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 52.0,
            "fat_g": 10.0,
            "sodium_mg": 120,
            "fibre_g": 1.0,
            "gi": 72
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 28.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains significant sugar content typical of layered cakes"
            }
        ]
    },
    {
        "name": "Kueh Lapis",
        "description": "A traditional Peranakan layered steamed cake made from rice flour, coconut milk, and sugar.",
        "category": "Kueh",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 32.0,
            "fat_g": 5.0,
            "sodium_mg": 80,
            "fibre_g": 0.5,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains significant sugar from coconut milk and added sugar"
            }
        ]
    },
    {
        "name": "Ondeh Ondeh",
        "description": "Ondeh Ondeh is a traditional Peranakan kueh consisting of glutinous rice flour balls filled with palm sugar and coated in grated coconut.",
        "category": "Kueh",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 30.0,
            "fat_g": 4.5,
            "sodium_mg": 50,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains palm sugar filling"
            },
            {
                "flag": "vegetarian",
                "note": "No animal products used"
            }
        ]
    },
    {
        "name": "Kueh Salat",
        "description": "Kueh Salat is a traditional Peranakan two-layered dessert with a glutinous rice base topped with a sweet pandan-flavored custard.",
        "category": "Kueh",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 3.5,
            "carb_g": 40.0,
            "fat_g": 5.0,
            "sodium_mg": 150,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "vegetarian",
                "note": "Contains no meat or animal gelatin"
            }
        ]
    },
    {
        "name": "Pineapple Tarts",
        "description": "A traditional Peranakan pastry consisting of buttery shortcrust pastry filled with sweet and tangy pineapple jam.",
        "category": "Pastry",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 1.5,
            "carb_g": 20.0,
            "fat_g": 7.5,
            "sodium_mg": 120,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 18.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "Contains buttery pastry contributing to fat content"
            }
        ]
    }
  ],
  "lorong-selamat": [
    {
        "name": "Char Koay Teow (Regular)",
        "description": "A stir-fried flat rice noodle dish with egg, prawns, Chinese sausage, and bean sprouts, typical of Penang style Char Koay Teow.",
        "category": "Noodles",
        "estimatedKcal": 740,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 88.0,
            "fat_g": 32.0,
            "sodium_mg": 1400,
            "fibre_g": 2.5,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            }
        ]
    },
    {
        "name": "Char Koay Teow (Special with Extra Cockles)",
        "description": "A stir-fried flat rice noodle dish with prawns, cockles, egg, Chinese sausage, and bean sprouts, cooked in pork fat and soy sauce.",
        "category": "Noodles",
        "estimatedKcal": 780,
        "nutrition": {
            "protein_g": 24.0,
            "carb_g": 90.0,
            "fat_g": 35.0,
            "sodium_mg": 1500,
            "fibre_g": 3.0,
            "gi": 60
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 9.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            }
        ]
    },
    {
        "name": "Char Koay Teow (No Cockles)",
        "description": "Stir-fried flat rice noodles with egg, Chinese sausage, prawns, bean sprouts, and chives, without cockles.",
        "category": "Noodles",
        "estimatedKcal": 700,
        "nutrition": {
            "protein_g": 20.0,
            "carb_g": 85.0,
            "fat_g": 30.0,
            "sodium_mg": 1300,
            "fibre_g": 2.5,
            "gi": 60
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            }
        ]
    }
  ],
  "air-itam-laksa": [
    {
        "name": "Penang Laksa (Regular)",
        "description": "A tangy and spicy Penang-style fish-based noodle soup with tamarind, herbs, and rice noodles.",
        "category": "Noodles",
        "estimatedKcal": 420,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 62.0,
            "fat_g": 12.0,
            "sodium_mg": 1100,
            "fibre_g": 3.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            }
        ]
    },
    {
        "name": "Penang Laksa (Large)",
        "description": "A large bowl of Penang Laksa featuring thick rice noodles in a tangy, spicy fish-based tamarind broth with herbs and vegetables.",
        "category": "Noodles",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 20.0,
            "carb_g": 65.0,
            "fat_g": 14.0,
            "sodium_mg": 1200,
            "fibre_g": 3.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            }
        ]
    },
    {
        "name": "Penang Laksa with Extra Prawn",
        "description": "A tangy and spicy Penang Laksa noodle soup with extra prawns, featuring a rich fish-based broth and tamarind flavor.",
        "category": "Noodles",
        "estimatedKcal": 500,
        "nutrition": {
            "protein_g": 26.0,
            "carb_g": 62.0,
            "fat_g": 14.0,
            "sodium_mg": 1300,
            "fibre_g": 3.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "spicy",
                "note": "Contains spicy ingredients typical of Penang Laksa"
            }
        ]
    }
  ],
  "penang-road-teochew": [
    {
        "name": "Cendol (Regular)",
        "description": "A traditional Penang dessert made with coconut milk, palm sugar syrup, green rice flour jelly, and shaved ice.",
        "category": "Desserts",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 58.0,
            "fat_g": 6.0,
            "sodium_mg": 80,
            "fibre_g": 1.5,
            "gi": 75
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains high amounts of palm sugar syrup"
            },
            {
                "flag": "vegetarian",
                "note": "Contains no meat or animal-derived gelatin"
            }
        ]
    },
    {
        "name": "Cendol with Red Bean",
        "description": "A traditional Penang dessert featuring shaved ice, green rice flour jelly, red beans, coconut milk, and palm sugar syrup.",
        "category": "Desserts",
        "estimatedKcal": 300,
        "nutrition": {
            "protein_g": 5.0,
            "carb_g": 65.0,
            "fat_g": 7.0,
            "sodium_mg": 90,
            "fibre_g": 3.0,
            "gi": 75
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains palm sugar syrup and red beans contributing to high sugar content"
            }
        ]
    },
    {
        "name": "Durian Cendol",
        "description": "A Penang-style dessert featuring shaved ice, green rice flour jelly, coconut milk, palm sugar syrup, and durian flesh.",
        "category": "Desserts",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 4.0,
            "carb_g": 65.0,
            "fat_g": 12.0,
            "sodium_mg": 90,
            "fibre_g": 2.0,
            "gi": 75
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains palm sugar syrup and durian, contributing to high sugar content"
            },
            {
                "flag": "high-fat",
                "note": "Coconut milk and durian increase fat content"
            },
            {
                "flag": "vegetarian",
                "note": "Contains no meat or animal-derived gelatin"
            }
        ]
    },
    {
        "name": "Ais Kacang",
        "description": "Ais Kacang is a popular Penang dessert consisting of shaved ice topped with sweet syrups, red beans, corn, grass jelly, and palm seeds.",
        "category": "Desserts",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 58.0,
            "fat_g": 6.0,
            "sodium_mg": 80,
            "fibre_g": 1.5,
            "gi": 75
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains high sugar from syrups and sweet toppings"
            }
        ]
    }
  ],
  "nasi-kandar-pelita": [
    {
        "name": "Nasi Kandar (Plain Rice + 2 Lauk)",
        "description": "A Malaysian dish featuring steamed plain rice served with two types of flavorful curries or side dishes.",
        "category": "Nasi Kandar",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 25.0,
            "carb_g": 85.0,
            "fat_g": 22.0,
            "sodium_mg": 1200,
            "fibre_g": 5.0,
            "gi": 70
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content typically exceeds 800mg due to curry sauces"
            },
            {
                "flag": "high-fat",
                "note": "Contains rich curry gravies with coconut milk or oil"
            },
            {
                "flag": "high-protein",
                "note": "Includes meat or seafood lauk providing substantial protein"
            }
        ]
    },
    {
        "name": "Chicken Curry",
        "description": "A rich and spicy Malaysian chicken curry typically served with rice, featuring tender chicken pieces cooked in a coconut milk and spice blend.",
        "category": "Curries",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 28.5,
            "carb_g": 12.0,
            "fat_g": 22.0,
            "sodium_mg": 900,
            "fibre_g": 2.5,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 7.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "spicy",
                "note": "Contains chili and spices typical of Malaysian curry"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal chicken"
            }
        ]
    },
    {
        "name": "Fish Curry",
        "description": "A spicy Malaysian fish curry made with fish simmered in a coconut milk and spice-based gravy.",
        "category": "Curries",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 25.0,
            "carb_g": 10.0,
            "fat_g": 22.0,
            "sodium_mg": 900,
            "fibre_g": 2.5,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 9.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "spicy",
                "note": "Contains chili and spices typical of Malaysian fish curry"
            },
            {
                "flag": "halal",
                "note": "Commonly prepared with halal-certified ingredients"
            }
        ]
    },
    {
        "name": "Dhal Curry",
        "description": "A spiced lentil curry commonly served in Malaysian Nasi Kandar, rich in protein and fiber.",
        "category": "Curries",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 12.5,
            "carb_g": 30.0,
            "fat_g": 7.0,
            "sodium_mg": 700,
            "fibre_g": 8.0,
            "gi": 35
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 4.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "Contains over 25% of calories from protein"
            },
            {
                "flag": "halal",
                "note": "Commonly prepared in halal-certified establishments"
            },
            {
                "flag": "vegetarian",
                "note": "Made primarily from lentils and spices"
            },
            {
                "flag": "spicy",
                "note": "Typically includes chili and spices"
            }
        ]
    },
    {
        "name": "Fried Chicken",
        "description": "Deep-fried chicken typically served as a main protein in Malaysian Nasi Kandar meals.",
        "category": "Mains",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 8.0,
            "fat_g": 22.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 50
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "halal",
                "note": "Commonly prepared with halal chicken"
            }
        ]
    },
    {
        "name": "Roti Canai",
        "description": "Flaky, layered flatbread commonly served in Malaysian Nasi Kandar stalls, made from wheat flour, ghee, and water.",
        "category": "Bread",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 7.0,
            "carb_g": 44.0,
            "fat_g": 14.0,
            "sodium_mg": 500,
            "fibre_g": 2.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "Contains 14g fat, mainly from ghee used in preparation"
            }
        ]
    },
    {
        "name": "Teh Tarik",
        "description": "A popular Malaysian hot milk tea beverage made with strong black tea and condensed milk, known for its frothy texture.",
        "category": "Drinks",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 20.0,
            "fat_g": 3.0,
            "sodium_mg": 60,
            "fibre_g": 0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains condensed milk contributing to high sugar content"
            }
        ]
    }
  ],
  "village-park": [
    {
        "name": "Nasi Lemak with Fried Chicken",
        "description": "Traditional Malaysian dish of coconut milk rice served with fried chicken, sambal, anchovies, peanuts, and boiled egg.",
        "category": "Nasi Lemak",
        "estimatedKcal": 700,
        "nutrition": {
            "protein_g": 25.0,
            "carb_g": 70.0,
            "fat_g": 30.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            },
            {
                "flag": "halal",
                "note": "Commonly prepared with halal ingredients"
            },
            {
                "flag": "spicy",
                "note": "Includes spicy sambal"
            }
        ]
    },
    {
        "name": "Nasi Lemak with Rendang",
        "description": "A traditional Malaysian dish featuring fragrant coconut rice served with spicy beef rendang and accompaniments.",
        "category": "Nasi Lemak",
        "estimatedKcal": 700,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 70.0,
            "fat_g": 32.0,
            "sodium_mg": 900,
            "fibre_g": 3.5,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 14.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            },
            {
                "flag": "spicy",
                "note": "Contains spicy beef rendang"
            }
        ]
    },
    {
        "name": "Nasi Lemak (Basic)",
        "description": "A traditional Malaysian dish featuring coconut milk rice served with sambal, anchovies, peanuts, boiled egg, and cucumber.",
        "category": "Nasi Lemak",
        "estimatedKcal": 600,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 72.0,
            "fat_g": 28.0,
            "sodium_mg": 820,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "balanced",
                "note": "Contains a balance of macronutrients"
            },
            {
                "flag": "halal",
                "note": "Commonly prepared according to halal standards"
            }
        ]
    },
    {
        "name": "Fried Chicken (Half)",
        "description": "Half portion of deep-fried crispy chicken, commonly served as a side in Malaysian nasi lemak meals.",
        "category": "Mains",
        "estimatedKcal": 450,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 5.0,
            "fat_g": 25.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 10.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            },
            {
                "flag": "halal",
                "note": "Commonly prepared with halal chicken"
            }
        ]
    },
    {
        "name": "Sambal Sotong",
        "description": "Spicy stir-fried squid in a chili-based sambal sauce, commonly served as a side dish in Malaysian nasi lemak.",
        "category": "Sides",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 22.0,
            "carb_g": 12.0,
            "fat_g": 18.0,
            "sodium_mg": 850,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 8.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "spicy",
                "note": "Contains chili-based sambal sauce"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal ingredients"
            }
        ]
    }
  ],
  "capitol-satay": [
    {
        "name": "Satay Celup (per stick)",
        "description": "Satay Celup is a Malaysian dish featuring skewered meat and seafood dipped in a rich, spicy peanut sauce.",
        "category": "Satay",
        "estimatedKcal": 55,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 2.0,
            "fat_g": 3.0,
            "sodium_mg": 120,
            "fibre_g": 0.2,
            "gi": 35
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 0.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "spicy",
                "note": "Contains spicy peanut sauce"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal meat"
            }
        ]
    },
    {
        "name": "Satay Celup Pork Intestine",
        "description": "Malaysian satay celup dish featuring pork intestine dipped in a rich peanut satay sauce.",
        "category": "Satay",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 18.5,
            "carb_g": 15.0,
            "fat_g": 22.0,
            "sodium_mg": 950,
            "fibre_g": 2.0,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            }
        ]
    },
    {
        "name": "Satay Celup Prawn",
        "description": "Satay Celup Prawn is a Malaysian dish featuring prawns dipped in a spicy peanut satay sauce.",
        "category": "Satay",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 10.0,
            "fat_g": 15.0,
            "sodium_mg": 900,
            "fibre_g": 1.5,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            }
        ]
    },
    {
        "name": "Satay Celup Fish Cake",
        "description": "Fish cake skewers dipped in a spicy satay peanut sauce, a popular Malaysian satay celup dish.",
        "category": "Satay",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 7.0,
            "carb_g": 5.0,
            "fat_g": 5.0,
            "sodium_mg": 400,
            "fibre_g": 0.5,
            "gi": 35
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 0.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "spicy",
                "note": "Contains spicy satay peanut sauce"
            }
        ]
    },
    {
        "name": "Satay Celup Tofu",
        "description": "Satay Celup Tofu is a Malaysian dish featuring tofu dipped in a spicy peanut satay sauce.",
        "category": "Satay",
        "estimatedKcal": 90,
        "nutrition": {
            "protein_g": 7.0,
            "carb_g": 5.0,
            "fat_g": 6.0,
            "sodium_mg": 400,
            "fibre_g": 1.0,
            "gi": 35
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 0.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "spicy",
                "note": "Contains spicy satay sauce"
            },
            {
                "flag": "halal",
                "note": "Commonly prepared with halal ingredients"
            },
            {
                "flag": "vegetarian",
                "note": "Tofu-based dish without meat"
            }
        ]
    },
    {
        "name": "Peanut Sauce (pot)",
        "description": "A rich and creamy peanut sauce commonly served with satay celup in Malaysia.",
        "category": "Sauce",
        "estimatedKcal": 60,
        "nutrition": {
            "protein_g": 6.0,
            "carb_g": 3.0,
            "fat_g": 4.0,
            "sodium_mg": 150,
            "fibre_g": 0.3,
            "gi": 35
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "Contains more than 20% of calories from fat"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal ingredients in Malaysia"
            }
        ]
    }
  ],
  "no-signboard": [
    {
        "name": "White Pepper Crab",
        "description": "White Pepper Crab is a Singaporean seafood dish featuring fresh crab stir-fried with a fragrant white pepper sauce.",
        "category": "Seafood",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 40.0,
            "carb_g": 15.0,
            "fat_g": 30.0,
            "sodium_mg": 1200,
            "fibre_g": 1.5,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg due to seasoning and sauce"
            },
            {
                "flag": "high-fat",
                "note": "Contains significant fat from cooking oil and crab roe"
            },
            {
                "flag": "high-protein",
                "note": "Rich in protein from crab meat"
            }
        ]
    },
    {
        "name": "Chilli Crab",
        "description": "Chilli Crab is a popular Singaporean seafood dish featuring stir-fried crab in a tangy, spicy tomato-based chili sauce.",
        "category": "Seafood",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 15.0,
            "fat_g": 20.0,
            "sodium_mg": 1000,
            "fibre_g": 0.5,
            "gi": 30
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 88.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            },
            {
                "flag": "spicy",
                "note": "Contains chili and spices"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal seafood"
            }
        ]
    },
    {
        "name": "Drunken Prawns",
        "description": "Drunken Prawns is a Singaporean seafood dish featuring live prawns cooked in a flavorful, often alcoholic broth.",
        "category": "Seafood",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 28.5,
            "carb_g": 5.0,
            "fat_g": 12.0,
            "sodium_mg": 900,
            "fibre_g": 0.5,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 28.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg due to broth and sauces"
            },
            {
                "flag": "high-protein",
                "note": "Rich in protein from prawns"
            },
            {
                "flag": "high-fat",
                "note": "Contains moderate fat from cooking oils and prawn fat"
            }
        ]
    },
    {
        "name": "Fried Carrot Cake",
        "description": "A savory Singaporean stir-fried dish made from radish cake, eggs, preserved radish, and seasonings.",
        "category": "Sides",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 12.5,
            "carb_g": 40.0,
            "fat_g": 15.0,
            "sodium_mg": 900,
            "fibre_g": 2.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains soy sauce and preserved radish contributing to high sodium"
            },
            {
                "flag": "high-fat",
                "note": "Fried with oil and eggs leading to higher fat content"
            }
        ]
    },
    {
        "name": "Sambal Kangkong",
        "description": "Stir-fried water spinach in a spicy sambal chili paste, commonly served as a vegetable side dish in Singaporean cuisine.",
        "category": "Vegetables",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 3.5,
            "carb_g": 10.0,
            "fat_g": 7.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 40
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 12.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains sambal and soy sauce contributing to sodium content"
            },
            {
                "flag": "spicy",
                "note": "Contains chili-based sambal paste"
            }
        ]
    },
    {
        "name": "Mantou",
        "description": "Steamed Chinese mantou buns, soft and fluffy, typically served as a side in Singaporean seafood meals.",
        "category": "Sides",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 4.5,
            "carb_g": 30.0,
            "fat_g": 1.0,
            "sodium_mg": 200,
            "fibre_g": 1.0,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "low-calorie",
                "note": "Contains less than 200 kcal per serving"
            },
            {
                "flag": "soft-foods",
                "note": "Soft and easy to chew"
            },
            {
                "flag": "vegetarian",
                "note": "Contains no animal products"
            }
        ]
    }
  ],
  "toastbox": [
    {
        "name": "Kaya Butter Toast",
        "description": "Traditional Singaporean breakfast toast spread with kaya jam and butter, served crispy and sweet.",
        "category": "Toast",
        "estimatedKcal": 280,
        "nutrition": {
            "protein_g": 5.0,
            "carb_g": 30.0,
            "fat_g": 15.0,
            "sodium_mg": 400,
            "fibre_g": 1.5,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "Contains significant butter and coconut milk-based kaya"
            }
        ]
    },
    {
        "name": "Peanut Butter Toast",
        "description": "A simple toasted bread slice spread with creamy peanut butter, commonly served in Singapore kopitiams.",
        "category": "Toast",
        "estimatedKcal": 320,
        "nutrition": {
            "protein_g": 10.5,
            "carb_g": 30.0,
            "fat_g": 18.0,
            "sodium_mg": 350,
            "fibre_g": 4.0,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-fat",
                "note": "Contains 18g fat mainly from peanut butter"
            }
        ]
    },
    {
        "name": "Soft-Boiled Eggs",
        "description": "Two soft-boiled chicken eggs typically served with soy sauce and white pepper.",
        "category": "Eggs",
        "estimatedKcal": 140,
        "nutrition": {
            "protein_g": 12.6,
            "carb_g": 1.1,
            "fat_g": 9.5,
            "sodium_mg": 210,
            "fibre_g": 0,
            "gi": 0
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-protein",
                "note": "Contains over 25g protein per serving"
            }
        ]
    },
    {
        "name": "Nasi Lemak",
        "description": "A traditional Malay fragrant rice dish cooked in coconut milk, served with sambal, fried anchovies, peanuts, boiled egg, and cucumber slices.",
        "category": "Mains",
        "estimatedKcal": 600,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 72.0,
            "fat_g": 28.0,
            "sodium_mg": 820,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            }
        ]
    },
    {
        "name": "Mee Siam",
        "description": "Mee Siam is a spicy and tangy rice vermicelli dish commonly served with a flavorful gravy, tofu, egg, and garnished with lime and chives.",
        "category": "Noodles",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 12.5,
            "carb_g": 50.0,
            "fat_g": 10.0,
            "sodium_mg": 900,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 5.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg due to sauces and condiments"
            },
            {
                "flag": "spicy",
                "note": "Contains chili and spices typical of Mee Siam"
            }
        ]
    },
    {
        "name": "Laksa",
        "description": "A spicy coconut milk-based noodle soup with rice noodles, prawns, fish cake, and tofu puffs.",
        "category": "Noodles",
        "estimatedKcal": 550,
        "nutrition": {
            "protein_g": 25.0,
            "carb_g": 60.0,
            "fat_g": 22.0,
            "sodium_mg": 1200,
            "fibre_g": 4.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 6.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "spicy",
                "note": "Contains chili and spices"
            }
        ]
    },
    {
        "name": "Teh Tarik",
        "description": "A popular sweet and creamy pulled tea beverage made with black tea, condensed milk, and sugar.",
        "category": "Drinks",
        "estimatedKcal": 130,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 21.0,
            "fat_g": 3.5,
            "sodium_mg": 60,
            "fibre_g": 0,
            "gi": 65
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains significant added sugar from condensed milk and sugar"
            }
        ]
    },
    {
        "name": "Kopi C",
        "description": "A traditional Singaporean/Malaysian coffee drink made with strong brewed coffee, sweetened condensed milk, and evaporated milk.",
        "category": "Drinks",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 15.0,
            "fat_g": 5.0,
            "sodium_mg": 80,
            "fibre_g": 0,
            "gi": 45
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains sweetened condensed milk contributing to high sugar content"
            }
        ]
    }
  ],
  "baba-charlie": [
    {
        "name": "Kueh Lapis (Rainbow)",
        "description": "A layered steamed cake made from rice flour, coconut milk, sugar, and eggs, typical of Nyonya cuisine.",
        "category": "Kueh",
        "estimatedKcal": 180,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 32.0,
            "fat_g": 5.0,
            "sodium_mg": 80,
            "fibre_g": 0.5,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 2.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains significant sugar content typical of kueh lapis"
            }
        ]
    },
    {
        "name": "Ang Ku Kueh",
        "description": "Ang Ku Kueh is a traditional Nyonya glutinous rice cake filled with sweet mung bean paste, characterized by its soft, chewy texture and red tortoise shell shape.",
        "category": "Kueh",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 3.0,
            "carb_g": 30.0,
            "fat_g": 2.5,
            "sodium_mg": 150,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "vegetarian",
                "note": "Contains no meat or animal-derived gelatin"
            },
            {
                "flag": "low-calorie",
                "note": "Relatively low in calories per serving"
            }
        ]
    },
    {
        "name": "Kueh Talam",
        "description": "Kueh Talam is a traditional Nyonya two-layered steamed cake made from rice flour and coconut milk, featuring a slightly sweet and creamy texture.",
        "category": "Kueh",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 2.5,
            "carb_g": 28.0,
            "fat_g": 5.0,
            "sodium_mg": 50,
            "fibre_g": 1.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "vegetarian",
                "note": "Contains no meat or animal-derived gelatin"
            }
        ]
    },
    {
        "name": "Pulut Inti",
        "description": "Pulut Inti is a traditional Nyonya kueh made of glutinous rice topped with sweet grated coconut.",
        "category": "Kueh",
        "estimatedKcal": 220,
        "nutrition": {
            "protein_g": 3.5,
            "carb_g": 40.0,
            "fat_g": 6.0,
            "sodium_mg": 150,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 2.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "vegetarian",
                "note": "Contains no meat or animal products"
            }
        ]
    },
    {
        "name": "Onde Onde",
        "description": "Onde Onde is a traditional Nyonya kueh consisting of glutinous rice flour balls filled with palm sugar and coated in grated coconut.",
        "category": "Kueh",
        "estimatedKcal": 150,
        "nutrition": {
            "protein_g": 2.0,
            "carb_g": 30.0,
            "fat_g": 4.5,
            "sodium_mg": 50,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 1.5,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sugar",
                "note": "Contains palm sugar filling"
            },
            {
                "flag": "vegetarian",
                "note": "Made from plant-based ingredients"
            }
        ]
    }
  ],
  "peter-pork-ribs": [
    {
        "name": "Klang Bak Kut Teh (Dark Herbal)",
        "description": "A rich, dark herbal pork rib soup from Klang, Malaysia, known for its strong herbal flavors and tender meat.",
        "category": "Bak Kut Teh",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 32.0,
            "carb_g": 5.0,
            "fat_g": 24.0,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 18.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            }
        ]
    },
    {
        "name": "Dry Bak Kut Teh",
        "description": "A Malaysian-style dry Bak Kut Teh featuring tender pork ribs cooked in a rich, herbal, and slightly oily broth with minimal sauce.",
        "category": "Bak Kut Teh",
        "estimatedKcal": 400,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 6.0,
            "fat_g": 26.0,
            "sodium_mg": 1200,
            "fibre_g": 0.6,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 16.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal-certified ingredients in Malaysia"
            }
        ]
    },
    {
        "name": "Braised Pork Trotters",
        "description": "Braised pork trotters slow-cooked in a savory herbal broth, rich in protein and fat.",
        "category": "Mains",
        "estimatedKcal": 400,
        "nutrition": {
            "protein_g": 30.0,
            "carb_g": 6.0,
            "fat_g": 26.0,
            "sodium_mg": 1200,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 14.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            },
            {
                "flag": "halal",
                "note": "Typically prepared with halal-certified ingredients in Malaysia"
            }
        ]
    },
    {
        "name": "Braised Tofu",
        "description": "Braised tofu cooked in a savory herbal broth, commonly served as a side dish in Malaysian Bak Kut Teh meals.",
        "category": "Sides",
        "estimatedKcal": 360,
        "nutrition": {
            "protein_g": 28.0,
            "carb_g": 6.0,
            "fat_g": 22.0,
            "sodium_mg": 1050,
            "fibre_g": 0.6,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 6.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g"
            },
            {
                "flag": "halal",
                "note": "Typically prepared without pork in Malaysia"
            },
            {
                "flag": "vegetarian",
                "note": "Main ingredient is tofu, suitable for vegetarians"
            }
        ]
    },
    {
        "name": "You Char Kway",
        "description": "You Char Kway is a deep-fried dough fritter commonly served as a side dish in Malaysian Bak Kut Teh meals.",
        "category": "Sides",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 32.0,
            "carb_g": 5.0,
            "fat_g": 24.0,
            "sodium_mg": 1100,
            "fibre_g": 0.5,
            "gi": 25
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 3.0,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains more than 800mg sodium per serving"
            },
            {
                "flag": "high-fat",
                "note": "Contains more than 20g fat per serving"
            },
            {
                "flag": "high-protein",
                "note": "Contains more than 25g protein per serving"
            },
            {
                "flag": "halal",
                "note": "Typically prepared without pork, suitable for halal diets"
            }
        ]
    },
    {
        "name": "White Rice",
        "description": "Steamed white rice served as a staple accompaniment to Bak Kut Teh.",
        "category": "Staple",
        "estimatedKcal": 200,
        "nutrition": {
            "protein_g": 4.2,
            "carb_g": 45.0,
            "fat_g": 0.4,
            "sodium_mg": 5,
            "fibre_g": 0.6,
            "gi": 70
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 1.0,
        "image_url": "",
        "healthFlags": []
    }
  ],
  "din-tai-fung": [
    {
        "name": "Xiao Long Bao (10 pcs)",
        "description": "Steamed soup dumplings filled with seasoned pork and gelatin broth, served in a set of 10 pieces.",
        "category": "Dim Sum",
        "estimatedKcal": 380,
        "nutrition": {
            "protein_g": 18.0,
            "carb_g": 42.0,
            "fat_g": 14.0,
            "sodium_mg": 680,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "high",
        "source": "llm_estimated",
        "price_sgd": 14.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "balanced",
                "note": "Moderate levels of protein, carbs, and fat"
            },
            {
                "flag": "halal",
                "note": "Typically made with pork, so not halal unless specified"
            }
        ]
    },
    {
        "name": "Steamed Shrimp & Pork Dumplings (10 pcs)",
        "description": "Steamed shrimp and pork dumplings served in a typical Taiwanese dim sum style, commonly found in Singapore.",
        "category": "Dim Sum",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 22.5,
            "carb_g": 30.0,
            "fat_g": 12.0,
            "sodium_mg": 900,
            "fibre_g": 2.0,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 16.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            }
        ]
    },
    {
        "name": "Truffle & Pork Xiao Long Bao (6 pcs)",
        "description": "Steamed pork dumplings infused with truffle oil, served in a set of six pieces.",
        "category": "Dim Sum",
        "estimatedKcal": 400,
        "nutrition": {
            "protein_g": 20.0,
            "carb_g": 45.0,
            "fat_g": 18.0,
            "sodium_mg": 700,
            "fibre_g": 1.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 19.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "halal",
                "note": "Typically contains pork, not halal"
            }
        ]
    },
    {
        "name": "Pan-Fried Pork Buns (4 pcs)",
        "description": "Four pan-fried pork buns, featuring a savory minced pork filling wrapped in a slightly crispy and chewy dough.",
        "category": "Dim Sum",
        "estimatedKcal": 520,
        "nutrition": {
            "protein_g": 18.5,
            "carb_g": 60.0,
            "fat_g": 20.5,
            "sodium_mg": 900,
            "fibre_g": 2.5,
            "gi": 55
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 11.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            }
        ]
    },
    {
        "name": "Braised Beef Noodles",
        "description": "A savory Taiwanese-style braised beef noodle soup with tender beef chunks, wheat noodles, and flavorful broth.",
        "category": "Noodles",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 30.5,
            "carb_g": 70.0,
            "fat_g": 18.0,
            "sodium_mg": 1200,
            "fibre_g": 3.5,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 18.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            }
        ]
    },
    {
        "name": "Fried Rice with Pork Chop",
        "description": "A savory Taiwanese-style fried rice served with a crispy pork chop on top.",
        "category": "Rice",
        "estimatedKcal": 650,
        "nutrition": {
            "protein_g": 28.5,
            "carb_g": 75.0,
            "fat_g": 22.0,
            "sodium_mg": 950,
            "fibre_g": 3.0,
            "gi": 65
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 16.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Sodium content exceeds 800mg per serving"
            },
            {
                "flag": "high-fat",
                "note": "Fat content exceeds 20g per serving"
            },
            {
                "flag": "high-protein",
                "note": "Protein content exceeds 25g per serving"
            }
        ]
    },
    {
        "name": "Steamed Egg Fried Rice",
        "description": "Steamed Egg Fried Rice is a soft-textured rice dish cooked with eggs and light seasoning, commonly served in Taiwanese dim sum style.",
        "category": "Rice",
        "estimatedKcal": 350,
        "nutrition": {
            "protein_g": 9.5,
            "carb_g": 55.0,
            "fat_g": 8.0,
            "sodium_mg": 700,
            "fibre_g": 1.2,
            "gi": 70
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 12.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "soft-foods",
                "note": "Soft texture suitable for easy eating"
            }
        ]
    },
    {
        "name": "Sautéed String Beans",
        "description": "Stir-fried string beans typically cooked with garlic and light soy sauce, served as a vegetable side dish.",
        "category": "Vegetables",
        "estimatedKcal": 120,
        "nutrition": {
            "protein_g": 3.5,
            "carb_g": 12.0,
            "fat_g": 7.0,
            "sodium_mg": 700,
            "fibre_g": 4.0,
            "gi": 35
        },
        "confidence": "medium",
        "source": "llm_estimated",
        "price_sgd": 10.8,
        "image_url": "",
        "healthFlags": [
            {
                "flag": "high-sodium",
                "note": "Contains soy sauce contributing to sodium content"
            },
            {
                "flag": "vegetarian",
                "note": "Contains no meat or animal products"
            },
            {
                "flag": "halal",
                "note": "Typically prepared without non-halal ingredients"
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
