'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Navigation() {
  useEffect(() => {
    // Pure vanilla JS - works even if React fails
    const initMenu = () => {
      const button = document.getElementById('menu-toggle-btn')
      const overlay = document.getElementById('menu-overlay-div')
      
      if (!button || !overlay) {
        setTimeout(initMenu, 100)
        return
      }

      const toggle = (e?: Event) => {
        if (e) {
          e.preventDefault()
          e.stopPropagation()
        }
        const isOpen = overlay.style.display === 'flex'
        overlay.style.display = isOpen ? 'none' : 'flex'
        if (button) {
          button.textContent = isOpen ? 'Menu' : 'Close'
        }
      }

      // Remove any existing listeners
      const newButton = button.cloneNode(true)
      button.parentNode?.replaceChild(newButton, button)
      
      // Add listeners to new button - click should work normally
      newButton.addEventListener('click', toggle, false)
      newButton.addEventListener('touchstart', toggle, false)

      // Keyboard shortcut
      const handleKey = (e: KeyboardEvent) => {
        if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.altKey) {
          toggle()
        }
      }
      window.addEventListener('keydown', handleKey)

      // Close on overlay click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          toggle()
        }
      })

      return () => {
        window.removeEventListener('keydown', handleKey)
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initMenu)
    } else {
      initMenu()
    }
  }, [])

  return (
    <>
      <div
        id="menu-toggle-btn"
        className="fixed top-[41.5px] right-8 z-[999999] cursor-pointer text-white font-sans text-sm tracking-wide uppercase hover:opacity-80 transition-opacity mix-blend-difference"
        style={{
          zIndex: 999999,
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        Menu
      </div>

      <div
        id="menu-overlay-div"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#2B2621',
          zIndex: 10000,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <nav style={{ pointerEvents: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
            <li style={{ marginBottom: '2rem' }}>
              <Link
                href="/"
                onClick={() => {
                  const overlay = document.getElementById('menu-overlay-div')
                  const btn = document.getElementById('menu-toggle-btn')
                  if (overlay) overlay.style.display = 'none'
                  if (btn) btn.textContent = 'Menu'
                }}
                className="block hover:opacity-60 transition-opacity font-serif text-4xl md:text-5xl lg:text-6xl text-light"
              >
                Home
              </Link>
            </li>
            <li style={{ marginBottom: '2rem' }}>
              <Link
                href="/collection"
                onClick={() => {
                  const overlay = document.getElementById('menu-overlay-div')
                  const btn = document.getElementById('menu-toggle-btn')
                  if (overlay) overlay.style.display = 'none'
                  if (btn) btn.textContent = 'Menu'
                }}
                className="block hover:opacity-60 transition-opacity font-serif text-4xl md:text-5xl lg:text-6xl text-light"
              >
                Collection
              </Link>
            </li>
            <li style={{ marginBottom: '2rem' }}>
              <Link
                href="/about"
                onClick={() => {
                  const overlay = document.getElementById('menu-overlay-div')
                  const btn = document.getElementById('menu-toggle-btn')
                  if (overlay) overlay.style.display = 'none'
                  if (btn) btn.textContent = 'Menu'
                }}
                className="block hover:opacity-60 transition-opacity font-serif text-4xl md:text-5xl lg:text-6xl text-light"
              >
                About
              </Link>
            </li>
            <li style={{ marginBottom: '2rem' }}>
              <Link
                href="/gallery"
                onClick={() => {
                  const overlay = document.getElementById('menu-overlay-div')
                  const btn = document.getElementById('menu-toggle-btn')
                  if (overlay) overlay.style.display = 'none'
                  if (btn) btn.textContent = 'Menu'
                }}
                className="block hover:opacity-60 transition-opacity font-serif text-4xl md:text-5xl lg:text-6xl text-light"
              >
                Gallery
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
