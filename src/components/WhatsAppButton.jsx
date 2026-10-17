import { FaWhatsapp } from "react-icons/fa";
import "../styles/styles.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254705814181?text=Hello%20VoyageMara%20Safaris!%20I%27d%20like%20to%20inquire%20about%20a%20Kenya%20safari."
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat directly on WhatsApp with VoyageMara Safaris"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}