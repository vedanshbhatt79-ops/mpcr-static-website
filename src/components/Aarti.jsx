import { useState } from 'react'
import aartis from '../aartis.js'

export default function Aarti() {
  const [currentAarti, setCurrentAarti] = useState(0)
  const [currentLanguage, setCurrentLanguage] = useState('marathi')

  const setAarti = (index) => {
    const total = aartis.length
    setCurrentAarti(((index + total) % total))
  }

  const aarti = aartis[currentAarti]

  return (
    <section id="aarti" className="section aarti-section">
      <div className="aarti-decoration">ॐ</div>

      <div className="section-heading">
        <span className="section-label">DAILY DEVOTION</span>
        <h2>
          🪔 Aarti
          <span>With Bappa</span>
        </h2>
        <p>
          Join us every evening at <strong>7:30 PM</strong>.
        </p>
      </div>

      <div className="language-switch">
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
          className="aarti-arrow"
          aria-label="Previous aarti"
          onClick={() => setAarti(currentAarti - 1)}
        >
          {'<'}
        </button>

        <div id="aartiContent" className="aarti-card">
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
          className="aarti-arrow"
          aria-label="Next aarti"
          onClick={() => setAarti(currentAarti + 1)}
        >
          {'>'}
        </button>
      </div>
    </section>
  )
}
