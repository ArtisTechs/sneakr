import { motion } from 'framer-motion'
import { testimonials } from '../../data/testimonials'
import { SectionHeader } from '../ui/SectionHeader'

export function Testimonials() {
  return (
    <section className="section community" id="community">
      <SectionHeader
        eyebrow="Community"
        title="Loved by active tastemakers"
        description="Mock testimonials add social proof without tying the project to a real brand."
      />
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <motion.figure
            className="testimonial-card"
            key={testimonial.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
