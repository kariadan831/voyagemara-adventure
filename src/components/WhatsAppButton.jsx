import { FaWhatsapp } from "react-icons/fa";
import "../styles/styles.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254705814181"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat directly on WhatsApp with VoyageMara Safaris"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}