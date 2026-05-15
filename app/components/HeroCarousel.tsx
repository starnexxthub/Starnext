"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FloatingCard {
  id: number;
  image: string;
  offsetX: number;
  offsetY: number;
  /** mobile-specific X offset from center (overrides offsetX on mobile) */
  mobileOffsetX?: number;
  /** mobile-specific Y offset from center (overrides offsetY on mobile) */
  mobileOffsetY?: number;
  width: number;
  /** width at ~1024–1279px (small laptop) */
  laptopWidth: number;
  mobileWidth: number;
  delay: number;
  rotate: number;
  zIndex: number;
}

interface Slide {
  id: number;
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  bgWord: string;
  bgWordColor: string;
  bgImage: string;
  accentColor: string;
  floatingCards: FloatingCard[];
}

// ─── Slide data ───────────────────────────────────────────────────────────────
const slides: Slide[] = [
  {
    id: 0,
    bgImage: "/assets/s-bg1.jpg",
    badge: "Best in Uttarakhand",
    title: "Best Digital Marketing",
    titleHighlight: "Company in Uttarakhand",
    description:
      "With years of experience, StarNext Softech has successfully delivered and fulfilled its customers' dreams and needs.",
    bgWord: "STARNEXT",
    bgWordColor: "rgba(0,180,255,0.07)",
    accentColor: "#00c8ff",
    floatingCards: [],
  },
  {
    id: 1,
    bgImage: "/assets/s-bg3.jpg",
    badge: "Dehradun's #1",
    title: "Best Web Designing",
    titleHighlight: "Company in Dehradun",
    description:
      "From concept to launch, we deliver high-performance, visually refined websites that engage audiences, convert customers, and accelerate measurable business growth.",
    bgWord: "WEBSITE",
    bgWordColor: "rgba(160,80,255,0.07)",
    accentColor: "#b060ff",
    floatingCards: [
      // Mobile: main card centered in the middle zone of screen
      { id: 1, image: "/assets/w2.png",  offsetX: 0,    offsetY: -100, width: 340, laptopWidth: 240, mobileWidth: 180, delay: 0,    rotate: -2, zIndex: 2, mobileOffsetX: 0,   mobileOffsetY: -20  },
      // Mobile: small card top-left of center
      { id: 2, image: "/assets/w1.png",  offsetX: -160, offsetY: -180, width: 160, laptopWidth: 110, mobileWidth: 95,  delay: 0.15, rotate: -8, zIndex: 3, mobileOffsetX: -95, mobileOffsetY: -75 },
      // Mobile: small card bottom-right of center
      { id: 3, image: "/assets/w3.png",  offsetX: 150,  offsetY: 260,  width: 160, laptopWidth: 110, mobileWidth: 95,  delay: 0.3,  rotate: 5,  zIndex: 3, mobileOffsetX: 90,  mobileOffsetY: 185 },
    ],
  },
  {
    id: 2,
    bgImage: "/assets/s-bg2.jpg",
    badge: "Creative Experts",
    title: "Best Graphics Video &",
    titleHighlight: "Photography in Dehradun",
    description:
      "From stunning creatives to scroll-stopping videos — we help brands stand out, engage better, and grow faster with professional editing and design.",
    bgWord: "VIDEO",
    bgWordColor: "rgba(255,140,0,0.07)",
    accentColor: "#ff8c00",
    floatingCards: [
      // Mobile: main card slightly above center
      { id: 1, image: "/assets/g2.png", offsetX: 0,    offsetY: -120, width: 340, laptopWidth: 240, mobileWidth: 170, delay: 0,    rotate: 2,  zIndex: 2, mobileOffsetX: 0,   mobileOffsetY: -20  },
      // Mobile: small card top-left
      { id: 2, image: "/assets/g1.png", offsetX: -155, offsetY: -85,  width: 155, laptopWidth: 108, mobileWidth: 90,  delay: 0.15, rotate: -7, zIndex: 3, mobileOffsetX: -95, mobileOffsetY: -90 },
      // Mobile: small card bottom-right
      { id: 3, image: "/assets/g3.png", offsetX: 150,  offsetY: 95,   width: 155, laptopWidth: 108, mobileWidth: 90,  delay: 0.3,  rotate: -2, zIndex: 3, mobileOffsetX: 90,  mobileOffsetY: 130 },
    ],
  },
  {
    id: 3,
    bgImage: "/assets/s-bg4-1.jpg",
    badge: "Growth Focused",
    title: "Best Social Media",
    titleHighlight: "Marketing in Dehradun",
    description:
      "StarNext's social media marketing drives growth with engaging campaigns, data-driven strategies, and stunning content, boosting reach, engagement, and loyalty.",
    bgWord: "SOCIAL",
    bgWordColor: "rgba(0,200,80,0.07)",
    accentColor: "#00d46a",
    floatingCards: [
      // Mobile: main (wide) card — scale down heavily and center it
      { id: 1, image: "/hero/s1.png",   offsetX: 0,    offsetY: 0,   width: 460, laptopWidth: 320, mobileWidth: 210, delay: 0,    rotate: 2,  zIndex: 2, mobileOffsetX: 0,    mobileOffsetY: 20  },
      // Mobile: small card top-left
      { id: 2, image: "/assets/s2.png", offsetX: -240, offsetY: -80, width: 155, laptopWidth: 108, mobileWidth: 90,  delay: 0.15, rotate: -8, zIndex: 3, mobileOffsetX: -95,  mobileOffsetY: -95 },
      // Mobile: small card bottom-right
      { id: 3, image: "/hero/s3.png",   offsetX: 185,  offsetY: 250, width: 155, laptopWidth: 108, mobileWidth: 90,  delay: 0.3,  rotate: -3, zIndex: 3, mobileOffsetX: 90,   mobileOffsetY: 135 },
    ],
  },
];

const SERVICE_LABELS = [
  "DIGITAL MARKETING",
  "WEBSITE DEVELOPMENT",
  "GRAPHICS & VIDEO",
  "SOCIAL MEDIA",
];

// ─── Breakpoint hook ──────────────────────────────────────────────────────────
// mobile  < 768 | laptop 768–1279 | desktop ≥ 1280
type BP = "mobile" | "laptop" | "desktop";

function useBreakpoint(): BP {
  const get = (): BP => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < 768)  return "mobile";
    if (w < 1280) return "laptop";
    return "desktop";
  };
  const [bp, setBp] = useState<BP>(get);
  useEffect(() => {
    const h = () => setBp(get());
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return bp;
}

// ─── FloatingCardItem ─────────────────────────────────────────────────────────
function FloatingCardItem({
  card, active, bp,
}: {
  card: FloatingCard; active: boolean; bp: BP;
}) {
  const prefersReduced = useReducedMotion();

  const w     = bp === "mobile" ? card.mobileWidth
              : bp === "laptop" ? card.laptopWidth
              : card.width;

  // On mobile, use dedicated mobile offsets if provided; otherwise fall back to desktop offsets
  const ox = bp === "mobile" && card.mobileOffsetX !== undefined ? card.mobileOffsetX : card.offsetX;
  const oy = bp === "mobile" && card.mobileOffsetY !== undefined ? card.mobileOffsetY : card.offsetY;

  // Laptop: scale offsets down proportionally so cards stay inside the column
  const scale = bp === "laptop" ? 0.70 : 1;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: w,
        marginLeft: -w / 2 + (bp === "mobile" ? ox : ox * scale),
        marginTop:  -80    + (bp === "mobile" ? oy : oy * scale),
        zIndex: card.zIndex,
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        willChange: "transform",
      }}
      initial={{ opacity: 0, y: 40, rotate: card.rotate, scale: 0.88 }}
      animate={
        active
          ? { opacity: 1, scale: 1, rotate: card.rotate, y: prefersReduced ? 0 : [0, -10, 0] }
          : { opacity: 0, y: 40, scale: 0.88 }
      }
      transition={{
        opacity: { delay: card.delay, duration: 0.55 },
        scale:   { delay: card.delay, duration: 0.55 },
        y: active
          ? { delay: card.delay + 0.4, duration: 4.5, repeat: Infinity, ease: "easeInOut" }
          : {},
      }}
    >
      <img src={card.image} alt="" style={{ width: "100%", display: "block", objectFit: "cover" }} draggable={false} />
    </motion.div>
  );
}

// ─── SlideContent ─────────────────────────────────────────────────────────────
function SlideContent({
  slide, isActive, navigate, current, bp,
}: {
  slide: Slide; isActive: boolean; navigate: (i: number) => void; current: number; bp: BP;
}) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate  = isActive && !prefersReduced;
  const isMobile       = bp === "mobile";
  const isLaptop       = bp === "laptop";

  const textVars: Variants = {
    hidden:  { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  // Per-breakpoint tokens for desktop/laptop only
  const hPad      = isLaptop ? "0 36px"          : "0 60px";
  const titleSize = isLaptop ? "clamp(1.1rem, 2.2vw, 1.8rem)" : "clamp(1.4rem, 3.6vw, 2.6rem)";
  const descSize  = isLaptop ? 12                : 14;
  const descMaxW  = isLaptop ? 240               : 320;
  const badgeSz   = isLaptop ? 10                : 12;
  const btnPad    = isLaptop ? "9px 18px"        : "12px 28px";
  const btnFontSz = isLaptop ? 11                : 13;
  const navGap    = isLaptop ? 16                : 28;
  const navLeft   = isLaptop ? 36                : 60;
  const navFontSz = isLaptop ? 9                 : 10;
  const logoW     = isLaptop ? 200               : 300;
  const logoTop   = isLaptop ? "42%"             : "40%";
  const logoLeft  = isLaptop ? "30%"             : "30%";

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      backgroundImage: `url(${slide.bgImage})`,
      backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden",
    }}>
      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.50)", zIndex: 0 }} />

      {/* Bg word */}
      <motion.div
        initial={{ opacity: 0 }} animate={shouldAnimate ? { opacity: 1 } : {}} transition={{ duration: 1 }}
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none", userSelect: "none",
        }}
      >
        <span style={{
          fontWeight: 900, textTransform: "uppercase",
          fontSize: "clamp(3.5rem, 18vw, 22rem)",
          color: slide.bgWordColor, lineHeight: 1, letterSpacing: "-0.08em",
        }}>
          {slide.bgWord}
        </span>
      </motion.div>

      {/* ══ MOBILE: title top ══ */}
      {isMobile && (
        <div style={{ position: "absolute", top: 100, left: 20, right: 20, zIndex: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          <motion.span custom={0} variants={textVars} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"}
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: slide.accentColor }}>
            {slide.badge}
          </motion.span>
          <motion.h1 custom={1} variants={textVars} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"}
            style={{ color: "#fff", fontWeight: 900, lineHeight: 1.15, margin: 0, fontSize: "clamp(1.4rem, 6.5vw, 2rem)" }}>
            {slide.title}<br />
            <span style={{ color: slide.accentColor }}>{slide.titleHighlight}</span>
          </motion.h1>
        </div>
      )}

      {/* ══ MOBILE: CTA bottom ══ */}
      {isMobile && (
        <motion.div custom={2} variants={textVars} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"}
          style={{ position: "absolute", bottom: 140, left: 140, zIndex: 20 }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            style={{
              padding: "10px 20px", borderRadius: 8, color: "#fff", border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
              background: `linear-gradient(to right, ${slide.accentColor}, ${slide.accentColor}99)`,
              boxShadow: `0 4px 20px ${slide.accentColor}55`,
            }}>
            CALL NOW
          </motion.button>
        </motion.div>
      )}

      {/* ══ DESKTOP / LAPTOP: 3-column grid ══ */}
      {!isMobile && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 20,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          padding: hPad,
        }}>
          {/* Col 1 — title */}
          <div style={{ display: "flex", flexDirection: "column", gap: isLaptop ? 8 : 14 }}>
            <motion.span custom={0} variants={textVars} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"}
              style={{ fontSize: badgeSz, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: slide.accentColor }}>
              {slide.badge}
            </motion.span>
            <motion.h1 custom={1} variants={textVars} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"}
              style={{ color: "#fff", fontWeight: 900, lineHeight: 1.15, margin: 0, fontSize: titleSize }}>
              {slide.title}<br />
              <span style={{ color: slide.accentColor }}>{slide.titleHighlight}</span>
            </motion.h1>
          </div>

          {/* Col 2 — stage */}
          <div style={{ position: "relative", display: "block", height: "100%" }}>
            {slide.id === 0 ? (
              <motion.img
                src="/assets/3DLogoLabNew-1-1.png" alt="StarNext Logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                style={{ position: "absolute", top: logoTop, left: logoLeft, transform: "translate(-50%, -50%)", width: logoW, objectFit: "contain" }}
                draggable={false}
              />
            ) : (
              slide.floatingCards.map(card => (
                <FloatingCardItem key={card.id} card={card} active={shouldAnimate} bp={bp} />
              ))
            )}
          </div>

          {/* Col 3 — description + CTA */}
          <motion.div custom={2} variants={textVars} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right", gap: isLaptop ? 10 : 16 }}>
            <p style={{ color: "rgba(255,255,255,0.78)", margin: 0, fontSize: descSize, lineHeight: 1.8, maxWidth: descMaxW }}>
              {slide.description}
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              style={{
                padding: btnPad, borderRadius: 8, color: "#fff", border: "none", cursor: "pointer",
                fontSize: btnFontSz, fontWeight: 700, letterSpacing: "0.08em",
                background: `linear-gradient(to right, ${slide.accentColor}, ${slide.accentColor}99)`,
                boxShadow: `0 4px 20px ${slide.accentColor}55`,
                alignSelf: "flex-end",
              }}>
              CALL NOW
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* ══ Mobile floating cards ══ */}
      {isMobile && slide.id !== 0 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
          {slide.floatingCards.map(card => (
            <FloatingCardItem key={card.id} card={card} active={shouldAnimate} bp="mobile" />
          ))}
        </div>
      )}
      {isMobile && slide.id === 0 && (
        <motion.img
          src="/assets/3DLogoLabNew-1-1.png" alt="StarNext Logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={shouldAnimate ? { opacity: 0.7, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{ position: "absolute", left: "35%", top: "45%", transform: "translate(-50%,-50%)", width: 140, objectFit: "contain", zIndex: 10, pointerEvents: "none" }}
          draggable={false}
        />
      )}

      {/* ══ Bottom service nav — desktop/laptop ══ */}
      {!isMobile && (
        <div style={{ position: "absolute", bottom: 22, left: navLeft, zIndex: 30, display: "flex", gap: navGap }}>
          {SERVICE_LABELS.map((svc, i) => (
            <button key={svc} onClick={() => navigate(i)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: navFontSz, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
              color: i === current ? slides[i].accentColor : "rgba(255,255,255,0.55)",
              borderBottom: i === current ? `1px solid ${slides[i].accentColor}` : "1px solid transparent",
              padding: "4px 0", transition: "color 0.3s, border-color 0.3s",
            }}>{svc}</button>
          ))}
        </div>
      )}

      {/* ══ Bottom service nav — mobile ══ */}
      {isMobile && (
        <div style={{
          position: "absolute", bottom: 68, left: 0, right: 0, zIndex: 30,
          display: "flex", justifyContent: "center", gap: 8, padding: "0 16px", flexWrap: "wrap",
        }}>
          {SERVICE_LABELS.map((svc, i) => (
            <button key={svc} onClick={() => navigate(i)} style={{
              background: i === current ? `${slides[i].accentColor}22` : "rgba(255,255,255,0.08)",
              border: `1px solid ${i === current ? slides[i].accentColor : "rgba(255,255,255,0.15)"}`,
              borderRadius: 20, cursor: "pointer",
              fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
              color: i === current ? slides[i].accentColor : "rgba(255,255,255,0.55)",
              padding: "4px 10px", transition: "all 0.3s", backdropFilter: "blur(8px)",
            }}>{svc}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Dot ─────────────────────────────────────────────────────────────────────
function Dot({ active, color, onClick }: { active: boolean; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label="Go to slide" style={{
      borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
      transition: "all 0.3s",
      width: active ? 20 : 7, height: 7,
      background: active ? color : "rgba(255,255,255,0.3)",
    }} />
  );
}

// ─── Arrow ────────────────────────────────────────────────────────────────────
function ArrowButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
      style={{
        position: "absolute", top: "50%", transform: "translateY(-50%)",
        [direction]: 12, zIndex: 40,
        width: 40, height: 40, borderRadius: "50%",
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", cursor: "pointer", transition: "background 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {direction === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HeroCarousel() {
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused]       = useState(false);
  const timerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bp                        = useBreakpoint();

  const navigate = useCallback((next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent((next + slides.length) % slides.length);
  }, [current]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => navigate(current + 1), 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, navigate]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(current + 1);
      if (e.key === "ArrowLeft")  navigate(current - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [current, navigate]);

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section
      style={{ position: "relative", width: "100%", height: "100svh", minHeight: "100svh", overflow: "hidden", background: "#000" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Hero carousel"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current} custom={direction} variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: "absolute", inset: 0, willChange: "transform" }}
        >
          <SlideContent slide={slides[current]} isActive navigate={navigate} current={current} bp={bp} />
        </motion.div>
      </AnimatePresence>

      <ArrowButton direction="left"  onClick={() => navigate(current - 1)} />
      <ArrowButton direction="right" onClick={() => navigate(current + 1)} />

      <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", zIndex: 40, display: "flex", alignItems: "center", gap: 8 }}>
        {slides.map((s, i) => (
          <Dot key={s.id} active={i === current} color={s.accentColor} onClick={() => navigate(i)} />
        ))}
      </div>
    </section>
  );
}