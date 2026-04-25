'use client'

import { useEffect } from 'react'

export default function WhyChooseUs() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger

    if (!gsap || !ScrollTrigger) return

    const easeOutExpo = 'power4.out'
    const easeOutBack = 'back.out(1.7)'

    const headerTimeline = gsap.timeline({ defaults: { ease: easeOutExpo } })
    headerTimeline
      .from('.char-line-1', { y: 100, opacity: 0, duration: 1, delay: 0.2 })
      .from('.char-line-2', { y: 100, opacity: 0, duration: 1 }, '-=0.7')
      .to('.subtitle-reveal', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')

    gsap.from('.star-container', {
      scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' },
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: easeOutBack
    })

    const cards = document.querySelectorAll('[data-card]')
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        y: 60,
        opacity: 0,
        rotationX: 10,
        duration: 0.8,
        delay: index * 0.15,
        ease: easeOutExpo
      })

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' })
      })
    })

    const magneticBtns = document.querySelectorAll('.magnetic-btn')
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = (btn as HTMLElement).getBoundingClientRect()
        const x = mouseEvent.clientX - rect.left - rect.width / 2
        const y = mouseEvent.clientY - rect.top - rect.height / 2

        gsap.to(btn, { x: x / 4, y: y / 4, duration: 0.3, ease: 'power2.out' })
        ;(btn as HTMLElement).style.setProperty('--mouse-x', `${(mouseEvent.clientX - rect.left) / rect.width * 100}%`)
        ;(btn as HTMLElement).style.setProperty('--mouse-y', `${(mouseEvent.clientY - rect.top) / rect.height * 100}%`)
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
      })
    })

    gsap.to('.reveal-bottom', {
      scrollTrigger: { trigger: '.reveal-bottom', start: 'top 90%' },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: easeOutExpo
    })
  }, [])

  return (
    <section className="tw-relative tw-py-20 tw-px-4 tw-sm-px-6 tw-lg-px-8 tw-overflow-hidden bg-white">
      <style>{`
        .why-bento-wrapper { position: relative; }
        .star-container {
          position: absolute;
          top: -20%;
          right: -60px;
          transform: translateY(-50%);
          width: clamp(80px, 10vw, 140px);
          pointer-events: none;
          z-index: 999;
        }
        .bento-grid {
          display: grid;
          gap: 1rem;
          position: relative;
          z-index: 1;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
        }
        .card-4 { grid-column: 1 / -1; }

        @media (max-width: 640px) {
          .bento-grid { grid-template-columns: 1fr; }
          .card-4 { grid-column: 1; }
          .star-container { display: none !important; }
          .why-bento-wrapper { margin-right: 0 !important; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .star-container { display: none !important; }
          .why-bento-wrapper { margin-right: 0 !important; }
        }
        @media (min-width: 1024px) {
          .why-bento-wrapper { margin-right: clamp(60px, 8vw, 120px); }
        }
        @media (max-width: 640px) {
          .card-4 .tw-flex { flex-direction: column !important; }
          .card-4 .connect-btn { align-self: stretch; justify-content: center; }
        }
      `}</style>

      {/* Ambient Background */}
      <div className="tw-absolute tw-inset-0 tw-overflow-hidden tw-pe-none">
        <div className="tw-absolute tw-top-20 tw-left-10 tw-w-72 tw-h-72 tw-bg-blue-100 tw-rounded-full tw-mix-blend-multiply tw-blur-3xl tw-opacity-30 animate-blob"></div>
        <div className="tw-absolute tw-top-40 tw-right-10 tw-w-72 tw-h-72 tw-bg-gray-100 tw-rounded-full tw-mix-blend-multiply tw-blur-3xl tw-opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container tw-max-w-7xl tw-mx-auto tw-relative tw-z-10">
        {/* Header */}
        <div className="tw-mb-16 tw-relative">
          <h2 className="tw-text-4xl tw-md-text-5xl tw-font-bold tw-text-slate-900 tw-mb-4 tw-leading-tight">
            <span className="tw-block tw-overflow-hidden">
              <span className="char-line-1 tw-block">Why Choose</span>
            </span>
            <span className="tw-block tw-overflow-hidden">
              <span className="char-line-2 tw-block tw-text-transparent tw-bg-clip-text tw-gradient-text">Starnext Softech</span>
            </span>
          </h2>
          <p className="tw-text-lg tw-text-slate-600 tw-max-w-2xl subtitle-reveal tw-opacity-0">
            Trusted by 100+ clients, we deliver solutions with precision and excellence.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="why-bento-wrapper">
          <div className="star-container tw-hidden tw-lg-block">
            <img src="/star.png" alt="" className="img-fluid" />
          </div>

          <div className="bento-grid">
            {/* Card 1 */}
            <div className="glass-card card-1 tw-rounded-3xl tw-p-8 tw-relative tw-group tw-cursor-pointer" data-card="1">
              <div className="tw-h-full tw-flex tw-flex-col tw-justify-between">
                <div>
                  <h3 className="tw-text-xl tw-font-bold tw-text-slate-900 tw-mb-3 tw-transition-colors tw-group-hover-text-blue-900">
                    Expert Business Solutions
                  </h3>
                  <p className="tw-text-slate-600 tw-text-sm tw-leading-relaxed">
                    We sit together with you, refine your ideas, and deliver tailored digital solutions that achieve results.
                  </p>
                </div>
                <div className="tw-mt-6 tw-flex tw-items-center tw-gap-2 tw-text-blue-900 tw-opacity-0 tw-translate-y-4 tw-transition-all tw-duration-300 tw-group-hover-opacity-100 tw-group-hover-translate-y-0">
                  <span className="tw-text-sm tw-font-semibold">Learn more</span>
                  <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card card-2 tw-rounded-3xl tw-p-8 tw-relative tw-group tw-cursor-pointer" data-card="2">
              <div className="tw-h-full tw-flex tw-flex-col tw-justify-between">
                <div>
                  <h3 className="tw-text-xl tw-font-bold tw-text-slate-900 tw-mb-3 tw-transition-colors tw-group-hover-text-blue-900">
                    Results That Matter
                  </h3>
                  <p className="tw-text-slate-600 tw-text-sm tw-leading-relaxed">
                    Focused on outcomes that amplify your business, not just activities
                  </p>
                </div>
                <div className="tw-mt-6 tw-flex tw-items-center tw-gap-2 tw-text-blue-900 tw-opacity-0 tw-translate-y-4 tw-transition-all tw-duration-300 tw-group-hover-opacity-100 tw-group-hover-translate-y-0">
                  <span className="tw-text-sm tw-font-semibold">Learn more</span>
                  <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card card-3 tw-rounded-3xl tw-p-8 tw-relative tw-group tw-cursor-pointer" data-card="3">
              <div className="icon-wrapper tw-mb-4">
                <svg className="tw-w-6 tw-h-6 tw-text-slate-700 tw-transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="tw-text-lg tw-font-bold tw-text-slate-900 tw-mb-2 tw-transition-colors tw-group-hover-text-blue-900">
                Dedicated Teamwork
              </h3>
              <p className="tw-text-slate-600 tw-text-sm tw-leading-relaxed">
                We work as one team, ensuring results that stand out and speak for themselves.
              </p>
            </div>

            {/* Card 4 */}
            <div className="dark-card card-4 tw-rounded-3xl tw-p-8 tw-text-white tw-relative tw-group tw-cursor-pointer tw-overflow-hidden" data-card="4">
              <div className="tw-absolute tw-top-0 tw-end-0 tw-w-32 tw-h-32 tw-bg-white-5 tw-rounded-full tw--mr-16 tw--mt-16 tw-blur-2xl"></div>

              <div className="tw-flex tw-flex-col tw-md-flex-row tw-md-items-center tw-md-justify-between tw-h-full tw-gap-6">
                <div className="tw-flex-1">
                  <div className="tw-flex tw-items-center tw-gap-3 tw-mb-3">
                    <svg className="tw-w-6 tw-h-6 tw-text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <h3 className="tw-text-xl tw-font-bold">Always Connected</h3>
                  </div>
                  <p className="tw-text-blue-100 tw-text-sm tw-leading-relaxed tw-max-w-md">
                    We keep you in touch throughout the process—call anytime to check your project status.
                  </p>
                </div>

                {/* ← button → a href, same magnetic classes preserved */}
                
                   <a href="/contact"
                  className="magnetic-btn magnetic-btn2 connect-btn tw-bg-white-10 tw-hover-bg-white-20 tw-backdrop-blur-sm tw-border tw-border-white-20 tw-text-white tw-px-6 tw-py-3 tw-rounded-full tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-medium tw-self-start tw-md-self-center"
                >
                  <span className="tw-relative" style={{ zIndex: 10 }}>Let&apos;s Connect</span>
                  <svg className="tw-w-4 tw-h-4 tw-relative" style={{ zIndex: 10 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="tw-absolute tw-inset-0 tw-rounded-3xl tw-opacity-0 tw-pe-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}