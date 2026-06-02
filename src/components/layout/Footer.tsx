import { motion } from 'framer-motion'

const footerLinks = ['Size Guide', 'Shipping', 'Returns', 'Support']
const socialLinks = ['Instagram', 'TikTok', 'X']

const footerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export function Footer() {
  return (
    <motion.footer
      className="footer"
      id="contact"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.div
        variants={footerItem}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <a className="footer__brand" href="#home">
          SNEAKR
        </a>
        <p>
          A mock premium sneaker storefront built for clean product storytelling
          and fast editing.
        </p>
      </motion.div>
      <motion.div
        variants={footerItem}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h2>Store</h2>
        <ul>
          {footerLinks.map((link) => (
            <li key={link}>
              <a href="#home">{link}</a>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        variants={footerItem}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h2>Contact</h2>
        <p>hello@sneakr.example</p>
        <p>Manila, Philippines</p>
      </motion.div>
      <motion.div
        variants={footerItem}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h2>Social</h2>
        <ul>
          {socialLinks.map((link) => (
            <li key={link}>
              <a href="#home">{link}</a>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.p
        className="footer__fineprint"
        variants={footerItem}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        (c) 2026 SNEAKR Demo. No official brand affiliation.
      </motion.p>
    </motion.footer>
  )
}
