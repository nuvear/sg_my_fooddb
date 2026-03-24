// Restaurant Data — The Transnational Plate
// 20+ iconic Singapore & Malaysia hawker stalls and restaurants
// with signature dishes linked to nutritional database search terms

export interface SignatureDish {
  name: string;
  description: string;
  searchTerm: string; // term to search in food DB
  iconUrl: string;
  approxCalories?: number;
  tags: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  type: 'hawker_stall' | 'kopitiam' | 'restaurant' | 'food_court';
  location: string;
  country: 'SG' | 'MY' | 'SG/MY';
  region: string;
  ethnic: string[];
  accolades?: string[];
  description: string;
  culturalNote: string;
  signatureDishes: SignatureDish[];
  operatingSince?: string;
  address?: string;
  dietaryOptions?: string[];
}

// ── Dish icon CDN URLs ──────────────────────────────────────────────────────
const ICONS = {
  nasiLemak: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-nasi-lemak-igqE9jrWvzvXm9tmzmFM93.webp',
  laksa: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-laksa-ZPqe8d6QE2m2CZHufBGWfD.webp',
  chickenRice: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-chicken-rice-jEx7hpSN4sNyLgknYYjZ5V.webp',
  charKwayTeow: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-char-kway-teow-5oTB4N8hDzaCuSPnwLfDWw.webp',
  rotiCanai: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-roti-canai-BTzPMEPRrJJtmWAc4PtSQ2.webp',
  bakKutTeh: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-bak-kut-teh-h5FoWgTKBNCvuMKiJhBt7u.webp',
  satay: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-satay-iopEU6XEM7q4B7UrLnzwyn.webp',
  hokkienMee: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-hokkien-mee-Rv4meGda3VLiFjSWUrBVoz.webp',
  chilliCrab: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-chilli-crab-emPuNdGYvUkdZ2eoGrzoNb.webp',
  wontonMee: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-wonton-mee-DhHNX4oq2YV9VLVufdarLc.webp',
  meeRebus: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-mee-rebus-o43hBQbGFq2AxQRXHR33c7.webp',
  popiah: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-popiah-9KUzTBxwXZWMjixyKFPpBy.webp',
  kayaToast: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-kaya-toast-nMKXQQ6B49NBdfSU9vKUXv.webp',
  nasiPadang: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-nasi-padang-DH3hvhWmsuXAvyNECGxgHw.webp',
  prawnMee: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663374102189/gFdMLjqiUpDnmt4U3dovdX/dish-prawn-mee-7udqhfjhBJW2YGDsdodw7N.webp',
};

// ── Restaurant Database ─────────────────────────────────────────────────────
export const RESTAURANTS: Restaurant[] = [
  // ── SINGAPORE MICHELIN HAWKERS ──────────────────────────────────────────
  {
    id: 'tian-tian-chicken-rice',
    name: 'Tian Tian Hainanese Chicken Rice',
    type: 'hawker_stall',
    location: 'Maxwell Food Centre, Tanjong Pagar',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Hainanese'],
    accolades: ['Michelin Bib Gourmand 2016–2024', 'Street Food Legend'],
    description: 'The most famous chicken rice stall in Singapore, drawing queues since 1987. Anthony Bourdain called it "the best chicken rice in the world."',
    culturalNote: 'Hainanese chicken rice is Singapore\'s de facto national dish — a legacy of Hainanese immigrants who adapted their home cooking to local tastes. The poached chicken technique preserves maximum juiciness while the rice is cooked in chicken broth with pandan and garlic.',
    operatingSince: '1987',
    address: '1 Kadayanallur St, #01-10/11 Maxwell Food Centre, Singapore 069184',
    signatureDishes: [
      {
        name: 'Poached Chicken Rice',
        description: 'Silky poached chicken on fragrant rice with ginger-scallion sauce, chilli sauce, and dark soy',
        searchTerm: 'chicken rice',
        iconUrl: ICONS.chickenRice,
        approxCalories: 607,
        tags: ['Hainanese', 'Lunch', 'Dinner', 'Low-GI option'],
      },
      {
        name: 'Roasted Chicken Rice',
        description: 'Golden roasted chicken variant with crispy skin, served with the same aromatic rice',
        searchTerm: 'roasted chicken rice',
        iconUrl: ICONS.chickenRice,
        approxCalories: 650,
        tags: ['Hainanese', 'Roasted'],
      },
    ],
  },
  {
    id: 'hill-street-tai-hwa',
    name: 'Hill Street Tai Hwa Pork Noodle',
    type: 'hawker_stall',
    location: 'Crawford Lane',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Teochew'],
    accolades: ['Michelin 1 Star 2016–2024', 'Oldest Michelin-starred hawker'],
    description: 'Singapore\'s most celebrated bak chor mee stall, operating since 1932. The only hawker stall in Southeast Asia to hold a Michelin star for 8+ consecutive years.',
    culturalNote: 'Bak chor mee (minced pork noodles) is a quintessential Teochew hawker dish. The Tai Hwa version is distinguished by its vinegar-lard-chilli sauce and the use of al dente noodles that must be eaten immediately.',
    operatingSince: '1932',
    address: '466 Crawford Lane, #01-12, Singapore 190466',
    signatureDishes: [
      {
        name: 'Bak Chor Mee (Dry)',
        description: 'Springy noodles tossed in vinegar-lard-chilli sauce with minced pork, liver, meatballs, and braised mushrooms',
        searchTerm: 'bak chor mee',
        iconUrl: ICONS.wontonMee,
        approxCalories: 520,
        tags: ['Teochew', 'Noodles', 'Pork'],
      },
    ],
  },
  {
    id: '328-katong-laksa',
    name: '328 Katong Laksa',
    type: 'hawker_stall',
    location: 'East Coast Road, Katong',
    country: 'SG',
    region: 'East Singapore',
    ethnic: ['Peranakan', 'Nonya'],
    accolades: ['Michelin Bib Gourmand', 'Best Laksa in Singapore'],
    description: 'The definitive Katong laksa experience — a Peranakan-style coconut laksa where the noodles are cut short so you can eat entirely with a spoon.',
    culturalNote: 'Katong laksa is a Peranakan (Straits Chinese) creation that blends Chinese noodle soup traditions with Malay spice pastes and coconut milk. The short-cut noodle style is unique to this neighbourhood and reflects the Peranakan philosophy of making food accessible.',
    operatingSince: '1990s',
    address: '51 East Coast Rd, Singapore 428770',
    signatureDishes: [
      {
        name: 'Katong Laksa',
        description: 'Rich coconut curry broth with cut rice vermicelli, prawns, cockles, fish cake, and sambal',
        searchTerm: 'laksa',
        iconUrl: ICONS.laksa,
        approxCalories: 589,
        tags: ['Peranakan', 'Nonya', 'Seafood', 'Coconut'],
      },
    ],
  },
  {
    id: 'liao-fan-hong-kong-soya-sauce-chicken',
    name: 'Liao Fan Hong Kong Soya Sauce Chicken',
    type: 'hawker_stall',
    location: 'Chinatown Complex Food Centre',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Cantonese'],
    accolades: ['Michelin 1 Star 2016–2017', 'World\'s cheapest Michelin-starred meal'],
    description: 'Chan Hon Meng\'s stall made global headlines in 2016 as the world\'s most affordable Michelin-starred meal at S$2 per plate.',
    culturalNote: 'Soy sauce chicken (豉油鸡) is a Cantonese technique of braising chicken in a master stock of soy sauce, sugar, and spices. The master stock is never discarded — it is replenished and reused for decades, deepening in flavour with each batch.',
    operatingSince: '2009',
    address: '335 Smith St, #02-126 Chinatown Complex Food Centre, Singapore 050335',
    signatureDishes: [
      {
        name: 'Soya Sauce Chicken Rice',
        description: 'Braised chicken in master soy stock served over fragrant rice with dark soy drizzle',
        searchTerm: 'soy sauce chicken',
        iconUrl: ICONS.chickenRice,
        approxCalories: 580,
        tags: ['Cantonese', 'Braised', 'Chicken'],
      },
      {
        name: 'Char Siu (BBQ Pork)',
        description: 'Caramelised barbecue pork with honey glaze, served sliced over rice',
        searchTerm: 'char siu',
        iconUrl: ICONS.wontonMee,
        approxCalories: 490,
        tags: ['Cantonese', 'BBQ', 'Pork'],
      },
    ],
  },

  // ── SINGAPORE HAWKER ICONS ──────────────────────────────────────────────
  {
    id: 'outram-park-fried-kway-teow',
    name: 'Outram Park Fried Kway Teow Mee',
    type: 'hawker_stall',
    location: 'Hong Lim Market & Food Centre',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Hokkien'],
    accolades: ['Michelin Bib Gourmand', 'Heritage Stall'],
    description: 'One of Singapore\'s most celebrated char kway teow stalls, known for its wok hei (breath of the wok) and generous use of lard.',
    culturalNote: 'Char kway teow was historically a poor man\'s dish — Hokkien fishermen and labourers needed cheap, high-calorie food. The use of lard, cockles, and dark soy sauce is non-negotiable for authenticity. Modern health-conscious versions that omit lard are considered inauthentic by purists.',
    operatingSince: '1966',
    address: '531A Upper Cross St, #02-17, Singapore 051531',
    signatureDishes: [
      {
        name: 'Char Kway Teow',
        description: 'Stir-fried flat rice noodles with prawns, cockles, Chinese sausage, bean sprouts, and egg in dark soy sauce',
        searchTerm: 'char kway teow',
        iconUrl: ICONS.charKwayTeow,
        approxCalories: 744,
        tags: ['Hokkien', 'Wok-fried', 'Noodles', 'High-calorie'],
      },
    ],
  },
  {
    id: 'nam-sing-hokkien-mee',
    name: 'Nam Sing Hokkien Mee',
    type: 'hawker_stall',
    location: 'Old Airport Road Food Centre',
    country: 'SG',
    region: 'East Singapore',
    ethnic: ['Chinese', 'Hokkien'],
    accolades: ['Michelin Bib Gourmand', 'Heritage Stall since 1963'],
    description: 'A third-generation family stall serving the original wet-style Hokkien mee with rich prawn broth since 1963.',
    culturalNote: 'Singapore Hokkien mee differs from Malaysian versions — the Singapore style uses a wet, soupy prawn broth that is absorbed into the noodles during cooking. The prawn shells are toasted and simmered for hours to create the intensely flavourful stock.',
    operatingSince: '1963',
    address: '51 Old Airport Rd, #01-32, Singapore 390051',
    signatureDishes: [
      {
        name: 'Hokkien Prawn Mee',
        description: 'Yellow noodles and rice vermicelli braised in prawn-pork broth with prawns, squid, and pork belly',
        searchTerm: 'hokkien mee',
        iconUrl: ICONS.hokkienMee,
        approxCalories: 612,
        tags: ['Hokkien', 'Seafood', 'Noodles'],
      },
    ],
  },
  {
    id: 'satay-by-the-bay',
    name: 'Satay by the Bay',
    type: 'hawker_stall',
    location: 'Gardens by the Bay',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Malay', 'Chinese'],
    description: 'The most scenic satay destination in Singapore, with views of Marina Bay Sands and the Supertrees.',
    culturalNote: 'Satay is a dish that crosses ethnic boundaries in Singapore and Malaysia — Malay, Chinese, and Indian vendors all have their own marinades and techniques. The communal act of eating satay around a charcoal grill is a defining feature of Singapore\'s hawker culture.',
    address: '18 Marina Gardens Dr, Singapore 018953',
    signatureDishes: [
      {
        name: 'Chicken Satay',
        description: 'Marinated chicken skewers grilled over charcoal, served with peanut sauce, ketupat, and raw onion',
        searchTerm: 'chicken satay',
        iconUrl: ICONS.satay,
        approxCalories: 320,
        tags: ['Malay', 'Grilled', 'High-protein', 'Gluten-free'],
      },
      {
        name: 'Mutton Satay',
        description: 'Tender mutton skewers with a spiced marinade, a Malay speciality',
        searchTerm: 'mutton satay',
        iconUrl: ICONS.satay,
        approxCalories: 350,
        tags: ['Malay', 'Grilled', 'Halal'],
      },
    ],
  },
  {
    id: 'song-fa-bak-kut-teh',
    name: 'Song Fa Bak Kut Teh',
    type: 'restaurant',
    location: 'New Bridge Road, Chinatown',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Hokkien'],
    accolades: ['Michelin Bib Gourmand 2016–2024'],
    description: 'The most internationally recognised bak kut teh brand, serving the peppery Teochew-Hokkien style since 1969.',
    culturalNote: 'Bak kut teh (肉骨茶, "meat bone tea") originated among Chinese coolies in early 20th-century Singapore who needed a fortifying breakfast before hard labour. The Singaporean version uses white pepper and garlic for a clear, peppery broth, distinct from the darker, herb-heavy Malaysian version.',
    operatingSince: '1969',
    address: '11 New Bridge Rd, #01-01, Singapore 059383',
    signatureDishes: [
      {
        name: 'Pork Rib Bak Kut Teh',
        description: 'Tender pork ribs in a peppery garlic broth, served with rice, you tiao (dough fritters), and dark soy',
        searchTerm: 'bak kut teh',
        iconUrl: ICONS.bakKutTeh,
        approxCalories: 480,
        tags: ['Hokkien', 'Pork', 'Soup', 'Breakfast'],
      },
      {
        name: 'Braised Pig\'s Trotters',
        description: 'Slow-braised trotters in dark soy sauce and spices until fall-off-the-bone tender',
        searchTerm: 'braised pork trotter',
        iconUrl: ICONS.bakKutTeh,
        approxCalories: 520,
        tags: ['Braised', 'Pork', 'Collagen-rich'],
      },
    ],
  },
  {
    id: 'no-1-balestier-road-hoover-rojak',
    name: 'Balestier Road Hoover Rojak',
    type: 'hawker_stall',
    location: 'Whampoa Drive Makan Place',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Indian Muslim'],
    accolades: ['Michelin Bib Gourmand'],
    description: 'Legendary rojak stall known for its thick, fragrant prawn paste sauce and generous toppings.',
    culturalNote: 'Rojak (meaning "mixture" in Malay) is a salad that embodies Singapore\'s multicultural identity — it combines Chinese you tiao (dough fritters), Malay prawn paste, and Indian-influenced spices. The dish is often used as a metaphor for Singapore\'s diverse society.',
    signatureDishes: [
      {
        name: 'Singapore Rojak',
        description: 'Mixed salad of you tiao, tofu puffs, cucumber, pineapple, and turnip in a thick prawn paste sauce with peanuts',
        searchTerm: 'rojak',
        iconUrl: ICONS.popiah,
        approxCalories: 380,
        tags: ['Peranakan', 'Vegetarian-friendly', 'Snack'],
      },
    ],
  },
  {
    id: 'ah-kow-mushroom-minced-pork-mee',
    name: 'Ah Kow Mushroom Minced Pork Mee',
    type: 'hawker_stall',
    location: 'Hong Lim Market & Food Centre',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Teochew'],
    accolades: ['Michelin Bib Gourmand'],
    description: 'A heritage wonton mee stall serving the classic Cantonese-style noodles with char siu and wontons.',
    culturalNote: 'Wonton mee is a Cantonese import that became a hawker staple across Singapore and Malaysia. The springy egg noodles are made fresh daily, and the wontons are hand-folded — skills passed down through generations of hawker families.',
    signatureDishes: [
      {
        name: 'Wonton Mee (Dry)',
        description: 'Springy egg noodles tossed in dark soy with char siu, wontons, and choy sum',
        searchTerm: 'wonton mee',
        iconUrl: ICONS.wontonMee,
        approxCalories: 490,
        tags: ['Cantonese', 'Noodles', 'Pork'],
      },
    ],
  },

  // ── SINGAPORE KOPITIAM CULTURE ──────────────────────────────────────────
  {
    id: 'ya-kun-kaya-toast',
    name: 'Ya Kun Kaya Toast',
    type: 'kopitiam',
    location: 'Far East Square (flagship)',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Hainanese'],
    accolades: ['Heritage Brand', 'Operating since 1944'],
    description: 'The most iconic kaya toast chain in Singapore, founded by Loi Ah Koon in 1944 using his mother\'s kaya recipe.',
    culturalNote: 'The Singapore kopitiam breakfast set — kaya toast, soft-boiled eggs with dark soy and white pepper, and kopi (coffee) — is a daily ritual for many Singaporeans. Kaya (coconut-egg jam) was created by Hainanese immigrants who adapted their cooking skills to local ingredients.',
    operatingSince: '1944',
    address: '18 China St, #01-01 Far East Square, Singapore 049560',
    dietaryOptions: ['Vegetarian-friendly'],
    signatureDishes: [
      {
        name: 'Kaya Toast Set',
        description: 'Toasted bread with kaya and butter, two soft-boiled eggs with dark soy, and kopi or teh',
        searchTerm: 'kaya toast',
        iconUrl: ICONS.kayaToast,
        approxCalories: 380,
        tags: ['Hainanese', 'Breakfast', 'Kopitiam', 'Heritage'],
      },
      {
        name: 'Kopi (Singaporean Coffee)',
        description: 'Robusta coffee brewed through a cloth filter, served with sweetened condensed milk',
        searchTerm: 'kopi coffee',
        iconUrl: ICONS.kayaToast,
        approxCalories: 120,
        tags: ['Beverage', 'Kopitiam', 'Heritage'],
      },
    ],
  },
  {
    id: 'killiney-kopitiam',
    name: 'Killiney Kopitiam',
    type: 'kopitiam',
    location: 'Killiney Road (flagship)',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Hainanese'],
    accolades: ['Oldest Kopitiam in Singapore (est. 1919)'],
    description: 'Singapore\'s oldest surviving kopitiam, serving the same kaya toast and kopi recipe since 1919.',
    culturalNote: 'Killiney Road was once the heart of Singapore\'s Hainanese community. The kopitiam (coffee shop) was the social hub where workers gathered before dawn, creating a culture of communal breakfast that persists today.',
    operatingSince: '1919',
    address: '67 Killiney Rd, Singapore 239525',
    signatureDishes: [
      {
        name: 'Traditional Kaya Toast',
        description: 'Charcoal-toasted bread with house-made kaya and cold butter slabs',
        searchTerm: 'kaya toast',
        iconUrl: ICONS.kayaToast,
        approxCalories: 360,
        tags: ['Hainanese', 'Breakfast', 'Heritage', 'Oldest'],
      },
    ],
  },

  // ── SINGAPORE SEAFOOD ───────────────────────────────────────────────────
  {
    id: 'jumbo-seafood',
    name: 'Jumbo Seafood',
    type: 'restaurant',
    location: 'East Coast Seafood Centre',
    country: 'SG',
    region: 'East Singapore',
    ethnic: ['Chinese', 'Singaporean'],
    accolades: ['Best Chilli Crab in Singapore (multiple awards)'],
    description: 'The restaurant that put Singapore chilli crab on the world map, serving the definitive version of this national dish since 1987.',
    culturalNote: 'Chilli crab was invented in 1956 by Cher Yam Tian, who stir-fried crabs with bottled chilli sauce. Her husband Lim Choon Ngee later added tomato sauce to create the iconic sweet-savoury-spicy gravy. The dish became Singapore\'s unofficial national dish and was named one of the world\'s 50 most delicious foods by CNN.',
    operatingSince: '1987',
    address: '1206 East Coast Parkway, #01-07/08, Singapore 449883',
    signatureDishes: [
      {
        name: 'Chilli Crab',
        description: 'Whole mud crab in a rich tomato-chilli gravy, served with fried mantou buns for dipping',
        searchTerm: 'chilli crab',
        iconUrl: ICONS.chilliCrab,
        approxCalories: 650,
        tags: ['Singaporean', 'Seafood', 'Crab', 'National Dish'],
      },
      {
        name: 'Black Pepper Crab',
        description: 'Wok-fried crab with dry black pepper, butter, and dark soy sauce',
        searchTerm: 'black pepper crab',
        iconUrl: ICONS.chilliCrab,
        approxCalories: 580,
        tags: ['Singaporean', 'Seafood', 'Crab', 'Spicy'],
      },
    ],
  },

  // ── MALAYSIA HAWKER ICONS ───────────────────────────────────────────────
  {
    id: 'penang-road-famous-teochew-chendul',
    name: 'Penang Road Famous Teochew Cendol',
    type: 'hawker_stall',
    location: 'Penang Road, Georgetown',
    country: 'MY',
    region: 'Penang',
    ethnic: ['Peranakan', 'Chinese'],
    accolades: ['Penang Heritage Food', 'Operating since 1936'],
    description: 'The most famous cendol stall in Malaysia, serving the iconic Penang-style dessert since 1936 from a pushcart on Penang Road.',
    culturalNote: 'Cendol is a Southeast Asian dessert that predates the colonial era, with roots in Javanese and Malay food culture. The Penang version is distinguished by its use of Penang\'s famous gula melaka (palm sugar) and coconut milk from fresh-grated coconuts.',
    operatingSince: '1936',
    address: 'Jalan Penang, Georgetown, Penang, Malaysia',
    signatureDishes: [
      {
        name: 'Penang Cendol',
        description: 'Shaved ice with pandan-green rice flour jelly, coconut milk, red beans, and dark gula melaka syrup',
        searchTerm: 'cendol',
        iconUrl: ICONS.nasiLemak,
        approxCalories: 290,
        tags: ['Peranakan', 'Dessert', 'Vegetarian', 'Penang'],
      },
    ],
  },
  {
    id: 'nasi-kandar-line-clear',
    name: 'Nasi Kandar Line Clear',
    type: 'hawker_stall',
    location: 'Penang Road, Georgetown',
    country: 'MY',
    region: 'Penang',
    ethnic: ['Indian Muslim', 'Mamak'],
    accolades: ['Penang Heritage Food', 'Operating since 1930s'],
    description: 'The most legendary nasi kandar stall in Penang, famous for its mixed curry gravy poured over rice.',
    culturalNote: 'Nasi kandar originated with Tamil Muslim traders who carried rice and curries on a pole (kandar) balanced on their shoulders. The "banjir" (flood) style — where multiple curries are poured over the rice — is a Penang tradition that creates a complex, layered flavour profile.',
    operatingSince: '1930s',
    address: 'Jalan Penang, Georgetown, Penang, Malaysia',
    signatureDishes: [
      {
        name: 'Nasi Kandar (Banjir Style)',
        description: 'Steamed rice flooded with multiple curries including fish, chicken, and vegetable curries',
        searchTerm: 'nasi kandar',
        iconUrl: ICONS.nasiPadang,
        approxCalories: 720,
        tags: ['Indian Muslim', 'Mamak', 'Curry', 'Penang', 'Halal'],
      },
    ],
  },
  {
    id: 'air-itam-assam-laksa',
    name: 'Air Itam Assam Laksa',
    type: 'hawker_stall',
    location: 'Pasar Air Itam, Penang',
    country: 'MY',
    region: 'Penang',
    ethnic: ['Peranakan', 'Malay'],
    accolades: ['CNN World\'s 7th Best Food', 'Penang Heritage Food'],
    description: 'The definitive Penang assam laksa stall, serving the tangy tamarind fish noodle soup that CNN ranked among the world\'s best foods.',
    culturalNote: 'Penang assam laksa is fundamentally different from Singapore\'s coconut laksa — it uses a sour tamarind and mackerel broth with no coconut milk. The dish reflects Penang\'s Peranakan heritage, combining Malay spice techniques with Chinese noodle traditions.',
    signatureDishes: [
      {
        name: 'Penang Assam Laksa',
        description: 'Thick rice noodles in tangy tamarind-mackerel broth with pineapple, cucumber, mint, and prawn paste',
        searchTerm: 'assam laksa',
        iconUrl: ICONS.laksa,
        approxCalories: 420,
        tags: ['Peranakan', 'Malay', 'Seafood', 'Sour', 'Penang'],
      },
    ],
  },
  {
    id: 'malaysia-nasi-lemak',
    name: 'Nasi Lemak Antarabangsa',
    type: 'hawker_stall',
    location: 'Kampung Baru, Kuala Lumpur',
    country: 'MY',
    region: 'Kuala Lumpur',
    ethnic: ['Malay'],
    accolades: ['KL Heritage Food', 'Operating 24 hours'],
    description: 'The most famous nasi lemak stall in Kuala Lumpur, serving the Malaysian national dish around the clock in the heart of the Malay heritage village of Kampung Baru.',
    culturalNote: 'Nasi lemak (literally "fatty rice") is Malaysia\'s national dish — coconut milk-infused rice that is both a humble breakfast and a festive centrepiece. The dish is deeply tied to Malay identity and is served at everything from roadside stalls to state banquets.',
    address: 'Jalan Raja Muda Musa, Kampung Baru, Kuala Lumpur',
    signatureDishes: [
      {
        name: 'Nasi Lemak with Rendang',
        description: 'Coconut rice with beef rendang, sambal, fried anchovies, peanuts, cucumber, and hard-boiled egg',
        searchTerm: 'nasi lemak',
        iconUrl: ICONS.nasiLemak,
        approxCalories: 680,
        tags: ['Malay', 'National Dish', 'Breakfast', 'Halal'],
      },
    ],
  },
  {
    id: 'roti-canai-transfer-road',
    name: 'Roti Canai Transfer Road',
    type: 'kopitiam',
    location: 'Transfer Road, Georgetown, Penang',
    country: 'MY',
    region: 'Penang',
    ethnic: ['Indian Muslim', 'Mamak'],
    accolades: ['Penang Heritage Food', 'Best Roti Canai in Malaysia'],
    description: 'The most celebrated roti canai stall in Penang, where the dough is flipped and stretched to order by masters who have perfected the technique over decades.',
    culturalNote: 'Roti canai (from "roti Chennai") was brought to Malaysia by South Indian Muslim traders. The art of making roti canai — tossing and stretching the dough to create hundreds of flaky layers — is a performance as much as a cooking technique. Mamak stalls serving roti canai are open 24 hours and serve as Malaysia\'s informal community centres.',
    signatureDishes: [
      {
        name: 'Roti Canai with Dhal',
        description: 'Flaky layered flatbread served with yellow lentil dhal and fish curry for dipping',
        searchTerm: 'roti canai',
        iconUrl: ICONS.rotiCanai,
        approxCalories: 390,
        tags: ['Indian Muslim', 'Mamak', 'Breakfast', 'Vegetarian-friendly', 'Halal'],
      },
      {
        name: 'Roti Telur',
        description: 'Roti canai with egg folded inside, creating a richer, more filling version',
        searchTerm: 'roti telur',
        iconUrl: ICONS.rotiCanai,
        approxCalories: 450,
        tags: ['Indian Muslim', 'Mamak', 'Egg'],
      },
    ],
  },
  {
    id: 'ipoh-bean-sprout-chicken',
    name: 'Lou Wong Bean Sprout Chicken',
    type: 'restaurant',
    location: 'Ipoh Old Town',
    country: 'MY',
    region: 'Ipoh, Perak',
    ethnic: ['Chinese', 'Cantonese'],
    accolades: ['Ipoh Heritage Food', 'Operating since 1950s'],
    description: 'The restaurant that made Ipoh bean sprout chicken famous — a dish born from Ipoh\'s uniquely mineral-rich water that produces exceptionally crisp bean sprouts.',
    culturalNote: 'Ipoh is celebrated for its food culture, particularly dishes that benefit from the city\'s naturally soft, mineral-rich water. The bean sprouts grown in Ipoh water are famously crisper and more flavourful than those grown elsewhere — a claim backed by Ipoh locals who insist the dish cannot be replicated outside the city.',
    signatureDishes: [
      {
        name: 'Ipoh Bean Sprout Chicken',
        description: 'Poached chicken with Ipoh bean sprouts, served with rice and ginger-scallion sauce',
        searchTerm: 'chicken rice bean sprout',
        iconUrl: ICONS.chickenRice,
        approxCalories: 520,
        tags: ['Cantonese', 'Ipoh', 'Chicken', 'Bean Sprouts'],
      },
    ],
  },
  {
    id: 'kl-hokkien-mee',
    name: 'Restoran Kim Lian Kee',
    type: 'restaurant',
    location: 'Petaling Street, Kuala Lumpur',
    country: 'MY',
    region: 'Kuala Lumpur',
    ethnic: ['Chinese', 'Hokkien'],
    accolades: ['KL Heritage Restaurant', 'Operating since 1927'],
    description: 'The originator of KL-style Hokkien mee — thick black noodles stir-fried in dark soy sauce with pork lard, completely different from Singapore\'s prawn broth version.',
    culturalNote: 'KL Hokkien mee (吉隆坡福建面) is a source of friendly rivalry between Singapore and Malaysia. The KL version uses thick yellow noodles stir-fried in dark caramel soy sauce with pork lard, while Singapore\'s version uses a wet prawn broth technique. Both are authentic expressions of Hokkien culinary tradition adapted to local ingredients.',
    operatingSince: '1927',
    address: 'Jalan Petaling, Kuala Lumpur, Malaysia',
    signatureDishes: [
      {
        name: 'KL Hokkien Mee',
        description: 'Thick yellow noodles wok-fried in dark caramel soy sauce with pork, prawns, and crispy lard',
        searchTerm: 'hokkien mee dark soy',
        iconUrl: ICONS.charKwayTeow,
        approxCalories: 680,
        tags: ['Hokkien', 'KL', 'Dark Soy', 'Noodles', 'Pork'],
      },
    ],
  },
  {
    id: 'penang-char-kway-teow',
    name: 'Lorong Selamat Char Kway Teow',
    type: 'hawker_stall',
    location: 'Lorong Selamat, Georgetown, Penang',
    country: 'MY',
    region: 'Penang',
    ethnic: ['Chinese', 'Hokkien'],
    accolades: ['Best Char Kway Teow in Malaysia', 'Penang Heritage Food'],
    description: 'The most celebrated char kway teow stall in Penang, run by a female hawker (a rarity in the traditionally male-dominated wok cooking world).',
    culturalNote: 'Penang char kway teow differs from the Singapore version in its use of duck eggs (which give a richer, creamier texture) and the inclusion of blood cockles. The Penang version is also typically cooked in smaller batches to maintain wok hei.',
    signatureDishes: [
      {
        name: 'Penang Char Kway Teow',
        description: 'Flat rice noodles stir-fried with duck egg, blood cockles, Chinese sausage, and bean sprouts in dark soy',
        searchTerm: 'char kway teow',
        iconUrl: ICONS.charKwayTeow,
        approxCalories: 720,
        tags: ['Hokkien', 'Penang', 'Duck Egg', 'Cockles', 'Wok-fried'],
      },
    ],
  },
  {
    id: 'warung-mak-weh',
    name: 'Warung Mak Weh',
    type: 'hawker_stall',
    location: 'Geylang Serai, Singapore',
    country: 'SG',
    region: 'East Singapore',
    ethnic: ['Malay'],
    description: 'A beloved Malay warung in the heart of Geylang Serai, serving authentic Malay kampung (village) food.',
    culturalNote: 'Geylang Serai is the cultural heartland of Singapore\'s Malay community. The warungs here serve food rooted in kampung (village) traditions — recipes passed down through generations that reflect the Malay philosophy of gotong royong (communal cooperation) in food preparation.',
    signatureDishes: [
      {
        name: 'Mee Rebus',
        description: 'Yellow noodles in a thick sweet potato and prawn gravy, topped with boiled egg, bean sprouts, and fried shallots',
        searchTerm: 'mee rebus',
        iconUrl: ICONS.meeRebus,
        approxCalories: 480,
        tags: ['Malay', 'Noodles', 'Breakfast', 'Halal'],
      },
      {
        name: 'Nasi Padang',
        description: 'Steamed rice with a selection of Minangkabau-style dishes including rendang, sambal goreng, and sayur lodeh',
        searchTerm: 'nasi padang',
        iconUrl: ICONS.nasiPadang,
        approxCalories: 650,
        tags: ['Malay', 'Minangkabau', 'Lunch', 'Halal'],
      },
    ],
  },
  {
    id: 'beach-road-prawn-mee',
    name: 'Beach Road Prawn Mee',
    type: 'hawker_stall',
    location: 'Beach Road, Singapore',
    country: 'SG',
    region: 'Central Singapore',
    ethnic: ['Chinese', 'Hokkien'],
    accolades: ['Michelin Bib Gourmand'],
    description: 'A heritage prawn mee stall known for its intensely flavourful prawn broth made from toasted prawn shells simmered for hours.',
    culturalNote: 'Prawn mee (Hokkien: hae mee) originated in the Hokkien community of Singapore and Penang. The broth is the soul of the dish — made by toasting prawn heads and shells until fragrant, then simmering with pork bones for a deeply umami stock.',
    signatureDishes: [
      {
        name: 'Prawn Mee Soup',
        description: 'Yellow noodles and bee hoon in rich prawn-pork broth with large prawns, pork ribs, and kangkong',
        searchTerm: 'prawn mee',
        iconUrl: ICONS.prawnMee,
        approxCalories: 520,
        tags: ['Hokkien', 'Seafood', 'Noodles', 'Soup'],
      },
    ],
  },
  {
    id: 'popiah-kway-guan-huat',
    name: 'Kway Guan Huat Joo Chiat Popiah',
    type: 'hawker_stall',
    location: 'Joo Chiat Road, Singapore',
    country: 'SG',
    region: 'East Singapore',
    ethnic: ['Peranakan', 'Chinese'],
    accolades: ['Heritage Brand since 1938', 'Michelin Bib Gourmand'],
    description: 'Singapore\'s oldest popiah skin maker, supplying restaurants and hawkers since 1938 while also serving fresh popiah from their shop.',
    culturalNote: 'Popiah is a Hokkien and Teochew fresh spring roll that became a Peranakan staple in Singapore. Making popiah is traditionally a communal activity — family members gather to prepare the filling and wrap their own rolls, making it a dish associated with togetherness and festive occasions.',
    operatingSince: '1938',
    address: '95 Joo Chiat Rd, Singapore 427389',
    signatureDishes: [
      {
        name: 'Fresh Popiah',
        description: 'Thin wheat crepe filled with braised turnip, carrots, bean sprouts, egg, prawns, and hoisin sauce',
        searchTerm: 'popiah',
        iconUrl: ICONS.popiah,
        approxCalories: 280,
        tags: ['Peranakan', 'Hokkien', 'Vegetarian-friendly', 'Snack', 'Heritage'],
      },
    ],
  },
];

// ── Helper functions ────────────────────────────────────────────────────────

export function getRestaurantsByCountry(country: 'SG' | 'MY' | 'SG/MY'): Restaurant[] {
  return RESTAURANTS.filter(r => r.country === country || r.country === 'SG/MY');
}

export function getRestaurantsByEthnic(ethnic: string): Restaurant[] {
  return RESTAURANTS.filter(r => r.ethnic.some(e => e.toLowerCase().includes(ethnic.toLowerCase())));
}

export function getRestaurantsByRegion(region: string): Restaurant[] {
  return RESTAURANTS.filter(r => r.region.toLowerCase().includes(region.toLowerCase()));
}

export function getMichelinRestaurants(): Restaurant[] {
  return RESTAURANTS.filter(r => r.accolades?.some(a => a.toLowerCase().includes('michelin')));
}

export function searchRestaurants(query: string): Restaurant[] {
  const q = query.toLowerCase();
  return RESTAURANTS.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.ethnic.some(e => e.toLowerCase().includes(q)) ||
    r.signatureDishes.some(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q))
    )
  );
}

export const COUNTRY_LABELS: Record<string, string> = {
  SG: 'Singapore',
  MY: 'Malaysia',
  'SG/MY': 'SG & MY',
};

export const TYPE_LABELS: Record<string, string> = {
  hawker_stall: 'Hawker Stall',
  kopitiam: 'Kopitiam',
  restaurant: 'Restaurant',
  food_court: 'Food Court',
};
