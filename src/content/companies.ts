import tmobile from "@/assets/logos/tmobile.png";
import johnsonControls from "@/assets/logos/johnson-controls.png";
import unitedTechnologies from "@/assets/logos/united-technologies.png";

export type Company = {
  name: string;
  /** Resolved image URL — local import or external CDN. */
  logo: string;
};

// Apple and John Deere come from Simple Icons (official open-source brand SVGs).
// T-Mobile, Johnson Controls and UTC are not on Simple Icons, so we use locally
// generated brand-accurate marks instead.
export const companies: Company[] = [
  { name: "T-Mobile",            logo: tmobile },
  { name: "Apple",                logo: "https://cdn.simpleicons.org/apple/000000" },
  { name: "Johnson Controls",     logo: johnsonControls },
  { name: "United Technologies",  logo: unitedTechnologies },
  { name: "John Deere",           logo: "https://cdn.simpleicons.org/johndeere/367C2B" },
];
