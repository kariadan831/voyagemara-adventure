import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaRegClock, FaWhatsapp } from "react-icons/fa";
import "./SafariDetail.css";

const SITE_URL = "https://voyagemara-adventure.vercel.app";

export default function SafariDetail({ tour }) {
  const canonical = `${SITE_URL}/safaris/${tour.slug}`;
  const images = [...new Set([tour.cover, ...tour.gallery].filter(Boolean))];
  const message = encodeURIComponent(`Hello VoyageMara, I would like to book the ${tour.title} (Duration: ${tour.duration}). Please confirm availability, quote and booking arrangements.`);
  const faqs = tour.faqs ?? [
    {
      question: `How long is the ${tour.title}?`,
      answer: `This safari is listed as ${tour.duration}. Contact VoyageMara to confirm dates, pickup arrangements and the final itinerary.`,
    },
    {
      question: `What is the starting price for the ${tour.title}?`,
      answer: `The listed starting price is US$${Number(tour.price).toLocaleString()}. Ask VoyageMara to confirm the current quote, inclusions and availability for your travel dates.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${canonical}#trip`,
        name: tour.title,
        description: tour.seoDescription ?? tour.description,
        url: canonical,
        image: images.map((image) => `${SITE_URL}${image}`),
        touristType: "Wildlife and nature travellers",
        itinerary: {
          "@type": "ItemList",
          itemListElement: tour.itinerary.map((stop, index) => ({
            "@type": "ListItem",
            position: index + 1,
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
          email: "info@voyagemara.com",
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
          priceValidUntil: "2026-12-31",
          description: `Starting price for ${tour.title}; confirm travel dates, availability and inclusions with VoyageMara Safaris.`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tour.rating || 5,
          bestRating: "5",
          worstRating: "1",
          ratingCount: 48,
          reviewCount: 48,
        },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://wa.me/254705814181?text=${message}`,
            inLanguage: "en",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          result: {
            "@type": "Reservation",
            name: `Book ${tour.title}`
          }
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Safari tours", item: `${SITE_URL}/#tours` },
          { "@type": "ListItem", position: 3, name: tour.title, item: canonical },
        ],
      },
    ],
  };

  return (
    <main className="safari-detail-page">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="safari-detail-container">
        <nav className="safari-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/#home">Home</Link><span aria-hidden="true">/</span>
          <Link to="/#tours">Safari tours</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{tour.title}</span>
        </nav>

        <header className="safari-detail-hero">
          <div className="safari-detail-copy">
            <span className="safari-detail-kicker">{tour.category} · Kenya</span>
            <h1>{tour.title}</h1>
            <p>{tour.seoDescription ?? tour.description}</p>
            <div className="safari-detail-facts">
              <span><FaRegClock aria-hidden="true" /> {tour.duration}</span>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(tour.location)}`} target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt aria-hidden="true" /> {tour.location}</a>
            </div>
            <div className="safari-detail-actions">
              <a className="safari-primary-action" href={`https://wa.me/254705814181?text=${message}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp aria-hidden="true" /> {tour.slug === "maasai-mara" ? "Book My Maasai Mara Safari" : `Book ${tour.title}`}
              </a>
              <span className="safari-starting-price">From <strong>US${Number(tour.price).toLocaleString()}</strong></span>
            </div>
            <p className="safari-price-note">Starting price shown. Confirm dates, availability, inclusions and final quote with our team.</p>
            <div className="safari-trust-badges">
              <span>✓ Instant Booking Confirmation</span>
              <span>✓ 4x4 Land Cruiser Game Drives</span>
              <span>✓ Certified Maasai Guides</span>
            </div>
          </div>
          <figure className="safari-feature-image">
            <img src={tour.cover} alt={tour.imageAlts?.[tour.cover] ?? `${tour.title} in ${tour.location}`} width="900" height="650" fetchPriority="high" />
            <figcaption>{tour.location}</figcaption>
          </figure>
        </header>

        <section className="safari-detail-section" aria-labelledby="safari-highlights-heading">
          <div className="safari-section-heading">
            <span>THE EXPERIENCE</span>
            <h2 id="safari-highlights-heading">What to look forward to</h2>
            <p>{tour.description}</p>
          </div>
          <ul className="safari-highlight-list">
            {tour.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </section>

        <section className="safari-detail-section safari-itinerary-section" aria-labelledby="safari-itinerary-heading">
          <div className="safari-section-heading">
            <span>YOUR JOURNEY</span>
            <h2 id="safari-itinerary-heading">{tour.duration} itinerary</h2>
            <p>A sample outline to help you plan. Timing and activity order may be adjusted for travel dates, weather and park conditions.</p>
          </div>
          <ol className="safari-itinerary-list">
            {tour.itinerary.map((stop, index) => (
              <li key={`${stop.day}-${stop.title}`}>
                <span className="safari-day-number">{String(index + 1).padStart(2, "0")}</span>
                <div><span className="safari-day-label">{stop.day}</span><h3>{stop.title}</h3><p>{stop.description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="safari-detail-section" aria-labelledby="safari-gallery-heading">
          <div className="safari-section-heading">
            <span>PHOTO GALLERY</span>
            <h2 id="safari-gallery-heading">A glimpse of {tour.location.split(",")[0]}</h2>
          </div>
          <div className="safari-photo-grid">
            {images.map((image) => (
              <figure key={image}>
                <img src={image} alt={tour.imageAlts?.[image] ?? `${tour.title} — ${tour.location}`} loading="lazy" decoding="async" width="700" height="480" />
              </figure>
            ))}
          </div>
        </section>

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

        <footer className="safari-detail-footer">
          <div><span>PLAN IT WITH A LOCAL TEAM</span><h2>Want to make this safari yours?</h2><p>Tell us your preferred dates and group size for a current itinerary and quote.</p></div>
          <a className="safari-primary-action" href={`https://wa.me/254705814181?text=${message}`} target="_blank" rel="noopener noreferrer">
            {tour.slug === "maasai-mara" ? "Book Maasai Mara Safari" : "Talk to VoyageMara"} <FaArrowRight aria-hidden="true" />
          </a>
        </footer>
      </div>
    </main>
  );
}
