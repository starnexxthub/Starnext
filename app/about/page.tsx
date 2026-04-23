'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './AboutPage.module.css';
import HeroSection from './components/HeroSection';
import CoverScroll from './components/CoverScroll';
import TeamSection from './components/TeamSection';
import PeopleSection from './components/PeopleSection';
import TestimonialSection from './components/TestimonialSection';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer'; 
import Newsletter from '../sections/Newsletter';
import SocialBar from '../sections/SocialBar';
import JourneySection from './components/Journeysection';

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const currentSectionRef = useRef<HTMLSpanElement>(null);
  const navDotsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ REGISTER HERE (IMPORTANT FIX)
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // ✅ WAIT FOR FULL LOAD (CRITICAL FOR LIVE)
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    // ✅ EXTRA SAFETY REFRESH (NEXTJS FIX)
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);

      // cleanup triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const updateNavDots = (activeIndex: number) => {
    navDotsRef.current.forEach((dot, index) => {
      if (dot) {
        dot.classList.toggle(styles.navDotActive, index === activeIndex);
      }
    });
    if (currentSectionRef.current) {
      currentSectionRef.current.textContent = `0${activeIndex + 1}`;
    }
  };

  const goToSection = (index: number) => {
    const coverTrigger = ScrollTrigger.getAll().find(
      st => st.vars.trigger === "#coverWrapper"
    );
    if (coverTrigger) {
      const targetScroll = index === 0 ? coverTrigger.start : coverTrigger.end;
      gsap.to(window, { 
        scrollTo: { y: targetScroll, autoKill: false }, 
        duration: 1, 
        ease: "power2.inOut" 
      });
    }
  };

  return (
    <>
      <Navbar />
      <main ref={mainRef} className={styles.section}>
        <HeroSection />
        <CoverScroll 
          progressBarRef={progressBarRef}
          updateNavDots={updateNavDots}
        />
        <JourneySection/>
        <PeopleSection />
        <TestimonialSection/>
      </main>

      <Newsletter/>
      <SocialBar/>
      <Footer /> 
    </>
  );
}