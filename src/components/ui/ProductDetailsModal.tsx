import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, type MouseEvent } from 'react'
import type { Product } from '../../data/products'
import { Button } from './Button'

type ProductDetailsModalProps = {
  product: Product | null
  onAddToCart: (product: Product, event: MouseEvent<HTMLButtonElement>) => void
  onClose: () => void
}

const formatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

export function ProductDetailsModal({
  product,
  onAddToCart,
  onClose,
}: ProductDetailsModalProps) {
  useEffect(() => {
    if (!product) {
      return undefined
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, product])

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="product-modal"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.section
            className="product-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="product-modal__close"
              aria-label="Close product details"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <div className="product-modal__media">
              <img src={product.image} alt={`${product.name} sneaker`} />
              <span>{product.tag}</span>
            </div>
            <div className="product-modal__content">
              <p className="product-modal__eyebrow">{product.category}</p>
              <h2 id="product-modal-title">{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-modal__price">
                <strong>{formatter.format(product.price)}</strong>
                <del>{formatter.format(product.originalPrice)}</del>
                <span>{product.discount}</span>
              </div>
              <div className="product-modal__meta">
                <span>{product.rating.toFixed(1)} rating</span>
                <span>Premium mock release</span>
              </div>
              <div className="product-modal__colors" aria-label="Available colors">
                {product.colors.map((color) => (
                  <span key={color}>{color}</span>
                ))}
              </div>
              <div className="product-modal__actions">
                <Button type="button" onClick={(event) => onAddToCart(product, event)}>
                  Add to Cart
                </Button>
                <Button type="button" variant="ghost" onClick={onClose}>
                  Keep Browsing
                </Button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
