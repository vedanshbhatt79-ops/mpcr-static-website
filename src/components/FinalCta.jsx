export default function FinalCta() {
  return (
    <section className="final-cta">
      <p data-reveal className="shimmer-text">🌺 GANPATI BAPPA MORIYA 🌺</p>
      <h2 data-reveal style={{ '--reveal-delay': '.15s' }}>
        Until Bappa Arrives,
        <span>Keep The Faith.</span>
      </h2>
      <div data-reveal style={{ '--reveal-delay': '.3s' }}>
        <button className="btn btn-gold" onClick={() => window.scrollTo(0, 0)}>
          Back To Top ↑
        </button>
      </div>
    </section>
  )
}