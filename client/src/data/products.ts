/**
 * Product catalog for ManusVape
 * Contains 4 major brands with 3 top products each
 */

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  nicotineContent: string;
  flavor: string;
  puffs: number;
  description: string;
  imageUrl: string;
  logoUrl: string;
  isActive: boolean;
}

export const BRANDS = {
  RELX: {
    name: "RELX",
    logo: "/products/relx/logo.png",
    description: "Premium pod system and disposable vapes from RELX",
  },
  ALIBARBAR: {
    name: "ALIBARBAR",
    logo: "/products/alibarbar/logo.png",
    description: "High-capacity disposable vapes with advanced technology",
  },
  IGET: {
    name: "IGET",
    logo: "/products/iget/logo.png",
    description: "Innovative vaping solutions with extended puff counts",
  },
  BIMO: {
    name: "BIMO",
    logo: "/products/bimo/logo.jpg",
    description: "Rechargeable disposable vapes with smart display",
  },
};

export const PRODUCTS: Product[] = [
  // RELX Products
  {
    id: 1,
    name: "RELX Infinity Plus",
    brand: "RELX",
    category: "Pod Systems",
    price: 4999, // AUD cents
    nicotineContent: "18mg",
    flavor: "Menthol",
    puffs: 2000,
    description:
      "Premium rechargeable pod system with advanced heating technology. Smooth vapor production and long-lasting battery.",
    imageUrl: "/products/relx/infinity-plus.jpg",
    logoUrl: "/products/relx/logo.png",
    isActive: true,
  },
  {
    id: 2,
    name: "RELX Super Smooth",
    brand: "RELX",
    category: "Pod Systems",
    price: 4499,
    nicotineContent: "12mg",
    flavor: "Strawberry",
    puffs: 1800,
    description:
      "Ergonomic design with ultra-smooth vapor. Perfect for all-day use with consistent flavor delivery.",
    imageUrl: "/products/relx/super-smooth.jpg",
    logoUrl: "/products/relx/logo.png",
    isActive: true,
  },
  {
    id: 3,
    name: "RELX Phantom",
    brand: "RELX",
    category: "Disposables",
    price: 2999,
    nicotineContent: "20mg",
    flavor: "Mint",
    puffs: 1200,
    description:
      "Compact disposable vape with premium flavor options. No charging required, ready to use out of the box.",
    imageUrl: "/products/relx/phantom.jpg",
    logoUrl: "/products/relx/logo.png",
    isActive: true,
  },

  // ALIBARBAR Products
  {
    id: 4,
    name: "ALIBARBAR Ingot 9000",
    brand: "ALIBARBAR",
    category: "Disposables",
    price: 3499,
    nicotineContent: "5%",
    flavor: "Blackberry Dragon Fruit",
    puffs: 9000,
    description:
      "High-capacity disposable with 9000 puffs. Smooth draw and consistent flavor throughout the entire device.",
    imageUrl: "/products/alibarbar/ingot-9000.webp",
    logoUrl: "/products/alibarbar/logo.png",
    isActive: true,
  },
  {
    id: 5,
    name: "ALIBARBAR Ingot 9000 Strawberry Coconut",
    brand: "ALIBARBAR",
    category: "Disposables",
    price: 3499,
    nicotineContent: "5%",
    flavor: "Strawberry Coconut Watermelon",
    puffs: 9000,
    description:
      "Tropical flavor blend with 9000 puffs. Premium taste and long-lasting performance.",
    imageUrl: "/products/alibarbar/ingot-9000-alt.jpg",
    logoUrl: "/products/alibarbar/logo.png",
    isActive: true,
  },
  {
    id: 6,
    name: "ALIBARBAR Ice Adjust",
    brand: "ALIBARBAR",
    category: "Disposables",
    price: 3299,
    nicotineContent: "3%",
    flavor: "Mixed Fruits",
    puffs: 7000,
    description:
      "Adjustable cooling feature for personalized vaping experience. Perfect for those who like to customize their session.",
    imageUrl: "/products/alibarbar/ice-adjust.jpg",
    logoUrl: "/products/alibarbar/logo.png",
    isActive: true,
  },

  // IGET Products
  {
    id: 7,
    name: "IGET KP20000",
    brand: "IGET",
    category: "Disposables",
    price: 4299,
    nicotineContent: "5%",
    flavor: "Mint",
    puffs: 20000,
    description:
      "Ultra-high capacity disposable with 20000 puffs. Advanced mesh coil technology for superior flavor.",
    imageUrl: "/products/iget/kp20000.webp",
    logoUrl: "/products/iget/logo.png",
    isActive: true,
  },
  {
    id: 8,
    name: "IGET Legend 4000",
    brand: "IGET",
    category: "Disposables",
    price: 2799,
    nicotineContent: "5%",
    flavor: "Blueberry Raspberry",
    puffs: 4000,
    description:
      "Reliable mid-range disposable with excellent flavor profile. Great for everyday vaping.",
    imageUrl: "/products/iget/legend-4000.webp",
    logoUrl: "/products/iget/logo.png",
    isActive: true,
  },
  {
    id: 9,
    name: "IGET Bar Pro",
    brand: "IGET",
    category: "Disposables",
    price: 3199,
    nicotineContent: "5%",
    flavor: "Strawberry Watermelon",
    puffs: 6000,
    description:
      "Premium disposable with sleek design and consistent vapor production. Perfect for on-the-go use.",
    imageUrl: "/products/iget/bar-pro.webp",
    logoUrl: "/products/iget/logo.png",
    isActive: true,
  },

  // BIMO Products
  {
    id: 10,
    name: "BIMO Turbo 20000",
    brand: "BIMO",
    category: "Disposables",
    price: 4599,
    nicotineContent: "5%",
    flavor: "Watermelon Ice",
    puffs: 20000,
    description:
      "Rechargeable disposable with smart display screen. 20000 puffs with adjustable nicotine levels.",
    imageUrl: "/products/bimo/turbo-20000.png",
    logoUrl: "/products/bimo/logo.jpg",
    isActive: true,
  },
  {
    id: 11,
    name: "BIMO Turbo 20000 Full Screen",
    brand: "BIMO",
    category: "Disposables",
    price: 4599,
    nicotineContent: "2%",
    flavor: "Mixed Fruits",
    puffs: 20000,
    description:
      "Advanced model with full-screen display. Real-time puff counter and battery indicator.",
    imageUrl: "/products/bimo/turbo-20000-full.webp",
    logoUrl: "/products/bimo/logo.jpg",
    isActive: true,
  },
  {
    id: 12,
    name: "BIMO Crystal X 50",
    brand: "BIMO",
    category: "Disposables",
    price: 3899,
    nicotineContent: "0%",
    flavor: "Strawberry Kiwi",
    puffs: 10000,
    description:
      "Nicotine-free option with 10000 puffs. Perfect for those reducing nicotine intake while enjoying flavor.",
    imageUrl: "/products/bimo/turbo-20000-alt.webp",
    logoUrl: "/products/bimo/logo.jpg",
    isActive: true,
  },
];

/**
 * Get products by brand
 */
export function getProductsByBrand(brand: string): Product[] {
  return PRODUCTS.filter((p) => p.brand === brand && p.isActive);
}

/**
 * Get all active products
 */
export function getAllActiveProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isActive);
}

/**
 * Get product by ID
 */
export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id && p.isActive);
}

/**
 * Get unique brands
 */
export function getUniqueBrands(): string[] {
  return Array.from(new Set(PRODUCTS.filter((p) => p.isActive).map((p) => p.brand)));
}
