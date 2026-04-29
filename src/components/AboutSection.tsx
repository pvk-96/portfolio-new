'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function StatBox({ stat }: { stat: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    if (!isInView) return;
    
    const raw = stat.number;
    const num = parseInt(raw);
    
    // If it's a clean number logic
    if (!isNaN(num) && !raw.includes('rd') && raw !== '∞') {
      const hasPlus = raw.includes('+');
      const start = performance.now();
      const dur = 1200;
      
      const tick = () => {
        const now = performance.now();
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        const current = Math.floor(eased * num);
        
        setDisplayValue(current + (hasPlus && t >= 1 ? '+' : ''));
        
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else {
      setDisplayValue(raw);
    }
  }, [isInView, stat.number]);

  return (
    <div ref={ref} className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded-[3px] p-[1.8rem_1.5rem] text-center transition-colors duration-300 hover:border-[var(--color-cyan)]">
      <div className="font-brutal text-[2.5rem] text-[var(--color-cyan)] leading-none mb-[0.4rem]">{displayValue}</div>
      <div className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-[var(--color-text-dim)]">{stat.label}</div>
    </div>
  );
}

export default function AboutSection({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div id="about" className="bg-[var(--color-bg2)] border-y border-[var(--color-border-main)] w-full py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[clamp(3rem,8vw,8rem)] items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-cyan)] mb-[0.8rem] flex items-center gap-[0.8rem] before:content-['//'] before:text-[var(--color-text-dim)] after:content-[''] after:flex-[0_0_60px] after:h-[1px] after:bg-[var(--color-border-main)]">
            About
          </p>
          <h2 className="font-brutal text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--color-text-main)] mb-[3rem] leading-none">
            The person <em className="font-script italic text-[var(--color-cyan)] text-[1.1em]">behind</em> the code
          </h2>
          <div className="text-[0.92rem] text-[var(--color-text-muted)] leading-[1.9] space-y-4">
            {data.bio.split('\n').filter((p: string) => p.trim()).map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-[1.4rem]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {(data.stats || []).map((s: any, i: number) => (
            <StatBox key={i} stat={s} />
          ))}
        </motion.div>

      </div>
    </div>
  );
}
