import { useState } from 'react'
import { Button } from '../ui/Button'

const navLinks = [
  { label: 'Home', target: 'home' },
  { label: 'New Drops', target: 'new-drops' },
  { label: 'Categories', target: 'categories' },
  { label: 'Sale', target: 'sale' },
  { label: 'Why Us', target: 'why-us' },
  { label: 'Community', target: 'community' },
  { label: 'Contact', target: 'contact' },
]

type NavbarProps = {
  cartCount: number
  isCartReceiving?: boolean
  onCartClick: () => void
}

export function Navbar({
  cartCount,
  isCartReceiving = false,
  onCartClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  function scrollToNewDrops() {
    setIsOpen(false)
    document.getElementById('new-drops')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="navbar__brand" href="#home" onClick={() => setIsOpen(false)}>
          SNEAKR
        </a>
        <button
          type="button"
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`navbar__links ${isOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className={`navbar__cart ${isCartReceiving ? 'is-receiving' : ''}`}
          aria-label={`Open cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
          onClick={onCartClick}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h8.86a2 2 0 0 0 1.96-1.6l1.34-7.4H5.12" />
          </svg>
          <strong>{cartCount}</strong>
        </button>
        <Button
          type="button"
          className="navbar__cta"
          onClick={scrollToNewDrops}
        >
          Shop Now
        </Button>
      </nav>
    </header>
  )
}
