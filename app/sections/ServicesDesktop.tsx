'use client'

import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (typeof window === 'undefined') return

    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger

    if (!gsap || !ScrollTrigger) return

    const section = document.getElementById('brandSection')
    const rightCard = document.getElementById('rightCard')
    const points = document.querySelectorAll('#brandSection .js-point')

    if (!section || !rightCard || !points.length) return

    const triggers: any[] = []

    // Pin on desktop only
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

      // Entrance animation — same pattern as ServicesMobile
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
    })

    // Refresh after full load
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
                <h3 className={step === 0 ? 'fw-semibold' : ''}>{heading}</h3>
                <p className="fw-semibold">{sub}</p>
                <p>{body}</p>

                {/* ← same btn class pattern as ServicesMobile */}
                <div className="magnetic-wrap">
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
              <div className="media">
                <img
                  id="rightImg"
                  src={servicesData[activeIndex].img}
                  alt={services[activeIndex].heading}
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