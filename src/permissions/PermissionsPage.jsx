import { useEffect, useState } from 'react'
import { PERMISSIONS, buildCtx, letterToBlocks } from './templates'
import { downloadWord, downloadPdf } from './export'
import { isUtsavStale, getUtsavStart, getUtsavEnd, formatDate, isoDate } from '../utils/date'

const ACTIONS = [
  ['word', 'Word'],
  ['pdf', 'PDF'],
]

function Runs({ runs }) {
  return runs.map((run, index) =>
    run.bold ? <strong key={index}>{run.text}</strong> : <span key={index}>{run.text}</span>,
  )
}

function PreviewBlock({ block }) {
  switch (block.type) {
    case 'rule':
      return <hr className="preview-rule" />
    case 'letterhead':
      return (
        <p className={block.size === 14 ? 'preview-letterhead preview-letterhead-lg' : 'preview-letterhead'}>
          <Runs runs={block.runs} />
        </p>
      )
    case 'date':
      return (
        <p className="preview-date" style={{ textAlign: block.align || 'right' }}>
          <Runs runs={block.runs} />
        </p>
      )
    case 'subject':
      return (
        <p className="preview-subject" style={{ textAlign: block.align || 'center' }}>
          <Runs runs={block.runs} />
        </p>
      )
    case 'paragraph':
      return (
        <p className="preview-paragraph" style={{ textAlign: block.align || 'justify' }}>
          <Runs runs={block.runs} />
        </p>
      )
    case 'fromto':
      return (
        <p className="preview-fromto">
          <Runs runs={block.runs} />
        </p>
      )
    case 'signature':
      return (
        <p className="preview-signature">
          <Runs runs={block.runs} />
        </p>
      )
    default:
      return (
        <p className="preview-text">
          <Runs runs={block.runs} />
        </p>
      )
  }
}

function PreviewModal({ title, lang, blocks, onClose }) {
  return (
    <div
      className="preview-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={lang === 'mr' ? 'preview-panel preview-panel--mr' : 'preview-panel'}>
        <button
          type="button"
          className="preview-close"
          onClick={onClose}
          aria-label="Close preview"
        >
          ×
        </button>
        <span className="preview-tag">PREVIEW · {title}</span>
        {blocks.map((block, index) => (
          <PreviewBlock key={index} block={block} />
        ))}
      </div>
    </div>
  )
}

export default function PermissionsPage() {
  const [preview, setPreview] = useState(null)
  const stale = isUtsavStale()

  useEffect(() => {
    if (stale) {
      console.warn(
        `[permissions] UTSAV_DATES ends ${formatDate(getUtsavEnd())} (in the past). Update src/constants/constants.js.`,
      )
    }
  }, [stale])

  const handlePreview = (template) => {
    const ctx = buildCtx()
    const letter = template.build(ctx)
    setPreview({ title: template.title, lang: letter.lang || 'en', blocks: letterToBlocks(letter) })
  }

  const handleDownload = async (template, kind) => {
    const ctx = buildCtx()
    const letter = template.build(ctx)
    const base = `${template.id}-${isoDate(ctx.letterDate)}`
    try {
      if (kind === 'word') {
        await downloadWord(letter, `${base}.docx`)
      } else {
        await downloadPdf(letter, `${base}.pdf`)
      }
    } catch (error) {
      console.error('[permissions] download failed', error)
      window.alert('Sorry, the download failed. Please try again.')
    }
  }

  return (
    <section className="section permissions-section">
      <div className="section-heading" data-reveal>
        <span className="section-label">ADMIN</span>
        <h2>
          Permission
          <span> Letters</span>
        </h2>
        <p>Preview and download ready-to-use letters for Ganeshotsav {getUtsavStart().getFullYear()}.</p>
      </div>

      {stale && (
        <div className="permissions-stale">
          <strong>Festival dates need updating.</strong> UTSAV_DATES currently ends{' '}
          {formatDate(getUtsavEnd())}. Update <code>src/constants/constants.js</code> for the next
          Ganeshotsav.
        </div>
      )}

      <div className="permissions-list">
        {PERMISSIONS.map((template) => (
          <div key={template.id} data-reveal className="permissions-row">
            <h3 className="permissions-row-title">{template.title}</h3>
            <div className="permissions-actions">
              <button
                type="button"
                className="btn btn-gold permissions-btn"
                onClick={() => handlePreview(template)}
              >
                Preview
              </button>
              {ACTIONS.map(([kind, label]) => (
                <button
                  key={kind}
                  type="button"
                  className="btn btn-gold permissions-btn"
                  onClick={() => handleDownload(template, kind)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {preview && (
        <PreviewModal
          title={preview.title}
          lang={preview.lang}
          blocks={preview.blocks}
          onClose={() => setPreview(null)}
        />
      )}
    </section>
  )
}
