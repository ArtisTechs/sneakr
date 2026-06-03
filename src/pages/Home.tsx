import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { BackgroundFX } from '../components/layout/BackgroundFX'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { CategoryShowcase } from '../components/sections/CategoryShowcase'
import { FeaturedProducts } from '../components/sections/FeaturedProducts'
import { HeroSection } from '../components/sections/HeroSection'
import { NewsletterSection } from '../components/sections/NewsletterSection'
import { PromoBanner } from '../components/sections/PromoBanner'
import { Testimonials } from '../components/sections/Testimonials'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'
import { CartModal } from '../components/ui/CartModal'
import { ProductDetailsModal } from '../components/ui/ProductDetailsModal'
import { products, type Product } from '../data/products'

type CartItem = {
  productId: number
  quantity: number
}

type CartFlyAnimation = {
  id: number
  image: string
  from: DOMRect
  to: DOMRect
}

const cartStorageKey = 'sneakr-cart'

function getCachedCart(): CartItem[] {
  const cachedCart = window.localStorage.getItem(cartStorageKey)

  if (!cachedCart) {
    return []
  }

  try {
    const parsedCart = JSON.parse(cachedCart) as CartItem[]

    return Array.isArray(parsedCart) ? parsedCart : []
  } catch {
    return []
  }
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>(getCachedCart)
  const [notice, setNotice] = useState('Cart ready')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCartReceiving, setIsCartReceiving] = useState(false)
  const [cartFlyAnimation, setCartFlyAnimation] = useState<CartFlyAnimation | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    window.localStorage.setItem(cartStorageKey, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    if (notice === 'Cart ready') {
      return undefined
    }

    const timeout = window.setTimeout(() => setNotice('Cart ready'), 2600)

    return () => window.clearTimeout(timeout)
  }, [notice])

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )
  const cartLineItems = useMemo(
    () =>
      cartItems.flatMap((item) => {
        const product = products.find((currentProduct) => currentProduct.id === item.productId)

        return product ? [{ product, quantity: item.quantity }] : []
      }),
    [cartItems],
  )

  function startCartFlyAnimation(product: Product, event: MouseEvent<HTMLButtonElement>) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cartTarget = document.querySelector<HTMLButtonElement>('.navbar__cart')

    if (prefersReducedMotion || !cartTarget) {
      return
    }

    const sourceImage =
      event.currentTarget
        .closest('.product-card, .product-modal__panel')
        ?.querySelector<HTMLImageElement>('img') ?? event.currentTarget
    const sourceRect = sourceImage.getBoundingClientRect()
    const cartRect = cartTarget.getBoundingClientRect()

    setCartFlyAnimation({
      id: Date.now(),
      image: product.image,
      from: sourceRect,
      to: cartRect,
    })
  }

  function handleAddToCart(product: Product, event: MouseEvent<HTMLButtonElement>) {
    startCartFlyAnimation(product, event)
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { productId: product.id, quantity: 1 }]
    })
    setNotice(`${product.name} added to cart`)
    setIsCartReceiving(true)
    window.setTimeout(() => setIsCartReceiving(false), 620)
  }

  function handleViewDetails(product: Product) {
    setSelectedProduct(product)
  }

  function handleCartClick() {
    setIsCartOpen(true)
  }

  function handleUpdateCartQuantity(productId: number, quantity: number) {
    setCartItems((currentItems) => {
      if (quantity <= 0) {
        return currentItems.filter((item) => item.productId !== productId)
      }

      return currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      )
    })
  }

  function handleRemoveCartItem(productId: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    )
    setNotice('Item removed from cart')
  }

  function handleClearCart() {
    setCartItems([])
    setNotice('Cart cleared')
  }

  function handleCheckout() {
    setNotice('Mock checkout ready')
  }

  return (
    <>
      <BackgroundFX />
      <Navbar
        cartCount={cartCount}
        isCartReceiving={isCartReceiving}
        onCartClick={handleCartClick}
      />
      <main>
        <HeroSection
          onExploreDrops={() => scrollToSection('new-drops')}
          onShopCollection={() => scrollToSection('categories')}
        />
        <FeaturedProducts
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />
        <CategoryShowcase />
        <PromoBanner onUnlockSale={() => scrollToSection('new-drops')} />
        <WhyChooseUs />
        <Testimonials />
        <NewsletterSection
          onSignup={(email) => setNotice(`${email} joined the drop list`)}
        />
      </main>
      <div className="site-notice" role="status" aria-live="polite">
        {notice}
      </div>
      <AnimatePresence>
        {cartFlyAnimation ? (
          <motion.img
            key={cartFlyAnimation.id}
            className="cart-fly-item"
            src={cartFlyAnimation.image}
            alt=""
            aria-hidden="true"
            initial={{
              left: cartFlyAnimation.from.left,
              top: cartFlyAnimation.from.top,
              width: cartFlyAnimation.from.width,
              height: cartFlyAnimation.from.height,
              opacity: 0.92,
              scale: 1,
              rotate: 0,
            }}
            animate={{
              left: cartFlyAnimation.to.left + cartFlyAnimation.to.width / 2 - 18,
              top: cartFlyAnimation.to.top + cartFlyAnimation.to.height / 2 - 18,
              width: 36,
              height: 36,
              opacity: 0,
              scale: 0.38,
              rotate: -8,
            }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setCartFlyAnimation(null)}
          />
        ) : null}
      </AnimatePresence>
      <ProductDetailsModal
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onClose={() => setSelectedProduct(null)}
      />
      <CartModal
        isOpen={isCartOpen}
        items={cartLineItems}
        onCheckout={handleCheckout}
        onClearCart={handleClearCart}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
      />
      <Footer />
    </>
  )
}
