'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const [showPfp, setShowPfp] = useState(false);

  const links = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[clamp(1.5rem,5vw,3.5rem)] h-[60px] bg-[#0e0c0a]/90 backdrop-blur-[18px] border-b border-[var(--color-border-main)]">
        <button
          onClick={() => setShowPfp(!showPfp)}
          className="flex items-center gap-[11px] text-[var(--color-text-main)] no-underline hover-target bg-transparent border-none cursor-none"
        >
          {data.photoUrl ? (
            <img src={data.photoUrl} alt="Avatar" className="w-[36px] h-[36px] rounded-full border-[1.5px] border-[var(--color-cyan)] object-cover flex-shrink-0" style={{ boxShadow: '0 0 10px var(--color-cyan-glow)' }} />
          ) : (
            <div className="w-[36px] h-[36px] rounded-full border-[1.5px] border-[var(--color-cyan)] flex items-center justify-center bg-[var(--color-cyan-dim)] text-[var(--color-cyan)] text-xs font-mono" style={{ boxShadow: '0 0 10px var(--color-cyan-glow)' }}>PK</div>
          )}
          <span className="font-mono text-[0.78rem] tracking-[0.06em]">{data.name}</span>
        </button>
        <ul className="hidden md:flex items-center gap-[clamp(1rem,3vw,2.5rem)] list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`font-mono text-[0.68rem] tracking-[0.1em] uppercase no-underline transition-colors duration-250 relative pb-1 hover-target ${activeHash === link.href ? 'text-[var(--color-cyan)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-cyan)] group'}`}
                onClick={() => setActiveHash(link.href)}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-cyan)] transition-transform duration-300 origin-left ${activeHash === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            </li>
          ))}
        </ul>
        <button 
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none p-1 z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-[22px] h-[1px] bg-[var(--color-text-muted)] transition-transform ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
          <span className={`block w-[22px] h-[1px] bg-[var(--color-text-muted)] transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-[22px] h-[1px] bg-[var(--color-text-muted)] transition-transform ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[60px] bg-[#0e0c0a]/95 z-[900] flex flex-col items-center justify-center gap-10 backdrop-blur-[20px] md:hidden"
          >
            {links.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="font-script italic text-3xl text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-cyan)]"
                onClick={() => {
                  setIsOpen(false);
                  setActiveHash(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile picture popup - Instagram style */}
      <AnimatePresence>
        {showPfp && data.photoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99998] bg-[#0e0c0a]/80 backdrop-blur-[5px] flex items-center justify-center p-4"
            onClick={() => setShowPfp(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={data.photoUrl}
                alt={data.name || 'Profile'}
                className="max-w-[90vw] max-h-[80vh] rounded-[12px] border-2 border-[var(--color-cyan)] object-cover"
                style={{ boxShadow: '0 0 60px var(--color-cyan-glow)' }}
              />
              <button
                onClick={() => setShowPfp(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--color-bg)] border-2 border-[var(--color-cyan)] rounded-full text-[var(--color-cyan)] flex items-center justify-center text-lg hover:bg-[var(--color-bg2)] transition-colors cursor-none"
                style={{ boxShadow: '0 0 10px var(--color-cyan-glow)' }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
