import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaWhatsapp,
  FaUsers,
  FaHeart,
  FaChild,
  FaDollarSign,
} from "react-icons/fa";
import { KENYA_SAFARIS_PAGES } from "../data/kenyaSafarisPagesData";
import PageHero from "../components/safari-pages/PageHero";
import PageTrustStrip from "../components/safari-pages/PageTrustStrip";
import SubPageNav from "../components/safari-pages/SubPageNav";
import PricingCards from "../components/safari-pages/PricingCards";
import FaqAccordion from "../components/safari-pages/FaqAccordion";
import ReviewsGrid from "../components/safari-pages/ReviewsGrid";
import QuoteForm from "../components/safari-pages/QuoteForm";
import CtaBand from "../components/safari-pages/CtaBand";
import "./KenyaSafarisSubPage.css";

export default function KenyaSafarisSubPage({ pageKey: propKey, onOpenBooking }) {
  const params = useParams();
  const pageKey = propKey || params.subpage || "book-a-safari";
  const page = KENYA_SAFARIS_PAGES[pageKey] || KENYA_SAFARIS_PAGES["book-a-safari"];

  const canonical = `https://voyagemara-adventure.vercel.app${page.route}`;

  // Structured Data (JSON-LD)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voyagemara-adventure.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Kenya", item: "https://voyagemara-adventure.vercel.app/#destinations" },
      { "@type": "ListItem", position: 3, name: "Kenya Safaris", item: "https://voyagemara-adventure.vercel.app/kenya-safaris/all-safari-packages" },
      { "@type": "ListItem", position: 4, name: page.breadcrumbName, item: canonical },
    ],
  };

  const faqSchema = page.faqs && page.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  } : null;

  return (
    <div className="vm-kenya-subpage-root">
      {/* ── SEO METADATA ── */}
      <Helmet prioritizeSeoTags>
        <title>{page.seo.title}</title>
        <meta name="description" content={page.seo.description} />
        <meta name="keywords" content={page.seo.keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VoyageMara Safaris" />
        <meta property="og:title" content={page.seo.title} />
        <meta property="og:description" content={page.seo.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={page.seo.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.seo.title} />
        <meta name="twitter:description" content={page.seo.description} />
        <meta name="twitter:image" content={page.seo.ogImage} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      {/* ── 1. HERO BANNER + BREADCRUMBS ── */}
      <PageHero
        title={page.title}
        subtitle={page.heroSubtitle}
        breadcrumbSection="Kenya Safaris"
        breadcrumbSectionLink="/kenya-safaris/all-safari-packages"
        breadcrumbPage={page.breadcrumbName}
        imageSrc={page.heroImage?.src}
        imageAlt={page.heroImage?.alt}
        placeholderFile={page.heroImage?.placeholderFile}
        onOpenBooking={onOpenBooking}
        whatsappMsg={page.whatsappMsg}
      />

      {/* ── 2. TRUST STRIP (5.0 TripAdvisor, 1,152 Reviews, etc.) ── */}
      <PageTrustStrip />

      <main className="vm-subpage-main-wrap">
        <div className="vm-subpage-container">
          {/* ── 3. SUBPAGE QUICK CATEGORY NAVIGATION ── */}
          <SubPageNav
            pages={Object.values(KENYA_SAFARIS_PAGES)}
            currentSlug={page.slug}
            label="Kenya Safari Categories"
          />

          {/* ── 4. PAGE-SPECIFIC RICH CONTENT ── */}

          {/* ════════ A. BOOK A SAFARI (INSTANT QUOTE) ════════ */}
          {page.slug === "book-a-safari" && (
            <div className="vm-page-block">
              <section className="vm-content-section">
                <h2 className="vm-section-title">How Getting Your Quote Works</h2>
                <div className="vm-steps-grid">
                  {page.howItWorks.map((step, i) => (
                    <div key={i} className="vm-step-card">
                      <span className="vm-step-badge">{step.step}</span>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="vm-content-section">
                <h2 className="vm-section-title">Details That Help Us Quote Faster</h2>
                <div className="vm-info-grid">
                  {page.helpfulDetails.map((item, i) => (
                    <div key={i} className="vm-info-card">
                      <h4><FaCheckCircle className="vm-ico-green" /> {item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ════════ B. ALL SAFARI PACKAGES ════════ */}
          {page.slug === "all-safari-packages" && (
            <div className="vm-page-block">
              <section className="vm-content-section">
                <h2 className="vm-section-title">Verified Kenya Safari Packages</h2>
                <p className="vm-section-lead">
                  Every package includes a dedicated 4x4 Toyota Land Cruiser, fuel, KWS/County gate clearances, full-board accommodation, and native Maasai tracker-guides.
                </p>

                <div className="vm-table-responsive">
                  <table className="vm-data-table">
                    <thead>
                      <tr>
                        <th>Package Name</th>
                        <th>Duration</th>
                        <th>Expedition Highlights</th>
                        <th>Best Suited For</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.packagesTable.map((pkg, i) => (
                        <tr key={i}>
                          <td><strong>{pkg.name}</strong></td>
                          <td className="vm-cell-tag">{pkg.duration}</td>
                          <td>{pkg.highlights}</td>
                          <td><em>{pkg.bestFor}</em></td>
                          <td>
                            <Link to={pkg.link} className="vm-btn-table-action">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {page.gallery && (
                <section className="vm-content-section">
                  <h2 className="vm-section-title">Circuit Highlights Gallery</h2>
                  <div className="vm-photo-grid-3">
                    {page.gallery.map((img, i) => (
                      <div key={i} className="vm-photo-card">
                        <img src={img.src} alt={img.alt} loading="lazy" />
                        <span className="vm-photo-caption">{img.caption}</span>
                        {img.placeholderFile && (
                          <span className="vm-placeholder-tag">{img.placeholderFile}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* ════════ C. KENYA SAFARI PRICING ════════ */}
          {page.slug === "pricing" && (
            <div className="vm-page-block">
              <section className="vm-content-section">
                <h2 className="vm-section-title">What Affects Safari Pricing</h2>
                <div className="vm-info-grid">
                  {page.costFactors.map((factor, i) => (
                    <div key={i} className="vm-info-card">
                      <h4><FaDollarSign className="vm-ico-gold" /> {factor.title}</h4>
                      <p>{factor.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="vm-content-section">
                <h2 className="vm-section-title">Safari Tier Starting Rates</h2>
                <p className="vm-section-lead">
                  Prices below are per person sharing based on 2–6 guests in a private 4x4 Land Cruiser. All prices can be edited directly in <code className="vm-inline-code">kenyaSafarisPagesData.js</code>.
                </p>

                {/* PRICING CARDS COMPONENT */}
                <PricingCards cards={page.pricingCards} onOpenBooking={onOpenBooking} />
              </section>

              <section className="vm-content-section">
                <h2 className="vm-section-title">Standard Inclusions &amp; Exclusions</h2>
                <div className="vm-inclusions-grid">
                  <div className="vm-inc-box">
                    <h4><FaCheck className="vm-ico-green" /> What is Usually Included</h4>
                    <ul>
                      {page.includedList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="vm-inc-box not-inc">
                    <h4><FaTimes className="vm-ico-red" /> What is Usually Not Included</h4>
                    <ul>
                      {page.notIncludedList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ════════ D. PARK FEES EXPLAINED ════════ */}
          {page.slug === "park-fees-explained" && (
            <div className="vm-page-block">
              <section className="vm-content-section">
                <h2 className="vm-section-title">Key Facts About Kenya Park Tariffs</h2>
                <div className="vm-facts-grid-4">
                  {page.facts.map((fact, i) => (
                    <div key={i} className="vm-fact-card">
                      <span className="vm-fact-lbl">{fact.label}</span>
                      <p className="vm-fact-val">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="vm-content-section">
                <h2 className="vm-section-title">Essential Things to Know</h2>
                <div className="vm-info-grid">
                  {page.thingsToKnow.map((item, i) => (
                    <div key={i} className="vm-info-card">
                      <h4><FaInfoCircle className="vm-ico-gold" /> {item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="vm-notice-callout">
                  <FaShieldAlt className="vm-notice-ico" />
                  <div>
                    <strong>Official Tariff Updates Notice:</strong>
                    <p>{page.officialNotice}</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ════════ E. FAMILY SAFARIS ════════ */}
          {page.slug === "family-safaris" && (
            <div className="vm-page-block">
              <section className="vm-content-section">
                <h2 className="vm-section-title">Made for Families &amp; Young Explorers</h2>
                <div className="vm-info-grid">
                  {page.features.map((feat, i) => (
                    <div key={i} className="vm-info-card">
                      <h4><FaChild className="vm-ico-green" /> {feat.title}</h4>
                      <p>{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="vm-content-section">
                <h2 className="vm-section-title">Best Kenya Destinations for Kids</h2>
                <div className="vm-dest-grid">
                  {page.topDestinations.map((dest, i) => (
                    <div key={i} className="vm-dest-card">
                      <h4><FaMapMarkerAlt className="vm-ico-gold" /> {dest.name}</h4>
                      <p>{dest.reason}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="vm-content-section">
                <h2 className="vm-section-title">Good to Know for Parents</h2>
                <ul className="vm-bullet-card-list">
                  {page.goodToKnow.map((tip, i) => (
                    <li key={i}><FaCheck className="vm-ico-green" /> {tip}</li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {/* ════════ F. HONEYMOON SAFARIS ════════ */}
          {page.slug === "honeymoon-safaris" && (
            <div className="vm-page-block">
              <section className="vm-content-section">
                <h2 className="vm-section-title">Unforgettable Romantic Moments</h2>
                <div className="vm-info-grid">
                  {page.romanticHighlights.map((hl, i) => (
                    <div key={i} className="vm-info-card">
                      <h4><FaHeart className="vm-ico-red" /> {hl.title}</h4>
                      <p>{hl.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="vm-content-section">
                <h2 className="vm-section-title">Sample 6-Day Bush &amp; Beach Honeymoon</h2>
                <div className="vm-table-responsive">
                  <table className="vm-data-table">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Destination</th>
                        <th>Romantic Highlights &amp; Activities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.sampleItinerary.map((day, i) => (
                        <tr key={i}>
                          <td className="vm-cell-tag">{day.day}</td>
                          <td><strong>{day.title}</strong></td>
                          <td>{day.plan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {/* ════════ G. GROUP / CORPORATE SAFARIS ════════ */}
          {page.slug === "group-corporate-safaris" && (
            <div className="vm-page-block">
              <section className="vm-content-section">
                <h2 className="vm-section-title">Group Safari Benefits</h2>
                <div className="vm-info-grid">
                  {page.groupBenefits.map((item, i) => (
                    <div key={i} className="vm-info-card">
                      <h4><FaUsers className="vm-ico-gold" /> {item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="vm-content-section">
                <h2 className="vm-section-title">Corporate &amp; Incentive Safaris</h2>
                <div className="vm-info-grid">
                  {page.corporateIncentives.map((item, i) => (
                    <div key={i} className="vm-info-card">
                      <h4><FaShieldAlt className="vm-ico-green" /> {item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ── 5. REVIEWS SECTION (From sharedReviewsData) ── */}
          <ReviewsGrid title="What Our Safari Guests Say" />

          {/* ── 6. FAQ ACCORDION ── */}
          {page.faqs && page.faqs.length > 0 && (
            <FaqAccordion items={page.faqs} title="Frequently Asked Questions" />
          )}

          {/* ── 7. INTERACTIVE QUOTE FORM (WhatsApp Pre-fill) ── */}
          <QuoteForm
            defaultSafariType={page.name}
            title={`Get Your Free Quote for ${page.name}`}
          />
        </div>
      </main>

      {/* ── 8. FINAL CALL-TO-ACTION BAND (WhatsApp & Call) ── */}
      <CtaBand
        title="Get Your Free Safari Quote"
        subtitle="Speak directly with Duncan Ronkorua and our Nairobi safari operations team. Instant answers, itemized quotes, and zero middleman markup."
      />
    </div>
  );
}
