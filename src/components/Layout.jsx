import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import useReveal from '../hooks/useReveal.js'

export default function Layout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    if (!navbar) return

    const onScroll = () => {
      if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 10px 35px rgba(0,0,0,.25)'
      } else {
        navbar.style.boxShadow = 'none'
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const { pathname } = useLocation()

  useReveal([pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      return next
    })
  }

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}