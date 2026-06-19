import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import MapEmbed from "./components/MapEmbed";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tours from "./components/Tours";
import Gallery from "./components/Gallery";
import Itineraries from "./components/Itineraries";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProSafariMap from "./components/ProSafariMap";
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
        {/* ================= SEO ================= */}
        <title>VoyageMara Safaris | Maasai Mara & Kenya Wildlife Tours</title>

        <meta
          name="description"
          content="Explore Maasai Mara, Amboseli, Nakuru & Kenya safari tours with VoyageMara. Book affordable and luxury wildlife experiences with expert guides."
        />

        <meta
          name="keywords"
          content="Maasai Mara safari, Kenya safari tours, wildlife safari Kenya, Amboseli, Nakuru flamingos, safari booking Kenya"
        />

        <meta name="author" content="VoyageMara Safaris" />

        {/* ================= GEO TAGS ================= */}
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Maasai Mara, Kenya" />
        <meta name="geo.position" content="-1.4061;35.0081" />
        <meta name="ICBM" content="-1.4061, 35.0081" />

        {/* ================= OPEN GRAPH ================= */}
        <meta property="og:title" content="VoyageMara Safaris - Kenya Wildlife Tours" />
        <meta
          property="og:description"
          content="Book unforgettable safari experiences in Kenya with expert guides."
        />
        <meta property="og:image" content="/images/masai-mara.jpg" />
        <meta property="og:type" content="website" />

        {/* ================= TWITTER ================= */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* ================= STRUCTURED DATA (SEO BOOST) ================= */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "VoyageMara Safaris",
            url: "https://voyagemara.com",
            telephone: "+254705814181",
            address: {
              "@type": "PostalAddress",
              addressCountry: "KE",
              addressLocality: "Maasai Mara",
            },
            description:
              "Safari tours in Kenya including Maasai Mara, Amboseli, and Nakuru.",
          })}
        </script>
      </Helmet>

      {/* ================= SITE ================= */}
      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section className="story-section" id="about">
          <About />
        </section>

        <section className="story-section" id="itineraries">
          <Itineraries />
        </section>

        <section className="story-section" id="tours">
          <Tours />
        </section>

        <section className="story-section" id="gallery">
          <Gallery />
        </section>

        <section className="story-section" id="contact">
          <Contact />
        </section>
        <section className="story-section" id="map">
  <MapEmbed />
</section>
      </main>
<ProSafariMap />
      <Footer />
    </>
  );
}