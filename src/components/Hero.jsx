import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-pattern"></div>

      <div className="hero-content">
        <div className="hero-pill">🙏 गणपती बाप्पा मोरया 🙏</div>

        <p className="hero-small">WELCOME TO</p>

        <h1>
          Modi Park
          <span>Cha Raja</span>
        </h1>

        <p className="hero-description">
          Where devotion meets celebration, and every heart beats together for
          Bappa.
        </p>

        <div className="hero-quote">
          “Bappa arrives once a year, but His blessings stay with us forever.”
        </div>

        <div className="hero-buttons">
          <Link to="/events" className="btn btn-gold">
            Explore Celebrations →
          </Link>

          <Link to="/aarti" className="btn btn-outline">
            🪔 Join Aarti
          </Link>
        </div>
      </div>

      <div className="hero-image">
        <div className="image-ring"></div>

        <img src="images/ganpati-1.jpg.jpeg" alt="Modi Park Cha Raja Ganpati" />

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
    </section>
  )
}
