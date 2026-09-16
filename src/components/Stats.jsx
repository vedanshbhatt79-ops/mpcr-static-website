import { useEffect, useRef, useState } from 'react'
import { sponsors } from '../data/sponsors.js'

const stats = [
  { value: 12, suffix: '', label: 'Days of Celebration', icon: '🎉' },
  { value: 15, suffix: '+', label: 'Events & Programmes', icon: '🪔' },
  { value: sponsors.length, suffix: '+', label: 'Community Sponsors', icon: '🤝' },
  { value: 100, suffix: '%', label: 'Devotion & Faith', icon: '🙏' },
]

function CountUp({ value, suffix }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        const duration = 1500
        const start = performance.now()
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setN(Math.round(eased * value))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <strong ref={ref}>
      {n}
      {suffix}
    </strong>
  )
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-band">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="stat-card"
            data-reveal
            style={{ '--reveal-delay': `${index * 0.1}s` }}
          >
            <span className="stat-icon">{stat.icon}</span>
            <CountUp value={stat.value} suffix={stat.suffix} />
            <small>{stat.label}</small>
          </div>
        ))}
      </div>
    </section>
  )
}