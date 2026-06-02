import { motion } from 'framer-motion'
import type { Product } from '../../data/products'
import { Button } from './Button'

type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
  onViewDetails: (product: Product) => void
}

const formatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="product-card__media">
        <img src={product.image} alt={`${product.name} sneaker`} loading="lazy" />
        <span>{product.tag}</span>
      </div>
      <div className="product-card__content">
        <div>
          <p className="product-card__category">{product.category}</p>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-card__meta">
          <div>
            <strong>{formatter.format(product.price)}</strong>
            <del>{formatter.format(product.originalPrice)}</del>
          </div>
          <span>{product.rating.toFixed(1)} rating</span>
        </div>
        <div className="product-card__swatches" aria-label="Available colors">
          {product.colors.map((color) => (
            <span key={color}>{color}</span>
          ))}
        </div>
        <div className="product-card__actions">
          <Button type="button" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
          <Button type="button" variant="ghost" onClick={() => onViewDetails(product)}>
            View Details
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
