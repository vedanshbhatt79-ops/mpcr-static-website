import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/aarti', label: 'Aarti' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/social', label: 'Social' },
]

export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <img src="images/logo.png" alt="Modi Park Cha Raja" />
          <div>
            <h3>Modi Park Cha Raja</h3>
            <p>Ganeshotsav Mandal</p>
          </div>
        </div>

        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Modi Park Cha Raja Ganeshotsav Mandal</p>
        <p>🙏 गणपती बाप्पा मोरया 🙏</p>
      </div>
    </footer>
  )
}