/* ================================================================
   VOYAGEMARA SAFARIS — MAASAI MARA SUB-PAGES DATA
   Single source of truth for all 5 Maasai Mara dropdown pages:
   1. Overview
   2. 3-Day Big Five Safari
   3. Great Wildebeest Migration
   4. Luxury Mara Camps
   5. Maasai Culture Experience
   ================================================================ */

export const MAASAI_MARA_PAGES = {
  overview: {
    slug: "overview",
    route: "/safaris/maasai-mara/overview",
    name: "Maasai Mara Overview",
    title: "Maasai Mara National Reserve — Complete Travel Overview",
    heroSubtitle:
      "Big cats, endless savannah plains, the world’s greatest wildlife migration and the ancestral homeland of the Maasai people.",
    breadcrumbName: "Overview",
    seo: {
      title: "Maasai Mara Overview | Kenya Safari Guide | VoyageMara Safaris",
      description:
        "Comprehensive guide to Kenya's Maasai Mara National Reserve: reserve size, location, best time to visit, wildlife sightings, and practical travel advice.",
      keywords:
        "maasai mara overview, kenya safari guide, maasai mara facts, best time to visit mara, voyagemara safaris",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/maasai-mara-cover.webp",
    },
    facts: [
      {
        label: "Size",
        value: "About 1,510 km² (national reserve) plus 1,400+ km² in surrounding community conservancies",
      },
      {
        label: "Location",
        value: "Narok County, south-western Kenya. 5–6 hours by road from Nairobi, or 45 mins by air to Mara airstrips",
      },
      {
        label: "Best Time",
        value: "July to October for the Great Migration river crossings; January to March for calving and low crowds",
      },
      {
        label: "Wildlife",
        value: "Lion, leopard, cheetah, elephant, African buffalo, black rhino, hippo, Nile crocodile & 450+ bird species",
      },
    ],
    heroImage: {
      src: "/tours/maasai-mara/maasai-mara-cover.webp",
      placeholderFile: "images/mara-landscape.webp",
      alt: "Maasai Mara plains at sunrise with acacia trees",
    },
    gallery: [
      {
        src: "/tours/maasai-mara/lions.webp",
        placeholderFile: "images/mara-lions.webp",
        alt: "Pride of lions on the savannah",
        caption: "Top Big Cat Sightings",
      },
      {
        src: "/tours/maasai-mara/ballon.webp",
        placeholderFile: "images/mara-balloon.webp",
        alt: "Hot air balloon safari over Maasai Mara",
        caption: "Sunrise Balloon Safari",
      },
      {
        src: "/tours/maasai-mara/maasai.webp",
        placeholderFile: "images/maasai-community.webp",
        alt: "Maasai cultural guide in traditional shuka",
        caption: "Native Maasai Guides",
      },
      {
        src: "/tours/maasai-mara/maasai-mara-3.webp",
        placeholderFile: "images/mara-river.webp",
        alt: "Mara River landscape with hippos",
        caption: "Mara & Talek River Basins",
      },
    ],
    whyVisit: [
      {
        title: "Africa’s Premier Big Cat Capital",
        desc: "World-famous for resident prides of lions, cheetah coalitions hunting in daylight, and elusive leopards prowling riverine acacia trees.",
      },
      {
        title: "All Big Five in One Protected Ecosystem",
        desc: "Encounter lion, leopard, elephant, buffalo, and endangered black rhinos safely across open plains and river loops.",
      },
      {
        title: "Sunrise Hot Air Balloon Flight",
        desc: "Float above the awakening savannah at dawn, followed by an unforgettable champagne bush breakfast served in the wild.",
      },
      {
        title: "Authentic Living Maasai Culture",
        desc: "Learn from indigenous Maasai guides who have protected this ecosystem for centuries alongside free-roaming wildlife.",
      },
    ],
    practicalInfo: [
      {
        label: "Getting There",
        text: "Daily scheduled flights from Wilson Airport (Nairobi) landing at Keekorok, Musiara, Mara North, or Serena airstrips (45 mins). Road safaris take 5 to 6 hours via Narok in a custom 4x4 Land Cruiser.",
      },
      {
        label: "Park & Conservancy Fees",
        text: "Narok County entry fees range between $100 and $200 per adult per 24 hours depending on peak/regular season. VoyageMara includes all fees clearly on your custom invoice.",
      },
      {
        label: "What to Pack",
        text: "Neutral-coloured safari clothing (khaki, olive, beige), warm fleece/jacket for dawn and evening drives, wide-brim hat, high-SPF sunscreen, binoculars (8x42 or 10x42), and camera with telephoto lens.",
      },
      {
        label: "Health & Vaccines",
        text: "Consult your travel doctor regarding Yellow Fever and antimalarial prophylaxis. Drink bottled/purified water provided complimentary in our 4x4 vehicles.",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara Safaris! I'm reading your Maasai Mara Overview guide and would like to plan a safari trip.",
  },

  "3-day-big-five-safari": {
    slug: "3-day-big-five-safari",
    route: "/safaris/maasai-mara/3-day-big-five-safari",
    name: "3-Day Big Five Safari",
    title: "3-Day Maasai Mara Big Five Safari (Private 4x4 Land Cruiser)",
    heroSubtitle:
      "A short, action-packed private safari engineered to track lion, leopard, elephant, buffalo and rhino at golden dawn and late afternoon.",
    breadcrumbName: "3-Day Big Five Safari",
    seo: {
      title: "3-Day Maasai Mara Big Five Safari | Private 4x4 Tour | VoyageMara Safaris",
      description:
        "Book our 3-Day Maasai Mara Big Five Safari. Private 4x4 Land Cruiser, native Maasai guide, sunrise game drives, full board luxury camp accommodation.",
      keywords:
        "3 day maasai mara safari, big five safari kenya, private 4x4 safari mara, voyagemara 3 day tour",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/maasai-mara-big-five.webp",
    },
    itinerary: [
      {
        day: "Day 1",
        title: "Nairobi to Maasai Mara — Great Rift Valley & Afternoon Predator Drive",
        plan: "Prompt morning pick-up from your Nairobi hotel or Jomo Kenyatta International Airport (JKIA). Enjoy a scenic descent down the Great Rift Valley escarpment with a brief panoramic viewpoint photo stop. Proceed through Narok town to arrive at your Maasai Mara camp in time for a warm welcome and freshly prepared hot lunch. Head out on your first late-afternoon game drive across the savannah until sunset. Dinner and fireside storytelling under the African stars.",
      },
      {
        day: "Day 2",
        title: "Full Day Big Five Expedition & Mara River Picnic",
        plan: "Awake to hot coffee/tea and depart at first light for a full-day wildlife expedition. Search for black rhinos in the acacia scrub, follow lion prides on morning hunts, and reach the Mara River banks where hippos bask and crocodiles wait. Enjoy an authentic packed picnic lunch at a designated river kopje. Optional dawn hot air balloon safari or evening Maasai cultural village visit. Return to camp for dinner and overnight.",
      },
      {
        day: "Day 3",
        title: "Sunrise Golden Hour Drive & Return to Nairobi",
        plan: "Embark on an early morning sunrise game drive when predators are most active. Return to camp for a hearty bush breakfast, check out, and begin the relaxed return journey to Nairobi in your private Land Cruiser (or optional direct flight from Mara airstrip). Drop-off at your hotel or airport by late afternoon.",
      },
    ],
    included: [
      "Exclusive private 4x4 Toyota Land Cruiser with pop-up photographic roof",
      "Certified native Maasai driver-guide with extensive tracking expertise",
      "2 nights full board accommodation (breakfast, lunch, dinner) at selected camp",
      "All reserve entry fees & game drive permits",
      "Complimentary bottled mineral water in safari vehicle throughout",
      "Door-to-door Nairobi hotel or airport transfers",
      "Flying Doctors emergency evacuation medical cover",
    ],
    notIncluded: [
      "International flights and Kenya Electronic Travel Authorisation (eTA)",
      "Optional Sunrise Hot Air Balloon Safari ($450–$500 per person)",
      "Optional Maasai Manyatta cultural village fee ($20–$30 per person)",
      "Tips and gratuities for safari driver-guide and lodge staff",
      "Personal travel and medical insurance",
      "Alcoholic and premium beverages (unless booked on all-inclusive tier)",
    ],
    pricing: {
      midRange: "From $580 per person (based on 2 sharing)",
      luxury: "From $1,150 per person (based on 2 sharing)",
      solo: "Custom quotes on request",
    },
    heroImage: {
      src: "/tours/maasai-mara/maasai-mara-big-five.webp",
      placeholderFile: "images/big-five.webp",
      alt: "The African Big Five animals in Maasai Mara",
    },
    gallery: [
      {
        src: "/tours/maasai-mara/lions.webp",
        placeholderFile: "images/lion.webp",
        alt: "Male lion in golden afternoon light",
        caption: "Lion (Simba)",
      },
      {
        src: "/tours/maasai-mara/maasai-mara-4.webp",
        placeholderFile: "images/elephant.webp",
        alt: "African elephant family on the savannah",
        caption: "Elephant (Tembo)",
      },
      {
        src: "/tours/maasai-mara/maasai-mara-6.webp",
        placeholderFile: "images/leopard.webp",
        alt: "Leopard resting on an acacia branch",
        caption: "Leopard (Chui)",
      },
    ],
    whatsappMsg:
      "Hello Duncan & VoyageMara! I'd like to request the 3-Day Big Five Safari in Maasai Mara. Could you please share lodge options, available dates, and quote for our group?",
  },

  "great-wildebeest-migration": {
    slug: "great-wildebeest-migration",
    route: "/safaris/maasai-mara/great-wildebeest-migration",
    name: "Great Wildebeest Migration",
    title: "The Great Wildebeest Migration — Mara River Crossings & Seasons",
    heroSubtitle:
      "Over 1.5 million wildebeest, 300,000 zebras, and gazelles moving across the Serengeti–Mara ecosystem in Earth’s greatest wildlife spectacle.",
    breadcrumbName: "Great Wildebeest Migration",
    seo: {
      title: "Great Wildebeest Migration Guide | Mara River Crossings | VoyageMara",
      description:
        "Ultimate guide to the Great Wildebeest Migration in Kenya: month-by-month cycle, Mara River crossing locations, best camps, and photography tips.",
      keywords:
        "great wildebeest migration, mara river crossing, wildebeest migration kenya 2026, voyagemara migration safari",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/zebras.webp",
    },
    yearlyCycle: [
      {
        period: "January – March",
        location: "Southern Serengeti & Ndutu Plains (Tanzania)",
        highlight:
          "Calving season: roughly 8,000 wildebeest calves born every single day. High cheetah, hyena, and lion predation on the open plains.",
      },
      {
        period: "April – May",
        location: "Central & Western Serengeti (Seronera & Western Corridor)",
        highlight:
          "Long rains replenish savannah grasses; vast herds mass together and begin their relentless trek north-westward.",
      },
      {
        period: "June – July",
        location: "Grumeti River & Northern Serengeti",
        highlight:
          "First major river obstacles at the Grumeti. Large herds march northward towards the Kenyan border and the Mara River.",
      },
      {
        period: "July – October",
        location: "Maasai Mara National Reserve & Conservancies (Kenya)",
        highlight:
          "Peak Migration in Kenya! World-famous Mara and Talek River crossings with massive Nile crocodiles and intense predator clashes.",
      },
      {
        period: "November – December",
        location: "Moving South towards Eastern Serengeti",
        highlight:
          "Short rains begin; herds cross back southward into Tanzania to complete the timeless 1,800-kilometre annual loop.",
      },
    ],
    crossingDetails: {
      title: "The Dramatic Mara River Crossings",
      intro:
        "The river crossings are nature in its purest, rawest form. Thousands of animals gather along the steep, muddy banks of the Mara River. Tension builds for hours as the herd paces nervously, scenting the water for danger.",
      body:
        "Suddenly, a single courageous wildebeest or zebra plunges into the torrent. Instantly, the bank erupts as thousands stampede blindly into the river. Huge Nile crocodiles surge forward while lions and leopards watch from the riverine trees on the far bank. Because crossings are unpredictable and unfold in minutes, patience, respectful silence, and an instinctive Maasai guide are essential.",
    },
    tips: [
      "Book 6 to 12 months ahead: Top riverfront camps (Governors', Entim, Mara Ngenche, Fig Tree) sell out quickly for July–October.",
      "Stay at least 3 to 4 nights in the Mara to dramatically increase your chances of witnessing one or more live river crossings.",
      "Bring telephoto lenses (100–400mm or 150–600mm) with dust protection covers and beanbags for steady shooting from the 4x4 roof.",
      "Migration timing is governed by rainfall and grass growth; dates vary naturally each season, so rely on our local guides' real-time radio communication.",
    ],
    heroImage: {
      src: "/tours/maasai-mara/zebras.webp",
      placeholderFile: "images/migration-herds.webp",
      alt: "Vast wildebeest and zebra herds sweeping the Maasai Mara savannah",
    },
    gallery: [
      {
        src: "/tours/maasai-mara/maasai-mara-3.webp",
        placeholderFile: "images/river-crossing.webp",
        alt: "Wildebeest crossing the turbulent Mara River",
        caption: "Mara River Crossing Point",
      },
      {
        src: "/tours/maasai-mara/zebras.webp",
        placeholderFile: "images/zebra.webp",
        alt: "Burchell's zebras grazing peacefully on the Mara plains",
        caption: "Zebras on Migration Path",
      },
      {
        src: "/tours/maasai-mara/maasai-mara-5.webp",
        placeholderFile: "images/crocodile.webp",
        alt: "River banks and wildlife habitat in Maasai Mara",
        caption: "Riverbank Ambush Zones",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara Safaris! I want to plan a Great Wildebeest Migration safari to witness the Mara River crossings. Please advise on best dates and prime camps.",
  },

  "luxury-mara-camps": {
    slug: "luxury-mara-camps",
    route: "/safaris/maasai-mara/luxury-mara-camps",
    name: "Luxury Mara Camps",
    title: "Luxury Safari Camps & Lodges in Maasai Mara",
    heroSubtitle:
      "Awake to birdsong and grunting hippos in hand-crafted canvas suites, eco-lodges, and cliffside retreats across the reserve and private conservancies.",
    breadcrumbName: "Luxury Mara Camps",
    seo: {
      title: "Luxury Maasai Mara Safari Camps & Lodges | VoyageMara Safaris",
      description:
        "Discover 5-star luxury tented camps and premier safari lodges in Maasai Mara: Mara River camps, Aitong conservancy retreats, private plunge pools, and expert guiding.",
      keywords:
        "luxury maasai mara camps, 5 star lodges mara, best safari camps kenya, aitong luxury camps, voyagemara camps",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/camp.webp",
    },
    whatToExpect: [
      {
        title: "Lavish Canvas Suites & Chalets",
        desc: "King-sized hardwood beds, fine cotton linens, polished wooden floors, en-suite bathrooms with hot running water, and private mahogany verandas overlooking the bush.",
      },
      {
        title: "Gourmet Bush Gastronomy",
        desc: "Three-course table d'hôte dinners, sunrise bush breakfasts with freshly brewed Kenyan coffee, and evening sundowners with chilled champagne overlooking grazing herds.",
      },
      {
        title: "Elite Native Guiding & 4x4 Cruisers",
        desc: "Custom open-sided 4x4 safari vehicles equipped with camera charging sockets, wildlife reference books, and highly trained native Maasai naturalist guides.",
      },
      {
        title: "Wellness & Star-filled Nights",
        desc: "Eco-luxury spas offering Maasai botanicals, rim-flow infinity pools overlooking wildlife waterholes, and crackling campfires with traditional storytelling.",
      },
    ],
    choosingByLocation: [
      {
        zone: "Inside National Reserve (Riverfront)",
        goodFor: "Peak Migration action, Mara & Talek river crossings, shortest drive to crossing points.",
        examples: "Governors' Camp, Entim Main Camp, Mara Serena Safari Lodge, Fig Tree Camp",
      },
      {
        zone: "Private Conservancies (Mara North, Naboisho, Lemek, Olare Motorogi)",
        goodFor: "Zero tourist congestion, night game drives with red filters, walking safaris, direct Maasai landowner empowerment.",
        examples: "Elephant Pepper Camp, Saruni Mara (Aitong Hills), Kicheche Mara, Karen Blixen Camp, Porini Lion Camp",
      },
      {
        zone: "Talek & Sekenani Gate Borders",
        goodFor: "Convenient road access, balanced price-to-luxury ratio, fast gate entry, great year-round big cat sightings.",
        examples: "AA Lodge Mara, Mara Leisure Camp, Basecamp Maasai Mara, Sentrim Mara",
      },
    ],
    featuredCamps: [
      {
        name: "Saruni Mara (Aitong Hills)",
        tier: "5-Star Boutique Luxury",
        location: "Aitong Hills, Lemek / Mara North Conservancy",
        price: "From $980 pps / night",
        highlights: "Secluded valley in Aitong Hills, Italian gourmet cuisine, Maasai Wellbeing Space, private stone villas.",
        image: "/tours/maasai-mara/maasai-mara-4.webp",
        link: "https://saruni.com/saruni-mara/",
      },
      {
        name: "Elephant Pepper Camp (Elewana)",
        tier: "5-Star Classic Bush Luxury",
        location: "Aitong Plains, Mara North Conservancy",
        price: "From $890 pps / night",
        highlights: "Authentic safari romance in acacia grove, night game drives, open 4x4s, minutes from Aitong town.",
        image: "/tours/maasai-mara/maasai-mara-6.webp",
        link: "https://www.elewanacollection.com/elephant-pepper-camp/at-a-glance",
      },
      {
        name: "Karen Blixen Camp",
        tier: "5-Star Eco-Luxury Riverfront",
        location: "Mara River, Mara North Conservancy",
        price: "From $680 pps / night",
        highlights: "22 luxury tents right above the Mara River, swimming pool, resident hippo pool, eco forestry school.",
        image: "/tours/maasai-mara/maasai-mara-5.webp",
        link: "https://karenblixencamp.com/",
      },
      {
        name: "Entim Main Camp",
        tier: "Premier River Crossing Camp",
        location: "Mara River, Inside National Reserve",
        price: "From $850 pps / night",
        highlights: "Direct front-row seats to Mara River crossings without waiting in vehicle lines; photographic vehicles.",
        image: "/tours/maasai-mara/camp.webp",
        link: "https://entim-mara.com/",
      },
      {
        name: "Fig Tree Camp",
        tier: "Comfort Mid-Range River Camp",
        location: "Talek River Bank, Inside Reserve Boundary",
        price: "From $240 pps / night",
        highlights: "Elevated riverfront tents, balloon launch site on-site, resident hippos, swimming pool.",
        image: "/tours/maasai-mara/maasai-mara-6.webp",
        link: "https://madahotels.com/fig-tree-camp-masai-mara/",
      },
      {
        name: "Angama Mara",
        tier: "Ultra-Luxury Architectural Icon",
        location: "Great Rift Valley Oloololo Escarpment",
        price: "From $1,450 pps / night",
        highlights: "11-metre floor-to-ceiling glass suites, Out of Africa film kopje, private airfield, rim-flow pool.",
        image: "/tours/maasai-mara/maasai-mara-cover.webp",
        link: "https://angama.com/",
      },
    ],
    heroImage: {
      src: "/tours/maasai-mara/camp.webp",
      placeholderFile: "images/camp-tent.webp",
      alt: "Luxury safari tent with private wooden veranda overlooking savannah",
    },
    gallery: [
      {
        src: "/tours/maasai-mara/camp.webp",
        placeholderFile: "images/camp-tent.webp",
        alt: "Spacious canvas safari suite",
        caption: "Luxury Tented Suites",
      },
      {
        src: "/tours/maasai-mara/maasai-mara-4.webp",
        placeholderFile: "images/camp-dining.webp",
        alt: "Candlelit bush dining table under acacia trees",
        caption: "Private Bush Dining",
      },
      {
        src: "/tours/maasai-mara/maasai-mara-6.webp",
        placeholderFile: "images/camp-pool.webp",
        alt: "Swimming pool with panoramic plains view",
        caption: "Panoramic Pools",
      },
    ],
    whatsappMsg:
      "Hello Duncan! I'm browsing your Luxury Mara Camps collection and would love personalized recommendations and rates for our safari dates.",
  },

  "maasai-culture-experience": {
    slug: "maasai-culture-experience",
    route: "/safaris/maasai-mara/maasai-culture-experience",
    name: "Maasai Culture Experience",
    title: "The Living Culture of the Maasai People",
    heroSubtitle:
      "Cattle keepers, guardians of the savannah, master beadworkers, and the traditional custodians of the Maasai Mara ecosystem.",
    breadcrumbName: "Maasai Culture Experience",
    seo: {
      title: "Maasai Culture Experience | Traditions, Beadwork & Bomas | VoyageMara",
      description:
        "Authentic Maasai cultural guide: traditional shuka & beadwork color meanings, warrior age sets, the Adumu jumping dance, boma lifestyle, and ethical village visits.",
      keywords:
        "maasai culture experience, maasai beadwork colors, adumu jumping dance, maasai boma visit, voyagemara culture",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/maasai.webp",
    },
    whoAreTheMaasai: {
      title: "Who the Maasai Are",
      text: "The Maasai are a proud Nilotic ethnic group inhabiting southern Kenya and northern Tanzania. For generations, they have herded cattle, goats, and sheep across vast savannah grasslands, living in unbroken harmony with East Africa's wildlife. They speak Maa, an Eastern Nilotic language. In traditional Maasai belief, Enkai (God) entrusted all cattle on Earth to the Maasai; livestock represents wealth, nutrition, and divine favor. Families reside together in a 'boma' (enkang) — a circular village fortified by a thick perimeter fence of thorny acacia branches that protects both family and livestock from lions and hyenas during the night.",
    },
    dressAndBeadwork: {
      title: "Traditional Dress & Beadwork Color Meanings",
      intro:
        "Maasai attire is globally iconic. The primary garment is the 'shuka' — brilliantly dyed fabric (predominantly red, blue, or plaid) wrapped gracefully over the shoulders and waist. Women are master artisans who craft intricate beadwork jewelry that communicates clan lineage, social standing, age set, and marital status.",
      colors: [
        {
          color: "Red",
          meaning: "Bravery, strength, unity, and the sacred blood of cattle that sustains life.",
        },
        {
          color: "Blue",
          meaning: "The sky (Enkai) and life-giving rainfall that nourishes pastures for their herds.",
        },
        {
          color: "Green",
          meaning: "The land, rich pastures, and vegetation symbolizing health, growth, and nourishment.",
        },
        {
          color: "White",
          meaning: "Peace, purity, and the vital white milk provided by their cherished cows.",
        },
        {
          color: "Orange / Amber",
          meaning: "Hospitality, friendship, and the calabashes used to serve warm milk to welcoming guests.",
        },
        {
          color: "Black",
          meaning: "The resilience of the people and the dark rainclouds that promise survival in the bush.",
        },
      ],
    },
    ageSetsAndWarriors: {
      title: "Age Sets & The Moran (Warriors)",
      text: "Maasai society is organized by strict, lifelong age sets (il-porror). Young boys transition into junior warriors (Morans) through sacred ceremonies. Historically, the Morans were the fierce defenders of the clan and its cattle herds against cattle-raiders and predators. Today, Morans use their deep tracking prowess to protect wildlife and lead eco-safaris. Respected community elders guide judicial disputes, bless marriages, and oversee traditions like the Eunoto ceremony, which marks the graduation from warrior to elder.",
    },
    adumuDance: {
      title: "The Adumu (Jumping Dance)",
      text: "During ceremonies and celebrations, warriors form an energetic semicircle and chant deep, resonant polyphonic songs without instruments. One or two Morans step forward into the center to perform the 'Adumu' — leaping straight up into the air from flat feet with their bodies held tall, stiff, and poised. The higher a warrior leaps while keeping perfect rhythm, the greater the admiration he earns from the community. Visiting guests are warmly invited to step forward and try the jump alongside the warriors!",
    },
    foodAndDailyLife: {
      title: "Food, Bomas & Daily Life",
      text: "The traditional Maasai diet is centered around milk, meat, and on special ceremonial occasions, fresh cattle blood drawn without harming the animal. Today, maize porridge (ugali), sweetened spiced chai tea, and vegetables are common. Maasai women are the architects of the community: they construct the boma houses using wooden poles, woven thatch, mud, ash, and cow dung which cures into an airtight, cooling shelter. Women manage water, firewood, and artisanal beadwork, while men and young morans herd cattle across the plains.",
    },
    respectForNature: {
      title: "Beliefs & Profound Respect for Nature",
      text: "The Maasai possess an encyclopedic oral knowledge of animal movements, medicinal bush plants, weather shifts, and bird calls. Because Maasai pastoralists do not traditionally hunt wild game for food, wildlife thrived alongside them for centuries. This ancestral intimacy with the bush is why native Maasai guides are universally considered the finest wildlife trackers in Africa.",
    },
    visitorActivities: [
      "Traditional welcome greeting with rhythmic song and the Adumu jumping dance",
      "Guided tour inside a real family boma and traditional mud-thatch home",
      "Traditional fire-making demonstration using olive wood friction sticks",
      "Opportunity to purchase beadwork, necklaces, and shukas directly from the women who handmade them",
      "Medicinal plant bush walk led by an elder warrior sharing ancient herbal remedies",
      "Visits to community schools and clean water borehole projects supported by tourism fees",
    ],
    respectfulVisitingTips: [
      "Always ask permission before taking photographs of individuals, especially elders and children.",
      "Dress respectfully with shoulders and knees covered as a courtesy to village customs.",
      "Greet elders first with a warm handshake and polite smile ('Sopa' is the traditional Maa greeting!).",
      "Support the community directly by purchasing handcrafted beadwork at fair, polite prices.",
      "Book through ethical local operators like VoyageMara, where 100% of village entry fees go directly to the village committee.",
    ],
    quickFacts: [
      { label: "Experience Duration", value: "1 to 2 hours (easily paired with morning or afternoon game drive)" },
      { label: "Location", value: "Authentic community manyattas bordering Maasai Mara Reserve & Aitong" },
      { label: "Suitable For", value: "Families, solo travelers, couples, photographers & children of all ages" },
      { label: "Direct Impact", value: "Supports local school fees, women's beadwork cooperatives & community water" },
    ],
    heroImage: {
      src: "/tours/maasai-mara/maasai.webp",
      placeholderFile: "images/maasai-community.webp",
      alt: "Maasai community members gathered in vibrant traditional beadwork and red shuka",
    },
    gallery: [
      {
        src: "/tours/maasai-mara/maasai-1.webp",
        placeholderFile: "images/beadwork.webp",
        alt: "Intricate handmade Maasai beadwork necklaces and bracelets",
        caption: "Artisanal Beadwork",
      },
      {
        src: "/tours/maasai-mara/maasai.webp",
        placeholderFile: "images/shuka.webp",
        alt: "Traditional red shuka fabric draped over Maasai guides",
        caption: "Iconic Red Shuka",
      },
      {
        src: "/tours/maasai-mara/maasai-mara-6.webp",
        placeholderFile: "images/boma.webp",
        alt: "Traditional Maasai boma settlement on the Mara savannah",
        caption: "Boma Village Life",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara Safaris! I'm interested in adding an authentic Maasai Cultural Village Visit to our safari itinerary. Please share details and how to combine it with our game drives.",
  },
};
