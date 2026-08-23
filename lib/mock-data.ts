export type Category = {
  name: string;
  description: string;
  href: string;
  gradient: string;
  image: string;
};

export const categories: Category[] = [
  {
    name: "Kanjivaram Silk",
    description: "Regal silk, woven for weddings",
    href: "/shop?category=kanjivaram",
    gradient: "from-[oklch(0.33_0.13_18)] to-[oklch(0.48_0.15_25)]",
    image: "/images/saree/Kanjivaram-Silk.png",
  },
  {
    name: "Banarasi Silk",
    description: "Timeless brocade from Varanasi",
    href: "/shop?category=banarasi",
    gradient: "from-[oklch(0.4_0.12_25)] to-[oklch(0.58_0.14_35)]",
    image: "/images/saree/Banarasi-Silk.jpg",
  },
  {
    name: "Jamdani Weaves",
    description: "Fine handloom motifs from Bengal",
    href: "/shop?category=jamdani",
    gradient: "from-[oklch(0.6_0.06_120)] to-[oklch(0.78_0.09_110)]",
    image: "/images/saree/Jamdani-Weaves.png",
  },
  {
    name: "Tussar Silk",
    description: "Wild silk with a natural sheen",
    href: "/shop?category=tussar",
    gradient: "from-[oklch(0.55_0.1_75)] to-[oklch(0.78_0.14_85)]",
    image: "/images/saree/Tussar-Silk.jpg",
  },
  {
    name: "Paithani",
    description: "Kaleidoscope borders from Maharashtra",
    href: "/shop?category=paithani",
    gradient: "from-[oklch(0.4_0.13_35)] to-[oklch(0.6_0.14_50)]",
    image: "/images/saree/Paithani.jpg",
  },
  {
    name: "Mangalagiri Cotton",
    description: "Crisp handloom cotton, everyday ease",
    href: "/shop?category=mangalagiri",
    gradient: "from-[oklch(0.65_0.07_50)] to-[oklch(0.82_0.08_75)]",
    image: "/images/saree/Mangalagiri-Cotton.jpg",
  },
  {
    name: "Chettinad Cotton",
    description: "Bold checks from Tamil Nadu",
    href: "/shop?category=chettinad",
    gradient: "from-[oklch(0.5_0.1_25)] to-[oklch(0.7_0.11_45)]",
    image: "/images/saree/Chettinad-Cotton.jpg",
  },
  {
    name: "Kota Doria",
    description: "Featherlight weave for warm days",
    href: "/shop?category=kota",
    gradient: "from-[oklch(0.55_0.06_140)] to-[oklch(0.74_0.08_120)]",
    image: "/images/saree/Kota-Doria.jpg",
  },
  {
    name: "Wedding Edit",
    description: "Heirlooms in the making",
    href: "/shop?category=kanjivaram,banarasi,paithani",
    gradient: "from-[oklch(0.78_0.14_85)] to-[oklch(0.55_0.13_35)]",
    image: "/images/saree/Wedding-Edit.jpg",
  },
];

/** The specific handloom weaving tradition a saree belongs to. */
export type ProductCategory =
  | "kanjivaram"
  | "banarasi"
  | "jamdani"
  | "tussar"
  | "paithani"
  | "mangalagiri"
  | "chettinad"
  | "kota";

/** The base fabric the saree is woven from. */
export type FabricType = "silk" | "cotton" | "linen" | "blend";

export type ProductColor =
  | "maroon"
  | "red"
  | "gold"
  | "mustard"
  | "green"
  | "blue"
  | "pink"
  | "ivory"
  | "black"
  | "purple";

export type ProductPattern =
  | "zari-border"
  | "temple-border"
  | "checks"
  | "stripes"
  | "floral"
  | "ikat-print"
  | "solid"
  | "buta-motif";

export type Product = {
  id: string;
  name: string;
  weaver: string;
  region: string;
  category: ProductCategory;
  fabric: FabricType;
  color: ProductColor;
  pattern: ProductPattern;
  price: number;
  originalPrice?: number;
  gradient: string;
  tag?: string;
  images?: string[];
};

export const featuredProducts: Product[] = [
  {
    id: "rc-001",
    name: "Vaidehi Kanjivaram",
    weaver: "Woven by Lakshmi Amma",
    region: "Kanchipuram, TN",
    category: "kanjivaram",
    fabric: "silk",
    color: "maroon",
    pattern: "zari-border",
    price: 12499,
    originalPrice: 17999,
    gradient: "from-[oklch(0.33_0.13_18)] to-[oklch(0.5_0.16_30)]",
    tag: "Bestseller",
    images: [
      "/generated/20260807T161751_u3fqde_front.png",
      "/generated/20260807T161751_u3fqde_side.png",
      "/generated/20260807T161751_u3fqde_back.png",
    ],
  },
  {
    id: "rc-002",
    name: "Anandi Handspun Cotton",
    weaver: "Woven by Ranjit Das",
    region: "Shantipur, WB",
    category: "jamdani",
    fabric: "cotton",
    color: "ivory",
    pattern: "buta-motif",
    price: 3299,
    gradient: "from-[oklch(0.6_0.08_60)] to-[oklch(0.78_0.1_80)]",
    images: [
      "/generated/20260807T161751_u3fqde_front.png",
      "/generated/20260807T161751_u3fqde_side.png",
      "/generated/20260807T161751_u3fqde_back.png",
    ],
  },
  {
    id: "rc-003",
    name: "Meher Tussar Silk",
    weaver: "Woven by Sunita Devi",
    region: "Bhagalpur, BR",
    category: "tussar",
    fabric: "silk",
    color: "gold",
    pattern: "solid",
    price: 6799,
    originalPrice: 8499,
    gradient: "from-[oklch(0.55_0.1_75)] to-[oklch(0.78_0.14_85)]",
    tag: "Festive Sale",
  },
  {
    id: "rc-004",
    name: "Ira Jamdani Linen",
    weaver: "Woven by Abdul Kareem",
    region: "Fulia, WB",
    category: "jamdani",
    fabric: "linen",
    color: "green",
    pattern: "buta-motif",
    price: 4599,
    gradient: "from-[oklch(0.5_0.07_130)] to-[oklch(0.75_0.09_115)]",
  },
];

export const catalogProducts: Product[] = [
  ...featuredProducts,
  {
    id: "rc-005",
    name: "Anaya Banarasi Silk",
    weaver: "Woven by Irfan Ansari",
    region: "Varanasi, UP",
    category: "banarasi",
    fabric: "silk",
    color: "red",
    pattern: "zari-border",
    price: 15999,
    gradient: "from-[oklch(0.4_0.12_25)] to-[oklch(0.58_0.14_35)]",
    tag: "New",
    images: [
      "/images/saree/Banarasi-Silk.jpg",
      "/generated/20260808T143120_uiaiwv_front.png",
      "/generated/20260808T143120_uiaiwv_side.png",
    ],
  },
  {
    id: "rc-006",
    name: "Kavya Mangalagiri Cotton",
    weaver: "Woven by Venkata Rao",
    region: "Guntur, AP",
    category: "mangalagiri",
    fabric: "cotton",
    color: "mustard",
    pattern: "checks",
    price: 2799,
    gradient: "from-[oklch(0.65_0.07_50)] to-[oklch(0.82_0.08_75)]",
    images: [
      "/images/saree/Mangalagiri-Cotton.jpg",
      "/images/saree/Kota-Doria.jpg",
      "/images/saree/Chettinad-Cotton.jpg",
    ],
  },
  {
    id: "rc-007",
    name: "Riya Chettinad Cotton",
    weaver: "Woven by Meena Karthik",
    region: "Karaikudi, TN",
    category: "chettinad",
    fabric: "cotton",
    color: "maroon",
    pattern: "checks",
    price: 3599,
    originalPrice: 4299,
    gradient: "from-[oklch(0.5_0.1_25)] to-[oklch(0.7_0.11_45)]",
    tag: "Sale",
    images: [
      "/images/saree/Chettinad-Cotton.jpg",
      "/images/saree/Mangalagiri-Cotton.jpg",
      "/images/saree/Kota-Doria.jpg",
    ],
  },
  {
    id: "rc-008",
    name: "Zara Bhagalpuri Linen",
    weaver: "Woven by Naushad Alam",
    region: "Bhagalpur, BR",
    category: "kota",
    fabric: "linen",
    color: "blue",
    pattern: "stripes",
    price: 5299,
    gradient: "from-[oklch(0.55_0.06_140)] to-[oklch(0.74_0.08_120)]",
    images: [
      "/images/saree/Kota-Doria.jpg",
      "/images/saree/Jamdani-Weaves.png",
      "/generated/20260807T161751_u3fqde_front.png",
    ],
  },
  {
    id: "rc-009",
    name: "Naina Cotton-Linen Blend",
    weaver: "Woven by Abdul Kareem",
    region: "Fulia, WB",
    category: "jamdani",
    fabric: "blend",
    color: "pink",
    pattern: "floral",
    price: 3899,
    originalPrice: 4599,
    gradient: "from-[oklch(0.6_0.05_110)] to-[oklch(0.8_0.08_100)]",
    tag: "Sale",
    images: [
      "/images/saree/Jamdani-Weaves.png",
      "/images/saree/Banarasi-Silk.jpg",
      "/generated/20260807T161751_u3fqde_side.png",
    ],
  },
  {
    id: "rc-010",
    name: "Sitara Bridal Kanjivaram",
    weaver: "Woven by Lakshmi Amma",
    region: "Kanchipuram, TN",
    category: "kanjivaram",
    fabric: "silk",
    color: "red",
    pattern: "zari-border",
    price: 24999,
    gradient: "from-[oklch(0.3_0.14_15)] to-[oklch(0.55_0.15_30)]",
    tag: "Bestseller",
    images: [
      "/images/saree/Kanjivaram-Silk.png",
      "/generated/20260807T161751_u3fqde_front.png",
      "/generated/20260807T161751_u3fqde_back.png",
    ],
  },
  {
    id: "rc-011",
    name: "Amara Banarasi Bridal",
    weaver: "Woven by Irfan Ansari",
    region: "Varanasi, UP",
    category: "banarasi",
    fabric: "silk",
    color: "maroon",
    pattern: "zari-border",
    price: 21499,
    originalPrice: 26999,
    gradient: "from-[oklch(0.35_0.13_20)] to-[oklch(0.72_0.13_80)]",
    tag: "Festive Sale",
    images: [
      "/images/saree/Banarasi-Silk.jpg",
      "/images/saree/Wedding-Edit.jpg",
      "/generated/20260808T143120_uiaiwv_side.png",
    ],
  },
  {
    id: "rc-012",
    name: "Meera Paithani Bridal",
    weaver: "Woven by Kavita Jadhav",
    region: "Yeola, MH",
    category: "paithani",
    fabric: "silk",
    color: "purple",
    pattern: "buta-motif",
    price: 18999,
    gradient: "from-[oklch(0.4_0.13_35)] to-[oklch(0.6_0.14_50)]",
    tag: "New",
    images: [
      "/images/saree/Paithani.jpg",
      "/images/saree/Wedding-Edit.jpg",
      "/generated/20260807T161751_u3fqde_back.png",
    ],
  },
];

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Anjali Rao",
    location: "Bengaluru",
    quote:
      "The saree arrived exactly as pictured: the silk, the zari work, everything. Knowing it came straight from the weaver's family made it feel even more special.",
    initials: "AR",
  },
  {
    name: "Priya Menon",
    location: "Kochi",
    quote:
      "I've bought from Rucira three times now. Their cotton sarees are unbelievably soft, and the packaging always includes a little note about who wove it.",
    initials: "PM",
  },
  {
    name: "Sanya Kapoor",
    location: "Delhi",
    quote:
      "Wore the Vaidehi Kanjivaram to my sister's wedding, got so many compliments. Love that my purchase directly supported the weaver family.",
    initials: "SK",
  },
];

export const craftSteps = [
  {
    step: "01",
    title: "Spinning the Yarn",
    description:
      "Raw silk and cotton fibres are hand-spun into fine, even threads, a skill passed down through generations.",
  },
  {
    step: "02",
    title: "Natural Dyeing",
    description:
      "Threads are dyed in small batches using time-honoured techniques, giving every saree its rich, lasting colour.",
  },
  {
    step: "03",
    title: "Hand Weaving",
    description:
      "Master weavers work the pit loom for days, interlacing warp and weft into intricate borders and motifs.",
  },
  {
    step: "04",
    title: "Finishing & Care",
    description:
      "Each saree is washed, pressed, and inspected by hand before it's wrapped and sent directly to you.",
  },
];

export const impactStats = [
  { value: 500, suffix: "+", label: "Weaver families supported" },
  { value: 12, suffix: "", label: "States across India" },
  { value: 50000, suffix: "+", label: "Sarees handwoven & sold" },
  { value: 0, suffix: "", label: "Middlemen in between" },
];

export type JourneyStep = {
  step: string;
  title: string;
  duration: string;
  description: string;
  gradient: string;
  image: string;
};

export const journeySteps: JourneyStep[] = [
  {
    step: "01",
    title: "Sourcing the fibre",
    duration: "Day 1",
    description:
      "We choose the finest silk and cotton from trusted farms and mills, keeping the process transparent and honest from the start.",
    gradient: "from-[oklch(0.55_0.09_55)] to-[oklch(0.75_0.09_70)]",
    image: "/images/saree/Kanjivaram-Silk.png",
  },
  {
    step: "02",
    title: "Spinning the yarn",
    duration: "Day 2-3",
    description:
      "The fibre is hand-spun into strong, even yarns, a skill that depends on patience and a steady hand.",
    gradient: "from-[oklch(0.6_0.08_60)] to-[oklch(0.78_0.1_80)]",
    image: "/images/saree/Mangalagiri-Cotton.jpg",
  },
  {
    step: "03",
    title: "Natural dyeing",
    duration: "Day 4-5",
    description:
      "The yarn is dyed in small batches using traditional methods that preserve colour and texture without unnecessary waste.",
    gradient: "from-[oklch(0.5_0.1_75)] to-[oklch(0.78_0.14_85)]",
    image: "/images/saree/Tussar-Silk.jpg",
  },
  {
    step: "04",
    title: "Preparing the loom",
    duration: "Day 6",
    description:
      "Thousands of threads are aligned by hand before the loom starts turning, setting the pattern for the entire saree.",
    gradient: "from-[oklch(0.45_0.1_30)] to-[oklch(0.6_0.13_40)]",
    image: "/images/saree/Kota-Doria.jpg",
  },
  {
    step: "05",
    title: "Hand weaving",
    duration: "Day 7-12",
    description:
      "The master weaver works on the loom, rhythm by rhythm, as the border, motif and body of the saree take shape.",
    gradient: "from-[oklch(0.33_0.13_18)] to-[oklch(0.5_0.16_30)]",
    image: "/images/saree/Wedding-Edit.jpg",
  },
  {
    step: "06",
    title: "Finishing and quality check",
    duration: "Day 13",
    description:
      "Each saree is washed, pressed and checked by hand before we pack it and send it directly to you.",
    gradient: "from-[oklch(0.5_0.07_130)] to-[oklch(0.75_0.09_115)]",
    image: "/images/saree/Banarasi-Silk.jpg",
  },
];

export type WeaverProfile = {
  name: string;
  village: string;
  craft: string;
  experience: string;
  quote: string;
  gradient: string;
};

export type FeaturedWeaver = WeaverProfile & { story: string };

export const featuredWeaver: FeaturedWeaver = {
  name: "Kavita Jadhav",
  village: "Yeola, Maharashtra",
  craft: "Paithani Silk",
  experience: "27 years of weaving",
  quote:
    "A Paithani takes six weeks and four hands. When a bride wears mine on her wedding day, our whole family feels like we're standing beside her.",
  story:
    "Kavita learned the paithani's signature kaleidoscope border from her mother-in-law at seventeen. Today she trains three apprentices in her home workshop — women from her village who once had no way to earn from the craft they grew up watching.",
  gradient: "from-[oklch(0.4_0.13_35)] to-[oklch(0.6_0.14_50)]",
};

export const weaverProfiles: WeaverProfile[] = [
  {
    name: "Lakshmi Amma",
    village: "Kanchipuram, Tamil Nadu",
    craft: "Kanjivaram Silk",
    experience: "32 years of weaving",
    quote:
      "Every border I weave carries what my mother taught me. Rucira lets that story reach further than our village ever could.",
    gradient: "from-[oklch(0.33_0.13_18)] to-[oklch(0.5_0.16_30)]",
  },
  {
    name: "Ranjit Das",
    village: "Shantipur, West Bengal",
    craft: "Handspun Cotton",
    experience: "18 years of weaving",
    quote:
      "Fair pay, on time, every time. For the first time, I can plan my son's schooling around my loom, not despite it.",
    gradient: "from-[oklch(0.6_0.08_60)] to-[oklch(0.78_0.1_80)]",
  },
  {
    name: "Sunita Devi",
    village: "Bhagalpur, Bihar",
    craft: "Tussar Silk",
    experience: "24 years of weaving",
    quote:
      "I used to sell to a middleman for half of what I'm worth. Now my name is stitched into the label of every saree.",
    gradient: "from-[oklch(0.55_0.1_75)] to-[oklch(0.78_0.14_85)]",
  },
  {
    name: "Irfan Ansari",
    village: "Varanasi, Uttar Pradesh",
    craft: "Banarasi Silk",
    experience: "21 years of weaving",
    quote:
      "A Banarasi brocade can take three weeks on the jacquard loom. Every zari thread has to be placed by hand — there's no shortcut worth taking.",
    gradient: "from-[oklch(0.4_0.12_25)] to-[oklch(0.58_0.14_35)]",
  },
  {
    name: "Venkata Rao",
    village: "Guntur, Andhra Pradesh",
    craft: "Mangalagiri Cotton",
    experience: "15 years of weaving",
    quote:
      "Mangalagiri cotton is woven without a single power tool, borders and all. People notice the difference the first time they wear it.",
    gradient: "from-[oklch(0.65_0.07_50)] to-[oklch(0.82_0.08_75)]",
  },
  {
    name: "Meena Karthik",
    village: "Karaikudi, Tamil Nadu",
    craft: "Chettinad Cotton",
    experience: "19 years of weaving",
    quote:
      "Our checks and stripes look simple, but getting the count exact by hand takes years to learn. I'm teaching my daughter now.",
    gradient: "from-[oklch(0.5_0.1_25)] to-[oklch(0.7_0.11_45)]",
  },
];

export type WeavingRegion = {
  state: string;
  craft: string;
};

export const weavingRegions: WeavingRegion[] = [
  { state: "Tamil Nadu", craft: "Kanjivaram Silk" },
  { state: "Uttar Pradesh", craft: "Banarasi Brocade" },
  { state: "West Bengal", craft: "Jamdani & Tant" },
  { state: "Bihar", craft: "Tussar Silk" },
  { state: "Telangana", craft: "Pochampally Ikat" },
  { state: "Madhya Pradesh", craft: "Chanderi & Maheshwari" },
  { state: "Odisha", craft: "Sambalpuri Ikat" },
  { state: "Assam", craft: "Muga Silk" },
];

export type Certification = {
  title: string;
  description: string;
};

export const certifications: Certification[] = [
  {
    title: "GI-Tagged Weaves",
    description:
      "We source Kanjivaram and Banarasi sarees only from Geographical Indication–tagged weaving clusters.",
  },
  {
    title: "Silk Mark Yarn",
    description:
      "Every silk saree is woven from Silk Mark–certified yarn, verifying it's genuine natural silk.",
  },
  {
    title: "Handloom, Not Power Loom",
    description:
      "Each saree is inspected for the subtle irregularities that only a hand-operated pit loom leaves behind.",
  },
  {
    title: "Fair-Trade Pricing",
    description:
      "Weavers are paid a fixed fair price before we list a single saree — regardless of how it sells.",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "How do I know a saree is genuinely handwoven?",
    answer:
      "Every product page names the weaver and village it came from. We visit each cluster ourselves, and only list sarees woven on a hand-operated pit loom — never power loom.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders reach you within 5–7 business days across India. Made-to-order bridal pieces can take 2–3 weeks — we'll always tell you upfront on the product page.",
  },
  {
    question: "Can I return or exchange a saree?",
    answer:
      "Yes — unworn sarees with tags intact can be returned within 7 days of delivery for a full refund or exchange. Made-to-order bridal pieces are final sale.",
  },
  {
    question: "How should I care for a handloom saree?",
    answer:
      "Most silks should be dry-cleaned; handspun cottons can be hand-washed in cold water. Every order ships with a care card specific to that saree's weave.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship across India only. We're working on international shipping — join our newsletter and we'll let you know the moment it's live.",
  },
];
