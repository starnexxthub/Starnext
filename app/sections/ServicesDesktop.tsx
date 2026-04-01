'use client'

import { useEffect, useState } from 'react'

const servicesData = [
  { title: '', desc: '', img: '/img/dm.webp' },
  { title: '', desc: '', img: '/img/social.webp' },
  { title: '', desc: '', img: '/img/seo.webp' },
  { title: '', desc: '', img: '/img/Development.webp' }
]

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

    // Pin on desktop
    ScrollTrigger.matchMedia({
      '(min-width: 992px)': function() {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top+=30',
          end: () => '+=' + (section.offsetHeight - rightCard.offsetHeight),
          pin: rightCard,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        })
      }
    })

    points.forEach((el) => {
      const index = Number(el.getAttribute('data-step'))

      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index)
      })

      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.6
      })
    })

    window.addEventListener('load', () => ScrollTrigger.refresh())
  }, [])

  return (
    <section className="section-wrap d-none d-md-block" id="brandSection">
      <div className="container-xxl">
        <div className="row g-5">
          {/* LEFT SIDE */}
          <div className="col-lg-6">
            <h1 className="big-title mb-4">Our Services</h1>
            <p className="desc mb-5">
              We help shape how your audience sees and remembers you.
            </p>

            <div className={`point js-point ${activeIndex === 0 ? 'active' : ''}`} data-step="0">
              <h3 className="fw-semibold">DIGITAL MARKETING</h3>
              <p className="fw-semibold">Best Digital Marketing Company</p>
              <p>
                StarNext Softech delivers performance-focused digital marketing solutions for businesses and individuals aiming to grow online.
                Our strategies are built to create measurable impact and long-term brand value.
              </p>

              <button className="about-btn btn-navy">
                MORE ABOUT US
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>

            <div className={`point js-point ${activeIndex === 1 ? 'active' : ''}`} data-step="1">
              <h3>SOCIAL MEDIA MARKETING</h3>
              <p className="fw-semibold">Best Social Media Marketing Company</p>
              <p>
                StarNext Softech is a results-driven social media marketing company with deep expertise in delivering high-impact social media solutions.
                Our mission is to establish ourselves as the leading social media marketing company globally.
              </p>

              <button className="about-btn btn-navy">
                MORE ABOUT US
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>

            <div className={`point js-point ${activeIndex === 2 ? 'active' : ''}`} data-step="2">
              <h3>SEO</h3>
              <p className="fw-semibold">Best SEO Company</p>
              <p>
                If you&apos;re a business owner seeking a reliable digital marketing company in India, StarNext Softech stands out as a strong choice.
                As a leading SEO company, we drive business growth through strategic search optimisation, while our local SEO services boost visibility,
                attract nearby customers, and give your brand a competitive edge.
              </p>

              <button className="about-btn btn-navy">
                MORE ABOUT US
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>

            <div className={`point js-point ${activeIndex === 3 ? 'active' : ''}`} data-step="3">
              <h3>WEB DESIGNING</h3>
              <p className="fw-semibold">Best Web Designing Company</p>
              <p>
                StarNext Softech is a fast-growing and trusted web designing company in Dehradun, Uttarakhand. We specialise in high-quality website
                design and development services that combine clean UI/UX, strong performance, and business-focused functionality.
              </p>

              <button className="about-btn btn-navy">
                MORE ABOUT US
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>

            <div style={{ height: '5vh' }}></div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6">
            <div className="right-card" id="rightCard">
              <div className="media">
                <img id="rightImg" src={servicesData[activeIndex].img} alt="" />
              </div>

              <div className="overlay"></div>

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