import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, setToken, setCurrentUser } from '../services/auth.js'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password) {
      setError('Please enter both username and password.')
      return
    }

    setLoading(true)
    try {
      const data = await login(username.trim(), password)
      if (data?.token) {
        setToken(data.token)
      }
      if (data?.user) {
        setCurrentUser(data.user)
      }
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card" data-reveal="zoom">
        <div className="diya" aria-hidden="true">🪔</div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">
          Sign in to access the admin area
        </p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-gold auth-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  )
}