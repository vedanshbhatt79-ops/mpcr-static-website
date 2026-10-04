import { useCallback, useSyncExternalStore } from 'react'
import { isAuthenticated, logout, onAuthChange } from '../services/auth.js'

export default function useAuth() {
  const authenticated = useSyncExternalStore(
    onAuthChange,
    isAuthenticated,
    () => false,
  )

  const handleLogout = useCallback(() => {
    logout()
  }, [])

  return { authenticated, logout: handleLogout }
}
