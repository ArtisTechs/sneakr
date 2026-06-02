export type Testimonial = {
  id: number
  name: string
  role: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mika Santos',
    role: 'Run Club Lead',
    quote:
      'The curation feels premium without being noisy. I can find a daily trainer and a statement pair fast.',
  },
  {
    id: 2,
    name: 'Andre Cruz',
    role: 'Hoops Creator',
    quote:
      'The court drops look sharp, fit the brief, and the product cards make comparing pairs effortless.',
  },
  {
    id: 3,
    name: 'Sofia Reyes',
    role: 'Stylist',
    quote:
      'It has that sporty luxury tone: bold visuals, clean spacing, and enough detail to feel shoppable.',
  },
]
