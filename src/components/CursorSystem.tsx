'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorSystem() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const outerPosRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cursor = cursorRef.current;
    const outer = outerRef.current;
    if (!cursor || !outer) return;

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(false);
      }
    };

    const animate = () => {
      if (!cursor || !outer) return;

      const { x, y } = posRef.current;

      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';

      outerPosRef.current.x += (x - outerPosRef.current.x) * 0.12;
      outerPosRef.current.y += (y - outerPosRef.current.y) * 0.12;
      outer.style.left = outerPosRef.current.x + 'px';
      outer.style.top = outerPosRef.current.y + 'px';

      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });

    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes cursorPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.1; }
        }
        @keyframes cursorSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <div
        ref={outerRef}
        className="fixed pointer-events-none z-[99997] hidden md:block"
        style={{
          width: isHovering ? '50px' : '35px',
          height: isHovering ? '50px' : '35px',
          border: isHovering
            ? '1.5px solid var(--color-primary-green)'
            : '1.5px solid var(--color-cyan)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          opacity: isHovering ? 0.6 : 0.3,
          animation: isHovering ? 'cursorSpin 4s linear infinite' : 'cursorPulse 2s ease-in-out infinite',
          boxShadow: isHovering
            ? '0 0 15px rgba(57,255,20,0.2)'
            : '0 0 10px rgba(0,201,167,0.2)',
        }}
      />

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999] hidden md:block"
        style={{
          width: isClicking ? '14px' : '8px',
          height: isClicking ? '14px' : '8px',
          background: isHovering
            ? 'var(--color-primary-green)'
            : 'var(--color-cyan)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s, height 0.15s, background 0.3s',
          boxShadow: isHovering
            ? '0 0 20px var(--color-primary-green), 0 0 40px rgba(57,255,20,0.3)'
            : '0 0 15px var(--color-cyan), 0 0 30px rgba(0,201,167,0.3)',
        }}
      />
    </>
  );
}
