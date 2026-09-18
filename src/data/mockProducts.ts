import { Product, Review, StoreSettings } from '../types';

export const initialStoreSettings: StoreSettings = {
  announcementText: 'FREE UK DELIVERY ON ORDERS OVER £75 | EASY RETURNS | SHOP ONLINE OR VISIT OUR CAMBERWELL STORE',
  freeShippingThreshold: 75,
  standardShippingFee: 3.99,
  expressShippingFee: 5.99,
  storeName: 'A.F Elite Shoes',
  storeAddress: '30 Camberwell Church St, London SE5 8QZ, United Kingdom',
  storePhone: '+44 7916 086816',
  storeEmail: 'info@afeliteshoes.co.uk',
  openingHoursWeekday: 'Mon - Sat: 9:30am - 6:00pm',
  openingHoursSunday: 'Sunday: 11:00am - 4:00pm',
  googleRating: 4.9,
  googleReviewCount: 11,
};

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    rating: 5,
    date: '2 weeks ago',
    title: 'Lifesaver for durable school shoes!',
    content: 'Took both my boys here for their September school shoes. The gentleman running the shop was so patient, measured their feet properly, and recommended shoes that have actually survived the playground! Excellent prices and friendly local service.',
    verifiedPurchase: true,
    source: 'Google',
  },
  {
    id: 'rev-2',
    author: 'David Adebayo',
    rating: 5,
    date: '1 month ago',
    title: 'Superb customer service & great selection',
    content: 'Found a really smart pair of leather Chelsea boots and casual trainers here. Prices are much better than central London department stores and the owner is always courteous, helpful, and welcoming. Will definitely be coming back.',
    verifiedPurchase: true,
    source: 'Google',
  },
  {
    id: 'rev-3',
    author: 'Eleanor Vance',
    rating: 5,
    date: '2 months ago',
    title: 'Very comfortable everyday loafers',
    content: 'Bought a pair of cushioned leather loafers for teaching all day on my feet. Absolute bliss from day one, no blisters whatsoever. Love supporting an independent Camberwell business with such high standards.',
    verifiedPurchase: true,
    source: 'Google',
  },
  {
    id: 'rev-4',
    author: 'Marcus Campbell',
    rating: 5,
    date: '3 months ago',
    title: 'Great variety of sizes in stock',
    content: 'Finding size UK 11.5 or 12 can usually be a struggle elsewhere, but A.F Elite Shoes had multiple styles in stock ready to try on. Really honest advice and friendly greeting. Highly recommended.',
    verifiedPurchase: true,
    source: 'Google',
  },
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic Black School Shoes',
    category: 'school',
    subCategory: "Boys' School Shoes",
    price: 34.99,
    originalPrice: 42.00,
    rating: 4.9,
    reviewCount: 28,
    isFeatured: true,
    isSchoolPick: true,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Our most trusted school shoe designed for all-day comfort, tough playground durability, and smart uniform standards. Crafted from scuff-resistant polished leather with reinforced toe bumpers and cushioned insoles.',
    features: [
      'Scuff-resistant genuine polished leather upper',
      'Non-marking shock absorbing rubber sole',
      'Antibacterial breathable lining to keep feet fresh',
      'Reinforced double-stitched toe protection',
      'Padded collar for ankle comfort without blisters'
    ],
    material: 'Full Grain Leather',
    sole: 'Anti-Slip Rubber Sole',
    closure: 'Lace-Up',
    colors: [
      { colorName: 'Polished Black', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Matt Black', colorHex: '#1f2937', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7'],
    stock: 35,
    tags: ['School Shoes', 'Bestseller', 'Durable', 'Uniform Compliant']
  },
  {
    id: 'prod-2',
    name: "Men's Leather Chelsea Boots",
    category: 'boots',
    subCategory: 'Chelsea Boots',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.8,
    reviewCount: 32,
    isFeatured: true,
    isSchoolPick: false,
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A timeless British style essential crafted in supple pull-up leather. Features elasticated side gussets, convenient heel pull tabs, and a Goodyear-welted rubber sole for confident grip in British wet weather.',
    features: [
      'Premium oily calf leather that ages beautifully',
      'Elasticated twin side gussets for easy on/off',
      'Cushioned memory foam footbed with arch support',
      'Weather-sealed welt to resist damp sidewalks',
      'Refined chisel toe silhouette suitable for smart or casual'
    ],
    material: 'Calfskin Leather',
    sole: 'Studded Rubber Traction Outsole',
    closure: 'Pull-on / Elastic Gusset',
    colors: [
      { colorName: 'Dark Chocolate Brown', colorHex: '#3e2723', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Classic Black', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Rich Tan', colorHex: '#8d6e63', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    stock: 22,
    tags: ["Men's", 'Boots', 'Leather', 'Autumn/Winter']
  },
  {
    id: 'prod-3',
    name: "Women's Casual Loafers",
    category: 'women',
    subCategory: 'Loafers',
    price: 49.50,
    originalPrice: 58.00,
    rating: 4.9,
    reviewCount: 24,
    isFeatured: true,
    isSchoolPick: false,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Effortlessly polished and endlessly wearable. Designed with soft, buttery leather, subtle metallic hardware across the vamp, and an ultra-flexible lightweight sole that bends naturally with your foot.',
    features: [
      'Butter-soft sheepskin lining for barefoot comfort',
      'Discrete cushioned heel pillow to eliminate slip',
      'Lightweight shock-absorbing EVA rubber sole',
      'Gold-tone decorative horsebit buckle detail',
      'Versatile style pairs with tailored trousers or denim'
    ],
    material: 'Soft Nappa Leather',
    sole: 'Flexible Featherlight Rubber',
    closure: 'Slip-On',
    colors: [
      { colorName: 'Midnight Black', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Warm Sand Tan', colorHex: '#c2a688', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    stock: 18,
    tags: ["Women's", 'Comfort', 'Everyday', 'Workwear']
  },
  {
    id: 'prod-4',
    name: "Children's Smart School Shoes",
    category: 'school',
    subCategory: "Girls' School Shoes",
    price: 32.00,
    originalPrice: 38.00,
    rating: 5.0,
    reviewCount: 39,
    isFeatured: true,
    isSchoolPick: true,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Smart Mary Jane style school shoes with an adjustable rip-tape strap, subtle brogue detailing on the toe cap, and hardwearing rubber soles. Tested for rigorous school activities and easy fastening for young hands.',
    features: [
      'Adjustable rip-tape Velcro strap for quick morning fastening',
      'Delicate decorative punch-hole brogue detail',
      'Deep padded collar for zero-chafe wear',
      'Flexible grooved rubber sole for playground agility',
      'Real breathable leather that allows natural ventilation'
    ],
    material: 'Action Coated Leather',
    sole: 'Flexible Non-Marking Rubber',
    closure: 'Rip-tape (Velcro)',
    colors: [
      { colorName: 'Classic Black Patent', colorHex: '#0a0a0a', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Smooth Black Matte', colorHex: '#1c1c1c', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 9 (Jnr)', 'UK 10 (Jnr)', 'UK 11 (Jnr)', 'UK 12 (Jnr)', 'UK 13 (Jnr)', 'UK 1', 'UK 2', 'UK 3'],
    stock: 40,
    tags: ['School Shoes', 'Kids', 'Mary Jane', 'Rip-tape']
  },
  {
    id: 'prod-5',
    name: "Men's Formal Derby Shoes",
    category: 'men',
    subCategory: 'Formal Shoes',
    price: 59.99,
    originalPrice: 75.00,
    rating: 4.8,
    reviewCount: 19,
    isFeatured: true,
    isSchoolPick: false,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An open-lacing Derby crafted for work, weddings, and formal occasions. The wider opening accommodates higher insteps comfortably, finished with a hand-burnished toe cap and leather-lined interior.',
    features: [
      'Hand-finished burnished premium leather',
      'Breathable moisture-wicking full leather sock',
      'Ergonomic open-laced vamp for adjustable instep fit',
      'Reinforced heel counter maintains shape over years',
      'Composite rubber non-slip insert on sole'
    ],
    material: 'Burnished Box Leather',
    sole: 'Leather Sole with Rubber Grip Pods',
    closure: 'Lace-Up 5 Eyelet',
    colors: [
      { colorName: 'Jet Black', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Chestnut Brown', colorHex: '#4a2c11', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    stock: 15,
    tags: ["Men's", 'Formal', 'Occasion', 'Office']
  },
  {
    id: 'prod-6',
    name: "Women's Ankle Boots",
    category: 'boots',
    subCategory: 'Ankle Boots',
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviewCount: 27,
    isFeatured: true,
    isSchoolPick: false,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Sleek, low-heeled ankle boots with an inner zip for effortless dressing. Built on a comfortable 35mm block heel that gives gentle posture support without putting pressure on the ball of your foot.',
    features: [
      'Soft water-resistant treated leather upper',
      'Smooth side metal zip with protective inner fly',
      '3.5cm stable block heel with shock absorption',
      'Textured rubber tread for winter stability',
      'Warm microfibre lining for chilly mornings'
    ],
    material: 'Smooth Aniline Leather',
    sole: 'Low Block Tread Rubber',
    closure: 'Side Zip',
    colors: [
      { colorName: 'Deep Onyx', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Cognac Suede', colorHex: '#795548', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    stock: 20,
    tags: ["Women's", 'Boots', 'Winter', 'Everyday']
  },
  {
    id: 'prod-7',
    name: "Kids' Velcro School Shoes",
    category: 'school',
    subCategory: 'Velcro School Shoes',
    price: 29.99,
    originalPrice: 36.00,
    rating: 4.9,
    reviewCount: 46,
    isFeatured: true,
    isSchoolPick: true,
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Double rip-tape strap school shoes made for children who need a fast, independent, secure fit. Heavy-duty rubber scuff bumpers wrap around the toe to survive daily football games and playground action.',
    features: [
      'Twin adjustable rip-tape straps accommodate wider feet',
      'Moulded protective rubber bumper to prevent scuffing',
      'Ortholite foam footbed cushions high-impact running',
      'Easy wipe-clean leather surface for quick evening care',
      'Approved for strict UK school dress codes'
    ],
    material: 'Coated Scuff-Guard Leather',
    sole: 'High-Abrasion Grippy Rubber',
    closure: 'Twin Velcro Straps',
    colors: [
      { colorName: 'Uniform Black', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 8 (Jnr)', 'UK 9 (Jnr)', 'UK 10 (Jnr)', 'UK 11 (Jnr)', 'UK 12 (Jnr)', 'UK 13 (Jnr)', 'UK 1', 'UK 2'],
    stock: 50,
    tags: ['School Shoes', 'Kids', 'Velcro', 'Scuff Resistant']
  },
  {
    id: 'prod-8',
    name: 'Everyday Comfort Trainers',
    category: 'men',
    subCategory: 'Trainers',
    price: 44.99,
    originalPrice: 55.00,
    rating: 4.8,
    reviewCount: 31,
    isFeatured: true,
    isSchoolPick: false,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Ultra-cushioned lifestyle trainers built for active days, commuting, or long weekend walks. Engineered knit upper provides superior breathability, paired with a cloud-like dual-density EVA midsole.',
    features: [
      'Engineered stretch knit upper for cooling air circulation',
      'Dual-density energy return foam midsole',
      'Reinforced TPU eyelets for long-lasting lace tension',
      'Reflective heel accent for low-light evening walking',
      'Removable cushioned insole accommodates orthotics'
    ],
    material: 'Breathable Knit & Suede Overlays',
    sole: 'Dual-Density Responsive Foam',
    closure: 'Athletic Lace-Up',
    colors: [
      { colorName: 'Stealth Black', colorHex: '#18181b', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Heather Grey', colorHex: '#71717a', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    stock: 25,
    tags: ['Everyday', 'Trainers', 'Comfort', 'Lightweight']
  },
  {
    id: 'prod-9',
    name: "Boys' Lace-Up Senior School Shoes",
    category: 'school',
    subCategory: "Lace-Up School Shoes",
    price: 36.50,
    originalPrice: 45.00,
    rating: 4.8,
    reviewCount: 22,
    isFeatured: false,
    isSchoolPick: true,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Senior school dress shoe that bridges the gap between smart school regulations and youthful style. Strong Goodyear-style welt construction and anti-odour treated fabric lining.',
    features: [
      'Sturdy coated leather that polishes to a high shine',
      'Reinforced eyelets with waxed round laces',
      'Deep cleated sole that grips wet tarmac and leaves',
      'Padded tongue prevents lace bite across instep'
    ],
    material: 'Polished Smooth Leather',
    sole: 'Cleated Rubber Outsole',
    closure: 'Lace-Up 4 Eyelet',
    colors: [
      { colorName: 'Gloss Black', colorHex: '#09090b', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9'],
    stock: 28,
    tags: ['School Shoes', 'Senior School', 'Lace-Up']
  },
  {
    id: 'prod-10',
    name: "Women's Cushion-Walk Ballet Flats",
    category: 'women',
    subCategory: 'Flats',
    price: 38.00,
    originalPrice: 45.00,
    rating: 4.7,
    reviewCount: 18,
    isFeatured: false,
    isSchoolPick: false,
    images: [
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The quintessential everyday flat reimagined with supportive multi-layer arch cushioning and a flexible rubber driving sole. Perfect for commuting or long standing shifts.',
    features: [
      'Triple-density comfort footbed',
      'Elasticated collar for a custom snug fit without digging in',
      'Foldable flexible construction for handbag storage',
      'Breathable leather sock with perforated arch'
    ],
    material: 'Soft Supple Leather',
    sole: 'Segmented Non-Slip Grip Sole',
    closure: 'Slip-on',
    colors: [
      { colorName: 'Classic Black', colorHex: '#18181b', image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Nude Blush', colorHex: '#e2cfc4', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    stock: 19,
    tags: ["Women's", 'Flats', 'Comfort', 'Workwear']
  },
  {
    id: 'prod-11',
    name: "Men's Rugged Commuter Boots",
    category: 'boots',
    subCategory: 'Casual Boots',
    price: 74.00,
    originalPrice: 89.99,
    rating: 4.9,
    reviewCount: 23,
    isFeatured: false,
    isSchoolPick: false,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Built for London winters and everyday durability. Features water-resistant oiled nubuck leather, brass speed-lacing hooks, and a thick rugged lug sole.',
    features: [
      'Oiled waterproof nubuck leather',
      'Padded leather collar around upper ankle',
      'Lugged rubber sole with mud-clearing tread',
      'Rust-proof metal hardware'
    ],
    material: 'Oiled Nubuck Leather',
    sole: 'Heavy Lugged Commando Sole',
    closure: 'Lace-Up with Speed Hooks',
    colors: [
      { colorName: 'Dark Tobacco', colorHex: '#422a1d', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80' },
      { colorName: 'Coal Black', colorHex: '#121214', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    stock: 16,
    tags: ["Men's", 'Boots', 'Winter', 'Outdoor']
  },
  {
    id: 'prod-12',
    name: "Junior School Slip-On Loafer",
    category: 'school',
    subCategory: 'Junior School Shoes',
    price: 33.00,
    originalPrice: 40.00,
    rating: 4.8,
    reviewCount: 15,
    isFeatured: false,
    isSchoolPick: true,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A smart slip-on loafer with hidden elastic gussets for an effortless fit. Smart toe stitching and school-approved all-black styling.',
    features: [
      'Hidden elastic bridge under tongue for secure fit without slips',
      'Thick durable leather resists playground scuffing',
      'Shock-absorbing rubber cupsole'
    ],
    material: 'Polished Box Leather',
    sole: 'Non-Marking Grip Sole',
    closure: 'Slip-On with Hidden Elastic',
    colors: [
      { colorName: 'Black', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80' }
    ],
    sizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4', 'UK 5', 'UK 6'],
    stock: 26,
    tags: ['School Shoes', 'Loafer', 'Junior']
  }
];

export const instagramFeed = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    caption: 'Back to school rush in Camberwell! Getting ready with hardwearing polished leather.',
    likes: 124
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=600&q=80',
    caption: 'Our signature Chelsea boots in dark chocolate calfskin. Weather-ready for London.',
    likes: 189
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    caption: 'Everyday comfort loafers. Soft leather, all-day arch support.',
    likes: 142
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    caption: 'Smart school shoes for little feet. Made to last beyond the playground.',
    likes: 98
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80',
    caption: 'Classic hand-burnished Derbys. Essential for weddings and work.',
    likes: 215
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
    caption: 'Step into the shop at 30 Camberwell Church St. Friendly service awaits!',
    likes: 267
  }
];
