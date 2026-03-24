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
// Last updated: 2026-03-23T20:41:50.404653
// Source: agent_data_merger.py
export const SCRAPED_DISHES: Record<string, ScrapedDish[]> = {
  "tian-tian": [
    {
      "name": "Steamed Chicken Rice (Small)",
      "description": "Silky poached chicken on fragrant rice, with dark soy and chilli",
      "category": "Chicken Rice",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 3.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    },
    {
      "name": "Steamed Chicken Rice (Large)",
      "description": "Full portion steamed chicken with ginger-infused rice",
      "category": "Chicken Rice",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 5.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    },
    {
      "name": "Roasted Chicken Rice",
      "description": "Crispy-skinned roast chicken on garlic rice",
      "category": "Chicken Rice",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 4.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    },
    {
      "name": "Soy Sauce Chicken Rice",
      "description": "Braised soy chicken on sesame-scented rice",
      "category": "Chicken Rice",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 4.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    },
    {
      "name": "Chicken Drumstick Rice",
      "description": "Full drumstick, steamed or roasted",
      "category": "Chicken Rice",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 5.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    },
    {
      "name": "Chicken Rice Soup",
      "description": "Clear ginger-chicken broth",
      "category": "Sides",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 1.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    },
    {
      "name": "Braised Tofu",
      "description": "Silken tofu in light soy sauce",
      "category": "Sides",
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
      "price_sgd": 2.0,
      "image_url": "",
      "healthFlags": []
    }
  ],
  "song-fa": [
    {
      "name": "Signature Pork Ribs Soup (Small)",
      "description": "Tender pork ribs in peppery herbal broth, refillable",
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
      "price_sgd": 9.8,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fat",
          "note": "28g fat"
        }
      ]
    },
    {
      "name": "Signature Pork Ribs Soup (Large)",
      "description": "Generous portion of fall-off-bone ribs",
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
      "price_sgd": 14.8,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fat",
          "note": "28g fat"
        }
      ]
    },
    {
      "name": "Pork Belly Bak Kut Teh",
      "description": "Layered pork belly in the signature broth",
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
      "price_sgd": 10.8,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fat",
          "note": "28g fat"
        }
      ]
    },
    {
      "name": "Pig's Trotters",
      "description": "Braised trotters, collagen-rich",
      "category": "Bak Kut Teh",
      "estimatedKcal": 388,
      "nutrition": {
        "protein_g": 16,
        "carb_g": 28,
        "fat_g": 22,
        "sodium_mg": 820,
        "fibre_g": 0.8,
        "gi": 58
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 12.8,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fat",
          "note": "22g fat"
        }
      ]
    },
    {
      "name": "You Tiao (Fried Dough)",
      "description": "Crispy dough fritters for dipping",
      "category": "Sides",
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
      "price_sgd": 2.0,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Braised Peanuts",
      "description": "Slow-braised peanuts in soy",
      "category": "Sides",
      "estimatedKcal": 612,
      "nutrition": {
        "protein_g": 26,
        "carb_g": 78,
        "fat_g": 20,
        "sodium_mg": 1340,
        "fibre_g": 2.8,
        "gi": 70
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 3.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1340mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "612 kcal"
        }
      ]
    }
  ],
  "tai-hwa": [
    {
      "name": "Kway Teow",
      "description": "Flat rice noodles",
      "category": "Noodles",
      "estimatedKcal": 744,
      "nutrition": {
        "protein_g": 22,
        "carb_g": 95,
        "fat_g": 28,
        "sodium_mg": 1680,
        "fibre_g": 2.1,
        "gi": 72
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 6.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1680mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "744 kcal"
        },
        {
          "flag": "high-fat",
          "note": "28g fat"
        },
        {
          "flag": "high-gi",
          "note": "GI 72"
        }
      ]
    }
  ],
  "liao-fan": [
    {
      "name": "Soya Sauce Chicken Rice",
      "description": "Michelin-starred soy-braised chicken on rice — world's cheapest Michelin meal",
      "category": "Chicken Rice",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 3.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    },
    {
      "name": "Wonton Noodle Soup",
      "description": "Prawn wontons in clear broth",
      "category": "Noodles",
      "estimatedKcal": 412,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 58,
        "fat_g": 12,
        "sodium_mg": 1180,
        "fibre_g": 1.6,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 3.5,
      "image_url": "",
      "healthFlags": []
    }
  ],
  "328-katong": [
    {
      "name": "Katong Laksa (Small)",
      "description": "Spicy coconut curry broth with cut bee hoon, cockles, and prawns",
      "category": "Laksa",
      "estimatedKcal": 589,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 68,
        "fat_g": 22,
        "sodium_mg": 1420,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 6.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1420mg Na"
        },
        {
          "flag": "high-fat",
          "note": "22g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    },
    {
      "name": "Katong Laksa (Large)",
      "description": "Generous bowl with extra cockles",
      "category": "Laksa",
      "estimatedKcal": 589,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 68,
        "fat_g": 22,
        "sodium_mg": 1420,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 8.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1420mg Na"
        },
        {
          "flag": "high-fat",
          "note": "22g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    },
    {
      "name": "Prawn Mee",
      "description": "Prawn-based broth with yellow noodles and bee hoon",
      "category": "Noodles",
      "estimatedKcal": 612,
      "nutrition": {
        "protein_g": 26,
        "carb_g": 78,
        "fat_g": 20,
        "sodium_mg": 1340,
        "fibre_g": 2.8,
        "gi": 70
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 6.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1340mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "612 kcal"
        }
      ]
    },
    {
      "name": "Otah",
      "description": "Grilled spiced fish cake in banana leaf",
      "category": "Sides",
      "estimatedKcal": 218,
      "nutrition": {
        "protein_g": 8,
        "carb_g": 32,
        "fat_g": 6,
        "sodium_mg": 480,
        "fibre_g": 2.8,
        "gi": 52
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 2.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "lighter-option"
        }
      ]
    }
  ],
  "roland-restaurant": [
    {
      "name": "Chilli Crab",
      "description": "Whole Sri Lankan crab in Roland's signature sweet-spicy tomato chilli sauce",
      "category": "Seafood",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 12,
        "fat_g": 14,
        "sodium_mg": 920,
        "fibre_g": 0.5,
        "gi": 45
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 88.0,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Black Pepper Crab",
      "description": "Wok-fried crab with coarsely ground black pepper and butter",
      "category": "Seafood",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 12,
        "fat_g": 14,
        "sodium_mg": 920,
        "fibre_g": 0.5,
        "gi": 45
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 88.0,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Salted Egg Crab",
      "description": "Crab coated in golden salted egg yolk sauce",
      "category": "Seafood",
      "estimatedKcal": 388,
      "nutrition": {
        "protein_g": 16,
        "carb_g": 28,
        "fat_g": 22,
        "sodium_mg": 820,
        "fibre_g": 0.8,
        "gi": 58
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 88.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fat",
          "note": "22g fat"
        }
      ]
    },
    {
      "name": "Mantou (Fried Buns)",
      "description": "Deep-fried steamed buns for dipping in chilli crab sauce",
      "category": "Sides",
      "estimatedKcal": 498,
      "nutrition": {
        "protein_g": 20,
        "carb_g": 72,
        "fat_g": 14,
        "sodium_mg": 1240,
        "fibre_g": 3.8,
        "gi": 66
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 4.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1240mg Na"
        },
        {
          "flag": "high-fibre",
          "note": "3.8g fibre"
        }
      ]
    },
    {
      "name": "Cereal Prawns",
      "description": "Crispy prawns tossed in oat cereal and curry leaves",
      "category": "Seafood",
      "estimatedKcal": 612,
      "nutrition": {
        "protein_g": 26,
        "carb_g": 78,
        "fat_g": 20,
        "sodium_mg": 1340,
        "fibre_g": 2.8,
        "gi": 70
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 28.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1340mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "612 kcal"
        }
      ]
    },
    {
      "name": "Sambal Kangkong",
      "description": "Water spinach wok-fried with sambal belacan",
      "category": "Vegetables",
      "estimatedKcal": 589,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 68,
        "fat_g": 22,
        "sodium_mg": 1420,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 12.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1420mg Na"
        },
        {
          "flag": "high-fat",
          "note": "22g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    }
  ],
  "jumbo-seafood": [
    {
      "name": "Chilli Crab",
      "description": "Jumbo's award-winning chilli crab — rich, tangy, slightly sweet",
      "category": "Seafood",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 12,
        "fat_g": 14,
        "sodium_mg": 920,
        "fibre_g": 0.5,
        "gi": 45
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 98.0,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Black Pepper Crab",
      "description": "Aromatic black pepper wok-fried crab",
      "category": "Seafood",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 12,
        "fat_g": 14,
        "sodium_mg": 920,
        "fibre_g": 0.5,
        "gi": 45
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 98.0,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Salted Egg Yolk Prawn",
      "description": "Tiger prawns in buttery salted egg yolk sauce",
      "category": "Seafood",
      "estimatedKcal": 388,
      "nutrition": {
        "protein_g": 16,
        "carb_g": 28,
        "fat_g": 22,
        "sodium_mg": 820,
        "fibre_g": 0.8,
        "gi": 58
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 32.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fat",
          "note": "22g fat"
        }
      ]
    },
    {
      "name": "Fried Baby Squid",
      "description": "Crispy baby squid with sambal",
      "category": "Seafood",
      "estimatedKcal": 744,
      "nutrition": {
        "protein_g": 22,
        "carb_g": 95,
        "fat_g": 28,
        "sodium_mg": 1680,
        "fibre_g": 2.1,
        "gi": 72
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 18.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1680mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "744 kcal"
        },
        {
          "flag": "high-fat",
          "note": "28g fat"
        },
        {
          "flag": "high-gi",
          "note": "GI 72"
        }
      ]
    },
    {
      "name": "Chilli Crab Fried Rice",
      "description": "Fried rice with chilli crab sauce",
      "category": "Rice",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 12,
        "fat_g": 14,
        "sodium_mg": 920,
        "fibre_g": 0.5,
        "gi": 45
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 16.0,
      "image_url": "",
      "healthFlags": []
    }
  ],
  "ya-kun": [
    {
      "name": "Kaya Butter Toast Set",
      "description": "Toasted bread with coconut kaya jam and cold butter, with soft-boiled eggs and kopi",
      "category": "Toast",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 6,
        "carb_g": 38,
        "fat_g": 12,
        "sodium_mg": 320,
        "fibre_g": 1.2,
        "gi": 70
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 5.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Thick Toast with Kaya",
      "description": "Thick-cut white bread, toasted, with kaya",
      "category": "Toast",
      "estimatedKcal": 348,
      "nutrition": {
        "protein_g": 8,
        "carb_g": 48,
        "fat_g": 14,
        "sodium_mg": 780,
        "fibre_g": 1.4,
        "gi": 62
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 3.5,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "French Toast",
      "description": "Egg-dipped fried toast with kaya and butter",
      "category": "Toast",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 6,
        "carb_g": 38,
        "fat_g": 12,
        "sodium_mg": 320,
        "fibre_g": 1.2,
        "gi": 70
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 4.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Soft Boiled Eggs",
      "description": "Two soft-boiled eggs with soy sauce and white pepper",
      "category": "Eggs",
      "estimatedKcal": 388,
      "nutrition": {
        "protein_g": 16,
        "carb_g": 28,
        "fat_g": 22,
        "sodium_mg": 820,
        "fibre_g": 0.8,
        "gi": 58
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 1.8,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fat",
          "note": "22g fat"
        }
      ]
    },
    {
      "name": "Milo Dinosaur",
      "description": "Iced Milo with extra Milo powder on top",
      "category": "Drinks",
      "estimatedKcal": 680,
      "nutrition": {
        "protein_g": 28,
        "carb_g": 78,
        "fat_g": 24,
        "sodium_mg": 1120,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 3.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "680 kcal"
        },
        {
          "flag": "high-fat",
          "note": "24g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    }
  ],
  "old-chang-kee": [
    {
      "name": "Curry Puff (Original)",
      "description": "Flaky pastry filled with spiced potato and chicken curry",
      "category": "Puffs",
      "estimatedKcal": 268,
      "nutrition": {
        "protein_g": 6,
        "carb_g": 32,
        "fat_g": 12,
        "sodium_mg": 380,
        "fibre_g": 1.8,
        "gi": 62
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 1.6,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Curry Puff (Sardine)",
      "description": "Sardine and onion filling in crispy pastry",
      "category": "Puffs",
      "estimatedKcal": 268,
      "nutrition": {
        "protein_g": 6,
        "carb_g": 32,
        "fat_g": 12,
        "sodium_mg": 380,
        "fibre_g": 1.8,
        "gi": 62
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 1.6,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Curry Puff (Egg)",
      "description": "Hard-boiled egg in curry filling",
      "category": "Puffs",
      "estimatedKcal": 268,
      "nutrition": {
        "protein_g": 6,
        "carb_g": 32,
        "fat_g": 12,
        "sodium_mg": 380,
        "fibre_g": 1.8,
        "gi": 62
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 1.6,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Chicken Wing",
      "description": "Marinated fried chicken wing",
      "category": "Snacks",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 2.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    },
    {
      "name": "Sotong Head",
      "description": "Battered and fried squid head",
      "category": "Snacks",
      "estimatedKcal": 412,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 58,
        "fat_g": 12,
        "sodium_mg": 1180,
        "fibre_g": 1.6,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 2.5,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Fishball Skewer",
      "description": "Skewered fishballs in sweet chilli sauce",
      "category": "Snacks",
      "estimatedKcal": 248,
      "nutrition": {
        "protein_g": 22,
        "carb_g": 18,
        "fat_g": 8,
        "sodium_mg": 1080,
        "fibre_g": 1.2,
        "gi": 42
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 1.5,
      "image_url": "",
      "healthFlags": []
    }
  ],
  "bengawan-solo": [
    {
      "name": "Ondeh Ondeh",
      "description": "Pandan glutinous rice balls with palm sugar filling, rolled in coconut",
      "category": "Kueh",
      "estimatedKcal": 412,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 58,
        "fat_g": 12,
        "sodium_mg": 1180,
        "fibre_g": 1.6,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 8.5,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Pineapple Tarts",
      "description": "Buttery pastry with pineapple jam filling",
      "category": "Pastries",
      "estimatedKcal": 589,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 68,
        "fat_g": 22,
        "sodium_mg": 1420,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 24.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1420mg Na"
        },
        {
          "flag": "high-fat",
          "note": "22g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    }
  ],
  "lorong-selamat": [
    {
      "name": "Char Kway Teow (Regular)",
      "description": "Penang's most famous CKT — wok hei, cockles, Chinese sausage, bean sprouts",
      "category": "Noodles",
      "estimatedKcal": 744,
      "nutrition": {
        "protein_g": 22,
        "carb_g": 95,
        "fat_g": 28,
        "sodium_mg": 1680,
        "fibre_g": 2.1,
        "gi": 72
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 5.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1680mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "744 kcal"
        },
        {
          "flag": "high-fat",
          "note": "28g fat"
        },
        {
          "flag": "high-gi",
          "note": "GI 72"
        }
      ]
    },
    {
      "name": "Char Kway Teow (Large)",
      "description": "Large portion with extra cockles and prawns",
      "category": "Noodles",
      "estimatedKcal": 744,
      "nutrition": {
        "protein_g": 22,
        "carb_g": 95,
        "fat_g": 28,
        "sodium_mg": 1680,
        "fibre_g": 2.1,
        "gi": 72
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 7.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1680mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "744 kcal"
        },
        {
          "flag": "high-fat",
          "note": "28g fat"
        },
        {
          "flag": "high-gi",
          "note": "GI 72"
        }
      ]
    },
    {
      "name": "Char Kway Teow with Extra Egg",
      "description": "Standard with an extra egg",
      "category": "Noodles",
      "estimatedKcal": 744,
      "nutrition": {
        "protein_g": 22,
        "carb_g": 95,
        "fat_g": 28,
        "sodium_mg": 1680,
        "fibre_g": 2.1,
        "gi": 72
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 6.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1680mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "744 kcal"
        },
        {
          "flag": "high-fat",
          "note": "28g fat"
        },
        {
          "flag": "high-gi",
          "note": "GI 72"
        }
      ]
    }
  ],
  "air-itam-laksa": [
    {
      "name": "Penang Asam Laksa",
      "description": "Tangy tamarind fish broth with thick rice noodles, pineapple, and shrimp paste — CNN #7 world's best food",
      "category": "Laksa",
      "estimatedKcal": 589,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 68,
        "fat_g": 22,
        "sodium_mg": 1420,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 4.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1420mg Na"
        },
        {
          "flag": "high-fat",
          "note": "22g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    },
    {
      "name": "Asam Laksa with Extra Fish",
      "description": "Extra flaked mackerel in the signature sour broth",
      "category": "Laksa",
      "estimatedKcal": 589,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 68,
        "fat_g": 22,
        "sodium_mg": 1420,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 5.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1420mg Na"
        },
        {
          "flag": "high-fat",
          "note": "22g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    }
  ],
  "penang-road-teochew": [
    {
      "name": "Cendol (Regular)",
      "description": "Pandan jelly noodles in coconut milk with palm sugar syrup and shaved ice",
      "category": "Desserts",
      "estimatedKcal": 298,
      "nutrition": {
        "protein_g": 3,
        "carb_g": 58,
        "fat_g": 8,
        "sodium_mg": 45,
        "fibre_g": 1.2,
        "gi": 78
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 3.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-gi",
          "note": "GI 78"
        },
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Cendol with Red Bean",
      "description": "Classic cendol with braised red beans",
      "category": "Desserts",
      "estimatedKcal": 298,
      "nutrition": {
        "protein_g": 3,
        "carb_g": 58,
        "fat_g": 8,
        "sodium_mg": 45,
        "fibre_g": 1.2,
        "gi": 78
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 3.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-gi",
          "note": "GI 78"
        },
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Durian Cendol",
      "description": "Cendol topped with fresh durian pulp",
      "category": "Desserts",
      "estimatedKcal": 298,
      "nutrition": {
        "protein_g": 3,
        "carb_g": 58,
        "fat_g": 8,
        "sodium_mg": 45,
        "fibre_g": 1.2,
        "gi": 78
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 6.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-gi",
          "note": "GI 78"
        },
        {
          "flag": "lighter-option"
        }
      ]
    }
  ],
  "nasi-kandar-pelita": [
    {
      "name": "Nasi Kandar (Standard)",
      "description": "Steamed rice with your choice of curries and sides — Penang-style",
      "category": "Nasi Kandar",
      "estimatedKcal": 680,
      "nutrition": {
        "protein_g": 28,
        "carb_g": 78,
        "fat_g": 24,
        "sodium_mg": 1120,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 5.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "680 kcal"
        },
        {
          "flag": "high-fat",
          "note": "24g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    },
    {
      "name": "Roti Canai",
      "description": "Flaky flatbread with dhal and curry",
      "category": "Bread",
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
      "price_sgd": 1.5,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Roti Telur",
      "description": "Egg-stuffed roti canai",
      "category": "Bread",
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
      "price_sgd": 2.5,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Murtabak",
      "description": "Stuffed pan-fried flatbread with minced meat and egg",
      "category": "Bread",
      "estimatedKcal": 248,
      "nutrition": {
        "protein_g": 8,
        "carb_g": 38,
        "fat_g": 8,
        "sodium_mg": 580,
        "fibre_g": 3.2,
        "gi": 55
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 8.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        },
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Chicken Curry",
      "description": "Rich Malay-style chicken curry",
      "category": "Curries",
      "estimatedKcal": 607,
      "nutrition": {
        "protein_g": 32,
        "carb_g": 72,
        "fat_g": 18,
        "sodium_mg": 890,
        "fibre_g": 1.2,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 4.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "607 kcal"
        }
      ]
    }
  ],
  "village-park": [
    {
      "name": "Nasi Lemak (Standard)",
      "description": "KL's most celebrated nasi lemak — coconut rice, crispy anchovies, roasted peanuts, cucumber, sambal",
      "category": "Nasi Lemak",
      "estimatedKcal": 644,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 82,
        "fat_g": 26,
        "sodium_mg": 780,
        "fibre_g": 3.4,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 4.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "644 kcal"
        },
        {
          "flag": "high-fat",
          "note": "26g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.4g fibre"
        }
      ]
    },
    {
      "name": "Nasi Lemak with Chicken Rendang",
      "description": "Coconut rice with slow-cooked dry rendang chicken",
      "category": "Nasi Lemak",
      "estimatedKcal": 644,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 82,
        "fat_g": 26,
        "sodium_mg": 780,
        "fibre_g": 3.4,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 9.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "644 kcal"
        },
        {
          "flag": "high-fat",
          "note": "26g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.4g fibre"
        }
      ]
    },
    {
      "name": "Nasi Lemak with Fried Chicken",
      "description": "Crispy fried chicken on coconut rice",
      "category": "Nasi Lemak",
      "estimatedKcal": 644,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 82,
        "fat_g": 26,
        "sodium_mg": 780,
        "fibre_g": 3.4,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 7.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "644 kcal"
        },
        {
          "flag": "high-fat",
          "note": "26g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.4g fibre"
        }
      ]
    },
    {
      "name": "Nasi Lemak with Squid Sambal",
      "description": "Tender squid in spicy sambal",
      "category": "Nasi Lemak",
      "estimatedKcal": 644,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 82,
        "fat_g": 26,
        "sodium_mg": 780,
        "fibre_g": 3.4,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 8.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "644 kcal"
        },
        {
          "flag": "high-fat",
          "note": "26g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.4g fibre"
        }
      ]
    }
  ],
  "capitol-satay": [
    {
      "name": "Satay Celup (per skewer)",
      "description": "Dip-yourself satay in boiling peanut sauce — Malacca's signature street food",
      "category": "Satay Celup",
      "estimatedKcal": 380,
      "nutrition": {
        "protein_g": 28,
        "carb_g": 22,
        "fat_g": 18,
        "sodium_mg": 680,
        "fibre_g": 1.5,
        "gi": 55
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 0.8,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Prawn Skewer",
      "description": "Fresh prawn on skewer for the satay pot",
      "category": "Satay Celup",
      "estimatedKcal": 468,
      "nutrition": {
        "protein_g": 22,
        "carb_g": 62,
        "fat_g": 14,
        "sodium_mg": 1560,
        "fibre_g": 2.2,
        "gi": 67
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 1.5,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1560mg Na"
        }
      ]
    },
    {
      "name": "Quail Egg Skewer",
      "description": "Boiled quail eggs on skewer",
      "category": "Satay Celup",
      "estimatedKcal": 348,
      "nutrition": {
        "protein_g": 8,
        "carb_g": 48,
        "fat_g": 14,
        "sodium_mg": 780,
        "fibre_g": 1.4,
        "gi": 62
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 0.8,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Tofu Skewer",
      "description": "Firm tofu for the peanut sauce pot",
      "category": "Satay Celup",
      "estimatedKcal": 412,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 58,
        "fat_g": 12,
        "sodium_mg": 1180,
        "fibre_g": 1.6,
        "gi": 65
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 0.8,
      "image_url": "",
      "healthFlags": []
    }
  ],
  "no-signboard": [
    {
      "name": "White Pepper Crab",
      "description": "No Signboard's signature dish — whole crab in fragrant white pepper sauce",
      "category": "Seafood",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 12,
        "fat_g": 14,
        "sodium_mg": 920,
        "fibre_g": 0.5,
        "gi": 45
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 88.0,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Chilli Crab",
      "description": "Classic Singapore chilli crab",
      "category": "Seafood",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 12,
        "fat_g": 14,
        "sodium_mg": 920,
        "fibre_g": 0.5,
        "gi": 45
      },
      "confidence": "medium",
      "source": "curated_seed",
      "price_sgd": 88.0,
      "image_url": "",
      "healthFlags": []
    },
    {
      "name": "Drunken Prawns",
      "description": "Live prawns flambéed in Chinese rice wine",
      "category": "Seafood",
      "estimatedKcal": 612,
      "nutrition": {
        "protein_g": 26,
        "carb_g": 78,
        "fat_g": 20,
        "sodium_mg": 1340,
        "fibre_g": 2.8,
        "gi": 70
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 28.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1340mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "612 kcal"
        }
      ]
    },
    {
      "name": "Cereal Prawns",
      "description": "Crispy prawns with oat cereal",
      "category": "Seafood",
      "estimatedKcal": 612,
      "nutrition": {
        "protein_g": 26,
        "carb_g": 78,
        "fat_g": 20,
        "sodium_mg": 1340,
        "fibre_g": 2.8,
        "gi": 70
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 26.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1340mg Na"
        },
        {
          "flag": "high-calorie",
          "note": "612 kcal"
        }
      ]
    },
    {
      "name": "Fried Mantou",
      "description": "Deep-fried steamed buns",
      "category": "Sides",
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
      "price_sgd": 4.0,
      "image_url": "",
      "healthFlags": []
    }
  ],
  "toastbox": [
    {
      "name": "Traditional Kaya Toast Set",
      "description": "Toasted bread with kaya and butter, soft eggs, and nanyang coffee",
      "category": "Toast Sets",
      "estimatedKcal": 285,
      "nutrition": {
        "protein_g": 6,
        "carb_g": 38,
        "fat_g": 12,
        "sodium_mg": 320,
        "fibre_g": 1.2,
        "gi": 70
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 5.9,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "lighter-option"
        }
      ]
    },
    {
      "name": "Nasi Lemak",
      "description": "Coconut rice with fried chicken, egg, and sambal",
      "category": "Rice",
      "estimatedKcal": 644,
      "nutrition": {
        "protein_g": 18,
        "carb_g": 82,
        "fat_g": 26,
        "sodium_mg": 780,
        "fibre_g": 3.4,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 5.9,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-calorie",
          "note": "644 kcal"
        },
        {
          "flag": "high-fat",
          "note": "26g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.4g fibre"
        }
      ]
    },
    {
      "name": "Laksa",
      "description": "Spicy coconut laksa with prawns and fishcake",
      "category": "Noodles",
      "estimatedKcal": 589,
      "nutrition": {
        "protein_g": 24,
        "carb_g": 68,
        "fat_g": 22,
        "sodium_mg": 1420,
        "fibre_g": 3.2,
        "gi": 68
      },
      "confidence": "high",
      "source": "curated_seed",
      "price_sgd": 6.9,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-sodium",
          "note": "1420mg Na"
        },
        {
          "flag": "high-fat",
          "note": "22g fat"
        },
        {
          "flag": "high-fibre",
          "note": "3.2g fibre"
        }
      ]
    }
  ],
  "baba-charlie": [
    {
      "name": "Pulut Tai Tai",
      "description": "Blue butterfly pea glutinous rice with kaya",
      "category": "Kueh",
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
      "price_sgd": 6.0,
      "image_url": "",
      "healthFlags": []
    }
  ],
  "peter-pork-ribs": [
    {
      "name": "Bak Kut Teh",
      "description": "KL-style herbal bak kut teh — darker, more medicinal than Singapore's peppery version",
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
      "price_sgd": 12.0,
      "image_url": "",
      "healthFlags": [
        {
          "flag": "high-fat",
          "note": "28g fat"
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
          "flag": "high-fat",
          "note": "28g fat"
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
      "healthFlags": []
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
