'use client';

import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';

function CertCard({ cert }: { cert: any }) {
  return (
    <motion.div 
      className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded-[3px] p-[1.6rem_1.8rem] relative overflow-hidden transition-all duration-300 hover:border-[var(--color-border-h)] hover:-translate-y-[3px] group hover-target"
      style={{ boxShadow: 'var(--hover-shadow)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
    >
      <style>{`
        .group:hover { --hover-shadow: 0 0 30px rgba(0,201,167,0.10); }
      `}</style>
      
      {/* Dot */}
      <span className="absolute top-[1rem] right-[1rem] w-[4px] h-[4px] bg-[var(--color-cyan)] rounded-full opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:scale-150" />
      
      {/* Icon */}
      <div className="w-[44px] h-[44px] bg-[var(--color-cyan-dim)] border border-[var(--color-border-main)] rounded-full flex items-center justify-center mb-[1.2rem] flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5"/><path d="M8.56 13.9L7 22l5-3 5 3-1.56-8.1"/>
        </svg>
      </div>

      <div className="font-brutal text-[1.2rem] text-[var(--color-text-main)] mb-[0.3rem] leading-[1.1]">{cert.title}</div>
      <div className="font-mono text-[0.72rem] text-[var(--color-cyan)] tracking-[0.04em] mb-[0.8rem]">{cert.issuer}</div>
      <span className="inline-flex bg-[var(--color-cyan-dim)] border border-[var(--color-border-main)] rounded-full px-[12px] py-[3px] font-mono text-[0.65rem] text-[var(--color-cyan)] tracking-[0.08em]">
        {cert.year}
      </span>
    </motion.div>
  );
}

export default function CertificationsSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="certifications" className="py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
      <SectionLabel label="Certifications" title="Things I've" titleEm="earned" />
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[1.2rem]">
        {data.map((cert, i) => (
          <CertCard key={i} cert={cert} />
        ))}
      </div>
    </section>
  );
}
