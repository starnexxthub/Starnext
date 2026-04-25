'use client'

import { useEffect } from 'react'

export default function ServicesMobile() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    
    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    
    if (!gsap || !ScrollTrigger) return undefined

    const cards = document.querySelectorAll('#cardsSection .blog-card')
    
    cards.forEach((card, index) => {
      gsap.set(card, { y: 100, opacity: 0, rotateX: 15, scale: 0.95 })

      gsap.to(card, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.08
      })

      const img = card.querySelector('.card-image')
      if (img) {
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        })
        .to(card, { y: -30, ease: 'none' }, 0)
        .to(img, { scale: 1.2, ease: 'none' }, 0)
      }
    })

    return undefined
  }, [])

  return (
    <section className="cards-section d-md-none" id="cardsSection">
      <div className="particles" id="cardsParticles"></div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title pt-4">Our Services</h2>
          <p className="section-subtitle">We help shape how your audience sees and remembers you.</p>
        </div>

        <div className="cards-container">
          {/* Card 1 */}
          <article className="blog-card floating floating-delay-1" data-card="1">
            <div className="gradient-border"></div>
            <div className="glow"></div>

            <div className="card-image-wrapper">
              <img src="/img/dm.webp" alt="Digital Marketing" className="card-image" />
              <div className="card-image-overlay"></div>
            </div>

            <div className="card-content">
              <h3 className="card-title">DIGITAL MARKETING</h3>
              <p className="section-subtitle">
                StarNext Softech delivers performance-focused digital marketing solutions for businesses and individuals aiming to grow online.
              </p>

              <div className="card-footer">
                <div className="magnetic-wrap">
                  <a href="/service/Digital" className="btn faq-btn" id="faqContactBtn">Read More</a>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="blog-card floating floating-delay-2" data-card="2">
            <div className="gradient-border"></div>
            <div className="glow"></div>

            <div className="card-image-wrapper">
              <img src="/img/social.webp" alt="Social Media Marketing" className="card-image" />
              <div className="card-image-overlay"></div>
            </div>

            <div className="card-content">
              <h3 className="card-title">SOCIAL MEDIA MARKETING</h3>
              <p className="section-subtitle">
                Results-driven social media marketing with high-impact content and campaigns.
              </p>

              <div className="card-footer">
                <div className="magnetic-wrap">
                  <a href="/service/SocialMedia" className="btn faq-btn" id="faqContactBtn">Read More</a>
                </div>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="blog-card floating floating-delay-3" data-card="3">
            <div className="gradient-border"></div>
            <div className="glow"></div>

            <div className="card-image-wrapper">
              <img src="/img/seo.webp" alt="SEO" className="card-image" />
              <div className="card-image-overlay"></div>
            </div>

            <div className="card-content">
              <h3 className="card-title">SEO</h3>
              <p className="section-subtitle">
                Strategic SEO + local SEO to improve visibility, traffic, and conversions.
              </p>

              <div className="card-footer">
                <div className="magnetic-wrap">
                  <a href="/service/Seo" className="btn faq-btn" id="faqContactBtn">Read More</a>
                </div>
              </div>
            </div>
          </article>

          {/* Card 4 */}
          <article className="blog-card floating floating-delay-4 is-dark" data-card="4">
            <div className="gradient-border"></div>
            <div className="glow"></div>

            <div className="card-image-wrapper">
              <img src="/img/Development.webp" alt="Web Designing" className="card-image" />
              <div className="card-image-overlay"></div>
            </div>

            <div className="card-content">
              <h3 className="card-title">WEB DESIGNING</h3>
              <p className="section-subtitle">
                Clean UI/UX, strong performance, and business-focused website development.
              </p>

              <div className="card-footer">
                <div className="magnetic-wrap">
                  <a href="/service" style={{ background: 'linear-gradient(135deg, #fcfdff 0%, #c8d6fb 100%)', color: '#000d1a' }} className="btn faq-btn" id="faqContactBtn">Read More</a>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}