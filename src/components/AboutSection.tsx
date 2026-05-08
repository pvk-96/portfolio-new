'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import GitHubHeatmap from './GitHubHeatmap';

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
            src="/pfp.jpg"
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
                <div className="mt-10 p-6 border-2 border-transparent rounded-[8px] bg-[var(--color-bg3)]/60 backdrop-blur-[4px] relative overflow-hidden" style={{ background: 'linear-gradient(var(--color-bg3), var(--color-bg3)) padding-box, linear-gradient(135deg, var(--color-cyan), var(--color-primary-green), var(--color-cyan)) border-box' }}>
                  <div className="absolute inset-0 bg-[var(--color-cyan)]/5 animate-pulse"></div>
                  <h3 className="font-mono text-[0.85rem] tracking-[0.25em] uppercase text-[var(--color-cyan)] mb-6 flex items-center gap-4 relative z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    Hackathons Organized
                    <span className="ml-auto text-[0.6rem] bg-[var(--color-primary-green)]/20 text-[var(--color-primary-green)] px-3 py-1 rounded-full border border-[var(--color-primary-green)]/30">⭐ Organizer</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                    {data.hackathons.map((h: any, i: number) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-[var(--color-border-main)] rounded-[8px] bg-[var(--color-bg2)] hover:border-[var(--color-cyan)] hover:shadow-[0_0_25px_var(--color-cyan-glow)] transition-all duration-300 transform hover:-translate-y-1 aspect-square text-center"
                      >
                        <div className="w-16 h-16 rounded-[8px] bg-[var(--color-cyan)]/15 flex items-center justify-center shadow-[0_0_15px_var(--color-cyan-dim)]">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                        </div>
                        <div>
                          <div className="font-mono text-[0.9rem] text-[var(--color-text-main)] font-semibold mb-2">{h.name}</div>
                          <div className="font-mono text-[0.65rem] text-[var(--color-text-dim)] leading-relaxed">
                            <span className="inline-block px-3 py-1 bg-[var(--color-cyan)]/15 text-[var(--color-cyan)] rounded-[3px] text-[0.6rem] border border-[var(--color-cyan)]/30 mb-2">{h.role}</span>
                            <br />
                            {h.venue} • {h.year}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-10 p-6 border-2 border-transparent rounded-[8px] bg-[var(--color-bg3)]/60 backdrop-blur-[4px] relative overflow-hidden" style={{ background: 'linear-gradient(var(--color-bg3), var(--color-bg3)) padding-box, linear-gradient(135deg, var(--color-cyan), var(--color-primary-green), var(--color-cyan)) border-box' }}>
                <div className="absolute inset-0 bg-[var(--color-cyan)]/5 animate-pulse"></div>
                <h3 className="font-mono text-[0.85rem] tracking-[0.25em] uppercase text-[var(--color-cyan)] mb-4 flex items-center gap-3 relative z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.02-.241 1.061-.036 2.065-.786 2.823-1.974 0 0 1.461-.461 4.114.949 1.347-.376 2.811-.965 4.114-.949 1.012-.081 2.02.241 2.02.241.653 1.653.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Activity
                  <span className="ml-auto text-[0.6rem] bg-[var(--color-primary-green)]/20 text-[var(--color-primary-green)] px-3 py-1 rounded-full border border-[var(--color-primary-green)]/30">Live Data</span>
                </h3>
                <div className="relative z-10">
                  <GitHubHeatmap username="pvk-96" />
                </div>
              </div>
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
