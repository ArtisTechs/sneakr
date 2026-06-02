import { motion } from 'framer-motion'
import { SectionHeader } from '../ui/SectionHeader'

const benefits = [
  {
    title: 'Premium Quality',
    description: 'Curated materials, refined finishes, and performance-minded comfort.',
    icon: 'PQ',
  },
  {
    title: 'Fast Delivery',
    description: 'Mock express fulfillment keeps every drop moving quickly.',
    icon: 'FD',
  },
  {
    title: 'Secure Payment',
    description: 'Checkout patterns designed around trust and clear confirmations.',
    icon: 'SP',
  },
  {
    title: 'Authentic Style',
    description: 'Sporty luxury visuals without official brand marks or assets.',
    icon: 'AS',
  },
]

export function WhyChooseUs() {
  return (
    <section className="section" id="why-us">
      <SectionHeader
        eyebrow="Why choose us"
        title="Premium experience from browse to checkout"
        description="A polished demo storefront with clear reasons to trust the collection."
      />
      <div className="benefit-grid">
        {benefits.map((benefit) => (
          <motion.article
            className="benefit-card"
            key={benefit.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            <span>{benefit.icon}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
