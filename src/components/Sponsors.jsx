import { useState } from 'react'
import { sponsors } from '../data/sponsors.js'

export default function Sponsors() {
  const [lightbox, setLightbox] = useState(null)

  if (sponsors.length === 0) return null

  return (
    <section className="section sponsor-section">
      <div className="section-heading">
        <span className="section-label">OUR SUPPORTERS</span>
        <h2>
          Sponsors Who
          <span>Make It Happen</span>
        </h2>
        <p>We are grateful to our sponsors for their generous support of Ganeshotsav 2026.</p>
      </div>

      <div className="sponsor-grid">
        {sponsors.map((sponsor, index) => (
          <div
            key={sponsor.name}
            className="sponsor-card"
            data-reveal
            style={{ '--reveal-delay': `${(index % 3) * 0.1}s` }}
            onClick={() => setLightbox(sponsor)}
          >
            <img src={sponsor.image} alt={sponsor.name} />
            <h3 className="sponsor-name">{sponsor.name}</h3>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="image-lightbox"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null)
          }}
        >
          <button onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox.image} alt={lightbox.name} />
        </div>
      )}
    </section>
  )
}