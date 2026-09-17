import { Link } from 'react-router-dom'

const chant = 'गणपती बाप्पा मोरया 🙏 मंगलमूर्ती मोरया 🙏 गणपती बाप्पा मोरया 🙏 मंगलमूर्ती मोरया 🙏'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-pattern"></div>
      <div className="hero-orb orb-one"></div>
      <div className="hero-orb orb-two"></div>
      <div className="hero-orb orb-three"></div>

      <svg className="hero-mandala" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="96" fill="none" stroke="#f7d694" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="3 7" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#f59e0b" strokeOpacity=".5" strokeWidth="1" />
        <path d="M100 4 L112 88 L196 100 L112 112 L100 196 L88 112 L4 100 L88 88 Z" fill="none" stroke="#f7d694" strokeOpacity=".35" strokeWidth="1" transform="rotate(0 100 100)" />
        <g transform="rotate(45 100 100)">
          <path d="M100 4 L112 88 L196 100 L112 112 L100 196 L88 112 L4 100 L88 88 Z" fill="none" stroke="#f59e0b" strokeOpacity=".3" strokeWidth="1" />
        </g>
      </svg>

      <div className="hero-content">
        <div className="hero-pill" data-reveal>🙏 गणपती बाप्पा मोरया 🙏</div>

        <p className="hero-small" data-reveal style={{ '--reveal-delay': '.1s' }}>
          WELCOME TO
        </p>

        <h1>
          Modi Park
          <span className="shimmer-text">Cha Raja</span>
        </h1>

        <p className="hero-description" data-reveal style={{ '--reveal-delay': '.2s' }}>
          Where devotion meets celebration, and every heart beats together for
          Bappa.
        </p>

        <div className="hero-quote" data-reveal style={{ '--reveal-delay': '.3s' }}>
          “Bappa arrives once a year, but His blessings stay with us forever.”
        </div>

        <div className="hero-buttons" data-reveal style={{ '--reveal-delay': '.4s' }}>
          <Link to="/events" className="btn btn-gold">
            Explore Celebrations →
          </Link>

          <Link to="/aarti" className="btn btn-outline">
            🪔 Join Aarti
          </Link>
        </div>
      </div>

      <div className="hero-image" data-reveal="zoom" style={{ '--reveal-delay': '.15s' }}>
        <div className="image-ring"></div>

        <img src="images/ganapti-9 (10).jpeg" alt="Modi Park Cha Raja Ganpati" />

        <div className="floating-card card-top">
          <span>🙏</span>
          <div>
            <strong>Faith</strong>
            <small>Devotion</small>
          </div>
        </div>

        <div className="floating-card card-bottom">
          <span>❤️</span>
          <div>
            <strong>Together</strong>
            <small>Community</small>
          </div>
        </div>
      </div>

      <div className="hero-chant" aria-hidden="true">
        <div className="hero-chant-track">
          {[0, 1].map((n) => (
            <span key={n}>{chant}</span>
          ))}
        </div>
      </div>
    </section>
  )
}