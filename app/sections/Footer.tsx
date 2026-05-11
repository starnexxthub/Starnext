'use client'
import { useEffect } from 'react'

export default function Footer() {
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    if (!gsap || !ScrollTrigger) return

    gsap.to('.footer-image-wrap', {
      scrollTrigger: {
        trigger: '.footer-image-wrap',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    })
  }, [])

  return (
    <footer className="footer-section">
      <div className="container-footer">
        <div className="row footer-row justify-content-between">

          <div className="col-6 col-md-4 col-lg-4">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-my-list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-4">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-my-list">
              <li><a href="/service/Digital">Digital Marketing</a></li>
              <li><a href="/service">Web & App Development</a></li>
              <li><a href="/service/Seo">Search Engine Optimization</a></li>
              <li><a href="/service/SocialMedia">Social Media Marketing</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-4">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-my-list">
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>
        <div className="footer-image-wrap">
          <img src="/img/footer3.png" alt="Footer graphic" className="footer-image w-100" />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <h6 className="noww">© 2026 Starnext Softech Private Limited. All rights reserved.</h6>
          {/*<h6 className="noww">Terms & Conditions | Privacy Policy</h6>*/}
        </div>
      </div>
    </footer>
  )
}