// ============================================================
// FoodDB — Cultural Metadata Layer
// Tropical Bauhaus design: food culture is the hero
// Based on: "The Transnational Plate" — SG & MY Foodways Research
// ============================================================

export type EthnicTradition =
  | "malay" | "chinese" | "indian" | "peranakan" | "eurasian" | "mamak" | "straits";

export type MealOccasion =
  | "breakfast" | "lunch" | "dinner" | "snack" | "beverage"
  | "late-night" | "festive" | "school-canteen";

export type Generation =
  | "seniors" | "middle-aged" | "youth" | "children" | "all";

export type Region =
  | "singapore" | "penang" | "kl" | "malacca" | "johor" | "straits" | "malaysia";

export type DietaryTag =
  | "halal" | "vegetarian" | "low-sodium" | "low-sugar" | "high-protein"
  | "plant-based" | "soft-foods" | "wholegrain" | "nutri-grade"
  | "high-fibre" | "low-calorie" | "keto";

export interface CulturalProfile {
  ethnic?: EthnicTradition[];
  occasions?: MealOccasion[];
  generations?: Generation[];
  regions?: Region[];
  dietary?: DietaryTag[];
  story?: string;           // Short cultural narrative (1–2 sentences)
  regionalVariants?: string; // e.g. "SG: pale seafood stock · KL: dark soy · Penang: prawn soup"
  heritageNote?: string;    // Historical/cultural significance
}

// ── Ethnic Tradition Definitions ────────────────────────────

export const ETHNIC_TRADITIONS: Record<EthnicTradition, {
  label: string; color: string; bgColor: string; description: string;
}> = {
  malay:     { label: "Malay",     color: "#1a6b3c", bgColor: "#e8f5ee", description: "Rooted in Malay-Muslim heritage — fragrant herbs, coconut milk, sambal, and halal preparation." },
  chinese:   { label: "Chinese",   color: "#b45309", bgColor: "#fef3c7", description: "Hokkien, Cantonese, Teochew, and Hainanese traditions blended with Southeast Asian spices." },
  indian:    { label: "Indian",    color: "#7c3aed", bgColor: "#f3e8ff", description: "South Indian Tamil and North Indian traditions, including the uniquely local Mamak fusion." },
  peranakan: { label: "Peranakan", color: "#be185d", bgColor: "#fce7f3", description: "Nyonya cuisine — a centuries-old fusion of Chinese ingredients with Malay spices and coconut milk." },
  eurasian:  { label: "Eurasian",  color: "#0369a1", bgColor: "#e0f2fe", description: "Portuguese, Dutch, and British colonial influences fused with Asian traditions." },
  mamak:     { label: "Mamak",     color: "#b45309", bgColor: "#fff7ed", description: "Indian-Muslim fusion — the 24-hour social hub of Singapore and Malaysia." },
  straits:   { label: "Straits Heritage", color: "#374151", bgColor: "#f3f4f6", description: "Shared culinary identity of the Straits of Malacca — transcending ethnic boundaries." },
};

// ── Meal Occasions ───────────────────────────────────────────

export const MEAL_OCCASIONS: Record<MealOccasion, {
  label: string; icon: string; description: string;
}> = {
  breakfast:      { label: "Breakfast",       icon: "🌅", description: "Morning meal traditions from kopitiams to hawker stalls" },
  lunch:          { label: "Lunch",           icon: "☀️", description: "Midday meals — Economy Rice, Nasi Campur, quick working lunches" },
  dinner:         { label: "Dinner",          icon: "🌙", description: "Evening communal meals and family dining" },
  snack:          { label: "Snacks & Kuih",   icon: "🍡", description: "Traditional kuih, street snacks, and light bites" },
  beverage:       { label: "Beverages",       icon: "☕", description: "From Kopi Tarik to Teh Tarik, Milo Dinosaur to artisanal matcha" },
  "late-night":   { label: "Late Night",      icon: "🌃", description: "Mamak stall culture — 24-hour supper and social dining" },
  festive:        { label: "Festive",         icon: "🎊", description: "Special occasion dishes for Hari Raya, Chinese New Year, Deepavali" },
  "school-canteen": { label: "School Canteen", icon: "🏫", description: "Child-friendly hawker and bento options for school-age children" },
};

// ── Generations ──────────────────────────────────────────────

export const GENERATIONS: Record<Generation, {
  label: string; ageRange: string; foodDriver: string; healthOrientation: string;
}> = {
  seniors:      { label: "Seniors (50+)",      ageRange: "50+",   foodDriver: "Health & Familiarity",    healthOrientation: "High — low salt/sugar, soft textures, 'Medicine as Food'" },
  "middle-aged": { label: "Middle-Aged (30s–40s)", ageRange: "30–49", foodDriver: "Convenience & Efficiency", healthOrientation: "Moderate — balanced but time-constrained" },
  youth:        { label: "Youth / Gen Z",      ageRange: "15–29", foodDriver: "Social Identity & Taste",  healthOrientation: "Low — influenced by peer/visual trends, TikTok viral foods" },
  children:     { label: "Children (5–14)",    ageRange: "5–14",  foodDriver: "Familiarity & Playfulness", healthOrientation: "High — policy-driven school nutrition, mild flavours" },
  all:          { label: "All Ages",           ageRange: "All",   foodDriver: "Universal appeal",         healthOrientation: "Varies" },
};

// ── Regions ──────────────────────────────────────────────────

export const REGIONS: Record<Region, {
  label: string; flag: string; description: string;
}> = {
  singapore: { label: "Singapore",       flag: "🇸🇬", description: "Lion City hawker culture — Hainanese, Hokkien, Malay, Indian fusion" },
  penang:    { label: "Penang",          flag: "🇲🇾", description: "UNESCO heritage city — Nyonya, Hokkien Prawn Mee, Asam Laksa capital" },
  kl:        { label: "Kuala Lumpur",    flag: "🇲🇾", description: "Malaysia's capital — dark soy Hokkien Mee, Mamak culture, Nasi Lemak Bungkus" },
  malacca:   { label: "Malacca",         flag: "🇲🇾", description: "Peranakan heartland — Nyonya Laksa Lemak, Ayam Pongteh, Cendol" },
  johor:     { label: "Johor",           flag: "🇲🇾", description: "Gateway city — Laksa Johor, Mee Bandung Muar, Otak-Otak" },
  straits:   { label: "Straits Heritage", flag: "🌊", description: "Shared culinary identity spanning both sides of the Straits of Malacca" },
  malaysia:  { label: "Malaysia",        flag: "🇲🇾", description: "Diverse Malaysian food traditions across all states" },
};

// ── Dietary Tags ─────────────────────────────────────────────

export const DIETARY_TAGS: Record<DietaryTag, {
  label: string; color: string; bgColor: string;
}> = {
  halal:        { label: "Halal",         color: "#166534", bgColor: "#dcfce7" },
  vegetarian:   { label: "Vegetarian",    color: "#15803d", bgColor: "#f0fdf4" },
  "low-sodium": { label: "Low Sodium",    color: "#1e40af", bgColor: "#dbeafe" },
  "low-sugar":  { label: "Low Sugar",     color: "#9333ea", bgColor: "#f3e8ff" },
  "high-protein": { label: "High Protein", color: "#b45309", bgColor: "#fef3c7" },
  "plant-based": { label: "Plant-Based",  color: "#15803d", bgColor: "#dcfce7" },
  "soft-foods": { label: "Soft Texture",  color: "#0369a1", bgColor: "#e0f2fe" },
  wholegrain:   { label: "Wholegrain",    color: "#92400e", bgColor: "#fef3c7" },
  "nutri-grade": { label: "Nutri-Grade",  color: "#166534", bgColor: "#dcfce7" },
  "high-fibre": { label: "High Fibre",    color: "#065f46", bgColor: "#d1fae5" },
  "low-calorie": { label: "Low Calorie",  color: "#0c4a6e", bgColor: "#e0f2fe" },
  keto:         { label: "Keto",          color: "#7c3aed", bgColor: "#ede9fe" },
};

// ── Cultural Food Knowledge Base ─────────────────────────────
// Maps food name keywords → cultural profile
// Used to enrich search results with cultural context

export const CULTURAL_KNOWLEDGE: Array<{
  keywords: string[];
  profile: CulturalProfile;
}> = [
  // ── Malay Classics ──
  {
    keywords: ["nasi lemak"],
    profile: {
      ethnic: ["malay"],
      occasions: ["breakfast", "lunch"],
      generations: ["all"],
      regions: ["singapore", "kl", "malaysia"],
      dietary: ["halal"],
      story: "The national dish of Malaysia and a beloved Singapore staple. Rice steamed in coconut milk and pandan leaves, served with sambal, ikan bilis, peanuts, cucumber, and egg.",
      regionalVariants: "SG: often served in banana leaf wraps · KL: Nasi Lemak Bungkus from roadside warungs · Penang: with curry chicken",
      heritageNote: "Translates to 'rich rice'. Pioneer generation consumed it wrapped in banana leaves at roadside warungs; Gen Z now eats it as a Nasi Lemak Burger.",
    },
  },
  {
    keywords: ["rendang", "beef rendang"],
    profile: {
      ethnic: ["malay"],
      occasions: ["lunch", "dinner", "festive"],
      generations: ["seniors", "middle-aged"],
      regions: ["malaysia", "singapore"],
      dietary: ["halal"],
      story: "A slow-cooked dry curry of extraordinary depth — beef simmered for hours in coconut milk and a complex rempah spice paste until almost dry.",
      heritageNote: "A festive dish served at Hari Raya Aidilfitri. The labor-intensive preparation is a marker of culinary mastery in Malay households.",
    },
  },
  {
    keywords: ["nasi campur", "economy rice", "mixed rice"],
    profile: {
      ethnic: ["malay", "chinese"],
      occasions: ["lunch", "dinner"],
      generations: ["middle-aged", "seniors"],
      regions: ["singapore", "malaysia"],
      dietary: ["halal"],
      story: "The working adult's daily staple — a plate of rice with a self-selected array of dishes from a hawker display. Quick, affordable, and nutritionally flexible.",
      heritageNote: "Defines the 'time-poverty' dining culture of Middle-Aged Singaporeans and Malaysians. The hawker centre's most democratic meal.",
    },
  },
  {
    keywords: ["teh tarik"],
    profile: {
      ethnic: ["mamak", "malay"],
      occasions: ["breakfast", "beverage", "late-night"],
      generations: ["all"],
      regions: ["singapore", "malaysia"],
      dietary: ["halal"],
      story: "Malaysia and Singapore's iconic pulled tea — black tea blended with condensed milk, poured dramatically between vessels to create a frothy top.",
      heritageNote: "The social lubricant of the Mamak stall. The 'pulling' technique aerates the tea and cools it to drinking temperature.",
    },
  },
  {
    keywords: ["kaya toast"],
    profile: {
      ethnic: ["chinese"],
      occasions: ["breakfast"],
      generations: ["seniors", "middle-aged", "youth"],
      regions: ["singapore"],
      dietary: [],
      story: "A Hainanese invention — crispy toast spread with kaya (coconut-pandan custard), served with soft-boiled eggs seasoned with dark soy sauce and white pepper.",
      heritageNote: "Originated when Hainanese cooks adapted British toast-and-jam for local tastes. Now a Singapore cultural icon served from kopitiams to artisanal cafés.",
    },
  },
  {
    keywords: ["laksa"],
    profile: {
      ethnic: ["peranakan", "chinese"],
      occasions: ["lunch", "dinner"],
      generations: ["all"],
      regions: ["singapore", "penang", "malacca"],
      dietary: [],
      story: "The definitive Peranakan noodle soup — exists in two great traditions: creamy Laksa Lemak (coconut milk base) and tangy Asam Laksa (tamarind base).",
      regionalVariants: "Singapore/Malacca: Laksa Lemak — rich, creamy coconut curry · Penang: Asam Laksa — sour, fishy tamarind broth · Johor: Laksa Johor with spaghetti",
      heritageNote: "Nyonya Laksa Lemak is considered one of the world's great noodle soups. The two styles reflect the fundamental divide between coastal Peranakan communities.",
    },
  },
  {
    keywords: ["chicken rice", "hainanese chicken"],
    profile: {
      ethnic: ["chinese"],
      occasions: ["lunch", "dinner"],
      generations: ["all"],
      regions: ["singapore", "kl", "penang"],
      dietary: [],
      story: "Singapore's unofficial national dish — poached or roasted chicken served over fragrant rice cooked in chicken stock, with chili sauce and ginger paste.",
      regionalVariants: "Singapore: Hainanese-style poached (national dish) · KL: Nasi Ayam — often roasted or BBQ · Penang: served with tangy chili sauce",
      heritageNote: "Brought by Hainanese immigrants in the early 20th century. The dish's simplicity belies the precision required — the rice is the true test of the cook.",
    },
  },
  {
    keywords: ["char kway teow", "char kuay teow"],
    profile: {
      ethnic: ["chinese"],
      occasions: ["lunch", "dinner", "late-night"],
      generations: ["seniors", "middle-aged"],
      regions: ["singapore", "penang", "kl"],
      dietary: [],
      story: "Flat rice noodles stir-fried at ferocious heat in a wok with prawns, cockles, Chinese sausage, egg, and bean sprouts — the 'wok hei' breath of fire is essential.",
      regionalVariants: "Singapore: with pork lard and cockles · Penang: lighter, more seafood-forward · KL: often without cockles",
      heritageNote: "Originally a cheap, high-calorie meal for manual laborers and rickshaw pullers. The 'Caloric Disconnect' — designed for physical work, now consumed in sedentary lifestyles.",
    },
  },
  {
    keywords: ["hokkien mee"],
    profile: {
      ethnic: ["chinese"],
      occasions: ["lunch", "dinner", "late-night"],
      generations: ["seniors", "middle-aged"],
      regions: ["singapore", "penang", "kl"],
      dietary: [],
      story: "Three completely different dishes share this name — a testament to how regional Chinese dialects shaped distinct culinary traditions across the Straits.",
      regionalVariants: "Singapore: pale yellow noodles braised in rich prawn-pork stock · KL: dark, glossy noodles fried with thick soy sauce and pork lard · Penang: spicy prawn soup noodles",
      heritageNote: "The most striking example of regional divergence in SG/MY cuisine. Ordering 'Hokkien Mee' means something entirely different depending on which city you are in.",
    },
  },
  {
    keywords: ["roti canai", "roti prata"],
    profile: {
      ethnic: ["indian", "mamak"],
      occasions: ["breakfast", "late-night"],
      generations: ["all"],
      regions: ["singapore", "malaysia"],
      dietary: ["halal"],
      story: "A flaky, layered flatbread pan-fried to golden perfection, served with dhal or mutton curry. The Mamak stall's most beloved dish.",
      regionalVariants: "Malaysia: Roti Canai · Singapore: Roti Prata · Both: served with dhal, curry, or for children, with sugar or condensed milk",
      heritageNote: "The quintessential Mamak food — the 24-hour social hub of both nations. Children eat it sweet; adults eat it with curry; seniors appreciate its simplicity.",
    },
  },
  {
    keywords: ["milo"],
    profile: {
      ethnic: ["mamak", "chinese", "malay"],
      occasions: ["breakfast", "beverage", "school-canteen"],
      generations: ["children", "youth"],
      regions: ["singapore", "malaysia"],
      dietary: ["halal"],
      story: "A chocolate malt beverage first invented in Australia in 1934, Milo became embedded in the collective childhood memory of all ethnicities through school Milo Vans since the 1950s.",
      heritageNote: "The 'Milo Dinosaur' (iced Milo with extra Milo powder on top) became a cultural icon when Olympic swimmer Joseph Schooling publicly craved it after his gold medal win.",
    },
  },
  {
    keywords: ["ondeh ondeh", "onde onde"],
    profile: {
      ethnic: ["malay", "peranakan"],
      occasions: ["snack"],
      generations: ["seniors", "middle-aged"],
      regions: ["singapore", "malaysia", "malacca"],
      dietary: ["halal", "vegetarian"],
      story: "Glutinous rice balls filled with gula melaka (palm sugar), rolled in desiccated coconut. The burst of molten palm sugar inside is a moment of pure joy.",
      heritageNote: "A traditional Malay-Peranakan kuih that represents the shared culinary heritage of the Straits. The pandan-green colour comes from pandan leaf juice.",
    },
  },
  {
    keywords: ["kuih", "kueh"],
    profile: {
      ethnic: ["malay", "peranakan", "chinese"],
      occasions: ["snack", "festive"],
      generations: ["seniors", "middle-aged"],
      regions: ["singapore", "malaysia", "malacca"],
      dietary: ["halal", "vegetarian"],
      story: "Traditional bite-sized confections made from glutinous rice, coconut milk, pandan, and gula melaka — the edible art of the Straits Heritage.",
      heritageNote: "Kuih-making is a labor-intensive craft passed down through generations. The decline in traditional kuih-making among Youth represents a loss of intangible cultural heritage.",
    },
  },
  {
    keywords: ["satay"],
    profile: {
      ethnic: ["malay"],
      occasions: ["dinner", "snack", "festive"],
      generations: ["all"],
      regions: ["singapore", "malaysia"],
      dietary: ["halal"],
      story: "Skewered and grilled meat — chicken, beef, or mutton — served with a rich peanut sauce, compressed rice (ketupat), and raw onion and cucumber.",
      heritageNote: "A hawker centre staple that transcends ethnic boundaries. The communal act of sharing satay around a charcoal grill is a quintessential SG/MY social ritual.",
    },
  },
  {
    keywords: ["cendol"],
    profile: {
      ethnic: ["malay", "peranakan"],
      occasions: ["snack", "beverage"],
      generations: ["all"],
      regions: ["singapore", "penang", "malacca", "malaysia"],
      dietary: ["halal", "vegetarian"],
      story: "Shaved ice dessert with pandan-flavoured jelly noodles, coconut milk, and gula melaka syrup — the ultimate tropical refreshment.",
      heritageNote: "Penang Cendol is legendary — the gula melaka quality and the creaminess of the coconut milk are the marks of a great bowl. A UNESCO-worthy street food.",
    },
  },
  {
    keywords: ["wonton mee", "wantan mee"],
    profile: {
      ethnic: ["chinese"],
      occasions: ["breakfast", "lunch"],
      generations: ["all"],
      regions: ["singapore", "kl", "penang"],
      dietary: [],
      story: "Springy egg noodles served with char siu (BBQ pork), wontons, and a choice of sauce — a Cantonese comfort food that has evolved differently across the Straits.",
      regionalVariants: "Singapore: pale noodles dressed in lard and dark soy (Hakka-style) · KL: dark soy, roasted char siu · Penang: tangy soy-based · Children: tossed in tomato sauce",
    },
  },
  {
    keywords: ["curry puff", "karipap"],
    profile: {
      ethnic: ["malay", "chinese", "indian"],
      occasions: ["snack", "breakfast"],
      generations: ["middle-aged", "seniors"],
      regions: ["singapore", "malaysia"],
      dietary: ["halal"],
      story: "A flaky pastry filled with curried potato, chicken, or sardine — a beloved hawker snack that bridges Malay, Chinese, and Indian culinary traditions.",
      heritageNote: "The curry puff is a perfect example of Straits fusion — a European pastry format filled with Asian curry. Old Chang Kee in Singapore has elevated it to an institution.",
    },
  },
  {
    keywords: ["dim sum"],
    profile: {
      ethnic: ["chinese"],
      occasions: ["breakfast", "lunch"],
      generations: ["seniors", "middle-aged"],
      regions: ["singapore", "kl", "malaysia"],
      dietary: [],
      story: "Cantonese tradition of small steamed and fried dishes — har gow, siu mai, char siu bao — shared communally over tea. 'Yum Cha' means 'to drink tea'.",
      heritageNote: "Dim Sum remains a traditional weekend morning ritual for Chinese families, emphasizing communal sharing. The phrase 'dim sum' means 'to touch the heart'.",
    },
  },
  {
    keywords: ["banana leaf rice"],
    profile: {
      ethnic: ["indian"],
      occasions: ["lunch", "dinner"],
      generations: ["seniors", "middle-aged"],
      regions: ["singapore", "malaysia"],
      dietary: ["halal", "vegetarian"],
      story: "Steamed rice served on a large banana leaf, surrounded by an array of vegetable curries, pickles, papadom, and rasam — traditionally eaten with the right hand.",
      heritageNote: "A sacred culinary tradition for the Senior Tamil generation. The banana leaf is not just a plate — it imparts a subtle flavour and the act of eating with fingers creates a sensory connection to food.",
    },
  },
  {
    keywords: ["congee", "porridge", "bubur"],
    profile: {
      ethnic: ["chinese", "malay"],
      occasions: ["breakfast"],
      generations: ["seniors", "children"],
      regions: ["singapore", "malaysia"],
      dietary: ["soft-foods"],
      story: "Rice slowly cooked to a silky porridge — the ultimate comfort food for the very young and the very old. Teochew-style is grainy; Cantonese-style is silky smooth.",
      heritageNote: "Increasingly popular among Seniors following the 'Medicine as Food' trend — soft textures, easy digestion, and the ability to add medicinal herbs make congee the ideal health food.",
    },
  },
  {
    keywords: ["ayam buah keluak"],
    profile: {
      ethnic: ["peranakan"],
      occasions: ["lunch", "dinner", "festive"],
      generations: ["seniors", "middle-aged"],
      regions: ["singapore", "malacca"],
      dietary: ["halal"],
      story: "The crown jewel of Peranakan cuisine — chicken braised with the black, fermented nut of the Pangium edule tree, producing an intensely earthy, complex flavour unlike anything else.",
      heritageNote: "The buah keluak nut must be soaked for days to remove toxins before use. This labor-intensive preparation is the ultimate test of Nyonya culinary mastery.",
    },
  },
  {
    keywords: ["curry debal", "devil curry"],
    profile: {
      ethnic: ["eurasian"],
      occasions: ["festive"],
      generations: ["seniors", "middle-aged"],
      regions: ["singapore", "malacca"],
      dietary: [],
      story: "The Eurasian community's most famous dish — a fiery curry made from Christmas 'debal' (leftovers), flavoured with vinegar, mustard seeds, and galangal.",
      heritageNote: "Originated as a Boxing Day dish using Christmas dinner leftovers. The vinegar preserves the meat and adds a distinctive tang. A dish that literally celebrates resourcefulness.",
    },
  },
];

// ── Cultural Search Presets ──────────────────────────────────
// Pre-built search queries for the cultural explorer UI

export interface CulturalSearchPreset {
  id: string;
  label: string;
  query: string;
  description: string;
  icon: string;
  category: "ethnic" | "occasion" | "generation" | "region" | "dietary" | "trending";
}

export const CULTURAL_SEARCH_PRESETS: CulturalSearchPreset[] = [
  // Ethnic
  { id: "malay-classics",    label: "Malay Classics",       query: "malay traditional",       description: "Nasi Lemak, Rendang, Satay, Kuih",           icon: "🌿", category: "ethnic" },
  { id: "chinese-hawker",    label: "Chinese Hawker",        query: "chinese hawker",          description: "Char Kway Teow, Chicken Rice, Wonton Mee",   icon: "🥢", category: "ethnic" },
  { id: "indian-mamak",      label: "Indian & Mamak",        query: "indian mamak",            description: "Roti Canai, Banana Leaf Rice, Teh Tarik",    icon: "🫓", category: "ethnic" },
  { id: "nyonya-peranakan",  label: "Nyonya Peranakan",      query: "peranakan nyonya",        description: "Laksa, Ayam Buah Keluak, Ondeh-Ondeh",       icon: "🌺", category: "ethnic" },

  // Occasion
  { id: "kopitiam-breakfast", label: "Kopitiam Breakfast",   query: "breakfast kopitiam",      description: "Kaya Toast, Soft Eggs, Kopi, Congee",        icon: "🌅", category: "occasion" },
  { id: "hawker-lunch",       label: "Hawker Lunch",         query: "hawker lunch",            description: "Economy Rice, Laksa, Chicken Rice",          icon: "🍱", category: "occasion" },
  { id: "mamak-late-night",   label: "Mamak Late Night",     query: "late night mamak",        description: "Roti Canai, Maggi Goreng, Teh Tarik",        icon: "🌃", category: "occasion" },
  { id: "festive-dishes",     label: "Festive Dishes",       query: "festive special occasion", description: "Rendang, Curry Debal, Kuih Lapis",          icon: "🎊", category: "occasion" },

  // Generation
  { id: "seniors-health",     label: "Seniors: Healthier",   query: "low sodium soft foods seniors", description: "Low salt, soft textures, 'Medicine as Food'", icon: "🧓", category: "generation" },
  { id: "gen-z-modsin",       label: "Gen Z: Mod-Sin",       query: "fusion modern trendy",    description: "Nasi Lemak Burger, Matcha Kuih, Viral Foods", icon: "✨", category: "generation" },
  { id: "kids-friendly",      label: "Kids Friendly",        query: "mild child friendly",     description: "Fishball Soup, Mild Congee, Milo",           icon: "👶", category: "generation" },

  // Region
  { id: "penang-heritage",    label: "Penang Heritage",      query: "penang",                  description: "Asam Laksa, Char Koay Teow, Cendol",         icon: "🏖️", category: "region" },
  { id: "sg-national",        label: "Singapore Icons",      query: "singapore national",      description: "Chicken Rice, Chili Crab, Kaya Toast",       icon: "🦁", category: "region" },

  // Dietary
  { id: "halal-protein",      label: "Halal High Protein",   query: "halal high protein",      description: "Chicken, Fish, Legume-based dishes",         icon: "💪", category: "dietary" },
  { id: "plant-based",        label: "Plant-Based",          query: "vegetarian plant based",  description: "Vegetable curries, tofu, tempeh dishes",     icon: "🌱", category: "dietary" },
  { id: "healthier-sg",       label: "Healthier SG",         query: "low sodium low sugar wholegrain", description: "HPB Nutri-Grade compliant choices",  icon: "💚", category: "dietary" },

  // Trending 2026
  { id: "artisanal-kopi",     label: "Artisanal Kopi",       query: "coffee kopi beverage",    description: "Heritage kopi reinvented for modern palates", icon: "☕", category: "trending" },
  { id: "functional-drinks",  label: "Functional Drinks",    query: "turmeric ginger probiotic", description: "Bio-hacking beverages for longevity",      icon: "🌿", category: "trending" },
];

// ── GI Classification ────────────────────────────────────────

export type GILevel = "low" | "medium" | "high" | "unknown";

export interface GIData {
  level: GILevel;
  value?: number;
  label: string;
  color: string;
  bgColor: string;
}

// Approximate GI values for common SG/MY foods (per research literature)
const GI_LOOKUP: Record<string, { level: GILevel; value: number }> = {
  // High GI (>70)
  "white rice": { level: "high", value: 72 },
  "jasmine rice": { level: "high", value: 89 },
  "white bread": { level: "high", value: 75 },
  "rice noodles": { level: "high", value: 61 },
  "bee hoon": { level: "high", value: 61 },
  "milo": { level: "high", value: 55 },
  "glucose": { level: "high", value: 100 },
  "watermelon": { level: "high", value: 76 },
  "pineapple": { level: "high", value: 66 },
  "lychee": { level: "high", value: 79 },
  "rambutan": { level: "high", value: 65 },
  "longan": { level: "high", value: 79 },
  "sugar": { level: "high", value: 65 },
  "condensed milk": { level: "high", value: 61 },
  "sports drink": { level: "high", value: 78 },
  "isotonic": { level: "high", value: 78 },
  "soft drink": { level: "high", value: 63 },
  "carbonated": { level: "high", value: 63 },
  "potato": { level: "high", value: 78 },
  "tapioca": { level: "high", value: 70 },
  "glutinous rice": { level: "high", value: 98 },
  "prawn crackers": { level: "high", value: 74 },
  "crackers": { level: "high", value: 74 },
  "wafer": { level: "high", value: 76 },
  "corn flakes": { level: "high", value: 81 },
  "instant noodles": { level: "high", value: 67 },

  // Medium GI (56–70)
  "basmati rice": { level: "medium", value: 58 },
  "brown rice": { level: "medium", value: 55 },
  "oats": { level: "medium", value: 55 },
  "mango": { level: "medium", value: 60 },
  "papaya": { level: "medium", value: 59 },
  "banana": { level: "medium", value: 62 },
  "sweet potato": { level: "medium", value: 63 },
  "yam": { level: "medium", value: 53 },
  "taro": { level: "medium", value: 56 },
  "durian": { level: "medium", value: 49 },
  "jackfruit": { level: "medium", value: 50 },
  "ice cream": { level: "medium", value: 57 },
  "sponge cake": { level: "medium", value: 66 },
  "roti": { level: "medium", value: 62 },
  "prata": { level: "medium", value: 62 },
  "canai": { level: "medium", value: 62 },
  "noodles": { level: "medium", value: 56 },
  "pasta": { level: "medium", value: 55 },
  "bread": { level: "medium", value: 69 },
  "biscuit": { level: "medium", value: 62 },
  "cookie": { level: "medium", value: 62 },

  // Low GI (<56)
  "apple": { level: "low", value: 36 },
  "orange": { level: "low", value: 43 },
  "guava": { level: "low", value: 31 },
  "starfruit": { level: "low", value: 25 },
  "pomelo": { level: "low", value: 30 },
  "dragon fruit": { level: "low", value: 48 },
  "avocado": { level: "low", value: 15 },
  "milk": { level: "low", value: 31 },
  "yogurt": { level: "low", value: 36 },
  "soy milk": { level: "low", value: 34 },
  "tofu": { level: "low", value: 15 },
  "tempeh": { level: "low", value: 15 },
  "lentils": { level: "low", value: 32 },
  "chickpeas": { level: "low", value: 33 },
  "kidney beans": { level: "low", value: 29 },
  "peanuts": { level: "low", value: 14 },
  "cashews": { level: "low", value: 22 },
  "almonds": { level: "low", value: 15 },
  "eggs": { level: "low", value: 0 },
  "chicken": { level: "low", value: 0 },
  "fish": { level: "low", value: 0 },
  "prawns": { level: "low", value: 0 },
  "beef": { level: "low", value: 0 },
  "pork": { level: "low", value: 0 },
  "spinach": { level: "low", value: 15 },
  "kangkung": { level: "low", value: 15 },
  "broccoli": { level: "low", value: 15 },
  "cabbage": { level: "low", value: 10 },
  "cucumber": { level: "low", value: 15 },
  "tomato": { level: "low", value: 15 },
  "mushroom": { level: "low", value: 10 },
  "water": { level: "low", value: 0 },
  "tea": { level: "low", value: 0 },
  "coffee": { level: "low", value: 0 },
};

export function getGIData(foodName: string, foodGroup?: string): GIData {
  const name = foodName.toLowerCase();
  const group = (foodGroup ?? "").toLowerCase();

  // Check GI lookup by keyword match
  for (const [keyword, data] of Object.entries(GI_LOOKUP)) {
    if (name.includes(keyword) || group.includes(keyword)) {
      return {
        ...data,
        label: data.level === "low" ? `Low GI (${data.value})` : data.level === "medium" ? `Med GI (${data.value})` : `High GI (${data.value})`,
        color: data.level === "low" ? "#166534" : data.level === "medium" ? "#92400e" : "#991b1b",
        bgColor: data.level === "low" ? "#dcfce7" : data.level === "medium" ? "#fef3c7" : "#fee2e2",
      };
    }
  }

  // No heuristic fallback — only show GI when we have a confirmed value from literature.
  // Displaying a guessed GI level without a measured value is misleading and potentially harmful.
  return { level: "unknown", label: "GI N/A", color: "#6b7280", bgColor: "#f3f4f6" };
}

// ── Cultural Profile Lookup ──────────────────────────────────

export function getCulturalProfile(foodName: string, foodGroup?: string): CulturalProfile | null {
  const name = foodName.toLowerCase();
  for (const entry of CULTURAL_KNOWLEDGE) {
    if (entry.keywords.some(kw => name.includes(kw))) {
      return entry.profile;
    }
  }
  // Fallback: derive from food group
  if (foodGroup) {
    const g = foodGroup.toLowerCase();
    if (g.includes("malay")) return { ethnic: ["malay"], dietary: ["halal"] };
    if (g.includes("indian")) return { ethnic: ["indian"], dietary: ["halal"] };
    if (g.includes("chinese")) return { ethnic: ["chinese"] };
    if (g.includes("peranakan")) return { ethnic: ["peranakan"] };
  }
  return null;
}

// ── Cultural Search Query Parser ─────────────────────────────
// Detects cultural dimensions in a search query

export interface CulturalQueryIntent {
  ethnicFilters: EthnicTradition[];
  occasionFilters: MealOccasion[];
  generationFilters: Generation[];
  regionFilters: Region[];
  dietaryFilters: DietaryTag[];
  remainingKeywords: string;
}

const ETHNIC_KEYWORDS: Record<string, EthnicTradition> = {
  malay: "malay", melayu: "malay",
  chinese: "chinese", hokkien: "chinese", cantonese: "chinese", teochew: "chinese", hainanese: "chinese",
  indian: "indian", tamil: "indian",
  mamak: "mamak",
  peranakan: "peranakan", nyonya: "peranakan", nonya: "peranakan",
  eurasian: "eurasian",
  straits: "straits",
};

const OCCASION_KEYWORDS: Record<string, MealOccasion> = {
  breakfast: "breakfast", sarapan: "breakfast", kopitiam: "breakfast",
  lunch: "lunch", "working lunch": "lunch",
  dinner: "dinner", supper: "dinner",
  snack: "snack", kuih: "snack", kueh: "snack",
  beverage: "beverage", drink: "beverage", drinks: "beverage",
  "late night": "late-night", mamak: "late-night",
  festive: "festive", "hari raya": "festive", "chinese new year": "festive", deepavali: "festive",
  school: "school-canteen", canteen: "school-canteen", bento: "school-canteen",
};

const GENERATION_KEYWORDS: Record<string, Generation> = {
  senior: "seniors", seniors: "seniors", elderly: "seniors", "50+": "seniors",
  "middle-aged": "middle-aged", "working adult": "middle-aged",
  "gen z": "youth", youth: "youth", young: "youth", trendy: "youth", viral: "youth",
  child: "children", children: "children", kids: "children", "child-friendly": "children",
};

const REGION_KEYWORDS: Record<string, Region> = {
  singapore: "singapore", sg: "singapore",
  penang: "penang",
  kl: "kl", "kuala lumpur": "kl",
  malacca: "malacca", melaka: "malacca",
  johor: "johor",
  malaysia: "malaysia", my: "malaysia",
};

export function parseCulturalQuery(query: string): CulturalQueryIntent {
  const q = query.toLowerCase();
  const ethnicFilters: EthnicTradition[] = [];
  const occasionFilters: MealOccasion[] = [];
  const generationFilters: Generation[] = [];
  const regionFilters: Region[] = [];
  const dietaryFilters: DietaryTag[] = [];
  let remaining = q;

  // Extract ethnic
  for (const [kw, val] of Object.entries(ETHNIC_KEYWORDS)) {
    if (q.includes(kw) && !ethnicFilters.includes(val)) {
      ethnicFilters.push(val);
      remaining = remaining.replace(kw, "");
    }
  }

  // Extract occasion
  for (const [kw, val] of Object.entries(OCCASION_KEYWORDS)) {
    if (q.includes(kw) && !occasionFilters.includes(val)) {
      occasionFilters.push(val);
      remaining = remaining.replace(kw, "");
    }
  }

  // Extract generation
  for (const [kw, val] of Object.entries(GENERATION_KEYWORDS)) {
    if (q.includes(kw) && !generationFilters.includes(val)) {
      generationFilters.push(val);
      remaining = remaining.replace(kw, "");
    }
  }

  // Extract region
  for (const [kw, val] of Object.entries(REGION_KEYWORDS)) {
    if (q.includes(kw) && !regionFilters.includes(val)) {
      regionFilters.push(val);
      remaining = remaining.replace(kw, "");
    }
  }

  // Extract dietary
  const dietaryMap: Record<string, DietaryTag> = {
    halal: "halal", vegetarian: "vegetarian", vegan: "plant-based",
    "plant-based": "plant-based", "plant based": "plant-based",
    "low sodium": "low-sodium", "low salt": "low-sodium",
    "low sugar": "low-sugar", "sugar free": "low-sugar",
    "high protein": "high-protein",
    "soft food": "soft-foods", "soft texture": "soft-foods",
    wholegrain: "wholegrain", "whole grain": "wholegrain",
    "nutri-grade": "nutri-grade", "nutri grade": "nutri-grade",
    "high fibre": "high-fibre", "high fiber": "high-fibre",
    "low calorie": "low-calorie", "low cal": "low-calorie",
    keto: "keto",
  };
  for (const [kw, val] of Object.entries(dietaryMap)) {
    if (q.includes(kw) && !dietaryFilters.includes(val)) {
      dietaryFilters.push(val);
      remaining = remaining.replace(kw, "");
    }
  }

  return {
    ethnicFilters,
    occasionFilters,
    generationFilters,
    regionFilters,
    dietaryFilters,
    remainingKeywords: remaining.replace(/\s+/g, " ").trim(),
  };
}
