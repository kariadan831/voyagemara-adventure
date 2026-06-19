import "../styles/styles.css";

const images = [
  "/images/cheetah.jpg",
  "/images/elephant.jpg",
  "/images/eleph1.jpg",
  "/images/eleph2.jpg",
  "/images/hippo.jpg",
  "/images/lions.jpg",
  "/images/rhino.jpg",
  "/images/zebras.jpg",
  "/images/camp.jpg",
  "/images/pumba.jpg",
  "/images/maasai.jpg",
  "/images/kilimo.jpg",
  "/images/ballon.jpg",
];

export default function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-header">
        <h2>Safari Gallery</h2>
        <p>Moments from the wild</p>
      </div>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <div className="gallery-item" key={i}>
            <img src={img} alt={`Safari ${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
}                                                       