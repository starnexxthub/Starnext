'use client'

import { useEffect, useRef } from 'react'

const testimonialImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
]

const videoSources = [
  '/video/kj reel.mp4',
  '/video/Thin thread reel.mp4',
  
  '/video/optilux video.mp4',
  '/video/oriana priyanka reel.mp4',
  
  
]

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    
    if (!gsap || !ScrollTrigger) return

    // Main timeline
    const tTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#testimonials',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tTl
      .to('.testimonial-subtitle', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
      .to('.nav-controls', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.progress-container', { opacity: 1, duration: 0.6 }, '-=0.4')
      .to(['.mask-left', '.mask-right'], { opacity: 1, duration: 0.8 }, '-=0.4')

    // Cards entrance
    gsap.to('.card-item', {
      scrollTrigger: { trigger: '#scrollContainer', start: 'top 85%' },
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    })

    // Parallax blobs
    gsap.to('.parallax-bg', {
      y: -100,
      ease: 'none',
      scrollTrigger: { trigger: '#testimonials', start: 'top bottom', end: 'bottom top', scrub: 1 }
    })

    // Magnetic buttons
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = (btn as HTMLElement).getBoundingClientRect()
        const x = mouseEvent.clientX - rect.left - rect.width / 2
        const y = mouseEvent.clientY - rect.top - rect.height / 2

        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      })
    })

    // Card hover
    document.querySelectorAll('.testimonial-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.card-content'), { y: -5, duration: 0.4, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.card-content'), { y: 0, duration: 0.4, ease: 'power2.out' })
      })
    })

    // Horizontal scroll
    const scrollContainer = scrollContainerRef.current
    const prevBtn = document.getElementById('prevBtn')
    const nextBtn = document.getElementById('nextBtn')
    const scrollProgress = document.getElementById('scrollProgress')

    const getCardWidth = () => {
      const card = document.querySelector('.card-item')
      return card ? card.clientWidth + 24 : 384
    }

    if (nextBtn && scrollContainer) {
      nextBtn.addEventListener('click', () => {
        gsap.to(nextBtn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 })
        gsap.to(scrollContainer, { scrollLeft: scrollContainer.scrollLeft + getCardWidth(), duration: 0.8, ease: 'power3.inOut' })
      })
    }

    if (prevBtn && scrollContainer) {
      prevBtn.addEventListener('click', () => {
        gsap.to(prevBtn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 })
        gsap.to(scrollContainer, { scrollLeft: scrollContainer.scrollLeft - getCardWidth(), duration: 0.8, ease: 'power3.inOut' })
      })
    }

    if (scrollContainer && scrollProgress) {
      scrollContainer.addEventListener('scroll', () => {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const progress = maxScroll > 0 ? (scrollContainer.scrollLeft / maxScroll) * 100 : 0
        scrollProgress.style.width = `${progress}%`
      })
    }

    // Drag to scroll
    let isDown = false
    let startX = 0
    let startScrollLeft = 0

    if (scrollContainer) {
      scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true
        scrollContainer.style.cursor = 'grabbing'
        startX = e.pageX - scrollContainer.offsetLeft
        startScrollLeft = scrollContainer.scrollLeft
      })

      scrollContainer.addEventListener('mouseleave', () => {
        isDown = false
        scrollContainer.style.cursor = 'grab'
      })

      scrollContainer.addEventListener('mouseup', () => {
        isDown = false
        scrollContainer.style.cursor = 'grab'
        const cardWidth = getCardWidth()
        const nearestCard = Math.round(scrollContainer.scrollLeft / cardWidth)
        gsap.to(scrollContainer, { scrollLeft: nearestCard * cardWidth, duration: 0.5, ease: 'power2.out' })
      })

      scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - scrollContainer.offsetLeft
        const walk = (x - startX) * 2
        scrollContainer.scrollLeft = startScrollLeft - walk
      })
    }

    // Video autoplay on scroll
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    }, { threshold: 0.3 })

    document.querySelectorAll('.t-card video').forEach(video => videoObserver.observe(video))

    return () => {
      videoObserver.disconnect()
    }
  }, [])

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

              <div className="d-flex gap-3 nav-controls mb-4">
                <button id="prevBtn" className="magnetic-btn" type="button" aria-label="Previous">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>

                <button id="nextBtn" className="magnetic-btn" type="button" aria-label="Next">
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
            <div className="t-mask-left mask-left d-none d-lg-block"></div>
            <div className="t-mask-right mask-right d-none d-lg-block"></div>

            <div ref={scrollContainerRef} id="scrollContainer" className="t-scroll ps-2 ms-n2">
              {videoSources.map((video, index) => (
  <div 
    className="t-card testimonial-card card-item" 
    key={index}
  >
    <video
      src={video}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-100 h-100 object-cover"
    />
  </div>
))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}