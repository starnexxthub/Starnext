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









export default function TeamSection() {

  const sectionRef = useRef<HTMLElement>(null);



useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger);

  const init = () => {
    const ctx = gsap.context(() => {

      gsap.set("#centerImage", { opacity: 0, scale: 0.8 });
      gsap.set("#teamCenterText", { opacity: 1 });
      gsap.set(`.${styles.panelContent}`, { opacity: 0 });
      gsap.set("#leftPanel", { width: "0%" });
      gsap.set("#rightPanel", { width: "0%" });

      gsap.set([
        "#imgTop",
        "#imgLeftTop",
        "#imgRightTop",
        "#imgLeftBottom",
        "#imgRightBottom"
      ], { opacity: 1, scale: 1, x: 0, y: 0 });

      const teamTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true,
          immediateRender: false,
          anticipatePin: 1,
        }
      });

      // your animation (unchanged)
      teamTl
        .to("#imgTop", { y: "35vh", scale: 2.2, opacity: 0 }, 0)
        .to("#imgLeftTop", { x: "30vw", y: "20vh", scale: 0.5, opacity: 0 }, 0)
        .to("#imgRightTop", { x: "-30vw", y: "20vh", scale: 0.5, opacity: 0 }, 0)
        .to("#imgLeftBottom", { x: "25vw", y: "-15vh", scale: 0.5, opacity: 0 }, 0)
        .to("#imgRightBottom", { x: "-25vw", y: "-15vh", scale: 0.5, opacity: 0 }, 0)
        .to("#teamCenterText", { opacity: 0, y: -50 }, 0.1)
        .to("#centerImage", { opacity: 1, scale: 1 }, 0.2)
        .to("#centerImage", { scale: 1.3 }, 0.45)
        .to("#leftPanel", { width: "25%" }, 0.45)
        .to("#rightPanel", { width: "25%" }, 0.45)
        .to(`.${styles.panelContent}`, { opacity: 1 }, 0.55)
        .to("#centerImage", { scale: 3, y: "20vh" }, 0.7)
        .to(["#leftPanel", "#rightPanel"], { width: "50%" }, 0.7)
        .to(`.${styles.panelContent}`, { opacity: 0 }, 0.85);

      // ✅ FINAL IMPORTANT FIX
      ScrollTrigger.refresh();

    }, section);

    return () => ctx.revert();
  };

  
  const raf = requestAnimationFrame(() => {
    setTimeout(init, 100); // small delay fixes production
  });

  return () => cancelAnimationFrame(raf);

}, []);



  return (

    <section ref={sectionRef} id="teamSection" className={styles.teamSection}>

      <div className={styles.teamSticky}>

       

        <div id="teamCenterText" className={styles.teamCenterContent}>

          <h2>Who we are</h2>

          <h1>A team of<br />experts</h1>

        </div>



        <div id="imgTop" className={`${styles.teamImage} ${styles.imgTop}`}>

          <img src="/img/founder.png" alt="Team member" />

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

  );

}