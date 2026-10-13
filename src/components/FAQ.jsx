import { Helmet } from "react-helmet-async";
import "../styles/FAQ.css";

const faqCategories = [
  {
    category: "Booking & Pricing",
    items: [
      {
        question: "How do I book a Maasai Mara safari with VoyageMara?",
        answer:
          "Booking is quick and straightforward. Send us a WhatsApp message (+254 705 814 181), fill in our website enquiry form, or email us directly. We confirm availability, finalise your itinerary, and issue a booking confirmation within a few hours. A 30% deposit secures your dates.",
      },
      {
        question: "How much does a 3-day Maasai Mara safari cost from Nairobi?",
        answer:
          "Our 3-Day Maasai Mara Big Five Safari starts from US$620 per person. The price includes a private 4×4 Land Cruiser with a pop-up roof, professional Maasai driver-guide, full-board accommodation (meals as per itinerary), all park and conservancy entrance fees, bottled water, and Nairobi hotel pickup and drop-off. International flights, Kenya e-Visa, travel insurance and gratuities are excluded.",
      },
      {
        question: "What is your booking deposit and cancellation policy?",
        answer:
          "A 30% deposit confirms your safari reservation. The remaining balance is due 14 days before your departure date. Cancellations 30 or more days before departure receive a full deposit refund. Cancellations 14–29 days before departure forfeit 50% of the deposit. Cancellations within 14 days of departure are non-refundable. Rescheduling is available at no penalty, subject to availability.",
      },
      {
        question: "Can I pay in Kenyan shillings (KES)?",
        answer:
          "Yes. We accept payment in USD, EUR, GBP, and Kenyan Shillings (KES). Payments can be made via bank transfer, M-Pesa, or cash on arrival at our Nairobi office. Confirm the exact exchange rate at the time of booking.",
      },
      {
        question: "Can I customise my safari itinerary?",
        answer:
          "Absolutely. Every VoyageMara safari can be tailored to your travel dates, group size, accommodation preference, budget, and special interests — from wildlife photography and birding to honeymoon safaris and family adventures. Contact our team and we'll build an itinerary around you.",
      },
    ],
  },
  {
    category: "Park Fees & What's Included",
    items: [
      {
        question: "Are Maasai Mara park entrance fees included in the package price?",
        answer:
          "Yes. All VoyageMara safari packages include Maasai Mara National Reserve and conservancy entrance fees. For 2026/2027, the Maasai Mara National Reserve fee for non-resident adults is approximately US$200 per person per day (subject to KNWS revision). Conservancy fees (Mara Triangle, Olare Motorogi, Naboisho) vary by area and are confirmed at the time of booking.",
      },
      {
        question: "What does the safari package include?",
        answer:
          "Our standard packages include: private custom Toyota 4×4 Land Cruiser with pop-up roof, all park and conservancy entrance fees, professional native Maasai KWS-certified driver-guide, full-board accommodation (meals as specified), daily morning and afternoon game drives, bottled drinking water, and Nairobi hotel pickup and drop-off. International flights, Kenya e-Visa, travel insurance, laundry, alcohol, optional balloon safaris and gratuities are excluded.",
      },
      {
        question: "What type of vehicle is used on game drives?",
        answer:
          "All VoyageMara game drives use a custom Toyota Land Cruiser 4×4 fitted with a full-length pop-up roof for 360° wildlife photography, UHF radio communication, USB charging sockets, a first-aid kit, and a cooler box. We seat a maximum of 6 guests per vehicle to ensure space and comfort.",
      },
    ],
  },
  {
    category: "Wildlife & Best Time to Visit",
    items: [
      {
        question: "When is the best time to visit Maasai Mara?",
        answer:
          "The Maasai Mara is exceptional year-round. The Great Wildebeest Migration — when 1.5 million wildebeest cross from Tanzania's Serengeti — peaks between July and October, with dramatic Mara River crossings typically occurring August to September. January and February offer great Big Five sightings with fewer crowds. The long rains (April–May) bring lush landscapes and excellent birdwatching.",
      },
      {
        question: "What is the Great Wildebeest Migration and when does it happen?",
        answer:
          "The Great Migration is the largest overland wildlife movement on Earth: roughly 1.5 million wildebeest, 500,000 zebras, and 200,000 gazelles travel in a continuous clockwise circuit between Tanzania's Serengeti and Kenya's Maasai Mara. In Kenya, the herds typically arrive in July–August, with the famous Mara River crossings peaking in August–September. By November, the herds return south to the Serengeti calving grounds.",
      },
      {
        question: "What animals can I expect to see on a Kenya safari?",
        answer:
          "The Maasai Mara offers reliable sightings of the Big Five: lion, elephant, leopard, buffalo, and black rhino. You may also encounter cheetah, hippo, crocodile, giraffe, zebra, hyena, wild dog, and over 450 bird species. Amboseli is famous for large elephant herds against Mount Kilimanjaro. Samburu hosts the rare 'Northern Special Five': Grevy's zebra, reticulated giraffe, Somali ostrich, Gerenuk, and Beisa oryx.",
      },
      {
        question: "Is a 4x4 Land Cruiser better than a safari van?",
        answer:
          "Yes — for serious wildlife viewing. A custom 4×4 Land Cruiser with a full pop-up roof offers 360° unobstructed views and superior photography angles compared to a minivan with hatches. Land Cruisers also have greater ground clearance for off-road driving deep into the park, independent suspension for a smoother ride on rough tracks, and more space per guest. VoyageMara uses exclusively 4×4 Land Cruisers.",
      },
    ],
  },
  {
    category: "Safety & Travel Practical",
    items: [
      {
        question: "Is Kenya safe for international safari tourists?",
        answer:
          "Yes. Kenya is one of Africa's leading and most visited safari destinations. The Maasai Mara, Amboseli, Samburu and Naivasha are well-established tourist circuits with experienced guides and safe roads. VoyageMara works exclusively with KWS-licensed guides, reputable lodges, and carefully vetted accommodation partners. We recommend standard travel insurance for all guests.",
      },
      {
        question: "Do I need a visa to visit Kenya?",
        answer:
          "Kenya operates an e-Visa system (evisa.go.ke). Most nationalities can apply online for a single-entry tourist visa at approximately US$51. Some nationalities enjoy visa-free access under bilateral agreements. Confirm your country's status before travel and apply at least 3–5 business days before arrival.",
      },
      {
        question: "What should I pack for a Kenya safari?",
        answer:
          "Pack neutral-coloured lightweight clothing (khaki, beige, olive — avoid bright colours), a warm fleece or jacket for early morning game drives (it can be cold at dawn), a wide-brimmed hat, sunscreen (SPF 50+), insect repellent, comfortable walking shoes, binoculars, a camera with zoom lens, and any personal medications. Safari camps provide laundry services for longer stays.",
      },
      {
        question: "Do you provide airport transfers?",
        answer:
          "Yes. VoyageMara can arrange pickup and drop-off at Jomo Kenyatta International Airport (NBO) and Wilson Airport (WIL) in Nairobi as part of your safari package. Domestic flight transfers (Nairobi to Maasai Mara / Amboseli) can also be arranged on request.",
      },
      {
        question: "Do you organise private safaris for families, couples and groups?",
        answer:
          "Yes. We specialise in private, customised safaris for couples (including honeymoon safaris), families with children, solo travellers, wildlife photographers, corporate groups, and large group expeditions. Every itinerary is built around your travel dates, interests and budget.",
      },
    ],
  },
];

const allFaqs = faqCategories.flatMap((cat) => cat.items);

export default function FAQ() {
  return (
    <>
      <Helmet>
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://voyagemara-adventure.vercel.app/#faq",
            mainEntity: allFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>

        {/* Speakable Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Kenya Safari FAQ — VoyageMara",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".faq-header", ".faq-container"],
            },
          })}
        </script>
      </Helmet>

      <section className="faq-section" id="faq" aria-labelledby="faq-heading">
        <div className="faq-header">
          <span className="faq-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2 id="faq-heading">Kenya Safari Questions Answered</h2>
          <p>
            Everything you need to know about Maasai Mara safaris, park fees, vehicle types,
            the Great Migration, booking deposits and cancellation policy — answered by our
            Nairobi-based safari team.
          </p>
        </div>

        <div className="faq-container">
          {faqCategories.map((cat) => (
            <div key={cat.category} className="faq-category">
              <h3 className="faq-category-title">{cat.category}</h3>
              <div className="faq-group">
                {cat.items.map((faq, i) => (
                  <details key={i} className="faq-item">
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOOKING & CANCELLATION POLICY SUMMARY */}
        <div className="faq-policy-box" aria-label="Booking and cancellation policy summary">
          <div className="faq-policy-header">
            <span>BOOKING &amp; CANCELLATION POLICY</span>
            <h3>Transparent, fair terms — no surprises</h3>
          </div>
          <div className="faq-policy-grid">
            <div className="faq-policy-item faq-policy-item--green">
              <strong>30% Deposit</strong>
              <p>Secures your safari dates immediately upon confirmation.</p>
            </div>
            <div className="faq-policy-item faq-policy-item--green">
              <strong>Balance Due 14 Days Before</strong>
              <p>Remaining 70% is due 14 days before your departure.</p>
            </div>
            <div className="faq-policy-item faq-policy-item--amber">
              <strong>Cancel 30+ Days Out</strong>
              <p>Full deposit refund — no penalty.</p>
            </div>
            <div className="faq-policy-item faq-policy-item--amber">
              <strong>Cancel 14–29 Days Out</strong>
              <p>50% of deposit is forfeited.</p>
            </div>
            <div className="faq-policy-item faq-policy-item--red">
              <strong>Cancel Within 14 Days</strong>
              <p>Deposit is non-refundable.</p>
            </div>
            <div className="faq-policy-item faq-policy-item--green">
              <strong>Free Rescheduling</strong>
              <p>Change your dates at no extra cost, subject to availability.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}