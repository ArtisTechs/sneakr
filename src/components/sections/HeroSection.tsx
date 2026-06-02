import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Button } from '../ui/Button'

const heroShoes = [
  {
    name: 'White premium studio sneaker',
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1100&q=90',
    rating: 4.9,
    ratingLabel: 'Studio comfort',
    ratingDetail: '2.4k verified fits',
    accent: 'Lime',
  },
  {
    name: 'Red performance sneaker',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=90',
    rating: 4.8,
    ratingLabel: 'Street energy',
    ratingDetail: '1.8k drop reviews',
    accent: 'Heat',
  },
  {
    name: 'Black and white lifestyle sneaker',
    image:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1100&q=90',
    rating: 4.7,
    ratingLabel: 'Daily rotation',
    ratingDetail: '3.1k style votes',
    accent: 'Mono',
  },
]

type HeroSectionProps = {
  onExploreDrops: () => void
  onShopCollection: () => void
}

export function HeroSection({ onExploreDrops, onShopCollection }: HeroSectionProps) {
  const [activeShoe, setActiveShoe] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const currentShoe = heroShoes[activeShoe]

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setActiveShoe((current) => (current + 1) % heroShoes.length)
    }, 3800)

    return () => window.clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <section className="hero-section" id="home">
      <div className="hero-section__backdrop" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-section__copy">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          New season performance edit
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          Own the street with precision-built sneakers.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          Discover mock drops with sculpted cushioning, sharp silhouettes, and
          premium colorways for every rotation.
        </motion.p>
        <motion.div
          className="hero-section__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          <Button type="button" onClick={onShopCollection}>
            Shop Collection
          </Button>
          <Button type="button" variant="secondary" onClick={onExploreDrops}>
            Explore Drops
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="hero-section__visual"
        initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="hero-section__rings" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentShoe.image}
            src={currentShoe.image}
            alt={currentShoe.name}
            initial={{ opacity: 0, x: 34, scale: 1.035, rotate: 2 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              rotate: 0,
              y: prefersReducedMotion ? 0 : [0, -14, 0],
            }}
            exit={{ opacity: 0, x: -28, scale: 0.985, rotate: -2 }}
            transition={{
              opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              x: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </AnimatePresence>
        <div className="hero-section__shoe-dots" aria-label="Hero shoe carousel">
          {heroShoes.map((shoe, index) => (
            <button
              key={shoe.name}
              type="button"
              aria-label={`Show ${shoe.name}`}
              aria-current={activeShoe === index}
              onClick={() => setActiveShoe(index)}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="hero-section__stat"
            key={currentShoe.ratingLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="hero-section__rating-top">
              <strong>{currentShoe.rating.toFixed(1)}</strong>
              <div aria-label={`${currentShoe.rating.toFixed(1)} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < Math.round(currentShoe.rating)
                        ? 'is-filled'
                        : undefined
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <span>{currentShoe.ratingLabel}</span>
            <p>{currentShoe.ratingDetail}</p>
            <small>{currentShoe.accent} edition</small>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
