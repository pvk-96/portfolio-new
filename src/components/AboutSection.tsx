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
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[clamp(2rem,6vw,4rem)] items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <img
            src="/pfp.jpeg"
            alt="Praneeth Varma K"
            className="w-[280px] h-[280px] rounded-[8px] object-cover border-2 border-[var(--color-cyan)]"
            style={{ boxShadow: '0 0 40px var(--color-cyan-glow)' }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(3rem,8vw,8rem)] items-center w-full">
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
              
              {data.hackathons && data.hackathons.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-[var(--color-cyan)] mb-3">Hackathons Organized</h3>
                  <div className="flex flex-col gap-3">
                    {data.hackathons.map((h: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 border border-[var(--color-border-main)] rounded-[3px] bg-[var(--color-bg3)] hover:border-[var(--color-cyan)] transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <div>
                          <div className="font-mono text-[0.82rem] text-[var(--color-text-main)]">{h.name}</div>
                          <div className="font-mono text-[0.65rem] text-[var(--color-text-dim)]">{h.role} • {h.venue} • {h.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
    </div>
  );
}
