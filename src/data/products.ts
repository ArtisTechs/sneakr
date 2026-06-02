export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  discount: string
  image: string
  colors: string[]
  rating: number
  tag: string
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Aero Street Pulse',
    category: 'Lifestyle',
    price: 5499,
    originalPrice: 10999,
    discount: '50% OFF',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
    colors: ['Crimson', 'White', 'Black'],
    rating: 4.8,
    tag: 'Best Seller',
    description: 'A sculpted street runner with cloud-soft cushioning.',
  },
  {
    id: 2,
    name: 'Velocity Court Pro',
    category: 'Basketball',
    price: 7299,
    originalPrice: 9499,
    discount: '23% OFF',
    image:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85',
    colors: ['Ivory', 'Orange', 'Graphite'],
    rating: 4.7,
    tag: 'New Drop',
    description: 'Locked-in support for sharp cuts and explosive takeoffs.',
  },
  {
    id: 3,
    name: 'Flex Run Element',
    category: 'Running',
    price: 4899,
    originalPrice: 6999,
    discount: '30% OFF',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=85',
    colors: ['Volt', 'Silver', 'Black'],
    rating: 4.6,
    tag: 'Lightweight',
    description: 'Breathable knit and springy foam for daily miles.',
  },
  {
    id: 4,
    name: 'Core Trainer Lux',
    category: 'Training',
    price: 6299,
    originalPrice: 8499,
    discount: '26% OFF',
    image:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=85',
    colors: ['Sand', 'White', 'Slate'],
    rating: 4.9,
    tag: 'Top Rated',
    description: 'Stable, grippy, and tuned for high-intensity sessions.',
  },
]

export const promoDeal = {
  eyebrow: 'Limited Drop',
  title: 'Up to 50% Off Selected Sneakers',
  description:
    'Premium mock releases, seasonal colorways, and limited-run silhouettes curated for fast movers.',
  discount: '50%',
  saleEnds: 'Sunday Midnight',
}
