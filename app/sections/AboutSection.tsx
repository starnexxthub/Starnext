'use client'

import { useEffect, useRef } from 'react'

interface ParticleType {
  x: number; y: number; size: number
  speedX: number; speedY: number; opacity: number
  update: (w: number, h: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const counterRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const counterTargets = [400, 600, 350, 90]

  useEffect(() => {
    if (typeof window === 'undefined') return

    let rafId: number
    const waitForGSAP = () => {
      const gsap = (window as any).gsap
      const ScrollTrigger = (window as any).ScrollTrigger
      if (!gsap || !ScrollTrigger) { rafId = requestAnimationFrame(waitForGSAP); return }
      init(gsap, ScrollTrigger)
    }
    rafId = requestAnimationFrame(waitForGSAP)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: ParticleType[] = []
    let animId: number

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle implements ParticleType {
      x: number; y: number; size: number
      speedX: number; speedY: number; opacity: number
      constructor(w: number, h: number) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.size   = Math.random() * 2
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.35
      }
      update(w: number, h: number) {
        this.x += this.speedX; this.y += this.speedY
        if (this.x > w) this.x = 0; if (this.x < 0) this.x = w
        if (this.y > h) this.y = 0; if (this.y < 0) this.y = h
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(11,42,87,${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle(canvas.width, canvas.height))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(canvas.width, canvas.height); p.draw(ctx) })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  function init(gsap: any, ScrollTrigger: any) {
    const section = sectionRef.current
    if (!section) return

    const q = (sel: string) => section.querySelectorAll(sel)

    // ── Scroll-synced word reveal on the heading ──────────────────────────
    const titleEl = titleRef.current
    if (titleEl) {
      // Walk child nodes and split text into word spans, preserving <br> and <span> children
      const splitNodeIntoWords = (node: Node): Node[] => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || ''
          // Split by words, keep spaces as separate text nodes so layout is unchanged
          const parts = text.split(/(\s+)/)
          return parts.map(part => {
            if (!part) return null
            if (/^\s+$/.test(part)) return document.createTextNode(part)
            const span = document.createElement('span')
            span.className = 'scroll-word'
            span.style.cssText = 'display:inline; position:relative;'
            // Ghost (dim base layer)
            const ghost = document.createElement('span')
            ghost.setAttribute('aria-hidden', 'true')
            ghost.style.cssText = 'position:absolute;inset:0;opacity:0.15;pointer-events:none;'
            ghost.textContent = part
            // Animated layer
            const animated = document.createElement('span')
            animated.className = 'scroll-word-inner'
            animated.style.cssText = 'position:relative; opacity:0;'
            animated.textContent = part
            span.appendChild(ghost)
            span.appendChild(animated)
            return span
          }).filter(Boolean) as Node[]
        }
        // Preserve element nodes (br, span.gradient-text, span.text-navy) — recurse inside them
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement
          const tag = el.tagName.toLowerCase()
          if (tag === 'br') return [node.cloneNode(true)]
          // Clone the element, clear it, re-fill with split children
          const clone = el.cloneNode(false) as HTMLElement
          Array.from(el.childNodes).forEach(child => {
            splitNodeIntoWords(child).forEach(n => clone.appendChild(n))
          })
          return [clone]
        }
        return [node.cloneNode(true)]
      }

      // Rebuild the heading with word spans
      const originalNodes = Array.from(titleEl.childNodes)
      titleEl.innerHTML = ''
      originalNodes.forEach(node => {
        splitNodeIntoWords(node).forEach(n => titleEl.appendChild(n))
      })

      const wordInners = Array.from(titleEl.querySelectorAll('.scroll-word-inner')) as HTMLElement[]
      const total = wordInners.length

      // Set all to opacity 0 initially (ghost layer still shows at 0.15)
      gsap.set(wordInners, { opacity: 0 })

      // Scrubbed ScrollTrigger — each word reveals as you scroll through the section
      // Scrubbed ScrollTrigger — each word reveals as you scroll through the section
const isMobile = window.innerWidth < 768

if (isMobile) {
  mobileWordReveal(gsap, ScrollTrigger, titleEl, wordInners, total)
} else {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 75%',
    end: 'center 40%',
    scrub: 0.8,
    onUpdate: (self: any) => {
      const progress = self.progress
      wordInners.forEach((word, i) => {
        const wordStart = i / total
        const wordEnd = wordStart + (1 / total)
        const localP = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)))
        word.style.opacity = String(localP)
      })
    },
    onLeave: () => {
      wordInners.forEach(w => { w.style.opacity = '1' })
    }
  })
}
    }
    // ── End word reveal ───────────────────────────────────────────────────

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
        toggleActions: 'play none none none'
      }
    })

    tl.fromTo(q('.about-label'),
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
      // about-title intentionally excluded — handled by scroll reveal above
      .fromTo(q('.about-desc'),
        { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.25')
      .fromTo(q('.about-btn'),
        { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.35')

    const path = section.querySelector('#main-line') as SVGPathElement | null
    if (path) {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      tl.fromTo(section.querySelector('.svg-container'),
          { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .to(path, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' })
        .from(q('.node-group'), {
          scale: 0, opacity: 0, duration: 0.7, stagger: 0.15,
          ease: 'elastic.out(1,0.5)', transformOrigin: 'center'
        }, '-=1.4')
        .from(q('.connector-line'), {
          scaleY: 0, transformOrigin: 'top',
          duration: 0.5, stagger: 0.1, ease: 'power2.out'
        }, '-=0.9')
    }

    const statCards = section.querySelectorAll('.stat-card')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number((entry.target as HTMLElement).dataset.index)
        runCounter(index)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.5, root: null })

    statCards.forEach((card, i) => {
      ;(card as HTMLElement).dataset.index = String(i)
      observer.observe(card)
    })

    function runCounter(index: number) {
      const target = counterTargets[index]
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / 2000, 1)
        const ease = 1 - Math.pow(1 - t, 3)
        const el = counterRefs.current[index]
        if (el) el.textContent = String(Math.floor(target * ease))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  }   // ← closes init()

  function mobileWordReveal(
  gsap: any,
  ScrollTrigger: any,
  titleEl: HTMLElement,
  wordInners: HTMLElement[],
  total: number
) {
  ScrollTrigger.create({
    trigger: titleEl,        // track the heading directly
    start: 'top 90%',        // fires as soon as heading enters viewport bottom
    end: 'bottom 15%',       // completes when heading bottom nears top
    scrub: 0.6,              // slightly faster scrub feels snappier on mobile
    onUpdate: (self: any) => {
      const progress = self.progress
      wordInners.forEach((word, i) => {
        const wordStart = i / total
        const wordEnd = wordStart + (1 / total)
        const localP = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)))
        word.style.opacity = String(localP)
      })
    },
    onLeave: () => {
      wordInners.forEach(w => { w.style.opacity = '1' })
    },
    onLeaveBack: () => {
      // reset if user scrolls back above the heading
      wordInners.forEach(w => { w.style.opacity = '0' })
    }
  })
}  // ← closes mobileWordReveal()

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="min-vh-100 section-pad position-relative overflow-hidden"
      style={{ zIndex: 10, background: '#fff', isolation: 'isolate' }}
    >
      <div className="container-7xl">
        <div className="header-grid">
          <div className="content-left">
            <p className="about-label">About Starnext</p>
            <h2
              ref={titleRef}
              className="about-title"
              style={{ color: 'var(--text)' }}
            >
              WE DON&apos;T JUST <br />
              <span className="gradient-text">MARKET,</span><br />
              WE MAKE YOU <br />
              <span className="text-navy">SHINE</span>
            </h2>
          </div>

          <div className="content-right" style={{ paddingTop: 28 }}>
            <p className="about-desc">
              We recognize that constant satisfaction of client is essential to business survival.
              Being a digital marketing and web development company, we work towards securing a
              long-term partnership with each client by developing a productive work environment
              and fostering a performance-based culture.
            </p>
            <div className="magnetic-wrap" style={{ marginBottom: 20 }}>
              <a href="/about" className="btn faq-btn about-btn">
                <span style={{ marginRight: '8px' }}>MORE ABOUT US</span>
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* SVG */}
        <div className="svg-wrap mt-4 svg-container d-none d-md-block">
          <svg className="w-100 h-100" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid meet" fill="none">
            <defs>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path id="main-line"
              d="M 150 310 Q 300 120 450 190 T 750 260 T 1050 160"
              stroke="var(--navy)" strokeWidth="2" fill="none"
              filter="url(#softGlow)" strokeLinecap="round" />
            <path d="M 150 310 Q 300 120 450 190 T 750 260 T 1050 160"
              stroke="var(--navy)" strokeWidth="3" fill="none"
              strokeDasharray="0 20" opacity="0.18" />
            {[
              { cx: 150, cy: 310 }, { cx: 450, cy: 190 },
              { cx: 750, cy: 260 }, { cx: 1050, cy: 160 }
            ].map(({ cx, cy }, i) => (
              <g key={i} className="node-group">
                <circle cx={cx} cy={cy} r="8" fill="white" stroke="var(--navy)" strokeWidth="3" />
                <circle cx={cx} cy={cy} r="8" fill="var(--navy)" opacity="0.35" />
                <circle cx={cx} cy={cy} r="4" fill="var(--navy)" />
              </g>
            ))}
            {[150, 450, 750, 1050].map((x, i) => (
              <line key={i} x1={x} y1={i === 0 ? 310 : i === 1 ? 190 : i === 2 ? 260 : 160}
                x2={x} y2="455" stroke="var(--navy)" strokeWidth="1"
                opacity="0.35" className="connector-line" />
            ))}
          </svg>
        </div>

        {/* Stats */}
        <div className="row g-4 stats-row">
          {[
            { label: 'Projects Completed', prefix: '', suffix: '+' },
            { label: 'Clients Covered',    prefix: '', suffix: '+' },
            { label: 'Happy Clients',      prefix: '', suffix: '+' },
            { label: 'Success Rate',       prefix: '', suffix: '%' },
          ].map(({ label, prefix, suffix }, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="stat-card text-center p-4 clean-card">
                <div className="d-flex align-items-end justify-content-center" style={{ gap: '.15rem' }}>
                  <h3
                    ref={el => { counterRefs.current[i] = el }}
                    className="stat-number mb-2"
                    style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--navy)' }}
                  >0</h3>
                  {suffix && (
                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '.6rem' }}>
                      {suffix}
                    </span>
                  )}
                </div>
                <p className="mb-0" style={{ fontSize: '.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--navy)', opacity: .8 }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        id="particle-canvas"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </section>
  )
}