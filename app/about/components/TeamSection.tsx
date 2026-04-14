'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../AboutPage.module.css';

const stats = [
  { target: 2013, label: 'The year we founded our company' },
  { target: 17, label: 'Years of designing Experience' },
  { target: 23, label: 'Industries impacted growth' },
  { target: 200, label: 'Global Collaborations' },
  { target: 23, label: 'Digital experiences launched' },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);  // ✅ renamed + correct type

  useEffect(() => {
    const timer = setTimeout(() => {

      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();

      const wrapper = wrapperRef.current;  // ✅ now matches
      const section = wrapper?.querySelector('section') as HTMLElement;
      if (!wrapper || !section) return;

      const animateCounter = (element: Element, target: number, duration = 2) => {
        const obj = { val: 0 };
        return gsap.to(obj, {
          val: target,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = Math.round(obj.val).toString();
          }
        });
      };

      gsap.set("#centerImage", { opacity: 0, scale: 0.8 });
      gsap.set(["#leftPanel", "#rightPanel"], { width: 0 });

      const teamTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          scrub: 1,
          pin: section,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onRefresh: self => self.animation?.progress(0),
        }
      });

      teamTl
        .to("#imgTop", { y: "35vh", scale: 2.2, opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0)
        .to("#imgLeftTop", { x: "30vw", y: "20vh", scale: 0.5, opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0)
        .to("#imgRightTop", { x: "-30vw", y: "20vh", scale: 0.5, opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0)
        .to("#imgLeftBottom", { x: "25vw", y: "-15vh", scale: 0.5, opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0)
        .to("#imgRightBottom", { x: "-25vw", y: "-15vh", scale: 0.5, opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0)
        .to("#teamCenterText", { opacity: 0, y: -50, duration: 0.15, ease: "power2.inOut" }, 0.1)
        .to("#centerImage", { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0.2)
        .to("#centerImage", { scale: 1.3, duration: 0.4, ease: "power2.inOut" }, 0.45)
        .to("#leftPanel", { width: "25%", duration: 0.4, ease: "power2.inOut" }, 0.45)
        .to("#rightPanel", { width: "25%", duration: 0.4, ease: "power2.inOut" }, 0.45)
        .to(`.${styles.panelContent}`, {
          opacity: 1,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out",
          onStart: () => {
            const counters = document.querySelectorAll(`.${styles.statNumber}`);
            counters.forEach((counter, index) => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              setTimeout(() => animateCounter(counter, target, 1.5), index * 100);
            });
          }
        }, 0.55)
        .to("#centerImage", { scale: 3, y: "20vh", duration: 0.3, ease: "power2.in" }, 0.7)
        .to(["#leftPanel", "#rightPanel"], { width: "50%", duration: 0.3, ease: "power2.in" }, 0.7)
        .to(`.${styles.panelContent}`, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0.85);

      gsap.to(`.${styles.teamImage}`, {
        y: "+=10",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });

      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 300);

    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.teamWrapper}>  {/* ✅ ref on wrapper div */}
      <section id="teamSection" className={styles.teamSection}>
        <div className={styles.teamSticky}>

          <div id="teamCenterText" className={styles.teamCenterContent}>
            <h2>Who we are</h2>
            <h1>A team of<br />experts</h1>
          </div>

          <div id="imgTop" className={`${styles.teamImage} ${styles.imgTop}`}>
            <img src="/img/about.jpeg" alt="Team member" />
          </div>
          <div id="imgLeftTop" className={`${styles.teamImage} ${styles.imgLeftTop}`}>
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" alt="Team member" />
          </div>
          <div id="imgRightTop" className={`${styles.teamImage} ${styles.imgRightTop}`}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" alt="Team member" />
          </div>
          <div id="imgLeftBottom" className={`${styles.teamImage} ${styles.imgLeftBottom}`}>
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" alt="Team member" />
          </div>
          <div id="imgRightBottom" className={`${styles.teamImage} ${styles.imgRightBottom}`}>
            <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop" alt="Team member" />
          </div>

          <div id="centerImage" className={styles.teamCenterImage}>
            <img src="/img/black.png" alt="Featured team member" />
          </div>

          <div id="leftPanel" className={`${styles.sidePanel} ${styles.sidePanelLeft}`}>
            <div className={styles.panelContent}>
              <p className={styles.panelLabel}>What We have done</p>
              <h3 className={styles.panelTitle}>OUR<br />JOURNEY<br />SO FAR</h3>
            </div>
          </div>

          <div id="rightPanel" className={`${styles.sidePanel} ${styles.sidePanelRight}`}>
            <div className={styles.panelContent}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statNumber} data-target={stat.target}>0</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}