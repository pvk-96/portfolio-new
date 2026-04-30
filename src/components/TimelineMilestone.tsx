'use client';

import { motion } from 'framer-motion';

interface Milestone {
  id: string;
  date: string;
  title: string;
  category: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  tags: string[];
  order: number;
}

interface TimelineMilestoneProps {
  milestone: Milestone;
  index: number;
  totalCount: number;
  onSelect: (m: Milestone) => void;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  'completed': { bg: 'bg-[var(--color-primary-green)]/30', text: 'text-[var(--color-primary-green)]', border: 'border-[var(--color-primary-green)]/60', glow: '0 0 8px var(--color-primary-green), 0 0 16px rgba(0,255,136,0.4)' },
  'in-progress': { bg: 'bg-yellow-500/30', text: 'text-yellow-300', border: 'border-yellow-500/60', glow: '0 0 8px #facc15, 0 0 16px rgba(250,204,21,0.4)' },
  'planned': { bg: 'bg-[var(--color-text-dim)]/30', text: 'text-white', border: 'border-[var(--color-text-dim)]/60', glow: '0 0 8px rgba(255,255,255,0.3), 0 0 16px rgba(255,255,255,0.15)' },
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  'project': { bg: 'bg-[var(--color-cyan)]/20', text: 'text-[var(--color-cyan)]', border: 'border-[var(--color-cyan)]/60', glow: '0 0 8px var(--color-cyan), 0 0 16px var(--color-cyan-glow)' },
  'learning': { bg: 'bg-[var(--color-primary-green)]/20', text: 'text-[var(--color-primary-green)]', border: 'border-[var(--color-primary-green)]/60', glow: '0 0 8px var(--color-primary-green), 0 0 16px rgba(0,255,136,0.4)' },
  'achievement': { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-500/60', glow: '0 0 8px #facc15, 0 0 16px rgba(250,204,21,0.4)' },
  'career': { bg: 'bg-[var(--color-cyan)]/20', text: 'text-[var(--color-cyan)]', border: 'border-[var(--color-cyan)]/60', glow: '0 0 8px var(--color-cyan), 0 0 16px var(--color-cyan-glow)' },
  'default': { bg: 'bg-[var(--color-text-dim)]/20', text: 'text-white', border: 'border-[var(--color-text-dim)]/60', glow: '0 0 8px rgba(255,255,255,0.3), 0 0 16px rgba(255,255,255,0.15)' },
};

export default function TimelineMilestone({ milestone, index, totalCount, onSelect }: TimelineMilestoneProps) {
  const statusStyle = STATUS_COLORS[milestone.status] || STATUS_COLORS['planned'];
  const categoryStyle = CATEGORY_COLORS[milestone.category.toLowerCase()] || CATEGORY_COLORS['default'];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline node */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${statusStyle.bg} border-2 ${statusStyle.border} z-10`} />
        {index < totalCount - 1 && (
          <div className="w-[2px] flex-1 bg-[var(--color-border-main)] mt-2" />
        )}
      </div>
      
      {/* Content Card with permanent neon-cyan glow */}
      <div
        onClick={() => onSelect(milestone)}
        className={`flex-1 p-4 md:p-5 border border-[var(--color-border-main)] rounded-[6px] bg-[var(--color-bg2)] hover:border-[var(--color-cyan)] transition-all duration-300 cursor-none group hover:-translate-y-1`}
        style={{ boxShadow: '0 0 20px rgba(0,201,167,0.12), 0 0 40px rgba(0,201,167,0.06)' }}
      >
        {/* Status & Category badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span 
            className={`px-3 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-[0.12em] ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}
            style={{ textShadow: statusStyle.glow }}
          >
            {milestone.status.replace('-', ' ')}
          </span>
          <span 
            className={`px-3 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-[0.12em] ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} border`}
            style={{ textShadow: categoryStyle.glow }}
          >
            {milestone.category}
          </span>
        </div>
        
        {/* Title - brightest white with glow */}
        <h3 className="font-brutal text-[1.3rem] md:text-[1.5rem] text-white mb-2 group-hover:text-[var(--color-cyan)] transition-colors"
            style={{ textShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 16px rgba(255,255,255,0.2)' }}
        >
          {milestone.title}
        </h3>
        
        {/* Date - brighter with glow */}
        <p className="font-mono text-[0.75rem] text-white/90"
           style={{ textShadow: '0 0 6px rgba(255,255,255,0.3)' }}
        >
          {milestone.date}
        </p>
      </div>
    </motion.div>
  );
}
