import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

export function BackgroundFX() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const yPrimary = useTransform(scrollYProgress, [0, 1], ['0%', '34%'])
  const ySecondary = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 32])
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.62, 0.92, 0.58])

  return (
    <div className="background-fx" aria-hidden="true">
      <span className="background-fx__wash background-fx__wash--one" />
      <span className="background-fx__wash background-fx__wash--two" />
      <motion.span
        className="background-fx__beam background-fx__beam--lime"
        style={
          prefersReducedMotion
            ? undefined
            : { y: yPrimary, rotate, opacity }
        }
      />
      <motion.span
        className="background-fx__beam background-fx__beam--blue"
        style={
          prefersReducedMotion
            ? undefined
            : { y: ySecondary, opacity }
        }
      />
      <motion.span
        className="background-fx__beam background-fx__beam--heat"
        style={
          prefersReducedMotion
            ? undefined
            : { y: yPrimary, rotate, opacity }
        }
      />
      <motion.span
        className="background-fx__orb background-fx__orb--one"
        style={prefersReducedMotion ? undefined : { y: ySecondary }}
      />
      <motion.span
        className="background-fx__orb background-fx__orb--two"
        style={prefersReducedMotion ? undefined : { y: yPrimary }}
      />
    </div>
  )
}
