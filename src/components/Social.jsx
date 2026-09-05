const socials = [
  {
    href: 'https://www.instagram.com/modiparkcharaja',
    className: 'social-card instagram',
    icon: '◎',
    small: 'FOLLOW US ON',
    name: 'Instagram',
    handle: '@modiparkcharaja',
  },
  {
    href: 'https://www.facebook.com/ModyParkChaRaja',
    className: 'social-card facebook',
    icon: 'f',
    small: 'FOLLOW US ON',
    name: 'Facebook',
    handle: 'Modi Park Cha Raja',
  },
  {
    href: 'https://www.youtube.com/watch?v=e9ai9UrMzTI',
    className: 'social-card youtube',
    icon: '▶',
    small: 'WATCH US ON',
    name: 'YouTube',
    handle: 'Modi Park Cha Raja',
  },
]

export default function Social() {
  return (
    <section className="social-section">
      <div className="section-heading">
        <span className="section-label">STAY CONNECTED</span>
        <h2>
          Follow
          <span>Our Journey</span>
        </h2>
        <p>Stay updated with announcements, photos and videos.</p>
      </div>

      <div className="social-grid">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener"
            className={social.className}
          >
            <div className="social-icon">{social.icon}</div>
            <div>
              <small>{social.small}</small>
              <strong>{social.name}</strong>
              <span>{social.handle}</span>
            </div>
            <b>→</b>
          </a>
        ))}
      </div>
    </section>
  )
}
