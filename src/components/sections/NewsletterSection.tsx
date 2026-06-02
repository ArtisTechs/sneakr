import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

type NewsletterSectionProps = {
  onSignup: (email: string) => void
}

export function NewsletterSection({ onSignup }: NewsletterSectionProps) {
  const [email, setEmail] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim()) {
      return
    }

    onSignup(email.trim())
    setEmail('')
  }

  return (
    <motion.section
      className="newsletter"
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        <span>Drop alerts</span>
        <h2>Get early access to the next mock release.</h2>
      </motion.div>
      <motion.form
        aria-label="Newsletter signup"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.45, delay: 0.16 }}
      >
        <label htmlFor="newsletter-email">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Button type="submit">Join List</Button>
      </motion.form>
    </motion.section>
  )
}
