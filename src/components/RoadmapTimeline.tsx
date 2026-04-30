'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineMilestone from './TimelineMilestone';
import MilestoneModal from './MilestoneModal';

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

interface RoadmapTimelineProps {
  milestones: Milestone[];
}

export default function RoadmapTimeline({ milestones }: RoadmapTimelineProps) {
  const [selected, setSelected] = useState<Milestone | null>(null);

  if (!milestones || milestones.length === 0) {
    return (
      <div className="text-center py-20 font-mono text-[var(--color-text-dim)]">
        No milestones yet. Check back soon!
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] md:left-[7px] top-0 bottom-0 w-[2px] bg-[var(--color-border-main)]" />
        
        {/* Milestones */}
        <div className="flex flex-col gap-8 md:gap-10 relative z-10 pl-[30px] md:pl-[30px]">
          {milestones.map((m, i) => (
            <TimelineMilestone
              key={m.id}
              milestone={m}
              index={i}
              totalCount={milestones.length}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>
      
      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <MilestoneModal milestone={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
