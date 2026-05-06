'use client'

import { useEffect, useRef, useState } from 'react'

const servicesData = [
  { title: '', desc: '', img: '/img/DigitalM-2.webp' },
  { title: '', desc: '', img: '/img/social.webp' },
  { title: '', desc: '', img: '/img/seo.webp' },
  { title: '', desc: '', img: '/img/Development.webp' }
]

const services = [
  {
    step: 0,
    heading: 'DIGITAL MARKETING',
    sub: 'Best Digital Marketing Company',
    body: 'StarNext Softech, the best digital marketing company, brings years of industry experience to help businesses achieve growth through innovative digital solutions.',
    href: '/service/Digital'
  },
  {
    step: 1,
    heading: 'SOCIAL MEDIA MARKETING',
    sub: 'Best Social Media Marketing Company',
    body: "StarNext's social media marketing drives growth with engaging campaigns, data-driven strategies, and stunning content, boosting reach, engagement, and loyalty.",
    href: '/service/SocialMedia'
  },
  {
    step: 2,
    heading: 'SEO',
    sub: 'Best SEO Company',
    body: 'We help brands dominate search rankings through data-led SEO that drives qualified traffic and conversions.',
    href: '/service/Seo'
  },
  {
    step: 3,
    heading: 'WEB DESIGNING',
    sub: 'Best Web Designing Company',
    body: 'From concept to launch, we deliver high-performance, visually refined websites that engage audiences, convert customers, and accelerate measurable business growth.',
    href: '/service'
  }
]

const ArrowIcon = () => (
  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

export default function ServicesDesktop() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)

  // Smooth image crossfade on activeIndex change
  useEffect(() => {
    const gsap = (window as any).gsap
    if (!gsap || !imgRef.current || !imgWrapRef.current) return

    if (activeIndex === prevIndex) return

    // Slide-out old, swap src, slide-in new
    const img = imgRef.current
    const tl = gsap.timeline()

    tl.to(img, {
      scale: 1.06,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        img.src = servicesData[activeIndex].img
        img.alt = services[activeIndex].heading
      }
    }).fromTo(
      img,
      { scale: 1.06, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    )

    setPrevIndex(activeIndex)
  }, [activeIndex])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    if (!gsap || !ScrollTrigger) return

    const section = document.getElementById('brandSection')
    const rightCard = document.getElementById('rightCard')
    const points = document.querySelectorAll<HTMLElement>('#brandSection .js-point')

    if (!section || !rightCard || !points.length) return

    const triggers: any[] = []

    // Pin right card on desktop
    ScrollTrigger.matchMedia({
      '(min-width: 992px)': function () {
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: 'top top+=30',
            end: () => '+=' + (section.offsetHeight - rightCard.offsetHeight),
            pin: rightCard,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          })
        )
      }
    })

    points.forEach((el) => {
      const index = Number(el.getAttribute('data-step'))

      // Active index tracker
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index)
        })
      )

      // Staggered entrance: heading, sub, body, btn each slide up
      const children = el.querySelectorAll('.js-anim')
      gsap.set(children, { y: 28, opacity: 0 })

      gsap.to(children, {
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.1
      })
    })

    // Right card entrance (scale + fade)
    gsap.from(rightCard, {
      scrollTrigger: {
        trigger: rightCard,
        start: 'top 85%',
        once: true
      },
      scale: 0.96,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className="section-wrap d-none d-md-block" id="brandSection">
      <div className="container-xxl">
        <div className="row g-5">

          {/* LEFT SIDE */}
          <div className="col-lg-6">
            <h1 className="big-title mb-4">Our Services</h1>
            <p className="desc mb-5">We help shape how your audience sees and remembers you.</p>

            {services.map(({ step, heading, sub, body, href }) => (
              <div
                key={step}
                className={`point js-point ${activeIndex === step ? 'active' : ''}`}
                data-step={step}
              >
                {/* Each child tagged js-anim for staggered entrance */}
                <h3 className={`js-anim${step === 0 ? ' fw-semibold' : ''}`}>{heading}</h3>
                <p className="fw-semibold js-anim">{sub}</p>
                <p className="js-anim">{body}</p>

                <div className="magnetic-wrap js-anim">
                  <a href={href} className="btn faq-btn">
                    MORE ABOUT US <ArrowIcon />
                  </a>
                </div>
              </div>
            ))}

            <div style={{ height: '5vh' }} />
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6">
            <div className="right-card" id="rightCard">
              <div className="media" ref={imgWrapRef} style={{ overflow: 'hidden' }}>
                <img
                  ref={imgRef}
                  id="rightImg"
                  src={servicesData[0].img}
                  alt={services[0].heading}
                  style={{ willChange: 'transform, opacity' }}
                />
              </div>
              <div className="overlay" />
              <div className="content">
                <h2 className="right-title" id="rightTitle">{servicesData[activeIndex].title}</h2>
                <p className="right-desc" id="rightDesc">{servicesData[activeIndex].desc}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}