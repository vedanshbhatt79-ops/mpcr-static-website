export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-heading">
        <span className="section-label">OUR STORY</span>
        <h2>
          More Than A Festival.
          <span>It's An Emotion.</span>
        </h2>
        <p>
          Modi Park Cha Raja brings families, friends and neighbours together
          in the spirit of devotion, happiness and community.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-image" data-reveal="left">
          <img src="images/ganpati-2.jpg.jpeg" alt="Ganpati celebration" />
          <div className="photo-caption">
            <span>🌺</span>
            <div>
              <strong>Our Bappa</strong>
              <small>Our pride. Our blessing.</small>
            </div>
          </div>
        </div>

        <div className="about-content" data-reveal="right">
          <h3>
            One Bappa.
            <span>One Community.</span>
          </h3>
          <p>
            Every year, our society comes together to celebrate Ganeshotsav
            with devotion and enthusiasm.
          </p>
          <p>
            From daily Aarti to cultural activities, competitions and community
            gatherings, every moment is created with love and participation.
          </p>

          <div className="feature-row">
            <div className="feature">
              <b>🪔</b>
              <span>Daily Aarti</span>
            </div>
            <div className="feature">
              <b>🎭</b>
              <span>Cultural Events</span>
            </div>
            <div className="feature">
              <b>🤝</b>
              <span>Community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}