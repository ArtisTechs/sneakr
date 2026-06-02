export type Category = {
  id: number
  name: string
  tagline: string
  image: string
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Running',
    tagline: 'Responsive energy for road, track, and daily miles.',
    image:
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Basketball',
    tagline: 'Court-ready grip, lift, and impact control.',
    image:
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Lifestyle',
    tagline: 'Clean silhouettes built for the city rotation.',
    image:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Training',
    tagline: 'Stable support for lifts, intervals, and everyday work.',
    image:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=85',
  },
]
