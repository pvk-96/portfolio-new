'use client';

import { motion } from 'framer-motion';

export default function SectionLabel({ label, title, titleEm }: { label: string; title: string; titleEm?: string }) {
  return (
    <>
      <motion.p 
        className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-cyan)] mb-[0.8rem] flex items-center gap-[0.8rem] before:content-['//'] before:text-[var(--color-text-dim)] after:content-[''] after:flex-[0_0_60px] after:h-[1px] after:bg-[var(--color-border-main)]"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.p>
      <motion.h2 
        className="font-brutal text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--color-text-main)] mb-[3rem] leading-none"
        initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title} {titleEm && <em className="font-script italic text-[var(--color-cyan)] text-[1.1em]">{titleEm}</em>}
      </motion.h2>
    </>
  );
}
