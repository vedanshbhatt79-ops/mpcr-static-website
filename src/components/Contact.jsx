const boxes = [
  {
    icon: '📍',
    title: 'Location',
    body: (
      <p>
        Modi Park,<br />
        Irani Wadi Road No. 3,<br />
        Kandivali West,<br />
        Mumbai – 400067
      </p>
    ),
  },
  {
    icon: '🪔',
    title: 'Daily Aarti',
    body: (
      <p>
        Every day during Ganeshotsav
        <br />
        <strong>7:30 PM</strong>
      </p>
    ),
  },
  {
    icon: '🏛️',
    title: 'Mandal',
    body: (
      <p>
        Modi Park Cha Raja Association
        <br />
        <br />
        CIN:
        <strong>U88900MH2023NPL408060</strong>
      </p>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading">
        <span className="section-label">CONNECT WITH US</span>
        <h2>
          Let's Celebrate
          <span>Together.</span>
        </h2>
      </div>

      <div className="contact-grid">
        {boxes.map((box, index) => (
          <div
            key={box.title}
            className="contact-box"
            data-reveal
            style={{ '--reveal-delay': `${index * 0.12}s` }}
          >
            <span>{box.icon}</span>
            <h3>{box.title}</h3>
            {box.body}
          </div>
        ))}
      </div>
    </section>
  )
}