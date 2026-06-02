import { useEffect, useMemo, useState } from 'react'
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

  function handleAddToCart(product: Product) {
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
      <Navbar cartCount={cartCount} onCartClick={handleCartClick} />
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
