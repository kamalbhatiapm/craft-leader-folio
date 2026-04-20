import heronImg from "@/assets/lens-heron.jpeg";
import balconyImg from "@/assets/lens-balcony.jpeg";

export type LensShot = {
  id: string;
  caption: string;
  location?: string;
  /** Tailwind aspect ratio class for masonry-ish variety */
  aspect?: "square" | "portrait" | "landscape";
  /** Optional image URL — leave undefined for gradient placeholder */
  src?: string;
  alt?: string;
};

export const lens: LensShot[] = [
  {
    id: "heron",
    caption: "A great blue heron, mid-step. Stillness and intent in the same frame.",
    location: "Riverside walk",
    aspect: "portrait",
    src: heronImg,
    alt: "A great blue heron walking across a grassy riverbank",
  },
  {
    id: "balcony",
    caption: "Balcony mornings — Buddha, geraniums, and a lake that doesn't check Slack.",
    location: "Home, lakeside",
    aspect: "portrait",
    src: balconyImg,
    alt: "A stone Buddha statue and pink geraniums on a sunny balcony overlooking a lake",
  },
  {
    id: "morning-coffee",
    caption: "Morning coffee, before the standups begin.",
    location: "Home office",
    aspect: "portrait",
  },
  {
    id: "deep-work",
    caption: "Whiteboard sessions where the real architecture gets drawn.",
    location: "Deep work mode",
    aspect: "landscape",
  },
  {
    id: "mentoring",
    caption: "Mentoring chat that turned into a 2-hour systems design rabbit hole.",
    location: "Coffee shop",
    aspect: "square",
  },
  {
    id: "travel",
    caption: "Reset button. New city, new perspective.",
    location: "On the road",
    aspect: "landscape",
  },
  {
    id: "music",
    caption: "Headphones on, ship mode engaged.",
    location: "Late nights",
    aspect: "square",
  },
  {
    id: "family",
    caption: "The crew that keeps everything else in perspective.",
    location: "Off the clock",
    aspect: "portrait",
  },
];
