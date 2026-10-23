import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

import tours from "./data/tours";
import { preloadSafariDetail, preloadAboutUs, preloadBooking, initIdlePreload } from "./utils/preload";

// Instant preloading with lazy fallback
const AboutUs = lazy(preloadAboutUs);
const SafariDetail = lazy(preloadSafariDetail);
const Booking = lazy(preloadBooking);
import MaasaiMaraSubPage from "./pages/MaasaiMaraSubPage";
import { MAASAI_MARA_PAGES } from "./data/maasaiMaraPagesData";
import KenyaSafarisSubPage from "./pages/KenyaSafarisSubPage";
import { KENYA_SAFARIS_PAGES } from "./data/kenyaSafarisPagesData";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Destinations from "./components/Destinations";
import About from "./components/About";
import Itineraries from "./components/Itineraries";
import Tours from "./components/Tours/Tours";
import BestTourGuide from "./components/BestTourGuide";
import SafariPricingTables from "./components/SafariPricingTables";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import MapEmbed from "./components/MapEmbed";
import ProSafariMap from "./components/ProSafariMap";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import BookingModal from "./components/BookingModal";
import SafariChatbot from "./components/SafariChatbot";
import Footer from "./components/Footer";

import { initScrollAnimations } from "./animations/scrollAnimations";

function RouteLoader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 99999,
        background: "linear-gradient(90deg, #b89a63, #edd8a6, #b89a63)",
      }}
    />
  );
}

export default function App() {
  const { pathname, hash } = useLocation();
  const [bookingModalData, setBookingModalData] = useState(null);

  const isAboutPage = pathname === "/about";
  const isBookingPage = pathname === "/booking";

  const pathParts = pathname.split("/").filter(Boolean);
  const isMaraSubPage = pathParts[0] === "safaris" && pathParts[1] === "maasai-mara" && pathParts.length > 2;
  const maraSubPageKey = isMaraSubPage ? pathParts[2] : null;
  const maraSubPageData = maraSubPageKey ? MAASAI_MARA_PAGES[maraSubPageKey] : null;

  const isKenyaSafarisSubPage = pathParts[0] === "kenya-safaris" && pathParts.length > 1;
  const kenyaSubPageKey = isKenyaSafarisSubPage ? pathParts[1] : null;
  const kenyaSubPageData = kenyaSubPageKey ? KENYA_SAFARIS_PAGES[kenyaSubPageKey] : null;

  const subPageData = maraSubPageData || kenyaSubPageData;
  const isSubPage = Boolean(subPageData);

  const requestedTourSlug = !isSubPage && pathname.startsWith("/safaris/")
    ? pathParts[1]
    : pathname === "/destinations/maasai-mara" || pathname === "/accommodation/maasai-mara"
    ? "maasai-mara"
    : null;
  const activeTour = tours.find((tour) => tour.slug === requestedTourSlug);
  const isSafariPage = Boolean(activeTour);
  const pageUrl = `https://voyagemara-adventure.vercel.app${
    subPageData
      ? subPageData.route
      : isAboutPage
      ? "/about"
      : isBookingPage
      ? "/booking"
      : isSafariPage
      ? `/safaris/${activeTour.slug}`
      : "/"
  }`;
  const pageTitle = subPageData
    ? subPageData.seo.title
    : isSafariPage
    ? activeTour.seoTitle ?? `${activeTour.title} | VoyageMara Safaris`
    : isAboutPage
    ? "About VoyageMara Safaris | Local Kenya Safari Specialists"
    : isBookingPage
    ? "Book Your Kenya Safari | Direct Operator Instant Quote | VoyageMara Safaris"
    : "Best Safari Tour Operator in Maasai Mara & Kenya Safaris | VoyageMara Safaris";
  const pageDescription = subPageData
    ? subPageData.seo.description
    : isSafariPage
    ? activeTour.seoDescription ?? activeTour.description
    : isAboutPage
    ? "Meet Duncan Ronkorua and the Nairobi-based team planning locally guided, custom 4x4 wildlife safaris across Kenya."
    : isBookingPage
    ? "Book your Kenya safari directly with TripAdvisor listed operator VoyageMara Safaris (#d34744740). Instant quotes, private 4x4 Land Cruisers, transparent pricing."
    : "Ranked among the best safari tour operators in Maasai Mara. Custom private 4x4 Land Cruiser safaris, certified native Maasai guides, Big Five game drives & all-inclusive packages.";
  const pageKeywords = subPageData
    ? subPageData.seo.keywords
    : isSafariPage
    ? `book ${activeTour.title.toLowerCase()}, kenya safari packages, ${activeTour.slug.replace(/-/g, " ")}, voyagemara contact, voyagemara safaris`
    : isBookingPage
    ? "book kenya safari, maasai mara booking, nairobi safari quote, tripadvisor kenya safari operator, voyagemara reservations"
    : "best safari tour operator in maasai mara, best tour operator maasai mara, maasai mara tour operators, kenya safari packages, book maasai mara safari, amboseli elephant tour, kenya tour operators, nairobi safari packages 2027, affordable maasai mara safari, voyagemara safaris";

  const pageImage = subPageData
    ? subPageData.seo.ogImage
    : isSafariPage
    ? `https://voyagemara-adventure.vercel.app${activeTour.cover}`
    : "https://voyagemara-adventure.vercel.app/og-image.webp";

  const handleOpenBooking = (data = {}) => {
    setBookingModalData(data || {});
  };

  const handleCloseBooking = () => {
    setBookingModalData(null);
  };

  // Preload routes and images in background on idle time
  useEffect(() => {
    initIdlePreload();
  }, []);

  // Instant scroll to top on navigation to a new page (unless targeted with anchor hash)
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (pathname !== "/") return undefined;

    const timer = setTimeout(() => {
      initScrollAnimations();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/" || !hash) return undefined;

    let secondFrame = 0;
    const frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(secondFrame);
    };
  }, [pathname, hash]);

  return (
    <>
      {/* ================= GLOBAL SEO ================= */}
      <Helmet prioritizeSeoTags>
        <html lang="en" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_KE" />
        <meta property="og:site_name" content="VoyageMara Safaris" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:alt" content={isSafariPage ? `${activeTour.title} safari in ${activeTour.location}` : "Kenya safari experiences with VoyageMara Safaris"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content={isSafariPage ? activeTour.location : "Nairobi, Kenya"} />
        <meta name="geo.position" content={isSafariPage && activeTour.geo ? `${activeTour.geo.latitude};${activeTour.geo.longitude}` : "-1.286389;36.817223"} />
        <meta name="ICBM" content={isSafariPage && activeTour.geo ? `${activeTour.geo.latitude},${activeTour.geo.longitude}` : "-1.286389,36.817223"} />
      </Helmet>

      <Navbar onOpenBooking={handleOpenBooking} />

      <main>
        <Routes>
          {/* ================= HOME PAGE ================= */}
          <Route
            path="/"
            element={
              <>
                <div className="story-section hero-story-section">
                  <Hero onOpenBooking={handleOpenBooking} />
                </div>

                <TrustStrip onOpenBooking={handleOpenBooking} />

                <div className="story-section">
                  <Destinations onOpenBooking={handleOpenBooking} />
                </div>

                <div className="story-section">
                  <Tours onOpenBooking={handleOpenBooking} />
                </div>

                <div className="story-section">
                  <About />
                </div>

                <div className="story-section">
                  <Itineraries />
                </div>

                <div className="story-section">
                  <BestTourGuide />
                </div>

                <div className="story-section">
                  <SafariPricingTables />
                </div>

                <div className="story-section">
                  <Gallery />
                </div>

                <div className="story-section">
                  <FAQ />
                </div>

                <div className="story-section">
                  <Contact />
                </div>

                <div className="story-section">
                  <MapEmbed />
                </div>
              </>
            }
          />

          {/* ================= ABOUT PAGE ================= */}
          <Route path="/about" element={<Suspense fallback={<RouteLoader />}><AboutUs /></Suspense>} />

          {/* ================= MAASAI MARA DEDICATED SUB-PAGES ================= */}
          <Route
            path="/safaris/maasai-mara/:subpage"
            element={<MaasaiMaraSubPage onOpenBooking={handleOpenBooking} />}
          />

          {/* ================= KENYA SAFARIS DEDICATED SUB-PAGES ================= */}
          <Route
            path="/kenya-safaris/:subpage"
            element={<KenyaSafarisSubPage onOpenBooking={handleOpenBooking} />}
          />

          <Route
            path="/safaris/:slug"
            element={
              activeTour ? (
                <Suspense fallback={<RouteLoader />}>
                  <SafariDetail tour={activeTour} onOpenBooking={handleOpenBooking} />
                </Suspense>
              ) : (
                <main className="safari-not-found">
                  <h1>Safari not found</h1>
                  <a href="/#tours">Browse our safari tours</a>
                </main>
              )
            }
          />

          {/* Dedicated Maasai Mara Destination & Accommodation URLs */}
          <Route
            path="/destinations/maasai-mara"
            element={
              <Suspense fallback={<RouteLoader />}>
                <SafariDetail
                  tour={tours.find((tour) => tour.slug === "maasai-mara") || tours[0]}
                  onOpenBooking={handleOpenBooking}
                />
              </Suspense>
            }
          />
          <Route
            path="/accommodation/maasai-mara"
            element={
              <Suspense fallback={<RouteLoader />}>
                <SafariDetail
                  tour={tours.find((tour) => tour.slug === "maasai-mara") || tours[0]}
                  onOpenBooking={handleOpenBooking}
                />
              </Suspense>
            }
          />

          <Route
            path="/booking"
            element={
              <Suspense fallback={<RouteLoader />}>
                <Booking />
              </Suspense>
            }
          />
        </Routes>
      </main>

      {/* FLOATING ACTION UTILITIES */}
      <ProSafariMap />
      <ScrollToTop />
      <WhatsAppButton />
      <SafariChatbot onOpenBooking={handleOpenBooking} />
      <Footer />

      {/* UNIVERSAL BOOKING MODAL */}
      <BookingModal
        isOpen={Boolean(bookingModalData)}
        onClose={handleCloseBooking}
        initialData={bookingModalData || {}}
      />
    </>
  );
}

