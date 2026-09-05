import { useEffect, useState } from 'react'

const FESTIVAL_DATE = new Date(2026, 8, 12, 15, 30, 0)

function getTimeLeft() {
  const difference = FESTIVAL_DATE.getTime() - Date.now()

  if (difference <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  }

  const totalSeconds = Math.floor(difference / 1000)
  const d = Math.floor(totalSeconds / 86400)
  const h = Math.floor((totalSeconds % 86400) / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  return {
    days: String(d).padStart(2, '0'),
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  }
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const boxes = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <section className="countdown-section">
      <div className="countdown-card">
        <div className="countdown-heading">
          <span>THE WAIT BEGINS</span>
          <h2>⏳ Countdown to Bappa</h2>
          <p>Get ready to welcome Modi Park Cha Raja!</p>
          <strong className="arrival-date">
            Aagman — 12 September 2026 • 3:30 PM
          </strong>
        </div>

        <div className="countdown">
          {boxes.map((box) => (
            <div className="time-box" key={box.label}>
              <strong>{box.value}</strong>
              <span>{box.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
