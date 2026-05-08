'use client'

import { useEffect, useRef } from 'react'

export default function VideoSection() {
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)
  const sectionRef1 = useRef<HTMLElement>(null)
  const sectionRef2 = useRef<HTMLElement>(null)

  useEffect(() => {
  if (typeof window === 'undefined') return

  let triggers: any[] = []

  const init = () => {
    const ScrollTrigger = (window as any).ScrollTrigger

    if (!ScrollTrigger) return

    const setupVideo = (
      video: HTMLVideoElement | null,
      section: HTMLElement | null
    ) => {
      if (!video || !section) return

      // FORCE LOAD
      video.load()

      const playVideo = async () => {
        try {
          if (document.visibilityState !== 'visible') return

          // ensure loaded enough
          if (video.readyState < 2) {
            await new Promise((resolve) => {
              video.onloadeddata = () => resolve(true)
            })
          }

          if (video.paused) {
            await video.play()
          }
        } catch (err) {
          console.log('Video play prevented')
        }
      }

      const pauseVideo = () => {
        if (!video.paused) {
          video.pause()
        }
      }

      const trigger = ScrollTrigger.create({
        trigger: section,

        start: 'top 85%',
        end: 'bottom 15%',

        onEnter: () => playVideo(),
        onEnterBack: () => playVideo(),

        onLeave: () => pauseVideo(),
        onLeaveBack: () => pauseVideo(),

        invalidateOnRefresh: true,
      })

      triggers.push(trigger)
    }

    // desktop
    if (window.innerWidth >= 768) {
      setupVideo(videoRef1.current, sectionRef1.current)
    }

    // mobile
    else {
      setupVideo(videoRef2.current, sectionRef2.current)
    }

    ScrollTrigger.refresh()
  }

  const waitForGSAP = () => {
    if (
      (window as any).gsap &&
      (window as any).ScrollTrigger
    ) {
      init()
    } else {
      requestAnimationFrame(waitForGSAP)
    }
  }

  waitForGSAP()

  return () => {
    triggers.forEach((t) => t.kill())
  }
}, [])

  return (
    <>
      {/* Desktop Video */}
      <section className="header-index d-none d-md-block" />

      <section
        ref={sectionRef1}
        className="video-section header-index d-none d-md-block"
      >
        <video
          ref={videoRef1}
  className="hero-video"
  muted
  autoPlay
  playsInline
  loop
  preload="auto"
  webkit-playsinline="true"   
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

      <section
        ref={sectionRef2}
        className="video-section header-index d-md-none"
      >
        <video
          ref={videoRef2}
  className="hero-video"
  muted
  autoPlay
  playsInline
  loop
  preload="auto"
  webkit-playsinline="true"   
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