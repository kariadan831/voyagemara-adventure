import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import AboutUs from "./pages/AboutUs";

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

    },300);


    return () => clearTimeout(timer);

  },[]);



  return (

    <>


    {/* ================= GLOBAL SEO ================= */}

    <Helmet prioritizeSeoTags>


      {/* KEEP YOUR CURRENT HELMET SEO CODE HERE */}

      <html lang="en" />

      <title>
        VoyageMara Safaris | Luxury Kenya Safaris,
        Maasai Mara Tours & Wildlife Adventures
      </title>


      <meta
      name="description"
      content="VoyageMara Safaris offers luxury Kenya safari experiences including Maasai Mara, Amboseli, Samburu, Lake Nakuru, Tsavo and Diani Beach."
      />


    </Helmet>



    <Navbar />



    <main>


      <Routes>


        {/* ================= HOME PAGE ================= */}

        <Route

        path="/"

        element={

          <>


          <section id="home">

            <Hero />

          </section>



          <section 
          id="about"
          className="story-section"
          >

            <About />

          </section>




          <section 
          id="itineraries"
          className="story-section"
          >

            <Itineraries />

          </section>




          <section 
          id="tours"
          className="story-section"
          >

            <Tours />

          </section>




          <section 
          id="gallery"
          className="story-section"
          >

            <Gallery />

          </section>




          <section 
          id="faq"
          className="story-section"
          >

            <FAQ />

          </section>




          <section 
          id="contact"
          className="story-section"
          >

            <Contact />

          </section>




          <section 
          id="map"
          className="story-section"
          >

            <MapEmbed />

          </section>


          </>

        }

        />





        {/* ================= ABOUT PAGE ================= */}


        <Route

        path="/about"

        element={

          <AboutUs />

        }

        />



      </Routes>



    </main>



    <ProSafariMap />

    <Footer />


    </>

  );

}