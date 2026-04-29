'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from './SectionLabel';

export default function ContactSection({ data }: { data: any }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.formspree || data.formspree.includes('YOUR_FORM_ID')) {
      setStatus('error');
      return;
    }
    
    setStatus('sending');
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const res = await fetch(data.formspree, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('idle');
        alert("Failed to send the message. Please try again.");
      }
    } catch {
      setStatus('idle');
      alert("Network error. Please try again.");
    }
  };

  if (!data) return null;

  return (
    <section id="contact" className="border-t border-[var(--color-border-main)] py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
      <SectionLabel label="Contact" title="Let's" titleEm="connect" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(3rem,8vw,8rem)] items-start mt-[3rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[0.9rem] text-[var(--color-text-muted)] leading-[1.8] mb-[2rem]">{data.copy}</p>
          <div className="flex flex-col gap-[1rem]">
            <a href={`mailto:${data.email}`} className="flex items-center gap-[12px] font-mono text-[0.78rem] text-[var(--color-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-cyan)] group hover-target">
              <span className="w-[36px] h-[36px] border border-[var(--color-border-main)] rounded-[3px] flex items-center justify-center text-[0.9rem] transition-all duration-200 flex-shrink-0 group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_0_12px_var(--color-cyan-dim)]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 4 10 9 10-9"/></svg>
              </span>
              {data.email}
            </a>
            <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-[12px] font-mono text-[0.78rem] text-[var(--color-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-cyan)] group hover-target">
              <span className="w-[36px] h-[36px] border border-[var(--color-border-main)] rounded-[3px] flex items-center justify-center text-[0.9rem] transition-all duration-200 flex-shrink-0 group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_0_12px_var(--color-cyan-dim)]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </span>
              github.com/{data.github.split('/').pop()}
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-[12px] font-mono text-[0.78rem] text-[var(--color-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-cyan)] group hover-target">
              <span className="w-[36px] h-[36px] border border-[var(--color-border-main)] rounded-[3px] flex items-center justify-center text-[0.9rem] transition-all duration-200 flex-shrink-0 group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_0_12px_var(--color-cyan-dim)]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </span>
              LinkedIn Profile
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {status === 'success' ? (
            <div className="text-center p-[2rem] border border-[var(--color-cyan)] rounded-[3px] bg-[var(--color-cyan-dim)] font-mono text-[0.82rem] text-[var(--color-cyan)] tracking-[0.05em]">
              ✓ Message sent! I'll get back to you soon.
            </div>
          ) : status === 'error' ? (
             <div className="text-center p-[2rem] border border-[var(--color-cyan)] rounded-[3px] bg-[var(--color-cyan-dim)] font-mono text-[0.82rem] text-[var(--color-cyan)] tracking-[0.05em]">
               ⚠ Formspree not configured. Set your endpoint in Admin → Contact.
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-[var(--color-text-dim)]">Your Name</label>
                <input name="name" required placeholder="John Doe" className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded-[2px] p-[11px_15px] font-body text-[0.88rem] text-[var(--color-text-main)] outline-none transition-all duration-300 focus:border-[var(--color-cyan)] focus:shadow-[0_0_0_3px_var(--color-cyan-dim)]" />
              </div>
              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-[var(--color-text-dim)]">Email</label>
                <input name="email" type="email" required placeholder="john@example.com" className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded-[2px] p-[11px_15px] font-body text-[0.88rem] text-[var(--color-text-main)] outline-none transition-all duration-300 focus:border-[var(--color-cyan)] focus:shadow-[0_0_0_3px_var(--color-cyan-dim)]" />
              </div>
              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-[var(--color-text-dim)]">Message</label>
                <textarea name="message" required placeholder="Tell me about your project or opportunity..." className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded-[2px] p-[11px_15px] font-body text-[0.88rem] text-[var(--color-text-main)] outline-none transition-all duration-300 focus:border-[var(--color-cyan)] focus:shadow-[0_0_0_3px_var(--color-cyan-dim)] min-h-[120px] resize-none" />
              </div>
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-[10px] p-[13px_28px] bg-[var(--color-cyan)] text-[var(--color-bg)] font-mono text-[0.78rem] tracking-[0.1em] uppercase border-none rounded-[2px] cursor-none transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_28px_var(--color-cyan-glow)] disabled:opacity-70 disabled:cursor-auto hover-target"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
