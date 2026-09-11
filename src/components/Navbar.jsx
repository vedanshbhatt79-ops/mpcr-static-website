import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/auth.context'

const links = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/aarti', label: 'Aarti' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/social', label: 'Social' },
]

export default function Navbar({ theme, onToggleTheme, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()

  const toggleMenu = () => setMenuOpen((open) => !open)

  const handleLogout = () => {
    setMenuOpen(false)
    onLogout()
  }

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
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <div className="nav-link nav-user" onClick={handleLogout}>
              {user.name || 'User'} · Logout
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
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