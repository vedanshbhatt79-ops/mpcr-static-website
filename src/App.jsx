import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authService, apiClient } from './api'
import { AuthProvider } from './contexts/auth.context'
import Aarti from './components/Aarti.jsx'
import Events from './components/Events.jsx'
import Gallery from './components/Gallery.jsx'
import Home from './components/Home.jsx'
import Layout from './components/Layout.jsx'
import Login from './components/Login.jsx'
import Social from './components/Social.jsx'
import Sponsors from './components/Sponsors.jsx'

const USER_KEY = 'mpcr_user'

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(USER_KEY)
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    const token = apiClient.getToken()
    if (token && !user) {
      authService
        .getProfile()
        .then((profile) => {
          setUser(profile)
          localStorage.setItem(USER_KEY, JSON.stringify(profile))
        })
        .catch(() => {
          apiClient.clearToken()
          localStorage.removeItem(USER_KEY)
          setUser(null)
        })
    }
  }, [])

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser)
    localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser))
  }

  const handleLogout = () => {
    apiClient.clearToken()
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthProvider user={user}>
      <Routes>
        <Route element={<Layout onLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="aarti" element={<Aarti />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="social" element={<Social />} />
          <Route path="login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}