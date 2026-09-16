import { useEffect, useState } from 'react'

const images = [
  { src: 'images/ganpati-1.jpg.jpeg', alt: 'Ganpati', large: true, caption: '🙏 Our Bappa' },
  { src: 'images/ganpati-3.jpg.jpeg', alt: 'Ganpati Mandal', large: false },
  { src: 'images/ganpati-4.jpg.jpeg', alt: 'Ganpati celebration', large: false },
  { src: 'images/ganpati-5.jpg.jpeg', alt: 'Ganeshotsav celebration', large: false },
  { src: 'images/ganpati-6.jpg.jpeg', alt: 'Ganeshotsav celebration', large: false },
  { src: 'images/ganpati-7.jpeg', alt: 'Ganeshotsav celebration', large: false },
  { src: 'images/ganpati-8.jpeg', alt: 'Ganeshotsav celebration', large: false },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const open = (index) => setLightbox(index)
  const close = () => setLightbox(null)

  const next = (e) => {
    if (e) e.stopPropagation()
    setLightbox((index) => (index + 1) % images.length)
  }

  const prev = (e) => {
    if (e) e.stopPropagation()
    setLightbox((index) => (index - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (lightbox === null) return

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-heading" data-reveal>
        <span className="section-label">BAPPA'S MEMORIES</span>
        <h2>
          Moments That
          <span>Stay Forever</span>
        </h2>
        <p>A glimpse into our celebrations.</p>
      </div>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <div
            key={img.src}
            className={`gallery-item${img.large ? ' large' : ''}`}
            data-reveal="zoom"
            style={{ '--reveal-delay': `${(index % 4) * 0.08}s` }}
            onClick={() => open(index)}
          >
            <img src={img.src} alt={img.alt} />
            {img.caption && <div className="gallery-overlay">{img.caption}</div>}
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className="image-lightbox" onClick={close}>
          <button className="lightbox-close" aria-label="Close" onClick={close}>
            ×
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Previous image"
            onClick={prev}
          >
            ‹
          </button>

          <figure onClick={(e) => e.stopPropagation()}>
            <img src={images[lightbox].src} alt={images[lightbox].alt} />
            {images[lightbox].caption && (
              <figcaption>{images[lightbox].caption}</figcaption>
            )}
          </figure>

          <button
            className="lightbox-nav lightbox-next"
            aria-label="Next image"
            onClick={next}
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}