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

        video.load()

        const playVideo = async () => {
          try {
            if (document.visibilityState !== 'visible') return

            if (video.readyState < 2) {
              await new Promise((resolve) => {
                video.addEventListener('loadeddata', () => resolve(true), { once: true })
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

        // Use vh-aware dynamic thresholds so 13" laptops (900px tall)
        // behave the same as larger screens
        const vh = window.innerHeight
        // Start playing as soon as even 1px of section enters viewport
        // Stop only when section is fully out — never pause mid-scroll
        const startOffset = Math.min(99, Math.round((vh * 0.99 / vh) * 100))
        const endOffset   = Math.max(1,  Math.round((vh * 0.01 / vh) * 100))

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: `top ${startOffset}%`,   // fires almost immediately on enter
          end:   `bottom ${endOffset}%`,  // fires only when almost fully gone

          onEnter:      () => playVideo(),
          onEnterBack:  () => playVideo(),
          onLeave:      () => pauseVideo(),
          onLeaveBack:  () => pauseVideo(),

          invalidateOnRefresh: true,
        })

        triggers.push(trigger)

        // --- Fallback: IntersectionObserver as safety net for edge cases ---
        // Covers race conditions where ScrollTrigger fires but readyState blocks play
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                playVideo()
              } else if (!entry.isIntersecting) {
                pauseVideo()
              }
            })
          },
          {
            // On small laptop screens use a very forgiving threshold
            threshold: [0, 0.1, 0.5, 1.0],
            rootMargin: '0px 0px 0px 0px',
          }
        )

        observer.observe(section)

        // Store cleanup
        triggers.push({ kill: () => observer.disconnect() })
      }

      if (window.innerWidth >= 768) {
        setupVideo(videoRef1.current, sectionRef1.current)
      } else {
        setupVideo(videoRef2.current, sectionRef2.current)
      }

      ScrollTrigger.refresh()
    }

    // Handle tab visibility — resume video if user tabs back in
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const activeVideo =
          window.innerWidth >= 768 ? videoRef1.current : videoRef2.current

        if (activeVideo && activeVideo.paused) {
          activeVideo.play().catch(() => {})
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const waitForGSAP = () => {
      if ((window as any).gsap && (window as any).ScrollTrigger) {
        init()
      } else {
        requestAnimationFrame(waitForGSAP)
      }
    }

    waitForGSAP()

    return () => {
      triggers.forEach((t) => t.kill())
      document.removeEventListener('visibilitychange', handleVisibilityChange)
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
          // @ts-ignore
          webkit-playsinline="true"
          style={{ width: '100%',  objectFit: 'cover' }}
        >
          <source src="/video/video1.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Mobile Video */}
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
          // @ts-ignore
          webkit-playsinline="true"
          style={{ width: '100%', objectFit: 'cover' }}
        >
          <source src="/video/video1-2.mp4" type="video/mp4" />
        </video>
      </section>
    </>
  )
}