import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Book Maasai Mara Safaris & Kenya Tours | VoyageMara Safaris",
  description = "Book your Maasai Mara safari with VoyageMara Safaris. Handcrafted 3-day Big Five wildlife game drives, Great Migration safaris, luxury tented camps, and custom Kenya packages.",
  keywords = "book my maasai mara, book maasai mara safari, maasai mara safari booking, masai mara tour packages, 3 days maasai mara safari, kenya safari booking, voyagemara safaris",
  url = "https://voyagemara-adventure.vercel.app/",
  image = "https://voyagemara-adventure.vercel.app/logo.png",
}) {
  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="robots"
        content="index, follow, max-image-preview:large"
      />

      <link
        rel="canonical"
        href={url}
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="VoyageMara Safaris" />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />
    </Helmet>
  );
}