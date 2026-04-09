'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navbar from './sections/Navbar'
import SR7Slider from './components/SR7Slider'
import VideoSection from './sections/VideoSection'
import AboutSection from './sections/AboutSection'
import ServicesMobile from './sections/ServicesMobile'
import ServicesDesktop from './sections/ServicesDesktop'
import WhyChooseUs from './sections/WhyChooseUs'
import BrandShowcase from './sections/BrandShowcase'
import HeroExpand from './sections/HeroExpand'
import ContactSection from './sections/ContactSection'
import Testimonials from './sections/Testimonials'
import FAQSection from './sections/FAQSection'
import Newsletter from './sections/Newsletter'
import SocialBar from './sections/SocialBar'
import Footer from './sections/Footer'

// Dynamically import ScrollSequence to avoid SSR issues
const ScrollSequence = dynamic(() => import('./components/ScrollSequence'), {
  ssr: false,
  loading: () => <div className="scroll-section header-index" style={{ height: '100vh', background: '#000' }} />
})

export default function Home() {
  useEffect(() => {
    // Load GSAP scripts
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject()
        document.body.appendChild(script)
      })
    }

    const initGSAP = async () => {
      try {
        // Load GSAP core
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js')
        // Load ScrollTrigger
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js')
        
        // Register plugin
        if (typeof window !== 'undefined') {
          const gsap = (window as any).gsap
          const ScrollTrigger = (window as any).ScrollTrigger
          if (gsap && ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger)
            console.log('GSAP initialized')
          }
        }
      } catch (error) {
        console.error('Failed to load GSAP:', error)
      }
    }

    initGSAP()

    // Cleanup
    return () => {
      // Scripts remain in DOM for other components
    }
  }, [])

  return (
    <>
      <div className="particles" id="particles"></div>
      <Navbar />
      <SR7Slider />
      <VideoSection />
      <AboutSection />
      <ServicesMobile />
      <ServicesDesktop />
      <ScrollSequence />
      <WhyChooseUs />
      <BrandShowcase />
      {/* <HeroExpand /> */}
      <ContactSection />
      <Testimonials />
      <FAQSection />
      <Newsletter />
      <SocialBar />
      <Footer />
    </>
  )
}