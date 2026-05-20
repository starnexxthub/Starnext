'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const videoSources = [
  '/video/kj reel2.mp4',
  '/video/tt.mp4',
  '/video/optilux video.mp4',
  '/video/oriana priyanka reel.mp4',
]

const videoPoster = [
  '/img/kjreel.jpg',
  '/img/ttr.jpg',
  '/img/asr.jpg',
  '/img/oriana priyanka reel.jpg',
]

// Detect low-end / Android devices to apply aggressive optimisations
function getDeviceProfile() {
  if (typeof window === 'undefined') return { isLowEnd: false, isAndroid: false, isMobile: false }
  const ua = navigator.userAgent
  const isAndroid  = /Android/i.test(ua)
  const isMobile   = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  // Treat Android OR ≤4 logical CPUs OR ≤2 GB RAM as "low-end"
  const isLowEnd   = isAndroid
    || (navigator as any).hardwareConcurrency <= 4
    || (navigator as any).deviceMemory <= 2
  return { isLowEnd, isAndroid, isMobile }
}

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const videoRefs          = useRef<(HTMLVideoElement | null)[]>([])
  const observerRef        = useRef<IntersectionObserver | null>(null)
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
  const [activeIndex, setActiveIndex]     = useState(0)
  const deviceProfile = useRef(getDeviceProfile())

  /* ─── Lazy-load + play/pause via IntersectionObserver ─────────────────── */
  const setupVideoObserver = useCallback(() => {
    observerRef.current?.disconnect()

    const { isLowEnd } = deviceProfile.current
    // Higher threshold on low-end: start loading earlier so it's ready in time
    const threshold   = isLowEnd ? 0.1 : 0.3
    const rootMargin  = isLowEnd ? '100px 0px' : '50px 0px'

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const video = target as HTMLVideoElement
          const idx   = Number(video.dataset.index)

          if (isIntersecting) {
            // Lazy-load: set src only now if not already set
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src
              video.load()
            }

            const tryPlay = () => {
              const promise = video.play()
              if (promise !== undefined) {
                promise
                  .then(() => setPlayingVideos(p => new Set(p).add(idx)))
                  .catch(() => {
                    // Autoplay blocked — show poster/thumbnail
                    setPlayingVideos(p => { const n = new Set(p); n.delete(idx); return n })
                  })
              }
            }

            if (video.readyState >= 3) {
              tryPlay()
            } else {
              // On Android readyState may stay 0 for a while — listen for canplay
              const onCanPlay = () => { tryPlay(); video.removeEventListener('canplay', onCanPlay) }
              video.addEventListener('canplay', onCanPlay)
            }
          } else {
            video.pause()
            setPlayingVideos(p => { const n = new Set(p); n.delete(idx); return n })
          }
        })
      },
      { threshold, rootMargin }
    )

    videoRefs.current.forEach(v => v && observerRef.current!.observe(v))
  }, [])

  /* ─── GSAP animations ──────────────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const gsap          = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    if (!gsap || !ScrollTrigger) return

    gsap.timeline({
      scrollTrigger: {
        trigger: '#testimonials',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
      .to('.testimonial-subtitle',          { y: 0, opacity: 1, duration: 1,   ease: 'power3.out' }, '-=0.8')
      .to('.nav-controls',                  { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.progress-container',            { opacity: 1, duration: 0.6 },                           '-=0.4')
      .to(['.mask-left', '.mask-right'],    { opacity: 1, duration: 0.8 },                           '-=0.4')

    gsap.to('.card-item', {
      scrollTrigger: { trigger: '#scrollContainer', start: 'top 85%' },
      x: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
    })

    gsap.to('.parallax-bg', {
      y: -100, ease: 'none',
      scrollTrigger: { trigger: '#testimonials', start: 'top bottom', end: 'bottom top', scrub: 1 },
    })

    // Magnetic buttons
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      const el = btn as HTMLElement
      const onMove  = (e: Event) => {
        const { clientX, clientY } = e as MouseEvent
        const rect = el.getBoundingClientRect()
        gsap.to(el, { x: (clientX - rect.left - rect.width / 2) * 0.3, y: (clientY - rect.top - rect.height / 2) * 0.3, duration: 0.3, ease: 'power2.out' })
      }
      const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
    })

    // Card hover lift
    document.querySelectorAll('.testimonial-card').forEach((card) => {
      const content = card.querySelector('.card-content')
      if (!content) return
      card.addEventListener('mouseenter', () => gsap.to(content, { y: -5, duration: 0.4, ease: 'power2.out' }))
      card.addEventListener('mouseleave', () => gsap.to(content, { y:  0, duration: 0.4, ease: 'power2.out' }))
    })

    // Scroll nav
    const scrollContainer = scrollContainerRef.current
    const prevBtns        = document.querySelectorAll('[data-nav="prev"]')
    const nextBtns        = document.querySelectorAll('[data-nav="next"]')
    const scrollProgress  = document.getElementById('scrollProgress')

    const getCardWidth = () => {
      const card = scrollContainer?.querySelector('.card-item')
      return card ? card.clientWidth + 24 : 384
    }

    const scrollBy = (dir: 1 | -1, btn: HTMLElement) => {
      if (!scrollContainer) return
      gsap.to(btn,             { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 })
      gsap.to(scrollContainer, { scrollLeft: scrollContainer.scrollLeft + dir * getCardWidth(), duration: 0.8, ease: 'power3.inOut' })
    }

    prevBtns.forEach(btn => btn.addEventListener('click', () => scrollBy(-1, btn as HTMLElement)))
    nextBtns.forEach(btn => btn.addEventListener('click', () => scrollBy( 1, btn as HTMLElement)))

    const onScroll = () => {
      if (!scrollContainer || !scrollProgress) return
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
      scrollProgress.style.width = maxScroll > 0 ? `${(scrollContainer.scrollLeft / maxScroll) * 100}%` : '0%'
      // Track active card index
      const idx = Math.round(scrollContainer.scrollLeft / getCardWidth())
      setActiveIndex(idx)
    }
    scrollContainer?.addEventListener('scroll', onScroll, { passive: true })

    // Drag-to-scroll
    let isDown = false, startX = 0, startScrollLeft = 0
    if (scrollContainer) {
      const onMouseDown  = (e: MouseEvent) => { isDown = true; scrollContainer.style.cursor = 'grabbing'; startX = e.pageX - scrollContainer.offsetLeft; startScrollLeft = scrollContainer.scrollLeft }
      const onMouseUp    = () => { isDown = false; scrollContainer.style.cursor = 'grab'; const nearest = Math.round(scrollContainer.scrollLeft / getCardWidth()); gsap.to(scrollContainer, { scrollLeft: nearest * getCardWidth(), duration: 0.5, ease: 'power2.out' }) }
      const onMouseLeave = () => { isDown = false; scrollContainer.style.cursor = 'grab' }
      const onMouseMove  = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); scrollContainer.scrollLeft = startScrollLeft - (e.pageX - scrollContainer.offsetLeft - startX) * 2 }
      scrollContainer.addEventListener('mousedown',  onMouseDown)
      scrollContainer.addEventListener('mouseup',    onMouseUp)
      scrollContainer.addEventListener('mouseleave', onMouseLeave)
      scrollContainer.addEventListener('mousemove',  onMouseMove)
    }

    return () => { scrollContainer?.removeEventListener('scroll', onScroll) }
  }, [])

  /* ─── Set up video observer on mount ──────────────────────────────────── */
  useEffect(() => {
    setupVideoObserver()
    return () => { observerRef.current?.disconnect() }
  }, [setupVideoObserver])

  /* ─── Preload adjacent video on scroll ────────────────────────────────── */
  useEffect(() => {
    const next = videoRefs.current[activeIndex + 1]
    if (next && !next.src && next.dataset.src) {
      next.src    = next.dataset.src
      next.preload = 'metadata'
      next.load()
    }
  }, [activeIndex])

  return (
    <section id="testimonials" className="testimonials-section py-5 py-lg-6">
      <div className="t-bg-blob one parallax-bg"></div>
      <div className="t-bg-blob two parallax-bg"></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row g-5 align-items-start">

          {/* LEFT */}
          <div className="col-lg-4">
            <div className="position-lg-sticky" style={{ top: '120px' }}>
              <h2 className="t-title testimonial-title mb-3">PARTNER WITH STARNEXT</h2>
              <p className="t-subtitle testimonial-subtitle mb-4">
                We&apos;ve helped teams rethink their offers, their structure, and their story.
              </p>

              <div className="d-none d-lg-flex gap-3 nav-controls mb-4">
                <button data-nav="prev" id="prevBtn" className="magnetic-btn" type="button" aria-label="Previous">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>
                <button data-nav="next" id="nextBtn" className="magnetic-btn" type="button" aria-label="Next">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>

              <div className="progress-bar-wrap progress-container">
                <div id="scrollProgress"></div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-8 position-relative">

            {/* Mobile nav arrows */}
            <div
              className="d-flex d-lg-none align-items-center justify-content-between"
              style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                transform: 'translateY(-50%)', zIndex: 10,
                pointerEvents: 'none', padding: '0 6px',
              }}
            >
              {(['prev', 'next'] as const).map((dir) => (
                <button
                  key={dir}
                  data-nav={dir}
                  type="button"
                  aria-label={dir === 'prev' ? 'Previous' : 'Next'}
                  style={{
                    pointerEvents: 'all', width: 36, height: 36,
                    borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)',
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#fff', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.2)', flexShrink: 0,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="16" height="16">
                    {dir === 'prev'
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      : <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    }
                  </svg>
                </button>
              ))}
            </div>

            <div ref={scrollContainerRef} id="scrollContainer" className="t-scroll ps-2 ms-n2">
              {videoSources.map((src, index) => (
                <div key={index} className="t-card testimonial-card card-item">
                  <video
                    ref={el => { videoRefs.current[index] = el }}
                    data-src={src}
                    data-index={index}
                    poster={videoPoster[index]}
                    muted
                    loop
                    playsInline
                    {...{ 'webkit-playsinline': 'true' } as any}
                    disablePictureInPicture
                    disableRemotePlayback
                    preload="none"
                    className="w-100 h-100 object-cover"
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      WebkitTransform: 'translateZ(0)',
                      position: 'relative',
                      zIndex: 0,
                    }}
                    onClick={() => {
                      const v = videoRefs.current[index]
                      if (!v) return
                      v.paused ? v.play().catch(() => {}) : v.pause()
                    }}
                  />

                  {/* Tap-to-play icon for when autoplay is blocked */}
                  {!playingVideos.has(index) && (
                    <div
                      style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.25)',
                        borderRadius: 'inherit', cursor: 'pointer',
                        zIndex: 2,
                      }}
                      onClick={() => videoRefs.current[index]?.play().catch(() => {})}
                    >
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.18)" />
                        <path d="M19 16l16 8-16 8V16z" fill="white" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dot indicators on mobile */}
            <div className="d-flex d-lg-none justify-content-center gap-2 mt-3">
              {videoSources.map((_, i) => (
                <div key={i} style={{
                  width: i === activeIndex ? 20 : 6, height: 6,
                  borderRadius: 3,
                  background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}