import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaTimes,
  FaPaperPlane,
  FaWhatsapp,
  FaRobot,
  FaCompass,
  FaUndo,
  FaChevronDown,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";
import "./SafariChatbot.css";

/* ─── Safari Knowledge Base ──────────────────────────────────── */
const KNOWLEDGE = [
  {
    triggers: [
      "migration",
      "wildebeest",
      "crossing",
      "river",
      "mara river",
      "serengeti",
      "when is migration",
      "best time to see",
    ],
    response:
      "The Great Wildebeest Migration river crossings in Maasai Mara typically take place between **July and October** each year! Over 1.5 million wildebeest and zebras brave crocodile-filled crossings along the Mara and Talek rivers.\n\n" +
      "• **July–Aug**: Herds arrive from Serengeti and commence dramatic river crossings.\n" +
      "• **Sept–Oct**: Prime predator action on the golden Mara plains.\n" +
      "• **Nov**: Herds start trekking south back towards Tanzania.\n\n" +
      "Would you like recommendations on lodges near the crossing points (such as Mara Serena, Ashnil Mara, or Entim Camp)?",
    chips: ["Migration Safaris", "Lodges near River", "Book Mara Trip"],
  },
  {
    triggers: [
      "price",
      "cost",
      "how much",
      "rate",
      "package",
      "pricing",
      "expensive",
      "quote",
      "budget",
    ],
    response:
      "Our Kenya safari packages are fully customized and transparent (all 4x4 transport, Maasai guide, park fees, and full-board accommodation included):\n\n" +
      "• **3-Day Maasai Mara Big Five**: From **$620** / person\n" +
      "• **2-Day Amboseli Elephant Safari**: From **$520** / person\n" +
      "• **3-Day Samburu Northern Special Five**: From **$750** / person\n" +
      "• **1-Day Lake Nakuru Rhino Tour**: From **$450** / person\n" +
      "• **1-Day Lake Naivasha & Crescent Island**: From **$300** / person\n" +
      "• **1-Day Nairobi National Park**: From **$180** / person\n\n" +
      "We offer Budget, Mid-Range, and Luxury tiers. I can prepare a personalized quote for your travel dates and group size right now!",
    action: "openBooking",
    actionLabel: "Get a Custom Quote",
    chips: ["3-Day Maasai Mara", "Amboseli Safari", "Custom Itinerary"],
  },
  {
    triggers: [
      "park fee",
      "fees",
      "entry fee",
      "tariffs",
      "kws",
      "narok",
      "ticket",
    ],
    response:
      "Here is how Kenya park entry fees currently work:\n\n" +
      "• **Maasai Mara**: Non-resident adults are **$100/day** (Jan–June, Nov–Dec) and **$200/day** during high peak season (July–October). Children are $50/day.\n" +
      "• **Amboseli / Lake Nakuru (KWS)**: Non-resident adults are approx. **$100/day**.\n\n" +
      "💡 *Great news*: All VoyageMara safaris already include all park fees, conservancy fees, and taxes in the total package price so there are never any surprise charges at the park gate!",
    chips: ["Safari Packages", "Maasai Mara Info", "Chat on WhatsApp"],
  },
  {
    triggers: [
      "best time",
      "weather",
      "season",
      "rain",
      "rainy",
      "when to go",
      "month",
    ],
    response:
      "Kenya is a year-round wildlife destination with three distinct seasons:\n\n" +
      "1. **July – October (Peak / Migration)**: Dry weather, easy animal spotting around waterholes, and the dramatic Mara River crossings.\n" +
      "2. **December – March (Warm & Dry)**: Superb predator sightings, birthing/calving season, clear views of Mount Kilimanjaro in Amboseli.\n" +
      "3. **April – May (Green Season)**: Lush landscapes, lower lodge rates, baby animals, and zero tourist crowds.\n\n" +
      "What month are you thinking of traveling?",
    chips: ["July–Oct Migration", "December Safaris", "Plan My Dates"],
  },
  {
    triggers: [
      "pack",
      "packing",
      "what to bring",
      "clothes",
      "wear",
      "luggage",
      "dress",
    ],
    response:
      "Here are our essential packing recommendations for a Kenya safari:\n\n" +
      "• **Clothing**: Earthy neutral tones (khaki, tan, olive). Avoid bright blue/black (attracts tsetse flies). Bring light layers + a warm fleece/jacket for chilly early morning game drives.\n" +
      "• **Sun & Health**: Wide-brim safari hat, sunglasses, SPF 50+ sunscreen, insect repellent with DEET.\n" +
      "• **Gear**: Binoculars (8x42 or 10x42), camera with telephoto zoom (200-400mm), extra memory cards.\n" +
      "• **Plugs**: Kenya uses UK Type G (three rectangular pins, 240V). Our Land Cruisers have USB & 240V charging sockets!\n" +
      "• **Bags**: Soft-sided duffle bags are strongly recommended (15kg limit if taking bush flights).",
    chips: ["Safari Vehicles", "Maasai Mara Info", "Book a Safari"],
  },
  {
    triggers: [
      "vehicle",
      "land cruiser",
      "car",
      "van",
      "transport",
      "4x4",
      "jeep",
      "drive",
    ],
    response:
      "All VoyageMara safaris are conducted in **customized 4×4 Toyota Land Cruisers** designed specifically for African savannah game viewing:\n\n" +
      "• **Pop-up roof hatch** for 360° unobstructed wildlife photography\n" +
      "• **Guaranteed window seat** for every guest\n" +
      "• **Onboard charging ports** (USB + AC) for cameras and phones\n" +
      "• **Cooler box** with complimentary chilled drinking water\n" +
      "• **High-gain HF 2-way radio** connecting to our Nairobi base & park rangers\n" +
      "• Driven by licensed, native Maasai KWS-certified safari guides.",
    chips: ["View Safari Packages", "Chat with Duncan", "Get a Quote"],
  },
  {
    triggers: [
      "malaria",
      "vaccine",
      "yellow fever",
      "health",
      "safe",
      "safety",
      "water",
      "doctor",
    ],
    response:
      "Guest health and safety are our highest priorities:\n\n" +
      "• **Yellow Fever**: Proof of vaccination is required only if arriving from an endemic country.\n" +
      "• **Malaria**: Prophylaxis (e.g. Malarone or Doxycycline) is recommended by travel clinics. Safari lodges supply mosquito nets and insect repellent.\n" +
      "• **Drinking Water**: We provide unlimited sealed bottled mineral water throughout your safari — never drink tap water.\n" +
      "• **Safety**: Kenya's national parks and private conservancies are very safe and peaceful. You are always escorted by our professional guides.",
    chips: ["Family Safaris", "What to Pack", "Contact Guide"],
  },
  {
    triggers: [
      "duncan",
      "who are you",
      "guide",
      "about",
      "voyagemara",
      "local",
      "company",
    ],
    response:
      "Jambo! VoyageMara Safaris was founded by **Duncan Ronkorua**, a native Maasai safari specialist born and raised in the Maasai Mara ecosystem.\n\n" +
      "Unlike overseas booking portals, we are 100% locally owned and operated from Nairobi. Our certified Maasai guides have an innate tracking ability and deep respect for wildlife, giving you exclusive access to remote lion prides, leopard territories, and secluded river banks.",
    chips: ["Our Story", "WhatsApp Duncan", "Custom Quote"],
  },
  {
    triggers: [
      "amboseli",
      "kilimanjaro",
      "elephant",
      "elephants",
    ],
    response:
      "Amboseli National Park is world-famous for having the largest free-ranging elephant herds in Africa with breathtaking views of snow-capped **Mount Kilimanjaro**!\n\n" +
      "Our popular **2-Day Amboseli Elephant Safari** starts from **$520/person** and includes private 4x4 round-trip transport from Nairobi, full-board lodge/camp stay, observation hill walk, and sunrise game drives.",
    action: "openBooking",
    actionLabel: "Book Amboseli Safari",
    chips: ["Amboseli Details", "Maasai Mara", "Ask a Question"],
  },
  {
    triggers: [
      "samburu",
      "special 5",
      "special five",
      "north",
      "reticulated",
    ],
    response:
      "Samburu National Reserve in northern Kenya is a rugged arid wilderness famous for the **Samburu Special Five** (Grevy's zebra, reticulated giraffe, Somali ostrich, beisa oryx, and long-necked gerenuk) plus healthy leopard populations along the Ewaso Nyiro River!\n\n" +
      "Our **3-Day Samburu Safari** starts from **$750/person**.",
    chips: ["Samburu Details", "View All Packages", "Chat on WhatsApp"],
  },
  {
    triggers: [
      "book",
      "how to book",
      "deposit",
      "payment",
      "pay",
      "card",
      "mpesa",
      "m-pesa",
    ],
    response:
      "Booking with VoyageMara is straightforward and risk-free:\n\n" +
      "1. **No upfront cost** to discuss your itinerary and get a personalized quote.\n" +
      "2. Once you love your plan, a **30% deposit** secures your preferred lodges and private 4x4 Land Cruiser.\n" +
      "3. The remaining balance can be settled 30 days prior or upon arrival in Nairobi.\n" +
      "4. We accept **Credit/Debit Card (Visa/Mastercard), International Bank Wire, and M-Pesa**.\n\n" +
      "Ready to start? Fill our quick quote form or chat directly with Duncan on WhatsApp!",
    action: "openBooking",
    actionLabel: "Open Booking Form",
    chips: ["Open Booking Form", "Chat on WhatsApp", "Safari Pricing"],
  },
  {
    triggers: ["hello", "hi", "jambo", "hey", "good morning", "good evening", "greetings"],
    response:
      "Jambo! 🇰🇪 Welcome to VoyageMara Safaris. I'm Duncan's AI safari assistant.\n\n" +
      "Whether you're looking for the Great Wildebeest Migration, a Big Five safari in Maasai Mara, Amboseli elephant tours, or a custom Kenya itinerary, I'm here to help 24/7!\n\n" +
      "What kind of safari adventure are you dreaming of?",
    chips: ["Great Migration Dates", "Safari Packages & Prices", "Custom Quote"],
  },
  {
    triggers: ["thank", "thanks", "asante", "helpful", "great", "good"],
    response:
      "Asante sana! (Thank you very much!) It is our joy to assist you. If you need any more details, feel free to ask or tap below to connect directly with Duncan on WhatsApp for real-time lodge availability.",
    chips: ["Chat on WhatsApp", "Get a Quote", "Ask another question"],
  },
];

/* ─── Matcher Function ───────────────────────────────────────── */
function findBestAnswer(query) {
  const q = query.toLowerCase().trim();

  // Check direct matches
  for (const item of KNOWLEDGE) {
    for (const trigger of item.triggers) {
      if (q.includes(trigger)) {
        return item;
      }
    }
  }

  // Fallback intelligent response
  return {
    response:
      "Thank you for your question! As native Kenyan safari specialists, we can certainly arrange that for you.\n\n" +
      "Would you like to get an immediate custom quote from Duncan, or connect live via WhatsApp at **+254 705 814 181**?",
    action: "openBooking",
    actionLabel: "Request Custom Safari",
    chips: ["Safari Packages", "Wildebeest Migration", "Chat on WhatsApp"],
  };
}

export default function SafariChatbot({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Jambo! 🇰🇪 I'm Duncan, your VoyageMara safari specialist.\n\nLooking for the Great Migration, Maasai Mara Big Five tours, or current safari prices? Ask me anything!",
      chips: [
        "Wildebeest Migration?",
        "Safari Packages & Prices",
        "Park Fees Explained",
        "Request a Quote",
      ],
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
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

    // Simulate natural typing delay (450ms - 900ms)
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
    }, 650);
  };

  const handleChipClick = (chipText) => {
    if (chipText === "Chat on WhatsApp" || chipText === "WhatsApp Duncan") {
      window.open(
        "https://wa.me/254705814181?text=Hello%20VoyageMara%20Safaris!%20I'm%20chatting%20on%20your%20website%20and%20would%20like%20to%20plan%20a%20safari.",
        "_blank"
      );
      return;
    }
    if (chipText === "Request a Quote" || chipText === "Book Mara Trip" || chipText === "Open Booking Form") {
      if (onOpenBooking) onOpenBooking();
      return;
    }
    handleSend(chipText);
  };

  const handleActionClick = (action) => {
    if (action === "openBooking" && onOpenBooking) {
      onOpenBooking();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset-" + Date.now(),
        sender: "bot",
        text: "Jambo! Chat reset. How can I assist you with your Kenya safari planning?",
        chips: [
          "Wildebeest Migration?",
          "Safari Packages & Prices",
          "Park Fees Explained",
          "Request a Quote",
        ],
        time: "Just now",
      },
    ]);
  };

  return (
    <div className="sc-widget-root">
      {/* ── Floating Launcher Badge ── */}
      {!isOpen && (
        <button
          type="button"
          className="sc-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open Safari AI Assistant"
          id="safari-chat-launcher"
        >
          <div className="sc-launcher-avatar">
            <span className="sc-avatar-emoji">🦁</span>
            <span className="sc-online-pulse" />
          </div>
          <div className="sc-launcher-text">
            <span className="sc-launcher-title">Ask Safari Guide</span>
            <span className="sc-launcher-sub">Duncan · Online</span>
          </div>
          {unreadCount > 0 && <span className="sc-badge">{unreadCount}</span>}
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="sc-window" role="dialog" aria-label="Safari Assistant Chat">
          {/* Header */}
          <div className="sc-header">
            <div className="sc-header-info">
              <div className="sc-header-avatar">
                <span>🦁</span>
                <span className="sc-dot-online" />
              </div>
              <div>
                <h3 className="sc-header-name">Duncan | Safari Specialist</h3>
                <p className="sc-header-status">
                  <span className="sc-status-dot" /> Online · Typically replies instantly
                </p>
              </div>
            </div>

            <div className="sc-header-actions">
              <button
                type="button"
                className="sc-action-btn"
                onClick={handleResetChat}
                title="Restart chat"
                aria-label="Restart chat"
              >
                <FaUndo />
              </button>
              <button
                type="button"
                className="sc-action-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <FaChevronDown />
              </button>
            </div>
          </div>

          {/* Trust Banner */}
          <div className="sc-trust-banner">
            <span><FaShieldAlt /> 100% Native Maasai Guided</span>
            <span>⚡ Instant Safari Advice</span>
          </div>

          {/* Messages Area */}
          <div className="sc-messages">
            {messages.map((m) => (
              <div key={m.id} className={`sc-msg-wrap ${m.sender}`}>
                {m.sender === "bot" && <div className="sc-msg-avatar">🦁</div>}
                <div className="sc-msg-bubble">
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

                  <span className="sc-msg-time">{m.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="sc-msg-wrap bot">
                <div className="sc-msg-avatar">🦁</div>
                <div className="sc-msg-bubble sc-typing">
                  <span className="sc-dot" />
                  <span className="sc-dot" />
                  <span className="sc-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Direct WhatsApp Bar */}
          <div className="sc-wa-strip">
            <span>Want to chat live with Duncan?</span>
            <a
              href="https://wa.me/254705814181?text=Hello%20VoyageMara%20Safaris!%20I'd%20like%20to%20inquire%20about%20a%20safari."
              target="_blank"
              rel="noopener noreferrer"
              className="sc-wa-btn"
            >
              <FaWhatsapp /> WhatsApp Line
            </a>
          </div>

          {/* Input Box */}
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
              placeholder="Ask about migration, prices, parks..."
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
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
