'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from '../AboutPage.module.css';
import { Sun } from 'lucide-react';

const images = [
  '/img/t1.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/sakshi.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t6.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t10.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t13.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t2.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t3.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t4.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t5.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t7.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t8.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t11.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t12.webp?q=80&w=1000&auto=format&fit=crop',
  '/img/t14.webp?q=80&w=1000&auto=format&fit=crop'
];

export default function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = track.querySelectorAll(`.${styles.galleryItem}`);
    const itemWidth = 320;
    const gap = 24;
    const totalWidth = (itemWidth + gap) * images.length;

    // Clone items for infinite scroll
    items.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement;
      track.appendChild(clone);
    });

    // Infinite scroll animation — unchanged from desktop
    scrollTweenRef.current = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string | number) => {
          const val = typeof x === 'string' ? parseFloat(x) : x;
          const initialOffset = window.innerWidth - itemWidth - gap;
          const relativeX = val - initialOffset;
          const wrapped = relativeX % totalWidth;
          return initialOffset + wrapped;
        }),
      },
    });

    const wrapper = track.parentElement;

    // ── Desktop: hover pause/resume (unchanged) ──
    const handleMouseEnter = () => scrollTweenRef.current?.pause();
    const handleMouseLeave = () => scrollTweenRef.current?.play();
    wrapper?.addEventListener('mouseenter', handleMouseEnter);
    wrapper?.addEventListener('mouseleave', handleMouseLeave);

    // ── Mobile: tap anywhere in gallery to toggle pause/resume ──
    // Using touchend so it fires after the finger lifts (feels snappier).
    // We track touchstart X to ignore swipe-scrolls — only a clean tap toggles.
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);

      // Only treat as a tap if the finger barely moved (not a scroll/swipe)
      const isTap = dx < 10 && dy < 10;
      if (!isTap) return;

      if (isPausedRef.current) {
        scrollTweenRef.current?.play();
        isPausedRef.current = false;
      } else {
        scrollTweenRef.current?.pause();
        isPausedRef.current = true;
      }
    };

    // passive: true keeps native scroll smooth; we don't need preventDefault
    wrapper?.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrapper?.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Entrance animations — unchanged
    const tl = gsap.timeline();
    tl.from('#ratingBadge', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' })
      .from('#mainTitle', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .from('#subTitle', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .from('#ctaButton', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .from(
        `.${styles.galleryItem}`,
        { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );

    // Scroll velocity skew — unchanged
    let lastScrollTop = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const scrollVelocity = st - lastScrollTop;
      lastScrollTop = st <= 0 ? 0 : st;

      gsap.to(`.${styles.galleryItem}`, {
        skewX: scrollVelocity * 0.05,
        duration: 0.3,
        ease: 'power1.out',
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to(`.${styles.galleryItem}`, { skewX: 0, duration: 0.5, ease: 'power2.out' });
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, false);

    return () => {
      wrapper?.removeEventListener('mouseenter', handleMouseEnter);
      wrapper?.removeEventListener('mouseleave', handleMouseLeave);
      wrapper?.removeEventListener('touchstart', handleTouchStart);
      wrapper?.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      scrollTweenRef.current?.kill();
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className="text-center">
          <div id="ratingBadge" className={styles.ratingBadge}>
            <Sun size={18} />
            <span>Rated 4.90/5 from 175+ reviews</span>
          </div>
        </div>

        <h1 id="mainTitle" className={styles.heroTitle}>
          StarNext Digital Growth <br />
          and <span className={styles.textMuted}>digital experiences.</span>
        </h1>

        <p id="subTitle" className={styles.heroSubtitle}>
          At StarNext, we bring ideas to life through strategy, design, and digital innovation.
        </p>
      </div>

      <div className={styles.galleryWrapper}>
        <div ref={trackRef} className={styles.galleryTrack}>
          {images.map((src, index) => (
            <div key={index} className={styles.galleryItem}>
              <img src={src} alt={`Creative Portrait ${index + 1}`} loading="lazy" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}