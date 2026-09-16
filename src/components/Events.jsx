const schedule = [
  { date: '14/09/2026', day: 'Monday', event: '🙏 Rest', aarti: '🪔 7:30 PM' },
  { date: '15/09/2026', day: 'Tuesday', event: '🙏 Rest', aarti: '🪔 7:30 PM' },
  { date: '16/09/2026', day: 'Wednesday', event: '🎨 Drawing Competition', aarti: '🪔 7:30 PM' },
  { date: '17/09/2026', day: 'Thursday', event: '🎮 Game Show (Open for all)', aarti: '🪔 7:30 PM' },
  { date: '18/09/2026', day: 'Friday', event: "🌟 Modi Park's Got Talent", aarti: '🪔 7:30 PM' },
  { date: '19/09/2026', day: 'Saturday', event: '🎵 Sangeet Night', aarti: '🪔 7:30 PM' },
  { date: '20/09/2026', day: 'Sunday', event: '🕉️ Satyanarayan Katha', aarti: '🪔 9:00 AM' },
  { date: '21/09/2026', day: 'Monday', event: '🎭 Drama / Skit', aarti: '🪔 7:30 PM' },
  { date: '22/09/2026', day: 'Tuesday', event: '🎶 Antakshari (Open for all)', aarti: '🪔 7:30 PM' },
  { date: '23/09/2026', day: 'Wednesday', event: '🪔 Aarti Competition', aarti: '🪔 7:30 PM' },
  { date: '24/09/2026', day: 'Thursday', event: '🏆 Prize Distribution & Housie', aarti: '🪔 7:30 PM' },
  { date: '25/09/2026', day: 'Friday', event: '🚩 Visarjan', aarti: '🚩 Maha Aarti 4:00 PM', visarjan: true },
]

const parseDate = (date) => {
  const [d, m, y] = date.split('/').map(Number)
  return new Date(y, m - 1, d)
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const upcoming = schedule
  .filter((row) => parseDate(row.date) >= today)
  .sort((a, b) => parseDate(a.date) - parseDate(b.date))[0]

export default function Events() {
  return (
    <section id="events" className="section events-section">
      <div className="section-heading" data-reveal>
        <span className="section-label">GANESHOTSAV 2026</span>
        <h2>Events & Programme</h2>
        <p>Celebrate, participate and create memories with Modi Park Cha Raja.</p>
      </div>

      <div className="special-event aagman-event" data-reveal>
        <div className="special-icon">🥁</div>
        <div>
          <span>SATURDAY • 12 SEPTEMBER 2026</span>
          <h3>Bappa's Grand Aagman</h3>
          <p>The arrival of our beloved Bappa will begin from Anand Nagar.</p>
          <div className="event-info-line">
            <b>🕒 3:30 PM onwards</b>
            <b>📍 Anand Nagar</b>
            <b>👕 Dress Code: WHITE</b>
          </div>
        </div>
      </div>

      <div className="events-table-wrapper" data-reveal style={{ '--reveal-delay': '.1s' }}>
        <table className="events-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Event</th>
              <th>Aarti</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => {
              const isUpcoming = upcoming && row.date === upcoming.date
              return (
                <tr
                  key={row.date}
                  className={[
                    row.visarjan ? 'visarjan-row' : '',
                    isUpcoming ? 'upcoming-row' : '',
                  ].join(' ').trim() || undefined}
                >
                  <td>{row.visarjan || isUpcoming ? <strong>{row.date}</strong> : row.date}</td>
                  <td>{row.visarjan || isUpcoming ? <strong>{row.day}</strong> : row.day}</td>
                  <td>
                    <span className={isUpcoming ? 'event-pill' : undefined}>
                      {row.event}
                    </span>
                  </td>
                  <td>{row.visarjan || isUpcoming ? <strong>{row.aarti}</strong> : row.aarti}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="special-event" data-reveal>
        <div className="special-icon">🎵</div>
        <div>
          <span>SPECIAL HIGHLIGHT</span>
          <h3>Ganesh Utsav 2026 Special — Sangeet Night!</h3>
          <ul>
            <li>
              A first for our society! This year, we're adding something new
              and exciting to our Ganesh Utsav celebrations.
            </li>
            <li>
              Inspired by the popular trend of bhajan jamming, we bring you a
              soulful evening of live music and devotion.
            </li>
            <li>
              <strong>Dress Code:</strong> Traditional — come dressed in your
              festive best to match the spirit of the celebration!
            </li>
          </ul>
        </div>
      </div>

      <div className="updates-box" data-reveal>
        <h3>📢 Important Updates</h3>
        <ul>
          <li>
            The Aagman of our beloved Bappa will be on{' '}
            <strong>Saturday, 12th September 2026</strong>, starting from{' '}
            <strong>Anand Nagar at 3:30 PM</strong> onwards and dress code will
            be <strong>(WHITE)</strong>.
          </li>
          <li>
            Ganesh sthapna will be on <strong>14th September 2026 at 7:00 AM</strong>{' '}
            in the morning.
          </li>
          <li>
            The daily Aarti will be held at <strong>7:30 PM</strong> sharp.
          </li>
          <li>
            Satyanarayan Katha will start from <strong>9 AM</strong> onwards.
          </li>
          <li>
            On Visarjan day, Maha Aarti of our beloved Bappa will start from{' '}
            <strong>4 PM</strong> onwards and the dress code will be{' '}
            <strong>(Red)</strong>.
          </li>
        </ul>
      </div>
    </section>
  )
}