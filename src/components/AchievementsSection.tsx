'use client';

import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';

function AchievementCard({ ac }: { ac: any }) {
  return (
    <motion.div 
      className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded-[3px] p-[2rem] relative overflow-hidden transition-all duration-300 hover:border-[var(--color-border-h)] hover:shadow-[0_10px_40px_rgba(0,201,167,0.06)] group hover-target"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute left-0 top-0 w-[4px] h-full bg-[var(--color-cyan)] scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-[1rem] mb-[1.5rem]">
        <div>
          <h3 className="font-brutal text-[1.6rem] text-[var(--color-text-main)] mb-[0.2rem]">{ac.title}</h3>
          <p className="font-mono text-[0.75rem] text-[var(--color-cyan)] tracking-[0.05em] uppercase">{ac.event}</p>
        </div>
        <span className="inline-block bg-[var(--color-cyan-dim)] border border-[var(--color-border-main)] rounded-full px-[14px] py-[4px] font-mono text-[0.7rem] text-[var(--color-cyan)] tracking-[0.1em]">
          {ac.date}
        </span>
      </div>
      
      <p className="text-[0.9rem] text-[var(--color-text-muted)] leading-[1.7] mb-[1.5rem]">
        {ac.description}
      </p>

      {ac.link && (
        <a 
          href={ac.link} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-[8px] font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-cyan)] hover:text-[var(--color-primary-green)] transition-colors hover-target"
        >
          View Proof / Details →
        </a>
      )}
    </motion.div>
  );
}

export default function AchievementsSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="achievements" className="py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
      <SectionLabel label="Achievements" title="Milestones &" titleEm="Wins" />
      <div className="flex flex-col gap-[1.5rem]">
        {data.map((ac, i) => (
          <AchievementCard key={i} ac={ac} />
        ))}
      </div>
    </section>
  );
}
