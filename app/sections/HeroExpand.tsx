'use client'

import { useEffect, useRef } from 'react'

export default function HeroExpand() {
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    
    if (!gsap || !ScrollTrigger) return

    const heroSections = document.querySelectorAll('.hero')

    heroSections.forEach((hero) => {
      const imageWrapper = hero.querySelector('.imageWrapper')
      const overlayContent = hero.querySelector('.overlayContent')
      const cornerAccent = hero.querySelector('.cornerAccent')
      const scrollHint = hero.querySelector('.scrollHint')
      const heroVideo = hero.querySelector('.heroVideo') as HTMLVideoElement

      if (!imageWrapper || !heroVideo) return

      if (cornerAccent) {
        gsap.set(cornerAccent, { yPercent: -100, opacity: 0 })
      }

      function safePlay() {
        const p = heroVideo.play()
        if (p && typeof p.then === 'function') {
          p.catch(() => {})
        }
      }

      function safePause() {
        heroVideo.pause()
      }

      const expandTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onEnter: safePlay,
          onLeave: safePause,
          onEnterBack: safePlay,
          onLeaveBack: safePause
        }
      })

      expandTl.to(imageWrapper, {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        boxShadow: 'none',
        duration: 0.6,
        ease: 'power2.inOut'
      })

      if (overlayContent) {
        expandTl.to(overlayContent, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out'
        }, 0.4)

        expandTl.to(overlayContent, {
          y: -100,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in'
        }, 0.8)
      }

      if (cornerAccent) {
        expandTl.to(cornerAccent, {
          opacity: 1,
          yPercent: 0,
          duration: 0.2,
          ease: 'back.out(1.7)'
        }, 0.5)
      }

      if (scrollHint) {
        gsap.to(scrollHint, {
          opacity: 0,
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=10%',
            scrub: true
          }
        })
      }

      heroVideo.addEventListener('loadedmetadata', () => {
        ScrollTrigger.refresh()
      })
    })
  }, [])

  return (
    <>
      {/* Desktop */}
      <div className="d-none d-md-block">
        <section className="hero-section header-index hero">
          <div className="image-wrapper header-index imageWrapper">
            <video
              ref={videoRef1}
              className="expanding-video header-index heroVideo"
              src="/video/typography starnext (3).mp4"
              muted
              playsInline
              loop
              autoPlay
            ></video>
            <div className="corner-accent cornerAccent"></div>
          </div>
          <div className="overlay-content overlayContent">
            <h2>Your Title</h2>
            <p>Your description here</p>
          </div>
          <div className="scroll-hint scrollHint">Scroll to explore</div>
        </section>
      </div>

      {/* Mobile */}
      <section className="hero-section header-index hero d-md-none">
        <div className="image-wrapper header-index imageWrapper">
          <video
            ref={videoRef2}
            className="expanding-video header-index heroVideo"
            src="/video/typo.mp4"
            muted
            playsInline
            loop
            autoPlay
          ></video>
          <div className="corner-accent cornerAccent"></div>
        </div>
        <div className="overlay-content overlayContent">
          <h2>Your Title</h2>
          <p>Your description here</p>
        </div>
        <div className="scroll-hint scrollHint">Scroll to explore</div>
      </section>
    </>
  )
}