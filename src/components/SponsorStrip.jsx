import { sponsors } from '../data/sponsors.js'

export default function SponsorStrip() {
  if (sponsors.length === 0) return null

  return (
    <section className="section sponsor-strip-section">
      <div className="section-heading">
        <span className="section-label">OUR SUPPORTERS</span>
        <h2>
          2026
          <span> Sponsors</span>
        </h2>
      </div>

      <div className="sponsor-strip-marquee">
        <div className="sponsor-marquee-track">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <img
              key={`${sponsor.name}-${index}`}
              src={sponsor.image}
              alt={sponsor.name}
              className="sponsor-strip-logo"
            />
          ))}
        </div>
      </div>
    </section>
  )
}