export type Testimonial = {
  id: string;
  name: string;
  shop: string;
  date: string;
  rating: number;
  quote: string;
  image?: string;
  live?: boolean;
};

export const fallbackTestimonials: Testimonial[] = [
  { id: "chelsy", name: "Chelsy", shop: "MagnateArtisan", date: "03 Jun 2026", rating: 5, quote: "The guided design process, clear communication and measurement help made the experience exceptional. The finished jacket went beyond expectations." },
  { id: "custom-tuxedo", name: "Etsy buyer", shop: "MagnateArtisan", date: "12 Jun 2026", rating: 5, quote: "A custom tuxedo was remade quickly after a sizing issue and arrived in time for the event with a much better fit." },
  { id: "tyler", name: "Tyler", shop: "MagnateArtisanStudio", date: "05 Jun 2026", rating: 5, quote: "The brief was incredibly specific, and the team worked through every step until the suit matched the vision." },
  { id: "thompson", name: "Thompson", shop: "MagnateArtisanStudio", date: "03 Jun 2026", rating: 5, quote: "Months of collaboration created a Versailles masquerade costume with remarkable quality, value and response speed." },
  { id: "morgan", name: "Morgan", shop: "Both Etsy shops", date: "01 Apr 2026", rating: 5, quote: "A wonderful experience with clear back-and-forth communication, correct sizing and truly eye-catching suits." },
  { id: "randall", name: "Randall", shop: "MagnateArtisan", date: "03 Jun 2026", rating: 5, quote: "An excellent look and a perfect fit. I would recommend the outfit to anyone searching for standout customwear." },
];
