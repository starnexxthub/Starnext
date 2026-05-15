'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile === null) return
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = isMobile
      ? {
          frameCount: 218,
          framePath: (i: number) =>
            `/frames/mobile/ezgif-frame-${String(i).padStart(3, '0')}.jpg`,
        }
      : {
          frameCount: 218,
          framePath: (i: number) =>
            `/frames/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`,
        }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const images: HTMLImageElement[] = []
    const imageSeq = { frame: 0 }
    let rafId: number | null = null

    for (let i = 1; i <= config.frameCount; i++) {
      const img = new Image()
      img.src = config.framePath(i)
      images.push(img)
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const img = images[imageSeq.frame]
      if (img?.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }

    images[0].onload = () => render()

    const handleScroll = () => {
      const section = document.querySelector('.scroll-sequence-section') as HTMLElement
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrollInside = Math.abs(rect.top)
        const maxScroll = section.scrollHeight - windowHeight

        if (maxScroll <= 0) return

        const scrollFraction = Math.min(1, scrollInside / maxScroll)

        // Hide hint after scrolling 8% into the section
        setShowScrollHint(scrollFraction < 0.08)

        const frameIndex = Math.min(
          config.frameCount - 1,
          Math.floor(scrollFraction * config.frameCount)
        )

        if (frameIndex !== imageSeq.frame) {
          imageSeq.frame = frameIndex
          if (rafId) cancelAnimationFrame(rafId)
          rafId = requestAnimationFrame(render)
        }
      } else if (rect.top > 0) {
        // Section hasn't started yet — show hint
        setShowScrollHint(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      render()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  if (isMobile === null) return null

  return (
    <section
      className="scroll-sequence-section"
      style={{ height: '500vh', position: 'relative', zIndex: 10 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'block',
        }}
      />

      {/* Floating scroll hint — mobile only */}
      {isMobile && (
        <div
          style={{
            position: 'sticky',
            bottom: 28,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 20,
            marginTop: '-60px', // pull up over the canvas
            opacity: showScrollHint ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 999,
              padding: '8px 16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.03em',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Scroll down
            </span>
            {/* Animated arrow */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: 'scrollBounce 1.4s ease-in-out infinite',
              }}
            >
              <path
                d="M7 2v10M3.5 8.5L7 12l3.5-3.5"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(-2px); }
          50%       { transform: translateY(2px); }
        }
      `}</style>
    </section>
  )
}