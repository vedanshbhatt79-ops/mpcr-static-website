import { useState } from 'react'

const sponsors = [
  {
    name: 'Modi Park Sponsors',
    image: 'images/sponsor-1.jpeg',
    description: 'Proud supporter of Modi Park Cha Raja Ganeshotsav 2026.',
  },
]

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

      <div className="sponsor-marquee">
        <div className="sponsor-marquee-track">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="sponsor-logo"
              onClick={() => setLightbox(sponsor)}
            >
              <img src={sponsor.image} alt={sponsor.name} />
            </div>
          ))}
        </div>
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