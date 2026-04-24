'use client';

import { useEffect, useRef } from 'react';
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  motion,
} from 'framer-motion';
import styles from '../AboutPage.module.css';

interface CoverScrollProps {
  progressBarRef: React.RefObject<HTMLDivElement | null>;
  updateNavDots: (index: number) => void;
}

export default function CoverScroll({ progressBarRef, updateNavDots }: CoverScrollProps) {
  const touchHintRef = useRef<HTMLDivElement>(null);
  const wrapperRef   = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const section2XRaw = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);
  const section2X    = useSpring(section2XRaw, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${latest * 100}%`;
    }
    updateNavDots(latest > 0.5 ? 1 : 0);
  });

  useEffect(() => {
    const touchHint = touchHintRef.current;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice && touchHint) {
      setTimeout(() => touchHint.classList.add('visible'), 500);
      setTimeout(() => touchHint.classList.remove('visible'), 3000);
    }
  }, []);

  const goToSection = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const top    = wrapper.getBoundingClientRect().top + window.scrollY;
    const height = wrapper.offsetHeight - window.innerHeight;
    window.scrollTo({ top: index === 0 ? top : top + height, behavior: 'smooth' });
  };

  /** Returns true only when #coverWrapper is the pinned section on screen */
  const isWrapperActive = (): boolean => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return false;
    const rect = wrapper.getBoundingClientRect();
    // The wrapper occupies 200vh of scroll space.
    // It's "active" when its sticky panel is pinned — i.e. rect.top <= 0
    // and the bottom of the wrapper hasn't left the screen yet.
    return rect.top <= 0 && rect.bottom > 0;
  };

  // ── Keyboard navigation (guard added) ────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isWrapperActive()) return;
      const current = scrollYProgress.get() > 0.5 ? 1 : 0;
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && current === 0) goToSection(1);
      if ((e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   && current === 1) goToSection(0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollYProgress]);

  // ── Wheel snap — ONLY fires when coverWrapper is the active section ───────
  useEffect(() => {
    let lastScrollTime = 0;
    const handleWheel = (e: WheelEvent) => {
      // ✅ Guard: ignore completely if section isn't pinned on screen
      if (!isWrapperActive()) return;

      const now = Date.now();
      if (now - lastScrollTime < 800 || Math.abs(e.deltaY) < 50) return;
      lastScrollTime = now;

      const current = scrollYProgress.get() > 0.5 ? 1 : 0;
      const next = current + (e.deltaY > 0 ? 1 : -1);
      if (next >= 0 && next <= 1) goToSection(next);
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollYProgress]);

  // ── Touch swipe snap — guard added ───────────────────────────────────────
  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      // ✅ Guard: ignore if section isn't active
      if (!isWrapperActive()) return;

      const diff = touchStartY - e.changedTouches[0].screenY;
      if (Math.abs(diff) < 50) return;
      const current = scrollYProgress.get() > 0.5 ? 1 : 0;
      if (diff > 0 && current === 0) goToSection(1);
      if (diff < 0 && current === 1) goToSection(0);
    };
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend',   handleTouchEnd,   { passive: true });
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend',   handleTouchEnd);
    };
  }, [scrollYProgress]);

  return (
    <div id="coverWrapper" ref={wrapperRef} className={styles.coverScrollWrapper}>
      {/* Vision Section — stationary */}
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
  <p className={styles.keywordText}>
    We envision becoming a leader in advancing businesses using digital mediums. 
    Customer loyalty and satisfaction, openness, creativity and teamwork growth 
    play an essential role in our driving mission. All this contributes to 
    reflecting who we are, what we are, how we work, and what we strive for.
  </p>
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

      {/* Mission Section — slides in slowly from right */}
      <motion.section
        className={`${styles.coverSection} ${styles.sectionMission}`}
        style={{ x: section2X }}
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
  <p className={styles.keywordText}>
    To empower businesses with result-driven digital solutions by combining strategy, technology, and creative excellence—while fostering strong customer relationships, delivering measurable outcomes, and continuously evolving with the digital landscape.

  </p>
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
      </motion.section>

      <div ref={touchHintRef} className="touch-hint">Swipe to explore</div>
    </div>
  );
}