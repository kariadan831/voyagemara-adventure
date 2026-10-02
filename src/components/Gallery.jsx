import "../styles/styles.css";

const images = [
  { src: "/images/eleph1.webp", alt: "Close view of an African elephant" },
  { src: "/images/eleph2.webp", alt: "Elephant herd moving through the bush" },
  { src: "/images/lions.webp", alt: "Lion resting in the Maasai Mara" },
  { src: "/images/rhino.webp", alt: "Rhino in a protected Kenyan reserve" },
  { src: "/images/zebras.webp", alt: "Zebras crossing the open plains" },
  { src: "/images/pumba.webp", alt: "Warthog on the savannah" },
  { src: "/images/maasai.webp", alt: "Maasai people in traditional dress" },
  { src: "/images/kilimo.webp", alt: "Kenyan countryside and local farming" },
  { src: "/images/ballon.webp", alt: "Hot-air balloon over the Maasai Mara" },
  { src: "/images/nairobi.webp", alt: "Wildlife near Nairobi National Park" },
  { src: "/images/maasai-1.webp", alt: "Maasai culture in Kenya" },
];

export default function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-header">
        <h2>Safari Gallery</h2>
        <p>Moments from the wild</p>
      </div>

      <div className="gallery-grid">
        {images.map((image) => (
          <div className="gallery-item" key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    </section>
  );
}                                                       