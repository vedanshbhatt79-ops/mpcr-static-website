import { useRef, useState } from 'react'
import aartis from '../aartis.js'

export default function Aarti() {
  const [currentAarti, setCurrentAarti] = useState(0)
  const [currentLanguage, setCurrentLanguage] = useState('marathi')
  const touchStartX = useRef(null)

  const setAarti = (index) => {
    const total = aartis.length
    setCurrentAarti(((index + total) % total))
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(deltaX) < 50) return
    if (deltaX < 0) setAarti(currentAarti + 1)
    else setAarti(currentAarti - 1)
  }

  const aarti = aartis[currentAarti]

  return (
    <section id="aarti" className="section aarti-section">
      <div className="aarti-decoration">ॐ</div>

      <div className="section-heading" data-reveal>
        <span className="section-label">DAILY DEVOTION</span>
        <h2>
          🪔 Aarti
          <span>With Bappa</span>
        </h2>
        <p>
          Join us every evening at <strong>7:30 PM</strong>.
        </p>
      </div>

      <div className="diya" aria-hidden="true">🪔</div>

      <div className="language-switch" data-reveal>
        <button
          className={`language-btn ${currentLanguage === 'marathi' ? 'active' : ''}`}
          data-language="marathi"
          onClick={() => setCurrentLanguage('marathi')}
        >
          मराठी
        </button>
        <button
          className={`language-btn ${currentLanguage === 'english' ? 'active' : ''}`}
          data-language="english"
          onClick={() => setCurrentLanguage('english')}
        >
          English
        </button>
      </div>

      <div className="aarti-selector">
        {aartis.map((item, index) => (
          <button
            key={index}
            className={`aarti-select ${currentAarti === index ? 'active' : ''}`}
            data-aarti={index}
            onClick={() => setAarti(index)}
          >
            {item.titleMarathi}
          </button>
        ))}
      </div>

      <div className="aarti-navigation">
        <button
          className="aarti-arrow aarti-arrow-prev"
          type="button"
          aria-label="Previous Aarti"
          onClick={() => setAarti(currentAarti - 1)}
        >
          ←
        </button>
        <div
          id="aartiContent"
          className="aarti-card"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {currentLanguage === 'marathi' ? (
            <>
              <h3 className="aarti-title">{aarti.titleMarathi}</h3>
              <p className="aarti-subtitle">🪔 मराठी आरती</p>
              <div className="aarti-lines">
                {aarti.marathi.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="aarti-title">{aarti.titleEnglish}</h3>
              <p className="aarti-subtitle">🪔 English Aarti</p>
              <div className="english-aarti">
                {aarti.englishLyrics.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </>
          )}
        </div>
        <button
          className="aarti-arrow aarti-arrow-next"
          type="button"
          aria-label="Next Aarti"
          onClick={() => setAarti(currentAarti + 1)}
        >
          →
        </button>
      </div>

      <p className="aarti-swipe-hint">← Swipe left / right to change Aarti →</p>
    </section>
  )
}