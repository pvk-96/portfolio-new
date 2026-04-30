'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface MilestoneModalProps {
  milestone: Milestone | null;
  onClose: () => void;
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

export default function MilestoneModal({ milestone, onClose }: MilestoneModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!milestone) return null;

  const statusStyle = STATUS_COLORS[milestone.status] || STATUS_COLORS['planned'];
  const categoryStyle = CATEGORY_COLORS[milestone.category.toLowerCase()] || CATEGORY_COLORS['default'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99998] bg-[#0e0c0a]/80 backdrop-blur-[5px] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative max-w-[90vw] max-h-[80vh] w-full max-w-[600px] bg-[var(--color-bg2)] border-2 border-[var(--color-cyan)] rounded-[12px] p-6 md:p-8 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--color-bg)] border-2 border-[var(--color-cyan)] rounded-full text-[var(--color-cyan)] flex items-center justify-center text-lg hover:bg-[var(--color-bg2)] transition-colors cursor-none"
            style={{ boxShadow: '0 0 10px var(--color-cyan-glow)' }}
          >
            ×
          </button>
          
          {/* Status & Category */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-[0.6rem] font-mono uppercase tracking-[0.1em] ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
              {milestone.status.replace('-', ' ')}
            </span>
            <span className={`px-3 py-1 rounded-full text-[0.6rem] font-mono uppercase tracking-[0.1em] ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} border`}>
              {milestone.category}
            </span>
          </div>
          
          {/* Title */}
          <h2 className="font-brutal text-[1.8rem] md:text-[2.2rem] text-[var(--color-text-main)] mb-3">
            {milestone.title}
          </h2>
          
          {/* Date */}
          <p className="font-mono text-[0.75rem] text-[var(--color-text-dim)] mb-6">
            {milestone.date}
          </p>
          
          {/* Description */}
          <div className="text-[0.92rem] text-[var(--color-text-muted)] leading-[1.8] mb-6">
            {milestone.description.split('\n').map((p: string, i: number) => (
              <p key={i} className="mb-2">{p}</p>
            ))}
          </div>
          
          {/* Tags */}
          {milestone.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {milestone.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] text-[0.65rem] font-mono rounded-[3px] border border-[var(--color-cyan)]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
