'use client';

import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { useState, useEffect } from 'react';

// Bullet component to handle the typewriter effect on hover
function Bullet({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (isHovered) {
      setDisplayText('');
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, 14);
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [isHovered, text]);

  return (
    <li className="text-[0.87rem] text-[var(--color-text-main)] pl-[1.2rem] relative before:content-['▸'] before:absolute before:left-0 before:text-[var(--color-cyan)] before:text-[0.7rem] before:top-[0.15rem]">
      {displayText}
    </li>
  );
}

function ExperienceCard({ exp }: { exp: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="border border-[var(--color-border-main)] rounded-[3px] p-[2rem_2.5rem] bg-[var(--color-bg2)] relative overflow-hidden transition-all duration-300 hover:border-[var(--color-cyan)] group hover-target"
      style={{ boxShadow: '0 0 20px rgba(0,201,167,0.12), 0 0 40px rgba(0,201,167,0.06)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-[-2.35rem] top-[2.5rem] w-[12px] h-[12px] bg-[var(--color-cyan)] rounded-full border-[3px] border-[var(--color-bg2)] shadow-[0_0_12px_var(--color-cyan-glow)]" />
      
       <div className="absolute top-0 left-0 w-[3px] h-full bg-[var(--color-cyan)] scale-y-0 origin-top transition-transform duration-400 ease-out group-hover:scale-y-100" />
       
       <div className="flex justify-between items-start flex-wrap gap-[0.5rem] mb-[0.6rem]">
         <div>
           <div className="font-brutal text-[1.4rem] text-white">{exp.role}</div>
           <div className="font-mono text-[0.75rem] text-[var(--color-cyan)] tracking-[0.05em] mb-[0.6rem]">{exp.company}</div>
         </div>
         <div className="font-mono text-[0.7rem] text-[var(--color-text-muted)] tracking-[0.05em] whitespace-nowrap">{exp.period}</div>
       </div>
      
      {exp.remote && (
        <span className="inline-flex items-center gap-[5px] font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-text-muted)] border border-[var(--color-text-dim)] rounded-full px-[10px] py-[2px] mb-[0.9rem]">
          ⬤ Remote
        </span>
      )}

      <ul className="list-none flex flex-col gap-[0.45rem]">
        {exp.bullets.map((b: string, i: number) => (
          <Bullet key={i} text={b} isHovered={isHovered} />
        ))}
      </ul>
    </motion.div>
  );
}

export default function ExperienceSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="experience" className="py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
      <SectionLabel label="Experience" title="Where I've" titleEm="worked" />
      <div className="relative">
        {/* Vertical timeline column */}
        <div className="absolute left-[1.25rem] top-0 bottom-0 w-[2px] bg-[var(--color-cyan)] opacity-80" 
             style={{ boxShadow: '0 0 12px var(--color-cyan), 0 0 24px var(--color-cyan), 0 0 48px var(--color-cyan-glow), 0 0 72px rgba(0,201,167,0.4)' }} 
        />
        <div className="flex flex-col gap-[1.5rem] pl-[3rem]">
          {data.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
