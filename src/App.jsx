import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "./components/FAQ";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Itineraries from "./components/Itineraries";
import Tours from "./components/Tours";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import MapEmbed from "./components/MapEmbed";
import ProSafariMap from "./components/ProSafariMap";
import Footer from "./components/Footer";

import { initScrollAnimations } from "./animations/scrollAnimations";

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      initScrollAnimations();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     <Helmet>
  {/* ================= PRIMARY SEO ================= */}
  <title>
    VoyageMara Safaris | Kenya Luxury Safaris, Maasai Mara & Wildlife Tours
  </title>

  <meta
    name="description"
    content="Explore Kenya with VoyageMara Safaris. Book luxury and affordable safari tours to Maasai Mara, Amboseli, Lake Nakuru, Samburu, Tsavo, Diani Beach and more."
  />

  <meta
    name="keywords"
    content="Kenya Safari, Maasai Mara Safari, Amboseli Safari, Diani Beach Tours, Lake Nakuru Safari, Samburu Safari, Tsavo Safari, Luxury Safari Kenya, Wildlife Tours Kenya, VoyageMara"
  />

  <meta name="author" content="VoyageMara Safaris" />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <meta name="theme-color" content="#0b3d2e" />

  {/* ================= CANONICAL ================= */}
  <link
    rel="canonical"
    href="https://voyagemara-adventure.vercel.app/"
  />

  {/* ================= GEO ================= */}
  <meta name="geo.region" content="KE" />
  <meta name="geo.placename" content="Nairobi, Kenya" />
  <meta name="geo.position" content="-1.286389;36.817223" />
  <meta name="ICBM" content="-1.286389,36.817223" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VoyageMara Safaris" />

  <meta
    property="og:title"
    content="VoyageMara Safaris | Kenya Luxury Safari Tours"
  />

  <meta
    property="og:description"
    content="Experience unforgettable safari adventures across Kenya with VoyageMara Safaris."
  />

  <meta
    property="og:url"
    content="https://voyagemara-adventure.vercel.app/"
  />

  <meta
    property="og:image"
    content="https://voyagemara-adventure.vercel.app/logo.png"
  />

  <meta property="og:locale" content="en_US" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />

  <meta
    name="twitter:title"
    content="VoyageMara Safaris | Kenya Luxury Safari Tours"
  />

  <meta
    name="twitter:description"
    content="Luxury and affordable safari experiences across Kenya."
  />

  <meta
    name="twitter:image"
    content="https://voyagemara-adventure.vercel.app/logo.png"
  />

  {/* ================= STRUCTURED DATA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://voyagemara-adventure.vercel.app/#organization",
          name: "VoyageMara Safaris",
          url: "https://voyagemara-adventure.vercel.app/",
          logo: {
            "@type": "ImageObject",
            url: "https://voyagemara-adventure.vercel.app/logo.png",
          },
          email: "info@voyagemara.com",
          telephone: "+254705814181",
          inLanguage: "en",
          foundingLocation: {
            "@type": "Place",
            name: "Nairobi, Kenya",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+254705814181",
            contactType: "Customer Service",
            areaServed: "KE",
            availableLanguage: ["English"],
          },
          sameAs: [],
        },

        {
          "@type": "TravelAgency",
          "@id": "https://voyagemara-adventure.vercel.app/#travelagency",
          name: "VoyageMara Safaris",
          url: "https://voyagemara-adventure.vercel.app/",
          logo: "https://voyagemara-adventure.vercel.app/logo.png",
          image: "https://voyagemara-adventure.vercel.app/logo.png",
          description:
            "Luxury and affordable safari tours across Kenya including Maasai Mara, Amboseli, Lake Nakuru, Samburu, Tsavo and Diani Beach.",
          telephone: "+254705814181",
          email: "info@voyagemara.com",
          areaServed: "Kenya",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Nairobi",
            addressCountry: "KE",
          },
        },

        {
          "@type": "WebSite",
          "@id": "https://voyagemara-adventure.vercel.app/#website",
          url: "https://voyagemara-adventure.vercel.app/",
          name: "VoyageMara Safaris",
          publisher: {
            "@id":
              "https://voyagemara-adventure.vercel.app/#organization",
          },
          inLanguage: "en",
        }
      ]
    })}
  </script>
</Helmet>

      {/* ================= WEBSITE ================= */}

      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about" className="story-section">
          <About />
        </section>

        <section id="itineraries" className="story-section">
          <Itineraries />
        </section>

        <section id="tours" className="story-section">
          <Tours />
        </section>

       <section id="gallery" className="story-section">
  <Gallery />
</section>

<section id="faq" className="story-section">
  <FAQ />
</section>

<section id="contact" className="story-section">
  <Contact />
</section>

        <section id="map" className="story-section">
          <MapEmbed />
        </section>
      </main>

      <ProSafariMap />

      <Footer />
    </>
  );
} 