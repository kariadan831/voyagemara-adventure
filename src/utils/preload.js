// High-speed route and asset preloading utility for VoyageMara Safaris

let safariDetailPromise = null;
let aboutUsPromise = null;
let bookingPromise = null;

// Preload SafariDetail component
export const preloadSafariDetail = () => {
  if (!safariDetailPromise) {
    safariDetailPromise = import("../pages/SafariDetail");
  }
  return safariDetailPromise;
};

// Preload AboutUs component
export const preloadAboutUs = () => {
  if (!aboutUsPromise) {
    aboutUsPromise = import("../pages/AboutUs");
  }
  return aboutUsPromise;
};

// Preload Booking component
export const preloadBooking = () => {
  if (!bookingPromise) {
    bookingPromise = import("../pages/Booking");
  }
  return bookingPromise;
};

// Cache and preload images into browser memory
const preloadedImages = new Set();
export const preloadImage = (url) => {
  if (!url || typeof window === "undefined" || preloadedImages.has(url)) return;
  preloadedImages.add(url);
  const img = new Image();
  img.src = url;
};

const TOUR_COVERS = [
  "/tours/maasai-mara/cover.webp",
  "/tours/amboseli/cover.webp",
  "/tours/samburu/cover.webp",
  "/tours/lake-nakuru/cover.webp",
  "/tours/lake-naivasha/cover.webp",
  "/tours/nairobi/cover.webp",
];

// Preload all tour covers during browser idle time
export const preloadAllTourCovers = () => {
  TOUR_COVERS.forEach((url) => preloadImage(url));
};

// Background idle preloading for instant zero-latency page transitions
export const initIdlePreload = () => {
  if (typeof window === "undefined") return;

  const run = () => {
    preloadSafariDetail();
    preloadAboutUs();
    preloadBooking();
    preloadAllTourCovers();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 1500 });
  } else {
    setTimeout(run, 600);
  }
};
