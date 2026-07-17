import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

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
  useEffect(() => {
    const timer = setTimeout(() => {
      initScrollAnimations();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     <Helmet prioritizeSeoTags>
  {/* ================= BASIC SEO ================= */}

  <html lang="en" />

  <title>
    VoyageMara Safaris | Luxury Kenya Safaris, Maasai Mara Tours &
    Wildlife Adventures
  </title>

  <meta
    name="description"
    content="VoyageMara Safaris offers luxury and affordable safari tours across Kenya including Maasai Mara, Amboseli, Samburu, Lake Nakuru, Lake Naivasha, Tsavo and Diani Beach. Book unforgettable wildlife adventures with professional local guides."
  />

  <meta
    name="keywords"
    content="Kenya safari, Maasai Mara safari, Amboseli safari, Samburu safari, Lake Nakuru safari, Lake Naivasha, Tsavo safari, Diani beach holiday, Kenya wildlife tours, African safari"
  />

  <meta
    name="robots"
    content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  />

  <meta name="author" content="VoyageMara Safaris" />
  <meta name="theme-color" content="#0b3d2e" />
{/* ================= PWA ================= */}

<link rel="manifest" href="/site.webmanifest" />

<meta
  name="apple-mobile-web-app-capable"
  content="yes"
/>

<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black"
/>

<meta
  name="apple-mobile-web-app-title"
  content="VoyageMara"
/>

<meta
  name="mobile-web-app-capable"
  content="yes"
/>

{/* ================= PERFORMANCE ================= */}

<link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>

<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossOrigin="anonymous"
/>
  {/* Google Search Console */}
  <meta
    name="google-site-verification"
    content="PASTE-YOUR-GOOGLE-CODE-HERE"
  />

  {/* Bing Webmaster */}
  <meta
    name="msvalidate.01"
    content="PASTE-BING-CODE-HERE"
  />

  {/* ================= CANONICAL ================= */}

  <link
    rel="canonical"
    href="https://voyagemara-adventure.vercel.app/"
  />

  {/* ================= GEO ================= */}

  <meta name="geo.region" content="KE" />
  <meta name="geo.placename" content="Nairobi" />
  <meta name="geo.position" content="-1.286389;36.817223" />
  <meta name="ICBM" content="-1.286389,36.817223" />

  {/* ================= OPEN GRAPH ================= */}

  <meta property="og:type" content="website" />

  <meta property="og:locale" content="en_US" />

  <meta property="og:site_name" content="VoyageMara Safaris" />

  <meta
    property="og:title"
    content="Luxury Kenya Safaris | VoyageMara Safaris"
  />

  <meta
    property="og:description"
    content="Discover Kenya's most spectacular safari destinations with VoyageMara Safaris."
  />

  <meta
    property="og:url"
    content="https://voyagemara-adventure.vercel.app/"
  />

  <meta
    property="og:image"
    content="https://voyagemara-adventure.vercel.app/logo.png"
  />
<meta
  property="og:image:width"
  content="1200"
/>

<meta
  property="og:image:height"
  content="630"
/>

<meta
  property="og:image:alt"
  content="VoyageMara Safaris"
/>
  {/* ================= TWITTER ================= */}

  <meta
    name="twitter:card"
    content="summary_large_image"
  />

  <meta
    name="twitter:title"
    content="VoyageMara Safaris"
  />

  <meta
    name="twitter:description"
    content="Luxury Kenya Safari Experiences."
  />

  <meta
    name="twitter:image"
    content="https://voyagemara-adventure.vercel.app/logo.png"
  />
<meta
  name="twitter:creator"
  content="@VoyageMara"
/>

<meta
  name="twitter:site"
  content="@VoyageMara"
/>
  {/* ================= SCHEMA ================= */}

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [

        {
          "@type": "Organization",
          "@id":
            "https://voyagemara-adventure.vercel.app/#organization",

          name: "VoyageMara Safaris",

          url:
            "https://voyagemara-adventure.vercel.app/",

          logo: {
            "@type": "ImageObject",
            url:
              "https://voyagemara-adventure.vercel.app/logo.png",
          },

          email: "info@voyagemara.com",

          telephone: "+254705814181",
          sameAs: [
  "https://www.facebook.com/",
  "https://www.instagram.com/",
  "https://www.linkedin.com/",
  "https://www.youtube.com/"
]
        },

        {
          "@type": "TravelAgency",

          "@id":
            "https://voyagemara-adventure.vercel.app/#travelagency",

          name: "VoyageMara Safaris",

          url:
            "https://voyagemara-adventure.vercel.app/",

          image:
            "https://voyagemara-adventure.vercel.app/logo.png",

          description:
            "Luxury safari holidays across Kenya.",

          areaServed: "Kenya",

          priceRange: "$$",
openingHours: "Mo-Su 07:00-20:00",

currenciesAccepted: "USD,KES",

paymentAccepted: "Cash, M-Pesa, Bank Transfer",

hasMap: "https://maps.google.com/",

knowsAbout: [
  "Maasai Mara",
  "Amboseli",
  "Lake Nakuru",
  "Lake Naivasha",
  "Samburu",
  "Tsavo",
  "Kenya Safaris"
],
          address: {

            "@type": "PostalAddress",

            addressCountry: "KE",

            addressLocality: "Nairobi"

          }

        },

        {
          "@type": "WebSite",

          "@id":
            "https://voyagemara-adventure.vercel.app/#website",

          url:
            "https://voyagemara-adventure.vercel.app/",

          name: "VoyageMara Safaris",

          publisher: {
            "@id":
              "https://voyagemara-adventure.vercel.app/#organization"
          },

          potentialAction: {

            "@type": "SearchAction",

            target:
              "https://voyagemara-adventure.vercel.app/?search={search_term_string}",

            "query-input":
              "required name=search_term_string"
          }

        },

        {
          "@type": "BreadcrumbList",

          itemListElement: [

            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item:
                "https://voyagemara-adventure.vercel.app/"
            },

            {
              "@type": "ListItem",
              position: 2,
              name: "Tours",
              item:
                "https://voyagemara-adventure.vercel.app/#tours"
            },

            {
              "@type": "ListItem",
              position: 3,
              name: "Gallery",
              item:
                "https://voyagemara-adventure.vercel.app/#gallery"
            },

            {
              "@type": "ListItem",
              position: 4,
              name: "Contact",
              item:
                "https://voyagemara-adventure.vercel.app/#contact"
            }

          ]

        }

      ]
    })}
  </script>
</Helmet>

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