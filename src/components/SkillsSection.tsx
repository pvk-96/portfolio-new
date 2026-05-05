'use client';

import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { useState } from 'react';

type SkillItem = string | { name: string; usedInProject?: boolean; usage?: string; status?: string };

function SkillTag({ item }: { item: SkillItem }) {
  const [text, setText] = useState(typeof item === 'string' ? item : item.name);
  const [compiled, setCompiled] = useState(false);

  const isExploring = typeof item !== 'string' && (item.status === 'exploring' || !item.usedInProject);
  const displayName = typeof item === 'string' ? item : item.name;

  const handleEnter = () => {
    if (typeof item === 'string') {
      setText('compiling...');
      setTimeout(() => {
        setText(item);
        setCompiled(true);
      }, 400);
    } else {
      setText(item.usage || item.name);
      setCompiled(true);
    }
  };

  const handleLeave = () => {
    setText(displayName);
    setCompiled(false);
  };

  return (
    <span
      className={`font-mono text-[0.72rem] border rounded-[2px] px-[12px] py-[5px] transition-all duration-200 hover-target cursor-none select-none
        ${compiled
          ? 'text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] border-[rgba(0,201,167,0.35)]'
          : isExploring
            ? 'text-[var(--color-text-dim)] bg-[var(--color-bg3)] border-[var(--color-border-main)] opacity-60'
            : 'text-[var(--color-text-muted)] bg-[var(--color-bg3)] border-[var(--color-border-main)] hover:text-[var(--color-cyan)] hover:bg-[var(--color-cyan-dim)] hover:border-[rgba(0,201,167,0.35)]'
        }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      title={typeof item !== 'string' && item.usage ? item.usage : undefined}
    >
      {isExploring && <span className="mr-[4px] opacity-50">○</span>}
      {text}
    </span>
  );
}

function SkillCategory({ skill }: { skill: any }) {
  // Handle both Sanity format (categories array) and legacy format
  const categoryName = skill.category || skill.title || '';
  const items = skill.items || [];

  return (
    <motion.div
      className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded-[3px] p-[1.8rem] transition-all duration-300 hover:border-[var(--color-border-h)] hover:shadow-[0_0_28px_rgba(0,201,167,0.07)]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-[0.68rem] tracking-[0.15em] uppercase text-[var(--color-cyan)] mb-[1.1rem]">
        {categoryName}
      </p>
      <div className="flex flex-wrap gap-[0.5rem]">
        {items.map((item: SkillItem, idx: number) => (
          <SkillTag key={idx} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection({ data }: { data: any }) {
  // Handle both Sanity format (data.categories) and legacy array format
  const categories = data?.categories || (Array.isArray(data) ? data : []);
  if (!categories || categories.length === 0) return null;

  return (
    <section id="skills" className="py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
      <SectionLabel label="Skills" title="My" titleEm="toolkit" />
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[1.5rem]">
        {categories.map((skill: any, i: number) => (
          <SkillCategory key={i} skill={skill} />
        ))}
      </div>
    </section>
  );
}
