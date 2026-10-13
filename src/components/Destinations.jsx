import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCompass, FaCalendarAlt, FaBinoculars, FaArrowRight } from "react-icons/fa";
import "./Destinations.css";

const DESTINATIONS = [
  {
    id: "maasai-mara",
    title: "Maasai Mara National Reserve",
    kicker: "The Great Migration & Big Cats",
    image: "/tours/maasai-mara/cover.webp",
    alt: "Pride of lions on the open savannah in Maasai Mara National Reserve",
    coordinates: "1.5000° S · 35.1500° E",
    bestSeason: "Jul – Oct (Migration) & Dec – Mar",
    wildlife: "Lions, Cheetahs, Leopards, Wildebeest, Elephants",
    description:
      "Kenya’s crown jewel of wildlife conservation. Iconic sweeping grasslands, drama-filled Mara River crossings, and world-class concentrations of lions, cheetahs, and migrating herds.",
    tourSlug: "maasai-mara",
    defaultTourName: "3-Day Maasai Mara Big Five Safari",
    tag: "Signature Safari",
  },
  {
    id: "amboseli",
    title: "Amboseli National Park",
    kicker: "Free-Roaming Elephant Herds & Kilimanjaro",
    image: "/tours/amboseli/cover.webp",
    alt: "Large elephant herd grazing with Mount Kilimanjaro in the background",
    coordinates: "2.6527° S · 37.2606° E",
    bestSeason: "Jun – Oct & Jan – Feb",
    wildlife: "Big Tusker Elephants, Giraffes, Lions, 400+ Bird Species",
    description:
      "Famous for massive elephant families roaming against the majestic snow-capped peaks of Mount Kilimanjaro. Spectacular open swamp ecosystems and unmatched panoramic photography.",
    tourSlug: "amboseli",
    defaultTourName: "2-Day Amboseli Elephant & Kilimanjaro Safari",
    tag: "Photography Choice",
  },
  {
    id: "samburu",
    title: "Samburu National Reserve",
    kicker: "The Northern Special Five",
    image: "/tours/samburu/cover.webp",
    alt: "Reticulated giraffe and Grevy zebra in Samburu National Reserve",
    coordinates: "0.5833° N · 37.5333° E",
    bestSeason: "Year-Round (Best Jun – Oct & Dec – Mar)",
    wildlife: "Grevy's Zebra, Reticulated Giraffe, Gerenuk, Beisa Oryx",
    description:
      "Kenya’s rugged, sun-baked northern frontier along the palm-fringed Ewaso Nyiro River. Encounter rare northern endemic species that cannot be found anywhere in southern Kenya.",
    tourSlug: "samburu",
    defaultTourName: "3-Day Samburu Northern Special Five Safari",
    tag: "Rare Wildlife",
  },
  {
    id: "lake-nakuru",
    title: "Lake Nakuru National Park",
    kicker: "Rhino Sanctuary & Rift Valley Flora",
    image: "/tours/lake-nakuru/cover.webp",
    alt: "Rhino at the edge of Lake Nakuru in Kenya",
    coordinates: "0.3667° S · 36.0833° E",
    bestSeason: "Year-Round (Ideal for Day Safaris)",
    wildlife: "Black & White Rhinos, Rothschild Giraffes, Waterbirds",
    description:
      "A fenced UNESCO biosphere haven nestled on the floor of the Great Rift Valley. Premier sanctuary for protected black and white rhinos, surrounded by euphorbia forests and acacia ridges.",
    tourSlug: "lake-nakuru",
    defaultTourName: "1-Day Lake Nakuru Rhino & Flamingo Safari",
    tag: "Conservation Haven",
  },
  {
    id: "lake-naivasha",
    title: "Lake Naivasha & Crescent Island",
    kicker: "Freshwater Boat Safaris & Walking Trails",
    image: "/tours/lake-naivasha/cover.webp",
    alt: "Lake Naivasha water and wild herbivores grazing peacefully",
    coordinates: "0.7667° S · 36.3667° E",
    bestSeason: "Year-Round Weekend Escape",
    wildlife: "Hippos, Fish Eagles, Zebras, Giraffes, Gazelles",
    description:
      "A tranquil freshwater lake surrounded by yellow-barked fever tree forests. Glide past pods of hippos by boat, then step foot onto Crescent Island for a tranquil walking safari among peaceful game.",
    tourSlug: "lake-naivasha",
    defaultTourName: "1-Day Lake Naivasha Boat & Crescent Island Tour",
    tag: "Walking Safari",
  },
];

export default function Destinations({ onOpenBooking }) {
  return (
    <section className="vm-destinations-section" id="destinations" aria-labelledby="destinations-title">
      <div className="vm-dest-container">
        {/* SECTION HEADER */}
        <div className="vm-dest-header">
          <span className="vm-dest-eyebrow">
            <FaCompass /> WHERE WE GUIDE YOU
          </span>
          <h2 id="destinations-title">Kenya’s Most Celebrated Wildlife Destinations</h2>
          <p>
            From the endless savannahs of the Maasai Mara to the snowline views of Kilimanjaro and northern wilderness sanctuaries — explore each park individually or let us tailor them into one seamless itinerary.
          </p>
        </div>

        {/* DESTINATIONS GRID */}
        <div className="vm-dest-grid">
          {DESTINATIONS.map((dest) => (
            <article className="vm-dest-card" key={dest.id}>
              <div className="vm-dest-media">
                <img
                  src={dest.image}
                  alt={dest.alt}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                <span className="vm-dest-badge">{dest.tag}</span>
                <span className="vm-dest-coords">{dest.coordinates}</span>
              </div>

              <div className="vm-dest-body">
                <span className="vm-dest-kicker">{dest.kicker}</span>
                <h3>{dest.title}</h3>
                <p className="vm-dest-text">{dest.description}</p>

                <div className="vm-dest-meta">
                  <div className="vm-meta-item">
                    <FaCalendarAlt className="vm-meta-icon" />
                    <span><strong>Best Season:</strong> {dest.bestSeason}</span>
                  </div>
                  <div className="vm-meta-item">
                    <FaBinoculars className="vm-meta-icon" />
                    <span><strong>Key Sighting:</strong> {dest.wildlife}</span>
                  </div>
                </div>

                <div className="vm-dest-actions">
                  <button
                    type="button"
                    className="vm-dest-book-btn"
                    onClick={() =>
                      onOpenBooking &&
                      onOpenBooking({
                        tour: dest.defaultTourName,
                      })
                    }
                  >
                    Enquire This Route <FaArrowRight />
                  </button>

                  <Link to={`/safaris/${dest.tourSlug}`} className="vm-dest-link">
                    View Package
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
