'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorSystem() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
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
    const trailPositions: { x: number; y: number }[] = [];
    const TRAIL_LENGTH = 8;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const checkHover = () => {
      const hovered = document.querySelector(':hover');
      const isOverInteractive = hovered && (
        hovered.tagName === 'A' ||
        hovered.tagName === 'BUTTON' ||
        hovered.closest('a') ||
        hovered.closest('button') ||
        hovered.classList.contains('hover-target')
      );
      setIsHovering(!!isOverInteractive);
    };

    const animate = () => {
      if (!cursor || !outer) return;

      const { x, y } = posRef.current;

      // Main cursor - instant follow
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';

      // Outer ring - smooth follow with lerp
      outerPosRef.current.x += (x - outerPosRef.current.x) * 0.12;
      outerPosRef.current.y += (y - outerPosRef.current.y) * 0.12;
      outer.style.left = outerPosRef.current.x + 'px';
      outer.style.top = outerPosRef.current.y + 'px';

      // Update trail positions
      trailPositions.unshift({ x, y });
      if (trailPositions.length > TRAIL_LENGTH) trailPositions.pop();

      trailRefs.current.forEach((trail, i) => {
        if (!trail) return;
        const pos = trailPositions[Math.min(i + 1, trailPositions.length - 1)];
        if (pos) {
          trail.style.left = pos.x + 'px';
          trail.style.top = pos.y + 'px';
        }
      });

      checkHover();
      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    animationId = requestAnimationFrame(animate);

    const observer = new MutationObserver(checkHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
      observer.disconnect();
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

      {/* Trail dots */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed pointer-events-none z-[99998] w-1 h-1 rounded-full hidden md:block"
          style={{
            background: isHovering ? 'var(--color-primary-green)' : 'var(--color-cyan)',
            opacity: 0.15 - i * 0.018,
            transform: 'translate(-50%, -50%)',
            boxShadow: isHovering
              ? '0 0 6px var(--color-primary-green)'
              : '0 0 6px var(--color-cyan)',
          }}
        />
      ))}

      {/* Outer ring */}
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

      {/* Main cursor dot */}
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
