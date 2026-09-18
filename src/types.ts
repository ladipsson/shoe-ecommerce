export type CategoryId = 'all' | 'school' | 'men' | 'women' | 'kids' | 'boots' | 'sale';

export interface ProductVariation {
  colorName: string;
  colorHex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  subCategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isSchoolPick?: boolean;
  images: string[];
  description: string;
  features: string[];
  material: string;
  sole: string;
  closure: string;
  colors: ProductVariation[];
  sizes: string[]; // e.g., ["UK 3", "UK 4", "UK 5", ...]
  stock: number;
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  productId: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  source: 'Google' | 'Verified Buyer';
}

export interface UKAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  deliveryMethod: 'standard' | 'express' | 'collect';
  status: 'Processing' | 'Dispatched' | 'Ready for Collection' | 'Delivered';
  trackingNumber?: string;
  shippingAddress: UKAddress;
  paymentMethod: string;
}

export interface FilterState {
  category: CategoryId;
  subCategory?: string;
  gender?: 'men' | 'women' | 'kids' | 'unisex';
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  onlySale: boolean;
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface StoreSettings {
  announcementText: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeEmail: string;
  openingHoursWeekday: string;
  openingHoursSunday: string;
  googleRating: number;
  googleReviewCount: number;
}
