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

    const videos = [videoRef1.current, videoRef2.current].filter(Boolean)
    
    videos.forEach((video) => {
      if (!video) return
      
      ScrollTrigger.create({
        trigger: video.closest('.video-section'),
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          const p = video.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        },
        onEnterBack: () => {
          const p = video.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        },
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t: any) => t.kill())
    }
  }, [])

  return (
    <>
      {/* Desktop Video */}
      <section className="spacer header-index d-none d-md-block"></section>
      <section className="video-section header-index d-none d-md-block">
        <video ref={videoRef1} className="hero-video d-none d-md-block" muted playsInline preload="metadata">
          <source src="/video/video1.mp4" type="video/mp4" />
        </video>
      </section>
      <section className="spacer2 header-index d-none d-md-block"></section>

      {/* Mobile Video */}
      <section className="spacer header-index d-md-none"></section>
      <section className="video-section header-index d-md-none">
        <video ref={videoRef2} className="hero-video d-md-none" muted playsInline preload="metadata">
          <source src="/video/video1-2.mp4" type="video/mp4" />
        </video>
      </section>
      <section className="spacer2 header-index d-md-none"></section>
    </>
  )
}