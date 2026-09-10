import { apiClient } from '../client'

export const authService = {
  login(name, password) {
    return apiClient.post('/auth/login', { name, password })
  },

  getProfile() {
    return apiClient.get('/auth/profile')
  },

  register(data) {
    return apiClient.post('/user', data)
  },
}