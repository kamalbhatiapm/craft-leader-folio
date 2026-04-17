import tmobile from "@/assets/logos/tmobile.png";
import apple from "@/assets/logos/apple.png";
import johnsonControls from "@/assets/logos/johnson-controls.png";
import unitedTechnologies from "@/assets/logos/united-technologies.png";
import johnDeere from "@/assets/logos/john-deere.png";

export type Company = {
  name: string;
  logo: string;
};

export const companies: Company[] = [
  { name: "T-Mobile", logo: tmobile },
  { name: "Apple", logo: apple },
  { name: "Johnson Controls", logo: johnsonControls },
  { name: "United Technologies", logo: unitedTechnologies },
  { name: "John Deere", logo: johnDeere },
];
