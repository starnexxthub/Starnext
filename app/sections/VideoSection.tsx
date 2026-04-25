'use client'

import { useEffect, useRef } from 'react'

export default function VideoSection() {
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger

    if (!gsap || !ScrollTrigger) return

    // Only register the visible video — skip the hidden one
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const activeVideo = isMobile ? videoRef2.current : videoRef1.current

    if (!activeVideo) return

    const safePlay = (video: HTMLVideoElement) => {
      if (document.visibilityState === 'hidden') return
      const p = video.play()
      if (p?.catch) p.catch(() => {})
    }

    const safePause = (video: HTMLVideoElement) => {
      video.pause()
    }

    // Pause video when tab is hidden to save resources
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        safePause(activeVideo)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const trigger = ScrollTrigger.create({
      trigger: activeVideo.closest('.video-section'),
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      onEnter: () => safePlay(activeVideo),
      onEnterBack: () => safePlay(activeVideo),
      onLeave: () => safePause(activeVideo),
      onLeaveBack: () => safePause(activeVideo),
    })

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      trigger.kill()
    }
  }, [])

  return (
    <>
      {/* Desktop Video */}
      <section className="spacer header-index d-none d-md-block"></section>
      <section className="video-section header-index d-none d-md-block">
        <video
          ref={videoRef1}
          className="hero-video d-none d-md-block"
          muted
          playsInline
          preload="none"         // ← was "metadata"; skip even metadata until needed
          poster="/video/video1-poster.webp"  // ← show a frame instead of blank
        >
          <source src="/video/video1.webp" type="video/webp" />  {/* ← WebM first (smaller) */}
          <source src="/video/video1.mp4" type="video/mp4" />
        </video>
      </section>
      <section className="spacer2 header-index d-none d-md-block"></section>

      {/* Mobile Video */}
      <section className="spacer header-index d-md-none"></section>
      <section className="video-section header-index d-md-none">
        <video
          ref={videoRef2}
          className="hero-video d-md-none"
          muted
          playsInline
          preload="none"         // ← same here
          poster="/video/video1-2-poster.webp"
        >
          <source src="/video/video1-2.webm" type="video/webm" />
          <source src="/video/video1-2.mp4" type="video/mp4" />
        </video>
      </section>
      <section className="spacer2 header-index d-md-none"></section>
    </>
  )
}