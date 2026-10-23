/* ================================================================
   VOYAGEMARA SAFARIS — KENYA SAFARIS SUB-PAGES DATA
   Single source of truth for all 7 Kenya Safaris dropdown pages:
   1. Book a Safari (Instant Quote)
   2. All Safari Packages
   3. Kenya Safari Pricing
   4. Park Fees Explained
   5. Family Safaris
   6. Honeymoon Safaris
   7. Group / Corporate Safaris
   ================================================================ */

export const KENYA_SAFARIS_PAGES = {
  "book-a-safari": {
    slug: "book-a-safari",
    route: "/kenya-safaris/book-a-safari",
    name: "Book a Safari (Instant Quote)",
    breadcrumbName: "Instant Quote",
    title: "Book a Kenya Safari — Fast & Free Instant Quote",
    heroSubtitle:
      "Tell us your travel dates, group size, and preferred parks. We send an itemized day-by-day quote within a few hours — 100% free with zero obligation.",
    seo: {
      title: "Book a Kenya Safari | Instant Quote & Direct Operator | VoyageMara",
      description:
        "Request an instant Kenya safari quote directly from local operator VoyageMara Safaris. Custom 4x4 Land Cruisers, native Maasai guides, and zero middleman markup.",
      keywords:
        "book kenya safari, kenya safari instant quote, direct safari operator nairobi, voyagemara reservations",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/maasai-mara-cover.webp",
    },
    heroImage: {
      src: "/tours/maasai-mara/maasai-mara-cover.webp",
      placeholderFile: "images/booking-hero.jpg",
      alt: "Safari Land Cruiser on the golden plains of Kenya",
    },
    howItWorks: [
      {
        step: "1. Tell Us",
        title: "Share Your Safari Vision",
        desc: "Send your preferred travel dates, number of adults and children, parks you want to explore, and desired comfort tier (budget, mid-range, or luxury).",
      },
      {
        step: "2. Get a Quote",
        title: "Detailed Itemized Itinerary",
        desc: "Our Nairobi operations team replies promptly with a day-by-day itinerary, transparent price per person, vehicle details, and full inclusions.",
      },
      {
        step: "3. Adjust & Tailor",
        title: "Fine-tune to Perfection",
        desc: "Modify lodges, adjust driving pace, or add hot air balloon flights and Maasai village cultural experiences until the trip matches your exact dream.",
      },
      {
        step: "4. Confirm & Relax",
        title: "Secure Your Dates",
        desc: "A 30% deposit locks in your private 4x4 Land Cruiser and lodge rooms. The balance is paid before or upon arrival in Nairobi.",
      },
    ],
    helpfulDetails: [
      { title: "Flight Details", text: "Arrival and departure dates and international flight times into Nairobi (JKIA)." },
      { title: "Children's Ages", text: "Ages of any traveling minors to apply discounted park fees and child lodge rates." },
      { title: "Special Milestones", text: "Honeymoon, wedding anniversary, birthday, or graduation celebrations." },
      { title: "Dietary & Mobility", text: "Vegetarian, vegan, gluten-free, or specific accessibility requests." },
    ],
    faqs: [
      {
        question: "How long does it take to receive my custom quote?",
        answer:
          "We usually reply within 2 to 4 hours during Nairobi business hours, or immediately over WhatsApp (+254 705 814 181).",
      },
      {
        question: "Is there any fee or commitment to get a quote?",
        answer:
          "None at all. All custom itinerary quotes are 100% free with zero obligation.",
      },
      {
        question: "Why book directly with VoyageMara instead of an overseas agency?",
        answer:
          "Overseas travel agents add 20%–40% commissions and re-sell our safaris. Booking directly with Duncan and our Nairobi team cuts out all middleman markups and gives you direct 24/7 ground support.",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara, please send me a safari quote. Dates: [EDIT ME: dates]. Travelers: [EDIT ME: group size]. Preferred parks: [EDIT ME: parks].",
  },

  "all-safari-packages": {
    slug: "all-safari-packages",
    route: "/kenya-safaris/all-safari-packages",
    name: "All Safari Packages",
    breadcrumbName: "Safari Packages",
    title: "Handcrafted Kenya Safari Packages (Private 4x4 Land Cruisers)",
    heroSubtitle:
      "Every package is 100% private: your own custom 4x4 Toyota Land Cruiser with pop-up photographic roof, dedicated native Maasai driver-guide, and guaranteed window seats.",
    seo: {
      title: "All Kenya Safari Packages | Private 4x4 Tours | VoyageMara Safaris",
      description:
        "Explore all verified Kenya safari packages: Maasai Mara, Amboseli, Lake Nakuru, Samburu, and multi-park circuits. Fully customizable with private Land Cruisers.",
      keywords:
        "kenya safari packages, maasai mara safari tours, amboseli tours, lake nakuru safari, voyagemara packages",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/maasai-mara-big-five.webp",
    },
    heroImage: {
      src: "/tours/maasai-mara/maasai-mara-big-five.webp",
      placeholderFile: "images/packages-hero.jpg",
      alt: "African wildlife and scenic savannah landscapes in Kenya",
    },
    packagesTable: [
      {
        name: "Maasai Mara Short Safari",
        duration: "2–3 Days",
        highlights: "Big Five tracking, resident big cat prides, Talek riverfront, optional Maasai village visit",
        bestFor: "First-time visitors & short layovers",
        link: "/safaris/maasai-mara",
      },
      {
        name: "Maasai Mara & Lake Nakuru",
        duration: "4–5 Days",
        highlights: "Endless Mara plains, endangered black & white rhinos, pink flamingos, Great Rift Valley views",
        bestFor: "Big cat & rhino enthusiasts",
        link: "/safaris/lake-nakuru",
      },
      {
        name: "Maasai Mara & Amboseli",
        duration: "5–6 Days",
        highlights: "Iconic herds of big-tusked elephants with Mount Kilimanjaro backdrop, lions, cheetahs",
        bestFor: "Classic Kenya photographer circuit",
        link: "/safaris/amboseli",
      },
      {
        name: "Great Wildebeest Migration Safari",
        duration: "4–7 Days",
        highlights: "Front-row seats to dramatic Mara River crossings (July–October), Nile crocodiles, mega-herds",
        bestFor: "Wildlife documentary enthusiasts",
        link: "/safaris/maasai-mara/great-wildebeest-migration",
      },
      {
        name: "Classic Kenya Safari Circuit",
        duration: "7–10 Days",
        highlights: "Maasai Mara, Lake Nakuru, Lake Naivasha boat safari, Amboseli & Tsavo wilderness",
        bestFor: "The definitive East African safari",
        link: "/booking",
      },
    ],
    gallery: [
      {
        src: "/tours/maasai-mara/lions.webp",
        placeholderFile: "images/pkg-mara.jpg",
        alt: "Maasai Mara big cats safari",
        caption: "Maasai Mara Big Cats",
      },
      {
        src: "/tours/amboseli/cover.webp",
        placeholderFile: "images/pkg-amboseli.jpg",
        alt: "Amboseli elephants beneath Mount Kilimanjaro",
        caption: "Amboseli & Kilimanjaro",
      },
      {
        src: "/tours/nakuru/cover.webp",
        placeholderFile: "images/pkg-nakuru.jpg",
        alt: "Lake Nakuru flamingos and rhinos",
        caption: "Lake Nakuru Rhinos",
      },
    ],
    faqs: [
      {
        question: "Can we customize these packages?",
        answer:
          "Yes, 100%. We can adjust the number of days, swap lodges, add internal flights, or combine any national parks according to your timeline.",
      },
      {
        question: "Do you offer shared or group departure tours?",
        answer:
          "VoyageMara specializes in private safaris where the vehicle is exclusively yours. This ensures maximum comfort, custom game drive departure times, and personalized guiding.",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara, I would like to see your safari packages and check availability for our upcoming dates.",
  },

  "pricing": {
    slug: "pricing",
    route: "/kenya-safaris/pricing",
    name: "Kenya Safari Pricing",
    breadcrumbName: "Pricing",
    title: "Kenya Safari Pricing & Tier Breakdown (Transparent Rates)",
    heroSubtitle:
      "Safari prices depend on season, group size, accommodation tier, and park fees. We display honest per-person rates with zero hidden extras.",
    seo: {
      title: "Kenya Safari Pricing & Cost Guide | VoyageMara Safaris",
      description:
        "Understand Kenya safari pricing: budget, mid-range, and luxury tiers. Learn what affects safari costs, what is included, and how to get the best value.",
      keywords:
        "kenya safari pricing, cost of safari kenya, budget vs luxury safari mara, voyagemara safari rates",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/camp.webp",
    },
    heroImage: {
      src: "/tours/maasai-mara/camp.webp",
      placeholderFile: "images/pricing-hero.jpg",
      alt: "Safari camp hospitality on the savannah in Kenya",
    },
    costFactors: [
      {
        title: "Travel Season",
        desc: "July–October (Great Migration) and Christmas/New Year are high season. April–May (green season) delivers the lowest rates and quietest plains.",
      },
      {
        title: "Accommodation Comfort Tier",
        desc: "Choose between budget adventure tented camps, comfortable mid-range safari lodges, or ultra-luxury 5-star riverfront properties.",
      },
      {
        title: "Group / Party Size",
        desc: "Since the private 4x4 Land Cruiser cost is shared among your group, traveling with 4 to 6 people substantially reduces the per-person rate.",
      },
      {
        title: "Safari Length & Park Entry",
        desc: "Government and county park entry fees ($100–$200/day) are charged per 24-hour cycle. Adding more days or private conservancies influences the overall price.",
      },
    ],
    pricingCards: [
      {
        tier: "Budget Adventure",
        price: "[EDIT ME: US$ ___]",
        period: "per person, sharing (2–6 guests)",
        isHot: false,
        badgeText: "Best Value",
        features: [
          "Clean tented eco-camp or basic safari lodge",
          "Private custom 4x4 Land Cruiser with pop-up roof",
          "Full-board meals (breakfast, lunch, dinner)",
          "All mandatory park & conservancy entry fees included",
          "Certified native Maasai driver-guide",
          "Complimentary bottled drinking water in vehicle",
        ],
        whatsappText: "Hello VoyageMara, I want a quote for the Budget Adventure safari tier.",
      },
      {
        tier: "Mid-Range Comfort",
        price: "[EDIT ME: US$ ___]",
        period: "per person, sharing (2–6 guests)",
        isHot: true,
        badgeText: "Most Booked",
        features: [
          "Comfortable permanent safari lodge or tented camp (e.g. AA Lodge, Fig Tree)",
          "Swimming pool & scenic savannah or river views",
          "Private 4x4 Land Cruiser with pop-up roof & onboard Wi-Fi",
          "Full-board accommodation with freshly cooked buffet meals",
          "All park entrance fees & local government levies included",
          "Native Maasai tracker-guide & cultural village visit",
        ],
        whatsappText: "Hello VoyageMara, I want a quote for the Mid-Range Comfort safari tier.",
      },
      {
        tier: "Premier Luxury",
        price: "[EDIT ME: US$ ___]",
        period: "per person, sharing (2–6 guests)",
        isHot: false,
        badgeText: "5-Star Experience",
        features: [
          "5-star luxury tented camp in prime riverfront or private conservancy",
          "Gourmet dining, fine wines, and evening sundowners",
          "Private 4x4 Land Cruiser with dedicated photographer beanbags",
          "Night game drives & escorted bush walks (in conservancies)",
          "Optional hot air balloon flight & bush champagne breakfast",
          "Airstrip transfers for fly-in safari options",
        ],
        whatsappText: "Hello VoyageMara, I want a quote for the Premier Luxury safari tier.",
      },
    ],
    includedList: [
      "Exclusive private 4x4 Toyota Land Cruiser with pop-up roof",
      "Certified native Maasai driver-guide with lifetime tracking experience",
      "All park and conservancy entrance fees stated in your itinerary",
      "Full-board accommodation (breakfast, lunch, and dinner daily)",
      "Daily unlimited morning and late-afternoon game drives",
      "Complimentary bottled mineral water in the vehicle throughout",
      "Door-to-door Nairobi hotel or airport transfers",
      "Emergency Flying Doctors evacuation cover",
    ],
    notIncludedList: [
      "International flights, Kenya eTA visa fees, and personal travel insurance",
      "Optional Hot Air Balloon Safari with champagne bush breakfast",
      "Optional Maasai Manyatta cultural village entrance ($20–$30 pp)",
      "Alcoholic beverages and soft drinks (unless on all-inclusive luxury tier)",
      "Tips and gratuities for safari driver-guide and camp staff",
      "Personal items, laundry, and souvenirs",
    ],
    faqs: [
      {
        question: "Are there any hidden costs after we receive our quote?",
        answer:
          "None. We specify every single cost item before you pay a deposit. Park fees, vehicle fuel, guide allowances, and full-board meals are all transparently included.",
      },
      {
        question: "Can we pay in installments?",
        answer:
          "Yes. A 30% deposit secures your safari vehicle and camp rooms, with the remaining 70% balance payable 14 days before your trip or on arrival.",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara, please send exact pricing for [EDIT ME: preferred tier] safari for [EDIT ME: dates].",
  },

  "park-fees-explained": {
    slug: "park-fees-explained",
    route: "/kenya-safaris/park-fees-explained",
    name: "Park Fees Explained",
    breadcrumbName: "Park Fees",
    title: "Kenya National Park & Conservancy Fees Explained (2026 / 2027)",
    heroSubtitle:
      "Park entrance fees are statutory conservation levies set by the Kenya Wildlife Service (KWS) and county governments. Learn how fees work, who pays, and how to avoid surprises.",
    seo: {
      title: "Kenya Safari Park Fees Explained (2026/2027) | VoyageMara",
      description:
        "Complete guide to Kenya national park fees: Maasai Mara, Amboseli, Lake Nakuru, and conservancies. Understand 24-hour cycles, citizen vs non-resident rates.",
      keywords:
        "kenya park fees, maasai mara park fee 2026, kws park fees, conservancy fees kenya, voyagemara pricing",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/maasai-mara-4.webp",
    },
    heroImage: {
      src: "/tours/maasai-mara/maasai-mara-4.webp",
      placeholderFile: "images/park-fees-hero.jpg",
      alt: "Wildlife in Kenya protected national park sanctuary",
    },
    facts: [
      {
        label: "Who Pays",
        value: "Every park visitor. Non-resident visitors pay international conservation tariffs; citizen/resident rates apply with valid ID.",
      },
      {
        label: "Child Discounts",
        value: "Children (typically aged 3 to 17) receive roughly 50% discount on park entry. Infants under 3 are usually free.",
      },
      {
        label: "Vehicle Fees",
        value: "Safari vehicles pay a daily transit/entry permit fee based on vehicle weight and seating capacity (always paid by VoyageMara).",
      },
      {
        label: "24-Hour Rule",
        value: "Park permits run for 24 continuous hours from the exact timestamp of entry at the gate.",
      },
    ],
    thingsToKnow: [
      {
        title: "Park Differences & County Jurisdictions",
        desc: "Maasai Mara is managed by Narok County Government (approx. $100–$200/day for non-residents depending on peak/regular season). Amboseli and Lake Nakuru are managed by KWS.",
      },
      {
        title: "Private Conservancies",
        desc: "Conservancies (Mara North, Naboisho, Olare Motorogi) charge their own conservation fees, which directly fund indigenous Maasai land leases and wildlife anti-poaching patrols.",
      },
      {
        title: "Cashless Electronic Gate Systems",
        desc: "Most Kenya parks (including KWS eCitizen gates and Sekenani/Talek gates) no longer accept physical cash. All payments must be made digitally in advance or via credit card.",
      },
      {
        title: "VoyageMara Handles All Permits",
        desc: "When booking with VoyageMara Safaris, your driver-guide handles all gate clearances and permits beforehand so you never wait in administrative lines.",
      },
    ],
    officialNotice:
      "[EDIT ME: Note that park authorities update conservation tariffs periodically. Always verify current published rates with KWS and Narok County before travel. VoyageMara includes all current fees directly in your quoted price.]",
    faqs: [
      {
        question: "Are park fees included in VoyageMara's safari quotes?",
        answer:
          "Yes! Unless explicitly requested otherwise for independent travelers, all VoyageMara packages include 100% of national reserve and conservancy fees.",
      },
      {
        question: "Do we have to pay extra if we stay inside the reserve vs outside?",
        answer:
          "Lodges located inside the reserve boundary require active 24-hour park tickets for every night of your stay. Staying just outside gates (e.g. Talek or Sekenani) can offer flexible timing on park ticket usage.",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara, please explain park fees and current rates for our planned safari dates.",
  },

  "family-safaris": {
    slug: "family-safaris",
    route: "/kenya-safaris/family-safaris",
    name: "Family Safaris",
    breadcrumbName: "Family Safaris",
    title: "Family Safaris in Kenya — Unforgettable Adventures for All Ages",
    heroSubtitle:
      "Traveling with children should be relaxing, safe, and thrilling. We design family itineraries with child-friendly lodges, flexible driving hours, and guides who love teaching young explorers.",
    seo: {
      title: "Family Safaris Kenya | Child-Friendly Wildlife Tours | VoyageMara",
      description:
        "Plan an unforgettable family safari in Kenya. Private 4x4 Land Cruisers, family suites with pools, child tracking programs, and safe, flexible itineraries.",
      keywords:
        "family safaris kenya, kenya safari with kids, child friendly safari maasai mara, voyagemara family tour",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/lions.webp",
    },
    heroImage: {
      src: "/tours/maasai-mara/lions.webp",
      placeholderFile: "images/family.jpg",
      alt: "Family watching wildlife safely from a private safari vehicle in Kenya",
    },
    features: [
      {
        title: "Exclusive Private 4x4 Cruiser",
        desc: "Your family enjoys its own vehicle: kids can stand freely on seats to look out the pop-up roof, ask endless questions without disturbing strangers, and request restroom stops whenever needed.",
      },
      {
        title: "Gentle Pace & Swimming Pools",
        desc: "Game drives are divided into engaging morning and late-afternoon sessions, leaving the hot midday hours free for lodge pool swimming, rest, and kid-friendly buffet lunches.",
      },
      {
        title: "Family Suites & Interconnecting Tents",
        desc: "We handpick lodges with spacious two-bedroom family tents, secure perimeters, and child-proof decks so parents enjoy complete peace of mind.",
      },
      {
        title: "Interactive Young Explorer Activities",
        desc: "Kids learn animal tracking, bow-and-arrow lessons, fire-making with Maasai warriors, beadwork crafting, and junior ranger certificates.",
      },
    ],
    topDestinations: [
      {
        name: "Maasai Mara National Reserve",
        reason: "Highest concentration of visible wildlife; children spot lions, giraffes, zebras, and elephants within minutes of leaving camp.",
      },
      {
        name: "Amboseli National Park",
        reason: "Huge elephant families grazing close to the vehicle with Mount Kilimanjaro in plain sight; smooth, flat tracks suitable for all ages.",
      },
      {
        name: "Lake Naivasha & Crescent Island",
        reason: "Gentle boat ride to see hippos and safe walking safari among wild giraffes, waterbucks, and zebras on foot with no predators.",
      },
    ],
    goodToKnow: [
      "Child safety seats and boosters can be arranged in our Land Cruisers upon advance request.",
      "Most safari lodges offer custom children's menus (pasta, chips, fresh fruit, mild chicken).",
      "Hot air balloon safaris have a minimum age limit of 7 years.",
      "School holidays (July–August and December) are peak family travel months; book 4 to 6 months in advance.",
    ],
    faqs: [
      {
        question: "What is the recommended minimum age for a Kenya safari?",
        answer:
          "Children aged 4 and above generally have a wonderful time, but we regularly host families with toddlers. Having a private Land Cruiser means we adapt the driving duration completely to your family's needs.",
      },
      {
        question: "Is malaria a concern for children on safari?",
        answer:
          "Higher elevation parks like Maasai Mara and central Kenya have low mosquito counts, especially during dry months. We recommend consulting your family physician for child-safe antimalarial guidance and choosing lodges with mosquito netting.",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara, I want to plan a family safari for [EDIT ME: number of adults & kids] with children aged [EDIT ME: ages]. Please share family-friendly options.",
  },

  "honeymoon-safaris": {
    slug: "honeymoon-safaris",
    route: "/kenya-safaris/honeymoon-safaris",
    name: "Honeymoon Safaris",
    breadcrumbName: "Honeymoon Safaris",
    title: "Romantic Honeymoon Safaris in Kenya (Bush & Beach)",
    heroSubtitle:
      "Celebrate your love in the wild: sunrise hot air balloon flights, candlelit dinners beneath the African stars, private plunge pools, and secluded luxury tented suites.",
    seo: {
      title: "Kenya Honeymoon Safaris | Romantic Bush & Beach Tours | VoyageMara",
      description:
        "Experience the ultimate romantic Kenya honeymoon safari. Private champagne balloon safaris, candlelit bush dinners, luxury suites, and Diani beach extensions.",
      keywords:
        "kenya honeymoon safari, romantic safari maasai mara, bush and beach kenya honeymoon, voyagemara honeymoon",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/ballon.webp",
    },
    heroImage: {
      src: "/tours/maasai-mara/ballon.webp",
      placeholderFile: "images/honeymoon.jpg",
      alt: "Couple enjoying sunrise hot air balloon flight over Maasai Mara",
    },
    romanticHighlights: [
      {
        title: "Sunrise Hot Air Balloon Flight",
        desc: "Drift silently over the savannah at dawn with your partner, descending to a freshly prepared champagne breakfast served in the middle of the Mara wild.",
      },
      {
        title: "Private Candlelit Bush Dinners",
        desc: "Dine under a canopy of southern hemisphere stars accompanied by the distant roar of lions and the soft glow of hurricane lanterns.",
      },
      {
        title: "Scenic Hilltop Sundowners",
        desc: "Sip chilled cocktails and champagne from private rocky kopjes as the golden African sun sets behind the Great Rift Valley escarpment.",
      },
      {
        title: "Couples Spa & Private Plunge Pools",
        desc: "Indulge in botanical Maasai massage treatments and private plunge pools overlooking active wildlife waterholes.",
      },
    ],
    sampleItinerary: [
      { day: "Day 1", title: "Nairobi Arrival", plan: "Meet & greet at JKIA, private transfer to boutique luxury hotel in leafy Karen/Nairobi. Relax and recover." },
      { day: "Day 2", title: "Flight to Maasai Mara", plan: "Scenic bush flight from Wilson Airport to Mara airstrip. Check into luxury tented suite with welcome bottle of champagne." },
      { day: "Day 3", title: "Sunrise Balloon Safari & Predators", plan: "Dawn hot air balloon flight, champagne bush breakfast, followed by an afternoon Big Five tracking drive." },
      { day: "Day 4", title: "Full Day Seclusion & Private Bush Dinner", plan: "Private game drive to the Mara River, picnic lunch, evening private 3-course candlelit dinner under the stars." },
      { day: "Day 5", title: "Maasai Wellbeing Spa & Culture", plan: "Couples wellness spa treatment, visit to an authentic Maasai community, and campfire stories." },
      { day: "Day 6", title: "Bush to Beach Extension (Diani or Zanzibar)", plan: "Fly back to Nairobi for onward flight, or connect directly to the white sands of Diani Beach or Zanzibar." },
    ],
    faqs: [
      {
        question: "Can we combine our safari with a beach vacation?",
        answer:
          "Yes! We frequently organize 'Bush & Beach' honeymoons combining 4–5 days in the Maasai Mara with 3–5 days at an intimate beachfront resort in Diani Beach, Watamu, or Zanzibar.",
      },
      {
        question: "Do luxury camps offer honeymoon perks?",
        answer:
          "Yes. Many of our partner camps offer complimentary champagne upon arrival, private dinner set-ups, room upgrades when available, and celebratory honeymoon cakes.",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara, we want to plan our dream honeymoon safari in Kenya. Our wedding/travel dates are [EDIT ME: dates]. Please share romantic options.",
  },

  "group-corporate-safaris": {
    slug: "group-corporate-safaris",
    route: "/kenya-safaris/group-corporate-safaris",
    name: "Group / Corporate Safaris",
    breadcrumbName: "Group & Corporate",
    title: "Group, Corporate & Incentive Safaris in Kenya",
    heroSubtitle:
      "Seamlessly organized safaris for clubs, photography tours, church missions, corporate incentives, and families traveling together — from 4 to 50+ guests.",
    seo: {
      title: "Group & Corporate Safaris Kenya | Incentive Tours | VoyageMara",
      description:
        "Professional group and corporate safari planning in Kenya: Land Cruiser convoys, team building, conference lodges, group discounts, and unified billing.",
      keywords:
        "group safaris kenya, corporate safari mara, incentive travel kenya, voyagemara group tours",
      ogImage: "https://voyagemara-adventure.vercel.app/tours/maasai-mara/maasai-mara-cover.webp",
    },
    heroImage: {
      src: "/tours/maasai-mara/maasai-mara-cover.webp",
      placeholderFile: "images/group.jpg",
      alt: "Safari Land Cruiser convoy on an organized group expedition in Kenya",
    },
    groupBenefits: [
      {
        title: "Guaranteed Window Seats for Everyone",
        desc: "We cap each Land Cruiser at 6 guests to ensure every single person has an unobstructed window view and direct access to the pop-up photography roof.",
      },
      {
        title: "Coordinated Land Cruiser Convoys",
        desc: "Our vehicles travel in synchronized convoys linked by long-range UHF radio, coordinating predator sightings in real time.",
      },
      {
        title: "Group Tier Discounts",
        desc: "Significant economies of scale for groups of 6, 12, 18 or more, with complimentary organizer spots available on qualifying group sizes.",
      },
      {
        title: "Single Dedicated Point of Contact",
        desc: "One senior VoyageMara operations manager manages your group logistics, rooming lists, dietary requirements, and flight manifests.",
      },
    ],
    corporateIncentives: [
      {
        title: "Executive Team Building & Bush Challenges",
        desc: "Engaging orienteering, bush tracking exercises, and Maasai warrior skill competitions that foster true camaraderie.",
      },
      {
        title: "Safari Conference & Meeting Lodges",
        desc: "Modern lodges equipped with high-speed internet, conference halls, audiovisual presentation systems, and quiet executive break-out decks.",
      },
      {
        title: "Corporate Social Responsibility (CSR)",
        desc: "Meaningful group visits to local community schools, solar borehole installations, and indigenous tree planting in conservancies.",
      },
      {
        title: "Formal Invoicing & Compliance",
        desc: "Itemized tax invoices, corporate receipts, and documentation formatted for corporate accounting and audit requirements.",
      },
    ],
    faqs: [
      {
        question: "What is the maximum group size VoyageMara can accommodate?",
        answer:
          "We can comfortably handle groups from 4 up to 50+ passengers with multi-vehicle 4x4 Land Cruiser fleets and chartered internal bush flights.",
      },
      {
        question: "Can we have custom branding or welcome packages for our group?",
        answer:
          "Yes. We can provide custom welcome banners, branded safari hats, embroidered fleece vests, or personalized itinerary booklets for your organization.",
      },
    ],
    whatsappMsg:
      "Hello VoyageMara, I want a group or corporate safari quote for approximately [EDIT ME: group size] guests traveling in [EDIT ME: month/dates].",
  },
};
