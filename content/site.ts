/* ============================================================================
   HOMSIFY — SITE CONTENT
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT for text, services, projects,
   phone numbers, cities, photos and testimonials.

   Rules:
   - Only change text between the "quotation marks".
   - Never delete a comma, a bracket, or a curly brace.
   - Photos: drop the file into  public/images/  then write the filename here,
     e.g.  image: "/images/kitchen-london.jpg"
   ========================================================================== */

/** Helper: builds a Pexels CDN URL. Replace these with your own photos
 *  as soon as you have them — real job sites always outperform stock. */
export const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const company = {
  name: "Homsify",
  tagline: "Property maintenance, renovation and services",
  phone: "226-386-4012",
  phoneHref: "tel:+12263864012",
  email: "info@homsify.ca",
  hours: "Open 24/7",
  basedIn: "Ontario, Canada",
  credentials: [
    "Fully insured",
    "WSIB covered",
    "Free on-site estimates",
    "Written fixed quotes",
    "Residential · Commercial · Public sector",
    "Open 24/7",
  ],
};

export const hero = {
  eyebrow: "Property maintenance & renovation · Ontario",
  // The word wrapped in <em> renders in gold
  titleHtml: "One Call for <em>Everything</em> Your Property Needs",
  subtitle:
    "From a leaking tap to a full renovation — Homsify handles all of it. One project manager, one written quote, one invoice, for residential, commercial and public-sector property across Ontario.",
  ctaPrimary: { label: "Get a free quote", href: "#quote" },
  ctaSecondary: { label: "See our services", href: "#services" },
  slides: [
    { src: px(36153946, 1900), alt: "Homsify painting crew finishing an interior" },
    { src: px(8470030, 1900), alt: "New construction walkthrough with the property owner" },
    { src: px(5691550, 1900), alt: "Window and door installation in progress" },
    { src: px(8487725, 1900), alt: "Homsify crew member on a renovation site" },
  ],
  stats: [
    { value: "23", label: "Services in-house" },
    { value: "24/7", label: "Always available" },
    { value: "Free", label: "On-site estimates" },
    { value: "2 yr", label: "Workmanship warranty" },
  ],
};

/* ---------------------------------------------------------------------------
   SERVICES
   `season` drives the "Right now" band. Month numbers: 1 = Jan … 12 = Dec.
   Use "all" for year-round services.
   --------------------------------------------------------------------------- */

export type Service = {
  code: string;
  slug: string;
  name: string;
  short: string;
  season: number[] | "all";
};

export const serviceGroups: { id: string; title: string; note: string; services: Service[] }[] = [
  {
    id: "build",
    title: "Build & renovate",
    note: "Permit-ready work, managed end to end",
    services: [
      { code: "HM-01", slug: "home-renovations", name: "Home renovations", short: "Whole-property remodels, managed start to finish on one schedule.", season: "all" },
      { code: "HM-02", slug: "kitchen-remodeling", name: "Kitchen remodeling & cabinets", short: "Custom cabinetry, countertops, islands and full kitchen rebuilds.", season: "all" },
      { code: "HM-03", slug: "bathroom-renovations", name: "Bathroom renovations", short: "Tile, tubs, walk-in showers, vanities and accessible retrofits.", season: "all" },
      { code: "HM-04", slug: "basement-finishing", name: "Basement finishing", short: "Framing, insulation, egress windows and legal secondary suites.", season: "all" },
      { code: "HM-05", slug: "new-construction", name: "New construction & additions", short: "Ground-up builds, garages, additions and second-storey work.", season: [4, 5, 6, 7, 8, 9, 10] },
      { code: "HM-06", slug: "drywall-plaster", name: "Drywall & plaster", short: "Board, tape, mud, texture matching and seamless patch repair.", season: "all" },
    ],
  },
  {
    id: "interiors",
    title: "Interiors & finishes",
    note: "The work people live with every day",
    services: [
      { code: "HM-07", slug: "painting", name: "Interior & exterior painting", short: "Spray and brush finishes, colour consultation, cabinet refinishing.", season: "all" },
      { code: "HM-08", slug: "flooring", name: "Flooring installation", short: "Hardwood, engineered, luxury vinyl, tile, laminate and carpet.", season: "all" },
      { code: "HM-09", slug: "bathtub-reglazing", name: "Bathtub reglazing", short: "Refinish tubs, tile and sinks in a day — a fraction of replacement cost.", season: "all" },
      { code: "HM-10", slug: "windows-doors", name: "Windows & doors", short: "Supply and install, weather sealing, hardware and glass repair.", season: "all" },
      { code: "HM-11", slug: "electrical", name: "Electrical service work", short: "Fixtures, panels, EV chargers and code-compliance corrections.", season: "all" },
      { code: "HM-12", slug: "plumbing", name: "Plumbing service work", short: "Fixtures, rough-ins, leak repair, backflow and drain service.", season: "all" },
      { code: "HM-13", slug: "handyman-repairs", name: "Handyman repairs", short: "Small jobs, punch lists and the tasks nobody else will book.", season: "all" },
    ],
  },
  {
    id: "grounds",
    title: "Grounds & exterior",
    note: "Season-driven, scheduled in advance",
    services: [
      { code: "HM-14", slug: "landscaping", name: "Landscaping & lawn care", short: "Design, planting, sod, mulch, garden beds and seasonal cleanups.", season: [4, 5, 6, 7, 8, 9, 10, 11] },
      { code: "HM-15", slug: "asphalt-repair", name: "Asphalt & driveway repair", short: "Patching, crack fill, sealcoating, resurfacing and line painting.", season: [5, 6, 7, 8, 9] },
      { code: "HM-16", slug: "roofing-siding", name: "Roofing & siding repair", short: "Shingle repair and replacement, soffit, fascia and siding.", season: [4, 5, 6, 7, 8, 9, 10] },
      { code: "HM-17", slug: "pressure-washing", name: "Pressure washing", short: "Siding, driveways, decks, walkways and commercial storefronts.", season: [4, 5, 6, 7, 8, 9, 10] },
      { code: "HM-18", slug: "snow-removal", name: "Snow & ice management", short: "Seasonal contracts, plowing, shovelling, salting and hauling.", season: [11, 12, 1, 2, 3] },
    ],
  },
  {
    id: "care",
    title: "Care & logistics",
    note: "Keeping properties turning over",
    services: [
      { code: "HM-19", slug: "cleaning", name: "Cleaning services", short: "Recurring janitorial, deep cleans and move-out cleaning.", season: "all" },
      { code: "HM-20", slug: "post-construction-cleanup", name: "Post-construction cleanup", short: "Dust-down, debris removal and final hand-over presentation.", season: "all" },
      { code: "HM-21", slug: "junk-removal", name: "Junk removal & disposal", short: "Single items to full property clear-outs, sorted and diverted.", season: "all" },
      { code: "HM-22", slug: "moving-labour", name: "Moving & labour services", short: "Local moves, loading crews, in-building shifts and storage runs.", season: "all" },
      { code: "HM-23", slug: "property-turnover", name: "Property turnover & make-ready", short: "Between-tenant repair, paint, clean and inspection in one visit.", season: "all" },
    ],
  },
];

export const allServices: Service[] = serviceGroups.flatMap((g) => g.services);

/* --------------------------------------------------------------------------- */

export const about = {
  eyebrow: "Who we are",
  title: "One Contractor.<br>Every Trade.",
  body:
    "Homsify exists to end the contractor scramble. Instead of chasing five trades for one property, you get a single project manager, a written fixed quote, and crews we employ and stand behind — the same standard whether it's a downtown condo, a retail plaza, or a municipal facility.",
  image: px(8470047, 1100),
  imageAlt: "Homsify project manager reviewing plans on site",
  badge: { value: "23", label: "Services under one roof" },
  points: [
    "One project manager from quote to walkthrough",
    "Written fixed-price quotes that hold",
    "Fully insured and WSIB covered crews",
    "Two-year written workmanship warranty",
  ],
};

export const sectors = [
  {
    slug: "residential",
    title: "Residential",
    image: px(7218568, 900),
    body: "Homeowners, landlords and property managers who want one number to call for everything from a leaking tap to a full gut renovation.",
    points: ["Renovations & additions", "Seasonal grounds care", "Tenant turnover packages", "Repairs and handyman work"],
  },
  {
    slug: "commercial",
    title: "Commercial",
    image: px(8293640, 900),
    body: "Retail, office, industrial and multi-unit sites needing scheduled maintenance and after-hours work that doesn't disturb operations.",
    points: ["Scheduled maintenance contracts", "Parking lot & asphalt programs", "Tenant fit-outs", "Janitorial & waste"],
  },
  {
    slug: "public-sector",
    title: "Public sector",
    image: px(8470030, 900),
    body: "Municipalities, schools, healthcare and non-profits. Fully insured, WSIB covered, with procurement-ready documentation and tendering support.",
    points: ["RFP & tender submissions", "Screened crews", "Accessibility retrofits", "Facility maintenance"],
  },
];

export const process = [
  { n: "01", title: "Tell us the property", body: "Send the address, the sector, and what needs doing. A project manager reads it — not an auto-responder." },
  { n: "02", title: "Site visit & fixed quote", body: "We attend, measure, and return a written itemised quote with a fixed price and a start date. Free, no obligation." },
  { n: "03", title: "Scheduled and crewed", body: "One project manager, a schedule with real dates, and crews we employ. Site protection and disposal are in-scope." },
  { n: "04", title: "Walkthrough & warranty", body: "We walk the finished work with you, close the punch list before invoicing, and back it with a two-year warranty." },
];

export const projects = [
  { title: "Century home full renovation", sector: "Residential", location: "London", image: px(3615725, 1000) },
  { title: "Plaza parking lot & asphalt program", sector: "Commercial", location: "Chatham-Kent", image: px(8470046, 1000) },
  { title: "Community centre accessibility retrofit", sector: "Public sector", location: "Sarnia", image: px(8470795, 1000) },
  { title: "Kitchen and main floor remodel", sector: "Residential", location: "Kitchener", image: px(4567374, 1000) },
  { title: "12-unit turnover and repaint", sector: "Commercial", location: "Windsor", image: px(5691679, 1000) },
  { title: "Seasonal grounds and snow contract", sector: "Commercial", location: "London", image: px(5691693, 1000) },
];

/** The five largest cities in the region, London included. */
export const cities = [
  { name: "London", note: "Head office" },
  { name: "Windsor", note: "Essex County" },
  { name: "Kitchener", note: "Waterloo Region" },
  { name: "Sarnia", note: "Lambton County" },
  { name: "Chatham-Kent", note: "Southwest" },
];

export const testimonials = [
  { quote: "We stopped juggling six contractors. Homsify handled the roof, the parking lot and the interior repaint on one schedule and one invoice.", name: "Marc Delaney", role: "Property manager, retail portfolio" },
  { quote: "The quote was fixed, itemised, and it held. That almost never happens on a century home.", name: "Priya Raman", role: "Homeowner, London" },
  { quote: "Documentation was procurement-ready on the first submission, and their crews were screened before they set foot on site.", name: "J. Whitfield", role: "Facilities lead, municipal client" },
];

export const quoteForm = {
  eyebrow: "Request a quote",
  title: "Let&rsquo;s Start<br>Your Project",
  lede:
    "Send the details once. A project manager reviews every request personally and replies within one business day — usually the same day. Free estimates, no obligation, no call centre.",
  propertyTypes: ["Residential", "Commercial", "Public sector / institutional", "Multi-residential"],
  budgets: ["Under $2,500", "$2,500 – $10,000", "$10,000 – $50,000", "$50,000 – $250,000", "$250,000+", "Not sure yet"],
  timelines: ["Urgent — as soon as possible", "Within 2 weeks", "Within 1–3 months", "3+ months", "Planning / budgeting"],
  successMessage:
    "Request received. A confirmation is on its way to your inbox and a project manager will contact you within one business day.",
  errorMessage:
    "That didn't send. Call or text 226-386-4012, or email info@homsify.ca, and we'll take the details directly.",
};

export const seo = {
  title: "Homsify — Property Maintenance, Renovation & Services | Ontario",
  description:
    "One contractor for every property need in Ontario. Renovations, painting, flooring, bathtub reglazing, landscaping, snow removal, asphalt, cleaning, junk removal and moving. Residential, commercial and public sector. Free quotes.",
  url: "https://homsify.ca",
};
