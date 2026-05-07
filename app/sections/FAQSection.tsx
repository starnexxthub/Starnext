'use client'

import { useEffect } from 'react'

export default function FAQSection() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    
    if (!gsap || !ScrollTrigger) return

    // Title animation
    const titleSpans = document.querySelectorAll('.reveal-text span')
    gsap.to(titleSpans, {
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.faq-title', start: 'top 80%', toggleActions: 'play none none reverse' }
    })

    gsap.from('.faq-title .dot', {
      scale: 0,
      rotation: 180,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.faq-title', start: 'top 80%', toggleActions: 'play none none reverse' }
    })

    gsap.to('.faq-title .dot', { scale: 1.2, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })

    gsap.from('#faqSub', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#faqSub', start: 'top 85%', toggleActions: 'play none none reverse' }
    })

    // Tick items
    const tickItems = document.querySelectorAll('.faq-point-item')
    tickItems.forEach((item, index) => {
      const tick = item.querySelector('.tick')
      const text = item.querySelector('.point-text')

      gsap.to(tick, {
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
        delay: index * 0.15
      })

      gsap.from(text, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
        delay: index * 0.15 + 0.2
      })
    })

    // Magnetic button
    const magneticWrap = document.querySelector('.magnetic-wrap')
    if (magneticWrap) {
      magneticWrap.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = (magneticWrap as HTMLElement).getBoundingClientRect()
        const x = mouseEvent.clientX - rect.left - rect.width / 2
        const y = mouseEvent.clientY - rect.top - rect.height / 2

        gsap.to(magneticWrap, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
      })

      magneticWrap.addEventListener('mouseleave', () => {
        gsap.to(magneticWrap, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      })
    }

    // Accordion items
    const accordionItems = document.querySelectorAll('.faq-item')
    accordionItems.forEach((item, index) => {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-accordion',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      })
    })

    // Particles
    const particles = document.querySelectorAll('.particle')
    particles.forEach((p, i) => {
      gsap.to(p, { y: 'random(-100, 100)', x: 'random(-50, 50)', duration: 'random(3, 6)', repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5 })
      gsap.to(p, { opacity: 0.6, scale: 'random(0.5, 1.5)', duration: 'random(2, 4)', repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3 })
    })

    // Parallax glow
    gsap.to('.faq-glow', {
      y: 100,
      ease: 'none',
      scrollTrigger: { trigger: '.starnext-faq', start: 'top bottom', end: 'bottom top', scrub: 1 }
    })
  }, [])

  return (
    <section className="starnext-faq py-5 py-lg-7" id="faqSection">
      <div className="faq-glow"></div>

      <div className="particle" style={{ top: '10%', left: '5%' }}></div>
      <div className="particle" style={{ top: '20%', left: '15%' }}></div>
      <div className="particle" style={{ top: '60%', left: '8%' }}></div>
      <div className="particle" style={{ top: '80%', left: '20%' }}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-start g-5">
          <div className="col-12 col-lg-5 faq-left-content">
            <h2 className="faq-title mb-4">
              <span className="reveal-text"><span>Frequently Asked</span></span><br className="d-none d-md-block" />
              <span className="reveal-text"><span>Question</span></span>
              <span className="dot">.</span>
            </h2>

            <p className="faq-sub mb-4" id="faqSub">
              Let&apos;s discuss your needs and see how we can help you digital. Connect with one of our expert
              digital strategists to learn how StarNext Softech can help you reach your business goals.
            </p>

            <ul className="faq-points list-unstyled mb-4" id="faqPoints">
              <li className="d-flex align-items-start gap-3 mb-3 faq-point-item">
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="point-text">24*7 we are available to help you</span>
              </li>

              <li className="d-flex align-items-start gap-3 mb-3 faq-point-item">
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="point-text">We meet deadlines</span>
              </li>

              <li className="d-flex align-items-start gap-3 faq-point-item">
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="point-text">Our code is highly sought after</span>
              </li>
            </ul>

            <div className="magnetic-wrap">
              <a href="/contact" className="btn faq-btn" id="faqContactBtn">Contact Us</a>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="accordion faq-accordion" id="faqAccordion">
              <div className="accordion-item faq-item" data-faq="1">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    What makes StarNext Softech a trusted digital marketing agency?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    StarNext Softech is trusted for its results-driven approach, customized strategies, and transparent communication. Our team focuses on delivering measurable growth and long-term value for every client.

                  </div>
                </div>
              </div>

              <div className="accordion-item faq-item" data-faq="2">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                    aria-expanded="false" aria-controls="collapseTwo">
                    How does StarNext Softech help businesses grow online?
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    
We use a combination of SEO, social media marketing, paid advertising, and content strategies to increase visibility, attract the right audience, and generate high-quality leads.

                  </div>
                </div>
              </div>

              <div className="accordion-item faq-item" data-faq="3">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree"
                    aria-expanded="false" aria-controls="collapseThree">
                    Does  StarNext Softech work with both small businesses and large enterprises?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">Yes, we work with businesses of all sizes. Our strategies are scalable and tailored to meet the specific goals and budgets of startups, SMEs, and large enterprises.

                  </div>
                </div>
              </div>

              <div className="accordion-item faq-item" data-faq="4">
                <h2 className="accordion-header" id="headingFour">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour"
                    aria-expanded="false" aria-controls="collapseFour">
                    Do you provide customized digital marketing strategies?
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Absolutely. Every strategy is designed based on your business objectives, industry, competition, and target audience to ensure maximum effectiveness and ROI.

                  </div>
                </div>
              </div>

              <div className="accordion-item faq-item" data-faq="5">
                <h2 className="accordion-header" id="headingFive">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive"
                    aria-expanded="false" aria-controls="collapseFive">
                    How soon can I expect results after starting with StarNext Softech?

                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Timelines depend on the service. Paid campaigns can deliver results within days, while SEO typically takes a few months to show consistent growth. We focus on delivering steady and measurable performance.

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}