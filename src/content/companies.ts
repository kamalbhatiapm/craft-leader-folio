export type Company = {
  name: string;
  /** Simple Icons slug — see https://simpleicons.org */
  slug: string;
  /** Official brand color in hex (without #) for the icon fill */
  color: string;
};

// Logos served from the Simple Icons CDN as official brand SVGs.
// Color param tints the icon to its official brand color.
export const companies: Company[] = [
  { name: "T-Mobile",            slug: "t-mobile",        color: "E20074" },
  { name: "Apple",                slug: "apple",           color: "000000" },
  { name: "Johnson Controls",     slug: "johnsoncontrols", color: "0066B3" },
  { name: "United Technologies",  slug: "rtx",             color: "D52B1E" },
  { name: "John Deere",           slug: "johndeere",       color: "367C2B" },
];

export const logoUrl = (c: Company) =>
  `https://cdn.simpleicons.org/${c.slug}/${c.color}`;
