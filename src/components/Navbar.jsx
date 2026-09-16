import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/aarti', label: 'Aarti' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/social', label: 'Social' },
  { to: '/login', label: 'Login' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((open) => !open)

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <img src="images/logo.png" alt="Modi Park Cha Raja Logo" />
          <div className="brand-text">
            <strong>MODI PARK CHA RAJA</strong>
            <span>MODIPARK GANESHOTSAV MANDAL</span>
          </div>
        </Link>

        <nav id="navMenu" className={menuOpen ? 'active' : ''}>
          {links.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={{ '--nav-index': index }}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            id="themeToggle"
            className="theme-btn"
            aria-label="Toggle dark mode"
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            id="menuToggle"
            className="menu-btn"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}