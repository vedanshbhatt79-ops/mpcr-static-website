import { useEffect, useState } from 'react'
import seedAartis from '../aartis.js'
import { aartiService } from '../api'
import { useAuth } from '../contexts/auth.context'

const toLines = (text) => (text || '').split('\n').filter(Boolean)

const mapEntityToView = (item) => ({
  titleMarathi: item.titleMR,
  titleEnglish: item.titleEN,
  marathi: toLines(item.hindiVersion),
  englishLyrics: toLines(item.englishVersion),
})

const sortAartis = (items) =>
  [...items].sort(
    (a, b) =>
      (a.displayOrder ?? Number.MAX_SAFE_INTEGER) - (b.displayOrder ?? Number.MAX_SAFE_INTEGER) ||
      a.id - b.id,
  )

const EMPTY_FORM = {
  titleEN: '',
  titleMR: '',
  englishVersion: '',
  hindiVersion: '',
  displayOrder: '',
}

export default function Aarti() {
  const { user } = useAuth()
  const [aartis, setAartis] = useState(seedAartis)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [currentAarti, setCurrentAarti] = useState(0)
  const [currentLanguage, setCurrentLanguage] = useState('marathi')

  const refreshAartis = async () => {
    try {
      const items = await aartiService.getAartis()
      if (items.length > 0) {
        setAartis(sortAartis(items).map(mapEntityToView))
        setCurrentAarti(0)
      }
      setLoadError('')
      setLoading(false)
    } catch (err) {
      setLoadError(err.message || 'Could not load aartis.')
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshAartis()
  }, [])

  const setAarti = (index) => {
    const total = aartis.length
    if (total === 0) return
    setCurrentAarti(((index + total) % total))
  }

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!form.titleEN.trim() || !form.titleMR.trim()) {
      setFormError('Both title (English and Marathi) are required.')
      return
    }

    setSubmitting(true)
    try {
      await aartiService.createAarti({
        titleEN: form.titleEN.trim(),
        titleMR: form.titleMR.trim(),
        englishVersion: form.englishVersion.trim(),
        hindiVersion: form.hindiVersion.trim(),
        ...(form.displayOrder !== '' ? { displayOrder: Number(form.displayOrder) } : {}),
      })
      setForm(EMPTY_FORM)
      setShowAddForm(false)
      await refreshAartis()
    } catch (err) {
      setFormError(err.message || 'Could not add the aarti.')
    } finally {
      setSubmitting(false)
    }
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

      {loading && <p className="aarti-status">Loading aartis…</p>}
      {loadError && <p className="aarti-status">Showing saved aartis — {loadError}</p>}

      {aartis.length > 0 && (
        <>
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
        </>
      )}

      {user && (
        <div className="aarti-admin">
          <button
            className="btn btn-gold aarti-admin-toggle"
            onClick={() => {
              setFormError('')
              setShowAddForm((open) => !open)
            }}
          >
            {showAddForm ? 'Cancel' : 'Add Aarti'}
          </button>

          {showAddForm && (
            <form onSubmit={handleAddSubmit} className="auth-form aarti-add-form" noValidate>
              <div className="auth-field">
                <label htmlFor="aarti-titleEN">Title (English)</label>
                <input
                  id="aarti-titleEN"
                  type="text"
                  value={form.titleEN}
                  onChange={(e) => updateForm('titleEN', e.target.value)}
                  placeholder="e.g. Shree Ganesh Aarti"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="aarti-titleMR">Title (Marathi)</label>
                <input
                  id="aarti-titleMR"
                  type="text"
                  value={form.titleMR}
                  onChange={(e) => updateForm('titleMR', e.target.value)}
                  placeholder="e.g. श्री गणेश आरती"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="aarti-englishVersion">Aarti text (English)</label>
                <textarea
                  id="aarti-englishVersion"
                  rows="6"
                  value={form.englishVersion}
                  onChange={(e) => updateForm('englishVersion', e.target.value)}
                  placeholder="One lyric line per line"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="aarti-hindiVersion">Aarti text (Marathi)</label>
                <textarea
                  id="aarti-hindiVersion"
                  rows="6"
                  value={form.hindiVersion}
                  onChange={(e) => updateForm('hindiVersion', e.target.value)}
                  placeholder="Marathi lyrics, one line per line"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="aarti-displayOrder">Display order (optional)</label>
                <input
                  id="aarti-displayOrder"
                  type="number"
                  value={form.displayOrder}
                  onChange={(e) => updateForm('displayOrder', e.target.value)}
                  placeholder="e.g. 1"
                />
              </div>

              {formError && <p className="auth-error" role="alert">{formError}</p>}

              <button type="submit" className="btn btn-gold auth-submit" disabled={submitting}>
                {submitting ? 'Adding…' : 'Add Aarti'}
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  )
}