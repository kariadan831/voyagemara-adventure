import { Helmet } from "react-helmet-async";
import "../styles/FAQ.css";

const faqs = [
  {
    question: "What safari destinations do you offer?",
    answer:
      "We offer safari tours to Maasai Mara, Amboseli, Lake Nakuru, Samburu, Tsavo, Diani Beach, Lake Naivasha and other destinations across Kenya."
  },
  {
    question: "How do I book a safari?",
    answer:
      "You can book directly through our website or by contacting us via WhatsApp for a customized itinerary and quotation."
  },
  {
    question: "Are park fees included?",
    answer:
      "Yes. Most of our packages include transport, park entry fees, accommodation, meals and professional safari guides."
  },
  {
    question: "Can I customize my itinerary?",
    answer:
      "Yes. We create personalized safari packages based on your budget, travel dates and preferred destinations."
  },
  {
    question: "Which is the best time to visit Maasai Mara?",
    answer:
      "The Great Migration is usually from July to October, but Maasai Mara offers excellent wildlife viewing throughout the year."
  },
  {
    question: "Do you provide airport transfers?",
    answer:
      "Yes. Airport pickup and drop-off can be included in your safari package."
  }
];

export default function FAQ() {
  return (
    <>
      <Helmet>
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
      </Helmet>

      <section className="faq-section" id="faq">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know before booking your safari.</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <details key={index} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}