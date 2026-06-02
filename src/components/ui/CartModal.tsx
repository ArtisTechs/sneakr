import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Product } from '../../data/products'
import { Button } from './Button'

export type CartLineItem = {
  product: Product
  quantity: number
}

type CartModalProps = {
  isOpen: boolean
  items: CartLineItem[]
  onCheckout: () => void
  onClearCart: () => void
  onClose: () => void
  onRemoveItem: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
}

const formatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

export function CartModal({
  isOpen,
  items,
  onCheckout,
  onClearCart,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
}: CartModalProps) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="cart-modal"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.aside
            className="cart-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 28 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="cart-modal__header">
              <div>
                <span>Mock cart</span>
                <h2 id="cart-modal-title">Your rotation</h2>
              </div>
              <button
                type="button"
                className="cart-modal__close"
                aria-label="Close cart"
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
            </header>

            {items.length > 0 ? (
              <>
                <div className="cart-modal__items">
                  {items.map(({ product, quantity }) => (
                    <article className="cart-modal__item" key={product.id}>
                      <img src={product.image} alt={`${product.name} sneaker`} />
                      <div>
                        <p>{product.category}</p>
                        <h3>{product.name}</h3>
                        <strong>{formatter.format(product.price)}</strong>
                        <div className="cart-modal__controls">
                          <button
                            type="button"
                            aria-label={`Decrease ${product.name} quantity`}
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${product.name} quantity`}
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="cart-modal__remove"
                            onClick={() => onRemoveItem(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <footer className="cart-modal__footer">
                  <div className="cart-modal__summary">
                    <span>{itemCount} item{itemCount === 1 ? '' : 's'}</span>
                    <strong>{formatter.format(subtotal)}</strong>
                  </div>
                  <Button type="button" onClick={onCheckout}>
                    Mock Checkout
                  </Button>
                  <Button type="button" variant="ghost" onClick={onClearCart}>
                    Clear Cart
                  </Button>
                </footer>
              </>
            ) : (
              <div className="cart-modal__empty">
                <span>0</span>
                <h3>Your cart is empty</h3>
                <p>Add a sneaker from the featured drops to see it here.</p>
                <Button type="button" onClick={onClose}>
                  Keep Browsing
                </Button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
