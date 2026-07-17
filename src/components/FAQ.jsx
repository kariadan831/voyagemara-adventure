import { Helmet } from "react-helmet-async";
import "../styles/FAQ.css";

const faqs = [
  {
    question: "What safari destinations do you offer?",
    answer:
      "VoyageMara offers unforgettable safari tours across Kenya including Maasai Mara National Reserve, Amboseli National Park, Lake Nakuru National Park, Samburu National Reserve, Lake Naivasha, Tsavo East, Tsavo West, Nairobi National Park, Hell's Gate National Park and Diani Beach."
  },
  {
    question: "How do I book a safari with VoyageMara?",
    answer:
      "Booking is simple. You can contact us through WhatsApp, our website contact form or email. We'll help you customize your itinerary, select accommodation and arrange transport."
  },
  {
    question: "How much does a Kenya safari cost?",
    answer:
      "Safari prices depend on the destination, number of days, travel season, accommodation type and group size. Our packages range from affordable budget safaris to luxury safari experiences."
  },
  {
    question: "Are park entrance fees included?",
    answer:
      "Yes. Most of our safari packages include park entrance fees, professional safari guides, transport, accommodation, meals and game drives. Package details are clearly provided before booking."
  },
  {
    question: "Can I customize my safari itinerary?",
    answer:
      "Absolutely. Every safari can be customized to match your travel dates, budget, preferred destinations, accommodation style and special interests such as wildlife photography, bird watching or honeymoon safaris."
  },
  {
    question: "When is the best time to visit Maasai Mara?",
    answer:
      "The Maasai Mara offers excellent wildlife viewing throughout the year. The Great Wildebeest Migration usually takes place between July and October, making it one of the world's most spectacular wildlife events."
  },
  {
    question: "What animals can I expect to see?",
    answer:
      "Depending on the destination and season, you may see lions, elephants, leopards, buffaloes, rhinos, cheetahs, giraffes, zebras, hippos, crocodiles, hyenas and hundreds of bird species."
  },
  {
    question: "What should I pack for a Kenya safari?",
    answer:
      "Pack lightweight clothing, comfortable walking shoes, a warm jacket for early morning game drives, sunscreen, sunglasses, a hat, binoculars, insect repellent and a camera."
  },
  {
    question: "Is Kenya safe for safari tourists?",
    answer:
      "Yes. Kenya is one of Africa's leading safari destinations. VoyageMara works with experienced guides, licensed drivers and trusted accommodation partners to provide safe and enjoyable safari experiences."
  },
  {
    question: "Do you provide airport transfers?",
    answer:
      "Yes. Airport pickup and drop-off services can be arranged for both domestic and international travelers as part of your safari package."
  },
  {
    question: "Do you organize private safaris?",
    answer:
      "Yes. We organize private safaris for couples, families, photographers, honeymooners, solo travelers and corporate groups."
  },
  {
    question: "Do you offer luxury safari packages?",
    answer:
      "Yes. VoyageMara offers luxury safari experiences featuring premium lodges, luxury tented camps, private guides and customized itineraries throughout Kenya."
  }
];

export default function FAQ() {
  return (
    <>
      <Helmet>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          })}
        </script>

        {/* Speakable Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "VoyageMara Safari FAQ",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [
                ".faq-header",
                ".faq-container"
              ]
            }
          })}
        </script>

      </Helmet>

      <section
        className="faq-section"
        id="faq"
        aria-labelledby="faq-heading"
      >
        <div className="faq-header">

          <h2 id="faq-heading">
            Frequently Asked Questions About Kenya Safaris
          </h2>

          <p>
            Find answers to common questions about Kenya safari tours,
            Maasai Mara holidays, wildlife experiences, accommodation,
            park fees, transport, customized safari packages and luxury
            safari adventures with VoyageMara.
          </p>

        </div>

        <div className="faq-container">

          {faqs.map((faq, index) => (
            <details
              key={index}
              className="faq-item"
            >
              <summary>{faq.question}</summary>

              <p>{faq.answer}</p>

            </details>
          ))}

        </div>

      </section>
    </>
  );
}