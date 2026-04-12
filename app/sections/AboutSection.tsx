'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from "next/navigation";

// Define Particle interface
interface ParticleType {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  update: (canvasWidth: number, canvasHeight: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

export default function AboutSection() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const counterRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const counterTargets = [30, 50, 30, 100]

  useEffect(() => {
    if (typeof window === 'undefined') return

    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    
    if (!gsap || !ScrollTrigger) return

    // Particle animation
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: ParticleType[] = []

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle implements ParticleType {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 2
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.35
      }
      
      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x > canvasWidth) this.x = 0
        if (this.x < 0) this.x = canvasWidth
        if (this.y > canvasHeight) this.y = 0
        if (this.y < 0) this.y = canvasHeight
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(11, 42, 87, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }
    initParticles()

    let animationId: number
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { 
        p.update(canvas.width, canvas.height)
        p.draw(ctx)
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // GSAP animations for content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo('.about-label', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
      .fromTo('.about-title', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.about-desc', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.5')
      .fromTo('.about-btn', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.4')

    // SVG line animation
    const path = document.querySelector('#main-line') as SVGPathElement
    if (path) {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      
      tl.fromTo('.svg-container', { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .to(path, { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut' })
    }

    tl.from('.node-group', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.5)'
    }, '-=1.5')

    tl.from('.connector-line', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=1')

    // Counter animation with IntersectionObserver
    const observerOptions = {
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          animateCounter(index)
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const statCards = document.querySelectorAll('.stat-card')
    statCards.forEach((card, index) => {
      card.setAttribute('data-index', String(index))
      observer.observe(card)
    })

    function animateCounter(index: number) {
      const target = counterTargets[index]
      const duration = 2000
      const startTime = performance.now()
      const startValue = 0

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut)
        
        const counterEl = counterRefs.current[index]
        if (counterEl) {
          counterEl.textContent = String(currentValue)
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }

      requestAnimationFrame(updateCounter)
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [])

  return (
    <section id="about-section" className="min-vh-100 section-pad position-relative overflow-hidden">
      <div className="container-7xl">
        {/* Header */}
        <div className="header-grid">
          <div className="content-left">
            <p className="about-label">About Starnext</p>
            <h2 className="about-title" style={{ color: 'var(--text)' }}>
              WE DON&apos;T JUST <br />
              <span className="gradient-text">MARKET,</span><br />
              WE MAKE YOU <br />
              <span className="text-navy">SHINE</span>
            </h2>
          </div>

          <div className="content-right" style={{paddingTop:28}}>
            <p className="about-desc">
              We recognize that constant satisfaction of client is essential to business survival. Being a digital marketing and web
              development company, we work towards securing a long-term partnership with each client by developing a productive work
              environment and fostering a performance-based culture.
            </p>

            <button
  className="magnetic-btn magnetic-btn2 tw-bg-slate-900 tw-hover-bg-slate-800 tw-text-white tw-rounded-full tw-font-medium tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 tw-hover-shadow-2xl tw-shadow-slate-900-20 tw-hover--translate-y-1"
  style={{
    padding: "14px 28px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    

  }}
  onClick={() => router.push("/about")}
>
  MORE ABOUT US
  <svg style={{ width: "1rem", height: "1rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
  </svg>
</button>
          </div>
        </div>

        {/* SVG line */}
        <div className="svg-wrap mt-4 svg-container d-none d-md-block">
          <svg className="w-100 h-100" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid meet" fill="none">
            <defs>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path id="main-line"
              d="M 150 310 Q 300 120 450 190 T 750 260 T 1050 160"
              stroke="var(--navy)"
              strokeWidth="2"
              fill="none"
              filter="url(#softGlow)"
              strokeLinecap="round" />

            <path id="dotted-line"
              d="M 150 310 Q 300 120 450 190 T 750 260 T 1050 160"
              stroke="var(--navy)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="0 20"
              opacity="0.18" />

            <g className="node-group" data-index="0">
              <circle cx="150" cy="310" r="8" fill="white" stroke="var(--navy)" strokeWidth="3" className="node-circle" />
              <circle cx="150" cy="310" r="8" fill="var(--navy)" className="pulse-ring" opacity="0.35" />
              <circle cx="150" cy="310" r="4" fill="var(--navy)" className="node-center" />
            </g>

            <g className="node-group" data-index="1">
              <circle cx="450" cy="190" r="8" fill="white" stroke="var(--navy)" strokeWidth="3" className="node-circle" />
              <circle cx="450" cy="190" r="8" fill="var(--navy)" className="pulse-ring" opacity="0.35" />
              <circle cx="450" cy="190" r="4" fill="var(--navy)" className="node-center" />
            </g>

            <g className="node-group" data-index="2">
              <circle cx="750" cy="260" r="8" fill="white" stroke="var(--navy)" strokeWidth="3" className="node-circle" />
              <circle cx="750" cy="260" r="8" fill="var(--navy)" className="pulse-ring" opacity="0.35" />
              <circle cx="750" cy="260" r="4" fill="var(--navy)" className="node-center" />
            </g>

            <g className="node-group" data-index="3">
              <circle cx="1050" cy="160" r="8" fill="white" stroke="var(--navy)" strokeWidth="3" className="node-circle" />
              <circle cx="1050" cy="160" r="8" fill="var(--navy)" className="pulse-ring" opacity="0.35" />
              <circle cx="1050" cy="160" r="4" fill="var(--navy)" className="node-center" />
            </g>

            <line x1="150" y1="310" x2="150" y2="455" stroke="var(--navy)" strokeWidth="1" opacity="0.35" className="connector-line" />
            <line x1="450" y1="190" x2="450" y2="455" stroke="var(--navy)" strokeWidth="1" opacity="0.35" className="connector-line" />
            <line x1="750" y1="260" x2="750" y2="455" stroke="var(--navy)" strokeWidth="1" opacity="0.35" className="connector-line" />
            <line x1="1050" y1="160" x2="1050" y2="455" stroke="var(--navy)" strokeWidth="1" opacity="0.35" className="connector-line" />
          </svg>
        </div>

        {/* Stat cards */}
        <div className="row g-4 stats-row">
          <div className="col-6 col-md-3">
            <div className="stat-card text-center p-4 clean-card">
              <h3 
                ref={el => { counterRefs.current[0] = el }}
                className="stat-number mb-2" 
                style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--navy)' }}
              >
                0
              </h3>
              <p className="mb-0" style={{ fontSize: '.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--navy)', opacity: .8 }}>
                Projects Completed
              </p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="stat-card text-center p-4 clean-card">
              <h3 
                ref={el => { counterRefs.current[1] = el }}
                className="stat-number mb-2" 
                style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--navy)' }}
              >
                0
              </h3>
              <p className="mb-0" style={{ fontSize: '.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--navy)', opacity: .8 }}>
                Clients Covered
              </p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="stat-card text-center p-4 clean-card">
              <h3 
                ref={el => { counterRefs.current[2] = el }}
                className="stat-number mb-2" 
                style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--navy)' }}
              >
                0
              </h3>
              <p className="mb-0" style={{ fontSize: '.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--navy)', opacity: .8 }}>
                Happy Clients
              </p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="stat-card text-center p-4 clean-card">
              <div className="d-flex align-items-end justify-content-center" style={{ gap: '.25rem' }}>
                <h3 
                  ref={el => { counterRefs.current[3] = el }}
                  className="stat-number mb-2" 
                  style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--navy)' }}
                >
                  0
                </h3>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '.6rem' }}>%</span>
              </div>
              <p className="mb-0" style={{ fontSize: '.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--navy)', opacity: .8 }}>
                Success Rate
              </p>
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} id="particle-canvas"></canvas>
    </section>
  )
}