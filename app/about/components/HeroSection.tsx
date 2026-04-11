'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../AboutPage.module.css';
import { Sun } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504703395950-b89145a5425b?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
];

export default function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

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

    // Infinite scroll animation
    scrollTweenRef.current = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string | number) => {
          const val = typeof x === 'string' ? parseFloat(x) : x;
          const initialOffset = window.innerWidth - itemWidth - gap;
          const relativeX = val - initialOffset;
          const wrapped = relativeX % totalWidth;
          return initialOffset + wrapped;
        })
      }
    });

    // Pause on hover
    const wrapper = track.parentElement;
    const handleMouseEnter = () => scrollTweenRef.current?.pause();
    const handleMouseLeave = () => scrollTweenRef.current?.play();

    wrapper?.addEventListener('mouseenter', handleMouseEnter);
    wrapper?.addEventListener('mouseleave', handleMouseLeave);

    // Entrance animations
    const tl = gsap.timeline();
    tl.from("#ratingBadge", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" })
      .from("#mainTitle", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .from("#subTitle", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .from("#ctaButton", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .from(`.${styles.galleryItem}`, { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.4");

    // Scroll velocity skew effect
    let lastScrollTop = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const scrollVelocity = st - lastScrollTop;
      lastScrollTop = st <= 0 ? 0 : st;

      gsap.to(`.${styles.galleryItem}`, {
        skewX: scrollVelocity * 0.05,
        duration: 0.3,
        ease: "power1.out"
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to(`.${styles.galleryItem}`, { skewX: 0, duration: 0.5, ease: "power2.out" });
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, false);

    return () => {
      wrapper?.removeEventListener('mouseenter', handleMouseEnter);
      wrapper?.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
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
          Starnext Digital Growth <br />
          and <span className={styles.textMuted}>digital experiences.</span>
        </h1>

        <p id="subTitle" className={styles.heroSubtitle}>
          At Starnext, we bring ideas to life through strategy, design, and digital innovation.
        </p>
      </div>

      <div className={styles.galleryWrapper}>
        <div ref={trackRef} className={styles.galleryTrack}>
          {images.map((src, index) => (
            <div key={index} className={styles.galleryItem}>
              <img src={src} alt={`Creative Portrait ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}