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

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'completed': { bg: 'bg-[var(--color-primary-green)]/20', text: 'text-[var(--color-primary-green)]', border: 'border-[var(--color-primary-green)]/40' },
  'in-progress': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/40' },
  'planned': { bg: 'bg-[var(--color-text-dim)]/20', text: 'text-[var(--color-text-dim)]', border: 'border-[var(--color-text-dim)]/40' },
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'project': { bg: 'bg-[var(--color-cyan)]/10', text: 'text-[var(--color-cyan)]', border: 'border-[var(--color-cyan)]/30' },
  'learning': { bg: 'bg-[var(--color-primary-green)]/10', text: 'text-[var(--color-primary-green)]', border: 'border-[var(--color-primary-green)]/30' },
  'achievement': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  'career': { bg: 'bg-[var(--color-cyan)]/10', text: 'text-[var(--color-cyan)]', border: 'border-[var(--color-cyan)]/30' },
  'default': { bg: 'bg-[var(--color-text-dim)]/10', text: 'text-[var(--color-text-dim)]', border: 'border-[var(--color-text-dim)]/30' },
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
      
      {/* Content Card */}
      <div
        onClick={() => onSelect(milestone)}
        className={`flex-1 p-4 md:p-5 border border-[var(--color-border-main)] rounded-[6px] bg-[var(--color-bg2)] hover:border-[var(--color-cyan)] hover:shadow-[0_0_20px_var(--color-cyan-dim)] transition-all duration-300 cursor-none group hover:-translate-y-1`}
      >
        {/* Status & Category badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-[0.6rem] font-mono uppercase tracking-[0.1em] ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
            {milestone.status.replace('-', ' ')}
          </span>
          <span className={`px-3 py-1 rounded-full text-[0.6rem] font-mono uppercase tracking-[0.1em] ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} border`}>
            {milestone.category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-brutal text-[1.3rem] md:text-[1.5rem] text-[var(--color-text-main)] mb-2 group-hover:text-[var(--color-cyan)] transition-colors">
          {milestone.title}
        </h3>
        
        {/* Date */}
        <p className="font-mono text-[0.7rem] text-[var(--color-text-dim)]">
          {milestone.date}
        </p>
      </div>
    </motion.div>
  );
}
