'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroSection({ data }: { data: any }) {
  // Split name for styling the last part
  const nameParts = data.name.split(' ');
  const lastName = nameParts.pop();
  const restName = nameParts.join(' ');

  // Split tagline around em-dash
  let tagStart = data.tagline;
  let tagEnd = '';
  const dashIdx = data.tagline.indexOf('—');
  if (dashIdx > -1) {
    tagStart = data.tagline.slice(0, dashIdx + 1);
    tagEnd = data.tagline.slice(dashIdx + 2);
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-[clamp(1.5rem,7vw,7rem)] overflow-hidden bg-transparent pt-16">
      <HeroScene />
      
      <div className="relative z-10 max-w-[1000px] w-full mt-[-5vh]">
        {/* Status / Glitch */}
        <motion.p 
          className="font-mono text-[clamp(0.62rem,1.2vw,0.78rem)] tracking-[0.18em] uppercase text-[var(--color-primary-green)] mb-[1.6rem] inline-block relative origin-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {data.greeting}
          {/* Glitch pseudo-hack using an absolute span */}
          <span 
            className="absolute inset-0 text-[var(--color-cyan)] mix-blend-screen pointer-events-none"
            style={{ animation: 'glitchBurst 3.5s steps(1) 0.8s infinite', clipPath: 'inset(0 100% 0 0)' }}
            aria-hidden="true"
          >
            {data.greeting}
          </span>
        </motion.p>

        {/* Title */}
        <motion.h1 
          className="font-brutal text-[clamp(4rem,14vw,12rem)] leading-[0.92] tracking-[0.01em] text-[var(--color-text-main)] uppercase mb-[1.8rem]"
        >
          <motion.span 
            initial={{ opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="block"
          >
            {restName} <span className="text-[var(--color-cyan)]">{lastName}</span>
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          className="font-script italic text-[clamp(1.3rem,3.5vw,2.2rem)] font-light text-[var(--color-text-muted)] mb-[3rem]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {tagStart} <span className="text-[var(--color-text-main)]">{tagEnd}</span>
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-[1rem]">
          <motion.a 
            href="#projects"
            className="inline-flex items-center gap-[10px] px-[28px] py-[13px] border border-[var(--color-cyan)] text-[var(--color-cyan)] font-mono text-[0.75rem] tracking-[0.12em] uppercase no-underline rounded-[2px] transition-all duration-300 relative overflow-hidden group hover:text-[var(--color-bg)] hover-target"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <span className="absolute inset-0 bg-[var(--color-cyan)] scale-x-0 origin-left transition-transform duration-350 z-[-1] group-hover:scale-x-100" />
            View My Work 
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>

          <motion.a 
            href="/api/download/resume"
            className="inline-flex items-center gap-[10px] px-[28px] py-[13px] bg-[var(--color-cyan)] text-[var(--color-bg)] font-mono text-[0.75rem] tracking-[0.12em] uppercase no-underline rounded-[2px] transition-all duration-300 relative overflow-hidden hover:brightness-110 hover:shadow-[0_0_28px_var(--color-cyan-glow)] hover-target"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            Resume 
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-[2.5rem] right-[clamp(1.5rem,7vw,7rem)] flex flex-col items-end gap-[8px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <span className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-[var(--color-text-dim)]">Scroll</span>
        <div className="w-[40px] h-[1px] bg-[var(--color-cyan)] opacity-100 transition-opacity" style={{ animation: 'cblink 2s ease infinite' }} />
      </motion.div>
    </section>
  );
}
