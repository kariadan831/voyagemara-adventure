
  import { Helmet } from "react-helmet-async";
  import "./AboutUs.css";


  export default function AboutUs() {

    return (

      <>

        <Helmet>
<script type="application/ld+json">
{
JSON.stringify({

"@context":"https://schema.org",

"@graph":[


{
"@type":"Organization",

"@id":
"https://voyagemara-adventure.vercel.app/#organization",

"name":
"VoyageMara Safaris",

"url":
"https://voyagemara-adventure.vercel.app/about",

"logo":
"https://voyagemara-adventure.vercel.app/logo.png",


"description":
"VoyageMara Safaris is a Kenyan safari company offering wildlife adventures, luxury safaris, cultural experiences and tailor-made tours across Kenya.",


"founder":{

"@type":"Person",

"name":"Daniel Karia",

"jobTitle":"Founder"

},


"address":{

"@type":"PostalAddress",

"addressLocality":"Nairobi",

"addressCountry":"Kenya"

},


"contactPoint":{

"@type":"ContactPoint",

"telephone":"+254705814181",

"contactType":"customer service",

"email":"info@voyagemara.com"

}

},



{
"@type":"TravelAgency",

"name":
"VoyageMara Safaris",


"url":
"https://voyagemara-adventure.vercel.app/about",


"areaServed":
"Kenya",


"serviceType":[

"Luxury Kenya Safaris",

"Maasai Mara Tours",

"Wildlife Adventures",

"Photography Safaris",

"Cultural Experiences"

],


"knowsAbout":[

"Maasai Mara",

"Amboseli National Park",

"Lake Nakuru",

"Samburu",

"Tsavo",

"Kenya Wildlife"

]


},



{
"@type":"AboutPage",

"name":
"About VoyageMara Safaris",

"url":
"https://voyagemara-adventure.vercel.app/about",


"isPartOf":{

"@type":"WebSite",

"name":
"VoyageMara Safaris"

}

}


]

})
}
</script>
          <title>
            About VoyageMara Safaris | Kenya Safari Experts
          </title>

          <meta
            name="description"
            content="Learn about VoyageMara Safaris, a Kenyan safari company offering authentic wildlife adventures, Maasai Mara tours, cultural experiences and sustainable travel."
          />

          <link
            rel="canonical"
            href="https://voyagemara-adventure.vercel.app/about"
          />

        </Helmet>



        <main className="about-page">


          {/* HERO */}

          <section className="about-hero">

            <div className="about-hero-content">

              <span>
                VOYAGEMARA SAFARIS
              </span>

              <h1>
                Experience Authentic Kenya
                Through Unforgettable Safaris
              </h1>


              <p>
                Discover Kenya's wildlife, landscapes and
                cultures through professionally crafted
                safari experiences.
              </p>


            </div>

          </section>





          {/* ABOUT INTRO */}

          <section className="about-section">


            <h2>
              About VoyageMara Safaris
            </h2>


            <p>
              VoyageMara Safaris is a Kenyan travel company
              dedicated to creating unforgettable safari
              experiences across Kenya.
            </p>


            <p>
              We specialize in wildlife adventures, luxury
              safaris, family holidays, cultural experiences,
              photography expeditions and tailor-made
              itineraries.
            </p>


            <p>
              Our mission is to connect travelers with Kenya's
              incredible wildlife, breathtaking landscapes and
              rich cultural heritage while promoting responsible
              tourism.
            </p>


          </section>







          {/* STORY */}


          <section className="about-grid">


            <div className="about-image">

              <img
                src="/images/masai-mara.webp"
                alt="Maasai Mara Kenya safari landscape"
              />

            </div>



            <div className="about-text">

              <h2>
                Our Story
              </h2>


              <p>
                VoyageMara Safaris was founded with a vision
                of helping travelers experience Kenya through
                authentic and professionally guided adventures.
              </p>


              <p>
                From the endless plains of Maasai Mara to the
                elephants of Amboseli, the wilderness of
                Samburu and the beaches of Diani, every journey
                is designed to create lasting memories.
              </p>


              <p>
                Every safari is unique, personal and
                unforgettable.
              </p>


            </div>


          </section>








          {/* FOUNDER */}


          <section className="about-section">


            <h2>
              Founder
            </h2>


            <div className="founder-card">


              <h3>
                Duncan Karia
              </h3>


              <p>
                Founder of VoyageMara Safaris with a passion
                for wildlife conservation, photography,
                tourism and technology.
              </p>


              <p>
                His vision is to build a trusted Kenyan
                safari brand by combining local expertise,
                exceptional service and digital innovation.
              </p>


            </div>


          </section>







          {/* MISSION VISION */}


          <section className="cards-grid">


            <div className="info-card">

              <h3>
                Our Mission
              </h3>

              <p>
                To provide authentic, safe and unforgettable
                safari experiences while supporting wildlife
                conservation and local communities.
              </p>

            </div>




            <div className="info-card">

              <h3>
                Our Vision
              </h3>

              <p>
                To become a trusted African safari brand
                recognized for excellence, innovation and
                sustainable tourism.
              </p>

            </div>


          </section>








          {/* VALUES */}


          <section className="about-section">


            <h2>
              Our Core Values
            </h2>



            <div className="list-grid">


              {
                [
                  "Customer Satisfaction",
                  "Professionalism",
                  "Integrity",
                  "Sustainability",
                  "Conservation",
                  "Safety",
                  "Excellence",
                  "Respect for Communities"
                ]
                .map((item,index)=>(

                  <div
                  className="list-card"
                  key={index}
                  >

                    ✓ {item}

                  </div>


                ))
              }


            </div>


          </section>







          {/* DESTINATIONS */}


          <section className="about-section">


            <h2>
              Safari Destinations
            </h2>


            <p>
              Maasai Mara • Amboseli • Lake Nakuru •
              Lake Naivasha • Samburu • Tsavo East •
              Tsavo West • Nairobi National Park • Diani Beach
            </p>


          </section>








          {/* CONTACT */}


          <section className="contact-box">


            <h2>
              Contact VoyageMara Safaris
            </h2>


            <p>
              Nairobi, Kenya
            </p>


            <p>
              Phone: +254 705 814 181
            </p>


            <p>
              Email: info@voyagemara.com
            </p>


          </section>



        </main>


      </>

    );

  }