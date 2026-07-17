import "./AboutUs.css";

export default function AboutUs() {
  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">

        <div className="about-overlay">

          <span>VOYAGEMARA SAFARIS</span>

          <h1>
            Experience Authentic Kenya
            Through Unforgettable Safaris
          </h1>

          <p>
            Discover Kenya's wildlife, landscapes and cultures
            through carefully crafted safari experiences.
          </p>

        </div>

      </section>



      {/* INTRODUCTION */}
      <section className="about-intro-section">

        <div className="about-content">

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
            photography expeditions and tailor-made journeys
            designed around every traveler's dream.
          </p>


          <p>
            Our mission is to connect visitors with Kenya's
            incredible wildlife, breathtaking landscapes and
            rich cultural heritage while promoting responsible
            tourism.
          </p>


        </div>

      </section>




      {/* STORY */}
      <section className="story-section">


        <div className="section-image">

          <img 
          src="/images/masai-mara.webp"
          alt="Maasai Mara landscape safari"
          />

        </div>



        <div className="section-text">

          <h2>
            Our Story
          </h2>


          <p>
            VoyageMara Safaris was founded with a simple vision:
            helping travelers experience Kenya through authentic,
            professionally guided safari adventures.
          </p>


          <p>
            From the endless plains of Maasai Mara to the elephants
            of Amboseli, the flamingos of Lake Nakuru, the wilderness
            of Samburu and the beaches of Diani, every journey is
            designed to create lifelong memories.
          </p>


          <p>
            We believe every safari should be unique, personal
            and unforgettable.
          </p>


        </div>


      </section>





      {/* FOUNDER */}
      <section className="founder-section">


        <h2>
          Founder & Safari Experience Director
        </h2>


        <div className="founder-card">


          <div className="founder-icon">
            👤
          </div>


          <div>

          <h3>
            Daniel Karia
          </h3>


          <p>
            Founder of VoyageMara Safaris, driven by a passion
            for wildlife conservation, tourism, photography
            and technology.
          </p>


          <p>
            His vision is to build a trusted Kenyan safari brand
            by combining local expertise, exceptional service
            and modern digital innovation.
          </p>


          </div>


        </div>


      </section>





      {/* MISSION VISION */}
      <section className="mission-grid">


        <div className="mission-card">

          <h3>
            Our Mission
          </h3>

          <p>
            To provide authentic, safe and unforgettable safari
            experiences while supporting conservation and local
            communities.
          </p>

        </div>



        <div className="mission-card">

          <h3>
            Our Vision
          </h3>

          <p>
            To become one of Africa's leading safari companies
            recognized for excellence, innovation and sustainable
            tourism.
          </p>

        </div>


      </section>





      {/* VALUES */}
      <section className="values-section">


        <h2>
          Our Core Values
        </h2>


        <div className="values-grid">


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
            ].map((value,index)=>(

              <div 
              className="value-card"
              key={index}
              >

                ✓ {value}

              </div>

            ))
          }


        </div>


      </section>





      {/* WHY CHOOSE US */}
      <section className="why-section">


        <h2>
          Why Choose VoyageMara Safaris?
        </h2>


        <div className="why-grid">


        {
          [
            "Professional Local Safari Guides",
            "Customized Safari Itineraries",
            "Luxury and Budget Options",
            "Family Friendly Adventures",
            "Photography Safaris",
            "Maasai Cultural Experiences",
            "Airport Transfers",
            "24/7 Customer Support"
          ].map((item,index)=>(

            <div 
            className="why-card"
            key={index}
            >

              {item}

            </div>

          ))
        }


        </div>


      </section>





      {/* DESTINATIONS */}
      <section className="destination-section">


        <h2>
          Safari Destinations
        </h2>


        <p>
          Explore Kenya's most iconic destinations:
        </p>


        <div className="destination-list">

          Maasai Mara • Amboseli • Lake Nakuru •
          Samburu • Tsavo East • Tsavo West •
          Nairobi National Park • Diani Beach

        </div>


      </section>





      {/* CONTACT */}
      <section className="contact-section">


        <h2>
          Contact VoyageMara Safaris
        </h2>


        <p>
          Nairobi, Kenya
        </p>


        <p>
          📞 +254 705 814 181
        </p>


        <p>
          ✉ info@voyagemara.com
        </p>


      </section>


    </main>
  );
}