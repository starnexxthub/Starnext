'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../AboutPage.module.css';
import { Linkedin } from 'lucide-react';

const teamMembers = [
  { name: 'Sarah Chen', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop' },
  { name: 'Marcus Johnson', role: 'Lead Developer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop' },
  { name: 'Elena Rodriguez', role: 'UX Designer', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=450&fit=crop' },
  { name: 'David Kim', role: 'Strategy Lead', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=550&fit=crop' },
  { name: 'Amara Okafor', role: 'Project Manager', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop' },
  { name: 'James Wilson', role: 'Motion Designer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=480&fit=crop' },
  { name: 'Priya Sharma', role: 'Brand Strategist', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=520&fit=crop' },
  { name: 'Lucas Martinez', role: 'Frontend Dev', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=460&fit=crop' },
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
    cards.forEach((card) => {
      if (!card) return;
      const img = card.querySelector('img');
      const overlay = card.querySelector(`.${styles.peopleCardOverlay}`);
      const linkedinIcon = card.querySelector(`.${styles.linkedinIcon}`);

      const handleMouseEnter = () => {
        gsap.to(img, { filter: "blur(8px)", duration: 0.4, ease: "power2.out" });
        gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(linkedinIcon, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
      };

      const handleMouseLeave = () => {
        gsap.to(img, { filter: "blur(0px)", duration: 0.4, ease: "power2.out" });
        gsap.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(linkedinIcon, { scale: 0.8, duration: 0.3, ease: "power2.in" });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
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
                <div className={styles.linkedinIcon}>
                  <Linkedin size={24} color="white" />
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