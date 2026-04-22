'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../AboutPage.module.css';
import { Linkedin } from 'lucide-react';

const teamMembers = [
  { name: 'Anshul Mamgain', role: 'Creative Director', img: '/img/t1.png?w=400&h=550&fit=crop' },
  { name: 'Himanshu', role: 'SEO Expert', img: 'img/t3.png?w=400&h=600&fit=crop' },
  { name: 'Ashima ', role: 'Editor', img: 'img/t2.png?w=400&h=450&fit=crop' },
  { name: 'Sakshi Butola', role: 'Business Head', img: '/img/t9.png?w=400&h=550&fit=crop' },
  { name: 'Kartik Singh', role: 'Full Stack Developer', img: '/img/t4.png?w=400&h=500&fit=crop' },
  { name: 'Maheek ', role: 'UI-UX Head', img: '/img/t5.png?w=400&h=480&fit=crop' },
  { name: 'Mahima', role: 'UI-UX Head', img: '/img/t6.png?w=400&h=520&fit=crop' },
  { name: 'Manish Rawat', role: 'Editor', img: '/img/t7.png?w=400&h=460&fit=crop' },
  { name: 'Priyanka', role: 'Brand Head', img: '/img/t8.png?w=400&h=460&fit=crop' },
  { name: 'Saurabh', role: 'Head Editor', img: '/img/t10.png?w=400&h=460&fit=crop' },
  { name: 'Shivansh Kapoor', role: 'SEO Expert', img: '/img/t11.png?w=400&h=460&fit=crop' },
  { name: 'Sumit ', role: 'Senior Editor', img: '/img/t12.png?w=400&h=460&fit=crop' },
  { name: 'Utkarsh', role: 'Senior Full Stack Developer', img: '/img/t13.png?w=400&h=460&fit=crop' },

];

export default function PeopleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);

    // Entrance animation
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true
      }
    });

    // Title animation
    gsap.from(`.${styles.peopleTitle}`, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true
      }
    });

    // Parallax effect
    cards.forEach((card, index) => {
      if (!card) return;
      const speed = index % 2 === 0 ? 30 : -30;
      gsap.to(card, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Hover animations using GSAP
    
  }, []);

  return (
    <section ref={sectionRef} id="peopleSection" className={styles.peopleSection}>
      <div className="container-fluid">
        <h2 className={styles.peopleTitle}>PEOPLE BEHIND <span>STARNEXT</span></h2>
        
        <div className={styles.masonryGrid}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className={styles.peopleCard}
            >
              <img src={member.img} alt={member.name} />
              <div className={styles.peopleCardOverlay}>
  <div className={styles.overlayContent}>
    <div className={styles.linkedinIcon}>
      <Linkedin size={24} color="white" />
    </div>
  </div>
</div>
              <div className={styles.peopleCardInfo}>
                <span className={styles.peopleName}>{member.name}</span>
                <span className={styles.peopleDesignation}>{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}