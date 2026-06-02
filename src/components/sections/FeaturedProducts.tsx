import { motion } from 'framer-motion'
import { products, type Product } from '../../data/products'
import { ProductCard } from '../ui/ProductCard'
import { SectionHeader } from '../ui/SectionHeader'

type FeaturedProductsProps = {
  onAddToCart: (product: Product) => void
  onViewDetails: (product: Product) => void
}

export function FeaturedProducts({
  onAddToCart,
  onViewDetails,
}: FeaturedProductsProps) {
  return (
    <section className="section" id="new-drops">
      <SectionHeader
        eyebrow="Featured products"
        title="Fresh silhouettes for every pace"
        description="Editable mock product data powers each card, from pricing and colorways to discount tags."
      />
      <motion.div
        className="product-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
