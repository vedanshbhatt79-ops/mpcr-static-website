import { useCallback, useEffect, useState } from 'react'
import { AARTI_POLL_INTERVAL, aartiService } from '../api'

export default function LiveAarti() {
  const [state, setState] = useState({
    status: 'loading',
    videoId: null,
    configured: true,
  })

  const check = useCallback(() => {
    aartiService.getLiveStatus()
      .then((result) =>
        setState({
          status: result.status,
          videoId: result.videoId,
          configured: result.configured,
        })
      )
      .catch(() =>
        setState({ status: 'offline', videoId: null, configured: true })
      )
  }, [])

  useEffect(() => {
    check()

    const id = setInterval(() => {
      if (document.visibilityState === 'visible') {
        check()
      }
    }, AARTI_POLL_INTERVAL)

    return () => clearInterval(id)
  }, [check])

  const renderPlayer = () => {
    if (state.status === 'live' && state.videoId) {
      return (
        <div className="live-video">
          <iframe
            src={`https://www.youtube.com/embed/${state.videoId}`}
            title={`YouTube live stream ${state.videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )
    }

    return (
      <div className="live-fallback">
        <span>📺</span>
        <strong>
          {state.status === 'awaiting'
            ? 'Aarti goes live soon.'
            : state.status === 'loading'
              ? 'Checking live status…'
              : 'Live streaming is not active right now.'}
        </strong>
        <p>
          {state.status === 'awaiting'
            ? 'Stay tuned — the daily Aarti will be streamed live at 7:30 PM onwards.'
            : 'The daily Aarti is streamed live every evening at 7:30 PM onwards.'}
        </p>
        {!state.configured && (
          <p>Live darshan has not been configured by the website owner yet.</p>
        )}
        {state.configured && (
          <button
            className="live-retry"
            onClick={check}
            disabled={state.status === 'loading'}
          >
            ↻ Retry
          </button>
        )}
      </div>
    )
  }

  return (
    <section className="live-section">
      <div className="section-heading" data-reveal>
        <span className="section-label">LIVE DARSHAN</span>
        <h2>
          Live
          <span>Aarti</span>
        </h2>
        <p>Watch the Aarti and celebrations of Modi Park Cha Raja live.</p>
      </div>

      <div className="live-card" data-reveal="zoom" style={{ '--reveal-delay': '.15s' }}>
        <div className="live-header">
          <div>
            {state.status === 'live' ? (
              <span className="live-badge">● LIVE</span>
            ) : (
              <span className="live-badge live-badge-off">Schedule</span>
            )}
            <small>Daily Aarti • 7:30 PM onwards</small>
          </div>
        </div>

        {renderPlayer()}
      </div>
    </section>
  )
}