import { useState } from 'react'

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

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-heading">
        <span className="section-label">BAPPA'S MEMORIES</span>
        <h2>
          Moments That
          <span>Stay Forever</span>
        </h2>
        <p>A glimpse into our celebrations.</p>
      </div>

      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img.src} className={`gallery-item${img.large ? ' large' : ''}`}>
            <img
              src={img.src}
              alt={img.alt}
              onClick={() => setLightbox(img)}
            />
            {img.caption && <div className="gallery-overlay">{img.caption}</div>}
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="image-lightbox"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null)
          }}
        >
          <button onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </section>
  )
}
