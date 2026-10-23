import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./FaqAccordion.css";

export default function FaqAccordion({ items = [], title = "Frequently Asked Questions" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="vm-faq-accordion-wrap">
      {title && <h2 className="vm-section-title">{title}</h2>}
      <div className="vm-faq-list">
        {items.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`vm-faq-item ${isOpen ? "open" : ""}`}
            >
              <button
                type="button"
                className="vm-faq-trigger"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <FaChevronDown className="vm-faq-chevron" />
              </button>
              {isOpen && (
                <div className="vm-faq-content">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
