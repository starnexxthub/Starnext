'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollSequenceMobile() {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const sectionRef  = useRef<HTMLElement>(null)
  const rafRef      = useRef<number | null>(null)
  const targetTime  = useRef(0)
  const currentTime = useRef(0)
  const [loaded, setLoaded]     = useState(false)
  const [progress, setProgress] = useState(0)

  const handleMetadata = () => setLoaded(true)

  // ── Scroll → targetTime mapping ──────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    if (!section || !video) return

    const onScroll = () => {
      const rect    = section.getBoundingClientRect()
      const windowH = window.innerHeight
      if (rect.top > 0 || rect.bottom < windowH) return // not in pin zone

      const scrollInside = Math.abs(rect.top)
      const maxScroll    = section.scrollHeight - windowH
      const fraction     = Math.min(1, Math.max(0, scrollInside / maxScroll))

      setProgress(fraction)

      if (video.duration) {
        targetTime.current = fraction * video.duration
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── RAF loop: lerp currentTime → targetTime ───────────────────────────────
  // Increased lerp factor to 0.25 for snappier response on low-end mobile
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tick = () => {
      currentTime.current += (targetTime.current - currentTime.current) * 0.25

      if (Math.abs(currentTime.current - video.currentTime) > 0.01) {
        video.currentTime = currentTime.current
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scroll-section-mobile"
      style={{
        position: 'relative',
        height: '500vh',
        width: '100%',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
      }}>

        {/* ── Video element ─────────────────────────────────────────────── */}
        {/* crossOrigin="anonymous" required for iOS Safari currentTime scrubbing */}
        {/* Only MP4 source — removing WebM prevents Safari stalling on missing file */}
        {/* galaxy_4.mp4 must be encoded with -g 1 for per-frame keyframes:        */}
        {/*   ffmpeg -i galaxy_4.mp4 -c:v libx264 -crf 23 -g 1                     */}
        {/*     -movflags faststart -vf "scale=iw/2:ih/2" public/frames/galaxy_4.mp4 */}
        <video
          ref={videoRef}
          onLoadedMetadata={handleMetadata}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <source src="/frames/galaxy_4.mp4" type="video/mp4" />
        </video>

        {/* ── Loading state ─────────────────────────────────────────────── */}
        {!loaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
          }}>
            <LoadingSpinner />
          </div>
        )}

        {/* ── Vignette overlay ──────────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }} />

        {/* ── Scroll progress bar ───────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          width: `${progress * 100}%`,
          background: 'rgba(255,255,255,0.6)',
          transition: 'width 0.05s linear',
          pointerEvents: 'none',
          zIndex: 10,
        }} />

        {/* ── Scroll hint ───────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          bottom: '6vh',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: progress < 0.03 ? 1 : 0,
          transition: 'opacity 0.5s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          <span style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'system-ui, sans-serif',
          }}>
            Scroll
          </span>
          <ChevronDown />
        </div>

      </div>
    </section>
  )
}

function LoadingSpinner() {
  return (
    <div style={{
      width: 32,
      height: 32,
      border: '2px solid rgba(255,255,255,0.15)',
      borderTop: '2px solid rgba(255,255,255,0.8)',
      borderRadius: '50%',
      animation: 'mobileSpinnerSpin 0.8s linear infinite',
    }}>
      <style>{`
        @keyframes mobileSpinnerSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: 'mobileChevronBounce 1.4s ease-in-out infinite' }}
    >
      <style>{`
        @keyframes mobileChevronBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.5; }
          50%       { transform: translateY(4px); opacity: 1;   }
        }
      `}</style>
      <path
        d="M3 5.5L8 10.5L13 5.5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}