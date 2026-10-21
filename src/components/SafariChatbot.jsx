import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaTimes,
  FaRobot,
  FaWhatsapp,
  FaCalendarCheck,
  FaCheck,
} from "react-icons/fa";
import "./SafariChatbot.css";

/* ─── Real Safari Knowledge Base & Most FAQs ────────────────────── */
const KNOWLEDGE = [
  {
    id: "packages",
    triggers: [
      "tell me about safari packages",
      "safari packages",
      "packages",
      "package",
      "itinerary",
      "itineraries",
      "wildlife",
      "cultural",
      "adventure",
      "tour",
      "tours",
      "trips",
    ],
    response:
      "We have wildlife, cultural, and adventure packages. 🚙 🦁\n\n" +
      "Here are our most popular Kenya safaris:\n\n" +
      "• **3-Day Maasai Mara Big Five Safari**: From **$620** / person. High predator action, wildebeest river crossings, native Maasai guides.\n" +
      "• **2-Day Amboseli Elephant Safari**: From **$520** / person. Massive elephant herds with breathtaking views of Mt Kilimanjaro.\n" +
      "• **4-Day Maasai Mara & Lake Nakuru**: From **$890** / person. Big cats plus rhinos and flamingos.\n" +
      "• **3-Day Samburu Northern Special Five**: From **$750** / person. Rare species (Grevy's zebra, gerenuk, oryx).\n" +
      "• **5-Day Best of Kenya Classic**: From **$1,150** / person. Mara, Nakuru & Naivasha.\n" +
      "• **Day Tours**: Nairobi National Park ($180), Lake Nakuru ($450), Lake Naivasha ($300).\n\n" +
      "All packages include a private 4x4 Land Cruiser with pop-up roof, native Maasai guide, park entrance fees, and full-board accommodation! Which package would you like to explore?",
    action: "openBooking",
    actionLabel: "Get a Custom Quote",
    chips: [
      "3-Day Maasai Mara",
      "Amboseli Elephants",
      "When is Migration?",
      "Chat on WhatsApp",
    ],
  },
  {
    id: "prices",
    triggers: [
      "price",
      "prices",
      "pricing",
      "cost",
      "how much",
      "rate",
      "rates",
      "quote",
      "quotes",
      "budget",
      "expensive",
      "cheap",
    ],
    response:
      "Our Kenya safari prices are fully transparent with zero hidden fees:\n\n" +
      "• **Budget Tier**: From **$620** / person (tented camps, full-board, private 4x4 Land Cruiser)\n" +
      "• **Mid-Range Tier**: From **$850 – $1,250** / person (comfort safari lodges & luxury tented camps)\n" +
      "• **Luxury Tier**: From **$1,600+** / person (5-star luxury lodges like Serena, Ashnil, or Entim)\n\n" +
      "✅ **What's Included in Every Package**:\n" +
      "• Private 4x4 Toyota Land Cruiser with pop-up roof\n" +
      "• KWS-certified native Maasai safari guide\n" +
      "• All park and reserve entrance fees\n" +
      "• Full-board meals (breakfast, lunch, dinner)\n" +
      "• Complimentary airport pickup in Nairobi\n" +
      "• Unlimited bottled mineral drinking water\n\n" +
      "Would you like an immediate personalized quote for your group and travel dates?",
    action: "openBooking",
    actionLabel: "Request Custom Quote",
    chips: ["Tell me about safari packages.", "Park Fees", "Chat on WhatsApp"],
  },
  {
    id: "migration",
    triggers: [
      "migration",
      "wildebeest",
      "crossing",
      "river crossing",
      "mara river",
      "serengeti",
      "when is migration",
      "best time to see migration",
    ],
    response:
      "The world-renowned Great Wildebeest Migration river crossings in Maasai Mara happen between **July and October** each year! 🦓🐊\n\n" +
      "Over 1.5 million wildebeest and zebras brave predator- and crocodile-filled crossings along the Mara and Talek rivers:\n\n" +
      "• **July – August**: Herds arrive from Tanzania's Serengeti and begin dramatic river crossings.\n" +
      "• **September – October**: Prime predator action on the golden Mara savannah.\n" +
      "• **November**: Herds start migrating south back towards the Serengeti.\n\n" +
      "Lodges near the river crossings book out quickly. We recommend reserving 3 to 6 months in advance for peak migration season!",
    action: "openBooking",
    actionLabel: "Plan Migration Safari",
    chips: ["Safari Packages", "Maasai Mara Park Fees", "WhatsApp Duncan"],
  },
  {
    id: "park_fees",
    triggers: [
      "park fee",
      "park fees",
      "entry fee",
      "fees",
      "tariffs",
      "kws",
      "narok",
      "ticket",
      "gate fee",
    ],
    response:
      "Here is how official Kenya park entry fees currently stand for 2026/2027:\n\n" +
      "• **Maasai Mara National Reserve**:\n" +
      "  - Non-resident Adults: **$100 / day** (Jan–June, Nov–Dec)\n" +
      "  - Non-resident Adults (Peak Migration): **$200 / day** (July–October)\n" +
      "  - Children (under 18): **$50 / day**\n\n" +
      "• **Amboseli & Lake Nakuru (KWS)**: Approx. **$100 / day** per non-resident adult.\n\n" +
      "💡 **Good to know**: All VoyageMara package prices ALREADY INCLUDE all park fees, conservancy fees, and government taxes. You will never pay anything extra at the park gate!",
    chips: ["Tell me about safari packages.", "Booking & Deposit", "Chat on WhatsApp"],
  },
  {
    id: "vehicles",
    triggers: [
      "vehicle",
      "vehicles",
      "land cruiser",
      "car",
      "van",
      "minivan",
      "transport",
      "4x4",
      "jeep",
      "drive",
    ],
    response:
      "All VoyageMara safaris are conducted 100% in custom-built **Toyota 4×4 Land Cruisers** designed specifically for wildlife photography:\n\n" +
      "• **Full-length pop-up roof hatch** for 360° unobstructed wildlife viewing\n" +
      "• **Guaranteed window seat** for every traveler (max 6 guests)\n" +
      "• **Onboard charging ports** (USB & 240V AC) for cameras, drones, and phones\n" +
      "• **Built-in cooler box** with complimentary chilled drinking water\n" +
      "• **High-gain HF/VHF two-way radio** connecting to park rangers and Nairobi base\n" +
      "• Superior high ground clearance for rough, muddy tracks (we do NOT use minivans!)",
    chips: ["Tell me about safari packages.", "Chat with Duncan", "Get a Quote"],
  },
  {
    id: "booking_policy",
    triggers: [
      "deposit",
      "cancellation",
      "cancel",
      "refund",
      "how to book",
      "booking policy",
      "reschedule",
      "book a safari",
    ],
    response:
      "Booking with VoyageMara is flexible and traveler-friendly:\n\n" +
      "1. **30% Deposit**: Confirms your reservation, vehicle, and lodge rooms.\n" +
      "2. **Balance**: Due 14 days before safari departure (or upon arrival in Nairobi).\n" +
      "3. **Free Rescheduling**: Move your dates at no penalty (subject to lodge availability).\n" +
      "4. **Cancellations**:\n" +
      "   - 30+ days before: **Full deposit refund**\n" +
      "   - 14–29 days before: 50% refund\n" +
      "   - Within 14 days: Non-refundable\n\n" +
      "You can book directly via WhatsApp (+254 705 814 181) or our online booking form.",
    action: "openBooking",
    actionLabel: "Open Booking Form",
    chips: ["Open Booking Form", "Payment Methods", "Chat on WhatsApp"],
  },
  {
    id: "payments",
    triggers: [
      "payment",
      "pay",
      "card",
      "credit card",
      "mpesa",
      "m-pesa",
      "bank transfer",
      "wire",
      "currency",
      "usd",
      "kes",
      "euro",
      "shillings",
    ],
    response:
      "We offer multiple safe, convenient payment options:\n\n" +
      "• **Currencies Accepted**: USD ($), EUR (€), GBP (£), and Kenyan Shillings (KES)\n" +
      "• **Payment Methods**:\n" +
      "  - Online Credit / Debit Card (Visa, MasterCard)\n" +
      "  - International Bank Wire Transfer (SWIFT)\n" +
      "  - M-Pesa Mobile Money (instant confirmation in Kenya)\n" +
      "  - Cash on arrival at our Nairobi office\n\n" +
      "Official receipts and confirmation vouchers are issued immediately upon booking.",
    chips: ["Tell me about safari packages.", "Get a Quote", "Chat on WhatsApp"],
  },
  {
    id: "best_time",
    triggers: [
      "best time",
      "weather",
      "season",
      "rain",
      "rainy",
      "when to go",
      "month",
      "months",
      "climate",
    ],
    response:
      "Kenya is an exceptional year-round safari destination:\n\n" +
      "• **July – October (Peak Migration)**: Dry season, world-famous Mara River crossings, best big cat action.\n" +
      "• **December – March (Warm & Sunny)**: Fantastic weather, newborn animals, predator hunts, clear views of Mt Kilimanjaro in Amboseli.\n" +
      "• **April – May (Green Season)**: Lush emerald landscapes, blooming flowers, lower lodge rates, baby animals, and zero tourist crowds!\n\n" +
      "What month are you thinking of traveling?",
    chips: ["July–Oct Migration", "December Safaris", "Custom Quote"],
  },
  {
    id: "packing",
    triggers: [
      "pack",
      "packing",
      "clothes",
      "wear",
      "what to bring",
      "luggage",
      "dress",
    ],
    response:
      "Here is our essential packing checklist for a Kenya safari:\n\n" +
      "• **Clothing**: Earthy neutral tones (khaki, tan, olive green). Avoid dark blue and black (attracts tsetse flies). Bring light layers + a warm fleece/jacket for chilly dawn drives (can be 12°C/54°F at 6 AM).\n" +
      "• **Sun Protection**: Wide-brim hat, UV sunglasses, SPF 50+ sunscreen.\n" +
      "• **Photography Gear**: Binoculars (8×42 or 10×42), camera with 200–400mm zoom lens, extra batteries.\n" +
      "• **Health & Toiletries**: Insect repellent with DEET, lip balm, personal medications.\n" +
      "• **Power & Bags**: UK Type G (3-pin rectangular, 240V). Soft duffle luggage is recommended for Land Cruisers.",
    chips: ["Vehicle Details", "Health & Safety", "Tell me about safari packages."],
  },
  {
    id: "health_safety",
    triggers: [
      "malaria",
      "vaccine",
      "yellow fever",
      "health",
      "safe",
      "safety",
      "water",
      "doctor",
      "medicine",
    ],
    response:
      "Guest health and safety are our highest priorities:\n\n" +
      "• **Yellow Fever**: Vaccination certificate is required ONLY if arriving from a country with risk of yellow fever transmission.\n" +
      "• **Malaria**: Prophylaxis (such as Malarone or Doxycycline) is recommended by travel clinics. All safari lodges provide mosquito nets.\n" +
      "• **Drinking Water**: We supply unlimited sealed bottled mineral water throughout your safari — never drink tap water.\n" +
      "• **Safety**: Kenya's wildlife parks are very safe and peaceful. You are always escorted by licensed native Maasai KWS guides with 24/7 radio communication.",
    chips: ["Visa Requirements", "What to Pack", "Chat on WhatsApp"],
  },
  {
    id: "visa",
    triggers: ["visa", "eta", "passport", "entry", "permit", "evisa"],
    response:
      "All international travelers visiting Kenya need an Electronic Travel Authorisation (eTA):\n\n" +
      "• **Where to apply**: Official website at **www.etakenya.go.ke** or **evisa.go.ke**\n" +
      "• **Cost**: Approx. **$35 – $51** per person\n" +
      "• **Processing Time**: Usually 3 business days (apply at least 1–2 weeks before departure)\n" +
      "• **Requirement**: Passport valid for at least 6 months, return flight ticket, and booking confirmation.",
    chips: ["Booking Confirmation", "Tell me about safari packages.", "Chat on WhatsApp"],
  },
  {
    id: "balloon",
    triggers: ["balloon", "hot air balloon", "balloon safari", "flight"],
    response:
      "The Maasai Mara Hot Air Balloon Safari is an unforgettable once-in-a-lifetime experience! 🎈🌅\n\n" +
      "• **Departure**: 5:30 AM dawn takeoff as the sun rises over the Mara savannah\n" +
      "• **Experience**: 1 hour floating silently above elephants, lions, and galloping herds\n" +
      "• **Celebration**: Smooth landing followed by a five-star **Champagne Bush Breakfast** in the wild!\n" +
      "• **Price**: Approx. **$450 – $500** per person\n\n" +
      "Can be seamlessly added to any Maasai Mara package!",
    chips: ["3-Day Maasai Mara", "Tell me about safari packages.", "WhatsApp Duncan"],
  },
  {
    id: "airport",
    triggers: [
      "airport",
      "transfer",
      "transfers",
      "pickup",
      "dropoff",
      "jkia",
      "wilson",
      "nairobi hotel",
    ],
    response:
      "Yes! We provide complimentary airport transfers:\n\n" +
      "• **Jomo Kenyatta International Airport (NBO)**: Free meet & greet on arrival.\n" +
      "• **Wilson Airport (WIL)**: Domestic bush flight connections.\n" +
      "• **Nairobi Hotels**: Free pickup and return drop-off for all safari tours.\n\n" +
      "Our driver meets you with a personalized VoyageMara name board as soon as you clear customs.",
    chips: ["Tell me about safari packages.", "Get a Quote", "Chat on WhatsApp"],
  },
  {
    id: "amboseli",
    triggers: ["amboseli", "kilimanjaro", "elephant", "elephants"],
    response:
      "Amboseli National Park is world-famous for massive free-ranging elephant herds set against the snow-capped peak of **Mount Kilimanjaro**! 🐘🏔️\n\n" +
      "Our **2-Day Amboseli Safari** starts from **$520/person** and includes private 4x4 Land Cruiser transport, full-board lodge/camp stay, Observation Hill game drives, and park fees.",
    action: "openBooking",
    actionLabel: "Book Amboseli Safari",
    chips: ["Book Amboseli", "3-Day Maasai Mara", "Custom Quote"],
  },
  {
    id: "samburu",
    triggers: [
      "samburu",
      "nakuru",
      "naivasha",
      "tsavo",
      "lake nakuru",
      "rhino",
      "flamingos",
    ],
    response:
      "We explore all of Kenya's legendary wildlife parks:\n\n" +
      "• **Samburu Reserve**: Arid northern beauty & the Special Five (Grevy's zebra, gerenuk, Somali ostrich, beisa oryx, reticulated giraffe).\n" +
      "• **Lake Nakuru**: Famous rhino sanctuary (both black and white rhinos) and flamingos.\n" +
      "• **Lake Naivasha & Hell's Gate**: Walking safaris, bicycle rides, and boat tours to Crescent Island.\n" +
      "• **Tsavo East & West**: Red dust elephants, Mzima Springs, and vast open wilderness.",
    chips: ["Tell me about safari packages.", "Lake Nakuru Tour", "Get a Quote"],
  },
  {
    id: "about_duncan",
    triggers: [
      "duncan",
      "who are you",
      "about",
      "guide",
      "voyagemara",
      "company",
      "local",
      "authentic",
    ],
    response:
      "Jambo! VoyageMara Safaris was founded by **Duncan Ronkorua**, a native Maasai safari guide born and raised in the Maasai Mara ecosystem.\n\n" +
      "Unlike foreign booking agencies, we are 100% locally owned and based right here in Nairobi, Kenya. Our guides are native Maasai KWS-certified trackers who know the bush intimately, bringing you directly to the best wildlife sightings!",
    chips: ["WhatsApp Duncan", "TripAdvisor Reviews", "Tell me about safari packages."],
  },
  {
    id: "tripadvisor",
    triggers: [
      "tripadvisor",
      "review",
      "reviews",
      "verified",
      "reputation",
      "trusted",
    ],
    response:
      "VoyageMara Safaris is an officially verified, Top-Rated tour operator on TripAdvisor (#d34744740) with 5-star traveler ratings!\n\n" +
      "You can read genuine traveler reviews from past guests who have explored Maasai Mara, Amboseli, and Samburu with Duncan and our team.",
    chips: ["Tell me about safari packages.", "Get a Quote", "Chat on WhatsApp"],
  },
  {
    id: "contact_team",
    triggers: [
      "contact",
      "whatsapp",
      "phone",
      "number",
      "email",
      "talk",
      "chat",
      "call",
      "agent",
      "human",
    ],
    response:
      "You can connect directly with our local team 24/7:\n\n" +
      "• **Lead Guide**: Duncan Ronkorua\n" +
      "• **WhatsApp / Phone**: **+254 705 814 181**\n" +
      "• **Email**: **kariadan831@gmail.com** / **info@voyagemara.com**\n" +
      "• **Office**: Nairobi, Kenya (open daily 8:00 AM – 8:00 PM EAT)\n\n" +
      "Tap below to open WhatsApp directly with Duncan!",
    action: "whatsapp",
    actionLabel: "Chat on WhatsApp Now",
    chips: ["WhatsApp Duncan", "Tell me about safari packages.", "Get a Quote"],
  },
  {
    id: "greeting",
    triggers: [
      "hello",
      "hi",
      "jambo",
      "hey",
      "good morning",
      "good evening",
      "greetings",
    ],
    response:
      "Hello! 👋 I'm your VoyageMara Safaris Assistant. How can I help you today?",
    chips: [
      "Tell me about safari packages.",
      "When is the Great Migration?",
      "Safari Prices & Quotes",
      "Maasai Mara Park Fees",
    ],
  },
  {
    id: "thanks",
    triggers: ["thank", "thanks", "asante", "helpful", "great", "awesome"],
    response:
      "Asante sana! (Thank you very much!) It is our pleasure to help you. Feel free to ask any other questions, or tap below to speak directly with Duncan on WhatsApp.",
    chips: ["Tell me about safari packages.", "Get a Quote", "Chat on WhatsApp"],
  },
];

/* ─── Intelligent Scored Query Matcher ─────────────────────────── */
function findBestAnswer(query) {
  const q = query.toLowerCase().trim();

  // 1. Exact phrase match first
  for (const item of KNOWLEDGE) {
    for (const trigger of item.triggers) {
      if (q === trigger) {
        return item;
      }
    }
  }

  // 2. Score by trigger presence and length
  let bestMatch = null;
  let bestScore = 0;

  for (const item of KNOWLEDGE) {
    let score = 0;
    for (const trigger of item.triggers) {
      if (q.includes(trigger)) {
        // Longer trigger match = higher confidence
        score += trigger.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch;
  }

  // 3. Helpful fallback response
  return {
    response:
      "Thank you for your question! As local Kenya safari specialists, we can arrange any private safari or custom tour for you.\n\n" +
      "Would you like to explore our safari packages, get an immediate custom quote, or chat directly with Duncan on WhatsApp at **+254 705 814 181**?",
    action: "openBooking",
    actionLabel: "Request Custom Safari",
    chips: [
      "Tell me about safari packages.",
      "Safari Prices & Quotes",
      "Chat on WhatsApp",
    ],
  };
}

export default function SafariChatbot({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! 👋 I'm your VoyageMara Safaris Assistant. How can I help you today?",
      chips: [
        "Tell me about safari packages.",
        "When is the Great Migration?",
        "Safari Prices & Quotes",
        "Maasai Mara Park Fees",
      ],
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, scrollToBottom]);

  const handleSend = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg = {
      id: "user-" + Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const match = findBestAnswer(text);
      const botMsg = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: match.response,
        chips: match.chips,
        action: match.action,
        actionLabel: match.actionLabel,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleChipClick = (chipText) => {
    if (chipText === "Chat on WhatsApp" || chipText === "WhatsApp Duncan") {
      window.open(
        "https://wa.me/254705814181?text=Hello%20VoyageMara%20Safaris!%20I'm%20chatting%20on%20your%20website%20and%20would%20like%20to%20plan%20a%20safari.",
        "_blank"
      );
      return;
    }
    if (
      chipText === "Get a Quote" ||
      chipText === "Custom Quote" ||
      chipText === "Open Booking Form" ||
      chipText === "Safari Prices & Quotes"
    ) {
      handleSend("How much does a safari cost?");
      return;
    }
    handleSend(chipText);
  };

  const handleActionClick = (action) => {
    if (action === "openBooking" && onOpenBooking) {
      onOpenBooking();
    } else if (action === "whatsapp") {
      window.open(
        "https://wa.me/254705814181?text=Hello%20VoyageMara%20Safaris!%20I'd%20like%20to%20inquire%20about%20a%20safari.",
        "_blank"
      );
    }
  };

  return (
    <div className="sc-widget-root">
      {/* ── Chat Window (Positioned right above launcher) ── */}
      {isOpen && (
        <div
          className="sc-window"
          role="dialog"
          aria-label="Safari Assistant Chat"
          id="safari-chat-window"
        >
          {/* Header matching Image 1: Forest green #1e5631 */}
          <div className="sc-header">
            <div className="sc-header-left">
              <div className="sc-brand-avatar" aria-hidden="true">
                <span className="sc-avatar-icon">🦁</span>
              </div>
              <div className="sc-header-meta">
                <h3 className="sc-header-title">VoyageMara Safaris</h3>
                <span className="sc-online-status">
                  <span className="sc-green-dot" /> Online
                </span>
              </div>
            </div>

            <button
              type="button"
              className="sc-close-btn"
              onClick={() => setIsOpen(false)}
              title="Close chat"
              aria-label="Close chat window"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages Area (Dark Charcoal #141414 / #181818) */}
          <div className="sc-messages">
            {messages.map((m) => (
              <div key={m.id} className={`sc-msg-wrap ${m.sender}`}>
                <div className={`sc-msg-bubble ${m.sender}`}>
                  <div className="sc-msg-text">
                    {m.text.split("\n\n").map((para, i) => (
                      <p key={i}>
                        {para.split("\n").map((line, j) => (
                          <span key={j}>
                            {line.split(/(\*\*.*?\*\*|\*.*?\*)/).map((chunk, k) => {
                              if (chunk.startsWith("**") && chunk.endsWith("**")) {
                                return <strong key={k}>{chunk.slice(2, -2)}</strong>;
                              }
                              if (chunk.startsWith("*") && chunk.endsWith("*")) {
                                return <em key={k}>{chunk.slice(1, -1)}</em>;
                              }
                              return chunk;
                            })}
                            {j < para.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>

                  {m.action && (
                    <button
                      type="button"
                      className="sc-cta-btn"
                      onClick={() => handleActionClick(m.action)}
                    >
                      {m.actionLabel || "Take Action"} →
                    </button>
                  )}

                  {m.chips && m.chips.length > 0 && (
                    <div className="sc-chips">
                      {m.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="sc-chip"
                          onClick={() => handleChipClick(chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="sc-msg-wrap bot">
                <div className="sc-msg-bubble bot sc-typing">
                  <span className="sc-dot" />
                  <span className="sc-dot" />
                  <span className="sc-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Area matching Image 1 */}
          <form
            className="sc-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="sc-input"
              aria-label="Type your safari question"
            />
            <button
              type="submit"
              className="sc-send-btn"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* ── Circular Orange Robot Launcher Button (Matching Image 1) ── */}
      <button
        type="button"
        className={`sc-orange-launcher ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Safari Assistant" : "Open Safari Assistant"}
        title="Chat with Safari Assistant"
        id="safari-chat-launcher"
      >
        <FaRobot className="sc-robot-icon" aria-hidden="true" />
      </button>
    </div>
  );
}
