import heronImg from "@/assets/lens-heron.jpeg";
import balconyImg from "@/assets/lens-balcony.jpeg";
import sunsetImg from "@/assets/lens-sunset.jpeg";
import rhododendronsImg from "@/assets/lens-rhododendrons.jpeg";
import heronsFlightImg from "@/assets/lens-herons-flight.jpeg";
import egretImg from "@/assets/lens-egret.jpeg";
import minnewankaImg from "@/assets/lens-minnewanka.jpeg";
import banffShoreImg from "@/assets/lens-banff-shore.jpeg";
import lakeLouiseImg from "@/assets/lens-lake-louise.jpeg";
import tahoeImg from "@/assets/lens-tahoe.jpeg";

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
    id: "lake-louise",
    caption: "Lake Louise — glacier water so blue it looks Photoshopped. It isn't.",
    location: "Banff National Park, Canada",
    aspect: "landscape",
    src: lakeLouiseImg,
    alt: "Turquoise Lake Louise with snow-capped mountains and a glacier in the background",
  },
  {
    id: "heron",
    caption: "A great blue heron, mid-step. Stillness and intent in the same frame.",
    location: "Riverside walk",
    aspect: "portrait",
    src: heronImg,
    alt: "A great blue heron walking across a grassy riverbank",
  },
  {
    id: "sunset",
    caption: "The sun clocking out. A reminder to do the same.",
    location: "Hazy summer evening",
    aspect: "portrait",
    src: sunsetImg,
    alt: "A glowing orange sun setting behind a silhouetted tree in a hazy pink sky",
  },
  {
    id: "minnewanka",
    caption: "Lake Minnewanka — where the mountains do all the talking.",
    location: "Banff, Alberta",
    aspect: "landscape",
    src: minnewankaImg,
    alt: "Lake Minnewanka stretching between forested mountains under a blue sky",
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
    id: "egret",
    caption: "A great egret, perfectly composed against the water. Patience, personified.",
    location: "Lakeside",
    aspect: "portrait",
    src: egretImg,
    alt: "A white great egret standing at the edge of a lake",
  },
  {
    id: "tahoe",
    caption: "Lake Tahoe from above — trail signs pointing to the kind of view that resets you.",
    location: "Lake Tahoe, California",
    aspect: "landscape",
    src: tahoeImg,
    alt: "View of Lake Tahoe from a mountain trail with a wooden trail sign in the foreground",
  },
  {
    id: "rhododendrons",
    caption: "Rhododendrons in full riot. Subtlety is overrated.",
    location: "Garden, late spring",
    aspect: "portrait",
    src: rhododendronsImg,
    alt: "A close-up of bright pink rhododendron blossoms in full bloom",
  },
  {
    id: "banff-shore",
    caption: "Banff blues. Pine, granite, and water that doesn't quit.",
    location: "Banff National Park, Canada",
    aspect: "portrait",
    src: banffShoreImg,
    alt: "A turquoise mountain lake with pine trees and a rocky shoreline under a cloudy sky",
  },
  {
    id: "herons-flight",
    caption: "Two herons, mid-launch. Caught the takeoff, missed the focus — kept it anyway.",
    location: "Lakeside",
    aspect: "portrait",
    src: heronsFlightImg,
    alt: "Two herons taking flight over a grassy bank beside a calm lake",
  },
];
