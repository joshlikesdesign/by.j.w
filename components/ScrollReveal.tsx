'use client'

import { useEffect } from 'react'

/**
 * Activates the .reveal/.in-view scroll-animation system defined in globals.css.
 * Purely additive: observes elements, toggles a class. Touches no app state or logic.
 * MutationObserver re-scans for .reveal nodes added later (e.g. infinite-scroll grids).
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '-40px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.in-view)').forEach((el) => observer.observe(el))
    }

    observeAll()

    const mutationObserver = new MutationObserver(() => observeAll())
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
