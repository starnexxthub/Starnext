'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../AboutPage.module.css';

interface CoverScrollProps {
  progressBarRef: React.RefObject<HTMLDivElement | null>;
  updateNavDots: (index: number) => void;
}

export default function CoverScroll({ progressBarRef, updateNavDots }: CoverScrollProps) {
  const section2Ref = useRef<HTMLElement>(null);
  const touchHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section2 = section2Ref.current;
    const progressBar = progressBarRef.current;
    const touchHint = touchHintRef.current;

    if (!section2) return;

    // Touch hint
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice && touchHint) {
      setTimeout(() => touchHint.classList.add('visible'), 500);
      setTimeout(() => touchHint.classList.remove('visible'), 3000);
    }

    // Main scroll animation
    const coverScroll = gsap.to(section2, {
      x: '0%',
      ease: "none",
      scrollTrigger: {
        trigger: "#coverWrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          if (progressBar) {
            progressBar.style.width = `${self.progress * 100}%`;
          }
          const currentIndex = self.progress > 0.5 ? 1 : 0;
          updateNavDots(currentIndex);
        }
      }
    });

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToSection(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToSection(0);
      }
    };

    // Wheel navigation with debounce
    let lastScrollTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < 800) return;
      
      const st = coverScroll.scrollTrigger;
      if (!st) return;
      
      if (Math.abs(e.deltaY) > 50) {
        lastScrollTime = now;
        const direction = e.deltaY > 0 ? 1 : -1;
        const targetIndex = direction > 0 ? 1 : 0;
        goToSection(targetIndex);
      }
    };

    // Touch navigation
    let touchStartY = 0;
    


    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      coverScroll.kill();
    };
  }, [progressBarRef, updateNavDots]);

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
    <div id="coverWrapper" className={styles.coverScrollWrapper}>
      {/* Vision Section */}
      <section className={`${styles.coverSection} ${styles.sectionVision}`}>
        <div className={styles.sectionContent}>
          <div className={styles.contentText}>
            <div className="container-fluid px-0">
              <div className="row">
                <div className="col-lg-7 col-md-8 col-12 pt-4 pt-md-0">
                  <p className={styles.sectionLabel}>We always aim for the best</p>
                  <h2 className={styles.sectionTitle}>Our Vision.</h2>
                </div>
              </div>
            </div>
            
            <div className={styles.keywords}>
              <span className={styles.keyword}>Innovation</span>
              <span className={styles.keyword}>Growth</span>
              <span className={styles.keyword}>Impact</span>
              <span className={styles.keyword}>Excellence</span>
              <span className={styles.keyword}>Transformation</span>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
              alt="Vision" 
              className={styles.sectionImage}
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={section2Ref}
        className={`${styles.coverSection} ${styles.sectionMission}`}
      >
        <div className={styles.sectionContent}>
          <div className={styles.contentText}>
            <div className="container-fluid px-0">
              <div className="row">
                <div className="col-lg-7 col-md-8 col-12 pt-4 pt-md-0">
                  <p className={styles.sectionLabel}>Mission statement on top.</p>
                  <h2 className={styles.sectionTitle}>Our Mission.</h2>
                </div>
              </div>
            </div>
            
            <div className={styles.keywords}>
              <span className={styles.keyword}>Scale</span>
              <span className={styles.keyword}>Convert</span>
              <span className={styles.keyword}>Empower</span>
              <span className={styles.keyword}>Innovate</span>
              <span className={styles.keyword}>Dominate</span>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" 
              alt="Mission" 
              className={styles.sectionImage}
            />
          </div>
        </div>
      </section>

      <div ref={touchHintRef} className="touch-hint">Swipe to explore</div>
    </div>
  );
}