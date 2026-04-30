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
          
          {/* Status & Category with brighter text and glow */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
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
          <h2 
            className="font-brutal text-[1.8rem] md:text-[2.2rem] text-white mb-3"
            style={{ textShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 16px rgba(255,255,255,0.2)' }}
          >
            {milestone.title}
          </h2>
          
          {/* Date - brighter */}
          <p 
            className="font-mono text-[0.75rem] text-white/90 mb-6"
            style={{ textShadow: '0 0 6px rgba(255,255,255,0.3)' }}
          >
            {milestone.date}
          </p>
          
          {/* Description - brighter */}
          <div className="text-[0.92rem] text-[var(--color-text-main)] leading-[1.8] mb-6">
            {milestone.description.split('\n').map((p: string, i: number) => (
              <p key={i} className="mb-2">{p}</p>
            ))}
          </div>
          
          {/* Tags - brighter with glow */}
          {milestone.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {milestone.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[var(--color-cyan)]/15 text-[var(--color-cyan)] text-[0.65rem] font-mono rounded-[3px] border border-[var(--color-cyan)]/40"
                  style={{ textShadow: '0 0 8px var(--color-cyan), 0 0 16px var(--color-cyan-glow)' }}
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
