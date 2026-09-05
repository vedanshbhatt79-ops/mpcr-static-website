const items = [
  'Festival arrangements',
  'Cultural activities',
  'Community programmes',
  'Ganeshotsav celebrations',
]

export default function Donate() {
  return (
    <section id="donate" className="donation-section">
      <div className="donation-content">
        <span className="section-label">SUPPORT BAPPA</span>
        <h2>
          Your Contribution
          <span>Makes A Difference.</span>
        </h2>
        <p>
          Every contribution helps us organise meaningful celebrations, cultural
          programmes and community activities.
        </p>

        <div className="donation-list">
          {items.map((item) => (
            <div key={item}>✓ {item}</div>
          ))}
        </div>
      </div>

      <div className="qr-card">
        <div className="qr-title">
          <span>💳</span>
          <div>
            <small>UPI PAYMENT</small>
            <h3>Scan & Donate</h3>
          </div>
        </div>

        <div className="qr-wrapper">
          <img
            src="images/payment-qr.png"
            alt="Modi Park Cha Raja UPI Payment QR Code"
          />
        </div>

        <p>Scan the QR code using your preferred UPI application.</p>

        <strong>🙏 Thank you for supporting Bappa!</strong>
      </div>
    </section>
  )
}
