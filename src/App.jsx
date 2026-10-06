import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import AboutUs from "./pages/AboutUs";
import SafariDetail from "./pages/SafariDetail";
import tours from "./data/tours";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Itineraries from "./components/Itineraries";
import Tours from "./components/Tours/Tours";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import MapEmbed from "./components/MapEmbed";
import ProSafariMap from "./components/ProSafariMap";
import Footer from "./components/Footer";

import { initScrollAnimations } from "./animations/scrollAnimations";


export default function App() {


  const { pathname, hash } = useLocation();
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
    ? "About VoyageMara Safaris | Kenya Safari Experts"
    : "Book Maasai Mara Safaris & Kenya Tours | VoyageMara Safaris";
  const pageDescription = isSafariPage
    ? activeTour.seoDescription ?? activeTour.description
    : isAboutPage
    ? "Meet the Nairobi-based team planning locally guided, tailor-made wildlife journeys across Kenya."
    : "Book your Maasai Mara safari with VoyageMara Safaris. Handcrafted 3-day Big Five wildlife game drives, Great Migration safaris, luxury tented camps, and custom Kenya safari packages. Reserve your safari today.";
  const pageKeywords = isSafariPage
    ? `book ${activeTour.title.toLowerCase()}, ${activeTour.title.toLowerCase()}, ${activeTour.slug.replace(/-/g, " ")}, kenya safari booking, voyagemara safaris`
    : "book my maasai mara, book maasai mara safari, maasai mara safari booking, masai mara tour packages, 3 days maasai mara safari, kenya safari booking, voyagemara safaris, best maasai mara tours";
  const pageImage = isSafariPage
    ? `https://voyagemara-adventure.vercel.app${activeTour.cover}`
    : "https://voyagemara-adventure.vercel.app/og-image.png";

  useEffect(() => {
    if (pathname !== "/") return undefined;

    const timer = setTimeout(() => {

      initScrollAnimations();

    },300);


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


      {/* KEEP YOUR CURRENT HELMET SEO CODE HERE */}

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



    <Navbar />



    <main>


      <Routes>


        {/* ================= HOME PAGE ================= */}

        <Route

        path="/"

        element={

          <>


          <div className="story-section">

            <Hero />

          </div>



          <div className="story-section">

            <About />

          </div>




          <div className="story-section">

            <Itineraries />

          </div>




          <div className="story-section">

            <Tours />

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


        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/safaris/:slug"
          element={
            activeTour ? (
              <SafariDetail tour={activeTour} />
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
            <SafariDetail
              tour={tours.find((tour) => tour.slug === "maasai-mara") || tours[0]}
            />
          }
        />



      </Routes>



    </main>



    <ProSafariMap />

    <Footer />


    </>

  );

}