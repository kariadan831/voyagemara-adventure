import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaRegClock,
  FaWhatsapp,
  FaCheckCircle,
  FaTimesCircle,
  FaCar,
  FaUsers,
  FaMapSigns,
  FaPlaneDeparture,
  FaPaperPlane,
} from "react-icons/fa";
import "./SafariDetail.css";

const SITE_URL = "https://voyagemara-adventure.vercel.app";
const EMAILJS_SERVICE  = "service_egs1gmk";
const EMAILJS_TEMPLATE = "template_qmm8w9k";
const EMAILJS_KEY      = "XlvozJruwt1UBTXLu";

const DEFAULT_INCLUSIONS = [
  "Private custom Toyota 4×4 Land Cruiser with pop-up roof",
  "All national park / conservancy entrance fees",
  "Professional native Maasai driver-guide",
  "Full-board accommodation (meals as per itinerary)",
  "Daily morning & afternoon game drives",
  "Bottled drinking water throughout",
  "Nairobi hotel pickup & drop-off",
  "24/7 WhatsApp support from VoyageMara team",
];

const DEFAULT_EXCLUSIONS = [
  "International & domestic flights",
  "Kenya e-Visa (US $51 – apply at evisa.go.ke)",
  "Travel insurance (recommended)",
  "Laundry, alcoholic beverages & personal expenses",
  "Optional balloon safari (Maasai Mara ~US $450 pp)",
  "Gratuities / tips for guide & camp staff",
];

export default function SafariDetail({ tour }) {
  const canonical = `${SITE_URL}/safaris/${tour.slug}`;
  const images = [...new Set([tour.cover, ...tour.gallery].filter(Boolean))];
  const message = encodeURIComponent(
    `Hello VoyageMara, I would like to enquire about the ${tour.title} (Duration: ${tour.duration}). Please confirm availability, pricing and booking details.`
  );

  const inclusions = tour.inclusions ?? DEFAULT_INCLUSIONS;
  const exclusions = tour.exclusions ?? DEFAULT_EXCLUSIONS;

  const faqs = tour.faqs ?? [
    {
      question: `How long is the ${tour.title}?`,
      answer: `This safari is listed as ${tour.duration}. Contact VoyageMara to confirm dates, pickup arrangements and the final itinerary.`,
    },
    {
      question: `What is the starting price for the ${tour.title}?`,
      answer: `The listed starting price is US$${Number(tour.price).toLocaleString()}. Ask VoyageMara to confirm the current quote, inclusions and availability for your travel dates.`,
    },
    {
      question: "What vehicle will we travel in?",
      answer:
        "All VoyageMara game drives use a custom Toyota 4×4 Land Cruiser fitted with a pop-up roof for unobstructed wildlife photography, UHF radio communication, USB charging sockets, and a cooler box.",
    },
    {
      question: "What is your booking deposit and cancellation policy?",
      answer:
        "A 30% deposit secures your safari dates. The remaining 70% is due 14 days before departure. Cancellations made 30+ days before departure receive a full deposit refund. Cancellations 14–29 days prior forfeit 50% of the deposit. Cancellations within 14 days of departure are non-refundable. Rescheduling is available at no penalty subject to availability.",
    },
  ];

  // Quick enquiry form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", guests: "2", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEnquiry = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true);
    setSendError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          safari_package: tour.title,
          travel_date: form.date,
          guests: form.guests,
          full_name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          message: form.message || `Enquiry for ${tour.title}`,
          accommodation: "To be confirmed",
          budget: "To be confirmed",
        },
        EMAILJS_KEY
      );
      setSent(true);
    } catch {
      setSendError("Could not send — please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  const waMessage = encodeURIComponent(
    `Hi VoyageMara! I'd like to enquire about the ${tour.title}.\n\nName: ${form.name || "—"}\nDate: ${form.date || "—"}\nGuests: ${form.guests}\nPhone: ${form.phone || "—"}`
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${canonical}#trip`,
        name: tour.title,
        description: tour.seoDescription ?? tour.description,
        url: canonical,
        image: images.map((img) => `${SITE_URL}${img}`),
        touristType: "Wildlife and nature travellers",
        itinerary: {
          "@type": "ItemList",
          itemListElement: tour.itinerary.map((stop, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${stop.day}: ${stop.title}`,
            description: stop.description,
          })),
        },
        provider: {
          "@type": "TravelAgency",
          "@id": `${SITE_URL}/#organization`,
          name: "VoyageMara Safaris",
          url: `${SITE_URL}/`,
          telephone: "+254705814181",
          email: "kariadan831@gmail.com",
        },
        location: {
          "@type": "Place",
          name: tour.location,
          address: { "@type": "PostalAddress", addressCountry: "KE" },
          ...(tour.geo && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: tour.geo.latitude,
              longitude: tour.geo.longitude,
            },
          }),
        },
        offers: {
          "@type": "Offer",
          url: canonical,
          price: tour.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          validFrom: "2024-01-01",
          priceValidUntil: "2027-12-31",
          description: `Starting price for ${tour.title}; confirm travel dates, availability and inclusions with VoyageMara Safaris.`,
        },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://wa.me/254705814181?text=${message}`,
            inLanguage: "en",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          result: { "@type": "Reservation", name: `Book ${tour.title}` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Safari tours", item: `${SITE_URL}/#tours` },
          { "@type": "ListItem", position: 3, name: tour.title, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className="safari-detail-page">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="safari-detail-container">
        {/* BREADCRUMBS */}
        <nav className="safari-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/#home">Home</Link><span aria-hidden="true">/</span>
          <Link to="/#tours">Safari tours</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{tour.title}</span>
        </nav>

        {/* HERO HEADER */}
        <header className="safari-detail-hero">
          <div className="safari-detail-copy">
            <span className="safari-detail-kicker">{tour.category} · Kenya</span>
            <h1>{tour.title}</h1>
            <p>{tour.seoDescription ?? tour.description}</p>

            {/* QUICK TRIP FACTS BAR */}
            <div className="safari-trip-facts">
              <div className="safari-trip-fact">
                <FaRegClock aria-hidden="true" />
                <span className="stf-label">Duration</span>
                <span className="stf-value">{tour.duration}</span>
              </div>
              <div className="safari-trip-fact">
                <FaMapMarkerAlt aria-hidden="true" />
                <span className="stf-label">Destination</span>
                <span className="stf-value">{tour.location.split(",")[0]}</span>
              </div>
              <div className="safari-trip-fact">
                <FaCar aria-hidden="true" />
                <span className="stf-label">Vehicle</span>
                <span className="stf-value">Private 4×4 Land Cruiser</span>
              </div>
              <div className="safari-trip-fact">
                <FaMapSigns aria-hidden="true" />
                <span className="stf-label">Departs from</span>
                <span className="stf-value">Nairobi, Kenya</span>
              </div>
            </div>

            <div className="safari-detail-actions">
              <a
                className="safari-primary-action"
                href={`https://wa.me/254705814181?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden="true" />
                {tour.slug === "maasai-mara" ? "Book My Maasai Mara Safari" : `Book ${tour.title}`}
              </a>
              <span className="safari-starting-price">
                From <strong>US${Number(tour.price).toLocaleString()}</strong>
              </span>
            </div>
            <p className="safari-price-note">
              Starting price shown. Confirm dates, group size, accommodation tier and final quote with our team.
            </p>

            <div className="safari-trust-badges">
              <span>✓ Instant Booking Confirmation</span>
              <span>✓ 4×4 Pop-Up Roof Land Cruiser</span>
              <span>✓ Certified Maasai Guides</span>
            </div>
          </div>

          <figure className="safari-feature-image">
            <img
              src={tour.cover}
              alt={tour.imageAlts?.[tour.cover] ?? `${tour.title} in ${tour.location}`}
              width="900"
              height="650"
              fetchPriority="high"
            />
            <figcaption>{tour.location}</figcaption>
          </figure>
        </header>

        {/* VEHICLE & GUIDE GUARANTEE BANNER */}
        <div className="safari-vehicle-banner" role="note" aria-label="Vehicle and guide guarantee">
          <div className="svb-icon">
            <FaCar />
          </div>
          <div className="svb-body">
            <strong>Vehicle &amp; Guide Guarantee</strong>
            <p>
              Every VoyageMara game drive uses a <em>custom Toyota Land Cruiser 4×4</em> — fitted with a
              full-length pop-up roof for 360° photography, UHF radio, USB charging sockets, first-aid
              kit, and a cooler box. Your dedicated native Maasai driver-guide holds a Kenya Wildlife
              Service (KWS) certification and speaks English.
            </p>
          </div>
          <div className="svb-specs">
            <span><FaCar aria-hidden="true" /> Pop-Up Roof 4×4</span>
            <span><FaUsers aria-hidden="true" /> Max 6 Guests</span>
            <span><FaPlaneDeparture aria-hidden="true" /> Airport Transfers</span>
          </div>
        </div>

        {/* INCLUSIONS & EXCLUSIONS */}
        <section className="safari-detail-section safari-inclusions-section" aria-labelledby="safari-inclusions-heading">
          <div className="safari-inclusions-grid">
            <div className="safari-inc-col">
              <h2 id="safari-inclusions-heading">
                <FaCheckCircle className="inc-icon inc-icon--yes" aria-hidden="true" /> What&apos;s Included
              </h2>
              <ul className="safari-inc-list safari-inc-list--yes">
                {inclusions.map((item) => (
                  <li key={item}>
                    <FaCheckCircle aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="safari-inc-col">
              <h2>
                <FaTimesCircle className="inc-icon inc-icon--no" aria-hidden="true" /> Not Included
              </h2>
              <ul className="safari-inc-list safari-inc-list--no">
                {exclusions.map((item) => (
                  <li key={item}>
                    <FaTimesCircle aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="safari-detail-section" aria-labelledby="safari-highlights-heading">
          <div className="safari-section-heading">
            <span>THE EXPERIENCE</span>
            <h2 id="safari-highlights-heading">What to look forward to</h2>
            <p>{tour.description}</p>
          </div>
          <ul className="safari-highlight-list">
            {tour.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        {/* ITINERARY */}
        <section className="safari-detail-section safari-itinerary-section" aria-labelledby="safari-itinerary-heading">
          <div className="safari-section-heading">
            <span>YOUR JOURNEY</span>
            <h2 id="safari-itinerary-heading">{tour.duration} itinerary</h2>
            <p>
              A sample outline to help you plan. Timing and activity order may be adjusted for travel
              dates, weather and park conditions.
            </p>
          </div>
          <ol className="safari-itinerary-list">
            {tour.itinerary.map((stop, i) => (
              <li key={`${stop.day}-${stop.title}`}>
                <span className="safari-day-number">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <span className="safari-day-label">{stop.day}</span>
                  <h3>{stop.title}</h3>
                  <p>{stop.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* GALLERY */}
        <section className="safari-detail-section" aria-labelledby="safari-gallery-heading">
          <div className="safari-section-heading">
            <span>PHOTO GALLERY</span>
            <h2 id="safari-gallery-heading">A glimpse of {tour.location.split(",")[0]}</h2>
          </div>
          <div className="safari-photo-grid">
            {images.map((img) => (
              <figure key={img}>
                <img
                  src={img}
                  alt={tour.imageAlts?.[img] ?? `${tour.title} — ${tour.location}`}
                  loading="lazy"
                  decoding="async"
                  width="700"
                  height="480"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="safari-detail-section safari-faq-section" aria-labelledby="safari-faq-heading">
          <div className="safari-section-heading">
            <span>GOOD TO KNOW</span>
            <h2 id="safari-faq-heading">Questions about this safari</h2>
          </div>
          <div className="safari-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* EMBEDDED QUICK ENQUIRY FORM */}
        <section className="safari-detail-section safari-enquiry-section" aria-labelledby="safari-enquiry-heading">
          <div className="safari-section-heading">
            <span>GET A QUOTE</span>
            <h2 id="safari-enquiry-heading">Enquire about this safari</h2>
            <p>Send us your travel dates and we&apos;ll confirm availability and pricing within a few hours.</p>
          </div>

          <div className="safari-enquiry-card">
            {sent ? (
              <div className="safari-enquiry-success">
                <FaCheckCircle aria-hidden="true" />
                <p>
                  <strong>Enquiry sent!</strong> Our team will reply to your email within a few hours.
                  For instant answers, WhatsApp us:
                </p>
                <a
                  className="safari-primary-action"
                  href={`https://wa.me/254705814181?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
                </a>
              </div>
            ) : (
              <form className="safari-enquiry-form" onSubmit={handleEnquiry} noValidate>
                <div className="sef-row">
                  <label htmlFor="sd-ename">
                    Full name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="sd-ename"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Johnson"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="sef-row">
                  <label htmlFor="sd-email">
                    Email address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="sd-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="sef-grid">
                  <div className="sef-row">
                    <label htmlFor="sd-phone">WhatsApp / phone</label>
                    <input
                      id="sd-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 555 000 0000"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="sef-row">
                    <label htmlFor="sd-date">Preferred travel date</label>
                    <input
                      id="sd-date"
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="sef-row">
                    <label htmlFor="sd-guests">Number of travellers</label>
                    <select id="sd-guests" name="guests" value={form.guests} onChange={handleChange}>
                      {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
                        <option key={n} value={n}>{n} {n === "1" ? "traveller" : "travellers"}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sef-row">
                  <label htmlFor="sd-msg">Special requests or questions</label>
                  <textarea
                    id="sd-msg"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="E.g. wheelchair accessibility, honeymoon, dietary needs…"
                  />
                </div>

                {sendError && <p className="sef-error">{sendError}</p>}

                <div className="sef-actions">
                  <button type="submit" className="sef-submit" disabled={sending}>
                    {sending ? "Sending…" : (
                      <><FaPaperPlane aria-hidden="true" /> Send Enquiry</>
                    )}
                  </button>
                  <span className="sef-divider">or</span>
                  <a
                    className="sef-whatsapp"
                    href={`https://wa.me/254705814181?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp aria-hidden="true" /> WhatsApp Us
                  </a>
                </div>

                <p className="sef-note">
                  Safari: <strong>{tour.title}</strong> · {tour.duration} from Nairobi
                </p>
              </form>
            )}
          </div>
        </section>

        {/* FOOTER CTA */}
        <footer className="safari-detail-footer">
          <div>
            <span>PLAN IT WITH A LOCAL TEAM</span>
            <h2>Want to make this safari yours?</h2>
            <p>Tell us your preferred dates and group size for a current itinerary and quote.</p>
          </div>
          <a
            className="safari-primary-action"
            href={`https://wa.me/254705814181?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tour.slug === "maasai-mara" ? "Book Maasai Mara Safari" : "Talk to VoyageMara"}{" "}
            <FaArrowRight aria-hidden="true" />
          </a>
        </footer>
      </div>
    </main>
  );
}
