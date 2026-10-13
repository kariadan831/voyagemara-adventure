import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

import tours from "./data/tours";

// Lazy-load heavy pages so the initial JS bundle stays small
const AboutUs = lazy(() => import("./pages/AboutUs"));
const SafariDetail = lazy(() => import("./pages/SafariDetail"));

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Destinations from "./components/Destinations";
import About from "./components/About";
import Itineraries from "./components/Itineraries";
import Tours from "./components/Tours/Tours";
import BestTourGuide from "./components/BestTourGuide";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import MapEmbed from "./components/MapEmbed";
import ProSafariMap from "./components/ProSafariMap";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import BookingModal from "./components/BookingModal";
import Footer from "./components/Footer";

import { initScrollAnimations } from "./animations/scrollAnimations";

export default function App() {
  const { pathname, hash } = useLocation();
  const [bookingModalData, setBookingModalData] = useState(null);

  const isAboutPage = pathname === "/about";
  const requestedTourSlug = pathname.startsWith("/safaris/")
    ? pathname.split("/").filter(Boolean)[1]
    : null;
  const activeTour = tours.find((tour) => tour.slug === requestedTourSlug);
  const isSafariPage = Boolean(activeTour);
  const pageUrl = `https://voyagemara-adventure.vercel.app${isAboutPage ? "/about" : isSafariPage ? `/safaris/${activeTour.slug}` : "/"}`;
  const pageTitle = isSafariPage
    ? activeTour.seoTitle ?? `${activeTour.title} | VoyageMara Safaris`
    : isAboutPage
    ? "About VoyageMara Safaris | Local Kenya Safari Specialists"
    : "Kenya Safari Packages & Maasai Mara Tours | VoyageMara Safaris";
  const pageDescription = isSafariPage
    ? activeTour.seoDescription ?? activeTour.description
    : isAboutPage
    ? "Meet Duncan Ronkorua and the Nairobi-based team planning locally guided, custom 4x4 wildlife safaris across Kenya."
    : "Book custom Kenya safaris with VoyageMara Safaris Nairobi. 3-day Maasai Mara Big Five game drives, Amboseli elephant tours, certified Maasai guides, and private 4x4 Land Cruisers. Inquire for 2026/2027.";
  const pageKeywords = isSafariPage
    ? `book ${activeTour.title.toLowerCase()}, kenya safari packages, ${activeTour.slug.replace(/-/g, " ")}, voyagemara contact, voyagemara safaris`
    : "kenya safari packages, maasai mara safari, book maasai mara safari, amboseli elephant tour, kenya tour operators, nairobi safari packages 2027, affordable maasai mara safari, samburu safari, voyagemara safaris";

  const pageImage = isSafariPage
    ? `https://voyagemara-adventure.vercel.app${activeTour.cover}`
    : "https://voyagemara-adventure.vercel.app/og-image.png";

  const handleOpenBooking = (data = {}) => {
    setBookingModalData(data || {});
  };

  const handleCloseBooking = () => {
    setBookingModalData(null);
  };

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
                <div className="story-section">
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
          <Route path="/about" element={<Suspense fallback={null}><AboutUs /></Suspense>} />

          <Route
            path="/safaris/:slug"
            element={
              activeTour ? (
                <Suspense fallback={null}><SafariDetail tour={activeTour} /></Suspense>
              ) : (
                <main className="safari-not-found">
                  <h1>Safari not found</h1>
                  <a href="/#tours">Browse our safari tours</a>
                </main>
              )
            }
          />

          <Route
            path="/booking"
            element={
              <Suspense fallback={null}>
                <SafariDetail
                  tour={tours.find((tour) => tour.slug === "maasai-mara") || tours[0]}
                />
              </Suspense>
            }
          />
        </Routes>
      </main>

      {/* FLOATING ACTION UTILITIES */}
      <ProSafariMap />
      <ScrollToTop />
      <WhatsAppButton />
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