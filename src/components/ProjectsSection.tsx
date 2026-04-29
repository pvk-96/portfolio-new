'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionLabel from './SectionLabel';

function ProjectModal({ project, idx, onClose }: { project: any; idx: number; onClose: () => void }) {
  if (!project) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-[#0e0c0a]/90 z-[5000] flex items-center justify-center p-[2rem] backdrop-blur-[10px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-[var(--color-bg2)] border border-[var(--color-border-h)] rounded-[4px] p-[2.5rem] max-w-[560px] w-full shadow-[0_0_80px_rgba(0,201,167,0.2)] relative max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-[1.2rem] right-[1.2rem] bg-transparent border border-[var(--color-border-main)] text-[var(--color-text-muted)] w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-none transition-all duration-200 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
          onClick={onClose}
        >
          ✕
        </button>
        <p className="font-mono text-[0.7rem] text-[var(--color-cyan)] tracking-[0.08em] mb-[0.4rem]">
          Project.{String(idx + 1).padStart(2, '0')}
        </p>
        <h3 className="font-brutal text-[2rem] mb-[1.2rem]">{project.title}</h3>
        <p className="text-[0.9rem] text-[var(--color-text-muted)] leading-[1.7] mb-[1.5rem]">{project.description}</p>
        <p className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-[var(--color-text-dim)] mb-[0.6rem]">Tech Stack</p>
        <div className="flex flex-wrap gap-[0.4rem] mb-[1.5rem]">
          {(project.tech || []).map((t: string, i: number) => (
            <span key={i} className="font-mono text-[0.62rem] text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] border border-[rgba(0,201,167,0.2)] rounded-[2px] px-[8px] py-[3px]">
              {t}
            </span>
          ))}
        </div>
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-[8px] font-mono text-[0.75rem] tracking-[0.08em] uppercase text-[var(--color-cyan)] no-underline border border-[var(--color-cyan)] px-[18px] py-[8px] rounded-[2px] transition-all duration-300 hover:bg-[var(--color-cyan)] hover:text-[var(--color-bg)] cursor-none hover-target"
          >
            View on GitHub →
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, idx, onClick }: { project: any; idx: number; onClick: () => void }) {
  return (
    <motion.div 
      className="border border-[var(--color-border-main)] rounded-[3px] bg-[var(--color-bg2)] overflow-hidden transition-all duration-300 relative group cursor-none hover:border-[var(--color-border-h)] hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover-target"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
    >
      {/* CRT Sweep Effect */}
      <span className="absolute inset-0 bg-repeat bg-[length:100%_4px] opacity-0 -translate-y-full pointer-events-none group-hover:animate-[crtSweep_0.8s_ease_forwards]" 
        style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,201,167,0.015) 2px, rgba(0,201,167,0.015) 4px)' }} 
      />
      
      <div className="p-[1.8rem_2rem_1.4rem] border-b border-[var(--color-border-main)]">
        <p className="font-mono text-[0.62rem] text-[var(--color-cyan)] tracking-[0.1em] mb-[0.7rem]">
          Project.{String(idx + 1).padStart(2, '0')}
        </p>
        <h3 className="font-brutal text-[1.5rem] text-[var(--color-text-main)] mb-[0.5rem]">{project.title}</h3>
        <p className="text-[0.85rem] text-[var(--color-text-muted)]">{project.oneliner}</p>
      </div>
      <div className="p-[1.2rem_2rem] flex items-center justify-between gap-[0.8rem]">
        <div className="flex flex-wrap gap-[0.35rem]">
          {(project.tech || []).slice(0, 2).map((t: string, i: number) => (
            <span key={i} className="font-mono text-[0.62rem] text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] border border-[rgba(0,201,167,0.2)] rounded-[2px] px-[8px] py-[3px]">
              {t}
            </span>
          ))}
        </div>
        <button 
          className="bg-transparent border border-[var(--color-border-main)] text-[var(--color-text-muted)] font-mono text-[0.65rem] tracking-[0.08em] uppercase px-[14px] py-[6px] rounded-[2px] cursor-none transition-all duration-300 whitespace-nowrap group-hover:border-[var(--color-cyan)] group-hover:text-[var(--color-cyan)]"
        >
          Details →
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ data }: { data: any[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
      <SectionLabel label="Projects" title="Things I've" titleEm="built" />
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {data.map((proj, i) => (
          <ProjectCard key={i} project={proj} idx={i} onClick={() => setSelectedIdx(i)} />
        ))}
      </div>
      <AnimatePresence>
        {selectedIdx !== null && (
          <ProjectModal 
            project={data[selectedIdx]} 
            idx={selectedIdx} 
            onClose={() => setSelectedIdx(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
