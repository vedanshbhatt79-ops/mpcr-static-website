import { API_URL } from '../constants/env-constants.js'

export const AARTI_POLL_INTERVAL = 60 * 1000

const STATUSES = ['live', 'awaiting', 'offline']

export async function getLiveStatus() {
  const response = await fetch(`${API_URL}/aarti/live-status`)

  if (!response.ok) {
    throw new Error(`Aarti live status error: ${response.status}`)
  }

  const data = await response.json()

  return {
    status: STATUSES.includes(data.status) ? data.status : 'offline',
    videoId: data.videoId || null,
    configured: Boolean(data.configured),
  }
}