"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#020617] overflow-hidden flex flex-col justify-center items-center text-white font-sans">
      
      {/* Background Layer: Deep Space Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_70%)]" />

      {/* Floating Stars / Particles (Subtle Animation) */}
      <div className="absolute inset-0 z-10 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, scale: 0.5 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration: Math.random() * 5 + 3, 
              repeat: Infinity,
              delay: Math.random() * 5 
            }}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
        
        {/* Left Side: Headline & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6 text-center lg:text-left"
        >
          <div className="space-y-2">
            <h2 className="text-cyan-400 font-medium tracking-widest text-sm uppercase">Best Digital Agency</h2>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Elevate Your <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Digital Presence</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto lg:mx-0">
            From Web Design and App Development to Social Media & SEO, we provide end-to-end digital solutions.
          </p>
          <div className="pt-4">
            <Link href="/contact" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              CALL NOW
            </Link>
          </div>
        </motion.div>

        {/* Center: Hero Logo (Floating Animation) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center"
        >
          {/* Logo Glow */}
          <div className="absolute w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
          
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-64 md:w-80"
          >
            {/* Replace with your StarNext Logo Image */}
            <img 
              src="/img/star-img.png" 
              alt="StarNext" 
              className="w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            />
          </motion.div>
        </motion.div>

        {/* Right Side: Description */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden lg:flex flex-col text-right space-y-6"
        >
          <p className="text-slate-300 text-sm leading-relaxed tracking-wide ml-auto max-w-[300px]">
            WITH YEARS OF EXPERIENCE IN DIGITAL AND DEVELOPMENT INDUSTRY, STARNEXT SOFTECH DELIVERS FULFILLING DREAMS AND NEEDS.
          </p>
          <div className="flex flex-col space-y-2 text-xs font-semibold tracking-tighter text-slate-500 uppercase">
            <span>Web Development</span>
            <span>Mobile Applications</span>
            <span>SEO & Marketing</span>
            <span>UI/UX Design</span>
          </div>
        </motion.div>
      </div>

      {/* Foreground: Rocky Terrain (Bottom Overlay) */}
      <div className="absolute bottom-0 w-full z-30 pointer-events-none">
        <img 
          src="/rocks-foreground.png" 
          alt="Terrain" 
          className="w-full object-cover translate-y-12"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent h-32" />
      </div>

    </section>
  );
};

export default HeroSection;