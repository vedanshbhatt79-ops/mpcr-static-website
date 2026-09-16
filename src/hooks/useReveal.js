import { useEffect } from 'react'

export default function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    )

    els.forEach((el) => {
      if (!el.classList.contains('revealed')) io.observe(el)
    })

    return () => io.disconnect()
    // deps intentionally re-runs the observer when the route changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}