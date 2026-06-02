import { motion } from 'framer-motion'
import { categories } from '../../data/categories'
import { SectionHeader } from '../ui/SectionHeader'

export function CategoryShowcase() {
  return (
    <section className="section" id="categories">
      <SectionHeader
        eyebrow="Shop by sport"
        title="Collections built around movement"
        description="Running, basketball, lifestyle, and training edits keep the catalog simple to browse."
      />
      <div className="category-grid">
        {categories.map((category) => (
          <motion.article
            className="category-card"
            key={category.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <img src={category.image} alt={`${category.name} sneaker category`} loading="lazy" />
            <div>
              <span>0{category.id}</span>
              <h3>{category.name}</h3>
              <p>{category.tagline}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
