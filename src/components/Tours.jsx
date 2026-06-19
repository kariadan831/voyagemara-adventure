import "../styles/styles.css";

const tours = [
  {
    title: "Nairobi National Park Day Safari",
    desc: "Experience wildlife just outside the city. See lions, rhinos, giraffes, and more in their natural habitat with guided game drives.",
    price: "From $180",
    duration: "1 Day",
    rating: "★★★★★",
    tag: "Day Trip",
    img: "/images/nairobi.jpg",
  },
  {
    title: "Maasai Mara Big Five Safari",
    desc: "A 3-day luxury safari in Kenya’s most iconic reserve. Includes accommodation, guided game drives, and Big Five encounters.",
    price: "From $620",
    duration: "3 Days / 2 Nights",
    rating: "★★★★★",
    tag: "Popular",
    img: "/images/masai mara.jpg",
  },
  {
    title: "Amboseli Elephant Safari",
    desc: "Discover elephants with breathtaking views of Mount Kilimanjaro. Includes guided drives, transport, and park entry.",
    price: "From $520",
    duration: "2 Days / 1 Night",
    rating: "★★★★★",
    tag: "Wildlife",
    img: "/images/elephant.jpg",
  },
  {
    title: "Lake Nakuru Flamingo Safari",
    desc: "Witness pink flamingos, rhinos, and diverse birdlife in one of Kenya’s most scenic national parks.",
    price: "From $450",
    duration: "1 Day",
    rating: "★★★★☆",
    tag: "Nature",
    img: "/images/hippo.jpg",
  },
  {
    title: "Samburu Special Five Safari",
    desc: "Explore northern Kenya and see rare species like Grevy’s zebra and reticulated giraffe in a raw wilderness experience.",
    price: "From $750",
    duration: "3 Days / 2 Nights",
    rating: "★★★★★",
    tag: "Adventure",
    img: "/images/pumba.jpg",
  },
  {
    title: "Lake Naivasha Boat & Crescent Island",
    desc: "A peaceful escape with boat rides, hippos, and walking safari experiences on Crescent Island.",
    price: "From $300",
    duration: "1 Day",
    rating: "★★★★☆",
    tag: "Relax",
    img: "/images/zebras.jpg",
  },
];

export default function Tours() {
  return (
    <section className="tours-section" id="tours">

      {/* HEADER */}
      <div className="tours-header">
        <h2>Featured Tours & Safari Experiences</h2>
        <p>
          Handcrafted luxury safari packages across Kenya’s most iconic destinations
        </p>
      </div>

      {/* GRID */}
      <div className="tours-grid">
        {tours.map((tour, i) => (
          <div className="tour-card" key={i}>

            <div className="tour-image">
              <img src={tour.img} alt={tour.title} loading="lazy" />
              <span className="badge">{tour.tag}</span>
            </div>

            <div className="tour-content">
              <div className="rating">{tour.rating}</div>

              <h3>{tour.title}</h3>

              <p>{tour.desc}</p>

              <div className="tour-meta">📅 {tour.duration}</div>

              <div className="price">{tour.price}</div>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/254705814181?text=Hello, I want to book: ${tour.title}`,
                    "_blank"
                  )
                }
              >
                Book This Safari
              </button>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}