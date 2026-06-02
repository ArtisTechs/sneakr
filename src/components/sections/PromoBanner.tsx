import { motion } from 'framer-motion'
import { promoDeal } from '../../data/products'
import { Button } from '../ui/Button'

type PromoBannerProps = {
  onUnlockSale: () => void
}

export function PromoBanner({ onUnlockSale }: PromoBannerProps) {
  return (
    <motion.section
      className="promo"
      id="sale"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div>
        <span>{promoDeal.eyebrow}</span>
        <h2>{promoDeal.title}</h2>
        <p>{promoDeal.description}</p>
      </div>
      <div className="promo__deal">
        <strong>{promoDeal.discount}</strong>
        <span>Ends {promoDeal.saleEnds}</span>
        <Button type="button" onClick={onUnlockSale}>
          Unlock Sale
        </Button>
      </div>
    </motion.section>
  )
}
