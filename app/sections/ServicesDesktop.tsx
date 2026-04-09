'use client'

import { useRouter } from "next/navigation";

import { useEffect, useState } from 'react'

const servicesData = [
  { title: '', desc: '', img: '/img/dm.webp' },
  { title: '', desc: '', img: '/img/social.webp' },
  { title: '', desc: '', img: '/img/seo.webp' },
  { title: '', desc: '', img: '/img/Development.webp' }
]

export default function ServicesDesktop() {
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter();

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
                 StarNext Softech, the best digital marketing company, brings years of industry experience to help businesses achieve growth through innovative digital solutions
              </p>

              <button className="magnetic-btn magnetic-btn2 tw-bg-slate-900 tw-hover-bg-slate-800 tw-text-white tw-px-8 tw-py-4 tw-rounded-full tw-font-medium tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 tw-hover-shadow-2xl tw-shadow-slate-900-20 tw-hover--translate-y-1" onClick={() => router.push("/services/Digital")}>
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
                StarNext’s social media marketing drives growth with engaging campaigns, data-driven strategies, and stunning content, boosting reach, engagement, and loyalty.
              </p>

              <button className="magnetic-btn magnetic-btn2 tw-bg-slate-900 tw-hover-bg-slate-800 tw-text-white tw-px-8 tw-py-4 tw-rounded-full tw-font-medium tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 tw-hover-shadow-2xl tw-shadow-slate-900-20 tw-hover--translate-y-1" onClick={() => router.push("/services/SocialMedia")}>
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
                We help brands dominate search rankings through data-led SEO that drives qualified traffic and conversions.

              </p>

              <button className="magnetic-btn magnetic-btn2 tw-bg-slate-900 tw-hover-bg-slate-800 tw-text-white tw-px-8 tw-py-4 tw-rounded-full tw-font-medium tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 tw-hover-shadow-2xl tw-shadow-slate-900-20 tw-hover--translate-y-1" onClick={() => router.push("/services/Seo")}>
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
                From concept to launch, we deliver high-performance, visually refined websites that engage audiences, convert customers, and accelerate measurable business growth.

              </p>

              <button className="magnetic-btn magnetic-btn2 tw-bg-slate-900 tw-hover-bg-slate-800 tw-text-white tw-px-8 tw-py-4 tw-rounded-full tw-font-medium tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 tw-hover-shadow-2xl tw-shadow-slate-900-20 tw-hover--translate-y-1" onClick={() => router.push("/services")} >
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