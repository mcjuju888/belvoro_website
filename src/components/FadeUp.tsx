'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FadeUp({ children, delay = 0, duration = 0.6, className }: FadeUpProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
