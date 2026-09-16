import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/aarti', label: 'Aarti' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/social', label: 'Social' },
]

const socials = [
  { href: 'https://www.instagram.com/modiparkcharaja', label: 'Instagram', icon: '◎' },
  { href: 'https://www.facebook.com/ModyParkChaRaja', label: 'Facebook', icon: 'f' },
  { href: 'https://www.youtube.com/watch?v=e9ai9UrMzTI', label: 'YouTube', icon: '▶' },
]

export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-column">
          <div className="footer-brand">
            <img src="images/logo.png" alt="Modi Park Cha Raja" />
            <div>
              <h3>Modi Park Cha Raja</h3>
              <p>Ganeshotsav Mandal</p>
            </div>
          </div>

          <p className="footer-tagline">
            Celebrating devotion, community and togetherness — every year, with
            our whole society.
          </p>

          <div className="footer-social">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <div className="footer-links">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h4>Reach Us</h4>
          <p className="footer-address">
            Modi Park, Irani Wadi Road No. 3,
            <br />
            Kandivali West, Mumbai – 400067
            <br />
            <span>🙏 Daily Aarti • 7:30 PM</span>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Modi Park Cha Raja Ganeshotsav Mandal</p>
        <p className="footer-chant">🙏 गणपती बाप्पा मोरया 🙏</p>
      </div>
    </footer>
  )
}