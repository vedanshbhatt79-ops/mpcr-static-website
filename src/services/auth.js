const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Login failed. Please try again.')
  }

  return data
}

export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
}

export function getCurrentUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearCurrentUser() {
  localStorage.removeItem('user')
}

export function isAuthenticated() {
  return Boolean(getToken())
}

export function logout() {
  clearToken()
  clearCurrentUser()
}
