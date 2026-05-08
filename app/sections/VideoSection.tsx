'use client'

import { useEffect, useRef } from 'react'

export default function VideoSection() {
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const setup = () => {
      const gsap = (window as any).gsap
      const ScrollTrigger = (window as any).ScrollTrigger
      if (!gsap || !ScrollTrigger) return

      const isMobile = window.matchMedia('(max-width: 767px)').matches
      const activeVideo = isMobile ? videoRef2.current : videoRef1.current
      if (!activeVideo) return

      const safePlay = (video: HTMLVideoElement) => {
        if (document.visibilityState === 'hidden') return
        video.currentTime = 0
        const p = video.play()
        if (p?.catch) p.catch(() => {})
      }

      const safePause = (video: HTMLVideoElement) => {
        video.pause()
      }

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') safePause(activeVideo)
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)

      const videoSection = activeVideo.closest('.video-section')

      const trigger = ScrollTrigger.create({
        trigger: videoSection,
        start: 'top top',       // pin starts when video section hits top of viewport
        end: '+=100%',          // pinned for 1 full viewport height (adjust as needed)
        //pin: true,
        //pinSpacing: true,
        //anticipatePin: 1,       // ✅ prevents jump/flicker when pin activates
        onEnter: () => safePlay(activeVideo),
        onEnterBack: () => safePlay(activeVideo),
        onLeave: () => safePause(activeVideo),
        onLeaveBack: () => safePause(activeVideo),
      })

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        trigger.kill()
      }
    }

    if ((window as any).gsap && (window as any).ScrollTrigger) {
      setup()
    } else {
      window.addEventListener('gsap-ready', setup, { once: true })
      return () => window.removeEventListener('gsap-ready', setup)
    }
  }, [])

  return (
    <>
      {/* Desktop Video */}
      {/* ✅ Spacer BEFORE video so slider fully scrolls away before pin activates */}
      <section
        className="header-index d-none d-md-block"
          // matches SR7Slider height so it clears viewport first
      />
      <section className="video-section header-index d-none d-md-block">
        <video
          ref={videoRef1}
          className="hero-video"
          muted
          playsInline
          loop
          preload="none"
          poster="/video/video1-poster.webp"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        >
          <source src="/video/video1.webm" type="video/webm" />
          <source src="/video/video1.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Mobile Video */}
      <section
        className="header-index d-md-none"
        style={{ height: '100vh' }}
      />
      <section className="video-section header-index d-md-none">
        <video
          ref={videoRef2}
          className="hero-video"
          muted
          playsInline
          loop
          preload="none"
          poster="/video/video1-2-poster.webp"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        >
          <source src="/video/video1-2.webm" type="video/webm" />
          <source src="/video/video1-2.mp4" type="video/mp4" />
        </video>
      </section>
    </>
  )
}